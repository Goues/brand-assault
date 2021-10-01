import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'
import { BASE_TOWER, TILE_HEIGHT, TILE_WIDTH, TOWERS, SOUNDS } from '../config'
import { isWithinRange } from '../utils'
import { upgradeTower } from '../towers'
import { getStore } from '../gameState'
import { getTotalTowerPointSpent, getTotalTowerPointAvailable } from '../towers'
import { subtractCredits } from '../credits'
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
		this.grid = { x, y }
		this.x = x * TILE_WIDTH
		this.y = y * TILE_HEIGHT
		this.width = TILE_WIDTH
		this.height = TILE_HEIGHT

		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2,
		}

		this.interactive = true
		this.buttonMode = true
		this.on('pointerdown', this.onClick)

		this.level = 0
		this.type = type
		this.lifespan = 0
		this.target = null
		this.parent = parent

		const rangeCircle = new PIXI.Graphics()
		rangeCircle.zIndex = 1
		rangeCircle.lineStyle(1, 0x000000)
		rangeCircle.beginFill(0x000000, 0.05)
		rangeCircle.drawCircle(this.x + TILE_WIDTH / 2, this.y + TILE_HEIGHT / 2, this.range)
		rangeCircle.endFill()
		rangeCircle.visible = false
		this.rangeCircle = rangeCircle
		this.parent.addChild(rangeCircle)

		this.levelText = new PIXI.Text(this.level, {
			align: 'center',
			fontFamily: 'Arial',
			fill: ['#ffffff'],
			fontSize: 11,
			fontWeight: 'bold',
			lineJoin: 'round',
		})
		this.levelText.x = this.width / 2
		this.levelText.y = this.height
		this.levelText.anchor.set(0.5)
		this.levelText.pivot.set(0.5)
		this.addChild(this.levelText)

		this.upgrade() // initialize to level 1
	}

	mouseover(e) {
		this.rangeCircle.visible = true
		this.zIndex = 2
	}

	mouseout() {
		this.rangeCircle.visible = false
		this.zIndex = null
	}

	onClick = () => {
		const state = getStore().getState()
		const spentPoints = getTotalTowerPointSpent(state)
		const availablePoints = getTotalTowerPointAvailable(state)
		const remainingPoints = availablePoints - spentPoints

		const necessaryTokens = BASE_TOWER.GET_TOKENS(this.level + 1)
		if (remainingPoints < necessaryTokens) return

		const necessaryCredits = BASE_TOWER.GET_CREDITS(this.level + 1)
		const credits = getStore().getState().credits
		if (necessaryTokens > credits) return

		const { x, y } = this.grid
		getStore().dispatch(upgradeTower(x, y))
		getStore().dispatch(subtractCredits(necessaryCredits))
		this.upgrade()
	}

	upgrade() {
		this.level += 1
		this.levelText.text = this.level
		this.damage = TOWERS[this.type].damage
		this.damageMultiplier = BASE_TOWER.DAMAGE_MULTIPLIER(this.level)
		this.chance = TOWERS[this.type].chance
		this.slow = TOWERS[this.type].slow
		this.range = BASE_TOWER.RANGE_MULTIPLIER(this.level) * TILE_WIDTH
		this.burstArea = TOWERS[this.type].burstArea
		this.burstDamage = TOWERS[this.type].burstDamage
		this.firingSpeed =
			BASE_TOWER.FIRING_SPEED_MULTIPLIER(this.level) * TOWERS[this.type].firingSpeed
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

					enemy.hit(this.burstDamage * this.damageMultiplier)
				})
			}
		}

		sound.play(SOUNDS.LASER)
		this.parent.addChild(
			new Bullet(this.center, target, this.damageMultiplier * this.damage[target.type], effect)
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
