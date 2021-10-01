import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'
import { isGameOver } from '../credits'
import * as clock from '../clock'
import css from './index.module.css'
import Leaderboard from './leaderboard'

function GameOver({ reset }) {
	const gameOver = useSelector(isGameOver)
	const score = useSelector((state) => state.stats.score)

	useEffect(() => {
		if (gameOver) clock.stop()
	}, [gameOver])

	if (!gameOver) return ''

	return (
		<div className={css.wrapper}>
			<div className={css.modal}>
				<img className={css.image} src='/gameover.gif' alt='Game over' width='371' />
				<div className={css.heading}>Game Over!</div>
				<div className={css.score}>Your final score: {score}</div>
				<div className={css.better}>You can make better.</div>
				<Leaderboard />
				<Button onClick={reset}>Let's try it again!</Button>
			</div>
		</div>
	)
}

export default GameOver
