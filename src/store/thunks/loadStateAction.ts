import { AppDispatch } from '@/store';
import { setRoutineState } from '@/store/routine/slice';
import { setTagState } from '@/store/tag/slice';
import { ExampleState } from '@/types';

export function loadStateAction(newState: ExampleState) {
  return (dispatch: AppDispatch) => {
    dispatch(setRoutineState(newState.routine));
    dispatch(setTagState(newState.tags));
  };
}
