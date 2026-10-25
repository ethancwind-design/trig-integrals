/* Lecture 23 · problems 10-16 + intro */

/* ===== Problem 10 ===== */
examples.push({ n: 10, label: 'Problem 10', type: 'Type III', verb: 'Compute', problem: r`\int\frac{24}{x^2\sqrt{x^2-48}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`\tfrac12\int\cos\theta\,d\theta`, r`\tfrac12\sin\theta+C`, r`\frac{\sqrt{x^2-48}}{2x}+C`],
  verify: [{ anti: { F: x => Math.sqrt(x * x - 48) / (2 * x), f: x => 24 / (x * x * Math.sqrt(x * x - 48)), range: [7.2, 14] } }],
  steps: (() => {
    const K = TSKit({ type: 'III', a: r`4\sqrt3`, a2: '48', rad: r`\sqrt{x^2-48}`, aEq: r`a^2=48\Rightarrow a=4\sqrt3` });
    const n24 = T('n24', '24'), x2 = T('x2', r`x^2`, 'cp'), rad = T('rad', r`\sqrt{x^2-48}`, 'cr'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{x^2-48}`), gx2 = G('gx2', r`x^2`);
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('xsub', K.sub, 'cx')), R('side', H('note1', 'Take x &gt; √48, so tan θ ≥ 0', 'muted', { cls: 'note' }))];
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4), x2R = K.x2Row(x2);
    const x2v = T('x2b', r`48\sec^2\theta`, 'cp'), dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
    const k = T('k', r`\tfrac{24}{48}`, 'ink', { from: 'x2b' });
    const cosTop = R('big', T('k', r`\tfrac12`), int, T('r3', r`\cos\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const idS = [eyebrow('eb4', 'Reciprocal identity'), R('side', T('id1', r`\frac{1}{\sec\theta}=\cos\theta`, 'ct'))];
    const known = [eyebrow('eb5', 'Basic antiderivative'), R('side', T('id2', r`\int\cos\theta\,d\theta=\sin\theta+C`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\tfrac12\sin\theta+C`));
    const anti = sn => R('big', T('b1', r`\tfrac12`, 'ink', { from: 'p1t' }), sn, T('b2', '+C', 'ink', { from: 'p1t' }));
    const sn0 = T('sn', r`\sin\theta`, 'ct', { from: 'p1t' });
    const rd = R('side', T('rd1', r`\sin\theta=\frac{\text{opp}}{\text{hyp}}=\frac{\sqrt{x^2-48}}{x}`, 'ct'));
    const swapped = anti(T('sn', r`\frac{\sqrt{x^2-48}}{x}`, 'cr', { from: 'rd1' }));
    const V = R('line', EQ('v1'), T('v1t', r`\frac{\sqrt{x^2-48}}{2x}+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`Three pieces need replacing: [[cp:$x^2$]] and the [[cr:radical]] in the denominator, and [[cd:$dx$]].`, [R('big', int, F('f', [n24, dx], [x2, rad]))]),
      S(1, r`The radical matches $\sqrt{x^2-a^2}$ with $a^2=48$, so $a=\sqrt{48}=4\sqrt3$: Type III.`, [R('big', int, F('f', [n24, dx], [x2, rad]))], K.typeRows),
      S(1, r`Type III uses $x=a\sec\theta$, so [[cx:$x=4\sqrt3\sec\theta$]]. We take $x>\sqrt{48}$ so the radical simplifies to $+a\tan\theta$.`, [R('big', int, F('f', [n24, dx], [x2, rad]))], [...K.typeRows, ...subRows]),
      S(1, r`Replace [[cd:$dx$]]: the derivative of $\sec\theta$ is $\sec\theta\tan\theta$.`, [R('big', int, F('f', [n24, gdx], [x2, rad])), K.dxRow], subRows),
      S(1, r`Replace [[cp:$x^2$]] by squaring the substitution: $(4\sqrt3)^2=48$.`, [R('big', int, F('f', [n24, gdx], [gx2, rad])), K.dxRow, x2R], subRows),
      S(1, r`Inside the [[cr:radical]]: $48\sec^2\theta-48=48(\sec^2\theta-1)=48\tan^2\theta$.`, [R('big', int, F('f', [n24, gdx], [gx2, grad])), K.dxRow, x2R, R('work', ...rA)], [...subRows, ...K.idRows]),
      S(1, r`So $\sqrt{x^2-48}=4\sqrt3\tan\theta$.`, [R('big', int, F('f', [n24, gdx], [gx2, grad])), K.dxRow, x2R, R('work', ...rB)], [...subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', int, F('f', [n24, dxv], [x2v, r3]))], subRows),
      S(1, r`The $4\sqrt3\tan\theta$ in $dx$ cancels the $4\sqrt3\tan\theta$ from the radical.`, [R('big', int, F('f', [n24, T('dxv', r`\cancel{4\sqrt3\tan\theta}\,\sec\theta\,d\theta`, 'cd')], [x2v, T('r3', r`\cancel{4\sqrt3\tan\theta}`, 'cr')]))], subRows),
      S(1, r`Pull out the constants: $\tfrac{24}{48}=\tfrac12$.`, [R('big', k, int, F('f', [T('dxv', r`\sec\theta\,d\theta`, 'cd')], [T('x2b', r`\sec^2\theta`, 'cp')]))], subRows),
      S(1, r`One $\sec\theta$ cancels, leaving $\tfrac1{\sec\theta}$.`, [R('big', T('k', r`\tfrac12`), int, F('f', [T('dxv', r`d\theta`, 'cd')], [T('x2b', r`\sec\theta`, 'cp')]))], subRows),
      S(1, r`Since $\tfrac1{\sec\theta}=\cos\theta$, Phase 1 ends with $\tfrac12\int\cos\theta\,d\theta$.`, [cosTop], [...subRows, ...idS]),
      S(2, r`A basic antiderivative: $\int\cos\theta\,d\theta=\sin\theta$.`, [cosTop, L1], known),
      ...K.phase3(anti(sn0), [rd], r`We need $\sin\theta=\tfrac{\text{opp}}{\text{hyp}}$.`),
      S(3, r`Swap it in. The antiderivative is now in $x$.`, [swapped], [K.triHead, K.tri(ALL), rd]),
      S(3, r`Combine the fractions: $\tfrac12\cdot\tfrac{\sqrt{x^2-48}}{x}=\tfrac{\sqrt{x^2-48}}{2x}$.`, [swapped, V], [K.triHead, K.tri(ALL), rd]),
    ];
  })(),
  heli: [[ln(r`x=4\sqrt3\sec\theta`, 'cx'), ln(r`dx=4\sqrt3\sec\theta\tan\theta\,d\theta`, 'cd'), ln(r`x^2=48\sec^2\theta`, 'cp'), ln(r`\sqrt{x^2-48}=4\sqrt3\tan\theta`, 'cr'), ln(r`=\tfrac12\int\cos\theta\,d\theta`, 'ct')],
  [ln(r`\int\cos\theta\,d\theta=\sin\theta`, 'muted'), ln(r`=\tfrac12\sin\theta+C`, 'ct')],
  [{ tri: triIII('x', r`4\sqrt3`, r`\sqrt{x^2-48}`, ALL) }, ln(r`\sin\theta=\tfrac{\sqrt{x^2-48}}{x}`), bx(r`\frac{\sqrt{x^2-48}}{2x}+C`)]] });

/* ===== Problem 11 ===== */
examples.push({ n: 11, label: 'Problem 11', type: 'Type II', verb: 'Compute', problem: r`\int\frac{15x^4}{(3+x^2)^{7/2}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`5\int\sin^4\theta\cos\theta\,d\theta`, r`\sin^5\theta+C`, r`\frac{x^5}{(3+x^2)^{5/2}}+C`],
  verify: [{ anti: { F: x => Math.pow(x, 5) / Math.pow(3 + x * x, 2.5), f: x => 15 * Math.pow(x, 4) / Math.pow(3 + x * x, 3.5), range: [-3, 3] } }],
  steps: (() => {
    const K = TSKit({ type: 'II', a: r`\sqrt3`, a2: '3', rad: r`\sqrt{3+x^2}`, aEq: r`a^2=3\;\Rightarrow\;a=\sqrt3` });
    const n15 = T('n15', '15'), x4 = T('x4', r`x^4`, 'cp'), dx = K.dx, gdx = K.gdx, pw = T('pw', r`(3+x^2)^{7/2}`, 'cr');
    const lp = T('lp', r`\Big(`, 'ink', { from: 'pw' }), rad = T('rad', r`\sqrt{3+x^2}`, 'cr', { from: 'pw' }), rp = T('rp', r`\Big)^{7}`, 'ink', { from: 'pw' });
    const grad = G('grad', r`\sqrt{3+x^2}`), gx4 = G('gx4', r`x^4`);
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4);
    const x4R = R('work', x4, EQ('x4e'), T('x4a', r`(\sqrt3\tan\theta)^4`, 'cp', { from: 'xsub' }), EQ('x4f'), T('x4b', r`9\tan^4\theta`, 'cp'));
    const x4v = T('x4b', r`9\tan^4\theta`, 'cp'), dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
    const k = T('k', r`\frac{15\cdot9\cdot\sqrt3}{27\sqrt3}`, 'ink', { from: 'x4b' });
    const k5 = T('k', '5');
    const sc = [eyebrow('eb4', 'Sine and cosine'), R('side', T('id1', r`\tan\theta=\frac{\sin\theta}{\cos\theta}`, 'ct')), R('side', T('id2', r`\sec\theta=\frac{1}{\cos\theta}`, 'ct'))];
    const p1top = R('big', k5, int, T('x4b', r`\sin^4\theta`, 'ct'), T('r3', r`\cos\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const uRows = [eyebrow('eb5', 'u-substitution'), R('side', T('usub', r`u=\sin\theta`, 'cx')), R('side', T('du', r`du=\cos\theta\,d\theta`, 'cd'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`5\int u^4\,du`));
    const L2 = R('line', EQ('p2'), T('p2t', r`u^5+C=\sin^5\theta+C`));
    const anti = sn => R('big', sn, T('b2', '+C', 'ink', { from: 'p2t' }));
    const sn0 = T('sn', r`\sin^5\theta`, 'ct', { from: 'p2t' });
    const rd = R('side', T('rd1', r`\sin\theta=\frac{\text{opp}}{\text{hyp}}=\frac{x}{\sqrt{3+x^2}}`, 'ct'));
    const swapped = anti(T('sn', r`\left(\frac{x}{\sqrt{3+x^2}}\right)^{5}`, 'cx', { from: 'rd1' }));
    const V = R('line', EQ('v1'), T('v1t', r`\frac{x^5}{(3+x^2)^{5/2}}+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`A fractional exponent hides a radical: $(3+x^2)^{7/2}=\big(\sqrt{3+x^2}\big)^7$. The numerator has [[cp:$x^4$]].`, [bigF([n15, x4, dx], [pw])]),
      S(1, r`Rewrite the [[cr:power]] as the seventh power of a [[cr:square root]].`, [bigF([n15, x4, dx], [lp, rad, rp])]),
      S(1, r`The radical matches $\sqrt{x^2+a^2}$ with $a^2=3$, so $a=\sqrt3$: Type II.`, [bigF([n15, x4, dx], [lp, rad, rp])], K.typeRows),
      S(1, r`Type II uses $x=a\tan\theta$, so [[cx:$x=\sqrt3\tan\theta$]].`, [bigF([n15, x4, dx], [lp, rad, rp])], [...K.typeRows, ...K.subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=\sqrt3\sec^2\theta\,d\theta$.`, [bigF([n15, x4, gdx], [lp, rad, rp]), K.dxRow], K.subRows),
      S(1, r`Replace [[cp:$x^4$]]: $(\sqrt3\tan\theta)^4=9\tan^4\theta$.`, [bigF([n15, gx4, gdx], [lp, rad, rp]), K.dxRow, x4R], K.subRows),
      S(1, r`Inside the [[cr:radical]]: $3\tan^2\theta+3=3(\tan^2\theta+1)=3\sec^2\theta$.`, [bigF([n15, gx4, gdx], [lp, grad, rp]), K.dxRow, x4R, R('work', ...rA)], [...K.subRows, ...K.idRows]),
      S(1, r`So $\sqrt{3+x^2}=\sqrt3\sec\theta$, because $\sec\theta>0$ on $(-\tfrac\pi2,\tfrac\pi2)$.`, [bigF([n15, gx4, gdx], [lp, grad, rp]), K.dxRow, x4R, R('work', ...rB)], [...K.subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [bigF([n15, x4v, dxv], [lp, r3, rp])], K.subRows),
      S(1, r`Seventh power: $(\sqrt3\sec\theta)^7=3^3\sqrt3\sec^7\theta=27\sqrt3\sec^7\theta$.`, [bigF([n15, x4v, dxv], [T('r3', r`27\sqrt3\sec^7\theta`, 'cr')])], K.subRows),
      S(1, r`Pull out the constants: $\tfrac{15\cdot9\cdot\sqrt3}{27\sqrt3}=5$. Powers of secant combine: $\tfrac{\sec^2\theta}{\sec^7\theta}=\tfrac1{\sec^5\theta}$.`, [R('big', k, int, F('f', [T('x4b', r`\tan^4\theta`, 'cp'), T('dxv', r`d\theta`, 'cd')], [T('r3', r`\sec^5\theta`, 'cr')]))], K.subRows),
      S(1, r`Rewrite in sines and cosines: $\tfrac{\tan^4\theta}{\sec^5\theta}=\tfrac{\sin^4\theta}{\cos^4\theta}\cdot\cos^5\theta=\sin^4\theta\cos\theta$.`, [p1top], [...K.subRows, ...sc]),
      S(2, r`An odd power of cosine: one $\cos\theta$ is exactly the $du$ for [[cx:$u=\sin\theta$]].`, [p1top], uRows),
      S(2, r`Substitute: $\sin^4\theta\cos\theta\,d\theta=u^4\,du$.`, [p1top, L1], uRows),
      S(2, r`$5\int u^4\,du=u^5$. Back to $\theta$: $u=\sin\theta$.`, [p1top, L1, L2], uRows),
      ...K.phase3(anti(sn0), [rd], r`We need $\sin\theta=\tfrac{\text{opp}}{\text{hyp}}$.`),
      S(3, r`Swap it in. The antiderivative is now in $x$.`, [swapped], [K.triHead, K.tri(ALL), rd]),
      S(3, r`Raise both pieces to the fifth power.`, [swapped, V], [K.triHead, K.tri(ALL), rd]),
    ];
  })(),
  heli: [[ln(r`x=\sqrt3\tan\theta`, 'cx'), ln(r`dx=\sqrt3\sec^2\theta\,d\theta`, 'cd'), ln(r`x^4=9\tan^4\theta`, 'cp'), ln(r`(3+x^2)^{7/2}=27\sqrt3\sec^7\theta`, 'cr'), ln(r`=5\int\sin^4\theta\cos\theta\,d\theta`, 'ct')],
  [ln(r`u=\sin\theta,\;du=\cos\theta\,d\theta`, 'muted'), ln(r`5\int u^4\,du=u^5`), ln(r`=\sin^5\theta+C`, 'ct')],
  [{ tri: triII('x', r`\sqrt3`, r`\sqrt{3+x^2}`, ALL) }, ln(r`\sin\theta=\tfrac{x}{\sqrt{3+x^2}}`), bx(r`\frac{x^5}{(3+x^2)^{5/2}}+C`)]] });

/* ===== Problem 12 ===== */
examples.push({ n: 12, label: 'Problem 12', type: 'Type III', verb: 'Compute', problem: r`\int\frac{27\sqrt{x^2-9}}{x^4}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`3\int\sin^2\theta\cos\theta\,d\theta`, r`\sin^3\theta+C`, r`\frac{(x^2-9)^{3/2}}{x^3}+C`],
  verify: [{ anti: { F: x => Math.pow(x * x - 9, 1.5) / Math.pow(x, 3), f: x => 27 * Math.sqrt(x * x - 9) / Math.pow(x, 4), range: [3.2, 9] } }],
  steps: (() => {
    const K = TSKit({ type: 'III', a: '3', a2: '9', rad: r`\sqrt{x^2-9}` });
    const n27 = T('n27', '27'), rad = T('rad', r`\sqrt{x^2-9}`, 'cr'), x4 = T('x4', r`x^4`, 'cp'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{x^2-9}`), gx4 = G('gx4', r`x^4`);
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('xsub', K.sub, 'cx')), R('side', H('note1', 'Take x &gt; 3, so tan θ ≥ 0', 'muted', { cls: 'note' }))];
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4);
    const x4R = R('work', x4, EQ('x4e'), T('x4a', r`(3\sec\theta)^4`, 'cp', { from: 'xsub' }), EQ('x4f'), T('x4b', r`81\sec^4\theta`, 'cp'));
    const x4v = T('x4b', r`81\sec^4\theta`, 'cp'), dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
    const k = T('k', r`\frac{27\cdot3\cdot3}{81}`, 'ink', { from: 'x4b' });
    const k3 = T('k', '3');
    const sc = [eyebrow('eb4', 'Sine and cosine'), R('side', T('id1', r`\tan\theta=\frac{\sin\theta}{\cos\theta}`, 'ct')), R('side', T('id2', r`\sec\theta=\frac{1}{\cos\theta}`, 'ct'))];
    const p1top = R('big', k3, int, T('x4b', r`\sin^2\theta`, 'ct'), T('r3', r`\cos\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const uRows = [eyebrow('eb5', 'u-substitution'), R('side', T('usub', r`u=\sin\theta`, 'cx')), R('side', T('du', r`du=\cos\theta\,d\theta`, 'cd'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`3\int u^2\,du`));
    const L2 = R('line', EQ('p2'), T('p2t', r`u^3+C=\sin^3\theta+C`));
    const anti = sn => R('big', sn, T('b2', '+C', 'ink', { from: 'p2t' }));
    const sn0 = T('sn', r`\sin^3\theta`, 'ct', { from: 'p2t' });
    const rd = R('side', T('rd1', r`\sin\theta=\frac{\text{opp}}{\text{hyp}}=\frac{\sqrt{x^2-9}}{x}`, 'ct'));
    const swapped = anti(T('sn', r`\left(\frac{\sqrt{x^2-9}}{x}\right)^{3}`, 'cr', { from: 'rd1' }));
    const V = R('line', EQ('v1'), T('v1t', r`\frac{(x^2-9)^{3/2}}{x^3}+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`Three pieces need replacing: the [[cr:radical]], [[cp:$x^4$]] in the denominator, and [[cd:$dx$]].`, [R('big', int, F('f', [n27, rad, dx], [x4]))]),
      S(1, r`The radical matches $\sqrt{x^2-a^2}$ with $a^2=9$, so $a=3$: Type III.`, [R('big', int, F('f', [n27, rad, dx], [x4]))], K.typeRows),
      S(1, r`Type III uses $x=a\sec\theta$, so [[cx:$x=3\sec\theta$]]. We take $x>3$ so the radical simplifies to $+3\tan\theta$.`, [R('big', int, F('f', [n27, rad, dx], [x4]))], [...K.typeRows, ...subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=3\sec\theta\tan\theta\,d\theta$.`, [R('big', int, F('f', [n27, rad, gdx], [x4])), K.dxRow], subRows),
      S(1, r`Replace [[cp:$x^4$]]: $(3\sec\theta)^4=81\sec^4\theta$.`, [R('big', int, F('f', [n27, rad, gdx], [gx4])), K.dxRow, x4R], subRows),
      S(1, r`Inside the [[cr:radical]]: $9\sec^2\theta-9=9(\sec^2\theta-1)=9\tan^2\theta$.`, [R('big', int, F('f', [n27, grad, gdx], [gx4])), K.dxRow, x4R, R('work', ...rA)], [...subRows, ...K.idRows]),
      S(1, r`So $\sqrt{x^2-9}=3\tan\theta$.`, [R('big', int, F('f', [n27, grad, gdx], [gx4])), K.dxRow, x4R, R('work', ...rB)], [...subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', int, F('f', [n27, r3, dxv], [x4v]))], subRows),
      S(1, r`Pull out the constants: $\tfrac{27\cdot3\cdot3}{81}=3$. The secants combine: $\tfrac{\sec\theta}{\sec^4\theta}=\tfrac1{\sec^3\theta}$.`, [R('big', k, int, F('f', [T('r3', r`\tan\theta\cdot\tan\theta`, 'cr'), T('dxv', r`d\theta`, 'cd')], [T('x4b', r`\sec^3\theta`, 'cp')]))], subRows),
      S(1, r`Rewrite in sines and cosines: $\tfrac{\tan^2\theta}{\sec^3\theta}=\tfrac{\sin^2\theta}{\cos^2\theta}\cdot\cos^3\theta=\sin^2\theta\cos\theta$.`, [p1top], [...subRows, ...sc]),
      S(2, r`An odd power of cosine: one $\cos\theta$ is exactly the $du$ for [[cx:$u=\sin\theta$]].`, [p1top], uRows),
      S(2, r`Substitute: $\sin^2\theta\cos\theta\,d\theta=u^2\,du$.`, [p1top, L1], uRows),
      S(2, r`$3\int u^2\,du=u^3$. Back to $\theta$: $u=\sin\theta$.`, [p1top, L1, L2], uRows),
      ...K.phase3(anti(sn0), [rd], r`We need $\sin\theta=\tfrac{\text{opp}}{\text{hyp}}$.`),
      S(3, r`Swap it in. The antiderivative is now in $x$.`, [swapped], [K.triHead, K.tri(ALL), rd]),
      S(3, r`Cube the numerator and the denominator.`, [swapped, V], [K.triHead, K.tri(ALL), rd]),
    ];
  })(),
  heli: [[ln(r`x=3\sec\theta`, 'cx'), ln(r`dx=3\sec\theta\tan\theta\,d\theta`, 'cd'), ln(r`x^4=81\sec^4\theta`, 'cp'), ln(r`\sqrt{x^2-9}=3\tan\theta`, 'cr'), ln(r`=3\int\sin^2\theta\cos\theta\,d\theta`, 'ct')],
  [ln(r`u=\sin\theta,\;du=\cos\theta\,d\theta`, 'muted'), ln(r`3\int u^2\,du=u^3`), ln(r`=\sin^3\theta+C`, 'ct')],
  [{ tri: triIII('x', '3', r`\sqrt{x^2-9}`, ALL) }, ln(r`\sin\theta=\tfrac{\sqrt{x^2-9}}{x}`), bx(r`\frac{(x^2-9)^{3/2}}{x^3}+C`)]] });

examples.push(fam32I({ n: 13, c: '9', a: '3', a2: '9', a3: '27', aEq: r`a^2=9\;\Rightarrow\;a=3`, a2n: 9, cn: 9,
  kTex: r`\frac{9\cdot3}{27}`, constSay: r`Pull out the constants: $\tfrac{9\cdot3}{27}$.` }));

/* ===== Problem 14 ===== */
examples.push({ n: 14, label: 'Problem 14', type: 'Type III', verb: 'Evaluate', problem: r`\int\frac{25}{(x^2-25)^{3/2}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`\int\frac{\cos\theta}{\sin^2\theta}\,d\theta`, r`-\csc\theta+C`, r`-\frac{x}{\sqrt{x^2-25}}+C`],
  verify: [{ anti: { F: x => -x / Math.sqrt(x * x - 25), f: x => 25 / Math.pow(x * x - 25, 1.5), range: [5.3, 12] } }],
  steps: (() => {
    const K = TSKit({ type: 'III', a: '5', a2: '25', rad: r`\sqrt{x^2-25}` });
    const n25 = T('n25', '25'), dx = K.dx, gdx = K.gdx, pw = T('pw', r`(x^2-25)^{3/2}`, 'cp');
    const lp = T('lp', r`\Big(`, 'ink', { from: 'pw' }), rad = T('rad', r`\sqrt{x^2-25}`, 'cr', { from: 'pw' }), rp = T('rp', r`\Big)^{3}`, 'ink', { from: 'pw' });
    const grad = G('grad', r`\sqrt{x^2-25}`), rA = K.radA(rad), rB = K.radB(rad);
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('xsub', K.sub, 'cx')), R('side', H('note1', 'Take x &gt; 5, so tan θ ≥ 0', 'muted', { cls: 'note' }))];
    const dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
    const k = T('k', r`\frac{25\cdot5}{125}`, 'ink', { from: 'r3' });
    const sc = [eyebrow('eb4', 'Sine and cosine'), R('side', T('id1', r`\sec\theta=\frac{1}{\cos\theta},\;\tan\theta=\frac{\sin\theta}{\cos\theta}`, 'ct')), R('side', T('id2', r`\frac{\sec\theta}{\tan^2\theta}=\frac{\cos\theta}{\sin^2\theta}`, 'ct'))];
    const p1top = R('big', int, F('f', [T('dxv', r`\cos\theta\,d\theta`, 'cd')], [T('r3', r`\sin^2\theta`, 'ct')]));
    const uRows = [eyebrow('eb5', 'u-substitution'), R('side', T('usub', r`u=\sin\theta`, 'cx')), R('side', T('du', r`du=\cos\theta\,d\theta`, 'cd'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\int u^{-2}\,du`));
    const L2 = R('line', EQ('p2'), T('p2t', r`-\frac1u+C=-\csc\theta+C`));
    const warn = WARN('w1', r`<b>Heads-up.</b> The printed solution ends with $+\csc\theta$. Since $\int u^{-2}\,du=-\tfrac1u$, the sign is negative. Differentiating $-\tfrac{x}{\sqrt{x^2-25}}$ gives $\tfrac{25}{(x^2-25)^{3/2}}$, which confirms it.`);
    const anti = cs => R('big', T('mi', '-', 'ink', { from: 'p2t' }), cs, T('b2', '+C', 'ink', { from: 'p2t' }));
    const cs0 = T('cs', r`\csc\theta`, 'ct', { from: 'p2t' });
    const rd = R('side', T('rd1', r`\csc\theta=\frac{\text{hyp}}{\text{opp}}=\frac{x}{\sqrt{x^2-25}}`, 'ct'));
    const swapped = anti(T('cs', r`\frac{x}{\sqrt{x^2-25}}`, 'cx', { from: 'rd1' }));
    return [
      S(1, r`A fractional exponent hides a radical: $(x^2-25)^{3/2}=\big(\sqrt{x^2-25}\big)^3$.`, [bigF([n25, dx], [pw])]),
      S(1, r`Rewrite the [[cp:power]] as the cube of a [[cr:square root]].`, [bigF([n25, dx], [lp, rad, rp])]),
      S(1, r`The radical matches $\sqrt{x^2-a^2}$ with $a^2=25$, so $a=5$: Type III.`, [bigF([n25, dx], [lp, rad, rp])], K.typeRows),
      S(1, r`Type III uses $x=a\sec\theta$, so [[cx:$x=5\sec\theta$]]. We take $x>5$ so the radical simplifies to $+5\tan\theta$.`, [bigF([n25, dx], [lp, rad, rp])], [...K.typeRows, ...subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=5\sec\theta\tan\theta\,d\theta$.`, [bigF([n25, gdx], [lp, rad, rp]), K.dxRow], subRows),
      S(1, r`Inside the [[cr:radical]]: $25\sec^2\theta-25=25(\sec^2\theta-1)=25\tan^2\theta$.`, [bigF([n25, gdx], [lp, grad, rp]), K.dxRow, R('work', ...rA)], [...subRows, ...K.idRows]),
      S(1, r`So $\sqrt{x^2-25}=5\tan\theta$.`, [bigF([n25, gdx], [lp, grad, rp]), K.dxRow, R('work', ...rB)], [...subRows, ...K.idRows]),
      S(1, r`Both replacements return to the integral.`, [bigF([n25, dxv], [lp, r3, rp])], subRows),
      S(1, r`Cube it: $(5\tan\theta)^3=125\tan^3\theta$.`, [bigF([n25, dxv], [T('r3', r`125\tan^3\theta`, 'cr')])], subRows),
      S(1, r`Pull out the constants: $\tfrac{25\cdot5}{125}=1$. One $\tan\theta$ cancels: $\tfrac{\sec\theta\tan\theta}{\tan^3\theta}=\tfrac{\sec\theta}{\tan^2\theta}$.`, [R('big', k, int, F('f', [T('dxv', r`\sec\theta\,d\theta`, 'cd')], [T('r3', r`\tan^2\theta`, 'cr')]))], subRows),
      S(1, r`Rewrite in sines and cosines: $\tfrac{\sec\theta}{\tan^2\theta}=\tfrac{\cos\theta}{\sin^2\theta}$. Phase 1 is done.`, [p1top], [...subRows, ...sc]),
      S(2, r`$\cos\theta\,d\theta$ is exactly the $du$ for [[cx:$u=\sin\theta$]].`, [p1top], uRows),
      S(2, r`Substitute: $\tfrac{\cos\theta\,d\theta}{\sin^2\theta}=u^{-2}\,du$.`, [p1top, L1], uRows),
      S(2, r`$\int u^{-2}\,du=-\tfrac1u$. Back to $\theta$: $-\tfrac1{\sin\theta}=-\csc\theta$.`, [p1top, L1, L2], uRows),
      S(2, r`Before moving on, a check on the printed solution.`, [p1top, L1, L2], [eyebrow('eb7', 'Check'), R('side', warn)]),
      ...K.phase3(anti(cs0), [rd], r`We need $\csc\theta=\tfrac{\text{hyp}}{\text{opp}}$.`),
      S(3, r`Swap it in. The antiderivative is now in $x$.`, [swapped], [K.triHead, K.tri(ALL), rd]),
    ];
  })(),
  heli: [[ln(r`x=5\sec\theta`, 'cx'), ln(r`dx=5\sec\theta\tan\theta\,d\theta`, 'cd'), ln(r`(x^2-25)^{3/2}=125\tan^3\theta`, 'cr'), ln(r`=\int\frac{\cos\theta}{\sin^2\theta}\,d\theta`, 'ct')],
  [ln(r`u=\sin\theta,\;du=\cos\theta\,d\theta`, 'muted'), ln(r`\int u^{-2}\,du=-\tfrac1u`), ln(r`=-\csc\theta+C`, 'ct')],
  [{ tri: triIII('x', '5', r`\sqrt{x^2-25}`, ALL) }, ln(r`\csc\theta=\tfrac{x}{\sqrt{x^2-25}}`), bx(r`-\frac{x}{\sqrt{x^2-25}}+C`)]] });

/* ===== Problem 15 ===== */
examples.push({ n: 15, label: 'Problem 15', type: 'Type III', verb: 'Evaluate', problem: r`\int\frac{3x^3}{\sqrt{x^2-1}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`3\int\sec^4\theta\,d\theta`, r`3\tan\theta+\tan^3\theta+C`, r`3\sqrt{x^2-1}+(x^2-1)^{3/2}+C`],
  verify: [{ anti: { F: x => 3 * Math.sqrt(x * x - 1) + Math.pow(x * x - 1, 1.5), f: x => 3 * x * x * x / Math.sqrt(x * x - 1), range: [1.2, 4] } }],
  steps: (() => {
    const K = TSKit({ type: 'III', a: '1', a2: '1', rad: r`\sqrt{x^2-1}`, aEq: r`a^2=1\;\Rightarrow\;a=1`, sub: r`x=\sec\theta`, dxTex: r`\sec\theta\tan\theta\,d\theta` });
    const n3 = T('n3', '3'), x3 = T('x3', r`x^3`, 'cp'), rad = T('rad', r`\sqrt{x^2-1}`, 'cr'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{x^2-1}`), gx3 = G('gx3', r`x^3`);
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('xsub', K.sub, 'cx')), R('side', H('note1', 'Take x &gt; 1, so tan θ ≥ 0', 'muted', { cls: 'note' }))];
    const x3R = R('work', x3, EQ('x3e'), T('x3a', r`(\sec\theta)^3`, 'cp', { from: 'xsub' }), EQ('x3f'), T('x3b', r`\sec^3\theta`, 'cp'));
    const rA = [rad, EQ('e4'), T('r1', r`\sqrt{\class{cx}{\sec^2\theta}-1}`, 'cr', { from: 'xsub' }), EQ('e5'), T('r2', r`\sqrt{\tan^2\theta}`, 'cr')];
    const rB = [...rA, EQ('e6'), T('r3', r`\tan\theta`, 'cr')];
    const x3v = T('x3b', r`\sec^3\theta`, 'cp'), dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', r`\tan\theta`, 'cr');
    const secTop = R('big', n3, int, T('x3b', r`\sec^4\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const idS = [eyebrow('eb4', 'Pythagorean identity'), R('side', T('id1', r`\sec^2\theta=1+\tan^2\theta`, 'ct'))];
    const uRows = [eyebrow('eb5', 'u-substitution'), R('side', T('usub', r`u=\tan\theta`, 'cx')), R('side', T('du', r`du=\sec^2\theta\,d\theta`, 'cd'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`3\int(1+\tan^2\theta)\sec^2\theta\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`3\int(1+u^2)\,du`));
    const L3 = R('line', EQ('p3'), T('p3t', r`3\Big(u+\tfrac{u^3}{3}\Big)+C=3\tan\theta+\tan^3\theta+C`));
    const anti = (a, b) => R('big', T('b1', '3', 'ink', { from: 'p3t' }), a, T('pl', '+', 'ink', { from: 'p3t' }), b, T('b2', '+C', 'ink', { from: 'p3t' }));
    const tn0 = T('tn', r`\tan\theta`, 'ct', { from: 'p3t' }), tc0 = T('tc', r`\tan^3\theta`, 'ct', { from: 'p3t' });
    const rd = R('side', T('rd1', r`\tan\theta=\frac{\text{opp}}{\text{adj}}=\sqrt{x^2-1}`, 'ct'));
    const swapped = R('big', T('b1', '3', 'ink'), T('tn', r`\sqrt{x^2-1}`, 'cr', { from: 'rd1' }), T('pl', '+', 'ink'), T('tc', r`\big(\sqrt{x^2-1}\big)^3`, 'cr', { from: 'rd1' }), T('b2', '+C', 'ink'));
    const V = R('line', EQ('v1'), T('v1t', r`3\sqrt{x^2-1}+(x^2-1)^{3/2}+C`, 'ink', { cls: 'boxed' }));
    const note = RICH('nt', r`With $3x^3$ on top, plain $u=x^2-1$ would also work. The trig substitution reaches the same answer.`, { cls: 'mini' });
    return [
      S(1, r`Three pieces need replacing: [[cp:$x^3$]], the [[cr:radical]], and [[cd:$dx$]].`, [R('big', int, F('f', [n3, x3, dx], [rad]))]),
      S(1, r`The radical matches $\sqrt{x^2-a^2}$ with $a^2=1$, so $a=1$: Type III.`, [R('big', int, F('f', [n3, x3, dx], [rad]))], K.typeRows),
      S(1, r`Type III uses $x=a\sec\theta$, which here is simply [[cx:$x=\sec\theta$]]. We take $x>1$.`, [R('big', int, F('f', [n3, x3, dx], [rad]))], [...K.typeRows, ...subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=\sec\theta\tan\theta\,d\theta$.`, [R('big', int, F('f', [n3, x3, gdx], [rad])), K.dxRow], subRows),
      S(1, r`Replace [[cp:$x^3$]]: $(\sec\theta)^3=\sec^3\theta$.`, [R('big', int, F('f', [n3, gx3, gdx], [rad])), K.dxRow, x3R], subRows),
      S(1, r`Inside the [[cr:radical]]: $\sec^2\theta-1=\tan^2\theta$, so $\sqrt{x^2-1}=\tan\theta$.`, [R('big', int, F('f', [n3, gx3, gdx], [grad])), K.dxRow, x3R, R('work', ...rB)], [...subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', int, F('f', [n3, x3v, dxv], [r3]))], subRows),
      S(1, r`The $\tan\theta$ from $dx$ cancels the $\tan\theta$ in the denominator.`, [R('big', int, F('f', [n3, x3v, T('dxv', r`\sec\theta\,\cancel{\tan\theta}\,d\theta`, 'cd')], [T('r3', r`\cancel{\tan\theta}`, 'cr')]))], subRows),
      S(1, r`Multiply the secants: $\sec^3\theta\cdot\sec\theta=\sec^4\theta$. Phase 1 is done.`, [secTop], subRows),
      S(2, r`An even power of secant: save one $\sec^2\theta$ and convert the other with $\sec^2\theta=1+\tan^2\theta$.`, [secTop, L1], idS),
      S(2, r`Let [[cx:$u=\tan\theta$]], so $du=\sec^2\theta\,d\theta$. The integral becomes a polynomial.`, [secTop, L1, L2], uRows),
      S(2, r`Integrate with the power rule, then return to $\theta$.`, [secTop, L1, L2, L3], uRows),
      ...K.phase3(anti(tn0, tc0), [rd], r`We need $\tan\theta=\tfrac{\text{opp}}{\text{adj}}$. Here the adjacent side is 1.`),
      S(3, r`Swap it into both terms.`, [swapped], [K.triHead, K.tri(ALL), rd]),
      S(3, r`That is the answer: $3\sqrt{x^2-1}+(x^2-1)^{3/2}+C$.`, [swapped, V], [K.triHead, K.tri(ALL), rd, R('side', note)]),
    ];
  })(),
  heli: [[ln(r`x=\sec\theta`, 'cx'), ln(r`dx=\sec\theta\tan\theta\,d\theta`, 'cd'), ln(r`x^3=\sec^3\theta`, 'cp'), ln(r`\sqrt{x^2-1}=\tan\theta`, 'cr'), ln(r`=3\int\sec^4\theta\,d\theta`, 'ct')],
  [ln(r`u=\tan\theta,\;du=\sec^2\theta\,d\theta`, 'muted'), ln(r`3\int(1+u^2)\,du`), ln(r`=3\tan\theta+\tan^3\theta+C`, 'ct')],
  [{ tri: triIII('x', '1', r`\sqrt{x^2-1}`, ALL) }, ln(r`\tan\theta=\sqrt{x^2-1}`), bx(r`3\sqrt{x^2-1}+(x^2-1)^{3/2}+C`)]] });

examples.push(fam32II({ n: 16, c: '72', a: '6', a2: '36', a3: '216', aEq: r`a^2=36\;\Rightarrow\;a=6`, a2n: 36, cn: 72, kn: 2, kTex: r`\frac{72\cdot6}{216}`, kRed: '2', radIn: 'x^2+36', powTex: '(x^2+36)^{3/2}',
  aSub: '6', dxHeli: r`6\sec^2\theta\,d\theta`, constSay: r`Pull out the constants: $\tfrac{72\cdot6}{216}=2$.` }));

examples.sort((p, q) => p.n - q.n);

/* ===== intro ===== */
const intro23 = [
  { id: 'title', label: 'Title', head: { eb: 'MATH 1400 · Lecture 23 practice problems', prob: null }, layout: 'full', tag: '',
    say: r`Sixteen problems, each walked through in three phases. Press → or click to begin.`,
    main: [R('eyebrow', H('t1', 'Problem set · Lecture 23')), R('display', H('t2', 'Trigonometric Substitution', 'ink')),
      R('lead', H('t3', 'Replace the radical with a triangle. Integrate. Come back.')),
      R('chips', H('c1', '<b>1</b>Substitute', 'ink', { cls: 'chip' }), H('c2', '<b>2</b>Integrate', 'ink', { cls: 'chip' }), H('c3', '<b>3</b>Back to x', 'ink', { cls: 'chip' })),
      R('sample', T('s1', r`\sqrt{a^2-x^2}`, 'cr'), T('s2', r`\;\xrightarrow{\;x\,=\,a\sin\theta\;}\;`, 'cx'), T('s3', r`a\cos\theta`, 'cr'))], side: [] },
  { id: 'types', label: 'The three substitutions', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Each substitution comes from one ratio in a right triangle. The [[cr:radical]] always becomes a side, and the Pythagorean theorem is what makes it disappear.`,
    main: [R('cols',
      ST([H('o1h', 'Type I', 'muted', { cls: 'eyebrow' })], [T('o1f', r`\sqrt{a^2-x^2}`, 'cr')], [T('o1s', r`x=a\sin\theta`, 'cx')], [TRI('o1t', { ...triI('x', 'a', r`\sqrt{a^2-x^2}`, ALL), sm: true })], [T('o1r', r`\sqrt{a^2-x^2}=a\cos\theta`, 'muted')]),
      ST([H('o2h', 'Type II', 'muted', { cls: 'eyebrow' })], [T('o2f', r`\sqrt{x^2+a^2}`, 'cr')], [T('o2s', r`x=a\tan\theta`, 'cx')], [TRI('o2t', { ...triII('x', 'a', r`\sqrt{x^2+a^2}`, ALL), sm: true })], [T('o2r', r`\sqrt{x^2+a^2}=a\sec\theta`, 'muted')]),
      ST([H('o3h', 'Type III', 'muted', { cls: 'eyebrow' })], [T('o3f', r`\sqrt{x^2-a^2}`, 'cr')], [T('o3s', r`x=a\sec\theta`, 'cx')], [TRI('o3t', { ...triIII('x', 'a', r`\sqrt{x^2-a^2}`, ALL), sm: true })], [T('o3r', r`\sqrt{x^2-a^2}=\pm a\tan\theta`, 'muted')]))], side: [] },
  { id: 'map', label: 'The sixteen problems', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Problems 1 to 5 hand you the substitution and ask you to rewrite the answer in $x$. Problems 6 and 7 are $\theta$-integrals with a twist. Problems 8 to 16 are the full three-phase job.`,
    main: [R('cols',
      ST([H('m1h', 'Rewrite in x · 1–5', 'muted', { cls: 'eyebrow' })], [T('m1a', r`\int\sqrt{4-x^2}\,dx`, 'cr')], [T('m1b', r`\int\frac{x^2}{\sqrt{9-x^2}}\,dx`, 'cr')], [T('m1c', r`\int\frac{x^2}{(4-x^2)^{3/2}}\,dx`, 'cr')], [T('m1d', r`\int\frac{\sqrt{x^2-4}}{x}\,dx`, 'cr')], [T('m1e', r`\int2x^2\sqrt{1-x^2}\,dx`, 'cr')]),
      ST([H('m2h', 'θ-integrals · 6–7', 'muted', { cls: 'eyebrow' })], [T('m2a', r`\int\sec^4(5\theta)\,d\theta`, 'ct')], [T('m2b', r`\int\cos^3(2\theta)\sin^2(2\theta)\,d\theta`, 'ct')]),
      ST([H('m3h', 'Compute · 8–16', 'muted', { cls: 'eyebrow' })], [T('m3a', r`\int\frac{5}{(5-x^2)^{3/2}}\,dx`, 'cr')], [T('m3b', r`\int\frac{3}{(3+x^2)^{3/2}}\,dx`, 'cr')], [T('m3c', r`\int\frac{24}{x^2\sqrt{x^2-48}}\,dx`, 'cr')], [T('m3d', r`\int\frac{15x^4}{(3+x^2)^{7/2}}\,dx`, 'cr')], [T('m3e', r`\int\frac{27\sqrt{x^2-9}}{x^4}\,dx`, 'cr')], [H('m3f', '…and four more', 'muted', { cls: 'mini' })]))], side: [] },
];

LESSON({ key: 'l23', title: 'Lecture 23 · Trig Substitution in Motion', intro: intro23, examples });
