/* Week 9 prep quizzes · six questions: area between curves, an infinite solid, a polar solid, disks, shells */
const examples = [];
const int = T('int', r`\int`);
const pt = (x, y, text, tdx, tdy, anchor) => ({ x, y, text, tdx, tdy, anchor });
const sq = Math.sqrt, PI = Math.PI;
const optTable = (head, rows) => r`<table class="tt"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(rw => `<tr class="${rw.hl ? 'hl' : ''}">${rw.cells.map((c, i) => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</tbody></table>`;

/* ===== Quiz A · Q2 : the singularities cancel ===== */
examples.push((() => {
  const f = x => Math.exp(x) / Math.pow(Math.cos(x), 2), g = x => Math.exp(x) * Math.pow(Math.tan(x), 2);
  const P = PlotKit({ w: 640, h: 420, xr: [-0.3, 3.5], yr: [-1.5, 25] });
  P.axes('axes', { xt: [[PI / 2, 'π/2'], [PI, 'π']], yt: [5, 10, 15, 20] });
  P.line('asym', PI / 2, -1.5, PI / 2, 25, 'muted', { dash: '6 6', width: 2.5, text: 'x = π/2', at: [PI / 2, 25], dx: 8, dy: 20 });
  P.curve('f', f, [0, PI], 'cx', { n: 900, label: [0.2, 3.2], text: 'f', dx: -4, dy: -12 });
  P.curve('g', g, [0, PI], 'cd', { n: 900, label: [0.55, 0.5], text: 'g', dx: 4, dy: 26 });
  P.rect('strip', 1.0, g(1.03), 1.07, f(1.03), 'cp', { opacity: .6, minW: 5 }); P.text('gap', 1.13, (f(1) + g(1)) / 2, 'f − g', 'cp');
  P.curve('diff', x => Math.exp(x), [0, PI], 'cr', { n: 200, dash: '9 6', label: [2.55, 12.8], text: 'y = eˣ', dx: 8, dy: 4 });
  const spec = P.spec('w9a');
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size })), sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const AX = ['axes', 'asym'], eb = (k, t) => eyebrow(k, t);
  const fg = [eb('q0', 'Curves'), R('side', T('qf', r`f(x)=e^x\sec^2x`, 'cx')), R('side', T('qg', r`g(x)=e^x\tan^2x`, 'cd'))];
  const D1 = R('big', T('d1', r`f-g=e^x\sec^2x-e^x\tan^2x`)), D2 = R('big', T('d2', r`=e^x\big(\sec^2x-\tan^2x\big)`)), D3 = R('big', T('d3', r`=e^x\cdot1=e^x`, 'cr'));
  const I = R('big', T('I', r`A=\int_0^{\pi}e^x\,dx`));
  const ln1 = (k, tex, boxed) => R('line', EQ(k + 'e'), T(k, tex, 'ink', boxed ? { cls: 'boxed' } : {}));
  const steps = [
    S(1, r`$f(x)=e^x\sec^2x$ and $\sec x=\tfrac1{\cos x}$, so $f$ blows up wherever $\cos x=0$. On $[0,\pi]$ that happens at $x=\pi/2$.`, [plot([...AX, 'f'])], [fg[0], fg[1]]),
    S(1, r`$g(x)=e^x\tan^2x$ blows up at the same place, $x=\pi/2$. Each curve alone has an infinite spike in the middle of the interval.`, [plot([...AX, 'f', 'g'])], fg),
    S(1, r`The area between two curves is the gap between them at each $x$. That gap is $f-g$.`, [plot([...AX, 'f', 'g', 'strip', 'gap'])], [...fg, eb('q1', 'Area element'), R('side', T('qd', r`dA=(f-g)\,dx`, 'cp'))]),
    S(2, r`The hint says to set the problem up so the singularity does not matter. Subtract first: $f-g=e^x\sec^2x-e^x\tan^2x$.`, [D1], [eb('h0', 'Why subtract first'), R('side', RICH('hn', r`Each curve is infinite at $\pi/2$, but their difference may be well behaved.`, { cls: 'mini' }))]),
    S(2, r`Factor out the common $e^x$.`, [D1, D2], [eb('h0', 'Why subtract first'), R('side', RICH('hn', r`Each curve is infinite at $\pi/2$, but their difference may be well behaved.`, { cls: 'mini' }))]),
    S(2, r`The Pythagorean identity $\tan^2x+1=\sec^2x$ gives $\sec^2x-\tan^2x=1$. The spikes cancel exactly.`, [D1, D2, D3], [eb('h1', 'Pythagorean identity'), R('side', T('id', r`\sec^2x-\tan^2x=1`, 'ct'))]),
    S(2, r`So the gap between the curves is just $e^x$ at every $x$ (the strip is the same height as the dashed curve).`, [plot([...AX, 'f', 'g', 'strip', 'gap', 'diff'])], [eb('h2', 'Gap'), R('side', T('gp', r`f-g=e^x`, 'cr', { cls: 'boxed' }))]),
    S(2, r`Add up the gaps from $x=0$ to $x=\pi$. This is an ordinary integral with no singularity.`, [I], [eb('h3', 'Region'), sideP([...AX, 'f', 'g', 'strip', 'gap', 'diff'])]),
    S(3, r`The antiderivative of $e^x$ is $e^x$.`, [I, ln1('e1', r`\Big[e^x\Big]_0^{\pi}`)], [eb('h3', 'Region'), sideP([...AX, 'f', 'g', 'diff'])]),
    S(3, r`Plug in: upper minus lower. $e^0=1$.`, [I, ln1('e1', r`\Big[e^x\Big]_0^{\pi}`), ln1('e2', r`e^{\pi}-e^{0}`)], [eb('h3', 'Region'), sideP([...AX, 'f', 'g', 'diff'])]),
    S(3, r`$A=e^\pi-1\approx22.1$. This is the quiz's fifth choice. The choice $e^\pi$ is only the gap at $x=\pi$, and $1-e^\pi$ has the wrong sign.`, [I, ln1('e1', r`\Big[e^x\Big]_0^{\pi}`), ln1('e2', r`e^{\pi}-e^{0}`), ln1('e3', r`e^{\pi}-1\approx22.1`, true)], [eb('h3', 'Region'), sideP([...AX, 'f', 'g', 'diff'])])
  ];
  return { n: 1, label: 'Quiz A · Q2', type: 'Singularities that cancel', verb: 'Area', problem: r`e^x\sec^2x\text{ and }e^x\tan^2x,\;0\le x\le\pi`, phases: ['Look', 'Simplify', 'Integrate'],
    track: [r`f-g=e^x`, r`\int_0^\pi e^x\,dx`, r`e^\pi-1`],
    verify: [{ equal: { a: x => f(x) - g(x), b: x => Math.exp(x), range: [0, 1.5] } }, { equal: { a: x => f(x) - g(x), b: x => Math.exp(x), range: [1.65, 3.1] } }, { value: { f: x => Math.exp(x), a: 0, b: PI, val: Math.exp(PI) - 1 } }],
    steps, heli: [[{ plot: spec, show: [...AX, 'f', 'g', 'strip', 'gap'] }, ln(r`x=\tfrac\pi2:\;f,g\to\infty`, 'muted')], [ln(r`f-g=e^x\big(\sec^2x-\tan^2x\big)`), ln(r`=e^x`, 'cr')], [ln(r`\int_0^\pi e^x\,dx`), bx(r`e^\pi-1`)]] };
})());

