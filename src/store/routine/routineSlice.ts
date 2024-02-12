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
    deleteBranch(state, action: PayloadAction<Branch>) {
      const branch = action.payload;
      deleteChildren(state, branch);

      const parent = state.branches[branch.parent];
      parent.children = parent.children.filter((id) => id !== branch.id);
      delete state.branches[branch.id];

      if (parent.children.length !== 1) return;

      const grandparent = state.branches[parent.parent];
      const index = grandparent.children.indexOf(parent.id);
      const leftovers = state.branches[parent.children[0]].children;

      leftovers.forEach((id) => {
        const ele = id in state.instructions ? state.instructions[id] : state.branches[id];
        ele.parent = grandparent.id;
      });

      delete state.branches[parent.children[0]];
      delete state.branches[parent.id];
      grandparent.children.splice(index, 1, ...leftovers);
    },
    deleteInstruction(state, action: PayloadAction<Instruction>) {
      const instruction = action.payload;

      const parent = state.branches[instruction.parent];
      parent.children = parent.children.filter((id) => id !== instruction.id);

      delete state.instructions[instruction.id];
    },
  },
});

function deleteChildren(state: RoutineSlice, ele: Branch | Instruction, firstRun: boolean = true) {
  if (ele.type === 'OR' || ele.type === 'AND') {
    ele.children
      .map((id) => (id in state.instructions ? state.instructions[id] : state.branches[id]))
      .forEach((child) => deleteChildren(state, child, false));
  } else {
    delete state.instructions[ele.id];
  }

  if (!firstRun) delete state.branches[ele.id];
  else state.branches[ele.id].children = [];
}

export const { setSpecialTagName, deleteInstruction, deleteBranch } = routineSlice.actions;

export const routineReducer = routineSlice.reducer;
