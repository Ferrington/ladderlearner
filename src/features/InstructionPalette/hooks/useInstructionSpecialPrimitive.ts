import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import {
  selectDraggingInstructionId,
  selectDraggingRungIndex,
  selectRunSimulation,
} from '@/store/base/selectors';
import { useSelector } from 'react-redux';

export function useInstructionSpecialPrimitive(abbreviation: string) {
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const draggingRungIndex = useSelector(selectDraggingRungIndex);
  const runSimulation = useSelector(selectRunSimulation);
  const instructionBeingDragged = draggingInstructionId === abbreviation;
  const rungBeingDragged = abbreviation === 'Rung' && draggingRungIndex === -1;

  const instruction = INSTRUCTION_PROPERTIES[abbreviation];
  if (instruction.displayType === 'box') {
    throw new Error('Tried to create Special Instruction with type: InstructionBoxProperties');
  }

  let cursor;
  if (runSimulation) {
    cursor = 'default';
  } else {
    cursor = instructionBeingDragged ? 'grabbing' : 'grab';
  }

  const opacity = instructionBeingDragged || rungBeingDragged ? 0.5 : 1;

  return {
    opacity,
    cursor,
    instructionName: instruction.name,
  };
}