/* ===== Quiz A · Q3 : cos^2 x and 8x^2/pi^2 ===== */
examples.push(areaGen({ n: 2, label: 'Quiz A · Q3', type: 'Familiar intersection points', verb: 'Area',
  problem: r`y=\cos^2x,\;y=\tfrac{8x^2}{\pi^2}`,
  plot: { xr: [-1.7, 1.7], yr: [-0.25, 1.38], xt: [[-PI / 4, '−π/4'], [PI / 4, 'π/4']], yt: [[0.5, '½'], [1, '1']], w: 640, h: 400 },
  curves: [
    { f: x => Math.cos(x) ** 2, dom: [-1.45, 1.45], n: 200, color: 'cx', eq: r`y=\cos^2x`, text: 'y = cos² x', at: [0.12, 1.0], dx: 8, dy: -12, say: r`Sketch. $y=\cos^2x$ is a hump of height 1 at $x=0$, with period $\pi$. Its values stay between 0 and 1.` },
    { f: x => 8 * x * x / (PI * PI), dom: [-1.13, 1.13], n: 200, color: 'cd', eq: r`y=\tfrac{8x^2}{\pi^2}`, text: 'y = 8x²/π²', at: [1.0, 0.82], dx: 10, dy: 18, say: r`$y=\tfrac{8x^2}{\pi^2}$ is an upward parabola through the origin. It reaches height 1 near $x\approx1.11$.` }],
  inter: [
    { say: r`The hint: the crossings are at familiar $x$-values. Try $x=\tfrac\pi4$: $\cos^2\tfrac\pi4=\tfrac12$ and $\tfrac{8(\pi/4)^2}{\pi^2}=\tfrac12$. They match.`, rows: [r`\cos^2\tfrac\pi4=\tfrac12`, r`\tfrac{8(\pi/4)^2}{\pi^2}=\tfrac12`], c: 'ink' },
    { say: r`Both curves are even, so $x=-\tfrac\pi4$ is also a crossing. Past it the parabola climbs above 1 and never meets the cosine again.`, rows: [r`x=\pm\tfrac\pi4`], boxed: true, c: 'cx' }],
  points: [pt(-PI / 4, 0.5, '(−π/4, ½)', -10, -10, 'end'), pt(PI / 4, 0.5, '(π/4, ½)', 10, -10)],
  pointsSay: r`The curves cross at $\big(\pm\tfrac\pi4,\tfrac12\big)$.`,
  region: { top: x => Math.cos(x) ** 2, bot: x => 8 * x * x / (PI * PI), range: [-PI / 4, PI / 4] },
  regionSay: r`The bounded region is the lens between the crossings, with the cosine on top.`,
  strip: { at: 0.3, w: 0.05, text: 'dx', tx: 0.33, ty: -0.1, anchor: 'middle' },
  sliceSay: r`Integrate in $x$. For every $x$ between the crossings the cosine is on top and the parabola on the bottom.`,
  height: [r`y_{\text{top}}=\cos^2x`, r`y_{\text{bottom}}=\tfrac{8x^2}{\pi^2}`, [r`y_{\text{top}}-y_{\text{bottom}}`, r`=\cos^2x-\tfrac{8x^2}{\pi^2}`]],
  heightSay: r`The strip's height is top minus bottom.`,
  integral: r`A=\int_{-\pi/4}^{\pi/4}\Big(\cos^2x-\tfrac{8x^2}{\pi^2}\Big)\,dx`,
  integralSay: r`Add up the strips between the crossings.`,
  evalSteps: [
    { say: r`The integrand is even and the limits are symmetric, so double the integral over $[0,\tfrac\pi4]$.`, rows: [r`=2\int_0^{\pi/4}\Big(\cos^2x-\tfrac{8x^2}{\pi^2}\Big)dx`] },
    { say: r`Use the power-reducing identity $\cos^2x=\tfrac{1+\cos2x}{2}$.`, rows: [r`=2\int_0^{\pi/4}\Big(\tfrac{1+\cos2x}{2}-\tfrac{8x^2}{\pi^2}\Big)dx`] },
    { fresh: true, say: r`Antiderivative term by term: $\tfrac x2$, $\tfrac{\sin2x}{4}$ and $\tfrac{8x^3}{3\pi^2}$.`, rows: [r`=2\Big[\tfrac x2+\tfrac{\sin2x}{4}-\tfrac{8x^3}{3\pi^2}\Big]_0^{\pi/4}`] },
    { say: r`At $x=\tfrac\pi4$: $\tfrac\pi8$, then $\tfrac{\sin(\pi/2)}{4}=\tfrac14$, then $\tfrac{8(\pi/4)^3}{3\pi^2}=\tfrac{\pi}{24}$. The lower limit gives 0.`, rows: [r`=2\Big(\tfrac\pi8+\tfrac14-\tfrac\pi{24}\Big)`] },
    { say: r`$\tfrac\pi8-\tfrac\pi{24}=\tfrac{\pi}{12}$, then double everything. This matches the quiz's choice $\tfrac12+\tfrac\pi6$.`, rows: [r`=2\Big(\tfrac{\pi}{12}+\tfrac14\Big)=\tfrac12+\tfrac\pi6`], boxed: true }],
  answer: r`\tfrac12+\tfrac\pi6`, track: [r`x=\pm\tfrac\pi4`, r`\int_{-\pi/4}^{\pi/4}\big(\cos^2x-\tfrac{8x^2}{\pi^2}\big)dx`, r`\tfrac12+\tfrac\pi6`],
  verify: [{ value: { f: x => Math.cos(x) ** 2 - 8 * x * x / (PI * PI), a: -PI / 4, b: PI / 4, val: 0.5 + PI / 6 } }, { num: { a: 8 * (PI / 4) ** 2 / (PI * PI), b: Math.cos(PI / 4) ** 2 } }, { equal: { a: x => Math.cos(x) ** 2, b: x => (1 + Math.cos(2 * x)) / 2, range: [0, 1.5] } }],
  heli1: [ln(r`x=\pm\tfrac\pi4`, 'cx')], heli3: [ln(r`2\Big[\tfrac x2+\tfrac{\sin2x}{4}-\tfrac{8x^3}{3\pi^2}\Big]_0^{\pi/4}`)] }));

