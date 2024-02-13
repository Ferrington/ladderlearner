import { Branch, RoutineSlice } from '@/store/routine/routineSlice';
import { Instruction } from '@/types';

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
