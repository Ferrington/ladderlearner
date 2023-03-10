import "./WorkArea.css";
import Rung from "./Rung";
import { useSnapshot } from "valtio";
import { state } from "../../store/store";

export default function WorkArea() {
  const workSpaceState = useSnapshot(state.rungs);

  return (
    <div className="WorkArea">
      {workSpaceState.rungs.allIds.map((rung) => {
        return <Rung key={rung} id={rung} state={workSpaceState} />;
      })}
    </div>
  );
}
