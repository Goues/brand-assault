import { useEffect } from 'react'
import IdleApp from './IdleApp'
import TowerDefenseApp from './TowerDefense/TowerDefenseApp'
import './App.css'
import * as clock from './clock'
import GameOver from './GameOver'
import GamePaused from './GamePaused'
import GameInit from './GameInit'
import EnemyCounter from './UiApp/enemy-counter/enemy-counter'
import Stats from './UiApp/stats/stats'
import Enemies from './UiApp/enemies/enemies'
import Header from './UiApp/header/header'
import { useSelector } from 'react-redux'
import { KEYCODE_BINDINGS } from './config'

function App({ reset }) {
	const isRunning = useSelector((state) => state.controls.running)
	const started = useSelector((state) => state.controls.started)

	useEffect(() => {
		const listener = (e) => {
			if (e.keyCode === KEYCODE_BINDINGS.PAUSE) {
				// p
				if (isRunning) clock.stop()
				else if (started) clock.run()
			}
		}
		document.addEventListener('keyup', listener)
		return () => document.removeEventListener('keyup', listener)
	}, [isRunning, started])

	return (
		<div className='App'>
			<GameInit />
			<GameOver reset={reset} />
			<div className='Game'>
				<Header onReset={reset} />
				<div className='App-stage'>
					<div className='App-idle'>
						<IdleApp />
					</div>
					<div className='App-td'>
						<GamePaused reset={reset} />
						<EnemyCounter />
						<TowerDefenseApp />
					</div>
					<div className='App-ui'>
						<Stats />
						<Enemies />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
