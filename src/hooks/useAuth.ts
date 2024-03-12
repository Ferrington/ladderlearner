import { selectUser } from '@/store/auth/selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useAuth() {
  const user = useSelector(selectUser);

  return useMemo(() => ({ user }), [user]);
}
