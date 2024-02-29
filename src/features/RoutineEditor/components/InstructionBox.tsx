import InstructionBoxParameter from '@/features/RoutineEditor/components/InstructionBoxParameter';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import TagPreview from '@/features/RoutineEditor/components/TagPreview';
import { useInstructionBox } from '@/features/RoutineEditor/hooks/useInstructionBox';
import { isNumeric } from '@/utils/isNumeric';
import clsx from 'clsx';
import { Fragment, ReactNode, memo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import styles from '../styles/InstructionBox.module.css';

type Props = {
  instructionId: string;
  beingDragged: boolean;
  children?: ReactNode;
};

const InstructionBox = memo(function InstructionBox({
  instructionId,
  beingDragged,
  children: componentChildren,
}: Props) {
  const {
    instruction,
    parent,
    cursor,
    showInteractOutline,
    runSimulation,
    handleMouseOver,
    handleDelete,
    lookClickable,
    dontLookClickable,
    draggingInstructionId,
    isDeletable,
  } = useInstructionBox(instructionId, beingDragged);

  if (instruction?.displayType !== 'Box') return null;

  return (
    <div
      className={clsx(styles.instruction, {
        [styles['interact-outline']]: showInteractOutline,
        [styles.energized]: instruction.energized && runSimulation,
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
});

export default InstructionBox;
