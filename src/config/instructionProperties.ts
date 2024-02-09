import type { InstructionProperties } from '@/types';

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
    // evaluate({ instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const evaluated = a === b;

    //   instruction.energized = evaluated;
    //   return evaluated;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const evaluated = a !== b;

    //   instruction.energized = evaluated;
    //   return evaluated;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const evaluated = a > b;

    //   instruction.energized = evaluated;
    //   return evaluated;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const evaluated = a >= b;

    //   instruction.energized = evaluated;
    //   return evaluated;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== 'Box') return false;

    //   const a = isNumeric(instruction.parameters['A'].value)
    //     ? Number(instruction.parameters['A'].value)
    //     : Number(getTagValue(instruction.parameters['A'].value as string));
    //   const b = isNumeric(instruction.parameters['B'].value)
    //     ? Number(instruction.parameters['B'].value)
    //     : Number(getTagValue(instruction.parameters['B'].value as string));

    //   const evaluated = a < b;

    //   instruction.energized = evaluated;
    //   return evaluated;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const evaluated = a <= b;

    //   instruction.energized = evaluated;
    //   return evaluated;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ parentEnergized, instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box" || !parentEnergized) return true;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const cTagName = instruction.parameters["C"].value as string;
    //   const evaluated = a + b;
    //   actions.updateTag(cTagName, evaluated);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ parentEnergized, instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box" || !parentEnergized) return true;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const cTagName = instruction.parameters["C"].value as string;
    //   const evaluated = a - b;
    //   actions.updateTag(cTagName, evaluated);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ parentEnergized, instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box" || !parentEnergized) return true;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const cTagName = instruction.parameters["C"].value as string;
    //   const evaluated = a * b;
    //   actions.updateTag(cTagName, evaluated);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ parentEnergized, instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box" || !parentEnergized) return true;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));
    //   const b = isNumeric(instruction.parameters["B"].value)
    //     ? Number(instruction.parameters["B"].value)
    //     : Number(getTagValue(instruction.parameters["B"].value as string));

    //   const cTagName = instruction.parameters["C"].value as string;

    //   if (b === 0) return true;
    //   const evaluated = a / b;
    //   actions.updateTag(cTagName, evaluated);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ parentEnergized, instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box" || !parentEnergized) return true;

    //   const a = isNumeric(instruction.parameters["A"].value)
    //     ? Number(instruction.parameters["A"].value)
    //     : Number(getTagValue(instruction.parameters["A"].value as string));

    //   const bTagName = instruction.parameters["B"].value as string;
    //   actions.updateTag(bTagName, a);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   instruction.parameters[key].value = input;
    // },
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
    // evaluate({ parentEnergized, tags, instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const counterTagName = instruction.parameters["Counter"].value;
    //   if (typeof counterTagName !== "string") return true;

    //   const counterTag = getTagByName(counterTagName);
    //   const counterTagProperties = counterTag.value as Counter;

    //   if (!instruction.energized && parentEnergized) {
    //     instruction.energized = true;

    //     actions.updateTag(
    //       `${counterTagName}.acc`,
    //       Number(counterTagProperties.acc) + 1
    //     );
    //   } else if (instruction.energized && parentEnergized) {
    //     // nothing
    //   } else if (!parentEnergized) {
    //     instruction.energized = false;
    //   }

    //   if (counterTagProperties.acc >= counterTagProperties.pre)
    //     actions.updateTag(`${counterTagName}.dn`, true);
    //   else actions.updateTag(`${counterTagName}.dn`, false);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   if (key === "Counter") {
    //     instruction.parameters[key].value = input;
    //     const counterName = instruction.parameters.Counter.value as string;
    //     const counter = getTagByName(counterName).value as any;

    //     instruction.parameters.pre.value = counter.pre;
    //     instruction.parameters.acc.value = counter.acc;
    //     instruction.parameters.dn.value = counter.dn;
    //   } else {
    //     const counterName = instruction.parameters.Counter.value as string;
    //     if (counterName == null) return;
    //     actions.updateTag(`${counterName}.${key}`, Number(input));
    //   }
    // },
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
    // evaluate({ parentEnergized, tags, instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const counterTagName = instruction.parameters["Counter"].value;
    //   if (typeof counterTagName !== "string") return true;

    //   const counterTag = getTagByName(counterTagName);
    //   const counterTagProperties = counterTag.value as Counter;

    //   if (!instruction.energized && parentEnergized) {
    //     instruction.energized = true;
    //     actions.updateTag(
    //       `${counterTagName}.acc`,
    //       Number(counterTagProperties.acc) - 1
    //     );
    //   } else if (instruction.energized && parentEnergized) {
    //     // nothing
    //   } else if (!parentEnergized) {
    //     instruction.energized = false;
    //   }

    //   if (counterTagProperties.acc >= counterTagProperties.pre)
    //     actions.updateTag(`${counterTagName}.dn`, true);
    //   else actions.updateTag(`${counterTagName}.dn`, false);

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   if (key === "Counter") {
    //     instruction.parameters[key].value = input;
    //     const counterName = instruction.parameters.Counter.value as string;
    //     const counter = getTagByName(counterName).value as any;

    //     instruction.parameters.pre.value = counter.pre;
    //     instruction.parameters.acc.value = counter.acc;
    //     instruction.parameters.dn.value = counter.dn;
    //   } else {
    //     const counterName = instruction.parameters.Counter.value as string;
    //     if (counterName == null) return;
    //     actions.updateTag(`${counterName}.${key}`, Number(input));
    //   }
    // },
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
    // evaluate({ parentEnergized, tags, instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const timerTagName = instruction.parameters["Timer"].value;
    //   if (typeof timerTagName !== "string") return true;

    //   const timerTag = getTagByName(timerTagName);
    //   const timerTagProperties = timerTag.value as Timer;

    //   if (!instruction.energized && parentEnergized) {
    //     instruction.energized = true;
    //     actions.updateTag(`${timerTagName}.startTime`, Date.now());
    //     actions.updateTag(`${timerTagName}.tt`, true);
    //   } else if (instruction.energized && parentEnergized) {
    //     const acc = Math.floor(
    //       (Date.now() - timerTagProperties.startTime) / 1000
    //     );
    //     if (acc < timerTagProperties.pre) {
    //       actions.updateTag(`${timerTagName}.acc`, acc);
    //     } else {
    //       actions.updateTag(`${timerTagName}.tt`, false);
    //       actions.updateTag(`${timerTagName}.dn`, true);
    //     }
    //   } else if (!parentEnergized) {
    //     instruction.energized = false;
    //     actions.updateTag(`${timerTagName}.acc`, 0);
    //     actions.updateTag(`${timerTagName}.tt`, false);
    //     actions.updateTag(`${timerTagName}.dn`, false);
    //   }

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   if (key === "Timer") {
    //     instruction.parameters[key].value = input;
    //     const timerName = instruction.parameters.Timer.value as string;
    //     const timer = getTagByName(timerName).value as any;

    //     instruction.parameters.pre.value = timer.pre;
    //     instruction.parameters.acc.value = timer.acc;
    //     instruction.parameters.dn.value = timer.dn;
    //     instruction.parameters.tt.value = timer.tt;
    //   } else {
    //     const timerName = instruction.parameters.Timer.value as string;
    //     if (timerName == null) return;
    //     actions.updateTag(`${timerName}.${key}`, Number(input));
    //   }
    // },
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
    // evaluate({ parentEnergized, tags, instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Box") return false;

    //   const timerTagName = instruction.parameters["Timer"].value;
    //   if (typeof timerTagName !== "string") return true;

    //   const timerTag = getTagByName(timerTagName);
    //   const timerTagProperties = timerTag.value as Timer;

    //   if (!instruction.energized && parentEnergized) {
    //     instruction.energized = true;
    //     actions.updateTag(`${timerTagName}.acc`, 0);
    //     actions.updateTag(`${timerTagName}.dn`, true);
    //   } else if (instruction.energized && parentEnergized) {
    //     // nothing
    //   } else if (timerTagProperties.tt) {
    //     const acc = Math.floor(
    //       (Date.now() - timerTagProperties.startTime) / 1000
    //     );
    //     if (acc < timerTagProperties.pre) {
    //       actions.updateTag(`${timerTagName}.acc`, acc);
    //     } else {
    //       actions.updateTag(`${timerTagName}.tt`, false);
    //       actions.updateTag(`${timerTagName}.dn`, false);
    //     }
    //   } else if (!parentEnergized && timerTagProperties.dn) {
    //     actions.updateTag(`${timerTagName}.startTime`, Date.now());
    //     actions.updateTag(`${timerTagName}.tt`, true);
    //     instruction.energized = false;
    //   }

    //   return true;
    // },
    // setParameter({ instruction, tags, input, key }: SetParameterArgs) {
    //   if (key === "Timer") {
    //     instruction.parameters[key].value = input;
    //     const timerName = instruction.parameters.Timer.value as string;
    //     const timer = getTagByName(timerName).value as any;

    //     instruction.parameters.pre.value = timer.pre;
    //     instruction.parameters.acc.value = timer.acc;
    //     instruction.parameters.dn.value = timer.dn;
    //     instruction.parameters.tt.value = timer.tt;
    //   } else {
    //     const timerName = instruction.parameters.Timer.value as string;
    //     if (timerName == null) return;
    //     actions.updateTag(`${timerName}.${key}`, Number(input));
    //   }
    // },
  },
  XIC: {
    name: 'Normally Open',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate({ instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Special") return false;

    //   const tagValue = getTagValue(instruction.tag!);

    //   instruction.energized = tagValue;

    //   return tagValue;
    // },
  },
  XIO: {
    name: 'Normally Closed',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate({ instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Special") return false;

    //   const tagValue = getTagValue(instruction.tag!);

    //   instruction.energized = !tagValue;

    //   return !tagValue;
    // },
  },
  OTE: {
    name: 'Energize Coil',
    isDestructive: true,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate({ parentEnergized, instruction, tags }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Special") return true;

    //   const tag = getTagByName(instruction.tag!);

    //   instruction.energized = parentEnergized;
    //   tag.value = parentEnergized;

    //   return true;
    // },
  },
  OTL: {
    name: 'Latch Coil',
    isDestructive: true,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate({
    //   parentEnergized,
    //   instruction,
    //   routine,
    //   tags,
    // }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Special" || instruction.energized)
    //     return true;

    //   const tag = getTagByName(instruction.tag!);

    //   instruction.energized = parentEnergized;
    //   tag.value = parentEnergized;

    //   const instructions = routine.instructions;
    //   for (const id in instructions) {
    //     const otherInstruction = instructions[id];

    //     if (
    //       otherInstruction.displayType === "Special" &&
    //       otherInstruction.tag === instruction.tag
    //     )
    //       otherInstruction.energized = parentEnergized;
    //   }

    //   return true;
    // },
  },
  OTU: {
    name: 'Unlatch Coil',
    isDestructive: true,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate({
    //   parentEnergized,
    //   instruction,
    //   routine,
    //   tags,
    // }: EvaluateArgs): boolean {
    //   if (
    //     instruction.displayType !== "Special" ||
    //     !instruction.energized ||
    //     !parentEnergized
    //   )
    //     return true;

    //   const tag = getTagByName(instruction.tag!);

    //   instruction.energized = false;
    //   tag.value = false;

    //   const instructions = routine.instructions;
    //   for (const id in instructions) {
    //     const otherInstruction = instructions[id];
    //     if (
    //       otherInstruction.displayType === "Special" &&
    //       otherInstruction.tag === instruction.tag
    //     )
    //       otherInstruction.energized = false;
    //   }

    //   return true;
    // },
  },
  ONS: {
    name: 'One Shot',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate({ parentEnergized, instruction }: EvaluateArgs): boolean {
    //   if (instruction.displayType !== "Special") return false;

    //   if (!instruction.energized && parentEnergized) {
    //     instruction.energized = true;
    //     return true;
    //   } else if (instruction.energized && parentEnergized) {
    //     return false;
    //   } else if (!parentEnergized) {
    //     instruction.energized = false;
    //     return false;
    //   }

    //   return false;
    // },
  },
  Rung: {
    name: 'Rung',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate() {},
  },
  Branch: {
    name: 'Branch',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate() {},
  },
  'Branch Level': {
    name: 'Branch Level',
    isDestructive: false,
    tag: null,
    displayType: 'special',
    energized: false,
    // evaluate() {},
  },
};
