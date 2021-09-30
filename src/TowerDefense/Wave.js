import * as PIXI from 'pixi.js'
import { GET_COMMENTS_FOR_WAVE, GET_COMMENTS_HP_FOR_WAVE, GET_AUDIENCES_CHANCE } from '../config'
import Enemy from './Enemy'
import EnemyManager from './EnemyManager'
import store from '../gameState'

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

export default class Wave extends PIXI.Container {
	constructor(index) {
		super()

		this.index = index

		const { PUBLISHER: publisher, AUDIENCES: audiences } = store.getState().products

		this.comments = GET_COMMENTS_FOR_WAVE(index)
		this.hp = GET_COMMENTS_HP_FOR_WAVE(index, publisher)

		this.enemies = []

		for (let i = 0; i < this.comments.NEGATIVE; i++) {
			const isConverted = GET_AUDIENCES_CHANCE(audiences)
			const type = isConverted ? 'neutral' : 'negative'
			this.enemies.push([type, this.hp.comment])
		}

		for (let i = 0; i < this.comments.NEUTRAL; i++) {
			this.enemies.push(['neutral', this.hp.comment])
		}

		for (let i = 0; i < this.comments.POSITIVE; i++) {
			this.enemies.push(['positive', this.hp.positive])
		}

		shuffleArray(this.enemies)

		if (index % 10 === 5) {
			this.enemies.push(['hater', this.hp.hater])
		}

		if (index % 10 === 0) {
			this.enemies.push(['influencer', this.hp.influencer])
		}

		this.enemies = new Set(
			this.enemies.map(([type, hp], index) => {
				return this.addEnemy(type, hp, index)
			})
		)

		// need to emit in next tick to be able to listen on the event in wave manager
		setTimeout(() => {
			for (const enemy of [...this.enemies]) {
				this.emit('enemy-added', enemy)
			}
		}, 100)
	}

	addEnemy(type, hp, index) {
		const enemy = new Enemy(type, hp, index)
		enemy.on('destroyed', () => {
			this.onEnemyDestroy(enemy)
		})
		enemy.on('spawn', () => {
			this.enemies.add(this.addEnemy('negative', this.hp.comment, 0))
		})
		this.emit('emeny-added', enemy)
		this.addChild(enemy)

		EnemyManager.add(enemy)
	
		return enemy
	}

	onEnemyDestroy(enemy) {
		this.enemies.delete(enemy)
		this.emit('enemy-destroyed', enemy)

		if (this.enemies.size === 0) {
			this.emit('wave-completed', this)
			this.destroy()
		}
	}

	update(delta) {
		for (const child of this.children) {
			if (child.update) child.update(delta, this)
		}
	}
}
