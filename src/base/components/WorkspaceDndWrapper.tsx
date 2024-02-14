import { useAppDispatch } from '@/store';
import { setDraggingInstructionId, setDraggingRungIndex } from '@/store/base/slice';
import { setDropLocationsAction } from '@/store/combined-actions/setDropLocationsAction';
import { insertRung, moveRung } from '@/store/routine/slice';
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
    droppableContainers: droppableContainers.filter(({ id }) => id === 'instructionPalette'),
  });

  if (rectIntersectionCollisions.length > 0) {
    return rectIntersectionCollisions;
  }

  return closestCenter({
    ...args,
    droppableContainers: droppableContainers.filter(({ id }) => id !== 'instructionPalette'),
  });
};

// const processInstruction = (
//   { newParent, index }: any,
//   { instruction }: any,
// ): void => {
//   // source is a primitive
//   if (instruction.parent === "") {
//     instruction.parent = newParent;

//     // actions.insertInstruction(instruction, index);
//   // source is in routine
//   } else {
//     // actions.moveInstruction(instruction, { newParent, index });
//   }
// };

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
      dispatch(setDraggingRungIndex(e.active.data.current.rungNumber));
      setDragOverlay(e.active?.data?.current?.dragOverlay);
    } else if (e.active.id === 'Rung') {
      dispatch(setDraggingRungIndex(-1));
    } else {
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
    // prevent drop if hovering over instruction palette
    if (e.over.id === 'instructionPalette') return;

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
      // actions.insertBranch(e.over.data.current);
    } else if (e.active.data.current.instruction.abbreviated === 'Branch Level') {
      // handle branch level
      // actions.insertBranchLevel(e.over.data.current);
    } else if ('instruction' in e.active.data.current) {
      // handle instructions
      // processInstruction(e.over.data.current, e.active.data.current);
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
