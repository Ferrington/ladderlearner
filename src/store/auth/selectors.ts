import { RootState } from '@/store';

export function selectUser(state: RootState) {
  return state.auth.user;
}

export function selectShowLogin(state: RootState) {
  return state.auth.showLogin;
}
