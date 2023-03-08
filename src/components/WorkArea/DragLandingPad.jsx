import { useContext } from "react";
import { RungsDispatchContext } from "./RungsContext";
import { useDispatch } from "react-redux";
import { addInstruction } from "../../store/workspaceSlice";

export default function DragLandingPad({ path }) {
  const dispatch = useContext(RungsDispatchContext);
  const dispatch2 = useDispatch();

  const goodToDrop = (e) => {
    e.preventDefault();
    e.target.classList.add("go-for-landing");
  };
  const abortLanding = (e) => {
    e.target.classList.remove("go-for-landing");
  };
  const overDragTarget = (e) => {
    e.preventDefault();
  };
  const dropped = (e) => {
    [...document.querySelectorAll(".landing-pad")].forEach((ele) => {
      ele.classList.add("hidden");
      ele.classList.remove("go-for-landing");
    });

    const instruction = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (instruction.actionType === "add")
      dispatch2(
        addInstruction({
          path,
          instruction,
        })
      );
    else if (instruction.actionType === "move")
      dispatch({
        type: "moved",
        path,
        instruction,
      });
  };

  return (
    <div
      className="landing-pad hidden"
      onDragEnter={goodToDrop}
      onDragOver={overDragTarget}
      onDragLeave={abortLanding}
      onDrop={dropped}
    >
      <div className="landing-beacon"></div>
    </div>
  );
}
