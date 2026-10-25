/* Lectures 30 & 31 · Part B: problems 10-18 (region sketches, which variable to use, parabola-and-line areas) */

/* the shared "9/2" integral of problems 10-14, as integrals in the integration variable v */
const nineHalfEval = v => [
  { say: r`Antiderivative term by term, then evaluate from the lower limit to the upper limit.`, rows: v === 'x' ? [r`=\Big[-\tfrac{x^3}{3}-\tfrac{x^2}{2}+2x\Big]_{-2}^{1}`] : null },
];
const quadSteps = (v, setEq, quad, fact, sol) => [
  { say: r`Where do the curves meet? Set the two values of $${v === 'x' ? 'y' : 'x'}$ equal.`, rows: [setEq] },
  { say: r`Move everything to one side and factor.`, rows: [quad, fact] },
  { say: sol, rows: [v === 'x' ? r`x=-2,\ x=1` : r`y=-2,\ y=1`], boxed: true, c: 'cx' }];

/* ===== Problem 10 ===== */
examples.push(areaGen({ n: 10, label: 'Problem 10', type: 'Which variable?',
  problem: r`\text{Area between }y=-x^2+1\text{ and }y=x-1`,
  plot: { xr: [-3.3, 2.4], yr: [-4.3, 2.4], xt: [-2, -1, 1, 2], yt: [-3, -2, -1, 1, 2], w: 600, h: 430 },
  curves: [
    { f: x => 1 - x * x, dom: [-2.15, 2.15], color: 'cx', eq: r`y=-x^2+1`, text: 'y = −x² + 1', at: [0, 1], dx: 14, dy: -8, say: r`(i) Sketch. The first curve is a downward parabola with vertex $(0,1)$.` },
    { f: x => x - 1, dom: [-3.2, 2.3], color: 'cd', eq: r`y=x-1`, text: 'y = x − 1', at: [1.55, 0.55], dx: 6, dy: -8, say: r`The second is a line with slope 1 through $(0,-1)$.` }],
  inter: quadSteps('x', r`-x^2+1=x-1`, r`x^2+x-2=0`, r`(x+2)(x-1)=0`, r`The solutions are $x=-2$ and $x=1$. Plug back into either curve for the $y$-values.`),
  points: [pt(-2, -3, '(−2, −3)', -10, 22, 'end'), pt(1, 0, '(1, 0)', 10, 24)],
  pointsSay: r`The curves cross at $(-2,-3)$ and $(1,0)$.`,
  region: { top: x => 1 - x * x, bot: x => x - 1, range: [-2, 1] },
  regionSay: r`The bounded region is the cap of the parabola above the line, between the two crossings.`,
  strip: { at: -0.75, w: 0.12, text: 'dx', tx: -0.7, ty: -1.15, anchor: 'middle' },
  sliceSay: r`(ii) Which variable? Integrate in $x$: for every $x\in[-2,1]$ a vertical strip has the parabola on top and the line below. Horizontal strips would switch their right boundary at $y=0$ and need two integrals.`,
  height: [r`y_{\text{top}}=-x^2+1`, r`y_{\text{bottom}}=x-1`, r`y_{\text{top}}-y_{\text{bottom}}=-x^2-x+2`],
  heightSay: r`The strip's height is top minus bottom: $(-x^2+1)-(x-1)$.`,
  integral: r`A=\int_{-2}^{1}\big(-x^2-x+2\big)\,dx`,
  integralSay: r`(iii) Add up the strips from $x=-2$ to $x=1$.`,
  evalSteps: [
    { say: r`Antiderivative term by term.`, rows: [r`=\Big[-\tfrac{x^3}{3}-\tfrac{x^2}{2}+2x\Big]_{-2}^{1}`] },
    { say: r`Plug in the limits: upper minus lower.`, rows: [r`=\Big(-\tfrac13-\tfrac12+2\Big)-\Big(\tfrac83-2-4\Big)`] },
    { say: r`Simplify each bracket: $\tfrac76-\big(-\tfrac{10}{3}\big)=\tfrac{27}{6}=\tfrac92$.`, rows: [r`=\tfrac76+\tfrac{10}{3}=\tfrac92`], boxed: true }],
  answer: r`\tfrac92`, track: [r`x=-2,\,1`, r`\int_{-2}^{1}(-x^2-x+2)\,dx`, r`\tfrac92`],
  verify: [{ value: { f: x => (1 - x * x) - (x - 1), a: -2, b: 1, val: 4.5 } }],
  heli1: [ln(r`x=-2,\;x=1`, 'cx')], heli3: [ln(r`\Big[-\tfrac{x^3}{3}-\tfrac{x^2}{2}+2x\Big]_{-2}^{1}`)] }));

