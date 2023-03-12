import { setDragState } from "../../store/actions";
import "./InstructionPalette.css";
import { useState } from "react";

export default function InstructionPalette() {
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
    <div className="instruction-palette">
      <div
        className={
          "rung-instruction draggable" +
          (whichDragging === "XIC" ? " dragging" : "")
        }
        draggable="true"
        onDragStart={(e) => drag(e, "XIC")}
        onDragEnd={dragEnd}
      >
        <img
          className="rung-img"
          src={"/static/imgs/XIC.png"}
          alt=""
          draggable="false"
        />
        <h5>Normally Open</h5>
      </div>

      <div
        className={
          "rung-instruction draggable" +
          (whichDragging === "XIO" ? " dragging" : "")
        }
        draggable="true"
        onDragStart={(e) => drag(e, "XIO")}
        onDragEnd={dragEnd}
      >
        <img
          className="rung-img"
          src={"/static/imgs/XIO.png"}
          alt=""
          draggable="false"
        />
        <h5>Normally Closed</h5>
      </div>

      <div
        className={
          "rung-instruction draggable" +
          (whichDragging === "OTE" ? " dragging" : "")
        }
        draggable="true"
        onDragStart={(e) => drag(e, "OTE")}
        onDragEnd={dragEnd}
      >
        <img
          className="rung-img"
          src={"/static/imgs/OTE.png"}
          alt=""
          draggable="false"
        />
        <h5>Energize Coil</h5>
      </div>
    </div>
  );
}
