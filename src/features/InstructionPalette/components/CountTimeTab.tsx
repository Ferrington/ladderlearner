import InstructionBoxPrimitive from '@/features/InstructionPalette/components/InstructionBoxPrimitive';
import PrimBoxDragWrapper from '@/features/InstructionPalette/components/PrimBoxDragWrapper';

const instructionList = ['CTU', 'CTD', 'TON', 'TOF'];

export default function CountTimeTab() {
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
