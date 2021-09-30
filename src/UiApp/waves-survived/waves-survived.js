import {ReactComponent as MuscleIcon} from './muscle.svg';

import css from "./waves-survived.module.css";

export default function WavesSurvived({survived}) {
    return <div className={css.wavesSurvived}>
        <MuscleIcon />
        <div className={css.wavesSurvivedText}>Waves survived: {survived}</div>
    </div>
}
