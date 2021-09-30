import * as PIXI from 'pixi.js'
import { PATH, TILE_HEIGHT, TILE_WIDTH, DIRECTIONS } from './config'
import { BASE_DAMAGE, GET_DAMAGE } from '../config.js'
import store from '../gameState'
import { addCredits, subtractCredits } from '../credits'
import Hitpoints from './Hitpoints'
import Damage from './Damage'
import { incrementCreditsLost, incrementEnemiesKilled, incrementEnemiesLeaked } from '../stats'

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
			this.hit(BASE_DAMAGE)
		})

		const hp = new Hitpoints(this.hitpoints, this.maxHitpoints, this)
		this.addChild(hp)
	}

	hit(baseDamage) {
		const analytics = store.getState().products.ANALYTICS
		const damage = GET_DAMAGE(baseDamage, analytics)

		if (!this.parent) {
			this.destroy()
			return
		}
		this.parent.addChild(new Damage(damage, this))
		this.hitpoints -= damage
		if (this.hitpoints <= 0) {
			store.dispatch(incrementEnemiesKilled())
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
					store.dispatch(addCredits(this.hitpoints))
					this.destroy()
					break
				case 'neutral':
					this.x = -this.size
					this.y = -this.size
					this.type = 'negative'
					this.texture = PIXI.Texture.from(IMAGE[this.type])
					this.traveled = 0
					break
				default:
					store.dispatch(subtractCredits(this.hitpoints))
					// stats
					store.dispatch(incrementCreditsLost(this.hitpoints))
					store.dispatch(incrementEnemiesLeaked())

					this.destroy()
					break
			}
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
	}

	destroy() {
		if (this.destroyed) return

		super.destroy()
	}
}

export default Enemy
