import Instruction from "./Instruction";
import DragLandingPad from "./DragLandingPad";

export default function Branch({data, path}) {

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
      <div className="rung-or">
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