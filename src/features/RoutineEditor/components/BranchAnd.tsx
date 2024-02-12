import BoxDragOverlay from '@/features/RoutineEditor/components/BoxDragOverlay';
import BranchOr from '@/features/RoutineEditor/components/BranchOr';
import SpecialDragOverlay from '@/features/RoutineEditor/components/SpecialDragOverlay';
import { RootState } from '@/store';
import {
  makeSelectBranchChildren,
  selectDestructiveChildIndex,
} from '@/store/routine/routineSelectors';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  branchId: string;
  children?: ReactNode;
};

export default function BranchAnd({ branchId, children: componentChildren }: Props) {
  const selectBranchChildren = useMemo(makeSelectBranchChildren, []);
  const children = useSelector((state: RootState) => selectBranchChildren(state, branchId));

  const destructiveLoc = useSelector(selectDestructiveChildIndex(branchId));

  return (
    <>
      {children.map((ele, i) => {
        // const landingPadGoesHere = extraLandingPadLoc != null && extraLandingPadLoc - 1 === i;

        if (ele.type === 'OR') {
          return (
            <BranchOr key={ele.id} branchId={ele.id} destructive={destructiveLoc === i}>
              {/* {landingPadGoesHere && (
                <InstructionDropArea
                  parent={branch.id}
                  index={extraLandingPadLoc}
                  extra={extraLandingPadLoc}
                />
              )} */}
            </BranchOr>
          );
        } else if (ele.type === 'Instruction' && ele.displayType === 'Special') {
          // const instructionChild = landingPadGoesHere && (
          //   <InstructionDropArea
          //     parent={branch.id}
          //     index={extraLandingPadLoc}
          //     extra={extraLandingPadLoc}
          //   />
          // );

          return (
            <SpecialDragOverlay
              key={ele.id}
              instructionId={ele.id}
              // instructionChild={instructionChild}
              destructive={destructiveLoc === i}
            />
          );
        } else if (ele.type === 'Instruction' && ele.displayType === 'Box') {
          // const instructionChild = landingPadGoesHere && (
          //   <InstructionDropArea
          //     parent={branch.id}
          //     index={extraLandingPadLoc}
          //     extra={extraLandingPadLoc}
          //   />
          // );
          return (
            <BoxDragOverlay
              key={ele.id}
              instructionId={ele.id}
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
}
