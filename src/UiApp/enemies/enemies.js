import css from "./enemies.module.css";

export default function Enemies() {
    return <div className={css.enemies}>
        <h1 className={css.header}>Enemies</h1>
        <div className={css.enemiesList}>
            <Enemy name={'negative comments'} description={'Basic enemy, deals damage to your Brand'} icon='./comment_negative.png' />
            <Enemy name={'neutral comments'} description={"Doesn't do any damage, but starts again as negative comment if it reaches your Brand"} icon='./comment_neutral.png' />
            <Enemy name={'positive comments'} description={'Gives you credit when it reaches your Brand, so make sure to not have too many "splash damage" that can kill it'} icon='./comment_positive.png' />
            <Enemy name={'hater'} description={"Doesn't do much damage, but until destroyed, spawns new negative comments"} icon='./hater.png' />
            <Enemy name={'influencer'} description={'Dangerous opponent, boss. Fight every 10th wave. They spawn many negative comments and is hard to kill.'} icon='./influencer.png' />
        </div>
    </div>
}

function Enemy({name, description, icon}) {
    return <div className={css.enemy}>
        <div>
            <div className={css.enemyName}>{name}</div>
            <div className={css.enemyDescription}>{description}</div>
        </div>
        <img className={css.enemyIcon} src={icon} alt={name}/>
    </div>
}
