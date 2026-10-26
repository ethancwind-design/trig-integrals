/* Shared by the game, the codex and the lessons: finds a problem's crop of the source PDF (shots.js, built by build/shots.py)
   and renders it as a bordered figure. Without a crop every helper returns '' / null, so the typed problem is all that shows. */
(function () {
  const BASE = document.currentScript ? new URL('.', document.currentScript.src).href : '';
  const S = window.SHOTS || {};
  const pad = n => String(n).padStart(2, '0');
  /* "Lecture 23 · #6(a)", "Quiz A · Q2", "MATH 1400 · Lectures 30–31 #10", "Week 9 · area between …" -> key */
  function keyFor(src) {
    let m;
    if ((m = /^Lecture 23 · #(\d+)/.exec(src))) return 'l23-' + pad(m[1]);
    if ((m = /^Quiz ([AB]) · Q(\d+)/.exec(src))) return 'w8' + m[1].toLowerCase() + '-' + m[2];
    if ((m = /Lectures 30[–-]31 #(\d+)/.exec(src))) return 'l30-' + pad(m[1]);
    if ((m = /Lectures 32[–-]33 #(\d+)/.exec(src))) return 'l32-' + pad(m[1]);
    if (/^Week 9 · area between \$e\^x/.test(src)) return 'w9a-2';
    if (/^Week 9 · area between \$\\cos/.test(src)) return 'w9a-3';
    return null;
  }
  /* stem=true: the Canvas screenshots without their answer options (the selected radio would give the answer away) */
  function shot(key, stem) {
    const s = S[key]; if (!s) return null;
    const v = (stem && s.q) || s;
    return { src: BASE + v.f, w: v.w, h: v.h, alt: s.alt + (stem && s.q ? ' (answer options hidden)' : '') };
  }
  const forSrc = (src, stem) => (src ? shot(keyFor(src), stem) : null);
  function figure(s, cap) {
    return s ? `<figure class="pdfq"><figcaption>${cap || 'Original question · from the PDF'}</figcaption><img src="${s.src}" width="${s.w}" height="${s.h}" alt="${s.alt}" loading="lazy" decoding="async"></figure>` : '';
  }
  /* click an image to enlarge it over the page (the game stage and lesson stage are scaled down on small screens) */
  const css = document.createElement('style');
  css.textContent = `.pdfq{margin:0;border:1.5px solid var(--rule);border-radius:12px;background:var(--paper);overflow:hidden;text-align:left;flex:none}
.pdfq figcaption{font:700 12px/1 var(--font-display);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:9px 14px 8px;border-bottom:1.5px solid var(--rule)}
.pdfq img{display:block;max-width:100%;height:auto;margin:0 auto;background:#fff;cursor:zoom-in}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .pdfq img{filter:brightness(.9)}}
:root[data-theme="dark"] .pdfq img{filter:brightness(.9)}
.shotbox{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:clamp(10px,3vw,36px);background:rgba(10,14,24,.55);cursor:default}
.shotbox .pdfq{max-width:min(900px,100%);max-height:100%;overflow:auto;box-shadow:0 12px 40px rgba(0,0,0,.35)}
.shotbox .pdfq img{max-width:100%;max-height:none;cursor:default}
.shotbox .pdfq figcaption{position:sticky;top:0;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--paper)}
.shotbox .x{font:500 13px/1 var(--font-display);letter-spacing:0;text-transform:none;color:var(--ink);background:var(--paper);border:1.5px solid var(--rule);border-radius:10px;padding:7px 12px;cursor:pointer;white-space:nowrap;flex:none}`;
  document.head.appendChild(css);
  let box = null;
  function onKey(e) {
    if (e.key === 'Tab') return;
    e.stopPropagation(); e.preventDefault();
    if (e.key === 'Escape') close();
  }
  function close() { if (!box) return; box.remove(); box = null; document.removeEventListener('keydown', onKey, true); }
  function open(s) {
    close();
    box = document.createElement('div'); box.className = 'shotbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Original question from the source PDF');
    box.innerHTML = figure(s, 'Original question · from the PDF <button type="button" class="x">Close ✕</button>');
    box.querySelector('img').loading = 'eager';
    box.addEventListener('click', e => { e.stopPropagation(); if (e.target === box || e.target.closest('.x')) close(); });
    document.body.appendChild(box); document.addEventListener('keydown', onKey, true); box.querySelector('.x').focus();
  }
  document.addEventListener('click', e => {
    const im = e.target.closest && e.target.closest('.pdfq img');
    if (!im || im.closest('.shotbox')) return;
    e.stopPropagation(); e.preventDefault();
    open({ src: im.currentSrc || im.src, w: im.getAttribute('width'), h: im.getAttribute('height'), alt: im.alt });
  }, true);
  window.shotUI = { keyFor, shot, forSrc, figure, open, close, html: (src, stem) => figure(forSrc(src, stem)) };
})();
