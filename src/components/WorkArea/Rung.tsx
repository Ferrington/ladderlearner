import { RungManager } from "../../classes/RungManager";
import { DragLandingPad } from "./DragLandingPad";

interface RungProps {
  number: number;
  rungData: string;
  dropUpdate: any;
}

export function Rung({number, rungData, dropUpdate}: RungProps) {
  const rungManager = new RungManager(rungData);

  return (
    <div className="rung">
        <div className="rung-number">{number}</div>
        <div className="rung-comment"></div>
        <div className="rung-code">
          <div className="rung-main-rung">
            <div className="rung-line"></div>
            <div className="rung-instruction-wrapper rung-instruction-test">
              <DragLandingPad />
              {rungManager.renderRung()}
              
            </div>
          </div>
        </div>
      </div>
  );
}