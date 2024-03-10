import { supabase } from '@/config/supabase';
import { serializeAuthError, serializePostgrestError } from '@/store/api/utils';
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

export type SavedRoutine = {
  id: number;
  name: string;
  state_str: string;
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
            error: serializeAuthError(error),
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
            error: serializeAuthError(error),
          };
        }
        return { data };
      },
    }),
    getRoutines: builder.query<SavedRoutine[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('routines').select();

        if (error != null) {
          return {
            error: serializePostgrestError(error),
          };
        }
        return { data };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetRoutinesQuery } = apiSlice;
