/* Week 8 · Quiz B + deck assembly */

/* ===== Quiz B · Q1 ===== */
examples.push({ n: 6, label: 'Quiz B · Q1', type: 'Pythagorean identities', verb: 'Select', problem: '', problemHtml: r`all correct identities`, phases: ['Anchor', 'Derive', 'Test'],
  track: [r`\sin^2\theta+\cos^2\theta=1`, r`\tan^2\theta+1=\sec^2\theta,\;\;1+\cot^2\theta=\csc^2\theta`, r`\sin^2+\cos^2,\;\sec^2-\tan^2,\;\csc^2-\cot^2`],
  verify: [{ equal: { a: t => Math.pow(1 / Math.cos(t), 2) - Math.pow(Math.tan(t), 2), b: () => 1, range: [0.1, 1.4] } }, { equal: { a: t => Math.pow(1 / Math.sin(t), 2) - Math.pow(1 / Math.tan(t), 2), b: () => 1, range: [0.1, 1.4] } }],
  steps: (() => {
    const th = 0.9, px = Math.cos(th), py = Math.sin(th);
    const P = PlotKit({ w: 560, h: 430, xr: [-1.45, 1.45], yr: [-1.12, 1.12], pad: { l: 30, r: 30, t: 14, b: 14 } });
    P.axes('axes', { xt: [-1, 1], yt: [-1, 1] }).circle('circle', 0, 0, 1, 'cx')
      .line('radius', 0, 0, px, py, 'ca', { width: 3.5, text: '1', at: [px / 2, py / 2], dx: -18, dy: -6 })
      .line('legx', 0, 0, px, 0, 'cr', { width: 4, text: 'cos θ', at: [px / 2, 0], dx: -22, dy: 24 })
      .line('legy', px, 0, px, py, 'cd', { width: 4, text: 'sin θ', at: [px, py / 2], dx: 10, dy: 4 })
      .dot('pt', px, py, 'ca').arc('arc', 0, 0, 0.22, 0, th, 'ink', { text: 'θ', tdx: 10, tdy: 2 });
    const spec = P.spec('unitcircle');
    const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
    const uc = [eyebrow('eb1', 'Unit circle'), R('side', T('uc1', r`x^2+y^2=1`, 'cx'))];
    const uc2 = [eyebrow('eb1', 'Unit circle'), R('side', T('uc1', r`x^2+y^2=1`, 'cx')), R('side', T('uc2', r`(\cos\theta)^2+(\sin\theta)^2=1`, 'ct'))];
    const base = R('big', T('i0', r`\sin^2\theta+\cos^2\theta=1`, 'ct', { cls: 'boxed' }));
    const row2 = R('line', T('i1', r`\frac{\sin^2\theta}{\cos^2\theta}+\frac{\cos^2\theta}{\cos^2\theta}=\frac1{\cos^2\theta}`));
    const row3 = R('line', T('i2', r`\tan^2\theta+1=\sec^2\theta`, 'ct', { cls: 'boxed' }));
    const row4 = R('line', T('i3', r`1+\cot^2\theta=\csc^2\theta`, 'ct', { cls: 'boxed' }));
    const row5 = R('line', T('i4', r`\frac{\sin^2\theta}{\sin^2\theta}+\frac{\cos^2\theta}{\sin^2\theta}=\frac1{\sin^2\theta}`));
    const row6 = R('line', T('i5', r`\sec^2\theta-\tan^2\theta=1\qquad\csc^2\theta-\cot^2\theta=1`, 'ct'));
    const divC = [eyebrow('eb2', 'Divide by cos²θ'), R('side', T('d1', r`\tfrac{\sin\theta}{\cos\theta}=\tan\theta`, 'ct')), R('side', T('d2', r`\tfrac{1}{\cos\theta}=\sec\theta`, 'ct'))];
    const divS = [eyebrow('eb3', 'Divide by sin²θ'), R('side', T('d3', r`\tfrac{\cos\theta}{\sin\theta}=\cot\theta`, 'ct')), R('side', T('d4', r`\tfrac{1}{\sin\theta}=\csc\theta`, 'ct'))];
    const tbl = RICH('tbl', optTable(['Option', 'At θ = π/4', 'Verdict'], [
      { cells: [r`$\tan^2\theta-\sec^2\theta=1$`, r`$1-2=-1$`, '✗'] },
      { cells: [r`$\sin^2\theta-\cos^2\theta=1$`, r`$\tfrac12-\tfrac12=0$`, '✗'] },
      { cells: [r`$\tan^2\theta+\sec^2\theta=1$`, r`$1+2=3$`, '✗'] },
      { cells: [r`$\cos^2\theta-\sin^2\theta=1$`, r`$0$`, '✗'] },
      { hl: true, cells: [r`$\sec^2\theta-\tan^2\theta=1$`, r`$2-1=1$`, '✓'] },
      { cells: [r`$\cot^2\theta+\csc^2\theta=1$`, r`$1+2=3$`, '✗'] },
      { cells: [r`$\cot^2\theta-\csc^2\theta=1$`, r`$1-2=-1$`, '✗'] },
      { hl: true, cells: [r`$\sin^2\theta+\cos^2\theta=1$`, r`$\tfrac12+\tfrac12=1$`, '✓'] },
      { hl: true, cells: [r`$\csc^2\theta-\cot^2\theta=1$`, r`$2-1=1$`, '✓'] }]), { cls: 'tablecard sm' });
    const rule = [eyebrow('eb4', 'The pattern'), R('side', T('pt1', r`\sec^2-\tan^2=1`, 'ct')), R('side', T('pt2', r`\csc^2-\cot^2=1`, 'ct')), R('side', RICH('pt3', r`The <b>squared “co-” partner</b> never sits on the same side with a plus.`, { cls: 'mini' }))];
    return [
      S(1, r`Nine options, three true. Anchor on the one you can see: a point on the unit circle.`, [plot(['axes', 'circle'])], uc),
      S(1, r`Pick a point at angle $\theta$. The radius from the origin has length 1.`, [plot(['axes', 'circle', 'radius', 'pt', 'arc'])], uc),
      S(1, r`Drop a perpendicular. The legs of the right triangle are the coordinates: [[cr:$\cos\theta$]] across and [[cd:$\sin\theta$]] up.`, [plot(['axes', 'circle', 'radius', 'pt', 'arc', 'legx', 'legy'])], uc),
      S(1, r`The Pythagorean theorem on that triangle, $x^2+y^2=1$, is the first identity: $\cos^2\theta+\sin^2\theta=1$.`, [plot(['axes', 'circle', 'radius', 'pt', 'arc', 'legx', 'legy'])], uc2),
      S(2, r`The other two identities are the first one in disguise. Divide every term by $\cos^2\theta$.`, [base, row2], [...divC, plot(['axes', 'circle', 'radius', 'pt', 'arc', 'legx', 'legy'], 'xs')]),
      S(2, r`$\tfrac{\sin^2\theta}{\cos^2\theta}=\tan^2\theta$, the middle term is 1, and $\tfrac1{\cos^2\theta}=\sec^2\theta$.`, [base, row2, row3], divC),
      S(2, r`Divide the original by $\sin^2\theta$ instead.`, [base, row3, row5], divS),
      S(2, r`$\tfrac{\cos^2\theta}{\sin^2\theta}=\cot^2\theta$ and $\tfrac1{\sin^2\theta}=\csc^2\theta$.`, [base, row3, row4], divS),
      S(2, r`Move the tangent and cotangent terms across: the same two identities read as differences equal to 1.`, [base, row3, row4, row6], [eyebrow('eb5', 'Rearranged'), R('side', T('rr1', r`\tan^2\theta+1=\sec^2\theta`, 'ct')), R('side', T('rr1b', r`\sec^2\theta-\tan^2\theta=1`, 'ct', { cls: 'boxed' })), R('side', T('rr2', r`1+\cot^2\theta=\csc^2\theta`, 'ct')), R('side', T('rr2b', r`\csc^2\theta-\cot^2\theta=1`, 'ct', { cls: 'boxed' }))]),
      S(3, r`Test every option at a convenient angle, $\theta=\tfrac\pi4$, where $\sin=\cos=\tfrac{\sqrt2}{2}$, $\tan=\cot=1$, $\sec=\csc=\sqrt2$.`, [R('tablerow', tbl)], rule),
      S(3, r`Three survive: $\sec^2-\tan^2$, $\sin^2+\cos^2$ and $\csc^2-\cot^2$. Each matches an identity we derived.`, [R('tablerow', tbl)], rule),
    ];
  })(),
  heli: [[ln(r`\text{unit circle: }x^2+y^2=1`, 'muted'), ln(r`\cos^2\theta+\sin^2\theta=1`, 'ct')],
  [ln(r`\div\cos^2\theta:\;\tan^2\theta+1=\sec^2\theta`, 'ct'), ln(r`\div\sin^2\theta:\;1+\cot^2\theta=\csc^2\theta`, 'ct'), ln(r`\sec^2-\tan^2=1,\;\csc^2-\cot^2=1`, 'muted')],
  [ln(r`\text{test at }\theta=\tfrac\pi4`, 'muted'), ln(r`\sec^2-\tan^2=1`, 'cr'), ln(r`\sin^2+\cos^2=1`, 'cr'), bx(r`\csc^2-\cot^2=1`)]] });

