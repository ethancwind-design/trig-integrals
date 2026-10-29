/* Generator for polar-area lessons (Problem Set: Area Between Curves, part III): sketch -> limits -> wedge dA = 1/2 r^2 dθ -> integral -> evaluate.
   Same shape as areaGen, but the curves come in as r(θ) and the picture keeps equal x and y scales, so circles stay round.
   Everything problem-specific (curves, limits, algebra, captions) comes in through the config object. */
function polarGen(c) {
  const pw = c.plot, W = pw.w || 640, Ht = pw.h || 430, pad = Object.assign({ l: 46, r: 20, t: 18, b: 36 }, pw.pad || {});
  const ys = (pw.xr[1] - pw.xr[0]) * (Ht - pad.t - pad.b) / (W - pad.l - pad.r), yc = pw.yc || 0;
  const P = PlotKit({ w: W, h: Ht, xr: pw.xr, yr: [yc - ys / 2, yc + ys / 2], pad });
  const f1 = v => (+v).toFixed(1), col = k => `var(--${k})`;
  const at = (rf, t) => [rf(t) * Math.cos(t), rf(t) * Math.sin(t)];
  /* points of r(θ) for θ from t0 to t1, as path commands (first command `cmd`); a negative r lands on the opposite side of the pole */
  const poly = (rf, t0, t1, n, cmd) => { let d = ''; for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n, [x, y] = at(rf, t); d += (i ? 'L' : cmd) + f1(P.X(x)) + ' ' + f1(P.Y(y)); } return d; };
  /* the sector swept from θ=t0 to θ=t1 between r=ri(θ) (the pole when omitted) and r=ro(θ) */
  const sector = (t0, t1, ro, ri, n = 120) => (ri ? poly(ro, t0, t1, n, 'M') + poly(ri, t1, t0, n, 'L') : `M${f1(P.X(0))} ${f1(P.Y(0))}` + poly(ro, t0, t1, n, 'L')) + 'Z';
  const label = (x, y, text, color, o = {}) => `<text class="lbl" x="${f1(P.X(x) + (o.dx || 0))}" y="${f1(P.Y(y) + (o.dy || 0))}" style="fill:${col(color)}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}>${text}</text>`;

  P.axes('axes', { xt: pw.xt, yt: pw.yt });
  c.curves.forEach((cv, i) => {
    const d = (cv.doms || [cv.dom]).map(([a, b]) => poly(cv.r, a, b, cv.n || 240, 'M')).join('');
    P.raw('c' + i, `<path class="cv" pathLength="1" d="${d}" style="stroke:${col(cv.color)};stroke-width:3.5"/>` + (cv.at ? label(cv.at[0], cv.at[1], cv.text, cv.color, cv) : ''), 'draw');
  });
  if (c.rays) {
    let s = '';
    c.rays.forEach(ry => {
      const x2 = ry.len * Math.cos(ry.t), y2 = ry.len * Math.sin(ry.t), x1 = ry.both ? -x2 : 0, y1 = ry.both ? -y2 : 0;
      s += `<line x1="${f1(P.X(x1))}" y1="${f1(P.Y(y1))}" x2="${f1(P.X(x2))}" y2="${f1(P.Y(y2))}" style="stroke:${col(ry.color || 'ca')};stroke-width:2.5;stroke-dasharray:8 6"/>`;
      if (ry.text) s += label(x2, y2, ry.text, ry.color || 'ca', ry);
    });
    P.raw('rays', s);
  }
  (c.points || []).forEach((p, i) => P.dot('pt' + i, p.x, p.y, p.color || 'ca', { text: p.text, dx: p.tdx, dy: p.tdy, anchor: p.anchor }));
  P.raw('region', `<path d="${c.region.map(s => sector(s.t0, s.t1, s.ro, s.ri)).join('')}" style="fill:var(--cr);opacity:.24;stroke:none"/>`);
  const wg = c.wedge;
  if (wg) {
    P.raw('wedge', `<path d="${sector(wg.t, wg.t + wg.dt, wg.ro, wg.ri, 12)}" style="fill:var(--cp);opacity:.65;stroke:var(--cp);stroke-width:1.5"/>`);
    const tm = wg.t + wg.dt / 2, [rx, ry] = at(wg.ro, tm), [bx0, by0] = wg.ri ? at(wg.ri, tm) : [0, 0];
    P.raw('radl', `<line x1="${f1(P.X(bx0))}" y1="${f1(P.Y(by0))}" x2="${f1(P.X(rx))}" y2="${f1(P.Y(ry))}" style="stroke:var(--cp);stroke-width:2.5"/>` +
      label((rx + bx0) / 2, (ry + by0) / 2, wg.rText || 'r', 'cp', { dx: wg.rdx == null ? -14 : wg.rdx, dy: wg.rdy == null ? -8 : wg.rdy }) + label(wg.tx, wg.ty, 'dθ', 'cp', { anchor: wg.anchor || 'start' }));
  }
  if (c.extra) c.extra(P);
  const spec = P.spec('polar' + c.n);
  const curveIds = c.curves.map((_, i) => 'c' + i), ptIds = (c.points || []).map((_, i) => 'pt' + i);
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
  const sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const eyeC = eyebrow('eb1', 'Curves');
  const eqRow = i => R('side', T('eq' + i, c.curves[i].eq, c.curves[i].color));
  const steps = [];
  /* ---------- Phase 1: sketch and limits ---------- */
  c.curves.forEach((cv, i) => steps.push(S(1, cv.say, [plot(['axes', ...curveIds.slice(0, i + 1)])], [eyeC, ...c.curves.slice(0, i + 1).map((_, j) => eqRow(j))])));
  const sk = ['axes', ...curveIds];
  let interRows = [], rayIds = [];
  (c.inter || []).forEach((st, i) => {
    if (st.rays && c.rays) rayIds = ['rays'];
    interRows = interRows.concat(st.rows.map((tex, j) => R('side', T(`ix${i}_${j}`, tex, st.c || 'ink', st.boxed && j === st.rows.length - 1 ? { cls: 'boxed' } : {}))));
    steps.push(S(1, st.say, [plot([...sk, ...rayIds])], [eyebrow('eb2', c.interTitle || 'Limits'), ...interRows]));
  });
  if (c.points && c.points.length) steps.push(S(1, c.pointsSay, [plot([...sk, ...rayIds, ...ptIds])], [eyebrow('eb2', c.interTitle || 'Limits'), ...interRows]));
  steps.push(S(1, c.regionSay, [plot([...sk, ...rayIds, ...ptIds, 'region'])], [eyebrow('eb2', c.interTitle || 'Limits'), ...interRows]));
  /* ---------- Phase 2: set up ---------- */
  const all = [...sk, ...rayIds, ...ptIds, 'region'];
  const elemRows = [eyebrow('eb3', 'Area element'), R('side', T('dA', c.dA, 'cp'))];
  if (wg) steps.push(S(2, c.wedgeSay, [plot([...all, 'wedge', 'radl'])], elemRows));
  const hRows = c.rows.flatMap((tex, i) => {
    const colr = i === c.rows.length - 1 ? 'cp' : 'ink', cut = tex.lastIndexOf('=');
    return tex.length > 28 && cut > 0 ? [R('side', T('h' + i + 'a', tex.slice(0, cut), colr)), R('side', T('h' + i + 'b', tex.slice(cut), colr))] : [R('side', T('h' + i, tex, colr))];
  });
  steps.push(S(2, c.rowsSay, [plot([...all, ...(wg ? ['wedge', 'radl'] : [])])], [...elemRows, ...hRows]));
  const ints = Array.isArray(c.integral) ? c.integral : [c.integral];
  const I = ints.map((tex, i) => R('big', T(i ? 'I' + i : 'I', tex, 'ink')));
  steps.push(S(2, c.integralSay, I, [eyebrow('eb4', 'Region'), sideP(all)]));
  /* ---------- Phase 3: evaluate ---------- */
  let lines = [];
  (c.evalSteps || []).forEach((st, i) => {
    if (st.fresh) lines = [];
    st.rows.forEach((tex, j) => lines.push(R('line', T(`ev${i}_${j}`, tex, 'ink', st.boxed && j === st.rows.length - 1 ? { cls: 'boxed' } : {}))));
    steps.push(S(3, st.say, st.main || [...I, ...lines], st.side || [eyebrow('eb4', 'Region'), sideP(all)]));
  });
  return {
    n: c.n, label: c.label || ('Problem ' + c.n), type: c.type || 'Polar area', verb: c.verb || 'Find', problem: c.problem, phases: c.phases || ['Sketch', 'Set up', 'Evaluate'],
    track: c.track, verify: c.verify, steps,
    heli: [
      [{ plot: spec, show: all }, ...(c.heli1 || [])],
      [ln(c.dA, 'cp'), ...(c.heli2 || []), ...ints.map(t => ln(t, 'ink'))],
      [...(c.heli3 || []), bx(c.answer)]]
  };
}