/* ===== Problem 11 ===== */
examples.push(areaGen({ n: 11, label: 'Problem 11', type: 'Which variable?', orient: 'h',
  problem: r`\text{Area between }x=y^2\text{ and }y=-x+2`,
  plot: { xr: [-0.9, 5.2], yr: [-3, 2.8], xt: [1, 2, 3, 4], yt: [-2, -1, 1, 2], w: 600, h: 430 },
  curves: [
    { f: y => y * y, dom: [-2.15, 2.15], orient: 'x', color: 'cx', eq: r`x=y^2`, text: 'x = y²', at: [3.9, 1.9], dx: 8, dy: 4, say: r`(i) Sketch. The first curve, $x=y^2$, is a parabola lying on its side, opening to the right.` },
    { f: x => 2 - x, dom: [-0.7, 4.9], color: 'cd', eq: r`y=-x+2`, text: 'y = −x + 2', at: [0.1, 1.9], dx: 10, dy: -8, say: r`The second is the line $y=-x+2$, with slope $-1$ and intercept 2.` }],
  inter: [
    { say: r`To compare, write both as $x$ in terms of $y$. Solve the line for $x$.`, rows: [r`x=2-y`] },
    { say: r`Where do they meet? Set the two $x$-values equal, then factor.`, rows: [r`y^2=2-y`, r`y^2+y-2=0`, r`(y+2)(y-1)=0`] },
    { say: r`The solutions are $y=-2$ and $y=1$. Plug back into $x=y^2$ for the $x$-values.`, rows: [r`y=-2,\ y=1`], boxed: true, c: 'cx' }],
  points: [pt(4, -2, '(4, −2)', 10, 22), pt(1, 1, '(1, 1)', 10, -6)],
  pointsSay: r`The curves cross at $(4,-2)$ and $(1,1)$.`,
  region: { right: y => 2 - y, left: y => y * y, range: [-2, 1] },
  regionSay: r`The bounded region lies between the parabola on the left and the line on the right.`,
  strip: { at: -0.65, w: 0.14, text: 'dy', tx: 1.1, ty: -0.62 },
  sliceSay: r`(ii) Which variable? Integrate in $y$: for every $y\in[-2,1]$ a horizontal strip has the parabola on its left and the line on its right. Vertical strips would switch their top boundary at $x=1$ and need two integrals.`,
  height: [r`x_{\text{right}}=2-y`, r`x_{\text{left}}=y^2`, r`x_{\text{right}}-x_{\text{left}}=2-y-y^2`],
  heightSay: r`The strip's length is right minus left: $(2-y)-y^2$.`,
  integral: r`A=\int_{-2}^{1}\big(2-y-y^2\big)\,dy`,
  integralSay: r`(iii) Add up the strips from $y=-2$ to $y=1$.`,
  evalSteps: [
    { say: r`Antiderivative term by term.`, rows: [r`=\Big[2y-\tfrac{y^2}{2}-\tfrac{y^3}{3}\Big]_{-2}^{1}`] },
    { say: r`Plug in the limits: upper minus lower.`, rows: [r`=\Big(2-\tfrac12-\tfrac13\Big)-\Big(-4-2+\tfrac83\Big)`] },
    { say: r`Simplify each bracket: $\tfrac76-\big(-\tfrac{10}{3}\big)=\tfrac92$.`, rows: [r`=\tfrac76+\tfrac{10}{3}=\tfrac92`], boxed: true }],
  answer: r`\tfrac92`, track: [r`y=-2,\,1`, r`\int_{-2}^{1}(2-y-y^2)\,dy`, r`\tfrac92`],
  verify: [{ value: { f: y => (2 - y) - y * y, a: -2, b: 1, val: 4.5 } }],
  heli1: [ln(r`y=-2,\;y=1`, 'cx')], heli3: [ln(r`\Big[2y-\tfrac{y^2}{2}-\tfrac{y^3}{3}\Big]_{-2}^{1}`)] }));

