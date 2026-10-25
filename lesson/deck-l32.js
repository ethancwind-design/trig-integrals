/* Lectures 32 & 33 · volumes of revolution, 26 practice problems. Part A: problems 1-6 */
const examples = [];
const pt = (x, y, text, tdx, tdy, anchor) => ({ x, y, text, tdx, tdy, anchor });
const sq = Math.sqrt;

/* ===== Problem 1 : washers about y = 0 ===== */
examples.push(volGen({ n: 1, type: 'Washers about the x-axis', verb: 'Volume', method: 'washer',
  problem: r`y=\sqrt{1-x^2},\;y=\sqrt{\tfrac x2}\,(1-x),\;x=0\text{; about }y=0`,
  plot: { xr: [-0.3, 1.5], yr: [-0.3, 1.3], xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']], w: 640, h: 430 },
  curves: [
    { f: x => sq(1 - x * x), dom: [0, 1], n: 200, color: 'cx', eq: r`y=\sqrt{1-x^2}`, text: 'y = √(1−x²)', at: [0.62, 0.78], dx: 10, dy: -12, say: r`Sketch. The upper boundary is $y=\sqrt{1-x^2}$: the quarter of the unit circle in the first quadrant.` },
    { f: x => sq(x / 2) * (1 - x), dom: [0, 1], n: 200, color: 'cd', eq: r`y=\sqrt{\tfrac x2}\,(1-x)`, text: 'y = √(x/2)(1−x)', at: [0.42, 0.24], dx: 12, dy: 34, say: r`The lower boundary $y=\sqrt{x/2}\,(1-x)$ starts at the origin, rises to a small hump and returns to 0 at $x=1$.` },
    { f: y => 0, dom: [0, 1], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The left boundary is the $y$-axis, $x=0$.` }],
  points: [pt(0, 1, '(0, 1)', 12, 8), pt(0, 0, '(0, 0)', 12, 22), pt(1, 0, '(1, 0)', 6, 26)],
  pointsSay: r`The two curves start at $(0,1)$ and $(0,0)$ on the $y$-axis and meet at $(1,0)$.`,
  region: { top: x => sq(1 - x * x), bot: x => sq(x / 2) * (1 - x), range: [0, 1] },
  regionSay: r`The planar region sits between the two curves, to the right of the $y$-axis.`,
  axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [-0.28, 0], dx: 0, dy: -10, tex: r`y=0` },
  axisSay: r`We rotate this region about the $x$-axis, the line $y=0$. The region touches the axis only at $(1,0)$, so the solid will have a hole.`,
  slice: { at: 0.7, w: 0.03, text: 'dx', tx: 0.72, ty: 0.1, anchor: 'middle' },
  radii: [
    { from: [0.66, 0], to: [0.66, sq(1 - 0.66 * 0.66)], color: 'cx', text: 'R', dx: -26, dy: 6 },
    { from: [0.77, 0], to: [0.77, sq(0.77 / 2) * 0.23], color: 'cd', text: 'r', dx: 10, dy: 6 }],
  sliceSay: r`Slice the region with a thin vertical strip of width $dx$. It runs from the lower curve up to the upper curve.`,
  methodSay: r`The strip is perpendicular to the horizontal axis, so spinning it makes a washer: a flat disk with a hole where the strip does not reach the axis.`,
  xsSay: r`Face-on, the washer is a big disk of radius $R$ with a smaller disk of radius $r$ removed. Its area is $\pi R^2-\pi r^2$, times the thickness $dx$.`,
  radSteps: [
    { say: r`The outer radius $R$ is the distance from the axis to the farther edge of the strip: the upper curve.`, show: ['rad0'], rows: [r`R=\sqrt{1-x^2}`], cols: ['cx'] },
    { say: r`The inner radius $r$ is the distance from the axis to the nearer edge: the lower curve. That gap is the hole.`, show: ['rad1'], rows: [r`r=\sqrt{\tfrac x2}\,(1-x)`], cols: ['cd'] }],
  dVSay: r`Square each radius, then dV = $\pi(R^2-r^2)\,dx$. Squaring removes the square roots: $R^2=1-x^2$ and $r^2=\tfrac x2(1-x)^2$.`,
  dV: [r`R^2=1-x^2`, r`r^2=\tfrac x2(1-x)^2`, r`dV=\pi(R^2-r^2)\,dx`],
  integral: r`V=\pi\int_0^1\Big[(1-x^2)-\tfrac x2(1-x)^2\Big]\,dx`,
  integralSay: r`Add up the washers from $x=0$ to $x=1$.`,
  evalSteps: [
    { say: r`Expand $\tfrac x2(1-x)^2=\tfrac x2-x^2+\tfrac{x^3}{2}$ and subtract it.`, rows: [r`=\pi\int_0^1\Big[1-x^2-\tfrac x2+x^2-\tfrac{x^3}{2}\Big]dx`] },
    { say: r`The $x^2$ terms cancel.`, rows: [r`=\pi\int_0^1\Big(1-\tfrac x2-\tfrac{x^3}{2}\Big)dx`] },
    { say: r`Antiderivative term by term.`, rows: [r`=\pi\Big[x-\tfrac{x^2}{4}-\tfrac{x^4}{8}\Big]_0^1`] },
    { say: r`Plug in $x=1$; the lower limit gives 0. $1-\tfrac14-\tfrac18=\tfrac58$.`, rows: [r`=\pi\Big(1-\tfrac14-\tfrac18\Big)=\tfrac{5\pi}{8}`], boxed: true }],
  answer: r`\tfrac{5\pi}{8}`, track: [r`\text{washers, }0\le x\le1`, r`\pi\int_0^1(R^2-r^2)\,dx`, r`\tfrac{5\pi}{8}`],
  verify: [{ value: { f: x => Math.PI * ((1 - x * x) - (x / 2) * (1 - x) * (1 - x)), a: 0, b: 1, val: 5 * Math.PI / 8 } },
    { equal: { a: x => (1 - x * x) - (x / 2) * (1 - x) * (1 - x), b: x => 1 - x / 2 - x * x * x / 2, range: [0, 1] } },
    { equal: { a: x => sq(1 - x * x) ** 2, b: x => 1 - x * x, range: [0, 1] } }],
  heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`\pi\Big[x-\tfrac{x^2}{4}-\tfrac{x^4}{8}\Big]_0^1`)] }));

/* ===== Problem 2 : shells about x = 2 ===== */
examples.push(volGen({ n: 2, type: 'Shells about x = 2', verb: 'Volume', method: 'shell',
  problem: r`y=\sqrt{1-x^2},\;y=x-1+\sqrt{1-x^2}\text{; about }x=2`,
  plot: { xr: [-0.4, 2.7], yr: [-0.3, 1.35], xt: [[0.5, '½'], [1, '1'], [2, '2']], yt: [[0.5, '½'], [1, '1']], w: 640, h: 400 },
  curves: [
    { f: x => sq(1 - x * x), dom: [0, 1], n: 200, color: 'cx', eq: r`y=\sqrt{1-x^2}`, text: 'y = √(1−x²)', at: [0.55, 0.84], dx: 12, dy: -12, say: r`Sketch. The upper boundary is again the quarter circle $y=\sqrt{1-x^2}$.` },
    { f: x => x - 1 + sq(1 - x * x), dom: [0, 1], n: 200, color: 'cd', eq: r`y=x-1+\sqrt{1-x^2}`, text: 'y = x − 1 + √(1−x²)', at: [0.18, 0.2], dx: 14, dy: 30, say: r`The lower boundary $y=x-1+\sqrt{1-x^2}$ is the same circle shifted down by $1-x$. It starts at $(0,0)$ and meets the top curve at $(1,0)$.` },
    { f: y => 0, dom: [0, 1], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The left boundary is the $y$-axis, $x=0$.` }],
  points: [pt(0, 1, '(0, 1)', 12, 8), pt(0, 0, '(0, 0)', 12, 22), pt(1, 0, '(1, 0)', 6, 26)],
  pointsSay: r`The curves start at $(0,1)$ and $(0,0)$ and meet at $(1,0)$.`,
  region: { top: x => sq(1 - x * x), bot: x => x - 1 + sq(1 - x * x), range: [0, 1] },
  regionSay: r`The region is a curved sliver whose vertical thickness shrinks from 1 at $x=0$ to 0 at $x=1$.`,
  axis: { kind: 'v', at: 2, text: 'axis x = 2', dx: 8, dy: 18, tex: r`x=2` },
  axisSay: r`We rotate the region about the vertical line $x=2$, to the right of the region.`,
  slice: { at: 0.35, w: 0.04, text: 'dx', tx: 0.37, ty: 1.1, anchor: 'middle' },
  radii: [
    { from: [2, 0.62], to: [0.4, 0.62], color: 'cd', text: 'r', dx: -4, dy: -12 },
    { from: [0.29, 0.26], to: [0.29, 0.955], color: 'cp', text: 'h', dx: -22, dy: 4 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the lower curve up to the upper curve.`,
  methodSay: r`The strip is parallel to the vertical axis $x=2$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
  radSteps: [
    { say: r`The radius is the distance from the axis $x=2$ to the strip at position $x$. The strip is left of the axis, so $r=2-x$.`, show: ['rad0'], rows: [r`r=2-x`], cols: ['cd'] },
    { say: r`The height is top minus bottom. The square roots cancel: $\sqrt{1-x^2}-\big(x-1+\sqrt{1-x^2}\big)=1-x$.`, show: ['rad1'], rows: [r`h=y_{\text{top}}-y_{\text{bottom}}`, r`h=1-x`], cols: ['cp', 'cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference $2\pi r$, times height, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi(2-x)(1-x)\,dx`],
  integral: r`V=2\pi\int_0^1(2-x)(1-x)\,dx`,
  integralSay: r`Add up the shells from $x=0$ to $x=1$.`,
  evalSteps: [
    { say: r`Expand $(2-x)(1-x)=2-3x+x^2$.`, rows: [r`=2\pi\int_0^1(x^2-3x+2)\,dx`] },
    { say: r`Antiderivative term by term.`, rows: [r`=2\pi\Big[\tfrac{x^3}{3}-\tfrac{3x^2}{2}+2x\Big]_0^1`] },
    { say: r`Plug in $x=1$. $\tfrac13-\tfrac32+2=\tfrac56$, so $V=2\pi\cdot\tfrac56$.`, rows: [r`=2\pi\Big(\tfrac13-\tfrac32+2\Big)=\tfrac{5\pi}{3}`], boxed: true },
    { fresh: true, say: r`The follow-up: move the axis to $x=-1$. The heights $1-x$ stay the same. Each radius changes from $2-x$ to $x+1$: tall shells near $x=0$ shrink from radius 2 to 1, and short shells near $x=1$ grow from 1 to 2.`,
      rows: [r`V_{\text{new}}=2\pi\int_0^1(x+1)(1-x)\,dx`], side: [eyebrow('eb9', 'Axis x = −1'), R('side', T('o1', r`x=0:\;r=2\to1`, 'cd')), R('side', T('o2', r`x=1:\;r=1\to2`, 'cd')), R('side', RICH('o3', r`The tall shells carry most of the volume, so it should decrease.`, { cls: 'mini' }))] },
    { say: r`Check: $(x+1)(1-x)=1-x^2$, so $V_{\text{new}}=2\pi\big(1-\tfrac13\big)=\tfrac{4\pi}{3}$, which is less than $\tfrac{5\pi}{3}$. The volume decreases.`, rows: [r`=2\pi\int_0^1(1-x^2)\,dx=\tfrac{4\pi}{3}<\tfrac{5\pi}{3}`], boxed: true,
      side: [eyebrow('eb9', 'Axis x = −1'), R('side', T('o1', r`x=0:\;r=2\to1`, 'cd')), R('side', T('o2', r`x=1:\;r=1\to2`, 'cd')), R('side', RICH('o3', r`The tall shells carry most of the volume, so it should decrease.`, { cls: 'mini' }))] }],
  answer: r`\tfrac{5\pi}{3}`, track: [r`\text{shells about }x=2`, r`2\pi\int_0^1(2-x)(1-x)\,dx`, r`\tfrac{5\pi}{3}`],
  verify: [{ value: { f: x => 2 * Math.PI * (2 - x) * (1 - x), a: 0, b: 1, val: 5 * Math.PI / 3 } },
    { value: { f: x => 2 * Math.PI * (x + 1) * (1 - x), a: 0, b: 1, val: 4 * Math.PI / 3 } },
    { equal: { a: x => sq(1 - x * x) - (x - 1 + sq(1 - x * x)), b: x => 1 - x, range: [0, 1] } }],
  heli1: [ln(r`\text{about }x=2`, 'ct')], heli3: [ln(r`2\pi\Big[\tfrac{x^3}{3}-\tfrac{3x^2}{2}+2x\Big]_0^1`), ln(r`x=-1:\;V\text{ decreases to }\tfrac{4\pi}{3}`, 'muted')] }));

/* ===== Problem 3 : shells about y = 0, horizontal slices ===== */
examples.push(volGen({ n: 3, type: 'Shells about the x-axis', verb: 'Volume', method: 'shell', orient: 'h',
  problem: r`x=-y^2+2y,\;x=y^2+2y,\;y=-2\text{; about }y=0`,
  plot: { xr: [-9.4, 2.7], yr: [-2.75, 0.8], xt: [-8, -6, -4, -2], yt: [-2, -1], w: 640, h: 360 },
  curves: [
    { f: y => -y * y + 2 * y, dom: [-2.15, 0.15], orient: 'x', color: 'cx', eq: r`x=-y^2+2y`, text: 'x = −y² + 2y', at: [-7.9, -1.2], dx: 0, dy: 0, say: r`Sketch. Both boundaries are parabolas lying on their side, written as $x$ in terms of $y$. The left one, $x=-y^2+2y$, opens to the left.` },
    { f: y => y * y + 2 * y, dom: [-2.15, 0.15], orient: 'x', color: 'cd', eq: r`x=y^2+2y`, text: 'x = y² + 2y', at: [-0.1, -1.75], dx: 12, dy: 0, say: r`The right one, $x=y^2+2y$, opens to the right. Its vertex is at $(-1,-1)$.` },
    { f: x => -2, dom: [-8, 0], color: 'ca', eq: r`y=-2`, text: 'y = −2', at: [-4.4, -2], dx: 0, dy: 30, say: r`The region is closed off below by the horizontal line $y=-2$.` }],
  points: [pt(-8, -2, '(−8, −2)', 0, -12, 'middle'), pt(0, -2, '(0, −2)', 10, -12), pt(0, 0, '(0, 0)', 10, 22)],
  pointsSay: r`At $y=-2$ the left curve is at $x=-8$ and the right curve at $x=0$. At $y=0$ both curves pass through the origin.`,
  region: { right: y => y * y + 2 * y, left: y => -y * y + 2 * y, range: [-2, 0] },
  regionSay: r`The region is the wedge between the two parabolas, from $y=-2$ up to the origin.`,
  axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [-3.6, 0], dx: 0, dy: -12, tex: r`y=0` },
  axisSay: r`Rotate about $y=0$, the $x$-axis. The whole region lies below the axis.`,
  slice: { at: -1.35, w: 0.07, text: 'dy', tx: -0.5, ty: -1.22 },
  radii: [
    { from: [-2.6, 0], to: [-2.6, -1.3], color: 'cd', text: 'r', dx: 10, dy: 0 },
    { from: [-4.4, -1.62], to: [-0.92, -1.62], color: 'cp', text: 'h', dx: -4, dy: 22 }],
  sliceSay: r`Slice with a thin horizontal strip of height $dy$. It runs from the left parabola to the right parabola.`,
  methodSay: r`The strip is parallel to the horizontal axis $y=0$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell of radius $r$, length $h$ along the axis and thickness $dy$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dy$.`,
  radSteps: [
    { say: r`The strip sits at height $y$, which is negative. Its distance to the axis $y=0$ is $0-y=-y$, a positive number.`, show: ['rad0'], rows: [r`r=0-y=-y`], cols: ['cd'] },
    { say: r`The strip's length runs along the axis: right curve minus left curve. $(y^2+2y)-(-y^2+2y)=2y^2$.`, show: ['rad1'], rows: [r`h=x_{\text{right}}-x_{\text{left}}`, r`h=2y^2`], cols: ['cp', 'cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dy$: circumference, times length, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dy`, r`=2\pi(-y)(2y^2)\,dy`, r`=-4\pi y^3\,dy`],
  integral: r`V=-4\pi\int_{-2}^{0}y^3\,dy`,
  integralSay: r`Add up the shells from $y=-2$ to $y=0$. The integrand $-4\pi y^3$ is positive there, as a volume must be.`,
  evalSteps: [
    { say: r`The antiderivative of $y^3$ is $\tfrac{y^4}{4}$.`, rows: [r`=-4\pi\Big[\tfrac{y^4}{4}\Big]_{-2}^{0}`] },
    { say: r`Pull the $\tfrac14$ into the front factor: $-4\cdot\tfrac14=-1$.`, rows: [r`=-\pi\Big[y^4\Big]_{-2}^{0}`] },
    { say: r`The upper limit gives 0 and the lower limit gives $(-2)^4=16$.`, rows: [r`=-\pi\,(0-16)=16\pi`], boxed: true }],
  answer: r`16\pi`, track: [r`\text{shells about }y=0`, r`-4\pi\int_{-2}^{0}y^3\,dy`, r`16\pi`],
  verify: [{ value: { f: y => 2 * Math.PI * (-y) * (2 * y * y), a: -2, b: 0, val: 16 * Math.PI } }, { equal: { a: y => (y * y + 2 * y) - (-y * y + 2 * y), b: y => 2 * y * y, range: [-2, 0] } }],
  heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`-\pi\Big[y^4\Big]_{-2}^{0}`)] }));

/* ===== Problem 4 : washers, region below the axis ===== */
examples.push(volGen({ n: 4, type: 'Washers, region below the axis', verb: 'Volume', method: 'washer',
  problem: r`y=x^2+2x,\;y=-x^2+2x,\;x=-2\text{; about }y=0`,
  plot: { xr: [-3.3, 1.5], yr: [-9.4, 2.4], xt: [-2, -1, 1], yt: [-8, -6, -4, -2], w: 640, h: 440 },
  curves: [
    { f: x => x * x + 2 * x, dom: [-2.4, 0.6], color: 'cx', eq: r`y=x^2+2x`, text: 'y = x² + 2x', at: [0.45, 1.5], dx: 6, dy: -6, say: r`Sketch. The upper boundary $y=x^2+2x=x(x+2)$ is an upward parabola, with vertex $(-1,-1)$. It crosses the $x$-axis at $x=-2$ and $x=0$.` },
    { f: x => -x * x + 2 * x, dom: [-2.4, 0.6], color: 'cd', eq: r`y=-x^2+2x`, text: 'y = −x² + 2x', at: [-1.45, -6.4], dx: 10, dy: 26, say: r`The lower boundary $y=-x^2+2x$ is a downward parabola. On $[-2,0]$ it falls far below the axis, reaching $y=-8$ at $x=-2$.` },
    { f: y => -2, dom: [-8, 0], orient: 'x', color: 'ca', eq: r`x=-2`, say: r`The left boundary is the vertical line $x=-2$. On the right the two curves meet at the origin, which closes the region.` }],
  points: [pt(-2, -8, '(−2, −8)', 12, 6), pt(-2, 0, '(−2, 0)', -10, -10, 'end'), pt(0, 0, '(0, 0)', 10, -10)],
  pointsSay: r`The corners: $(-2,0)$ and $(-2,-8)$ on the left edge, and the origin where both curves meet.`,
  region: { top: x => x * x + 2 * x, bot: x => -x * x + 2 * x, range: [-2, 0] },
  regionSay: r`The region is the leaf-shaped area between the two parabolas. All of it lies below the $x$-axis.`,
  axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [-1.7, 0], dx: 0, dy: -10, tex: r`y=0` },
  axisSay: r`Rotate about $y=0$, the $x$-axis. The region sits entirely below it.`,
  slice: { at: -1.25, w: 0.07, text: 'dx', tx: -1.2, ty: -5.0, anchor: 'middle' },
  radii: [
    { from: [-1.42, 0], to: [-1.42, -4.84], color: 'cx', text: 'R', dx: -24, dy: 4 },
    { from: [-1.0, 0], to: [-1.0, -1.0], color: 'cd', text: 'r', dx: 10, dy: 4 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the lower parabola up to the upper parabola.`,
  methodSay: r`The strip is perpendicular to the horizontal axis, so spinning it makes a washer. It has a hole because the strip stays away from the axis.`,
  xsSay: r`Face-on, the washer is a big disk of radius $R$ with a smaller disk of radius $r$ removed. Its area is $\pi R^2-\pi r^2$, times the thickness $dx$.`,
  radSteps: [
    { say: r`The outer radius $R$ is the distance from the axis $y=0$ to the farther curve, the lower parabola. It is below the axis, so $R=0-(-x^2+2x)$.`, show: ['rad0'], rows: [r`R=0-(-x^2+2x)`, r`R=x^2-2x`], cols: ['cx', 'cx'] },
    { say: r`The inner radius $r$ is the distance to the nearer curve, the upper parabola: $r=0-(x^2+2x)$.`, show: ['rad1'], rows: [r`r=0-(x^2+2x)`, r`r=-x^2-2x`], cols: ['cd', 'cd'] }],
  dVSay: r`dV = $\pi(R^2-r^2)\,dx$. Difference of squares: $(x^2-2x)^2-(x^2+2x)^2=(-4x)(2x^2)=-8x^3$.`,
  dV: [r`R^2-r^2=-8x^3`, r`dV=\pi(-8x^3)\,dx`],
  integral: r`V=\pi\int_{-2}^{0}(-8x^3)\,dx`,
  integralSay: r`Add up the washers from $x=-2$ to $x=0$. The integrand is positive there, since $x^3<0$.`,
  evalSteps: [
    { say: r`The antiderivative of $-8x^3$ is $-2x^4$.`, rows: [r`=\pi\Big[-2x^4\Big]_{-2}^{0}`] },
    { say: r`The upper limit gives 0 and the lower limit gives $-2\cdot16=-32$.`, rows: [r`=\pi\big(0-(-32)\big)=32\pi`], boxed: true }],
  answer: r`32\pi`, track: [r`\text{washers about }y=0`, r`\pi\int_{-2}^{0}(R^2-r^2)\,dx`, r`32\pi`],
  verify: [{ value: { f: x => Math.PI * ((x * x - 2 * x) ** 2 - (x * x + 2 * x) ** 2), a: -2, b: 0, val: 32 * Math.PI } }, { equal: { a: x => (x * x - 2 * x) ** 2 - (x * x + 2 * x) ** 2, b: x => -8 * x * x * x, range: [-2, 0] } }],
  heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`\pi\Big[-2x^4\Big]_{-2}^{0}`)] }));

/* ===== Problem 5 : shells about x = -2 ===== */
examples.push(volGen({ n: 5, type: 'Shells about x = −2', verb: 'Volume', method: 'shell',
  problem: r`y=4x^2-2,\;y=4x^2-3x-2,\;x=-1,\;x=0\text{; about }x=-2`,
  plot: { xr: [-3.4, 1.7], yr: [-3.3, 7.5], xt: [-3, -2, -1, 1], yt: [-2, 2, 4, 6], w: 640, h: 440 },
  curves: [
    { f: x => 4 * x * x - 3 * x - 2, dom: [-1.2, 0.6], color: 'cx', eq: r`y=4x^2-3x-2`, text: 'y = 4x² − 3x − 2', at: [-0.7, 5.6], dx: 6, dy: 0, say: r`Sketch. The upper boundary $y=4x^2-3x-2$ is an upward parabola.` },
    { f: x => 4 * x * x - 2, dom: [-1.2, 0.6], color: 'cd', eq: r`y=4x^2-2`, text: 'y = 4x² − 2', at: [0.35, -0.3], dx: 6, dy: 0, say: r`The lower boundary $y=4x^2-2$ is the same parabola with the $-3x$ term removed.` },
    { f: y => -1, dom: [2, 5], orient: 'x', color: 'ca', eq: r`x=-1`, say: r`The left boundary is the vertical line $x=-1$.` }],
  inter: [{ say: r`Where do the parabolas meet? Set them equal. The $4x^2$ and $-2$ cancel, leaving $-3x=0$.`, rows: [r`4x^2-3x-2=4x^2-2`, r`-3x=0`, r`x=0`], boxed: true, c: 'cx' }],
  points: [pt(-1, 2, '(−1, 2)', -10, 8, 'end'), pt(-1, 5, '(−1, 5)', -10, 6, 'end'), pt(0, -2, '(0, −2)', 12, 24)],
  pointsSay: r`The parabolas meet at $(0,-2)$. The line $x=-1$ cuts them at $(-1,2)$ and $(-1,5)$.`,
  region: { top: x => 4 * x * x - 3 * x - 2, bot: x => 4 * x * x - 2, range: [-1, 0] },
  regionSay: r`The region is the thin wedge between the two parabolas, from $x=-1$ to $x=0$.`,
  axis: { kind: 'v', at: -2, text: 'axis x = −2', dx: 8, dy: 18, tex: r`x=-2` },
  axisSay: r`Rotate about the vertical line $x=-2$, to the left of the region.`,
  slice: { at: -0.6, w: 0.05, text: 'dx', tx: -0.57, ty: -1.55, anchor: 'middle' },
  radii: [
    { from: [-2, 0.34], to: [-0.62, 0.34], color: 'cd', text: 'r', dx: 0, dy: -12 },
    { from: [-0.72, -0.15], to: [-0.72, 1.9], color: 'cp', text: 'h', dx: -22, dy: 4 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the lower parabola up to the upper one.`,
  methodSay: r`The strip is parallel to the vertical axis $x=-2$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
  radSteps: [
    { say: r`The radius is the distance from the axis $x=-2$ to the strip at $x$. The strip is to the right of the axis, so $r=x-(-2)=x+2$.`, show: ['rad0'], rows: [r`r=x-(-2)=x+2`], cols: ['cd'] },
    { say: r`The height is top minus bottom: $(4x^2-3x-2)-(4x^2-2)$. The $4x^2$ and $-2$ cancel, leaving $-3x$, positive since $x<0$.`, show: ['rad1'], rows: [r`h=y_{\text{top}}-y_{\text{bottom}}`, r`h=-3x`], cols: ['cp', 'cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference, times height, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi(x+2)(-3x)\,dx`, r`=\pi(-6x^2-12x)\,dx`],
  integral: r`V=\pi\int_{-1}^{0}\big(-6x^2-12x\big)\,dx`,
  integralSay: r`Add up the shells from $x=-1$ to $x=0$.`,
  evalSteps: [
    { say: r`Antiderivative term by term: $-6x^2\to-2x^3$ and $-12x\to-6x^2$.`, rows: [r`=\pi\Big[-2x^3-6x^2\Big]_{-1}^{0}`] },
    { say: r`The upper limit gives 0. At the lower limit $x=-1$: $-2(-1)-6(1)=2-6=-4$.`, rows: [r`=\pi\big(0-(2-6)\big)=4\pi`], boxed: true }],
  answer: r`4\pi`, track: [r`\text{shells about }x=-2`, r`\pi\int_{-1}^{0}(-6x^2-12x)\,dx`, r`4\pi`],
  verify: [{ value: { f: x => 2 * Math.PI * (x + 2) * (-3 * x), a: -1, b: 0, val: 4 * Math.PI } }, { equal: { a: x => (4 * x * x - 3 * x - 2) - (4 * x * x - 2), b: x => -3 * x, range: [-1, 0] } }],
  heli1: [ln(r`\text{about }x=-2`, 'ct')], heli3: [ln(r`\pi\Big[-2x^3-6x^2\Big]_{-1}^{0}`)] }));

/* ===== Problem 6 : washers about y = 2 ===== */
examples.push(volGen({ n: 6, type: 'Washers about y = 2', verb: 'Volume', method: 'washer',
  problem: r`y=-2x^2+4x+2,\;y=-2x^2+x+2,\;x=-1\text{; about }y=2`,
  plot: { xr: [-2.5, 1.9], yr: [-5.4, 3.5], xt: [-2, -1, 1], yt: [-4, -2, 2], w: 640, h: 440 },
  curves: [
    { f: x => -2 * x * x + x + 2, dom: [-1.4, 0.7], color: 'cx', eq: r`y=-2x^2+x+2`, text: 'y = −2x² + x + 2', at: [0.1, 0.6], dx: 12, dy: 6, say: r`Sketch. The upper boundary $y=-2x^2+x+2$ is a downward parabola that passes through $(0,2)$.` },
    { f: x => -2 * x * x + 4 * x + 2, dom: [-1.25, 0.5], color: 'cd', eq: r`y=-2x^2+4x+2`, text: 'y = −2x² + 4x + 2', at: [-2.4, -3.6], dx: 0, dy: 0, say: r`The lower boundary $y=-2x^2+4x+2$ is another downward parabola with the same $-2x^2+2$ part but a steeper linear term.` },
    { f: y => -1, dom: [-4, -1], orient: 'x', color: 'ca', eq: r`x=-1`, say: r`The left boundary is the vertical line $x=-1$.` }],
  inter: [{ say: r`Where do the parabolas meet? Set them equal. The $-2x^2+2$ parts cancel, leaving $4x=x$, so $x=0$.`, rows: [r`4x=x`, r`3x=0`, r`x=0`], boxed: true, c: 'cx' }],
  points: [pt(-1, -4, '(−1, −4)', -10, 8, 'end'), pt(-1, -1, '(−1, −1)', -10, 8, 'end'), pt(0, 2, '(0, 2)', 12, 24)],
  pointsSay: r`The parabolas meet at $(0,2)$. The line $x=-1$ cuts them at $(-1,-4)$ and $(-1,-1)$.`,
  region: { top: x => -2 * x * x + x + 2, bot: x => -2 * x * x + 4 * x + 2, range: [-1, 0] },
  regionSay: r`The region is the sliver between the parabolas, from $x=-1$ to $x=0$. It lies below the line $y=2$.`,
  axis: { kind: 'h', at: 2, text: 'axis y = 2', labAt: [-2.45, 2], dx: 0, dy: -12, tex: r`y=2` },
  axisSay: r`Rotate about the horizontal line $y=2$, which touches the region at $(0,2)$.`,
  slice: { at: -0.55, w: 0.05, text: 'dx', tx: -0.52, ty: -1.55, anchor: 'middle' },
  radii: [
    { from: [-0.72, 2], to: [-0.72, -1.8], color: 'cx', text: 'R', dx: -24, dy: 4 },
    { from: [-0.38, 2], to: [-0.38, 1.28], color: 'cd', text: 'r', dx: 10, dy: 8 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the lower parabola up to the upper one.`,
  methodSay: r`The strip is perpendicular to the horizontal axis $y=2$, so spinning it makes a washer. It has a hole because the strip stays away from the axis.`,
  xsSay: r`Face-on, the washer is a big disk of radius $R$ with a smaller disk of radius $r$ removed. Its area is $\pi R^2-\pi r^2$, times the thickness $dx$.`,
  radSteps: [
    { say: r`The outer radius $R$ is the distance from the axis $y=2$ down to the farther curve, the lower parabola: $R=2-y_{\text{lower}}$.`, show: ['rad0'], rows: [r`R=2-(-2x^2+4x+2)`, r`R=2x^2-4x`], cols: ['cx', 'cx'] },
    { say: r`The inner radius $r$ is the distance to the nearer curve, the upper parabola: $r=2-y_{\text{upper}}$.`, show: ['rad1'], rows: [r`r=2-(-2x^2+x+2)`, r`r=2x^2-x`], cols: ['cd', 'cd'] }],
  dVSay: r`dV = $\pi(R^2-r^2)\,dx$. Difference of squares: $(2x^2-4x)^2-(2x^2-x)^2=(-3x)(4x^2-5x)=-12x^3+15x^2$.`,
  dV: [r`R^2-r^2=-12x^3+15x^2`, r`dV=\pi(R^2-r^2)\,dx`],
  integral: r`V=\pi\int_{-1}^{0}\big(-12x^3+15x^2\big)\,dx`,
  integralSay: r`Add up the washers from $x=-1$ to $x=0$.`,
  evalSteps: [
    { say: r`Antiderivative term by term: $-12x^3\to-3x^4$ and $15x^2\to5x^3$.`, rows: [r`=\pi\Big[-3x^4+5x^3\Big]_{-1}^{0}`] },
    { say: r`The upper limit gives 0. At the lower limit $x=-1$: $-3(1)+5(-1)=-8$.`, rows: [r`=\pi\big(0-(-8)\big)=8\pi`], boxed: true }],
  answer: r`8\pi`, track: [r`\text{washers about }y=2`, r`\pi\int_{-1}^{0}(R^2-r^2)\,dx`, r`8\pi`],
  verify: [{ value: { f: x => Math.PI * ((2 * x * x - 4 * x) ** 2 - (2 * x * x - x) ** 2), a: -1, b: 0, val: 8 * Math.PI } }, { equal: { a: x => (2 * x * x - 4 * x) ** 2 - (2 * x * x - x) ** 2, b: x => -12 * x ** 3 + 15 * x * x, range: [-1, 0] } }],
  heli1: [ln(r`\text{about }y=2`, 'ct')], heli3: [ln(r`\pi\Big[-3x^4+5x^3\Big]_{-1}^{0}`)] }));
