/* Generator for "volume of revolution" lessons (Lectures 32-33): sketch -> axis -> slice -> radii -> dV -> integral -> evaluate.
   Cross-section diagrams (disk / washer / shell) are built here too; every problem-specific word comes in through the config. */

/* ---------- cross-section diagrams (screen coordinates, 380 x 190) ---------- */
function xsDiagram(kind, id, t = 'dx') {
  const P = PlotKit({ w: 380, h: 190, xr: [0, 380], yr: [0, 190], pad: { l: 0, r: 0, t: 0, b: 0 } });
  const c = v => `var(--${v})`;
  const txt = (x, y, s, col, o = {}) => `<text class="lbl" x="${x}" y="${y}" style="fill:${c(col)};${o.size ? 'font-size:' + o.size + 'px;' : ''}" text-anchor="${o.anchor || 'start'}">${s}</text>`;
  const arr = (x1, y1, x2, y2, col, w = 3) => {
    const a = Math.atan2(y2 - y1, x2 - x1), L = 10, p = s => `${(x2 - L * Math.cos(a + s)).toFixed(1)} ${(y2 - L * Math.sin(a + s)).toFixed(1)}`;
    return `<path d="M${x1} ${y1}L${x2} ${y2}M${p(.45)}L${x2} ${y2}L${p(-.45)}" style="stroke:${c(col)};stroke-width:${w};fill:none;stroke-linecap:round;stroke-linejoin:round"/>`;
  };
  if (kind === 'disk' || kind === 'washer') {
    const cx = 100, cy = 98, R = 76, r = 36, ax = Math.cos(-0.62), ay = Math.sin(-0.62), bx = Math.cos(0.75), by = Math.sin(0.75);
    P.raw('ring', `<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:${c('cx')};opacity:.22;stroke:${c('cx')};stroke-width:3;stroke-opacity:1"/>` + (kind === 'washer' ? `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${c('paper')};stroke:${c('cd')};stroke-width:3"/>` : '') + `<circle cx="${cx}" cy="${cy}" r="4.5" style="fill:${c('ct')}"/>`);
    P.raw('rad', arr(cx, cy, cx + R * ax, cy + R * ay, 'cx') + txt(cx + R * ax * .5 + 4, cy + R * ay * .5 - 8, 'R', 'cx') + (kind === 'washer' ? arr(cx, cy, cx + r * bx, cy + r * by, 'cd') + txt(cx + r * bx * .5 + 8, cy + r * by * .5 + 18, 'r', 'cd') : ''));
    P.raw('cap', txt(206, 70, kind === 'disk' ? 'disk' : 'washer', 'ink', { size: 21 }) + txt(206, 100, 'area', 'muted', { size: 17 }) + txt(206, 126, kind === 'disk' ? 'πR²' : 'π(R² − r²)', 'ink', { size: 19 }) + txt(206, 162, 'axis at the centre', 'ct', { size: 15 }));
  } else {  /* shell: cylinder, then the same shell unrolled into a thin slab */
    const cx = 74, t0 = 52, t1 = 148, ox = 52, oy = 15, ix = 43, iy = 11.5;
    P.raw('cyl', `<path d="M${cx - ox} ${t0}V${t1}A${ox} ${oy} 0 0 0 ${cx + ox} ${t1}V${t0}Z" style="fill:${c('cx')};opacity:.22;stroke:none"/>` +
      `<path d="M${cx - ox} ${t0}V${t1}A${ox} ${oy} 0 0 0 ${cx + ox} ${t1}V${t0}" style="fill:none;stroke:${c('cx')};stroke-width:3"/>` +
      `<ellipse cx="${cx}" cy="${t0}" rx="${ox}" ry="${oy}" style="fill:${c('cx')};opacity:.4;stroke:${c('cx')};stroke-width:3"/>` +
      `<ellipse cx="${cx}" cy="${t0}" rx="${ix}" ry="${iy}" style="fill:${c('paper')};stroke:${c('cx')};stroke-width:2"/>` +
      `<circle cx="${cx}" cy="${t0}" r="3.5" style="fill:${c('ct')}"/>`);
    P.raw('cdim', arr(cx, t0, cx + ox - 2, t0, 'cd') + txt(cx + 14, t0 - 18, 'r', 'cd') + arr(cx + ox + 22, t0, cx + ox + 22, t1, 'cp') + txt(cx + ox + 30, 106, 'h', 'cp') + `<path d="M${cx + ix} ${t0 + 14}h${ox - ix}" style="stroke:${c('ca')};stroke-width:3"/>` + txt(cx + ox + 4, t0 + 27, t, 'ca', { size: 15 }));
    const sx = 212, sy = 84, sw = 106, sh = 66, d = 11;
    P.raw('slab', `<path d="M${sx} ${sy}l${d} ${-d}h${sw}l${-d} ${d}Z" style="fill:${c('cx')};opacity:.5;stroke:${c('cx')};stroke-width:2"/><path d="M${sx + sw} ${sy}l${d} ${-d}v${sh}l${-d} ${d}Z" style="fill:${c('cx')};opacity:.35;stroke:${c('cx')};stroke-width:2"/><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" style="fill:${c('cx')};opacity:.22;stroke:${c('cx')};stroke-width:2.5"/>` +
      txt(sx + sw / 2, sy + sh + 24, '2πr', 'cd', { anchor: 'middle', size: 18 }) + txt(sx - 8, sy + sh / 2 + 6, 'h', 'cp', { anchor: 'end', size: 18 }) + txt(sx + sw + d + 4, sy - d - 2, t, 'ca', { size: 15 }) +
      arr(168, 78, 200, 78, 'muted', 2.5) + txt(184, 62, 'unroll', 'muted', { anchor: 'middle', size: 15 }) + txt(sx + sw / 2 + 6, 36, 'V ≈ 2πr · h · ' + t, 'ink', { anchor: 'middle', size: 18 }));
  }
  return P.spec(id || 'xs-' + kind);
}

