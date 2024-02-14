import { AppDispatch } from '@/store';
import { deleteInstruction, insertInstruction } from '@/store/routine/slice';
import { MoveInstructionPayload } from '@/store/routine/types';
import { nanoid } from 'nanoid';

export function moveInstructionAction({ instruction, newParent, index }: MoveInstructionPayload) {
  return (dispatch: AppDispatch) => {
    const newInstruction = {
      ...instruction,
      id: 'instruction' + nanoid(),
      parent: newParent,
    };

    dispatch(insertInstruction({ instruction: newInstruction, index }));
    dispatch(deleteInstruction(instruction));
  };
}
