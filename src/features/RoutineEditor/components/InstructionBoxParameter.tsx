import InlineAutocomplete from '@/base/components/InlineAutocomplete';
import { RootState, useAppDispatch } from '@/store';
import { setGlobalEditMode } from '@/store/base/slice';
import { makeSelectTagOptions } from '@/store/tag/selectors';
import { setBoxTagNameAction } from '@/store/thunks/setBoxTagNameAction';
import { InstructionBox } from '@/types';
import { isNumeric } from '@/utils/isNumeric';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/InstructionBox.module.css';

type Props = {
  instruction: InstructionBox;
  paramKey: string;
};

function testIfAcceptableNumber(
  input: string,
  instruction: InstructionBox,
  param: InstructionBox['parameters'][0],
): boolean {
  if (param.type !== 'number') return false; // parameter accepts numeric value
  if (!isNumeric(input)) return false; // input is numeric
  if (instruction.abbreviated === 'DIV' && param.key === 'B' && Number(input) === 0) return false; // prevent division by 0
  if (instruction.abbreviated === 'MOV' && param.key === 'B') return false; // can't move value to a number
  if (param.key === 'C') return false; // can't move result to a number

  return true;
}

function changeCheck(input: string) {
  return !isNumeric(input[0]) || input.length <= 6;
}

export default function InstructionBoxParameter({ instruction, paramKey }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [lookinClickable, setLookinClickable] = useState(false);

  const param = instruction.parameters[paramKey];

  const dispatch = useAppDispatch();
  const selectTagOptions = useMemo(makeSelectTagOptions, []);
  const tagList = useSelector((state: RootState) =>
    selectTagOptions(state, instruction.displayType, param.type, paramKey),
  );

  function filterMatches(input: string) {
    return tagList.filter((tag) => {
      const tagLower = tag.toLowerCase();
      const inputLower = input.toLowerCase();
      return tagLower.indexOf(inputLower) === 0;
    });
  }

  function lookClickable() {
    // if (runSimulation) return;
    if (param.value == '?') return;

    setLookinClickable(true);
  }

  function handleClick() {
    // if (runSimulation) return;
    if (param.value == '?') return;

    setLookinClickable(false);
    setEditMode(true);
    dispatch(setGlobalEditMode(true));
  }

  function handleClickOutside() {
    setEditMode(false);
    dispatch(setGlobalEditMode(false));
  }

  function handleCommit(name: string) {
    const isAcceptableNumber = testIfAcceptableNumber(name, instruction, param!);

    if (!tagList.includes(name) && !isAcceptableNumber) return;

    dispatch(setBoxTagNameAction(name, instruction.id, paramKey));
    setEditMode(false);
    dispatch(setGlobalEditMode(false));
  }

  if (editMode) {
    return (
      <InlineAutocomplete
        initialState={param.value ? String(param.value) : ''}
        changeCheck={changeCheck}
        filterMatches={(input: string) => filterMatches(input)}
        onClickOutside={handleClickOutside}
        onCommit={handleCommit}
      />
    );
  } else {
    return (
      <p
        className={clsx('instruct-value', styles['instruct-value'], {
          [styles.unassigned]: param.value == null,
          [styles['tag-clickable']]: lookinClickable,
        })}
        onClick={handleClick}
        onMouseEnter={lookClickable}
        onMouseLeave={() => setLookinClickable(false)}
      >
        {param.value ?? 'Assign Tag'}
      </p>
    );
  }
}
