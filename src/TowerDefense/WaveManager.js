import * as PIXI from 'pixi.js'
import { getStore } from '../gameState'
import { incrementSurvived, setCurrent, setRemainingEnemies } from '../waves'
import Wave from './Wave'
import EnemyManager from './EnemyManager'
import { WAVE_TIMER_MS } from '../config'

class WaveManager extends PIXI.Container {
	constructor() {
		super()

		this.level = 0
		this.elapsed = null

		window.WaveManager = this
	}

	reset() {
		this.level = 0
		this.elapsed = null
		for (const child of this.children) {
			child.destroy()
		}
	}

	spawnWave() {
		this.level += 1
		const wave = new Wave(this.level)

		wave.on('wave-completed', (wave) => {
			getStore().dispatch(incrementSurvived())
			wave.destroy()
		})

		wave.on('enemy-added', () => {
			getStore().dispatch(setRemainingEnemies(EnemyManager.count()))
		})

		wave.on('enemy-destroyed', () => {
			getStore().dispatch(setRemainingEnemies(EnemyManager.count()))
		})

		// update current level
		getStore().dispatch(setCurrent(this.level))

		this.emit('wave-spawned', wave)
		this.addChild(wave)
		this.elapsed = 0
	}

	update(delta) {
		if (this.elapsed === null || this.elapsed > WAVE_TIMER_MS) {
			this.spawnWave()
		}
		this.elapsed += delta

		for (const child of this.children) {
			if (child.update) child.update(delta, this)
		}
	}
}

export default new WaveManager()
