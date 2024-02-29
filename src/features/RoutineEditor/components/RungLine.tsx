import { useRungLine } from '@/features/RoutineEditor/hooks/useRungLine';
import { Branch } from '@/store/routine/types';
import clsx from 'clsx';
import { RiDeleteBinLine } from 'react-icons/ri';
import styles from '../styles/RungLine.module.css';

export default function RungLine({ branch }: { branch: Branch }) {
  const {
    isDeletable,
    showInteractOutline,
    lookClickable,
    dontLookClickable,
    handleMouseOver,
    handleDelete,
  } = useRungLine(branch);

  return (
    <div>
      {showInteractOutline && (
        <div className={styles['interact-outline']} onMouseLeave={dontLookClickable}></div>
      )}
      <div
        className={clsx(styles.line, {
          [styles['clickable']]: showInteractOutline,
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
