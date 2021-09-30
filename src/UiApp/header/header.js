import { useSelector } from 'react-redux'
import { stop } from '../../clock'
import { toFixedRound } from '../../utils'
import Pause from '../pause/pause'
import SocialCredit from '../social-credit/social-credit'
import DefendTowers from '../defend-towers/defend-towers'
import WavesSurvived from '../waves-survived/waves-survived'
import css from './header.module.css'

const Header = () => {
	const credits = useSelector((state) => state.credits)
	const towers = useSelector((state) => state.towers.length)
	const communityLevel = useSelector((state) => state.products.COMMUNITY)
	const wavesSurvived = useSelector((state) => state.waves.survived)
	const isRunning = useSelector((state) => state.controls.running)

	return (
		<div className={css.header}>
			<Pause isRunning={isRunning} onPause={stop} />
			<div className={css.creditsTowers}>
				<SocialCredit credits={toFixedRound(credits, 1)} />
				<DefendTowers towers={towers} maxTowers={communityLevel} />
			</div>
			<WavesSurvived survived={wavesSurvived} />
		</div>
	)
}

export default Header
