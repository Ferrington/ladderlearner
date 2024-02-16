import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { selectDraggingInstructionId, selectRunSimulation } from '@/store/base/selectors';
import { useSelector } from 'react-redux';
import styles from '../styles/InstructionSpecial.module.css';

export default function InstructionSpecialPrimitive({
  abbreviation: abbreviation,
}: {
  abbreviation: string;
}) {
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const runSimulation = useSelector(selectRunSimulation);

  const instruction = INSTRUCTION_PROPERTIES[abbreviation];
  if (instruction.displayType === 'box') {
    throw new Error('Tried to create Special Instruction with type: InstructionBoxProperties');
  }

  let cursor;
  if (runSimulation) {
    cursor = 'default';
  } else {
    cursor = draggingInstructionId === abbreviation ? 'grabbing' : 'grab';
  }

  return (
    <div
      className={styles.instruction}
      style={{
        opacity: draggingInstructionId === abbreviation ? 0.5 : 1,
        cursor,
      }}
    >
      <img
        className={styles.img}
        src={`/imgs/${abbreviation}.png`}
        alt={instruction.name}
        draggable={false}
      />
      <p className={styles.name}>{instruction.name}</p>
    </div>
  );
}
