import { RootState, useAppDispatch } from '@/store';
import { selectDraggingInstructionId, selectRunSimulation } from '@/store/base/selectors';
import { setGlobalEditMode } from '@/store/base/slice';
import {
  makeSelectIsOutput,
  selectBranchById,
  selectInstructionById,
} from '@/store/routine/selectors';
import { deleteInstruction, setSpecialTagName } from '@/store/routine/slice';
import { makeSelectTagOptions } from '@/store/tag/selectors';
import { toggleTagValue } from '@/store/tag/slice';
import { InstructionSpecial } from '@/types';
import { parseTagName } from '@/utils/parseTagName';
import { useMemo, useState, type MouseEvent } from 'react';
import { useSelector } from 'react-redux';

export function useInstructionSpecial(instructionId: string, beingDragged: boolean) {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [showInteractOutline, setShowInteractOutline] = useState(false);

  const runSimulation = useSelector(selectRunSimulation);
  const draggingInstructionId = useSelector(selectDraggingInstructionId);
  const instruction = useSelector(selectInstructionById(instructionId));
  const parent = useSelector(selectBranchById(instruction?.parent));

  const selectIsOutput = useMemo(makeSelectIsOutput, []);
  const isOutput = useSelector((state: RootState) =>
    selectIsOutput(state, (instruction as InstructionSpecial)?.tag || ''),
  );

  const selectTagOptions = useMemo(makeSelectTagOptions, []);
  const tagList = useSelector((state: RootState) =>
    selectTagOptions(state, instruction?.displayType),
  );

  function handleClick(e: MouseEvent) {
    e.preventDefault();

    if (runSimulation) {
      if (instruction?.displayType !== 'Special' || !instruction.tag || isOutput) return;

      const tag = parseTagName(instruction.tag);

      dispatch(toggleTagValue({ name: tag.name, key: tag.key }));
      return;
    }

    const tagName = (e.target as HTMLElement).tagName;

    if (['INPUT', 'P'].includes(tagName)) {
      setEditMode(true);
      dispatch(setGlobalEditMode(true));
    } else {
      setEditMode(false);
      dispatch(setGlobalEditMode(false));
    }
  }

  function handleClickOutsideInput() {
    setEditMode(false);
    dispatch(setGlobalEditMode(false));
  }

  function handleCommit(name: string) {
    if (!tagList.includes(name)) return;

    dispatch(setSpecialTagName({ name, instructionId }));
    dispatch(setGlobalEditMode(false));
    setEditMode(false);
  }

  function filterMatches(input: string) {
    return tagList.filter((tag) => {
      const tagLower = tag.toLowerCase();
      const inputLower = input.toLowerCase();
      return tagLower.indexOf(inputLower) === 0;
    });
  }

  const handleMouseOver = () => {
    if (runSimulation) return;

    setIsDeletable(true);
  };

  const dontLookClickable = () => {
    setIsDeletable(false);
    setShowInteractOutline(false);
  };

  function handleDelete() {
    if (runSimulation) return;

    dispatch(deleteInstruction(instruction));
  }

  let cursor;
  if (runSimulation) {
    cursor = instruction.isDestructive ? 'default' : 'pointer';
  } else {
    cursor = beingDragged ? 'grabbing' : 'grab';
  }

  return {
    instruction,
    parent,
    editMode,
    runSimulation,
    draggingInstructionId,
    cursor,
    isDeletable,
    showInteractOutline,
    setShowInteractOutline,
    filterMatches,
    dontLookClickable,
    handleClick,
    handleClickOutsideInput,
    handleCommit,
    handleMouseOver,
    handleDelete,
  };
}
