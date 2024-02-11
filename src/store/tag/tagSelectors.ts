import { RootState } from '@/store';
import { Counter, Timer } from '@/types';
import { createSelector } from '@reduxjs/toolkit';

export const selectTagsAsList = createSelector(
  (state: RootState) => state.tags,
  (tags) => tags.allIds.map((id) => tags.byId[id]),
);

export function selectTags(store: RootState) {
  return store.tags.byId;
}

export function selectTagValueById(id: string) {
  return (store: RootState) => {
    if (!id.includes('.')) return store.tags.byId[id].value;

    const [tagId, key] = id.split('.');

    if (store.tags.byId[tagId].type === 'counter') {
      const counter = store.tags.byId[tagId].value as Record<keyof Counter, number | boolean>;
      return counter[key as keyof Counter];
    } else if (store.tags.byId[tagId].type === 'timer') {
      const timer = store.tags.byId[tagId].value as Record<keyof Timer, number | boolean>;
      return timer[key as keyof Timer];
    }
  };
}
