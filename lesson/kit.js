/* Kits that compose the repeating slide patterns of the original Trig Substitution lesson
   (type rows, substitution rows, radical derivation, reference triangle, Phase-3 read-off).
   Everything problem-specific is still written by hand in the deck; the kit only removes copy-paste. */
const coef = a => (a === '1' ? '' : a);

function TSKit(o) {
  const type = o.type, v = o.v || 'x', a = o.a, a2 = o.a2, X = o.X || v, rad = o.rad, th = r`\theta`;
  const cf = coef(a), c2 = coef(a2);
  const sub = o.sub || (type === 'I' ? `${v}=${cf}\\sin\\theta` : type === 'II' ? `${v}=${cf}\\tan\\theta` : `${v}=${cf}\\sec\\theta`);
  const dxTex = o.dxTex || (type === 'I' ? `${cf}\\cos\\theta\\,d\\theta` : type === 'II' ? `${cf}\\sec^2\\theta\\,d\\theta` : `${cf}\\sec\\theta\\tan\\theta\\,d\\theta`);
  const x2Tex = type === 'I' ? `${c2}\\sin^2\\theta` : type === 'II' ? `${c2}\\tan^2\\theta` : `${c2}\\sec^2\\theta`;
  const radRes = type === 'I' ? `${cf}\\cos\\theta` : type === 'II' ? `${cf}\\sec\\theta` : `${cf}\\tan\\theta`;
  const form = type === 'I' ? `\\sqrt{a^2-${v}^2}` : type === 'II' ? `\\sqrt{${v}^2+a^2}` : `\\sqrt{${v}^2-a^2}`;
  const idTex = type === 'I' ? r`1-\sin^2\theta=\cos^2\theta` : type === 'II' ? r`\tan^2\theta+1=\sec^2\theta` : r`\sec^2\theta-1=\tan^2\theta`;
  const midA = type === 'I' ? `\\sqrt{${a2}-\\class{cx}{${x2Tex}}}` : type === 'II' ? `\\sqrt{\\class{cx}{${x2Tex}}+${a2}}` : `\\sqrt{\\class{cx}{${x2Tex}}-${a2}}`;
  const midB = type === 'I' ? `\\sqrt{${c2}\\cos^2\\theta}` : type === 'II' ? `\\sqrt{${c2}\\sec^2\\theta}` : `\\sqrt{${c2}\\tan^2\\theta}`;
  const aEq = o.aEq || `a^2=${a2}\\;\\Rightarrow\\;a=${a}`;
  const K = {
    type, v, a, a2, sub, dxTex, x2Tex, radRes, th,
    typeRows: [R('eyebrow', H('eb1', `Type ${type} radical`)), R('side', T('form', form, 'cr')), R('side', T('aval', aEq, 'ca'))],
    subRows: [R('eyebrow', H('eb2', 'Substitution')), R('side', T('xsub', sub, 'cx'))],
    idRows: [R('eyebrow', H('eb3', 'Pythagorean identity')), R('side', T('pyid', idTex, 'ct'))],
    triHead: R('eyebrow', H('eb6', 'Reference triangle')),
    dx: T('dx', 'dx', 'cd'), gdx: G('gdx', 'dx'),
    dxRow: R('work', T('dx', 'dx', 'cd'), EQ('e1'), T('dxv', dxTex, 'cd', { from: 'xsub' })),
    x2Row: (xTok) => R('work', xTok, EQ('x2e'), T('x2a', `(${cf}${type === 'I' ? '\\sin' : type === 'II' ? '\\tan' : '\\sec'}\\theta)^2`, 'cp', { from: 'xsub' }), EQ('x2f'), T('x2b', x2Tex, 'cp')),
    radA: (radTok, ek = 2) => [radTok, EQ('e' + ek), T('r1', midA, 'cr', { from: 'xsub' }), EQ('e' + (ek + 1)), T('r2', midB, 'cr')],
    radB: (radTok, ek = 2) => [...K.radA(radTok, ek), EQ('e' + (ek + 2)), T('r3', radRes, 'cr')],
    tri: s => R('side', TRI('tri', (type === 'I' ? triI : type === 'II' ? triII : triIII)(X, a, rad, s))),
    ratio: R('side', T('trig1', type === 'I' ? `\\sin\\theta=\\frac{\\class{cx}{${X}}}{\\class{ca}{${a}}}=\\frac{\\text{opp}}{\\text{hyp}}` : type === 'II' ? `\\tan\\theta=\\frac{\\class{cx}{${X}}}{\\class{ca}{${a}}}=\\frac{\\text{opp}}{\\text{adj}}` : `\\sec\\theta=\\frac{\\class{cx}{${X}}}{\\class{ca}{${a}}}=\\frac{\\text{hyp}}{\\text{adj}}`)),
    ratioInline: type === 'I' ? `\\sin\\theta=\\tfrac{${X}}{${a}}` : type === 'II' ? `\\tan\\theta=\\tfrac{${X}}{${a}}` : `\\sec\\theta=\\tfrac{${X}}{${a}}`,
    shown: type === 'I' ? ['opp', 'hyp'] : type === 'II' ? ['opp', 'adj'] : ['hyp', 'adj'],
    /* Phase-3 opening: build the triangle, then read it. `anti` is the θ-form main row; `reads` are side rows. */
    phase3(anti, reads, readSay) {
      const A = Array.isArray(anti) ? anti : [anti];
      const labelSay = type === 'I' ? `Since $\\sin\\theta=\\tfrac{\\text{opp}}{\\text{hyp}}$, label the opposite side [[cx:$${X}$]] and the hypotenuse [[ca:$${a}$]].`
        : type === 'II' ? `Since $\\tan\\theta=\\tfrac{\\text{opp}}{\\text{adj}}$, label the opposite side [[cx:$${X}$]] and the adjacent side [[ca:$${a}$]].`
          : `Since $\\sec\\theta=\\tfrac{\\text{hyp}}{\\text{adj}}$, label the hypotenuse [[cx:$${X}$]] and the adjacent side [[ca:$${a}$]].`;
      const thirdSay = type === 'I' ? `The Pythagorean theorem gives the adjacent side: $\\sqrt{${a}^2-${X}^2}$. It is the [[cr:original radical]].`
        : type === 'II' ? `The Pythagorean theorem gives the hypotenuse. This time the [[cr:radical]] is the hypotenuse.`
          : `The Pythagorean theorem gives the opposite side: the [[cr:radical]] again.`;
      return [
        S(3, `Return to the substitution and solve for the trig function: $${sub}$ means $${K.ratioInline}$.`, A, [K.triHead, K.tri([]), K.ratio]),
        S(3, labelSay, A, [K.triHead, K.tri(K.shown), K.ratio]),
        S(3, thirdSay, A, [K.triHead, K.tri(ALL), K.ratio]),
        S(3, readSay || `Read each $\\theta$-expression off the triangle.`, A, [K.triHead, K.tri(ALL), ...reads])
      ];
    }
  };
  return K;
}

/* Heads-up slide: a short boxed caution that appears in the side panel */
const WARN = (k, html) => RICH(k, html, { cls: 'warn' });
