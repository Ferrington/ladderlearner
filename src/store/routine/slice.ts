import { routineSlice as trafficLightInitialState } from '@/store/premade-states/trafficLight';
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

// const initialState = {
//   rungs: {
//     byId: {},
//     allIds: [],
//   },
//   branches: {},
//   instructions: {},
// } as RoutineSlice;

const routineSlice = createSlice({
  name: 'routine',
  initialState: trafficLightInitialState,
  reducers,
});

export const {
  setSpecialTagName,
  setBoxTagName,
  editRungComment,
  insertRung,
  moveRung,
  deleteRung,
  insertBranch,
  insertBranchLevel,
  deleteBranch,
  insertInstruction,
  deleteInstruction,
} = routineSlice.actions;

export const routineReducer = routineSlice.reducer;
