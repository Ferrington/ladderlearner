export const defaultRung = {
  rungs: {
    byId: {
      rung1: {
        id: "rung1",
        child: "branch1",
      },
    },
    allIds: ["rung1"],
  },
  branches: {
    branch1: {
      id: "branch1",
      type: "AND",
      parent: "rung1",
      children: [],
    },
  },
  instructions: {},
};
