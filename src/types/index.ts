export type InstructionSpecial = {
  id: string;
  type: 'Instruction';
  displayType: 'Special';
  abbreviated: string;
  tag: string | null;
  parent: string;
  isDestructive: boolean;
  energized: boolean;
};

export type InstructionParameter = {
  key: string;
  value: string | number | boolean | null;
  type: Tag['type'];
  hidden?: boolean;
};

export type InstructionBox = {
  id: string;
  type: 'Instruction';
  displayType: 'Box';
  abbreviated: string;
  name: string;
  description: string;
  parameters: Record<string, InstructionParameter>;
  parent: string;
  isDestructive: boolean;
  energized: boolean;
  prevEnergized?: boolean;
};

export type Instruction = InstructionSpecial | InstructionBox;

export type InstructionProperties = Record<
  string,
  InstructionSpecialProperties | InstructionBoxProperties
>;

type InstructionSpecialProperties = {
  name: string;
  isDestructive: boolean;
  tag: string | null;
  displayType: 'special';
  energized: boolean;
};

type InstructionBoxProperties = {
  name: string;
  description: string;
  isDestructive: boolean;
  parameters: Record<string, InstructionParameter>;
  displayType: 'box';
  energized: boolean;
  prevEnergized?: boolean;
};

export type Counter = {
  pre: number;
  acc: number;
  dn: boolean;
};

export type Timer = {
  pre: number;
  acc: number;
  dn: boolean;
  tt: boolean;
  startTime: number;
};

export type BooleanTag = {
  name: string;
  type: 'bool';
  value: boolean;
};

export type NumberTag = {
  name: string;
  type: 'number';
  value: number;
};

export type CounterTag = {
  name: string;
  type: 'counter';
  value: Counter;
};

export type TimerTag = {
  name: string;
  type: 'timer';
  value: Timer;
};

export type Tag = BooleanTag | NumberTag | CounterTag | TimerTag;
