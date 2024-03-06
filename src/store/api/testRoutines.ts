export type FakeRoutines = {
  id: number;
  name: string;
  stateStr: string;
}[];

export const routines: FakeRoutines = [
  {
    id: 1,
    name: 'Motor',
    stateStr:
      '{"r":[{"r":"<XIO(B)![<XIC(A)>|<XIC(C)>]!OTE(C)>","c":"The Motor seals itself on after being energized by the Start tag.\\nIt will remain on until the circuit is broken by the Stop tag."}],"t":[{"n":"Start","t":"b","v":false},{"n":"Stop","t":"b","v":false},{"n":"Motor","t":"b","v":false}]}',
  },
  {
    id: 2,
    name: 'Traffic Light',
    stateStr:
      '{"r":[{"r":"<[<XIC(D.tt)!OTE(A)>|<XIC(E.tt)!OTE(B)>|<XIC(F.tt)!OTE(C)>]>","c":"This rung controls outputs in the physical world. All others are internal.\\nThe lights turn on when their respective .tt (timer timing) bit is true."},{"r":"<EQU(G,1)![<TON(D,7,0)>|<XIC(D.dn)!MOV(2,G)>]>","c":"Once the .dn (done) bit becomes true, the state tag is changed to move to the next step of the process.\\nThe use of a state tag makes it easy to move between steps and insert new steps in the future."},{"r":"<EQU(G,2)![<TON(E,3,0)>|<XIC(E.dn)!MOV(3,G)>]>"},{"r":"<EQU(G,3)![<TON(F,10,0)>|<XIC(F.dn)!MOV(1,G)>]>"}],"t":[{"n":"Green_Light","t":"b","v":false},{"n":"Yellow_Light","t":"b","v":false},{"n":"Red_Light","t":"b","v":true},{"n":"Green_Timer","t":"t","v":{"p":7,"a":0,"d":false,"t":false,"s":0}},{"n":"Yellow_Timer","t":"t","v":{"p":3,"a":0,"d":false,"t":false,"s":0}},{"n":"Red_Timer","t":"t","v":{"p":10,"a":0,"d":false,"t":true,"s":0}},{"n":"State","t":"n","v":1}]}',
  },
];
