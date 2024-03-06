import { FakeRoutines, routines } from '@/store/api/testRoutines';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRoutines: builder.query<FakeRoutines, void>({
      async queryFn() {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return { data: routines };
      },
    }),
  }),
});

export const { useGetRoutinesQuery } = apiSlice;
