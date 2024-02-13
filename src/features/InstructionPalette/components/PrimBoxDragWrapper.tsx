import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { selectRunSimulation } from '@/store/base/selectors';
import { useDraggable } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  abbreviation: string;
  children?: ReactNode;
  dragOverlay: ReactNode;
};

export default function PrimBoxDragWrapper({ abbreviation, children, dragOverlay }: Props) {
  const runSimulation = useSelector(selectRunSimulation);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: abbreviation,
    data: {
      dragOverlay,
      instruction: generateInstruction(abbreviation),
    },
    disabled: runSimulation,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

function generateInstruction(abbreviation: string) {
  const instruction = INSTRUCTION_PROPERTIES[abbreviation];

  if (instruction.displayType === 'special')
    throw new Error('Attempted to generate InstructionSpecial in PrimBoxDragWrapper.');

  return {
    id: 'instruction' + nanoid(),
    type: 'Instruction',
    name: instruction.name,
    description: instruction.description,
    displayType: 'Box',
    abbreviated: abbreviation,
    parameters: structuredClone(instruction.parameters),
    parent: '',
    isDestructive: instruction.isDestructive,
    energized: false,
  };
}
