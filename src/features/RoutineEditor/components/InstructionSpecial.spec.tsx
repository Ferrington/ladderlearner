import InstructionSpecial from '@/features/RoutineEditor/components/InstructionSpecial';
import { renderWithProviders } from '@/test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RoutineSlice } from '@/store/routine/slice';
import { TagSlice } from '@/store/tag/slice';
import { userEvent } from '@testing-library/user-event';

type TestState = {
  routine: RoutineSlice;
  tags: TagSlice;
};

const preloadedState: TestState = {
  routine: {
    rungs: {
      allIds: ['rung1'],
      byId: {
        rung1: {
          id: 'rung1',
          type: 'Rung',
          child: 'branch1',
          comment: 'testComment',
        },
      },
    },
    branches: {
      branch1: {
        id: 'branch1',
        type: 'AND',
        parent: 'rung1',
        children: ['test'],
      },
    },
    instructions: {
      instruction1: {
        id: 'instruction1',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'testTag',
        parent: 'branch1',
        isDestructive: false,
        energized: false,
      },
    },
  },
  tags: {
    allIds: ['testTag'],
    byId: {
      testTag: {
        name: 'testTag',
        type: 'bool',
        value: false,
      },
    },
  },
};

describe('InstructionSpecial', () => {
  it('should autocomplete a tag name', async () => {
    const user = userEvent.setup();

    renderWithProviders(<InstructionSpecial instructionId="instruction1" beingDragged={false} />, {
      preloadedState,
    });

    const instruction = screen.getByTestId('instruction-special');
    await user.click(instruction.querySelector('p')!);
    const autocomplete = screen.getByTestId('inline-autocomplete');
    expect(autocomplete).toBeInTheDocument();

    await user.keyboard('{backspace}test{enter}');

    expect(autocomplete).not.toBeInTheDocument();

    const tag = screen.getByTestId('instruction-special-tag');
    expect(tag).toHaveTextContent('testTag');
  });
});