/* ===== Problem 12 ===== */
examples.push(areaGen({ n: 12, label: 'Problem 12', type: 'Which variable?',
  problem: r`\text{Area between }y=x^2\text{ and }y=-x+2`,
  plot: { xr: [-3.3, 2.4], yr: [-1, 5.4], xt: [-2, -1, 1, 2], yt: [1, 2, 3, 4, 5], w: 600, h: 430 },
  curves: [
    { f: x => x * x, dom: [-2.3, 2.1], color: 'cx', eq: r`y=x^2`, text: 'y = x²', at: [-2.3, 5.1], dx: 10, dy: 4, say: r`(i) Sketch. The first curve is the standard upward parabola $y=x^2$.` },
    { f: x => 2 - x, dom: [-3.1, 2.3], color: 'cd', eq: r`y=-x+2`, text: 'y = −x + 2', at: [1.3, 0.7], dx: 6, dy: -8, say: r`The second is the line $y=-x+2$, with slope $-1$ and intercept 2.` }],
  inter: quadSteps('x', r`x^2=-x+2`, r`x^2+x-2=0`, r`(x+2)(x-1)=0`, r`The solutions are $x=-2$ and $x=1$. Plug back into either curve for the $y$-values.`),
  points: [pt(-2, 4, '(−2, 4)', -10, -8, 'end'), pt(1, 1, '(1, 1)', 10, -8)],
  pointsSay: r`The curves cross at $(-2,4)$ and $(1,1)$.`,
  region: { top: x => 2 - x, bot: x => x * x, range: [-2, 1] },
  regionSay: r`The bounded region lies between the parabola below and the line above.`,
  strip: { at: -0.75, w: 0.12, text: 'dx', tx: -0.7, ty: 0.3, anchor: 'middle' },
  sliceSay: r`(ii) Which variable? Integrate in $x$. A vertical strip has the line on top and the parabola on the bottom for every $x\in[-2,1]$. Horizontal strips would change their left boundary at $y=1$ and need two integrals.`,
  height: [r`y_{\text{top}}=-x+2`, r`y_{\text{bottom}}=x^2`, r`y_{\text{top}}-y_{\text{bottom}}=-x^2-x+2`],
  heightSay: r`The strip's height is top minus bottom: $(-x+2)-x^2$.`,
  integral: r`A=\int_{-2}^{1}\big(-x^2-x+2\big)\,dx`,
  integralSay: r`(iii) Add up the strips from $x=-2$ to $x=1$.`,
  evalSteps: [
    { say: r`Antiderivative term by term.`, rows: [r`=\Big[-\tfrac{x^3}{3}-\tfrac{x^2}{2}+2x\Big]_{-2}^{1}`] },
    { say: r`Plug in the limits: upper minus lower.`, rows: [r`=\Big(-\tfrac13-\tfrac12+2\Big)-\Big(\tfrac83-2-4\Big)`] },
    { say: r`Simplify each bracket: $\tfrac76-\big(-\tfrac{10}{3}\big)=\tfrac92$.`, rows: [r`=\tfrac76+\tfrac{10}{3}=\tfrac92`], boxed: true }],
  answer: r`\tfrac92`, track: [r`x=-2,\,1`, r`\int_{-2}^{1}(-x^2-x+2)\,dx`, r`\tfrac92`],
  verify: [{ value: { f: x => (2 - x) - x * x, a: -2, b: 1, val: 4.5 } }],
  heli1: [ln(r`x=-2,\;x=1`, 'cx')], heli3: [ln(r`\Big[-\tfrac{x^3}{3}-\tfrac{x^2}{2}+2x\Big]_{-2}^{1}`)] }));

