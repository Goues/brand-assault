import { useEffect, useState } from 'react'
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
import { Provider } from 'react-redux'
import { getNewStore, getStore } from './gameState'

function App() {
	const [store, setStore] = useState(getStore)
	const [iteration, setIteration] = useState(0)

	const reset = () => {
		setStore(getNewStore())
		setIteration(iteration + 1)
	}

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

	// I keep exiting accidentally
	useEffect(() => {
		const listener = (event) => {
			event.preventDefault()
			return (event.returnValue = 'Are you sure you want to exit?')
		}
		window.addEventListener('beforeunload', listener)
		return () => window.removeEventListener('beforeunload', listener)
	}, [])

	return (
		<Provider store={store} key={iteration}>
			<div className='App'>
				<GameInit />
				<GamePaused reset={reset} />
				<GameOver reset={reset} />
				<div className='Game'>
					<Header />
					<div className='App-stage'>
						<div className='App-idle'>
							<IdleApp />
						</div>
						<div className='App-td'>
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
		</Provider>
	)
}

export default App