/* ===== Quiz B · Q2 : infinite solid, disks ===== */
examples.push(volGen({ n: 3, label: 'Quiz B · Q2', type: 'An infinite solid, disks', verb: 'Volume', method: 'disk',
  problem: r`\text{disks of radius }e^{-x}\text{ for }1\le x<\infty`,
  plot: { xr: [-0.5, 5.1], yr: [-0.13, 0.52], xt: [1, 2, 3, 4], yt: [[0.2, '0.2'], [0.4, '0.4']], w: 640, h: 360 },
  curves: [
    { f: x => Math.exp(-x), dom: [0.3, 5], n: 200, color: 'cx', eq: r`R=e^{-x}`, text: 'y = e^(−x)', at: [2.5, 0.12], dx: 8, dy: -14, say: r`Sketch. Above each $x$ the solid has a disc of radius $e^{-x}$ centred on the $x$-axis. So its profile is the curve $y=e^{-x}$.` },
    { f: x => 0, dom: [1, 5], color: 'cd', eq: r`y=0`, say: r`The discs are centred on the $x$-axis, $y=0$.` },
    { f: y => 1, dom: [0, Math.exp(-1)], orient: 'x', color: 'ca', eq: r`x=1`, say: r`The solid starts at $x=1$ and never ends: $x$ runs out to infinity.` }],
  points: [pt(1, Math.exp(-1), '(1, 1/e)', 12, -8), pt(1, 0, '(1, 0)', 6, 24)],
  pointsSay: r`The solid begins at the disc of radius $\tfrac1e$ above $x=1$.`,
  region: { top: x => Math.exp(-x), bot: x => 0, range: [1, 5] },
  regionSay: r`The planar region under the curve, from $x=1$ out to the right. Only the first stretch is drawn; it continues forever.`,
  axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [3.4, 0], dx: 0, dy: 26, tex: r`y=0` },
  axisSay: r`Spinning this region about the $x$-axis produces exactly the solid described.`,
  slice: { at: 1.8, w: 0.08, text: 'dx', tx: 1.84, ty: -0.065, anchor: 'middle' },
  radii: [{ from: [1.7, 0], to: [1.7, Math.exp(-1.7)], color: 'cx', text: 'R', dx: -24, dy: 6 }],
  sliceSay: r`Slice with a thin slab of thickness $dx$ at position $x$.`,
  methodSay: r`The slab is perpendicular to the $x$-axis and touches it. Its cross-section is a solid disk with no hole.`,
  xsSay: r`Face-on, the disk has radius $R$ and area $\pi R^2$. Its volume is that area times the thickness $dx$.`,
  radSteps: [{ say: r`The radius is given in the problem: $R=e^{-x}$.`, show: ['rad0'], rows: [r`R=e^{-x}`], cols: ['cx'] }],
  dVSay: r`dV = $\pi R^2\,dx$. Square the radius: $(e^{-x})^2=e^{-2x}$.`,
  dV: [r`R^2=e^{-2x}`, r`dV=\pi R^2\,dx`],
  integral: r`V=\pi\int_1^{\infty}e^{-2x}\,dx`,
  integralSay: r`Add up the discs from $x=1$ to infinity. The upper limit is infinite, so this is an improper integral.`,
  evalSteps: [
    { say: r`Replace the infinite limit by $b$ and take a limit.`, rows: [r`=\pi\lim_{b\to\infty}\int_1^be^{-2x}\,dx`] },
    { say: r`The antiderivative of $e^{-2x}$ is $-\tfrac12e^{-2x}$.`, rows: [r`=\pi\lim_{b\to\infty}\Big[-\tfrac12e^{-2x}\Big]_1^b`] },
    { say: r`Upper minus lower: $-\tfrac12e^{-2b}-\big(-\tfrac12e^{-2}\big)$.`, rows: [r`=\pi\lim_{b\to\infty}\Big(\tfrac12e^{-2}-\tfrac12e^{-2b}\Big)`] },
    { say: r`As $b\to\infty$, $e^{-2b}\to0$. So $V=\tfrac{\pi}{2e^2}\approx0.2126$, the value entered in the quiz.`, rows: [r`=\tfrac{\pi}{2e^2}\approx0.2126`], boxed: true }],
  answer: r`\tfrac{\pi}{2e^2}\approx0.2126`, track: [r`\text{disks about }y=0`, r`\pi\int_1^\infty e^{-2x}\,dx`, r`\tfrac{\pi}{2e^2}\approx0.2126`],
  verify: [{ value: { f: x => PI * Math.exp(-2 * x), a: 1, b: 30, val: PI / (2 * Math.E ** 2), tol: 1e-9 } }, { num: { a: PI / (2 * Math.E ** 2), b: 0.2126, tol: 1e-4 } }],
  heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`\pi\lim_{b\to\infty}\Big[-\tfrac12e^{-2x}\Big]_1^b`)] }));

