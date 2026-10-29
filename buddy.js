/* Choose-your-character dancer, shared by every page: pick once, then the character dances in the bottom-right corner.
   Both models are Sketchfab embeds (CC BY 4.0, credits shown in the picker). The pick is kept in localStorage; the little swap button re-opens the picker. */
(function () {
  const KEY = 'trigquest.buddy';
  const M = 'https://media.sketchfab.com/models/';
  const CHARS = [
    { id: 'samba', name: 'Samba Stickman', title: 'Stickman Samba Dancing', by: 'adu2763', uid: '329a2840e54e4ad59452cfcb4e53c9a8',
      page: 'https://sketchfab.com/3d-models/stickman-samba-dancing-aka-the-toothless-dance-329a2840e54e4ad59452cfcb4e53c9a8',
      thumb: M + '329a2840e54e4ad59452cfcb4e53c9a8/thumbnails/2713c4ee2b0c4690a29dcb3e4f535045/8835c3ec11014eeca21bde7e7cc79df2.jpeg', spin: 0 },
    /* this model has no animation of its own, so the viewer spins it and the page bounces it */
    { id: 'rick', name: 'Rickoshea', title: 'Rickoshea old', by: 'MAXIDOG_P3D', uid: 'bd553f4312ed44a9903b1ccdd4711e09',
      page: 'https://sketchfab.com/3d-models/rickoshea-old-bd553f4312ed44a9903b1ccdd4711e09',
      thumb: M + 'bd553f4312ed44a9903b1ccdd4711e09/thumbnails/44eb64991f3840a5b32421e53108ed5c/f214ea44686a461780663658d3889874.jpeg', spin: 0.35, bob: true }
  ];
  const store = { get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }, set(v) { try { localStorage.setItem(KEY, v); } catch (e) { } } };
  const embed = c => 'https://sketchfab.com/models/' + c.uid + '/embed?' + new URLSearchParams({
    autostart: 1, preload: 1, transparent: 1, dnt: 1, camera: 0, autospin: c.spin,
    ui_controls: 0, ui_infos: 0, ui_inspector: 0, ui_stop: 0, ui_help: 0, ui_hint: 2, ui_settings: 0, ui_vr: 0, ui_fullscreen: 0,
    ui_annotations: 0, ui_ar: 0, ui_animations: 0, ui_loading: 0, ui_watermark: 0, ui_watermark_link: 0 });

  const css = document.createElement('style');
  /* the embed is drawn at twice the size and scaled down, so Sketchfab's fixed-size hint and logo shrink with it and stay below the character */
  css.textContent = `.buddy{position:fixed;right:8px;bottom:8px;width:160px;height:200px;z-index:500;pointer-events:none}
.buddy iframe{position:absolute;left:0;top:0;width:200%;height:200%;border:0;background:transparent;color-scheme:normal;pointer-events:none;transform:scale(.5);transform-origin:0 0}
.buddy.bob{transform-origin:50% 100%;animation:buddy-bob .62s ease-in-out infinite}
@keyframes buddy-bob{0%,100%{transform:translateY(0) rotate(-5deg)}25%{transform:translateY(-12px) rotate(0)}50%{transform:translateY(0) rotate(5deg)}75%{transform:translateY(-12px) rotate(0)}}
@media (prefers-reduced-motion:reduce){.buddy.bob{animation:none}}
.buddy .swap{position:absolute;top:2px;right:2px;width:26px;height:26px;padding:0;border-radius:50%;font:700 14px/1 var(--font-display,var(--fd,system-ui));opacity:.55;pointer-events:auto}
.buddy .swap:hover,.buddy .swap:focus-visible{opacity:1}
@media (max-width:700px){.buddy{width:96px;height:122px}}
.buddypick{position:fixed;inset:0;z-index:3000;display:grid;place-items:center;padding:16px;background:rgba(10,14,24,.6)}
.buddypick .card{width:min(560px,100%);box-sizing:border-box;padding:22px;text-align:center;background:var(--paper,#FBFCFE);color:var(--ink,#172033);border:1.5px solid var(--rule,#D9DFE9);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.35);font-family:var(--font-body,var(--fb,system-ui,sans-serif))}
.buddypick h2{margin:0 0 14px;font:700 26px/1.2 var(--font-display,var(--fd,system-ui))}
.buddypick .opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.buddypick .opt{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px;border:2px solid var(--rule,#D9DFE9);border-radius:12px;background:var(--paper,#FBFCFE);color:var(--ink,#172033);font:600 16px/1.2 var(--font-display,var(--fd,system-ui));cursor:pointer}
.buddypick .opt:hover,.buddypick .opt:focus-visible{border-color:var(--accent,#3346C8);outline:none}
.buddypick .opt img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;background:#222}
.buddypick .credit{margin:14px 0 0;font-size:12px;line-height:1.5;color:var(--muted,#6A7488)}
.buddypick .credit a{color:inherit}`;
  document.head.appendChild(css);

  let corner = null, picker = null;
  function mount(c) {
    if (!corner) {
      corner = document.createElement('div');
      corner.innerHTML = '<iframe title="Dancing character" tabindex="-1" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe><button type="button" class="swap" title="Change character" aria-label="Change character">⇄</button>';
      corner.querySelector('.swap').addEventListener('click', e => { e.stopPropagation(); pick(); });
      document.body.appendChild(corner);
    }
    corner.className = 'buddy' + (c.bob ? ' bob' : '');
    corner.querySelector('iframe').src = embed(c);
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
    picker = document.createElement('div'); picker.className = 'buddypick'; picker.setAttribute('role', 'dialog'); picker.setAttribute('aria-modal', 'true'); picker.setAttribute('aria-label', 'Choose your character');
    picker.innerHTML = '<div class="card"><h2>Choose your character</h2><div class="opts">' +
      CHARS.map(c => `<button type="button" class="opt" data-id="${c.id}"><img src="${c.thumb}" alt="" width="256" height="256">${c.name}</button>`).join('') +
      '</div><p class="credit">' + CHARS.map(c => `${c.name}: <a href="${c.page}" target="_blank" rel="noopener">“${c.title}”</a> by ${c.by}`).join(' · ') + ' · CC BY 4.0, via Sketchfab</p></div>';
    picker.addEventListener('click', e => {
      e.stopPropagation();
      const b = e.target.closest('.opt'); if (!b) return;
      store.set(b.dataset.id); picker.remove(); picker = null; document.removeEventListener('keydown', onKey, true);
      mount(CHARS.find(c => c.id === b.dataset.id));
    });
    document.body.appendChild(picker); document.addEventListener('keydown', onKey, true); picker.querySelector('.opt').focus();
  }
  const saved = CHARS.find(c => c.id === store.get());
  if (saved) mount(saved); else pick();
})();
