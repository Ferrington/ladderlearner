import DragLandingPad from "./DragLandingPad";
import Branch from "./Branch";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "use-onclickoutside";
import { useSelector } from "react-redux";
import { makeSelectElementById } from "../../store/workspaceSlice";

export default function Rung({ id }) {
  const [mainRungWidth, setMainRungWidth] = useState(0);
  const codeRef = useRef(null);
  const rungRef = useRef(null);
  const windowSize = useWindowSize();
  const [rungSelected, setRungSelected] = useState(false);

  const rungSelectElementById = useMemo(makeSelectElementById, []);
  const childSelectElementById = useMemo(makeSelectElementById, []);
  const rung = useSelector((state) => rungSelectElementById(state, id));
  const child = useSelector((state) =>
    childSelectElementById(state, rung.child)
  );

  const handleClick = () => {
    setRungSelected(true);
  };

  const handleKeyPress = (e) => {
    // if (e.keyCode === 46) {
    // dispatch({
    //   type: "deleted",
    //   path: [number],
    //   elementType: "Rung",
    // });
    //   setRungSelected(false);
    // }
  };

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
        {rung.number}
      </div>
      <div className="rung-comment"></div>
      <div className="rung-code" ref={codeRef}>
        <div
          className="rung-main-rung"
          style={{ minWidth: `${mainRungWidth}px` }}
        >
          <div className="rung-line"></div>
          <div className="rung-instruction-wrapper rung-instruction-test">
            <DragLandingPad parent={rung.child} index={child.children.length} />
            <Branch id={rung.child} parent={rung} />
          </div>
        </div>
      </div>
    </div>
  );
}
