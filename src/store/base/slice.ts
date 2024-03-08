import {
  deleteBranch,
  deleteInstruction,
  insertBranch,
  insertBranchLevel,
  insertInstruction,
} from '@/store/routine/slice';
import { ValidDropLocations } from '@/types';
import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

export type BaseSlice = {
  draggingRungIndex: number | null;
  rungDropLocations: number[] | null;
  draggingInstructionId: string | null;
  dropLocations: ValidDropLocations | 'none' | 'all';
  globalEditMode: boolean;
  runSimulation: boolean;
  heightAdjust: boolean;
  activeRoutine: number | null;
};

const initialState: BaseSlice = {
  draggingRungIndex: null,
  rungDropLocations: null,
  draggingInstructionId: null,
  dropLocations: 'none',
  globalEditMode: false,
  runSimulation: false,
  heightAdjust: false,
  activeRoutine: null,
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
    setActiveRoutine(state, action: PayloadAction<number | null>) {
      state.activeRoutine = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(insertInstruction, deleteInstruction, insertBranch, insertBranchLevel, deleteBranch),
      (state) => void (state.heightAdjust = !state.heightAdjust),
    );
  },
});

export const {
  setDraggingRungIndex,
  setDropLocations,
  setDraggingInstructionId,
  setGlobalEditMode,
  setRunSimulation,
  setActiveRoutine,
} = baseSlice.actions;

export const baseReducer = baseSlice.reducer;
