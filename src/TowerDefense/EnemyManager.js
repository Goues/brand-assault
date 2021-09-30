class EnemyManager {
	constructor() {
		this.set = new Set()
		this._cachedArray = null
	}

	get() {
		if (!this._cachedArray) {
			this._cachedArray = Array.from(this.set)
		}
		return this._cachedArray
	}

	count() {
		return this.set.size
	}

	add(enemy) {
		this.set.add(enemy)
		this._cachedArray = null

		enemy.on('destroyed', () => this.remove(enemy))
	}

	remove(enemy) {
		this.set.delete(enemy)
		this._cachedArray = null
	}

	reset() {
		this.set.clear()
	}
}

export default new EnemyManager()
