import "./App.css";
import "./instruction.css";
import WorkArea from "./components/WorkArea/WorkArea";
import InstructionPalette from "./components/InstructionPalette/InstructionPalette";
import { RungsProvider } from "./components/WorkArea/RungsContext";

function App() {
  return (
    <div className="App">
      <RungsProvider>
        <div className="simulation"></div>
        <InstructionPalette />
        <WorkArea />
      </RungsProvider>
    </div>
  );
}

export default App;
