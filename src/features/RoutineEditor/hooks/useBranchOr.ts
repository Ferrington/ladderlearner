import { RootState, store } from '@/store';
import { selectGlobalEditMode } from '@/store/base/selectors';
import {
  makeSelectBranchChildren,
  selectBranchChildrenIds,
  selectBranchParentById,
} from '@/store/routine/selectors';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export function useBranchOr(branchId: string) {
  const orRef = useRef<HTMLDivElement>(null);
  const [orHeight, setOrHeight] = useState(0);
  const [heightAdjust, setHeightAdjust] = useState(false);

  const globalEditMode = useSelector(selectGlobalEditMode);
  const childrenIds = useSelector(selectBranchChildrenIds(branchId));
  const selectBranchChildren = useMemo(makeSelectBranchChildren, []);
  const children = useSelector((state: RootState) => selectBranchChildren(state, childrenIds));
  const parent = useSelector(selectBranchParentById(branchId));

  store.subscribe(() => {
    setHeightAdjust(!heightAdjust);
  });

  useLayoutEffect(() => {
    if (!orRef.current) return;

    const children = orRef.current.querySelectorAll<HTMLDivElement>(
      `:scope > .rung--branch:not(.last-branch)`,
    );
    const height = [...children].reduce((sum, child) => sum + child.offsetHeight, 0);
    setOrHeight(height);
  }, [heightAdjust, globalEditMode]);

  return {
    orRef,
    children,
    parent,
    orHeight,
  };
}
