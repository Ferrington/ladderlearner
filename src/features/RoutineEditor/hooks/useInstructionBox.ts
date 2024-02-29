import { useAppDispatch } from '@/store';
import { selectDraggingInstructionId, selectRunSimulation } from '@/store/base/selectors';
import { selectBranchById, selectInstructionById } from '@/store/routine/selectors';
import { deleteInstruction } from '@/store/routine/slice';
import { useState, type MouseEvent } from 'react';
import { useSelector } from 'react-redux';

export function useInstructionBox(instructionId: string, beingDragged: boolean) {
  const dispatch = useAppDispatch();
  const [showInteractOutline, setShowInteractOutline] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);

  const runSimulation = useSelector(selectRunSimulation);
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const instruction = useSelector(selectInstructionById(instructionId));
  const parent = useSelector(selectBranchById(instruction?.parent));

  function lookClickable(e: MouseEvent) {
    if (runSimulation) return;

    const element = e.target as HTMLElement;
    if (element.classList.contains('instruct-value') || element.tagName === 'INPUT') {
      setShowInteractOutline(false);
    } else {
      setShowInteractOutline(true);
    }
  }

  function handleMouseOver() {
    if (runSimulation) return;

    setIsDeletable(true);
  }

  function dontLookClickable() {
    setShowInteractOutline(false);
    setIsDeletable(false);
  }

  function handleDelete() {
    if (runSimulation) return;

    dispatch(deleteInstruction(instruction));
  }

  let cursor;
  if (runSimulation) {
    cursor = 'auto';
  } else {
    cursor = beingDragged ? 'grabbing' : 'grab';
  }

  return {
    instruction,
    parent,
    cursor,
    showInteractOutline,
    runSimulation,
    handleMouseOver,
    handleDelete,
    lookClickable,
    dontLookClickable,
    draggingInstructionId,
    isDeletable,
  };
}
