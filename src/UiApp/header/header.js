import { useSelector } from 'react-redux'
import { run, stop } from '../../clock'
import { toFixedRound } from '../../utils'
import Pause from '../pause/pause'
import SocialCredit from '../social-credit/social-credit'
import DefendTowers from '../defend-towers/defend-towers'
import WavesSurvived from '../waves-survived/waves-survived'
import { getTotalTowerPointSpent, getTotalTowerPointAvailable } from '../../towers'
import css from './header.module.css'
import { ReactComponent as MuscleIcon } from './muscle.svg'
import Score from '../score/score'

const Header = ({ onReset }) => {
	const credits = useSelector((state) => state.credits)
	const towers = useSelector(getTotalTowerPointSpent)
	const communityLevel = useSelector(getTotalTowerPointAvailable)
	const wavesSurvived = useSelector((state) => state.waves.survived)
	const isRunning = useSelector((state) => state.controls.running)

	return (
		<div className={css.header}>
			<Pause isRunning={isRunning} onPause={stop} onResume={run} onReset={onReset} />
			<div className={css.creditsTowers}>
				<SocialCredit credits={toFixedRound(credits, 1)} />
				<DefendTowers towers={towers} maxTowers={communityLevel} />
			</div>
			<div className={css.scores}>
				<MuscleIcon />
				<div className={css.scoreList}>
					<Score />
					<WavesSurvived survived={wavesSurvived} />
				</div>
			</div>
		</div>
	)
}

export default Header
