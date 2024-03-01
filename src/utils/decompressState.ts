import { INSTRUCTION_PROPERTIES } from '@/config/instructionProperties';
import { RoutineSlice } from '@/store/routine/slice';
import { TagSlice } from '@/store/tag/slice';
import {
  BooleanTag,
  CounterTag,
  ExampleState,
  InstructionParameter,
  NumberTag,
  Tag,
  TimerTag,
} from '@/types';
import { CompressedRung, CompressedState, CompressedTag } from '@/utils/compressState';
import { isNumeric } from '@/utils/isNumeric';
import { nanoid } from 'nanoid';

export function decompressState(compressed: string): ExampleState {
  const compressedState = JSON.parse(compressed) as CompressedState;

  const tags: TagSlice = decompressTags(compressedState.t);
  const tagNameMap = mapTagNames(tags.allIds);
  const routine = decompressRoutine(compressedState.r, tagNameMap);

  return { tags, routine };
}

function mapTagNames(tagNames: string[]) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let aliasIndex = 0;

  return tagNames.reduce((acc, tag) => {
    const key = alphabet[aliasIndex % 52].repeat(Math.floor(aliasIndex / 52) + 1);
    acc[key] = tag;
    aliasIndex++;
    return acc;
  }, {} as Record<string, string>);
}

function decompressTags(compressedTags: CompressedTag[]): TagSlice {
  const types: Record<string, Tag['type']> = {
    b: 'bool',
    n: 'number',
    c: 'counter',
    t: 'timer',
  };

  const allIds = compressedTags.map((tag) => tag.n);
  const byId = compressedTags.reduce((acc, tag) => {
    if (tag.t === 'c') {
      acc[tag.n] = {
        name: tag.n,
        type: types[tag.t as keyof typeof types],
        value: {
          pre: tag.v.p,
          acc: tag.v.a,
          dn: tag.v.d,
        },
      } as CounterTag;
    } else if (tag.t === 't') {
      acc[tag.n] = {
        name: tag.n,
        type: types[tag.t as keyof typeof types],
        value: {
          pre: tag.v.p,
          acc: tag.v.a,
          dn: tag.v.d,
          tt: tag.v.t,
          startTime: tag.v.s,
        },
      } as TimerTag;
    } else {
      acc[tag.n] = {
        name: tag.n,
        type: types[tag.t as keyof typeof types],
        value: tag.v,
      } as BooleanTag | NumberTag;
    }
    return acc;
  }, {} as TagSlice['byId']);

  return {
    allIds,
    byId,
  };
}

function replaceTagName(rawTag: string, tagNameMap: Record<string, string>) {
  if (rawTag.includes('.')) {
    const [name, suffix] = rawTag.split('.');
    return `${tagNameMap[name]}.${suffix}`;
  } else {
    return tagNameMap[rawTag];
  }
}

function zipParameters(
  parameters: Record<string, InstructionParameter>,
  values: InstructionParameter['value'][],
  tagNameMap: Record<string, string>,
) {
  return Object.values(parameters).reduce((acc, parameter, index) => {
    const value = values[index];
    if (isNumeric(value)) {
      acc[parameter.key] = {
        ...parameter,
        value: Number(value),
      };
    } else if (value == null) {
      acc[parameter.key] = {
        ...parameter,
      };
    } else if (typeof value === 'string' && ['true', 'false'].includes(value)) {
      acc[parameter.key] = {
        ...parameter,
        value: value === 'true',
      };
    } else if (typeof value === 'string') {
      acc[parameter.key] = {
        ...parameter,
        value: replaceTagName(value, tagNameMap),
      };
    }

    return acc;
  }, {} as Record<string, InstructionParameter>);
}

