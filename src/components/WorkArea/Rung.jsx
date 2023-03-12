import DragLandingPad from "./DragLandingPad";
import Branch from "./Branch";
import { useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "use-onclickoutside";
import { getRungElement, getRungChild } from "../../store/selectors";
import { deleteRung } from "../../store/actions";
import { hasDestructiveChild } from "./Branch";

const findExtraLandingPadLoc = (state, id) => {
  const ele = getRungElement(state, id);

  const destructives = ele.children.map((child) =>
    hasDestructiveChild(state, child)
  );

  const index = destructives.indexOf(true);
  return index > -1 ? index : 0;
};

export default function Rung({ id, state, number }) {
  const [mainRungWidth, setMainRungWidth] = useState(0);
  const codeRef = useRef(null);
  const rungRef = useRef(null);
  const windowSize = useWindowSize();
  const [rungSelected, setRungSelected] = useState(false);

  const rung = getRungElement(state, id);
  const child = getRungChild(state, id);

  const extraLandingPadLoc = findExtraLandingPadLoc(state, child.id);

  const handleClick = () => {
    setRungSelected(true);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 46) {
      deleteRung(rung);
      setRungSelected(false);
    }
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
        {number}
      </div>
      <div className="rung-comment"></div>
      <div className="rung-code" ref={codeRef}>
        <div
          className="rung-main-rung"
          style={{ minWidth: `${mainRungWidth}px` }}
        >
          <div className="rung-line"></div>
          <div className="rung-instruction-wrapper rung-instruction-test">
            {extraLandingPadLoc === 0 && (
              <DragLandingPad
                parent={child.id}
                index={0}
                extra={extraLandingPadLoc}
              />
            )}
            <DragLandingPad parent={child.id} index={child.children.length} />
            <Branch
              id={child.id}
              state={state}
              extraLandingPadLoc={extraLandingPadLoc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
