import { Branch, RoutineSlice } from '@/store/routine/slice';
import { Instruction, ValidDropLocations } from '@/types';

export function deleteChildren(
  state: RoutineSlice,
  ele: Branch | Instruction,
  firstRun: boolean = true,
) {
  if (ele.type === 'OR' || ele.type === 'AND') {
    ele.children
      .map((id) => (id in state.instructions ? state.instructions[id] : state.branches[id]))
      .forEach((child) => deleteChildren(state, child, false));
  } else {
    delete state.instructions[ele.id];
  }

  if (!firstRun) delete state.branches[ele.id];
  else state.branches[ele.id].children = [];
}

export function selectElementById(routine: RoutineSlice, id: string) {
  if (id in routine.branches) return routine.branches[id];
  else if (id in routine.instructions) return routine.instructions[id];
  else if (id in routine.rungs.byId) return routine.rungs.byId[id];
  throw new Error(`Element with id ${id} not found`);
}

export function hasDestructiveChild(routine: RoutineSlice, id: string): boolean {
  const ele = selectElementById(routine, id);

  if (ele.type === 'Rung') throw new Error('Rungs cannot be children of branches');
  else if (ele.type === 'Instruction') return ele.isDestructive;

  for (const childId of ele.children) {
    if (hasDestructiveChild(routine, childId)) return true;
  }
  return false;
}

export function hasNonDestructiveChild(routine: RoutineSlice, id: string): boolean {
  const ele = selectElementById(routine, id);

  if (ele.type === 'Rung') throw new Error('hasNonDestructiveChild called with rungId.');
  if (ele.type === 'Instruction') return !ele.isDestructive;

  for (const childId of ele.children) {
    if (hasNonDestructiveChild(routine, childId)) return true;
  }
  return false;
}

export function findDestructiveChild(routine: RoutineSlice, id: string) {
  const ele = selectElementById(routine, id);

  if (ele.type !== 'AND' && ele.type !== 'OR')
    throw new Error('findDestructiveChild called with non-branch id');

  for (let i = 0; i < ele.children.length; i++) {
    if (hasDestructiveChild(routine, ele.children[i])) return i;
  }
  return -1;
}

export function findLastNonDestructiveChild(routine: RoutineSlice, id: string) {
  const ele = selectElementById(routine, id);

  if (ele.type !== 'AND' && ele.type !== 'OR')
    throw new Error('findLastNonDestructiveChild called with non-branch id');

  for (let i = ele.children.length - 1; i >= 0; i--) {
    if (hasNonDestructiveChild(routine, ele.children[i])) return i;
  }
  return -1;
}

export function getAvailableDropLocations(routine: RoutineSlice, branch: Branch) {
  let locs: ValidDropLocations = {
    [branch.id]: [...Array(branch.children.length + 1).keys()],
  };

  branch.children.forEach((childId) => {
    if (childId.indexOf('branch') === 0)
      locs = {
        ...locs,
        ...getAvailableDropLocations(routine, routine.branches[childId]),
      };
  });

  return locs;
}

export function getDestructiveDropLocations(routine: RoutineSlice) {
  function findDestructiveDropLocations(branchId: string, goodLocation: string | null = null) {
    if (branchId.indexOf('instruction') === 0) return {};

    const branch = routine.branches[branchId];
    const destructiveIndex = findDestructiveChild(routine, branch.id);
    const lastNonDestructiveIndex = findLastNonDestructiveChild(routine, branch.id);

    let locs: ValidDropLocations = {};

    if (branch.type === 'AND') {
      if (destructiveIndex === -1 && goodLocation === 'last') {
        return { [branch.id]: [branch.children.length] };
      } else if (destructiveIndex === -1 || lastNonDestructiveIndex === -1) {
        return { ...locs, ...getAvailableDropLocations(routine, branch) };
      }

      branch.children.forEach((childId, i) => {
        if (i < destructiveIndex - 1) {
          //  don't even worry about it
        } else if (i === destructiveIndex - 1) {
          locs = { ...locs, ...findDestructiveDropLocations(childId, 'last') };
        } else if (i === destructiveIndex && childId.indexOf('branch') === 0) {
          locs = { ...locs, ...findDestructiveDropLocations(childId, 'last') };
        } else if (i >= destructiveIndex) {
          locs[branch.id] = branch.id in locs ? [...locs[branch.id], i] : [i];
          locs = { ...locs, ...findDestructiveDropLocations(childId, 'any') };
        }

        if (i === destructiveIndex) {
          locs[branch.id] = branch.id in locs ? [...locs[branch.id], i + 1] : [i + 1];
        }
      });
    } else if (branch.type === 'OR') {
      branch.children.forEach((childId) => {
        locs = { ...locs, ...findDestructiveDropLocations(childId, goodLocation) };
      });
    }

    return locs;
  }

  let dropLocs: ValidDropLocations = {};
  for (const rungId in routine.rungs.byId) {
    const rung = routine.rungs.byId[rungId];
    dropLocs = { ...dropLocs, ...findDestructiveDropLocations(rung.child) };
  }
  return dropLocs;
}

export function getNonDestructiveDropLocations(routine: RoutineSlice) {
  const locs: ValidDropLocations = {};

  for (const branchId in routine.branches) {
    const branch = routine.branches[branchId];
    if (branch.type === 'OR') continue;

    const destructiveChildLoc = findDestructiveChild(routine, branchId);

    if (destructiveChildLoc === -1) locs[branchId] = [...Array(branch.children.length + 1).keys()];
    else locs[branchId] = [...Array(destructiveChildLoc + 1).keys()];
  }

  return locs;
}

export function getBranchLevelLocations(routine: RoutineSlice) {
  const locs: ValidDropLocations = {};
  for (const branchId in routine.branches) {
    const branch = routine.branches[branchId];
    if (branch.type !== 'OR') continue;

    for (const childId of branch.children) {
      locs[childId] = [0];
    }
  }

  return locs;
}
