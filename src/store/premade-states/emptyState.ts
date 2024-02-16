import { ExampleState } from '@/types';

export const state: ExampleState = {
  routine: {
    rungs: {
      byId: { rung1: { id: 'rung1', type: 'Rung', child: 'branch1' } },
      allIds: ['rung1'],
    },
    branches: {
      branch1: { id: 'branch1', type: 'AND', parent: 'rung1', children: [] },
    },
    instructions: {},
  },
  tags: {
    byId: {},
    allIds: [],
  },
};
