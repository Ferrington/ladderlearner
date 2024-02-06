import { isNumeric } from '@/utils/isNumeric';
import { describe, expect, it } from 'vitest';

describe('isNumeric', () => {
  it('should return true if the value is a number', () => {
    expect(isNumeric(42)).toBe(true);
  });

  it('should return true if the value is a string number', () => {
    expect(isNumeric('42')).toBe(true);
  });

  it('should return false if the value is a string', () => {
    expect(isNumeric('test')).toBe(false);
  });

  it('should return false if the value is an empty string', () => {
    expect(isNumeric('')).toBe(false);
  });

  it('should return false if the value is null or undefined', () => {
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(null)).toBe(false);
  });
});
