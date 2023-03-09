import { createSelector, createSlice } from "@reduxjs/toolkit";
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
const selectAllElements = (state) => ({
  ...state.workspace.value.rungs.byId,
  ...state.workspace.value.branches,
  ...state.workspace.value.instructions,
});

export const makeSelectElementById = () => {
  const selectElementById = createSelector(
    [selectAllElements, (state, id) => id],
    (elements, id) => elements[id]
  );
  return selectElementById;
};

export const selectElementsByIds = createSelector(
  [selectAllElements, (state, ids) => ids],
  (eles, ids) => ids.map((id) => eles[id])
);

// export const selectChildrenByParentId = createSelector(
//   [selectElementById],
//   (parent) =>
//     parent.children.map((childId) => selectElementById(state, childId))
// );

export default workspaceSlice.reducer;
