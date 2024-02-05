import { tagReducer } from '@/store/tag/tagSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tags: tagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
