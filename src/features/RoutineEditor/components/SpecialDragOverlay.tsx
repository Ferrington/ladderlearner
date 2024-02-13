import InstructionSpecial from '@/features/RoutineEditor/components/InstructionSpecial';
import SpecialDragWrapper from '@/features/RoutineEditor/components/SpecialDragWrapper';
import { ReactNode } from 'react';

type Props = {
  instructionId: string;
  instructionChild: ReactNode;
  destructive: boolean;
};

export default function SpecialDragOverlay({
  instructionId,
  instructionChild,
  destructive,
}: Props) {
  const dragOverlay = <InstructionSpecial instructionId={instructionId} beingDragged={true} />;

  return (
    <SpecialDragWrapper
      instructionId={instructionId}
      dragOverlay={dragOverlay}
      destructive={destructive}
    >
      <InstructionSpecial instructionId={instructionId} beingDragged={false}>
        {instructionChild}
      </InstructionSpecial>
    </SpecialDragWrapper>
  );
}
