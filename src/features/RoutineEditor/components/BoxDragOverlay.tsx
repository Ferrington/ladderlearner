import BoxDragWrapper from '@/features/RoutineEditor/components/BoxDragWrapper';
import InstructionBox from '@/features/RoutineEditor/components/InstructionBox';
import { ReactNode } from 'react';

type Props = {
  instructionId: string;
  instructionChild: ReactNode;
  destructive: boolean;
};

export default function BoxDragOverlay({ instructionId, instructionChild, destructive }: Props) {
  const dragOverlay = <InstructionBox instructionId={instructionId} beingDragged={true} />;

  return (
    <BoxDragWrapper
      instructionId={instructionId}
      dragOverlay={dragOverlay}
      destructive={destructive}
    >
      <InstructionBox instructionId={instructionId} beingDragged={false}>
        {instructionChild}
      </InstructionBox>
    </BoxDragWrapper>
  );
}
