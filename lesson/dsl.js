/* Content DSL for the "in Motion" lessons (same vocabulary as motion.html) + plot and diagram builders.
   A deck file calls  LESSON({ ... })  at the end; engine.js picks it up.                                  */
const r = String.raw;
const T = (k, tex, c = 'ink', o = {}) => ({ k, tex, c, ...o });
const H = (k, html, c = 'muted', o = {}) => ({ k, html, c, ...o });
const G = (k, tex) => T(k, tex, 'ghost');
const EQ = k => T(k, '=');
const R = (cls, ...items) => ({ cls, items });
const F = (k, num, den) => ({ k, frac: { num, den } });
const ST = (...lines) => ({ stack: lines });
const TRI = (k, spec, o = {}) => ({ k, tri: spec, ...o });
const RICH = (k, html, o = {}) => ({ k, rich: html, c: 'ink', ...o });
const side = (t, c) => ({ tex: t, c });
const triI = (x, a, rad, show) => ({ opp: side(x, 'cx'), hyp: side(a, 'ca'), adj: side(rad, 'cr'), show });
const triII = (x, a, rad, show) => ({ opp: side(x, 'cx'), adj: side(a, 'ca'), hyp: side(rad, 'cr'), show });
const triIII = (x, a, rad, show) => ({ hyp: side(x, 'cx'), adj: side(a, 'ca'), opp: side(rad, 'cr'), show });
const S = (phase, say, main, sideRows = [], o = {}) => ({ phase, say, main, side: sideRows, ...o });
const ALL = ['opp', 'adj', 'hyp'];
const ln = (t, c = 'ink', o = {}) => ({ t, c, o });
const bx = t => ln(t, 'ink', { cls: 'boxed' });
const eyebrow = (k, text) => R('eyebrow', H(k, text));

/* ───────────── plots ───────────── */
/* PlotKit builds a set of named SVG layers in data coordinates; a PLOT token then shows any subset of them,
   so the same graph keeps its place (and magic-moves) from slide to slide while layers fade/draw in.        */
