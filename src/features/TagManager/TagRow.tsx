import { Tag } from '@/types';
import { isNumeric } from '@/utils/isNumeric';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useClickOutside } from '@mantine/hooks';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, LegacyRef, MouseEvent, forwardRef, useState } from 'react';
import { RiArrowRightSLine, RiDeleteBinLine, RiDraggable } from 'react-icons/ri';
import styles from './styles/TagRow.module.css';

type DraggableStyle = {
  transform: string;
  transition: string;
};

type Props = {
  tag: Tag;
  style?: DraggableStyle;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  dragging?: boolean;
  dragOverlay?: boolean;
};

function formatValue(tag: Tag) {
  switch (tag.type) {
    case 'bool':
      return tag.value ? 'True' : 'False';
    case 'number':
      return String(tag.value);
    case 'counter':
      return 'Counter';
    case 'timer':
      return 'Timer';
  }
}

function _TagRow(
  { tag, style, listeners, attributes, dragging, dragOverlay }: Props,
  ref: LegacyRef<HTMLDivElement>,
) {
  const [editMode, setEditMode] = useState(false);
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<string>(formatValue(tag));
  const inputRef = useClickOutside(() => cancelInput());
  // const { runSimulation } = useSnapshot(store);

  function cancelInput() {
    setInputValue(formatValue(tag));
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

  function createNestedRows() {
    return Object.keys(tag.value)
      .filter((key) => key !== 'startTime')
      .map(
        () => 'test',
        // <TagNestedRow
        //   key={key}
        //   myKey={key}
        //   instructType={tag.value}
        //   tag={tag}
        // />
      );
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
  else value = formatValue(tag);

  let row;
  if (tag.type === 'counter' || tag.type === 'timer')
    row = (
      <>
        <RiArrowRightSLine
          className="table-row--dropdown-control"
          style={{
            rotate: dropdownExpanded ? '90deg' : '0deg',
          }}
          size="1.25em"
          onClick={() => setDropdownExpanded(!dropdownExpanded)}
        />
        <span className="table-row--col-a">{tag.name}</span>
        <span className="table-row--col-b">{value}</span>
        {!dragOverlay && (
          <RiDeleteBinLine
            className="table-row--delete-icon"
            size="1.25em"
            onClick={handleDelete}
            title="Delete Tag"
          />
        )}
        {dropdownExpanded && (tag.type === 'counter' || tag.type === 'timer') && createNestedRows()}
      </>
    );
  else
    row = (
      <>
        <span className="table-row--col-a">{tag.name}</span>
        <span className="table-row--col-b editable" onClick={handleClick}>
          {value}
        </span>
        {!dragOverlay && (
          <RiDeleteBinLine
            className="table-row--delete-icon"
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
        className="table-row--drag-handle"
        {...listeners}
      />
      {row}
    </div>
  );
}

const TagRow = forwardRef(_TagRow);
export default TagRow;