/* ===== Quiz B · Q3 : the polar solid 0<=z<=theta ===== */
examples.push((() => {
  const R1 = 1, a0 = 0.9, da = 0.2;
  const P = PlotKit({ w: 540, h: 400, xr: [-1.6, 1.6], yr: [-1.2, 1.2] });
  P.axes('axes', { xt: [], yt: [] });
  P.circle('disk', 0, 0, R1, 'cx', { fill: 'cx', opacity: .14 });
  P.arrow('rad', 0, 0, Math.cos(-0.7) * 0.97, Math.sin(-0.7) * 0.97, 'cd', { text: 'R', dx: 8, dy: 18 });
  P.line('ray', 0, 0, 1.2 * Math.cos(a0), 1.2 * Math.sin(a0), 'ct', { width: 3 });
  P.arc('arc', 0, 0, 0.3, 0, a0, 'ct', { text: 'θ', tdx: 10, tdy: 4 });
  const rx = P.X(1) - P.X(0);
  P.raw('wedge', `<path d="M${P.X(0).toFixed(1)} ${P.Y(0).toFixed(1)}L${P.X(Math.cos(a0)).toFixed(1)} ${P.Y(Math.sin(a0)).toFixed(1)}A${rx.toFixed(1)} ${rx.toFixed(1)} 0 0 0 ${P.X(Math.cos(a0 + da)).toFixed(1)} ${P.Y(Math.sin(a0 + da)).toFixed(1)}Z" style="fill:var(--cp);opacity:.6;stroke:var(--cp);stroke-width:1.5"/>`);
  P.text('dth', 1.1 * Math.cos(a0 + da / 2) + 0.02, 1.1 * Math.sin(a0 + da / 2) + 0.06, 'dθ', 'cp');
  const top = P.spec('w9poltop');
  const Z = PlotKit({ w: 540, h: 380, xr: [-0.8, 7.3], yr: [-0.8, 7.3] });
  Z.axes('axes', { xt: [[PI, 'π'], [2 * PI, '2π']], yt: [[PI, 'π'], [2 * PI, '2π']], xl: 'θ', yl: 'z' });
  Z.fill('zfill', t => t, t => 0, [0, 2 * PI], 'cr', { opacity: .2 });
  Z.curve('zl', t => t, [0, 2 * PI], 'cx', { label: [4.1, 4.1], text: 'z = θ', dx: 10, dy: 8 });
  Z.line('zv', a0, 0, a0, a0, 'ct', { dash: '6 5', width: 2.5 }); Z.dot('zd', a0, a0, 'ct', { text: 'height θ', dx: -10, dy: -12, anchor: 'end' });
  const zs = Z.spec('w9polz');
  const tp = (show, size = 'md') => R('plotrow', PLOT('pt', top, show, { size })), tps = show => R('side', PLOT('pt', top, show, { size: 'sm' }));
  const zp = (show, size = 'md') => R('plotrow', PLOT('pz', zs, show, { size })), zps = show => R('side', PLOT('pz', zs, show, { size: 'sm' }));
  const eb = (k, t) => eyebrow(k, t);
  const T1 = ['axes', 'disk', 'rad'], T2 = [...T1, 'ray', 'arc'], T3 = [...T2, 'wedge', 'dth'], ZS = ['axes', 'zfill', 'zl', 'zv', 'zd'];
  const I = R('big', T('I', r`V=\int_0^{2\pi}\tfrac12R^2\,\theta\,d\theta`));
  const ln1 = (k, tex, boxed) => R('line', EQ(k + 'e'), T(k, tex, 'ink', boxed ? { cls: 'boxed' } : {}));
  const cond = [eb('c0', 'The solid'), R('side', T('c1', r`0\le r\le R`, 'cx')), R('side', T('c2', r`0\le\theta\le2\pi`, 'ct')), R('side', T('c3', r`0\le z\le\theta`, 'cr'))];
  const steps = [
    S(1, r`View the solid from above. The condition $0\le r\le R$ with $0\le\theta\le2\pi$ describes the whole disk of radius $R$ in the $xy$-plane. That disk is the base.`, [tp(T1)], [cond[0], cond[1]]),
    S(1, r`The angle $\theta$ is measured from the positive $x$-axis. As it goes from 0 to $2\pi$ the ray sweeps once around the base.`, [tp(T2)], [cond[0], cond[1], cond[2]]),
    S(1, r`The last condition, $0\le z\le\theta$, sets the height. Above the point at polar angle $\theta$, the solid reaches up to $z=\theta$: it climbs from 0 to $2\pi$ once around, like a spiral ramp.`, [zp(ZS)], [...cond, tps(T2)]),
    S(2, r`Cut the base into thin wedges of angle $d\theta$. A wedge is a sliver of the disk with radius $R$, so its area is the sector formula $\tfrac12R^2\,d\theta$.`, [tp(T3)], [eb('w0', 'One wedge'), R('side', T('w1', r`\text{area}=\tfrac12R^2\,d\theta`, 'cp')), R('side', T('w2', r`\text{height}=\theta`, 'cr'))]),
    S(2, r`The height depends only on $\theta$, so over one thin wedge it is constant. Volume of the wedge = height times base area.`, [tp(T3)], [eb('w0', 'One wedge'), R('side', T('w1', r`\text{area}=\tfrac12R^2\,d\theta`, 'cp')), R('side', T('w2', r`\text{height}=\theta`, 'cr')), R('side', T('w3', r`dV=\tfrac12R^2\,\theta\,d\theta`, 'cp', { cls: 'boxed' }))]),
    S(2, r`Add up the wedges as $\theta$ runs from 0 to $2\pi$.`, [I], [eb('w4', 'Region'), tps(T3)]),
    S(3, r`The factor $\tfrac12R^2$ does not depend on $\theta$, so pull it out.`, [I, ln1('p1', r`\tfrac{R^2}{2}\int_0^{2\pi}\theta\,d\theta`)], [eb('w4', 'Region'), zps(ZS)]),
    S(3, r`The antiderivative of $\theta$ is $\tfrac{\theta^2}{2}$.`, [I, ln1('p1', r`\tfrac{R^2}{2}\int_0^{2\pi}\theta\,d\theta`), ln1('p2', r`\tfrac{R^2}{2}\Big[\tfrac{\theta^2}{2}\Big]_0^{2\pi}`)], [eb('w4', 'Region'), zps(ZS)]),
    S(3, r`Plug in: $\tfrac{(2\pi)^2}{2}=2\pi^2$, and the lower limit is 0. So $V=\tfrac{R^2}{2}\cdot2\pi^2=\pi^2R^2$, the quiz's fourth choice.`, [I, ln1('p1', r`\tfrac{R^2}{2}\int_0^{2\pi}\theta\,d\theta`), ln1('p2', r`\tfrac{R^2}{2}\Big[\tfrac{\theta^2}{2}\Big]_0^{2\pi}`), ln1('p3', r`\tfrac{R^2}{2}\cdot2\pi^2=\pi^2R^2`, true)], [eb('w4', 'Region'), zps(ZS)]),
    S(3, r`A cross-check with a polar iterated integral. The volume element is height times $r\,dr\,d\theta$, and the $r$-integral is easy.`, [R('big', T('J', r`V=\int_0^{2\pi}\!\!\int_0^R\theta\,r\,dr\,d\theta`)), ln1('q1', r`\int_0^{2\pi}\theta\cdot\tfrac{R^2}{2}\,d\theta=\pi^2R^2`, true)], [eb('w4', 'Region'), tps(T3)])
  ];
  const Rt = 1.7;
  return { n: 4, label: 'Quiz B · Q3', type: 'A solid in polar coordinates', verb: 'Volume', problem: r`0\le r\le R,\;0\le\theta\le2\pi,\;0\le z\le\theta`, phases: ['Picture', 'Wedge', 'Integrate'],
    track: [r`\text{height}=\theta`, r`\int_0^{2\pi}\tfrac12R^2\theta\,d\theta`, r`\pi^2R^2`],
    verify: [{ value: { f: t => 0.5 * Rt * Rt * t, a: 0, b: 2 * PI, val: PI * PI * Rt * Rt } }, { num: { a: 0.5 * (2 * PI) ** 2 / 2 * 2 / 2, b: PI * PI } }],
    steps, heli: [[{ plot: top, show: T2 }, ln(r`0\le z\le\theta`, 'cr')], [{ plot: top, show: T3 }, ln(r`dV=\tfrac12R^2\theta\,d\theta`, 'cp')], [ln(r`\tfrac{R^2}{2}\Big[\tfrac{\theta^2}{2}\Big]_0^{2\pi}`), bx(r`\pi^2R^2`)]] };
})());

