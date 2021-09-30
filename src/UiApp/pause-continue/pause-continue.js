import {ReactComponent as PauseIcon} from './pause.svg';
import {ReactComponent as PlayIcon} from './play.svg';

import css from "./pause-continue.module.css";

export default function PauseContinue({isRunning, onPause, onContinue}) {
    return (<>
        {isRunning
            ? <button className={css.pauseContinue} onClick={onPause}><PauseIcon/><div class={css.pauseContinueText}>Pause game</div></button>
            : <div className={css.pauseContinue} onClick={onContinue}><PlayIcon /><div class={css.pauseContinueText}>Continue</div></div>
        }
    </>)
}
