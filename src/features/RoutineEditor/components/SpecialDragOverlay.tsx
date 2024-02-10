import InstructionSpecial from '@/features/RoutineEditor/components/InstructionSpecial';
import SpecialDragWrapper from '@/features/RoutineEditor/components/SpecialDragWrapper';

type Props = {
  instructionId: string;
  destructive: boolean;
};

export default function SpecialDragOverlay({ instructionId, destructive }: Props) {
  // const dragOverlay = (
  //   <InstructionSpecial
  //     instructionId={instructionId}
  //     routine={routine}
  //     beingDragged={true}
  //   />
  // );

  return (
    <SpecialDragWrapper
      // instructionId={instructionId}
      // dragOverlay={dragOverlay}
      destructive={destructive}
    >
      <InstructionSpecial instructionId={instructionId} beingDragged={false}>
        {/* {instructionChild} */}
      </InstructionSpecial>
    </SpecialDragWrapper>
  );
}
