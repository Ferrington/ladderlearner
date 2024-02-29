import InlineAutocomplete from '@/base/components/InlineAutocomplete';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import { useInstructionSpecial } from '@/features/RoutineEditor/hooks/useInstructionSpecial';
import { type InstructionSpecial } from '@/types';
import clsx from 'clsx';
import { ReactNode, memo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import styles from '../styles/InstructionSpecial.module.css';

type Props = {
  instructionId: string;
  beingDragged: boolean;
  children?: ReactNode;
};

const InstructionSpecial = memo(function InstructionSpecial({
  instructionId,
  beingDragged,
  children: componentChildren,
}: Props) {
  const {
    instruction,
    parent,
    editMode,
    runSimulation,
    draggingInstructionId,
    cursor,
    isDeletable,
    showInteractOutline,
    setShowInteractOutline,
    filterMatches,
    dontLookClickable,
    handleClick,
    handleClickOutsideInput,
    handleCommit,
    handleMouseOver,
    handleDelete,
  } = useInstructionSpecial(instructionId, beingDragged);

  if (instruction?.displayType !== 'Special') return null;

  let tagDisplay;
  if (editMode) {
    tagDisplay = (
      <InlineAutocomplete
        initialState={instruction.tag ?? ''}
        changeCheck={() => true}
        filterMatches={(input) => filterMatches(input)}
        onClickOutside={handleClickOutsideInput}
        onCommit={handleCommit}
      />
    );
  } else {
    tagDisplay = (
      <p
        className={clsx({
          [styles.unassigned]: instruction.tag == null,
          [styles.clickable]: (runSimulation && !instruction.isDestructive) || !runSimulation,
        })}
        style={{ opacity: draggingInstructionId === instructionId ? 0.5 : 1 }}
        data-testid="instruction-special-tag"
      >
        {instruction.tag || 'Assign Tag'}
      </p>
    );
  }

  return (
    <div
      className={clsx(styles.instruction, {
        [styles.energized]: instruction.energized && runSimulation,
        [styles['interact-outline']]: showInteractOutline,
      })}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={dontLookClickable}
      style={{
        cursor,
      }}
      data-testid="instruction-special"
    >
      <div className={styles['energized-wrapper']}>
        {!beingDragged && !runSimulation && (
          <div
            className={clsx(styles.delete, {
              [styles.deletable]: isDeletable,
            })}
          >
            <RiDeleteBinLine
              className={styles['delete-icon']}
              onMouseOver={() => setShowInteractOutline(true)}
              onMouseLeave={dontLookClickable}
              onClick={handleDelete}
              size="1.25em"
              style={{ background: 'white' }}
              title="Delete Instruction"
            />
          </div>
        )}
      </div>
      {!beingDragged && (
        <InstructionDropArea parent={parent.id} index={parent.children.indexOf(instructionId)} />
      )}
      <img
        className={styles.img}
        src={`/imgs/${instruction.abbreviated}.png`}
        alt={instruction.abbreviated}
        draggable={false}
        style={{ opacity: draggingInstructionId === instructionId ? 0.5 : 1 }}
      />
      {instruction.abbreviated !== 'ONS' && tagDisplay}
      {!beingDragged && componentChildren}
    </div>
  );
});

export default InstructionSpecial;
