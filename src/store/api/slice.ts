import { supabase } from '@/config/supabase';
import { FakeRoutines, routines } from '@/store/api/testRoutines';
import { serializeError } from '@/utils/serializeError';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Session, User } from '@supabase/supabase-js';

export type AuthRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  session: Session | null;
  user: User | null;
};

export type LoginResponse = {
  session: Session;
  user: User;
};

export type AuthError = {
  status: number;
  name: string;
  message: string;
};

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, AuthRequest>({
      async queryFn(registerRequest) {
        const { data, error } = await supabase.auth.signUp(registerRequest);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (error != null) {
          return {
            error: serializeError(error),
          };
        }
        return { data };
      },
    }),
    login: builder.mutation<LoginResponse, AuthRequest>({
      async queryFn(loginRequest) {
        const { data, error } = await supabase.auth.signInWithPassword(loginRequest);

        if (error != null) {
          return {
            error: serializeError(error),
          };
        }
        return { data };
      },
    }),
    getRoutines: builder.query<FakeRoutines, void>({
      async queryFn() {
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        return { data: routines };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetRoutinesQuery } = apiSlice;
