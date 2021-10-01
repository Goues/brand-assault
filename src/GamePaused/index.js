import { useSelector } from 'react-redux'
import { isGameOver } from '../credits'
import css from './index.module.css'

function GamePaused() {
	const skip = useSelector((state) => {
		return state.controls.running || !state.controls.started
	})
	const gameOver = useSelector(isGameOver)

	if (skip || gameOver) return ''

	return (
		<div className={css.paused}>
			{/* <img className={css.image} src='/game_paused.gif' alt='Game over' width='371' /> */}
			<div className={css.heading}>Paused</div>
		</div>
	)
	// return (
	// 	<div className={css.wrapper}>
	// 		<div className={css.modal}>
	// 			{/* <img className={css.image} src='/game_paused.gif' alt='Game over' width='371' /> */}
	// 			<div className={css.heading}>Paused</div>
	// 			<div className={css.buttons}>
	// 				<Button onClick={reset} isSecondary>
	// 					Restart
	// 				</Button>
	// 				<Button onClick={run}>Resume</Button>
	// 			</div>
	// 		</div>
	// 	</div>
	// )
}

export default GamePaused
