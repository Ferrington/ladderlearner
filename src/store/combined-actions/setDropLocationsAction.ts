import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { AppDispatch, RootState } from '@/store';
import { setDropLocations } from '@/store/base/slice';
import {
  getBranchLevelLocations,
  getDestructiveDropLocations,
  getNonDestructiveDropLocations,
} from '@/store/routine/utils';

export function setDropLocationsAction(instructionName: string | null) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    if (instructionName === null || instructionName === 'Rung') {
      dispatch(setDropLocations('none'));
    } else if (instructionName === 'Branch') {
      dispatch(setDropLocations('all'));
    } else if (instructionName === 'Branch Level') {
      const dropLocations = getBranchLevelLocations(state.routine);
      dispatch(setDropLocations(dropLocations));
    } else if (INSTRUCTION_PROPERTIES[instructionName].isDestructive) {
      const dropLocations = getDestructiveDropLocations(state.routine);
      dispatch(setDropLocations(dropLocations));
    } else if (!INSTRUCTION_PROPERTIES[instructionName].isDestructive) {
      const dropLocations = getNonDestructiveDropLocations(state.routine);
      dispatch(setDropLocations(dropLocations));
    } else {
      dispatch(setDropLocations('none'));
    }
  };
}
