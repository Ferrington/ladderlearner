import InlineAutocomplete from '@/base/components/InlineAutocomplete';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import { RootState } from '@/store';
import { selectDraggingInstructionId, selectRunSimulation } from '@/store/base/selectors';
import { setGlobalEditMode } from '@/store/base/slice';
import { selectBranchById, selectInstructionById } from '@/store/routine/selectors';
import { deleteInstruction, setSpecialTagName } from '@/store/routine/slice';
import { makeSelectTagOptions } from '@/store/tag/selectors';
import clsx from 'clsx';
import { MouseEvent, ReactNode, useMemo, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/InstructionSpecial.module.css';

type Props = {
  instructionId: string;
  beingDragged: boolean;
  children?: ReactNode;
};

export default function InstructionSpecial({
  instructionId,
  beingDragged,
  children: componentChildren,
}: Props) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [showInteractOutline, setShowInteractOutline] = useState(false);

  const runSimulation = useSelector(selectRunSimulation);
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const instruction = useSelector(selectInstructionById(instructionId));
  const parent = useSelector(selectBranchById(instruction?.parent));

  const selectTagOptions = useMemo(makeSelectTagOptions, []);
  const tagList = useSelector((state: RootState) =>
    selectTagOptions(state, instruction?.displayType),
  );
  if (instruction?.displayType !== 'Special') return null;

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    // if (runSimulation) {
    //   if (!instruction.tag) return;

    //   const tag = getTagByName(instruction.tag);
    //   const isOutput = checkIfOutput(tag);
    //   if (!isOutput) {
    //     tagActions.updateTag(tag.name, !tag.value);
    //   }

    //   return;
    // }

    const tagName = (e.target as HTMLElement).tagName;

    if (['INPUT', 'P'].includes(tagName)) {
      setEditMode(true);
      dispatch(setGlobalEditMode(true));
    } else {
      setEditMode(false);
      dispatch(setGlobalEditMode(false));
    }
  }

  function handleClickOutsideInput() {
    setEditMode(false);
    dispatch(setGlobalEditMode(false));
    // setTagLookinClickable(false);
  }

  function handleCommit(name: string) {
    if (!tagList.includes(name)) return;

    dispatch(setSpecialTagName({ name, instructionId }));
    setEditMode(false);
  }

  function filterMatches(input: string) {
    return tagList.filter((tag) => {
      const tagLower = tag.toLowerCase();
      const inputLower = input.toLowerCase();
      return tagLower.indexOf(inputLower) === 0;
    });
  }

  // const lookClickable = (e: MouseEvent) => {
  //   // if (runSimulation) return;
  //   const tagName = (e.target as HTMLElement).tagName;

  //   if (["INPUT", "P"].includes(tagName)) {
  //     setTagLookinClickable(true);
  //     setLookinClickable(false);
  //   } else {
  //     setLookinClickable(true);
  //     setTagLookinClickable(false);
  //   }
  // };

  const handleMouseOver = () => {
    // if (runSimulation) return;

    setIsDeletable(true);
  };

  const dontLookClickable = () => {
    // setLookinClickable(false);
    // setTagLookinClickable(false);
    setIsDeletable(false);
    setShowInteractOutline(false);
  };

  function handleDelete() {
    // if (runSimulation) return;

    dispatch(deleteInstruction(instruction));
  }

  let cursor;
  if (runSimulation) {
    cursor = instruction.isDestructive ? 'auto' : 'pointer';
  } else {
    cursor = beingDragged ? 'grabbing' : 'grab';
  }

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
          [styles.clickable]: true,
        })}
        style={{ opacity: draggingInstructionId === instructionId ? 0.5 : 1 }}
      >
        {instruction.tag || 'Assign Tag'}
      </p>
    );
  }

  return (
    <div
      className={clsx(styles.instruction, {
        [styles.energized]: instruction.energized && false,
        [styles['interact-outline']]: showInteractOutline,
      })}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={dontLookClickable}
      style={{
        cursor,
      }}
    >
      <div className={styles['energized-wrapper']}>
        {!beingDragged && (
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
}
