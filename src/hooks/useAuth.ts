import { supabase } from '@/config/supabase';
import { useAppDispatch } from '@/store';
import { selectUser } from '@/store/auth/selectors';
import { setUser } from '@/store/auth/slice';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user ?? null));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    });
  }, [dispatch]);

  return useMemo(() => ({ user }), [user]);
}
