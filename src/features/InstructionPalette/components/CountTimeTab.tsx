import InstructionBoxPrimitive from '@/features/InstructionPalette/components/InstructionBoxPrimitive';

const instructionList = ['CTU', 'CTD', 'TON', 'TOF'];

export default function CountTimeTab() {
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
