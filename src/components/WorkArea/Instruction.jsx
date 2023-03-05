import { useRef, useState } from "react";
import DragLandingPad from "./DragLandingPad";
import useOnClickOutside from "use-onclickoutside";
import { useContext } from "react";
import { RungsDispatchContext } from "./RungsContext";

export default function Instruction({data, path}) {
  const dispatch = useContext(RungsDispatchContext);

  const tagRef = useRef(null);
  const [tagSelected, setTagSelected] = useState(false);
  const instructionRef = useRef(null);
  const [instructionSelected, setInstructionSelected] = useState(false);

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
    e.target.classList.add('dragging');
    [...document.querySelectorAll('.landing-pad')].forEach(ele => ele.classList.remove('hidden'));
    e.target.querySelector('.landing-pad').classList.add('hidden');
  };
  
  const dragEnd = (e) => {
    e.target.classList.remove('dragging');
    [...document.querySelectorAll('.landing-pad')].forEach(ele => {
      ele.classList.add('hidden');
      ele.classList.remove('go-for-landing');
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.tagName === "H5") {
      setTagSelected(true);
      setInstructionSelected(false);
    } else {
      setInstructionSelected(true);
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
  instructionClass += instructionSelected ? " selected" : "";
  instructionClass += isDestructive(data.name) ? " destructive" : "";

  let h5Class = "";
  h5Class += tagSelected ? " selected" : "";
  h5Class += data.tag == null ? " unassigned" : "";

  return (
    <div 
      ref={instructionRef}
      className={instructionClass}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      draggable="true"
      onDragStart={(e) => drag(e, data, path)}
      onDragEnd={dragEnd}
    >
      <DragLandingPad
        path={path}
      />
      <img 
        className="rung-img" 
        src={`/static/imgs/${data.name}.png`} 
        alt="{data.name}" 
        draggable="false"
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

function isDestructive(name) {
  const destructiveList = [
    "OTE",
    "OTL",
    "OTU",
  ]

  return destructiveList.includes(name);
}