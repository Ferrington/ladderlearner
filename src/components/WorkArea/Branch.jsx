import Instruction from "./Instruction";
import DragLandingPad from "./DragLandingPad";
import { useRef, useLayoutEffect, useState } from "react";
import { getRungElement } from "../../store/selectors";
import RungLine from "./RungLine";

export const hasDestructiveChild = (state, id) => {
  const ele = getRungElement(state, id);

  if (ele.type === "Instruction") return ele.isDestructive;

  let result = false;
  ele.children.forEach((child) => {
    if (hasDestructiveChild(state, child)) result = true;
  });

  return result;
};

export default function Branch({ id, state, extraLandingPadLoc, children }) {
  const [orHeight, setOrHeight] = useState(0);
  const orRef = useRef(null);

  const branch = getRungElement(state, id);
  const kids = branch.children.map((child) => getRungElement(state, child));
  const parent = getRungElement(state, branch.parent);

  useLayoutEffect(() => {
    if (!orRef.current) return;

    const children = orRef.current.querySelectorAll(
      ":scope > .rung-branch:not(.last-branch)"
    );
    const height = [...children].reduce(
      (sum, child) => sum + child.offsetHeight,
      0
    );
    setOrHeight(height);
  }, [state]);

  if (branch.type === "AND") {
    return (
      <>
        {kids.map((ele, i) => {
          if (["AND", "OR"].includes(ele.type))
            return (
              <Branch key={ele.id} id={ele.id} state={state}>
                {extraLandingPadLoc - 1 === i && (
                  <DragLandingPad
                    parent={branch.id}
                    index={extraLandingPadLoc}
                    extra={extraLandingPadLoc}
                  />
                )}
              </Branch>
            );
          else if (ele.type === "Instruction")
            return (
              <Instruction key={ele.id} id={ele.id} state={state}>
                {extraLandingPadLoc - 1 === i && (
                  <DragLandingPad
                    parent={branch.id}
                    index={extraLandingPadLoc}
                    extra={extraLandingPadLoc}
                  />
                )}
              </Instruction>
            );
        })}
        {children}
      </>
    );
  } else if (branch.type === "OR") {
    const landingPadIndex = parent.children.indexOf(id);
    let classList = "rung-or";
    classList += hasDestructiveChild(state, id) ? " or-destructive" : "";

    return (
      <div
        className={classList}
        ref={orRef}
        style={{ "--line-height": `${orHeight}px` }}
      >
        <DragLandingPad parent={parent.id} index={landingPadIndex} />
        {kids.map((ele, i) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = <Branch id={ele.id} state={state} />;
          else if (ele.type === "Instruction")
            innards = <Instruction id={ele.id} state={state} />;

          return (
            <div
              key={ele.id}
              className={
                "rung-branch" + (i === kids.length - 1 ? " last-branch" : "")
              }
            >
              {i > 0 && <RungLine branch={ele} />}
              <div className="rung-instruction-wrapper">
                <DragLandingPad parent={ele.id} index={ele.children.length} />
                {innards}
              </div>
            </div>
          );
        })}
        {children}
      </div>
    );
  }
}
