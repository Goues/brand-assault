import { useState } from "react";
import logo from "./logo.svg";
import IdleApp from "./IdleApp";
import TowerDefenseApp from "./TowerDefense/TowerDefenseApp";
import UiApp from "./UiApp";
import "./App.css";

function App() {
  // TODO have shared state
  const [credits, setCredits] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="100" alt="logo" /> Brand assault
      </header>
      <div className="App-stage">
        <div className="App-idle">
          <IdleApp credits={credits} setCredits={setCredits} />
        </div>
        <div className="App-td">
          <TowerDefenseApp />
        </div>
        <div className="App-ui">
          <UiApp />
        </div>
      </div>
    </div>
  );
}

export default App;
