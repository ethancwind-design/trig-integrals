/* Lectures 32 & 33 · Part D: problems 23-26 (two-part regions), intro, LESSON() */

examples.push(twoSideGen({ n: 23, m: 3, a: 2, b: 1, type: 'Two-part region, odd power', problem: r`y=x^3,\;x=-2,\;x=1\text{; about the }y\text{-axis}`,
  xr: [-2.9, 1.9], yr: [-9.6, 2.7], labAt: [-2.85, -7.2] }));
examples.push(twoSideGen({ n: 24, m: 5, a: 1, b: 2, type: 'Two-part region, odd power', problem: r`y=x^5,\;x=-1,\;x=2\text{; about the }y\text{-axis}`,
  xr: [-1.9, 2.9], yr: [-4.8, 37], labAt: [-1.85, -3.0],
  warn: r`The posted solution writes the second integral as $2\pi x(1-x^3)$. For $y=x^5$ the cap is $1-x^5$, which is what the rest of the solution needs.` }));
examples.push(twoSideGen({ n: 25, m: 5, a: 2, b: 1, type: 'Two-part region, odd power', problem: r`y=x^5,\;x=-2,\;x=1\text{; about the }y\text{-axis}`,
  xr: [-2.9, 1.9], yr: [-37, 4.8], labAt: [-2.85, -29] }));
examples.push(twoSideGen({ n: 26, m: 3, a: 1, b: 2, type: 'Two-part region, odd power', problem: r`y=x^3,\;x=-1,\;x=2\text{; about the }y\text{-axis}`,
  xr: [-1.9, 2.9], yr: [-2.7, 9.8], labAt: [-1.85, -2.0] }));

/* ===== intro ===== */
const xsDisk = xsDiagram('disk', 'int-disk'), xsWasher = xsDiagram('washer', 'int-washer'), xsShell = xsDiagram('shell', 'int-shell');
const ids = s => s.layers.map(l => l.id);
const introL32 = [
  { id: 'title', label: 'Title', head: { eb: 'MATH 1400 · Lectures 32 & 33', prob: null }, layout: 'full', tag: '',
    say: r`Twenty-six solids of revolution, each as its own lesson: disks, washers and shells. Press → or click to begin.`,
    main: [R('eyebrow', H('t1', 'Practice problems · Lectures 32 & 33')), R('display', H('t2', 'Volumes of Revolution', 'ink')),
      R('lead', H('t3', 'Sketch the region, draw one slice, rotate it, add up the slices.')),
      R('chips', H('c1', '<b>1, 4, 6–11</b>Washers and disks', 'ink', { cls: 'chip' }), H('c2', '<b>2, 3, 5, 12–22</b>Shells', 'ink', { cls: 'chip' }), H('c3', '<b>23–26</b>Two-part regions', 'ink', { cls: 'chip' })),
      R('sample', T('s1', r`V=\int\pi\big(R^2-r^2\big)\,dx`, 'ct'), T('s2', r`\;\text{or}\;`, 'muted'), T('s3', r`\int2\pi\,r\,h\,dx`, 'cx'))], side: [] },
  { id: 'rule', label: 'Choosing a method', head: { eb: 'The rule', prob: null }, layout: 'full', tag: '',
    say: r`Look at one thin slice of the region and the axis. If the slice is perpendicular to the axis, rotating it makes a disk or washer. If it is parallel to the axis, rotating it makes a shell.`,
    main: [R('cols',
      ST([H('m1h', 'Slice ⟂ axis, touching it', 'muted', { cls: 'eyebrow' })], [PLOT('m1p', xsDisk, ids(xsDisk), { size: 'xs' })], [T('m1a', r`dV=\pi R^2\,dx`, 'cx')]),
      ST([H('m2h', 'Slice ⟂ axis, with a gap', 'muted', { cls: 'eyebrow' })], [PLOT('m2p', xsWasher, ids(xsWasher), { size: 'xs' })], [T('m2a', r`dV=\pi(R^2-r^2)\,dx`, 'cx')]),
      ST([H('m3h', 'Slice ∥ axis', 'muted', { cls: 'eyebrow' })], [PLOT('m3p', xsShell, ids(xsShell), { size: 'xs' })], [T('m3a', r`dV=2\pi\,r\,h\,dx`, 'cx')]))], side: [] },
  { id: 'map', label: 'The twenty-six problems', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Problems 1, 4 and 6 to 11 use washers or disks. Problems 2, 3, 5 and 12 to 22 use shells. Problems 23 to 26 ask only for the integral expression of a two-part region.`,
    main: [R('cols',
      ST([H('p1h', 'Washers and disks', 'muted', { cls: 'eyebrow' })], [T('p1a', r`y=\sqrt{1-x^2},\;y=\sqrt{\tfrac x2}(1-x)`, 'ct')], [T('p1b', r`y=x^2+2x,\;y=-x^2+2x`, 'ct')], [T('p1c', r`y=x\sqrt x\text{ about }y=-1`, 'ct')], [T('p1d', r`x=y\sqrt y\text{ about }x=-1`, 'ct')]),
      ST([H('p2h', 'Shells', 'muted', { cls: 'eyebrow' })], [T('p2a', r`y=(1-x^2)^{k/2}\text{, }k=1,3,\dots,9`, 'cx')], [T('p2b', r`y=e^{(x+1)^2}\text{ about }x=-1`, 'cx')], [T('p2c', r`x=y^3,\;x=y^4\text{ about }y=-1`, 'cx')], [T('p2d', r`y=(x-2)^2\text{ about the }y\text{-axis}`, 'cx')]),
      ST([H('p3h', 'Two-part regions', 'muted', { cls: 'eyebrow' })], [T('p3a', r`y=x^3,\;-2\le x\le1`, 'cd')], [T('p3b', r`y=x^5,\;-1\le x\le2`, 'cd')], [H('p3n', 'write the integral only', 'muted', { cls: 'mini' })]))], side: [] },
];

examples.sort((a, b) => a.n - b.n);
LESSON({ key: 'l32', title: 'Lectures 32 & 33 · in Motion', intro: introL32, examples });
