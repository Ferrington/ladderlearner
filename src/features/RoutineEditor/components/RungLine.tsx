import { Branch } from '@/store/routine/routineSlice';
import clsx from 'clsx';
import styles from '../styles/RungLine.module.css';

export default function RungLine({ branch }: { branch: Branch }) {
  branch;
  return (
    <div>
      {/* {lookinClickable && (
        <div
          className="rung--line-select"
          // onMouseLeave={dontLookClickable}
        ></div>
      )} */}
      <div
        className={clsx(styles.line, {
          // "rung--line-clickable" : lookingClickable
        })}
        // onMouseOver={handleMouseOver}
        // onMouseLeave={dontLookClickable}
      >
        {/* <div
          className={clsx({
            "rung--line-delete": true,
            deletable: isDeletable,
          })}
        >
          <RiDeleteBinLine
            className="rung--line-delete-icon"
            onMouseOver={lookClickable}
            onMouseLeave={dontLookClickable}
            onClick={handleDelete}
            size="1.25em"
            style={{ background: "white" }}
            title="Delete Branch"
          />
        </div> */}
      </div>
    </div>
  );
}
