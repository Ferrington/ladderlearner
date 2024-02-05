// import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import SortableTagRow from '@/features/TagManager/SortableTagRow';
import { selectTagsAsList } from '@/store/tag/tagSelectors';
import { useSelector } from 'react-redux';
import styles from './styles/TagTable.module.css';
// import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
// import { useState } from 'react';

// const tags: Tag[] = [
//   { name: 'Tag 1', type: 'bool', value: true },
//   { name: 'Tag 2', type: 'bool', value: false },
//   { name: 'Tag 3', type: 'number', value: 5 },
//   { name: 'Tag 4', type: 'number', value: 10 },
//   { name: 'Tag 5', type: 'counter', value: { pre: 5, acc: 0, dn: false } },
// ];

export default function TagTable() {
  // const [activeId, setActiveId] = useState<string | null>(null);
  // const [items, setItems] = useState(tags.map((tag) => tag.name));
  const tags = useSelector(selectTagsAsList);

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   }),
  // );

  return (
    <div className={styles['tag-table']}>
      <div className={styles['header']}>
        <span className={styles['header-tag']}>Tag</span>
        <span className={styles['header-value']}>Value</span>
      </div>
      {tags.map((tag) => (
        <SortableTagRow key={tag.name} id={tag.name} tag={tag} />
      ))}
    </div>
  );
}
