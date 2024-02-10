import { routineSlice as motorInitialState } from '@/store/premade-states/motor';
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

type Rung = {
  id: string;
  type: 'Rung';
  comment?: string;
  child: string;
};

type Branch = {
  id: string;
  type: 'AND' | 'OR';
  parent: string;
  children: string[];
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
  initialState: motorInitialState,
  reducers: {},
});

export const routineReducer = routineSlice.reducer;
