import { useEffect, useRef } from 'react'
import { MAP, TILES_X, TILES_Y } from './config'
import Enemy from './Enemy'
import Grass from './Grass'
import Road from './Road'
import Hq from './Hq'
import app from './PixiApp'
import * as clock from '../clock'
import store from '../gameState'
import css from './TowerDefense.module.css'
import { isGameOver } from '../credits'
import waveManager from './WaveManager'

const TILES = {
	ROAD: Road,
	GRASS: Grass,
}

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
	// Render background tiles
	app.loader.load((loader, resources) => {
		for (let x = 0; x < TILES_X; x++) {
			for (let y = 0; y < TILES_Y; y++) {
				const path = MAP[x] && MAP[x][y]
				const tile = new (path ? TILES.ROAD : TILES.GRASS)(path || { x, y })
				app.stage.addChild(tile)
			}
		}
	})

	app.ticker.stop()

	el.appendChild(app.view)

	const hq = new Hq(app)
	app.stage.addChild(hq)

	app.stage.addChild(waveManager)

	// use custom clock to easily sync everything and pause when tab is not visible
	return clock.addListener((frame, delta) => {
		app.ticker.update(frame)

		for (const child of app.stage.children) {
			if (child.update) child.update(delta)
		}

		detectGameOver(app)

		if (!waveManager.children.length) {
			waveManager.spawnWave()
		}
	})
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

	return <div ref={ref} className={css.TowerDefense}></div>
}
