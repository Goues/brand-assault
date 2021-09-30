import {ReactComponent as PauseIcon} from './pause.svg';

import css from "./pause.module.css";

export default function Pause({isRunning, onPause}) {
    return (<>
        {isRunning && <button className={css.pause} onClick={onPause}><PauseIcon/><div class={css.pauseText}>Pause game</div></button>}
    </>)
}
