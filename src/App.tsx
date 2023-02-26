import './App.css';
import { WorkArea } from './components/WorkArea/WorkArea';

function App() {
  return (
    <div className="App">
      <div className="simulation"></div>
      <div className="instruction-palette"></div>
      <WorkArea />
    </div>
  );
}

export default App;
