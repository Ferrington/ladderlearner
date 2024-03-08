import { AppDispatch } from '@/store';
import { setActiveRoutine } from '@/store/base/slice';
import { loadStateAction } from '@/store/thunks/loadStateAction';
import { ExampleState } from '@/types';

export function loadSavedRoutineAction(newState: ExampleState, activeRoutine: number | null) {
  return (dispatch: AppDispatch) => {
    dispatch(setActiveRoutine(activeRoutine));
    dispatch(loadStateAction(newState));
  };
}
