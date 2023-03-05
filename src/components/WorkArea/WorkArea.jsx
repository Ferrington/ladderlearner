import './WorkArea.css';
import Rung from './Rung';
import { useContext } from 'react';
import { RungsContext } from './RungsContext';


export default function WorkArea() {
  const rungs = useContext(RungsContext);

  return (
    <div className="WorkArea">
      {rungs.map((rung, i) => {
        return <Rung 
          key={`rung${i}`}
          number={i}
          rungData={rung}
        />
      })}
    </div>
  );
}