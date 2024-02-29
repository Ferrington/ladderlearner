import useWindowSize from '@/hooks/useWindowSize';
import { RootState, useAppDispatch } from '@/store';
import { selectRunSimulation } from '@/store/base/selectors';
import {
  makeSelectExtraLandingPadLocation,
  selectBranchById,
  selectRungById,
} from '@/store/routine/selectors';
import { deleteRung, editRungComment } from '@/store/routine/slice';
import { useDisclosure } from '@mantine/hooks';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export function useRung(rungId: string, isNotDragOverlay: boolean) {
  const dispatch = useAppDispatch();
  const [mainRungWidth, setMainRungWidth] = useState(0);
  const [showInteractOutline, setShowInteractOutline] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const windowSize = useWindowSize();

  const codeRef = useRef<HTMLDivElement>(null);

  const runSimulation = useSelector(selectRunSimulation);
  const rung = useSelector(selectRungById(rungId));
  const child = useSelector(selectBranchById(rung.child));
  const [comment, setComment] = useState(rung.comment ?? '');

  const selectExtraLandingPadLocation = useMemo(makeSelectExtraLandingPadLocation, []);
  const extraLandingPadLoc = useSelector((state: RootState) =>
    selectExtraLandingPadLocation(state, rung.child),
  );

  let cursor;
  if (runSimulation) {
    cursor = 'default';
  } else {
    cursor = isNotDragOverlay ? 'grab' : 'grabbing';
  }

  useLayoutEffect(() => {
    if (codeRef.current != null) setMainRungWidth(codeRef.current.offsetWidth - 30);
  }, [windowSize]);

  function lookClickable() {
    if (runSimulation) return;

    setShowInteractOutline(true);
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

    dispatch(deleteRung(rung));
  }

  function commitComment() {
    dispatch(editRungComment({ rung, comment }));
    close();
  }

  function closeComment() {
    close();
    setComment(rung.comment ?? '');
  }

  return {
    codeRef,
    rung,
    child,
    mainRungWidth,
    extraLandingPadLoc,
    showInteractOutline,
    isNotDragOverlay,
    isDeletable,
    opened,
    cursor,
    comment,
    open,
    setComment,
    lookClickable,
    dontLookClickable,
    handleMouseOver,
    handleDelete,
    commitComment,
    closeComment,
  };
}
