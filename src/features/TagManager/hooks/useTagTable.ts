import { useAppDispatch } from '@/store';
import { selectTagsAsList } from '@/store/tag/selectors';
import { setTagOrder } from '@/store/tag/slice';
import {
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function useTagTable() {
  const dispatch = useAppDispatch();

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

  return {
    activeId,
    tags,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
