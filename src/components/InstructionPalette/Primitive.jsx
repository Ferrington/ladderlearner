import { setDragState } from "../../store/actions";
import { useState } from "react";

export default function Primitive({ type, text }) {
  const [whichDragging, setWhichDragging] = useState(null);

  const drag = (e, instruct) => {
    const data = {
      actionType: "add",
      type: "Instruction",
      tag: null,
      name: instruct,
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(data));

    setDragState(true);
    setWhichDragging(instruct);
  };

  const dragEnd = (e) => {
    setDragState(false);
    setWhichDragging(null);
  };

  return (
    <div
      className={
        "rung-instruction draggable" +
        (whichDragging === type ? " dragging" : "")
      }
      draggable="true"
      onDragStart={(e) => drag(e, type)}
      onDragEnd={dragEnd}
    >
      <img
        className="rung-img"
        src={`/static/imgs/${type}.png`}
        alt=""
        draggable="false"
      />
      <h5>{text}</h5>
    </div>
  );
}
