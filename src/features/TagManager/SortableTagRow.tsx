import TagRow from '@/features/TagManager/TagRow';
import { Tag } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  id: string;
  tag: Tag;
};

export default function SortableTagRow({ id, tag }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TagRow
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      tag={tag}
      dragging={isDragging}
    />
  );
}
