import { RootState, useAppDispatch } from '@/store';
import { selectRunSimulation } from '@/store/base/selectors';
import { makeSelectIsOutput } from '@/store/routine/selectors';
import { toggleTagValue } from '@/store/tag/slice';
import { updateTagAction } from '@/store/thunks/updateTagAction';
import { isNumeric } from '@/utils/isNumeric';
import { useClickOutside } from '@mantine/hooks';
import { ChangeEvent, KeyboardEvent, MouseEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  name: string;
  key?: string;
  initialValue?: number;
};

export function useTagRow({ name, key, initialValue }: Props) {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>(String(initialValue));
  const inputRef = useClickOutside(() => cancelInput());
  const runSimulation = useSelector(selectRunSimulation);

  const selectIsOutput = useMemo(makeSelectIsOutput, []);
  const isOutput = useSelector((state: RootState) => selectIsOutput(state, name));

  function cancelInput() {
    setInputValue(String(initialValue));
    setEditMode(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleCommit() {
    if (isNumeric(inputValue)) {
      dispatch(updateTagAction({ name, key, value: Number(inputValue) }));
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
      if (isOutput || key != null) return;

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
    runSimulation,
    isOutput,
  };
}
