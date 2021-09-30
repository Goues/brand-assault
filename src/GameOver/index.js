import { useSelector } from 'react-redux'
import Button from '../Button'
import { isGameOver } from '../credits'
import css from './index.module.css'

function GameOver({ reset }) {
	const gameOver = useSelector(isGameOver)
	const wavesSurvived = useSelector((state) => state.waves.survived)

	if (!gameOver) return ''

	return (
		<div className={css.wrapper}>
			<div className={css.modal}>
				<img className={css.image} src='/gameover.gif' alt='Game over' width='371' />
				<div className={css.heading}>Game Over!</div>
				<div className={css.score}>Your final score: {wavesSurvived}</div>
				<div className={css.better}>You can make better.</div>
				<Button onClick={reset}>Let's try it again!</Button>
			</div>
		</div>
	)
}

export default GameOver
