import TagMenu from '@/features/TagManager/components/TagMenu';
import { AppStore } from '@/store';
import { renderWithProviders } from '@/test/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TagMenu', () => {
  let store: AppStore;
  let tagNameInput: HTMLElement;
  let tagTypeSelect: HTMLElement;
  let createTagButton: HTMLElement;

  beforeEach(() => {
    store = renderWithProviders(<TagMenu hideMenu={() => {}} />).store;
    tagNameInput = screen.getByTestId('tag-name');
    tagTypeSelect = screen.getByTestId('tag-type');
    createTagButton = screen.getByTestId('create-tag-button');
  });

  it('should create a tag', () => {
    fireEvent.change(tagNameInput, { target: { value: 'TestTag' } });
    fireEvent.change(tagTypeSelect, { target: { value: 'number' } });
    fireEvent.click(createTagButton);

    expect(store.getState().tags.allIds).toHaveLength(1);
  });

  it('should clear the input after creating a tag', () => {
    fireEvent.change(tagNameInput, { target: { value: 'TestTag' } });
    expect(tagNameInput).toHaveValue('TestTag');

    fireEvent.click(createTagButton);
    expect(tagNameInput).toHaveValue('');
  });

  it('should not create a tag if the name is empty', () => {
    fireEvent.click(createTagButton);
    expect(store.getState().tags.allIds).toHaveLength(0);
  });

  it('should not create a tag if the name is too long', () => {
    fireEvent.change(tagNameInput, { target: { value: 'a'.repeat(31) } });
    fireEvent.click(createTagButton);
    expect(store.getState().tags.allIds).toHaveLength(0);
  });

  it('should not create a tag if the name is already taken', () => {
    fireEvent.change(tagNameInput, { target: { value: 'TestTag' } });
    fireEvent.click(createTagButton);

    expect(store.getState().tags.allIds).toHaveLength(1);

    fireEvent.change(tagNameInput, { target: { value: 'TestTag' } });
    fireEvent.click(createTagButton);
    expect(store.getState().tags.allIds).toHaveLength(1);
  });

  it('should not create a tag if the tag starts with a number', () => {
    fireEvent.change(tagNameInput, { target: { value: '1TestTag' } });
    fireEvent.click(createTagButton);
    expect(store.getState().tags.allIds).toHaveLength(0);
  });

  it('should not create a tag if the tag contains disallowed characters', () => {
    fireEvent.change(tagNameInput, { target: { value: 'Test Tag' } });
    fireEvent.click(createTagButton);
    expect(store.getState().tags.allIds).toHaveLength(0);

    fireEvent.change(tagNameInput, { target: { value: 'Test.Tag' } });
    fireEvent.click(createTagButton);
    expect(store.getState().tags.allIds).toHaveLength(0);
  });
});
