import { ValidDropLocations } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BaseSlice = {
  draggingRungIndex: number | null;
  rungDropLocations: number[] | null;
  draggingInstructionId: string | null;
  dropLocations: ValidDropLocations | 'none' | 'all';
  globalEditMode: boolean;
  runSimulation: boolean;
};

const initialState: BaseSlice = {
  draggingRungIndex: null,
  rungDropLocations: null,
  draggingInstructionId: null,
  dropLocations: 'none',
  globalEditMode: false,
  runSimulation: false,
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setDraggingRungIndex(state, action: PayloadAction<number | null>) {
      state.draggingRungIndex = action.payload;
    },
    setDropLocations(state, action: PayloadAction<ValidDropLocations | 'none' | 'all'>) {
      state.dropLocations = action.payload;
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
  },
});

export const {
  setDraggingRungIndex,
  setDropLocations,
  setDraggingInstructionId,
  setGlobalEditMode,
  setRunSimulation,
} = baseSlice.actions;

export const baseReducer = baseSlice.reducer;
