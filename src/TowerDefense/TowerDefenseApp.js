import { useEffect, useRef } from 'react'
import { MAP, TILES_X, TILES_Y, GAME_WIDTH, GAME_HEIGHT, HQ } from './config'
import * as PIXI from 'pixi.js'
import Enemy from './Enemy'
import Grass from './Grass'
import Road from './Road'
import Hq from './Hq'
import * as clock from '../clock'
import store from '../gameState'
import { isGameOver } from '../credits'
import waveManager from './WaveManager'

function detectGameOver(app) {
	if (isGameOver(store.getState())) {
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
	// Render background tiles
	app.loader.load((loader, resources) => {
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
	})

	app.ticker.stop()

	el.appendChild(app.view)

	app.stage.addChild(waveManager)

	// use custom clock to easily sync everything and pause when tab is not visible
	const clockUnsubscribe = clock.addListener((frame, delta) => {
		app.ticker.update(frame)

		for (const child of app.stage.children) {
			if (child.update) child.update(delta)
		}

		detectGameOver(app)

		if (!waveManager.children.length) {
			waveManager.spawnWave()
		}
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
