import InlineAutocomplete from '@/base/components/InlineAutocomplete';
import {
  InstructionBoxParameterProps,
  useInstructionBoxParameter,
} from '@/features/RoutineEditor/hooks/useInstructionBoxParameter';
import clsx from 'clsx';
import styles from '../styles/InstructionBox.module.css';

export default function InstructionBoxParameter(props: InstructionBoxParameterProps) {
  const {
    editMode,
    param,
    lookinClickable,
    lookClickable,
    changeCheck,
    filterMatches,
    handleClick,
    handleClickOutside,
    handleCommit,
    setLookinClickable,
  } = useInstructionBoxParameter(props);

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
