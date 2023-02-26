import './App.css';
import './instruction.css';
import { WorkArea } from './components/WorkArea/WorkArea';
import { InstructionPalette } from './components/InstructionPalette/InstructionPalette';

function App() {
  return (
    <div className="App">
      <div className="simulation"></div>
      <InstructionPalette />
      <WorkArea />
    </div>
  );
}

export default App;
