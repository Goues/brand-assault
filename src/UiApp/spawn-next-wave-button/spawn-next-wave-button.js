import React from 'react'
import waveManager from '../../TowerDefense/WaveManager'
import css from './spawn-button.module.css'

const SpawnNextWaveButton = () => {
	const handleClick = () => {
		waveManager.spawnWave()
	}

	return (
		<button className={css.button} onClick={handleClick}>
			Spawn me some more enemies NOW!
		</button>
	)
}

export default SpawnNextWaveButton
