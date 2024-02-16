import InstructionBoxParameter from '@/features/RoutineEditor/components/InstructionBoxParameter';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import TagPreview from '@/features/RoutineEditor/components/TagPreview';
import { useAppDispatch } from '@/store';
import { selectDraggingInstructionId, selectRunSimulation } from '@/store/base/selectors';
import { selectBranchById, selectInstructionById } from '@/store/routine/selectors';
import { deleteInstruction } from '@/store/routine/slice';
import { isNumeric } from '@/utils/isNumeric';
import clsx from 'clsx';
import { Fragment, MouseEvent, ReactNode, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import styles from '../styles/InstructionBox.module.css';

type Props = {
  instructionId: string;
  beingDragged: boolean;
  children?: ReactNode;
};

export default function InstructionBox({
  instructionId,
  beingDragged,
  children: componentChildren,
}: Props) {
  const [showInteractOutline, setShowInteractOutline] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);

  const dispatch = useAppDispatch();

  const runSimulation = useSelector(selectRunSimulation);
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const instruction = useSelector(selectInstructionById(instructionId));
  const parent = useSelector(selectBranchById(instruction?.parent));
  if (instruction?.displayType !== 'Box') return null;

  function lookClickable(e: MouseEvent) {
    if (runSimulation) return;

    const element = e.target as HTMLElement;
    if (element.classList.contains('instruct-value') || element.tagName === 'INPUT') {
      setShowInteractOutline(false);
    } else {
      setShowInteractOutline(true);
    }
  }

  function handleMouseOver() {
    if (runSimulation) return;

    setIsDeletable(true);
  }

  function dontLookClickable() {
    setShowInteractOutline(false);
    setIsDeletable(false);
  }

  function handleDelete() {
    if (runSimulation) return;

    dispatch(deleteInstruction(instruction));
  }

  let cursor;
  if (runSimulation) {
    cursor = 'auto';
  } else {
    cursor = beingDragged ? 'grabbing' : 'grab';
  }

  return (
    <div
      className={clsx(styles.instruction, {
        [styles['interact-outline']]: showInteractOutline,
        [styles.energized]: instruction.energized && false,
      })}
      onMouseOver={handleMouseOver}
      onMouseLeave={dontLookClickable}
      style={{
        cursor,
        background:
          beingDragged && draggingInstructionId === instructionId ? 'transparent' : 'white',
      }}
    >
      {!beingDragged && (
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
            style={{ background: 'white' }}
            title="Delete Instruction"
          />
        </div>
      )}
      {!beingDragged && (
        <InstructionDropArea parent={parent.id} index={parent.children.indexOf(instructionId)} />
      )}

      <div
        className={styles['header-wrapper']}
        style={{ opacity: draggingInstructionId === instructionId ? 0.5 : 1 }}
      >
        <p>{instruction.name}</p>
      </div>
      <p
        className={styles.description}
        style={{ opacity: draggingInstructionId === instructionId ? 0.5 : 1 }}
      >
        {instruction.description}
      </p>
      <div
        className={styles['body-wrapper']}
        style={{ opacity: draggingInstructionId === instructionId ? 0.5 : 1 }}
      >
        <div>
          {Object.keys(instruction.parameters).map((key) => {
            const { hidden } = instruction.parameters[key];
            if (hidden) return null;

            return (
              <Fragment key={key}>
                <div className={styles['param-row']}>
                  <p className={styles['instruct-key']}>{key}</p>
                  <InstructionBoxParameter instruction={instruction} paramKey={key} />
                </div>
                {!['CTU', 'CTD', 'TON', 'TOF'].includes(instruction.abbreviated) &&
                  instruction.parameters[key].type === 'number' &&
                  !isNumeric(instruction.parameters[key].value) &&
                  instruction.parameters[key].value != null && (
                    <div className={styles['param-row']}>
                      <p className={styles['instruct-key']}></p>
                      <TagPreview tagId={instruction.parameters[key].value as string} />
                    </div>
                  )}
              </Fragment>
            );
          })}
        </div>
      </div>
      {!beingDragged && componentChildren}
    </div>
  );
}
