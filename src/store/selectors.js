export const getRungChild = (state, id) => {
  const childId = state.rungs.byId[id].child;
  return state.branches[childId];
};

export const getRungElement = (state, id) => {
  if (id.indexOf("branch") > -1) return state.branches[id];
  else if (id.indexOf("instruction") > -1) return state.instructions[id];
  else if (id.indexOf("rung") > -1) return state.rungs.byId[id];
};
