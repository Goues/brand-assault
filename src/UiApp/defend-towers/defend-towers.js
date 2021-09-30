import {ReactComponent as DatabaseIcon} from './database.svg';

import css from "./defend-towers.module.css";

export default function DefendTowers({towers, maxTowers}) {
    return <div className={css.defendTowers}>
        <DatabaseIcon />
        <div class={css.defendTowersText}>Defend towers: {towers}/{maxTowers}</div>
    </div>
}
