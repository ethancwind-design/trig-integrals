/* Lectures 32 & 33 · Part C: problems 12-22 (shells about the y-axis, shifted shell axes, shell vs disk check) */

/* ===== Problems 12-16 : the family y = (1 - x^2)^(k/2) about the y-axis ===== */
function shellFamily(n, k) {
  const pw = k / 2, f = x => Math.pow(1 - x * x, pw);
  const hTex = k === 1 ? r`\sqrt{1-x^2}` : `(1-x^2)^{${k}/2}`;
  const uTex = k === 1 ? r`\sqrt u` : `u^{${k}/2}`;
  const anti = `\\tfrac{2}{${k + 2}}u^{${k + 2}/2}`;
  const sub = [eyebrow('eb9', 'Substitution'), R('side', T('u1', r`u=1-x^2`, 'cx')), R('side', T('u2', r`du=-2x\,dx`, 'cd')), R('side', T('u3', r`x\,dx=-\tfrac12\,du`, 'cd')), R('side', T('u4', r`x:0\to1\Rightarrow u:1\to0`, 'ink'))];
  return volGen({ n, type: `Shells, exponent ${k}/2`, verb: 'Volume', method: 'shell',
    problem: `y=${hTex},\\;y=0,\\;x\\ge0\\text{; about the }y\\text{-axis}`,
    plot: { xr: [-0.3, 1.5], yr: [-0.22, 1.32], xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']], w: 640, h: 400 },
    curves: [{ f, dom: [0, 1], n: 200, color: 'cx', eq: `y=${hTex}`, text: k === 1 ? 'y = √(1−x²)' : `y = (1−x²)^${k}/2`, at: [0.62, f(0.62)], dx: 12, dy: -12, say: `Sketch. In the first quadrant, $y=${hTex}$ starts at $(0,1)$ and falls to $(1,0)$.${k === 1 ? ' It is the quarter of the unit circle.' : ' The larger the exponent, the faster it falls.'}` }],
    points: [pt(0, 1, '(0, 1)', 12, 8), pt(1, 0, '(1, 0)', 6, 26), pt(0, 0, '(0, 0)', 10, 24)],
    pointsSay: r`The curve starts at $(0,1)$ on the $y$-axis and ends at $(1,0)$ on the $x$-axis.`,
    region: { top: f, bot: x => 0, range: [0, 1] },
    regionSay: r`The region is the area under the curve in the first quadrant: bounded by the curve, the $x$-axis and the $y$-axis.`,
    axis: { kind: 'v', at: 0, text: 'axis x = 0', dx: 8, dy: 18, tex: r`x=0\;(\text{the }y\text{-axis})` },
    axisSay: r`Rotate about the $y$-axis. It is the left edge of the region itself.`,
    slice: { at: 0.5, w: 0.035, text: 'dx', tx: 0.52, ty: f(0.5) + 0.09, anchor: 'middle' },
    radii: [{ from: [0, f(0.5) * 0.45], to: [0.49, f(0.5) * 0.45], color: 'cd', text: 'r', dx: 0, dy: -10 }, { from: [0.6, 0], to: [0.6, f(0.6)], color: 'cp', text: 'h', dx: 8, dy: 0 }],
    sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the $x$-axis up to the curve.`,
    methodSay: r`The strip is parallel to the vertical axis. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell. Disks would need us to solve for $x$, which is messy.`,
    xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
    radSteps: [
      { say: r`The axis is the $y$-axis ($x=0$), so the radius is just the strip's $x$-coordinate.`, show: ['rad0'], rows: [r`r=x`], cols: ['cd'] },
      { say: r`The height is the distance from the $x$-axis up to the curve.`, show: ['rad1'], rows: [`h=${hTex}`], cols: ['cp'] }],
    dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference, times height, times thickness.`,
    dV: [r`dV=2\pi\,r\,h\,dx`, `=2\\pi x${hTex}\\,dx`],
    integral: `V=2\\pi\\int_0^1x${hTex}\\,dx`,
    integralSay: r`Add up the shells from $x=0$ to $x=1$, where the curve meets the $x$-axis.`,
    evalSteps: [
      { say: r`Substitute $u=1-x^2$. Then $du=-2x\,dx$, so $x\,dx=-\tfrac12du$. The limits flip: $x=0\to u=1$ and $x=1\to u=0$.`, rows: [`=2\\pi\\int_{u=1}^{u=0}${uTex}\\Big(-\\tfrac12\\,du\\Big)`], side: sub },
      { say: r`Flip the limits to absorb the minus sign, and combine $2\pi\cdot\tfrac12=\pi$.`, rows: [`=\\pi\\int_0^1${uTex}\\,du`], side: sub },
      { say: `Add one to the exponent: $\\int u^{${k}/2}du=\\tfrac{2}{${k + 2}}u^{${k + 2}/2}$.`, rows: [`=\\pi\\Big[${anti}\\Big]_0^1`], side: sub },
      { say: `Plug in $u=1$; the lower limit gives 0.`, rows: [`=\\tfrac{2\\pi}{${k + 2}}`], boxed: true, side: sub }],
    answer: `\\tfrac{2\\pi}{${k + 2}}`, track: [r`\text{shells about the }y\text{-axis}`, `2\\pi\\int_0^1x${hTex}\\,dx`, `\\tfrac{2\\pi}{${k + 2}}`],
    verify: [{ value: { f: x => 2 * Math.PI * x * f(x), a: 0, b: 1, val: 2 * Math.PI / (k + 2), n: 80000, tol: 1e-6 } }],
    heli1: [ln(r`\text{about the }y\text{-axis}`, 'ct')], heli3: [ln(`\\pi\\Big[${anti}\\Big]_0^1`)] });
}
[1, 3, 5, 7, 9].forEach((k, i) => examples.push(shellFamily(12 + i, k)));

/* ===== Problem 17 : shells about x = -1, exponential ===== */
examples.push(volGen({ n: 17, type: 'Shells about x = −1', verb: 'Volume', method: 'shell',
  problem: r`y=e^{(x+1)^2},\;y=e,\;x=0,\;x=1\text{; about }x=-1`,
  plot: { xr: [-1.75, 1.7], yr: [-5, 62], xt: [-1, 1], yt: [10, 20, 30, 40, 50], w: 640, h: 440 },
  curves: [
    { f: x => Math.exp((x + 1) * (x + 1)), dom: [-0.05, 1.02], n: 200, color: 'cx', eq: r`y=e^{(x+1)^2}`, text: 'y = e^((x+1)²)', at: [-0.3, 57], dx: 0, dy: 0, say: r`Sketch. The upper boundary $y=e^{(x+1)^2}$ climbs steeply: it equals $e$ at $x=0$ and $e^4\approx54.6$ at $x=1$.` },
    { f: x => Math.E, dom: [0, 1], color: 'cd', eq: r`y=e`, text: 'y = e', at: [0.05, Math.E], dx: 0, dy: 24, say: r`The lower boundary is the horizontal line $y=e\approx2.72$.` },
    { f: y => 1, dom: [Math.E, Math.exp(4)], orient: 'x', color: 'ca', eq: r`x=1`, say: r`The right boundary is the vertical line $x=1$. On the left, $x=0$ is exactly where the curve meets $y=e$.` }],
  points: [pt(0, Math.E, '(0, e)', -10, 4, 'end'), pt(1, Math.E, '(1, e)', 10, 24), pt(1, Math.exp(4), '(1, e⁴)', 10, 6)],
  pointsSay: r`The corners: $(0,e)$, $(1,e)$ and $(1,e^4)$.`,
  region: { top: x => Math.exp((x + 1) * (x + 1)), bot: x => Math.E, range: [0, 1] },
  regionSay: r`The region is the tall sliver between the line $y=e$ and the curve, from $x=0$ to $x=1$.`,
  axis: { kind: 'v', at: -1, text: 'axis x = −1', dx: 8, dy: 18, tex: r`x=-1` },
  axisSay: r`Rotate about the vertical line $x=-1$, to the left of the region.`,
  slice: { at: 0.7, w: 0.03, text: 'dx', tx: 0.72, ty: 22, anchor: 'middle' },
  radii: [
    { from: [-1, 9], to: [0.69, 9], color: 'cd', text: 'r', dx: 0, dy: -12 },
    { from: [0.58, Math.E + 0.2], to: [0.58, Math.exp(2.4964) - 0.2], color: 'cp', text: 'h', dx: -22, dy: 4 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the line $y=e$ up to the curve.`,
  methodSay: r`The strip is parallel to the vertical axis $x=-1$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
  radSteps: [
    { say: r`The strip is to the right of the axis $x=-1$, so the radius is $r=x-(-1)=x+1$.`, show: ['rad0'], rows: [r`r=x-(-1)=x+1`], cols: ['cd'] },
    { say: r`The height is top minus bottom: the curve minus the line $y=e$.`, show: ['rad1'], rows: [r`h=e^{(x+1)^2}-e`], cols: ['cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference, times height, times thickness.`,
  dV: [r`r\,h=(x+1)\big(e^{(x+1)^2}-e\big)`, r`dV=2\pi\,r\,h\,dx`],
  integral: r`V=2\pi\int_0^1(x+1)\big(e^{(x+1)^2}-e\big)\,dx`,
  integralSay: r`Add up the shells from $x=0$ to $x=1$.`,
  evalSteps: [
    { say: r`Distribute $(x+1)$ and split into two integrals. The first needs a substitution; the second is a simple power.`, rows: [r`=2\pi\int_0^1(x+1)e^{(x+1)^2}dx-2\pi e\int_0^1(x+1)\,dx`],
      side: [eyebrow('eb9', 'Substitution'), R('side', T('u1', r`u=(x+1)^2`, 'cx')), R('side', T('u2', r`du=2(x+1)\,dx`, 'cd')), R('side', T('u3', r`(x+1)\,dx=\tfrac12\,du`, 'cd'))] },
    { say: r`Antiderivatives: $\int(x+1)e^{(x+1)^2}dx=\tfrac12e^{(x+1)^2}$ and $\int(x+1)\,dx=\tfrac{(x+1)^2}{2}$.`, rows: [r`=2\pi\Big[\tfrac12e^{(x+1)^2}\Big]_0^1-2\pi e\Big[\tfrac{(x+1)^2}{2}\Big]_0^1`] },
    { say: r`Plug in: $(1+1)^2=4$ and $(0+1)^2=1$.`, rows: [r`=\pi\big(e^{4}-e^{1}\big)-\pi e\,(4-1)`] },
    { say: r`Combine: $e^4-e-3e=e^4-4e$.`, rows: [r`=\pi\big(e^4-4e\big)=\pi e\,(e^3-4)\approx137.4`], boxed: true }],
  answer: r`\pi e\,(e^3-4)`, track: [r`\text{shells about }x=-1`, r`2\pi\int_0^1(x+1)(e^{(x+1)^2}-e)\,dx`, r`\pi e\,(e^3-4)`],
  verify: [{ value: { f: x => 2 * Math.PI * (x + 1) * (Math.exp((x + 1) * (x + 1)) - Math.E), a: 0, b: 1, val: Math.PI * (Math.E ** 4 - 4 * Math.E), tol: 1e-6 } }],
  heli1: [ln(r`\text{about }x=-1`, 'ct')], heli3: [ln(r`\pi\big(e^4-e\big)-3\pi e`)] }));

