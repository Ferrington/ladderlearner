import { createContext, useReducer } from "react";

export const RungsContext = createContext(null);
export const RungsDispatchContext = createContext(null);

export function RungsProvider({children}) {
  const [rungs, dispatch] = useReducer(
    rungsReducer,
    testRungs
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
      return addInstruction(rungs, action.path, action.data);
    }
    case 'moved': {
      return moveInstruction(rungs, action.path, action.data);
    }
    case 'deleted': {
      return deleteInstruction(rungs, action.path, action.elementType);
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

function moveInstruction(rungs, path, data) {
  let modPath = [...path];

  // need to modify the path array if deleted item changes the path to the added item
  if (data.path[0] === path[0] && path.length >= data.path.length) {
    console.log(data.path.slice(-1)[0], path[data.path.length - 1])
    modPath[data.path.length - 1] = data.path.slice(-1)[0] < path[data.path.length - 1] ? path[data.path.length - 1] - 1 : path[data.path.length - 1];
  }


  const modRungs = deleteInstruction(rungs, data.path, data.type);
  return addInstruction(modRungs, modPath, data);
}

function deleteInstruction(rungs, path, elementType) {
  const createNewRung = (oldRung, path, elementType) => {
    if (path.length === 1 && elementType === "Instruction") {
      return {
        ...oldRung,
        contents: [
          ...oldRung.contents.filter((ele, i) => path[0] !== i)
        ]
      }
    }

    return {
      ...oldRung,
      contents: oldRung.contents.map((ele, i) =>
        path[0] === i
          ? createNewRung(ele, path.slice(1), elementType)
          : ele
      )
    };
  }

  if (elementType === "Rung") {
    if (rungs.length === 1)
      return [{
        type: "AND",
        contents: []
      }];

    return rungs.filter((rung, i) => path[0] !== i);
  } else {
    const oldRung = rungs[path[0]];
    const newRung = createNewRung(oldRung, path.slice(1), elementType);

    return [
      ...rungs.slice(0, path[0]),
      newRung,
      ...rungs.slice(path[0] + 1)
    ];
  }
}

function addInstruction(rungs, path, data) {
  console.log("add", path);
  const createNewRung = (oldRung, path, data) => {
    if (path.length === 1) {
      if (path[0] === "last")
        return {
          ...oldRung,
          contents: [
            ...oldRung.contents,
            {
              type: data.type,
              name: data.name,
              tag: data.tag
            }
          ]
        }
      return {
        ...oldRung,
        contents: [
          ...oldRung.contents.slice(0, path[0]),
          {
            type: data.type,
            name: data.name,
            tag: data.tag
          },
          ...oldRung.contents.slice(path[0])
        ]
      }
    }

    return {
      ...oldRung,
      contents: oldRung.contents.map((ele, i) =>
        path[0] === i
          ? createNewRung(ele, path.slice(1), data)
          : ele
      )
    };
  }
  const oldRung = rungs[path[0]];
  const newRung = createNewRung(oldRung, path.slice(1), data);

  return [
    ...rungs.slice(0, path[0]),
    newRung,
    ...rungs.slice(path[0] + 1)
  ];
};

const testRungs = [
  {
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
  },
  {
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
  },
  {
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
  },
]
// const emptyRung = {
//   type: "AND",
//   contents: []
// }