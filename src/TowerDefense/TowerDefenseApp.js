import { useEffect, useRef } from 'react'
import { MAP, TILES_X, TILES_Y, GAME_WIDTH, GAME_HEIGHT, HQ } from './config'
import { SOUNDS } from '../config'
import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'
import preload from './Preloader'
import Enemy from './Enemy'
import Grass from './Grass'
import Road from './Road'
import Hq from './Hq'
import * as clock from '../clock'
import { getStore } from '../gameState'
import { isGameOver } from '../credits'
import EnemyManager from './EnemyManager'
import waveManager from './WaveManager'

function detectGameOver(app) {
	if (isGameOver(getStore().getState())) {
		sound.play(SOUNDS.GAMEOVER)
		sound.stop(SOUNDS.BACKGROUND_MUSIC)
		for (const child of app.stage.children) {
			if (child instanceof Hq || child instanceof Enemy) {
				app.stage.removeChild(child)
			}
		}
		app.ticker.stop()
	}
}

function mountPixi(el) {
	const app = new PIXI.Application({
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
		backgroundAlpha: 0,
		autoStart: false,
	})
	preload(app.loader)
	sound.play(SOUNDS.BACKGROUND_MUSIC)

	for (let x = 0; x < TILES_X; x++) {
		for (let y = 0; y < TILES_Y; y++) {
			let tile
			if (x === HQ.x && y === HQ.y) {
				tile = new Hq({ x, y })
			} else if (MAP[x] && MAP[x][y]) {
				tile = new Road(MAP[x][y])
			} else {
				tile = new Grass({ x, y })
			}
			app.stage.addChild(tile)
		}
	}

	app.ticker.stop()

	el.appendChild(app.view)

	EnemyManager.reset()
	waveManager.reset()
	app.stage.addChild(waveManager)
	app.stage.sortableChildren = true

	// use custom clock to easily sync everything and pause when tab is not visible
	const clockUnsubscribe = clock.addListener((frame, delta) => {
		EnemyManager.recalculate()
		app.ticker.update(frame)

		for (const child of app.stage.children) {
			if (child.update) child.update(delta)
		}

		detectGameOver(app)
	})

	return () => {
		app.destroy()
		clockUnsubscribe()
	}
}

export default function TowerDefenseApp() {
	const ref = useRef(null)
	useEffect(() => {
		const el = ref.current
		// The application will create a canvas element for you that you
		// can then insert into the DOM.
		const unmount = mountPixi(el)

		return () => {
			for (const node of [...el.childNodes]) {
				node.remove()
			}
			unmount()
		}
	}, [])

	return <div ref={ref}></div>
}
