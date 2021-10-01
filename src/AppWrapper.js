import { useEffect, useState } from 'react'
import App from './App'
import * as clock from './clock'
import { Provider } from 'react-redux'
import { getNewStore, getStore } from './gameState'

function AppWrapper() {
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

	// I keep exiting accidentally
	useEffect(() => {
		const listener = (event) => {
			event.preventDefault()
			clock.stop()
			return (event.returnValue = 'Are you sure you want to exit?')
		}
		window.addEventListener('beforeunload', listener)
		return () => window.removeEventListener('beforeunload', listener)
	}, [])

	return (
		<Provider store={store} key={iteration}>
			<App reset={reset} />
		</Provider>
	)
}

export default AppWrapper
