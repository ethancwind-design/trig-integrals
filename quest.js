/* Trig Quest — loading screen, hub, story lines, daily run, blitz, survival.
   Problems come straight from the verified data (window.TRIG) and the cheat sheets (window.REFSECTIONS). */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const M = t => `\\(\\displaystyle ${esc(t)}\\)`;
const wait = ms => new Promise(r => setTimeout(r, ms));
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };

/* ───────────── random ───────────── */
function mulberry(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function shuffle(arr, rnd = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ───────────── save file ───────────── */
const KEY = 'trigquest.v1';
const blank = () => ({ xp: 0, solved: {}, missions: {}, best: {}, daily: {}, streak: 0, lastDay: '', last: null });
let S = (() => { try { return Object.assign(blank(), JSON.parse(store.get(KEY) || '{}')); } catch (e) { return blank(); } })();
const save = () => store.set(KEY, JSON.stringify(S));
const need = l => 60 + 30 * (l - 1);
function lvl(xp) { let l = 1, x = xp; while (x >= need(l)) { x -= need(l); l++; } return { l, cur: x, need: need(l) }; }
const RANKS = ['Rookie', 'Apprentice', 'Student', 'Calculator', 'Integrator', 'Substitutor', 'Strategist', 'Master', 'Grandmaster', 'Legend'];
const rank = l => RANKS[Math.min(RANKS.length - 1, Math.floor((l - 1) / 2))];
const dayStr = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function touchDay() {
  const t = dayStr(); if (S.lastDay === t) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  S.streak = S.lastDay === dayStr(y) ? S.streak + 1 : 1; S.lastDay = t;
}
const liveStreak = () => { const t = dayStr(), y = new Date(); y.setDate(y.getDate() - 1); return (S.lastDay === t || S.lastDay === dayStr(y)) ? S.streak : 0; };
function addXp(n) {
  if (!n) return;
  const before = lvl(S.xp).l; S.xp += n; const after = lvl(S.xp).l;
  if (after > before) toast(`LEVEL UP! You are now level ${after} · ${rank(after)}`, 'lvlup');
  hudUpdate();
}

/* ───────────── tips ───────────── */
const TIPS = [
  'sin²θ + cos²θ = 1. Every Pythagorean identity is this one in disguise.',
  'Odd power of sin or cos? Peel one factor off and let u be the other function.',
  'tanᵐ secⁿ: n even → u = tan. m odd → u = sec. Both fail → write everything in sec.',
  'Trig substitution: radical → triangle → integrate → come back to x.',
  '√(a²−x²) → x = a sin θ.  √(a²+x²) → x = a tan θ.  √(x²−a²) → x = a sec θ.',
  'Top degree ≥ bottom degree? Long division first, then partial fractions.',
  'LIATE for integration by parts: Logs, Inverse trig, Algebraic, Trig, Exponential.',
  'Solving a trig equation? Factor. Never divide by a trig function: you lose roots.',
  'Washers: π∫(R² − r²). Shells: 2π∫(radius)(height).',
  'cos 2θ = 2cos²θ − 1 = 1 − 2sin²θ. Pick the form that kills what you do not want.',
  'Check any antiderivative by differentiating it. If it comes back, you are done.',
  'Even powers of sin and cos: power-reduce with cos 2θ until nothing is squared.',
  'Odd power of x on top of √(a² − x²)? Plain u-sub. No trig sub needed.',
  'Definite integral + substitution: change the limits and skip the back-substitution.',
  'ln|3x+1| from ∫ 1/(3x+1) dx needs a ⅓. Do not forget the chain rule in reverse.',
  'Gini index: G = 1 − 2∫₀¹ L(x) dx. Higher curve means less inequality.'
];

/* ───────────── building problems ───────────── */
const T = window.TRIG, RS = window.REFSECTIONS || [];
const secById = {}; T.sections.concat(RS).forEach(s => { secById[s.id] = s; });
const METHOD_LABEL = { usub: 'u-substitution', parts: 'by parts', trigsub: 'trig substitution', identity: 'use an identity', reduction: 'reduction formula',
  weierstrass: 't = tan(x/2)', partial: 'partial fractions', 'complete-square': 'complete the square', definite: 'definite integral' };
const BADRX = /\\(text|textbf|iff|Rightarrow|to|int|sum|prod|lim|begin|ldots|cdots|mathbb|binom|approx|xrightarrow|boldsymbol|mathbf)(?![a-zA-Z])|[:<>]|\\(le|ge|ne)(?![a-zA-Z])|\\\\|\\ /;
const nrm = s => s.replace(/\\left|\\right|\\!|\\,|\\;|\s|\\ /g, '');

function statements(tex) {
  return tex.split(/\\qquad|\\quad/).map(x => x.trim().replace(/[,.;]+$/, '').trim()).filter(x => x.includes('=') && x.length < 150 && !BADRX.test(x));
}
function splitEq(st) {
  let depth = 0;
  for (let i = 0; i < st.length; i++) {
    const c = st[i];
    if ('{(['.includes(c)) depth++;
    else if ('})]'.includes(c)) depth--;
    else if (c === '=' && depth === 0) {
      const lhs = st.slice(0, i).trim(), rhs = st.slice(i + 1).trim();
      return lhs && rhs && rhs.length <= 110 ? [lhs, rhs] : null;
    }
  }
  return null;
}
function hintFor(it, g) {
  const bits = [];
  if (it.m && it.m.length) bits.push('Method: ' + it.m.filter(m => METHOD_LABEL[m]).map(m => METHOD_LABEL[m]).join(' + '));
  if (it.t) bits.push(it.t);
  if (it.m && it.m.includes('trigsub') && !/theta/.test(it.t || '')) bits.push(g.t);
  if (!bits.length) bits.push('Topic: ' + g.t);
  return bits.join(' · ');
}
function selfProblem(it, s, g, gi, ii) {
  let q, a;
  if (it.k === 'i') { q = it.tex; a = '= ' + it.r + ' + C'; }
  else if (it.k === 'd') { q = it.tex; a = /^\\text\{/.test(it.r) ? it.r : '= ' + it.r; }
  else if (it.k === 'der') { q = '\\frac{d}{dx}\\left[' + it.tex + '\\right]'; a = '= ' + it.r; }
  else if (it.k === 'q') { q = it.tex; a = it.r; }
  else return null;
  return { id: `${s.id}:${gi}:${ii}`, type: 'self', q, a, hint: hintFor(it, g), m: it.m || [], note: it.note || '', src: it.src || '', group: g.t,
    diff: q.length + a.length * .6 + (it.m && it.m.includes('trigsub') ? 25 : 0) + (it.m && it.m.includes('parts') ? 15 : 0) };
}
function mcProblems(it, s, g, gi, ii) {
  if (it.k !== 'id') return [];
  const out = [];
  statements(it.tex).forEach((st, si) => {
    const sp = splitEq(st); if (!sp) return;
    if (/(?<![a-zA-Z\\])t(?![a-zA-Z])/.test(st)) return;   // t = tan(x/2): the prompt would not say what t is
    out.push({ id: `${s.id}:${gi}:${ii}:${si}`, type: 'mc', lhs: sp[0], rhs: sp[1], q: sp[0] + '\\;=\\;?', a: '= ' + sp[1], hint: 'Topic: ' + g.t, note: '', src: '', group: g.t,
      diff: sp[0].length + sp[1].length * .8 });
  });
  return out;
}
function gather(c) {
  const out = [], seen = new Set();
  c.src.forEach(([secId, sel]) => {
    const s = secById[secId]; if (!s) return;
    s.groups.forEach((g, gi) => {
      if (sel && !sel.some(p => typeof p === 'number' ? p === gi : p instanceof RegExp ? p.test(g.t) : g.t.startsWith(p))) return;
      g.items.forEach((it, ii) => {
        const list = c.mode === 'mc' ? mcProblems(it, s, g, gi, ii) : [selfProblem(it, s, g, gi, ii)].filter(Boolean);
        list.forEach(p => { const key = p.type === 'mc' ? nrm(p.lhs) + '=' + nrm(p.rhs) : p.q + '|' + p.a; if (!seen.has(key)) { seen.add(key); out.push(p); } });
      });
    });
  });
  return out;
}

/* ───────────── story lines ───────────── */
const C = (title, blurb, mode, src, o = {}) => Object.assign({ title, blurb, mode, src }, o);
const ALL = null;
const STORY = [
  { id: 'core', name: 'Identity Core', glyph: 'θ', color: '#5B8CFF', tag: 'Complete the identity',
    blurb: 'Every trig identity you need, from Pythagorean to hyperbolic. Pick the right side of the equation.', chapters: [
    C('Pythagorean & Reciprocal', 'sin² + cos² = 1 and everything it spawns.', 'mc', [['identities', [/^Pythagorean/, /^Reciprocal/]], ['r_defs', [/^Reciprocal/]], ['r_fund', [/^Pythagorean/]]]),
    C('Symmetry & Shifts', 'Even/odd, cofunctions, periodicity, shifts by π and π/2.', 'mc', [['identities', [/^Parity/]], ['r_fund', [/^Even/, /^Periodicity/, /^Shifts/]]]),
    C('Sum & Difference', 'sin(α ± β) and friends.', 'mc', [['identities', [/^Sum & difference/]], ['r_sumdiff', [/^Sum \/ difference/]]]),
    C('Double & Triple Angles', '2θ, 3θ, 4θ, 5θ.', 'mc', [['identities', [/^Double/]], ['r_multi', [/Double angle|Triple angle|Quadruple/]]]),
    C('Half-Angle & Power Reducing', 'Squares and cubes become cos 2θ, cos 4θ.', 'mc', [['identities', [/^Power-reducing/]], ['r_halfpow', ALL]]),
    C('Product ⇄ Sum', 'Turn products into sums and back.', 'mc', [['identities', [/^Product/]], ['r_prodsum', ALL]]),
    C('Inverse & Hyperbolic', 'arcsin, arctan, sinh, cosh and their identities.', 'mc', [['identities', [/^Inverse/, /^Hyperbolic/, /^Weierstrass/]], ['r_inverse', ALL], ['r_hyper', ALL]]),
    C('Exact Values', '15°, 18°, 22.5°, 36°, 54°, 72°, 75°.', 'mc', [['r_circle', ALL]]),
    C('Triangles & Angle Sums', 'Laws, areas, and A + B + C = π.', 'mc', [['r_tri', ALL]]),
    C('Derivative Drills', 'The derivative table: the integrals read backwards.', 'self', [['derivatives', ALL]])
  ] },
  { id: 'trail', name: 'Trig Integral Trail', glyph: '∫', color: '#3DDC97', tag: 'Powers, products, angles',
    blurb: 'From ∫ sin x dx up through tan·sec, products of different angles and rational functions of sin and cos.', chapters: [
    C('The Basics', 'Six trig integrals, linear arguments, u-sub partners.', 'self', [['basic', ALL]]),
    C('Powers of One Function', 'sinⁿ, cosⁿ, tanⁿ, cotⁿ, secⁿ, cscⁿ.', 'self', [['powers', ALL]]),
    C('sin & cos Together', 'Odd/even recipe, quotients and reciprocals.', 'self', [['products', [0, 1]]]),
    C('tan, sec, cot, csc', 'n even → u = tan. m odd → u = sec.', 'self', [['products', [2, 3]]]),
    C('Different Angles', 'sin 3x cos 5x: product-to-sum.', 'self', [['angles', ALL]]),
    C('Rational in sin & cos', '1/(a + b sin x) and the t = tan(x/2) substitution.', 'self', [['rational', ALL]])
  ] },
  { id: 'sub', name: 'Substitution Saga', glyph: '√', color: '#FFB347', tag: 'Trig substitution',
    blurb: 'Replace the radical with a triangle. Three types, completing the square, and higher powers.',
    cutscene: { label: 'Cutscene · Trig Substitution in Motion', href: 'motion.html' }, chapters: [
    C('Type I · √(a² − x²)', 'x = a sin θ, radical becomes a cos θ.', 'self', [['trigsub', [0]]]),
    C('Type II · √(a² + x²)', 'x = a tan θ, radical becomes a sec θ.', 'self', [['trigsub', [1]]]),
    C('Type III · √(x² − a²)', 'x = a sec θ, radical becomes a tan θ.', 'self', [['trigsub', [2]]]),
    C('Complete the Square', 'ax² + bx + c inside a root or a denominator.', 'self', [['trigsub', [3]]]),
    C('Higher Powers (x² ± a²)ⁿ', 'Reduction and the general pattern.', 'self', [['trigsub', [4]]])
  ] },
  { id: 'tech', name: 'Parts & Fractions', glyph: '∑', color: '#FF6FD8', tag: 'By parts · partial fractions',
    blurb: 'Integration by parts in all its forms, inverse trig integrals, and partial fractions from distinct factors to irreducible quadratics.', chapters: [
    C('By Parts · Trig × Polynomial', 'x sin x, x² cos x, tabular method.', 'self', [['parts', [0]]]),
    C('By Parts · Squares & Products', 'x sin²x, x sec²x, and friends.', 'self', [['parts', [1]]]),
    C('By Parts · Exponential × Trig', 'eˣ sin x: go round twice and solve.', 'self', [['parts', [2]]]),
    C('By Parts · Logs, Roots & More', 'ln x, x ln x, compositions.', 'self', [['parts', [3]]]),
    C('Inverse Trig Integrals', 'arcsin x, arctan x, xⁿ arctan x.', 'self', [['inverse', ALL]]),
    C('Partial Fractions I', 'Distinct linear factors.', 'self', [['frac', [0]]]),
    C('Partial Fractions II', 'Repeated factors, quadratics, long division.', 'self', [['frac', [1, 2]]])
  ] },
  { id: 'def', name: 'Definite & Hyperbolic', glyph: 'π', color: '#3CD8E6', tag: 'Wallis · Fourier · sinh',
    blurb: 'Definite and improper integrals worth knowing by heart, then hyperbolic functions.', chapters: [
    C('Over a Period', 'Integrals over 0 to π, 2π and half-periods.', 'self', [['definite', [0]]]),
    C('Wallis & Beta', 'The sinⁿ cosᵐ family over [0, π/2].', 'self', [['definite', [1]]]),
    C('Orthogonality', 'Fourier series integrals.', 'self', [['definite', [2]]]),
    C('Rational over a Period', '1/(a + b cos x) over 0 to 2π.', 'self', [['definite', [3]]]),
    C('Logs of Trig', '∫ ln(sin x) and friends.', 'self', [['definite', [4]]]),
    C('Improper & Oscillatory', 'Dirichlet, Fresnel, and tails.', 'self', [['definite', [5]]]),
    C('Hyperbolic Basics', 'sinh, cosh, tanh integrals.', 'self', [['hyper', [0]]]),
    C('Hyperbolic Powers & Inverses', 'Powers, products, arsinh and arcosh.', 'self', [['hyper', [1, 2]]])
  ] },
  { id: 'area', name: 'Area & Volume', glyph: '▥', color: '#FFD84D', tag: 'Setups that end in integrals',
    blurb: 'Area between curves, the Gini index, disks, washers, shells, cross-sections and arc length. Each answer is the exact value; the note shows the integral.', chapters: [
    C('Area Between Curves', 'Vertical, horizontal and polar slices.', 'self', [['areavol', [0]]]),
    C('Gini Index', 'Lorenz curves and inequality.', 'self', [['areavol', [1]]]),
    C('Volumes of Revolution', 'Disks, washers, shells, cross-sections.', 'self', [['areavol', [2]]]),
    C('Arc Length', '∫ √(1 + y′²) dx.', 'self', [['areavol', [3]]])
  ] },
  { id: 'exam', name: 'MATH 1400 Exam Prep', glyph: '☠', color: '#FF5D6C', tag: 'Your real problems · 3 hearts',
    blurb: 'The actual problems from your prep quizzes, Lecture 23 and recitation. Three hearts per mission: miss three and the mission fails.', chapters: [
    C('Lecture 23 · Substitute, Integrate, Come Back', 'Problems 1–7.', 'self', [['pdf', [0]]], { hearts: 3, noBoss: true }),
    C('Lecture 23 · Compute', 'Problems 8–16.', 'self', [['pdf', [1]]], { hearts: 3, noBoss: true }),
    C('Week 8 · Prep Quiz A', 'sin 2θ, tan·sec, partial fractions.', 'self', [['pdf', [2]]], { hearts: 3, noBoss: true }),
    C('Week 8 · Prep Quiz B', 'Identities, x⁴/√(x²−4), x³/√(9−x²).', 'self', [['pdf', [3]]], { hearts: 3, noBoss: true }),
    C('Week 9 · Prep Quiz', 'Area with trig.', 'self', [['pdf', [4]]], { hearts: 3, noBoss: true }),
    C('Recitation · Worksheet 4', 'Reference triangles, trig sub, Gini, polar area, a disk volume.', 'self', [['recitation']], { hearts: 3, noBoss: true })
  ] }
];

const SLV = { core: '--cx', trail: '--cr', sub: '--cd', tech: '--cp', def: '--ct', area: '--cy', exam: '--ca' };
let ALL_SELF = [], ALL_MC = [], MISSIONS = {}, MISSION_ORDER = [], TOTAL_PROBLEMS = 0;
function buildAll() {
  const selfSeen = new Set(), mcSeen = new Set();
  STORY.forEach(sl => {
    sl.chapters.forEach((c, ci) => {
      c.id = `${sl.id}.${ci}`; c.sl = sl; c.n = ci + 1;
      c.problems = gather(c);
      c.problems.forEach(p => { const pool = p.type === 'mc' ? ALL_MC : ALL_SELF, seen = p.type === 'mc' ? mcSeen : selfSeen; if (!seen.has(p.id)) { seen.add(p.id); pool.push(p); } });
      const P = c.problems, ms = [];
      if (P.length) {
        const chunks = [];
        if (P.length <= 6) chunks.push(P);
        else { for (let i = 0; i < P.length; i += 5) chunks.push(P.slice(i, i + 5)); if (chunks.length > 1 && chunks[chunks.length - 1].length < 3) { const l = chunks.pop(); chunks[chunks.length - 1] = chunks[chunks.length - 1].concat(l); } }
        chunks.forEach((arr, mi) => ms.push({ id: `${c.id}.${mi}`, label: String(mi + 1), problems: arr, hearts: c.hearts || null, boss: false, ch: c, sl }));
        if (P.length >= 10 && !c.noBoss) {
          const rnd = mulberry(hashStr(c.id));
          const hard = P.slice().sort((a, b) => b.diff - a.diff).slice(0, Math.min(14, P.length));
          ms.push({ id: `${c.id}.b`, label: 'BOSS', problems: shuffle(hard, rnd).slice(0, 5), hearts: 3, boss: true, ch: c, sl });
        }
      }
      c.missions = ms; ms.forEach(m => { MISSIONS[m.id] = m; MISSION_ORDER.push(m.id); });
    });
    sl.chapters = sl.chapters.filter(c => c.missions.length);
    sl.problems = new Set(); sl.chapters.forEach(c => c.problems.forEach(p => sl.problems.add(p.id)));
  });
  TOTAL_PROBLEMS = ALL_SELF.length + ALL_MC.length;
  window.TQ = { STORY, ALL_SELF, ALL_MC, MISSIONS };   // handy for poking around in the console
}


/* ───────────── deck engine (the "Trig Substitution in Motion" stage) ───────────── */
const viewport = $('#viewport'), stage = $('#stage'), bar = $('#bar');
const E = { eb: $('#exlabel'), ph: $('#phases'), track: $('#track'), board: $('#board'), main: $('#main'), side: $('#side'), say: $('#say'),
  jump: $('#jump'), count: $('#count'), prev: $('#prev'), next: $('#next') };
let mjReady = false, deck = null, run = null, tick = null;

function fit() {
  const r = viewport.getBoundingClientRect(); if (!r.width) return;
  stage.style.transform = `translate(-50%,-50%) scale(${Math.min(r.width / 1280, r.height / 720)})`;
}
window.addEventListener('resize', fit);
document.addEventListener('fullscreenchange', () => setTimeout(fit, 60));
async function typeset(el) { if (mjReady && el) { try { await MathJax.typesetPromise([el]); } catch (e) { console.error(e); } } }
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const big = t => `<div class="row big">${M(t)}</div>`;
const solq = p => (window.shotUI ? shotUI.solHtml(p.src) : '');   // handwritten solution (recitation only)
const pdfq = p => (window.shotUI ? shotUI.html(p.src, true) : '');   // crop of the problem as printed in the source PDF, when there is one
const boxed = (t, cls = '') => `<span class="boxed ${cls}">${M(t)}</span>`;

function hudUpdate() {
  const L = lvl(S.xp), st = liveStreak();
  $('#hudpill').innerHTML = `${st ? `<span class="fire" title="Days in a row">🔥 ${st}</span>` : ''}<span class="lv">LV ${L.l}</span><span>${rank(L.l)}</span><span class="xpbar" title="${S.xp} XP"><i style="width:${pct(L.cur, L.need)}%"></i></span>`;
}
function toast(msg, cls = '') { const d = document.createElement('div'); d.className = 'toast ' + cls; d.textContent = msg; $('#toastbox').appendChild(d); setTimeout(() => d.remove(), 3200); }
function popXp(n) {
  const d = document.createElement('div'); d.className = 'xp-pop'; d.textContent = '+' + n + ' XP';
  const r = stage.getBoundingClientRect(); d.style.left = (r.left + r.width / 2 - 30) + 'px'; d.style.top = (r.top + r.height * .42) + 'px';
  document.body.appendChild(d); setTimeout(() => d.remove(), 1000);
}
function nudge(msg) { const n = E.next; n.classList.remove('nudge'); void n.offsetWidth; n.classList.add('nudge'); if (msg) toast(msg); }

function openDeck(d) {
  deck = d; deck.i = d.start || 0;
  viewport.hidden = false; bar.hidden = false; fit();
  E.jump.hidden = !d.jump || !d.jump.length;
  if (d.jump) E.jump.innerHTML = d.jump.map(([l, i]) => `<option value="${i}">${esc(l)}</option>`).join('');
  show();
}
async function show(soft = false) {
  if (!deck) return;
  const v = deck.slides[deck.i](); deck.v = v;
  stage.classList.toggle('still', soft);
  E.eb.innerHTML = `<div class="eb">${esc(v.eb || '')}</div>${v.prob ? `<div class="prob">${v.prob}</div>` : ''}`;
  if (v.ph) { E.ph.hidden = false; E.ph.innerHTML = v.ph.map((l, k) => `<div class="ph ${k + 1 === v.on ? 'on' : k + 1 < v.on ? 'done' : ''}"><b>${k + 1}</b>${esc(l)}</div>`).join(''); } else E.ph.hidden = true;
  if (v.track) { E.track.hidden = false; E.track.innerHTML = v.track; } else E.track.hidden = true;
  E.board.classList.toggle('full', !v.side);
  E.board.classList.toggle('pdf', !!v.side && v.side.includes('pdfq'));
  E.main.className = v.mainCls || ''; E.main.innerHTML = v.main || '';
  E.side.innerHTML = v.side || '';
  E.say.innerHTML = v.say ? `<span class="tag">${esc(v.say[0])}</span><span class="txt">${v.say[1]}</span>` : '';
  stage.classList.toggle('adv', !!v.adv);
  const n = deck.slides.length;
  E.count.textContent = deck.endless ? (v.count || '') : `${deck.i + 1} of ${n}`;
  if (deck.jump) { let cur = deck.jump[0] ? deck.jump[0][1] : 0; deck.jump.forEach(([, i]) => { if (i <= deck.i) cur = i; }); E.jump.value = cur; }
  E.prev.disabled = deck.i === 0 || !!v.noBack;
  E.next.disabled = !deck.endless && deck.i >= n - 1;
  E.next.hidden = !!v.hideNext; E.next.classList.toggle('locked', !!v.lock);
  document.title = (v.eb ? v.eb + ' · ' : '') + 'Trig Quest';
  await typeset(stage);
  E.main.querySelectorAll('.row.big').forEach(r => {   // long problems and answers shrink to the column instead of clipping
    let k = 1;
    if (r.scrollWidth > r.clientWidth + 1) k = r.clientWidth / (2 * r.scrollWidth - r.clientWidth);   // centred overflow: scrollWidth only counts one side
    r.querySelectorAll('.boxed').forEach(b => { if (b.scrollWidth > b.clientWidth + 1) k = Math.min(k, b.clientWidth / b.scrollWidth); });
    if (k < 1) r.style.fontSize = Math.max(12, 52 * k * .96) + 'px';
  });
}
function go(d) { if (!deck) return; const j = deck.i + d; if (j < 0 || j >= deck.slides.length) return; deck.i = j; show(); }
function nextSlide() {
  if (!deck) return;
  if (deck.v && deck.v.lock) { nudge(deck.v.lock); return; }
  if (deck.endless && deck.i >= deck.slides.length - 1) { if (deck.more) deck.more(); }
  go(1);
}
E.next.addEventListener('click', nextSlide);
E.prev.addEventListener('click', () => go(-1));
E.jump.addEventListener('change', () => { if (deck) { deck.i = +E.jump.value; show(); } });
$('#fs').addEventListener('click', () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); });
stage.addEventListener('click', e => {
  if (e.target.closest('button,a,select,.opt,.mc,.msn,.btn')) return;
  if (deck && deck.v && deck.v.adv) nextSlide();
});

/* ───────────── progress helpers ───────────── */
const missionStars = id => (S.missions[id] && S.missions[id].stars) || 0;
const chapterDone = c => c.missions.length && c.missions.every(m => missionStars(m.id) >= 1);
const slSolved = sl => { let n = 0; sl.problems.forEach(id => { if (S.solved[id]) n++; }); return n; };
const slStars = sl => { let n = 0, max = 0; sl.chapters.forEach(c => c.missions.forEach(m => { n += missionStars(m.id); max += 3; })); return [n, max]; };
const clearedMissions = () => MISSION_ORDER.filter(id => missionStars(id) >= 1).length;
const totalStars = () => MISSION_ORDER.reduce((n, id) => n + missionStars(id), 0);
const starRow = n => [1, 2, 3].map(k => `<span class="${n >= k ? 'on' : ''}">★</span>`).join('');

/* ───────────── menu decks ───────────── */
let hubSeen = false;
function hub() {
  stopRun();
  const L = lvl(S.xp), done = S.daily[dayStr()], last = S.last;
  const best = ['identities', 'integrals', 'derivs', 'exam'].reduce((m, k) => Math.max(m, S.best['blitz.' + k] || 0), 0);
  const modes = [
    { h: '#/story', c: '--cx', tag: 'Game mode 1', name: 'Story Mode', desc: 'Seven story lines. Each walks through one topic, mission by mission, with a boss at the end of every big chapter.', meta: `${clearedMissions()}/${MISSION_ORDER.length} missions cleared` },
    { h: '#/daily', c: '--cy', tag: 'Game mode 2', name: 'Daily Run', desc: 'Five fresh problems, the same for everyone today. Bonus XP the first time you finish.', meta: done ? `Done today · ${done.score}/${done.total}` : '5 problems · +50 XP' },
    { h: '#/blitz', c: '--cr', tag: 'Game mode 3', name: 'Blitz', desc: 'Sixty seconds on the clock. Pick a deck and clear as many cards as you can. A miss costs 3 seconds.', meta: `Best: ${best}` },
    { h: '#/survival', c: '--ca', tag: 'Game mode 4', name: 'Survival', desc: 'Three hearts, harder problems every round. How far can you get?', meta: `Best: ${S.best.survival || 0} rounds` },
    { h: 'codex.html', c: '--cp', tag: 'Free roam', name: 'Codex', desc: 'Every formula, searchable, with a study mode that hides the answers.', meta: 'Identities · integrals · cheat sheets' },
    { h: 'lesson/index.html', c: '--cd', tag: 'Cutscenes', name: 'Practice Lessons in Motion', desc: 'Trig Substitution in Motion, plus every prep-quiz and practice question as its own animated lesson, with the slice diagrams.', meta: '102 lessons · 6 decks + Trig Substitution' }
  ];
  const title = () => ({
    eb: 'Calculus II · Integration techniques', ph: ['Read', 'Plan', 'Answer'], on: 0, adv: true,
    main: `<div class="display">Trig Quest</div><div class="lead">Identities, integrals and exam prep, one slide at a time. ${TOTAL_PROBLEMS.toLocaleString()} problems, every answer checked.</div>
      <div class="statrow"><div class="stat"><b>LV ${L.l}</b><span>${rank(L.l)}</span></div><div class="stat"><b>${Object.keys(S.solved).length}</b><span>solved</span></div><div class="stat"><b>${clearedMissions()}</b><span>missions cleared</span></div><div class="stat"><b>${totalStars()}</b><span>stars</span></div></div>
      <div class="btns">${last ? `<a class="btn main" href="${esc(last.hash)}">Continue · ${esc(last.label)}</a>` : `<a class="btn main" href="#/story">Start Story Mode</a>`}<button class="btn" data-act="toModes">All game modes →</button></div>`,
    say: ['Welcome', 'Press → or click the slide for the game modes. The loading tips in the boot screen are real study notes.'] });
  const modesSlide = () => ({
    eb: 'Main menu', main: `<div class="display sm">Pick a game mode</div><div class="mcards">${modes.map(m => `<a class="mc" href="${m.h}" style="--c:var(${m.c})"><span class="tag">${m.tag}</span><h3>${m.name}</h3><p>${m.desc}</p><span class="meta">${m.meta}</span></a>`).join('')}</div>`,
    say: ['Choose', 'Everything is unlocked. Progress, XP and stars are saved in this browser.  <button class="btn sm" data-act="reset" style="margin-left:10px">Reset progress</button>'] });
  openDeck({ slides: [title, modesSlide], jump: [['Title', 0], ['Game modes', 1]], start: hubSeen ? 1 : 0 });
  hubSeen = true;
}

function storyList() {
  stopRun();
  const slide = () => ({
    eb: 'Game mode 1 · Story Mode', main: `<div class="display sm">Pick a story line</div><div class="mcards four">${STORY.map(sl => { const [st, mx] = slStars(sl), sv = slSolved(sl);
      return `<a class="mc" href="#/story/${sl.id}" style="--c:var(${SLV[sl.id]})"><span class="gl">${sl.glyph}</span><h3 style="font-size:21px">${esc(sl.name)}</h3><p style="font-size:14.5px">${esc(sl.tag)}</p><span class="meta" style="font-size:13px">${sv}/${sl.problems.size} solved · ${st}/${mx} ★</span><span class="bar"><i style="width:${pct(sv, sl.problems.size)}%"></i></span></a>`; }).join('')}</div>`,
    say: ['Story', 'Each story line is a deck of chapters. Missions are five problems; clear one with at least one star to mark it done.'] });
  openDeck({ slides: [slide], jump: [] });
}

function storyMap(id) {
  stopRun();
  const sl = STORY.find(s => s.id === id); if (!sl) { location.hash = '#/story'; return; }
  const cv = `var(${SLV[sl.id]})`, [st, mx] = slStars(sl), N = sl.chapters.length;
  const intro = () => ({
    eb: `Story line · ${sl.tag}`, adv: true, main: `<div class="display sm" style="color:${cv}">${esc(sl.name)}</div><div class="lead">${esc(sl.blurb)}</div>
      <div class="statrow"><div class="stat"><b>${slSolved(sl)}/${sl.problems.size}</b><span>problems solved</span></div><div class="stat"><b>${st}/${mx}</b><span>stars</span></div><div class="stat"><b>${sl.chapters.filter(chapterDone).length}/${N}</b><span>chapters done</span></div></div>
      ${sl.cutscene ? `<div class="btns"><a class="btn" href="${sl.cutscene.href}">🎬 ${esc(sl.cutscene.label)}</a></div>` : ''}`,
    say: ['Start', 'Press → for chapter 1, or use the jump menu to go straight to a chapter.'] });
  const chap = (c, i) => () => ({
    eb: `${sl.name} · Chapter ${i + 1} of ${N}`, ph: null, adv: false,
    main: `<div class="display sm">${esc(c.title)}</div><div class="lead">${esc(c.blurb)} · ${c.problems.length} problems</div>
      <div class="missions" style="--c:${cv}">${c.missions.map(m => { const s = missionStars(m.id);
        return `<a class="msn${m.boss ? ' boss' : ''}${s ? ' cleared' : ''}" href="#/play/${m.id}" title="${m.boss ? 'Boss: hardest problems in the chapter, 3 hearts' : 'Mission ' + m.label}">${m.boss ? 'BOSS' : m.label}<span class="st">${starRow(s)}</span></a>`; }).join('')}</div>`,
    say: ['Pick', 'Click a mission to play it. BOSS = the hardest problems of the chapter, three hearts.'] });
  openDeck({ slides: [intro].concat(sl.chapters.map(chap)), jump: [['Overview', 0]].concat(sl.chapters.map((c, i) => [`${i + 1}. ${c.title}`, i + 1])), start: 0 });
}

function blitzMenu() {
  stopRun();
  const slide = () => ({
    eb: 'Game mode 3 · Blitz', main: `<div class="display sm">Choose a deck</div><div class="lead">60 seconds. Clear as many cards as you can. In self-graded decks, reveal and then tell the truth.</div>
      <div class="mcards four">${DECKS.map(d => `<a class="mc" href="#/blitz/${d.k}" style="--c:var(${d.v})"><span class="tag">${d.mode === 'mc' ? 'Multiple choice' : 'Self-graded'}</span><h3>${d.name}</h3><p>${d.desc}</p><span class="meta">Best ${S.best['blitz.' + d.k] || 0} · ${d.pool().length} cards</span></a>`).join('')}</div>`,
    say: ['Blitz', 'A wrong answer costs 3 seconds. XP is capped per run so grinding does not help.'] });
  openDeck({ slides: [slide], jump: [] });
}

/* mission loading overlay */
async function missionLoad(kicker, title, obj, color, ms = 1000, tip) {
  const o = $('#mload'); o.hidden = false; o.classList.remove('out');
  o.innerHTML = `<div class="ml" style="--c:${color};--d:${ms}ms"><div class="k">${esc(kicker)}</div><h2>${esc(title)}</h2><div class="obj">${esc(obj)}</div><div class="bar"><i></i></div><div class="tip"><b>TIP</b>${esc(tip || TIPS[Math.floor(Math.random() * TIPS.length)])}</div></div>`;
  await wait(ms); o.classList.add('out'); await wait(250); o.hidden = true;
}

/* ───────────── runs: missions, daily, blitz, survival ───────────── */
function stopRun() { if (tick) { clearInterval(tick); tick = null; } run = null; }
function withOptions(p, pool) {
  if (p.type !== 'mc') return p;
  const cands = shuffle(pool.filter(x => x.type === 'mc' && nrm(x.lhs) !== nrm(p.lhs) && nrm(x.rhs) !== nrm(p.rhs)));
  const seen = new Set([nrm(p.rhs)]), opts = [{ t: p.rhs, ok: true }];
  for (const x of cands) { if (opts.length >= 4) break; if (seen.has(nrm(x.rhs))) continue; seen.add(nrm(x.rhs)); opts.push({ t: x.rhs, ok: false }); }
  if (opts.length < 3) return Object.assign({}, p, { type: 'self', a: '= ' + p.rhs });
  return Object.assign({}, p, { opts: shuffle(opts) });
}
function newRun(cfg) {
  run = { cfg, items: [], correct: 0, graded: 0, streak: 0, bestStreak: 0, hearts: cfg.hearts == null ? null : cfg.hearts, xp: 0, t0: Date.now(), penalty: 0, final: null, missed: [] };
  return run;
}
function addItem(p) { const it = { p: withOptions(p, run.cfg.mcPool || ALL_MC), grade: null, picked: null, shown: false }; run.items.push(it); return it; }
function trackHtml(k, withProblem) {
  const cfg = run.cfg, it = run.items[k]; let hud = '';
  if (cfg.timeMs) { const w = Math.max(0, (cfg.timeMs - (Date.now() - run.t0) - run.penalty) / cfg.timeMs * 100); hud += `<div class="timer"><i style="width:${w}%"></i></div><span class="score">Score ${run.correct}</span>`; }
  if (run.hearts != null) hud += `<span class="hearts" title="Hearts">${[0, 1, 2].map(i => `<span class="${i < run.hearts ? '' : 'gone'}">♥</span>`).join('')}</span>`;
  if (!withProblem && !hud) return null;
  return `<div class="tin">${withProblem && it ? `<span class="lab">Problem</span>${M(it.p.q)}` : `<span class="lab">${esc(cfg.sub || cfg.title)}</span>`}</div><div class="trkhud">${hud}</div>`;
}
function phasesFor(p) {
  if (p.type === 'mc' && p.opts) return ['Read', 'Pick', 'Check'];
  if (p.m && p.m.includes('trigsub')) return ['Substitute', 'Integrate', 'Back to x'];
  return ['Read', 'Plan', 'Answer'];
}
function ebFor(k) { const cfg = run.cfg; return `${cfg.sub ? cfg.sub + ' · ' : ''}${cfg.title} · Problem ${k + 1}${cfg.problems ? ' of ' + cfg.problems.length : ''}`; }

/* slides for one problem */
function slidesFor(k) {
  const it = () => run.items[k];
  if (it().p.opts) return [() => {
    const x = it(), p = x.p, picked = x.picked != null, ok = picked && p.opts[x.picked].ok;
    return { eb: ebFor(k), ph: phasesFor(p), on: picked ? 3 : 2, track: trackHtml(k, false), mainCls: '',
      main: `${big(p.q)}<div class="opts">${p.opts.map((o, i) => `<button class="opt${picked ? (o.ok ? ' right' : i === x.picked ? ' wrong' : ' dim') : ''}" data-act="pick" data-i="${i}" ${picked ? 'disabled' : ''}><span class="k">${i + 1}</span><span class="m">${M(o.t)}</span></button>`).join('')}</div>
        ${picked ? `<div class="row work">${boxed(p.lhs + ' = ' + p.rhs, 'ok')}</div>` : ''}`,
      say: picked ? [ok ? 'Correct' : 'Not quite', ok ? 'Press → for the next problem.' : `The right side is highlighted. Press → to continue.`] : ['Pick', 'Which right-hand side completes the identity? Press 1–4 or click.'],
      lock: picked ? null : 'Pick an answer first (1–4).', keys: picked ? {} : { 1: () => pick(k, 0), 2: () => pick(k, 1), 3: () => pick(k, 2), 4: () => pick(k, 3) } };
  }];
  return [
    () => { const p = it().p; return { eb: ebFor(k), ph: phasesFor(p), on: 1, track: trackHtml(k, false), main: big(p.q), side: pdfq(p), adv: true,
      say: ['Your turn', 'Work it on paper first. Press → for a hint when you are ready, then → again for the answer.'] }; },
    () => { const p = it().p; return { eb: ebFor(k), ph: phasesFor(p), on: 2, track: trackHtml(k, true), adv: true,
      main: `<div class="card fadein"><div class="k">Plan</div><p>${p.hint}</p></div>`,
      say: ['Plan', 'Use the hint, finish the problem on paper, then check it on the next slide.'] }; },
    () => { const x = it(), p = x.p, g = x.grade;
      return { eb: ebFor(k), ph: phasesFor(p), on: 3, track: trackHtml(k, true), side: solq(p),
        main: `<div class="row big">${boxed(p.a, g === 'ok' ? 'ok' : g === 'no' ? 'no' : '')}</div>${p.note ? `<div class="note">${p.note}</div>` : ''}
          <div class="btns">${g ? `<span class="chip flat">${g === 'ok' ? '✓ Marked correct' : '✗ Marked missed'}</span>` : `<button class="btn ok" data-act="grade" data-g="ok">✓ I got it (G)</button><button class="btn no" data-act="grade" data-g="no">✗ Missed it (M)</button>`}</div>`,
        say: ['Check', g ? 'Press → for the next problem.' : 'Compare with your work. Be honest: it only counts if you got it.'],
        lock: g ? null : 'Mark yourself first: G for got it, M for missed.', keys: g ? {} : { g: () => grade(k, 'ok'), m: () => grade(k, 'no') } }; }
  ];
}
function currentK() { return deck && deck.v ? deck.v.k : null; }

/* answering */
function gainFor(p, ok) {
  if (!ok) return 0;
  const first = !S.solved[p.id]; S.solved[p.id] = 1; touchDay();
  let g = first ? 10 : 2; if (run.streak >= 3) g += 3; return g;
}
function register(k, ok) {
  const x = run.items[k], p = x.p; run.graded++;
  if (ok) { run.correct++; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak); } else { run.streak = 0; run.missed.push(p); if (run.hearts != null) run.hearts--; if (run.cfg.timeMs) run.penalty += 3000; }
  const g = gainFor(p, ok); run.xp += g; addXp(g); save(); if (g) popXp(g);
}
function grade(k, which) {
  if (!run || run.items[k].grade) return;
  run.items[k].grade = which; register(k, which === 'ok');
  if (run.hearts === 0 && !run.cfg.endless) { show(true); setTimeout(() => finishDeckRun('dead'), 700); return; }
  show(true);
}
function pick(k, i) {
  if (!run) return; const x = run.items[k]; if (x.picked != null || !x.p.opts[i]) return;
  x.picked = i; x.grade = x.p.opts[i].ok ? 'ok' : 'no'; register(k, x.grade === 'ok');
  if (run.hearts === 0 && !run.cfg.endless) { show(true); setTimeout(() => finishDeckRun('dead'), 900); return; }
  show(true);
}