/* ===== Problem 13 ===== */
examples.push(areaGen({ n: 13, label: 'Problem 13', type: 'Which variable?', orient: 'h',
  problem: r`\text{Area between }x=y^2+1\text{ and }y=-x+3`,
  plot: { xr: [-0.9, 6.4], yr: [-3, 3.1], xt: [1, 2, 3, 4, 5], yt: [-2, -1, 1, 2], w: 620, h: 430 },
  curves: [
    { f: y => y * y + 1, dom: [-2.2, 2.2], orient: 'x', color: 'cx', eq: r`x=y^2+1`, text: 'x = y² + 1', at: [4.9, 2.0], dx: 6, dy: 4, say: r`(i) Sketch. The first curve, $x=y^2+1$, is the sideways parabola $x=y^2$ shifted one unit right. Its vertex is $(1,0)$.` },
    { f: x => 3 - x, dom: [0.3, 5.9], color: 'cd', eq: r`y=-x+3`, text: 'y = −x + 3', at: [0.4, 2.6], dx: 10, dy: -6, say: r`The second is the line $y=-x+3$, with slope $-1$ and intercept 3.` }],
  inter: [
    { say: r`Write both as $x$ in terms of $y$. Solve the line for $x$.`, rows: [r`x=3-y`] },
    { say: r`Set the two $x$-values equal, then factor.`, rows: [r`y^2+1=3-y`, r`y^2+y-2=0`, r`(y+2)(y-1)=0`] },
    { say: r`The solutions are $y=-2$ and $y=1$. Plug back into $x=3-y$ for the $x$-values.`, rows: [r`y=-2,\ y=1`], boxed: true, c: 'cx' }],
  points: [pt(5, -2, '(5, −2)', 10, 22), pt(2, 1, '(2, 1)', 10, -8)],
  pointsSay: r`The curves cross at $(5,-2)$ and $(2,1)$.`,
  region: { right: y => 3 - y, left: y => y * y + 1, range: [-2, 1] },
  regionSay: r`The bounded region lies between the parabola on the left and the line on the right.`,
  strip: { at: -0.65, w: 0.14, text: 'dy', tx: 2.0, ty: -0.62 },
  sliceSay: r`(ii) Which variable? Integrate in $y$: for every $y\in[-2,1]$ a horizontal strip has the parabola on its left and the line on its right. Vertical strips would change both boundaries and need several integrals.`,
  height: [r`x_{\text{right}}=3-y`, r`x_{\text{left}}=y^2+1`, r`x_{\text{right}}-x_{\text{left}}=2-y-y^2`],
  heightSay: r`The strip's length is right minus left: $(3-y)-(y^2+1)$.`,
  integral: r`A=\int_{-2}^{1}\big(2-y-y^2\big)\,dy`,
  integralSay: r`(iii) Add up the strips from $y=-2$ to $y=1$. It is the same integral as Problem 11.`,
  evalSteps: [
    { say: r`Antiderivative term by term.`, rows: [r`=\Big[2y-\tfrac{y^2}{2}-\tfrac{y^3}{3}\Big]_{-2}^{1}`] },
    { say: r`Plug in the limits: upper minus lower.`, rows: [r`=\Big(2-\tfrac12-\tfrac13\Big)-\Big(-4-2+\tfrac83\Big)`] },
    { say: r`Simplify each bracket: $\tfrac76-\big(-\tfrac{10}{3}\big)=\tfrac92$.`, rows: [r`=\tfrac76+\tfrac{10}{3}=\tfrac92`], boxed: true }],
  answer: r`\tfrac92`, track: [r`y=-2,\,1`, r`\int_{-2}^{1}(2-y-y^2)\,dy`, r`\tfrac92`],
  verify: [{ value: { f: y => (3 - y) - (y * y + 1), a: -2, b: 1, val: 4.5 } }],
  heli1: [ln(r`y=-2,\;y=1`, 'cx')], heli3: [ln(r`\Big[2y-\tfrac{y^2}{2}-\tfrac{y^3}{3}\Big]_{-2}^{1}`)] }));

