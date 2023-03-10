import { nanoid } from "nanoid";
import { store } from "./store";
import { getRungElement } from "./selectors";

export const addBranch = (branch) => {
  const state = store.rungs;
  const newId = "branch" + nanoid();
  const childIds = ["branch" + nanoid(), "branch" + nanoid()];

  const parent = state.branches[branch.parent];
  parent.children.splice(branch.index, 0, newId);

  state.branches[newId] = {
    id: newId,
    type: "OR",
    parent: parent.id,
    children: childIds,
  };

  childIds.forEach((childId) => {
    state.branches[childId] = {
      id: childId,
      type: "AND",
      parent: newId,
      children: [],
    };
  });
};

export const deleteBranch = (branch) => {
  const state = store.rungs;
  deleteChildren(branch);

  const parent = state.branches[branch.parent];

  parent.children = parent.children.filter((child) => child !== branch.id);
  delete state.branches[branch.id];

  if (parent.children.length === 1) {
    const grandparent = state.branches[parent.parent];
    const index = grandparent.children.indexOf(parent.id);
    const leftovers = state.branches[parent.children[0]].children;

    leftovers.forEach((id) => {
      const ele = getRungElement(state, id);
      ele.parent = grandparent.id;
    });

    delete state.branches[parent.children[0]];
    delete state.branches[parent.id];
    grandparent.children.splice(index, 1, ...[...leftovers]);
  }
};

export const addInstruction = (instruction) => {
  if (instruction.name === "Branch") return addBranch(instruction);

  const state = store.rungs;
  const newId = "instruction" + nanoid();

  const parent = state.branches[instruction.parent];
  parent.children.splice(instruction.index, 0, newId);

  state.instructions[newId] = {
    id: newId,
    type: "Instruction",
    name: instruction.name,
    tag: instruction.tag,
    parent: parent.id,
    isDestructive: isDestructive(instruction.name),
  };
};

export const deleteInstruction = (instruction) => {
  const state = store.rungs;

  const parent = state.branches[instruction.parent];
  parent.children = parent.children.filter((child) => child !== instruction.id);

  delete state.instructions[instruction.id];
};

export const moveInstruction = (instruction) => {
  const addInstruct = {
    ...instruction,
    parent: instruction.newParent,
  };

  addInstruction(addInstruct);

  const oldInstruct = {
    ...instruction,
    parent: instruction.oldParent,
  };

  deleteInstruction(oldInstruct);

  setDragState(false);
};

export const moveRung = (rung) => {
  let state = store.rungs.rungs.allIds;
  const prevIndex = state.indexOf(rung.id);
  const newIndex =
    rung.newIndex > prevIndex ? rung.newIndex - 1 : rung.newIndex;

  state = arrayMove(state, prevIndex, newIndex);
};

export const deleteRung = (rung) => {
  const state = store.rungs;
  deleteChildren(state.branches[rung.child]);

  if (state.rungs.allIds.length === 1) return;

  state.rungs.allIds = state.rungs.allIds.filter((id) => id !== rung.id);
  delete state.branches[rung.child];
  delete state.rungs.byId[rung.id];
};

export const setDragState = (weAreDraggin) => {
  store.weDraggin = weAreDraggin;
};

export const setRungDragState = (weAreDraggin) => {
  store.weDragginRungs = weAreDraggin;
};

const deleteChildren = (ele, firstRun = true) => {
  const state = store.rungs;

  if (ele.children != null)
    ele.children
      .map((child) => getRungElement(state, child))
      .forEach((child) => deleteChildren(child, false));
  else delete state.instructions[ele.id];

  if (!firstRun) delete state.branches[ele.id];
  else state.branches[ele.id].children = [];
};

const isDestructive = (name) => {
  const destructiveList = ["OTE", "OTL", "OTU"];

  return destructiveList.includes(name);
};

const arrayMove = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
};
