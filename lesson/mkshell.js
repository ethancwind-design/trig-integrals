/* node mkshell.js  — regenerate every lesson shell from shell.template.html */
const fs = require('fs'), t = fs.readFileSync(__dirname + '/shell.template.html', 'utf8');
const SHELLS = {
  'lecture-30-31.html': ['Lectures 30 & 31 · in Motion', ['kit.js', 'kit-area.js', 'deck-l30.js', 'deck-l30b.js', 'deck-l30c.js']],
  'lecture-32-33.html': ['Lectures 32 & 33 · in Motion', ['kit.js', 'kit-area.js', 'kit-vol.js', 'deck-l32.js', 'deck-l32b.js', 'deck-l32c.js', 'deck-l32d.js']],
  'quiz-4-practice.html': ['Quiz 4 Practice · in Motion', ['kit.js', 'kit-area.js', 'kit-vol.js', 'kit-q4.js', 'deck-q4a.js', 'deck-q4b.js', 'deck-q4c.js', 'deck-q4d.js', 'deck-q4z.js']],
  'week-9-quizzes.html': ['Week 9 Prep Quizzes · in Motion', ['kit.js', 'kit-area.js', 'kit-vol.js', 'deck-w9.js']]
};
for (const [f, [title, decks]] of Object.entries(SHELLS)) {
  if (!decks.filter(d => !/^kit/.test(d)).some(d => fs.existsSync(__dirname + '/' + d))) { console.log('skip', f); continue; }
  const present = decks.filter(d => fs.existsSync(__dirname + '/' + d));
  fs.writeFileSync(__dirname + '/' + f, t.replace('__TITLE__', title).replace('__DECK__', present.map(d => `<script src="${d}"></script>`).join('\n')));
  console.log('wrote', f);
}
