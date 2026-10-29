#!/usr/bin/env node
/* Numeric + structural checks for the lesson decks.   node lesson/check.js l23 [more deck groups]  */
const fs = require('fs'), path = require('path'), vm = require('vm');
const DECKS = {
  l23: ['kit.js', 'deck-l23.js', 'deck-l23b.js', 'deck-l23c.js'],
  w8: ['kit.js', 'deck-w8.js', 'deck-w8b.js'],
  w9: ['kit.js', 'kit-area.js', 'kit-vol.js', 'deck-w9.js'],
  l30: ['kit.js', 'kit-area.js', 'deck-l30.js', 'deck-l30b.js', 'deck-l30c.js'],
  q4: ['kit.js', 'kit-area.js', 'kit-vol.js', 'kit-q4.js', 'deck-q4a.js', 'deck-q4b.js', 'deck-q4c.js', 'deck-q4d.js', 'deck-q4z.js'],
  abc: ['kit.js', 'kit-area.js', 'kit-polar.js', 'deck-abc.js', 'deck-abcp.js', 'deck-abcz.js'],
  l32: ['kit.js', 'kit-area.js', 'kit-vol.js', 'deck-l32.js', 'deck-l32b.js', 'deck-l32c.js', 'deck-l32d.js']
};
let bad = 0;
const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(DECKS);
for (const name of names) {
  const files = ['dsl.js'].concat(DECKS[name]).filter(f => fs.existsSync(path.join(__dirname, f)));
  const sandbox = { window: {}, console, Math };
  sandbox.window = sandbox; vm.createContext(sandbox);
  // classic scripts share one global lexical scope: concatenate them
  const src = files.map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n;\n');
  try { vm.runInContext(src + '\n;this.__DEF = window.LESSON_DEF;', sandbox, { filename: name }); } catch (e) { console.log(name, 'LOAD ERROR', e.stack.split('\n').slice(0, 4).join(' | ')); bad++; continue; }
  const DEF = sandbox.__DEF; if (!DEF) { console.log(name, 'no LESSON() call'); bad++; continue; }
  let slides = 0, checks = 0, fails = [];
  for (const e of DEF.examples) {
    slides += e.steps.length + (e.heli ? 1 : 0);
    if (!e.phases || e.phases.length !== 3) fails.push(`P${e.n}: needs 3 phases`);
    if (!e.track || e.track.length !== 3) fails.push(`P${e.n}: needs 3 track entries`);
    if (!e.verify || !e.verify.length) fails.push(`P${e.n}: no numeric verification`);
    e.steps.forEach((s, i) => {
      if (!s.say || typeof s.say !== 'string') fails.push(`P${e.n} step ${i + 1}: no caption`);
      if (![1, 2, 3].includes(s.phase)) fails.push(`P${e.n} step ${i + 1}: phase ${s.phase}`);
      const keys = []; const walk = items => items.forEach(it => { if (it.frac) { keys.push(it.k + '~bar'); walk(it.frac.num); walk(it.frac.den); } else if (it.stack) it.stack.forEach(walk); else keys.push(it.k); });
      [...s.main, ...(s.side || [])].forEach(r => walk(r.items));
      const seen = new Set(); keys.forEach(k => { if (seen.has(k)) fails.push(`P${e.n} step ${i + 1}: duplicate token key "${k}"`); seen.add(k); });
      const caps = (s.say.match(/\$/g) || []).length; if (caps % 2) fails.push(`P${e.n} step ${i + 1}: odd number of $ in caption`);
    });
    (e.verify || []).forEach((v, vi) => {
      checks++;
      if (v.anti) {
        const { F, f, range: [a, b] } = v.anti; let worst = 0;
        for (let k = 0; k < 40; k++) { const x = a + (b - a) * (k + .5) / 40, h = 1e-5 * (1 + Math.abs(x)); const d = (F(x + h) - F(x - h)) / (2 * h); worst = Math.max(worst, Math.abs(d - f(x)) / (1 + Math.abs(f(x)))); }
        if (!(worst < 1e-5)) fails.push(`P${e.n} verify#${vi}: derivative of answer differs from integrand (worst rel err ${worst.toExponential(2)})`);
      } else if (v.equal) {
        const { a: A, b: B, range: [a, b] } = v.equal; let worst = 0;
        for (let k = 0; k < 40; k++) { const x = a + (b - a) * (k + .5) / 40; worst = Math.max(worst, Math.abs(A(x) - B(x)) / (1 + Math.abs(A(x)))); }
        if (!(worst < 1e-9)) fails.push(`P${e.n} verify#${vi}: two forms differ (worst ${worst.toExponential(2)})`);
      } else if (v.value) {
        const got = sandbox.integ(v.value.f, v.value.a, v.value.b, v.value.n || 40000);
        if (!sandbox.approx(got, v.value.val, v.value.tol || 1e-7)) fails.push(`P${e.n} verify#${vi}: integral ${got} != claimed ${v.value.val}`);
      } else if (v.num) {
        if (!sandbox.approx(v.num.a, v.num.b, v.num.tol || 1e-9)) fails.push(`P${e.n} verify#${vi}: ${v.num.a} != ${v.num.b}`);
      }
    });
  }
  console.log(`${name}: ${DEF.examples.length} problems, ${slides} slides, ${checks} numeric checks, ${fails.length} problems`);
  fails.forEach(f => console.log('  -', f)); bad += fails.length;
}
process.exit(bad ? 1 : 0);
