/* Quiz 4 practice · problems 16-25: volumes of revolution (shells, washers, disks) */
{
  const PI = Math.PI, sq = Math.sqrt, E = Math.E;
  const pt = (x, y, text, tdx, tdy, anchor) => ({ x, y, text, tdx, tdy, anchor });
  const tri = (x, a, rad) => R('side', TRI('tri', triI(x, a, rad, ALL)));

  /* ===== 16 : shells about the y-axis, y = e^(x^2)/2 ===== */
  {
    const b = sq(Math.log(5)), f = x => 0.5 * Math.exp(x * x);
    examples.push(volGen({ n: 16, type: 'Shells about the y-axis', verb: 'Volume', method: 'shell',
      problem: r`y=\tfrac12e^{x^2},\;x=0,\;y=0,\;0\le x\le\sqrt{\ln5}\text{; about the }y\text{-axis}`,
      plot: { xr: [-0.3, 1.7], yr: [-0.4, 3.1], xt: [[1, '1'], [b, '√ln5']], yt: [[0.5, '½'], [2.5, '5/2']], w: 640, h: 430 },
      curves: [
        { f, dom: [0, b], n: 200, color: 'cx', eq: r`y=\tfrac12e^{x^2}`, text: 'y = ½eˣ²', at: [0.5, f(0.5)], dx: -12, dy: -14, say: r`Sketch. The top boundary is $y=\tfrac12e^{x^2}$. It starts at $y=\tfrac12$ when $x=0$ and climbs, slowly at first and then faster.` },
        { f: x => 0, dom: [0, b], color: 'ca', eq: r`y=0`, say: r`The bottom boundary is the $x$-axis, $y=0$.` },
        { f: y => 0, dom: [0, 2.5], orient: 'x', color: 'cd', eq: r`x=0`, say: r`The left boundary is the $y$-axis, $x=0$.` },
        { f: y => b, dom: [0, 2.5], orient: 'x', color: 'cp', eq: r`x=\sqrt{\ln5}`, say: r`The right boundary is the vertical line $x=\sqrt{\ln5}\approx1.27$.` }],
      points: [pt(0, 0.5, '(0, ½)', 12, 6), pt(b, 2.5, '(√ln5, 5/2)', -118, -12), pt(0, 0, '(0, 0)', 12, 22), pt(b, 0, '(√ln5, 0)', -40, 26)],
      pointsSay: r`The corners: at $x=\sqrt{\ln5}$ the curve height is $\tfrac12e^{\ln5}=\tfrac52$, since $e^{\ln5}=5$.`,
      region: { top: f, bot: x => 0, range: [0, b] },
      regionSay: r`The region sits under the curve, above the $x$-axis, between $x=0$ and $x=\sqrt{\ln5}$.`,
      axis: { kind: 'v', at: 0, text: 'axis x = 0', dx: 8, dy: 16, tex: r`x=0` },
      axisSay: r`Rotate about the $y$-axis. The region touches the axis along its whole left edge, so the solid has no hole.`,
      slice: { at: 0.7, w: 0.05, text: 'dx', tx: 0.74, ty: f(0.72) + 0.22, anchor: 'middle' },
      radii: [
        { from: [0, 0.3], to: [0.7, 0.3], color: 'cd', text: 'r', dx: -4, dy: 20 },
        { from: [0.98, 0], to: [0.98, f(0.98)], color: 'cp', text: 'h', dx: 8, dy: 0 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$. It runs from the $x$-axis up to the curve.`,
      methodSay: r`The strip is parallel to the axis of rotation (the $y$-axis). Spinning a strip around an axis it is parallel to sweeps out a thin cylinder: a shell.`,
      xsSay: r`A shell of radius $r$ and height $h$ with thickness $dx$ unrolls into a thin slab of length $2\pi r$. Its volume is $2\pi r\cdot h\cdot dx$.`,
      radSteps: [
        { say: r`The radius is the distance from the axis to the strip: $r=x$.`, show: ['rad0'], rows: [r`r=x`], cols: ['cd'] },
        { say: r`The height is top minus bottom: $\tfrac12e^{x^2}-0$.`, show: ['rad1'], rows: [r`h=\tfrac12e^{x^2}`], cols: ['cp'] }],
      dVSay: r`$dV=2\pi\,r\,h\,dx$. The $2\cdot\tfrac12$ cancels, leaving $\pi xe^{x^2}dx$.`,
      dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi\,x\cdot\tfrac12e^{x^2}\,dx`, r`=\pi\,xe^{x^2}\,dx`],
      integral: r`V=\pi\int_0^{\sqrt{\ln5}}xe^{x^2}\,dx`,
      integralSay: r`Add up the shells from $x=0$ to $x=\sqrt{\ln5}$.`,
      evalSteps: [
        { say: r`Let $u=x^2$, so $du=2x\,dx$ and $x\,dx=\tfrac12du$. New limits: $x=0\Rightarrow u=0$, and $x=\sqrt{\ln5}\Rightarrow u=\ln5$.`, rows: [r`=\tfrac\pi2\int_0^{\ln5}e^{u}\,du`] },
        { say: r`$\int e^u\,du=e^u$.`, rows: [r`=\tfrac\pi2\Big[e^{u}\Big]_0^{\ln5}`] },
        { say: r`$e^{\ln5}=5$ and $e^0=1$, so $\tfrac\pi2(5-1)=2\pi$.`, rows: [r`=\tfrac\pi2\big(5-1\big)=2\pi`], boxed: true }],
      answer: r`2\pi`, track: [r`\text{shells about the }y\text{-axis}`, r`\pi\int_0^{\sqrt{\ln5}}xe^{x^2}\,dx`, r`2\pi`],
      verify: [{ value: { f: x => 2 * PI * x * f(x), a: 0, b, val: 2 * PI } }, { num: { a: Math.exp(Math.log(5)), b: 5 } }],
      heli1: [ln(r`\text{about }x=0`, 'ct')], heli3: [ln(r`\tfrac\pi2\Big[e^{u}\Big]_0^{\ln5}`)] }));
  }

  /* ===== 17 : semicircle and a line, about the y-axis ===== */
  {
    const s3 = sq(3);
    examples.push(volGen({ n: 17, type: 'Washers about the y-axis', verb: 'Volume', method: 'washer', orient: 'h',
      problem: r`x=\sqrt{4-y^2}\text{ (right)},\;x=1\text{ (left)}\text{; about the }y\text{-axis}`,
      plot: { xr: [-0.5, 2.8], yr: [-2.4, 2.4], xt: [[1, '1'], [2, '2']], yt: [[s3, '√3'], [-s3, '−√3'], [1, '1'], [-1, '−1']], w: 640, h: 430 },
      curves: [
        { f: y => sq(4 - y * y), dom: [-2, 2], orient: 'x', n: 200, color: 'cx', eq: r`x=\sqrt{4-y^2}`, text: 'x = √(4−y²)', at: [1.55, 1.55], dx: 12, dy: -8, say: r`Sketch. The right boundary $x=\sqrt{4-y^2}$ is the right half of the circle of radius 2 centered at the origin.` },
        { f: y => 1, dom: [-2, 2], orient: 'x', color: 'cd', eq: r`x=1`, text: 'x = 1', at: [1, -2.1], dx: 8, dy: 6, say: r`The left boundary is the vertical line $x=1$.` }],
      inter: [{ say: r`Where does the line meet the circle? Set the two $x$-values equal and solve for $y$.`, rows: [r`\sqrt{4-y^2}=1`, r`4-y^2=1`, r`y=\pm\sqrt3`], boxed: true, c: 'cx' }],
      points: [pt(1, s3, '(1, √3)', 12, -8), pt(1, -s3, '(1, −√3)', 12, 20), pt(2, 0, '(2, 0)', 10, -10)],
      pointsSay: r`They meet at $(1,\sqrt3)$ and $(1,-\sqrt3)$. The circle reaches $x=2$ at $y=0$.`,
      region: { right: y => sq(4 - y * y), left: y => 1, range: [-s3, s3] },
      regionSay: r`The region is the circular segment between the line and the arc, from $y=-\sqrt3$ to $y=\sqrt3$.`,
      axis: { kind: 'v', at: 0, text: 'axis x = 0', dx: 8, dy: 16, tex: r`x=0` },
      axisSay: r`Rotate about the $y$-axis. The line $x=1$ stays 1 unit away from the axis, so the solid has a cylindrical hole.`,
      slice: { at: 0.6, w: 0.09, text: 'dy', tx: 2.0, ty: 0.64 },
      radii: [
        { from: [0, 0.3], to: [sq(4 - 0.09), 0.3], color: 'cx', text: 'R', dx: -20, dy: -10 },
        { from: [0, -0.6], to: [1, -0.6], color: 'cd', text: 'r', dx: -4, dy: -10 }],
      sliceSay: r`Slice with a thin horizontal strip of height $dy$. It runs from the line on the left to the arc on the right.`,
      methodSay: r`The strip is perpendicular to the vertical axis. Spinning it makes a washer: a disk with a hole, because the strip starts 1 unit away from the axis.`,
      xsSay: r`Face-on, the washer is a disk of radius $R$ with a disk of radius $r$ removed. Its area is $\pi R^2-\pi r^2$, times the thickness $dy$.`,
      radSteps: [
        { say: r`The outer radius is the distance from the axis to the far edge of the strip: the arc, $R=\sqrt{4-y^2}$.`, show: ['rad0'], rows: [r`R=\sqrt{4-y^2}`], cols: ['cx'] },
        { say: r`The inner radius is the distance to the near edge: the line $x=1$, so $r=1$. That gap is the hole.`, show: ['rad1'], rows: [r`r=1`], cols: ['cd'] }],
      dVSay: r`Square each radius: $R^2=4-y^2$ and $r^2=1$. Subtract: $4-y^2-1=3-y^2$.`,
      dV: [r`R^2=4-y^2,\;r^2=1`, r`dV=\pi\big(R^2-r^2\big)\,dy`, r`=\pi\big(3-y^2\big)\,dy`],
      integral: r`V=\pi\int_{-\sqrt3}^{\sqrt3}\big(3-y^2\big)\,dy`,
      integralSay: r`Add up the washers from $y=-\sqrt3$ to $y=\sqrt3$.`,
      evalSteps: [
        { say: r`The integrand $3-y^2$ is even and the limits are symmetric, so double the integral from 0.`, rows: [r`=2\pi\int_0^{\sqrt3}\big(3-y^2\big)\,dy`] },
        { say: r`Power rule.`, rows: [r`=2\pi\Big[3y-\tfrac{y^3}{3}\Big]_0^{\sqrt3}`] },
        { say: r`$(\sqrt3)^3=3\sqrt3$, so the bracket is $3\sqrt3-\sqrt3=2\sqrt3$. Then $2\pi\cdot2\sqrt3=4\sqrt3\,\pi$.`, rows: [r`=2\pi\Big(3\sqrt3-\sqrt3\Big)=4\sqrt3\,\pi`], boxed: true }],
      answer: r`4\sqrt3\,\pi`, track: [r`\text{washers about }x=0`, r`\pi\int_{-\sqrt3}^{\sqrt3}(3-y^2)\,dy`, r`4\sqrt3\,\pi`],
      verify: [{ value: { f: y => PI * (3 - y * y), a: -s3, b: s3, val: 4 * s3 * PI } }, { num: { a: sq(4 - 3), b: 1 } }],
      heli1: [ln(r`\text{about }x=0`, 'ct')], heli3: [ln(r`2\pi\Big[3y-\tfrac{y^3}{3}\Big]_0^{\sqrt3}`)] }));
  }

  /* ===== 18 : between sin and cos, about the x-axis ===== */
  {
    const c = Math.cos, s = Math.sin;
    examples.push(volGen({ n: 18, type: 'Washers about the x-axis', verb: 'Volume', method: 'washer',
      problem: r`y=\sin x,\;y=\cos x,\;0\le x\le\tfrac\pi4\text{; about the }x\text{-axis}`,
      plot: { xr: [-0.2, 1.3], yr: [-0.25, 1.2], xt: [[PI / 4, 'π/4']], yt: [[0.5, '½'], [1, '1']], w: 640, h: 430 },
      curves: [
        { f: c, dom: [0, PI / 4], color: 'cx', eq: r`y=\cos x`, text: 'y = cos x', at: [0.3, c(0.3)], dx: -10, dy: -12, say: r`Sketch. The upper curve is $y=\cos x$, starting at height 1.` },
        { f: s, dom: [0, PI / 4], color: 'cd', eq: r`y=\sin x`, text: 'y = sin x', at: [0.62, s(0.62)], dx: 12, dy: 26, say: r`The lower curve is $y=\sin x$, starting at 0.` },
        { f: y => 0, dom: [0, 1], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The left edge is the $y$-axis, $x=0$.` }],
      inter: [{ say: r`The curves cross where $\sin x=\cos x$. On $[0,\tfrac\pi4]$ that is exactly the right end, $x=\tfrac\pi4$.`, rows: [r`\sin x=\cos x`, r`x=\tfrac\pi4`], boxed: true, c: 'cx' }],
      points: [pt(0, 1, '(0, 1)', 12, 8), pt(0, 0, '(0, 0)', 12, 22), pt(PI / 4, sq(2) / 2, '(π/4, √2/2)', 10, -12)],
      pointsSay: r`Corners: $(0,1)$ and $(0,0)$ on the $y$-axis, and the crossing point $(\tfrac\pi4,\tfrac{\sqrt2}2)$.`,
      region: { top: c, bot: s, range: [0, PI / 4] },
      regionSay: r`The region is the thin sliver between the two curves.`,
      axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [-0.18, 0], dx: 0, dy: -10, tex: r`y=0` },
      axisSay: r`Rotate about the $x$-axis. The region does not touch the axis except at $x=0$ (where $\sin0=0$), so the solid is mostly hollow near the axis.`,
      slice: { at: 0.35, w: 0.04, text: 'dx', tx: 0.37, ty: 0.99, anchor: 'middle' },
      radii: [
        { from: [0.31, 0], to: [0.31, c(0.31)], color: 'cx', text: 'R', dx: -24, dy: 6 },
        { from: [0.43, 0], to: [0.43, s(0.43)], color: 'cd', text: 'r', dx: 8, dy: 20 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from $\sin x$ up to $\cos x$.`,
      methodSay: r`The strip is perpendicular to the horizontal axis, so spinning it makes a washer.`,
      xsSay: r`A washer has area $\pi R^2-\pi r^2$, times the thickness $dx$.`,
      radSteps: [
        { say: r`The outer radius is the distance from the $x$-axis to the far edge: the upper curve, $R=\cos x$.`, show: ['rad0'], rows: [r`R=\cos x`], cols: ['cx'] },
        { say: r`The inner radius is the distance to the near edge: the lower curve, $r=\sin x$.`, show: ['rad1'], rows: [r`r=\sin x`], cols: ['cd'] }],
      dVSay: r`$\cos^2x-\sin^2x$ is the double-angle identity for $\cos2x$.`,
      dV: [r`R^2=\cos^2x,\;r^2=\sin^2x`, r`dV=\pi\big(\cos^2x-\sin^2x\big)\,dx`, r`=\pi\cos2x\,dx`],
      integral: r`V=\pi\int_0^{\pi/4}\cos2x\,dx`,
      integralSay: r`Add up the washers from $x=0$ to $x=\tfrac\pi4$.`,
      evalSteps: [
        { say: r`$\int\cos2x\,dx=\tfrac12\sin2x$, because of the inner 2.`, rows: [r`=\pi\Big[\tfrac12\sin2x\Big]_0^{\pi/4}`] },
        { say: r`At $x=\tfrac\pi4$: $\sin\tfrac\pi2=1$. At $x=0$: $\sin0=0$.`, rows: [r`=\pi\Big(\tfrac12\cdot1-0\Big)=\tfrac\pi2`], boxed: true }],
      answer: r`\tfrac\pi2`, track: [r`\text{washers about }y=0`, r`\pi\int_0^{\pi/4}\cos2x\,dx`, r`\tfrac\pi2`],
      verify: [{ value: { f: x => PI * (c(x) ** 2 - s(x) ** 2), a: 0, b: PI / 4, val: PI / 2 } }, { equal: { a: x => c(x) ** 2 - s(x) ** 2, b: x => c(2 * x), range: [0, 0.78] } }],
      heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`\pi\Big[\tfrac12\sin2x\Big]_0^{\pi/4}`)] }));
  }

  /* ===== 19 : under e^x, about y = 2 ===== */
  {
    const L = Math.log(2);
    examples.push(volGen({ n: 19, type: 'Washers about y = 2', verb: 'Volume', method: 'washer',
      problem: r`y=0,\;x=0,\;y=e^x,\;x=\ln2\text{; about }y=2`,
      plot: { xr: [-0.35, 1.15], yr: [-0.4, 2.6], xt: [[L, 'ln 2']], yt: [1, 2], w: 640, h: 430 },
      curves: [
        { f: x => Math.exp(x), dom: [0, L], color: 'cx', eq: r`y=e^x`, text: 'y = eˣ', at: [0.3, Math.exp(0.3)], dx: -14, dy: -12, say: r`Sketch. The top boundary is $y=e^x$, rising from height 1 at $x=0$ to height 2 at $x=\ln2$.` },
        { f: x => 0, dom: [0, L], color: 'ca', eq: r`y=0`, say: r`The bottom boundary is the $x$-axis.` },
        { f: y => 0, dom: [0, 1], orient: 'x', color: 'cd', eq: r`x=0`, say: r`The left boundary is the $y$-axis.` },
        { f: y => L, dom: [0, 2], orient: 'x', color: 'cp', eq: r`x=\ln2`, say: r`The right boundary is the vertical line $x=\ln2\approx0.69$.` }],
      points: [pt(0, 1, '(0, 1)', 12, 4), pt(L, 2, '(ln 2, 2)', -92, -12), pt(0, 0, '(0, 0)', 12, 22), pt(L, 0, '(ln 2, 0)', -30, 26)],
      pointsSay: r`Corners: $(0,1)$, $(\ln2,\,e^{\ln2})=(\ln2,\,2)$, and the two points on the $x$-axis.`,
      region: { top: x => Math.exp(x), bot: x => 0, range: [0, L] },
      regionSay: r`The region sits under $y=e^x$, above the $x$-axis.`,
      axis: { kind: 'h', at: 2, text: 'axis y = 2', labAt: [-0.33, 2], dx: 0, dy: -10, tex: r`y=2` },
      axisSay: r`Rotate about the horizontal line $y=2$, which sits at or above the whole region. The region touches the axis only at the corner $(\ln2,2)$, so the solid has a hole in the middle.`,
      slice: { at: 0.2, w: 0.04, text: 'dx', tx: 0.22, ty: 1.45, anchor: 'middle' },
      radii: [
        { from: [0.19, 2], to: [0.19, 0], color: 'cx', text: 'R', dx: -24, dy: 8 },
        { from: [0.45, 2], to: [0.45, Math.exp(0.45)], color: 'cd', text: 'r', dx: 8, dy: -6 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from the $x$-axis up to the curve.`,
      methodSay: r`The strip is perpendicular to the horizontal axis $y=2$. Spinning it makes a washer.`,
      xsSay: r`A washer: a disk of radius $R$ with a disk of radius $r$ removed. Area $\pi R^2-\pi r^2$, times $dx$.`,
      radSteps: [
        { say: r`The outer radius is the distance from the axis $y=2$ to the far edge of the strip, the $x$-axis: $R=2-0=2$.`, show: ['rad0'], rows: [r`R=2-0=2`], cols: ['cx'] },
        { say: r`The inner radius is the distance to the near edge, the curve: $r=2-e^x$.`, show: ['rad1'], rows: [r`r=2-e^x`], cols: ['cd'] }],
      dVSay: r`$dV=\pi\big(R^2-r^2\big)\,dx$ with $R^2=4$ and $r^2=(2-e^x)^2$.`,
      dV: [r`R^2=4,\;r^2=(2-e^x)^2`, r`=\pi\,\big(4-(2-e^x)^2\big)\,dx`],
      integral: r`V=\pi\int_0^{\ln2}\Big(4-\big(2-e^x\big)^2\Big)\,dx`,
      integralSay: r`Add up the washers from $x=0$ to $x=\ln2$.`,
      evalSteps: [
        { say: r`Expand $(2-e^x)^2=4-4e^x+e^{2x}$. Then $4-(4-4e^x+e^{2x})=4e^x-e^{2x}$.`, rows: [r`=\pi\int_0^{\ln2}\big(4e^x-e^{2x}\big)\,dx`] },
        { say: r`$\int4e^x\,dx=4e^x$ and $\int e^{2x}\,dx=\tfrac12e^{2x}$.`, rows: [r`=\pi\Big[4e^x-\tfrac12e^{2x}\Big]_0^{\ln2}`] },
        { say: r`At $\ln2$: $e^{\ln2}=2$ and $e^{2\ln2}=4$, giving $8-2=6$. At 0: $4-\tfrac12=\tfrac72$.`, rows: [r`=\pi\Big[\big(8-2\big)-\big(4-\tfrac12\big)\Big]`] },
        { say: r`$6-\tfrac72=\tfrac52$.`, rows: [r`=\pi\Big(6-\tfrac72\Big)=\tfrac{5\pi}{2}`], boxed: true }],
      answer: r`\tfrac{5\pi}{2}`, track: [r`\text{washers about }y=2`, r`\pi\int_0^{\ln2}\big(4-(2-e^x)^2\big)\,dx`, r`\tfrac{5\pi}{2}`],
      verify: [{ value: { f: x => PI * (4 - (2 - Math.exp(x)) ** 2), a: 0, b: L, val: 5 * PI / 2 } }, { equal: { a: x => 4 - (2 - Math.exp(x)) ** 2, b: x => 4 * Math.exp(x) - Math.exp(2 * x), range: [0, 0.69] } }],
      heli1: [ln(r`\text{about }y=2`, 'ct')], heli3: [ln(r`\pi\Big[4e^x-\tfrac12e^{2x}\Big]_0^{\ln2}`)] }));
  }

  /* ===== 20 : y = 3 sqrt x, y = 3, about the y-axis (find a and b) ===== */
  {
    examples.push(volGen({ n: 20, type: 'Disks about the y-axis', verb: 'Volume', method: 'disk', orient: 'h',
      problem: r`y=3\sqrt x,\;y=3,\;x=0\text{; about the }y\text{-axis; answer }\tfrac{a\pi}{b}`,
      plot: { xr: [-0.3, 1.5], yr: [-0.4, 3.6], xt: [[1, '1']], yt: [1, 2, 3], w: 640, h: 430 },
      curves: [
        { f: y => y * y / 9, dom: [0, 3], orient: 'x', n: 200, color: 'cx', eq: r`y=3\sqrt x\;\;(x=\tfrac{y^2}{9})`, text: 'y = 3√x', at: [0.5, 2.12], dx: 12, dy: 24, say: r`Sketch. The curve $y=3\sqrt x$ starts at the origin and rises, getting flatter. Solving for $x$: $\sqrt x=\tfrac y3$, so $x=\tfrac{y^2}{9}$.` },
        { f: x => 3, dom: [0, 1], color: 'cd', eq: r`y=3`, text: 'y = 3', at: [1, 3], dx: 8, dy: -8, say: r`The top boundary is the horizontal line $y=3$.` },
        { f: y => 0, dom: [0, 3], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The left boundary is the $y$-axis, $x=0$.` }],
      inter: [{ say: r`The curve meets $y=3$ where $3\sqrt x=3$.`, rows: [r`3\sqrt x=3`, r`x=1`], boxed: true, c: 'cx' }],
      points: [pt(0, 0, '(0, 0)', 12, 22), pt(0, 3, '(0, 3)', 12, -10), pt(1, 3, '(1, 3)', 10, -10)],
      pointsSay: r`Corners: $(0,0)$, $(0,3)$ and $(1,3)$.`,
      region: { right: y => y * y / 9, left: y => 0, range: [0, 3] },
      regionSay: r`The region is the sliver left of the curve and right of the $y$-axis, up to height 3. In horizontal slices, $x$ runs from 0 to $\tfrac{y^2}{9}$.`,
      axis: { kind: 'v', at: 0, text: 'axis x = 0', dx: 8, dy: 16, tex: r`x=0` },
      axisSay: r`Rotate about the $y$-axis. The region touches the axis along its whole left edge, so the solid has no hole.`,
      slice: { at: 1.5, w: 0.1, text: 'dy', tx: 0.34, ty: 1.58 },
      radii: [{ from: [0, 1.55], to: [1.55 ** 2 / 9, 1.55], color: 'cx', text: 'R', dx: -8, dy: -12 }],
      sliceSay: r`Slice with a thin horizontal strip of height $dy$. It runs from the $y$-axis out to the curve.`,
      methodSay: r`The strip is perpendicular to the vertical axis and touches it. Spinning it makes a solid disk, with no hole.`,
      xsSay: r`A disk of radius $R$ has area $\pi R^2$. Times the thickness $dy$ gives its volume.`,
      radSteps: [{ say: r`The radius is the distance from the axis to the strip's far end, the curve: $R=\tfrac{y^2}{9}$.`, show: ['rad0'], rows: [r`R=\tfrac{y^2}{9}`], cols: ['cx'] }],
      dVSay: r`Square the radius: $R^2=\tfrac{y^4}{81}$.`,
      dV: [r`R^2=\tfrac{y^4}{81}`, r`dV=\pi R^2\,dy=\tfrac{\pi y^4}{81}\,dy`],
      integral: r`V=\pi\int_0^{3}\frac{y^4}{81}\,dy`,
      integralSay: r`Add up the disks from $y=0$ to $y=3$.`,
      evalSteps: [
        { say: r`Pull out $\tfrac1{81}$ and use the power rule.`, rows: [r`=\tfrac{\pi}{81}\Big[\tfrac{y^5}{5}\Big]_0^3`] },
        { say: r`$3^5=243$, and $\tfrac{243}{81}=3$.`, rows: [r`=\tfrac{\pi}{81}\cdot\tfrac{243}{5}=\tfrac{3\pi}{5}`], boxed: true },
        { say: r`In the form $\tfrac{a\pi}{b}$ this is $a=3$ and $b=5$. Shells give the same: $2\pi\int_0^1x(3-3\sqrt x)dx=\tfrac{3\pi}5$.`, rows: [r`a=3,\quad b=5`], boxed: true }],
      answer: r`a=3,\;b=5`, track: [r`\text{disks about }x=0`, r`\pi\int_0^3\tfrac{y^4}{81}\,dy`, r`\tfrac{3\pi}{5},\;a=3,\;b=5`],
      verify: [{ value: { f: y => PI * y ** 4 / 81, a: 0, b: 3, val: 3 * PI / 5 } }, { value: { f: x => 2 * PI * x * (3 - 3 * sq(x)), a: 0, b: 1, val: 3 * PI / 5 } }],
      heli1: [ln(r`\text{about }x=0`, 'ct')], heli3: [ln(r`\tfrac\pi{81}\Big[\tfrac{y^5}{5}\Big]_0^3=\tfrac{3\pi}{5}`)] }));
  }

  /* ===== 21 : shells with a trig substitution ===== */
  {
    const f = x => x * x / sq(9 - x * x), val = 36 * PI - 44 * sq(5) / 3 * PI;
    examples.push(volGen({ n: 21, type: 'Shells about the y-axis · trig substitution', verb: 'Volume', method: 'shell',
      problem: r`y=\frac{x^2}{\sqrt{9-x^2}},\;y=0,\;x=2\text{; about the }y\text{-axis}`,
      plot: { xr: [-0.3, 2.7], yr: [-0.3, 2.3], xt: [[1, '1'], [2, '2']], yt: [[1, '1'], [4 / sq(5), '4/√5']], w: 640, h: 430 },
      curves: [
        { f, dom: [0, 2], n: 200, color: 'cx', eq: r`y=\frac{x^2}{\sqrt{9-x^2}}`, text: 'y = x²/√(9−x²)', at: [1.2, f(1.2)], dx: -150, dy: -14, say: r`Sketch. At $x=0$ the curve is 0, and it rises as $x$ grows, getting steeper. At $x=2$: $y=\tfrac{4}{\sqrt5}\approx1.79$.` },
        { f: x => 0, dom: [0, 2], color: 'ca', eq: r`y=0`, say: r`The bottom boundary is the $x$-axis.` },
        { f: y => 2, dom: [0, 4 / sq(5)], orient: 'x', color: 'cp', eq: r`x=2`, say: r`The right boundary is the vertical line $x=2$.` }],
      points: [pt(0, 0, '(0, 0)', 10, 22), pt(2, 4 / sq(5), '(2, 4/√5)', -110, -12), pt(2, 0, '(2, 0)', 8, 22)],
      pointsSay: r`Corners: the origin, $(2,0)$ and $(2,\tfrac4{\sqrt5})$.`,
      region: { top: f, bot: x => 0, range: [0, 2] },
      regionSay: r`The region lies under the curve, above the $x$-axis, between $x=0$ and $x=2$.`,
      axis: { kind: 'v', at: 0, text: 'axis x = 0', dx: 8, dy: 16, tex: r`x=0` },
      axisSay: r`Rotate about the $y$-axis. The region touches the axis at the origin and stays attached to it.`,
      slice: { at: 1.0, w: 0.07, text: 'dx', tx: 1.04, ty: f(1.04) + 0.2, anchor: 'middle' },
      radii: [
        { from: [0, 0.25], to: [1.0, 0.25], color: 'cd', text: 'r', dx: -10, dy: 20 },
        { from: [1.45, 0], to: [1.45, f(1.45)], color: 'cp', text: 'h', dx: 8, dy: 0 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from the $x$-axis up to the curve.`,
      methodSay: r`The strip is parallel to the axis of rotation, so it sweeps out a thin cylinder: a shell.`,
      xsSay: r`A shell of radius $r$ and height $h$ unrolls into a slab of length $2\pi r$. Volume: $2\pi r\cdot h\cdot dx$.`,
      radSteps: [
        { say: r`The radius is the distance from the $y$-axis to the strip: $r=x$.`, show: ['rad0'], rows: [r`r=x`], cols: ['cd'] },
        { say: r`The height is the curve minus 0: $h=\tfrac{x^2}{\sqrt{9-x^2}}$.`, show: ['rad1'], rows: [r`h=\tfrac{x^2}{\sqrt{9-x^2}}`], cols: ['cp'] }],
      dVSay: r`Multiply: $x\cdot\tfrac{x^2}{\sqrt{9-x^2}}=\tfrac{x^3}{\sqrt{9-x^2}}$.`,
      dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi\,\tfrac{x^3}{\sqrt{9-x^2}}\,dx`],
      integral: r`V=2\pi\int_0^2\frac{x^3}{\sqrt{9-x^2}}\,dx`,
      integralSay: r`Add up the shells from $x=0$ to $x=2$. This integral needs a trig substitution.`,
      evalSteps: [
        { say: r`The radical $\sqrt{9-x^2}$ is Type I with $a=3$. Substitute $x=3\sin\theta$: then $dx=3\cos\theta\,d\theta$ and $\sqrt{9-x^2}=3\cos\theta$.`, rows: [r`x=3\sin\theta,\;dx=3\cos\theta\,d\theta,\;\sqrt{9-x^2}=3\cos\theta`], side: [eyebrow('t0', 'Type I radical'), R('side', T('t1', r`\sqrt{a^2-x^2}`, 'cr')), R('side', T('t2', r`a=3`, 'ca')), R('side', T('t3', r`x=3\sin\theta`, 'cx'))] },
        { say: r`Substitute. $x^3=27\sin^3\theta$. The $3\cos\theta$ from $dx$ cancels the $3\cos\theta$ in the denominator, leaving $27\sin^3\theta$, and $2\pi\cdot27=54\pi$.`, rows: [r`=2\pi\int\frac{27\sin^3\theta\cdot3\cos\theta}{3\cos\theta}\,d\theta=54\pi\int\sin^3\theta\,d\theta`], fresh: true },
        { say: r`Limits from the triangle ($\sin\theta=\tfrac x3$): at $x=2$ the opposite side is 2 and the hypotenuse 3, so $\cos\theta=\tfrac{\sqrt5}{3}$. At $x=0$, $\cos\theta=1$.`, rows: [r`x=0:\;\cos\theta=1,\qquad x=2:\;\cos\theta=\tfrac{\sqrt5}{3}`], fresh: true, side: [eyebrow('t4', 'Reference triangle'), tri('2', '3', r`\sqrt5`)] },
        { say: r`Odd power of sine: peel one $\sin\theta$, write $\sin^2\theta=1-\cos^2\theta$, and let $u=\cos\theta$, $du=-\sin\theta\,d\theta$. Swapping the limits absorbs the minus sign.`, rows: [r`=54\pi\int\big(1-\cos^2\theta\big)\sin\theta\,d\theta=54\pi\int_{\sqrt5/3}^{1}\big(1-u^2\big)\,du`], fresh: true, side: [eyebrow('t5', 'Substitution'), R('side', T('t6', r`u=\cos\theta`, 'cx')), R('side', T('t7', r`du=-\sin\theta\,d\theta`, 'cd'))] },
        { say: r`Power rule.`, rows: [r`=54\pi\Big[u-\tfrac{u^3}{3}\Big]_{\sqrt5/3}^{1}`] },
        { say: r`Upper limit: $1-\tfrac13=\tfrac23$. Lower limit: $u=\tfrac{\sqrt5}{3}$ gives $\tfrac{\sqrt5}{3}-\tfrac{5\sqrt5}{81}=\tfrac{22\sqrt5}{81}$, since $u^3=\tfrac{5\sqrt5}{27}$.`, rows: [r`=54\pi\Big[\tfrac23-\tfrac{22\sqrt5}{81}\Big]`] },
        { say: r`Distribute: $54\cdot\tfrac23=36$ and $54\cdot\tfrac{22\sqrt5}{81}=\tfrac{44\sqrt5}{3}$.`, rows: [r`=36\pi-\tfrac{44\sqrt5}{3}\,\pi\approx10.1`], boxed: true }],
      answer: r`36\pi-\tfrac{44\sqrt5}{3}\pi`, track: [r`\text{shells about }x=0`, r`2\pi\int_0^2\tfrac{x^3}{\sqrt{9-x^2}}\,dx`, r`36\pi-\tfrac{44\sqrt5}{3}\pi`],
      verify: [{ value: { f: x => 2 * PI * x * f(x), a: 0, b: 2, val, tol: 1e-6 } }, { num: { a: 54 * PI * (2 / 3 - 22 * sq(5) / 81), b: val } }, { num: { a: (sq(5) / 3) ** 3, b: 5 * sq(5) / 27 } }],
      heli1: [ln(r`\text{about }x=0`, 'ct')], heli3: [ln(r`x=3\sin\theta\;\Rightarrow\;54\pi\int\sin^3\theta\,d\theta`, 'cx'), ln(r`54\pi\Big[u-\tfrac{u^3}{3}\Big]_{\sqrt5/3}^{1}`)] }));
  }

  /* ===== 22 : setup only, washers about y = -2 (two pieces) ===== */
  {
    const top = x => (x <= 1 ? sq(x + 3) : 3 - x);
    examples.push(volGen({ n: 22, type: 'Washers about y = −2 · setup only', verb: 'Set up', method: 'washer', phases: ['Sketch', 'Washers', 'Setup'],
      problem: r`y=\sqrt{x+3},\;y=0,\;x+y=3\text{; about }y=-2\;\;(\text{set up only})`,
      plot: { xr: [-3.7, 4.0], yr: [-2.7, 3.5], xt: [[1, '1']], yt: [[2, '2'], [-2, '−2']], w: 640, h: 430 },
      curves: [
        { f: x => sq(x + 3), dom: [-3, 1.9], n: 200, color: 'cx', eq: r`y=\sqrt{x+3}`, text: 'y = √(x+3)', at: [1.55, sq(4.55)], dx: 6, dy: -12, say: r`Sketch. The curve $y=\sqrt{x+3}$ starts at $(-3,0)$ and rises, getting flatter.` },
        { f: x => 3 - x, dom: [0.2, 3.4], color: 'cd', eq: r`x+y=3\;\;(y=3-x)`, text: 'y = 3 − x', at: [2.1, 0.9], dx: 10, dy: -6, say: r`The line $x+y=3$ is $y=3-x$, falling from upper left to $(3,0)$.` },
        { f: x => 0, dom: [-3.4, 3.6], color: 'ca', eq: r`y=0`, say: r`The bottom boundary is the $x$-axis, $y=0$.` }],
      inter: [{ say: r`Where do the curve and line meet? Set them equal and square both sides, then factor.`, rows: [r`\sqrt{x+3}=3-x`, r`x+3=9-6x+x^2`, r`x^2-7x+6=0`, r`(x-1)(x-6)=0`], boxed: false, c: 'cx' },
        { say: r`Squaring can add a false solution. Check $x=6$: the line gives $3-6=-3$, but a square root is never negative. So reject $x=6$ and keep $x=1$.`, rows: [r`x=1\;(\text{not }x=6)`], boxed: true, c: 'ca' }],
      points: [pt(-3, 0, '(−3, 0)', -4, 24, 'middle'), pt(1, 2, '(1, 2)', 10, -12), pt(3, 0, '(3, 0)', 8, 24)],
      pointsSay: r`Corners: $(-3,0)$, the meeting point $(1,2)$, and the line's $x$-intercept $(3,0)$.`,
      region: { top, bot: x => 0, range: [-3, 3] },
      regionSay: r`The region is bounded above by the curve (for $x\le1$) and then the line (for $x\ge1$), and below by the $x$-axis. The top changes at $x=1$, so we will need two integrals.`,
      axis: { kind: 'h', at: -2, text: 'axis y = −2', labAt: [-3.65, -2], dx: 0, dy: -10, tex: r`y=-2` },
      axisSay: r`Rotate about the horizontal line $y=-2$, below the whole region. The region is 2 units above the axis even at its lowest edge, so the solid has a hole.`,
      slice: { at: -2.0, w: 0.12, text: 'dx', tx: -1.94, ty: 1.3, anchor: 'middle' },
      radii: [
        { from: [-1.94, -2], to: [-1.94, sq(1.06)], color: 'cx', text: 'R', dx: -24, dy: 8 },
        { from: [-1.5, -2], to: [-1.5, 0], color: 'cd', text: 'r', dx: 8, dy: 6 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from the $x$-axis up to the top boundary.`,
      methodSay: r`The strip is perpendicular to the horizontal axis, so spinning it makes a washer.`,
      xsSay: r`A washer has area $\pi R^2-\pi r^2$, times the thickness $dx$.`,
      radSteps: [
        { say: r`The outer radius is the distance from the axis $y=-2$ up to the top of the strip: top $-(-2)$ = top $+2$. For $-3\le x\le1$ the top is the curve; for $1\le x\le3$ it is the line.`, show: ['rad0'], rows: [r`x\le1:\;R=\sqrt{x+3}+2`, r`x\ge1:\;R=5-x`], cols: ['cx', 'cx'] },
        { say: r`The inner radius is the distance from $y=-2$ to the bottom of the strip, the $x$-axis: $0-(-2)=2$. It is the same for both pieces.`, show: ['rad1'], rows: [r`r=0-(-2)=2`], cols: ['cd'] }],
      dVSay: r`$dV=\pi\big(R^2-r^2\big)\,dx$, with a different $R$ on each side of $x=1$.`,
      dV: [r`x\le1:\;(\sqrt{x+3}+2)^2-4`, r`x\ge1:\;(5-x)^2-4`, r`dV=\pi\big(R^2-r^2\big)\,dx`],
      integral: [r`V=\pi\int_{-3}^{1}\Big[\big(\sqrt{x+3}+2\big)^2-2^2\Big]dx`, r`\;+\;\pi\int_{1}^{3}\Big[(5-x)^2-2^2\Big]dx`],
      integralSay: r`Add the two ranges. This sum of two integrals is the answer: the problem says set up but do not solve.`,
      evalSteps: [
        { say: r`Stop here on the test. For a check only: the integrands simplify to $x+3+4\sqrt{x+3}$ and $21-10x+x^2$.`, rows: [r`=\pi\int_{-3}^{1}\big(x+3+4\sqrt{x+3}\big)\,dx`, r`\;+\;\pi\int_{1}^{3}\big(21-10x+x^2\big)\,dx`] },
        { say: r`Optional check of the setup: the pieces come to $\tfrac{88\pi}{3}$ and $\tfrac{32\pi}{3}$.`, rows: [r`=\tfrac{88\pi}{3}+\tfrac{32\pi}{3}=40\pi`] }],
      answer: r`\pi\!\int_{-3}^{1}\!\big[(\sqrt{x+3}+2)^2-4\big]dx+\pi\!\int_{1}^{3}\!\big[(5-x)^2-4\big]dx`,
      track: [r`\text{washers about }y=-2`, r`R=\text{top}+2,\;r=2`, r`\pi\!\int_{-3}^{1}\!\cdots+\pi\!\int_1^3\!\cdots`],
      verify: [{ value: { f: x => PI * ((sq(x + 3) + 2) ** 2 - 4), a: -3, b: 1, val: 88 * PI / 3 } }, { value: { f: x => PI * ((5 - x) ** 2 - 4), a: 1, b: 3, val: 32 * PI / 3 } }, { num: { a: sq(1 + 3), b: 3 - 1 } }],
      heli: [[ln(r`\sqrt{x+3}=3-x\;\Rightarrow\;x=1`, 'ca'), ln(r`\text{about }y=-2`, 'ct')],
        [ln(r`R=\text{top}+2,\;r=2`, 'cx'), ln(r`dV=\pi\big(R^2-r^2\big)\,dx`, 'cp')],
        [ln(r`V=\pi\int_{-3}^{1}\Big[\big(\sqrt{x+3}+2\big)^2-2^2\Big]dx`), ln(r`\;+\;\pi\int_{1}^{3}\Big[(5-x)^2-2^2\Big]dx`), bx(r`\text{setup complete (check: }40\pi\text{)}`)]] }));
  }

  /* ===== 23 : shells about x = -3 ===== */
  {
    examples.push(volGen({ n: 23, type: 'Shells about x = −3', verb: 'Volume', method: 'shell',
      problem: r`y=x,\;y=-x,\;x=2\text{; about }x=-3`,
      plot: { xr: [-3.8, 2.9], yr: [-2.7, 2.7], xt: [[-3, '−3'], [1, '1'], [2, '2']], yt: [[2, '2'], [-2, '−2']], w: 640, h: 430 },
      curves: [
        { f: x => x, dom: [0, 2], color: 'cx', eq: r`y=x`, text: 'y = x', at: [1.5, 1.5], dx: -52, dy: -4, say: r`Sketch. The line $y=x$ climbs from the origin.` },
        { f: x => -x, dom: [0, 2], color: 'cd', eq: r`y=-x`, text: 'y = −x', at: [1.5, -1.5], dx: -60, dy: 26, say: r`The line $y=-x$ falls from the origin: the mirror image.` },
        { f: y => 2, dom: [-2, 2], orient: 'x', color: 'ca', eq: r`x=2`, say: r`The vertical line $x=2$ closes the region on the right.` }],
      points: [pt(0, 0, '(0, 0)', -42, 22), pt(2, 2, '(2, 2)', 10, -8), pt(2, -2, '(2, −2)', 10, 22)],
      pointsSay: r`Corners: the origin, $(2,2)$ and $(2,-2)$.`,
      region: { top: x => x, bot: x => -x, range: [0, 2] },
      regionSay: r`The region is a triangle opening to the right: for each $x$ from 0 to 2, $y$ runs from $-x$ to $x$.`,
      axis: { kind: 'v', at: -3, text: 'axis x = −3', dx: 8, dy: 16, tex: r`x=-3` },
      axisSay: r`Rotate about the vertical line $x=-3$, to the left of the region. The region stays 3 units away at its closest point, so the solid has a hole.`,
      slice: { at: 0.9, w: 0.09, text: 'dx', tx: 0.95, ty: 1.15, anchor: 'middle' },
      radii: [
        { from: [-3, -1.5], to: [0.94, -1.5], color: 'cd', text: 'r', dx: -90, dy: -10 },
        { from: [1.4, -1.4], to: [1.4, 1.4], color: 'cp', text: 'h', dx: 8, dy: 0 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from $y=-x$ up to $y=x$.`,
      methodSay: r`The strip is parallel to the axis $x=-3$, so spinning it sweeps out a thin cylinder: a shell.`,
      xsSay: r`A shell of radius $r$ and height $h$ unrolls into a slab of length $2\pi r$. Volume: $2\pi r\cdot h\cdot dx$.`,
      radSteps: [
        { say: r`The radius is the distance from the axis $x=-3$ to the strip at $x$: $x-(-3)=x+3$. Not just $x$: the axis is not the $y$-axis.`, show: ['rad0'], rows: [r`r=x-(-3)=x+3`], cols: ['cd'] },
        { say: r`The height is top minus bottom: $x-(-x)=2x$.`, show: ['rad1'], rows: [r`h=x-(-x)=2x`], cols: ['cp'] }],
      dVSay: r`$dV=2\pi\,r\,h\,dx=2\pi(x+3)(2x)\,dx$.`,
      dV: [r`dV=2\pi\,r\,h\,dx`, r`=2\pi\,(x+3)(2x)\,dx`],
      integral: r`V=2\pi\int_0^2(x+3)(2x)\,dx`,
      integralSay: r`Add up the shells from $x=0$ to $x=2$.`,
      evalSteps: [
        { say: r`Multiply out: $(x+3)(2x)=2x^2+6x$. Pull the 2 out front: $2\pi\cdot2=4\pi$.`, rows: [r`=4\pi\int_0^2\big(x^2+3x\big)\,dx`] },
        { say: r`Power rule.`, rows: [r`=4\pi\Big[\tfrac{x^3}{3}+\tfrac{3x^2}{2}\Big]_0^2`] },
        { say: r`At $x=2$: $\tfrac83+6=\tfrac{26}{3}$. Then $4\pi\cdot\tfrac{26}3=\tfrac{104\pi}{3}$.`, rows: [r`=4\pi\Big(\tfrac83+6\Big)=\tfrac{104\pi}{3}`], boxed: true }],
      answer: r`\tfrac{104\pi}{3}`, track: [r`\text{shells about }x=-3`, r`2\pi\int_0^2(x+3)(2x)\,dx`, r`\tfrac{104\pi}{3}`],
      verify: [{ value: { f: x => 2 * PI * (x + 3) * (2 * x), a: 0, b: 2, val: 104 * PI / 3 } }],
      heli1: [ln(r`\text{about }x=-3`, 'ct')], heli3: [ln(r`4\pi\Big[\tfrac{x^3}{3}+\tfrac{3x^2}{2}\Big]_0^2`)] }));
  }

  /* ===== 24 : y = sqrt x, y = 1, about y = -1 ===== */
  {
    examples.push(volGen({ n: 24, type: 'Washers about y = −1', verb: 'Volume', method: 'washer',
      problem: r`y=\sqrt x,\;x=0,\;y=1\text{; about }y=-1`,
      plot: { xr: [-0.35, 1.6], yr: [-1.4, 1.55], xt: [[1, '1']], yt: [1, [-1, '−1']], w: 640, h: 430 },
      curves: [
        { f: x => sq(x), dom: [0, 1.4], n: 200, color: 'cx', eq: r`y=\sqrt x`, text: 'y = √x', at: [0.4, sq(0.4)], dx: 12, dy: 24, say: r`Sketch. The curve $y=\sqrt x$ starts at the origin and rises, getting flatter.` },
        { f: x => 1, dom: [0, 1.4], color: 'cd', eq: r`y=1`, text: 'y = 1', at: [1.4, 1], dx: -50, dy: -8, say: r`The top boundary is the horizontal line $y=1$.` },
        { f: y => 0, dom: [0, 1], orient: 'x', color: 'ca', eq: r`x=0`, say: r`The left boundary is the $y$-axis, $x=0$.` }],
      inter: [{ say: r`The curve meets $y=1$ where $\sqrt x=1$.`, rows: [r`\sqrt x=1`, r`x=1`], boxed: true, c: 'cx' }],
      points: [pt(0, 0, '(0, 0)', 12, 22), pt(0, 1, '(0, 1)', 12, -10), pt(1, 1, '(1, 1)', 10, -10)],
      pointsSay: r`Corners: $(0,0)$, $(0,1)$ and $(1,1)$.`,
      region: { top: x => 1, bot: x => sq(x), range: [0, 1] },
      regionSay: r`The region is between the curve (below) and the line $y=1$ (above), from $x=0$ to $x=1$.`,
      axis: { kind: 'h', at: -1, text: 'axis y = −1', labAt: [-0.33, -1], dx: 0, dy: -10, tex: r`y=-1` },
      axisSay: r`Rotate about the horizontal line $y=-1$, below the region. Even the lowest point of the region is above the axis, so there is a hole.`,
      slice: { at: 0.35, w: 0.045, text: 'dx', tx: 0.38, ty: 1.12, anchor: 'middle' },
      radii: [
        { from: [0.37, -1], to: [0.37, 1], color: 'cx', text: 'R', dx: -24, dy: 24 },
        { from: [0.58, -1], to: [0.58, sq(0.58)], color: 'cd', text: 'r', dx: 8, dy: 20 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from the curve up to $y=1$.`,
      methodSay: r`The strip is perpendicular to the horizontal axis, so spinning it makes a washer.`,
      xsSay: r`A washer has area $\pi R^2-\pi r^2$, times the thickness $dx$.`,
      radSteps: [
        { say: r`The outer radius is the distance from $y=-1$ to the far edge of the strip, the line $y=1$: $1-(-1)=2$.`, show: ['rad0'], rows: [r`R=1-(-1)=2`], cols: ['cx'] },
        { say: r`The inner radius is the distance to the near edge, the curve: $\sqrt x-(-1)=1+\sqrt x$.`, show: ['rad1'], rows: [r`r=\sqrt x-(-1)=1+\sqrt x`], cols: ['cd'] }],
      dVSay: r`$R^2=4$ and $r^2=(1+\sqrt x)^2$.`,
      dV: [r`R^2=4,\;r^2=\big(1+\sqrt x\big)^2`, r`=\pi\,\big(4-(1+\sqrt x)^2\big)\,dx`],
      integral: r`V=\pi\int_0^1\Big(4-\big(1+\sqrt x\big)^2\Big)\,dx`,
      integralSay: r`Add up the washers from $x=0$ to $x=1$.`,
      evalSteps: [
        { say: r`Expand $(1+\sqrt x)^2=1+2\sqrt x+x$. Then $4-1-2\sqrt x-x=3-2\sqrt x-x$.`, rows: [r`=\pi\int_0^1\big(3-2\sqrt x-x\big)\,dx`] },
        { say: r`Power rule, with $\sqrt x=x^{1/2}$: $\int2x^{1/2}dx=\tfrac43x^{3/2}$.`, rows: [r`=\pi\Big[3x-\tfrac43x^{3/2}-\tfrac{x^2}{2}\Big]_0^1`] },
        { say: r`At $x=1$: $3-\tfrac43-\tfrac12=\tfrac{18-8-3}{6}=\tfrac76$. The lower limit gives 0.`, rows: [r`=\pi\Big(3-\tfrac43-\tfrac12\Big)=\tfrac{7\pi}{6}`], boxed: true }],
      answer: r`\tfrac{7\pi}{6}`, track: [r`\text{washers about }y=-1`, r`\pi\int_0^1\big(4-(1+\sqrt x)^2\big)\,dx`, r`\tfrac{7\pi}{6}`],
      verify: [{ value: { f: x => PI * (4 - (1 + sq(x)) ** 2), a: 0, b: 1, val: 7 * PI / 6, n: 200000, tol: 1e-6 } }, { value: { f: y => 2 * PI * (y + 1) * y * y, a: 0, b: 1, val: 7 * PI / 6 } }],
      heli1: [ln(r`\text{about }y=-1`, 'ct')], heli3: [ln(r`\pi\Big[3x-\tfrac43x^{3/2}-\tfrac{x^2}{2}\Big]_0^1`)] }));
  }

  /* ===== 25 : disks about the x-axis, a fourth root ===== */
  {
    const f = x => sq(x) * Math.pow(x * x + 16, 0.25), val = 61 * PI / 3;
    examples.push(volGen({ n: 25, type: 'Disks about the x-axis', verb: 'Volume', method: 'disk',
      problem: r`y=\sqrt x\,(x^2+16)^{1/4},\;x=3,\;y=0\text{; about the }x\text{-axis}`,
      plot: { xr: [-0.4, 3.9], yr: [-0.5, 4.6], xt: [[1, '1'], [2, '2'], [3, '3']], yt: [1, 2, 3, [sq(15), '√15']], w: 640, h: 430 },
      curves: [
        { f, dom: [0, 3], n: 200, color: 'cx', eq: r`y=\sqrt x\,(x^2+16)^{1/4}`, text: 'y = √x (x²+16)^¼', at: [1.4, f(1.4)], dx: -40, dy: -16, say: r`Sketch. The curve starts at the origin and climbs. At $x=3$: $y=\sqrt3\cdot25^{1/4}=\sqrt3\cdot\sqrt5=\sqrt{15}\approx3.87$.` },
        { f: x => 0, dom: [0, 3], color: 'ca', eq: r`y=0`, say: r`The bottom boundary is the $x$-axis.` },
        { f: y => 3, dom: [0, sq(15)], orient: 'x', color: 'cp', eq: r`x=3`, say: r`The right boundary is the vertical line $x=3$.` }],
      points: [pt(0, 0, '(0, 0)', 12, 22), pt(3, 0, '(3, 0)', 8, 22), pt(3, sq(15), '(3, √15)', -86, -10)],
      pointsSay: r`Corners: the origin, $(3,0)$ and $(3,\sqrt{15})$.`,
      region: { top: f, bot: x => 0, range: [0, 3] },
      regionSay: r`The region lies under the curve, above the $x$-axis, from $x=0$ to $x=3$.`,
      axis: { kind: 'h', at: 0, text: 'axis y = 0', labAt: [-0.38, 0], dx: 0, dy: -10, tex: r`y=0` },
      axisSay: r`Rotate about the $x$-axis. The region sits right on the axis, so the solid has no hole.`,
      slice: { at: 1.5, w: 0.07, text: 'dx', tx: 1.53, ty: f(1.53) + 0.3, anchor: 'middle' },
      radii: [{ from: [1.54, 0], to: [1.54, f(1.54)], color: 'cx', text: 'R', dx: 8, dy: 24 }],
      sliceSay: r`Slice with a thin vertical strip of width $dx$, from the $x$-axis up to the curve.`,
      methodSay: r`The strip is perpendicular to the horizontal axis and touches it. Spinning it makes a solid disk.`,
      xsSay: r`A disk of radius $R$ has area $\pi R^2$. Times the thickness $dx$ gives its volume.`,
      radSteps: [{ say: r`The radius is the distance from the axis to the curve: $R=\sqrt x\,(x^2+16)^{1/4}$.`, show: ['rad0'], rows: [r`R=\sqrt x\,(x^2+16)^{1/4}`], cols: ['cx'] }],
      dVSay: r`Squaring is the trick: $(\sqrt x)^2=x$ and $\big((x^2+16)^{1/4}\big)^2=(x^2+16)^{1/2}$. The fourth root becomes a square root.`,
      dV: [r`R^2=x\sqrt{x^2+16}`, r`dV=\pi R^2\,dx`, r`=\pi\,x\sqrt{x^2+16}\,dx`],
      integral: r`V=\pi\int_0^3x\sqrt{x^2+16}\,dx`,
      integralSay: r`Add up the disks from $x=0$ to $x=3$.`,
      evalSteps: [
        { say: r`Let $u=x^2+16$, so $du=2x\,dx$ and $x\,dx=\tfrac12du$. Limits: $x=0\Rightarrow u=16$, and $x=3\Rightarrow u=25$.`, rows: [r`=\tfrac\pi2\int_{16}^{25}u^{1/2}\,du`] },
        { say: r`Power rule: $\int u^{1/2}du=\tfrac23u^{3/2}$, and $\tfrac\pi2\cdot\tfrac23=\tfrac\pi3$.`, rows: [r`=\tfrac\pi3\Big[u^{3/2}\Big]_{16}^{25}`] },
        { say: r`$25^{3/2}=5^3=125$ and $16^{3/2}=4^3=64$.`, rows: [r`=\tfrac\pi3\big(125-64\big)=\tfrac{61\pi}{3}`], boxed: true }],
      answer: r`\tfrac{61\pi}{3}`, track: [r`\text{disks about }y=0`, r`\pi\int_0^3x\sqrt{x^2+16}\,dx`, r`\tfrac{61\pi}{3}`],
      verify: [{ value: { f: x => PI * f(x) ** 2, a: 0, b: 3, val, tol: 1e-6 } }, { equal: { a: x => f(x) ** 2, b: x => x * sq(x * x + 16), range: [0, 3] } }],
      heli1: [ln(r`\text{about }y=0`, 'ct')], heli3: [ln(r`\tfrac\pi3\Big[u^{3/2}\Big]_{16}^{25}`)] }));
  }
}
