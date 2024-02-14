import { AppDispatch, RootState } from '@/store';
import { updateTagAction } from '@/store/thunks/updateTagAction';
import { Counter, Timer } from '@/types';

export function setBoxTagNameAction(name: string, instructionId: string, key: string) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    const instruction = state.routine.instructions[instructionId];
    if (instruction.displayType !== 'Box') return;

    // normal update if not a timer or counter
    if (!['TON', 'TOF', 'CTU', 'CTD'].includes(instruction.abbreviated)) {
      dispatch({
        type: 'routine/setBoxTagName',
        payload: {
          name,
          instructionId,
          key,
        },
      });
      return;
    }

    // deal with nested values
    if (['Timer', 'Counter'].includes(key)) {
      dispatch({
        type: 'routine/setBoxTagName',
        payload: {
          name,
          instructionId,
          key,
        },
      });

      const obj = state.tags.byId[name].value as Timer | Counter;

      dispatch({
        type: 'routine/setNestedValues',
        payload: {
          instructionId,
          obj,
        },
      });
    } else {
      let tagName = '';
      if (['TON', 'TOF'].includes(instruction.abbreviated)) {
        tagName = instruction.parameters.Timer.value as string;
      } else if (['CTU', 'CTD'].includes(instruction.abbreviated)) {
        tagName = instruction.parameters.Counter.value as string;
      }
      dispatch(updateTagAction({ name: tagName, key, value: Number(name) }));
    }
  };
}
