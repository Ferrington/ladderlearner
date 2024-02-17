import { selectDraggingInstructionId, selectDropLocations } from '@/store/base/selectors';
import { ValidDropLocations } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import styles from '../styles/InstructionDropArea.module.css';

type Props = {
  parent: string;
  index: number;
  extra?: number;
};

export default function InstructionDropArea({ parent, index, extra }: Props) {
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const dropLocations = useSelector(selectDropLocations);

  const { isOver, setNodeRef } = useDroppable({
    id: `${parent}-${index}-${extra}`,
    data: {
      newParent: parent,
      index,
    },
  });

  const isValidDropLocation = checkIfValidDropLocation(parent, index, dropLocations);

  const classList = clsx(styles['drop-area'], 'instruction-drop-area', {
    [styles['go-for-landing']]: isOver,
    [styles['extra-landing-pad-first-ele']]: extra != null && extra === 0,
    'extra-landing-pad': extra != null && extra >= 1,
  });

  return (
    (draggingInstructionId && isValidDropLocation && (
      <div className={classList} ref={setNodeRef} data-testid="instruction-drop-area">
        <div className={styles['landing-beacon']}></div>
      </div>
    )) ||
    null
  );
}

function checkIfValidDropLocation(
  parent: string,
  index: number,
  dropLocations: ValidDropLocations | 'none' | 'all',
) {
  if (dropLocations === 'none') return false;
  else if (dropLocations === 'all') return true;
  else if (parent in dropLocations && dropLocations?.[parent].includes(index)) return true;
  else return false;
}