/* ===== Problem 14 ===== */
examples.push(areaGen({ n: 14, label: 'Problem 14', type: 'Which variable?', orient: 'h',
  problem: r`\text{Area between }x=(y-1)^2\text{ and }y=-x+3`,
  plot: { xr: [-0.9, 5.8], yr: [-2.3, 3.4], xt: [1, 2, 3, 4, 5], yt: [-1, 1, 2, 3], w: 620, h: 430 },
  curves: [
    { f: y => (y - 1) * (y - 1), dom: [-1.25, 3.25], orient: 'x', color: 'cx', eq: r`x=(y-1)^2`, text: 'x = (y − 1)²', at: [4.1, -1.05], dx: 8, dy: 18, say: r`(i) Sketch. The first curve, $x=(y-1)^2$, is the sideways parabola shifted up one unit. Its vertex is $(0,1)$.` },
    { f: x => 3 - x, dom: [-0.2, 5.2], color: 'cd', eq: r`y=-x+3`, text: 'y = −x + 3', at: [0.5, 2.5], dx: 10, dy: -6, say: r`The second is the line $y=-x+3$, with slope $-1$ and intercept 3.` }],
  inter: [
    { say: r`Write both as $x$ in terms of $y$. Solve the line for $x$.`, rows: [r`x=3-y`] },
    { say: r`Set the two $x$-values equal. Expand, then factor.`, rows: [r`(y-1)^2=3-y`, r`y^2-y-2=0`, r`(y-2)(y+1)=0`] },
    { say: r`The solutions are $y=-1$ and $y=2$. Plug back into $x=3-y$ for the $x$-values.`, rows: [r`y=-1,\ y=2`], boxed: true, c: 'cx' }],
  points: [pt(4, -1, '(4, −1)', 10, 22), pt(1, 2, '(1, 2)', 10, -8)],
  pointsSay: r`The curves cross at $(4,-1)$ and $(1,2)$.`,
  region: { right: y => 3 - y, left: y => (y - 1) * (y - 1), range: [-1, 2] },
  regionSay: r`The bounded region lies between the parabola on the left and the line on the right.`,
  strip: { at: 0.15, w: 0.14, text: 'dy', tx: 2.3, ty: 0.28 },
  sliceSay: r`(ii) Which variable? Integrate in $y$. A horizontal strip has the parabola on its left and the line on its right for every $y\in[-1,2]$. Vertical strips would change both their top and bottom boundaries and need several integrals.`,
  height: [r`x_{\text{right}}=3-y`, r`x_{\text{left}}=(y-1)^2`, r`x_{\text{right}}-x_{\text{left}}=2+y-y^2`],
  heightSay: r`The strip's length is right minus left: $(3-y)-(y-1)^2=3-y-y^2+2y-1=2+y-y^2$.`,
  integral: r`A=\int_{-1}^{2}\big(2+y-y^2\big)\,dy`,
  integralSay: r`(iii) Add up the strips from $y=-1$ to $y=2$.`,
  evalSteps: [
    { say: r`Antiderivative term by term.`, rows: [r`=\Big[2y+\tfrac{y^2}{2}-\tfrac{y^3}{3}\Big]_{-1}^{2}`] },
    { say: r`Plug in the limits: upper minus lower.`, rows: [r`=\Big(4+2-\tfrac83\Big)-\Big(-2+\tfrac12+\tfrac13\Big)`] },
    { say: r`Simplify each bracket: $\tfrac{10}{3}-\big(-\tfrac76\big)=\tfrac{27}{6}=\tfrac92$.`, rows: [r`=\tfrac{10}{3}+\tfrac76=\tfrac92`], boxed: true }],
  answer: r`\tfrac92`, track: [r`y=-1,\,2`, r`\int_{-1}^{2}(2+y-y^2)\,dy`, r`\tfrac92`],
  verify: [{ value: { f: y => (3 - y) - (y - 1) * (y - 1), a: -1, b: 2, val: 4.5 } }],
  heli1: [ln(r`y=-1,\;y=2`, 'cx')], heli3: [ln(r`\Big[2y+\tfrac{y^2}{2}-\tfrac{y^3}{3}\Big]_{-1}^{2}`)] }));

