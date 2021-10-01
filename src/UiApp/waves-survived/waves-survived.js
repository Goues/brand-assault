import css from './waves-survived.module.css'

export default function WavesSurvived({ survived }) {
	return (
		<div className={css.wavesSurvived}>
			<div className={css.wavesSurvivedText}>Waves survived: {survived}</div>
		</div>
	)
}
