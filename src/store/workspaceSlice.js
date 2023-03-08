import { createSlice } from "@reduxjs/toolkit";
import { testRungs } from "./testRungs";

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    value: testRungs,
  },
  reducers: {
    addInstruction: (state, action) => {},
  },
});

export const { addInstruction } = workspaceSlice.actions;

export const selectAllRungIds = (state) => state.workspace.value.rungs.allIds;
export const selectElementById = (state, id) => {
  if (id.indexOf("rung") > -1) {
    return state.workspace.value.rungs.byId[id];
  } else if (id.indexOf("branch") > -1) {
    return state.workspace.value.branches[id];
  } else if (id.indexOf("instruction") > -1)
    return state.workspace.value.instructions[id];
};
export const selectChildrenByParentId = (state, id) => {
  const children = selectElementById(state, id).children;
  return children.map((childId) => selectElementById(state, childId));
};

export default workspaceSlice.reducer;
