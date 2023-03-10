import Instruction from "./Instruction";
import DragLandingPad from "./DragLandingPad";
import { useRef, useLayoutEffect, useState } from "react";
import { getRungElement } from "../../store/selectors";

export default function Branch({ id, state }) {
  const [orHeight, setOrHeight] = useState(0);
  const orRef = useRef(null);

  const branch = getRungElement(state, id);
  const children = branch.children.map((child) => getRungElement(state, child));
  const parent = getRungElement(state, branch.parent);

  useLayoutEffect(() => {
    if (!orRef.current) return;

    const children = orRef.current.querySelectorAll(
      ":scope > .rung-branch:not(:last-child)"
    );
    const height = [...children].reduce(
      (sum, child) => sum + child.offsetHeight,
      0
    );
    setOrHeight(height);

    [...document.querySelectorAll(".or-destructive")].forEach((ele) =>
      ele.classList.remove("or-destructive")
    );
    const destructive = [].filter.call(
      document.querySelectorAll(".rung-or"),
      (ele) => {
        return ele.querySelector(".destructive");
      }
    );

    destructive.forEach((ele) => ele.classList.add("or-destructive"));
  }, [state]);

  if (branch.type === "AND") {
    return (
      <>
        {children.map((ele) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = <Branch key={ele.id} id={ele.id} state={state} />;
          else if (ele.type === "Instruction")
            innards = <Instruction key={ele.id} id={ele.id} state={state} />;

          return innards;
        })}
      </>
    );
  } else if (branch.type === "OR") {
    const landingPadIndex = parent.children.indexOf(id);

    return (
      <div
        className="rung-or"
        ref={orRef}
        style={{ "--line-height": `${orHeight}px` }}
      >
        <DragLandingPad parent={parent.id} index={landingPadIndex} />
        {children.map((ele, i) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = <Branch id={ele.id} state={state} />;
          else if (ele.type === "Instruction")
            innards = <Instruction id={ele.id} state={state} />;

          return (
            <div key={ele.id} className="rung-branch">
              {i > 0 && <div className="rung-line"></div>}
              <div className="rung-instruction-wrapper">
                <DragLandingPad parent={ele.id} index={ele.children.length} />
                {innards}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