/* ===== Quiz C · Q4 : disks, integration by parts twice ===== */
examples.push(volGen({ n: 5, label: 'Quiz C · Q4', type: 'Disks and integration by parts', verb: 'Volume', method: 'disk',
  problem: r`y=\ln\sqrt x,\;y=0,\;1\le x\le e\text{; about the }x\text{-axis}`,
  plot: { xr: [-0.5, 3.4], yr: [-0.2, 0.85], xt: [1, 2, [Math.E, 'e']], yt: [[0.5, '½']], w: 640, h: 380 },
  curves: [
    { f: x => 0.5 * Math.log(x), dom: [0.3, 3.0], n: 200, color: 'cx', eq: r`y=\ln\sqrt x`, text: 'y = ln√x', at: [1.25, 0.5], dx: 0, dy: -6, say: r`Sketch. $y=\ln\sqrt x$ is half of $\ln x$. It is 0 at $x=1$ and rises slowly.` },
    { f: x => 0, dom: [1, Math.E], color: 'cd', eq: r`y=0`, say: r`The region lies above the $x$-axis.` },
    { f: y => Math.E, dom: [0, 0.5], orient: 'x', color: 'ca', eq: r`x=e`, say: r`The right boundary is $x=e$, where the curve has height $\ln\sqrt e=\tfrac12$. The left end $x=1$ is where the curve touches the axis.` }],
  points: [pt(1, 0, '(1, 0)', -6, 26, 'end'), pt(Math.E, 0, '(e, 0)', 6, 26), pt(Math.E, 0.5, '(e, ½)', 10, -8)],
  pointsSay: r`The corners of the region.`,
  region: { top: x => 0.5 * Math.log(x), bot: x => 0, range: [1, Math.E] },
  regionSay: r`The region $D$ is the thin area under the curve from $x=1$ to $x=e$.`,
  axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [-0.45, 0], dx: 0, dy: -10, tex: r`y=0` },
  axisSay: r`Revolve $D$ about the $x$-axis.`,
  slice: { at: 1.8, w: 0.06, text: 'dx', tx: 1.83, ty: 0.4, anchor: 'middle' },
  radii: [{ from: [1.72, 0], to: [1.72, 0.5 * Math.log(1.72)], color: 'cx', text: 'R', dx: -24, dy: 6 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the $x$-axis up to the curve.`,
  methodSay: r`The strip is perpendicular to the $x$-axis and touches it. Spinning it makes a solid disk, with no hole.`,
  xsSay: r`Face-on, the disk has radius $R$ and area $\pi R^2$. Its volume is that area times the thickness $dx$.`,
  radSteps: [{ say: r`The radius is the curve's height. Use the log rule $\ln\sqrt x=\ln x^{1/2}=\tfrac12\ln x$.`, show: ['rad0'], rows: [r`R=\ln\sqrt x=\tfrac12\ln x`], cols: ['cx'] }],
  dVSay: r`dV = $\pi R^2\,dx$. Square the radius: $\big(\tfrac12\ln x\big)^2=\tfrac14(\ln x)^2$.`,
  dV: [r`R^2=\tfrac14(\ln x)^2`, r`dV=\pi R^2\,dx`],
  integral: r`V=\pi\int_1^e\tfrac14(\ln x)^2\,dx`,
  integralSay: r`Add up the disks from $x=1$ to $x=e$.`,
  evalSteps: [
    { say: r`The constant $\tfrac14$ comes out. What is left, $\int(\ln x)^2dx$, needs integration by parts, twice.`, rows: [r`=\tfrac\pi4\int_1^e(\ln x)^2\,dx`] },
    { fresh: true, say: r`First, parts with $u=(\ln x)^2$ and $dv=dx$. Then $du=\tfrac{2\ln x}{x}dx$ and $v=x$, and the $x$ cancels the $\tfrac1x$.`, rows: [r`\int(\ln x)^2dx=x(\ln x)^2-2\int\ln x\,dx`],
      side: [eyebrow('eb9', 'Parts'), R('side', T('p1', r`u=(\ln x)^2`, 'cx')), R('side', T('p2', r`dv=dx`, 'cd')), R('side', T('p3', r`du=\tfrac{2\ln x}{x}\,dx`, 'cx')), R('side', T('p4', r`v=x`, 'cd'))] },
    { say: r`The leftover $\int\ln x\,dx$ is a standard parts result (take $u=\ln x$, $dv=dx$).`, rows: [r`\int\ln x\,dx=x\ln x-x`],
      side: [eyebrow('eb9', 'Parts again'), R('side', T('p1', r`u=\ln x`, 'cx')), R('side', T('p2', r`dv=dx`, 'cd')), R('side', T('p3', r`du=\tfrac1x\,dx`, 'cx')), R('side', T('p4', r`v=x`, 'cd'))] },
    { say: r`Substitute back: $-2(x\ln x-x)=-2x\ln x+2x$.`, rows: [r`\int(\ln x)^2dx=x(\ln x)^2-2x\ln x+2x`] },
    { fresh: true, say: r`Back to the definite integral, with the constant $\tfrac\pi4$.`, rows: [r`=\tfrac\pi4\Big[x(\ln x)^2-2x\ln x+2x\Big]_1^e`] },
    { say: r`At $x=e$: $\ln e=1$, so $e-2e+2e=e$. At $x=1$: $\ln1=0$, so only $2\cdot1=2$ remains.`, rows: [r`=\tfrac\pi4\Big[(e-2e+2e)-(0-0+2)\Big]`] },
    { say: r`$e-2$ is about $0.718$. This is the quiz choice $\tfrac{\pi(e-2)}{4}$; forgetting that $R=\tfrac12\ln x$ is squared would give $\tfrac{\pi(e-2)}{1}$.`, rows: [r`=\tfrac\pi4(e-2)\approx0.564`], boxed: true }],
  answer: r`\tfrac{\pi(e-2)}{4}`, track: [r`\text{disks about }y=0`, r`\tfrac\pi4\int_1^e(\ln x)^2dx`, r`\tfrac{\pi(e-2)}{4}`],
  verify: [{ value: { f: x => PI * (0.5 * Math.log(x)) ** 2, a: 1, b: Math.E, val: PI * (Math.E - 2) / 4 } }, { anti: { F: x => x * Math.log(x) ** 2 - 2 * x * Math.log(x) + 2 * x, f: x => Math.log(x) ** 2, range: [1.01, 2.7] } }, { equal: { a: x => Math.log(Math.sqrt(x)), b: x => 0.5 * Math.log(x), range: [0.5, 3] } }],
  heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`\tfrac\pi4\Big[x(\ln x)^2-2x\ln x+2x\Big]_1^e`)] }));

