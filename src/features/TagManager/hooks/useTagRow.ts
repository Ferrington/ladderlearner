import { setTagValue, toggleTagValue } from '@/store/tag/tagSlice';
import { isNumeric } from '@/utils/isNumeric';
import { useClickOutside } from '@mantine/hooks';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  name: string;
  key?: string;
  initialValue?: number;
};

export function useTagRow({ name, key, initialValue }: Props) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>(String(initialValue));
  const inputRef = useClickOutside(() => cancelInput());

  function cancelInput() {
    setInputValue(String(initialValue));
    setEditMode(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleCommit() {
    if (isNumeric(inputValue)) {
      dispatch(setTagValue({ name, key, value: Number(inputValue) }));
      setEditMode(false);
    }
  }

  function handleInputKeypress(e: KeyboardEvent) {
    e.stopPropagation();

    if (e.key === 'Enter') handleCommit();
    if (e.key === 'Escape') cancelInput();
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    if (initialValue == null) {
      dispatch(toggleTagValue({ name, key }));
    } else {
      setEditMode(true);
    }
  }

  return {
    editMode,
    inputValue,
    inputRef,
    handleChange,
    handleInputKeypress,
    handleClick,
  };
}
