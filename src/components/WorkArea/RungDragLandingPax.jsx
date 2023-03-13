import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { store } from "../../store/store";
import { moveRung } from "../../store/actions";

export default function RungDragLandingPad({ rung }) {
  const [goForLanding, setGoForLanding] = useState(false);

  const { weDragginRungs } = useSnapshot(store);

  useEffect(() => {
    if (!weDragginRungs) setGoForLanding(false);
  }, [weDragginRungs]);

  const goodToDrop = (e) => {
    e.preventDefault();
  };
  const abortLanding = () => {
    setGoForLanding(false);
  };
  const overDragTarget = (e) => {
    e.preventDefault();
    setGoForLanding(true);
  };
  const dropped = (e) => {
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log("dropped!", rung, data);
    moveRung({
      ...data,
      newIndex: rung,
    });
  };

  let classList = "rung-landing-pad";
  classList += rung === 0 ? " first-pad" : "";
  classList += goForLanding ? " go-for-landing" : "";

  return (
    <div
      className={classList}
      onDragEnter={goodToDrop}
      onDragOver={overDragTarget}
      onDragLeave={abortLanding}
      onDrop={dropped}
    >
      <div className="landing-beacon"></div>
    </div>
  );
}
