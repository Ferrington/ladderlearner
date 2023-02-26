import './WorkArea.css';
import { useState } from 'react';
import { Rung } from './Rung';
// import { useState, useEffect, useRef } from 'react';

const emptyRung = {
  type: "AND",
  contents: []
}

const testRung = {
  type: "AND",
  contents: [
    {
      type: "OR",
      contents: [
        {
          type: "Instruction",
          name: "XIC",
          tag: "Tag 1"
        },
        {
          type: "Instruction",
          name: "XIO",
          tag: "Tag 2"
        }
      ]
    },
    {
      type: "Instruction",
      name: "OTE",
      tag: "Tag 3"
    }
  ]
}

export function WorkArea() {
  const [rungs, setRungs] = useState([JSON.stringify(testRung)]);

  const updateRung = (modifiedRung: string, which:number) => {
    const newRungs = rungs.map((oldRung, i) => {
      return i === which ? modifiedRung : oldRung;
    });
    setRungs(newRungs);
  };

  //const [height, setHeight] = useState("");

  // const updateOrSize = () => {
  //   if (rungRef.current === null)
  //     return;
  //   const nodeArr = rungRef.current.getElementsByClassName("rung-or")[0].querySelectorAll(".rung-branch:not(:last-child)");
  //   const newHeight = Array.from(nodeArr).reduce((sum, node) => sum + node.clientHeight, 0);
  //   setHeight(`${newHeight}px`);
  // };

  // useEffect(() => {
  //   updateOrSize();
  // }, []);

  return (
    <div className="WorkArea">
      {rungs.map((rung, i) => {
        return <Rung 
          key={`rung${i}`}
          number={i}
          rungData={rung}
          dropUpdate={updateRung}
        />
      })}
    </div>
  );



  // return (
  //   <div className="WorkArea">
  //     <div className="rung">
  //       <div className="rung-number">0</div>
  //       <div className="rung-comment"></div>
  //       <div className="rung-code">
  //         <div className="rung-main-rung" ref={rungRef}>
  //           <div className="rung-line"></div>
  //           <div className="rung-instruction-wrapper">
  //             <div className="rung-or" style={{ ["--line-height" as string]: height }}>
  //               <div className="rung-branch">
  //                 <div className="rung-instruction-wrapper">
  //                   <div className="rung-instruction">
  //                     <img className="rung-img" src={'/static/imgs/XIC.png'} alt=''/>
  //                     <h5>U2_IO:9:I.5</h5>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="rung-branch">
  //                 <div className="rung-line"></div>
  //                 <div className="rung-instruction-wrapper">
  //                   <div className="rung-instruction">
  //                     <img className="rung-img" src={'/static/imgs/XIC.png'} alt='' />
  //                     <h5>Flag_Detector_Red_Hold_Timer.TT</h5>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="rung-branch">
  //                 <div className="rung-line"></div>
  //                 <div className="rung-instruction-wrapper">
  //                   <div className="rung-instruction">
  //                     <img className="rung-img" src={'/static/imgs/XIC.png'} alt='' />
  //                     <h5>Flag_Detector_Red_Hold_Timer.TT</h5>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="rung-instruction">
  //               <img className="rung-img" src={'/static/imgs/XIO.png'} alt='' />
  //               <h5>Flag_Detector_Red_Hold_Timer.DN</h5>
  //             </div>
  //             <div className="rung-or or-destructive" style={{ ["--line-height" as string]: "68.5px" }}>
  //               <div className="rung-branch">
  //                 <div className="rung-instruction-wrapper">
  //                   <div className="rung-instruction destructive">
  //                     <img className="rung-img" src={'/static/imgs/OTE.png'} alt='' />
  //                     <h5>Flag_Detector_Red</h5>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="rung-branch">
  //                 <div className="rung-line"></div>
  //                 <div className="rung-instruction-wrapper">
  //                   <div className="rung-instruction-box destructive">
  //                     <h5>TON</h5>
  //                     <p>Timer On Delay</p>
  //                     <div className="tag-holder">
  //                       <p className="instruct-key">Timer</p>
  //                       <p className="instruct-value">Flag_Detector_Red_Hold_Timer</p>
  //                       <p className="instruct-key">Preset</p>
  //                       <p className="instruct-value">?</p>
  //                       <p className="instruct-key">Accum</p>
  //                       <p className="instruct-value">?</p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="rung">
  //       <div className="rung-number">1</div>
  //       <div className="rung-comment"></div>
  //       <div className="rung-code"></div>
  //     </div>
  //   </div>
  // )
}