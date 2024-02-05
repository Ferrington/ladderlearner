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
