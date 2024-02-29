import { RootState } from '@/store';
import {
  makeSelectBranchChildren,
  makeSelectDestructiveChildIndex,
  selectBranchChildrenIds,
} from '@/store/routine/selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useBranchAnd(branchId: string) {
  const childrenIds = useSelector(selectBranchChildrenIds(branchId));
  const selectBranchChildren = useMemo(makeSelectBranchChildren, []);
  const children = useSelector((state: RootState) => selectBranchChildren(state, childrenIds));

  const selectDestructiveChildIndex = useMemo(makeSelectDestructiveChildIndex, []);
  const destructiveLoc = useSelector((state: RootState) =>
    selectDestructiveChildIndex(state, branchId),
  );

  return {
    children,
    destructiveLoc,
  };
}
