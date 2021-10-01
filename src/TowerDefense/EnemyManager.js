import { getStore } from '../gameState'
import { setRemainingEnemies } from '../waves'

class EnemyManager {
	constructor() {
		this.set = new Set()
		this._cachedArray = null
	}

	get() {
		if (!this._cachedArray) {
			this._cachedArray = Array.from(this.set).sort((a, b) => b.traveled - a.traveled)
		}
		return this._cachedArray
	}

	recalculate() {
		this._cachedArray = null
	}

	count() {
		return this.set.size
	}

	add(enemy) {
		this.set.add(enemy)
		this._cachedArray = null

		enemy.on('destroyed', () => this.remove(enemy))

		getStore().dispatch(setRemainingEnemies(this.count()))
	}

	remove(enemy) {
		this.set.delete(enemy)
		this._cachedArray = null

		getStore().dispatch(setRemainingEnemies(this.count()))
	}

	reset() {
		this.set.clear()
		getStore().dispatch(setRemainingEnemies(this.count()))
	}
}

export default new EnemyManager()
