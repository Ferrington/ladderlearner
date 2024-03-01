import { Branch } from '@/store/routine/types';
import { ExampleState, Instruction } from '@/types';

export type CompressedTag =
  | CompressedBoolTag
  | CompressedNumberTag
  | CompressedTimerTag
  | CompressedCounterTag;

type CompressedBoolTag = {
  n: string;
  t: 'b';
  v: boolean;
};

type CompressedNumberTag = {
  n: string;
  t: 'n';
  v: number;
};

type CompressedTimerTag = {
  n: string;
  t: 't';
  v: CompressedTimerValue;
};

type CompressedCounterTag = {
  n: string;
  t: 'c';
  v: CompressedCounterValue;
};

type CompressedTimerValue = {
  p: number;
  a: number;
  d: boolean;
  t: boolean;
  s: number;
};

type CompressedCounterValue = {
  p: number;
  a: number;
  d: boolean;
};

export type CompressedRung = {
  r: string;
  c?: string;
};

export type CompressedState = {
  r: CompressedRung[];
  t: CompressedTag[];
};

export function compressState(state: ExampleState) {
  function mapTagNames(tagNames: string[]) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let aliasIndex = 0;

    return tagNames.reduce((acc, tag) => {
      acc[tag] = alphabet[aliasIndex % 52].repeat(Math.floor(aliasIndex / 52) + 1);
      aliasIndex++;
      return acc;
    }, {} as Record<string, string>);
  }

  function replaceTagName(value: unknown) {
    if (typeof value !== 'string') {
      return value;
    } else if (value.includes('.')) {
      const [name, suffix] = value.split('.');
      return `${tagNameMap[name]}.${suffix}`;
    } else {
      return tagNameMap[value];
    }
  }

  function getEleFromId(eleId: string): Branch | Instruction {
    if (state.routine.branches[eleId]) {
      return state.routine.branches[eleId];
    }
    return state.routine.instructions[eleId];
  }

  function compress(eleId: string): string {
    const ele = getEleFromId(eleId);

    if (ele.type === 'Instruction' && ele.displayType === 'Special') {
      const tagName = replaceTagName(ele.tag);
      return `${ele.abbreviated}(${tagName})`;
    } else if (ele.type === 'Instruction' && ele.displayType === 'Box') {
      const values = Object.values(ele.parameters)
        .filter((param) => !param.hidden)
        .map((param) => replaceTagName(param.value))
        .join(',');
      return `${ele.abbreviated}(${values})`;
    } else if (ele.type === 'OR') {
      const children = ele.children.map(compress).join('|');
      return `[${children}]`;
    } else if (ele.type === 'AND') {
      const children = ele.children.map(compress).join('!');
      return `<${children}>`;
    } else {
      throw new Error('Compression Error: Unknown type');
    }
  }

  function compressRungs() {
    const compressedRungs: CompressedRung[] = [];
    for (const rungId of state.routine.rungs.allIds) {
      const rung = state.routine.rungs.byId[rungId];
      compressedRungs.push({
        r: compress(rung.child),
        c: rung.comment,
      });
    }
    return compressedRungs;
  }

  function compressTags(): CompressedTag[] {
    const types = {
      bool: 'b',
      number: 'n',
      counter: 'c',
      timer: 't',
    };

    return state.tags.allIds.map((tagId) => {
      const tag = state.tags.byId[tagId];

      if (tag.type === 'counter') {
        return {
          n: tag.name,
          t: types[tag.type],
          v: {
            p: tag.value.pre,
            a: tag.value.acc,
            d: tag.value.dn,
          },
        } as CompressedCounterTag;
      } else if (tag.type === 'timer') {
        return {
          n: tag.name,
          t: types[tag.type],
          v: {
            p: tag.value.pre,
            a: tag.value.acc,
            d: tag.value.dn,
            t: tag.value.tt,
            s: 0,
          },
        } as CompressedTimerTag;
      } else {
        return {
          n: tag.name,
          t: types[tag.type],
          v: tag.value,
        } as CompressedBoolTag | CompressedNumberTag;
      }
    });
  }

  const tagNameMap = mapTagNames(state.tags.allIds);
  const compressedRungs = compressRungs();
  const compressedTags = compressTags();

  const compressedState: CompressedState = {
    r: compressedRungs,
    t: compressedTags,
  };

  return JSON.stringify(compressedState);
}
