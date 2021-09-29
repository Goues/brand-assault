import logo from './logo.svg';
import IdleApp from './IdleApp'
import TowerDefenseApp from './TowerDefense/TowerDefenseApp'
import UiApp from './UiApp'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="100" alt="logo" /> Brand assault
      </header>
      <div className="App-stage">
        <IdleApp/>
        <UiApp/>
        <TowerDefenseApp/>
      </div>
    </div>
  );
}

export default App;
