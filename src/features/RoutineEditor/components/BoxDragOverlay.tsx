import BoxDragWrapper from '@/features/RoutineEditor/components/BoxDragWrapper';
import InstructionBox from '@/features/RoutineEditor/components/InstructionBox';

type Props = {
  instructionId: string;
  destructive: boolean;
};

export default function BoxDragOverlay({ instructionId, destructive }: Props) {
  // const dragOverlay = (
  //   <InstructionBox
  //     instructionId={instructionId}
  //     routine={routine}
  //     beingDragged={true}
  //   />
  // );

  return (
    <BoxDragWrapper
      // instructionId={instructionId}
      // dragOverlay={dragOverlay}
      destructive={destructive}
    >
      <InstructionBox instructionId={instructionId} beingDragged={false}>
        {/* {instructionChild} */}
      </InstructionBox>
    </BoxDragWrapper>
  );
}