/* ---------- the lesson generator ---------- */
function volGen(c) {
  const pw = c.plot, P = PlotKit({ w: pw.w || 640, h: pw.h || 430, xr: pw.xr, yr: pw.yr, pad: pw.pad });
  P.axes('axes', { xt: pw.xt, yt: pw.yt });
  c.curves.forEach((cv, i) => (cv.orient === 'x' ? P.curveY : P.curve).call(P, 'c' + i, cv.f, cv.dom, cv.color, { label: cv.at, text: cv.text, dx: cv.dx, dy: cv.dy, dash: cv.dash, n: cv.n }));
  (c.points || []).forEach((pt, i) => P.dot('pt' + i, pt.x, pt.y, pt.color || 'ca', { text: pt.text, dx: pt.tdx, dy: pt.tdy, anchor: pt.anchor }));
  const rg = c.region, vert = c.orient !== 'h';
  if (rg) { if (vert) P.fill('region', rg.top, rg.bot, rg.range, 'cr', { opacity: .22 }); else P.fillY('region', rg.right, rg.left, rg.range, 'cr', { opacity: .22 }); }
  const ax = c.axis, [xa, xb] = pw.xr, [ya, yb] = pw.yr;
  if (ax.kind === 'h') P.line('axis', xa, ax.at, xb, ax.at, 'ct', { dash: '12 7', width: 3.5, text: ax.text, at: ax.labAt || [xb, ax.at], dx: ax.dx == null ? -4 : ax.dx, dy: ax.dy == null ? -10 : ax.dy });
  else P.line('axis', ax.at, ya, ax.at, yb, 'ct', { dash: '12 7', width: 3.5, text: ax.text, at: ax.labAt || [ax.at, yb], dx: ax.dx == null ? 8 : ax.dx, dy: ax.dy == null ? 16 : ax.dy });
  const s = c.slice;
  if (vert) P.rect('strip', s.at, rg.bot(s.at + s.w / 2), s.at + s.w, rg.top(s.at + s.w / 2), 'cp', { opacity: .55, minW: 5 });
  else P.rect('strip', rg.left(s.at + s.w / 2), s.at, rg.right(s.at + s.w / 2), s.at + s.w, 'cp', { opacity: .55, minH: 5 });
  if (s.text) P.text('stripl', s.tx, s.ty, s.text, 'cp', { anchor: s.anchor || 'start' });
  (c.radii || []).forEach((a, i) => P.arrow('rad' + i, a.from[0], a.from[1], a.to[0], a.to[1], a.color, { text: a.text, dx: a.dx, dy: a.dy }));
  if (c.extra) c.extra(P);
  const spec = P.spec('vol' + c.n), xs = xsDiagram(c.method, 'xs' + c.n, vert ? 'dx' : 'dy');
  const curveIds = c.curves.map((_, i) => 'c' + i), ptIds = (c.points || []).map((_, i) => 'pt' + i);
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
  const sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const xsIds = xs.layers.map(l => l.id);
  const xsMain = R('plotrow', PLOT('xs', xs, xsIds, { size: 'md' }));
  const xsSide = R('side', PLOT('xs', xs, xsIds, { size: 'sm' }));
  const eyeC = eyebrow('eb1', 'Curves');
  const eqRow = i => R('side', T('eq' + i, c.curves[i].eq, c.curves[i].color));
  const steps = [];
  /* ---------- Phase 1: sketch ---------- */
  c.curves.forEach((cv, i) => steps.push(S(1, cv.say, [plot(['axes', ...curveIds.slice(0, i + 1)])], [eyeC, ...c.curves.slice(0, i + 1).map((_, j) => eqRow(j))])));
  const sk = ['axes', ...curveIds];
  let interRows = [];
  (c.inter || []).forEach((st, i) => {
    interRows = interRows.concat(st.rows.map((tex, j) => R('side', T(`ix${i}_${j}`, tex, st.c || 'ink', st.boxed && j === st.rows.length - 1 ? { cls: 'boxed' } : {}))));
    steps.push(S(1, st.say, [plot(sk)], [eyebrow('eb2', 'Intersections'), ...interRows]));
  });
  const interSide = interRows.length ? [eyebrow('eb2', 'Intersections'), ...interRows] : [eyeC, ...c.curves.map((_, j) => eqRow(j))];
  if (c.points && c.points.length) steps.push(S(1, c.pointsSay, [plot([...sk, ...ptIds])], interSide));
  const all = [...sk, ...ptIds, 'region'];
  steps.push(S(1, c.regionSay, [plot(all)], interSide));
  const axSide = [eyebrow('eb3', 'Axis of revolution'), R('side', T('ax', ax.tex, 'ct'))];
  steps.push(S(1, c.axisSay, [plot([...all, 'axis'])], axSide));
  /* ---------- Phase 2: slice, method, radii, dV ---------- */
  const shown = [...all, 'axis', 'strip', ...(s.text ? ['stripl'] : [])];
  const perp = c.method !== 'shell';
  const rule = [eyebrow('eb4', 'Slice and axis'), R('side', T('rl1', perp ? r`\text{slice}\perp\text{axis}` : r`\text{slice}\parallel\text{axis}`, 'cp')), R('side', T('rl2', perp ? (c.method === 'disk' ? r`\Rightarrow\text{disk}` : r`\Rightarrow\text{washer}`) : r`\Rightarrow\text{shell}`, 'cx', { cls: 'boxed' }))];
  steps.push(S(2, c.sliceSay, [plot(shown)], rule.slice(0, 1)));
  steps.push(S(2, c.methodSay, [plot(shown)], rule));
  steps.push(S(2, c.xsSay, [xsMain], [eyebrow('eb5', 'Region'), sideP(shown)]));
  let radRows = [];
  const radShown = [];
  (c.radSteps || []).forEach(st => {
    radShown.push(...(st.show || []));
    radRows = radRows.concat(st.rows.map((tex, j) => R('side', T(`rr${radRows.length + j}`, tex, st.cols ? st.cols[j] : 'ink'))));
    steps.push(S(2, st.say, [plot([...shown, ...radShown])], [eyebrow('eb6', 'Dimensions'), xsSide, ...radRows]));
  });
  const dvRows = c.dV.map((tex, j) => R('side', T('dv' + j, tex, j === c.dV.length - 1 ? 'cp' : 'ink', j === c.dV.length - 1 ? { cls: 'boxed' } : {})));
  steps.push(S(2, c.dVSay, [plot([...shown, ...radShown])], [eyebrow('eb7', 'Volume element'), xsSide, ...dvRows]));
  const ints = Array.isArray(c.integral) ? c.integral : [c.integral];
  const I = ints.map((tex, i) => R('big', T(i ? 'I' + i : 'I', tex, 'ink')));
  steps.push(S(2, c.integralSay, I, [eyebrow('eb8', 'Region'), sideP([...all, 'axis'])]));
  /* ---------- Phase 3: evaluate ---------- */
  let lines = [];
  (c.evalSteps || []).forEach((st, i) => {
    if (st.fresh) lines = [];
    lines = lines.concat((st.rows || []).map((tex, j) => R('line', T(`ev${i}_${j}`, tex, 'ink', st.boxed && j === st.rows.length - 1 ? { cls: 'boxed' } : {}))));
    steps.push(S(3, st.say, st.main || [...I, ...lines], st.side || [eyebrow('eb8', 'Region'), sideP([...all, 'axis'])]));
  });
  return {
    n: c.n, label: c.label || ('Problem ' + c.n), type: c.type, verb: c.verb || 'Find', problem: c.problem, phases: c.phases || ['Sketch', 'Slice', 'Integrate'],
    track: c.track, verify: c.verify, steps,
    heli: c.heli || [
      [{ plot: spec, show: [...all, 'axis'] }, ...(c.heli1 || [])],
      [{ plot: xs, show: xsIds }, ...(c.heli2 || []), ln(c.dV[c.dV.length - 1], 'cp')],
      [...ints.map(t => ln(t, 'ink')), ...(c.heli3 || []), bx(c.answer)]]
  };
}

