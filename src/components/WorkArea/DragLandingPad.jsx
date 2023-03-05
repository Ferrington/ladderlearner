import { useContext } from "react";
import { RungsDispatchContext } from "./RungsContext";

export default function DragLandingPad({path}) {
  const dispatch = useContext(RungsDispatchContext);

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
    [...document.querySelectorAll('.landing-pad')].forEach(ele => {
      ele.classList.add('hidden');
      ele.classList.remove('go-for-landing');
    });

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (data.actionType === "add")
      dispatch({
        type: "added",
        path,
        data
      });
    else if (data.actionType === "move")
      dispatch({
        type: "moved",
        path,
        data
      })
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