export const getRungChild = (state, id) => {
  const childId = state.rungs.byId[id].child;
  return state.branches[childId];
};

export const getRungElement = (state, id) => {
  if (id in state.branches) return state.branches[id];
  else if (id in state.instructions) return state.instructions[id];
  else if (id in state.rungs.byId) return state.rungs.byId[id];
};
