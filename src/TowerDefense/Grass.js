import * as PIXI from 'pixi.js'
import Tile from './Tile'
import Tower from './Tower'
import { TOWER_TYPES, BASE_TOWER } from '../config'
import { buildTower } from '../towers'
import { getStore } from '../gameState'
import { getTotalTowerPointSpent, getTotalTowerPointAvailable } from '../towers'

const TEXTURES = {
	PASSIVE: PIXI.Texture.from('/space_for_tower.png'),
	ACTIVE: PIXI.Texture.from('/space_active_for_tower.png'),
	HOVER: PIXI.Texture.from('/add_tower.png'),
}

class Grass extends Tile {
	constructor(path) {
		super(TEXTURES.PASSIVE, path)
		this.interactive = true
		this.buttonMode = true
		this.on('pointerdown', this.onClick)
		this.tower = null

		this.unsubscribe = getStore().subscribe(this.detectStoreChange)
	}

	mouseover(e) {
		if (this.canBuildTower) {
			this.texture = TEXTURES.HOVER
		}
	}

	mouseout() {
		this.texture = this.canBuildTower ? TEXTURES.ACTIVE : TEXTURES.PASSIVE
	}

	detectStoreChange = () => {
		const state = getStore().getState()
		const spentPoints = getTotalTowerPointSpent(state)
		const availablePoints = getTotalTowerPointAvailable(state)
		const remainingPoints = availablePoints - spentPoints

		const canBuildTower = remainingPoints >= BASE_TOWER.TOKENS

		if (canBuildTower !== this.canBuildTower) {
			this.texture = canBuildTower ? TEXTURES.ACTIVE : TEXTURES.PASSIVE
			this.canBuildTower = canBuildTower
		}
	}

	buildNewTower(e) {
		if (!this.canBuildTower) return

		const { x, y } = this.grid
		getStore().dispatch(buildTower(x, y))
		const tower = new Tower(x, y, TOWER_TYPES.DEFAULT, this.parent)
		this.tower = tower
		this.parent.addChild(tower)
	}

	upgradeTower() {
		// Tower upgrade
	}

	onClick = (e) => {
		if (!this.tower) {
			this.buildNewTower(e)
			return
		}
		this.upgradeTower(e)
	}

	destroy() {
		this.unsubscribe()
		super.destroy()
	}
}

export default Grass
