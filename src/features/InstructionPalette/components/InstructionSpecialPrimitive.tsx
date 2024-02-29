import { useInstructionSpecialPrimitive } from '@/features/InstructionPalette/hooks/useInstructionSpecialPrimitive';
import styles from '../styles/InstructionSpecial.module.css';

export default function InstructionSpecialPrimitive({
  abbreviation: abbreviation,
}: {
  abbreviation: string;
}) {
  const { opacity, cursor, instructionName } = useInstructionSpecialPrimitive(abbreviation);

  return (
    <div
      className={styles.instruction}
      style={{
        opacity,
        cursor,
      }}
    >
      <img
        className={styles.img}
        src={`/imgs/${abbreviation}.png`}
        alt={instructionName}
        draggable={false}
      />
      <p className={styles.name}>{instructionName}</p>
    </div>
  );
}