/* ===== Problems 15-18: parabola and a line through the origin ===== */
function parabLine(o) {
  const { n, A, B, m, X } = o, D = A - m, peakX = A / (2 * B);
  const para = x => A * x - B * x * x, line = x => m * x;
  const parTex = `y=${A}x-${B === 1 ? '' : B}x^2`, lineTex = `y=${m}x`;
  const diff = `${D}x-${B === 1 ? '' : B}x^2`;
  return areaGen({ n, label: 'Problem ' + n, type: 'Parabola and line',
    problem: `\\text{Region enclosed by }${parTex}\\text{ and }${lineTex}`,
    plot: { xr: [-0.14 * X, 1.55 * X], yr: [-0.12 * para(peakX), 1.12 * para(peakX)], xt: o.xt, yt: o.yt, w: 600, h: 430 },
    curves: [
      { f: para, dom: [0, Math.min(1.5 * X, A / B)], color: 'cx', eq: parTex, text: `y = ${A}x − ${B === 1 ? '' : B}x²`, at: o.parLabel, dx: 8, dy: -8, say: `Curve 1, $${parTex}$, is a downward parabola through the origin. It crosses the $x$-axis again at $x=${A / B}$ and peaks at $x=${peakX}$.` },
      { f: line, dom: [0, 1.5 * X], color: 'cd', eq: lineTex, text: `y = ${m}x`, at: o.lineLabel, dx: 6, dy: 18, say: `Curve 2, $${lineTex}$, is a line through the origin with slope ${m}.` }],
    inter: [
      { say: 'Where do they meet? Set the two $y$-values equal.', rows: [`${A}x-${B === 1 ? '' : B}x^2=${m}x`] },
      { say: 'Move everything to one side and factor. Do not divide by $x$: that would lose the root $x=0$.', rows: [`${B === 1 ? '' : B}x^2-${D}x=0`, `${B === 1 ? '' : B}x\\,(x-${X})=0`] },
      { say: `The solutions are $x=0$ and $x=${X}$. Plug back into either curve for the $y$-values.`, rows: [`x=0,\\ x=${X}`], boxed: true, c: 'cx' }],
    points: [pt(0, 0, '(0, 0)', 8, 22), pt(X, line(X), `(${X}, ${line(X)})`, 12, 6)],
    pointsSay: `The curves cross at $(0,0)$ and $(${X},${line(X)})$.`,
    region: { top: para, bot: line, range: [0, X] },
    regionSay: 'The enclosed region is the cap of the parabola above the line.',
    strip: { at: X * 0.28, w: X * 0.035, text: 'dx', tx: X * 0.3, ty: line(X * 0.3) - 0.07 * para(peakX), anchor: 'middle' },
    sliceSay: `Integrate in $x$: a vertical strip has the parabola on top and the line on the bottom for every $x\\in[0,${X}]$.`,
    height: [`y_{\\text{top}}=${A}x-${B === 1 ? '' : B}x^2`, `y_{\\text{bottom}}=${m}x`, `y_{\\text{top}}-y_{\\text{bottom}}=${diff}`],
    heightSay: `The strip's height is top minus bottom: $(${A}x-${B === 1 ? '' : B}x^2)-${m}x$.`,
    integral: `A=\\int_{0}^{${X}}\\big(${diff}\\big)\\,dx`,
    integralSay: `Add up the strips from $x=0$ to $x=${X}$.`,
    evalSteps: o.evalSteps, answer: o.answer, track: [`x=0,\\,${X}`, `\\int_0^{${X}}(${diff})\\,dx`, o.answer],
    verify: [{ value: { f: x => para(x) - line(x), a: 0, b: X, val: o.val } }],
    heli1: [ln(`x=0,\;x=${X}`, 'cx')], heli3: [ln(o.antiTex)] });
}
examples.push(parabLine({ n: 15, A: 8, B: 1, m: 2, X: 6, xt: [2, 4, 6, 8], yt: [4, 8, 12, 16], parLabel: [5.6, 13.4], lineLabel: [7.3, 14.6], val: 36, answer: r`36`,
  antiTex: r`\Big[3x^2-\tfrac{x^3}{3}\Big]_0^6`,
  evalSteps: [
    { say: r`Antiderivative term by term: $\int6x\,dx=3x^2$ and $\int x^2\,dx=\tfrac{x^3}{3}$.`, rows: [r`=\Big[3x^2-\tfrac{x^3}{3}\Big]_{0}^{6}`] },
    { say: r`Plug in $x=6$. The lower limit gives 0.`, rows: [r`=3\cdot36-\tfrac{216}{3}`] },
    { say: r`$108-72=36$.`, rows: [r`=108-72=36`], boxed: true }] }));
