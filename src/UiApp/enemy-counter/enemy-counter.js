import React from 'react'
import { useSelector } from 'react-redux'
import NextWave from '../../IdleApp/Icons/NextWave'
import css from './enemy-counter.module.css'
import Tippy from '@tippyjs/react'
import waveManager from '../../TowerDefense/WaveManager'

const EnemyCounter = () => {
	const currentWave = useSelector((state) => state.waves.current)
	const remainingEnemies = useSelector((state) => state.waves.remainingEnemies)

	const handleClick = () => {
		waveManager.spawnWave()
	}

	return (
		<div className={css.enemyCounter}>
			Wave: {currentWave}
			<Tippy content={<div className={css.tooltip}>Spawn next wave right now!</div>}>
				<button className={css.spawnNextWave} onClick={handleClick}>
					<NextWave />
				</button>
			</Tippy>
			Enemies Remaining: {remainingEnemies}
		</div>
	)
}

export default EnemyCounter
