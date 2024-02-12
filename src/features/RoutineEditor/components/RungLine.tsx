import { Branch, deleteBranch } from '@/store/routine/routineSlice';
import clsx from 'clsx';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import styles from '../styles/RungLine.module.css';

export default function RungLine({ branch }: { branch: Branch }) {
  const dispatch = useDispatch();

  const [isDeletable, setIsDeletable] = useState(false);
  const [lookinClickable, setLookinClickable] = useState(false);

  function lookClickable() {
    // if (runSimulation) return;

    setLookinClickable(true);
  }

  function dontLookClickable() {
    setLookinClickable(false);
    setIsDeletable(false);
  }

  function handleMouseOver() {
    // if (runSimulation) return;

    setIsDeletable(true);
  }

  function handleDelete() {
    dispatch(deleteBranch(branch));
  }

  return (
    <div>
      {lookinClickable && <div className={styles.selected} onMouseLeave={dontLookClickable}></div>}
      <div
        className={clsx(styles.line, {
          [styles.clickable]: lookinClickable,
        })}
        onMouseOver={handleMouseOver}
        onMouseLeave={dontLookClickable}
      >
        <div
          className={clsx(styles.delete, {
            [styles.deletable]: isDeletable,
          })}
        >
          <RiDeleteBinLine
            className={styles['delete-icon']}
            onMouseOver={lookClickable}
            onMouseLeave={dontLookClickable}
            onClick={handleDelete}
            size="1.25em"
            title="Delete Branch"
          />
        </div>
      </div>
    </div>
  );
}
