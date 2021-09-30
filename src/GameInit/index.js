import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { run } from "../clock";
import { setPlayerName } from "../controls";
// import { isGameOver } from "../credits";
import css from "./index.module.css";


function FirstStep({next}) {
  return (
    <div>
      <div className={css.heading}>Welcome to the Brand Defenders</div>
      <Button onClick={next}>Let's create your brand!</Button>
    </div>
  );
}

function SecondStep({next}) {
  const [playerName, setPlayerName] = useState('')
  const changePlayerName = useCallback((event) => {
    setPlayerName(event.target.value)
  }, [setPlayerName])

  return (
    <div>
      <input placeholder="Create a name for your brand" type="text" className={css.heading} value={playerName} onChange={changePlayerName} />
      <Button disabled={!playerName} onClick={() => next(playerName)}>Let's create your brand!</Button>
    </div>
  );
}

function GameOver() {
  const gameStarted = useSelector((state) => state.controls.started);
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)

  if (gameStarted) return ''

  return (
    <div className={css.wrapper}>
        <div className={css.modal}>
          {step === 0 && <FirstStep next={() => setStep(1)} />}
          {step === 1 && <SecondStep next={(playerName) => {
            dispatch(setPlayerName(playerName))
            run()
          }} />}
        </div>
    </div>
  );
}

export default GameOver;
