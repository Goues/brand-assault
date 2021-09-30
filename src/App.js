import { useEffect } from 'react'
import IdleApp from './IdleApp'
import TowerDefenseApp from './TowerDefense/TowerDefenseApp'
import UiApp from './UiApp'
import './App.css'
import * as clock from './clock'
import GameOver from './GameOver'
import GamePaused from './GamePaused'
import GameInit from './GameInit'
import SpawnNextWaveButton from './UiApp/spawn-next-wave-button/spawn-next-wave-button'
import EnemyCounter from './UiApp/enemy-counter/enemy-counter'
import Stats from './UiApp/stats/stats'
import Enemies from './UiApp/enemies/enemies'

function App() {
	useEffect(() => {
		const listener = () => {
			if (document.visibilityState !== 'visible') {
				clock.stop()
			}
		}
		document.addEventListener('visibilitychange', listener)
		return () => document.removeEventListener('visibilitychange', listener)
	}, [])
	useEffect(() => {
		const listener = (e) => {
			if (e.keyCode === 80) {
				// p
				clock.stop()
			}
		}
		document.addEventListener('keydown', listener)
		return () => document.removeEventListener('keydown', listener)
	}, [])
	return (
		<div className='App'>
			<GameInit />
			<GamePaused />
			<GameOver />
			<div className='Game'>
				<div className='App-stage'>
					<div className='App-idle'>
						<IdleApp />
					</div>
					<div className='App-td'>
						<EnemyCounter />
						<SpawnNextWaveButton />
						<TowerDefenseApp />
					</div>
					<div className='App-ui'>
						<Stats />
						<Enemies />
						<UiApp />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
