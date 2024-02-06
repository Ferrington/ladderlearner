import SortableTagRow from '@/features/TagManager/SortableTagRow';
import TagRow from '@/features/TagManager/TagRow';
import { useTagTable } from '@/features/TagManager/hooks/useTagTable';
import { Tag } from '@/types';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styles from './styles/TagTable.module.css';

export default function TagTable() {
  const { activeId, tags, sensors, handleDragStart, handleDragEnd } = useTagTable();

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
