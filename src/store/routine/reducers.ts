import { RoutineSlice } from '@/store/routine/slice';
import {
  Branch,
  EditRungCommentPayload,
  InsertBranchPayload,
  InsertInstructionPayload,
  MoveRungPayload,
  Rung,
  SetBoxTagNamePayload,
  SetInstructionEnergizedPayload,
  SetNestedValuePayload,
  SetNestedValuesPayload,
  SetSpecialTagNamePayload,
} from '@/store/routine/types';
import { deleteChildren, generateEmptyRung } from '@/store/routine/utils';
import { Instruction } from '@/types';
import { arrayMove } from '@/utils/arrayMove';
import { isNumeric } from '@/utils/isNumeric';
import { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const reducers = {
  setRoutineState(_state: RoutineSlice, action: PayloadAction<RoutineSlice>) {
    return action.payload;
  },
  setSpecialTagName(state: RoutineSlice, action: PayloadAction<SetSpecialTagNamePayload>) {
    const { name, instructionId } = action.payload;
    const instruction = state.instructions[instructionId];

    if (instruction.displayType !== 'Special') return;

    instruction.tag = name;
    instruction.energized = false;
  },
  setBoxTagName(state: RoutineSlice, action: PayloadAction<SetBoxTagNamePayload>) {
    const { name, instructionId, key } = action.payload;

    const instruction = state.instructions[instructionId];
    if (instruction.displayType !== 'Box') return;

    const value = isNumeric(name) ? Number(name) : name;

    instruction.parameters[key].value = value;
    instruction.energized = false;
  },
  setNestedValue(state: RoutineSlice, action: PayloadAction<SetNestedValuePayload>) {
    const { instructionId, key, value } = action.payload;
    const instruction = state.instructions[instructionId];
    if (instruction.displayType !== 'Box') return;

    instruction.parameters[key].value = value;
  },
  setNestedValues(state: RoutineSlice, action: PayloadAction<SetNestedValuesPayload>) {
    const { instructionId, obj } = action.payload;

    const instruction = state.instructions[instructionId];
    if (instruction.displayType !== 'Box') return;

    instruction.parameters.pre.value = obj.pre;
    instruction.parameters.acc.value = obj.acc;
    instruction.parameters.dn.value = obj.dn;
    if ('tt' in obj) instruction.parameters.tt.value = obj.tt;
  },
  editRungComment(state: RoutineSlice, action: PayloadAction<EditRungCommentPayload>) {
    const { rung, comment } = action.payload;
    state.rungs.byId[rung.id].comment = comment;
  },
  insertRung(state: RoutineSlice, action: PayloadAction<number>) {
    const rungIndex = action.payload;

    const { newRung, newBranch } = generateEmptyRung();
    const rungId = newRung.id;
    const branchId = newBranch.id;

    state.rungs.byId[rungId] = newRung;
    state.rungs.allIds.splice(rungIndex, 0, rungId);
    state.branches[branchId] = newBranch;
  },
  moveRung(state: RoutineSlice, action: PayloadAction<MoveRungPayload>) {
    const { rungNumber, dropIndex } = action.payload;
    const prevIndex = rungNumber - 1;
    const newIndex = dropIndex > prevIndex ? dropIndex - 1 : dropIndex;

    state.rungs.allIds = arrayMove(state.rungs.allIds, prevIndex, newIndex);
  },
  deleteRung(state: RoutineSlice, action: PayloadAction<Rung>) {
    const rung = action.payload;
    deleteChildren(state, state.branches[rung.child]);

    if (state.rungs.allIds.length === 1) {
      state.rungs.byId[rung.id].comment = '';
      return;
    }

    state.rungs.allIds = state.rungs.allIds.filter((id) => id !== rung.id);
    delete state.branches[rung.child];
    delete state.rungs.byId[rung.id];
  },
  insertBranch(state: RoutineSlice, action: PayloadAction<InsertBranchPayload>) {
    const { newParent, index } = action.payload;

    const newId = 'b' + nanoid();
    const childIds = ['b' + nanoid(), 'b' + nanoid()];

    const parent = state.branches[newParent];
    parent.children.splice(index, 0, newId);

    state.branches[newId] = {
      id: newId,
      type: 'OR',
      parent: parent.id,
      children: childIds,
    };
    childIds.forEach((childId) => {
      state.branches[childId] = {
        id: childId,
        type: 'AND',
        parent: newId,
        children: [],
      };
    });
  },
  insertBranchLevel(state: RoutineSlice, action: PayloadAction<string>) {
    const newParent = action.payload;
    const newId = 'b' + nanoid();

    const parent = state.branches[newParent];
    const grandparent = state.branches[parent.parent];

    const index = grandparent.children.indexOf(parent.id) + 1;
    grandparent.children.splice(index, 0, newId);

    state.branches[newId] = {
      id: newId,
      type: 'AND',
      parent: grandparent.id,
      children: [],
    };
  },
  deleteBranch(state: RoutineSlice, action: PayloadAction<Branch>) {
    const branch = action.payload;
    deleteChildren(state, branch);

    const parent = state.branches[branch.parent];
    parent.children = parent.children.filter((id: string) => id !== branch.id);
    delete state.branches[branch.id];

    if (parent.children.length !== 1) return;

    const grandparent = state.branches[parent.parent];
    const index = grandparent.children.indexOf(parent.id);
    const leftovers = state.branches[parent.children[0]].children;

    leftovers.forEach((id: string) => {
      const ele = id in state.instructions ? state.instructions[id] : state.branches[id];
      ele.parent = grandparent.id;
    });

    delete state.branches[parent.children[0]];
    delete state.branches[parent.id];
    grandparent.children.splice(index, 1, ...leftovers);
  },
  insertInstruction(state: RoutineSlice, action: PayloadAction<InsertInstructionPayload>) {
    const { instruction, index } = action.payload;
    const parent = state.branches[instruction.parent];

    parent.children.splice(index, 0, instruction.id);
    state.instructions[instruction.id] = instruction;
  },
  setInstructionEnergized(
    state: RoutineSlice,
    action: PayloadAction<SetInstructionEnergizedPayload>,
  ) {
    const { instructionId, energized } = action.payload;
    state.instructions[instructionId].energized = energized;
  },
  deleteInstruction(state: RoutineSlice, action: PayloadAction<Instruction>) {
    const instruction = action.payload;

    const parent = state.branches[instruction.parent];
    parent.children = parent.children.filter((id: string) => id !== instruction.id);

    delete state.instructions[instruction.id];
  },
};
