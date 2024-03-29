import TagNestedRow from '@/features/TagManager/components/TagNestedRow';
import { useTagRow } from '@/features/TagManager/hooks/useTagRow';
import { useAppDispatch } from '@/store';
import { deleteTag } from '@/store/tag/slice';
import { CounterTag, Tag, TimerTag } from '@/types';
import { formatTagValue } from '@/utils/formatTagValue';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import clsx from 'clsx';
import { LegacyRef, forwardRef, useState } from 'react';
import { RiArrowRightSLine, RiDeleteBinLine, RiDraggable } from 'react-icons/ri';
import styles from '../styles/TagRow.module.css';

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
  const dispatch = useAppDispatch();

  const {
    editMode,
    inputValue,
    inputRef,
    handleChange,
    handleClick,
    handleInputKeypress,
    runSimulation,
    isOutput,
  } = useTagRow({ name: tag.name, initialValue: tag.type === 'number' ? tag.value : undefined });

  const [dropdownExpanded, setDropdownExpanded] = useState(false);

  function handleDelete() {
    if (runSimulation) return;

    dispatch(deleteTag(tag.name));
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
        onKeyDown={handleInputKeypress}
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
          data-testid="expand-control"
        />
        <span>{tag.name}</span>
        <span className={styles['col-b']}>{value}</span>
        {!dragOverlay && (
          <RiDeleteBinLine
            className={styles['delete-icon']}
            size="1.25em"
            onClick={handleDelete}
            title="Delete Tag"
            data-testid="delete-tag-button"
          />
        )}
        {dropdownExpanded && !dragOverlay && !dragging && createNestedRows(tag)}
      </>
    );
  else
    row = (
      <>
        <span data-testid="tag-row-name">{tag.name}</span>
        <span
          className={clsx(styles['col-b'], styles['editable'])}
          onClick={handleClick}
          data-testid="tag-row-value"
        >
          {value}
        </span>
        {!dragOverlay && (
          <RiDeleteBinLine
            className={styles['delete-icon']}
            size="1.25em"
            onClick={handleDelete}
            title="Delete Tag"
            data-testid="delete-tag-button"
          />
        )}
      </>
    );

  return (
    <div
      ref={ref}
      style={{ position: 'relative', ...style }}
      className={clsx(styles['table-row'], {
        [styles.disabled]: isOutput,
        [styles.dragging]: dragging,
      })}
      {...attributes}
      data-testid="tag-row"
    >
      <RiDraggable
        style={{ cursor: dragOverlay ? 'grabbing' : 'grab' }}
        size="1.25em"
        className={styles['drag-handle']}
        {...listeners}
        data-testid="drag-handle"
      />
      {row}
    </div>
  );
}

const TagRow = forwardRef(_TagRow);
export default TagRow;
