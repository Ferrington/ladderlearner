import { RootState } from '@/store';
import { Instruction } from '@/types';

export function selectDraggingRungIndex(state: RootState) {
  return state.base.draggingRungIndex;
}

export function selectRungDropLocations(state: RootState) {
  return state.base.rungDropLocations;
}

export function selectDraggingInstructionId(state: RootState) {
  return state.base.draggingInstructionId;
}

export function selectDropLocations(state: RootState) {
  return state.base.dropLocations;
}

export function selectGlobalEditMode(state: RootState) {
  return state.base.globalEditMode;
}

export function selectRunSimulation(state: RootState) {
  return state.base.runSimulation;
}

export function selectTagsAreUnassigned(state: RootState) {
  return Object.values(state.routine.instructions).some(tagsAreUnassigned);
}

export function selectHeightAdjust(state: RootState) {
  return state.base.heightAdjust;
}

export function selectActiveRoutine(state: RootState) {
  return state.base.activeRoutine;
}

function tagsAreUnassigned(instruction: Instruction) {
  if (instruction.displayType === 'Special') {
    return instruction.tag === null && instruction.abbreviated !== 'ONS';
  } else {
    return Object.values(instruction.parameters).some((param) => param.value == null);
  }
}
