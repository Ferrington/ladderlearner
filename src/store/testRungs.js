export const testRungs = {
  rungs: {
    byId: {
      rung1: {
        id: "rung1",
        child: "branch1",
      },
      rung2: {
        id: "rung2",
        child: "branch5",
      },
    },
    allIds: ["rung1", "rung2"],
  },
  branches: {
    branch1: {
      id: "branch1",
      type: "AND",
      parent: "rung1",
      children: ["branch2", "instruction3"],
    },
    branch2: {
      id: "branch2",
      type: "OR",
      parent: "branch1",
      children: ["branch3", "branch4"],
    },
    branch3: {
      id: "branch3",
      type: "AND",
      parent: "branch2",
      children: ["instruction1"],
    },
    branch4: {
      id: "branch4",
      type: "AND",
      parent: "branch2",
      children: ["instruction2"],
    },
    branch5: {
      id: "branch5",
      type: "AND",
      parent: "rung2",
      children: ["instruction4", "branch6"],
    },
    branch6: {
      id: "branch6",
      type: "OR",
      parent: "branch5",
      children: ["branch7", "branch8"],
    },
    branch7: {
      id: "branch7",
      type: "AND",
      parent: "branch6",
      children: ["instruction5", "instruction6"],
    },
    branch8: {
      id: "branch8",
      type: "AND",
      parent: "branch6",
      children: ["instruction7", "instruction8"],
    },
  },
  instructions: {
    instruction1: {
      id: "instruction1",
      type: "Instruction",
      name: "XIC",
      tag: "Tag 1",
      parent: "branch3",
      isDestructive: false,
    },
    instruction2: {
      id: "instruction2",
      type: "Instruction",
      name: "XIO",
      tag: "Tag 2",
      parent: "branch4",
      isDestructive: false,
    },
    instruction3: {
      id: "instruction3",
      type: "Instruction",
      name: "OTE",
      tag: "Tag 3",
      parent: "branch1",
      isDestructive: true,
    },
    instruction4: {
      id: "instruction4",
      type: "Instruction",
      name: "XIC",
      tag: "Tag 4",
      parent: "branch5",
      isDestructive: false,
    },
    instruction5: {
      id: "instruction5",
      type: "Instruction",
      name: "XIC",
      tag: "Tag 5",
      parent: "branch7",
      isDestructive: false,
    },
    instruction6: {
      id: "instruction6",
      type: "Instruction",
      name: "OTE",
      tag: "Tag 6",
      parent: "branch7",
      isDestructive: true,
    },
    instruction7: {
      id: "instruction7",
      type: "Instruction",
      name: "XIO",
      tag: "Tag 7",
      parent: "branch7",
      isDestructive: false,
    },
    instruction8: {
      id: "instruction8",
      type: "Instruction",
      name: "OTE",
      tag: "Tag 8",
      parent: "branch7",
      isDestructive: true,
    },
  },
};

// export const testRungs = [
//   {
//     type: "AND",
//     contents: [
//       {
//         type: "OR",
//         contents: [
//           {
//             type: "AND",
//             contents: [
//               {
//                 type: "Instruction",
//                 name: "XIC",
//                 tag: "Tag 1",
//               },
//             ],
//           },
//           {
//             type: "AND",
//             contents: [
//               {
//                 type: "Instruction",
//                 name: "XIO",
//                 tag: "Tag 2",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         type: "Instruction",
//         name: "OTE",
//         tag: "Tag 3",
//       },
//     ],
//   },
//   {
//     type: "AND",
//     contents: [
//       {
//         type: "OR",
//         contents: [
//           {
//             type: "AND",
//             contents: [
//               {
//                 type: "Instruction",
//                 name: "XIC",
//                 tag: "Tag 1",
//               },
//             ],
//           },
//           {
//             type: "AND",
//             contents: [
//               {
//                 type: "Instruction",
//                 name: "XIO",
//                 tag: "Tag 2",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         type: "Instruction",
//         name: "OTE",
//         tag: "Tag 3",
//       },
//     ],
//   },
//   {
//     type: "AND",
//     contents: [
//       {
//         type: "OR",
//         contents: [
//           {
//             type: "AND",
//             contents: [
//               {
//                 type: "Instruction",
//                 name: "XIC",
//                 tag: "Tag 1",
//               },
//             ],
//           },
//           {
//             type: "AND",
//             contents: [
//               {
//                 type: "Instruction",
//                 name: "XIO",
//                 tag: "Tag 2",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         type: "Instruction",
//         name: "OTE",
//         tag: "Tag 3",
//       },
//     ],
//   },
// ];