/* ===== Quiz C · Q5 : which integral gives the shells about x = 5? ===== */
examples.push(volGen({ n: 6, label: 'Quiz C · Q5', type: 'Shells about x = 5', verb: 'Volume', method: 'shell',
  problem: r`y=1-x^4,\;x\ge0,\;y\ge0\text{; about }x=5`,
  plot: { xr: [-0.6, 6.4], yr: [-0.22, 1.35], xt: [1, 5], yt: [[0.5, '½'], [1, '1']], w: 640, h: 380 },
  curves: [
    { f: x => 1 - Math.pow(x, 4), dom: [0, 1.02], n: 200, color: 'cx', eq: r`y=1-x^4`, text: 'y = 1 − x⁴', at: [0.55, 0.92], dx: 12, dy: -10, say: r`Sketch. In the first quadrant $y=1-x^4$ starts at $(0,1)$ and falls to $(1,0)$, hugging the top for a while and then dropping fast.` },
    { f: x => 0, dom: [0, 1], color: 'cd', eq: r`y=0`, say: r`The region is bounded below by the $x$-axis and on the left by the $y$-axis.` }],
  points: [pt(0, 1, '(0, 1)', 12, 8), pt(1, 0, '(1, 0)', 6, 26), pt(0, 0, '(0, 0)', -10, 26, 'end')],
  pointsSay: r`The corners of the region $D$.`,
  region: { top: x => 1 - Math.pow(x, 4), bot: x => 0, range: [0, 1] },
  regionSay: r`The region $D$ is the area under the curve in the first quadrant.`,
  axis: { kind: 'v', at: 5, text: 'axis x = 5', dx: 8, dy: 18, tex: r`x=5` },
  axisSay: r`Revolve $D$ about the vertical line $x=5$, well to the right of the region.`,
  slice: { at: 0.5, w: 0.04, text: 'dx', tx: 0.52, ty: 1.0, anchor: 'middle' },
  radii: [
    { from: [5, 0.4], to: [0.54, 0.4], color: 'cd', text: 'r', dx: 0, dy: -12 },
    { from: [0.64, 0], to: [0.64, 1 - Math.pow(0.64, 4)], color: 'cp', text: 'h', dx: 8, dy: 4 }],
  sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the $x$-axis up to the curve.`,
  methodSay: r`The strip is parallel to the vertical axis $x=5$. Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
  xsSay: r`A shell with radius $r$, height $h$ and thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
  radSteps: [
    { say: r`The strip sits at $x$, to the left of the axis $x=5$. The radius is the distance between them: $r=5-x$.`, show: ['rad0'], rows: [r`r=5-x`], cols: ['cd'] },
    { say: r`The height runs from the $x$-axis up to the curve: $h=1-x^4$. Not $5-x^4$.`, show: ['rad1'], rows: [r`h=1-x^4`], cols: ['cp'] }],
  dVSay: r`dV = $2\pi\,r\,h\,dx$: circumference, times height, times thickness.`,
  dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi(5-x)(1-x^4)\,dx`],
  integral: r`V=\int_0^1 2\pi(5-x)(1-x^4)\,dx`,
  integralSay: r`Add up the shells from $x=0$ to $x=1$. This is exactly the fourth answer choice.`,
  evalSteps: [
    { say: r`Optional: evaluate it. Expand $(5-x)(1-x^4)=5-x-5x^4+x^5$.`, rows: [r`=2\pi\int_0^1\big(5-x-5x^4+x^5\big)\,dx`] },
    { say: r`Antiderivative term by term.`, rows: [r`=2\pi\Big[5x-\tfrac{x^2}{2}-x^5+\tfrac{x^6}{6}\Big]_0^1`] },
    { say: r`Plug in $x=1$: $5-\tfrac12-1+\tfrac16=\tfrac{11}{3}$.`, rows: [r`=2\pi\Big(5-\tfrac12-1+\tfrac16\Big)=\tfrac{22\pi}{3}`], boxed: true },
    { fresh: true, say: r`Why the other five choices fail.`,
      main: [R('line', RICH('tbl', optTable(['Choice', 'Why it is wrong'], [
        { cells: [r`$\int_0^1 2\pi(5-x)(5-x^4)\,dx$`, r`Height should be $1-x^4$, not $5-x^4$.`] },
        { cells: [r`$\int_0^1 2\pi x(x^4-5)\,dx$`, r`Radius $x$ is for the $y$-axis, and $x^4-5<0$.`] },
        { cells: [r`$\int_0^1 \pi x^2(1-x^4)\,dx$`, r`Mixes a disk-style $x^2$ with a shell-style height.`] },
        { hl: true, cells: [r`$\int_0^1 2\pi(5-x)(1-x^4)\,dx$`, r`Radius $5-x$, height $1-x^4$. Correct.`] },
        { cells: [r`$\int_{1}^{1}5\pi y\sqrt[3]{y-1}\,dy$`, r`Limits $1$ to $1$ give 0, and the setup is not a volume.`] },
        { cells: [r`$\int_0^1 \pi(1-x^4)^2\,dx$`, r`Disks about the $x$-axis, not about $x=5$.`] }]), { cls: 'tablecard sm' }))], side: [] }],
  answer: r`\int_0^1 2\pi(5-x)(1-x^4)\,dx`, track: [r`\text{shells about }x=5`, r`\int_0^1 2\pi(5-x)(1-x^4)\,dx`, r`\tfrac{22\pi}{3}`],
  verify: [{ value: { f: x => 2 * PI * (5 - x) * (1 - x ** 4), a: 0, b: 1, val: 22 * PI / 3 } }, { equal: { a: x => (5 - x) * (1 - x ** 4), b: x => 5 - x - 5 * x ** 4 + x ** 5, range: [0, 1] } }],
  heli1: [ln(r`\text{about }x=5`, 'ct')], heli3: [ln(r`2\pi\Big[5x-\tfrac{x^2}{2}-x^5+\tfrac{x^6}{6}\Big]_0^1`)] }));

