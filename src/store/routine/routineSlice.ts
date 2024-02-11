import { routineSlice as trafficLightInitialState } from '@/store/premade-states/trafficLight';
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

export type Rung = {
  id: string;
  type: 'Rung';
  comment?: string;
  child: string;
};

export type Branch = {
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
  initialState: trafficLightInitialState,
  reducers: {},
});

export const routineReducer = routineSlice.reducer;
