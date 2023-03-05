import './WorkArea.css';
import { useState } from 'react';
import Rung from './Rung';

// const emptyRung = {
//   type: "AND",
//   contents: []
// }

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

export default function WorkArea() {
  const [rungs, setRungs] = useState([testRung]);

  const handleAddInstruction = (modifiedRung, which) => {
    const newRungs = rungs.map((oldRung, i) => {
      return i === which ? modifiedRung : oldRung;
    });
    setRungs(newRungs);
  };

  return (
    <div className="WorkArea">
      {rungs.map((rung, i) => {
        return <Rung 
          key={`rung${i}`}
          number={i}
          rungData={rung}
          handleAddInstruction={handleAddInstruction}
        />
      })}
    </div>
  );
}