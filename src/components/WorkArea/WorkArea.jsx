import { useSelector } from "react-redux";
import { selectAllRungIds } from "../../store/workspaceSlice";

import "./WorkArea.css";
import Rung from "./Rung";

export default function WorkArea() {
  const rungs = useSelector(selectAllRungIds);

  return (
    <div className="WorkArea">
      {rungs.map((rung) => {
        return <Rung key={rung} id={rung} />;
      })}
    </div>
  );
}