examples.push(parabLine({ n: 16, A: 13, B: 1, m: 10, X: 3, xt: [1, 2, 3, 4, 5], yt: [10, 20, 30, 40], parLabel: [4.2, 40], lineLabel: [3.4, 34.5], val: 4.5, answer: r`\tfrac92`,
  antiTex: r`\Big[\tfrac{3x^2}{2}-\tfrac{x^3}{3}\Big]_0^3`,
  evalSteps: [
    { say: r`Antiderivative term by term: $\int3x\,dx=\tfrac{3x^2}{2}$ and $\int x^2\,dx=\tfrac{x^3}{3}$.`, rows: [r`=\Big[\tfrac{3x^2}{2}-\tfrac{x^3}{3}\Big]_{0}^{3}`] },
    { say: r`Plug in $x=3$. The lower limit gives 0.`, rows: [r`=\tfrac{27}{2}-\tfrac{27}{3}`] },
    { say: r`$\tfrac{27}{2}-9=\tfrac{9}{2}$.`, rows: [r`=\tfrac{27}{2}-9=\tfrac92`], boxed: true }] }));
examples.push(parabLine({ n: 17, A: 5, B: 1, m: 2, X: 3, xt: [1, 2, 3, 4, 5], yt: [2, 4, 6], parLabel: [3.9, 5.4], lineLabel: [4.3, 8.6], val: 4.5, answer: r`\tfrac92`,
  antiTex: r`\Big[\tfrac{3x^2}{2}-\tfrac{x^3}{3}\Big]_0^3`,
  evalSteps: [
    { say: r`Antiderivative term by term: $\int3x\,dx=\tfrac{3x^2}{2}$ and $\int x^2\,dx=\tfrac{x^3}{3}$.`, rows: [r`=\Big[\tfrac{3x^2}{2}-\tfrac{x^3}{3}\Big]_{0}^{3}`] },
    { say: r`Plug in $x=3$. The lower limit gives 0.`, rows: [r`=\tfrac{27}{2}-\tfrac{27}{3}`] },
    { say: r`$\tfrac{27}{2}-9=\tfrac{9}{2}$.`, rows: [r`=\tfrac{27}{2}-9=\tfrac92`], boxed: true }] }));
examples.push(parabLine({ n: 18, A: 10, B: 4, m: 2, X: 2, xt: [1, 2, 3], yt: [2, 4, 6], parLabel: [1.7, 6.4], lineLabel: [2.4, 5.5], val: 16 / 3, answer: r`\tfrac{16}{3}`,
  antiTex: r`\Big[4x^2-\tfrac{4x^3}{3}\Big]_0^2`,
  evalSteps: [
    { say: r`Antiderivative term by term: $\int8x\,dx=4x^2$ and $\int4x^2\,dx=\tfrac{4x^3}{3}$.`, rows: [r`=\Big[4x^2-\tfrac{4x^3}{3}\Big]_{0}^{2}`] },
    { say: r`Plug in $x=2$. The lower limit gives 0.`, rows: [r`=4\cdot4-\tfrac{4\cdot8}{3}`] },
    { say: r`$16-\tfrac{32}{3}=\tfrac{16}{3}$.`, rows: [r`=16-\tfrac{32}{3}=\tfrac{16}{3}`], boxed: true }] }));
