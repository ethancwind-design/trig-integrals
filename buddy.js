/* Choose-your-character, shared by every page: pick one once, then it sits in the bottom-right corner (static, no animation).
   The ten characters are Kenney's CC0 Animal Pack (img/chars/); CHARS below lists them as { id, name, img }. While it is empty the picker is skipped.
   The pick is kept in localStorage; the small ⇄ button re-opens the picker.
   The Dopamine Music Button plays the Brawl Stars menu theme through a YouTube embed (see MUSIC; it is an unofficial upload). */
(function () {
  const KEY = 'trigquest.buddy';
  const MUSIC = { id: 'oH_Cgrkz_Lk', title: 'Brawl Stars OST | OG Classic | Menu Music', by: 'Blast Brawl' };
  const BASE = document.currentScript ? new URL('.', document.currentScript.src).href : '';
  /* Kenney's CC0 Animal Pack (round style), copied to img/chars/ */
  const CHARS = ['giraffe', 'panda', 'parrot', 'penguin', 'monkey', 'rabbit', 'snake', 'hippo', 'pig', 'elephant']
    .map(id => ({ id, name: id[0].toUpperCase() + id.slice(1), img: BASE + 'img/chars/' + id + '.png' }));
  const store = { get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }, set(v) { try { localStorage.setItem(KEY, v); } catch (e) { } } };

  const css = document.createElement('style');
  css.textContent = `.buddy{position:fixed;right:8px;bottom:8px;z-index:500;display:flex;flex-direction:column;align-items:flex-end;gap:6px;pointer-events:none}
.buddy .row{display:flex;align-items:flex-end;gap:8px}
.buddy .sit{position:relative;width:110px;height:110px}
.buddy .sit img{display:block;width:100%;height:100%;object-fit:contain;object-position:bottom;user-select:none}
.buddy .tune{pointer-events:auto;margin-bottom:6px;padding:8px 12px;border-radius:999px;font:600 13px/1 var(--font-display,var(--fd,system-ui));white-space:nowrap}
.buddy .tune[aria-pressed="true"]{background:var(--accent,#3346C8);border-color:transparent;color:#fff}
.buddy .swap{position:absolute;top:0;right:0;width:26px;height:26px;padding:0;border-radius:50%;font:700 14px/1 var(--font-display,var(--fd,system-ui));opacity:.55;pointer-events:auto}
.buddy .swap:hover,.buddy .swap:focus-visible{opacity:1}
.buddy .player{width:200px;height:200px;overflow:hidden;border-radius:12px;background:#000;box-shadow:0 6px 20px rgba(0,0,0,.3);pointer-events:auto}
.buddy .player[hidden]{display:none}
.buddy .player iframe{display:block;width:100%;height:100%;border:0}
@media (max-width:700px){.buddy .sit{width:76px;height:76px}.buddy .tune{font-size:12px;padding:7px 10px}}
.buddypick{position:fixed;inset:0;z-index:3000;display:grid;place-items:center;padding:16px;overflow:auto;background:rgba(10,14,24,.6)}
.buddypick .card{width:min(740px,100%);box-sizing:border-box;padding:22px;text-align:center;background:var(--paper,#FBFCFE);color:var(--ink,#172033);border:1.5px solid var(--rule,#D9DFE9);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.35);font-family:var(--font-body,var(--fb,system-ui,sans-serif))}
.buddypick h2{margin:0 0 14px;font:700 26px/1.2 var(--font-display,var(--fd,system-ui))}
.buddypick .opts{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
@media (max-width:560px){.buddypick .opts{grid-template-columns:repeat(2,1fr)}}
.buddypick .opt{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 6px 8px;border:2px solid var(--rule,#D9DFE9);border-radius:12px;background:var(--paper,#FBFCFE);color:var(--ink,#172033);font:600 15px/1.2 var(--font-display,var(--fd,system-ui));cursor:pointer}
.buddypick .opt:hover,.buddypick .opt:focus-visible{border-color:var(--accent,#3346C8);outline:none}
.buddypick .opt img{display:block;width:80%;aspect-ratio:1;object-fit:contain}
.buddypick .credit{margin:14px 0 0;font-size:12px;line-height:1.5;color:var(--muted,#6A7488)}
.buddypick .credit a{color:inherit}`;
  document.head.appendChild(css);

  let dock = null, picker = null;
  function tune() {
    const btn = dock.querySelector('.tune'), pl = dock.querySelector('.player');
    if (pl.firstChild) { pl.innerHTML = ''; pl.hidden = true; btn.setAttribute('aria-pressed', 'false'); return; }
    /* the player stays visible while the music plays (YouTube's embed rules do not allow hiding it) */
    pl.innerHTML = `<iframe title="${MUSIC.title}" src="https://www.youtube.com/embed/${MUSIC.id}?autoplay=1&loop=1&playlist=${MUSIC.id}&rel=0&playsinline=1&modestbranding=1" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    pl.hidden = false; btn.setAttribute('aria-pressed', 'true');
  }
  function mount(c) {
    if (!dock) {
      dock = document.createElement('div'); dock.className = 'buddy';
      dock.innerHTML = '<div class="player" hidden></div><div class="row"><button type="button" class="tune" aria-pressed="false">♪ Dopamine Music Button</button><div class="sit"><button type="button" class="swap" title="Change brawler" aria-label="Change brawler">⇄</button></div></div>';
      dock.querySelector('.tune').addEventListener('click', e => { e.stopPropagation(); tune(); });
      dock.querySelector('.swap').addEventListener('click', e => { e.stopPropagation(); pick(); });
      document.body.appendChild(dock);
    }
    const sit = dock.querySelector('.sit'); sit.querySelectorAll('img').forEach(i => i.remove());
    if (c) sit.insertAdjacentHTML('afterbegin', `<img src="${c.img}" alt="${c.name}" draggable="false">`);
    sit.hidden = !c;
  }
  function onKey(e) {
    if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') return;
    e.stopPropagation(); e.preventDefault();
    const o = [...picker.querySelectorAll('.opt')], i = o.indexOf(document.activeElement);
    if (e.key === 'ArrowRight') o[(i + 1) % o.length].focus();
    if (e.key === 'ArrowLeft') o[(i + o.length - 1) % o.length].focus();
  }
  function pick() {
    if (picker) return;
    picker = document.createElement('div'); picker.className = 'buddypick'; picker.setAttribute('role', 'dialog'); picker.setAttribute('aria-modal', 'true'); picker.setAttribute('aria-label', 'Choose your brawler');
    picker.innerHTML = '<div class="card"><h2>Choose your brawler</h2><div class="opts">' +
      CHARS.map(c => `<button type="button" class="opt" data-id="${c.id}"><img src="${c.img}" alt="" draggable="false">${c.name}</button>`).join('') +
      `</div><p class="credit">Characters: <a href="https://opengameart.org/content/animal-pack" target="_blank" rel="noopener">Animal Pack</a> by Kenney (CC0). ` +
      `The Dopamine Music Button plays the Brawl Stars menu theme from YouTube (“${MUSIC.title}” by ${MUSIC.by}, an unofficial upload) and is not affiliated with or endorsed by Supercell.</p></div>`;
    picker.addEventListener('click', e => {
      e.stopPropagation();
      const b = e.target.closest('.opt'); if (!b) return;
      store.set(b.dataset.id); picker.remove(); picker = null; document.removeEventListener('keydown', onKey, true);
      mount(CHARS.find(c => c.id === b.dataset.id));
    });
    document.body.appendChild(picker); document.addEventListener('keydown', onKey, true); picker.querySelector('.opt').focus();
  }
  const saved = CHARS.find(c => c.id === store.get());
  if (saved) mount(saved); else if (CHARS.length) pick(); else mount(null);
})();
