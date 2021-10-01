import { ReactComponent as DatabaseIcon } from './database.svg'
import Tippy from '@tippyjs/react'

import css from './defend-towers.module.css'

const Dialog = () => {
	return <div className={css.dialog}>Built agents / Max agents</div>
}

export default function DefendTowers({ towers, maxTowers }) {
	return (
		<div className={css.defendTowers}>
			<DatabaseIcon />
			<Tippy content={<Dialog />}>
				<div className={css.defendTowersText}>
					Defend agents: {towers}/{maxTowers}
				</div>
			</Tippy>
		</div>
	)
}
