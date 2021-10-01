import { ReactComponent as PauseIcon } from './pause.svg'
import { ReactComponent as PlayIcon } from './play.svg'
import { ReactComponent as RefreshIcon } from './refresh.svg'

import css from './pause.module.css'

export default function Pause({ isRunning, onPause, onResume, onReset }) {
	const PausedState = () => (
		<>
			<button className={css.pause} onClick={onResume}>
				<PlayIcon />
				<div class={css.pauseText}>Continue</div>
			</button>
			<button className={css.pause} onClick={onReset}>
				<RefreshIcon />
				<div class={css.pauseText}>Restart</div>
			</button>
		</>
	)

	return (
		<div className={css.pauseContainer}>
			{isRunning ? (
				<button className={css.pause} onClick={onPause}>
					<PauseIcon />
					<div class={css.pauseText}>Pause game</div>
				</button>
			) : (
				<PausedState />
			)}
		</div>
	)
}
