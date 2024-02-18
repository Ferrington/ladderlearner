import { reducers } from '@/store/routine/reducers';
import { Branch, Rung } from '@/store/routine/types';
import { Instruction } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export type RoutineSlice = {
  rungs: {
    byId: Record<string, Rung>;
    allIds: string[];
  };
  branches: Record<string, Branch>;
  instructions: Record<string, Instruction>;
};

const initialState: RoutineSlice = {
  rungs: {
    byId: {},
    allIds: [],
  },
  branches: {},
  instructions: {},
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers,
});

export const {
  setRoutineState,
  setSpecialTagName,
  setBoxTagName,
  setNestedValue,
  setNestedValues,
  editRungComment,
  insertRung,
  moveRung,
  deleteRung,
  insertBranch,
  insertBranchLevel,
  deleteBranch,
  insertInstruction,
  setInstructionEnergized,
  deleteInstruction,
} = routineSlice.actions;

export const routineReducer = routineSlice.reducer;
