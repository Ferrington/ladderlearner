import { Tag } from '@/types';
import { createNewTag } from '@/utils/createNewTag';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TagSlice = {
  byId: Record<string, Tag>;
  allIds: string[];
};

type NewTagInfo = {
  name: string;
  type: Tag['type'];
};

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    byId: {},
    allIds: [],
  } as TagSlice,
  reducers: {
    addTag(state, action: PayloadAction<NewTagInfo>) {
      const newTag = createNewTag(action.payload.name, action.payload.type);
      state.byId[newTag.name] = newTag;
      state.allIds.push(newTag.name);
    },
  },
});

export const { addTag } = tagSlice.actions;

export const tagReducer = tagSlice.reducer;
