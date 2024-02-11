import InstructionBoxPrimitive from '@/features/InstructionPalette/components/InstructionBoxPrimitive';

const instructionList = ['EQU', 'NEQ', 'GRT', 'GEQ', 'LES', 'LEQ'];

export default function CompareTab() {
  return (
    <>
      {instructionList.map((instruction) => {
        // const dragOverlay = (
        //   <InstructionBoxPrimitive instructionId={instruction} />
        // );

        return (
          // <PrimBoxDragWrapper
          //   key={instruction}
          //   instructionId={instruction}
          //   dragOverlay={dragOverlay}
          // >
          <InstructionBoxPrimitive key={instruction} instructionId={instruction} />
          // </PrimBoxDragWrapper>
        );
      })}
    </>
  );
}
