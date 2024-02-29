import { useAppDispatch } from '@/store';
import { selectRunSimulation } from '@/store/base/selectors';
import { deleteBranch } from '@/store/routine/slice';
import { Branch } from '@/store/routine/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function useRungLine(branch: Branch) {
  const dispatch = useAppDispatch();

  const runSimulation = useSelector(selectRunSimulation);
  const [isDeletable, setIsDeletable] = useState(false);
  const [showInteractOutline, setShowInteractOutline] = useState(false);

  function lookClickable() {
    if (runSimulation) return;

    setShowInteractOutline(true);
  }

  function dontLookClickable() {
    setShowInteractOutline(false);
    setIsDeletable(false);
  }

  function handleMouseOver() {
    if (runSimulation) return;

    setIsDeletable(true);
  }

  function handleDelete() {
    dispatch(deleteBranch(branch));
  }

  return {
    isDeletable,
    showInteractOutline,
    lookClickable,
    dontLookClickable,
    handleMouseOver,
    handleDelete,
  };
}
