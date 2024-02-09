import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import styles from '../styles/InstructionSpecial.module.css';

export default function InstructionSpecialPrimitive({ instructionId }: { instructionId: string }) {
  // const { whichDraggingInstruction, runSimulation } = useSnapshot(store);

  const instruction = INSTRUCTION_PROPERTIES[instructionId];
  if (instruction.displayType === 'box') {
    throw new Error('Tried to create Special Instruction with type: InstructionBoxProperties');
  }

  return (
    <div className={styles.instruction}>
      <img
        className={styles.img}
        src={`/imgs/${instructionId}.png`}
        alt={instruction.name}
        draggable={false}
      />
      <p className={styles.name}>{instruction.name}</p>
    </div>
  );
}
