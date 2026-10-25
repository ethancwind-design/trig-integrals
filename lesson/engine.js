/* Engine for the "in Motion" lessons. Same stage, tokens and magic-move as motion.html, generalised:
   examples carry their own label, phases and helicopter view; plots and diagrams are first-class tokens.
   A deck file sets window.LESSON_DEF = { key, intro:[…], examples:[…], outro:[…] } (see dsl.js).            */
(() => {
const DEF = window.LESSON_DEF;
const examples = DEF.examples, intro = DEF.intro || [], outro = DEF.outro || [];

/* ---------- helicopter view (final slide of each example) ---------- */
examples.forEach(e => {
  if (!e.heli) return;
  const cols = e.heli.map((lines, ci) => ST([H('hv' + ci, `Phase ${ci + 1} · ${e.phases[ci]}`, 'muted', { cls: 'eyebrow' })],
    ...lines.map((l, li) => [l.tri ? TRI('hvt' + ci + li, { ...l.tri, sm: true }) : l.plot ? PLOT('hvp' + ci + li, l.plot, l.show, { size: 'xs' }) : T('hv' + ci + '-' + li, l.t, l.c, l.o)])));
  e.steps.push(S(4, DEF.heliSay || r`The helicopter view: every step of the problem, phase by phase. [[cx:Setup]], [[cd:differentials]] and [[cr:results]] keep their colors throughout.`, [R('sum', ...cols)], [], { layout: 'full' }));
});

/* ---------- flatten ---------- */
function prefixItems(items, pre) {
  return items.map(it => {
    if (it.frac) return { ...it, k: pre + it.k, frac: { num: prefixItems(it.frac.num, pre), den: prefixItems(it.frac.den, pre) } };
    if (it.stack) return { ...it, stack: it.stack.map(l => prefixItems(l, pre)) };
    return { ...it, k: pre + it.k, from: it.from ? pre + it.from : undefined };
  });
}
const prefixRows = (rows, pre) => rows.map(r => ({ ...r, items: prefixItems(r.items, pre) }));
const slides = [], sections = [];
intro.forEach(s => { sections.push({ label: s.label, start: slides.length }); slides.push({ ...s, main: prefixRows(s.main, s.id + ':'), side: prefixRows(s.side || [], s.id + ':'), ex: null }); });
examples.forEach(e => {
  sections.push({ label: `${e.label} · ${e.type}`, start: slides.length, n: e.n });
  const pre = 'e' + e.n + ':';
  e.steps.forEach((s, i) => slides.push({ ...s, main: prefixRows(s.main, pre), side: prefixRows(s.side || [], pre), ex: e, stepNo: i + 1, stepCount: e.steps.length }));
});
outro.forEach((s, i) => { if (s.label) sections.push({ label: s.label, start: slides.length }); slides.push({ ...s, main: prefixRows(s.main, 'o' + i + ':'), side: prefixRows(s.side || [], 'o' + i + ':'), ex: null }); });

/* ---------- rendering ---------- */
const $ = s => document.querySelector(s);
const stage = $('#stage'), board = $('#board'), fx = $('#fx'), wrap = $('#wrap');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const D = reduced ? 0 : 780, EASE = 'cubic-bezier(.62,0,.32,1)';
let scale = 1, cur = -1, running = [];
const STORE = 'lesson-' + (DEF.key || 'x');

function fit() {
  const v = $('#viewport').getBoundingClientRect();
  scale = Math.min(v.width / 1280, v.height / 720);
  stage.style.transform = `translate(-50%,-50%) scale(${scale})`;
}
const texCache = new Map();
function texNode(tex) {
  let n = texCache.get(tex);
  if (!n) { n = MathJax.tex2svg(tex, { display: false }); texCache.set(tex, n); }
  return n.cloneNode(true);
}
function mathSpan(tex) {
  const m = document.createElement('span'); m.className = 'm';
  const node = texNode(tex); m.appendChild(node);
  const svg = node.querySelector('svg');
  if (svg) {
    const H = parseFloat(svg.getAttribute('height')) || 0;
    const va = parseFloat((svg.style.verticalAlign || '0').replace('ex', '')) || 0;
    const below = -va + 0.566, above = H - below, diff = above - below;
    if (diff > 0) m.style.paddingBottom = diff + 'ex'; else m.style.paddingTop = (-diff) + 'ex';
  }
  return m;
}
function sigOf(t) {
  if (t.bar) return 'bar';
  if (t.tri) { const s = t.tri; return 'tri|' + [s.opp.tex, s.adj.tex, s.hyp.tex, s.sm ? 's' : '', s.angle || ''].join('|'); }
  if (t.plot) return 'plot|' + t.plot.id;
  if (t.rich != null) return 'r:' + t.rich + '|' + (t.cls || '');
  return (t.html != null ? 'h:' + t.html : 't:' + t.tex) + '|' + t.c + '|' + (t.cls || '');
}
function buildTri(spec) {
  const w = document.createElement('div'); w.className = 'tri' + (spec.sm ? ' sm' : '');
  w.innerHTML = `<svg viewBox="0 0 320 222" aria-hidden="true">
    <path class="side-l s-adj" pathLength="1" d="M40 186 L222 186"/>
    <path class="side-l s-opp" pathLength="1" d="M222 186 L222 54"/>
    <path class="side-l s-hyp" pathLength="1" d="M40 186 L222 54"/>
    <path class="ra" d="M208 186 V172 H222"/>
    <path class="arc" d="M74 186 A34 34 0 0 0 67.5 166"/></svg>`;
  const th = document.createElement('span'); th.className = 'th'; th.appendChild(mathSpan(spec.angle || r`\theta`)); w.appendChild(th);
  ['adj', 'opp', 'hyp'].forEach(s => {
    const l = document.createElement('span'); l.className = 'lbl l-' + s + ' c-' + spec[s].c; l.dataset.s = s;
    const role = document.createElement('span'); role.className = 'role'; role.textContent = s;
    const val = document.createElement('span'); val.className = 'val'; val.appendChild(mathSpan(spec[s].tex));
    l.append(role, val); w.appendChild(l);
  });
  w._spec = spec; return w;
}
function applyTri(w, spec) {
  ['adj', 'opp', 'hyp'].forEach(s => {
    const on = (spec.show || []).includes(s);
    w.querySelector('.l-' + s).classList.toggle('on', on);
    w.querySelector('.s-' + s).style.stroke = on ? `var(--${spec[s].c})` : '';
  });
}
function buildPlot(t) {
  const w = document.createElement('div'); w.className = 'plotw pl-' + (t.size || 'md');
  let inner = ''; t.plot.layers.forEach(l => { inner += `<g class="pl ${l.cls || ''}" data-id="${l.id}">${l.svg}</g>`; });
  w.innerHTML = `<svg class="plot" viewBox="0 0 ${t.plot.w} ${t.plot.h}" role="img" aria-hidden="true">${inner}</svg>`;
  return w;
}
function applyPlot(w, t) {
  w.className = 'plotw pl-' + (t.size || 'md');
  const show = t.show || [];
  w.querySelectorAll('.pl').forEach(g => g.classList.toggle('on', show.includes(g.dataset.id)));
}
function makeTok(t) {
  const el = document.createElement('span');
  el.className = 'tok' + (t.c ? ' c-' + t.c : '') + (t.cls ? ' ' + t.cls : '') + (t.bar ? ' bar' : '');
  el.dataset.k = t.k; el.dataset.sig = sigOf(t); if (t.from) el.dataset.from = t.from;
  if (t.tri) { const w = buildTri(t.tri); el.appendChild(w); el._tri = t.tri; }
  else if (t.plot) { el.appendChild(buildPlot(t)); el._plot = t; }
  else if (t.bar) { }
  else if (t.rich != null) { el.innerHTML = sayHTML(t.rich); }
  else if (t.html != null) { el.innerHTML = t.html; }
  else el.appendChild(mathSpan(t.tex));
  return el;
}
function buildItem(it, make) {
  if (it.frac) {
    const f = document.createElement('span'); f.className = 'frac';
    const n = document.createElement('span'); n.className = 'num';
    const d = document.createElement('span'); d.className = 'den';
    it.frac.num.forEach(x => n.appendChild(buildItem(x, make)));
    it.frac.den.forEach(x => d.appendChild(buildItem(x, make)));
    f.append(n, make({ k: it.k + '~bar', bar: true }), d); return f;
  }
  if (it.stack) {
    const s = document.createElement('span'); s.className = 'stack';
    it.stack.forEach(line => { const l = document.createElement('span'); l.className = 'sline'; line.forEach(x => l.appendChild(buildItem(x, make))); s.appendChild(l); });
    return s;
  }
  return make(it);
}
function buildRegion(rows, make, id) {
  const reg = document.createElement('div'); reg.id = id;
  rows.forEach(rw => { const row = document.createElement('div'); row.className = 'row ' + rw.cls; rw.items.forEach(it => row.appendChild(buildItem(it, make))); reg.appendChild(row); });
  return reg;
}
function rel(el) {
  const a = el.getBoundingClientRect(), w = wrap.getBoundingClientRect();
  return { x: (a.left - w.left) / scale, y: (a.top - w.top) / scale, w: a.width / scale, h: a.height / scale };
}
function anim(el, frames, opts) { const a = el.animate(frames, { fill: 'backwards', ...opts }); running.push(a); return a; }
function finishAll() {
  running.forEach(a => { try { a.finish() } catch (e) { } }); running = [];
  fx.replaceChildren();
}
function sayHTML(text) {
  return text.split('$').map((part, i) => {
    if (i % 2) { const m = texNode(part); return m.outerHTML; }
    return part.replace(/\[\[(\w+):(.*?)\]\]/g, (m, c, inner) => `<span class="c-${c}" style="font-weight:700">${inner}</span>`);
  }).join('').replace(/\[\[(\w+):/g, '<span class="c-$1" style="font-weight:700">').replace(/\]\]/g, '</span>');
}
function renderSay(s) {
  const say = $('#say');
  const tag = s.ex ? (s.phase === 4 ? 'Summary' : `Phase ${s.phase}`) : (s.tag || '');
  say.innerHTML = `<span class="tag">${tag}</span><span class="txt fadein">${sayHTML(s.say || '')}</span>`;
}
function renderHead(s, prev) {
  const ex = $('#exlabel');
  const key = s.ex ? 'ex' + s.ex.n : s.id;
  if (!prev || ex.dataset.key !== key) {
    ex.dataset.key = key;
    if (s.ex) ex.innerHTML = `<span class="eb">${s.ex.label} · ${s.ex.type}</span>`;
    else ex.innerHTML = `<span class="eb">${s.head.eb}</span>`;
    ex.classList.remove('fadein'); void ex.offsetWidth; ex.classList.add('fadein');
  }
  const ph = $('#phases'); ph.hidden = !s.ex;
  if (s.ex && ph.dataset.ex !== String(s.ex.n)) {
    ph.dataset.ex = s.ex.n;
    ph.innerHTML = s.ex.phases.map((l, i) => `<div class="ph" data-p="${i + 1}"><b>${i + 1}</b>${l}</div>`).join('');
  }
  ph.querySelectorAll('.ph').forEach(p => { const n = +p.dataset.p; p.classList.toggle('on', n === s.phase); p.classList.toggle('done', !!s.ex && n < s.phase); });
  renderTrack(s);
}
function renderTrack(s) {
  const tr = $('#track');
  if (!s.ex || !s.ex.track) { tr.hidden = true; tr.dataset.key = ''; return; }
  tr.hidden = false;
  const e = s.ex, nx = slides[cur + 1];
  const endP1 = s.phase === 1 && (!nx || nx.ex !== e || nx.phase !== 1);
  const vis = [s.phase >= 2 || endP1, s.phase >= 3, s.stepNo >= s.stepCount - 1];
  const key = e.n + ':' + vis.map(Number).join('');
  if (tr.dataset.key === key) return;
  const old = tr.dataset.key || '', same = old.split(':')[0] === String(e.n), oldVis = same ? old.split(':')[1] : '';
  tr.dataset.key = key;
  const tin = document.createElement('div'); tin.className = 'tin';
  const lab = document.createElement('span'); lab.className = 'lab'; lab.textContent = e.verb || 'Find';
  const prob = document.createElement('span'); prob.appendChild(e.problemHtml ? Object.assign(document.createElement('span'), { innerHTML: sayHTML(e.problemHtml) }) : texNode(e.problem));
  if (!same) { lab.classList.add('fadein'); prob.classList.add('fadein'); }
  tin.append(lab, prob);
  e.track.forEach((tex, i) => {
    if (!vis[i]) return;
    const ms = document.createElement('span'); ms.className = 'ms' + (i === 2 ? ' ans' : '');
    ms.innerHTML = `<span>=</span><span class="badge" title="${i === 2 ? 'Answer' : 'After Phase ' + (i + 1)}">${i === 2 ? '✓' : i + 1}</span>`;
    ms.appendChild(texNode(tex));
    if (oldVis[i] !== '1') ms.classList.add('fadein');
    tin.appendChild(ms);
  });
  tr.replaceChildren(tin);
  const avail = tr.clientWidth - 40, w = tin.scrollWidth;
  if (w > avail) tin.style.transform = `scale(${avail / w})`;
}

function go(i, animate = true) {
  if (i < 0 || i >= slides.length) return;
  finishAll();
  const s = slides[i], prev = cur >= 0 ? slides[cur] : null; cur = i;
  renderHead(s, prev); renderSay(s);
  const old = new Map();
  board.querySelectorAll('.tok').forEach(el => old.set(el.dataset.k, { el, r: rel(el), fs: getComputedStyle(el).fontSize }));
  const reuse = new Set(), triNew = [], plotNew = [];
  const make = t => {
    const o = old.get(t.k);
    if (o && o.el.dataset.sig === sigOf(t) && !reuse.has(t.k)) {
      reuse.add(t.k);
      if (t.from) o.el.dataset.from = t.from; else delete o.el.dataset.from;
      if (t.tri) { o.el._tri = t.tri; applyTri(o.el.querySelector('.tri'), t.tri); }
      if (t.plot) { o.el._plot = t; applyPlot(o.el.querySelector('.plotw'), t); }
      return o.el;
    }
    const el = makeTok(t); if (t.tri) triNew.push(el); if (t.plot) plotNew.push(el); return el;
  };
  const mainEl = buildRegion(s.main, make, 'main'), sideEl = buildRegion(s.side || [], make, 'side');
  board.className = s.layout === 'full' ? 'full' : '';
  board.replaceChildren(mainEl, sideEl);
  try { localStorage.setItem(STORE, String(i)); } catch (e) { }
  updateBar();
  const doAnim = animate && D > 0;
  triNew.forEach(el => {
    const w = el.querySelector('.tri');
    if (doAnim) { w.classList.add('drawing'); const t = setTimeout(() => applyTri(w, el._tri), 850); running.push({ finish() { clearTimeout(t); applyTri(w, el._tri); w.classList.remove('drawing'); } }); }
    else applyTri(w, el._tri);
  });
  plotNew.forEach(el => {
    const w = el.querySelector('.plotw');
    if (doAnim) requestAnimationFrame(() => requestAnimationFrame(() => applyPlot(w, el._plot)));
    else applyPlot(w, el._plot);
  });
  if (!doAnim) return;

  const seen = new Map();
  board.querySelectorAll('.tok').forEach(el => {
    const k = el.dataset.k; const nr = rel(el); seen.set(k, { el, nr });
    if (reuse.has(k)) {
      const o = old.get(k).r;
      const dx = o.x - nr.x, dy = o.y - nr.y, sx = nr.w ? o.w / nr.w : 1, sy = nr.h ? o.h / nr.h : 1;
      if (Math.abs(dx) < .5 && Math.abs(dy) < .5 && Math.abs(sx - 1) < .01 && Math.abs(sy - 1) < .01) return;
      el.style.transformOrigin = '0 0';
      const a = anim(el, [{ transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})` }, { transform: 'none' }], { duration: D, easing: EASE });
      a.onfinish = () => { el.style.transformOrigin = ''; };
      return;
    }
    const from = el.dataset.from;
    const src = (from && old.get(from)) || old.get(k);
    if (src) {
      const o = src.r;
      const dx = (o.x + o.w / 2) - (nr.x + nr.w / 2), dy = (o.y + o.h / 2) - (nr.y + nr.h / 2);
      const sc = Math.max(.4, Math.min(2.2, nr.h ? o.h / nr.h : 1));
      el.style.transformOrigin = '50% 50%';
      const a = anim(el, [{ transform: `translate(${dx}px,${dy}px) scale(${sc})`, opacity: 0 }, { opacity: 0, offset: .18 }, { opacity: 1, offset: .7 }, { transform: 'none', opacity: 1 }], { duration: D, easing: EASE });
      a.onfinish = () => { el.style.transformOrigin = ''; };
    } else {
      anim(el, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: D * .5, easing: 'cubic-bezier(.2,.7,.3,1)' });
    }
  });
  old.forEach((o, k) => {
    if (reuse.has(k)) return;
    const el = o.el; el.style.left = o.r.x + 'px'; el.style.top = o.r.y + 'px'; el.style.width = o.r.w + 'px'; el.style.height = o.r.h + 'px';
    el.style.fontSize = o.fs; el.style.transform = ''; fx.appendChild(el);
    const tgt = seen.get(k); const newEl = tgt && tgt.el;
    let a;
    if (tgt && !newEl.dataset.from) {
      const nr = tgt.nr;
      const dx = (nr.x + nr.w / 2) - (o.r.x + o.r.w / 2), dy = (nr.y + nr.h / 2) - (o.r.y + o.r.h / 2);
      const sc = Math.max(.4, Math.min(2.2, o.r.h ? nr.h / o.r.h : 1));
      el.style.transformOrigin = '50% 50%';
      a = anim(el, [{ transform: 'none', opacity: 1 }, { opacity: 0, offset: .55 }, { transform: `translate(${dx}px,${dy}px) scale(${sc})`, opacity: 0 }], { duration: D, easing: EASE, fill: 'forwards' });
    } else {
      a = anim(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' });
    }
    a.onfinish = () => el.remove();
  });
}

/* ---------- controls ---------- */
const jump = $('#jump');
sections.forEach(sec => { const o = document.createElement('option'); o.value = sec.start; o.textContent = sec.label; jump.appendChild(o); });
function updateBar() {
  const s = slides[cur];
  let secIdx = 0; sections.forEach((sec, i) => { if (cur >= sec.start) secIdx = i; });
  jump.value = sections[secIdx].start;
  $('#count').textContent = s.ex ? `Step ${s.stepNo} of ${s.stepCount}` : `${cur + 1} of ${slides.length}`;
  $('#prev').disabled = cur === 0; $('#next').disabled = cur === slides.length - 1;
  document.title = (s.ex ? `${s.ex.label} · ` : '') + (DEF.title || 'Lesson');
}
const next = () => go(cur + 1), prev = () => go(cur - 1);
function sectionIndex() { let k = 0; sections.forEach((sec, i) => { if (cur >= sec.start) k = i; }); return k; }
$('#next').addEventListener('click', next);
$('#prev').addEventListener('click', prev);
jump.addEventListener('change', () => { go(+jump.value); jump.blur(); });
stage.addEventListener('click', next);
$('#fs').addEventListener('click', () => {
  const d = document;
  try { if (d.fullscreenElement) d.exitFullscreen().catch(() => { }); else d.documentElement.requestFullscreen().catch(() => { }); } catch (e) { }
});
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'SELECT') return;
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); next(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
  else if (e.key === 'Home') { go(0); }
  else if (e.key === ']') { const k = sectionIndex() + 1; if (sections[k]) go(sections[k].start); }
  else if (e.key === '[') { const k = sectionIndex(); const t = sections[cur === sections[k].start ? k - 1 : k]; if (t) go(t.start); }
});
addEventListener('resize', fit);
new ResizeObserver(fit).observe($('#viewport'));
fit();
window.__lesson = { slides, sections, go, get cur() { return cur; } };
/* ---------- QA helper: window.__lesson.qa() walks every slide and reports math errors and overflow ---------- */
async function qa() {
  const issues = [];
  for (let i = 0; i < slides.length; i++) {
    go(i, false); await new Promise(r => setTimeout(r, 25));
    const s = slides[i], tag = `#${i} ${s.ex ? s.ex.label + ' step ' + s.stepNo : s.id}`;
    if (stage.querySelector('mjx-merror')) issues.push(tag + ': math error ' + stage.querySelector('mjx-merror').textContent.slice(0, 60));
    const wb = wrap.getBoundingClientRect();
    board.querySelectorAll('.tok').forEach(el => {
      const a = el.getBoundingClientRect();
      if (!a.width) return;
      if (a.left < wb.left - 4 || a.right > wb.right + 4 || a.top < wb.top - 4 || a.bottom > wb.bottom + 4) issues.push(tag + ': token outside board ' + (el.dataset.k || '') + ` (${Math.round((a.left - wb.left) / scale)},${Math.round((a.top - wb.top) / scale)} ${Math.round(a.width / scale)}x${Math.round(a.height / scale)} in ${Math.round(wb.width / scale)}x${Math.round(wb.height / scale)})`);
    });
    ['#main', '#side'].forEach(id => { const e = $(id); if (e && e.scrollHeight > e.clientHeight + 6) issues.push(tag + ': ' + id + ' overflows by ' + (e.scrollHeight - e.clientHeight)); });
    const sy = $('#say .txt'); if (sy && sy.getBoundingClientRect().height / scale > 66) issues.push(tag + ': caption is ' + Math.round(sy.getBoundingClientRect().height / scale) + 'px tall (3+ lines)');
    const tr = $('#track'); if (!tr.hidden && tr.scrollHeight > tr.clientHeight + 4) issues.push(tag + ': track overflows');
    { const sr = stage.getBoundingClientRect(); let wide = 0;
      stage.querySelectorAll('#head *, #say *').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && b.right > sr.right - 8) wide = Math.max(wide, Math.round((b.right - sr.right + 8) / scale)); });
      if (wide) issues.push(tag + ': header/caption runs ' + wide + 'px past the slide edge'); }
  }
  return issues;
}
window.__lesson.qa = qa;


/* ---------- boot ---------- */
function boot() {
  try { document.head.appendChild(MathJax.svgStylesheet()); } catch (e) { }
  $('#loading').remove();
  let start = 0;
  const m = /^#p(\d+)$/.exec(location.hash);
  if (m) { const sec = sections.find(s => s.n === +m[1]); if (sec) start = sec.start; }
  else { try { const v = +localStorage.getItem(STORE); if (v > 0 && v < slides.length) start = v; } catch (e) { } }
  go(start, false);
}
if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
  MathJax.startup.promise.then(() => document.fonts.ready).then(boot).catch(err => { $('#loading').textContent = 'The math renderer failed to load. Reload the page to try again.'; console.error(err); });
} else {
  $('#loading').textContent = 'The math renderer failed to load. Reload the page to try again.';
}
})();
