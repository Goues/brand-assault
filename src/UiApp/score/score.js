import { useSelector } from 'react-redux'
import css from './score.module.css'

export default function WavesSurvived({ survived }) {
	const score = useSelector((state) => state.stats.score)

	return (
		<div className={css.score}>
			Score:
			<div className={css.scoreValue}>{score}</div>
		</div>
	)
}
