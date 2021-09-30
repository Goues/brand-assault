import css from "./index.module.css";

export default function Enemy({name, description, icon}) {
    return <div className={css.enemy}>
        <div>
            <div className={css.enemyName}>{name}</div>
            <div className={css.enemyDescription}>{description}</div>
        </div>
        <img className={css.enemyIcon} src={icon} alt={name}/>
    </div>
}
