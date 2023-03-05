import DragLandingPad from "./DragLandingPad";

export default function Instruction({data, path}) {
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
      <h5>{data.tag ?? "Assign Tag"}</h5>
    </div>
  );
}