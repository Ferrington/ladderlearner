import { RootState } from '@/store';
import { Counter, Instruction, Tag, Timer } from '@/types';
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

export function makeSelectTagOptions() {
  return createSelector(
    (store: RootState) => store.tags.byId,
    (_store: RootState, displayType: Instruction['displayType']) => displayType,
    (_store: RootState, _displayType: Instruction['displayType'], paramType?: Tag['type']) =>
      paramType,
    (
      _store: RootState,
      _displayType: Instruction['displayType'],
      _paramType?: Tag['type'],
      paramKey?: string,
    ) => paramKey,
    (tags, displayType, paramType, paramKey) => {
      const type = displayType === 'Special' ? 'bool' : paramType;

      if (paramKey != null && ['pre', 'acc'].includes(paramKey)) return [];

      const options: string[] = [];
      for (const tag of Object.values(tags)) {
        if (tag.type === 'counter' && type !== 'counter') {
          if (type == 'number') options.push(`${tag.name}.acc`, `${tag.name}.pre`);
          else if (type == 'bool') options.push(`${tag.name}.dn`);
        } else if (tag.type === 'timer' && type !== 'timer') {
          if (type == 'number') options.push(`${tag.name}.acc`, `${tag.name}.pre`);
          else if (type == 'bool') options.push(`${tag.name}.dn`, `${tag.name}.tt`);
        } else {
          if (tag.type !== type) continue;

          options.push(tag.name);
        }
      }

      return options;
    },
  );
}
