import { useSelector } from "react-redux";
import Button from "../Button";
import { isGameOver } from "../credits";
import css from "./index.module.css";

function GameOver() {
  const gameOver = useSelector(isGameOver);

  if (!gameOver) return ''

  return (
    <div className={css.wrapper}>
        <div className={css.modal}>
          <img className={css.image} src='/gameover.gif' alt='Game over' width='371'/>
          <div className={css.heading}>Game Over!</div>
          <div className={css.score}>Your final score: 0</div>
          <div className={css.better}>You can make better.</div>
          <Button onClick={() => {window.location.reload()}}>Let's try it again!</Button>
        </div>
    </div>
  );
}

export default GameOver;
