/* Lectures 30 & 31 · Area between curves, Gini index, radial wedges — 20 practice problems. Part A: the geometric ones. */
const examples = [];
const int = T('int', r`\int`);
const pt = (x, y, text, tdx, tdy, anchor) => ({ x, y, text, tdx, tdy, anchor });

/* ===== Problem 4 ===== */
examples.push(areaGen({ verb: 'Area', n: 4, label: 'Problem 4', orient: 'h',
  problem: r`x=\tfrac14\sqrt y,\;x=\tfrac76-\tfrac y6,\;y=0`,
  plot: { xr: [-0.25, 1.45], yr: [-0.6, 5.2], xt: [[0.5, '½'], [1, '1']], yt: [1, 2, 3, 4], w: 600, h: 440 },
  curves: [
    { f: y => Math.sqrt(y) / 4, dom: [0, 5], orient: 'x', color: 'cx', eq: r`x=\tfrac14\sqrt y`, text: 'x = ¼√y', at: [0.43, 4.9], dx: 8, dy: 4, say: r`Start with $x=\tfrac14\sqrt y$: a parabola lying on its side, opening to the right, through the origin.` },
    { f: y => 7 / 6 - y / 6, dom: [0, 5.2], orient: 'x', color: 'cd', eq: r`x=\tfrac76-\tfrac y6`, text: 'x = 7/6 − y/6', at: [0.92, 0.9], dx: 6, dy: -4, say: r`Next the line $x=\tfrac76-\tfrac y6$. At $y=0$ it sits at $x=\tfrac76$ and slopes toward the left as $y$ grows.` },
    { f: x => 0, dom: [0, 7 / 6], color: 'ca', eq: r`y=0`, text: 'y = 0', at: [0.2, 0], dx: 0, dy: 26, say: r`The third boundary is the $x$-axis, $y=0$.` }],
  inter: [{ say: r`The problem tells us the first two curves cross at $\big(\tfrac12,4\big)$. Check it: at $y=4$ both give $x=\tfrac12$.`, rows: [r`\tfrac14\sqrt4=\tfrac12`, r`\tfrac76-\tfrac46=\tfrac12`], c: 'ink' }],
  points: [pt(0.5, 4, '(½, 4)', 10, 4), pt(0, 0, '', 0, 0), pt(7 / 6, 0, '(7/6, 0)', 0, -14, 'middle')],
  pointsSay: r`The corners of the region: $(0,0)$ where the parabola leaves the axis, $\big(\tfrac76,0\big)$ where the line meets the axis, and the crossing at $\big(\tfrac12,4\big)$.`,
  region: { right: y => 7 / 6 - y / 6, left: y => Math.sqrt(y) / 4, range: [0, 4] },
  regionSay: r`The region sits between the parabola on the left and the line on the right, above the $x$-axis, up to the crossing.`,
  strip: { at: 1.6, w: 0.14, text: 'dy', tx: 0.62, ty: 1.55 },
  sliceSay: r`Integrate in $y$: for every $y\in[0,4]$ the line is on the right and the parabola on the left. Vertical strips would need two integrals, since the top boundary changes at $x=\tfrac12$.`,
  height: [r`x_{\text{right}}=\tfrac76-\tfrac y6`, r`x_{\text{left}}=\tfrac14\sqrt y`, r`x_{\text{right}}-x_{\text{left}}=\tfrac76-\tfrac y6-\tfrac14\sqrt y`],
  heightSay: r`The strip's length is right minus left.`,
  integral: r`A=\int_{0}^{4}\Big(\tfrac76-\tfrac y6-\tfrac14\sqrt y\Big)\,dy`,
  integralSay: r`Add up the strips from $y=0$ up to the crossing at $y=4$.`,
  evalSteps: [
    { say: r`Antiderivative term by term: $\tfrac14\sqrt y=\tfrac14y^{1/2}$ integrates to $\tfrac14\cdot\tfrac23y^{3/2}=\tfrac16y^{3/2}$.`, rows: [r`=\Big[\tfrac76y-\tfrac{y^2}{12}-\tfrac16y^{3/2}\Big]_{0}^{4}`] },
    { say: r`Plug in $y=4$. The lower limit gives 0.`, rows: [r`=\tfrac{28}{6}-\tfrac{16}{12}-\tfrac{8}{6}`] },
    { say: r`Common denominator: $\tfrac{14}{3}-\tfrac43-\tfrac43=\tfrac63=2$.`, rows: [r`=\tfrac{14}{3}-\tfrac{4}{3}-\tfrac{4}{3}=2`], boxed: true }],
  answer: r`2`, track: [r`\big(\tfrac12,4\big)`, r`\int_0^4\big(\tfrac76-\tfrac y6-\tfrac14\sqrt y\big)\,dy`, r`2`],
  verify: [{ value: { f: y => 7 / 6 - y / 6 - Math.sqrt(y) / 4, a: 0, b: 4, val: 2 } }],
  heli1: [ln(r`\big(\tfrac12,4\big)\text{ is the crossing}`, 'cx')], heli3: [ln(r`\Big[\tfrac76y-\tfrac{y^2}{12}-\tfrac16y^{3/2}\Big]_0^4`)] }));

