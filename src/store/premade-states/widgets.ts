export const stateStr = JSON.stringify({
  r: [
    {
      r: '<XIO(D.tt)!OTE(A)>',
      c: 'A conveyor carries widgets to a robotic arm which will pack them into a box.\nThe conveyor stops when the robotic arm is moving a box of widgets.',
    },
    {
      r: '<XIO(B.dn)!XIC(A)!TON(B,2,0)>',
      c: 'A new widget arrives at the end of the conveyor every 2 seconds.',
    },
    { r: '<XIC(B.dn)!CTU(C,5,0)>' },
    {
      r: '<XIC(C.dn)![<TON(D,3,0)>|<XIC(D.dn)!MOV(0,C.acc)>]>',
      c: 'Once 5 widgets have been packed, the robotic arm needs to move the box.\nThis resets the widget count.',
    },
    {
      r: '<XIC(D.dn)!ONS(null)!ADD(E,1,E)>',
      c: 'The number of boxes produced is stored.\nAn add instruction is used instead of a counter because there is no target number of boxes.',
    },
  ],
  t: [
    { n: 'Conveyor', t: 'b', v: true },
    { n: 'Widget', t: 't', v: { p: 2, a: 0, d: false, t: true, s: 0 } },
    { n: 'Widgets_Produced', t: 'c', v: { p: 5, a: 0, d: false } },
    { n: 'Robotic_Arm', t: 't', v: { p: 3, a: 0, d: false, t: false, s: 0 } },
    { n: 'Boxes_of_Widgets', t: 'n', v: 0 },
  ],
});
