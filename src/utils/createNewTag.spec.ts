import { BooleanTag, CounterTag, NumberTag, TimerTag } from '@/types';
import { createNewTag } from '@/utils/createNewTag';
import { describe, expect, it } from 'vitest';

describe('createNewTag', () => {
  it('should create a new boolean tag', () => {
    const expectedTag: BooleanTag = {
      name: 'test',
      type: 'bool',
      value: false,
    };

    const tag = createNewTag(expectedTag.name, expectedTag.type);
    expect(tag).toEqual(expectedTag);
  });

  it('should create a new number tag', () => {
    const expectedTag: NumberTag = {
      name: 'test',
      type: 'number',
      value: 0,
    };

    const tag = createNewTag(expectedTag.name, expectedTag.type);
    expect(tag).toEqual(expectedTag);
  });

  it('should create a new counter tag', () => {
    const expectedTag: CounterTag = {
      name: 'test',
      type: 'counter',
      value: {
        pre: 0,
        acc: 0,
        dn: false,
      },
    };

    const tag = createNewTag(expectedTag.name, expectedTag.type);
    expect(tag).toEqual(expectedTag);
  });

  it('should create a new timer tag', () => {
    const expectedTag: TimerTag = {
      name: 'test',
      type: 'timer',
      value: {
        pre: 0,
        acc: 0,
        dn: false,
        tt: false,
        startTime: 0,
      },
    };

    const tag = createNewTag(expectedTag.name, expectedTag.type);
    expect(tag).toEqual(expectedTag);
  });
});
