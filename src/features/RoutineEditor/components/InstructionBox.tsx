import InstructionBoxParameter from '@/features/RoutineEditor/components/InstructionBoxParameter';
import TagPreview from '@/features/RoutineEditor/components/TagPreview';
import { selectInstructionById } from '@/store/routine/routineSelectors';
import { isNumeric } from '@/utils/isNumeric';
import { Fragment, ReactNode } from 'react';
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
  // const [lookinClickable, setLookinClickable] = useState(false);
  // const [isDeletable, setIsDeletable] = useState(false);
  // const instructionRef = useRef<HTMLDivElement>(null);
  // const { runSimulation, tags, whichDraggingInstruction } = useSnapshot(store);

  const instruction = useSelector(selectInstructionById(instructionId));
  if (instruction.displayType !== 'Box') return null;

  return (
    <div
      className={styles.instruction}
      // style={{
      //   opacity: whichDraggingInstruction === instructionId ? 0.5 : 1,
      //   cursor,
      // }}
    >
      {/* {!beingDragged && (
        <div
          className={clsx({
            "rung--instruction-box-delete": true,
            deletable: isDeletable,
          })}
        >
          <RiDeleteBinLine
            className="rung--instruction-box-delete-icon"
            onMouseOver={lookClickable}
            onMouseLeave={dontLookClickable}
            onClick={handleDelete}
            size="1.25em"
            style={{ background: "white" }}
            title="Delete Instruction"
          />
        </div>
      )} */}
      {/* {!beingDragged && (
        <InstructionDropArea
          parent={parent.id}
          index={parent.children.indexOf(instructionId)}
        />
      )} */}
      <div className={styles['header-wrapper']}>
        <p>{instruction.name}</p>
      </div>
      <p className={styles.description}>{instruction.description}</p>
      <div className={styles['body-wrapper']}>
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
