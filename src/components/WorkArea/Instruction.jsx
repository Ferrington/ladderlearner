import { useRef, useState } from "react";
import DragLandingPad from "./DragLandingPad";
import useOnClickOutside from "use-onclickoutside";
import { useContext } from "react";
import { RungsDispatchContext } from "./RungsContext";

export default function Instruction({data, path}) {
  const dispatch = useContext(RungsDispatchContext);

  const tagRef = useRef(null);
  const [tagClicked, setTagClicked] = useState(false);
  const instructionRef = useRef(null);
  const [instructionClicked, setInstructionClicked] = useState(false);

  useOnClickOutside(tagRef, () => {
    setTagClicked(false);
  });
  
  useOnClickOutside(instructionRef, () => {
    setInstructionClicked(false);
  });

  const handleClick = (e) => {
    if (e.target.tagName === "H5") {
      setTagClicked(true);
      setInstructionClicked(false);
    } else {
      setInstructionClicked(true);
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 46)
      dispatch({
        type: "deleted",
        path,
        elementType: data.type
      });
  }

  let instructionClass = "rung-instruction";
  instructionClass += instructionClicked ? " selected" : "";

  let h5Class = "";
  h5Class += tagClicked ? " selected" : "";
  h5Class += data.tag == null ? " unassigned" : "";

  return (
    <div 
      ref={instructionRef}
      className={instructionClass}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <DragLandingPad 
        path={path}
      />
      <img 
        className="rung-img" 
        src={`/static/imgs/${data.name}.png`} 
        alt="{data.name}" 
      />
      <h5
        ref={tagRef}
        className={h5Class}
        onClick={handleClick}
      >
        {data.tag ?? "Assign Tag"}
      </h5>
    </div>
  );
}