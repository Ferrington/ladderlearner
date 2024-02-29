import { useWorkspaceDnd } from '@/base/hooks/useWorkspaceDnd';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { ReactNode } from 'react';

export default function WorkspaceDndWrapper({ children }: { children?: ReactNode }) {
  const { dragOverlay, handleDragStart, handleDragEnd, customCollisionDetection, sensors } =
    useWorkspaceDnd();

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={customCollisionDetection}
      sensors={sensors}
    >
      <DragOverlay dropAnimation={null}>{dragOverlay}</DragOverlay>
      {children}
    </DndContext>
  );
}
