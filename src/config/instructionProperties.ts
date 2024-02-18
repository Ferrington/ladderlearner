import { setInstructionEnergized } from '@/store/routine/slice';
import { getParamValue, getTagByName, getTagValue } from '@/store/routine/utils';
import { updateTagAction } from '@/store/thunks/updateTagAction';
import type { Counter, EvaluateArgs, InstructionProperties, Timer } from '@/types';
import { parseTagName } from '@/utils/parseTagName';

export const INSTRUCTION_PROPERTIES: InstructionProperties = {
  EQU: {
    name: 'A == B',
    description: 'Equal',
    isDestructive: false,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const evaluated = a === b;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: evaluated }));
      return evaluated;
    },
  },
  NEQ: {
    name: 'A != B',
    description: 'Not Equal',
    isDestructive: false,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const evaluated = a !== b;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: evaluated }));
      return evaluated;
    },
  },
  GRT: {
    name: 'A > B',
    description: 'Greater Than',
    isDestructive: false,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const evaluated = a > b;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: evaluated }));
      return evaluated;
    },
  },
  GEQ: {
    name: 'A >= B',
    description: 'Greater or Equal',
    isDestructive: false,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const evaluated = a >= b;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: evaluated }));
      return evaluated;
    },
  },
  LES: {
    name: 'A < B',
    description: 'Less Than',
    isDestructive: false,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const evaluated = a < b;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: evaluated }));
      return evaluated;
    },
  },
  LEQ: {
    name: 'A <= B',
    description: 'Less or Equal',
    isDestructive: false,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const evaluated = a <= b;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: evaluated }));
      return evaluated;
    },
  },
  ADD: {
    name: 'Add',
    description: 'A + B = C',
    isDestructive: true,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
      C: {
        key: 'C',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box' || !parentEnergized) return true;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const { name: cTagName, key: cTagKey } = parseTagName(
        instruction.parameters['C'].value as string,
      );
      const evaluated = a + b;
      dispatch(updateTagAction({ name: cTagName, key: cTagKey, value: evaluated }));

      return true;
    },
  },
  SUB: {
    name: 'Subtract',
    description: 'A - B = C',
    isDestructive: true,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
      C: {
        key: 'C',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box' || !parentEnergized) return true;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const { name: cTagName, key: cTagKey } = parseTagName(
        instruction.parameters['C'].value as string,
      );
      const evaluated = a - b;
      dispatch(updateTagAction({ name: cTagName, key: cTagKey, value: evaluated }));

      return true;
    },
  },
  MUL: {
    name: 'Multiply',
    description: 'A * B = C',
    isDestructive: true,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
      C: {
        key: 'C',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box' || !parentEnergized) return true;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);

      const { name: cTagName, key: cTagKey } = parseTagName(
        instruction.parameters['C'].value as string,
      );
      const evaluated = a * b;
      dispatch(updateTagAction({ name: cTagName, key: cTagKey, value: evaluated }));

      return true;
    },
  },
  DIV: {
    name: 'Divide',
    description: 'A / B = C',
    isDestructive: true,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
      C: {
        key: 'C',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box' || !parentEnergized) return true;

      const a = getParamValue(state, instruction.parameters['A'].value);
      const b = getParamValue(state, instruction.parameters['B'].value);
      if (b === 0) return true;

      const { name: cTagName, key: cTagKey } = parseTagName(
        instruction.parameters['C'].value as string,
      );
      const evaluated = a / b;
      dispatch(updateTagAction({ name: cTagName, key: cTagKey, value: evaluated }));

      return true;
    },
  },
  MOV: {
    name: 'Move',
    description: 'A -> B',
    isDestructive: true,
    parameters: {
      A: {
        key: 'A',
        value: null,
        type: 'number',
      },
      B: {
        key: 'B',
        value: null,
        type: 'number',
      },
    },
    displayType: 'box',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box' || !parentEnergized) return true;

      const a = getParamValue(state, instruction.parameters['A'].value);

      const { name: bTagName, key: bTagKey } = parseTagName(
        instruction.parameters['C'].value as string,
      );
      dispatch(updateTagAction({ name: bTagName, key: bTagKey, value: a }));

      return true;
    },
  },
  CTU: {
    name: 'Count Up',
    description: '',
    isDestructive: true,
    parameters: {
      Counter: {
        key: 'Counter',
        value: null,
        type: 'counter',
      },
      pre: {
        key: 'pre',
        value: '?',
        type: 'number',
      },
      acc: {
        key: 'acc',
        value: '?',
        type: 'number',
      },
      dn: {
        key: 'dn',
        value: false,
        type: 'bool',
        hidden: true,
      },
    },
    displayType: 'box',
    energized: false,
    prevEnergized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const counterTagName = instruction.parameters['Counter'].value;
      if (typeof counterTagName !== 'string') return true;

      const counterTag = getTagByName(state, counterTagName);
      const counterTagProperties = counterTag.value as Counter;

      if (!instruction.energized && parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: true }));

        dispatch(
          updateTagAction({
            name: counterTagName,
            key: 'acc',
            value: Number(counterTagProperties.acc) + 1,
          }),
        );
      } else if (instruction.energized && parentEnergized) {
        // nothing
      } else if (!parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: false }));
      }

      dispatch(
        updateTagAction({
          name: counterTagName,
          key: 'dn',
          value: counterTagProperties.acc >= counterTagProperties.pre,
        }),
      );

      return true;
    },
  },
  CTD: {
    name: 'Count Down',
    description: '',
    isDestructive: true,
    parameters: {
      Counter: {
        key: 'Counter',
        value: null,
        type: 'counter',
      },
      pre: {
        key: 'pre',
        value: '?',
        type: 'number',
      },
      acc: {
        key: 'acc',
        value: '?',
        type: 'number',
      },
      dn: {
        key: 'dn',
        value: false,
        type: 'bool',
        hidden: true,
      },
    },
    displayType: 'box',
    energized: false,
    prevEnergized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const counterTagName = instruction.parameters['Counter'].value;
      if (typeof counterTagName !== 'string') return true;

      const counterTag = getTagByName(state, counterTagName);
      const counterTagProperties = counterTag.value as Counter;

      if (!instruction.energized && parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: true }));

        dispatch(
          updateTagAction({
            name: counterTagName,
            key: 'acc',
            value: Number(counterTagProperties.acc) - 1,
          }),
        );
      } else if (instruction.energized && parentEnergized) {
        // nothing
      } else if (!parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: false }));
      }

      dispatch(
        updateTagAction({
          name: counterTagName,
          key: 'dn',
          value: counterTagProperties.acc >= counterTagProperties.pre,
        }),
      );

      return true;
    },
  },
  TON: {
    name: 'Timer On Delay',
    description: '',
    isDestructive: true,
    parameters: {
      Timer: {
        key: 'Timer',
        value: null,
        type: 'timer',
      },
      pre: {
        key: 'pre',
        value: '?',
        type: 'number',
      },
      acc: {
        key: 'acc',
        value: '?',
        type: 'number',
      },
      dn: {
        key: 'dn',
        value: false,
        type: 'bool',
        hidden: true,
      },
      tt: {
        key: 'tt',
        value: false,
        type: 'bool',
        hidden: true,
      },
      startTime: {
        key: 'startTime',
        value: 0,
        type: 'number',
        hidden: true,
      },
    },
    displayType: 'box',
    energized: false,
    prevEnergized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const timerTagName = instruction.parameters['Timer'].value;
      if (typeof timerTagName !== 'string') return true;

      const timerTag = getTagByName(state, timerTagName);
      const timerTagProperties = timerTag.value as Timer;

      if (!instruction.energized && parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: true }));
        dispatch(updateTagAction({ name: timerTagName, key: 'startTime', value: Date.now() }));
        dispatch(updateTagAction({ name: timerTagName, key: 'tt', value: true }));
      } else if (instruction.energized && parentEnergized) {
        const acc = Math.floor((Date.now() - timerTagProperties.startTime) / 1000);
        if (acc < timerTagProperties.pre) {
          dispatch(updateTagAction({ name: timerTagName, key: 'acc', value: acc }));
        } else {
          dispatch(updateTagAction({ name: timerTagName, key: 'tt', value: false }));
          dispatch(updateTagAction({ name: timerTagName, key: 'dn', value: true }));
        }
      } else if (!parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: false }));
        dispatch(updateTagAction({ name: timerTagName, key: 'acc', value: 0 }));
        dispatch(updateTagAction({ name: timerTagName, key: 'tt', value: false }));
        dispatch(updateTagAction({ name: timerTagName, key: 'dn', value: false }));
      }

      return true;
    },
  },
  TOF: {
    name: 'Timer Off Delay',
    description: '',
    isDestructive: true,
    parameters: {
      Timer: {
        key: 'Timer',
        value: null,
        type: 'timer',
      },
      pre: {
        key: 'pre',
        value: '?',
        type: 'number',
      },
      acc: {
        key: 'acc',
        value: '?',
        type: 'number',
      },
      dn: {
        key: 'dn',
        value: false,
        type: 'bool',
        hidden: true,
      },
      tt: {
        key: 'tt',
        value: false,
        type: 'bool',
        hidden: true,
      },
      startTime: {
        key: 'startTime',
        value: 0,
        type: 'number',
        hidden: true,
      },
    },
    displayType: 'box',
    energized: false,
    prevEnergized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Box') return false;

      const timerTagName = instruction.parameters['Timer'].value;
      if (typeof timerTagName !== 'string') return true;

      const timerTag = getTagByName(state, timerTagName);
      const timerTagProperties = timerTag.value as Timer;

      if (!instruction.energized && parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: true }));
        dispatch(updateTagAction({ name: timerTagName, key: 'acc', value: 0 }));
        dispatch(updateTagAction({ name: timerTagName, key: 'dn', value: true }));
      } else if (instruction.energized && parentEnergized) {
        // nothing
      } else if (timerTagProperties.tt) {
        const acc = Math.floor((Date.now() - timerTagProperties.startTime) / 1000);
        if (acc < timerTagProperties.pre) {
          dispatch(updateTagAction({ name: timerTagName, key: 'acc', value: acc }));
        } else {
          dispatch(updateTagAction({ name: timerTagName, key: 'tt', value: false }));
          dispatch(updateTagAction({ name: timerTagName, key: 'dn', value: false }));
        }
      } else if (!parentEnergized && timerTagProperties.dn) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: false }));
        dispatch(updateTagAction({ name: timerTagName, key: 'startTime', value: Date.now() }));
        dispatch(updateTagAction({ name: timerTagName, key: 'tt', value: true }));
      }

      return true;
    },
  },
  XIC: {
    name: 'Normally Open',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Special') return false;

      const tagValue = getTagValue(state, instruction.tag!) as boolean;
      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: tagValue }));

      return tagValue;
    },
  },
  XIO: {
    name: 'Normally Closed',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate({ dispatch, state, instruction }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Special') return false;

      const tagValue = !getTagValue(state, instruction.tag!) as boolean;
      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: tagValue }));

      return tagValue;
    },
  },
  OTE: {
    name: 'Energize Coil',
    isDestructive: true,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Special') return true;

      dispatch(
        setInstructionEnergized({ instructionId: instruction.id, energized: parentEnergized }),
      );
      dispatch(updateTagAction({ name: instruction.tag!, value: parentEnergized }));

      return true;
    },
  },
  OTL: {
    name: 'Latch Coil',
    isDestructive: true,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Special' || instruction.energized) return true;

      dispatch(
        setInstructionEnergized({ instructionId: instruction.id, energized: parentEnergized }),
      );
      dispatch(updateTagAction({ name: instruction.tag!, value: parentEnergized }));

      for (const otherInstruction of Object.values(state.routine.instructions)) {
        if (
          otherInstruction.displayType === 'Special' &&
          otherInstruction.tag === instruction.tag
        ) {
          dispatch(
            setInstructionEnergized({
              instructionId: otherInstruction.id,
              energized: parentEnergized,
            }),
          );
        }
      }

      return true;
    },
  },
  OTU: {
    name: 'Unlatch Coil',
    isDestructive: true,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate({ dispatch, state, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Special' || !instruction.energized || !parentEnergized)
        return true;

      dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: false }));
      dispatch(updateTagAction({ name: instruction.tag!, value: false }));

      for (const otherInstruction of Object.values(state.routine.instructions)) {
        if (
          otherInstruction.displayType === 'Special' &&
          otherInstruction.tag === instruction.tag
        ) {
          dispatch(
            setInstructionEnergized({
              instructionId: otherInstruction.id,
              energized: false,
            }),
          );
        }
      }

      return true;
    },
  },
  ONS: {
    name: 'One Shot',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate({ dispatch, instruction, parentEnergized }: EvaluateArgs): boolean {
      if (instruction.displayType !== 'Special') return false;

      if (!instruction.energized && parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: true }));
        return true;
      } else if (instruction.energized && parentEnergized) {
        return false;
      } else if (!parentEnergized) {
        dispatch(setInstructionEnergized({ instructionId: instruction.id, energized: false }));
        return false;
      }

      return false;
    },
  },
  Rung: {
    name: 'Rung',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate() {
      return false;
    },
  },
  Branch: {
    name: 'Branch',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate() {
      return false;
    },
  },
  'Branch Level': {
    name: 'Branch Level',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    evaluate() {
      return false;
    },
  },
};
