import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { selectDraggingInstructionId, selectRunSimulation } from '@/store/base/selectors';
import { useSelector } from 'react-redux';

export function useInstructionBoxPrimitive(abbreviation: string) {
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const runSimulation = useSelector(selectRunSimulation);
  const instructionBeingDragged = draggingInstructionId === abbreviation;

  const instruction = INSTRUCTION_PROPERTIES[abbreviation];
  if (instruction.displayType === 'special') {
    throw new Error('Tried to create Box Instruction with type: InstructionSpecialProperties');
  }

  let cursor;
  if (runSimulation) {
    cursor = 'default';
  } else {
    cursor = instructionBeingDragged ? 'grabbing' : 'grab';
  }

  const opacity = instructionBeingDragged ? 0.5 : 1;

  return {
    opacity,
    cursor,
    instruction,
  };
}
