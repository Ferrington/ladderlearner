import { RootState } from '@/store';
import { hasDestructiveChild, selectElementById } from '@/store/routine/utils';
import { createSelector } from '@reduxjs/toolkit';

export function selectRungIds(store: RootState) {
  return store.routine.rungs.allIds;
}

export function selectRungById(rungId: string) {
  return (store: RootState) => store.routine.rungs.byId[rungId];
}

export function selectRungChild(rungId: string) {
  return (store: RootState) => store.routine.rungs.byId[rungId].child;
}

export function selectBranchById(branchId: string) {
  return (store: RootState) => store.routine.branches[branchId];
}

export function selectInstructionById(id: string) {
  return (store: RootState) => store.routine.instructions[id];
}

export function makeSelectBranchChildren() {
  return createSelector(
    (store: RootState) => store.routine,
    (_store: RootState, branchId: string) => branchId,
    (routine, branchId) => {
      return routine.branches[branchId].children.map((id) => selectElementById(routine, id));
    },
  );
}

export function makeSelectDestructiveChildIndex() {
  return createSelector(
    (store: RootState) => store.routine,
    (_store: RootState, branchId: string) => branchId,
    (store: RootState, branchId: string) => selectBranchById(branchId)(store),
    (routine, branchId, branch) => {
      const children = routine.branches[branchId].children;
      for (let i = 0; i < children.length; i++) {
        if (hasDestructiveChild(routine, branch.children[i])) return i;
      }
      return -1;
    },
  );
}