/* result slide for fixed decks (missions, daily) */
function starsFor(r) { const f = r.correct / r.items.length; return f >= 1 ? 3 : f >= .8 ? 2 : f >= .6 ? 1 : 0; }
function finalize(why) {
  const r = run; if (r.final) return r.final;
  const cfg = r.cfg, total = r.items.length; let stars = null, bonus = 0, headline, good = true, extra = '', next = '';
  if (cfg.kind === 'mission') {
    const failed = why === 'dead'; stars = failed ? 0 : starsFor(r); const prev = missionStars(cfg.id);
    if (stars > prev) { bonus = (stars - prev) * 10 + (prev === 0 ? 20 : 0); S.missions[cfg.id] = { stars }; }
    headline = failed ? 'Mission failed' : stars ? (cfg.boss ? 'Boss defeated' : 'Mission complete') : 'Try again'; good = !failed && stars > 0;
    const idx = MISSION_ORDER.indexOf(cfg.id), nx = MISSION_ORDER[idx + 1]; if (nx && MISSIONS[nx].sl === cfg.slObj) next = `#/play/${nx}`;
  } else if (cfg.kind === 'daily') {
    const today = dayStr(), first = !S.daily[today]; if (first) bonus = 50; S.daily[today] = { score: r.correct, total }; headline = 'Daily run complete';
  } else if (cfg.kind === 'blitz') {
    const k = 'blitz.' + cfg.deck, best = S.best[k] || 0, rec = r.correct > best; if (rec) S.best[k] = r.correct;
    bonus = Math.min(60, r.correct * 2); headline = why === 'time' ? "Time's up" : 'Deck cleared'; extra = rec ? 'New best!' : `Best: ${best}`;
  } else if (cfg.kind === 'survival') {
    const best = S.best.survival || 0, rec = r.correct > best; if (rec) S.best.survival = r.correct;
    bonus = Math.min(80, r.correct * 3); headline = 'Game over'; good = false; extra = rec ? 'New best!' : `Best: ${best} rounds`;
  }
  if (bonus) { addXp(bonus); r.xp += bonus; }
  S.last = { hash: cfg.replay, label: cfg.last || cfg.title }; save();
  r.final = { headline, good, stars, extra, next, total, secs: Math.round((Date.now() - r.t0) / 1000) };
  hudUpdate(); return r.final;
}
function resultSlide(k0) {
  return () => {
    const r = run, cfg = r.cfg, ungraded = r.items.filter(x => !x.grade).length;
    if (!r.final && ungraded && !r.forced) {
      const first = r.items.findIndex(x => !x.grade);
      return { eb: `${cfg.title} · Results`, mainCls: '', main: `<div class="display sm">Not finished</div><div class="lead">${ungraded} problem${ungraded > 1 ? 's' : ''} still need a grade.</div><div class="btns"><button class="btn main" data-act="gotoK" data-k="${first}">Go to problem ${first + 1}</button></div>`,
        say: ['Results', 'Grade every problem to finish the mission.'], hideNext: true };
    }
    const f = finalize(r.forced || 'done'), missed = r.missed.slice(0, 6);
    return { eb: `${cfg.title} · Results`, mainCls: 'scroll', main: `<div class="display sm" style="color:var(${f.good ? '--cr' : '--ca'})">${esc(f.headline)}</div>
      ${f.stars != null ? `<div class="stars">${starRow(f.stars)}</div>` : ''}${f.extra ? `<div class="lead" style="font-size:20px">${esc(f.extra)}</div>` : ''}
      <div class="statrow"><div class="stat"><b>${r.correct}/${f.total}</b><span>correct</span></div><div class="stat"><b>+${r.xp}</b><span>XP earned</span></div><div class="stat"><b>${r.bestStreak}</b><span>best streak</span></div><div class="stat"><b>${f.secs}s</b><span>time</span></div></div>
      <div class="btns"><a class="btn main" href="${cfg.replay}" data-replay="1">${f.good ? 'Play again' : 'Retry'}</a>${f.next ? `<a class="btn" href="${f.next}">Next mission →</a>` : ''}<a class="btn" href="${cfg.back}">${esc(cfg.backLabel || 'Back')}</a></div>
      ${missed.length ? `<div class="rh">Review · ${r.missed.length} missed</div><div class="review">${missed.map(p => `<div class="it">${M(p.q)}<div class="a">${M(p.type === 'mc' ? p.lhs + ' = ' + p.rhs : p.a)}</div></div>`).join('')}</div>` : ''}`,
      say: ['Results', f.good ? 'Nice. The jump menu lets you review any problem.' : 'Review the misses, then go again.'], hideNext: true };
  };
}
function finishDeckRun(why) { if (!run || !deck) return; run.forced = why; deck.i = deck.slides.length - 1; show(); }

