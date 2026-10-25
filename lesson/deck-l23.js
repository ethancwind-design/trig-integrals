/* Lecture 23 · Trigonometric substitution — all 16 practice problems, in the style of "Trig Substitution in Motion". */
const examples = [];
const int = T('int', r`\int`);
const bigF = (n, d, k) => R('big', k || int, F('f', n, d));

/* ===== Problem 1 ===== */
examples.push({ n: 1, label: 'Problem 1', type: 'Type I · rewrite in x', verb: 'Rewrite', problem: r`\int\sqrt{4-x^2}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`4\int\cos^2\theta\,d\theta`, r`2\big[\theta+\sin\theta\cos\theta\big]+C`, r`2\arcsin\tfrac x2+\tfrac x2\sqrt{4-x^2}+C`],
  verify: [{ anti: { F: x => 2 * Math.asin(x / 2) + x * Math.sqrt(4 - x * x) / 2, f: x => Math.sqrt(4 - x * x), range: [-1.8, 1.8] } }],
  steps: (() => {
    const K = TSKit({ type: 'I', a: '2', a2: '4', rad: r`\sqrt{4-x^2}` });
    const rad = T('rad', r`\sqrt{4-x^2}`, 'cr'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{4-x^2}`);
    const rA = K.radA(rad), rB = K.radB(rad);
    const k4 = T('k4', '4', 'ink', { from: 'r3' }), c2 = T('r3', r`\cos^2\theta`, 'ct'), dth = T('dxv', r`d\theta`, 'cd');
    const top = R('big', k4, int, c2, dth);
    const half = [eyebrow('eb4', 'Half-angle identity'), R('side', T('id1', r`\cos^2\theta=\tfrac12(1+\cos2\theta)`, 'ct'))];
    const dbl = [eyebrow('eb5', 'Double-angle identity'), R('side', T('id2', r`\sin2\theta=2\sin\theta\cos\theta`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`2\int(1+\cos2\theta)\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`2\Big[\theta+\tfrac12\sin2\theta\Big]+C`));
    const L3 = R('line', EQ('p3'), T('p3t', r`2\Big[\theta+\sin\theta\cos\theta\Big]+C`));
    const anti = (t, s, c) => R('big', T('b1', r`2\Big[`, 'ink', { from: 'p3t' }), t, T('pl', '+', 'ink', { from: 'p3t' }), s, c, T('b2', r`\Big]+C`, 'ink', { from: 'p3t' }));
    const th0 = T('th', r`\theta`, 'ct', { from: 'p3t' }), sn0 = T('sn', r`\sin\theta`, 'ct', { from: 'p3t' }), cs0 = T('cs', r`\cos\theta`, 'ct', { from: 'p3t' });
    const reads = [R('side', T('rd1', r`\theta=\arcsin\tfrac x2`, 'ct')), R('side', T('rd2', r`\sin\theta=\tfrac x2,`, 'ct'), T('rd3', r`\cos\theta=\tfrac{\sqrt{4-x^2}}{2}`, 'ct'))];
    const swapped = anti(T('th', r`\arcsin\tfrac x2`, 'cx', { from: 'rd1' }), T('sn', r`\tfrac x2\cdot`, 'cx', { from: 'rd2' }), T('cs', r`\tfrac{\sqrt{4-x^2}}{2}`, 'cr', { from: 'rd3' }));
    const V = R('line', EQ('v1'), T('v1t', r`2\arcsin\tfrac x2+\tfrac x2\sqrt{4-x^2}+C`, 'ink', { cls: 'boxed' }));
    const warn = WARN('w1', r`<b>Heads-up.</b> The problem prints this as $2\theta+\sin\theta\cos\theta$. That is missing a factor of 2: it differentiates to $1+2\cos^2\theta$, not $4\cos^2\theta$. We use the correct $2\theta+2\sin\theta\cos\theta$.`);
    return [
      S(1, r`Besides $dx$, the only $x$-piece is the [[cr:radical]] $\sqrt{4-x^2}$. Phase 1 replaces both with $\theta$-pieces.`, [R('big', int, rad, dx)]),
      S(1, r`The radical has the form $\sqrt{a^2-x^2}$ with $a^2=4$, so $a=2$: Type I.`, [R('big', int, rad, dx)], K.typeRows),
      S(1, r`Type I uses $x=a\sin\theta$. The problem hands us the same thing: [[cx:$x=2\sin\theta$]].`, [R('big', int, rad, dx)], [...K.typeRows, ...K.subRows]),
      S(1, r`Replace [[cd:$dx$]]: differentiate $x=2\sin\theta$ to get $dx=2\cos\theta\,d\theta$.`, [R('big', int, rad, gdx), K.dxRow], K.subRows),
      S(1, r`Inside the [[cr:radical]], square the substitution: $x^2=4\sin^2\theta$. Then $4-4\sin^2\theta=4\cos^2\theta$.`, [R('big', int, grad, gdx), K.dxRow, R('work', ...rA)], [...K.subRows, ...K.idRows]),
      S(1, r`So $\sqrt{4-x^2}=2\cos\theta$, because $\cos\theta\ge0$ for $-\tfrac\pi2\le\theta\le\tfrac\pi2$.`, [R('big', int, grad, gdx), K.dxRow, R('work', ...rB)], [...K.subRows, ...K.idRows]),
      S(1, r`Both replacements go back into the integral. Everything is now in terms of $\theta$.`, [R('big', int, T('r3', r`(2\cos\theta)`, 'cr'), T('dxv', r`(2\cos\theta\,d\theta)`, 'cd'))], K.subRows),
      S(1, r`Multiply: $(2\cos\theta)(2\cos\theta)=4\cos^2\theta$. Phase 1 is done: a trig integral.`, [top], K.subRows),
      S(2, r`An even power of cosine with no odd partner calls for the half-angle identity.`, [top], half),
      S(2, r`Substitute and pull out the constant: $4\cdot\tfrac12=2$.`, [top, L1], half),
      S(2, r`Integrate term by term, using $\int\cos2\theta\,d\theta=\tfrac12\sin2\theta$.`, [top, L1, L2], half),
      S(2, r`Rewrite $\sin2\theta$ with single angles, since the triangle only gives functions of $\theta$ itself.`, [top, L1, L2, L3], dbl),
      S(2, r`Before moving on, a check on the problem statement.`, [top, L1, L2, L3], [eyebrow('eb7', 'Check'), R('side', warn)]),
      ...K.phase3(anti(th0, sn0, cs0), reads),
      S(3, r`Swap each one into the antiderivative. We are back in $x$.`, [swapped], [K.triHead, K.tri(ALL), ...reads]),
      S(3, r`Distribute the 2: $2\cdot\tfrac x2\cdot\tfrac{\sqrt{4-x^2}}{2}=\tfrac x2\sqrt{4-x^2}$.`, [swapped, V], [K.triHead, K.tri(ALL), ...reads]),
    ];
  })(),
  heli: [[ln(r`x=2\sin\theta`, 'cx'), ln(r`dx=2\cos\theta\,d\theta`, 'cd'), ln(r`\sqrt{4-x^2}=2\cos\theta`, 'cr'), ln(r`=4\int\cos^2\theta\,d\theta`, 'ct')],
  [ln(r`\cos^2\theta=\tfrac12(1+\cos2\theta)`, 'muted'), ln(r`2\int(1+\cos2\theta)\,d\theta`), ln(r`=2\big[\theta+\sin\theta\cos\theta\big]`, 'ct')],
  [{ tri: triI('x', '2', r`\sqrt{4-x^2}`, ALL) }, ln(r`\theta=\arcsin\tfrac x2,\;\cos\theta=\tfrac{\sqrt{4-x^2}}{2}`), bx(r`2\arcsin\tfrac x2+\tfrac x2\sqrt{4-x^2}+C`)]] });


/* ===== Problem 2 ===== */
examples.push({ n: 2, label: 'Problem 2', type: 'Type I · rewrite in x', verb: 'Rewrite', problem: r`\int\frac{x^2}{\sqrt{9-x^2}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`9\int\sin^2\theta\,d\theta`, r`\tfrac92\big[\theta-\sin\theta\cos\theta\big]+C`, r`\tfrac92\arcsin\tfrac x3-\tfrac x2\sqrt{9-x^2}+C`],
  verify: [{ anti: { F: x => 4.5 * Math.asin(x / 3) - x * Math.sqrt(9 - x * x) / 2, f: x => x * x / Math.sqrt(9 - x * x), range: [-2.7, 2.7] } }],
  steps: (() => {
    const K = TSKit({ type: 'I', a: '3', a2: '9', rad: r`\sqrt{9-x^2}` });
    const rad = T('rad', r`\sqrt{9-x^2}`, 'cr'), x2 = T('x2', r`x^2`, 'cp'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{9-x^2}`), gx2 = G('gx2', r`x^2`);
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4), x2R = K.x2Row(x2);
    const x2v = T('x2b', r`9\sin^2\theta`, 'cp'), dxv = T('dxv', r`3\cos\theta\,d\theta`, 'cd'), r3 = T('r3', r`3\cos\theta`, 'cr');
    const top = R('big', T('k', '9', 'ink', { from: 'x2b' }), int, T('x2b', r`\sin^2\theta`, 'cp'), T('dxv', r`d\theta`, 'cd'));
    const half = [eyebrow('eb4', 'Half-angle identity'), R('side', T('id1', r`\sin^2\theta=\tfrac12(1-\cos2\theta)`, 'ct'))];
    const dbl = [eyebrow('eb5', 'Double-angle identity'), R('side', T('id2', r`\sin2\theta=2\sin\theta\cos\theta`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\tfrac92\int(1-\cos2\theta)\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`\tfrac92\Big[\theta-\tfrac12\sin2\theta\Big]+C`));
    const L3 = R('line', EQ('p3'), T('p3t', r`\tfrac92\Big[\theta-\sin\theta\cos\theta\Big]+C`));
    const anti = (t, s, c) => R('big', T('b1', r`\tfrac92\Big[`, 'ink', { from: 'p3t' }), t, T('mi', '-', 'ink', { from: 'p3t' }), s, c, T('b2', r`\Big]+C`, 'ink', { from: 'p3t' }));
    const th0 = T('th', r`\theta`, 'ct', { from: 'p3t' }), sn0 = T('sn', r`\sin\theta`, 'ct', { from: 'p3t' }), cs0 = T('cs', r`\cos\theta`, 'ct', { from: 'p3t' });
    const reads = [R('side', T('rd1', r`\theta=\arcsin\tfrac x3`, 'ct')), R('side', T('rd2', r`\sin\theta=\tfrac x3,`, 'ct'), T('rd3', r`\cos\theta=\tfrac{\sqrt{9-x^2}}{3}`, 'ct'))];
    const swapped = anti(T('th', r`\arcsin\tfrac x3`, 'cx', { from: 'rd1' }), T('sn', r`\tfrac x3\cdot`, 'cx', { from: 'rd2' }), T('cs', r`\tfrac{\sqrt{9-x^2}}{3}`, 'cr', { from: 'rd3' }));
    const V = R('line', EQ('v1'), T('v1t', r`\tfrac92\arcsin\tfrac x3-\tfrac x2\sqrt{9-x^2}+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`Two $x$-pieces sit in the integrand: [[cp:$x^2$]] on top and the [[cr:radical]] $\sqrt{9-x^2}$ below. Both must be replaced, along with [[cd:$dx$]].`, [bigF([x2, dx], [rad])]),
      S(1, r`The radical has the form $\sqrt{a^2-x^2}$ with $a^2=9$, so $a=3$: Type I.`, [bigF([x2, dx], [rad])], K.typeRows),
      S(1, r`Type I uses $x=a\sin\theta$, so [[cx:$x=3\sin\theta$]]. The problem gives us the same substitution.`, [bigF([x2, dx], [rad])], [...K.typeRows, ...K.subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=3\cos\theta\,d\theta$.`, [bigF([x2, gdx], [rad]), K.dxRow], K.subRows),
      S(1, r`Replace [[cp:$x^2$]] by squaring the substitution.`, [bigF([gx2, gdx], [rad]), K.dxRow, x2R], K.subRows),
      S(1, r`Inside the [[cr:radical]]: $9-9\sin^2\theta=9\cos^2\theta$.`, [bigF([gx2, gdx], [grad]), K.dxRow, x2R, R('work', ...rA)], [...K.subRows, ...K.idRows]),
      S(1, r`So $\sqrt{9-x^2}=3\cos\theta$.`, [bigF([gx2, gdx], [grad]), K.dxRow, x2R, R('work', ...rB)], [...K.subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [bigF([x2v, dxv], [r3])], K.subRows),
      S(1, r`The $3\cos\theta$ from $dx$ cancels the $3\cos\theta$ from the radical.`, [bigF([x2v, T('dxv', r`\cancel{3\cos\theta}\,d\theta`, 'cd')], [T('r3', r`\cancel{3\cos\theta}`, 'cr')])], K.subRows),
      S(1, r`What is left is $9\sin^2\theta\,d\theta$. Phase 1 is done.`, [top], K.subRows),
      S(2, r`An even power of sine with no odd partner calls for the half-angle identity, this time with a minus sign.`, [top], half),
      S(2, r`Substitute and pull out the constant: $9\cdot\tfrac12=\tfrac92$.`, [top, L1], half),
      S(2, r`Integrate term by term, using $\int\cos2\theta\,d\theta=\tfrac12\sin2\theta$.`, [top, L1, L2], half),
      S(2, r`Rewrite $\sin2\theta$ with single angles. This matches the form printed in the problem.`, [top, L1, L2, L3], dbl),
      ...K.phase3(anti(th0, sn0, cs0), reads),
      S(3, r`Swap each one into the antiderivative.`, [swapped], [K.triHead, K.tri(ALL), ...reads]),
      S(3, r`Distribute: $\tfrac92\cdot\tfrac x3\cdot\tfrac{\sqrt{9-x^2}}{3}=\tfrac x2\sqrt{9-x^2}$.`, [swapped, V], [K.triHead, K.tri(ALL), ...reads]),
    ];
  })(),
  heli: [[ln(r`x=3\sin\theta`, 'cx'), ln(r`dx=3\cos\theta\,d\theta`, 'cd'), ln(r`x^2=9\sin^2\theta`, 'cp'), ln(r`\sqrt{9-x^2}=3\cos\theta`, 'cr'), ln(r`=9\int\sin^2\theta\,d\theta`, 'ct')],
  [ln(r`\sin^2\theta=\tfrac12(1-\cos2\theta)`, 'muted'), ln(r`\tfrac92\int(1-\cos2\theta)\,d\theta`), ln(r`=\tfrac92\big[\theta-\sin\theta\cos\theta\big]`, 'ct')],
  [{ tri: triI('x', '3', r`\sqrt{9-x^2}`, ALL) }, ln(r`\theta=\arcsin\tfrac x3,\;\cos\theta=\tfrac{\sqrt{9-x^2}}{3}`), bx(r`\tfrac92\arcsin\tfrac x3-\tfrac x2\sqrt{9-x^2}+C`)]] });

/* ===== Problem 3 ===== */
examples.push({ n: 3, label: 'Problem 3', type: 'Type I · rewrite in x', verb: 'Rewrite', problem: r`\int\frac{x^2}{(4-x^2)^{3/2}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`\int\tan^2\theta\,d\theta`, r`\tan\theta-\theta+C`, r`\frac{x}{\sqrt{4-x^2}}-\arcsin\tfrac x2+C`],
  verify: [{ anti: { F: x => x / Math.sqrt(4 - x * x) - Math.asin(x / 2), f: x => x * x / Math.pow(4 - x * x, 1.5), range: [-1.8, 1.8] } }],
  steps: (() => {
    const K = TSKit({ type: 'I', a: '2', a2: '4', rad: r`\sqrt{4-x^2}` });
    const x2 = T('x2', r`x^2`, 'cp'), dx = K.dx, gdx = K.gdx, pw = T('pw', r`(4-x^2)^{3/2}`, 'cr');
    const lp = T('lp', r`\Big(`, 'ink', { from: 'pw' }), rad = T('rad', r`\sqrt{4-x^2}`, 'cr', { from: 'pw' }), rp = T('rp', r`\Big)^{3}`, 'ink', { from: 'pw' });
    const grad = G('grad', r`\sqrt{4-x^2}`), gx2 = G('gx2', r`x^2`);
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4), x2R = K.x2Row(x2);
    const x2v = T('x2b', r`4\sin^2\theta`, 'cp'), dxv = T('dxv', r`2\cos\theta\,d\theta`, 'cd'), r3 = T('r3', r`2\cos\theta`, 'cr');
    const p1top = R('big', int, F('f', [T('x2b', r`\sin^2\theta`, 'cp'), T('dxv', r`d\theta`, 'cd')], [T('r3', r`\cos^2\theta`, 'cr')]));
    const tanTop = R('big', int, T('x2b', r`\tan^2\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const idT = [eyebrow('eb4', 'Pythagorean identity'), R('side', T('id1', r`\tan^2\theta=\sec^2\theta-1`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\int(\sec^2\theta-1)\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`\tan\theta-\theta+C`));
    const anti = (tn, th) => R('big', tn, T('mi', '-', 'ink', { from: 'p2t' }), th, T('b2', '+C', 'ink', { from: 'p2t' }));
    const tn0 = T('tn', r`\tan\theta`, 'ct', { from: 'p2t' }), th0 = T('th', r`\theta`, 'ct', { from: 'p2t' });
    const reads = [R('side', T('rd1', r`\tan\theta=\tfrac{\text{opp}}{\text{adj}}=\tfrac{x}{\sqrt{4-x^2}}`, 'ct')), R('side', T('rd2', r`\theta=\arcsin\tfrac x2`, 'ct'))];
    const swapped = anti(T('tn', r`\frac{x}{\sqrt{4-x^2}}`, 'cr', { from: 'rd1' }), T('th', r`\arcsin\tfrac x2`, 'cx', { from: 'rd2' }));
    return [
      S(1, r`A fractional exponent hides a radical: $(4-x^2)^{3/2}=\big(\sqrt{4-x^2}\big)^3$. The other $x$-piece is [[cp:$x^2$]] on top.`, [bigF([x2, dx], [pw])]),
      S(1, r`Rewrite the [[cr:power]] as the cube of a [[cr:square root]].`, [bigF([x2, dx], [lp, rad, rp])]),
      S(1, r`The radical matches $\sqrt{a^2-x^2}$ with $a=2$: Type I.`, [bigF([x2, dx], [lp, rad, rp])], K.typeRows),
      S(1, r`Type I uses $x=a\sin\theta$, so [[cx:$x=2\sin\theta$]].`, [bigF([x2, dx], [lp, rad, rp])], [...K.typeRows, ...K.subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=2\cos\theta\,d\theta$.`, [bigF([x2, gdx], [lp, rad, rp]), K.dxRow], K.subRows),
      S(1, r`Replace [[cp:$x^2$]] by squaring the substitution.`, [bigF([gx2, gdx], [lp, rad, rp]), K.dxRow, x2R], K.subRows),
      S(1, r`Inside the [[cr:radical]]: $4-4\sin^2\theta=4\cos^2\theta$.`, [bigF([gx2, gdx], [lp, grad, rp]), K.dxRow, x2R, R('work', ...rA)], [...K.subRows, ...K.idRows]),
      S(1, r`So $\sqrt{4-x^2}=2\cos\theta$.`, [bigF([gx2, gdx], [lp, grad, rp]), K.dxRow, x2R, R('work', ...rB)], [...K.subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [bigF([x2v, dxv], [lp, r3, rp])], K.subRows),
      S(1, r`Cube it: $(2\cos\theta)^3=8\cos^3\theta$.`, [bigF([x2v, dxv], [T('r3', r`8\cos^3\theta`, 'cr')])], K.subRows),
      S(1, r`The constants reduce: $\tfrac{4\cdot2}{8}=1$, and one $\cos\theta$ cancels.`, [bigF([T('x2b', r`\sin^2\theta`, 'cp'), T('dxv', r`d\theta`, 'cd')], [T('r3', r`\cos^2\theta`, 'cr')])], K.subRows),
      S(1, r`Since $\tfrac{\sin^2\theta}{\cos^2\theta}=\tan^2\theta$, Phase 1 ends with $\int\tan^2\theta\,d\theta$.`, [tanTop], K.subRows),
      S(2, r`Convert with $\tan^2\theta=\sec^2\theta-1$ so each term has a known antiderivative.`, [tanTop, L1], idT),
      S(2, r`$\int\sec^2\theta\,d\theta=\tan\theta$ and $\int1\,d\theta=\theta$.`, [tanTop, L1, L2], idT),
      ...K.phase3(anti(tn0, th0), reads, r`We need $\tan\theta=\tfrac{\text{opp}}{\text{adj}}$, and $\theta$ itself from $\sin\theta=\tfrac x2$.`),
      S(3, r`Swap both into the antiderivative.`, [swapped], [K.triHead, K.tri(ALL), ...reads]),
    ];
  })(),
  heli: [[ln(r`x=2\sin\theta`, 'cx'), ln(r`dx=2\cos\theta\,d\theta`, 'cd'), ln(r`x^2=4\sin^2\theta`, 'cp'), ln(r`(4-x^2)^{3/2}=8\cos^3\theta`, 'cr'), ln(r`=\int\tan^2\theta\,d\theta`, 'ct')],
  [ln(r`\tan^2\theta=\sec^2\theta-1`, 'muted'), ln(r`\int(\sec^2\theta-1)\,d\theta`), ln(r`=\tan\theta-\theta`, 'ct')],
  [{ tri: triI('x', '2', r`\sqrt{4-x^2}`, ALL) }, ln(r`\tan\theta=\tfrac{x}{\sqrt{4-x^2}},\;\theta=\arcsin\tfrac x2`), bx(r`\frac{x}{\sqrt{4-x^2}}-\arcsin\tfrac x2+C`)]] });

/* ===== Problem 4 ===== */
examples.push({ n: 4, label: 'Problem 4', type: 'Type III · rewrite in x', verb: 'Rewrite', problem: r`\int\frac{\sqrt{x^2-4}}{x}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`2\int\tan^2\theta\,d\theta`, r`2(\tan\theta-\theta)+C`, r`\sqrt{x^2-4}-2\operatorname{arcsec}\tfrac x2+C`],
  verify: [{ anti: { F: x => Math.sqrt(x * x - 4) - 2 * Math.acos(2 / x), f: x => Math.sqrt(x * x - 4) / x, range: [2.2, 6] } }],
  steps: (() => {
    const K = TSKit({ type: 'III', a: '2', a2: '4', rad: r`\sqrt{x^2-4}` });
    const rad = T('rad', r`\sqrt{x^2-4}`, 'cr'), xd = T('xd', 'x', 'cp'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{x^2-4}`), gxd = G('gxd', 'x');
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('xsub', r`x=2\sec\theta`, 'cx')), R('side', H('note1', 'Take x &gt; 2, so tan θ ≥ 0', 'muted', { cls: 'note' }))];
    const xdRow = R('work', xd, EQ('e5'), T('xdv', r`2\sec\theta`, 'cp', { from: 'xsub' }));
    const rA = K.radA(rad), rB = K.radB(rad);
    const p1top = R('big', T('k', '2', 'ink', { from: 'r3' }), int, T('r3', r`\tan^2\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const idT = [eyebrow('eb4', 'Pythagorean identity'), R('side', T('id1', r`\tan^2\theta=\sec^2\theta-1`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`2\int(\sec^2\theta-1)\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`2\big(\tan\theta-\theta\big)+C`));
    const anti = (tn, th) => R('big', T('b1', r`2\Big(`, 'ink', { from: 'p2t' }), tn, T('mi', '-', 'ink', { from: 'p2t' }), th, T('b2', r`\Big)+C`, 'ink', { from: 'p2t' }));
    const tn0 = T('tn', r`\tan\theta`, 'ct', { from: 'p2t' }), th0 = T('th', r`\theta`, 'ct', { from: 'p2t' });
    const reads = [R('side', T('rd1', r`\tan\theta=\frac{\sqrt{x^2-4}}{2}`, 'ct')), R('side', T('rd2', r`\theta=\operatorname{arcsec}\tfrac x2`, 'ct'))];
    const swapped = anti(T('tn', r`\frac{\sqrt{x^2-4}}{2}`, 'cr', { from: 'rd1' }), T('th', r`\operatorname{arcsec}\tfrac x2`, 'cx', { from: 'rd2' }));
    const V = R('line', EQ('v1'), T('v1t', r`\sqrt{x^2-4}-2\operatorname{arcsec}\tfrac x2+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`Three pieces need replacing: the [[cr:radical]], the [[cp:$x$ in the denominator]], and [[cd:$dx$]].`, [R('big', int, F('f', [rad], [xd]), dx)]),
      S(1, r`The radical matches $\sqrt{x^2-a^2}$ with $a^2=4$, so $a=2$: Type III.`, [R('big', int, F('f', [rad], [xd]), dx)], K.typeRows),
      S(1, r`Type III uses $x=a\sec\theta$, so [[cx:$x=2\sec\theta$]]. We take $x>2$ so the radical simplifies to $+2\tan\theta$.`, [R('big', int, F('f', [rad], [xd]), dx)], [...K.typeRows, ...subRows]),
      S(1, r`Replace [[cd:$dx$]]: the derivative of $\sec\theta$ is $\sec\theta\tan\theta$.`, [R('big', int, F('f', [rad], [xd]), gdx), K.dxRow], subRows),
      S(1, r`The lone [[cp:$x$]] in the denominator is just the substitution itself.`, [R('big', int, F('f', [rad], [gxd]), gdx), K.dxRow, xdRow], subRows),
      S(1, r`Inside the [[cr:radical]]: $4\sec^2\theta-4=4(\sec^2\theta-1)=4\tan^2\theta$.`, [R('big', int, F('f', [grad], [gxd]), gdx), K.dxRow, xdRow, R('work', ...rA)], [...subRows, ...K.idRows]),
      S(1, r`So $\sqrt{x^2-4}=2\tan\theta$.`, [R('big', int, F('f', [grad], [gxd]), gdx), K.dxRow, xdRow, R('work', ...rB)], [...subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', int, F('f', [T('r3', r`(2\tan\theta)`, 'cr'), T('dxv', r`(2\sec\theta\tan\theta\,d\theta)`, 'cd')], [T('xdv', r`2\sec\theta`, 'cp')]))], subRows),
      S(1, r`The $2\sec\theta$ in $dx$ cancels the denominator.`, [R('big', int, F('f', [T('r3', r`(2\tan\theta)`, 'cr'), T('dxv', r`(\cancel{2\sec\theta}\,\tan\theta\,d\theta)`, 'cd')], [T('xdv', r`\cancel{2\sec\theta}`, 'cp')]))], subRows),
      S(1, r`What is left is $2\tan\theta\cdot\tan\theta=2\tan^2\theta$. Phase 1 is done.`, [p1top], subRows),
      S(2, r`Convert with $\tan^2\theta=\sec^2\theta-1$ so each term has a known antiderivative.`, [p1top, L1], idT),
      S(2, r`$\int\sec^2\theta\,d\theta=\tan\theta$ and $\int1\,d\theta=\theta$.`, [p1top, L1, L2], idT),
      ...K.phase3(anti(tn0, th0), reads, r`We need $\tan\theta=\tfrac{\text{opp}}{\text{adj}}$ and $\theta$ itself, which comes from inverting $\sec\theta=\tfrac x2$.`),
      S(3, r`Swap both into the antiderivative.`, [swapped], [K.triHead, K.tri(ALL), ...reads]),
      S(3, r`Distribute the 2. (This answer is for $x>2$.)`, [swapped, V], [K.triHead, K.tri(ALL), ...reads]),
    ];
  })(),
  heli: [[ln(r`x=2\sec\theta`, 'cx'), ln(r`dx=2\sec\theta\tan\theta\,d\theta`, 'cd'), ln(r`\sqrt{x^2-4}=2\tan\theta`, 'cr'), ln(r`=2\int\tan^2\theta\,d\theta`, 'ct')],
  [ln(r`\tan^2\theta=\sec^2\theta-1`, 'muted'), ln(r`2\int(\sec^2\theta-1)\,d\theta`), ln(r`=2(\tan\theta-\theta)+C`, 'ct')],
  [{ tri: triIII('x', '2', r`\sqrt{x^2-4}`, ALL) }, ln(r`\tan\theta=\tfrac{\sqrt{x^2-4}}{2},\;\theta=\operatorname{arcsec}\tfrac x2`), bx(r`\sqrt{x^2-4}-2\operatorname{arcsec}\tfrac x2+C`)]] });

/* ===== Problem 5 ===== */
examples.push({ n: 5, label: 'Problem 5', type: 'Type I · rewrite in x', verb: 'Rewrite', problem: r`\int2x^2\sqrt{1-x^2}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`2\int\sin^2\theta\cos^2\theta\,d\theta`, r`\tfrac14\big[\theta-\sin\theta\cos\theta\,(1-2\sin^2\theta)\big]+C`, r`\tfrac14\arcsin x-\tfrac14x\sqrt{1-x^2}\,(1-2x^2)+C`],
  verify: [{ anti: { F: x => Math.asin(x) / 4 - x * Math.sqrt(1 - x * x) * (1 - 2 * x * x) / 4, f: x => 2 * x * x * Math.sqrt(1 - x * x), range: [-.95, .95] } }],
  steps: (() => {
    const K = TSKit({ type: 'I', a: '1', a2: '1', rad: r`\sqrt{1-x^2}`, sub: r`x=\sin\theta`, dxTex: r`\cos\theta\,d\theta`, aEq: r`a^2=1\;\Rightarrow\;a=1` });
    const two = T('two', '2'), x2 = T('x2', r`x^2`, 'cp'), rad = T('rad', r`\sqrt{1-x^2}`, 'cr'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{1-x^2}`), gx2 = G('gx2', r`x^2`);
    const x2R = R('work', x2, EQ('x2e'), T('x2a', r`(\sin\theta)^2`, 'cp', { from: 'xsub' }), EQ('x2f'), T('x2b', r`\sin^2\theta`, 'cp'));
    const rA = [rad, EQ('e4'), T('r1', r`\sqrt{1-\class{cx}{\sin^2\theta}}`, 'cr', { from: 'xsub' }), EQ('e5'), T('r2', r`\sqrt{\cos^2\theta}`, 'cr')];
    const rB = [...rA, EQ('e6'), T('r3', r`\cos\theta`, 'cr')];
    const p1top = R('big', T('two', '2'), int, T('x2b', r`\sin^2\theta`, 'cp'), T('r3', r`\cos^2\theta`, 'cr'), T('dxv', r`d\theta`, 'cd'));
    const dbl = [eyebrow('eb4', 'Double-angle identity'), R('side', T('id1', r`\sin\theta\cos\theta=\tfrac12\sin2\theta`, 'ct'))];
    const half = [eyebrow('eb5', 'Half-angle identity'), R('side', T('id2', r`\sin^22\theta=\tfrac12(1-\cos4\theta)`, 'ct'))];
    const dbl2 = [eyebrow('eb7', 'Double-angle, twice'), R('side', T('id3', r`\sin4\theta=2\sin2\theta\cos2\theta`, 'ct')), R('side', T('id4', r`\cos2\theta=1-2\sin^2\theta`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\tfrac12\int\sin^22\theta\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`\tfrac14\int(1-\cos4\theta)\,d\theta`));
    const L3 = R('line', EQ('p3'), T('p3t', r`\tfrac14\Big[\theta-\tfrac14\sin4\theta\Big]+C`));
    const L4 = R('line', EQ('p4'), T('p4t', r`\tfrac14\Big[\theta-\sin\theta\cos\theta\,(1-2\sin^2\theta)\Big]+C`));
    const anti = (t, sc, q) => R('big', T('b1', r`\tfrac14\Big[`, 'ink', { from: 'p4t' }), t, T('mi', '-', 'ink', { from: 'p4t' }), sc, q, T('b2', r`\Big]+C`, 'ink', { from: 'p4t' }));
    const th0 = T('th', r`\theta`, 'ct', { from: 'p4t' }), sc0 = T('sc', r`\sin\theta\cos\theta`, 'ct', { from: 'p4t' }), q0 = T('q', r`(1-2\sin^2\theta)`, 'ct', { from: 'p4t' });
    const reads = [R('side', T('rd1', r`\theta=\arcsin x`, 'ct')), R('side', T('rd2', r`\sin\theta\cos\theta=x\sqrt{1-x^2}`, 'ct')), R('side', T('rd3', r`1-2\sin^2\theta=1-2x^2`, 'ct'))];
    const swapped = anti(T('th', r`\arcsin x`, 'cx', { from: 'rd1' }), T('sc', r`x\sqrt{1-x^2}`, 'cr', { from: 'rd2' }), T('q', r`(1-2x^2)`, 'cx', { from: 'rd3' }));
    const V = R('line', EQ('v1'), T('v1t', r`\tfrac14\arcsin x+\tfrac14x\sqrt{1-x^2}\,(2x^2-1)+C`, 'ink', { cls: 'boxed' }));
    const warn = WARN('w1', r`<b>Heads-up.</b> The problem prints $\sin^3\theta\cos\theta-\sin\theta\cos\theta+\tfrac\theta2$. That does not differentiate back to $2\sin^2\theta\cos^2\theta$: at $\theta=\tfrac\pi6$ it gives $\tfrac12$, but the integrand is $\tfrac38$. Our result below does.`);
    return [
      S(1, r`Two $x$-pieces: [[cp:$x^2$]] and the [[cr:radical]] $\sqrt{1-x^2}$, plus the constant 2 and [[cd:$dx$]].`, [R('big', two, int, x2, rad, dx)]),
      S(1, r`The radical has the form $\sqrt{a^2-x^2}$ with $a^2=1$, so $a=1$: Type I.`, [R('big', two, int, x2, rad, dx)], K.typeRows),
      S(1, r`Type I uses $x=a\sin\theta$, which here is simply [[cx:$x=\sin\theta$]].`, [R('big', two, int, x2, rad, dx)], [...K.typeRows, ...K.subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=\cos\theta\,d\theta$.`, [R('big', two, int, x2, rad, gdx), K.dxRow], K.subRows),
      S(1, r`Replace [[cp:$x^2$]]: $x^2=\sin^2\theta$.`, [R('big', two, int, gx2, rad, gdx), K.dxRow, x2R], K.subRows),
      S(1, r`Inside the [[cr:radical]]: $1-\sin^2\theta=\cos^2\theta$, so $\sqrt{1-x^2}=\cos\theta$.`, [R('big', two, int, gx2, grad, gdx), K.dxRow, x2R, R('work', ...rB)], [...K.subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', two, int, T('x2b', r`\sin^2\theta`, 'cp'), T('r3', r`\cos\theta`, 'cr'), T('dxv', r`\cos\theta\,d\theta`, 'cd'))], K.subRows),
      S(1, r`Combine the cosines: $\cos\theta\cdot\cos\theta=\cos^2\theta$. Phase 1 is done: $2\int\sin^2\theta\cos^2\theta\,d\theta$.`, [p1top], K.subRows),
      S(2, r`Even powers of both sine and cosine: group them as $(\sin\theta\cos\theta)^2$ and use the double-angle identity.`, [p1top], dbl),
      S(2, r`$2\sin^2\theta\cos^2\theta=2\cdot\tfrac14\sin^22\theta=\tfrac12\sin^22\theta$.`, [p1top, L1], dbl),
      S(2, r`$\sin^22\theta$ is an even power again, so apply the half-angle identity with $4\theta$.`, [p1top, L1, L2], half),
      S(2, r`Integrate: $\int\cos4\theta\,d\theta=\tfrac14\sin4\theta$.`, [p1top, L1, L2, L3], half),
      S(2, r`Rewrite $\sin4\theta$ with single angles: $\sin4\theta=2\sin2\theta\cos2\theta=4\sin\theta\cos\theta\,(1-2\sin^2\theta)$.`, [p1top, L1, L2, L3, L4], dbl2),
      S(2, r`Before moving on, a check on the problem statement.`, [p1top, L1, L2, L3, L4], [eyebrow('eb8', 'Check'), R('side', warn)]),
      ...K.phase3(anti(th0, sc0, q0), reads, r`Read each piece off the triangle: $\sin\theta=x$ and $\cos\theta=\sqrt{1-x^2}$.`),
      S(3, r`Swap each one into the antiderivative.`, [swapped], [K.triHead, K.tri(ALL), ...reads]),
      S(3, r`Distribute the $\tfrac14$ and flip the sign of the last term: $-(1-2x^2)=2x^2-1$.`, [swapped, V], [K.triHead, K.tri(ALL), ...reads]),
    ];
  })(),
  heli: [[ln(r`x=\sin\theta`, 'cx'), ln(r`dx=\cos\theta\,d\theta`, 'cd'), ln(r`x^2=\sin^2\theta`, 'cp'), ln(r`\sqrt{1-x^2}=\cos\theta`, 'cr'), ln(r`=2\int\sin^2\theta\cos^2\theta\,d\theta`, 'ct')],
  [ln(r`2\sin^2\theta\cos^2\theta=\tfrac12\sin^22\theta`, 'muted'), ln(r`\tfrac14\int(1-\cos4\theta)\,d\theta`), ln(r`=\tfrac14\big[\theta-\tfrac14\sin4\theta\big]`, 'ct')],
  [{ tri: triI('x', '1', r`\sqrt{1-x^2}`, ALL) }, ln(r`\theta=\arcsin x,\;\sin\theta\cos\theta=x\sqrt{1-x^2}`), bx(r`\tfrac14\arcsin x+\tfrac14x\sqrt{1-x^2}\,(2x^2-1)+C`)]] });
