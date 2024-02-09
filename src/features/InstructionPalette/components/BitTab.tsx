import InstructionSpecialPrimitive from '@/features/InstructionPalette/components/InstructionSpecialPrimitive';

const instructionList = ['XIC', 'XIO', 'ONS', 'OTE', 'OTL', 'OTU'];

export default function BitTab() {
  return (
    <>
      {instructionList.map((instruction) => {
        // const dragOverlay = (
        //   <InstructionSpecialPrimitive instructionId={instruction} />
        // );

        return (
          // <PrimSpecialDragWrapper
          //   key={instruction}
          //   instructionId={instruction}
          //   dragOverlay={dragOverlay}
          // >
          <InstructionSpecialPrimitive key={instruction} instructionId={instruction} />
          // </PrimSpecialDragWrapper>
        );
      })}
    </>
  );
}
