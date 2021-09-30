import { useSelector } from "react-redux";
import Button from "../Button";
import { isGameOver } from "../credits";
import css from "./index.module.css";
import { run } from "../clock";

function GameOver() {
  const skip = useSelector((state) => {
    return state.controls.running || !state.controls.started
  });
  const gameOver = useSelector(isGameOver);

  if (skip || gameOver) return ''

  return (
    <div className={css.wrapper}>
        <div className={css.modal}>
          <img className={css.image} src='/game_paused.gif' alt='Game over' width='371'/>
          <div className={css.heading}>Paused</div>
          <div className={css.buttons}>
            <Button onClick={() => {window.location.reload()}} isSecondary>Restart</Button>
            <Button onClick={run}>Resume</Button>
          </div>
        </div>
    </div>
  );
}

export default GameOver;