/* build a fixed deck (mission / daily) */
function fixedDeck(cfg, intro) {
  newRun(cfg); cfg.problems.forEach(addItem);
  const slides = [() => Object.assign({ k: null }, intro())], jump = [['Briefing', 0]];
  run.items.forEach((x, k) => { jump.push([`Problem ${k + 1}`, slides.length]); slidesFor(k).forEach(f => slides.push(() => Object.assign({ k }, f()))); });
  jump.push(['Results', slides.length]); slides.push(resultSlide());
  openDeck({ slides, jump });
}
function introFor(cfg, kicker, lead) {
  return () => ({ eb: kicker, adv: true, ph: null,
    main: `<div class="display sm">${esc(cfg.title)}</div><div class="lead">${lead}</div>
      <div class="pillrow"><span class="chip"><b>${cfg.problems.length}</b>problems</span>${cfg.hearts ? `<span class="chip"><b>${cfg.hearts}</b>hearts</span>` : ''}${cfg.boss ? '<span class="chip flat">Boss mission</span>' : ''}</div>`,
    say: ['Briefing', 'Each problem is a few slides: read it, plan it, then check your answer. Press → to begin.'] });
}

/* endless decks (blitz, survival) */
function endlessDeck(cfg) {
  newRun(cfg);
  const slides = [], d = { slides, jump: [], endless: true };
  const addCard = () => { const x = addItem(cfg.next(run)), k = run.items.length - 1; slides.push(() => ({ k, ...quick(k) })); };
  d.more = () => { if (!run.final) addCard(); };
  addCard();
  if (cfg.timeMs) tick = setInterval(() => {
    if (!run || run.final) return;
    const left = cfg.timeMs - (Date.now() - run.t0) - run.penalty, tm = $('.timer i'), sc = $('.score');
    if (tm) tm.style.width = Math.max(0, left / cfg.timeMs * 100) + '%'; if (sc) sc.textContent = 'Score ' + run.correct;
    if (left <= 0) endEndless('time');
  }, 100);
  openDeck(d);
}
function quick(k) {
  const x = run.items[k], p = x.p, cfg = run.cfg, graded = !!x.grade;
  const count = cfg.timeMs ? `Card ${k + 1}` : `Round ${k + 1}`;
  if (p.opts) return { eb: `${cfg.title} · ${count}`, ph: phasesFor(p), on: graded ? 3 : 2, track: trackHtml(k, false), count, noBack: true, hideNext: true,
    main: `${big(p.q)}<div class="opts">${p.opts.map((o, i) => `<button class="opt${graded ? (o.ok ? ' right' : i === x.picked ? ' wrong' : ' dim') : ''}" data-act="qpick" data-i="${i}" ${graded ? 'disabled' : ''}><span class="k">${i + 1}</span><span class="m">${M(o.t)}</span></button>`).join('')}</div>`,
    say: ['Pick', cfg.timeMs ? 'Press 1–4. A miss costs 3 seconds.' : 'Press 1–4. A miss costs a heart.'], keys: graded ? {} : { 1: () => qpick(k, 0), 2: () => qpick(k, 1), 3: () => qpick(k, 2), 4: () => qpick(k, 3) } };
  return { eb: `${cfg.title} · ${count}`, ph: phasesFor(p), on: x.shown ? 3 : 1, track: trackHtml(k, false), count, noBack: true, hideNext: true, side: pdfq(p),
    main: `${big(p.q)}${x.shown ? `<div class="row work">${boxed(p.a)}</div>${p.note ? `<div class="note">${p.note}</div>` : ''}<div class="btns"><button class="btn ok" data-act="qgrade" data-g="ok">✓ I got it (G)</button><button class="btn no" data-act="qgrade" data-g="no">✗ Missed it (M)</button></div>`
      : `<div class="btns"><button class="btn main" data-act="qreveal">Reveal answer (Space)</button></div>`}`,
    say: [x.shown ? 'Check' : 'Solve', x.shown ? 'Be honest: G if you had it, M if not.' : 'Solve it, then reveal.'], keys: x.shown ? { g: () => qgrade(k, 'ok'), m: () => qgrade(k, 'no') } : { ' ': () => qreveal(k), enter: () => qreveal(k) } };
}
function qreveal(k) { if (!run || run.final) return; run.items[k].shown = true; show(true); }
async function qgrade(k, which) { if (!run || run.final || run.items[k].grade) return; run.items[k].grade = which; register(k, which === 'ok'); await wait(which === 'ok' ? 250 : 450); endlessNext(); }
async function qpick(k, i) {
  if (!run || run.final) return; const x = run.items[k]; if (x.picked != null) return;
  x.picked = i; x.grade = x.p.opts[i].ok ? 'ok' : 'no'; register(k, x.grade === 'ok'); show(true); await wait(x.grade === 'ok' ? 300 : 800); endlessNext();
}
function endlessNext() {
  if (!run || run.final) return;
  if (run.hearts === 0) return endEndless('dead');
  if (run.cfg.timeMs && (run.cfg.timeMs - (Date.now() - run.t0) - run.penalty) <= 0) return endEndless('time');
  deck.more(); deck.i = deck.slides.length - 1; show();
}
function endEndless(why) {
  if (!run || run.final) return; if (tick) { clearInterval(tick); tick = null; }
  run.forced = why; run.items = run.items.filter(x => x.grade);
  deck.slides.push(resultSlide()); deck.i = deck.slides.length - 1; show();
}

