import { Counter, CounterTag, Timer, TimerTag } from '@/types';
import { formatTagValue } from '@/utils/formatTagValue';
import { isNumeric } from '@/utils/isNumeric';
import { useClickOutside } from '@mantine/hooks';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import styles from './styles/TagRow.module.css';

type Props = {
  name: string;
  tag: TimerTag | CounterTag;
};

function formatValue(value: number | boolean): string {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  }
  return String(value);
}

export default function TagNestedRow({ name, tag }: Props) {
  const tagValue =
    tag.type === 'counter' ? tag.value[name as keyof Counter] : tag.value[name as keyof Timer];

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>(formatValue(tagValue));
  const inputRef = useClickOutside(() => cancelInput());

  function cancelInput() {
    setInputValue(formatTagValue(tag));
    setEditMode(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleCommit() {
    if (isNumeric(inputValue)) {
      //update tag
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
    if (name !== 'dn') {
      setEditMode(true);
      setInputValue(formatValue(tagValue));
    }
  }

  let value;
  if (editMode)
    value = (
      <input
        autoFocus
        onFocus={(e) => e.target.select()}
        ref={inputRef}
        type="text"
        value={inputValue}
        maxLength={6}
        onChange={handleChange}
        onKeyDown={handleInputKeypress}
      />
    );
  else value = formatValue(tagValue);

  return (
    <>
      <span className={styles['nested-name']}>.{name}</span>
      <span
        className={clsx(styles['nested-editable'], {
          [styles.disabled]: typeof tagValue === 'boolean',
        })}
        onClick={handleClick}
      >
        {value}
      </span>
    </>
  );
}
