import * as PIXI from 'pixi.js'
import { BASE_TOWER, TILE_HEIGHT, TILE_WIDTH, TOWERS } from '../config'
import { isWithinRange } from '../utils'
import Bullet from './Bullet'
import EnemyManager from './EnemyManager'

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
		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2
		}

		this.damage = TOWERS[type].damage
		this.chance = TOWERS[type].chance
		this.slow = TOWERS[type].slow
		this.range = BASE_TOWER.RANGE * TILE_WIDTH
		this.burstArea = TOWERS[type].burstArea
		this.burstDamage = TOWERS[type].burstDamage
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
			isWithinRange(this, enemy, this.range)
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
			this.target = EnemyManager.get().find((enemy) => {
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
		let effect

		if (this.slow && target.type in this.slow && !target.slowed) {
			// slowing effect, slows current enemy on hit
			effect = (target) => {
				target.velocity -= target.velocity * this.slow[target.type]
				target.slowed = true
			}
		} else if (this.burstArea) {
			// burst effect, hit all enemies within burst area
			effect = (target) => {
				EnemyManager.get().forEach((enemy) => {
					if (enemy === target) return
					if (!isWithinRange(target, enemy, this.burstArea)) return

					enemy.hit(this.burstDamage)
				})
			}
		}

		this.parent.addChild(
			new Bullet(this.center, target, this.damage[target.type], effect)
		)
	}

	update(delta) {
		this.lifespan += delta

		while (this.lifespan >= this.firingSpeed) {
			this.lifespan -= this.firingSpeed

			const target = this.getTarget()
			if (target) this.performAttackOnTarget(target)
		}
	}
}

export default Tower
