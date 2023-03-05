import DragLandingPad from "./DragLandingPad";
import Branch from "./Branch";
import { useLayoutEffect, useRef, useState, useContext } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "use-onclickoutside";
import { RungsDispatchContext } from "./RungsContext";

export default function Rung({number, rungData}) {
  const [mainRungWidth, setMainRungWidth] = useState(0);
  const codeRef = useRef(null);
  const rungRef = useRef(null);
  const windowSize = useWindowSize();
  const [rungSelected, setRungSelected] = useState(false);
  const dispatch = useContext(RungsDispatchContext);


  const handleClick = () => {
    setRungSelected(true);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 46) {
      dispatch({
        type: "deleted",
        path: [number],
        elementType: "Rung"
      })

      setRungSelected(false);
    }
  }

  useOnClickOutside(rungRef, () => {
    setRungSelected(false);
  });

  useLayoutEffect(() => {
    setMainRungWidth(codeRef.current.offsetWidth - 55);
  }, [windowSize]);

  return (
    <div className={"rung" + (rungSelected ? " selected" : "")}>
        <div 
          ref={rungRef} 
          className="rung-number" 
          onClick={handleClick}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          {number}
        </div>
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