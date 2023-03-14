import DragLandingPad from "./DragLandingPad";
import RungDragLandingPad from "./RungDragLandingPad";
import Branch from "./Branch";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "use-onclickoutside";
import { getRungElement, getRungChild } from "../../store/selectors";
import { deleteRung, setRungDragState } from "../../store/actions";
import { hasDestructiveChild } from "./Branch";
import { useSnapshot } from "valtio";
import { store } from "../../store/store";

const findExtraLandingPadLoc = (state, id) => {
  const ele = getRungElement(state, id);

  const destructives = ele.children.map((child) =>
    hasDestructiveChild(state, child)
  );

  const index = destructives.indexOf(true);
  return index > -1 ? index : 0;
};

export default function Rung({ id, state, number }) {
  // local state
  const [rungSelected, setRungSelected] = useState(false);
  const [lookinClickable, setLookinClickable] = useState(false);
  const [beingDragged, setBeingDragged] = useState(false);
  const [mainRungWidth, setMainRungWidth] = useState(0);
  const [target, setTarget] = useState(null);

  // derived state
  const rung = getRungElement(state, id);
  const child = getRungChild(state, id);
  const extraLandingPadLoc = findExtraLandingPadLoc(state, child.id);
  const { weDragginRungs } = useSnapshot(store);

  // refs
  const codeRef = useRef(null);
  const rungRef = useRef(null);

  // misc
  const windowSize = useWindowSize();

  useEffect(() => {
    if (!weDragginRungs) setBeingDragged(false);
  }, [weDragginRungs]);

  const handleClick = () => {
    setRungSelected(true);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 46) {
      deleteRung(rung);
      setRungSelected(false);
    }
  };

  const lookClickable = (e) => {
    setLookinClickable(true);
  };

  const dontLookClickable = () => {
    setLookinClickable(false);
  };

  const drag = (e, data, rungRef) => {
    if (!rungRef.current.contains(target)) {
      e.preventDefault();
      return;
    }

    data.actionType = "move";
    e.dataTransfer.dropEffect = "copy";
    e.dataTransfer.setData("text/plain", JSON.stringify(data));

    setRungDragState(true);
    setBeingDragged(true);
  };

  const dragEnd = (e) => {
    setRungDragState(false);
    setBeingDragged(false);
  };

  useOnClickOutside(rungRef, () => {
    setRungSelected(false);
  });

  useLayoutEffect(() => {
    setMainRungWidth(codeRef.current.offsetWidth - 55);
  }, [windowSize]);

  let rungClass = "rung";
  rungClass += rungSelected ? " selected" : "";
  rungClass += lookinClickable ? " clickable" : "";
  rungClass += beingDragged ? " dragging" : "";

  return (
    <div
      className={rungClass}
      draggable="true"
      onDragStart={(e) => drag(e, rung, rungRef)}
      onDragEnd={dragEnd}
      onMouseDown={(e) => setTarget(e.target)}
    >
      <div
        ref={rungRef}
        className="rung-number"
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        onMouseOver={lookClickable}
        onMouseLeave={dontLookClickable}
        tabIndex={0}
      >
        {number === 1 && <RungDragLandingPad rung={0} />}
        <RungDragLandingPad rung={number} />
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
