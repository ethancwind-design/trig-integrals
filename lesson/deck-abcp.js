/* Problem Set: Area Between Curves · problems 10-14: polar areas (rose petal, between two curves, inner loop, overlap, lemniscate) */
{
const PI = Math.PI, sin = Math.sin, cos = Math.cos, S3 = Math.sqrt(3);
const pt = (x, y, text, tdx, tdy, anchor) => ({ x, y, text, tdx, tdy, anchor });
const vals = (head, ...rows) => [eyebrow('vl', head), ...rows.map((t, i) => R('side', T('v' + i, t, 'ct')))];
const check = (head, ...rows) => [eyebrow('ck', head), ...rows.map((t, i) => R('side', T('k' + i, t, i === rows.length - 1 ? 'cr' : 'ct')))];

/* ===== 10 : one petal of the rose r = 2 cos 3θ ===== */
const rose = t => 2 * cos(3 * t);
examples.push(polarGen({ verb: 'Find', n: 10, label: 'Problem 10', type: 'Polar area · one petal of a rose',
  problem: r`\text{one petal of }r=2\cos3\theta`,
  plot: { xr: [-2.6, 3.2], xt: [2], yt: [] },
  curves: [{ r: rose, dom: [0, PI], n: 400, color: 'cx', eq: r`r=2\cos3\theta`, text: 'r = 2cos 3θ', at: [0.5, 1.7], dx: 0, dy: 0,
    say: r`$r=2\cos3\theta$ is a rose with three petals. A point sits at distance $r$ from the pole (the origin) in the direction $\theta$. At $\theta=0$ we get $r=2$: the tip of the petal on the positive $x$-axis.` }],
  rays: [{ t: PI / 6, len: 2.35, color: 'ca', text: 'θ = π/6', dx: 8, dy: -6 }, { t: -PI / 6, len: 2.35, color: 'ca', text: 'θ = −π/6', dx: 8, dy: 18 }],
  inter: [
    { say: r`A petal starts and ends at the pole, where $r=0$. Solve $\cos3\theta=0$.`, rows: [r`2\cos3\theta=0`, r`3\theta=\pm\tfrac\pi2`] },
    { say: r`Divide by 3. The petal on the $x$-axis is traced from $\theta=-\tfrac\pi6$ to $\theta=\tfrac\pi6$, with $r$ positive throughout.`, rows: [r`\theta=-\tfrac\pi6,\ \tfrac\pi6`], boxed: true, c: 'cx', rays: true }],
  regionSay: r`The shaded petal is what is swept as $\theta$ runs from $-\tfrac\pi6$ to $\tfrac\pi6$.`,
  region: [{ t0: -PI / 6, t1: PI / 6, ro: rose }],
  wedge: { t: 0.1, dt: 0.24, ro: rose, tx: 1.5, ty: 0.64, rdx: -6, rdy: -12 },
  wedgeSay: r`Cut the petal into thin wedges from the pole, each of angle $d\theta$. A thin wedge is almost a circular sector of radius $r$, and a sector of angle $d\theta$ has area $\tfrac12r^2\,d\theta$.`,
  dA: r`dA=\tfrac12r^2\,d\theta`,
  rows: [r`r=2\cos3\theta`, r`r^2=4\cos^23\theta`, r`dA=\tfrac12\cdot4\cos^23\theta\,d\theta`],
  rowsSay: r`Substitute the rose's radius into the area element.`,
  integral: r`A=\tfrac12\int_{-\pi/6}^{\pi/6}\big(2\cos3\theta\big)^2\,d\theta`,
  integralSay: r`Add up the wedges across the petal, from $\theta=-\tfrac\pi6$ to $\tfrac\pi6$.`,
  evalSteps: [
    { say: r`Square it: $(2\cos3\theta)^2=4\cos^23\theta$, and $\tfrac12\cdot4=2$.`, rows: [r`=2\int_{-\pi/6}^{\pi/6}\cos^23\theta\,d\theta`] },
    { say: r`Half-angle identity with $3\theta$ in place of $\theta$: $\cos^23\theta=\tfrac{1+\cos6\theta}{2}$. The 2 cancels the $\tfrac12$.`, rows: [r`=\int_{-\pi/6}^{\pi/6}\big(1+\cos6\theta\big)\,d\theta`] },
    { say: r`Integrate: $\int\cos6\theta\,d\theta=\tfrac16\sin6\theta$.`, rows: [r`=\Big[\theta+\tfrac16\sin6\theta\Big]_{-\pi/6}^{\pi/6}`] },
    { say: r`At $\theta=\pm\tfrac\pi6$ we have $6\theta=\pm\pi$ and $\sin(\pm\pi)=0$. Only $\theta$ survives: $\tfrac\pi6-\big(-\tfrac\pi6\big)=\tfrac\pi3$.`, rows: [r`=\Big(\tfrac\pi6+0\Big)-\Big(-\tfrac\pi6+0\Big)=\tfrac\pi3`], boxed: true,
      side: check('Check', r`3\text{ petals}`, r`3\cdot\tfrac\pi3=\pi`) }],
  answer: r`\tfrac\pi3`, track: [r`\theta=\pm\tfrac\pi6`, r`\tfrac12\int_{-\pi/6}^{\pi/6}(2\cos3\theta)^2d\theta`, r`\tfrac\pi3`],
  verify: [{ value: { f: t => 0.5 * rose(t) ** 2, a: -PI / 6, b: PI / 6, val: PI / 3 } }, { equal: { a: t => 0.5 * rose(t) ** 2, b: t => 1 + cos(6 * t), range: [-0.5, 0.5] } }, { num: { a: PI / 6 + PI / 6, b: PI / 3 } }, { value: { f: t => 0.5 * rose(t) ** 2, a: 0, b: PI, val: PI } }],
  heli1: [ln(r`\cos3\theta=0\Rightarrow\theta=\pm\tfrac\pi6`, 'cx')], heli3: [ln(r`\Big[\theta+\tfrac16\sin6\theta\Big]_{-\pi/6}^{\pi/6}`)] }));

/* ===== 11 : inside r = 3 sin θ, outside r = 1 + sin θ ===== */
const cir11 = t => 3 * sin(t), car11 = t => 1 + sin(t);
examples.push(polarGen({ verb: 'Find', n: 11, label: 'Problem 11', type: 'Polar area · between two curves',
  problem: r`\text{inside }r=3\sin\theta,\ \text{outside }r=1+\sin\theta`,
  plot: { xr: [-2.7, 3.0], yc: 1.4, xt: [-1, 1], yt: [1, 2, 3] },
  curves: [
    { r: cir11, dom: [0, PI], color: 'cx', eq: r`r=3\sin\theta`, text: 'r = 3 sin θ', at: [1.45, 2.55], dx: 8, dy: -4, say: r`$r=3\sin\theta$ is a circle of radius $\tfrac32$ centered at $\big(0,\tfrac32\big)$ that passes through the pole. It is traced as $\theta$ goes from 0 to $\pi$.` },
    { r: car11, dom: [0, 2 * PI], n: 300, color: 'cd', eq: r`r=1+\sin\theta`, text: 'r = 1 + sin θ', at: [1.25, 0.1], dx: 10, dy: 30, say: r`$r=1+\sin\theta$ is a cardioid (a heart shape) with its cusp at the pole. At $\theta=\tfrac\pi2$ it reaches $r=2$, at the top.` }],
  rays: [{ t: PI / 6, len: 2.9, color: 'ca', text: 'θ = π/6', dx: -6, dy: -8, anchor: 'end' }, { t: 5 * PI / 6, len: 2.9, color: 'ca', text: 'θ = 5π/6', dx: 6, dy: -8 }],
  inter: [
    { say: r`Where do the curves cross? Set the two radii equal.`, rows: [r`3\sin\theta=1+\sin\theta`] },
    { say: r`Solve for $\sin\theta$.`, rows: [r`2\sin\theta=1`, r`\sin\theta=\tfrac12`] },
    { say: r`Two angles in $[0,\pi]$ have sine $\tfrac12$. These rays mark the edges of the region.`, rows: [r`\theta=\tfrac\pi6,\ \tfrac{5\pi}6`], boxed: true, c: 'cx', rays: true }],
  points: [pt(1.5 * cos(PI / 6), 0.75, '', 0, 0), pt(-1.5 * cos(PI / 6), 0.75, '', 0, 0)],
  pointsSay: r`Both curves have $r=\tfrac32$ at those angles: these are the two crossing points.`,
  regionSay: r`Inside the circle and outside the cardioid: the shaded cap. For $\tfrac\pi6\le\theta\le\tfrac{5\pi}{6}$ the circle is the outer boundary (at $\theta=\tfrac\pi2$: 3 versus 2).`,
  region: [{ t0: PI / 6, t1: 5 * PI / 6, ro: cir11, ri: car11 }],
  wedge: { t: 0.85, dt: 0.17, ro: cir11, ri: car11, tx: 1.6, ty: 2.1, rText: '', rdx: 0, rdy: 0 },
  wedgeSay: r`A thin wedge now runs from the cardioid out to the circle. Its area is the outer sector minus the inner sector: $\tfrac12r_{\text{out}}^2\,d\theta-\tfrac12r_{\text{in}}^2\,d\theta$.`,
  dA: r`dA=\tfrac12\big(r_{\text{out}}^2-r_{\text{in}}^2\big)\,d\theta`,
  rows: [r`r_{\text{out}}=3\sin\theta`, r`r_{\text{in}}=1+\sin\theta`, r`r_{\text{out}}^2-r_{\text{in}}^2=9\sin^2\theta-(1+\sin\theta)^2`],
  rowsSay: r`Substitute both radii into $r_{\text{out}}^2-r_{\text{in}}^2$.`,
  integral: [r`A=\tfrac12\int_{\pi/6}^{5\pi/6}\Big[(3\sin\theta)^2`, r`\qquad\qquad-(1+\sin\theta)^2\Big]\,d\theta`],
  integralSay: r`Add up the wedges from $\theta=\tfrac\pi6$ to $\tfrac{5\pi}6$.`,
  evalSteps: [
    { say: r`Expand $(1+\sin\theta)^2=1+2\sin\theta+\sin^2\theta$ and combine the $\sin^2\theta$ terms: $9-1=8$.`, rows: [r`=\tfrac12\int_{\pi/6}^{5\pi/6}\big(8\sin^2\theta-2\sin\theta-1\big)\,d\theta`] },
    { say: r`Half-angle: $8\sin^2\theta=4-4\cos2\theta$. Then $4-1=3$.`, rows: [r`=\tfrac12\int_{\pi/6}^{5\pi/6}\big(3-4\cos2\theta-2\sin\theta\big)\,d\theta`] },
    { say: r`Integrate: $\int\cos2\theta\,d\theta=\tfrac12\sin2\theta$ and $\int\sin\theta\,d\theta=-\cos\theta$.`, fresh: true, rows: [r`=\tfrac12\Big[3\theta-2\sin2\theta+2\cos\theta\Big]_{\pi/6}^{5\pi/6}`] },
    { say: r`At $\tfrac{5\pi}{6}$: $\tfrac{5\pi}{2}+\sqrt3-\sqrt3$. At $\tfrac\pi6$: $\tfrac\pi2-\sqrt3+\sqrt3$. The $\sqrt3$ terms cancel at both ends.`, rows: [r`=\tfrac12\Big[\Big(\tfrac{5\pi}{2}+\sqrt3-\sqrt3\Big)-\Big(\tfrac\pi2-\sqrt3+\sqrt3\Big)\Big]`],
      side: vals('Exact values', r`\sin\tfrac{5\pi}3=-\tfrac{\sqrt3}{2}`, r`\cos\tfrac{5\pi}6=-\tfrac{\sqrt3}{2}`, r`\sin\tfrac\pi3=\tfrac{\sqrt3}{2}`, r`\cos\tfrac\pi6=\tfrac{\sqrt3}{2}`) },
    { say: r`$\tfrac{5\pi}{2}-\tfrac\pi2=2\pi$, and half of it is $\pi$.`, fresh: true, rows: [r`=\tfrac12\Big(\tfrac{5\pi}{2}-\tfrac\pi2\Big)=\tfrac12\big(2\pi\big)=\pi`], boxed: true }],
  answer: r`\pi`, track: [r`\theta=\tfrac\pi6,\,\tfrac{5\pi}6`, r`\tfrac12\int\big(r_{\text{out}}^2-r_{\text{in}}^2\big)d\theta`, r`\pi`],
  verify: [{ value: { f: t => 0.5 * (cir11(t) ** 2 - car11(t) ** 2), a: PI / 6, b: 5 * PI / 6, val: PI } }, { equal: { a: t => cir11(t) ** 2 - car11(t) ** 2, b: t => 8 * sin(t) ** 2 - 2 * sin(t) - 1, range: [0, 3.1] } }, { equal: { a: t => 8 * sin(t) ** 2 - 2 * sin(t) - 1, b: t => 3 - 4 * cos(2 * t) - 2 * sin(t), range: [0, 3.1] } },
    { anti: { F: t => 0.5 * (3 * t - 2 * sin(2 * t) + 2 * cos(t)), f: t => 0.5 * (8 * sin(t) ** 2 - 2 * sin(t) - 1), range: [0.6, 2.5] } }, { num: { a: 0.5 * (5 * PI / 2 - PI / 2), b: PI } }],
  heli1: [ln(r`3\sin\theta=1+\sin\theta\Rightarrow\theta=\tfrac\pi6,\,\tfrac{5\pi}6`, 'cx')], heli3: [ln(r`\tfrac12\Big[3\theta-2\sin2\theta+2\cos\theta\Big]_{\pi/6}^{5\pi/6}`)] }));

/* ===== 12 : inner loop of the limaçon r = 1 + 2 cos θ ===== */
const lim = t => 1 + 2 * cos(t);
examples.push(polarGen({ verb: 'Find', n: 12, label: 'Problem 12', type: 'Polar area · inner loop of a limaçon',
  problem: r`\text{inner loop of }r=1+2\cos\theta`,
  plot: { xr: [-1.9, 4.0], xt: [1, 3], yt: [] },
  curves: [{ r: lim, dom: [0, 2 * PI], n: 480, color: 'cx', eq: r`r=1+2\cos\theta`, text: 'r = 1 + 2cos θ', at: [1.6, 1.78], dx: 0, dy: -8,
    say: r`$r=1+2\cos\theta$ is a limaçon. At $\theta=0$, $r=3$ at the far right. As $\theta$ grows, $r$ shrinks, reaches 0, and turns negative. That is what makes the small inner loop.` }],
  rays: [{ t: 2 * PI / 3, len: 1.5, both: true, color: 'ca', text: 'θ = 2π/3', dx: -4, dy: -8, anchor: 'end' }, { t: 4 * PI / 3, len: 1.5, both: true, color: 'ca', text: 'θ = 4π/3', dx: -4, dy: 18, anchor: 'end' }],
  inter: [
    { say: r`The inner loop is traced while $r<0$, and it starts and ends at the pole, where $r=0$.`, rows: [r`1+2\cos\theta=0`, r`\cos\theta=-\tfrac12`] },
    { say: r`In $[0,2\pi]$ the cosine equals $-\tfrac12$ at two angles. The dashed lines through the pole are the tangents to the loop there.`, rows: [r`\theta=\tfrac{2\pi}3,\ \tfrac{4\pi}3`], boxed: true, c: 'cx', rays: true },
    { say: r`Between those angles $r$ is negative, and a negative $r$ is plotted on the opposite side of the pole. So the loop lands to the right of the origin, from $x=0$ to $x=1$.`, rows: [r`\tfrac{2\pi}3<\theta<\tfrac{4\pi}3\Rightarrow r<0`] }],
  regionSay: r`The shaded loop is what is swept for $\tfrac{2\pi}{3}\le\theta\le\tfrac{4\pi}{3}$.`,
  region: [{ t0: 2 * PI / 3, t1: 4 * PI / 3, ro: lim }],
  wedge: { t: 2.3, dt: 0.3, ro: lim, tx: 0.62, ty: -0.62, rdx: 4, rdy: 16 },
  wedgeSay: r`Wedges sweep from the pole out to the loop, again with area $\tfrac12r^2\,d\theta$. Squaring makes the negative $r$ harmless: $r^2\ge0$, so every wedge adds positive area.`,
  dA: r`dA=\tfrac12r^2\,d\theta`,
  rows: [r`r=1+2\cos\theta`, r`r^2=\big(1+2\cos\theta\big)^2`, r`dA=\tfrac12\big(1+2\cos\theta\big)^2d\theta`],
  rowsSay: r`Substitute $r$ into the area element.`,
  integral: r`A=\tfrac12\int_{2\pi/3}^{4\pi/3}\big(1+2\cos\theta\big)^2\,d\theta`,
  integralSay: r`Add up the wedges over the loop's range of angles.`,
  evalSteps: [
    { say: r`Expand the square: $(1+2\cos\theta)^2=1+4\cos\theta+4\cos^2\theta$.`, rows: [r`=\tfrac12\int_{2\pi/3}^{4\pi/3}\big(1+4\cos\theta+4\cos^2\theta\big)\,d\theta`] },
    { say: r`Half-angle: $4\cos^2\theta=2+2\cos2\theta$. Then $1+2=3$.`, rows: [r`=\tfrac12\int_{2\pi/3}^{4\pi/3}\big(3+4\cos\theta+2\cos2\theta\big)\,d\theta`] },
    { say: r`Integrate each term: $3\theta$, $4\sin\theta$, and $\sin2\theta$ (since $\int2\cos2\theta\,d\theta=\sin2\theta$).`, fresh: true, rows: [r`=\tfrac12\Big[3\theta+4\sin\theta+\sin2\theta\Big]_{2\pi/3}^{4\pi/3}`] },
    { say: r`At $\tfrac{4\pi}3$: $4\pi-2\sqrt3+\tfrac{\sqrt3}{2}=4\pi-\tfrac{3\sqrt3}{2}$. At $\tfrac{2\pi}{3}$: $2\pi+2\sqrt3-\tfrac{\sqrt3}{2}=2\pi+\tfrac{3\sqrt3}{2}$.`, rows: [r`=\tfrac12\Big[\Big(4\pi-\tfrac{3\sqrt3}{2}\Big)-\Big(2\pi+\tfrac{3\sqrt3}{2}\Big)\Big]`],
      side: vals('Exact values', r`\sin\tfrac{4\pi}3=-\tfrac{\sqrt3}{2}`, r`\sin\tfrac{8\pi}3=\tfrac{\sqrt3}{2}`, r`\sin\tfrac{2\pi}3=\tfrac{\sqrt3}{2}`) },
    { say: r`Subtract: $4\pi-2\pi=2\pi$ and $-\tfrac{3\sqrt3}{2}-\tfrac{3\sqrt3}{2}=-3\sqrt3$. Then halve.`, rows: [r`=\tfrac12\big(2\pi-3\sqrt3\big)=\pi-\tfrac{3\sqrt3}{2}\approx0.544`], boxed: true }],
  answer: r`\pi-\tfrac{3\sqrt3}{2}\approx0.544`, track: [r`\theta=\tfrac{2\pi}3,\,\tfrac{4\pi}3`, r`\tfrac12\int_{2\pi/3}^{4\pi/3}(1+2\cos\theta)^2d\theta`, r`\pi-\tfrac{3\sqrt3}{2}`],
  verify: [{ value: { f: t => 0.5 * lim(t) ** 2, a: 2 * PI / 3, b: 4 * PI / 3, val: PI - 3 * S3 / 2 } }, { equal: { a: t => lim(t) ** 2, b: t => 3 + 4 * cos(t) + 2 * cos(2 * t), range: [0, 6.2] } }, { anti: { F: t => 0.5 * (3 * t + 4 * sin(t) + sin(2 * t)), f: t => 0.5 * lim(t) ** 2, range: [2.2, 4.1] } }, { num: { a: 0.5 * (2 * PI - 3 * S3), b: PI - 3 * S3 / 2 } }],
  heli1: [ln(r`1+2\cos\theta=0\Rightarrow\theta=\tfrac{2\pi}3,\,\tfrac{4\pi}3`, 'cx')], heli3: [ln(r`\tfrac12\Big[3\theta+4\sin\theta+\sin2\theta\Big]_{2\pi/3}^{4\pi/3}`)] }));

/* ===== 13 : inside both r = 2 cos θ and r = 2 sin θ ===== */
const c13 = t => 2 * cos(t), s13 = t => 2 * sin(t);
examples.push(polarGen({ verb: 'Find', n: 13, label: 'Problem 13', type: 'Polar area · overlap of two circles',
  problem: r`\text{inside both }r=2\cos\theta\text{ and }r=2\sin\theta`,
  plot: { xr: [-2.0, 3.2], yc: 0.5, xt: [1, 2], yt: [1, 2] },
  curves: [
    { r: c13, dom: [-PI / 2, PI / 2], color: 'cx', eq: r`r=2\cos\theta`, text: 'r = 2cos θ', at: [1.45, -0.85], dx: 8, dy: 22, say: r`$r=2\cos\theta$ is a circle of radius 1 centered at $(1,0)$. It passes through the pole and reaches $x=2$.` },
    { r: s13, dom: [0, PI], color: 'cd', eq: r`r=2\sin\theta`, text: 'r = 2sin θ', at: [-0.8, 1.55], dx: -6, dy: -6, anchor: 'end', say: r`$r=2\sin\theta$ is the same circle turned to sit on the $y$-axis: radius 1, centered at $(0,1)$. The two circles overlap in a lens.` }],
  rays: [{ t: PI / 4, len: 2.2, color: 'ca', text: 'θ = π/4', dx: 8, dy: -4 }],
  inter: [
    { say: r`The circles meet at the pole and at one more point. Set the radii equal.`, rows: [r`2\cos\theta=2\sin\theta`] },
    { say: r`Divide by $2\cos\theta$.`, rows: [r`\tan\theta=1`] },
    { say: r`In the first quadrant this is $\theta=\tfrac\pi4$: the diagonal ray through the second crossing point.`, rows: [r`\theta=\tfrac\pi4`], boxed: true, c: 'cx', rays: true }],
  points: [pt(1, 1, '(1, 1)', -10, -10, 'end')],
  pointsSay: r`The second crossing point is $(1,1)$, at distance $\sqrt2$ from the pole along the ray $\theta=\tfrac\pi4$.`,
  regionSay: r`The overlap is the lens inside both circles. For $0\le\theta\le\tfrac\pi4$ its outer edge is $r=2\sin\theta$ (the smaller radius); for $\tfrac\pi4\le\theta\le\tfrac\pi2$ it is $r=2\cos\theta$.`,
  region: [{ t0: 0, t1: PI / 4, ro: s13 }, { t0: PI / 4, t1: PI / 2, ro: c13 }],
  wedge: { t: 0.45, dt: 0.2, ro: s13, tx: 1.0, ty: 0.3, rdx: 4, rdy: -10 },
  wedgeSay: r`The lens is symmetric about the line $\theta=\tfrac\pi4$. Compute the half with $0\le\theta\le\tfrac\pi4$ and double it. There a thin wedge reaches out to $r=2\sin\theta$.`,
  dA: r`dA=\tfrac12r^2\,d\theta`,
  rows: [r`r=2\sin\theta`, r`r^2=4\sin^2\theta`, r`dA=\tfrac12\cdot4\sin^2\theta\,d\theta`],
  rowsSay: r`Substitute the radius of the boundary circle.`,
  integral: r`A=2\cdot\tfrac12\int_0^{\pi/4}\big(2\sin\theta\big)^2\,d\theta`,
  integralSay: r`Double the half: a factor of 2 out front, and wedges from $\theta=0$ to $\tfrac\pi4$.`,
  evalSteps: [
    { say: r`The 2 and the $\tfrac12$ cancel, leaving $(2\sin\theta)^2=4\sin^2\theta$.`, rows: [r`=\int_0^{\pi/4}4\sin^2\theta\,d\theta`] },
    { say: r`Half-angle: $4\sin^2\theta=2-2\cos2\theta$.`, rows: [r`=\int_0^{\pi/4}\big(2-2\cos2\theta\big)\,d\theta`] },
    { say: r`Integrate: $\int2\cos2\theta\,d\theta=\sin2\theta$.`, rows: [r`=\Big[2\theta-\sin2\theta\Big]_0^{\pi/4}`] },
    { say: r`At $\tfrac\pi4$: $\tfrac\pi2-\sin\tfrac\pi2=\tfrac\pi2-1$. At 0 it is 0.`, rows: [r`=\Big(\tfrac\pi2-1\Big)-0=\tfrac\pi2-1\approx0.571`], boxed: true,
      side: check('Check', r`\text{lens of two unit circles}`, r`\text{centers }\sqrt2\text{ apart}`, r`2\Big(\tfrac\pi4-\tfrac12\Big)=\tfrac\pi2-1`) }],
  answer: r`\tfrac\pi2-1\approx0.571`, track: [r`\theta=\tfrac\pi4`, r`2\cdot\tfrac12\int_0^{\pi/4}(2\sin\theta)^2d\theta`, r`\tfrac\pi2-1`],
  verify: [{ value: { f: t => s13(t) ** 2, a: 0, b: PI / 4, val: PI / 2 - 1 } }, { value: { f: t => 0.5 * Math.min(c13(t), s13(t)) ** 2, a: 0, b: PI / 2, val: PI / 2 - 1, n: 80000 } }, { num: { a: 2 * (Math.acos(Math.SQRT1_2) - Math.SQRT1_2 * Math.sqrt(0.5)), b: PI / 2 - 1 } }, { equal: { a: t => 4 * sin(t) ** 2, b: t => 2 - 2 * cos(2 * t), range: [0, 0.8] } }],
  heli1: [ln(r`2\cos\theta=2\sin\theta\Rightarrow\theta=\tfrac\pi4`, 'cx')], heli3: [ln(r`\Big[2\theta-\sin2\theta\Big]_0^{\pi/4}`)] }));

/* ===== 14 : the lemniscate r^2 = 4 cos 2θ ===== */
const lem = t => 2 * Math.sqrt(Math.max(0, cos(2 * t)));
examples.push(polarGen({ verb: 'Find', n: 14, label: 'Problem 14', type: 'Polar area · lemniscate',
  problem: r`r^2=4\cos2\theta`,
  plot: { xr: [-2.7, 3.1], xt: [-2, 2], yt: [] },
  curves: [{ r: lem, doms: [[-PI / 4, PI / 4], [3 * PI / 4, 5 * PI / 4]], n: 260, color: 'cx', eq: r`r^2=4\cos2\theta`, text: 'r² = 4cos 2θ', at: [1.8, 0.95], dx: 0, dy: 0,
    say: r`$r^2=4\cos2\theta$ is a lemniscate, a figure eight on its side. It only exists where $r^2\ge0$, so only where $\cos2\theta\ge0$.` }],
  rays: [{ t: PI / 4, len: 1.3, both: true, color: 'ca', text: 'θ = π/4', dx: 6, dy: -6 }, { t: -PI / 4, len: 1.3, both: true, color: 'ca', text: 'θ = −π/4', dx: 6, dy: 18 }],
  inter: [
    { say: r`A real $r$ needs $r^2\ge0$, which means $\cos2\theta\ge0$.`, rows: [r`\cos2\theta\ge0`] },
    { say: r`Cosine is non-negative for angles in $\big[-\tfrac\pi2,\tfrac\pi2\big]$ (plus whole turns). Here the angle is $2\theta$.`, rows: [r`-\tfrac\pi2\le2\theta\le\tfrac\pi2`] },
    { say: r`Halve it: the right loop is traced for $-\tfrac\pi4\le\theta\le\tfrac\pi4$. The left loop is its mirror image, traced for $\tfrac{3\pi}4\le\theta\le\tfrac{5\pi}4$.`, rows: [r`-\tfrac\pi4\le\theta\le\tfrac\pi4`], boxed: true, c: 'cx', rays: true }],
  regionSay: r`The total area is both loops. Above and below the $x$-axis, left and right, the four quarters are congruent.`,
  region: [{ t0: -PI / 4, t1: PI / 4, ro: lem }, { t0: 3 * PI / 4, t1: 5 * PI / 4, ro: lem }],
  wedge: { t: 0.22, dt: 0.14, ro: lem, tx: 1.78, ty: 0.7, rdx: -4, rdy: -10 },
  wedgeSay: r`Wedges from the pole again. The first-quadrant quarter has $\theta$ from 0 to $\tfrac\pi4$. The area element needs only $r^2$, and the equation hands us $r^2$ directly: no square root.`,
  dA: r`dA=\tfrac12r^2\,d\theta`,
  rows: [r`r^2=4\cos2\theta`, r`dA=\tfrac12\cdot4\cos2\theta\,d\theta`],
  rowsSay: r`Substitute $r^2$ straight into the area element.`,
  integral: r`A=4\cdot\tfrac12\int_0^{\pi/4}4\cos2\theta\,d\theta`,
  integralSay: r`Four congruent quarters, each swept from $\theta=0$ to $\tfrac\pi4$.`,
  evalSteps: [
    { say: r`The constants multiply: $4\cdot\tfrac12\cdot4=8$.`, rows: [r`=8\int_0^{\pi/4}\cos2\theta\,d\theta`] },
    { say: r`$\int\cos2\theta\,d\theta=\tfrac12\sin2\theta$, so the 8 becomes a 4.`, rows: [r`=8\Big[\tfrac12\sin2\theta\Big]_0^{\pi/4}=4\Big[\sin2\theta\Big]_0^{\pi/4}`] },
    { say: r`At $\tfrac\pi4$: $\sin\tfrac\pi2=1$. At 0: $\sin0=0$.`, rows: [r`=4\big(1-0\big)=4`], boxed: true,
      side: check('Check', r`\text{one quarter}=1`, r`4\cdot1=4`) }],
  answer: r`4`, track: [r`-\tfrac\pi4\le\theta\le\tfrac\pi4`, r`4\cdot\tfrac12\int_0^{\pi/4}4\cos2\theta\,d\theta`, r`4`],
  verify: [{ value: { f: t => 2 * cos(2 * t), a: 0, b: PI / 4, val: 1 } }, { value: { f: t => 0.5 * lem(t) ** 2, a: -PI / 4, b: PI / 4, val: 2 } }, { value: { f: t => 0.5 * lem(t) ** 2, a: 3 * PI / 4, b: 5 * PI / 4, val: 2 } }, { num: { a: 4 * 0.5 * 4 * 0.5, b: 4 } }],
  heli1: [ln(r`\cos2\theta\ge0\Rightarrow-\tfrac\pi4\le\theta\le\tfrac\pi4`, 'cx')], heli3: [ln(r`8\Big[\tfrac12\sin2\theta\Big]_0^{\pi/4}`)] }));

}
