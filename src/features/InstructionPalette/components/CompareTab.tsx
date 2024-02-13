import InstructionBoxPrimitive from '@/features/InstructionPalette/components/InstructionBoxPrimitive';
import PrimBoxDragWrapper from '@/features/InstructionPalette/components/PrimBoxDragWrapper';

const instructionList = ['EQU', 'NEQ', 'GRT', 'GEQ', 'LES', 'LEQ'];

export default function CompareTab() {
  return (
    <>
      {instructionList.map((abbreviation) => {
        const dragOverlay = <InstructionBoxPrimitive abbreviation={abbreviation} />;

        return (
          <PrimBoxDragWrapper
            key={abbreviation}
            abbreviation={abbreviation}
            dragOverlay={dragOverlay}
          >
            <InstructionBoxPrimitive key={abbreviation} abbreviation={abbreviation} />
          </PrimBoxDragWrapper>
        );
      })}
    </>
  );
}
