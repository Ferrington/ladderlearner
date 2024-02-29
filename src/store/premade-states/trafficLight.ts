import { ExampleState } from '@/types';

export const state: ExampleState = {
  routine: {
    rungs: {
      byId: {
        runghHweGtye4vNAg2cxNv7q1: {
          id: 'runghHweGtye4vNAg2cxNv7q1',
          type: 'Rung',
          child: 'branchdQMpwlu4biMhos6wbTRGt',
          comment:
            'Once the .dn (done) bit becomes true, the state tag is changed to move to the next step of the process.\nThe use of a state tag makes it easy to move between steps and insert new steps in the future.',
        },
        rungleZKJJRy5zf3OQ2ut2T5D: {
          id: 'rungleZKJJRy5zf3OQ2ut2T5D',
          type: 'Rung',
          child: 'branchyAc19Kvs5REdatdnwPNK4',
          comment:
            'This rung controls outputs in the physical world. All others are internal.\nThe lights turn on when their respective .tt (timer timing) bit is true.',
        },
        'rungACYxuhbRgigcz-O9yRPk7': {
          id: 'rungACYxuhbRgigcz-O9yRPk7',
          type: 'Rung',
          child: 'branchEmt5FneuuIC2dVb1R92xC',
        },
        rungtdau4zSgOqKXsNQll0bQj: {
          id: 'rungtdau4zSgOqKXsNQll0bQj',
          type: 'Rung',
          child: 'branch75hNQ-Z4fLHN9f6jDJq4Q',
        },
      },
      allIds: [
        'rungleZKJJRy5zf3OQ2ut2T5D',
        'runghHweGtye4vNAg2cxNv7q1',
        'rungACYxuhbRgigcz-O9yRPk7',
        'rungtdau4zSgOqKXsNQll0bQj',
      ],
    },
    branches: {
      branchdQMpwlu4biMhos6wbTRGt: {
        id: 'branchdQMpwlu4biMhos6wbTRGt',
        type: 'AND',
        parent: 'runghHweGtye4vNAg2cxNv7q1',
        children: ['instructionGOrBXuvCS0jXofyan_ODG', 'branchyG17oy-GQT7xqaHZgXB52'],
      },
      branchyAc19Kvs5REdatdnwPNK4: {
        id: 'branchyAc19Kvs5REdatdnwPNK4',
        type: 'AND',
        parent: 'rungleZKJJRy5zf3OQ2ut2T5D',
        children: ['branchxGnN3ivANc9OjjDuMsxza'],
      },
      branchxGnN3ivANc9OjjDuMsxza: {
        id: 'branchxGnN3ivANc9OjjDuMsxza',
        type: 'OR',
        parent: 'branchyAc19Kvs5REdatdnwPNK4',
        children: [
          'branch81ZpaF5-N766c7W8WfbMR',
          'branchprbBJmwcwcnh8X5Vd45ZV',
          'branchECBadh8jirlkJw2rcLW6r',
        ],
      },
      'branch81ZpaF5-N766c7W8WfbMR': {
        id: 'branch81ZpaF5-N766c7W8WfbMR',
        type: 'AND',
        parent: 'branchxGnN3ivANc9OjjDuMsxza',
        children: ['instructionsOb5hypK3IIf29aA7E3XR', 'instructionn2Qeul7xA-6rIz2FGwTKJ'],
      },
      branchprbBJmwcwcnh8X5Vd45ZV: {
        id: 'branchprbBJmwcwcnh8X5Vd45ZV',
        type: 'AND',
        parent: 'branchxGnN3ivANc9OjjDuMsxza',
        children: ['instructionQR_Z7qBrUxl1CQxZcrueX', 'instruction5kx4LGfdIAtaWa4-8El01'],
      },
      branchECBadh8jirlkJw2rcLW6r: {
        id: 'branchECBadh8jirlkJw2rcLW6r',
        type: 'AND',
        parent: 'branchxGnN3ivANc9OjjDuMsxza',
        children: ['instruction6SMepZNE-JgTcftb5GiVF', 'instructionRSB7ll8ZzQ7BOlLiqudn7'],
      },
      branchEmt5FneuuIC2dVb1R92xC: {
        id: 'branchEmt5FneuuIC2dVb1R92xC',
        type: 'AND',
        parent: 'rungACYxuhbRgigcz-O9yRPk7',
        children: ['instructiond4n6PRZyaA7ctK9b2VUD4', 'branch30IufgjAxsF47V8NkX02i'],
      },
      'branchyG17oy-GQT7xqaHZgXB52': {
        id: 'branchyG17oy-GQT7xqaHZgXB52',
        type: 'OR',
        parent: 'branchdQMpwlu4biMhos6wbTRGt',
        children: ['branchmny_-HJ1xB74K4WUgT2Z1', 'branchdY05qC-BuBEoUFJe2mkKm'],
      },
      'branchmny_-HJ1xB74K4WUgT2Z1': {
        id: 'branchmny_-HJ1xB74K4WUgT2Z1',
        type: 'AND',
        parent: 'branchyG17oy-GQT7xqaHZgXB52',
        children: ['instruction49AF-_1ZmX1ae12xm3kHp'],
      },
      'branchdY05qC-BuBEoUFJe2mkKm': {
        id: 'branchdY05qC-BuBEoUFJe2mkKm',
        type: 'AND',
        parent: 'branchyG17oy-GQT7xqaHZgXB52',
        children: ['instructionMjyoseXlgmVMA9WPlVdY2', 'instruction3ngmfL-oyM80aphs83xcF'],
      },
      branch30IufgjAxsF47V8NkX02i: {
        id: 'branch30IufgjAxsF47V8NkX02i',
        type: 'OR',
        parent: 'branchEmt5FneuuIC2dVb1R92xC',
        children: ['branchIAs2rCuSRL9gHWEr-HfCI', 'branchDsmj80FwSLCJKnNPKIKEi'],
      },
      'branchIAs2rCuSRL9gHWEr-HfCI': {
        id: 'branchIAs2rCuSRL9gHWEr-HfCI',
        type: 'AND',
        parent: 'branch30IufgjAxsF47V8NkX02i',
        children: ['instructionzPmfB5faVsvxRnzSKqoAX'],
      },
      branchDsmj80FwSLCJKnNPKIKEi: {
        id: 'branchDsmj80FwSLCJKnNPKIKEi',
        type: 'AND',
        parent: 'branch30IufgjAxsF47V8NkX02i',
        children: ['instructionuOZJg3icr_Vhefa4sHF3N', 'instructionCn-_WAE6CWTbeXhWuNHxK'],
      },
      'branch75hNQ-Z4fLHN9f6jDJq4Q': {
        id: 'branch75hNQ-Z4fLHN9f6jDJq4Q',
        type: 'AND',
        parent: 'rungtdau4zSgOqKXsNQll0bQj',
        children: ['instructiongdNvNuZbjNZzofFGwr8pH', 'branchrH3Irfw4Jb_24nr9rSDHo'],
      },
      branchrH3Irfw4Jb_24nr9rSDHo: {
        id: 'branchrH3Irfw4Jb_24nr9rSDHo',
        type: 'OR',
        parent: 'branch75hNQ-Z4fLHN9f6jDJq4Q',
        children: ['branchCvdeuJOWLa7N2_JP2eHw4', 'branchppuex6in54EBBze286ax4'],
      },
      branchCvdeuJOWLa7N2_JP2eHw4: {
        id: 'branchCvdeuJOWLa7N2_JP2eHw4',
        type: 'AND',
        parent: 'branchrH3Irfw4Jb_24nr9rSDHo',
        children: ['instructiontIoZziP2XG2aTRMv4vN7n'],
      },
      branchppuex6in54EBBze286ax4: {
        id: 'branchppuex6in54EBBze286ax4',
        type: 'AND',
        parent: 'branchrH3Irfw4Jb_24nr9rSDHo',
        children: ['instructionpzcFlnyVaDQRabGxCLw1C', 'instructionuurT5t97-P6qsE7pBoGAt'],
      },
    },
    instructions: {
      'instructionn2Qeul7xA-6rIz2FGwTKJ': {
        id: 'instructionn2Qeul7xA-6rIz2FGwTKJ',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'OTE',
        tag: 'Green_Light',
        parent: 'branch81ZpaF5-N766c7W8WfbMR',
        isDestructive: true,
        energized: false,
      },
      'instruction6SMepZNE-JgTcftb5GiVF': {
        id: 'instruction6SMepZNE-JgTcftb5GiVF',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Red_Timer.tt',
        parent: 'branchECBadh8jirlkJw2rcLW6r',
        isDestructive: false,
        energized: true,
      },
      'instruction5kx4LGfdIAtaWa4-8El01': {
        id: 'instruction5kx4LGfdIAtaWa4-8El01',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'OTE',
        tag: 'Yellow_Light',
        parent: 'branchprbBJmwcwcnh8X5Vd45ZV',
        isDestructive: true,
        energized: false,
      },
      instructionRSB7ll8ZzQ7BOlLiqudn7: {
        id: 'instructionRSB7ll8ZzQ7BOlLiqudn7',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'OTE',
        tag: 'Red_Light',
        parent: 'branchECBadh8jirlkJw2rcLW6r',
        isDestructive: true,
        energized: true,
      },
      instructionGOrBXuvCS0jXofyan_ODG: {
        id: 'instructionGOrBXuvCS0jXofyan_ODG',
        type: 'Instruction',
        name: 'A == B',
        description: 'Equal',
        displayType: 'Box',
        abbreviated: 'EQU',
        parameters: {
          A: { key: 'A', value: 'State', type: 'number' },
          B: { key: 'B', value: 1, type: 'number' },
        },
        parent: 'branchdQMpwlu4biMhos6wbTRGt',
        isDestructive: false,
        energized: false,
      },
      'instruction49AF-_1ZmX1ae12xm3kHp': {
        id: 'instruction49AF-_1ZmX1ae12xm3kHp',
        type: 'Instruction',
        name: 'Timer On Delay',
        description: '',
        displayType: 'Box',
        abbreviated: 'TON',
        parameters: {
          Timer: { key: 'Timer', value: 'Green_Timer', type: 'timer' },
          pre: { key: 'pre', value: 7, type: 'number' },
          acc: { key: 'acc', value: 0, type: 'number' },
          dn: { key: 'dn', value: false, type: 'bool', hidden: true },
          tt: { key: 'tt', value: false, type: 'bool', hidden: true },
          startTime: {
            key: 'startTime',
            value: 1689879303668,
            type: 'number',
            hidden: true,
          },
        },
        parent: 'branchmny_-HJ1xB74K4WUgT2Z1',
        isDestructive: true,
        energized: false,
      },
      instructionMjyoseXlgmVMA9WPlVdY2: {
        id: 'instructionMjyoseXlgmVMA9WPlVdY2',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Green_Timer.dn',
        parent: 'branchdY05qC-BuBEoUFJe2mkKm',
        isDestructive: false,
        energized: false,
      },
      'instruction3ngmfL-oyM80aphs83xcF': {
        id: 'instruction3ngmfL-oyM80aphs83xcF',
        type: 'Instruction',
        name: 'Move',
        description: 'A -> B',
        displayType: 'Box',
        abbreviated: 'MOV',
        parameters: {
          A: { key: 'A', value: 2, type: 'number' },
          B: { key: 'B', value: 'State', type: 'number' },
        },
        parent: 'branchdY05qC-BuBEoUFJe2mkKm',
        isDestructive: true,
        energized: false,
      },
      instructiond4n6PRZyaA7ctK9b2VUD4: {
        id: 'instructiond4n6PRZyaA7ctK9b2VUD4',
        type: 'Instruction',
        name: 'A == B',
        description: 'Equal',
        displayType: 'Box',
        abbreviated: 'EQU',
        parameters: {
          A: { key: 'A', value: 'State', type: 'number' },
          B: { key: 'B', value: 2, type: 'number' },
        },
        parent: 'branchEmt5FneuuIC2dVb1R92xC',
        isDestructive: false,
        energized: false,
      },
      instructionzPmfB5faVsvxRnzSKqoAX: {
        id: 'instructionzPmfB5faVsvxRnzSKqoAX',
        type: 'Instruction',
        name: 'Timer On Delay',
        description: '',
        displayType: 'Box',
        abbreviated: 'TON',
        parameters: {
          Timer: { key: 'Timer', value: 'Yellow_Timer', type: 'timer' },
          pre: { key: 'pre', value: 3, type: 'number' },
          acc: { key: 'acc', value: 0, type: 'number' },
          dn: { key: 'dn', value: false, type: 'bool', hidden: true },
          tt: { key: 'tt', value: false, type: 'bool', hidden: true },
          startTime: {
            key: 'startTime',
            value: 1689879311808,
            type: 'number',
            hidden: true,
          },
        },
        parent: 'branchIAs2rCuSRL9gHWEr-HfCI',
        isDestructive: true,
        energized: false,
      },
      instructionuOZJg3icr_Vhefa4sHF3N: {
        id: 'instructionuOZJg3icr_Vhefa4sHF3N',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Yellow_Timer.dn',
        parent: 'branchDsmj80FwSLCJKnNPKIKEi',
        isDestructive: false,
        energized: false,
      },
      'instructionCn-_WAE6CWTbeXhWuNHxK': {
        id: 'instructionCn-_WAE6CWTbeXhWuNHxK',
        type: 'Instruction',
        name: 'Move',
        description: 'A -> B',
        displayType: 'Box',
        abbreviated: 'MOV',
        parameters: {
          A: { key: 'A', value: 3, type: 'number' },
          B: { key: 'B', value: 'State', type: 'number' },
        },
        parent: 'branchDsmj80FwSLCJKnNPKIKEi',
        isDestructive: true,
        energized: false,
      },
      instructiongdNvNuZbjNZzofFGwr8pH: {
        id: 'instructiongdNvNuZbjNZzofFGwr8pH',
        type: 'Instruction',
        name: 'A == B',
        description: 'Equal',
        displayType: 'Box',
        abbreviated: 'EQU',
        parameters: {
          A: { key: 'A', value: 'State', type: 'number' },
          B: { key: 'B', value: 3, type: 'number' },
        },
        parent: 'branch75hNQ-Z4fLHN9f6jDJq4Q',
        isDestructive: false,
        energized: true,
      },
      instructiontIoZziP2XG2aTRMv4vN7n: {
        id: 'instructiontIoZziP2XG2aTRMv4vN7n',
        type: 'Instruction',
        name: 'Timer On Delay',
        description: '',
        displayType: 'Box',
        abbreviated: 'TON',
        parameters: {
          Timer: { key: 'Timer', value: 'Red_Timer', type: 'timer' },
          pre: { key: 'pre', value: 10, type: 'number' },
          acc: { key: 'acc', value: 0, type: 'number' },
          dn: { key: 'dn', value: false, type: 'bool', hidden: true },
          tt: { key: 'tt', value: true, type: 'bool', hidden: true },
          startTime: {
            key: 'startTime',
            value: 1689879315858,
            type: 'number',
            hidden: true,
          },
        },
        parent: 'branchCvdeuJOWLa7N2_JP2eHw4',
        isDestructive: true,
        energized: true,
      },
      'instructionuurT5t97-P6qsE7pBoGAt': {
        id: 'instructionuurT5t97-P6qsE7pBoGAt',
        type: 'Instruction',
        name: 'Move',
        description: 'A -> B',
        displayType: 'Box',
        abbreviated: 'MOV',
        parameters: {
          A: { key: 'A', value: 1, type: 'number' },
          B: { key: 'B', value: 'State', type: 'number' },
        },
        parent: 'branchppuex6in54EBBze286ax4',
        isDestructive: true,
        energized: false,
      },
      instructionpzcFlnyVaDQRabGxCLw1C: {
        id: 'instructionpzcFlnyVaDQRabGxCLw1C',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Red_Timer.dn',
        parent: 'branchppuex6in54EBBze286ax4',
        isDestructive: false,
        energized: false,
      },
      instructionsOb5hypK3IIf29aA7E3XR: {
        id: 'instructionsOb5hypK3IIf29aA7E3XR',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Green_Timer.tt',
        parent: 'branch81ZpaF5-N766c7W8WfbMR',
        isDestructive: false,
        energized: false,
      },
      instructionQR_Z7qBrUxl1CQxZcrueX: {
        id: 'instructionQR_Z7qBrUxl1CQxZcrueX',
        type: 'Instruction',
        displayType: 'Special',
        abbreviated: 'XIC',
        tag: 'Yellow_Timer.tt',
        parent: 'branchprbBJmwcwcnh8X5Vd45ZV',
        isDestructive: false,
        energized: false,
      },
    },
  },
  tags: {
    byId: {
      Green_Light: { name: 'Green_Light', type: 'bool', value: false },
      Yellow_Light: { name: 'Yellow_Light', type: 'bool', value: false },
      Red_Light: { name: 'Red_Light', type: 'bool', value: true },
      Green_Timer: {
        name: 'Green_Timer',
        type: 'timer',
        value: {
          pre: 7,
          acc: 0,
          dn: false,
          tt: false,
          startTime: 1689879303668,
        },
      },
      Yellow_Timer: {
        name: 'Yellow_Timer',
        type: 'timer',
        value: {
          pre: 3,
          acc: 0,
          dn: false,
          tt: false,
          startTime: 1689879311808,
        },
      },
      Red_Timer: {
        name: 'Red_Timer',
        type: 'timer',
        value: {
          pre: 10,
          acc: 0,
          dn: false,
          tt: true,
          startTime: 1689879315858,
        },
      },
      State: { name: 'State', type: 'number', value: 1 },
    },
    allIds: [
      'Green_Light',
      'Yellow_Light',
      'Red_Light',
      'Green_Timer',
      'Yellow_Timer',
      'Red_Timer',
      'State',
    ],
  },
};
