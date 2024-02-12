import { RootState } from '@/store';
import { RoutineSlice } from '@/store/routine/routineSlice';
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

export function selectDestructiveChildIndex(branchId: string) {
  return (store: RootState) => {
    return createSelector(
      (store: RootState) => store.routine,
      (store: RootState) => selectBranchById(branchId)(store),
      (routine, branch) => {
        const children = routine.branches[branchId].children;
        for (let i = 0; i < children.length; i++) {
          if (hasDestructiveChild(routine, branch.children[i])) return i;
        }
        return -1;
      },
    )(store);
  };
}

function hasDestructiveChild(routine: RoutineSlice, id: string): boolean {
  const element = selectElementById(routine, id);

  if (element.type === 'Rung') throw new Error('Rungs cannot be children of branches');
  else if (element.type === 'Instruction') return element.isDestructive;

  for (const childId of element.children) {
    if (hasDestructiveChild(routine, childId)) return true;
  }
  return false;
}

function selectElementById(routine: RoutineSlice, id: string) {
  if (id in routine.branches) return routine.branches[id];
  else if (id in routine.instructions) return routine.instructions[id];
  else if (id in routine.rungs.byId) return routine.rungs.byId[id];
  throw new Error(`Element with id ${id} not found`);
}
