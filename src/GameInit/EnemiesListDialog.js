import Enemy from "./Enemy";
import css from "./index.module.css";

export default function EnemiesListDialog() {
        return <div className={css.enemiesList}>
            <Enemy name={'negative comments'} description={'Basic enemy, deals damage to your Brand'} icon='./comment_negative.png' />
            <Enemy name={'neutral comments'} description={"Doesn't do any damage, but starts again as negative comment if it reaches your Brand"} icon='./comment_neutral.png' />
            <Enemy name={'hater'} description={"Doesn't do much damage, but until destroyed, spawns new negative comments"} icon='./hater.png' />
            <Enemy name={'influencer'} description={'Dangerous opponent, boss. Fight every 10th wave. They spawn many negative comments and is hard to kill.'} icon='./influencer.png' />
        </div>
}

