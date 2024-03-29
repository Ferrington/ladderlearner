import BoxDragOverlay from '@/features/RoutineEditor/components/BoxDragOverlay';
import BranchOr from '@/features/RoutineEditor/components/BranchOr';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import SpecialDragOverlay from '@/features/RoutineEditor/components/SpecialDragOverlay';
import { useBranchAnd } from '@/features/RoutineEditor/hooks/useBranchAnd';
import { ReactNode, memo } from 'react';

type Props = {
  branchId: string;
  extraLandingPadLoc?: number;
  children?: ReactNode;
};

const BranchAnd = memo(function BranchAnd({
  branchId,
  extraLandingPadLoc,
  children: componentChildren,
}: Props) {
  const { children, destructiveLoc } = useBranchAnd(branchId);

  return (
    <>
      {children.map((ele, i) => {
        const landingPadGoesHere = extraLandingPadLoc != null && extraLandingPadLoc - 1 === i;

        if (ele.type === 'OR') {
          return (
            <BranchOr key={ele.id} branchId={ele.id} destructive={destructiveLoc === i}>
              {landingPadGoesHere && (
                <InstructionDropArea
                  parent={branchId}
                  index={extraLandingPadLoc}
                  extra={extraLandingPadLoc}
                />
              )}
            </BranchOr>
          );
        } else if (ele.type === 'Instruction' && ele.displayType === 'Special') {
          const instructionChild = landingPadGoesHere && (
            <InstructionDropArea
              parent={branchId}
              index={extraLandingPadLoc}
              extra={extraLandingPadLoc}
            />
          );

          return (
            <SpecialDragOverlay
              key={ele.id}
              instructionId={ele.id}
              instructionChild={instructionChild}
              destructive={destructiveLoc === i}
            />
          );
        } else if (ele.type === 'Instruction' && ele.displayType === 'Box') {
          const instructionChild = landingPadGoesHere && (
            <InstructionDropArea
              parent={branchId}
              index={extraLandingPadLoc}
              extra={extraLandingPadLoc}
            />
          );
          return (
            <BoxDragOverlay
              key={ele.id}
              instructionId={ele.id}
              instructionChild={instructionChild}
              destructive={destructiveLoc === i}
            />
          );
        } else {
          throw new Error(`Unexpected child of BranchAnd: ${branchId}`);
        }
      })}
      {componentChildren}
    </>
  );
});

export default BranchAnd;
