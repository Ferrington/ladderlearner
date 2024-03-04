import { ExampleState } from '@/types';
import { compressState } from '@/utils/compressState';
import { describe, expect, it } from 'vitest';

describe('compressState', () => {
  it('should compress empty state', () => {
    const state: ExampleState = {
      routine: {
        rungs: {
          byId: {},
          allIds: [],
        },
        branches: {},
        instructions: {},
      },
      tags: {
        byId: {},
        allIds: [],
      },
    };

    const compressedState = compressState(state);

    expect(compressedState).toEqual('{"r":[],"t":[]}');
  });

  it('should compress state', () => {
    const state: ExampleState = {
      tags: {
        allIds: ['Start', 'Stop', 'Motor'],
        byId: {
          Start: { name: 'Start', type: 'bool', value: false },
          Stop: { name: 'Stop', type: 'bool', value: false },
          Motor: { name: 'Motor', type: 'bool', value: false },
        },
      },
      routine: {
        rungs: {
          byId: {
            'rRucFW-qtX52sWy-GmhcOs': {
              id: 'rRucFW-qtX52sWy-GmhcOs',
              type: 'Rung',
              child: 'bqjs97n9E2oOyVpxlRQUlA',
              comment:
                'The Motor seals itself on after being energized by the Start tag.\nIt will remain on until the circuit is broken by the Stop tag.',
            },
          },
          allIds: ['rRucFW-qtX52sWy-GmhcOs'],
        },
        branches: {
          blTGM4OGQZSykg9edAHyPg: {
            id: 'blTGM4OGQZSykg9edAHyPg',
            type: 'AND',
            parent: 'bjrG1SQKyz0kyBbH9c1T3Q',
            children: ['ip4BCEjOmLi_T1SGg710QV'],
          },
          'bVsHRhy09HMHKvit78PX-5': {
            id: 'bVsHRhy09HMHKvit78PX-5',
            type: 'AND',
            parent: 'bjrG1SQKyz0kyBbH9c1T3Q',
            children: ['iHwKtaLdT0wzQAenfLqjfk'],
          },
          bjrG1SQKyz0kyBbH9c1T3Q: {
            id: 'bjrG1SQKyz0kyBbH9c1T3Q',
            type: 'OR',
            parent: 'bqjs97n9E2oOyVpxlRQUlA',
            children: ['blTGM4OGQZSykg9edAHyPg', 'bVsHRhy09HMHKvit78PX-5'],
          },
          bqjs97n9E2oOyVpxlRQUlA: {
            id: 'bqjs97n9E2oOyVpxlRQUlA',
            type: 'AND',
            parent: 'rRucFW-qtX52sWy-GmhcOs',
            children: [
              'iq64EAj1P3QyNXuheooA1Z',
              'bjrG1SQKyz0kyBbH9c1T3Q',
              'ibWApvGljUdyol5ksK6JmN',
            ],
          },
        },
        instructions: {
          iq64EAj1P3QyNXuheooA1Z: {
            id: 'iq64EAj1P3QyNXuheooA1Z',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'XIO',
            tag: 'Stop',
            parent: 'bqjs97n9E2oOyVpxlRQUlA',
            isDestructive: false,
            energized: false,
          },
          ip4BCEjOmLi_T1SGg710QV: {
            id: 'ip4BCEjOmLi_T1SGg710QV',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'XIC',
            tag: 'Start',
            parent: 'blTGM4OGQZSykg9edAHyPg',
            isDestructive: false,
            energized: false,
          },
          iHwKtaLdT0wzQAenfLqjfk: {
            id: 'iHwKtaLdT0wzQAenfLqjfk',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'XIC',
            tag: 'Motor',
            parent: 'bVsHRhy09HMHKvit78PX-5',
            isDestructive: false,
            energized: false,
          },
          ibWApvGljUdyol5ksK6JmN: {
            id: 'ibWApvGljUdyol5ksK6JmN',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'OTE',
            tag: 'Motor',
            parent: 'bqjs97n9E2oOyVpxlRQUlA',
            isDestructive: true,
            energized: false,
          },
        },
      },
    };

    const compressedState = compressState(state);
    const expected =
      '{"r":[{"r":"<XIO(B)![<XIC(A)>|<XIC(C)>]!OTE(C)>","c":"The Motor seals itself on after being energized by the Start tag.\\nIt will remain on until the circuit is broken by the Stop tag."}],"t":[{"n":"Start","t":"b","v":false},{"n":"Stop","t":"b","v":false},{"n":"Motor","t":"b","v":false}]}';

    expect(compressedState).toEqual(expected);
  });

  it('should compress state starting with OR branch', () => {
    const state: ExampleState = {
      tags: {
        allIds: ['Start', 'Stop', 'Motor'],
        byId: {
          Start: { name: 'Start', type: 'bool', value: false },
          Stop: { name: 'Stop', type: 'bool', value: false },
          Motor: { name: 'Motor', type: 'bool', value: false },
        },
      },
      routine: {
        rungs: {
          byId: {
            'rRucFW-qtX52sWy-GmhcOs': {
              id: 'rRucFW-qtX52sWy-GmhcOs',
              type: 'Rung',
              child: 'bqjs97n9E2oOyVpxlRQUlA',
              comment:
                'The Motor seals itself on after being energized by the Start tag.\nIt will remain on until the circuit is broken by the Stop tag.',
            },
          },
          allIds: ['rRucFW-qtX52sWy-GmhcOs'],
        },
        branches: {
          blTGM4OGQZSykg9edAHyPg: {
            id: 'blTGM4OGQZSykg9edAHyPg',
            type: 'AND',
            parent: 'bjrG1SQKyz0kyBbH9c1T3Q',
            children: ['ip4BCEjOmLi_T1SGg710QV'],
          },
          'bVsHRhy09HMHKvit78PX-5': {
            id: 'bVsHRhy09HMHKvit78PX-5',
            type: 'AND',
            parent: 'bjrG1SQKyz0kyBbH9c1T3Q',
            children: ['iHwKtaLdT0wzQAenfLqjfk'],
          },
          bjrG1SQKyz0kyBbH9c1T3Q: {
            id: 'bjrG1SQKyz0kyBbH9c1T3Q',
            type: 'OR',
            parent: 'bqjs97n9E2oOyVpxlRQUlA',
            children: ['blTGM4OGQZSykg9edAHyPg', 'bVsHRhy09HMHKvit78PX-5'],
          },
          bqjs97n9E2oOyVpxlRQUlA: {
            id: 'bqjs97n9E2oOyVpxlRQUlA',
            type: 'AND',
            parent: 'rRucFW-qtX52sWy-GmhcOs',
            children: [
              'bjrG1SQKyz0kyBbH9c1T3Q',
              'iq64EAj1P3QyNXuheooA1Z',
              'ibWApvGljUdyol5ksK6JmN',
            ],
          },
        },
        instructions: {
          iq64EAj1P3QyNXuheooA1Z: {
            id: 'iq64EAj1P3QyNXuheooA1Z',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'XIO',
            tag: 'Stop',
            parent: 'bqjs97n9E2oOyVpxlRQUlA',
            isDestructive: false,
            energized: false,
          },
          ip4BCEjOmLi_T1SGg710QV: {
            id: 'ip4BCEjOmLi_T1SGg710QV',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'XIC',
            tag: 'Start',
            parent: 'blTGM4OGQZSykg9edAHyPg',
            isDestructive: false,
            energized: false,
          },
          iHwKtaLdT0wzQAenfLqjfk: {
            id: 'iHwKtaLdT0wzQAenfLqjfk',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'XIC',
            tag: 'Motor',
            parent: 'bVsHRhy09HMHKvit78PX-5',
            isDestructive: false,
            energized: false,
          },
          ibWApvGljUdyol5ksK6JmN: {
            id: 'ibWApvGljUdyol5ksK6JmN',
            type: 'Instruction',
            displayType: 'Special',
            abbreviated: 'OTE',
            tag: 'Motor',
            parent: 'bqjs97n9E2oOyVpxlRQUlA',
            isDestructive: true,
            energized: false,
          },
        },
      },
    };

    const compressedState = compressState(state);
    const expected =
      '{"r":[{"r":"<[<XIC(A)>|<XIC(C)>]!XIO(B)!OTE(C)>","c":"The Motor seals itself on after being energized by the Start tag.\\nIt will remain on until the circuit is broken by the Stop tag."}],"t":[{"n":"Start","t":"b","v":false},{"n":"Stop","t":"b","v":false},{"n":"Motor","t":"b","v":false}]}';

    expect(compressedState).toEqual(expected);
  });
});
