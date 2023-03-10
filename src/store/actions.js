import { nanoid } from "nanoid";
import { store } from "./store";

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

const isDestructive = (name) => {
  const destructiveList = ["OTE", "OTL", "OTU"];

  return destructiveList.includes(name);
};
