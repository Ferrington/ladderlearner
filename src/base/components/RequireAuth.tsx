import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