/* ---------- two-sided regions about the y-axis (odd powers; first and third quadrants) ---------- */
function twoSideGen(c) {
  const m = c.m, a = c.a, b = c.b, f = x => Math.pow(x, m), top = Math.pow(b, m), bot = -Math.pow(a, m);
  const A = Math.pow(a, m + 2), B = Math.pow(b, m + 2), q = m + 2, cr = Math.pow;
  const P = PlotKit({ w: 640, h: 440, xr: c.xr, yr: c.yr });
  P.axes('axes', { xt: [[-a, '−' + a], [b, String(b)]], yt: [[top, String(top)], [bot, '−' + (-bot)]] });
  P.curve('c0', f, [-a - 0.25, b + 0.25], 'cx', { label: c.labAt, text: `y = x${m === 3 ? '³' : '⁵'}`, dx: 8, dy: 0, n: 200 });
  P.line('vl0', -a, 0, -a, bot, 'ca', { dash: '6 5', width: 2.5 }); P.line('vl1', b, 0, b, top, 'ca', { dash: '6 5', width: 2.5 });
  P.dot('p0', -a, bot, 'ca', { text: `(−${a}, −${-bot})`, dx: 12, dy: 24 }); P.dot('p1', b, top, 'ca', { text: `(${b}, ${top})`, dx: 12, dy: -10 });
  P.line('hl0', -a, bot, 0, bot, 'cd', { dash: '6 5', width: 2.5, text: `y = −${-bot}`, at: [-a / 2, bot], dx: -20, dy: 24 }); P.line('hl1', 0, top, b, top, 'cd', { dash: '6 5', width: 2.5, text: `y = ${top}`, at: [b, top], dx: 10, dy: 22 });
  P.fill('regR', x => top, f, [0, b], 'cr', { opacity: .22 }); P.fill('regL', f, x => bot, [-a, 0], 'cr', { opacity: .22 });
  P.line('axis', 0, c.yr[0], 0, c.yr[1], 'ct', { dash: '12 7', width: 3.5, text: 'axis x = 0', at: [0, c.yr[1]], dx: 8, dy: 18 });
  const sR = 0.55 * b, wR = 0.045 * b, sL = 0.55 * a, wL = 0.045 * a;
  P.rect('sR', sR, f(sR), sR + wR, top, 'cp', { opacity: .55, minW: 5 }); P.text('dxR', sR + wR / 2, top + 0.045 * (c.yr[1] - c.yr[0]), 'dx', 'cp', { anchor: 'middle' });
  P.rect('sL', -sL, bot, -sL + wL, f(-sL), 'cp', { opacity: .55, minW: 5 }); P.text('dxL', -sL + wL / 2, f(-sL) + 0.05 * (c.yr[1] - c.yr[0]), 'dx', 'cp', { anchor: 'middle' });
  const yR = (f(sR) + top) / 2, yL = (f(-sL) + bot) / 2, g = 0.1 * Math.max(a, b);
  P.arrow('rR', 0, yR, sR - 0.01, yR, 'cd', { text: 'r', dx: 0, dy: -12 }); P.arrow('hR', sR - g, f(sR - g) + 0, sR - g, top, 'cp', { text: 'h', dx: -22, dy: 6 });
  P.arrow('rL', 0, yL, -sL + 0.01, yL, 'cd', { text: 'r', dx: 0, dy: 22 }); P.arrow('hL', -sL + wL + g, bot, -sL + wL + g, f(-sL + wL + g), 'cp', { text: 'h', dx: 8, dy: 4 });
  const yd = bot * 0.55, xd = -Math.pow(-yd, 1 / m), hd = 0.03 * (c.yr[1] - c.yr[0]);
  P.rect('dstrip', xd, yd, 0, yd + hd, 'cp', { opacity: .55, minH: 5 }); P.arrow('drad', 0, yd + hd / 2, xd + 0.02, yd + hd / 2, 'cx', { text: 'R', dx: 0, dy: -12 }); P.text('dyl', 0.1 * Math.max(a, b), yd + hd / 2, 'dy', 'cp', { anchor: 'start' });
  const spec = P.spec('two' + c.n), plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size })), sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const eb = (k, t) => eyebrow(k, t);
  const S0 = ['axes', 'c0'], S1 = [...S0, 'vl0', 'vl1', 'p0', 'p1'], S2 = [...S1, 'hl0', 'hl1', 'regL', 'regR'], S3 = [...S2, 'axis'];
  const mTex = m === 3 ? '3' : '5';
  const dvR = `dV=2\\pi x\\,(${top}-x^${mTex})\\,dx`, dvL = `dV=2\\pi x'\\,(${-bot}-x'^${mTex})\\,dx'`;
  const I1 = `V=\\int_0^{${b}}2\\pi x\\,(${top}-x^${mTex})\\,dx`, I2 = `\\quad+\\int_0^{${a}}2\\pi x\\,(${-bot}-x^${mTex})\\,dx`;
  const bigI = [R('big', T('I', I1)), R('big', T('I2', I2))];
  const piece = (cc, C, key) => {  /* evaluate  \int_0^c 2\pi x (c^m - x^m) dx */
    const cm = Math.pow(cc, m), anti = cm % 2 === 0 ? `${cm / 2}x^2` : `\\tfrac{${cm}}{2}x^2`;
    return [`\\int_0^{${cc}}2\\pi x(${cm}-x^${mTex})\\,dx=2\\pi\\Big[${anti}-\\tfrac{x^{${q}}}{${q}}\\Big]_0^{${cc}}`, `=2\\pi\\cdot${C}\\Big(\\tfrac12-\\tfrac1{${q}}\\Big)=\\tfrac{${m * C}\\pi}{${q}}`];
  };
  const rp = piece(b, B), lp = piece(a, A), total = `\\tfrac{${m * (A + B)}\\pi}{${q}}`;
  const ln1 = (k, tex, boxed) => R('line', T(k, tex, 'ink', boxed ? { cls: 'boxed' } : {}));
  const steps = [
    S(1, `Sketch the curve $y=x^${mTex}$. It is an odd function: the left half is the right half flipped through the origin, so the curve lives in the first and third quadrants.`, [plot(S0)], [eb('e0', 'Curve'), R('side', T('q1', `y=x^${mTex}`, 'cx'))]),
    S(1, `The lines $x=-${a}$ and $x=${b}$ cut the curve at $(-${a},-${-bot})$ and $(${b},${top})$.`, [plot(S1)], [eb('e0', 'Vertical lines'), R('side', T('q1', `x=-${a}`, 'ca')), R('side', T('q2', `x=${b}`, 'ca'))]),
    S(1, `Reading the figure: the shaded region is closed by horizontal lines through those two points, $y=${top}$ on the right and $y=-${-bot}$ on the left, with the $y$-axis as the inner edge.`, [plot(S2)], [eb('e0', 'Horizontal lines'), R('side', T('q1', `y=${top}`, 'cd')), R('side', T('q2', `y=-${-bot}`, 'cd'))]),
    S(1, `Rotate about the $y$-axis. The solid has two parts: an upper one from the right piece and a lower one from the left piece. Both pieces touch the axis.`, [plot(S3)], [eb('e0', 'Axis'), R('side', T('q1', r`x=0`, 'ct'))]),
    S(2, `Right piece: a vertical strip of width $dx$ from the curve up to $y=${top}$. It is parallel to the axis, so it makes a shell with $r=x$ and $h=${top}-x^${mTex}$.`, [plot([...S3, 'sR', 'dxR', 'rR', 'hR'])], [eb('f0', 'Right piece'), R('side', T('r1', r`r=x`, 'cd')), R('side', T('r2', `h=${top}-x^${mTex}`, 'cp')), R('side', T('r3', dvR, 'cp', { cls: 'boxed' }))]),
    S(2, `Left piece: a vertical strip at $x<0$ runs from $y=-${-bot}$ up to the curve. Its radius is the distance to the axis, $-x$, and its height is $x^${mTex}-(-${-bot})$. Both are positive.`, [plot([...S3, 'sL', 'dxL', 'rL', 'hL'])], [eb('f0', 'Left piece'), R('side', T('l1', r`r=-x`, 'cd')), R('side', T('l2', `h=x^${mTex}+${-bot}`, 'cp'))]),
    S(2, `Flip the left piece: write $x'=-x\\ge0$. Since $${mTex}$ is odd, $x^${mTex}=-x'^${mTex}$, so $h=${-bot}-x'^${mTex}$. The left shell has the same form as the right one, with $x'$ from 0 to ${a}.`, [plot([...S3, 'sL', 'dxL', 'rL', 'hL'])], [eb('f0', 'Left piece, x′ = −x'), R('side', T('l1', r`r=x'`, 'cd')), R('side', T('l2', `h=${-bot}-x'^${mTex}`, 'cp')), R('side', T('l3', dvL, 'cp', { cls: 'boxed' }))]),
    S(2, `Add the two pieces. This is the integral expression the problem asks for.`, bigI, [eb('g0', 'Region'), sideP(S3), ...(c.warn ? [R('side', WARN('wn', c.warn))] : [])]),
    S(3, `Optional check, not required: evaluate the right piece. Antiderivative of $x(${top}-x^${mTex})$, then plug in $x=${b}$.`, [...bigI, ln1('p1', rp[0]), ln1('p2', rp[1])], [eb('g0', 'Region'), sideP(S3)]),
    S(3, `Now the left piece, the same way with $${a}$ in place of $${b}$.`, [...bigI, ln1('p1', lp[0]), ln1('p2', lp[1])], [eb('g0', 'Region'), sideP(S3)]),
    S(3, `Add the pieces: $V=\\tfrac{${m * B}\\pi}{${q}}+\\tfrac{${m * A}\\pi}{${q}}$.`, [...bigI, ln1('p1', `V=\\tfrac{${m * B}\\pi}{${q}}+\\tfrac{${m * A}\\pi}{${q}}=${total}`, true)], [eb('g0', 'Region'), sideP(S3)]),
    S(3, `A different slicing as a check: horizontal strips are perpendicular to the axis, so they make disks. At height $y$ the disk radius is $|y|^{1/${m}}$, from $x=y^{1/${m}}$ to the axis. One integral covers both parts.`, [R('big', T('J', `V=\\pi\\int_{-${-bot}}^{${top}}|y|^{2/${m}}\\,dy`))], [eb('g0', 'Disks'), sideP([...S3, 'dstrip', 'drad', 'dyl'])]),
    S(3, `Split at $y=0$ and use $\\int_0^c y^{2/${m}}dy=\\tfrac{${m}}{${q}}\\,c^{${q}/${m}}$. With $c=${top}$ and $c=${-bot}$ this gives $\\tfrac{${m}}{${q}}\\big(${B}+${A}\\big)$.`, [R('big', T('J', `V=\\pi\\int_{-${-bot}}^{${top}}|y|^{2/${m}}\\,dy`)), ln1('d1', `=\\pi\\cdot\\tfrac{${m}}{${q}}\\big(${A}+${B}\\big)=${total}`, true)], [eb('g0', 'Disks'), sideP([...S3, 'dstrip', 'drad', 'dyl'])])
  ];
  return {
    n: c.n, label: 'Problem ' + c.n, type: c.type, verb: 'Write', problem: c.problem, phases: ['Sketch', 'Shells', 'Check'], track: [r`\text{region about the }y\text{-axis}`, r`\text{two shell integrals}`, total],
    verify: [{ value: { f: x => 2 * Math.PI * x * (top - cr(x, m)), a: 0, b: b, val: m * B * Math.PI / q } }, { value: { f: x => 2 * Math.PI * x * (-bot - cr(x, m)), a: 0, b: a, val: m * A * Math.PI / q } },
      { value: { f: y => Math.PI * Math.pow(Math.abs(y), 2 / m), a: bot, b: top, val: m * (A + B) * Math.PI / q, n: 200000, tol: 1e-5 } }],
    steps, heli: [[{ plot: spec, show: S3 }, ln(`y=x^${mTex},\;x=-${a},\;x=${b}`, 'cx')], [ln(dvR, 'cp'), ln(dvL, 'cp')], [ln(I1, 'ink'), ln(I2, 'ink'), bx(`=${total}`)]]
  };
}
