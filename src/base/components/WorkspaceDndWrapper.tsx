import { useAppDispatch } from '@/store';
import { setDraggingInstructionId, setDraggingRungIndex } from '@/store/base/slice';
import {
  insertBranch,
  insertBranchLevel,
  insertInstruction,
  insertRung,
  moveRung,
} from '@/store/routine/slice';
import { moveInstructionAction } from '@/store/thunks/moveInstructionAction';
import { setDropLocationsAction } from '@/store/thunks/setDropLocationsAction';
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ReactNode, useState } from 'react';

const customCollisionDetection: CollisionDetection = ({ droppableContainers, ...args }) => {
  const rectIntersectionCollisions = rectIntersection({
    ...args,
    droppableContainers: droppableContainers.filter(({ id }) => id === 'instruction-palette'),
  });

  if (rectIntersectionCollisions.length > 0) {
    return rectIntersectionCollisions;
  }

  return closestCenter({
    ...args,
    droppableContainers: droppableContainers.filter(({ id }) => id !== 'instruction-palette'),
  });
};

export default function WorkspaceDndWrapper({ children }: { children?: ReactNode }) {
  const dispatch = useAppDispatch();
  const [dragOverlay, setDragOverlay] = useState(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(pointerSensor);

  function handleDragStart(e: DragStartEvent) {
    if (e.active.data.current && 'rungNumber' in e.active.data.current) {
      // handle rung in routine
      dispatch(setDraggingRungIndex(e.active.data.current.rungNumber));
      setDragOverlay(e.active?.data?.current?.dragOverlay);
    } else if (e.active.id === 'Rung') {
      // handle rung from instruction palette
      dispatch(setDraggingRungIndex(-1));
      setDragOverlay(e.active?.data?.current?.dragOverlay);
    } else {
      // handle everything else
      dispatch(setDraggingInstructionId(e.active.id as string));
      dispatch(setDropLocationsAction(e.active?.data?.current?.instruction?.abbreviated));

      setDragOverlay(e.active?.data?.current?.dragOverlay);
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    dispatch(setDraggingRungIndex(null));
    dispatch(setDraggingInstructionId(null));

    setDragOverlay(null);

    if (e.over == null) return;
    if (!e.active.data.current || !e.over.data.current) return;

    if ('rungNumber' in e.active.data.current) {
      // handle rung in routine
      dispatch(
        moveRung({
          rungNumber: e.active.data.current.rungNumber,
          dropIndex: e.over.data.current.rungIndex,
        }),
      );
    } else if (e.active.data.current.instruction.abbreviated === 'Rung') {
      // handle rung from instruction palette
      dispatch(insertRung(e.over.data.current.rungIndex));
    } else if (e.active.data.current.instruction.abbreviated === 'Branch') {
      // handle branch
      const { newParent, index } = e.over.data.current;
      dispatch(insertBranch({ newParent, index }));
    } else if (e.active.data.current.instruction.abbreviated === 'Branch Level') {
      // handle branch level
      const { newParent } = e.over.data.current;
      dispatch(insertBranchLevel(newParent));
    } else if ('instruction' in e.active.data.current) {
      // handle instructions
      const { newParent, index } = e.over.data.current;
      const { instruction } = e.active.data.current;
      if (instruction.parent === '') {
        // source is a primitive
        instruction.parent = newParent;
        dispatch(insertInstruction({ instruction, index }));
      } else {
        // source is in routine
        dispatch(moveInstructionAction({ instruction, newParent, index }));
      }
    }
  }

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
