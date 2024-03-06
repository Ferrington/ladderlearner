import { useGetRoutinesQuery } from '@/store/api/slice';

export default function RoutineManager() {
  const { data: routines, isLoading, isSuccess, isError } = useGetRoutinesQuery();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error</div>;
  else if (isSuccess) return <div>{JSON.stringify(routines)}</div>;

  return <div>RoutineManager</div>;
}
