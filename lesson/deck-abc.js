/* Problem Set: Area Between Curves · problems 1-9: warm-up, areas between curves, the Gini index */
const examples = [];
{
const PI = Math.PI, E = Math.E, sin = Math.sin, cos = Math.cos;
const pt = (x, y, text, tdx, tdy, anchor) => ({ x, y, text, tdx, tdy, anchor });
const byParts = (u, dv, du, v) => [eyebrow('bp', 'Integration by parts'), R('side', T('bu', u, 'cx')), R('side', T('bd', dv, 'cd')), R('side', T('bdu', du, 'cx')), R('side', T('bv', v, 'cd'))];
const vals = (head, ...rows) => [eyebrow('vl', head), ...rows.map((t, i) => R('side', T('v' + i, t, 'ct')))];

/* ===== 1 : parabola and line, integrate in x ===== */
examples.push(areaGen({ verb: 'Find', n: 1, label: 'Problem 1', type: 'Parabola and line · integrate in x',
  problem: r`y=x^2,\;y=2x+3`,
  plot: { xr: [-2, 4], yr: [-1.5, 11], xt: [-1, 1, 2, 3], yt: [3, 6, 9], w: 620, h: 420 },
  curves: [
    { f: x => x * x, dom: [-1.7, 3.3], color: 'cx', eq: r`y=x^2`, text: 'y = x²', at: [3.3, 10.9], dx: -84, dy: 10, say: r`Sketch first. $y=x^2$ is the parabola with its vertex at the origin, opening upward.` },
    { f: x => 2 * x + 3, dom: [-2, 3.9], color: 'cd', eq: r`y=2x+3`, text: 'y = 2x + 3', at: [-1.9, -0.8], dx: 6, dy: 16, say: r`Next the line $y=2x+3$. It crosses the $y$-axis at 3 and rises 2 for every 1 step to the right.` }],
  inter: [
    { say: r`Where do they meet? Set the two heights equal.`, rows: [r`x^2=2x+3`] },
    { say: r`Move everything to one side and factor.`, rows: [r`x^2-2x-3=0`, r`(x-3)(x+1)=0`] },
    { say: r`Two crossings, so the region runs from $x=-1$ to $x=3$.`, rows: [r`x=-1,\ 3`], boxed: true, c: 'cx' }],
  points: [pt(-1, 1, '(−1, 1)', -10, 22, 'end'), pt(3, 9, '(3, 9)', 10, 22)],
  pointsSay: r`Plug each $x$ into either formula to get the two points of intersection: $(-1,1)$ and $(3,9)$.`,
  region: { top: x => 2 * x + 3, bot: x => x * x, range: [-1, 3] },
  regionSay: r`Between the crossings the line is above the parabola (at $x=0$: 3 versus 0). That is the region.`,
  strip: { at: 0.6, w: 0.2, text: 'dx', tx: 0.95, ty: 2.3 },
  sliceSay: r`The problem says to integrate with respect to $x$, so use thin vertical strips of width $dx$. Each strip runs from the parabola up to the line.`,
  height: [r`y_{\text{top}}=2x+3`, r`y_{\text{bottom}}=x^2`, r`y_{\text{top}}-y_{\text{bottom}}=2x+3-x^2`],
  heightSay: r`The strip's height is top minus bottom.`,
  integral: r`A=\int_{-1}^{3}\big(2x+3-x^2\big)\,dx`,
  integralSay: r`Add up the strips from $x=-1$ to $x=3$.`,
  evalSteps: [
    { say: r`Integrate term by term: $2x\to x^2$, $3\to3x$ and $x^2\to\tfrac{x^3}{3}$.`, rows: [r`=\Big[x^2+3x-\tfrac{x^3}{3}\Big]_{-1}^{3}`] },
    { say: r`Plug in $x=3$, then subtract the value at $x=-1$.`, rows: [r`=\Big(9+9-9\Big)-\Big(1-3+\tfrac13\Big)`] },
    { say: r`The first bracket is 9, the second is $-2+\tfrac13=-\tfrac53$. Subtracting a negative adds: $9+\tfrac53=\tfrac{32}{3}$.`, rows: [r`=9-\Big(-\tfrac53\Big)=\tfrac{32}{3}`], boxed: true }],
  answer: r`\tfrac{32}{3}`, track: [r`x=-1,\,3`, r`\int_{-1}^{3}(2x+3-x^2)\,dx`, r`\tfrac{32}{3}`],
  verify: [{ value: { f: x => 2 * x + 3 - x * x, a: -1, b: 3, val: 32 / 3 } }, { num: { a: 9 + 5 / 3, b: 32 / 3 } }],
  heli1: [ln(r`x^2=2x+3\Rightarrow x=-1,\,3`, 'cx')], heli3: [ln(r`\Big[x^2+3x-\tfrac{x^3}{3}\Big]_{-1}^{3}`)] }));

/* ===== 2 : parabola and line, integrate in y ===== */
examples.push(areaGen({ verb: 'Find', n: 2, label: 'Problem 2', type: 'Parabola and line · integrate in y', orient: 'h',
  problem: r`x=y^2,\;y=x-2`,
  plot: { xr: [-0.9, 5.6], yr: [-2, 2.8], xt: [1, 2, 3, 4, 5], yt: [-1, 1, 2], w: 620, h: 420 },
  curves: [
    { f: y => y * y, dom: [-1.9, 2.4], orient: 'x', color: 'cx', eq: r`x=y^2`, text: 'x = y²', at: [3.4, -1.75], dx: 6, dy: 4, say: r`$x=y^2$ is a parabola lying on its side: $x$ is a function of $y$, with its vertex at the origin, opening to the right.` },
    { f: y => y + 2, dom: [-2, 2.8], orient: 'x', color: 'cd', eq: r`y=x-2`, text: 'y = x − 2', at: [0, -1.9], dx: -80, dy: 8, say: r`The line $y=x-2$ has slope 1 and crosses the $x$-axis at 2. Because we integrate in $y$, solve it for $x$: $x=y+2$.` }],
  inter: [
    { say: r`Put the line in the form $x=y+2$ and set it equal to the parabola.`, rows: [r`y^2=y+2`] },
    { say: r`Move everything to one side and factor.`, rows: [r`y^2-y-2=0`, r`(y-2)(y+1)=0`] },
    { say: r`The region runs from $y=-1$ to $y=2$.`, rows: [r`y=-1,\ 2`], boxed: true, c: 'cx' }],
  points: [pt(1, -1, '(1, −1)', 12, 6), pt(4, 2, '(4, 2)', 10, 22)],
  pointsSay: r`The matching $x$-values come from $x=y^2$: the curves cross at $(1,-1)$ and $(4,2)$.`,
  region: { right: y => y + 2, left: y => y * y, range: [-1, 2] },
  regionSay: r`The line is on the right and the parabola on the left, between the two crossings.`,
  strip: { at: 0.3, w: 0.14, text: 'dy', tx: 2.5, ty: 0.34 },
  sliceSay: r`The problem asks for $y$, so use horizontal strips of height $dy$. For every $y$ from $-1$ to 2 the line is on the right. In $x$ this region would need two integrals, split at $x=1$.`,
  height: [r`x_{\text{right}}=y+2`, r`x_{\text{left}}=y^2`, r`x_{\text{right}}-x_{\text{left}}=y+2-y^2`],
  heightSay: r`The strip's length is right minus left.`,
  integral: r`A=\int_{-1}^{2}\big(y+2-y^2\big)\,dy`,
  integralSay: r`Add up the strips from $y=-1$ to $y=2$.`,
  evalSteps: [
    { say: r`Integrate term by term: $y\to\tfrac{y^2}{2}$, $2\to2y$ and $y^2\to\tfrac{y^3}{3}$.`, rows: [r`=\Big[\tfrac{y^2}{2}+2y-\tfrac{y^3}{3}\Big]_{-1}^{2}`] },
    { say: r`At $y=2$: $2+4-\tfrac83=\tfrac{10}{3}$. At $y=-1$: $\tfrac12-2+\tfrac13=-\tfrac76$.`, rows: [r`=\Big(2+4-\tfrac83\Big)-\Big(\tfrac12-2+\tfrac13\Big)`] },
    { say: r`Subtracting a negative adds: $\tfrac{10}{3}+\tfrac76=\tfrac{20}{6}+\tfrac76=\tfrac{27}{6}=\tfrac92$.`, rows: [r`=\tfrac{10}{3}+\tfrac76=\tfrac92`], boxed: true }],
  answer: r`\tfrac92`, track: [r`y=-1,\,2`, r`\int_{-1}^{2}(y+2-y^2)\,dy`, r`\tfrac92`],
  verify: [{ value: { f: y => y + 2 - y * y, a: -1, b: 2, val: 4.5 } }, { num: { a: 10 / 3 + 7 / 6, b: 4.5 } }],
  heli1: [ln(r`y^2=y+2\Rightarrow y=-1,\,2`, 'cx')], heli3: [ln(r`\Big[\tfrac{y^2}{2}+2y-\tfrac{y^3}{3}\Big]_{-1}^{2}`)] }));

/* ===== 3 : x/(x^2+1) and x/2, two pieces ===== */
const rat = x => x / (x * x + 1);
examples.push(areaGen({ verb: 'Find', n: 3, label: 'Problem 3', type: 'Two pieces · odd symmetry',
  problem: r`y=\tfrac{x}{x^2+1},\;y=\tfrac x2`,
  plot: { xr: [-1.8, 1.8], yr: [-0.75, 0.75], xt: [-1, 1], yt: [[0.5, '½'], [-0.5, '−½']], w: 640, h: 400 },
  curves: [
    { f: rat, dom: [-1.7, 1.7], color: 'cx', eq: r`y=\tfrac{x}{x^2+1}`, text: 'y = x/(x²+1)', at: [1.35, rat(1.35)], dx: 6, dy: 30, say: r`The curve $y=\tfrac{x}{x^2+1}$ is odd: it rises to a peak of $\tfrac12$ at $x=1$, then slowly falls back toward the axis.` },
    { f: x => x / 2, dom: [-1.3, 1.3], color: 'cd', eq: r`y=\tfrac x2`, text: 'y = x/2', at: [1.3, 0.65], dx: 6, dy: -8, say: r`The line $y=\tfrac x2$ passes through the origin. Both are odd functions, so each graph is symmetric about the origin.` }],
  inter: [
    { say: r`Set the two heights equal.`, rows: [r`\tfrac{x}{x^2+1}=\tfrac x2`] },
    { say: r`$x=0$ works. For $x\neq0$ divide both sides by $x$ and cross-multiply.`, rows: [r`x=0\ \text{ or }\ x^2+1=2`] },
    { say: r`Solve $x^2=1$. Three crossings.`, rows: [r`x=-1,\ 0,\ 1`], boxed: true, c: 'cx' }],
  points: [pt(-1, -0.5, '(−1, −½)', 10, 24), pt(0, 0, '', 0, 0), pt(1, 0.5, '(1, ½)', -10, -12, 'end')],
  pointsSay: r`The curves cross at $x=-1$, $0$ and $1$. Three crossings give two pieces, as the problem says.`,
  region: { top: x => Math.max(rat(x), x / 2), bot: x => Math.min(rat(x), x / 2), range: [-1, 1] },
  regionSay: r`The region is two lens-shaped pieces, one on each side of the origin.`,
  strip: { at: 0.5, w: 0.06, text: 'dx', tx: 0.56, ty: 0.32 }, stripExtra: ['strip2'],
  extra: P => P.rect('strip2', -0.56, rat(-0.53), -0.5, -0.265, 'cp', { opacity: .55, minW: 5 }),
  sliceSay: r`Vertical strips, but top and bottom swap at the origin: on $[0,1]$ the rational curve is on top, on $[-1,0]$ the line is. The two pieces are mirror images through the origin, so double the right piece.`,
  height: [r`y_{\text{top}}=\tfrac{x}{x^2+1}`, r`y_{\text{bottom}}=\tfrac x2`, r`y_{\text{top}}-y_{\text{bottom}}=\tfrac{x}{x^2+1}-\tfrac x2`],
  heightSay: r`On $[0,1]$ the height is top minus bottom.`,
  integral: r`A=2\int_{0}^{1}\Big(\tfrac{x}{x^2+1}-\tfrac x2\Big)\,dx`,
  integralSay: r`Twice the right piece, with the strips running from $x=0$ to $x=1$.`,
  evalSteps: [
    { say: r`Let $u=x^2+1$, so $\tfrac{x}{x^2+1}\,dx=\tfrac{du}{2u}$, which integrates to $\tfrac12\ln(x^2+1)$. The second term gives $\tfrac{x^2}{4}$.`, rows: [r`=2\Big[\tfrac12\ln\big(x^2+1\big)-\tfrac{x^2}{4}\Big]_{0}^{1}`] },
    { say: r`Plug in $x=1$. At $x=0$ everything is 0, since $\ln1=0$.`, rows: [r`=2\Big[\Big(\tfrac12\ln2-\tfrac14\Big)-0\Big]`] },
    { say: r`Distribute the 2: the area is $\ln2-\tfrac12\approx0.193$.`, rows: [r`=\ln2-\tfrac12\approx0.193`], boxed: true }],
  answer: r`\ln2-\tfrac12\approx0.193`, track: [r`x=-1,\,0,\,1`, r`2\int_0^1\big(\tfrac{x}{x^2+1}-\tfrac x2\big)dx`, r`\ln2-\tfrac12`],
  verify: [{ value: { f: x => 2 * (rat(x) - x / 2), a: 0, b: 1, val: Math.log(2) - 0.5 } }, { value: { f: x => Math.abs(rat(x) - x / 2), a: -1, b: 1, val: Math.log(2) - 0.5, n: 40000 } }, { anti: { F: x => 0.5 * Math.log(x * x + 1), f: rat, range: [0.05, 0.95] } }],
  heli1: [ln(r`x=-1,\,0,\,1`, 'cx')], heli3: [ln(r`u=x^2+1`, 'muted'), ln(r`2\Big[\tfrac12\ln(x^2+1)-\tfrac{x^2}{4}\Big]_0^1`)] }));

/* ===== 4 : cos x and cos^3 x ===== */
examples.push(areaGen({ verb: 'Find', n: 4, label: 'Problem 4', type: 'Cosine and cosine cubed · trig powers',
  problem: r`y=\cos x,\;y=\cos^3x,\;\big[-\tfrac\pi2,\tfrac\pi2\big]`,
  plot: { xr: [-1.9, 1.9], yr: [-0.35, 1.3], xt: [[-PI / 2, '−π/2'], [PI / 2, 'π/2']], yt: [1], w: 640, h: 400 },
  curves: [
    { f: cos, dom: [-PI / 2, PI / 2], color: 'cx', eq: r`y=\cos x`, text: 'y = cos x', at: [-1.2, cos(1.2)], dx: -80, dy: -10, say: r`$y=\cos x$ is the familiar arch: height 1 at $x=0$, falling to 0 at $x=\pm\tfrac\pi2$.` },
    { f: x => cos(x) ** 3, dom: [-PI / 2, PI / 2], color: 'cd', eq: r`y=\cos^3x`, text: 'y = cos³x', at: [-0.4, 0.4], dx: 0, dy: 0, say: r`$y=\cos^3x$ is cosine cubed. Since $0\le\cos x\le1$ here, cubing makes it smaller, so it hugs the axis. The curves touch at the peak.` }],
  inter: [
    { say: r`Set the curves equal and factor out the common $\cos x$.`, rows: [r`\cos x=\cos^3x`, r`\cos x\,\big(1-\cos^2x\big)=0`] },
    { say: r`Use $1-\cos^2x=\sin^2x$. The product is 0 when $\cos x=0$ or $\sin x=0$.`, rows: [r`\cos x\,\sin^2x=0`] },
    { say: r`On $\big[-\tfrac\pi2,\tfrac\pi2\big]$ that is at both ends and at the origin. At $x=0$ both curves equal 1: they touch but do not cross.`, rows: [r`x=-\tfrac\pi2,\ 0,\ \tfrac\pi2`], boxed: true, c: 'cx' }],
  points: [pt(-PI / 2, 0, '', 0, 0), pt(0, 1, '(0, 1)', 10, -8), pt(PI / 2, 0, '', 0, 0)],
  pointsSay: r`The curves touch at the two ends and at the peak $(0,1)$.`,
  region: { top: cos, bot: x => cos(x) ** 3, range: [-PI / 2, PI / 2] },
  regionSay: r`The region is two lobes, pinched together at the top. Since $\cos x\ge\cos^3x$ everywhere here, $\cos x$ is always the top curve.`,
  strip: { at: 0.45, w: 0.07, text: 'dx', tx: 0.56, ty: 0.78 },
  sliceSay: r`Vertical strips from the lower curve $\cos^3x$ up to $\cos x$. The top curve never switches, so the whole interval is a single integral.`,
  height: [r`y_{\text{top}}=\cos x`, r`y_{\text{bottom}}=\cos^3x`, r`\text{height}=\cos x-\cos^3x=\cos x\sin^2x`],
  heightSay: r`Top minus bottom. The factoring from the intersection step simplifies it: $\cos x-\cos^3x=\cos x\sin^2x$.`,
  integral: r`A=\int_{-\pi/2}^{\pi/2}\cos x\,\sin^2x\,dx`,
  integralSay: r`Add up the strips across the whole interval.`,
  evalSteps: [
    { say: r`$\cos x\,dx$ is exactly $du$ for $u=\sin x$. New limits: $x=-\tfrac\pi2$ gives $u=-1$, and $x=\tfrac\pi2$ gives $u=1$.`, rows: [r`=\int_{-1}^{1}u^2\,du`], side: [eyebrow('s1', 'Substitution'), R('side', T('su', r`u=\sin x`, 'cx')), R('side', T('sd', r`du=\cos x\,dx`, 'cd')), R('side', T('sl1', r`x=-\tfrac\pi2\Rightarrow u=-1`, 'ca')), R('side', T('sl2', r`x=\tfrac\pi2\Rightarrow u=1`, 'ca'))] },
    { say: r`Power rule.`, rows: [r`=\Big[\tfrac{u^3}{3}\Big]_{-1}^{1}`] },
    { say: r`$\tfrac13-\big(-\tfrac13\big)=\tfrac23$.`, rows: [r`=\tfrac13-\Big(-\tfrac13\Big)=\tfrac23`], boxed: true }],
  answer: r`\tfrac23`, track: [r`x=-\tfrac\pi2,\,0,\,\tfrac\pi2`, r`\int_{-\pi/2}^{\pi/2}\cos x\sin^2x\,dx`, r`\tfrac23`],
  verify: [{ value: { f: x => cos(x) - cos(x) ** 3, a: -PI / 2, b: PI / 2, val: 2 / 3 } }, { equal: { a: x => cos(x) - cos(x) ** 3, b: x => cos(x) * sin(x) ** 2, range: [-1.5, 1.5] } }, { num: { a: 1 / 3 + 1 / 3, b: 2 / 3 } }],
  heli1: [ln(r`\cos x\sin^2x=0\Rightarrow x=-\tfrac\pi2,\,0,\,\tfrac\pi2`, 'cx')], heli3: [ln(r`u=\sin x`, 'muted'), ln(r`\Big[\tfrac{u^3}{3}\Big]_{-1}^{1}`)] }));

/* ===== 5 : sin^2 x and sin^4 x ===== */
examples.push(areaGen({ verb: 'Find', n: 5, label: 'Problem 5', type: 'Sine squared and sine to the fourth',
  problem: r`y=\sin^2x,\;y=\sin^4x,\;[0,\pi]`,
  plot: { xr: [-0.4, 3.6], yr: [-0.3, 1.3], xt: [[PI / 2, 'π/2'], [PI, 'π']], yt: [1], w: 640, h: 400 },
  curves: [
    { f: x => sin(x) ** 2, dom: [0, PI], color: 'cx', eq: r`y=\sin^2x`, text: 'y = sin²x', at: [0.38, sin(0.38) ** 2], dx: -76, dy: -12, say: r`$y=\sin^2x$ is a hump over $[0,\pi]$: 0 at the ends, 1 in the middle.` },
    { f: x => sin(x) ** 4, dom: [0, PI], color: 'cd', eq: r`y=\sin^4x`, text: 'y = sin⁴x', at: [1.05, 0.2], dx: 0, dy: 0, say: r`$y=\sin^4x$ has the same endpoints and the same peak, but since $0\le\sin x\le1$ the higher power makes it smaller everywhere in between.` }],
  inter: [
    { say: r`Set the curves equal and factor out $\sin^2x$.`, rows: [r`\sin^2x=\sin^4x`, r`\sin^2x\,\big(1-\sin^2x\big)=0`] },
    { say: r`Use $1-\sin^2x=\cos^2x$. The product vanishes when $\sin x=0$ or $\cos x=0$.`, rows: [r`\sin^2x\,\cos^2x=0`] },
    { say: r`On $[0,\pi]$: the two ends and the middle. At $x=\tfrac\pi2$ both curves equal 1, so they only touch.`, rows: [r`x=0,\ \tfrac\pi2,\ \pi`], boxed: true, c: 'cx' }],
  points: [pt(0, 0, '', 0, 0), pt(PI / 2, 1, '(π/2, 1)', 10, -8), pt(PI, 0, '', 0, 0)],
  pointsSay: r`The curves meet at the two ends and touch at the peak.`,
  region: { top: x => sin(x) ** 2, bot: x => sin(x) ** 4, range: [0, PI] },
  regionSay: r`Two lobes touching at the peak. $\sin^2x\ge\sin^4x$ throughout, so $\sin^2x$ is always the top curve.`,
  strip: { at: 0.75, w: 0.07, text: 'dx', tx: 0.82, ty: 0.3 },
  sliceSay: r`Vertical strips from $\sin^4x$ up to $\sin^2x$ over the whole interval $[0,\pi]$: one integral.`,
  height: [r`y_{\text{top}}=\sin^2x`, r`y_{\text{bottom}}=\sin^4x`, r`\text{height}=\sin^2x-\sin^4x`],
  heightSay: r`Top minus bottom.`,
  integral: r`A=\int_0^{\pi}\big(\sin^2x-\sin^4x\big)\,dx`,
  integralSay: r`Add up the strips from 0 to $\pi$.`,
  evalSteps: [
    { say: r`Factor as in the intersection step: $\sin^2x-\sin^4x=\sin^2x\cos^2x$.`, rows: [r`=\int_0^{\pi}\sin^2x\cos^2x\,dx`] },
    { say: r`Double angle: $\sin x\cos x=\tfrac12\sin2x$, so $\sin^2x\cos^2x=\tfrac14\sin^22x$.`, rows: [r`=\tfrac14\int_0^{\pi}\sin^2(2x)\,dx`] },
    { say: r`Half-angle: $\sin^22x=\tfrac{1-\cos4x}{2}$.`, rows: [r`=\tfrac18\int_0^{\pi}\big(1-\cos4x\big)\,dx`] },
    { say: r`$\int\cos4x\,dx=\tfrac14\sin4x$, which is 0 at both $x=0$ and $x=\pi$. Only the $x$ term survives: $\tfrac18\cdot\pi$.`, rows: [r`=\tfrac18\Big[x-\tfrac14\sin4x\Big]_0^{\pi}=\tfrac\pi8`], boxed: true }],
  answer: r`\tfrac\pi8`, track: [r`x=0,\,\tfrac\pi2,\,\pi`, r`\int_0^{\pi}\big(\sin^2x-\sin^4x\big)\,dx`, r`\tfrac\pi8`],
  verify: [{ value: { f: x => sin(x) ** 2 - sin(x) ** 4, a: 0, b: PI, val: PI / 8 } }, { equal: { a: x => sin(x) ** 2 - sin(x) ** 4, b: x => sin(2 * x) ** 2 / 4, range: [0, 3.1] } }, { equal: { a: x => sin(2 * x) ** 2 / 4, b: x => (1 - cos(4 * x)) / 8, range: [0, 3.1] } }],
  heli1: [ln(r`\sin^2x\cos^2x=0\Rightarrow x=0,\,\tfrac\pi2,\,\pi`, 'cx')], heli3: [ln(r`\tfrac18\Big[x-\tfrac14\sin4x\Big]_0^{\pi}`)] }));

/* ===== 6 : 1/(x+1), 1/(x(x+1)), x = 3 ===== */
const g6 = x => 1 / (x * (x + 1));
examples.push(areaGen({ verb: 'Find', n: 6, label: 'Problem 6', type: 'Rational curves · partial fractions',
  problem: r`y=\tfrac1{x+1},\;y=\tfrac1{x(x+1)},\;x=3`,
  plot: { xr: [-0.4, 3.9], yr: [-0.15, 1.35], xt: [1, 2, 3], yt: [[0.5, '½'], [1, '1']], w: 640, h: 420 },
  curves: [
    { f: x => 1 / (x + 1), dom: [0, 3.8], color: 'cx', eq: r`y=\tfrac1{x+1}`, text: 'y = 1/(x+1)', at: [1.95, 1 / 2.95], dx: 8, dy: -12, say: r`$y=\tfrac1{x+1}$ is a decreasing curve: 1 at $x=0$, $\tfrac12$ at $x=1$, then sinking toward the axis.` },
    { f: g6, dom: [0.3, 3.8], n: 500, color: 'cd', eq: r`y=\tfrac1{x(x+1)}`, text: 'y = 1/(x(x+1))', at: [0.6, 1.15], dx: 8, dy: 0, say: r`$y=\tfrac1{x(x+1)}$ is the first curve times $\tfrac1x$. It blows up at $x=0$ and is smaller than the first curve once $x>1$.` },
    { f: y => 3, dom: [0, 1.3], orient: 'x', color: 'ca', eq: r`x=3`, text: 'x = 3', at: [3, 1.2], dx: 8, dy: 0, say: r`The vertical line $x=3$ closes the region on the right.` }],
  inter: [
    { say: r`The curves meet where $\tfrac1{x+1}=\tfrac1{x(x+1)}$. The numerators are equal, so the denominators must be too.`, rows: [r`x+1=x(x+1)`] },
    { say: r`Move everything to one side and factor out $x+1$.`, rows: [r`(x+1)(1-x)=0`] },
    { say: r`$x=-1$ is not allowed (both formulas are undefined there). One crossing remains.`, rows: [r`x=1`], boxed: true, c: 'cx' }],
  points: [pt(1, 0.5, '(1, ½)', 10, -10), pt(3, 0.25, '', 0, 0), pt(3, 1 / 12, '', 0, 0)],
  pointsSay: r`The corners: the crossing $\big(1,\tfrac12\big)$ and the two points on the line $x=3$, at heights $\tfrac14$ and $\tfrac1{12}$.`,
  region: { top: x => 1 / (x + 1), bot: g6, range: [1, 3] },
  regionSay: r`The region is the sliver between the curves from the crossing to the line. At $x=2$: $\tfrac13$ is above $\tfrac16$, so $\tfrac1{x+1}$ is on top.`,
  strip: { at: 1.9, w: 0.09, text: 'dx', tx: 2.04, ty: 0.23 },
  sliceSay: r`Vertical strips: the same curve $\tfrac1{x+1}$ is on top for every $x\in[1,3]$, so one integral.`,
  height: [r`y_{\text{top}}=\tfrac{1}{x+1}`, r`y_{\text{bottom}}=\tfrac{1}{x(x+1)}`, r`\text{height}=\tfrac{x-1}{x(x+1)}`],
  heightSay: r`Top minus bottom, over the common denominator: $\tfrac{x}{x(x+1)}-\tfrac{1}{x(x+1)}=\tfrac{x-1}{x(x+1)}$.`,
  integral: r`A=\int_1^3\tfrac{x-1}{x(x+1)}\,dx`,
  integralSay: r`Add up the strips from $x=1$ to $x=3$.`,
  evalSteps: [
    { say: r`Partial fractions: $\tfrac{x-1}{x(x+1)}=\tfrac Ax+\tfrac B{x+1}$ gives $x-1=A(x+1)+Bx$. At $x=0$: $A=-1$. At $x=-1$: $B=2$.`, rows: [r`=\int_1^3\Big(-\tfrac1x+\tfrac{2}{x+1}\Big)\,dx`] },
    { say: r`Each term integrates to a logarithm.`, rows: [r`=\Big[-\ln x+2\ln(x+1)\Big]_1^3`] },
    { say: r`At $x=3$: $-\ln3+2\ln4$. At $x=1$: $0+2\ln2$.`, rows: [r`=\big(-\ln3+2\ln4\big)-\big(0+2\ln2\big)`] },
    { say: r`$2\ln4=4\ln2$, so the $\ln2$ terms combine into $2\ln2$. Then $2\ln2-\ln3=\ln4-\ln3=\ln\tfrac43$.`, rows: [r`=2\ln2-\ln3=\ln\tfrac43\approx0.288`], boxed: true }],
  answer: r`\ln\tfrac43\approx0.288`, track: [r`x=1`, r`\int_1^3\tfrac{x-1}{x(x+1)}\,dx`, r`\ln\tfrac43`],
  verify: [{ value: { f: x => (x - 1) / (x * (x + 1)), a: 1, b: 3, val: Math.log(4 / 3) } }, { equal: { a: x => 1 / (x + 1) - g6(x), b: x => (x - 1) / (x * (x + 1)), range: [1, 3] } }, { anti: { F: x => -Math.log(x) + 2 * Math.log(x + 1), f: x => (x - 1) / (x * (x + 1)), range: [1.1, 2.9] } }, { num: { a: 2 * Math.log(2) - Math.log(3), b: Math.log(4 / 3) } }],
  heli1: [ln(r`x+1=x(x+1)\Rightarrow x=1`, 'cx')], heli3: [ln(r`\tfrac{x-1}{x(x+1)}=-\tfrac1x+\tfrac2{x+1}`, 'muted'), ln(r`\Big[-\ln x+2\ln(x+1)\Big]_1^3`)] }));

/* ===== 7 : y = x and y = x ln x ===== */
const xl = x => x * Math.log(x);
examples.push(areaGen({ verb: 'Find', n: 7, label: 'Problem 7', type: 'Line and x ln x · integration by parts',
  problem: r`y=x,\;y=x\ln x,\;x>0`,
  plot: { xr: [-0.6, 3.4], yr: [-1.1, 3.4], xt: [1, [E, 'e']], yt: [1, 2, 3], w: 620, h: 420 },
  curves: [
    { f: x => x, dom: [-0.5, 3.3], color: 'cd', eq: r`y=x`, text: 'y = x', at: [-0.4, -0.4], dx: 4, dy: 26, say: r`The line $y=x$ runs through the origin at 45°.` },
    { f: xl, dom: [0.0005, 3.3], n: 500, color: 'cx', eq: r`y=x\ln x`, text: 'y = x ln x', at: [1.9, xl(1.9)], dx: 10, dy: 26, say: r`$y=x\ln x$ only exists for $x>0$. It dips below the axis ($\ln x<0$ for $x<1$), with lowest point $-\tfrac1e$, crosses at $x=1$, then climbs.` }],
  inter: [
    { say: r`Set the two curves equal.`, rows: [r`x=x\ln x`] },
    { say: r`Move everything to one side and factor out $x$.`, rows: [r`x\,\big(1-\ln x\big)=0`] },
    { say: r`$x=0$ is not in the domain, but both curves approach $(0,0)$ as $x\to0^+$. The other factor gives $\ln x=1$.`, rows: [r`\ln x=1\Rightarrow x=e`], boxed: true, c: 'cx' }],
  points: [pt(E, E, '(e, e)', -66, -10), pt(0, 0, '', 0, 0)],
  pointsSay: r`The region starts at the origin (as a limit) and ends at the crossing $(e,e)$.`,
  region: { top: x => x, bot: xl, range: [0.0001, E] },
  regionSay: r`The region lies between the curves from $x=0$ to $x=e$. At $x=1$: the line gives 1 and $x\ln x$ gives 0, so the line is on top.`,
  strip: { at: 1.3, w: 0.09, text: 'dx', tx: 1.42, ty: 0.72 },
  sliceSay: r`Vertical strips: the line is on top and $x\ln x$ underneath, for every $x\in(0,e)$. One integral.`,
  height: [r`y_{\text{top}}=x`, r`y_{\text{bottom}}=x\ln x`, r`\text{height}=x-x\ln x`],
  heightSay: r`Top minus bottom.`,
  integral: r`A=\int_0^{e}\big(x-x\ln x\big)\,dx`,
  integralSay: r`Add up the strips from $x=0$ to $x=e$. The integrand is undefined at 0, but it has the limit 0 there.`,
  evalSteps: [
    { say: r`Split into two integrals.`, rows: [r`=\int_0^ex\,dx-\int_0^ex\ln x\,dx`] },
    { say: r`The first is the power rule: $\tfrac{x^2}{2}$ from 0 to $e$.`, rows: [r`\int_0^ex\,dx=\tfrac{e^2}{2}`] },
    { say: r`The second needs integration by parts. Take $u=\ln x$ (it simplifies when differentiated) and $dv=x\,dx$.`, rows: [], side: byParts(r`u=\ln x`, r`dv=x\,dx`, r`du=\tfrac1x\,dx`, r`v=\tfrac{x^2}{2}`) },
    { say: r`Apply $uv-\int v\,du$. The $\tfrac1x$ cancels one power of $x$ in the new integral.`, fresh: true, rows: [r`\int x\ln x\,dx=\tfrac{x^2}{2}\ln x-\int\tfrac x2\,dx`, r`=\tfrac{x^2}{2}\ln x-\tfrac{x^2}{4}`], side: byParts(r`u=\ln x`, r`dv=x\,dx`, r`du=\tfrac1x\,dx`, r`v=\tfrac{x^2}{2}`) },
    { say: r`At $e$: $\ln e=1$, so $\tfrac{e^2}{2}-\tfrac{e^2}{4}=\tfrac{e^2}{4}$. At $0^+$: $x^2\ln x\to0$, so nothing is lost.`, rows: [r`\int_0^ex\ln x\,dx=\tfrac{e^2}{4}`], side: vals('Limit at 0', r`\lim_{x\to0^+}x^2\ln x=0`, r`\ln e=1`) },
    { say: r`Subtract: the first piece was $\tfrac{e^2}{2}$ and the second is $\tfrac{e^2}{4}$.`, fresh: true, rows: [r`A=\tfrac{e^2}{2}-\tfrac{e^2}{4}`, r`=\tfrac{e^2}{4}\approx1.85`], boxed: true }],
  answer: r`\tfrac{e^2}{4}\approx1.85`, track: [r`x=e`, r`\int_0^e\big(x-x\ln x\big)\,dx`, r`\tfrac{e^2}{4}`],
  verify: [{ value: { f: x => (x < 1e-12 ? x : x - x * Math.log(x)), a: 1e-9, b: E, val: E * E / 4, n: 200000, tol: 1e-6 } }, { anti: { F: x => x * x / 2 * Math.log(x) - x * x / 4, f: xl, range: [0.2, 2.6] } }, { num: { a: E * E / 2 - E * E / 4, b: E * E / 4 } }],
  heli1: [ln(r`x\,(1-\ln x)=0\Rightarrow x=e`, 'cx')], heli3: [ln(r`u=\ln x,\;dv=x\,dx`, 'muted'), ln(r`\tfrac{e^2}{2}-\tfrac{e^2}{4}`)] }));

/* ===== 8 : Gini index of x e^(x-1) ===== */
const L8 = x => x * Math.exp(x - 1);
examples.push(areaGen({ verb: 'Find', n: 8, label: 'Problem 8', type: 'Gini index · integration by parts', phases: ['(a) Sketch', '(b) Set up', '(b) Evaluate'],
  problem: r`L(x)=xe^{x-1},\;G=2\int_0^1\big(x-L(x)\big)dx`,
  plot: { xr: [-0.2, 1.3], yr: [-0.15, 1.2], xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']], w: 620, h: 420 },
  curves: [
    { f: x => x, dom: [0, 1], color: 'cd', eq: r`y=x`, text: 'y = x', at: [0.2, 0.2], dx: -52, dy: -12, say: r`The line of equality $y=x$: if everyone earned the same, the poorest fraction $x$ of the people would earn exactly the fraction $x$ of the income.` },
    { f: L8, dom: [0, 1], color: 'cx', eq: r`L(x)=xe^{x-1}`, text: 'L(x)', at: [0.85, L8(0.85)], dx: 10, dy: 28, say: r`The Lorenz curve $L(x)=xe^{x-1}$ sags below that line: the poorest earn less than their fair share.` }],
  inter: [
    { say: r`Part (a): a Lorenz curve must start at $(0,0)$ and end at $(1,1)$. Check both ends.`, rows: [r`L(0)=0\cdot e^{-1}=0`, r`L(1)=1\cdot e^{0}=1`], c: 'cx' },
    { say: r`So $L$ meets the line of equality at both ends. Nowhere else: $xe^{x-1}=x$ forces $x=0$ or $e^{x-1}=1$.`, rows: [r`xe^{x-1}=x\Rightarrow x=0,\,1`], boxed: true, c: 'cx' }],
  points: [pt(0, 0, '(0, 0)', 10, 22), pt(1, 1, '(1, 1)', 10, 4)],
  pointsSay: r`The curve and the line share the two endpoints $(0,0)$ and $(1,1)$. That verifies part (a).`,
  region: { top: x => x, bot: L8, range: [0, 1] },
  regionSay: r`The shaded sliver between the line and the curve is what the Gini index measures. $L(x)\le x$ because $e^{x-1}\le1$ for $x\le1$.`,
  strip: { at: 0.5, w: 0.05, text: 'dx', tx: 0.57, ty: 0.48 },
  sliceSay: r`Part (b). Vertical strips of width $dx$: the line $y=x$ is on top and the Lorenz curve underneath, from 0 all the way to 1.`,
  height: [r`y_{\text{top}}=x`, r`y_{\text{bottom}}=L(x)=xe^{x-1}`, r`\text{height}=x-xe^{x-1}`],
  heightSay: r`The strip's height is top minus bottom.`,
  integral: r`G=2\int_0^1\big(x-xe^{x-1}\big)\,dx`,
  integralSay: r`The Gini index is twice the area, so a factor of 2 goes in front.`,
  evalSteps: [
    { say: r`Split the integral so that each piece can be done separately.`, rows: [r`=2\Big[\int_0^1x\,dx-\int_0^1xe^{x-1}\,dx\Big]`] },
    { say: r`The first piece is the power rule: $\tfrac{x^2}{2}$ from 0 to 1.`, rows: [r`\int_0^1x\,dx=\tfrac12`] },
    { say: r`The second is a product, so use integration by parts: $u=x$ (it simplifies when differentiated) and $dv=e^{x-1}dx$.`, rows: [], side: byParts(r`u=x`, r`dv=e^{x-1}\,dx`, r`du=dx`, r`v=e^{x-1}`) },
    { say: r`Apply $uv-\int v\,du$. The boundary term is $1\cdot e^0-0=1$, and $\int_0^1e^{x-1}dx=1-\tfrac1e$.`, fresh: true, rows: [r`\int_0^1xe^{x-1}\,dx=\Big[xe^{x-1}\Big]_0^1-\int_0^1e^{x-1}\,dx`, r`=1-\Big(1-\tfrac1e\Big)=\tfrac1e`], side: byParts(r`u=x`, r`dv=e^{x-1}\,dx`, r`du=dx`, r`v=e^{x-1}`) },
    { say: r`Put both pieces back: $\tfrac12$ and $\tfrac1e$. Distribute the 2. Then $\tfrac2e\approx0.736$, so $G\approx0.264$.`, fresh: true, rows: [r`G=2\Big(\tfrac12-\tfrac1e\Big)`, r`=1-\tfrac2e\approx0.264`], boxed: true, side: [eyebrow('ck', 'Check'), R('side', T('ck1', r`\tfrac2e\approx0.736`, 'ct')), R('side', T('ck2', r`G\approx1-0.736`, 'cr')), R('side', T('ck3', r`0<G<1\;\checkmark`, 'muted'))] }],
  answer: r`1-\tfrac2e\approx0.264`, track: [r`L(0)=0,\ L(1)=1`, r`2\int_0^1\big(x-xe^{x-1}\big)dx`, r`1-\tfrac2e`],
  verify: [{ value: { f: x => 2 * (x - L8(x)), a: 0, b: 1, val: 1 - 2 / E } }, { value: { f: L8, a: 0, b: 1, val: 1 / E } }, { anti: { F: x => x * Math.exp(x - 1) - Math.exp(x - 1), f: L8, range: [0.05, 0.95] } }, { num: { a: L8(0), b: 0 } }, { num: { a: L8(1), b: 1 } }],
  heli1: [ln(r`L(0)=0,\;L(1)=1`, 'cx')], heli3: [ln(r`u=x,\;dv=e^{x-1}dx`, 'muted'), ln(r`G=2\Big(\tfrac12-\tfrac1e\Big)`)] }));

/* ===== 9 : Gini index of 1 - sqrt(1 - x^2), and which country is more unequal ===== */
const L9 = x => 1 - Math.sqrt(Math.max(0, 1 - x * x)), G8 = 1 - 2 / E, G9 = PI / 2 - 1;
examples.push(areaGen({ verb: 'Find', n: 9, label: 'Problem 9', type: 'Gini index · trig substitution', phases: ['(a) Sketch', '(a) Set up', '(a) Evaluate, (b) Compare'],
  problem: r`L(x)=1-\sqrt{1-x^2},\;G=2\int_0^1\big(x-L(x)\big)dx`,
  plot: { xr: [-0.2, 1.3], yr: [-0.15, 1.2], xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']], w: 620, h: 420 },
  curves: [
    { f: x => x, dom: [0, 1], color: 'cd', eq: r`y=x`, text: 'y = x', at: [0.2, 0.2], dx: -52, dy: -12, say: r`The same line of equality, $y=x$.` },
    { f: L9, dom: [0, 1], n: 300, color: 'cx', eq: r`L(x)=1-\sqrt{1-x^2}`, text: 'L(x)', at: [0.85, L9(0.85)], dx: 10, dy: 28, say: r`$L(x)=1-\sqrt{1-x^2}$ is the lower-right arc of the circle of radius 1 centered at $(0,1)$. It hugs the axis much longer than the first country's curve.` }],
  inter: [
    { say: r`Both ends are right, so this is a Lorenz curve: $L(0)=1-1=0$ and $L(1)=1-0=1$. Where does it meet the line? Isolate the root.`, rows: [r`1-\sqrt{1-x^2}=x`, r`\sqrt{1-x^2}=1-x`] },
    { say: r`Square both sides: $1-x^2=1-2x+x^2$, which gives $2x^2-2x=0$.`, rows: [r`x=0\ \text{ or }\ x=1`], boxed: true, c: 'cx' }],
  points: [pt(0, 0, '(0, 0)', 10, 22), pt(1, 1, '(1, 1)', 10, 4)],
  pointsSay: r`The curve and the line share the endpoints $(0,0)$ and $(1,1)$.`,
  region: { top: x => x, bot: L9, range: [0, 1] },
  regionSay: r`Between them the line is on top: at $x=\tfrac12$, $L=1-\tfrac{\sqrt3}{2}\approx0.13$ is far below the line's 0.5.`,
  strip: { at: 0.45, w: 0.05, text: 'dx', tx: 0.52, ty: 0.28 },
  sliceSay: r`Vertical strips of width $dx$, with the line on top and the arc underneath.`,
  height: [r`y_{\text{top}}=x`, r`y_{\text{bottom}}=1-\sqrt{1-x^2}`, r`\text{height}=x-1+\sqrt{1-x^2}`],
  heightSay: r`Top minus bottom.`,
  integral: r`G=2\int_0^1\big(x-1+\sqrt{1-x^2}\big)\,dx`,
  integralSay: r`The Gini index is twice the area between the line and the curve.`,
  evalSteps: [
    { say: r`Split into a polynomial piece and a radical piece.`, rows: [r`=2\Big[\int_0^1(x-1)\,dx+\int_0^1\sqrt{1-x^2}\,dx\Big]`] },
    { say: r`The polynomial piece: $\Big[\tfrac{x^2}{2}-x\Big]_0^1=\tfrac12-1=-\tfrac12$.`, rows: [r`\int_0^1(x-1)\,dx=-\tfrac12`] },
    { say: r`The radical $\sqrt{1-x^2}$ calls for $x=\sin\theta$. Then $dx=\cos\theta\,d\theta$, $\sqrt{1-x^2}=\cos\theta$, and the limits $0,1$ become $0,\tfrac\pi2$.`, fresh: true, rows: [r`\int_0^1\sqrt{1-x^2}\,dx=\int_0^{\pi/2}\cos^2\theta\,d\theta`], side: [eyebrow('sb', 'Substitution'), R('side', T('sx', r`x=\sin\theta`, 'cx')), R('side', T('sdx', r`dx=\cos\theta\,d\theta`, 'cd')), R('side', T('sl1', r`x=0\Rightarrow\theta=0`, 'ca')), R('side', T('sl2', r`x=1\Rightarrow\theta=\tfrac\pi2`, 'ca'))] },
    { say: r`Half-angle: $\cos^2\theta=\tfrac{1+\cos2\theta}{2}$, so the integral is $\Big[\tfrac\theta2+\tfrac{\sin2\theta}{4}\Big]_0^{\pi/2}=\tfrac\pi4$.`, rows: [r`=\Big[\tfrac\theta2+\tfrac{\sin2\theta}{4}\Big]_0^{\pi/2}=\tfrac\pi4`], side: [eyebrow('sg', 'Geometric check'), R('side', T('sg1', r`\text{quarter of the unit disk}`, 'ct')), R('side', T('sg2', r`\tfrac14\cdot\pi\cdot1^2=\tfrac\pi4`, 'cr'))] },
    { say: r`Part (a): put the pieces back, $-\tfrac12$ and $\tfrac\pi4$, and distribute the 2.`, fresh: true, rows: [r`G=2\Big(-\tfrac12+\tfrac\pi4\Big)`, r`=\tfrac\pi2-1\approx0.571`], boxed: true },
    { say: r`Part (b): a larger Gini index means more inequality. The first country has $G\approx0.264$ and this one has $G\approx0.571$. The second country (Problem 9) is more unequal.`, rows: [],
      main: [R('line', T('c1', r`G_8=1-\tfrac2e\approx0.264`, 'cx')), R('line', T('c2', r`G_9=\tfrac\pi2-1\approx0.571`, 'cd')), R('line', T('c3', r`G_9>G_8`, 'ink', { cls: 'boxed' }))],
      side: [eyebrow('cm', 'Which is more unequal?'), R('side', T('cm1', r`G=0\Rightarrow\text{equality}`, 'muted')), R('side', T('cm2', r`G\to1\Rightarrow\text{inequality}`, 'muted')), R('side', T('cm3', r`\text{Problem 9 is higher}`, 'cd'))] }],
  answer: r`\tfrac\pi2-1\approx0.571`, track: [r`L(0)=0,\ L(1)=1`, r`2\int_0^1\big(x-1+\sqrt{1-x^2}\big)dx`, r`\tfrac\pi2-1`],
  verify: [{ value: { f: x => 2 * (x - L9(x)), a: 0, b: 1, val: G9, n: 400000, tol: 1e-6 } }, { value: { f: x => Math.sqrt(Math.max(0, 1 - x * x)), a: 0, b: 1, val: PI / 4, n: 400000, tol: 1e-6 } }, { num: { a: L9(0), b: 0 } }, { num: { a: L9(1), b: 1 } }, { num: { a: G9 > G8 ? 1 : 0, b: 1 } }],
  heli1: [ln(r`L(0)=0,\;L(1)=1`, 'cx')], heli3: [ln(r`x=\sin\theta:\;\int_0^1\sqrt{1-x^2}\,dx=\tfrac\pi4`, 'muted'), ln(r`G_9>G_8`, 'cd')] }));

}
