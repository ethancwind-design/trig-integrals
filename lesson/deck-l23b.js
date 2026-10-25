/* Lecture 23 · problems 6-9 (+ the two (a²±x²)^{3/2} families used again for 13 and 16) */

/* ===== Problem 6 ===== */
examples.push({ n: 6, label: 'Problem 6', type: 'Powers of secant · rewrite in x', verb: 'Find', problem: r`\int\sec^4(5\theta)\,d\theta`, phases: ['Rewrite', 'Integrate', 'Back to x'],
  track: [r`\tfrac15\int(1+u^2)\,du`, r`\tfrac15\tan5\theta+\tfrac1{15}\tan^35\theta+C`, r`\frac{\sqrt{x^2-4}}{10}+\frac{(x^2-4)^{3/2}}{120}+C`],
  verify: [{ anti: { F: t => Math.tan(5 * t) / 5 + Math.pow(Math.tan(5 * t), 3) / 15, f: t => Math.pow(1 / Math.cos(5 * t), 4), range: [0.05, 0.25] } },
    { equal: { a: t => Math.tan(5 * t) / 5 + Math.pow(Math.tan(5 * t), 3) / 15, b: t => { const x = 2 / Math.cos(5 * t); return Math.sqrt(x * x - 4) / 10 + Math.pow(x * x - 4, 1.5) / 120; }, range: [0.05, 0.25] } }],
  steps: (() => {
    const th = r`\theta`, dth = T('dth', r`d\theta`, 'cd');
    const sec4 = T('sec4', r`\sec^4(5\theta)`, 'ct');
    const sA = T('sA', r`\sec^2(5\theta)`, 'ct', { from: 'sec4' }), sB = T('sB', r`\sec^2(5\theta)`, 'cd', { from: 'sec4' });
    const oneTan = T('sA', r`\big(1+\tan^2(5\theta)\big)`, 'ct', { from: 'sA' });
    const oneU = T('sA', r`(1+u^2)`, 'ct', { from: 'sA' });
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('usub', r`u=\tan5\theta`, 'cx')), R('side', T('du', r`du=5\sec^2(5\theta)\,d\theta`, 'cd')), R('side', T('dur', r`\sec^2(5\theta)\,d\theta=\tfrac{du}{5}`, 'cd'))];
    const idRows = [eyebrow('eb3', 'Pythagorean identity'), R('side', T('pyid', r`\sec^2\varphi=1+\tan^2\varphi`, 'ct'))];
    const p1top = R('big', T('k', r`\tfrac15`, 'ink', { from: 'sB' }), int, oneU, T('sB', r`du`, 'cd'));
    const known = [eyebrow('eb4', 'Power rule'), R('side', T('id1', r`\int u^n\,du=\tfrac{u^{n+1}}{n+1}`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\tfrac15\Big[u+\tfrac{u^3}{3}\Big]+C`));
    const L2 = R('line', EQ('p2'), T('p2t', r`\tfrac15u+\tfrac1{15}u^3+C`));
    const tri = s => R('side', TRI('tri', { ...triIII('x', '2', r`\sqrt{x^2-4}`, s), angle: r`5\theta` }));
    const triHead = eyebrow('eb6', 'Reference triangle for 5θ');
    const ratio = R('side', T('trig1', r`\sec5\theta=\frac{\class{cx}{x}}{\class{ca}{2}}=\frac{\text{hyp}}{\text{adj}}`));
    const rd = R('side', T('rd1', r`\tan5\theta=\frac{\text{opp}}{\text{adj}}=\frac{\sqrt{x^2-4}}{2}`, 'ct'));
    const fin1 = R('line', EQ('v1'), T('v1t', r`\tfrac15\cdot\frac{\sqrt{x^2-4}}{2}+\tfrac1{15}\left(\frac{\sqrt{x^2-4}}{2}\right)^3+C`));
    const fin2 = R('line', EQ('v2'), T('v2t', r`\frac{\sqrt{x^2-4}}{10}+\frac{(x^2-4)^{3/2}}{120}+C`, 'ink', { cls: 'boxed' }));
    const A0 = R('big', T('tn1', r`\tfrac15\tan5\theta`, 'ct', { from: 'p2t' }), T('pl', '+', 'ink', { from: 'p2t' }), T('tn3', r`\tfrac1{15}\tan^35\theta`, 'ct', { from: 'p2t' }), T('c', '+C', 'ink', { from: 'p2t' }));
    const A = R('big', T('tn1', r`\tfrac15\tan5\theta`, 'ct'), T('pl', '+', 'ink'), T('tn3', r`\tfrac1{15}\tan^35\theta`, 'ct'), T('c', '+C', 'ink'));
    const B = R('big', T('tn1', r`\tfrac15\cdot\tfrac{\sqrt{x^2-4}}{2}`, 'cr', { from: 'rd1' }), T('pl', '+', 'ink'), T('tn3', r`\tfrac1{15}\Big(\tfrac{\sqrt{x^2-4}}{2}\Big)^3`, 'cr', { from: 'rd1' }), T('c', '+C', 'ink'));
    return [
      S(1, r`An even power of secant. The recipe: save one $\sec^2$ for the $du$ and turn the other into tangents.`, [R('big', int, sec4, dth)]),
      S(1, r`Split $\sec^4(5\theta)=\sec^2(5\theta)\cdot\sec^2(5\theta)$. One factor is the [[cd:saved partner]].`, [R('big', int, sA, sB, dth)]),
      S(1, r`Convert the other factor with the Pythagorean identity: $\sec^2(5\theta)=1+\tan^2(5\theta)$.`, [R('big', int, oneTan, sB, dth)], idRows),
      S(1, r`Let [[cx:$u=\tan5\theta$]]. The chain rule gives $du=5\sec^2(5\theta)\,d\theta$, so the saved factor is $\tfrac{du}{5}$.`, [R('big', int, oneTan, sB, dth)], subRows),
      S(1, r`Replace everything: $\tan5\theta$ becomes $u$ and $\sec^2(5\theta)\,d\theta$ becomes $\tfrac15du$.`, [p1top], subRows),
      S(2, r`Expand and integrate with the power rule: $\int(1+u^2)\,du=u+\tfrac{u^3}{3}$.`, [p1top, L1], known),
      S(2, r`Distribute the $\tfrac15$.`, [p1top, L1, L2], known),
      S(3, r`Undo the substitution with $u=\tan5\theta$. That answers part (a).`, [A0], []),
      S(3, r`Part (b): $x=2\sec(5\theta)$ means $\sec5\theta=\tfrac x2$. Build the reference triangle for the angle $5\theta$.`, [A], [triHead, tri([]), ratio]),
      S(3, r`Since $\sec5\theta=\tfrac{\text{hyp}}{\text{adj}}$, label the hypotenuse [[cx:$x$]] and the adjacent side [[ca:$2$]].`, [A], [triHead, tri(['hyp', 'adj']), ratio]),
      S(3, r`The Pythagorean theorem gives the opposite side: $\sqrt{x^2-2^2}=\sqrt{x^2-4}$.`, [A], [triHead, tri(ALL), ratio]),
      S(3, r`We need $\tan5\theta=\tfrac{\text{opp}}{\text{adj}}$.`, [A], [triHead, tri(ALL), rd]),
      S(3, r`Swap it into both terms.`, [B], [triHead, tri(ALL), rd]),
      S(3, r`Cube the second term: $\tfrac1{15}\cdot\tfrac{(x^2-4)^{3/2}}{8}=\tfrac{(x^2-4)^{3/2}}{120}$.`, [B, fin1, fin2], [triHead, tri(ALL), rd]),
    ];
  })(),
  heli: [[ln(r`\sec^4=\sec^2\cdot(1+\tan^2)`, 'ct'), ln(r`u=\tan5\theta,\;du=5\sec^2(5\theta)\,d\theta`, 'cx'), ln(r`=\tfrac15\int(1+u^2)\,du`, 'ct')],
  [ln(r`\tfrac15\Big[u+\tfrac{u^3}{3}\Big]+C`, 'ct'), ln(r`=\tfrac15\tan5\theta+\tfrac1{15}\tan^35\theta+C`, 'ct')],
  [{ tri: { ...triIII('x', '2', r`\sqrt{x^2-4}`, ALL), angle: r`5\theta` } }, ln(r`\tan5\theta=\tfrac{\sqrt{x^2-4}}{2}`), bx(r`\frac{\sqrt{x^2-4}}{10}+\frac{(x^2-4)^{3/2}}{120}+C`)]] });

/* ===== Problem 7 ===== */
examples.push({ n: 7, label: 'Problem 7', type: 'Mixed powers · rewrite in x', verb: 'Find', problem: r`\int\cos^3(2\theta)\sin^2(2\theta)\,d\theta`, phases: ['Rewrite', 'Integrate', 'Back to x'],
  track: [r`\tfrac12\int(1-u^2)\,u^2\,du`, r`\tfrac16\sin^32\theta-\tfrac1{10}\sin^52\theta+C`, r`\frac{(25-x^2)^{3/2}}{750}-\frac{(25-x^2)^{5/2}}{31250}+C`],
  verify: [{ anti: { F: t => Math.pow(Math.sin(2 * t), 3) / 6 - Math.pow(Math.sin(2 * t), 5) / 10, f: t => Math.pow(Math.cos(2 * t), 3) * Math.pow(Math.sin(2 * t), 2), range: [0.1, 1.2] } },
    { equal: { a: t => Math.pow(Math.sin(2 * t), 3) / 6 - Math.pow(Math.sin(2 * t), 5) / 10, b: t => { const x = 5 * Math.cos(2 * t); return Math.pow(25 - x * x, 1.5) / 750 - Math.pow(25 - x * x, 2.5) / 31250; }, range: [0.1, 1.2] } }],
  steps: (() => {
    const dth = T('dth', r`d\theta`, 'cd');
    const c3 = T('c3', r`\cos^3(2\theta)`, 'ct'), s2 = T('s2', r`\sin^2(2\theta)`, 'cp');
    const c2 = T('c3', r`\cos^2(2\theta)`, 'ct', { from: 'c3' }), c1 = T('c1', r`\cos(2\theta)`, 'cd', { from: 'c3' });
    const oneS = T('c3', r`\big(1-\sin^2(2\theta)\big)`, 'ct', { from: 'c3' });
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('usub', r`u=\sin2\theta`, 'cx')), R('side', T('du', r`du=2\cos(2\theta)\,d\theta`, 'cd')), R('side', T('dur', r`\cos(2\theta)\,d\theta=\tfrac{du}{2}`, 'cd'))];
    const idRows = [eyebrow('eb3', 'Pythagorean identity'), R('side', T('pyid', r`\cos^2\varphi=1-\sin^2\varphi`, 'ct'))];
    const p1top = R('big', T('k', r`\tfrac12`, 'ink', { from: 'c1' }), int, T('c3', r`(1-u^2)`, 'ct', { from: 'c3' }), T('s2', r`u^2`, 'cp', { from: 's2' }), T('c1', r`du`, 'cd', { from: 'c1' }));
    const known = [eyebrow('eb4', 'Power rule'), R('side', T('id1', r`\int u^n\,du=\tfrac{u^{n+1}}{n+1}`, 'ct'))];
    const L0 = R('line', EQ('p0'), T('p0t', r`\tfrac12\int(u^2-u^4)\,du`));
    const L1 = R('line', EQ('p1'), T('p1t', r`\tfrac12\Big[\tfrac{u^3}{3}-\tfrac{u^5}{5}\Big]+C`));
    const L2 = R('line', EQ('p2'), T('p2t', r`\tfrac16u^3-\tfrac1{10}u^5+C`));
    const A = R('big', T('t1', r`\tfrac16\sin^32\theta`, 'ct', { from: 'p2t' }), T('mi', '-', 'ink', { from: 'p2t' }), T('t2', r`\tfrac1{10}\sin^52\theta`, 'ct', { from: 'p2t' }), T('c', '+C', 'ink', { from: 'p2t' }));
    const tri = s => R('side', TRI('tri', { adj: side('x', 'cx'), hyp: side('5', 'ca'), opp: side(r`\sqrt{25-x^2}`, 'cr'), show: s, angle: r`2\theta` }));
    const triHead = eyebrow('eb6', 'Reference triangle for 2θ');
    const ratio = R('side', T('trig1', r`\cos2\theta=\frac{\class{cx}{x}}{\class{ca}{5}}=\frac{\text{adj}}{\text{hyp}}`));
    const rd = R('side', T('rd1', r`\sin2\theta=\frac{\text{opp}}{\text{hyp}}=\frac{\sqrt{25-x^2}}{5}`, 'ct'));
    const B = R('big', T('t1', r`\tfrac16\Big(\tfrac{\sqrt{25-x^2}}{5}\Big)^3`, 'cr', { from: 'rd1' }), T('mi', '-', 'ink'), T('t2', r`\tfrac1{10}\Big(\tfrac{\sqrt{25-x^2}}{5}\Big)^5`, 'cr', { from: 'rd1' }), T('c', '+C', 'ink'));
    const fin = R('line', EQ('v1'), T('v1t', r`\frac{(25-x^2)^{3/2}}{750}-\frac{(25-x^2)^{5/2}}{31250}+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`An odd power of cosine. The recipe: save one $\cos(2\theta)$ for the $du$ and turn the remaining even power into sines.`, [R('big', int, c3, s2, dth)]),
      S(1, r`Split $\cos^3(2\theta)=\cos^2(2\theta)\cdot\cos(2\theta)$. The single cosine is the [[cd:saved partner]].`, [R('big', int, c2, c1, s2, dth)]),
      S(1, r`Convert the even power: $\cos^2(2\theta)=1-\sin^2(2\theta)$.`, [R('big', int, oneS, c1, s2, dth)], idRows),
      S(1, r`Let [[cx:$u=\sin2\theta$]]. The chain rule gives $du=2\cos(2\theta)\,d\theta$, so $\cos(2\theta)\,d\theta=\tfrac{du}{2}$.`, [R('big', int, oneS, c1, s2, dth)], subRows),
      S(1, r`Replace everything: $\sin^2(2\theta)$ becomes $u^2$, and the saved factor becomes $\tfrac12du$.`, [p1top], subRows),
      S(2, r`Distribute $u^2$ and integrate with the power rule.`, [p1top, L0], known),
      S(2, r`$\int u^2\,du=\tfrac{u^3}{3}$ and $\int u^4\,du=\tfrac{u^5}{5}$.`, [p1top, L0, L1], known),
      S(2, r`Distribute the $\tfrac12$.`, [p1top, L0, L1, L2], known),
      S(3, r`Undo the substitution with $u=\sin2\theta$. That answers part (a).`, [A], []),
      S(3, r`Part (b): $x=5\cos(2\theta)$ means $\cos2\theta=\tfrac x5$. Build the reference triangle for the angle $2\theta$.`, [A], [triHead, tri([]), ratio]),
      S(3, r`Since $\cos2\theta=\tfrac{\text{adj}}{\text{hyp}}$, label the adjacent side [[cx:$x$]] and the hypotenuse [[ca:$5$]].`, [A], [triHead, tri(['adj', 'hyp']), ratio]),
      S(3, r`The Pythagorean theorem gives the opposite side: $\sqrt{25-x^2}$.`, [A], [triHead, tri(ALL), ratio]),
      S(3, r`We need $\sin2\theta=\tfrac{\text{opp}}{\text{hyp}}$.`, [A], [triHead, tri(ALL), rd]),
      S(3, r`Swap it into both terms.`, [B], [triHead, tri(ALL), rd]),
      S(3, r`Raise to the powers: $\tfrac16\cdot\tfrac1{5^3}=\tfrac1{750}$ and $\tfrac1{10}\cdot\tfrac1{5^5}=\tfrac1{31250}$.`, [B, fin], [triHead, tri(ALL), rd]),
    ];
  })(),
  heli: [[ln(r`\cos^3=\cos^2\cdot\cos=(1-\sin^2)\cos`, 'ct'), ln(r`u=\sin2\theta,\;du=2\cos2\theta\,d\theta`, 'cx'), ln(r`=\tfrac12\int(1-u^2)\,u^2\,du`, 'ct')],
  [ln(r`\tfrac12\Big[\tfrac{u^3}{3}-\tfrac{u^5}{5}\Big]+C`, 'ct'), ln(r`=\tfrac16\sin^32\theta-\tfrac1{10}\sin^52\theta+C`, 'ct')],
  [{ tri: { adj: side('x', 'cx'), hyp: side('5', 'ca'), opp: side(r`\sqrt{25-x^2}`, 'cr'), show: ALL, angle: r`2\theta` } }, ln(r`\sin2\theta=\tfrac{\sqrt{25-x^2}}{5}`), bx(r`\frac{(25-x^2)^{3/2}}{750}-\frac{(25-x^2)^{5/2}}{31250}+C`)]] });

