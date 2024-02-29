import { useInstructionBoxPrimitive } from '@/features/InstructionPalette/hooks/useInstructionBoxPrimitive';
import styles from '../styles/InstructionBox.module.css';

export default function InstructionBoxPrimitive({ abbreviation }: { abbreviation: string }) {
  const { opacity, cursor, instruction } = useInstructionBoxPrimitive(abbreviation);

  return (
    <div
      className={styles.instruction}
      style={{
        opacity,
        cursor,
      }}
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
