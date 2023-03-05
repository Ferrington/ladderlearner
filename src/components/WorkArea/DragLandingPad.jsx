export default function DragLandingPad({path}) {
  const goodToDrop = (e) => {
    e.preventDefault();
    e.target.classList.add("go-for-landing");
  };
  const abortLanding = (e) => {
    e.target.classList.remove("go-for-landing");
  };
  const overDragTarget = (e) => {
    e.preventDefault();
  };
  const dropped = (e) => {
    console.log(e.dataTransfer.getData("text/plain"), path);
    
  };

  return (
    <div 
      className="landing-pad hidden" 
      onDragEnter={goodToDrop} 
      onDragOver={overDragTarget} 
      onDragLeave={abortLanding} 
      onDrop={dropped}
    >
      <div className="landing-beacon"></div>
    </div>
  );
}