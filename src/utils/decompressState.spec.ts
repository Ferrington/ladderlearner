import { compressState } from '@/utils/compressState';
import { decompressState } from '@/utils/decompressState';
import { describe, expect, it } from 'vitest';

describe('decompressState', () => {
  it('should decompress state', () => {
    const stateStr =
      '{"r":[{"r":"<XIO(B)![<XIC(A)>|<XIC(C)>]!OTE(C)>","c":"The Motor seals itself on after being energized by the Start tag.\\nIt will remain on until the circuit is broken by the Stop tag."}],"t":[{"n":"Start","t":"b","v":false},{"n":"Stop","t":"b","v":false},{"n":"Motor","t":"b","v":false}]}';

    const state = decompressState(stateStr);
    const expected = compressState(state);

    expect(stateStr).toEqual(expected);
  });

  it('should decompress state starting with OR branch', () => {
    const stateStr =
      '{"r":[{"r":"<[<XIC(A)>|<XIC(C)>]!XIO(B)!OTE(C)>","c":"The Motor seals itself on after being energized by the Start tag.\\nIt will remain on until the circuit is broken by the Stop tag."}],"t":[{"n":"Start","t":"b","v":false},{"n":"Stop","t":"b","v":false},{"n":"Motor","t":"b","v":false}]}';

    const state = decompressState(stateStr);
    const expected = compressState(state);

    expect(stateStr).toEqual(expected);
  });
});
