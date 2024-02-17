import { useTagRow } from '@/features/TagManager/hooks/useTagRow';
import { Counter, CounterTag, Timer, TimerTag } from '@/types';
import styles from '../styles/TagRow.module.css';

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

  const { editMode, inputValue, inputRef, handleChange, handleClick, handleInputKeypress } =
    useTagRow({
      name: tag.name,
      key: name,
      initialValue: typeof tagValue === 'number' ? tagValue : undefined,
    });

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
      <span className={styles['nested-name']} data-testid="nested-tag-name">
        .{name}
      </span>
      <span className={styles['nested-editable']} onClick={handleClick}>
        {value}
      </span>
    </>
  );
}
