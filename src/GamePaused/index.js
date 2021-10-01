import { useSelector } from 'react-redux'
import { isGameOver } from '../credits'
import Analytics from '../IdleApp/Icons/Analytics'
import Audiences from '../IdleApp/Icons/Audiences'
import Community from '../IdleApp/Icons/Community'
import Influencers from '../IdleApp/Icons/Influencers'
import Publisher from '../IdleApp/Icons/Publisher'
import SocialCredit from '../IdleApp/Icons/SocialCredit'
import css from './index.module.css'
import { ReactComponent as KeyboardIcon } from './keyboard.svg'

function GamePaused() {
	const skip = useSelector((state) => {
		return state.controls.running || !state.controls.started
	})
	const gameOver = useSelector(isGameOver)

	if (skip || gameOver) return ''

	return (
		<div className={css.paused}>
			<div className={css.heading}>Paused</div>
			<div className={css.shortcuts}>
				<KeyboardIcon className={css.icon} /> Keyboard shortcuts
			</div>
			<div className={css.item}>
				<div>P</div>
				<div className={css.description}>Pause/Unpause the game</div>
			</div>
			<div className={css.item}>
				<div>S</div>
				<div className={css.description}>
					Gain small amount of <SocialCredit />
				</div>
			</div>
			<div className={css.item}>
				<div>C</div>
				<div className={css.description}>
					Upgrade Community <Community />
				</div>
			</div>
			<div className={css.item}>
				<div>X</div>
				<div className={css.description}>
					Upgrade Publisher <Publisher />
				</div>
			</div>
			<div className={css.item}>
				<div>V</div>
				<div className={css.description}>
					Upgrade Influencers <Influencers />
				</div>
			</div>
			<div className={css.item}>
				<div>D</div>
				<div className={css.description}>
					Upgrade Analytics <Analytics />
				</div>
			</div>
			<div className={css.item}>
				<div>F</div>
				<div className={css.description}>
					Upgrade Audiences <Audiences />
				</div>
			</div>
		</div>
	)
}

export default GamePaused