/* ===== Problem 5 ===== */
examples.push(areaGen({ verb: 'Area', n: 5, label: 'Problem 5', type: 'Curves that cross',
  problem: r`y=x^3-x,\;y=x-x^3,\;-1\le x\le1`,
  plot: { xr: [-1.7, 1.7], yr: [-0.95, 0.95], xt: [-1, 1], yt: [[-0.5, '−½'], [0.5, '½']], w: 620, h: 420 },
  curves: [
    { f: x => x * x * x - x, dom: [-1.3, 1.3], color: 'cx', eq: r`y=x^3-x`, text: 'y = x³ − x', at: [0.95, -0.55], dx: 12, dy: 18, say: r`The cubic $y=x^3-x$ crosses the axis at $-1$, $0$ and $1$. It bumps up on the left and down on the right.` },
    { f: x => x - x * x * x, dom: [-1.3, 1.3], color: 'cd', eq: r`y=x-x^3`, text: 'y = x − x³', at: [0.95, 0.55], dx: 12, dy: -6, say: r`Its mirror image $y=x-x^3$ bumps down on the left and up on the right. They are reflections of each other across the $x$-axis.` }],
  inter: [
    { say: r`Where do the curves meet? Set them equal.`, rows: [r`x^3-x=x-x^3`] },
    { say: r`Collect and factor completely.`, rows: [r`2x^3-2x=0`, r`2x(x-1)(x+1)=0`] },
    { say: r`Three crossings, and they are all on the $x$-axis.`, rows: [r`x=-1,\ 0,\ 1`], boxed: true, c: 'cx' }],
  points: [pt(-1, 0, '(−1, 0)', -4, 22, 'end'), pt(0, 0, '(0, 0)', 8, 22), pt(1, 0, '(1, 0)', 6, 22)],
  pointsSay: r`The curves cross at $x=-1$, $x=0$ and $x=1$.`,
  region: { top: x => Math.max(x * x * x - x, x - x * x * x), bot: x => Math.min(x * x * x - x, x - x * x * x), range: [-1, 1] },
  regionSay: r`The region is two lens-shaped pieces, one on each side of $x=0$.`,
  strip: { at: -0.62, w: 0.07, text: 'dx', tx: -0.62, ty: -0.58, anchor: 'middle' }, stripExtra: ['strip2'],
  extra: P => P.rect('strip2', 0.55, -0.385, 0.62, 0.385, 'cp', { opacity: .55, minW: 5 }),
  sliceSay: r`Vertical strips work, but the roles of top and bottom swap at $x=0$: on $[-1,0]$ the cubic $x^3-x$ is on top, on $[0,1]$ it is $x-x^3$. We need one integral per side.`,
  height: [[r`(x^3-x)-(x-x^3)`, r`=2x^3-2x`], [r`(x-x^3)-(x^3-x)`, r`=2x-2x^3`]],
  heightSay: r`Top minus bottom: the first row is for $[-1,0]$, the second for $[0,1]$. Both are positive, as areas must be.`,
  integral: [r`A=\int_{-1}^{0}(2x^3-2x)\,dx`, r`\quad+\int_{0}^{1}(2x-2x^3)\,dx`],
  integralSay: r`Split the integral at the crossing point $x=0$.`,
  evalSteps: [
    { say: r`Antiderivatives: $\tfrac{x^4}{2}-x^2$ on the left, $x^2-\tfrac{x^4}{2}$ on the right.`, rows: [r`=\Big[\tfrac{x^4}{2}-x^2\Big]_{-1}^{0}+\Big[x^2-\tfrac{x^4}{2}\Big]_{0}^{1}`] },
    { say: r`Left piece: $0-\big(\tfrac12-1\big)=\tfrac12$. Right piece: $\big(1-\tfrac12\big)-0=\tfrac12$.`, rows: [r`=\tfrac12+\tfrac12=1`], boxed: true }],
  answer: r`1`, track: [r`x=-1,\,0,\,1`, r`\text{two integrals, split at }x=0`, r`1`],
  verify: [{ value: { f: x => Math.abs(2 * x - 2 * x * x * x), a: -1, b: 1, val: 1, n: 40000 } }],
  heli1: [ln(r`x=-1,\,0,\,1`, 'cx')], heli3: [ln(r`\tfrac12+\tfrac12`)] }));

