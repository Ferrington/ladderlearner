import { routineSlice as trafficLightInitialState } from '@/store/premade-states/trafficLight';
import { Instruction } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

type SetSpecialTagNamePayload = {
  name: string;
  instructionId: string;
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
  reducers: {
    setSpecialTagName(state, action: PayloadAction<SetSpecialTagNamePayload>) {
      const { name, instructionId } = action.payload;
      const instruction = state.instructions[instructionId];

      if (instruction.displayType !== 'Special') return;

      instruction.tag = name;
      instruction.energized = false;
    },
    deleteInstruction(state, action: PayloadAction<Instruction>) {
      const instruction = action.payload;

      const parent = state.branches[instruction.parent];
      parent.children = parent.children.filter((id) => id !== instruction.id);

      delete state.instructions[instruction.id];
    },
  },
});

export const { setSpecialTagName, deleteInstruction } = routineSlice.actions;

export const routineReducer = routineSlice.reducer;
