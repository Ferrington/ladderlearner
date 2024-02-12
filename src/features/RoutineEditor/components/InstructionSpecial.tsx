import InlineAutocomplete from '@/base/components/InlineAutocomplete';
import { RootState } from '@/store';
import { selectInstructionById } from '@/store/routine/routineSelectors';
import { makeSelectTagOptions } from '@/store/tag/tagSelectors';
import clsx from 'clsx';
import { MouseEvent, ReactNode, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const [editMode, setEditMode] = useState(false);

  const instruction = useSelector(selectInstructionById(instructionId));

  const selectTagOptions = useMemo(makeSelectTagOptions, []);
  const tagList = useSelector((state: RootState) =>
    selectTagOptions(state, instruction.displayType),
  );
  if (instruction.displayType !== 'Special') return null;

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
      // actions.setEditMode(true);
    } else {
      setEditMode(false);
      // actions.setEditMode(false);
    }
  }

  function handleClickOutsideInput() {
    setEditMode(false);
    // actions.setEditMode(false);
    // setTagLookinClickable(false);
  }

  function handleCommit(input: string) {
    console.log(input);
  }

  function filterMatches(input: string) {
    return tagList.filter((tag) => {
      const tagLower = tag.toLowerCase();
      const inputLower = input.toLowerCase();
      return tagLower.indexOf(inputLower) === 0;
    });
  }

  let tagDisplay;
  if (editMode) {
    tagDisplay = (
      <InlineAutocomplete
        initialState={instruction.tag ?? ''}
        changeCheck={() => true}
        filterMatches={(input) => filterMatches(input)}
        onClickOutside={handleClickOutsideInput}
        onCommit={(input) => handleCommit(input)}
      />
    );
  } else {
    tagDisplay = (
      <p
        className={clsx({
          [styles.unassigned]: instruction.tag == null,
          [styles.clickable]: true,
        })}
      >
        {instruction.tag || 'Assign Tag'}
      </p>
    );
  }

  return (
    <div
      className={styles.instruction}
      onClick={handleClick}
      // onMouseOver={handleMouseOver}
      // onMouseLeave={dontLookClickable}
      // style={{
      //   opacity: whichDraggingInstruction === instructionId ? 0.5 : 1,
      //   cursor,
      // }}
    >
      {/* <div className="energized-wrapper">
        {!beingDragged && (
          <div
            className={clsx({
              "rung--instruction-special-delete": true,
              deletable: isDeletable,
            })}
          >
            <RiDeleteBinLine
              className="rung--instruction-special-delete-icon"
              onMouseOver={lookClickable}
              onMouseLeave={dontLookClickable}
              onClick={handleDelete}
              size="1.25em"
              style={{ background: "white" }}
              title="Delete Instruction"
            />
          </div>
        )}
      </div> */}
      {/* {!beingDragged && (
        <InstructionDropArea
          parent={parent.id}
          index={parent.children.indexOf(instructionId)}
        />
      )} */}
      <img
        className={styles.img}
        src={`/imgs/${instruction.abbreviated}.png`}
        alt={instruction.abbreviated}
        draggable={false}
      />
      {instruction.abbreviated !== 'ONS' && tagDisplay}
      {!beingDragged && componentChildren}
    </div>
  );
}
