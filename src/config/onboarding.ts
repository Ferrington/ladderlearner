import { Step } from 'react-joyride';

export type JoyrideState = {
  run: boolean;
  stepIndex: number;
  steps: Step[];
};

const steps: Step[] = [
  {
    target: '#instruction-palette',
    title: 'Welcome to Ladder Learner!',
    content: 'This is the instruction palette. You can drag these instructions into the routine.',
  },
];

export const initialJoyrideState: JoyrideState = {
  run: true,
  stepIndex: 0,
  steps,
};
