import { createSlice } from '@reduxjs/toolkit';

export type BaseSlice = {
  draggingRungIndex: number | null;
  rungDropLocations: number[] | null;
  draggingInstructionId: string | null;
  dropLocations: Record<string, number> | 'none' | 'all';
  editMode: boolean;
  runSimulation: boolean;
  tagsAreUnassigned: boolean;
};

const initialState: BaseSlice = {
  draggingRungIndex: null,
  rungDropLocations: null,
  draggingInstructionId: null,
  dropLocations: 'none',
  editMode: false,
  runSimulation: false,
  tagsAreUnassigned: false,
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {},
});

export const baseReducer = baseSlice.reducer;
