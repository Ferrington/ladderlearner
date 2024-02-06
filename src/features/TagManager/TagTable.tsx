import SortableTagRow from '@/features/TagManager/SortableTagRow';
import TagRow from '@/features/TagManager/TagRow';
import { selectTagsAsList } from '@/store/tag/tagSelectors';
import { setTagOrder } from '@/store/tag/tagSlice';
import { Tag } from '@/types';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/TagTable.module.css';

export default function TagTable() {
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const tags = useSelector(selectTagsAsList);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);

    const { active, over } = e;
    if (over == null || active.id === over.id) return;

    dispatch(setTagOrder({ from: active.id as string, to: over.id as string }));
  }

  return (
    <div className={styles['tag-table']}>
      <div className={styles['header']}>
        <span className={styles['header-tag']}>Tag</span>
        <span className={styles['header-value']}>Value</span>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tags.map((tag) => tag.name)} strategy={verticalListSortingStrategy}>
          {tags.map((tag) => (
            <SortableTagRow key={tag.name} id={tag.name} tag={tag} />
          ))}
        </SortableContext>
        <DragOverlay modifiers={[restrictToVerticalAxis]}>
          {activeId ? (
            <TagRow tag={tags.find((tag) => tag.name === activeId) as Tag} dragOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
