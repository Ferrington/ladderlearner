import RoutineRow from '@/features/RoutineManager/components/RoutineRow';
import { useGetRoutinesQuery } from '@/store/api/slice';
import { selectActiveRoutine } from '@/store/base/selectors';
import { useSelector } from 'react-redux';
import styles from '../styles/RoutineManager.module.css';

export default function RoutineManager() {
  const { data: routines, isLoading, isSuccess, isError } = useGetRoutinesQuery();

  const activeRoutine = useSelector(selectActiveRoutine);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = routines.map((routine) => (
      <RoutineRow key={routine.id} routine={routine} isActive={activeRoutine === routine.id} />
    ));
  } else if (isError) {
    content = <div>Error</div>;
  }

  return (
    <div className={styles['routine-manager']}>
      <ol className={styles.list}>{content}</ol>
    </div>
  );
}
