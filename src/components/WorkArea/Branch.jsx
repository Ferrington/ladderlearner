import Instruction from "./Instruction";
import DragLandingPad from "./DragLandingPad";
import { useRef, useLayoutEffect, useContext, useState } from "react";
import { RungsContext } from "./RungsContext";

export default function Branch({data, path}) {
  const [orHeight, setOrHeight] = useState(0);
  const orRef = useRef(null);
  const rungs = useContext(RungsContext);

  useLayoutEffect(() => {
    if (!orRef.current) return;

    const children = orRef.current.querySelectorAll(":scope > .rung-branch:not(:last-child)");
    const height = [...children].reduce((sum, child) => sum + child.offsetHeight, 0);
    setOrHeight(height);


    [...document.querySelectorAll('.or-destructive')].forEach(ele => ele.classList.remove('or-destructive'));
    const destructive = [].filter.call(document.querySelectorAll('.rung-or'), ele => {
      return ele.querySelector('.destructive');
    });

    destructive.forEach(ele => ele.classList.add('or-destructive'));
  }, [rungs]);

  if (data.type === "AND")
    return (
      <>
        {data.contents.map((ele, i) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = (<Branch 
                          key={i} 
                          data={ele}
                          path={[...path, i]}
                      ></Branch>)
          else if (ele.type === "Instruction")
            innards = (<Instruction 
                          key={i} 
                          data={ele} 
                          path={[...path, i]}
                      />)

          return innards;
        })}
      </>
    );
  else if (data.type === "OR")
    return (
      <div 
        className="rung-or"
        ref={orRef}
        style={{"--line-height": `${orHeight}px`}}
      >
        <DragLandingPad 
          path={path}
        />
        {data.contents.map((ele, i) => {
          let innards;

          if (["AND", "OR"].includes(ele.type))
            innards = (<Branch 
                          key={i} 
                          data={ele}
                          path={[...path, i]}
                      ></Branch>)
          else if (ele.type === "Instruction")
            innards = (<Instruction 
                          key={i} 
                          data={ele} 
                          path={[...path, i, 0]}
                        />)

          return (
            <div key={i} className="rung-branch">
              {i > 0 && <div className="rung-line"></div>}
              <div className="rung-instruction-wrapper">
                <DragLandingPad 
                  path={[...path, i, "last"]}
                />
                {innards}
              </div>
            </div>
          );
        })}
      </div>
    );
}