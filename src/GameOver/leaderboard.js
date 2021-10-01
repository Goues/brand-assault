import cx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import css from './leaderboard.module.css'
import Star from '../IdleApp/Icons/Star'

const Leaderboard = () => {
	const leaderboard = useSelector((state) => state.leaderboard)
	const playerName = useSelector((state) => state.controls.playerName)
	const score = useSelector((state) => state.stats.score)

	return (
		<div className={css.leaderboard}>
			<div className={css.header}>
				<div className={css.headerCell}>Leaderboard for Top 10 brands</div>
				<div className={css.headerCell}>highest social score</div>
			</div>
			<div className={css.body}>
				{leaderboard.map((item, idx) => {
					const isMe = item.name === playerName
					const isCurrentScore = item.score === score
					return (
						<div
							key={`${item.name}-${idx}`}
							className={cx({ [css.you]: isMe, [css.currentScore]: isCurrentScore }, css.row)}
						>
							<div className={css.cell}>
								{idx + 1}. {item.name}
								{isMe && <Star />}
							</div>
							<div className={css.cell}>{item.score}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Leaderboard
