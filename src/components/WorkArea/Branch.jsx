import Instruction from "./Instruction";
import DragLandingPad from "./DragLandingPad";
import { useRef, useLayoutEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  makeSelectElementById,
  selectElementsByIds,
} from "../../store/workspaceSlice";

export default function Branch({ id, parent }) {
  const [orHeight, setOrHeight] = useState(0);
  const orRef = useRef(null);

  const branchSelectElementById = useMemo(makeSelectElementById, []);
  const branch = useSelector((store) => branchSelectElementById(store, id));

  const children = useSelector((store) =>
    selectElementsByIds(store, branch.children)
  );

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
  }, [branch]);

  if (branch.type === "AND") {
    return (
      <>
        {children.map((ele) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = <Branch key={ele.id} id={ele.id} parent={branch} />;
          else if (ele.type === "Instruction")
            innards = <Instruction key={ele.id} id={ele.id} parent={branch} />;

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
            innards = <Branch id={ele.id} parent={branch} />;
          else if (ele.type === "Instruction")
            innards = <Instruction id={ele.id} parent={branch} />;

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