/* ===== intro ===== */
const introW9 = [
  { id: 'title', label: 'Title', head: { eb: 'MATH 1400 · Week 9 prep quizzes', prob: null }, layout: 'full', tag: '',
    say: r`Six questions from the Week 9 prep quizzes, each as its own lesson: area between curves, volumes by disks and shells, and a solid in polar coordinates. Press → or click to begin.`,
    main: [R('eyebrow', H('t1', 'Canvas prep quizzes · Week 9')), R('display', H('t2', 'Areas and Volumes', 'ink')),
      R('lead', H('t3', 'Sketch it, slice it, then integrate.')),
      R('chips', H('c1', '<b>A</b>2 questions', 'ink', { cls: 'chip' }), H('c2', '<b>B</b>2 questions', 'ink', { cls: 'chip' }), H('c3', '<b>C</b>2 questions', 'ink', { cls: 'chip' })),
      R('sample', T('s1', r`A=\int(\text{top}-\text{bottom})\,dx`, 'ct'), T('s2', r`\;\;V=\int\pi R^2\,dx\;\text{ or }\int2\pi r\,h\,dx`, 'cx'))], side: [] },
  { id: 'map', label: 'The six questions', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Quiz A: two areas, one hiding a cancelling singularity and one with familiar crossing points. Quiz B: an infinite solid and a solid in polar coordinates. Quiz C: a disk volume and a shell setup.`,
    main: [R('cols',
      ST([H('m1h', 'Quiz A', 'muted', { cls: 'eyebrow' })], [T('m1a', r`e^x\sec^2x\text{ and }e^x\tan^2x`, 'ct')], [T('m1b', r`\cos^2x\text{ and }\tfrac{8x^2}{\pi^2}`, 'ct')]),
      ST([H('m2h', 'Quiz B', 'muted', { cls: 'eyebrow' })], [T('m2a', r`\pi\int_1^\infty e^{-2x}\,dx`, 'cx')], [T('m2b', r`0\le r\le R,\;0\le z\le\theta`, 'cx')]),
      ST([H('m3h', 'Quiz C', 'muted', { cls: 'eyebrow' })], [T('m3a', r`y=\ln\sqrt x\text{ about the }x\text{-axis}`, 'cr')], [T('m3b', r`y=1-x^4\text{ about }x=5`, 'cr')]))], side: [] },
];
LESSON({ key: 'w9', title: 'Week 9 Prep Quizzes · in Motion', intro: introW9, examples });
