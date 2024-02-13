import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BaseSlice = {
  draggingRungIndex: number | null;
  rungDropLocations: number[] | null;
  draggingInstructionId: string | null;
  dropLocations: Record<string, number> | 'none' | 'all';
  globalEditMode: boolean;
  runSimulation: boolean;
  tagsAreUnassigned: boolean;
};

const initialState: BaseSlice = {
  draggingRungIndex: null,
  rungDropLocations: null,
  draggingInstructionId: null,
  dropLocations: 'none',
  globalEditMode: false,
  runSimulation: false,
  tagsAreUnassigned: false,
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setDraggingRungIndex(state, action: PayloadAction<number | null>) {
      state.draggingRungIndex = action.payload;
    },
    setDraggingInstructionId(state, action: PayloadAction<string | null>) {
      state.draggingInstructionId = action.payload;
    },
    setGlobalEditMode(state, action: PayloadAction<boolean>) {
      state.globalEditMode = action.payload;
    },
    setRunSimulation(state, action: PayloadAction<boolean>) {
      state.runSimulation = action.payload;
    },
    setTagsAreUnassigned(state, action: PayloadAction<boolean>) {
      state.tagsAreUnassigned = action.payload;
    },
  },
});

export const {
  setDraggingRungIndex,
  setDraggingInstructionId,
  setGlobalEditMode,
  setRunSimulation,
  setTagsAreUnassigned,
} = baseSlice.actions;

export const baseReducer = baseSlice.reducer;
