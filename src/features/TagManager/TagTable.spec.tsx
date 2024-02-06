import TagTable from '@/features/TagManager/TagTable';
import { TagSlice } from '@/store/tag/tagSlice';
import { renderWithProviders } from '@/test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('TagTable', () => {
  it('should display tags', () => {
    const tagState: TagSlice = {
      allIds: ['tag1', 'tag2'],
      byId: {
        tag1: { name: 'tag1', type: 'number', value: 5 },
        tag2: { name: 'tag2', type: 'bool', value: true },
      },
    };

    renderWithProviders(<TagTable />, { preloadedState: { tags: tagState } });
    const tagNames = screen.getAllByTestId('tag-row-name');
    expect(tagNames).toHaveLength(2);
  });
});
