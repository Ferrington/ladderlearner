import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectTagsAsList = createSelector(
  (state: RootState) => state.tags,
  (tags) => tags.allIds.map((id) => tags.byId[id]),
);
