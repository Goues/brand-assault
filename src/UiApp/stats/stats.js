import { useSelector } from 'react-redux'
import SocialCredit from '../../IdleApp/Icons/SocialCredit'
import css from './stats.module.css'
import { toFixedRound } from '../../utils'

function Stat({ id, label }) {
	const value = useSelector((state) => state.stats[id])

	return (
		<div className={css.stat}>
			<div className={css.label}>{label}</div>
			<div className={css.value}>
				{id === 'creditsLost' && <SocialCredit width='10' />}
				{toFixedRound(value, 1)}
			</div>
		</div>
	)
}

const Stats = () => {
	return (
		<div className={css.stats}>
			<h1 className={css.header}>Stats</h1>
			<div className={css.list}>
				<Stat label='Enemies Killed' id='enemiesKilled' />
				<Stat label='Enemies Leaked' id='enemiesLeaked' />
				<Stat label='Lost Credits' id='creditsLost' />
			</div>
		</div>
	)
}

export default Stats
