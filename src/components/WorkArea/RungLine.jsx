import { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { deleteBranch } from "../../store/actions";

export default function RungLine({ branch }) {
  const [selected, setSelected] = useState(false);
  const lineRef = useRef(null);

  const handleClick = () => {
    setSelected(true);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 46) deleteBranch(branch);
  };

  useOnClickOutside(lineRef, () => {
    setSelected(false);
  });

  return (
    <div
      className="rung-line"
      ref={lineRef}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {selected && <div className="rung-line-select"></div>}
    </div>
  );
}