/* ===== Quiz B · Q2 ===== */
examples.push({ n: 7, label: 'Quiz B · Q2', type: 'Type III · x = a sec θ', verb: 'Evaluate', problem: r`\int\frac{x^4}{\sqrt{x^2-4}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`16\int\sec^5\theta\,d\theta`, r`4\sec^3\theta\tan\theta+6\sec\theta\tan\theta+6\ln|\sec\theta+\tan\theta|+C`, r`\tfrac{x^3\sqrt{x^2-4}}{4}+\tfrac{3x\sqrt{x^2-4}}{2}+6\ln\left|\tfrac{x+\sqrt{x^2-4}}{2}\right|+C`],
  verify: [{ anti: { F: x => Math.pow(x, 3) * Math.sqrt(x * x - 4) / 4 + 3 * x * Math.sqrt(x * x - 4) / 2 + 6 * Math.log((x + Math.sqrt(x * x - 4)) / 2), f: x => Math.pow(x, 4) / Math.sqrt(x * x - 4), range: [2.3, 6] } }],
  steps: (() => {
    const K = TSKit({ type: 'III', a: '2', a2: '4', rad: r`\sqrt{x^2-4}` });
    const x4 = T('x4', r`x^4`, 'cp'), rad = T('rad', r`\sqrt{x^2-4}`, 'cr'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{x^2-4}`), gx4 = G('gx4', r`x^4`);
    const subRows = [eyebrow('eb2', 'Substitution'), R('side', T('xsub', K.sub, 'cx')), R('side', H('note1', 'Take x &gt; 2, so tan θ ≥ 0', 'muted', { cls: 'note' }))];
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4);
    const x4R = R('work', x4, EQ('x4e'), T('x4a', r`(2\sec\theta)^4`, 'cp', { from: 'xsub' }), EQ('x4f'), T('x4b', r`16\sec^4\theta`, 'cp'));
    const x4v = T('x4b', r`16\sec^4\theta`, 'cp'), dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
    const p1top = R('big', T('k', '16', 'ink', { from: 'x4b' }), int, T('x4b', r`\sec^5\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const quizSay = [eyebrow('eb7', 'The quiz answer'), R('side', T('qa', r`a=2,\qquad\int2^4\sec^5\theta\,d\theta`, 'cr', { cls: 'boxed' })), R('side', RICH('qn', r`The quiz stops here. Phases 2 and 3 finish the integral.`, { cls: 'mini' }))];
    const red = [eyebrow('eb4', 'Reduction formula'), R('side', T('rf', r`\int\sec^n\theta\,d\theta=`, 'ct')), R('side', T('rf2', r`\frac{\sec^{n-2}\theta\tan\theta}{n-1}`, 'ct')), R('side', T('rf3', r`+\frac{n-2}{n-1}\int\sec^{n-2}\theta\,d\theta`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`16\Big[\tfrac14\sec^3\theta\tan\theta+\tfrac34\int\sec^3\theta\,d\theta\Big]`));
    const L2 = R('line', EQ('p2'), T('p2t', r`4\sec^3\theta\tan\theta+12\int\sec^3\theta\,d\theta`));
    const L3 = R('line', EQ('p3'), T('p3t', r`4\sec^3\theta\tan\theta+12\Big[\tfrac12\sec\theta\tan\theta+\tfrac12\ln|\sec\theta+\tan\theta|\Big]`));
    const L4 = R('line', EQ('p4'), T('p4t', r`4\sec^3\theta\tan\theta+6\sec\theta\tan\theta+6\ln|\sec\theta+\tan\theta|+C`));
    const red3 = [eyebrow('eb5', 'Reduction formula, n = 3'), R('side', T('rg', r`\int\sec^3\theta\,d\theta`, 'ct')), R('side', T('rg2', r`=\tfrac12\sec\theta\tan\theta`, 'ct')), R('side', T('rg3', r`+\tfrac12\ln|\sec\theta+\tan\theta|`, 'ct'))];
    const A = [R('line', T('t1', r`4\sec^3\theta\tan\theta`, 'ct', { from: 'p4t' })), R('line', T('t2', r`+\,6\sec\theta\tan\theta`, 'ct', { from: 'p4t' })), R('line', T('t3', r`+\,6\ln|\sec\theta+\tan\theta|+C`, 'ct', { from: 'p4t' }))];
    const reads = [R('side', T('rd1', r`\sec\theta=\tfrac x2`, 'cx')), R('side', T('rd2', r`\tan\theta=\tfrac{\sqrt{x^2-4}}{2}`, 'cr'))];
    const B = [R('line', T('t1', r`4\Big(\tfrac x2\Big)^3\tfrac{\sqrt{x^2-4}}{2}=\tfrac{x^3\sqrt{x^2-4}}{4}`, 'cr', { from: 'rd2' })), R('line', T('t2', r`+\,6\cdot\tfrac x2\cdot\tfrac{\sqrt{x^2-4}}{2}=\tfrac{3x\sqrt{x^2-4}}{2}`, 'cr', { from: 'rd2' })), R('line', T('t3', r`+\,6\ln\left|\tfrac{x}{2}+\tfrac{\sqrt{x^2-4}}{2}\right|+C`, 'cr', { from: 'rd1' }))];
    const V = R('line', EQ('v1'), T('v1t', r`\tfrac{x^3\sqrt{x^2-4}}{4}+\tfrac{3x\sqrt{x^2-4}}{2}+6\ln\left|\tfrac{x+\sqrt{x^2-4}}{2}\right|+C`, 'ink', { cls: 'boxed' }));
    return [
      S(1, r`Two $x$-pieces: [[cp:$x^4$]] on top and the [[cr:radical]] $\sqrt{x^2-4}$ below, plus [[cd:$dx$]]. The quiz asks which $a$ to use and what integral results.`, [R('big', int, F('f', [x4, dx], [rad]))]),
      S(1, r`The radical matches $\sqrt{x^2-a^2}$ with $a^2=4$, so $a=2$: Type III.`, [R('big', int, F('f', [x4, dx], [rad]))], K.typeRows),
      S(1, r`Type III uses $x=a\sec\theta$, so [[cx:$x=2\sec\theta$]]. We take $x>2$ so the radical simplifies to $+2\tan\theta$.`, [R('big', int, F('f', [x4, dx], [rad]))], [...K.typeRows, ...subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=2\sec\theta\tan\theta\,d\theta$.`, [R('big', int, F('f', [x4, gdx], [rad])), K.dxRow], subRows),
      S(1, r`Replace [[cp:$x^4$]]: $(2\sec\theta)^4=16\sec^4\theta$.`, [R('big', int, F('f', [gx4, gdx], [rad])), K.dxRow, x4R], subRows),
      S(1, r`Inside the [[cr:radical]]: $4\sec^2\theta-4=4(\sec^2\theta-1)=4\tan^2\theta$.`, [R('big', int, F('f', [gx4, gdx], [grad])), K.dxRow, x4R, R('work', ...rA)], [...subRows, ...K.idRows]),
      S(1, r`So $\sqrt{x^2-4}=2\tan\theta$.`, [R('big', int, F('f', [gx4, gdx], [grad])), K.dxRow, x4R, R('work', ...rB)], [...subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', int, F('f', [x4v, dxv], [r3]))], subRows),
      S(1, r`The $2\tan\theta$ from $dx$ cancels the $2\tan\theta$ from the radical.`, [R('big', int, F('f', [x4v, T('dxv', r`\cancel{2}\sec\theta\,\cancel{\tan\theta}\,d\theta`, 'cd')], [T('r3', r`\cancel{2\tan\theta}`, 'cr')]))], subRows),
      S(1, r`$16\sec^4\theta\cdot\sec\theta=16\sec^5\theta=2^4\sec^5\theta$. That is the quiz answer: $a=2$ and $\int2^4\sec^5\theta\,d\theta$.`, [p1top], quizSay),
      S(2, r`Beyond the quiz: $\sec^5\theta$ needs the reduction formula for powers of secant.`, [p1top], red),
      S(2, r`Apply it with $n=5$: $\int\sec^5\theta=\tfrac14\sec^3\theta\tan\theta+\tfrac34\int\sec^3\theta$.`, [p1top, L1], red),
      S(2, r`Distribute the 16: $16\cdot\tfrac14=4$ and $16\cdot\tfrac34=12$.`, [p1top, L1, L2], red),
      S(2, r`Apply the formula again with $n=3$.`, [p1top, L2, L3], red3),
      S(2, r`Distribute the 12: $12\cdot\tfrac12=6$.`, [p1top, L2, L3, L4], red3),
      ...K.phase3(A, reads, r`We need $\sec\theta=\tfrac x2$ and $\tan\theta=\tfrac{\text{opp}}{\text{adj}}=\tfrac{\sqrt{x^2-4}}{2}$.`),
      S(3, r`Swap them into each term.`, B, [K.triHead, K.tri(ALL), ...reads]),
      S(3, r`Collect the three terms into the final answer (for $x>2$).`, [V], [K.triHead, K.tri(ALL), ...reads]),
    ];
  })(),
  heli: [[ln(r`x=2\sec\theta`, 'cx'), ln(r`dx=2\sec\theta\tan\theta\,d\theta`, 'cd'), ln(r`x^4=16\sec^4\theta`, 'cp'), ln(r`\sqrt{x^2-4}=2\tan\theta`, 'cr'), ln(r`=16\int\sec^5\theta\,d\theta`, 'ct')],
  [ln(r`\int\sec^5=\tfrac14\sec^3\tan+\tfrac34\int\sec^3`, 'muted'), ln(r`\int\sec^3=\tfrac12\sec\tan+\tfrac12\ln|\sec+\tan|`, 'muted'), ln(r`=4\sec^3\tan+6\sec\tan+6\ln|\sec+\tan|`, 'ct')],
  [{ tri: triIII('x', '2', r`\sqrt{x^2-4}`, ALL) }, ln(r`\sec\theta=\tfrac x2,\;\tan\theta=\tfrac{\sqrt{x^2-4}}{2}`), bx(r`\tfrac{x^3\sqrt{x^2-4}}{4}+\tfrac{3x\sqrt{x^2-4}}{2}+6\ln\Big|\tfrac{x+\sqrt{x^2-4}}{2}\Big|+C`)]] });

