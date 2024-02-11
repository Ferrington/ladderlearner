import { InstructionBox } from '@/types';
import styles from '../styles/InstructionBox.module.css';

type Props = {
  instruction: InstructionBox;
  paramKey: string;
};

// const testIfAcceptableNumber = (
//   input: string,
//   instruction: InstructionBox,
//   param: InstructionBox['parameters'][0],
// ): boolean => {
//   if (param.type !== 'number') return false; // parameter accepts numeric value
//   if (!isNumeric(input)) return false; // input is numeric
//   if (instruction.abbreviated === 'DIV' && param.key === 'B' && Number(input) === 0) return false; // prevent division by 0
//   if (instruction.abbreviated === 'MOV' && param.key === 'B') return false; // can't move value to a number
//   if (param.key === 'C') return false; // can't move result to a number

//   return true;
// };

// const changeCheck = (input: string) => {
//   return !isNumeric(input[0]) || input.length <= 6;
// };

export default function InstructionBoxParameter({ instruction, paramKey }: Props) {
  const editMode = false;

  const param = instruction.parameters[paramKey];
  if (param == null) return null;

  if (editMode) {
    // return (
    //   <InlineAutocomplete
    //     initialState={param.value ? String(param.value) : ""}
    //     changeCheck={changeCheck}
    //     filterMatches={(input: string) =>
    //       filterMatches(input, instruction, param.type, param.key)
    //     }
    //     onClickOutside={handleClickOutside}
    //     onCommit={handleCommit}
    //   />
    // );
  } else {
    return <p className={styles['instruct-value']}>{param.value ?? 'Assign Tag'}</p>;
  }
}
