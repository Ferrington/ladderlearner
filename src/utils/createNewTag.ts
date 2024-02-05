import { BooleanTag, CounterTag, NumberTag, Tag, TimerTag } from '@/types';

export function createNewTag(name: string, type: Tag['type']): Tag {
  switch (type) {
    case 'bool':
      return {
        name,
        type,
        value: false,
      } as BooleanTag;
    case 'number':
      return {
        name,
        type,
        value: 0,
      } as NumberTag;
    case 'counter':
      return {
        name,
        type,
        value: {
          pre: 0,
          acc: 0,
          dn: false,
        },
      } as CounterTag;
    case 'timer':
      return {
        name,
        type,
        value: {
          pre: 0,
          acc: 0,
          dn: false,
          tt: false,
          startTime: 0,
        },
      } as TimerTag;
  }
}
