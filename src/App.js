import { useEffect } from "react";
import logo from "./logo.svg";
import IdleApp from "./IdleApp";
import TowerDefenseApp from "./TowerDefense/TowerDefenseApp";
import UiApp from "./UiApp";
import "./App.css";
import WorldMap from "./WorldMap"
import * as clock from "./clock";
import GameOver from "./GameOver";

function App() {
  useEffect(() => {
    const listener = () => {
      if (document.visibilityState === "visible") {
        clock.run();
      } else {
        clock.stop();
      }
    };
    document.addEventListener("visibilitychange", listener);
    return () => document.removeEventListener("visibilitychange", listener);
  }, []);
  return (
    <div className="App">
      <GameOver />
      <div className="Game">
        <header className="App-header">
          <img src={logo} width="100" alt="logo" /> Brand assault
        </header>
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
