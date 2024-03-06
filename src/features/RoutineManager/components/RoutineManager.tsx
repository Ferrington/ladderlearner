import { useGetRoutinesQuery } from '@/store/api/slice';
import styles from '../styles/RoutineManager.module.css';

export default function RoutineManager() {
  const { data: routines, isLoading, isSuccess, isError } = useGetRoutinesQuery();

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = routines.map((routine) => <div key={routine.id}>{routine.name}</div>);
  } else if (isError) {
    content = <div>Error</div>;
  }

  return <div className={styles['routine-manager']}>{content}</div>;
}