/* launchers */
async function playMission(id) {
  const m = MISSIONS[id]; if (!m) { location.hash = '#/story'; return; }
  stopRun(); const c = m.ch, sl = m.sl, token = {}; playMission.token = token;
  S.last = { hash: '#/play/' + id, label: `${sl.name} · ${c.title} · ${m.boss ? 'Boss' : 'Mission ' + m.label}` }; save();
  await missionLoad(m.boss ? 'BOSS FIGHT' : `${sl.name.toUpperCase()} · MISSION ${m.label}`, c.title, m.boss ? 'The hardest problems in this chapter. 3 hearts.' : `${m.problems.length} problems${m.hearts ? ' · ' + m.hearts + ' hearts' : ''}. ${c.blurb}`, sl.color, 1000);
  if (playMission.token !== token) return;
  const cfg = { kind: 'mission', id, boss: m.boss, slObj: sl, title: `${c.title}${m.boss ? ' · Boss' : ' · Mission ' + m.label}`, sub: sl.name, problems: m.problems, hearts: m.hearts,
    mcPool: c.problems.filter(p => p.type === 'mc'), replay: '#/play/' + id, back: '#/story/' + sl.id, backLabel: 'Back to the chapters' };
  fixedDeck(cfg, introFor(cfg, `${sl.name} · ${c.title}`, esc(m.boss ? 'The five hardest problems of this chapter. Miss three and the boss wins.' : c.blurb)));
}
async function playDaily() {
  stopRun(); const token = {}; playMission.token = token;
  const today = dayStr(), rnd = mulberry(hashStr('daily' + today));
  const mc = shuffle(ALL_MC, rnd).slice(0, 2), sf = shuffle(ALL_SELF.filter(p => !/^pdf:/.test(p.id)), rnd).slice(0, 3), problems = shuffle(mc.concat(sf), rnd);
  S.last = { hash: '#/daily', label: 'Daily Run' }; save();
  await missionLoad('DAILY RUN', today, '5 problems, the same for everyone today. +50 XP the first time you finish.', '#FFD84D', 900);
  if (playMission.token !== token) return;
  const cfg = { kind: 'daily', title: 'Daily Run', sub: today, problems, hearts: null, replay: '#/daily', back: '#/', backLabel: 'Main menu' };
  fixedDeck(cfg, introFor(cfg, 'Game mode 2 · Daily Run', 'Five problems picked from every story line. The same five for everyone today.'));
}
const DECKS = [
  { k: 'identities', name: 'Identities', mode: 'mc', v: '--cx', color: '#5B8CFF', desc: 'Pick the right side of the identity.', pool: () => ALL_MC },
  { k: 'integrals', name: 'Integrals', mode: 'self', v: '--cr', color: '#3DDC97', desc: 'Basics, powers, products, trig sub, by parts.', pool: () => ALL_SELF.filter(p => /^(basic|powers|products|angles|trigsub|parts|inverse|frac):/.test(p.id)) },
  { k: 'derivs', name: 'Derivatives', mode: 'self', v: '--cd', color: '#FFB347', desc: 'Trig, inverse trig and hyperbolic derivatives.', pool: () => ALL_SELF.filter(p => /^derivatives:/.test(p.id)) },
  { k: 'exam', name: 'Exam Problems', mode: 'self', v: '--ca', color: '#FF5D6C', desc: 'The real MATH 1400 problems from your PDF and recitation worksheet.', pool: () => ALL_SELF.filter(p => /^(pdf|recitation):/.test(p.id)) }
];
async function playBlitz(k) {
  const d = DECKS.find(x => x.k === k); if (!d) { location.hash = '#/blitz'; return; }
  stopRun(); const token = {}; playMission.token = token; const pool = d.pool(); if (!pool.length) { location.hash = '#/blitz'; return; }
  S.last = { hash: '#/blitz/' + k, label: 'Blitz · ' + d.name }; save();
  await missionLoad('BLITZ', d.name, '60 seconds. A miss costs 3 seconds. Go!', d.color, 900);
  if (playMission.token !== token) return;
  let bag = [];
  endlessDeck({ kind: 'blitz', endless: true, deck: k, title: 'Blitz · ' + d.name, sub: '60 seconds', timeMs: 60000, hearts: null, mcPool: pool.filter(p => p.type === 'mc'),
    next: () => { if (!bag.length) bag = shuffle(pool); return bag.pop(); }, replay: '#/blitz/' + k, back: '#/blitz', backLabel: 'Choose a deck' });
}
async function playSurvival() {
  stopRun(); const token = {}; playMission.token = token;
  const pool = ALL_SELF.slice().sort((a, b) => a.diff - b.diff), used = new Set();
  S.last = { hash: '#/survival', label: 'Survival' }; save();
  await missionLoad('SURVIVAL', 'Three hearts', 'The problems get harder every round. Miss three and it is over.', '#FF5D6C', 1000);
  if (playMission.token !== token) return;
  endlessDeck({ kind: 'survival', endless: true, title: 'Survival', sub: 'Harder every round', hearts: 3,
    next: r => { const n = pool.length, centre = Math.min(n - 1, Math.floor(n * .08 + r.items.length * n * .035)); let cand = [];
      for (let w = 12; w < n && cand.length < 3; w += 12) cand = pool.slice(Math.max(0, centre - w), Math.min(n, centre + w)).filter(p => !used.has(p.id));
      if (!cand.length) { used.clear(); cand = pool.slice(-20); } const p = cand[Math.floor(Math.random() * cand.length)]; used.add(p.id); return p; },
    replay: '#/survival', back: '#/', backLabel: 'Main menu' });
}

