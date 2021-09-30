import { useEffect } from "react";
import IdleApp from "./IdleApp";
import TowerDefenseApp from "./TowerDefense/TowerDefenseApp";
import UiApp from "./UiApp";
import "./App.css";
import WorldMap from "./WorldMap"
import * as clock from "./clock";
import GameOver from "./GameOver";
import GamePaused from "./GamePaused";

function App() {
  useEffect(() => {
    const listener = () => {
      if (document.visibilityState !== "visible") {
        clock.stop();
      }
    };
    document.addEventListener("visibilitychange", listener);
    return () => document.removeEventListener("visibilitychange", listener);
  }, []);
  useEffect(() => {
    const listener = (e) => {
      if (e.keyCode === 80) { // p
        clock.stop();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);
  return (
    <div className="App">
      <GamePaused />
      <GameOver />
      <div className="Game">
        <div className="App-stage">
          <div className="App-idle">
            <IdleApp />
          </div>
          <div className="App-td">
            <TowerDefenseApp />
          </div>
          <div className="App-ui">
            <UiApp />
          </div>
        </div>
      </div>
      <WorldMap />
    </div>
  );
}

export default App;
