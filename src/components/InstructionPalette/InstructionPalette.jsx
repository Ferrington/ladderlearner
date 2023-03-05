import './InstructionPalette.css';

export default function InstructionPalette() {
  const drag = (e, instruct) => {
    e.dataTransfer.setData("text/plain", instruct);
    e.target.classList.add('dragging');
    [...document.querySelectorAll('.landing-pad')].forEach(ele => ele.classList.remove('hidden'));
  };
  
  const dragEnd = (e) => {
    e.target.classList.remove('dragging');
    [...document.querySelectorAll('.landing-pad')].forEach(ele => {
      ele.classList.add('hidden');
      ele.classList.remove('go-for-landing');
    });
  }

  return (
    <div className="instruction-palette">
      
      <div className="rung-instruction draggable" draggable="true" onDragStart={(e) => drag(e, "XIC")} onDragEnd={dragEnd}>
        <img className="rung-img" src={'/static/imgs/XIC.png'} alt='' draggable="false" />
        <h5>Normally Open</h5>
      </div>

      <div className="rung-instruction draggable" draggable="true" onDragStart={(e) => drag(e, "XIO")} onDragEnd={dragEnd}>
        <img className="rung-img" src={'/static/imgs/XIO.png'} alt='' draggable="false" />
        <h5>Normally Closed</h5>
      </div>


    </div>
  );
}