import { ReactComponent as DatabaseIcon } from './database.svg'
import Tippy from '@tippyjs/react'

import css from './defend-towers.module.css'

const Dialog = () => {
  return <div className={css.dialog}>Built towers / Max towers</div>
}

export default function DefendTowers({ towers, maxTowers }) {
  return (
    <div className={css.defendTowers}>
      <DatabaseIcon />
      <Tippy content={<Dialog />}>
        <div class={css.defendTowersText}>
          Defend towers: {towers}/{maxTowers}
        </div>
      </Tippy>
    </div>
  )
}