/* ───────── family: ∫ c/(a²−x²)^{3/2} dx  (Type I)  — problems 8 and 13 ───────── */
function fam32I(cfg) {
  const { n, c, a, a2, a3, kTex } = cfg;
  const radTex = `\\sqrt{${a2}-x^2}`;
  return {
    n, label: 'Problem ' + n, type: 'Type I', verb: 'Evaluate', problem: `\\int\\frac{${c}}{(${a2}-x^2)^{3/2}}\\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
    track: [r`\int\sec^2\theta\,d\theta`, r`\tan\theta+C`, `\\frac{x}{\\sqrt{${a2}-x^2}}+C`],
    verify: [{ anti: { F: x => x / Math.sqrt(+cfg.a2n - x * x), f: x => cfg.cn / Math.pow(+cfg.a2n - x * x, 1.5), range: [-0.9 * Math.sqrt(+cfg.a2n), 0.9 * Math.sqrt(+cfg.a2n)] } }],
    steps: (() => {
      const K = TSKit({ type: 'I', a, a2, rad: radTex, aEq: cfg.aEq });
      const cT = T('c', c), dx = K.dx, gdx = K.gdx, pw = T('pw', `(${a2}-x^2)^{3/2}`, 'cp');
      const lp = T('lp', r`\Big(`, 'ink', { from: 'pw' }), rad = T('rad', radTex, 'cr', { from: 'pw' }), rp = T('rp', r`\Big)^{3}`, 'ink', { from: 'pw' });
      const grad = G('grad', radTex), rA = K.radA(rad), rB = K.radB(rad);
      const dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
      const k = T('k', kTex, 'ink', { from: 'r3' });
      const sec2 = R('big', k, int, T('r3', r`\sec^2\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
      const known = [eyebrow('eb4', 'Basic antiderivative'), R('side', T('id1', r`\int\sec^2\theta\,d\theta=\tan\theta+C`, 'ct'))];
      const L1 = R('line', EQ('p1'), T('p1t', r`\tan\theta+C`));
      const anti = tn => R('big', tn, T('b2', '+C', 'ink', { from: 'p1t' }));
      const tn0 = T('tn', r`\tan\theta`, 'ct', { from: 'p1t' });
      const rd = R('side', T('rd1', `\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}=\\frac{x}{\\sqrt{${a2}-x^2}}`, 'ct'));
      const swapped = anti(T('tn', `\\frac{x}{\\sqrt{${a2}-x^2}}`, 'cr', { from: 'rd1' }));
      return [
        S(1, `A fractional exponent hides a radical: $(${a2}-x^2)^{3/2}=\\big(\\sqrt{${a2}-x^2}\\big)^3$.`, [bigF([cT, dx], [pw])]),
        S(1, r`Rewrite the [[cp:power]] as the cube of a [[cr:square root]].`, [bigF([cT, dx], [lp, rad, rp])]),
        S(1, `The radical matches $\\sqrt{a^2-x^2}$ with $a^2=${a2}$, so $a=${a}$: Type I.`, [bigF([cT, dx], [lp, rad, rp])], K.typeRows),
        S(1, `Type I uses $x=a\\sin\\theta$, so [[cx:$${K.sub}$]].`, [bigF([cT, dx], [lp, rad, rp])], [...K.typeRows, ...K.subRows]),
        S(1, `Replace [[cd:$dx$]]: $dx=${K.dxTex}$.`, [bigF([cT, gdx], [lp, rad, rp]), K.dxRow], K.subRows),
        S(1, `Inside the [[cr:radical]]: $${a2}-${a2}\\sin^2\\theta=${a2}\\cos^2\\theta$.`, [bigF([cT, gdx], [lp, grad, rp]), K.dxRow, R('work', ...rA)], [...K.subRows, ...K.idRows]),
        S(1, `So $\\sqrt{${a2}-x^2}=${K.radRes}$, because $\\cos\\theta\\ge0$ for $-\\tfrac\\pi2\\le\\theta\\le\\tfrac\\pi2$.`, [bigF([cT, gdx], [lp, grad, rp]), K.dxRow, R('work', ...rB)], [...K.subRows, ...K.idRows]),
        S(1, r`Both replacements return to the integral.`, [bigF([cT, dxv], [lp, r3, rp])], K.subRows),
        S(1, `Cube it: $(${K.radRes})^3=${a3}\\cos^3\\theta$.`, [bigF([cT, dxv], [T('r3', `${a3}\\cos^3\\theta`, 'cr')])], K.subRows),
        S(1, cfg.constSay, [R('big', k, int, F('f', [T('dxv', r`\cos\theta\,d\theta`, 'cd')], [T('r3', r`\cos^3\theta`, 'cr')]))], K.subRows),
        S(1, r`The constants reduce to 1, and one $\cos\theta$ cancels: $\tfrac{\cos\theta}{\cos^3\theta}=\tfrac1{\cos^2\theta}$.`, [R('big', int, F('f', [T('dxv', r`d\theta`, 'cd')], [T('r3', r`\cos^2\theta`, 'cr')]))], K.subRows),
        S(1, r`Since $\tfrac1{\cos^2\theta}=\sec^2\theta$, Phase 1 ends with $\int\sec^2\theta\,d\theta$.`, [R('big', int, T('r3', r`\sec^2\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'))], K.subRows),
        S(2, r`A basic antiderivative: the derivative of $\tan\theta$ is $\sec^2\theta$.`, [R('big', int, T('r3', r`\sec^2\theta`, 'ct'), T('dxv', r`d\theta`, 'cd')), L1], known),
        ...K.phase3(anti(tn0), [rd], r`We need $\tan\theta=\tfrac{\text{opp}}{\text{adj}}$.`),
        S(3, r`Swap it in. That is the antiderivative in $x$.`, [swapped], [K.triHead, K.tri(ALL), rd]),
      ];
    })(),
    heli: [[ln(`x=${a}\\sin\\theta`, 'cx'), ln(`dx=${K0(cfg).dxTex}`, 'cd'), ln(`(${a2}-x^2)^{3/2}=${a3}\\cos^3\\theta`, 'cr'), ln(r`=\int\sec^2\theta\,d\theta`, 'ct')],
    [ln(r`\int\sec^2\theta\,d\theta`), ln(r`=\tan\theta+C`, 'ct')],
    [{ tri: triI('x', a, radTex, ALL) }, ln(r`\tan\theta=\tfrac{\text{opp}}{\text{adj}}`), bx(`\\frac{x}{\\sqrt{${a2}-x^2}}+C`)]]
  };
}
const K0 = cfg => TSKit({ type: cfg.type || 'I', a: cfg.a, a2: cfg.a2, rad: 'x' });

examples.push(fam32I({ n: 8, c: '5', a: r`\sqrt5`, a2: '5', a3: r`5\sqrt5`, aEq: r`a^2=5\;\Rightarrow\;a=\sqrt5`, a2n: 5, cn: 5,
  kTex: r`\frac{5\cdot\sqrt5}{5\sqrt5}`, constSay: r`Pull out the constants: $\tfrac{5\cdot\sqrt5}{5\sqrt5}$.` }));

/* ───────── family: ∫ c/(a²+x²)^{3/2} dx  (Type II)  — problems 9 and 16 ───────── */
function fam32II(cfg) {
  const { n, c, a, a2, a3, kTex, kRed } = cfg;
  const radTex = `\\sqrt{${a2}+x^2}`, radTexXF = `\\sqrt{x^2+${a2}}`;
  const powTex = cfg.powTex || `(${a2}+x^2)^{3/2}`;
  return {
    n, label: 'Problem ' + n, type: 'Type II', verb: 'Evaluate', problem: `\\int\\frac{${c}}{${powTex}}\\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
    track: [`${kRed}\\int\\cos\\theta\\,d\\theta`, `${kRed}\\sin\\theta+C`, `\\frac{${kRed}x}{\\sqrt{${cfg.radIn}}}+C`],
    verify: [{ anti: { F: x => cfg.kn * x / Math.sqrt(+cfg.a2n + x * x), f: x => cfg.cn / Math.pow(+cfg.a2n + x * x, 1.5), range: [-3, 3] } }],
    steps: (() => {
      const K = TSKit({ type: 'II', a, a2, rad: cfg.radIn.startsWith('x') ? `\\sqrt{${cfg.radIn}}` : `\\sqrt{${cfg.radIn}}`, aEq: cfg.aEq });
      const radShow = cfg.radIn.startsWith('x') ? radTexXF : radTex;
      const cT = T('c', c), dx = K.dx, gdx = K.gdx, pw = T('pw', powTex, 'cp');
      const lp = T('lp', r`\Big(`, 'ink', { from: 'pw' }), rad = T('rad', `\\sqrt{${cfg.radIn}}`, 'cr', { from: 'pw' }), rp = T('rp', r`\Big)^{3}`, 'ink', { from: 'pw' });
      const grad = G('grad', `\\sqrt{${cfg.radIn}}`), rA = K.radA(rad), rB = K.radB(rad);
      const dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
      const k = T('k', kTex, 'ink', { from: 'r3' });
      const kk = kRed ? [T('k', kRed)] : [];
      const cosTop = R('big', ...kk, int, T('r3', r`\cos\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
      const known = [eyebrow('eb4', 'Basic antiderivative'), R('side', T('id1', r`\int\cos\theta\,d\theta=\sin\theta+C`, 'ct'))];
      const L1 = R('line', EQ('p1'), T('p1t', `${kRed}\\sin\\theta+C`));
      const anti = sn => R('big', ...(kRed ? [T('b1', kRed, 'ink', { from: 'p1t' })] : []), sn, T('b2', '+C', 'ink', { from: 'p1t' }));
      const sn0 = T('sn', r`\sin\theta`, 'ct', { from: 'p1t' });
      const rd = R('side', T('rd1', `\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}=\\frac{x}{\\sqrt{${cfg.radIn}}}`, 'ct'));
      const swapped = anti(T('sn', `\\frac{x}{\\sqrt{${cfg.radIn}}}`, 'cx', { from: 'rd1' }));
      const V = R('line', EQ('v1'), T('v1t', `\\frac{${kRed}x}{\\sqrt{${cfg.radIn}}}+C`, 'ink', { cls: 'boxed' }));
      return [
        S(1, `A fractional exponent hides a radical: $${powTex}=\\big(\\sqrt{${cfg.radIn}}\\big)^3$.`, [bigF([cT, dx], [pw])]),
        S(1, r`Rewrite the [[cp:power]] as the cube of a [[cr:square root]].`, [bigF([cT, dx], [lp, rad, rp])]),
        S(1, `The radical matches $\\sqrt{x^2+a^2}$ with $a^2=${a2}$, so $a=${a}$: Type II.`, [bigF([cT, dx], [lp, rad, rp])], K.typeRows),
        S(1, `Type II uses $x=a\\tan\\theta$, so [[cx:$${K.sub}$]].`, [bigF([cT, dx], [lp, rad, rp])], [...K.typeRows, ...K.subRows]),
        S(1, `Replace [[cd:$dx$]]: the derivative of $\\tan\\theta$ is $\\sec^2\\theta$, so $dx=${K.dxTex}$.`, [bigF([cT, gdx], [lp, rad, rp]), K.dxRow], K.subRows),
        S(1, `Inside the [[cr:radical]]: $x^2=${K.x2Tex}$, and $${K.x2Tex}+${a2}=${a2}(\\tan^2\\theta+1)=${a2}\\sec^2\\theta$.`, [bigF([cT, gdx], [lp, grad, rp]), K.dxRow, R('work', ...rA)], [...K.subRows, ...K.idRows]),
        S(1, `So $\\sqrt{${cfg.radIn}}=${K.radRes}$, because $\\sec\\theta>0$ for $-\\tfrac\\pi2<\\theta<\\tfrac\\pi2$.`, [bigF([cT, gdx], [lp, grad, rp]), K.dxRow, R('work', ...rB)], [...K.subRows, ...K.idRows]),
        S(1, r`Both replacements return to the integral.`, [bigF([cT, dxv], [lp, r3, rp])], K.subRows),
        S(1, `Cube it: $(${K.radRes})^3=${a3}\\sec^3\\theta$.`, [bigF([cT, dxv], [T('r3', `${a3}\\sec^3\\theta`, 'cr')])], K.subRows),
        S(1, cfg.constSay, [R('big', k, int, F('f', [T('dxv', r`\sec^2\theta\,d\theta`, 'cd')], [T('r3', r`\sec^3\theta`, 'cr')]))], K.subRows),
        S(1, `The constants reduce to ${kRed || '1'}, and $\\sec^2\\theta$ cancels: $\\tfrac{\\sec^2\\theta}{\\sec^3\\theta}=\\tfrac1{\\sec\\theta}$.`, [R('big', ...kk, int, F('f', [T('dxv', r`d\theta`, 'cd')], [T('r3', r`\sec\theta`, 'cr')]))], K.subRows),
        S(1, r`Since $\tfrac1{\sec\theta}=\cos\theta$, Phase 1 ends with an integral of $\cos\theta$.`, [cosTop], K.subRows),
        S(2, r`A basic antiderivative: $\int\cos\theta\,d\theta=\sin\theta$.`, [cosTop, L1], known),
        ...K.phase3(anti(sn0), [rd], r`We need $\sin\theta=\tfrac{\text{opp}}{\text{hyp}}$.`),
        S(3, r`Swap it in. The antiderivative is now in $x$.`, [swapped], [K.triHead, K.tri(ALL), rd]),
        ...(kRed ? [S(3, `Combine: $${kRed}\\cdot\\tfrac{x}{\\sqrt{${cfg.radIn}}}$.`, [swapped, V], [K.triHead, K.tri(ALL), rd])] : []),
      ];
    })(),
    heli: [[ln(`x=${cfg.aSub}\\tan\\theta`, 'cx'), ln(`dx=${cfg.dxHeli}`, 'cd'), ln(`(${cfg.radIn})^{3/2}=${a3}\\sec^3\\theta`, 'cr'), ln(`=${kRed}\\int\\cos\\theta\\,d\\theta`, 'ct')],
    [ln(`${kRed}\\int\\cos\\theta\\,d\\theta`), ln(`=${kRed}\\sin\\theta+C`, 'ct')],
    [{ tri: triII('x', a, `\\sqrt{${cfg.radIn}}`, ALL) }, ln(`\\sin\\theta=\\tfrac{x}{\\sqrt{${cfg.radIn}}}`), bx(`\\frac{${kRed}x}{\\sqrt{${cfg.radIn}}}+C`)]]
  };
}
examples.push(fam32II({ n: 9, c: '3', a: r`\sqrt3`, a2: '3', a3: r`3\sqrt3`, aEq: r`a^2=3\;\Rightarrow\;a=\sqrt3`, a2n: 3, cn: 3, kn: 1, kTex: r`\frac{3\cdot\sqrt3}{3\sqrt3}`, kRed: '', radIn: '3+x^2', powTex: '(3+x^2)^{3/2}',
  aSub: r`\sqrt3`, dxHeli: r`\sqrt3\sec^2\theta\,d\theta`, constSay: r`Pull out the constants: $\tfrac{3\cdot\sqrt3}{3\sqrt3}$.` }));
