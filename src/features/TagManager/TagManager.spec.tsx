import TagManager from '@/features/TagManager/TagManager';
import { renderWithProviders } from '@/test/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('TagManager', () => {
  it('should open and close the TagMenu', () => {
    renderWithProviders(<TagManager />);

    const showMenuButton = screen.getByTestId('show-menu-button');
    fireEvent.click(showMenuButton);

    const tagMenu = screen.getByTestId('tag-menu');
    expect(tagMenu).toBeInTheDocument();
    expect(showMenuButton).not.toBeInTheDocument();

    const closeTagMenuButton = screen.getByTestId('close-tag-menu-button');
    fireEvent.click(closeTagMenuButton);

    expect(tagMenu).not.toBeInTheDocument();
    expect(screen.getByTestId('show-menu-button')).toBeInTheDocument();
  });
});