/* ───────────── router ───────────── */
function route() {
  stopRun(); playMission.token = null; $('#mload').hidden = true; deck = null;
  const [a, b] = (location.hash || '#/').slice(2).split('/');
  if (!a) hub();
  else if (a === 'story') b ? storyMap(b) : storyList();
  else if (a === 'play') playMission(b);
  else if (a === 'daily') playDaily();
  else if (a === 'blitz') b ? playBlitz(b) : blitzMenu();
  else if (a === 'survival') playSurvival();
  else hub();
}
window.addEventListener('hashchange', route);

/* ───────────── events ───────────── */
const ACTIONS = {
  grade(b) { const k = deck.v.k; if (k != null) grade(k, b.dataset.g); },
  pick(b) { const k = deck.v.k; if (k != null) pick(k, +b.dataset.i); },
  qreveal() { qreveal(deck.v.k); }, qgrade(b) { qgrade(deck.v.k, b.dataset.g); }, qpick(b) { qpick(deck.v.k, +b.dataset.i); },
  gotoK(b) { const k = +b.dataset.k; if (deck.jump[k + 1]) { deck.i = deck.jump[k + 1][1]; show(); } },
  toModes() { go(1); },
  reset() { if (confirm('Erase all Trig Quest progress in this browser?')) { S = blank(); save(); hudUpdate(); hubSeen = false; route(); toast('Progress reset'); } }
};
document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]'); if (a && ACTIONS[a.dataset.act]) { e.preventDefault(); ACTIONS[a.dataset.act](a); return; }
  const re = e.target.closest('[data-replay]'); if (re) { if (location.hash === re.getAttribute('href')) { e.preventDefault(); route(); } }
});
document.addEventListener('keydown', e => {
  if (!deck || e.metaKey || e.ctrlKey || e.altKey || /input|select|textarea/i.test(document.activeElement.tagName) && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const k = e.key.toLowerCase(), v = deck.v || {};
  if (v.keys && v.keys[k]) { e.preventDefault(); v.keys[k](); return; }
  if (k === 'arrowright' || k === ' ' || k === 'enter' || k === 'pagedown') { if (document.activeElement.tagName === 'BUTTON' && (k === ' ' || k === 'enter')) return; e.preventDefault(); if (!E.next.hidden) nextSlide(); }
  else if (k === 'arrowleft' || k === 'pageup') { e.preventDefault(); if (!E.prev.disabled) go(-1); }
  else if (k === 'escape' && run) { location.hash = run.cfg.back; }
});

/* ───────────── loading screen ───────────── */
function boot() {
  const loader = $('#loader'), fill = $('#ldFill'), status = $('#ldStatus'), pctEl = $('#ldPct'), tipEl = $('#ldTip'), startBtn = $('#ldStart');
  const glyphs = ['∫', 'θ', 'π', '∑', '√', 'sin', 'cos', 'tan', 'sec', 'dx', '∞', 'Δ', 'arctan', 'x²'];
  $('#ldGlyphs').innerHTML = Array.from({ length: 26 }, () => `<span style="left:${Math.random() * 100}%;font-size:${16 + Math.random() * 30}px;animation-duration:${7 + Math.random() * 9}s;animation-delay:${-Math.random() * 12}s">${glyphs[Math.floor(Math.random() * glyphs.length)]}</span>`).join('');
  let ti = Math.floor(Math.random() * TIPS.length);
  const showTip = () => { tipEl.innerHTML = `<b>TIP</b>${esc(TIPS[ti % TIPS.length])}`; ti++; };
  showTip(); const tipTimer = setInterval(showTip, 2600);
  const FAST = /[?&]fast\b/.test(location.search);
  const t0 = performance.now(), MIN = FAST ? 0 : store.sget('tq.seen') ? 1500 : 3000;
  let real = 0, failed = false, ready = false;
  const setReal = v => { real = Math.max(real, v); };
  setReal(.15);
  const fonts = (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => setReal(.45));
  const mj = new Promise(res => {
    const t1 = performance.now();
    (function poll() {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) MathJax.startup.promise.then(() => { mjReady = true; setReal(.8); res(); }).catch(() => { failed = true; res(); });
      else if (performance.now() - t1 > 9000) { failed = true; res(); }
      else setTimeout(poll, 60);
    })();
  });
  Promise.all([fonts, mj]).then(() => { buildAll(); $('#ldFoot').textContent = `${TOTAL_PROBLEMS.toLocaleString()} problems · every answer checked`; setReal(1); ready = true; });
  const msgs = [[.2, 'Reading the problem bank'], [.5, 'Loading fonts'], [.8, 'Warming up the math engine'], [.97, 'Building story lines'], [2, 'Ready']];
  const frame = () => {
    const t = performance.now() - t0, shown = Math.min(real, t / MIN);
    fill.style.width = (shown * 100).toFixed(1) + '%'; pctEl.textContent = Math.floor(shown * 100) + '%';
    status.textContent = (msgs.find(m => shown < m[0]) || msgs[msgs.length - 1])[1] + (shown < 1 ? '…' : '');
    if (shown >= 1 && ready) {
      clearInterval(tipTimer);
      status.textContent = failed ? 'Math engine offline: formulas may look raw' : 'Ready';
      startBtn.hidden = false; startBtn.focus({ preventScroll: true });
      const go1 = () => { document.removeEventListener('keydown', go1); loader.removeEventListener('pointerdown', go1); store.sset('tq.seen', '1'); loader.classList.add('out'); hudUpdate(); route(); setTimeout(() => loader.remove(), 600); };
      document.addEventListener('keydown', go1); loader.addEventListener('pointerdown', go1);
      if (FAST) go1();
      return;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
