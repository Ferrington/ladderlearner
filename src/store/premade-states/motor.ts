import { ExampleState } from '@/types';

export const state: ExampleState = {
  routine: {
    rungs: {
      byId: {
        rung1: {
          id: 'rung1',
          type: 'Rung',
          comment:
            'The Motor seals itself on after being energized by the Start tag.\nIt will remain on until the circuit is broken by the Stop tag.',
          child: 'branch1',
        },
      },
      allIds: ['rung1'],
    },
    branches: {
      branch1: {
        id: 'branch1',
        type: 'AND',
        parent: 'rung1',
        children: [
          'instructionXNX-xN35RrLX2X4FeQNN0',
          'branchN4SPpDqos3RrmqDGp3-DF',
          'instructionwbrxZWXzGZNajSi4Wckk4',
        ],
      },
      'branchN4SPpDqos3RrmqDGp3-DF': {
        id: 'branchN4SPpDqos3RrmqDGp3-DF',
        type: 'OR',
        parent: 'branch1',
        children: ['branch_Gx7hMIUfT0Zo63dI1UWb', 'branchK8qJvoM8Yd6b4zq2m2mGV'],
      },
      branch_Gx7hMIUfT0Zo63dI1UWb: {
        id: 'branch_Gx7hMIUfT0Zo63dI1UWb',
        type: 'AND',
        parent: 'branchN4SPpDqos3RrmqDGp3-DF',
        children: ['instructiontHVPDHXXxpiInk14vzlxv'],
      },
      branchK8qJvoM8Yd6b4zq2m2mGV: {
        id: 'branchK8qJvoM8Yd6b4zq2m2mGV',
        type: 'AND',
        parent: 'branchN4SPpDqos3RrmqDGp3-DF',
        children: ['instructionu7CSj8GkaGjfy524hjPMB'],
      },
    },
    instructions: {
      instructiontHVPDHXXxpiInk14vzlxv: {
        id: 'instructiontHVPDHXXxpiInk14vzlxv',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Start',
        parent: 'branch_Gx7hMIUfT0Zo63dI1UWb',
        isDestructive: false,
        energized: false,
      },
      instructionu7CSj8GkaGjfy524hjPMB: {
        id: 'instructionu7CSj8GkaGjfy524hjPMB',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Motor',
        parent: 'branchK8qJvoM8Yd6b4zq2m2mGV',
        isDestructive: false,
        energized: false,
      },
      'instructionXNX-xN35RrLX2X4FeQNN0': {
        id: 'instructionXNX-xN35RrLX2X4FeQNN0',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIO',
        tag: 'Stop',
        parent: 'branch1',
        isDestructive: false,
        energized: false,
      },
      instructionwbrxZWXzGZNajSi4Wckk4: {
        id: 'instructionwbrxZWXzGZNajSi4Wckk4',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'OTE',
        tag: 'Motor',
        parent: 'branch1',
        isDestructive: true,
        energized: false,
      },
    },
  },
  tags: {
    byId: {
      Start: { name: 'Start', type: 'bool', value: false },
      Stop: { name: 'Stop', type: 'bool', value: false },
      Motor: { name: 'Motor', type: 'bool', value: false },
    },
    allIds: ['Start', 'Stop', 'Motor'],
  },
};
