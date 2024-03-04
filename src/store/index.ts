import { baseReducer } from '@/store/base/slice';
import { stateStr as emptyStateStr } from '@/store/premade-states/emptyState';
import { routineReducer } from '@/store/routine/slice';
import { tagReducer } from '@/store/tag/slice';
import { compressState } from '@/utils/compressState';
import { decompressState } from '@/utils/decompressState';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

if (localStorage.getItem('version') !== APP_VERSION) {
  localStorage.clear();
  localStorage.setItem('version', APP_VERSION);
}

const savedStateStr = localStorage.getItem('state');

const rootReducer = combineReducers({
  base: baseReducer,
  tags: tagReducer,
  routine: routineReducer,
});

const initialStatePartial = savedStateStr
  ? decompressState(savedStateStr)
  : decompressState(emptyStateStr);
const initialState: RootState = {
  routine: initialStatePartial.routine,
  tags: initialStatePartial.tags,
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

store.subscribe(() => {
  const state = store.getState();
  const partialState = {
    routine: state.routine,
    tags: state.tags,
  };
  localStorage.setItem('state', compressState(partialState));
});
