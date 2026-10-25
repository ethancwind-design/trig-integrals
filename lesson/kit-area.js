/* Generator for "area between two curves" lessons (Lectures 30-31): sketch -> area element -> integral -> evaluate.
   Everything problem-specific (curves, algebra, captions) comes in through the config object. */
function areaGen(c) {
  const vert = c.orient !== 'h';
  const pw = c.plot, P = PlotKit({ w: pw.w || 640, h: pw.h || 440, xr: pw.xr, yr: pw.yr, pad: pw.pad });
  P.axes('axes', { xt: pw.xt, yt: pw.yt });
  c.curves.forEach((cv, i) => (cv.orient === 'x' ? P.curveY : P.curve).call(P, 'c' + i, cv.f, cv.dom, cv.color, { label: cv.at, text: cv.text, dx: cv.dx, dy: cv.dy, dash: cv.dash, n: cv.n }));
  (c.points || []).forEach((pt, i) => P.dot('pt' + i, pt.x, pt.y, pt.color || 'ca', { text: pt.text, dx: pt.tdx, dy: pt.tdy, anchor: pt.anchor }));
  const rg = c.region;
  if (rg) { if (vert) P.fill('region', rg.top, rg.bot, rg.range, 'cr', { opacity: .22 }); else P.fillY('region', rg.right, rg.left, rg.range, 'cr', { opacity: .22 }); }
  if (c.strip) {
    const s = c.strip;
    if (vert) P.rect('strip', s.at, rg.bot(s.at + s.w / 2), s.at + s.w, rg.top(s.at + s.w / 2), 'cp', { opacity: .55, minW: 5 });
    else P.rect('strip', rg.left(s.at + s.w / 2), s.at, rg.right(s.at + s.w / 2), s.at + s.w, 'cp', { opacity: .55, minH: 5 });
    if (s.text) P.text('stripl', s.tx, s.ty, s.text, 'cp', { anchor: s.anchor || 'start' });
  }
  if (c.extra) c.extra(P);
  const spec = P.spec('area' + c.n);
  const curveIds = c.curves.map((_, i) => 'c' + i), ptIds = (c.points || []).map((_, i) => 'pt' + i);
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
  const sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const cols = ['cx', 'cd', 'cr', 'cp'];
  const eyeC = eyebrow('eb1', 'Curves');
  const eqRow = i => R('side', T('eq' + i, c.curves[i].eq, c.curves[i].color));
  const steps = [];
  /* ---------- Phase 1: sketch ---------- */
  c.curves.forEach((cv, i) => {
    steps.push(S(1, cv.say, [plot(['axes', ...curveIds.slice(0, i + 1)])], [eyeC, ...c.curves.slice(0, i + 1).map((_, j) => eqRow(j))]));
  });
  const sk = ['axes', ...curveIds];
  const baseSide = [eyeC, ...c.curves.map((_, j) => eqRow(j))];
  let interRows = [];
  (c.inter || []).forEach((st, i) => {
    interRows = interRows.concat(st.rows.map((tex, j) => R('side', T(`ix${i}_${j}`, tex, st.c || 'ink', st.boxed && j === st.rows.length - 1 ? { cls: 'boxed' } : {}))));
    steps.push(S(1, st.say, [plot(sk)], [eyebrow('eb2', 'Intersections'), ...interRows]));
  });
  if (c.points && c.points.length) steps.push(S(1, c.pointsSay, [plot([...sk, ...ptIds])], [eyebrow('eb2', 'Intersections'), ...interRows]));
  if (rg) steps.push(S(1, c.regionSay, [plot([...sk, ...ptIds, 'region'])], [eyebrow('eb2', 'Intersections'), ...interRows]));
  /* ---------- Phase 2: set up ---------- */
  const all = [...sk, ...ptIds, 'region'];
  const dA = vert ? r`dA=(y_{\text{top}}-y_{\text{bottom}})\,dx` : r`dA=(x_{\text{right}}-x_{\text{left}})\,dy`;
  const elemRows = [eyebrow('eb3', 'Area element'), R('side', T('dA', dA, 'cp'))];
  const stripIds = c.strip ? ['strip', ...(c.strip.text ? ['stripl'] : []), ...(c.stripExtra || [])] : [];
  if (c.strip) steps.push(S(2, c.sliceSay, [plot([...all, ...stripIds])], elemRows));
  /* long "label = result" rows are split at the last "=" so they fit the 340px side panel */
  const hRows = c.height.flatMap((tex, i) => {
    const col = i === c.height.length - 1 ? 'cp' : 'ink', cut = tex.lastIndexOf('=');
    if (Array.isArray(tex)) return tex.map((t, j) => R('side', T('h' + i + String.fromCharCode(97 + j), t, col)));
    return tex.length > 28 && cut > 0 ? [R('side', T('h' + i + 'a', tex.slice(0, cut), col)), R('side', T('h' + i + 'b', tex.slice(cut), col))] : [R('side', T('h' + i, tex, col))];
  });
  steps.push(S(2, c.heightSay, [plot([...all, ...stripIds])], [...elemRows, ...hRows]));
  const ints = Array.isArray(c.integral) ? c.integral : [c.integral];
  const I = ints.map((tex, i) => R('big', T(i ? 'I' + i : 'I', tex, 'ink')));
  steps.push(S(2, c.integralSay, I, [eyebrow('eb4', 'Region'), sideP([...all])]));
  /* ---------- Phase 3: evaluate ---------- */
  let lines = [];
  (c.evalSteps || []).forEach((st, i) => {
    if (st.fresh) lines = [];
    st.rows.forEach((tex, j) => lines.push(R('line', T(`ev${i}_${j}`, tex, 'ink', st.boxed && j === st.rows.length - 1 ? { cls: 'boxed' } : {}))));
    steps.push(S(3, st.say, st.main || [...I, ...lines], st.side || [eyebrow('eb4', 'Region'), sideP([...all])]));
  });
  return {
    n: c.n, label: c.label || ('Problem ' + c.n), type: c.type || 'Area between curves', verb: c.verb || 'Find', problem: c.problem, phases: c.phases || ['Sketch', 'Set up', 'Evaluate'],
    track: c.track, verify: c.verify, steps,
    heli: c.heli || [
      [{ plot: spec, show: [...sk, ...ptIds, 'region'] }, ...(c.heli1 || [])],
      [ln(dA, 'cp'), ...(c.heli2 || []), ...ints.map(t => ln(t, 'ink'))],
      [...(c.heli3 || []), bx(c.answer)]]
  };
}
