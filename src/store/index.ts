import { routineReducer } from '@/store/routine/routineSlice';
import { tagReducer } from '@/store/tag/tagSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({ tags: tagReducer, routine: routineReducer });

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch: () => AppDispatch = useDispatch;
