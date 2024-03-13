import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

export type AuthSlice = {
  user: User | null | undefined;
  showLogin: boolean;
};

const initialState: AuthSlice = {
  user: undefined,
  showLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setShowLogin(state, action: PayloadAction<boolean>) {
      state.showLogin = action.payload;
    },
  },
});

export const { setUser, setShowLogin } = authSlice.actions;

export const authReducer = authSlice.reducer;
