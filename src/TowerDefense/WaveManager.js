import * as PIXI from 'pixi.js'
import store from '../gameState'
import { incrementSurvived, setCurrent, setRemainingEnemies } from '../waves'
import Wave from './Wave'

class WaveManager extends PIXI.Container {
	constructor() {
		super()

		this.level = 0
	}

	spawnWave() {
		this.level += 1
		const wave = new Wave(this.level)

		wave.on('wave-completed', (wave) => {
			store.dispatch(incrementSurvived())
			wave.destroy()
		})

		wave.on('enemy-added', () => {
			store.dispatch(setRemainingEnemies(this.getRemainingEnemies()))
		})

		wave.on('enemy-destroyed', () => {
			store.dispatch(setRemainingEnemies(this.getRemainingEnemies()))
		})

		// update current level
		store.dispatch(setCurrent(this.level))

		this.addChild(wave)
	}

	getRemainingEnemies() {
		let count = 0
		for (const wave of this.children) {
			count += wave.enemies.size
		}

		return count
	}

	getAllEnemies() {
		const enemies = []
		for (const wave of this.children) {
			enemies.push(...[...wave.enemies])
		}
		return enemies
	}

	update(delta) {
		for (const child of this.children) {
			if (child.update) child.update(delta, this)
		}
	}
}

const manager = new WaveManager()

window.WaveManager = manager

export default manager
