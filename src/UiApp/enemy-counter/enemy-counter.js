import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NextWave from '../../IdleApp/Icons/NextWave'
import css from './enemy-counter.module.css'
import Tippy from '@tippyjs/react'
import * as clock from '../../clock'
import { WAVE_TIMER_MS } from '../../config'
import waveManager from '../../TowerDefense/WaveManager'

const formatRemaining = (value) => {
	return Math.max(Math.round(value / 1000), 0)
}

const EnemyCounter = () => {
	const currentWave = useSelector((state) => state.waves.current)
	const isRunning = useSelector((state) => state.controls.running)
	const remainingEnemies = useSelector((state) => state.waves.remainingEnemies)
	const [remaining, setRemaining] = useState(WAVE_TIMER_MS)

	const handleClick = () => {
		waveManager.spawnWave()
	}

	useEffect(() => {
		const handler = () => {
			setRemaining(WAVE_TIMER_MS)
		}
		waveManager.on('wave-spawned', handler)
		return () => {
			waveManager.off('wave-spawned', handler)
		}
	}, [])

	useEffect(() => {
		let time = 0
		const handler = (frame, delta) => {
			time += delta
			// flush when we accumulate some time, so we dont update react every frame
			if (time > 250) {
				setRemaining((value) => value - time)
				time = 0
			}
		}
		clock.addListener(handler)
		return () => {
			clock.removeListener(handler)
		}
	}, [])

	const seconds = formatRemaining(remaining)

	return (
		<div className={css.enemyCounter}>
			Wave: {currentWave}
			<Tippy content={<div className={css.tooltip}>Spawn next wave right now!</div>}>
				<button disabled={!isRunning} className={css.spawnNextWave} onClick={handleClick}>
					<NextWave />
				</button>
			</Tippy>
			Enemies Remaining: {remainingEnemies}
			<div className={css.nextWaveTimer}>
				Next wave in {seconds < 10 ? <strong>{seconds}s</strong> : <>{seconds}s</>}
			</div>
		</div>
	)
}

export default EnemyCounter
