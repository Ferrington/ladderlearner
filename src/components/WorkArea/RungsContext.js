import { createContext, useReducer } from "react";

export const RungsContext = createContext(null);
export const RungsDispatchContext = createContext(null);

export function RungsProvider({children}) {
  const [rungs, dispatch] = useReducer(
    rungsReducer,
    [testRung]
  )
  
  return (
    <RungsContext.Provider value={rungs}>
      <RungsDispatchContext.Provider value={dispatch}>
        {children}
      </RungsDispatchContext.Provider>
    </RungsContext.Provider>
  );
}

function rungsReducer(rungs, action) {
  switch (action.type) {
    case 'added': {
      return handleAddInstruction(rungs, action.path, action.instructionType);
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

function handleAddInstruction(rungs, path, instructionType) {
  const createNewRung = (oldRung, path, instructionType) => {
    if (path.length === 1) {
      if (path[0] === "last")
        return {
          ...oldRung,
          contents: [
            ...oldRung.contents,
            {
              type: "Instruction",
              name: instructionType,
              tag: null
            }
          ]
        }
      return {
        ...oldRung,
        contents: [
          ...oldRung.contents.slice(0, path[0]),
          {
            type: "Instruction",
            name: instructionType,
            tag: null
          },
          ...oldRung.contents.slice(path[0])
        ]
      }
    }

    return {
      ...oldRung,
      contents: oldRung.contents.map((ele, i) =>
        path[0] === i
          ? createNewRung(ele, path.slice(1), instructionType)
          : ele
      )
    };
  }
  const oldRung = rungs[path[0]];
  const newRung = createNewRung(oldRung, path.slice(1), instructionType);

  return [
    ...rungs.slice(0, path[0]),
    newRung,
    ...rungs.slice(path[0] + 1)
  ];
};

const testRung = {
  type: "AND",
  contents: [
    {
      type: "OR",
      contents: [
        {
          type: "AND",
          contents: [
            {
              type: "Instruction",
              name: "XIC",
              tag: "Tag 1"
            }
          ]
        },
        {
          type: "AND",
          contents: [
            {
              type: "Instruction",
              name: "XIO",
              tag: "Tag 2"
            }
          ]
        }
      ]
    },
    {
      type: "Instruction",
      name: "OTE",
      tag: "Tag 3"
    }
  ]
}

// const emptyRung = {
//   type: "AND",
//   contents: []
// }