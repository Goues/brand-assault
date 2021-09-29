import logo from './logo.svg';
import IdleApp from './IdleApp'
import TowerDefenseApp from './TowerDefenseApp'
import UiApp from './UiApp'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="100" alt="logo" /> Brand assault
      </header>
      <div style={{display: 'flex'}}>
        <div>

        <IdleApp/>
        <UiApp/>
        </div>
        <div>
        <TowerDefenseApp/>
        </div>
      </div>
    </div>
  );
}

export default App;