/* ===== Problem 6 ===== */
const reg67 = { top: x => 5 / 3 - 7 * x / 24, bot: x => Math.sqrt(x) / 4, range: [0, 4] };
const plot67 = { xr: [-0.6, 5.3], yr: [-0.3, 2.1], xt: [1, 2, 3, 4, 5], yt: [[0.5, '½'], [1, '1'], [1.5, '1½']], w: 620, h: 420 };
examples.push(areaGen({ verb: 'Area', n: 6, label: 'Problem 6', type: 'Solve for y first',
  problem: r`x=16y^2,\;x=-\tfrac{24}{7}y+\tfrac{40}{7},\;x=0`,
  plot: plot67,
  curves: [
    { f: x => Math.sqrt(x) / 4, dom: [0, 5.2], color: 'cx', eq: r`x=16y^2`, text: 'x = 16y²', at: [4.3, 0.52], dx: 8, dy: 16, say: r`The parabola $x=16y^2$ lies on its side. For $y\ge0$ it is the curve $y=\tfrac{\sqrt x}{4}$.` },
    { f: x => 5 / 3 - 7 * x / 24, dom: [0, 5.2], color: 'cd', eq: r`x=-\tfrac{24}{7}y+\tfrac{40}{7}`, text: 'x = −(24/7)y + 40/7', at: [0.2, 1.62], dx: 70, dy: -10, say: r`The line $x=-\tfrac{24}{7}y+\tfrac{40}{7}$, solved for $y$, is $y=\tfrac53-\tfrac{7x}{24}$. It meets the $y$-axis at $y=\tfrac53$.` },
    { f: y => 0, dom: [0, 5 / 3], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The third boundary, $x=0$, is the $y$-axis itself.` }],
  inter: [{ say: r`The problem tells us the first two curves cross at $\big(4,\tfrac12\big)$. Check it in the form $y(x)$.`, rows: [r`\tfrac{\sqrt4}{4}=\tfrac12`, r`\tfrac53-\tfrac{7\cdot4}{24}=\tfrac12`] }],
  points: [pt(4, 0.5, '(4, ½)', 10, -8), pt(0, 0, '', 0, 0), pt(0, 5 / 3, '(0, 5/3)', 10, 4)],
  pointsSay: r`The corners of the region: $(0,0)$, $\big(0,\tfrac53\big)$ on the $y$-axis, and the crossing at $\big(4,\tfrac12\big)$.`,
  region: reg67, regionSay: r`The region is bounded on the left by the $y$-axis, below by the parabola and above by the line.`,
  strip: { at: 1.6, w: 0.16, text: 'dx', tx: 1.68, ty: 0.12, anchor: 'middle' },
  sliceSay: r`Integrate in $x$: a vertical strip has the line on top and the parabola below for every $x\in[0,4]$. Horizontal strips would start at the $y$-axis above $y=\tfrac12$ but at the parabola below it: two integrals.`,
  height: [r`y_{\text{top}}=\tfrac53-\tfrac{7x}{24}`, r`y_{\text{bottom}}=\tfrac{\sqrt x}{4}`, r`y_{\text{top}}-y_{\text{bottom}}=\tfrac53-\tfrac{7x}{24}-\tfrac{\sqrt x}{4}`],
  heightSay: r`The strip's height is top minus bottom.`,
  integral: r`A=\int_{0}^{4}\Big(\tfrac53-\tfrac{7x}{24}-\tfrac{\sqrt x}{4}\Big)\,dx`,
  integralSay: r`Add up the strips from $x=0$ to the crossing at $x=4$.`,
  evalSteps: [
    { say: r`Antiderivative term by term: $\tfrac{\sqrt x}{4}$ integrates to $\tfrac14\cdot\tfrac23x^{3/2}=\tfrac{x^{3/2}}{6}$.`, rows: [r`=\Big[\tfrac53x-\tfrac{7x^2}{48}-\tfrac{x^{3/2}}{6}\Big]_{0}^{4}`] },
    { say: r`Plug in $x=4$. The lower limit gives 0.`, rows: [r`=\tfrac{20}{3}-\tfrac{7\cdot16}{48}-\tfrac{8}{6}`] },
    { say: r`Simplify each piece: $\tfrac{20}{3}-\tfrac73-\tfrac43=\tfrac93=3$.`, rows: [r`=\tfrac{20}{3}-\tfrac73-\tfrac43=3`], boxed: true }],
  answer: r`3`, track: [r`\big(4,\tfrac12\big)`, r`\int_0^4(\text{line}-\text{parabola})\,dx`, r`3`],
  verify: [{ value: { f: x => 5 / 3 - 7 * x / 24 - Math.sqrt(x) / 4, a: 0, b: 4, val: 3 } }],
  heli1: [ln(r`y=\tfrac{\sqrt x}{4},\;y=\tfrac53-\tfrac{7x}{24}`, 'cx')], heli3: [ln(r`\Big[\tfrac53x-\tfrac{7x^2}{48}-\tfrac{x^{3/2}}{6}\Big]_0^4`)] }));

/* ===== Problem 7 ===== */
examples.push(areaGen({ verb: 'Area', n: 7, label: 'Problem 7', type: 'Area between curves',
  problem: r`y=\tfrac14\sqrt x,\;y=\tfrac53-\tfrac{7}{24}x,\;x=0`,
  plot: plot67,
  curves: [
    { f: x => Math.sqrt(x) / 4, dom: [0, 5.2], color: 'cx', eq: r`y=\tfrac14\sqrt x`, text: 'y = ¼√x', at: [4.3, 0.52], dx: 8, dy: 16, say: r`The curve $y=\tfrac14\sqrt x$ is the top half of a sideways parabola, starting at the origin.` },
    { f: x => 5 / 3 - 7 * x / 24, dom: [0, 5.2], color: 'cd', eq: r`y=\tfrac53-\tfrac{7}{24}x`, text: 'y = 5/3 − (7/24)x', at: [0.3, 1.62], dx: 60, dy: -10, say: r`The line $y=\tfrac53-\tfrac7{24}x$ starts at height $\tfrac53$ on the $y$-axis and falls with slope $-\tfrac{7}{24}$.` },
    { f: y => 0, dom: [0, 5 / 3], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The third boundary, $x=0$, is the $y$-axis.` }],
  inter: [{ say: r`The problem says the first two curves cross at $\big(4,\tfrac12\big)$. Check: both give $y=\tfrac12$ at $x=4$.`, rows: [r`\tfrac{\sqrt4}{4}=\tfrac12=\tfrac53-\tfrac{7\cdot4}{24}`] }],
  points: [pt(4, 0.5, '(4, ½)', 10, -8), pt(0, 0, '', 0, 0), pt(0, 5 / 3, '(0, 5/3)', 10, 4)],
  pointsSay: r`The corners of the region: $(0,0)$, $\big(0,\tfrac53\big)$ and the crossing $\big(4,\tfrac12\big)$.`,
  region: reg67, regionSay: r`The region is bounded on the left by the $y$-axis, below by the parabola and above by the line.`,
  strip: { at: 1.6, w: 0.16, text: 'dx', tx: 1.68, ty: 0.12, anchor: 'middle' },
  sliceSay: r`Integrate in $x$: a vertical strip always has the line on top and the parabola below, from $x=0$ to $x=4$. Horizontal strips would change their left boundary at $y=\tfrac12$, which forces two integrals.`,
  height: [r`y_{\text{top}}=\tfrac53-\tfrac{7x}{24}`, r`y_{\text{bottom}}=\tfrac{\sqrt x}{4}`, r`y_{\text{top}}-y_{\text{bottom}}=\tfrac53-\tfrac{7x}{24}-\tfrac{\sqrt x}{4}`],
  heightSay: r`The strip's height is top minus bottom.`,
  integral: r`A=\int_{0}^{4}\Big(\tfrac53-\tfrac{7x}{24}-\tfrac{\sqrt x}{4}\Big)\,dx`,
  integralSay: r`Add up the strips from $x=0$ to $x=4$. (This is the same region as Problem 6, described by $y$ instead of $x$.)`,
  evalSteps: [
    { say: r`Integrate each term: $\int\tfrac{\sqrt x}{4}\,dx=\tfrac{x^{3/2}}{6}$.`, rows: [r`=\Big[\tfrac53x-\tfrac{7x^2}{48}-\tfrac{x^{3/2}}{6}\Big]_{0}^{4}`] },
    { say: r`Plug in $x=4$. The lower limit gives 0.`, rows: [r`=\tfrac{20}{3}-\tfrac{7}{3}-\tfrac{4}{3}`] },
    { say: r`The three fractions combine to $\tfrac93=3$.`, rows: [r`=3`], boxed: true }],
  answer: r`3`, track: [r`\big(4,\tfrac12\big)`, r`\int_0^4(\text{line}-\text{parabola})\,dx`, r`3`],
  verify: [{ value: { f: x => 5 / 3 - 7 * x / 24 - Math.sqrt(x) / 4, a: 0, b: 4, val: 3 } }],
  heli1: [ln(r`\big(4,\tfrac12\big)\text{ is the crossing}`, 'cx')], heli3: [ln(r`\Big[\tfrac53x-\tfrac{7x^2}{48}-\tfrac{x^{3/2}}{6}\Big]_0^4`)] }));

/* ===== Problem 8 ===== */
examples.push(areaGen({ verb: 'Area', n: 8, label: 'Problem 8', type: 'Needs integration by parts',
  problem: r`y=xe^x,\;y=e^x,\;x=0`,
  plot: { xr: [-1.3, 2.1], yr: [-0.6, 5.2], xt: [-1, 1, 2], yt: [1, 2, 3, 4, 5], w: 600, h: 440 },
  curves: [
    { f: x => Math.exp(x), dom: [-1.2, 1.6], color: 'cx', eq: r`y=e^x`, text: 'y = eˣ', at: [-1, 0.37], dx: -4, dy: -10, say: r`The exponential $y=e^x$ passes through $(0,1)$ and grows quickly.` },
    { f: x => x * Math.exp(x), dom: [-1.2, 1.3], color: 'cd', eq: r`y=xe^x`, text: 'y = xeˣ', at: [1.15, 3.6], dx: 8, dy: 22, say: r`The curve $y=xe^x$ passes through the origin and, for $x>0$, grows faster than $e^x$.` },
    { f: y => 0, dom: [0, 5 / 3], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The third boundary, $x=0$, is the $y$-axis.` }],
  inter: [
    { say: r`Where do $y=xe^x$ and $y=e^x$ meet? Set them equal.`, rows: [r`xe^x=e^x`] },
    { say: r`Divide by $e^x$. It is never 0, so nothing is lost.`, rows: [r`x=1`], boxed: true, c: 'cx' }],
  points: [pt(1, Math.E, '(1, e)', 10, -8), pt(0, 1, '(0, 1)', -10, -10, 'end'), pt(0, 0, '', 0, 0)],
  pointsSay: r`They meet at $x=1$, at the point $(1,e)$. At the $y$-axis the two curves are at heights 1 and 0.`,
  region: { top: x => Math.exp(x), bot: x => x * Math.exp(x), range: [0, 1] },
  regionSay: r`The region lies between $x=0$ and $x=1$, with $e^x$ above $xe^x$ (at $x=0$: 1 versus 0).`,
  strip: { at: 0.45, w: 0.06, text: 'dx', tx: 0.48, ty: 0.7, anchor: 'middle' },
  sliceSay: r`Vertical strips: $e^x$ is on top and $xe^x$ on the bottom for every $x\in[0,1]$. One integral.`,
  height: [r`y_{\text{top}}=e^x`, r`y_{\text{bottom}}=xe^x`, r`y_{\text{top}}-y_{\text{bottom}}=e^x-xe^x`],
  heightSay: r`The strip's height is top minus bottom.`,
  integral: r`A=\int_{0}^{1}\big(e^x-xe^x\big)\,dx`,
  integralSay: r`Add up the strips from $x=0$ to $x=1$.`,
  evalSteps: [
    { say: r`Split into two integrals. The first is immediate. The second needs integration by parts.`, rows: [r`=\int_0^1e^x\,dx-\int_0^1xe^x\,dx`] },
    { say: r`$\int_0^1e^x\,dx=e-1$. For the second, take $u=x$ and $dv=e^x\,dx$, so $\int xe^x\,dx=xe^x-\int e^x\,dx=xe^x-e^x$.`, rows: [r`=(e-1)-\Big[xe^x-e^x\Big]_0^1`] },
    { say: r`At $x=1$: $e-e=0$. At $x=0$: $0-1=-1$. So the bracket equals $0-(-1)=1$.`, rows: [r`=(e-1)-\big(0-(-1)\big)=(e-1)-1`] },
    { say: r`The area is $e-2\approx0.718$.`, rows: [r`=e-2`], boxed: true }],
  answer: r`e-2`, track: [r`x=1`, r`\int_0^1(e^x-xe^x)\,dx`, r`e-2`],
  verify: [{ value: { f: x => Math.exp(x) - x * Math.exp(x), a: 0, b: 1, val: Math.E - 2 } }],
  heli1: [ln(r`xe^x=e^x\Rightarrow x=1`, 'cx')], heli3: [ln(r`\int xe^x=xe^x-e^x`, 'muted'), ln(r`(e-1)-1`)] }));

/* ===== Problem 9 ===== */
examples.push(areaGen({ verb: 'Area', n: 9, label: 'Problem 9', type: 'Symmetry', 
  problem: r`\text{where }y^2\le x^2-x^4`,
  plot: { xr: [-1.6, 1.6], yr: [-0.85, 0.85], xt: [-1, 1], yt: [[-0.5, '−½'], [0.5, '½']], w: 640, h: 400 },
  curves: [
    { f: x => Math.abs(x) * Math.sqrt(Math.max(0, 1 - x * x)), dom: [-1, 1], n: 240, color: 'cx', eq: r`y=|x|\sqrt{1-x^2}`, text: 'y = |x|√(1−x²)', at: [0.55, 0.5], dx: 10, dy: -14, say: r`The boundary is $y^2=x^2-x^4$. Taking square roots gives two curves. The upper one is $y=|x|\sqrt{1-x^2}$, a pair of hills over $[-1,1]$.` },
    { f: x => -Math.abs(x) * Math.sqrt(Math.max(0, 1 - x * x)), dom: [-1, 1], n: 240, color: 'cd', eq: r`y=-|x|\sqrt{1-x^2}`, text: 'y = −|x|√(1−x²)', at: [0.9, -0.38], dx: 10, dy: 30, say: r`The lower one, $y=-|x|\sqrt{1-x^2}$, is its mirror image across the $x$-axis. Together they make a figure eight.` }],
  inter: [
    { say: r`Rewrite the inequality. Factor the right side.`, rows: [r`y^2\le x^2-x^4`, r`y^2\le x^2(1-x^2)`] },
    { say: r`Square-root both sides. Real values need $1-x^2\ge0$, so $|x|\le1$.`, rows: [r`|y|\le|x|\sqrt{1-x^2}`, r`-1\le x\le1`], boxed: true, c: 'cx' }],
  points: [pt(-1, 0, '(−1, 0)', -4, 22, 'end'), pt(0, 0, '(0, 0)', 8, 22), pt(1, 0, '(1, 0)', 6, 22)],
  pointsSay: r`The lobes meet at the origin and end at $(\pm1,0)$.`,
  region: { top: x => Math.abs(x) * Math.sqrt(Math.max(0, 1 - x * x)), bot: x => -Math.abs(x) * Math.sqrt(Math.max(0, 1 - x * x)), range: [-1, 1] },
  regionSay: r`The region $y^2\le x^2-x^4$ is everything inside the figure eight.`,
  strip: { at: 0.55, w: 0.05, text: 'dx', tx: 0.58, ty: -0.58, anchor: 'middle' },
  sliceSay: r`Vertical strips run from the lower curve to the upper curve at every $x\in[-1,1]$, so one integral covers both lobes.`,
  height: [r`y_{\text{top}}=|x|\sqrt{1-x^2}`, r`y_{\text{bottom}}=-|x|\sqrt{1-x^2}`, r`\text{height}=2|x|\sqrt{1-x^2}`],
  heightSay: r`The strip's height is top minus bottom: twice the upper curve.`,
  integral: [r`A=\int_{-1}^{1}2|x|\sqrt{1-x^2}\,dx`, r`\;=4\int_0^1x\sqrt{1-x^2}\,dx`],
  integralSay: r`The integrand is even, so the left half equals the right half: $2\times2=4$ times the integral over $[0,1]$, where $|x|=x$.`,
  evalSteps: [
    { say: r`Use the substitution $u=1-x^2$, so $du=-2x\,dx$ and $x\,dx=-\tfrac{du}{2}$. When $x$ runs from 0 to 1, $u$ runs from 1 down to 0.`, rows: [r`=4\int_{u=1}^{u=0}\sqrt u\,\Big(-\tfrac{du}{2}\Big)`] },
    { say: r`Flip the limits to remove the minus sign, and pull out the $\tfrac12$: $4\cdot\tfrac12=2$.`, rows: [r`=2\int_0^1u^{1/2}\,du`] },
    { say: r`$\int u^{1/2}\,du=\tfrac23u^{3/2}$, and $2\cdot\tfrac23=\tfrac43$.`, rows: [r`=2\Big[\tfrac23u^{3/2}\Big]_0^1=\tfrac43\approx1.33`], boxed: true }],
  answer: r`\tfrac43\approx1.33`, track: [r`|x|\le1`, r`4\int_0^1x\sqrt{1-x^2}\,dx`, r`\tfrac43\approx1.33`],
  verify: [{ value: { f: x => 4 * x * Math.sqrt(1 - x * x), a: 0, b: 1, val: 4 / 3, n: 80000, tol: 1e-5 } }],
  heli1: [ln(r`|y|\le|x|\sqrt{1-x^2}`, 'cx')], heli3: [ln(r`u=1-x^2`, 'muted'), ln(r`2\Big[\tfrac23u^{3/2}\Big]_0^1`)] }));
