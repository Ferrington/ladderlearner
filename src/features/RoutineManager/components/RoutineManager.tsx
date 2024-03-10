import RoutineRow from '@/features/RoutineManager/components/RoutineRow';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { useGetRoutinesQuery } from '@/store/api/slice';
import { setShowLogin } from '@/store/auth/slice';
import { selectActiveRoutine } from '@/store/base/selectors';
import { Button } from '@mantine/core';
import { useSelector } from 'react-redux';
import styles from '../styles/RoutineManager.module.css';

export default function RoutineManager() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
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
    content = <div>Something went wrong =\</div>;
  }

  return (
    <div className={styles['routine-manager']}>
      {user ? (
        <>
          <ol className={styles.list}>{content}</ol>
        </>
      ) : (
        <div>
          Log in to save routines.{' '}
          <Button onClick={() => dispatch(setShowLogin(true))}>Log In</Button>
        </div>
      )}
    </div>
  );
}
