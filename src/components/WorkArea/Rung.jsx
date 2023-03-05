import DragLandingPad from "./DragLandingPad";
import Branch from "./Branch";

export default function Rung({number, rungData}) {
  return (
    <div className="rung">
        <div className="rung-number">{number}</div>
        <div className="rung-comment"></div>
        <div className="rung-code">
          <div className="rung-main-rung">
            <div className="rung-line"></div>
            <div className="rung-instruction-wrapper rung-instruction-test">
              <DragLandingPad 
                path={[number, "last"]}
              />
              <Branch 
                data={rungData} 
                path={[number]}
              />     
            </div>
          </div>
        </div>
      </div>
  );
}