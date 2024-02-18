import { Counter, Instruction, Timer } from '@/types';

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

export type MoveRungPayload = {
  rungNumber: number;
  dropIndex: number;
};

export type InsertBranchPayload = {
  newParent: string;
  index: number;
};

export type InsertInstructionPayload = {
  instruction: Instruction;
  index: number;
};

export type SetInstructionEnergizedPayload = {
  instructionId: string;
  energized: boolean;
};

export type MoveInstructionPayload = {
  instruction: Instruction;
  newParent: string;
  index: number;
};

export type SetSpecialTagNamePayload = {
  name: string;
  instructionId: string;
};

export type SetBoxTagNamePayload = {
  name: string;
  instructionId: string;
  key: string;
};

export type SetNestedValuePayload = {
  instructionId: string;
  key: string;
  value: string | number | boolean;
};

export type SetNestedValuesPayload = {
  instructionId: string;
  obj: Timer | Counter;
};

export type EditRungCommentPayload = {
  rung: Rung;
  comment: string;
};
