import { CallBackProps, Step } from 'react-joyride';

export type JoyrideState = {
  run: boolean;
  stepIndex: number;
  steps: Step[];
};

export const onboardingComplete = localStorage.getItem('onboarding-complete') === 'true';

export const steps: Step[] = [
  {
    target: '#logo',
    title: 'Welcome to Ladder Learner!',
    content: (
      <div>
        Here you can learn one of the most used languages in PLC programming:&nbsp;
        <a href="https://en.wikipedia.org/wiki/Ladder_logic">Ladder Logic</a>. The instructions
        you'll use are based on those found in Rockwell Automation controllers, but the principals
        are the same for many different vendors. Let's get started!
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '[data-onboardingid="rung"]:first-child',
    title: 'The Routine Editor',
    content:
      'This is the routine editor. Here you can create and edit rungs, which are the building blocks of your ladder logic routine.',
  },
  {
    target: '#instruction-palette',
    title: 'The Instruction Palette',
    content: "Here is where you'll find instructions you can drag and drop onto a rung.",
  },
  {
    target: '#tag-manager',
    title: 'The Tag Manager',
    content: 'This is the tag manager. Here you can create tags and edit their values.',
    placement: 'right',
  },
  {
    target: '#simulation-control',
    title: 'Simulation Control',
    content: 'Once you create a routine, click the play button to simulate your routine.',
  },
  {
    target: '[data-onboardingid="instruction-palette-tab"]:last-child',
    title: 'Examples Tab',
    content: 'Not sure where to begin? Check out some examples for inspiration!',
  },
];

export const initialJoyrideState: JoyrideState = {
  run: true,
  stepIndex: 0,
  steps,
};

export const joyrideLocale = {
  back: 'Back',
  close: 'Close',
  last: 'Done',
  next: 'Next',
  open: 'Open the dialog',
  skip: 'Skip',
};

export const joyrideStyles = {
  options: {
    primaryColor: '#ffa94d',
  },
};

export function joyrideCallback(data: CallBackProps) {
  if (data.action === 'reset') {
    localStorage.setItem('onboarding-complete', 'true');
  }
}
