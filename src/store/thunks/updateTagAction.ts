import { RootState } from '@/store';
import { setNestedValue } from '@/store/routine/slice';
import { setTagValue } from '@/store/tag/slice';
import { Dispatch } from '@reduxjs/toolkit';

type Params = {
  name: string;
  key?: string;
  value: number | boolean;
};

export function updateTagAction({ name, key, value }: Params) {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setTagValue({ name, key, value }));
    if (key == null) return;

    const state = getState();
    const instructions = state.routine.instructions;
    for (const instruction of Object.values(instructions)) {
      if (instruction.displayType !== 'Box') continue;

      if (
        (['CTU', 'CTD'].includes(instruction.abbreviated) &&
          instruction.parameters.Counter.value === name) ||
        (['TON', 'TOF'].includes(instruction.abbreviated) &&
          instruction.parameters.Timer.value === name)
      ) {
        dispatch(setNestedValue({ instructionId: instruction.id, key, value }));
      }
    }
  };
}
