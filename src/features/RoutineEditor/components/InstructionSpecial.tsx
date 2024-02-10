import { selectInstructionById } from '@/store/routine/routineSelectors';
import { ReactNode } from 'react';
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
  const instruction = useSelector(selectInstructionById(instructionId));
  if (instruction.displayType !== 'Special') return null;

  const editMode = false;

  let tagDisplay;
  if (editMode) {
    // tagDisplay = (
    //   <InlineAutocomplete
    //     initialState={instruction.tag ?? ""}
    //     changeCheck={() => true}
    //     filterMatches={(input: string) => filterMatches(input, instruction)}
    //     onClickOutside={handleClickOutsideInput}
    //     onCommit={(input) => handleCommit(input)}
    //   />
    // );
  } else {
    tagDisplay = (
      <p
      // className={clsx({
      //   unassigned: instruction.tag == null,
      //   'tag-clickable': tagLookinClickable,
      // })}
      // style={{
      //   cursor: runSimulation && instruction.isDestructive ? 'auto' : 'pointer',
      // }}
      >
        {instruction.tag || 'Assign Tag'}
      </p>
    );
  }

  return (
    <div
      className={styles.instruction}
      // onClick={handleClick}
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