/* ===== Quiz B · Q3 ===== */
examples.push({ n: 8, label: 'Quiz B · Q3', type: 'u-substitution (no trig needed)', verb: 'Evaluate', problem: r`\int\frac{x}{\sqrt{1+x^2}}\,dx`, phases: ['Spot', 'Substitute', 'Check'],
  track: [r`\tfrac12\int u^{-1/2}\,du`, r`\sqrt u+C`, r`\sqrt{1+x^2}+C`],
  verify: [{ anti: { F: x => Math.sqrt(1 + x * x), f: x => x / Math.sqrt(1 + x * x), range: [-3, 3] } }],
  steps: (() => {
    const xN = T('xn', 'x', 'cd'), rad = T('rad', r`\sqrt{1+x^2}`, 'cr'), dx = T('dx', 'dx', 'cd');
    const spot = [eyebrow('eb1', 'Look at the inside'), R('side', T('i1', r`\tfrac{d}{dx}(1+x^2)=2x`, 'cx')), R('side', RICH('i2', r`The numerator $x$ is (half of) the derivative of what sits under the root.`, { cls: 'mini' }))];
    const uRows = [eyebrow('eb2', 'Substitution'), R('side', T('usub', r`u=1+x^2`, 'cx')), R('side', T('du', r`du=2x\,dx`, 'cd')), R('side', T('dur', r`x\,dx=\tfrac{du}{2}`, 'cd'))];
    const top = R('big', T('k', r`\tfrac12`, 'ink', { from: 'xn' }), int, F('f', [T('xn', 'du', 'cd', { from: 'xn' })], [T('rad', r`\sqrt u`, 'cr', { from: 'rad' })]));
    const pw = R('big', T('k', r`\tfrac12`), int, T('rad', r`u^{-1/2}`, 'cr'), T('xn', 'du', 'cd'));
    const rule = [eyebrow('eb3', 'Power rule'), R('side', T('pr', r`\int u^{n}\,du=\tfrac{u^{n+1}}{n+1},\;n=-\tfrac12`, 'ct'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`\tfrac12\cdot\frac{u^{1/2}}{1/2}+C`));
    const L2 = R('line', EQ('p2'), T('p2t', r`\sqrt u+C`));
    const L3 = R('line', EQ('p3'), T('p3t', r`\sqrt{1+x^2}+C`, 'ink', { cls: 'boxed' }));
    const chk = [eyebrow('eb4', 'Check by differentiating'), R('side', T('c1', r`\tfrac{d}{dx}\sqrt{1+x^2}`, 'cr')), R('side', T('c1b', r`=\tfrac{1}{2\sqrt{1+x^2}}\cdot2x`, 'cr')), R('side', T('c1c', r`=\tfrac{x}{\sqrt{1+x^2}}`, 'cr'))];
    const alt = [eyebrow('eb5', 'Trig sub also works'), R('side', T('a1', r`x=\tan\theta,\;dx=\sec^2\theta\,d\theta`, 'cx')), R('side', T('a2', r`\int\tan\theta\sec\theta\,d\theta=\sec\theta`, 'ct')), R('side', T('a3', r`\sec\theta=\sqrt{1+x^2}`, 'cr')), R('side', RICH('a4', r`Same answer, much more work.`, { cls: 'mini' }))];
    return [
      S(1, r`Before reaching for a trig substitution, look at the integrand. The numerator is [[cd:$x$]] and the root contains $1+x^2$.`, [R('big', int, F('f', [xN, dx], [rad]))], spot),
      S(1, r`That is the signature of a plain $u$-substitution: the numerator is the derivative of the inside, up to a constant.`, [R('big', int, F('f', [xN, dx], [rad]))], spot),
      S(2, r`Let [[cx:$u=1+x^2$]]. Then $du=2x\,dx$, so $x\,dx=\tfrac{du}{2}$.`, [R('big', int, F('f', [xN, dx], [rad]))], uRows),
      S(2, r`Replace $x\,dx$ with $\tfrac{du}{2}$ and the root with $\sqrt u$.`, [top], uRows),
      S(2, r`Write $\tfrac1{\sqrt u}$ as $u^{-1/2}$ and use the power rule.`, [pw], rule),
      S(2, r`$\int u^{-1/2}\,du=\tfrac{u^{1/2}}{1/2}$. The $\tfrac12$ out front cancels the 2 from dividing by $\tfrac12$.`, [pw, L1], rule),
      S(3, r`So the antiderivative is $\sqrt u+C$.`, [pw, L1, L2], rule),
      S(3, r`Undo the substitution: $u=1+x^2$.`, [pw, L1, L2, L3], uRows),
      S(3, r`Verify by differentiating: the chain rule returns the integrand.`, [L3], chk),
      S(3, r`For comparison, the trig substitution $x=\tan\theta$ reaches the same answer in more steps.`, [L3], alt),
    ];
  })(),
  heli: [[ln(r`u=1+x^2`, 'cx'), ln(r`du=2x\,dx`, 'cd'), ln(r`=\tfrac12\int u^{-1/2}\,du`, 'ct')],
  [ln(r`\int u^{-1/2}\,du=2\sqrt u`, 'muted'), ln(r`=\sqrt u+C`, 'ct')],
  [ln(r`u=1+x^2`, 'cx'), bx(r`\sqrt{1+x^2}+C`)]] });

/* ===== Quiz B · Q4 ===== */
examples.push({ n: 9, label: 'Quiz B · Q4', type: 'Type I · odd power of x', verb: 'Evaluate', problem: r`\int\frac{x^3}{\sqrt{9-x^2}}\,dx`, phases: ['Substitute', 'Integrate', 'Back to x'],
  track: [r`27\int\sin^3\theta\,d\theta`, r`-27\cos\theta+9\cos^3\theta+C`, r`-\Big(6+\tfrac{x^2}{3}\Big)\sqrt{9-x^2}+C`],
  verify: [{ anti: { F: x => -(6 + x * x / 3) * Math.sqrt(9 - x * x), f: x => Math.pow(x, 3) / Math.sqrt(9 - x * x), range: [-2.7, 2.7] } }],
  steps: (() => {
    const K = TSKit({ type: 'I', a: '3', a2: '9', rad: r`\sqrt{9-x^2}` });
    const x3 = T('x3', r`x^3`, 'cp'), rad = T('rad', r`\sqrt{9-x^2}`, 'cr'), dx = K.dx, gdx = K.gdx, grad = G('grad', r`\sqrt{9-x^2}`), gx3 = G('gx3', r`x^3`);
    const rA = K.radA(rad, 4), rB = K.radB(rad, 4);
    const x3R = R('work', x3, EQ('x3e'), T('x3a', r`(3\sin\theta)^3`, 'cp', { from: 'xsub' }), EQ('x3f'), T('x3b', r`27\sin^3\theta`, 'cp'));
    const x3v = T('x3b', r`27\sin^3\theta`, 'cp'), dxv = T('dxv', K.dxTex, 'cd'), r3 = T('r3', K.radRes, 'cr');
    const top = R('big', T('k', '27', 'ink', { from: 'x3b' }), int, T('x3b', r`\sin^3\theta`, 'ct'), T('dxv', r`d\theta`, 'cd'));
    const odd = [eyebrow('eb4', 'Odd power of sine'), R('side', T('o1', r`\sin^3\theta=\sin^2\theta\cdot\sin\theta`, 'ct')), R('side', T('o2', r`\sin^2\theta=1-\cos^2\theta`, 'ct'))];
    const uRows = [eyebrow('eb5', 'u-substitution'), R('side', T('usub', r`u=\cos\theta`, 'cx')), R('side', T('du', r`du=-\sin\theta\,d\theta`, 'cd'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`27\int(1-\cos^2\theta)\sin\theta\,d\theta`));
    const L2 = R('line', EQ('p2'), T('p2t', r`-27\int(1-u^2)\,du`));
    const L3 = R('line', EQ('p3'), T('p3t', r`-27\Big(u-\tfrac{u^3}{3}\Big)+C`));
    const L4 = R('line', EQ('p4'), T('p4t', r`-27u+9u^3+C`));
    const anti = (a, b) => R('big', T('b1', '-27', 'ink', { from: 'p4t' }), a, T('pl', '+', 'ink', { from: 'p4t' }), T('b2', '9', 'ink', { from: 'p4t' }), b, T('b3', '+C', 'ink', { from: 'p4t' }));
    const c0 = T('c1', r`\cos\theta`, 'ct', { from: 'p4t' }), c3 = T('c3', r`\cos^3\theta`, 'ct', { from: 'p4t' });
    const rd = R('side', T('rd1', r`\cos\theta=\frac{\text{adj}}{\text{hyp}}=\frac{\sqrt{9-x^2}}{3}`, 'ct'));
    const swapped = anti(T('c1', r`\frac{\sqrt{9-x^2}}{3}`, 'cr', { from: 'rd1' }), T('c3', r`\left(\frac{\sqrt{9-x^2}}{3}\right)^3`, 'cr', { from: 'rd1' }));
    const V1 = R('line', EQ('v1'), T('v1t', r`-9\sqrt{9-x^2}+\tfrac13(9-x^2)^{3/2}`));
    const V2 = R('line', EQ('v2'), T('v2t', r`\sqrt{9-x^2}\Big(-9+\tfrac{9-x^2}{3}\Big)=-\Big(6+\tfrac{x^2}{3}\Big)\sqrt{9-x^2}+C`, 'ink', { cls: 'boxed' }));
    const alt = [eyebrow('eb7', 'Shortcut'), R('side', T('s1', r`u=9-x^2,\;x^2=9-u`, 'cx')), R('side', T('s2', r`x^3\,dx=-\tfrac12(9-u)\,du`, 'cd')), R('side', RICH('s3', r`An odd power of $x$ with $\sqrt{a^2-x^2}$ never needs a trig sub. Same answer.`, { cls: 'mini' }))];
    return [
      S(1, r`Three pieces: [[cp:$x^3$]], the [[cr:radical]] $\sqrt{9-x^2}$, and [[cd:$dx$]]. The radical is Type I with $a=3$.`, [R('big', int, F('f', [x3, dx], [rad]))]),
      S(1, r`The radical matches $\sqrt{a^2-x^2}$ with $a^2=9$, so $a=3$: Type I.`, [R('big', int, F('f', [x3, dx], [rad]))], K.typeRows),
      S(1, r`Type I uses $x=a\sin\theta$, so [[cx:$x=3\sin\theta$]].`, [R('big', int, F('f', [x3, dx], [rad]))], [...K.typeRows, ...K.subRows]),
      S(1, r`Replace [[cd:$dx$]]: $dx=3\cos\theta\,d\theta$.`, [R('big', int, F('f', [x3, gdx], [rad])), K.dxRow], K.subRows),
      S(1, r`Replace [[cp:$x^3$]]: $(3\sin\theta)^3=27\sin^3\theta$.`, [R('big', int, F('f', [gx3, gdx], [rad])), K.dxRow, x3R], K.subRows),
      S(1, r`Inside the [[cr:radical]]: $9-9\sin^2\theta=9\cos^2\theta$, so $\sqrt{9-x^2}=3\cos\theta$.`, [R('big', int, F('f', [gx3, gdx], [grad])), K.dxRow, x3R, R('work', ...rB)], [...K.subRows, ...K.idRows]),
      S(1, r`All three replacements return to the integral.`, [R('big', int, F('f', [x3v, dxv], [r3]))], K.subRows),
      S(1, r`The $3\cos\theta$ from $dx$ cancels the $3\cos\theta$ from the radical. Phase 1 ends with $27\int\sin^3\theta\,d\theta$.`, [top], K.subRows),
      S(2, r`An odd power of sine: save one $\sin\theta$ for the $du$ and write the rest as $1-\cos^2\theta$.`, [top, L1], odd),
      S(2, r`Let [[cx:$u=\cos\theta$]], so $du=-\sin\theta\,d\theta$. The minus sign comes out front.`, [top, L1, L2], uRows),
      S(2, r`Integrate the polynomial: $\int(1-u^2)\,du=u-\tfrac{u^3}{3}$.`, [top, L1, L2, L3], uRows),
      S(2, r`Distribute the $-27$: $-27u+9u^3$.`, [top, L1, L2, L3, L4], uRows),
      ...K.phase3(anti(c0, c3), [rd], r`We need $\cos\theta=\tfrac{\text{adj}}{\text{hyp}}=\tfrac{\sqrt{9-x^2}}{3}$.`),
      S(3, r`Swap it into both terms.`, [swapped], [K.triHead, K.tri(ALL), rd]),
      S(3, r`Simplify: $-27\cdot\tfrac{\sqrt{9-x^2}}{3}=-9\sqrt{9-x^2}$ and $9\cdot\tfrac{(9-x^2)^{3/2}}{27}=\tfrac13(9-x^2)^{3/2}$.`, [swapped, V1], [K.triHead, K.tri(ALL), rd]),
      S(3, r`Factor out $\sqrt{9-x^2}$: $-9+\tfrac{9-x^2}{3}=-6-\tfrac{x^2}{3}$. This is the quiz's last answer choice.`, [swapped, V1, V2], [K.triHead, K.tri(ALL), rd]),
      S(3, r`A shortcut exists for odd powers of $x$ in $\sqrt{a^2-x^2}$ integrals.`, [V2], alt),
    ];
  })(),
  heli: [[ln(r`x=3\sin\theta`, 'cx'), ln(r`dx=3\cos\theta\,d\theta`, 'cd'), ln(r`x^3=27\sin^3\theta`, 'cp'), ln(r`\sqrt{9-x^2}=3\cos\theta`, 'cr'), ln(r`=27\int\sin^3\theta\,d\theta`, 'ct')],
  [ln(r`\sin^3=(1-\cos^2)\sin,\;u=\cos\theta`, 'muted'), ln(r`-27\int(1-u^2)\,du`), ln(r`=-27\cos\theta+9\cos^3\theta`, 'ct')],
  [{ tri: triI('x', '3', r`\sqrt{9-x^2}`, ALL) }, ln(r`\cos\theta=\tfrac{\sqrt{9-x^2}}{3}`), bx(r`-\Big(6+\tfrac{x^2}{3}\Big)\sqrt{9-x^2}+C`)]] });

/* ===== intro ===== */
const introW8 = [
  { id: 'title', label: 'Title', head: { eb: 'MATH 1400 · Week 8 prep quizzes', prob: null }, layout: 'full', tag: '',
    say: r`Nine questions from the two Week 8 prep quizzes, each as its own lesson. Press → or click to begin.`,
    main: [R('eyebrow', H('t1', 'Canvas prep quizzes · Week 8')), R('display', H('t2', 'Trig Integrals & Fractions', 'ink')),
      R('lead', H('t3', 'Identities, trig powers, partial fractions and trig substitution.')),
      R('chips', H('c1', '<b>A</b>5 questions', 'ink', { cls: 'chip' }), H('c2', '<b>B</b>4 questions', 'ink', { cls: 'chip' })),
      R('sample', T('s1', r`\int\tan^m\!x\,\sec^n\!x\,dx`, 'ct'), T('s2', r`\;\xrightarrow{\;u\,=\,\tan x\text{ or }\sec x\;}\;`, 'cx'), T('s3', r`\int u^k\,du`, 'ct'))], side: [] },
  { id: 'map', label: 'The nine questions', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Quiz A: a double-angle identity, two tangent–secant integrals, and two partial-fraction integrals. Quiz B: Pythagorean identities, and three integrals where a radical shows up.`,
    main: [R('cols',
      ST([H('m1h', 'Quiz A', 'muted', { cls: 'eyebrow' })], [T('m1a', r`\sin2\theta=\,?`, 'ct')], [T('m1b', r`\int5\tan^5x\sec^3x\,dx`, 'ct')], [T('m1c', r`\int7\tan^4x\sec^4x\,dx`, 'ct')], [T('m1d', r`\int\frac{2x+3}{6x^2+5x+1}\,dx`, 'cr')], [T('m1e', r`\int\frac{x^2-3}{x^2-4}\,dx`, 'cr')]),
      ST([H('m2h', 'Quiz B', 'muted', { cls: 'eyebrow' })], [H('m2a', 'Which identities are correct?', 'ink', { cls: 'mini' })], [T('m2b', r`\int\frac{x^4}{\sqrt{x^2-4}}\,dx`, 'cr')], [T('m2c', r`\int\frac{x}{\sqrt{1+x^2}}\,dx`, 'cr')], [T('m2d', r`\int\frac{x^3}{\sqrt{9-x^2}}\,dx`, 'cr')]))], side: [] },
];

LESSON({ key: 'w8', title: 'Week 8 Prep Quizzes · in Motion', intro: introW8, examples });
