import { RoutineSlice } from '@/store/routine/slice';
import { TagSlice } from '@/store/tag/slice';
import { BooleanTag, CounterTag, ExampleState, NumberTag, Tag, TimerTag } from '@/types';
import { CompressedRung, CompressedState, CompressedTag } from '@/utils/compressState';
import { nanoid } from 'nanoid';

export function decompressState(compressed: string): ExampleState {
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

  const compressedState = JSON.parse(compressed) as CompressedState;

  const tags: TagSlice = decompressTags(compressedState.t);
  const tagNameMap = mapTagNames(tags.allIds);
  const routine = decompressRoutine(compressedState.r, tagNameMap);
}

function decompressRoutine(compressedRungs: CompressedRung[], tagNameMap: Record<string, string>) {
  function decompress(parentId: string, str: string) {
    if ([...str.matchAll(/[a-zA-Z\d_]+\(.*?\)/g)].length == 1) {
      // single instruction
      console.log('single instruction', str);
    } else if (completelyEnclosed(str)) {
      // OR branch
      console.log('OR branch', str);

      const branchId = nanoid();

      const tokens = branchOrTokens(str.slice(1, -1));
      tokens.forEach((token) => decompress(branchId, token));
    } else {
      // AND branch
      console.log('AND branch', str);

      const branchId = nanoid();

      //tokenize OR branches
      const tokens = branchAndTokens(str);
      tokens.forEach((token) => decompress(branchId, token));
    }
  }

  const routine: RoutineSlice = {
    rungs: { byId: {}, allIds: [] },
    branches: {},
    instructions: {},
  };

  for (const rung of compressedRungs) {
    const rungId = nanoid();
    routine.rungs.allIds.push(rungId);
    routine.rungs.byId[rungId] = {
      id: rungId,
      type: 'Rung',
      child: '',
      comment: rung.c,
    };

    decompress(rungId, rung.r);
  }

  return routine;
}

function completelyEnclosed(str: string) {
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

function branchOrTokens(str: string) {
  const openBracketIndexes = [];
  const tokens = [];
  for (let i = 0; i < str.length; i++) {
    if (openBracketIndexes.length === 0) {
      const j = i;
      while (!['[', '|'].includes(str[i]) && i < str.length) i++;
      tokens.push(str.slice(j, i));
    }

    if (str[i] == '[') openBracketIndexes.push(i);
    if (str[i] == ']') {
      if (openBracketIndexes.length === 1) {
        const orBranch = str.slice(openBracketIndexes[0], i + 1);
        tokens.push(orBranch);
      }
      openBracketIndexes.pop();
    }
  }

  return tokens;
}

function branchAndTokens(str: string) {
  const openBracketIndexes = [];
  const tokens = [];
  for (let i = 0; i < str.length; i++) {
    if (openBracketIndexes.length === 0) {
      const j = i;
      while (!['[', ')'].includes(str[i]) && i < str.length) i++;
      if (str[i] == ')') i++;
      tokens.push(str.slice(j, i));
    }

    if (str[i] == '[') openBracketIndexes.push(i);
    if (str[i] == ']') {
      if (openBracketIndexes.length === 1) {
        const orBranch = str.slice(openBracketIndexes[0], i + 1);
        tokens.push(orBranch);
      }
      openBracketIndexes.pop();
    }
  }

  return tokens;
}
