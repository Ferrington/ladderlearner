import { routineSlice as trafficLightInitialState } from '@/store/premade-states/trafficLight';
import { deleteChildren, generateEmptyRung } from '@/store/routine/utils';
import { Counter, Instruction, Timer } from '@/types';
import { arrayMove } from '@/utils/arrayMove';
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

type SetBoxTagNamePayload = {
  name: string;
  instructionId: string;
  key: string;
};

type SetNestedValuePayload = {
  instructionId: string;
  key: string;
  value: string | number | boolean;
};

type SetNestedValuesPayload = {
  instructionId: string;
  obj: Timer | Counter;
};

type EditRungCommentPayload = {
  rung: Rung;
  comment: string;
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
    setBoxTagName(state, action: PayloadAction<SetBoxTagNamePayload>) {
      const { name, instructionId, key } = action.payload;

      const instruction = state.instructions[instructionId];
      if (instruction.displayType !== 'Box') return;

      instruction.parameters[key].value = name;
      instruction.energized = false;
    },
    setNestedValue(state, action: PayloadAction<SetNestedValuePayload>) {
      const { instructionId, key, value } = action.payload;
      const instruction = state.instructions[instructionId];
      if (instruction.displayType !== 'Box') return;

      instruction.parameters[key].value = value;
    },
    setNestedValues(state, action: PayloadAction<SetNestedValuesPayload>) {
      const { instructionId, obj } = action.payload;

      const instruction = state.instructions[instructionId];
      if (instruction.displayType !== 'Box') return;

      instruction.parameters.pre.value = obj.pre;
      instruction.parameters.acc.value = obj.acc;
      instruction.parameters.dn.value = obj.dn;
      if ('tt' in obj) instruction.parameters.tt.value = obj.tt;
    },
    editRungComment(state, action: PayloadAction<EditRungCommentPayload>) {
      const { rung, comment } = action.payload;
      state.rungs.byId[rung.id].comment = comment;
    },
    insertRung(state, action: PayloadAction<number>) {
      const rungIndex = action.payload;

      const { newRung, newBranch } = generateEmptyRung();
      const rungId = newRung.id;
      const branchId = newBranch.id;

      state.rungs.byId[rungId] = newRung;
      state.rungs.allIds.splice(rungIndex, 0, rungId);
      state.branches[branchId] = newBranch;
    },
    moveRung(state, action: PayloadAction<{ rungNumber: number; dropIndex: number }>) {
      const { rungNumber, dropIndex } = action.payload;
      const prevIndex = rungNumber - 1;
      const newIndex = dropIndex > prevIndex ? dropIndex - 1 : dropIndex;

      state.rungs.allIds = arrayMove(state.rungs.allIds, prevIndex, newIndex);
    },
    deleteRung(state, action: PayloadAction<Rung>) {
      //runggFjQebHaajuoV1wGP-TPw
      const rung = action.payload;
      deleteChildren(state, state.branches[rung.child]);

      if (state.rungs.allIds.length === 1) return;

      state.rungs.allIds = state.rungs.allIds.filter((id) => id !== rung.id);
      delete state.branches[rung.child];
      delete state.rungs.byId[rung.id];
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

export const {
  setSpecialTagName,
  setBoxTagName,
  editRungComment,
  insertRung,
  moveRung,
  deleteRung,
  deleteBranch,
  deleteInstruction,
} = routineSlice.actions;

export const routineReducer = routineSlice.reducer;
