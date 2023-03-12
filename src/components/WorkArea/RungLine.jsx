import { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { deleteBranch } from "../../store/actions";

export default function RungLine({ branch }) {
  const [selected, setSelected] = useState(false);
  const [lookinClickable, setLookinClickable] = useState(false);
  const lineRef = useRef(null);

  const handleClick = () => {
    setSelected(true);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 46) deleteBranch(branch);
  };

  const lookClickable = (e) => {
    setLookinClickable(true);
  };

  const dontLookClickable = () => {
    setLookinClickable(false);
  };

  useOnClickOutside(lineRef, () => {
    setSelected(false);
  });

  return (
    <div className="rung-line-wrapper">
      <div
        className={
          "rung-line" + (lookinClickable ? " rung-line-clickable" : "")
        }
        ref={lineRef}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        onMouseOver={lookClickable}
        onMouseLeave={dontLookClickable}
        tabIndex={0}
      >
        {selected && <div className="rung-line-select"></div>}
        {lookinClickable && !selected && (
          <div className="rung-line-select clickable"></div>
        )}
      </div>
    </div>
  );
}
