import { Tag } from '@/types';
import { formatTagValue } from '@/utils/formatTagValue';
import { describe, expect, it } from 'vitest';

describe('formatTagValue', () => {
  it('should format a boolean tag value', () => {
    const tag: Tag = {
      name: 'test',
      type: 'bool',
      value: true,
    };

    const formattedValue = formatTagValue(tag);
    expect(formattedValue).toBe('True');
  });

  it('should format a number tag value', () => {
    const tag: Tag = {
      name: 'test',
      type: 'number',
      value: 42,
    };

    const formattedValue = formatTagValue(tag);
    expect(formattedValue).toBe('42');
  });

  it('should format a counter tag value', () => {
    const tag: Tag = {
      name: 'test',
      type: 'counter',
      value: {
        pre: 0,
        acc: 0,
        dn: false,
      },
    };

    const formattedValue = formatTagValue(tag);
    expect(formattedValue).toBe('Counter');
  });

  it('should format a timer tag value', () => {
    const tag: Tag = {
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

    const formattedValue = formatTagValue(tag);
    expect(formattedValue).toBe('Timer');
  });
});
