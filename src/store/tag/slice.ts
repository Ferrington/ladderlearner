import { Counter, Tag, Timer } from '@/types';
import { createNewTag } from '@/utils/createNewTag';
import { arrayMove } from '@dnd-kit/sortable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TagSlice = {
  byId: Record<string, Tag>;
  allIds: string[];
};

type AddTagPayload = {
  name: string;
  type: Tag['type'];
};

type SetTagPayload = {
  name: string;
  key?: string;
  value: number | boolean;
};

type ToggleTagPayload = {
  name: string;
  key?: string;
};

type ReorderTagPayload = {
  from: string;
  to: string;
};

const initialState: TagSlice = {
  byId: {},
  allIds: [],
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag(state, action: PayloadAction<AddTagPayload>) {
      const newTag = createNewTag(action.payload.name, action.payload.type);
      state.byId[newTag.name] = newTag;
      state.allIds.push(newTag.name);
    },
    setTagValue(state, action: PayloadAction<SetTagPayload>) {
      const { name, key, value } = action.payload;
      if (key == null) {
        state.byId[name].value = value;
        return;
      }

      if (state.byId[name].type === 'counter') {
        const counter = state.byId[name].value as Record<keyof Counter, number | boolean>;
        counter[key as keyof Counter] = value;
      } else if (state.byId[name].type === 'timer') {
        const timer = state.byId[name].value as Record<keyof Timer, number | boolean>;
        timer[key as keyof Timer] = value;
      }
    },
    toggleTagValue(state, action: PayloadAction<ToggleTagPayload>) {
      const { name, key } = action.payload;
      if (key == null) {
        state.byId[name].value = !state.byId[name].value;
        return;
      }

      if (state.byId[name].type === 'counter') {
        const counter = state.byId[name].value as Record<keyof Counter, number | boolean>;
        counter[key as keyof Counter] = !counter[key as keyof Counter];
      } else if (state.byId[name].type === 'timer') {
        const timer = state.byId[name].value as Record<keyof Timer, number | boolean>;
        timer[key as keyof Timer] = !timer[key as keyof Timer];
      }
    },
    deleteTag(state, action: PayloadAction<string>) {
      state.allIds = state.allIds.filter((id) => id !== action.payload);
      delete state.byId[action.payload];
    },
    setTagOrder(state, action: PayloadAction<ReorderTagPayload>) {
      const { from, to } = action.payload;
      const fromIndex = state.allIds.indexOf(from);
      const toIndex = state.allIds.indexOf(to);
      const nextOrder = arrayMove(state.allIds, fromIndex, toIndex);

      state.allIds = nextOrder;
    },
  },
});

export const { addTag, setTagValue, toggleTagValue, deleteTag, setTagOrder } = tagSlice.actions;

export const tagReducer = tagSlice.reducer;
