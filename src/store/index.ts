import { baseReducer } from '@/store/base/slice';
import { routineSlice, tagSlice } from '@/store/premade-states/trafficLight';
import { routineReducer } from '@/store/routine/slice';
import { tagReducer } from '@/store/tag/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  base: baseReducer,
  tags: tagReducer,
  routine: routineReducer,
});

const initialState: RootState = {
  routine: routineSlice,
  tags: tagSlice,
  base: {
    draggingRungIndex: null,
    rungDropLocations: null,
    draggingInstructionId: null,
    dropLocations: 'none',
    globalEditMode: false,
    runSimulation: false,
    tagsAreUnassigned: false,
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
