import InstructionBoxPrimitive from '@/features/InstructionPalette/components/InstructionBoxPrimitive';

const instructionList = ['ADD', 'SUB', 'MUL', 'DIV', 'MOV'];

export default function MathTab() {
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
          <InstructionBoxPrimitive key={instruction} abbreviation={instruction} />
          // </PrimBoxDragWrapper>
        );
      })}
    </>
  );
}
