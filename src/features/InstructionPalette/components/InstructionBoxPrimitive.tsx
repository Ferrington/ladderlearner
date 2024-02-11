import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import styles from '../styles/InstructionBox.module.css';

export default function InstructionBoxPrimitive({ instructionId }: { instructionId: string }) {
  // const { whichDraggingInstruction, runSimulation } = useSnapshot(store);

  const instruction = INSTRUCTION_PROPERTIES[instructionId];
  if (instruction.displayType === 'special') {
    throw new Error('Tried to create Box Instruction with type: InstructionSpecialProperties');
  }

  return (
    <div
      className={styles.instruction}
      // style={{
      //   opacity: whichDraggingInstruction === instructionId ? 0.5 : 1,
      //   cursor: whichDraggingInstruction === instructionId ? 'grabbing' : 'grab',
      // }}
    >
      <div className={styles['header-wrapper']}>
        <p className={styles.name}>{instruction.name}</p>
      </div>
      <p className={styles.description}>{instruction.description}</p>
      <div className={styles['body-wrapper']}>
        <div>
          {Object.keys(instruction.parameters).map((key) => {
            const { value, hidden } = instruction.parameters[key];
            if (hidden) return null;

            return (
              <div className={styles['param-row']} key={key}>
                <p className={styles['instruct-key']}>{key}</p>
                <p className={styles['instruct-value']}>{value ?? '?'}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
