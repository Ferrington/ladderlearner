export function DragLandingPad() {
  const goodToDrop = (e: any) => {
    e.preventDefault();
    e.target.classList.add("go-for-landing");
  };
  const abortLanding = (e: any) => {
    e.target.classList.remove("go-for-landing");
  };
  const overDragTarget = (e: any) => {
    e.preventDefault();
  };
  const dropped = (e:any) => {
    console.log(e.dataTransfer.getData("text/plain"));
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