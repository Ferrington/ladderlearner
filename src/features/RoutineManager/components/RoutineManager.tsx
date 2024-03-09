import { supabase } from '@/config/supabase';
import RoutineRow from '@/features/RoutineManager/components/RoutineRow';
import { useGetRoutinesQuery } from '@/store/api/slice';
import { selectActiveRoutine } from '@/store/base/selectors';
import { useSelector } from 'react-redux';
import styles from '../styles/RoutineManager.module.css';

export default function RoutineManager() {
  const { data: routines, isLoading: isRoutineLoading, isSuccess, isError } = useGetRoutinesQuery();

  const activeRoutine = useSelector(selectActiveRoutine);

  let content;

  if (isRoutineLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = routines.map((routine) => (
      <RoutineRow key={routine.id} routine={routine} isActive={activeRoutine === routine.id} />
    ));
  } else if (isError) {
    content = <div>Error</div>;
  }

  async function fetch() {
    const { data, error } = await supabase.from('routines').select();

    console.log(data, error);
  }

  return (
    <div className={styles['routine-manager']}>
      <ol className={styles.list}>{content}</ol>
      <button onClick={fetch}>Fetch</button>
    </div>
  );
}
