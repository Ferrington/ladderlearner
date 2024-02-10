import { RootState } from '@/store';

export function selectRungIds(store: RootState) {
  return store.routine.rungs.allIds;
}

export function selectRungById(rungId: string) {
  return (store: RootState) => store.routine.rungs.byId[rungId];
}

export function selectRungChild(rungId: string) {
  return (store: RootState) => store.routine.rungs.byId[rungId].child;
}
