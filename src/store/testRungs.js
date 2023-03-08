export const testRungs = {
  rungs: {
    byId: {
      rung1: {
        id: "rung1",
        number: 1,
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
  },
  instructions: {
    instruction1: {
      id: "instruction1",
      type: "Instruction",
      name: "XIC",
      tag: "Tag 1",
    },
    instruction2: {
      id: "instruction2",
      type: "Instruction",
      name: "XIO",
      tag: "Tag 2",
    },
    instruction3: {
      id: "instruction3",
      type: "Instruction",
      name: "OTE",
      tag: "Tag 3",
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
