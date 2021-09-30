import * as PIXI from 'pixi.js'
import { TILE_HEIGHT, TILE_WIDTH, TOWERS } from './config'
import { getCenter, isWithinRange } from '../utils'
import Bullet from './Bullet'
import waveManager from './WaveManager'

const IMAGE = {
	DEFAULT: '/tower.png',
	QUICK_TO_BAN_AGENT: '/qtba.jpeg',
	PURGER: '/purger.jpg',
	OPTIMIST: '/optimist.jpeg',
	POWER_USER: '/power_user.png', // miniboss
	BUSY_BEE: '/busy_bee.png', // boss
}

class Tower extends PIXI.Sprite {
	constructor(x, y, type, parent) {
		super(PIXI.Texture.from(IMAGE[type]))
		this.x = x * TILE_WIDTH
		this.y = y * TILE_HEIGHT
		this.width = TILE_WIDTH
		this.height = TILE_HEIGHT
		this.interactive = true

		this.damage = TOWERS[type].damage
		this.chance = TOWERS[type].chance
		this.slow = TOWERS[type].slow
		this.attackArea = TOWERS[type].attackArea
		this.range = 3 * TILE_WIDTH // temporary
		this.firingSpeed = TOWERS[type].firingSpeed // temporary
		this.lifespan = 0 // temporary
		this.target = null // temporary
		this.parent = parent

		const rangeCircle = new PIXI.Graphics()
		rangeCircle.lineStyle(1, 0x000000)
		rangeCircle.drawCircle(this.x + TILE_WIDTH / 2, this.y + TILE_HEIGHT / 2, this.range)
		rangeCircle.endFill()
		rangeCircle.visible = false
		this.rangeCircle = rangeCircle
		this.parent.addChild(rangeCircle)
	}

	mouseover(e) {
		this.rangeCircle.visible = true
	}

	mouseout() {
		this.rangeCircle.visible = false
	}

	shouldBeHit(enemy) {
		if (!this.chance || !(enemy.type in this.chance)) return true
		const random = Math.random()
		if (random <= this.chance[enemy.type]) {
			return true
		}
		return false
	}

	isValidTarget(enemy) {
		return (
			!enemy.destoryed &&
			enemy.traveled >= 0 &&
			enemy.type in this.damage &&
			this.shouldBeHit(enemy) &&
			isWithinRange(this, enemy)
		)
	}

	getTarget() {
		if (this.target && this.target.destroyed) {
			this.target = null
		}

		if (this.target) {
			if (!isWithinRange(this, this.target)) {
				this.target = null
			}
		}

		if (!this.target) {
			this.target = waveManager.getAllEnemies().find((enemy) => {
				return this.isValidTarget(enemy)
			})
		}

		if (!this.target) {
			return null
		}

		if (this.target.destroyed) {
			return null
		}

		return this.target
	}

	performAttackOnTarget(target) {
		const towerCenter = getCenter(this)
		this.parent.addChild(new Bullet(towerCenter, target, this.damage[target.type]))
		if (this.slow && target.type in this.slow && !target.slowed) {
			target.velocity -= target.velocity * this.slow[target.type]
			target.slowed = true
		}
	}

	performAttackOnArea() {
		for (const enemy of waveManager.getAllEnemies()) {
			if (this.isValidTarget(enemy)) this.performAttackOnTarget(enemy)
		}
	}

	update(delta) {
		this.lifespan += delta

		while (this.lifespan >= this.firingSpeed) {
			this.lifespan -= this.firingSpeed

			if (this.attackArea) {
				this.performAttackOnArea()
			} else {
				const target = this.getTarget()
				if (target) this.performAttackOnTarget(target)
			}
		}
	}
}

export default Tower
