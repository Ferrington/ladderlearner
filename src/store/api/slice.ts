import { FakeRoutines, routines } from '@/store/api/testRoutines';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRoutines: builder.query<FakeRoutines, void>({
      queryFn() {
        return { data: routines };
      },
    }),
  }),
});

export const { useGetRoutinesQuery } = apiSlice;
