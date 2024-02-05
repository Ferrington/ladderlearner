import TagNestedRow from '@/features/TagManager/TagNestedRow';
import { CounterTag, Tag, TimerTag } from '@/types';
import { formatTagValue } from '@/utils/formatTagValue';
import { isNumeric } from '@/utils/isNumeric';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useClickOutside } from '@mantine/hooks';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, LegacyRef, MouseEvent, forwardRef, useState } from 'react';
import { RiArrowRightSLine, RiDeleteBinLine, RiDraggable } from 'react-icons/ri';
import styles from './styles/TagRow.module.css';

type DraggableStyle = {
  transform: string | undefined;
  transition: string | undefined;
};

type Props = {
  tag: Tag;
  style?: DraggableStyle;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  dragging?: boolean;
  dragOverlay?: boolean;
};

function _TagRow(
  { tag, style, listeners, attributes, dragging, dragOverlay }: Props,
  ref: LegacyRef<HTMLDivElement>,
) {
  const [editMode, setEditMode] = useState(false);
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<string>(formatTagValue(tag));
  const inputRef = useClickOutside(() => cancelInput());
  // const { runSimulation } = useSnapshot(store);

  function cancelInput() {
    setInputValue(formatTagValue(tag));
    setEditMode(false);
  }

  function handleCommit() {
    if (isNumeric(inputValue)) {
      //update tag
      setEditMode(false);
    }
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    if (tag.type === 'number') {
      setEditMode(true);
    }

    // if bool toggle
  }

  function handleDelete() {
    // delete tag if simulation not running
  }

  function handleInputKeyPress(e: KeyboardEvent) {
    e.stopPropagation();

    if (e.key === 'Enter') handleCommit();
    if (e.key === 'Escape') cancelInput();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function createNestedRows(tag: CounterTag | TimerTag) {
    return Object.keys(tag.value)
      .filter((key) => key !== 'startTime')
      .map((key) => <TagNestedRow key={key} name={key} tag={tag} />);
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
        onKeyDown={handleInputKeyPress}
      />
    );
  else value = formatTagValue(tag);

  let row;
  if (tag.type === 'counter' || tag.type === 'timer')
    row = (
      <>
        <RiArrowRightSLine
          className={styles['dropdown-control']}
          style={{
            rotate: dropdownExpanded ? '90deg' : '0deg',
          }}
          size="1.25em"
          onClick={() => setDropdownExpanded(!dropdownExpanded)}
        />
        <span>{tag.name}</span>
        <span className={styles['col-b']}>{value}</span>
        {!dragOverlay && (
          <RiDeleteBinLine
            className={styles['delete-icon']}
            size="1.25em"
            onClick={handleDelete}
            title="Delete Tag"
          />
        )}
        {dropdownExpanded && createNestedRows(tag)}
      </>
    );
  else
    row = (
      <>
        <span>{tag.name}</span>
        <span className={clsx(styles['col-b'], styles['editable'])} onClick={handleClick}>
          {value}
        </span>
        {!dragOverlay && (
          <RiDeleteBinLine
            className={styles['delete-icon']}
            size="1.25em"
            onClick={handleDelete}
            title="Delete Tag"
          />
        )}
      </>
    );

  return (
    <div
      ref={ref}
      style={{ position: 'relative', ...style }}
      className={clsx(styles['table-row'], {
        // [styles.disabled]: isOutput,
        [styles.dragging]: dragging,
      })}
      {...attributes}
    >
      <RiDraggable
        style={{ cursor: dragOverlay ? 'grabbing' : 'grab' }}
        size="1.25em"
        className={styles['drag-handle']}
        {...listeners}
      />
      {row}
    </div>
  );
}

const TagRow = forwardRef(_TagRow);
export default TagRow;
