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
  console.log(instruction);
  console.log(state);
};

const isDestructive = (name) => {
  const destructiveList = ["OTE", "OTL", "OTU"];

  return destructiveList.includes(name);
};