/* ===== Problem 18 : shells about x = -5 ===== */
examples.push(volGen({ n: 18, type: 'Shells about x = −5', verb: 'Volume', method: 'shell',
  problem: r`y=\cos\big((x+5)^2\big),\;y=0,\;x=-5,\;x=-4\text{; about }x=-5`,
  plot: { xr: [-5.75, -3.45], yr: [-0.3, 1.35], xt: [[-5, '−5'], [-4, '−4']], yt: [[0.5, '½'], [1, '1']], w: 640, h: 400 },
  curves: [
    { f: x => Math.cos((x + 5) * (x + 5)), dom: [-5, -3.9], color: 'cx', eq: r`y=\cos\big((x+5)^2\big)`, text: 'y = cos((x+5)²)', at: [-4.75, 1.1], dx: 0, dy: -6, say: r`Sketch. The upper boundary $y=\cos\big((x+5)^2\big)$ is a cosine of a squared shifted variable. At $x=-5$ it equals 1, and it dips slowly to $\cos1\approx0.54$ at $x=-4$.` },
    { f: x => 0, dom: [-5, -4], color: 'cd', eq: r`y=0`, say: r`The lower boundary is the $x$-axis, $y=0$.` },
    { f: y => -4, dom: [0, Math.cos(1)], orient: 'x', color: 'ca', eq: r`x=-4`, say: r`The right boundary is the vertical line $x=-4$. The left boundary $x=-5$ is the axis of rotation itself.` }],
  points: [pt(-5, 1, '(−5, 1)', -10, 4, 'end'), pt(-5, 0, '(−5, 0)', -10, 24, 'end'), pt(-4, 0, '(−4, 0)', 8, 24), pt(-4, Math.cos(1), '(−4, cos 1)', 10, -4)],
  pointsSay: r`The four corners of the region.`,
  region: { top: x => Math.cos((x + 5) * (x + 5)), bot: x => 0, range: [-5, -4] },
  regionSay: r`The region is the area under the cosine curve between $x=-5$ and $x=-4$.`,
  axis: { kind: 'v', at: -5, text: 'axis x = −5', dx: 8, dy: 18, tex: r`x=-5` },
  axisSay: r`Rotate about the vertical line $x=-5$. It is the left edge of the region.`,
  slice: { at: -4.5, w: 0.03, text: 'dx', tx: -4.48, ty: -0.14, anchor: 'middle' },
  radii: [
    { from: [-5, 0.5], to: [-4.52, 0.5], color: 'cd', text: 'r', dx: 0, dy: -10 },
    { from: [-4.42, 0], to: [-4.42, Math.cos(0.58 * 0.58)], color: 'cp', text: 'h', dx: 8, dy: 0 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the $x$-axis up to the curve.`,
  methodSay: r`The strip is parallel to the vertical axis $x=-5$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
  radSteps: [
    { say: r`The strip is to the right of the axis $x=-5$, so the radius is $r=x-(-5)=x+5$.`, show: ['rad0'], rows: [r`r=x-(-5)=x+5`], cols: ['cd'] },
    { say: r`The height is the curve's height above the $x$-axis.`, show: ['rad1'], rows: [r`h=\cos\big((x+5)^2\big)`], cols: ['cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference, times height, times thickness.`,
  dV: [r`r\,h=(x+5)\cos\big((x+5)^2\big)`, r`dV=2\pi\,r\,h\,dx`],
  integral: r`V=2\pi\int_{-5}^{-4}(x+5)\cos\big((x+5)^2\big)\,dx`,
  integralSay: r`Add up the shells from $x=-5$ to $x=-4$.`,
  evalSteps: [
    { say: r`Substitute $u=(x+5)^2$. Then $du=2(x+5)\,dx$, so $2\pi(x+5)\,dx=\pi\,du$. The limits: $x=-5\to u=0$ and $x=-4\to u=1$.`, rows: [r`=\pi\int_{u=0}^{u=1}\cos u\,du`],
      side: [eyebrow('eb9', 'Substitution'), R('side', T('u1', r`u=(x+5)^2`, 'cx')), R('side', T('u2', r`du=2(x+5)\,dx`, 'cd')), R('side', T('u3', r`x:-5\to-4\Rightarrow u:0\to1`))] },
    { say: r`The antiderivative of $\cos u$ is $\sin u$.`, rows: [r`=\pi\big[\sin u\big]_0^1`] },
    { say: r`$\sin0=0$, so only $\sin1$ remains.`, rows: [r`=\pi\sin1\approx2.64`], boxed: true }],
  answer: r`\pi\sin1`, track: [r`\text{shells about }x=-5`, r`2\pi\int_{-5}^{-4}(x+5)\cos\big((x+5)^2\big)\,dx`, r`\pi\sin1`],
  verify: [{ value: { f: x => 2 * Math.PI * (x + 5) * Math.cos((x + 5) * (x + 5)), a: -5, b: -4, val: Math.PI * Math.sin(1) } }, { num: { a: Math.cos(1), b: 0.5403, tol: 1e-3 } }],
  heli1: [ln(r`\text{about }x=-5`, 'ct')], heli3: [ln(r`\pi\big[\sin u\big]_0^1`)] }));

/* ===== Problem 19 : shells about y = 2, horizontal strips ===== */
examples.push(volGen({ n: 19, type: 'Shells about y = 2', verb: 'Volume', method: 'shell', orient: 'h',
  problem: r`x=y,\;x=y^2\text{; about }y=2`,
  plot: { xr: [-0.4, 2.0], yr: [-0.4, 2.55], xt: [[0.5, '½'], [1, '1']], yt: [1, 2], w: 640, h: 420 },
  curves: [
    { f: y => y, dom: [-0.1, 1.45], orient: 'x', color: 'cx', eq: r`x=y`, text: 'x = y', at: [1.45, 1.45], dx: 8, dy: 4, say: r`Sketch. The curve $x=y$ is the diagonal line.` },
    { f: y => y * y, dom: [0, 1.2], orient: 'x', color: 'cd', eq: r`x=y^2`, text: 'x = y²', at: [1.44, 1.2], dx: 8, dy: 4, say: r`The curve $x=y^2$ is a parabola lying on its side, opening to the right.` }],
  inter: [{ say: r`Where do they meet? Set the $x$-values equal and factor.`, rows: [r`y=y^2`, r`y(y-1)=0`, r`y=0,\;y=1`], boxed: true, c: 'cx' }],
  points: [pt(0, 0, '(0, 0)', 10, 22), pt(1, 1, '(1, 1)', 10, -10)],
  pointsSay: r`The curves cross at $(0,0)$ and $(1,1)$.`,
  region: { right: y => y, left: y => y * y, range: [0, 1] },
  regionSay: r`The bounded region is the lens between the diagonal and the parabola.`,
  axis: { kind: 'h', at: 2, text: 'axis y = 2', labAt: [-0.38, 2], dx: 0, dy: -10, tex: r`y=2` },
  axisSay: r`Rotate about the horizontal line $y=2$, above the region.`,
  slice: { at: 0.5, w: 0.04, text: 'dy', tx: 0.6, ty: 0.53 },
  radii: [
    { from: [0.38, 2], to: [0.38, 0.55], color: 'cd', text: 'r', dx: 10, dy: 0 },
    { from: [0.25, 0.42], to: [0.5, 0.42], color: 'cp', text: 'h', dx: -4, dy: 22 }],
  sliceSay: r`Slice with a thin horizontal strip of height $dy$. It runs from the parabola on the left to the line on the right.`,
  methodSay: r`The strip is parallel to the horizontal axis $y=2$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell of radius $r$, length $h$ along the axis and thickness $dy$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dy$.`,
  radSteps: [
    { say: r`The strip at height $y$ is below the axis $y=2$, so the radius is $r=2-y$.`, show: ['rad0'], rows: [r`r=2-y`], cols: ['cd'] },
    { say: r`The strip's length: right curve minus left curve. On $[0,1]$ we have $y\ge y^2$, so the line is on the right.`, show: ['rad1'], rows: [r`h=x_{\text{right}}-x_{\text{left}}`, r`h=y-y^2`], cols: ['cp', 'cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dy$: circumference, times length, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dy`, r`=2\pi(2-y)(y-y^2)\,dy`],
  integral: r`V=2\pi\int_0^1(2-y)(y-y^2)\,dy`,
  integralSay: r`Add up the shells from $y=0$ to $y=1$.`,
  evalSteps: [
    { say: r`Expand: $(2-y)(y-y^2)=2y-2y^2-y^2+y^3=y^3-3y^2+2y$.`, rows: [r`=2\pi\int_0^1\big(y^3-3y^2+2y\big)\,dy`] },
    { say: r`Antiderivative term by term.`, rows: [r`=2\pi\Big[\tfrac{y^4}{4}-y^3+y^2\Big]_0^1`] },
    { say: r`Plug in $y=1$; the lower limit gives 0. $\tfrac14-1+1=\tfrac14$, so $V=2\pi\cdot\tfrac14$.`, rows: [r`=2\pi\Big(\tfrac14-1+1\Big)=\tfrac{\pi}{2}`], boxed: true }],
  answer: r`\tfrac{\pi}{2}`, track: [r`\text{shells about }y=2`, r`2\pi\int_0^1(2-y)(y-y^2)\,dy`, r`\tfrac{\pi}{2}`],
  verify: [{ value: { f: y => 2 * Math.PI * (2 - y) * (y - y * y), a: 0, b: 1, val: Math.PI / 2 } }, { equal: { a: y => (2 - y) * (y - y * y), b: y => y ** 3 - 3 * y * y + 2 * y, range: [0, 1] } }],
  heli1: [ln(r`\text{about }y=2`, 'ct')], heli3: [ln(r`2\pi\Big[\tfrac{y^4}{4}-y^3+y^2\Big]_0^1`)] }));

/* ===== Problem 20 : shells about y = -1 ===== */
examples.push(volGen({ n: 20, type: 'Shells about y = −1', verb: 'Volume', method: 'shell', orient: 'h',
  problem: r`x=y^3,\;x=y^4\text{; about }y=-1`,
  plot: { xr: [-0.35, 2.1], yr: [-1.6, 1.5], xt: [[0.5, '½'], [1, '1']], yt: [-1, 1], w: 640, h: 420 },
  curves: [
    { f: y => y * y * y, dom: [-0.1, 1.12], orient: 'x', color: 'cx', eq: r`x=y^3`, text: 'x = y³', at: [1.4, 1.12], dx: 8, dy: -10, say: r`Sketch. The curve $x=y^3$ passes through the origin and $(1,1)$.` },
    { f: y => y * y * y * y, dom: [0, 1.12], orient: 'x', color: 'cd', eq: r`x=y^4`, text: 'x = y⁴', at: [1.57, 1.12], dx: 8, dy: 24, say: r`The curve $x=y^4$ also passes through the origin and $(1,1)$, but it stays closer to the $y$-axis for $0<y<1$.` }],
  inter: [{ say: r`Where do they meet? Set the $x$-values equal: $y^4-y^3=0$ factors as $y^3(y-1)=0$.`, rows: [r`y^3=y^4`, r`y^3(y-1)=0`, r`y=0,\;y=1`], boxed: true, c: 'cx' }],
  points: [pt(0, 0, '(0, 0)', 10, -10), pt(1, 1, '(1, 1)', -10, -10, 'end')],
  pointsSay: r`The curves cross at $(0,0)$ and $(1,1)$.`,
  region: { right: y => y * y * y, left: y => y * y * y * y, range: [0, 1] },
  regionSay: r`The bounded region is the thin sliver between the two curves. For $0<y<1$, $y^3>y^4$, so $x=y^3$ is on the right.`,
  axis: { kind: 'h', at: -1, text: 'axis y = −1', labAt: [-0.3, -1], dx: 0, dy: -10, tex: r`y=-1` },
  axisSay: r`Rotate about the horizontal line $y=-1$, below the region.`,
  slice: { at: 0.72, w: 0.03, text: 'dy', tx: 0.46, ty: 0.75 },
  radii: [
    { from: [0.32, -1], to: [0.32, 0.72], color: 'cd', text: 'r', dx: 10, dy: 0 },
    { from: [0.17, 0.62], to: [0.26, 0.62], color: 'cp', text: 'h', dx: -2, dy: 22 }],
  sliceSay: r`Slice with a thin horizontal strip of height $dy$. It runs from the curve $x=y^4$ on the left to the curve $x=y^3$ on the right.`,
  methodSay: r`The strip is parallel to the horizontal axis $y=-1$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell of radius $r$, length $h$ along the axis and thickness $dy$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dy$.`,
  radSteps: [
    { say: r`The strip at height $y$ is above the axis $y=-1$, so the radius is $r=y-(-1)=y+1$.`, show: ['rad0'], rows: [r`r=y-(-1)=y+1`], cols: ['cd'] },
    { say: r`The strip's length: right curve minus left curve.`, show: ['rad1'], rows: [r`h=x_{\text{right}}-x_{\text{left}}`, r`h=y^3-y^4`], cols: ['cp', 'cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dy$: circumference, times length, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dy`, r`=2\pi(y+1)(y^3-y^4)\,dy`],
  integral: r`V=2\pi\int_0^1(y+1)(y^3-y^4)\,dy`,
  integralSay: r`Add up the shells from $y=0$ to $y=1$.`,
  evalSteps: [
    { say: r`Expand: $(y+1)(y^3-y^4)=y^4-y^5+y^3-y^4$.`, rows: [r`=2\pi\int_0^1\big(y^4-y^5+y^3-y^4\big)\,dy`] },
    { say: r`The $y^4$ terms cancel, leaving $y^3-y^5$.`, rows: [r`=2\pi\int_0^1\big(y^3-y^5\big)\,dy`] },
    { say: r`Antiderivative term by term.`, rows: [r`=2\pi\Big[\tfrac{y^4}{4}-\tfrac{y^6}{6}\Big]_0^1`] },
    { say: r`Plug in $y=1$; the lower limit gives 0. $\tfrac14-\tfrac16=\tfrac1{12}$, so $V=2\pi\cdot\tfrac1{12}$.`, rows: [r`=2\pi\Big(\tfrac14-\tfrac16\Big)=\tfrac{\pi}{6}`], boxed: true,
      side: warnNote('w20', r`The posted solution expands the product as $y^5+2y^4+y^3$, giving $\tfrac{49\pi}{30}$. The correct expansion is $y^3-y^5$, so $V=\tfrac\pi6$.`) }],
  answer: r`\tfrac{\pi}{6}`, track: [r`\text{shells about }y=-1`, r`2\pi\int_0^1(y+1)(y^3-y^4)\,dy`, r`\tfrac{\pi}{6}`],
  verify: [{ value: { f: y => 2 * Math.PI * (y + 1) * (y ** 3 - y ** 4), a: 0, b: 1, val: Math.PI / 6 } }, { equal: { a: y => (y + 1) * (y ** 3 - y ** 4), b: y => y ** 3 - y ** 5, range: [0, 1] } }],
  heli1: [ln(r`\text{about }y=-1`, 'ct')], heli3: [ln(r`2\pi\Big[\tfrac{y^4}{4}-\tfrac{y^6}{6}\Big]_0^1`)] }));

/* ===== Problem 21 : shells about y = -1, the (y+1) cancels ===== */
examples.push(volGen({ n: 21, type: 'Shells about y = −1', verb: 'Volume', method: 'shell', orient: 'h',
  problem: r`x=\tfrac{\sin(y+1)}{y+1},\;x=0,\;y=0,\;y=1\text{; about }y=-1`,
  plot: { xr: [-0.25, 1.75], yr: [-1.6, 1.5], xt: [[0.5, '½'], [1, '1']], yt: [-1, 1], w: 640, h: 420 },
  curves: [
    { f: y => Math.sin(y + 1) / (y + 1), dom: [-0.05, 1.1], orient: 'x', color: 'cx', eq: r`x=\frac{\sin(y+1)}{y+1}`, text: 'x = sin(y+1)/(y+1)', at: [0.9, 0.35], dx: 6, dy: 0, say: r`Sketch. The right boundary $x=\frac{\sin(y+1)}{y+1}$ falls from $0.84$ at $y=0$ to $\tfrac{\sin2}{2}\approx0.45$ at $y=1$.` },
    { f: x => 1, dom: [0, Math.sin(2) / 2], color: 'cd', eq: r`y=1`, say: r`The top boundary is the horizontal line $y=1$. The bottom is the $x$-axis ($y=0$) and the left boundary is the $y$-axis ($x=0$).` }],
  points: [pt(0, 0, '(0, 0)', -10, 22, 'end'), pt(Math.sin(1), 0, '(sin 1, 0)', 8, 24), pt(0, 1, '(0, 1)', -10, -8, 'end'), pt(Math.sin(2) / 2, 1, '(sin 2 / 2, 1)', 10, -8)],
  pointsSay: r`The four corners of the region.`,
  region: { right: y => Math.sin(y + 1) / (y + 1), left: y => 0, range: [0, 1] },
  regionSay: r`The region lies between the $y$-axis and the curve, from $y=0$ to $y=1$.`,
  axis: { kind: 'h', at: -1, text: 'axis y = −1', labAt: [-0.22, -1], dx: 0, dy: -10, tex: r`y=-1` },
  axisSay: r`Rotate about the horizontal line $y=-1$, below the region.`,
  slice: { at: 0.5, w: 0.04, text: 'dy', tx: 0.74, ty: 0.53 },
  radii: [
    { from: [0.3, -1], to: [0.3, 0.5], color: 'cd', text: 'r', dx: 10, dy: 0 },
    { from: [0, 0.4], to: [0.7, 0.4], color: 'cp', text: 'h', dx: 0, dy: 22 }],
  sliceSay: r`Slice with a thin horizontal strip of height $dy$. It runs from the $y$-axis to the curve.`,
  methodSay: r`The strip is parallel to the horizontal axis $y=-1$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell of radius $r$, length $h$ along the axis and thickness $dy$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dy$.`,
  radSteps: [
    { say: r`The strip at height $y$ is above the axis $y=-1$, so the radius is $r=y-(-1)=y+1$.`, show: ['rad0'], rows: [r`r=y+1`], cols: ['cd'] },
    { say: r`The strip's length runs from the $y$-axis to the curve: just the curve's $x$-value.`, show: ['rad1'], rows: [r`h=\frac{\sin(y+1)}{y+1}`], cols: ['cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dy$. The radius $y+1$ cancels the denominator of $h$, which is the point of the problem.`,
  dV: [r`dV=2\pi\,r\,h\,dy`, r`=2\pi(y+1)\tfrac{\sin(y+1)}{y+1}dy`, r`=2\pi\sin(y+1)\,dy`],
  integral: r`V=2\pi\int_0^1\sin(y+1)\,dy`,
  integralSay: r`Add up the shells from $y=0$ to $y=1$.`,
  evalSteps: [
    { say: r`The antiderivative of $\sin(y+1)$ is $-\cos(y+1)$.`, rows: [r`=2\pi\Big[-\cos(y+1)\Big]_0^1`] },
    { say: r`Plug in: upper limit $-\cos2$, lower limit $-\cos1$.`, rows: [r`=2\pi\big(-\cos2+\cos1\big)`] },
    { say: r`Reorder: $\cos1\approx0.540$ and $\cos2\approx-0.416$, so the bracket is about $0.956$.`, rows: [r`=2\pi\big(\cos1-\cos2\big)\approx6.01`], boxed: true }],
  answer: r`2\pi(\cos1-\cos2)`, track: [r`\text{shells about }y=-1`, r`2\pi\int_0^1\sin(y+1)\,dy`, r`2\pi(\cos1-\cos2)`],
  verify: [{ value: { f: y => 2 * Math.PI * (y + 1) * Math.sin(y + 1) / (y + 1), a: 0, b: 1, val: 2 * Math.PI * (Math.cos(1) - Math.cos(2)) } }, { num: { a: 2 * Math.PI * (Math.cos(1) - Math.cos(2)), b: 6.0092, tol: 1e-4 } }],
  heli1: [ln(r`\text{about }y=-1`, 'ct')], heli3: [ln(r`2\pi\Big[-\cos(y+1)\Big]_0^1`)] }));

/* ===== Problem 22 : shells about the y-axis, then check with disks ===== */
examples.push(volGen({ n: 22, type: 'Shells, then a disk check', verb: 'Volume', method: 'shell',
  problem: r`y=(x-2)^2,\;x=0,\;y=0,\;0\le x\le2\text{; about the }y\text{-axis}`,
  plot: { xr: [-0.7, 3.2], yr: [-0.7, 4.9], xt: [1, 2], yt: [1, 2, 3, 4], w: 640, h: 420 },
  curves: [
    { f: x => (x - 2) * (x - 2), dom: [0, 2.45], color: 'cx', eq: r`y=(x-2)^2`, text: 'y = (x−2)²', at: [0.95, 2.7], dx: 6, dy: 0, say: r`Sketch. The curve $y=(x-2)^2$ is the standard parabola shifted right by 2. On $[0,2]$ it falls from $(0,4)$ to its vertex $(2,0)$.` },
    { f: x => 0, dom: [0, 2], color: 'cd', eq: r`y=0`, say: r`The bottom boundary is the $x$-axis and the left boundary is the $y$-axis ($x=0$).` }],
  points: [pt(0, 4, '(0, 4)', 10, 4), pt(2, 0, '(2, 0)', 6, 24), pt(0, 0, '(0, 0)', -10, 24, 'end')],
  pointsSay: r`The three corners of the region.`,
  region: { top: x => (x - 2) * (x - 2), bot: x => 0, range: [0, 2] },
  regionSay: r`The region is the area under the parabola between $x=0$ and $x=2$.`,
  axis: { kind: 'v', at: 0, text: 'axis x = 0', dx: 8, dy: 18, tex: r`x=0\;(\text{the }y\text{-axis})` },
  axisSay: r`Rotate about the $y$-axis, the left edge of the region.`,
  slice: { at: 0.7, w: 0.06, text: 'dx', tx: 0.74, ty: 2.15, anchor: 'middle' },
  radii: [
    { from: [0, 0.85], to: [0.69, 0.85], color: 'cd', text: 'r', dx: 0, dy: -10 },
    { from: [0.88, 0], to: [0.88, 1.25], color: 'cp', text: 'h', dx: 8, dy: 0 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the $x$-axis up to the parabola.`,
  methodSay: r`The strip is parallel to the vertical axis. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
  radSteps: [
    { say: r`The axis is the $y$-axis, so the radius is just the strip's $x$-coordinate.`, show: ['rad0'], rows: [r`r=x`], cols: ['cd'] },
    { say: r`The height is the distance from the $x$-axis up to the parabola.`, show: ['rad1'], rows: [r`h=(x-2)^2`], cols: ['cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference, times height, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi x(x-2)^2\,dx`],
  integral: r`V=2\pi\int_0^2x(x-2)^2\,dx`,
  integralSay: r`Add up the shells from $x=0$ to $x=2$.`,
  evalSteps: [
    { say: r`Expand $x(x-2)^2=x(x^2-4x+4)=x^3-4x^2+4x$.`, rows: [r`=2\pi\int_0^2\big(x^3-4x^2+4x\big)\,dx`] },
    { say: r`Antiderivative term by term.`, rows: [r`=2\pi\Big[\tfrac{x^4}{4}-\tfrac{4x^3}{3}+2x^2\Big]_0^2`] },
    { say: r`Plug in $x=2$; the lower limit gives 0. $4-\tfrac{32}{3}+8=\tfrac43$.`, rows: [r`=2\pi\Big(4-\tfrac{32}{3}+8\Big)=\tfrac{8\pi}{3}`], boxed: true },
    { fresh: true, say: r`Check with the other method. Horizontal strips are perpendicular to the $y$-axis, so they make disks. Solve $y=(x-2)^2$ for the branch inside the region: $x=2-\sqrt y$, so $R=2-\sqrt y$ for $0\le y\le4$.`,
      rows: [r`V=\pi\int_0^4\big(2-\sqrt y\big)^2\,dy`],
      side: [eyebrow('eb9', 'Disk check'), R('side', T('d1', r`x=2-\sqrt y`, 'cx')), R('side', T('d2', r`R=2-\sqrt y`, 'cx')), R('side', T('d3', r`0\le y\le4`))] },
    { say: r`Expand $(2-\sqrt y)^2=4-4\sqrt y+y$.`, rows: [r`=\pi\int_0^4\big(4-4\sqrt y+y\big)\,dy`],
      side: [eyebrow('eb9', 'Disk check'), R('side', T('d1', r`x=2-\sqrt y`, 'cx')), R('side', T('d2', r`R=2-\sqrt y`, 'cx')), R('side', T('d3', r`0\le y\le4`))] },
    { say: r`Antiderivative: $\int4\sqrt y\,dy=\tfrac83y^{3/2}$.`, rows: [r`=\pi\Big[4y-\tfrac83y^{3/2}+\tfrac{y^2}{2}\Big]_0^4`],
      side: [eyebrow('eb9', 'Disk check'), R('side', T('d1', r`x=2-\sqrt y`, 'cx')), R('side', T('d2', r`R=2-\sqrt y`, 'cx')), R('side', T('d3', r`0\le y\le4`))] },
    { say: r`Plug in $y=4$: $16-\tfrac83\cdot8+8=24-\tfrac{64}{3}=\tfrac83$. Both methods agree.`, rows: [r`=\pi\Big(16-\tfrac{64}{3}+8\Big)=\tfrac{8\pi}{3}`], boxed: true,
      side: [eyebrow('eb9', 'Disk check'), R('side', T('d1', r`x=2-\sqrt y`, 'cx')), R('side', T('d2', r`R=2-\sqrt y`, 'cx')), R('side', T('d3', r`0\le y\le4`))] }],
  answer: r`\tfrac{8\pi}{3}`, track: [r`\text{shells about the }y\text{-axis}`, r`2\pi\int_0^2x(x-2)^2\,dx`, r`\tfrac{8\pi}{3}`],
  verify: [{ value: { f: x => 2 * Math.PI * x * (x - 2) ** 2, a: 0, b: 2, val: 8 * Math.PI / 3 } }, { value: { f: y => Math.PI * (2 - Math.sqrt(y)) ** 2, a: 0, b: 4, val: 8 * Math.PI / 3, n: 80000, tol: 1e-6 } }],
  heli1: [ln(r`\text{about the }y\text{-axis}`, 'ct')], heli3: [ln(r`2\pi\Big[\tfrac{x^4}{4}-\tfrac{4x^3}{3}+2x^2\Big]_0^2`), ln(r`\text{disk check: }\pi\int_0^4(2-\sqrt y)^2dy=\tfrac{8\pi}{3}`, 'muted')] }));
