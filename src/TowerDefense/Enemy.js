import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'
import { PATH, TILE_HEIGHT, TILE_WIDTH, DIRECTIONS } from './config'
import {
	BASE_DAMAGE,
	GET_DAMAGE,
	SOUNDS,
	POINTS_FOR_KILLED_BOSS,
	POINTS_FOR_KILLED_COMMENT,
	POINTS_FOR_KILLED_HATER,
} from '../config.js'
import { getStore } from '../gameState'
import { addCredits, subtractCredits } from '../credits'
import Hitpoints from './Hitpoints'
import Damage from './Damage'
import {
	incrementCreditsLost,
	incrementEnemiesKilled,
	incrementEnemiesLeaked,
	incrementScore,
} from '../stats'

const IMAGE = {
	negative: '/comment_negative.png',
	neutral: '/comment_neutral.png',
	positive: '/comment_positive.png',
	hater: '/hater.png', // miniboss
	influencer: '/influencer.png', // boss
}

const SIZE = {
	negative: TILE_WIDTH / 2,
	neutral: TILE_WIDTH / 2,
	positive: TILE_WIDTH / 2,
	hater: (TILE_WIDTH * 2) / 3, // miniboss
	influencer: TILE_WIDTH, // boss
}

const POINTS = {
	negative: POINTS_FOR_KILLED_COMMENT,
	neutral: POINTS_FOR_KILLED_COMMENT,
	positive: POINTS_FOR_KILLED_COMMENT,
	hater: POINTS_FOR_KILLED_HATER,
	influencer: POINTS_FOR_KILLED_BOSS,
}

class Enemy extends PIXI.Sprite {
	constructor(type, hitpoints, delay) {
		super(PIXI.Texture.from(IMAGE[type]))

		const isBossOrMiniBoss = type === 'hater' || type === 'influencer'
		const isBoss = type === 'influencer'

		this.size = SIZE[type]
		this.offset = {
			x: (TILE_WIDTH - this.size) / 2,
			y: (TILE_HEIGHT - this.size) / 2,
		}
		this.type = type
		this.x = -SIZE[type]
		this.y = -SIZE[type]
		this.width = SIZE[type]
		this.height = SIZE[type]
		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2,
		}

		this.velocity = 0.1 + (0.5 - Math.random()) * 0.01 // per 1s
		if (isBoss) this.velocity /= 2

		this.maxHitpoints = hitpoints
		this.hitpoints = hitpoints
		this.interactive = true
		this.buttonMode = true
		this.traveled = 0 - (delay * 100 + Math.random() * 50)
		this.canSpawn = isBossOrMiniBoss
		this.lastSpawn = 0
		this.spawnInterval = isBoss ? 1500 : 3000
		this.slowed = false

		this.on('pointerdown', () => {
			if (!getStore().getState().controls.running) return

			this.hit(BASE_DAMAGE)
		})

		const hp = new Hitpoints(this.hitpoints, this.maxHitpoints, this)
		this.addChild(hp)
	}

	hit(baseDamage) {
		sound.play(SOUNDS.DAMAGE)

		const analytics = getStore().getState().products.ANALYTICS
		const damage = GET_DAMAGE(baseDamage, analytics)

		if (!this.parent) {
			this.destroy()
			return
		}
		this.parent.addChild(new Damage(damage, this))
		this.hitpoints -= damage
		if (this.hitpoints <= 0) {
			getStore().dispatch(incrementEnemiesKilled())
			getStore().dispatch(incrementScore(POINTS[this.type]))
			this.destroy()
			return
		}
	}

	update(delta) {
		if (this.destroyed) return

		this.traveled += delta * this.velocity

		if (this.traveled < 0) {
			return
		}

		let pathIndex = Math.floor(this.traveled / TILE_WIDTH)

		if (pathIndex >= PATH.length) {
			switch (this.type) {
				case 'positive':
					getStore().dispatch(addCredits(this.hitpoints))
					this.destroy()
					return
				case 'neutral':
					this.type = 'negative'
					this.texture = PIXI.Texture.from(IMAGE[this.type])
					break
				default: {
					let credits = this.hitpoints
					if (this.type === 'hater') {
						credits /= 4
					}
					getStore().dispatch(subtractCredits(credits))
					// stats
					getStore().dispatch(incrementCreditsLost(credits))
					getStore().dispatch(incrementEnemiesLeaked())
					break
				}
			}
			this.x = -this.size
			this.y = -this.size
			this.traveled = 0
			return
		}

		let remainder = this.traveled % TILE_WIDTH
		let firstHalf = remainder <= TILE_WIDTH / 2
		let node = PATH[pathIndex]
		let x = node.x * TILE_WIDTH + this.offset.x
		let y = node.y * TILE_WIDTH + this.offset.y

		remainder = remainder - TILE_WIDTH / 2
		if (!firstHalf) {
			remainder *= -1
		}

		switch (firstHalf ? node.from : node.to) {
			case DIRECTIONS.TOP:
				y += remainder
				break
			case DIRECTIONS.BOTTOM:
				y -= remainder
				break
			case DIRECTIONS.LEFT:
				x += remainder
				break
			case DIRECTIONS.RIGHT:
				x -= remainder
				break
			default:
				break
		}

		this.x = x
		this.y = y
		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2,
		}

		for (const child of this.children) {
			if (child.update) child.update(delta, this)
		}

		if (this.canSpawn) {
			this.lastSpawn += delta
			if (this.lastSpawn > this.spawnInterval) {
				this.emit('spawn')
				this.lastSpawn -= this.spawnInterval
			}
		}

		// make the enemy sway from side to side
		this.rotation = Math.sin(this.traveled * 0.1) * delta * 0.005
	}

	destroy() {
		if (this.destroyed) return

		super.destroy()
	}
}

export default Enemy
