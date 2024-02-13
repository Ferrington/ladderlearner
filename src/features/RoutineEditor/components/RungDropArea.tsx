import { selectDraggingRungIndex } from '@/store/base/selectors';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import styles from '../styles/RungDropArea.module.css';

export default function RungDropArea({ rungIndex }: { rungIndex: number }) {
  const draggingRungIndex = useSelector(selectDraggingRungIndex);
  const { isOver, setNodeRef } = useDroppable({
    id: rungIndex,
    data: {
      rungIndex,
    },
  });

  const classList = clsx(styles['drop-area'], {
    [styles['first-pad']]: rungIndex === 0,
    [styles['go-for-landing']]: isOver,
  });

  const isNotRedundant = draggingRungIndex ? draggingRungIndex - 1 !== rungIndex : true;

  return (
    (draggingRungIndex != null && isNotRedundant && (
      <div className={classList} ref={setNodeRef}>
        <div className={styles['landing-beacon']}></div>
      </div>
    )) ||
    null
  );
}
