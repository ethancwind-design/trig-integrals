/* Generator for the Quiz 4 practice lessons that are mostly algebra: a persistent integral on top, derivation lines that
   pile up beneath it, and a side panel (recipe rows, a reference triangle, or a graph with the area shaded).
   Everything problem-specific, every caption included, comes in through the config.                                   */
const hashS = s => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };

function flowGen(c) {
  let spec = null;
  if (c.fig) {
    const f = c.fig, P = PlotKit({ w: f.w || 640, h: f.h || 430, xr: f.xr, yr: f.yr, pad: f.pad });
    P.axes('axes', { xt: f.xt, yt: f.yt });
    (f.curves || []).forEach((cv, i) => P.curve('c' + i, cv.f, cv.dom, cv.color || 'cx', { label: cv.at, text: cv.text, dx: cv.dx, dy: cv.dy, n: cv.n || 300 }));
    if (f.area) P.fill('area', f.area.top, f.area.bot || (() => 0), f.area.range, f.area.color || 'cr', { opacity: .28, n: 300 });
    if (f.area2) P.fill('area2', f.area2.top, f.area2.bot, f.area2.range, f.area2.color || 'ca', { opacity: .28, n: 300 });
    (f.points || []).forEach((p, i) => P.dot('pt' + i, p.x, p.y, p.color || 'ca', { text: p.text, dx: p.dx, dy: p.dy, anchor: p.anchor }));
    if (f.extra) f.extra(P);
    spec = P.spec('flow' + c.n);
  }
  const sideRows = st => {
    const rows = [];
    if (st.eb) rows.push(eyebrow('eb' + hashS(st.eb), st.eb));
    (st.side || []).forEach(it => {
      if (typeof it === 'string') rows.push(R('side', T('s' + hashS(it), it)));
      else if (Array.isArray(it)) { const [tex, col, boxed] = it; rows.push(R('side', T('s' + hashS(tex), tex, col || 'ink', boxed ? { cls: 'boxed' } : {}))); }
      else rows.push(it.items ? it : R('side', it));
    });
    if (st.fig && spec) rows.push(R('side', PLOT('fig', spec, st.fig, { size: 'sm' })));
    return rows;
  };
  let top = c.top || c.problem, lines = [];
  const steps = c.steps.map(st => {
    if (st.top) top = st.top;
    if (st.clear) lines = [];
    if (st.rep) lines[lines.length - 1] = st.rep;
    (st.lines || []).forEach(t => lines.push(t));
    /* the board is 442px tall: keep the four newest lines and shrink the type once three are showing */
    const first = Math.max(0, lines.length - 4), vis = lines.slice(first), small = vis.length >= 3;
    const main = [R(small ? 'big sm' : 'big', T('top', top))];
    vis.forEach((t, j) => {
      const o = typeof t === 'string' ? { t } : t;
      main.push(R(small ? 'line sm' : 'line', T('l' + (first + j), o.t, o.c || 'ink', o.box ? { cls: 'boxed' } : {})));
    });
    if (st.figMain && spec) return S(st.p, st.say, [R('plotrow', PLOT('fig', spec, st.fig, { size: 'md' }))], sideRows({ ...st, fig: null }));
    return S(st.p, st.say, main, sideRows(st));
  });
  const hl = a => a.map(x => typeof x === 'string' ? ln(x) : ln(x[0], x[1] || 'ink'));
  const h = c.heli;
  return {
    n: c.n, label: c.label || ('Problem ' + c.n), type: c.type, verb: c.verb || 'Evaluate', problem: c.problem, phases: c.phases || ['Rewrite', 'Integrate', 'Evaluate'],
    track: c.track, verify: c.verify, steps,
    heli: [hl(h[0]), hl(h[1]), [...hl(h[2].slice(0, -1)), bx(h[2][h[2].length - 1])]]
  };
}

/* graph of an integrand with the signed area under it shaded, shared by the definite-integral lessons */
function areaFig(f, a, b, o = {}) {
  return { xr: o.xr, yr: o.yr, xt: o.xt, yt: o.yt, w: o.w, h: o.h,
    curves: [{ f, dom: [a, b], color: 'cx', text: o.text, at: o.at, dx: o.dx, dy: o.dy }],
    area: { top: x => Math.max(f(x), 0), bot: () => 0, range: [a, b] },
    area2: o.neg ? { top: () => 0, bot: x => Math.min(f(x), 0), range: [a, b] } : null,
    points: o.points, extra: o.extra };
}
