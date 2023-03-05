import { useRef, useState } from "react";
import DragLandingPad from "./DragLandingPad";
import useOnClickOutside from "use-onclickoutside";

export default function Instruction({data, path}) {
  const tagRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const handleTagClick = (e) => {
    setClicked(true);
  }

  useOnClickOutside(tagRef, () => {
    setClicked(false);
  });

  return (
    <div className="rung-instruction">
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
        className={clicked ? "selected" : ""}
        onClick={handleTagClick}
      >
        {data.tag ?? "Assign Tag"}
      </h5>
    </div>
  );
}