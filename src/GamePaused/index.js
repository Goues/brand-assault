import { useSelector } from "react-redux";
import Button from "../Button";
import { isGameOver } from "../credits";
import css from "./index.module.css";
import { run } from "../clock";

function GameOver() {
  const running = useSelector((state) => state.controls.running);
  const gameOver = useSelector(isGameOver);

  if (running || gameOver) return ''

  return (
    <div className={css.wrapper}>
        <div className={css.modal}>
          <img className={css.image} src='/game_paused.gif' alt='Game over' width='371'/>
          <div className={css.heading}>Paused</div>
          <div className={css.buttons}>
            <Button onClick={run}>Resume</Button>
            <Button onClick={() => {window.location.reload()}}>Restart</Button>
          </div>
        </div>
    </div>
  );
}

export default GameOver;
