import { nanoid } from "nanoid";
import { store } from "./store";
import { getRungElement } from "./selectors";

export const addInstruction = (instruction) => {
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

export const deleteRung = (rung) => {
  const state = store.rungs;
  deleteChildren(state.branches[rung.child]);

  if (state.rungs.allIds.length === 1) return;

  state.rungs.allIds = state.rungs.allIds.filter((id) => id !== rung.id);
  delete state.branches[rung.child];
  delete state.rungs.byId[rung.id];
};

const deleteChildren = (ele, firstRun = true) => {
  const state = store.rungs;

  if (ele.children != null)
    ele.children
      .map((child) => getRungElement(state, child))
      .forEach((child) => deleteChildren(child, false));

  if (!firstRun) delete state.branches[ele.id];
  else state.branches[ele.id].children = [];
};

const isDestructive = (name) => {
  const destructiveList = ["OTE", "OTL", "OTU"];

  return destructiveList.includes(name);
};
