import InstructionSpecialPrimitive from '@/features/InstructionPalette/components/InstructionSpecialPrimitive';
import PrimSpecialDragWrapper from '@/features/InstructionPalette/components/PrimSpecialDragWrapper';

const instructionList = ['XIC', 'XIO', 'ONS', 'OTE', 'OTL', 'OTU'];

export default function BitTab() {
  return (
    <>
      {instructionList.map((abbreviation) => {
        const dragOverlay = <InstructionSpecialPrimitive abbreviation={abbreviation} />;

        return (
          <PrimSpecialDragWrapper
            key={abbreviation}
            abbreviation={abbreviation}
            dragOverlay={dragOverlay}
          >
            <InstructionSpecialPrimitive key={abbreviation} abbreviation={abbreviation} />
          </PrimSpecialDragWrapper>
        );
      })}
    </>
  );
}