function PlotKit(o) {
  const w = o.w || 640, h = o.h || 420, pad = Object.assign({ l: 46, r: 20, t: 18, b: 36 }, o.pad || {});
  const [xa, xb] = o.xr, [ya, yb] = o.yr;
  const X = x => pad.l + (x - xa) / (xb - xa) * (w - pad.l - pad.r);
  const Y = y => h - pad.b - (y - ya) / (yb - ya) * (h - pad.t - pad.b);
  const layers = []; const col = c => (c && c[0] !== '#' && c !== 'none') ? `var(--${c})` : (c || 'none');
  const add = (id, svg, cls = '') => { layers.push({ id, svg, cls }); return P; };
  const f2 = v => (+v).toFixed(1);
  const P = {
    w, h, X, Y, layers,
    axes(id = 'axes', a = {}) {
      const xt = a.xt || [], yt = a.yt || [], ax = Math.min(Math.max(0, ya), yb), ay = Math.min(Math.max(0, xa), xb);
      let s = `<line class="axln" x1="${f2(X(xa))}" x2="${f2(X(xb))}" y1="${f2(Y(ax))}" y2="${f2(Y(ax))}"/><line class="axln" x1="${f2(X(ay))}" x2="${f2(X(ay))}" y1="${f2(Y(ya))}" y2="${f2(Y(yb))}"/>`;
      s += `<text class="axt" x="${f2(X(xb) + 4)}" y="${f2(Y(ax) + 5)}">${a.xl || 'x'}</text><text class="axt" x="${f2(X(ay))}" y="${f2(Y(yb) - 6)}" text-anchor="middle">${a.yl || 'y'}</text>`;
      xt.forEach(t => { const v = Array.isArray(t) ? t[0] : t, lab = Array.isArray(t) ? t[1] : String(t).replace('-', '−'); if (v === 0) return; s += `<line class="tk" x1="${f2(X(v))}" x2="${f2(X(v))}" y1="${f2(Y(ax) - 4)}" y2="${f2(Y(ax) + 4)}"/><text class="axt" x="${f2(X(v))}" y="${f2(Y(ax) + 20)}" text-anchor="middle">${lab}</text>`; });
      yt.forEach(t => { const v = Array.isArray(t) ? t[0] : t, lab = Array.isArray(t) ? t[1] : String(t).replace('-', '−'); if (v === 0) return; s += `<line class="tk" y1="${f2(Y(v))}" y2="${f2(Y(v))}" x1="${f2(X(ay) - 4)}" x2="${f2(X(ay) + 4)}"/><text class="axt" x="${f2(X(ay) - 8)}" y="${f2(Y(v) + 5)}" text-anchor="end">${lab}</text>`; });
      return add(id, s);
    },
    curve(id, f, [a, b], c, op = {}) {
      const n = op.n || 160; let d = '', pen = false;
      for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); if (!isFinite(y) || y < ya - (yb - ya) * 0.02 || y > yb + (yb - ya) * 0.02) { pen = false; continue; } d += (pen ? 'L' : 'M') + f2(X(x)) + ' ' + f2(Y(y)); pen = true; }
      let s = `<path class="cv" pathLength="1" d="${d}" style="stroke:${col(c)};stroke-width:${op.width || 3.5};${op.dash ? 'stroke-dasharray:' + op.dash : ''}"/>`;
      if (op.label) s += `<text class="lbl" x="${f2(X(op.label[0]) + (op.dx || 6))}" y="${f2(Y(op.label[1]) + (op.dy || -8))}" style="fill:${col(c)}">${op.text || ''}</text>`;
      return add(id, s, op.dash ? '' : 'draw');
    },
    curveY(id, g, [c0, c1], c, op = {}) {  // x as a function of y
      const n = op.n || 160; let d = '', pen = false;
      for (let i = 0; i <= n; i++) { const y = c0 + (c1 - c0) * i / n, x = g(y); if (!isFinite(x) || x < xa - (xb - xa) * 0.02 || x > xb + (xb - xa) * 0.02) { pen = false; continue; } d += (pen ? 'L' : 'M') + f2(X(x)) + ' ' + f2(Y(y)); pen = true; }
      let s = `<path class="cv" pathLength="1" d="${d}" style="stroke:${col(c)};stroke-width:${op.width || 3.5};${op.dash ? 'stroke-dasharray:' + op.dash : ''}"/>`;
      if (op.label) s += `<text class="lbl" x="${f2(X(op.label[0]) + (op.dx || 6))}" y="${f2(Y(op.label[1]) + (op.dy || -8))}" style="fill:${col(c)}">${op.text || ''}</text>`;
      return add(id, s, op.dash ? '' : 'draw');
    },
    fill(id, top, bot, [a, b], c, op = {}) {  // region between y=bot(x) and y=top(x)
      const n = op.n || 120; let up = '', dn = '';
      for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; up += (i ? 'L' : 'M') + f2(X(x)) + ' ' + f2(Y(top(x))); }
      for (let i = n; i >= 0; i--) { const x = a + (b - a) * i / n; dn += 'L' + f2(X(x)) + ' ' + f2(Y(bot(x))); }
      return add(id, `<path d="${up}${dn}Z" style="fill:${col(c)};opacity:${op.opacity || .2};stroke:none"/>`);
    },
    fillY(id, right, left, [c0, c1], c, op = {}) {  // region between x=left(y) and x=right(y)
      const n = op.n || 120; let up = '', dn = '';
      for (let i = 0; i <= n; i++) { const y = c0 + (c1 - c0) * i / n; up += (i ? 'L' : 'M') + f2(X(right(y))) + ' ' + f2(Y(y)); }
      for (let i = n; i >= 0; i--) { const y = c0 + (c1 - c0) * i / n; dn += 'L' + f2(X(left(y))) + ' ' + f2(Y(y)); }
      return add(id, `<path d="${up}${dn}Z" style="fill:${col(c)};opacity:${op.opacity || .2};stroke:none"/>`);
    },
    line(id, x1, y1, x2, y2, c, op = {}) {
      return add(id, `<line x1="${f2(X(x1))}" y1="${f2(Y(y1))}" x2="${f2(X(x2))}" y2="${f2(Y(y2))}" style="stroke:${col(c)};stroke-width:${op.width || 3};${op.dash ? 'stroke-dasharray:' + op.dash : ''}"/>` + (op.text ? `<text class="lbl" x="${f2(X(op.at ? op.at[0] : x2) + (op.dx || 6))}" y="${f2(Y(op.at ? op.at[1] : y2) + (op.dy || -6))}" style="fill:${col(c)}">${op.text}</text>` : ''));
    },
    rect(id, x0, y0, x1, y1, c, op = {}) {
      const x = Math.min(X(x0), X(x1)), y = Math.min(Y(y0), Y(y1)), ww = Math.abs(X(x1) - X(x0)), hh = Math.abs(Y(y1) - Y(y0));
      return add(id, `<rect x="${f2(x)}" y="${f2(y)}" width="${Math.max(ww, op.minW || 0).toFixed(1)}" height="${Math.max(hh, op.minH || 0).toFixed(1)}" style="fill:${col(op.fill || c)};opacity:${op.opacity == null ? .55 : op.opacity};stroke:${col(c)};stroke-width:${op.sw == null ? 1.5 : op.sw};${op.dash ? 'stroke-dasharray:' + op.dash : ''}"/>`);
    },
    dot(id, x, y, c, op = {}) {
      return add(id, `<circle cx="${f2(X(x))}" cy="${f2(Y(y))}" r="${op.r || 6}" style="fill:${col(c)};stroke:var(--paper);stroke-width:2"/>` + (op.text ? `<text class="lbl" x="${f2(X(x) + (op.dx == null ? 10 : op.dx))}" y="${f2(Y(y) + (op.dy == null ? -10 : op.dy))}" style="fill:${col(c)}" ${op.anchor ? `text-anchor="${op.anchor}"` : ''}>${op.text}</text>` : ''));
    },
    text(id, x, y, str, c, op = {}) {
      return add(id, `<text class="lbl" x="${f2(X(x))}" y="${f2(Y(y))}" style="fill:${col(c)};${op.size ? 'font-size:' + op.size + 'px;' : ''}" text-anchor="${op.anchor || 'start'}">${str}</text>`);
    },
    arrow(id, x1, y1, x2, y2, c, op = {}) {
      const ax = X(x1), ay = Y(y1), bx2 = X(x2), by = Y(y2), ang = Math.atan2(by - ay, bx2 - ax), L = 11;
      const p = (a) => `${f2(bx2 - L * Math.cos(ang + a))} ${f2(by - L * Math.sin(ang + a))}`;
      return add(id, `<path d="M${f2(ax)} ${f2(ay)}L${f2(bx2)} ${f2(by)}M${p(.45)}L${f2(bx2)} ${f2(by)}L${p(-.45)}" style="stroke:${col(c)};stroke-width:${op.width || 3};fill:none;stroke-linecap:round;stroke-linejoin:round"/>` + (op.text ? `<text class="lbl" x="${f2((ax + bx2) / 2 + (op.dx || 8))}" y="${f2((ay + by) / 2 + (op.dy || -8))}" style="fill:${col(c)}">${op.text}</text>` : ''));
    },
    circle(id, cx, cy, rr, c, op = {}) {
      const rx = rr * (X(1) - X(0));
      return add(id, `<circle ${op.fill ? '' : 'class="cv" pathLength="1"'} cx="${f2(X(cx))}" cy="${f2(Y(cy))}" r="${rx.toFixed(1)}" style="${op.fill ? 'fill:' + col(op.fill) + ';opacity:' + (op.opacity || .15) + ';' : ''}stroke:${col(c)};stroke-width:${op.width || 3.5};${op.dash ? 'stroke-dasharray:' + op.dash : ''}"/>`, op.fill ? '' : 'draw');
    },
    arc(id, cx, cy, rr, a0, a1, c, op = {}) {  // angles in radians, counter-clockwise, radius in x-scale units
      const rx = rr * (X(1) - X(0)), n = 40; let d = '';
      for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; d += (i ? 'L' : 'M') + f2(X(cx) + rx * Math.cos(a)) + ' ' + f2(Y(cy) - rx * Math.sin(a)); }
      return add(id, `<path class="cv" pathLength="1" d="${d}" style="stroke:${col(c)};stroke-width:${op.width || 2.5};fill:none"/>` + (op.text ? `<text class="lbl" x="${f2(X(cx) + (rx + (op.tdx || 12)) * Math.cos((a0 + a1) / 2))}" y="${f2(Y(cy) - (rx + (op.tdy || 8)) * Math.sin((a0 + a1) / 2) + 5)}" style="fill:${col(c)}">${op.text}</text>` : ''), 'draw');
    },
    raw(id, svg, cls = '') { return add(id, svg, cls); },
    spec(id) { return { id: id || 'plot' + Math.random().toString(36).slice(2, 7), w, h, layers: layers.map(l => ({ id: l.id, svg: l.svg, cls: l.cls })) }; }
  };
  return P;
}
/* a PLOT token: show = layer ids to display; size 'lg' | 'md' | 'sm' */
const PLOT = (k, spec, show = [], o = {}) => ({ k, plot: spec, show, size: o.size || 'md', c: 'ink', ...o });

/* ───────────── helpers used by every deck ───────────── */
const LESSONS = [];
function LESSON(def) { window.LESSON_DEF = def; }

/* numeric self-check used by check.js (never runs in the browser) */
function approx(a, b, tol = 1e-6) { return Math.abs(a - b) <= tol * (1 + Math.abs(a) + Math.abs(b)); }
function integ(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
