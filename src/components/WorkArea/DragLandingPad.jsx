import { useSnapshot } from "valtio";
import { store } from "../../store/store";
import { addInstruction, moveInstruction } from "../../store/actions";
import { useEffect, useState } from "react";

export default function DragLandingPad({ parent, index, extra }) {
  const [goForLanding, setGoForLanding] = useState(false);

  const { weDraggin } = useSnapshot(store);

  useEffect(() => {
    if (!weDraggin) setGoForLanding(false);
  }, [weDraggin]);

  const goodToDrop = (e) => {
    e.preventDefault();
    setGoForLanding(true);
  };
  const abortLanding = (e) => {
    setGoForLanding(false);
  };
  const overDragTarget = (e) => {
    e.preventDefault();
  };
  const dropped = (e) => {
    const instruction = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (instruction.actionType === "add") {
      addInstruction({
        ...instruction,
        parent,
        index,
      });
    } else if (instruction.actionType === "move") {
      moveInstruction({
        ...instruction,
        newParent: parent,
        oldParent: instruction.parent,
        index,
      });
    }
  };

  let id = null;
  if (extra === 0) id = "extra-landing-pad-first-ele";
  if (extra >= 1) id = "extra-landing-pad";

  return (
    weDraggin && (
      <div
        id={id}
        className={"landing-pad" + (goForLanding ? " go-for-landing" : "")}
        onDragEnter={goodToDrop}
        onDragOver={overDragTarget}
        onDragLeave={abortLanding}
        onDrop={dropped}
      >
        <div className="landing-beacon"></div>
      </div>
    )
  );
}
