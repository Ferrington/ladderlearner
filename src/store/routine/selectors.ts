import { RootState } from '@/store';
import { hasDestructiveChild, selectElementById } from '@/store/routine/utils';
import { createSelector } from '@reduxjs/toolkit';

export function selectRungIds(store: RootState) {
  return store.routine.rungs.allIds;
}

export const selectMainBranches = createSelector(
  (store: RootState) => store.routine.rungs.byId,
  (rungs) => {
    return Object.values(rungs).map((rung) => rung.child);
  },
);

export function selectRungById(rungId: string) {
  return (store: RootState) => store.routine.rungs.byId[rungId];
}

export function selectRungChild(rungId: string) {
  return (store: RootState) => store.routine.rungs.byId[rungId].child;
}

export function selectBranchById(branchId: string) {
  return (store: RootState) => store.routine.branches[branchId];
}

export function selectBranchParentById(branchId: string) {
  return (store: RootState) => {
    const parentId = store.routine.branches[branchId].parent;
    return store.routine.branches[parentId];
  };
}

export function selectBranchChildrenIds(branchId: string) {
  return (store: RootState) => {
    return store.routine.branches[branchId].children;
  };
}

export function selectInstructionById(id: string) {
  return (store: RootState) => store.routine.instructions[id];
}

export function makeSelectIsOutput() {
  return createSelector(
    (store: RootState) => store.routine.instructions,
    (_store: RootState, tagName: string) => tagName,
    (instructions, tagName) => {
      for (const instruction of Object.values(instructions)) {
        const hasTag = instruction.displayType === 'Special' && instruction.tag === tagName;
        if (hasTag && instruction.isDestructive) return true;
      }
      return false;
    },
  );
}

export function makeSelectBranchChildren() {
  return createSelector(
    (store: RootState) => store.routine,
    (_store: RootState, children: string[]) => children,
    (routine, children) => {
      return children.map((id) => selectElementById(routine, id));
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

export function makeSelectExtraLandingPadLocation() {
  return createSelector(
    (store: RootState) => store.routine,
    (_store: RootState, branchId: string) => branchId,
    (store: RootState, branchId: string) => selectBranchById(branchId)(store),
    (routine, _branchId, branch) => {
      const destructives = branch.children.map((id) => hasDestructiveChild(routine, id));

      const index = destructives.indexOf(true);
      return index > -1 ? index : branch.children.length;
    },
  );
}
