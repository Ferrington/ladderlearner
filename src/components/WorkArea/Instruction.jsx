import { useRef, useState, useEffect } from "react";
import DragLandingPad from "./DragLandingPad";
import useOnClickOutside from "use-onclickoutside";
import { getRungElement } from "../../store/selectors";
import { deleteInstruction, setDragState } from "../../store/actions";
import { useSnapshot } from "valtio";
import { store } from "../../store/store";

export default function Instruction({ id, state, children }) {
  const instruction = getRungElement(state, id);
  const parent = getRungElement(state, instruction.parent);

  const tagRef = useRef(null);
  const [tagSelected, setTagSelected] = useState(false);
  const instructionRef = useRef(null);
  const [instructionSelected, setInstructionSelected] = useState(false);
  const [beingDragged, setBeingDragged] = useState(false);
  const [lookinClickable, setLookinClickable] = useState(false);
  const [tagLookinClickable, setTagLookinClickable] = useState(false);

  const { weDraggin } = useSnapshot(store);

  useEffect(() => {
    if (!weDraggin) setBeingDragged(false);
  }, [weDraggin]);

  useOnClickOutside(tagRef, () => {
    setTagSelected(false);
  });

  useOnClickOutside(instructionRef, () => {
    setInstructionSelected(false);
  });

  const drag = (e, data) => {
    data.actionType = "move";
    e.dataTransfer.dropEffect = "copy";
    e.dataTransfer.setData("text/plain", JSON.stringify(data));

    setDragState(true);
    setBeingDragged(true);
  };

  const dragEnd = (e) => {
    setDragState(false);
    setBeingDragged(false);
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

  const lookClickable = (e) => {
    if (e.target.tagName !== "H5") setLookinClickable(true);
    else setLookinClickable(false);
  };

  const dontLookClickable = () => {
    setLookinClickable(false);
  };

  const tagLookClickable = () => {
    setTagLookinClickable(true);
  };

  const tagDontLookClickable = () => {
    setTagLookinClickable(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 46) deleteInstruction(instruction);
  };

  let instructionClass = "rung-instruction";
  instructionClass += instructionSelected ? " selected" : "";
  instructionClass += instruction.isDestructive ? " destructive" : "";
  instructionClass += beingDragged ? " dragging" : "";
  instructionClass += lookinClickable ? " clickable" : "";

  let h5Class = "";
  h5Class += tagSelected ? " selected" : "";
  h5Class += instruction.tag == null ? " unassigned" : "";
  h5Class += tagLookinClickable ? " clickable" : "";

  return (
    <div
      ref={instructionRef}
      className={instructionClass}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      draggable="true"
      onDragStart={(e) => drag(e, instruction)}
      onDragEnd={dragEnd}
      onMouseOver={lookClickable}
      onMouseLeave={dontLookClickable}
    >
      {!beingDragged && (
        <DragLandingPad
          parent={parent.id}
          index={parent.children.indexOf(id)}
        />
      )}
      <img
        className="rung-img"
        src={`/static/imgs/${instruction.name}.png`}
        alt="{instruction.name}"
        draggable="false"
      />
      <h5
        ref={tagRef}
        className={h5Class}
        onClick={handleClick}
        onMouseOver={tagLookClickable}
        onMouseLeave={tagDontLookClickable}
      >
        {instruction.tag ?? "Assign Tag"}
      </h5>
      {!beingDragged && children}
    </div>
  );
}
