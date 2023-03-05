import DragLandingPad from "./DragLandingPad";
import Branch from "./Branch";
import { useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";


export default function Rung({number, rungData}) {
  const [mainRungWidth, setMainRungWidth] = useState(0);
  const codeRef = useRef(null);
  const windowSize = useWindowSize();

  useLayoutEffect(() => {
    setMainRungWidth(codeRef.current.offsetWidth - 55);
  }, [windowSize]);

  return (
    <div className="rung">
        <div className="rung-number">{number}</div>
        <div className="rung-comment"></div>
        <div className="rung-code" ref={codeRef}>
          <div className="rung-main-rung" style={{"minWidth": `${mainRungWidth}px`}}>
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