function decompressRoutine(compressedRungs: CompressedRung[], tagNameMap: Record<string, string>) {
  function decompress(parentId: string, eleId: string, str: string) {
    // if ([...str.matchAll(/[a-zA-Z\d_]+\(.*?\)/g)].length == 1) {
    if (!['[', '<'].includes(str[0])) {
      // single instruction
      console.log('single instruction', str);

      const abbreviation = str.substring(0, str.indexOf('('));
      const contentsRaw = str.substring(str.indexOf('(') + 1, str.indexOf(')'));
      const instructionTemplate = INSTRUCTION_PROPERTIES[abbreviation];
      if (instructionTemplate.displayType === 'special') {
        const tagName = replaceTagName(contentsRaw, tagNameMap);
        routine.instructions[eleId] = {
          id: eleId,
          type: 'Instruction',
          displayType: 'Special',
          abbreviated: abbreviation,
          tag: tagName,
          parent: parentId,
          isDestructive: instructionTemplate.isDestructive,
          energized: false,
        };
      } else {
        const parameters = contentsRaw.split(',') as unknown as InstructionParameter['value'][];
        routine.instructions[eleId] = {
          id: eleId,
          type: 'Instruction',
          name: instructionTemplate.name,
          description: instructionTemplate.description,
          displayType: 'Box',
          abbreviated: abbreviation,
          parameters: zipParameters(
            structuredClone(instructionTemplate.parameters),
            parameters,
            tagNameMap,
          ),
          parent: parentId,
          isDestructive: instructionTemplate.isDestructive,
          energized: false,
        };
      }
    } else if (completelyEnclosedOr(str)) {
      // OR branch
      console.log('OR branch', str);

      const childIds: string[] = [];
      const tokens = extractBranchTokens(str.slice(1, -1), 'OR');
      tokens.forEach((token) => {
        const childId = 'b' + nanoid();
        childIds.push(childId);
        decompress(eleId, childId, token);
      });

      routine.branches[eleId] = {
        id: eleId,
        type: 'OR',
        parent: parentId,
        children: childIds,
      };
    } else {
      // AND branch
      console.log('AND branch', str);

      const childIds: string[] = [];
      const tokens = extractBranchTokens(str.slice(1, -1), 'AND');
      tokens.forEach((token) => {
        const prefix = token.includes('[') ? 'b' : 'i';
        const childId = prefix + nanoid();
        childIds.push(childId);
        decompress(eleId, childId, token);
      });

      routine.branches[eleId] = {
        id: eleId,
        type: 'AND',
        parent: parentId,
        children: childIds,
      };
    }
  }

  const routine: RoutineSlice = {
    rungs: { byId: {}, allIds: [] },
    branches: {},
    instructions: {},
  };

  for (const rung of compressedRungs) {
    const rungId = 'r' + nanoid();
    const childId = 'b' + nanoid();
    routine.rungs.allIds.push(rungId);
    routine.rungs.byId[rungId] = {
      id: rungId,
      type: 'Rung',
      child: childId,
      comment: rung.c,
    };

    console.log('new rung');
    decompress(rungId, childId, rung.r);
  }

  return routine;
}

function completelyEnclosedOr(str: string) {
  if (str[0] != '[' || str.slice(-1) != ']') return false;

  const openBracketIndexes = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '[') openBracketIndexes.push(i);
    if (str[i] == ']') {
      if (openBracketIndexes.length === 1) return i + 1 === str.length;
      openBracketIndexes.pop();
    }
  }

  return false;
}

function extractBranchTokens(str: string, branch: 'OR' | 'AND') {
  function extractOrToken() {
    const openBracketIndexes = [i];
    while (openBracketIndexes.length > 0) {
      if (i === str.length) throw new Error('Unmatched brackets');
      i++;
      if (str[i] == '[') openBracketIndexes.push(i);
      if (str[i] == ']') {
        if (openBracketIndexes.length === 1) {
          const orBranch = str.slice(openBracketIndexes[0], i + 1);
          tokens.push(orBranch);
        }
        openBracketIndexes.pop();
      }
    }
  }

  function extractInstructionToken() {
    const start = i;
    const markers = branch === 'OR' ? ['[', '|'] : ['<', '!'];
    while (!markers.includes(str[i]) && i < str.length) i++;
    tokens.push(str.slice(start, i));
  }

  let i = 0;
  const tokens: string[] = [];
  for (; i < str.length; i++) {
    if (str[i] === '[') {
      extractOrToken();
    } else {
      extractInstructionToken();
    }
  }

  return tokens;
}
