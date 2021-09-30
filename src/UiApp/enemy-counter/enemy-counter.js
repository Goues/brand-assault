import React from 'react'
import { useSelector } from 'react-redux'
import css from './enemy-counter.module.css'

const EnemyCounter = () => {
	const currentWave = useSelector((state) => state.waves.current)
	const remainingEnemies = useSelector((state) => state.waves.remainingEnemies)

	return (
		<div className={css.enemyCounter}>
			<span>Wave: {currentWave}</span>
			<span>Enemies Remaining: {remainingEnemies}</span>
		</div>
	)
}

export default EnemyCounter
