import { useRef, useState } from "react";
import DragLandingPad from "./DragLandingPad";
import useOnClickOutside from "use-onclickoutside";
import { useContext, useMemo } from "react";
import { RungsDispatchContext } from "./RungsContext";

import { useSelector } from "react-redux";
import { makeSelectElementById } from "../../store/workspaceSlice";

export default function Instruction({ id, parent }) {
  const dispatch = useContext(RungsDispatchContext);

  const tagRef = useRef(null);
  const [tagSelected, setTagSelected] = useState(false);
  const instructionRef = useRef(null);
  const [instructionSelected, setInstructionSelected] = useState(false);

  const instructionSelectElementById = useMemo(makeSelectElementById, []);
  const instruction = useSelector((state) =>
    instructionSelectElementById(state, id)
  );

  useOnClickOutside(tagRef, () => {
    setTagSelected(false);
  });

  useOnClickOutside(instructionRef, () => {
    setInstructionSelected(false);
  });

  const drag = (e, data, path) => {
    data.actionType = "move";
    data.path = path;
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
    e.target.classList.add("dragging");
    [...document.querySelectorAll(".landing-pad")].forEach((ele) =>
      ele.classList.remove("hidden")
    );
    e.target.querySelector(".landing-pad").classList.add("hidden");
  };

  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    [...document.querySelectorAll(".landing-pad")].forEach((ele) => {
      ele.classList.add("hidden");
      ele.classList.remove("go-for-landing");
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.tagName === "H5") {
      setTagSelected(true);
      setInstructionSelected(false);
    } else {
      setInstructionSelected(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 46)
      dispatch({
        type: "deleted",
        path: null,
        elementType: instruction.type,
      });
  };

  let instructionClass = "rung-instruction";
  instructionClass += instructionSelected ? " selected" : "";
  instructionClass += isDestructive(instruction.name) ? " destructive" : "";

  let h5Class = "";
  h5Class += tagSelected ? " selected" : "";
  h5Class += instruction.tag == null ? " unassigned" : "";

  return (
    <div
      ref={instructionRef}
      className={instructionClass}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      draggable="true"
      onDragStart={(e) => drag(e, instruction, null)}
      onDragEnd={dragEnd}
    >
      <DragLandingPad parent={parent.id} index={parent.children.indexOf(id)} />
      <img
        className="rung-img"
        src={`/static/imgs/${instruction.name}.png`}
        alt="{instruction.name}"
        draggable="false"
      />
      <h5 ref={tagRef} className={h5Class} onClick={handleClick}>
        {instruction.tag ?? "Assign Tag"}
      </h5>
    </div>
  );
}

function isDestructive(name) {
  const destructiveList = ["OTE", "OTL", "OTU"];

  return destructiveList.includes(name);
}
