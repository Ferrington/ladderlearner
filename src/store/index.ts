import { baseReducer } from '@/store/base/slice';
import { stateStr } from '@/store/premade-states/emptyState';
import { routineReducer } from '@/store/routine/slice';
import { tagReducer } from '@/store/tag/slice';
import { decompressState } from '@/utils/decompressState';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  base: baseReducer,
  tags: tagReducer,
  routine: routineReducer,
});

const emptyState = decompressState(stateStr);

const initialState: RootState = {
  routine: emptyState.routine,
  tags: emptyState.tags,
  base: {
    draggingRungIndex: null,
    rungDropLocations: null,
    draggingInstructionId: null,
    dropLocations: 'none',
    globalEditMode: false,
    runSimulation: false,
  },
};

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore(initialState);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch: () => AppDispatch = useDispatch;
