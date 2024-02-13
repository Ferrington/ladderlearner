import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { selectRunSimulation } from '@/store/base/selectors';
import { useDraggable } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  abbreviation: string;
  dragOverlay: ReactNode;
  children?: ReactNode;
};

export default function PrimSpecialDragWrapper({ abbreviation, children, dragOverlay }: Props) {
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

  return {
    id: 'instruction' + nanoid(),
    type: 'Instruction',
    displayType: 'Special',
    abbreviated: abbreviation,
    tag: null,
    parent: '',
    isDestructive: instruction.isDestructive,
    energized: false,
  };
}
