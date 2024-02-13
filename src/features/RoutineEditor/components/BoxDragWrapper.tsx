import { selectGlobalEditMode, selectRunSimulation } from '@/store/base/selectors';
import { selectInstructionById } from '@/store/routine/selectors';
import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/BoxDragWrapper.module.css';

type Props = {
  instructionId: string;
  destructive: boolean;
  dragOverlay: ReactNode;
  children?: ReactNode;
};

export default function BoxDragWrapper({
  instructionId,
  destructive,
  dragOverlay,
  children,
}: Props) {
  const instruction = useSelector(selectInstructionById(instructionId));
  const globalEditMode = useSelector(selectGlobalEditMode);
  const runSimulation = useSelector(selectRunSimulation);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: instructionId,
    data: {
      instruction,
      dragOverlay,
    },
    disabled: globalEditMode || runSimulation,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(styles.wrapper, { [styles.destructive]: destructive })}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
