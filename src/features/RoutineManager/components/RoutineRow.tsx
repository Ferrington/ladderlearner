import { useAppDispatch } from '@/store';
import { SavedRoutine } from '@/store/api/slice';
import { loadSavedRoutineAction } from '@/store/thunks/loadSavedRoutineAction';
import { decompressState } from '@/utils/decompressState';
import clsx from 'clsx';
import styles from '../styles/RoutineRow.module.css';

type Props = {
  routine: SavedRoutine;
  isActive: boolean;
};

export default function RoutineRow({ routine, isActive }: Props) {
  const dispatch = useAppDispatch();

  function handleClick() {
    const state = decompressState(routine.state_str);
    dispatch(loadSavedRoutineAction(state, routine.id));
  }

  return (
    <li className={clsx({ [styles.active]: isActive })} onClick={handleClick}>
      {routine.name}
    </li>
  );
}
