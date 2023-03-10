import "./WorkArea.css";
import Rung from "./Rung";
import { useSnapshot } from "valtio";
import { store } from "../../store/store";

export default function WorkArea() {
  const state = useSnapshot(store.rungs);

  return (
    <div className="WorkArea">
      {state.rungs.allIds.map((rung, i) => {
        return <Rung key={rung} id={rung} state={state} number={i + 1} />;
      })}
    </div>
  );
}
