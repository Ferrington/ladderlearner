import Instruction from "./Instruction";
import DragLandingPad from "./DragLandingPad";
import { useRef, useLayoutEffect, useContext, useState } from "react";
import { RungsContext } from "./RungsContext";
import { useSelector } from "react-redux";
import {
  selectElementById,
  selectChildrenByParentId,
} from "../../store/workspaceSlice";

export default function Branch({ id }) {
  const [orHeight, setOrHeight] = useState(0);
  const orRef = useRef(null);
  const rungs = useContext(RungsContext);

  const branch = useSelector((store) => selectElementById(store, id));
  const children = useSelector((store) => selectChildrenByParentId(store, id));

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
  }, [rungs]);

  if (branch.type === "AND")
    return (
      <>
        {children.map((ele) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = <Branch key={ele.id} id={ele.id} />;
          else if (ele.type === "Instruction")
            innards = <Instruction key={ele.id} id={ele.id} />;

          return innards;
        })}
      </>
    );
  else if (branch.type === "OR")
    return (
      <div
        className="rung-or"
        ref={orRef}
        style={{ "--line-height": `${orHeight}px` }}
      >
        <DragLandingPad />
        {children.map((ele, i) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = <Branch id={ele.id} />;
          else if (ele.type === "Instruction")
            innards = <Instruction id={ele.id} />;

          return (
            <div key={ele.id} className="rung-branch">
              {i > 0 && <div className="rung-line"></div>}
              <div className="rung-instruction-wrapper">
                <DragLandingPad />
                {innards}
              </div>
            </div>
          );
        })}
      </div>
    );
}
