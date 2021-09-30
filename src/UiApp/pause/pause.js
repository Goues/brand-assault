import { ReactComponent as PauseIcon } from './pause.svg'

import css from './pause.module.css'

export default function Pause({ isRunning, onPause }) {
	return (
		<div className={css.pauseContainer}>
			{isRunning && (
				<button className={css.pause} onClick={onPause}>
					<PauseIcon />
					<div className={css.pauseText}>Pause game</div>
				</button>
			)}
		</div>
	)
}
