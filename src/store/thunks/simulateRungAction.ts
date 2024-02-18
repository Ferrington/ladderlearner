import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { AppDispatch, RootState } from '@/store';
import { Branch } from '@/store/routine/types';
import { selectElementById } from '@/store/routine/utils';
import { Instruction } from '@/types';

export function simulateRungAction(branchId: string) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    function simulate(element: Branch | Instruction, energized: boolean = true): boolean {
      if (element.type === 'Instruction') {
        return INSTRUCTION_PROPERTIES[element.abbreviated].evaluate({
          dispatch,
          state,
          instruction: element,
          parentEnergized: energized,
        });
      }

      let locallyEnergized = false;
      if (element.type === 'AND') {
        locallyEnergized = energized;

        element.children.forEach((childId) => {
          const child = selectElementById(state.routine, childId) as Branch | Instruction;
          const result = simulate(child, locallyEnergized);

          if (!result) locallyEnergized = false;
        });
      } else if (element.type === 'OR') {
        locallyEnergized = false;

        element.children.forEach((childId) => {
          const child = selectElementById(state.routine, childId) as Branch | Instruction;
          const result = simulate(child, energized);

          if (result) locallyEnergized = true;
        });
      }

      return locallyEnergized;
    }

    const state = getState();
    const branch = state.routine.branches[branchId];
    simulate(branch);
  };
}
