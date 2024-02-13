import { RootState } from '@/store';

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
  return state.base.tagsAreUnassigned;
}
