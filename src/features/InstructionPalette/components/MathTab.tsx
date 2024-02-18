import InstructionBoxPrimitive from '@/features/InstructionPalette/components/InstructionBoxPrimitive';
import PrimBoxDragWrapper from '@/features/InstructionPalette/components/PrimBoxDragWrapper';

const instructionList = ['ADD', 'SUB', 'MUL', 'DIV', 'MOV'];

export default function MathTab() {
  return (
    <>
      {instructionList.map((instruction) => {
        const dragOverlay = <InstructionBoxPrimitive abbreviation={instruction} />;

        return (
          <PrimBoxDragWrapper
            key={instruction}
            abbreviation={instruction}
            dragOverlay={dragOverlay}
          >
            <InstructionBoxPrimitive key={instruction} abbreviation={instruction} />
          </PrimBoxDragWrapper>
        );
      })}
    </>
  );
}
