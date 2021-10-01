import * as PIXI from 'pixi.js'
import { BASE_TOWER, TILE_HEIGHT, TILE_WIDTH, TOWERS, SOUNDS, TOWER_TYPES } from '../config'

const TEXTURES = {
	QUICK_TO_BAN_AGENT: '/qtba.png',
	PURGER: '/purger.png',
	OPTIMIST: '/optimist.png',
	POWER_USER: '/power.png',
}

class TowerUpgrade extends PIXI.Sprite {
	constructor(type, tower, x, y) {
		super(PIXI.Texture.from(TEXTURES[type]))

		this.type = type
		this.setCoordinates(x, y)
		this.width = TILE_WIDTH
		this.height = TILE_HEIGHT
		this.interactive = true
		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2,
		}
		this.tower = tower
		this.visible = false
		this.zIndex = 10

		this.on('pointerdown', this.onClick)
	}

	setCoordinates(x, y) {
		if (this.type === TOWER_TYPES.QUICK_TO_BAN_AGENT) {
			this.x = x * TILE_WIDTH - TILE_WIDTH
			this.y = y * TILE_HEIGHT
		}
		if (this.type === TOWER_TYPES.PURGER) {
			this.x = x * TILE_WIDTH
			this.y = y * TILE_HEIGHT - TILE_HEIGHT
		}
		if (this.type === TOWER_TYPES.OPTIMIST) {
			this.x = x * TILE_WIDTH + TILE_WIDTH
			this.y = y * TILE_HEIGHT
		}
		if (this.type === TOWER_TYPES.POWER_USER) {
			this.x = x * TILE_WIDTH
			this.y = y * TILE_HEIGHT + TILE_HEIGHT
		}
	}

	onClick() {
		if (!this.tower.upgraded) {
			this.tower.upgradeTower(this.type)
		}
	}
}
export default TowerUpgrade
