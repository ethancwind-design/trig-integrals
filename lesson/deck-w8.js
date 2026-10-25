/* Week 8 Prep Quizzes (Canvas): Quiz A (5 questions) and Quiz B (4 questions), one lesson each. */
const examples = [];
const int = T('int', r`\int`);
const bigF = (n, d, k) => R('big', k || int, F('f', n, d));
const optTable = (head, rows) => r`<table class="tt"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(rw => `<tr class="${rw.hl ? 'hl' : ''}">${rw.cells.map((c, i) => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</tbody></table>`;

/* ===== Quiz A · Q1 ===== */
examples.push({ n: 1, label: 'Quiz A · Q1', type: 'Double-angle identity', verb: 'Find', problem: r`\sin(2\theta)`, phases: ['Recall', 'Apply', 'Check'],
  track: [r`\sin(\theta+\theta)`, r`\sin\theta\cos\theta+\cos\theta\sin\theta`, r`2\sin\theta\cos\theta`],
  verify: [{ equal: { a: t => Math.sin(2 * t), b: t => 2 * Math.sin(t) * Math.cos(t), range: [0.1, 1.4] } }],
  steps: (() => {
    const sumTok = T('sf', r`\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta`, 'ct');
    const sum = [eyebrow('eb1', 'Sum formula'), R('side', RICH('sfn', r`Valid for any two angles $\alpha$ and $\beta$.`, { cls: 'mini' }))];
    const sA = T('lhs', r`\sin(2\theta)`, 'ink'), sB = T('lhs', r`\sin(\theta+\theta)`, 'ink');
    const w1 = R('work', T('lhs', r`\sin(\theta+\theta)`), EQ('e1'), T('rhs', r`\sin\theta\cos\theta+\cos\theta\sin\theta`, 'ct', { from: 'sf' }));
    const w2 = R('work', T('lhs', r`\sin(\theta+\theta)`), EQ('e1'), T('rhs', r`\sin\theta\cos\theta+\sin\theta\cos\theta`, 'ct'));
    const w3 = R('work', T('lhs', r`\sin(2\theta)`), EQ('e1'), T('rhs', r`2\sin\theta\cos\theta`, 'ink', { cls: 'boxed' }));
    const tbl = RICH('tbl', optTable(['Option', 'Equals', 'At θ = π/6'], [
      { cells: [r`$\frac{1+\cos2\theta}{2}$`, r`$\cos^2\theta$`, r`$\tfrac34$`] },
      { cells: [r`$\frac{1-\cos2\theta}{2}$`, r`$\sin^2\theta$`, r`$\tfrac14$`] },
      { hl: true, cells: [r`$2\sin\theta\cos\theta$`, r`$\sin2\theta$`, r`$\tfrac{\sqrt3}{2}$`] },
      { cells: [r`$\cos^2\theta-\sin^2\theta$`, r`$\cos2\theta$`, r`$\tfrac12$`] },
      { cells: [r`$\sin^2\theta$`, r`$\sin^2\theta$`, r`$\tfrac14$`] },
      { cells: [r`$\cos^2\theta$`, r`$\cos^2\theta$`, r`$\tfrac34$`] }]), { cls: 'tablecard' });
    const target = [eyebrow('eb2', 'Target'), R('side', T('tg', r`\sin\!\left(2\cdot\tfrac\pi6\right)=\sin\tfrac\pi3=\tfrac{\sqrt3}{2}`, 'cr'))];
    return [
      S(1, r`Doubling an angle is just adding it to itself. Start by writing $2\theta$ as $\theta+\theta$.`, [R('big', sA)]),
      S(1, r`Now $\sin(2\theta)=\sin(\theta+\theta)$, which has the form $\sin(\alpha+\beta)$.`, [R('big', sB)]),
      S(1, r`Recall the sum formula for sine.`, [R('big', sB), R('line', sumTok)], sum),
      S(2, r`Set $\alpha=\beta=\theta$ in the sum formula.`, [w1], sum),
      S(2, r`Multiplication commutes, so $\cos\theta\sin\theta=\sin\theta\cos\theta$. The two terms are identical.`, [w2], sum),
      S(2, r`Two copies of the same term make $2\sin\theta\cos\theta$.`, [w3], sum),
      S(3, r`Check the options with a test angle. At $\theta=\tfrac\pi6$ the target value is $\tfrac{\sqrt3}{2}$.`, [R('tablerow', tbl)], target),
    ];
  })(),
  heli: [[ln(r`2\theta=\theta+\theta`, 'muted'), ln(r`\sin(\theta+\theta)`)], [ln(r`\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta`, 'muted'), ln(r`=\sin\theta\cos\theta+\cos\theta\sin\theta`)], [ln(r`=2\sin\theta\cos\theta`, 'ct'), bx(r`\sin2\theta=2\sin\theta\cos\theta`)]] });

/* ===== Quiz A · Q2 ===== */
examples.push({ n: 2, label: 'Quiz A · Q2', type: 'tanᵐ·secⁿ, m odd', verb: 'Evaluate', problem: r`\int5\tan^5x\sec^3x\,dx`, phases: ['Rewrite', 'Integrate', 'Back to x'],
  track: [r`5\int(u^2-1)^2u^2\,du`, r`\tfrac57u^7-2u^5+\tfrac53u^3+C`, r`\tfrac57\sec^7x-2\sec^5x+\tfrac53\sec^3x+C`],
  verify: [{ anti: { F: x => 5 / 7 * Math.pow(1 / Math.cos(x), 7) - 2 * Math.pow(1 / Math.cos(x), 5) + 5 / 3 * Math.pow(1 / Math.cos(x), 3), f: x => 5 * Math.pow(Math.tan(x), 5) * Math.pow(1 / Math.cos(x), 3), range: [0.1, 1.3] } }],
  steps: (() => {
    const k5 = T('k5', '5'), dx = T('dx', 'dx', 'cd');
    const t5 = T('t5', r`\tan^5x`, 'cp'), s3 = T('s3', r`\sec^3x`, 'cr');
    const t4 = T('t5', r`\tan^4x`, 'cp'), s2 = T('s3', r`\sec^2x`, 'cr'), pair = T('dx', r`\sec x\tan x\,dx`, 'cd');
    const sq = T('t5', r`(\sec^2x-1)^2`, 'cp'), uq = T('t5', r`(u^2-1)^2`, 'cp'), u2 = T('s3', r`u^2`, 'cr'), du = T('dx', 'du', 'cd');
    const recipe = [eyebrow('eb1', 'Recipe: tanᵐ secⁿ'), R('side', T('r1', r`m\text{ odd}\;\Rightarrow\;u=\sec x`, 'cx')), R('side', T('r2', r`du=\sec x\tan x\,dx`, 'cd'))];
    const idRows = [eyebrow('eb2', 'Pythagorean identity'), R('side', T('id', r`\tan^2x=\sec^2x-1`, 'ct'))];
    const uRows = [eyebrow('eb3', 'Substitution'), R('side', T('usub', r`u=\sec x`, 'cx')), R('side', T('du', r`du=\sec x\tan x\,dx`, 'cd')), R('side', T('pw', r`\sec^2x=u^2`, 'cr'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`5\int(u^6-2u^4+u^2)\,du`));
    const L2 = R('line', EQ('p2'), T('p2t', r`5\Big[\tfrac{u^7}{7}-\tfrac{2u^5}{5}+\tfrac{u^3}{3}\Big]+C`));
    const L3 = R('line', EQ('p3'), T('p3t', r`\tfrac57u^7-2u^5+\tfrac53u^3+C`));
    const ans = R('big', T('ans', r`\tfrac57\sec^7x-2\sec^5x+\tfrac53\sec^3x+C`, 'ink', { from: 'p3t', cls: 'boxed' }));
    const top = R('big', k5, int, uq, u2, du);
    return [
      S(1, r`An odd power of tangent with secants. The recipe: save one $\sec x\tan x$, the derivative of $\sec x$, and turn everything else into secants.`, [R('big', k5, int, t5, s3, dx)], recipe),
      S(1, r`Peel one $\sec x\tan x$ off: $\tan^5x=\tan^4x\cdot\tan x$ and $\sec^3x=\sec^2x\cdot\sec x$. That pair is the [[cd:saved $du$]].`, [R('big', k5, int, t4, s2, pair)], recipe),
      S(1, r`Convert the leftover tangents with $\tan^2x=\sec^2x-1$, so $\tan^4x=(\sec^2x-1)^2$.`, [R('big', k5, int, sq, s2, pair)], idRows),
      S(1, r`Let [[cx:$u=\sec x$]]. Then $\sec x\tan x\,dx=du$, and $\sec^2x=u^2$. Every piece is now a power of $u$.`, [top], uRows),
      S(2, r`Expand $(u^2-1)^2u^2=(u^4-2u^2+1)u^2=u^6-2u^4+u^2$.`, [top, L1], uRows),
      S(2, r`Integrate with the power rule, one term at a time.`, [top, L1, L2], uRows),
      S(2, r`Distribute the 5.`, [top, L1, L2, L3], uRows),
      S(3, r`Undo the substitution: replace every $u$ with $\sec x$.`, [R('big', T('ans', r`\tfrac57\,u^7-2\,u^5+\tfrac53\,u^3+C`, 'ink', { from: 'p3t' }))], [eyebrow('eb4', 'Back to x'), R('side', T('usub', r`u=\sec x`, 'cx'))]),
      S(3, r`That is the answer: $\tfrac57\sec^7x-2\sec^5x+\tfrac53\sec^3x+C$.`, [ans], [eyebrow('eb4', 'Back to x'), R('side', T('usub', r`u=\sec x`, 'cx'))]),
    ];
  })(),
  heli: [[ln(r`\tan^5x\sec^3x=\tan^4x\sec^2x\cdot\sec x\tan x`), ln(r`\tan^4x=(\sec^2x-1)^2`, 'muted'), ln(r`u=\sec x,\;du=\sec x\tan x\,dx`, 'cx'), ln(r`=5\int(u^2-1)^2u^2\,du`, 'ct')],
  [ln(r`5\int(u^6-2u^4+u^2)\,du`), ln(r`=5\Big[\tfrac{u^7}{7}-\tfrac{2u^5}{5}+\tfrac{u^3}{3}\Big]`, 'ct')],
  [ln(r`u=\sec x`, 'cx'), bx(r`\tfrac57\sec^7x-2\sec^5x+\tfrac53\sec^3x+C`)]] });

/* ===== Quiz A · Q3 ===== */
examples.push({ n: 3, label: 'Quiz A · Q3', type: 'tanᵐ·secⁿ, n even', verb: 'Evaluate', problem: r`\int7\tan^4x\sec^4x\,dx`, phases: ['Rewrite', 'Integrate', 'Back to x'],
  track: [r`7\int u^4(1+u^2)\,du`, r`\tfrac75u^5+u^7+C`, r`\tan^7x+\tfrac75\tan^5x+C`],
  verify: [{ anti: { F: x => Math.pow(Math.tan(x), 7) + 7 / 5 * Math.pow(Math.tan(x), 5), f: x => 7 * Math.pow(Math.tan(x), 4) * Math.pow(1 / Math.cos(x), 4), range: [0.1, 1.3] } }],
  steps: (() => {
    const k7 = T('k7', '7'), dx = T('dx', 'dx', 'cd');
    const t4 = T('t4', r`\tan^4x`, 'cp'), s4 = T('s4', r`\sec^4x`, 'cr');
    const sA = T('s4', r`\sec^2x`, 'cr', { from: 's4' }), sB = T('dx', r`\sec^2x\,dx`, 'cd');
    const oneT = T('s4', r`(1+\tan^2x)`, 'cr');
    const uOne = T('s4', r`(1+u^2)`, 'cr'), u4 = T('t4', r`u^4`, 'cp'), du = T('dx', 'du', 'cd');
    const recipe = [eyebrow('eb1', 'Recipe: tanᵐ secⁿ'), R('side', T('r1', r`n\text{ even}\;\Rightarrow\;u=\tan x`, 'cx')), R('side', T('r2', r`du=\sec^2x\,dx`, 'cd'))];
    const idRows = [eyebrow('eb2', 'Pythagorean identity'), R('side', T('id', r`\sec^2x=1+\tan^2x`, 'ct'))];
    const uRows = [eyebrow('eb3', 'Substitution'), R('side', T('usub', r`u=\tan x`, 'cx')), R('side', T('du', r`du=\sec^2x\,dx`, 'cd'))];
    const L1 = R('line', EQ('p1'), T('p1t', r`7\int(u^4+u^6)\,du`));
    const L2 = R('line', EQ('p2'), T('p2t', r`7\Big[\tfrac{u^5}{5}+\tfrac{u^7}{7}\Big]+C`));
    const L3 = R('line', EQ('p3'), T('p3t', r`\tfrac75u^5+u^7+C`));
    const ans = R('big', T('ans', r`\tan^7x+\tfrac75\tan^5x+C`, 'ink', { from: 'p3t', cls: 'boxed' }));
    const top = R('big', k7, int, u4, uOne, du);
    return [
      S(1, r`An even power of secant. The recipe: save one $\sec^2x$, the derivative of $\tan x$, and turn everything else into tangents.`, [R('big', k7, int, t4, s4, dx)], recipe),
      S(1, r`Split $\sec^4x=\sec^2x\cdot\sec^2x$. One factor goes with $dx$ as the [[cd:saved $du$]].`, [R('big', k7, int, t4, sA, sB)], recipe),
      S(1, r`Convert the other factor with $\sec^2x=1+\tan^2x$.`, [R('big', k7, int, t4, oneT, sB)], idRows),
      S(1, r`Let [[cx:$u=\tan x$]]. Then $\sec^2x\,dx=du$, and the integral becomes a polynomial in $u$.`, [top], uRows),
      S(2, r`Distribute: $u^4(1+u^2)=u^4+u^6$.`, [top, L1], uRows),
      S(2, r`Integrate with the power rule, one term at a time.`, [top, L1, L2], uRows),
      S(2, r`Distribute the 7: $\tfrac75u^5+u^7$.`, [top, L1, L2, L3], uRows),
      S(3, r`Undo the substitution: replace every $u$ with $\tan x$.`, [R('big', T('ans', r`\tfrac75\,u^5+u^7+C`, 'ink', { from: 'p3t' }))], [eyebrow('eb4', 'Back to x'), R('side', T('usub', r`u=\tan x`, 'cx'))]),
      S(3, r`That is the answer: $\tan^7x+\tfrac75\tan^5x+C$.`, [ans], [eyebrow('eb4', 'Back to x'), R('side', T('usub', r`u=\tan x`, 'cx'))]),
    ];
  })(),
  heli: [[ln(r`\sec^4x=\sec^2x\cdot(1+\tan^2x)`), ln(r`u=\tan x,\;du=\sec^2x\,dx`, 'cx'), ln(r`=7\int u^4(1+u^2)\,du`, 'ct')],
  [ln(r`7\int(u^4+u^6)\,du`), ln(r`=7\Big[\tfrac{u^5}{5}+\tfrac{u^7}{7}\Big]`, 'ct')],
  [ln(r`u=\tan x`, 'cx'), bx(r`\tan^7x+\tfrac75\tan^5x+C`)]] });

/* ===== Quiz A · Q4 ===== */
examples.push({ n: 4, label: 'Quiz A · Q4', type: 'Partial fractions', verb: 'Evaluate', problem: r`\int\frac{2x+3}{6x^2+5x+1}\,dx`, phases: ['Decompose', 'Integrate', 'Simplify'],
  track: [r`\int\Big(\frac{-4}{2x+1}+\frac{7}{3x+1}\Big)dx`, r`-4\cdot\tfrac12\ln|2x+1|+7\cdot\tfrac13\ln|3x+1|+C`, r`\tfrac73\ln|3x+1|-2\ln|2x+1|+C`],
  verify: [{ anti: { F: x => 7 / 3 * Math.log(Math.abs(3 * x + 1)) - 2 * Math.log(Math.abs(2 * x + 1)), f: x => (2 * x + 3) / (6 * x * x + 5 * x + 1), range: [0.1, 4] } }],
  steps: (() => {
    const num = T('num', '2x+3'), den = T('den', r`6x^2+5x+1`, 'cr'), dx = T('dx', 'dx', 'cd');
    const denF = T('den', r`(2x+1)(3x+1)`, 'cr');
    const fac = [eyebrow('eb1', 'Factor the denominator'), R('side', T('fc', r`(2x+1)(3x+1)`, 'cr')), R('side', RICH('fn', r`Check: $2x\cdot3x=6x^2$, $2x+3x=5x$, $1\cdot1=1$.`, { cls: 'mini' }))];
    const form = R('work', T('l1', r`\frac{2x+3}{(2x+1)(3x+1)}`), EQ('q1'), T('a1', r`\frac{A}{2x+1}`, 'cx'), T('pl', '+'), T('b1', r`\frac{B}{3x+1}`, 'cd'));
    const clr = R('work', T('l2', r`2x+3`), EQ('q2'), T('a2', r`A(3x+1)`, 'cx', { from: 'a1' }), T('pl2', '+'), T('b2', r`B(2x+1)`, 'cd', { from: 'b1' }));
    const solA = [eyebrow('eb2', 'Plug in x = −½'), R('side', T('sa1', r`2x+3=2`)), R('side', T('sa1b', r`A(3x+1)=-\tfrac A2`)), R('side', T('sa2', r`2=-\tfrac A2`)), R('side', T('sa3', r`A=-4`, 'cx', { cls: 'boxed' }))];
    const solB = [R('side', T('sa3', r`A=-4`, 'cx', { cls: 'boxed' })), eyebrow('eb3', 'Plug in x = −⅓'), R('side', T('sb1', r`2x+3=\tfrac73`)), R('side', T('sb1b', r`B(2x+1)=\tfrac B3`)), R('side', T('sb2', r`\tfrac73=\tfrac B3`)), R('side', T('sb3', r`B=7`, 'cd', { cls: 'boxed' }))];
    const dec = R('big', int, T('d1', r`\frac{-4}{2x+1}`, 'cx', { from: 'sa3' }), T('pl3', '+'), T('d2', r`\frac{7}{3x+1}`, 'cd', { from: 'sb3' }), T('dxx', 'dx', 'cd'));
    const rule = [eyebrow('eb4', 'Basic antiderivative'), R('side', T('rl', r`\int\frac{dx}{ax+b}=\frac1a\ln|ax+b|+C`, 'ct'))];
    const split = R('line', EQ('s1'), T('s1t', r`-4\int\frac{dx}{2x+1}+7\int\frac{dx}{3x+1}`));
    const logs = R('line', EQ('s2'), T('s2t', r`-4\cdot\tfrac12\ln|2x+1|+7\cdot\tfrac13\ln|3x+1|+C`));
    const fin = R('line', EQ('s3'), T('s3t', r`\tfrac73\ln|3x+1|-2\ln|2x+1|+C`, 'ink', { cls: 'boxed' }));
    const chk = [eyebrow('eb5', 'Check by differentiating'), R('side', T('c1', r`\tfrac{d}{dx}\Big[\tfrac73\ln|3x+1|\Big]=\tfrac{7}{3x+1}`, 'cd')), R('side', T('c2', r`\tfrac{d}{dx}\Big[-2\ln|2x+1|\Big]=\tfrac{-4}{2x+1}`, 'cx')), R('side', RICH('c3', r`Exactly the two terms of the decomposition.`, { cls: 'mini' }))];
    return [
      S(1, r`A rational function. The numerator has lower degree than the denominator, so no long division is needed. First, factor the [[cr:denominator]].`, [R('big', int, F('f', [num], [den]), dx)]),
      S(1, r`$6x^2+5x+1=(2x+1)(3x+1)$.`, [R('big', int, F('f', [num], [denF]), dx)], fac),
      S(1, r`Each linear factor gets its own constant: [[cx:$A$]] over $2x+1$ and [[cd:$B$]] over $3x+1$.`, [R('big', int, F('f', [num], [denF]), dx), form], fac),
      S(1, r`Multiply both sides by $(2x+1)(3x+1)$ to clear the denominators.`, [R('big', int, F('f', [num], [denF]), dx), form, clr], [eyebrow('eb2b', 'Strategy'), R('side', RICH('st', r`This equation holds for <b>every</b> $x$, so we may choose values of $x$ that make one term vanish.`, { cls: 'mini' }))]),
      S(1, r`$x=-\tfrac12$ makes $2x+1=0$, which kills the $B$ term and isolates $A$.`, [form, clr], solA),
      S(1, r`$x=-\tfrac13$ makes $3x+1=0$, which kills the $A$ term and isolates $B$.`, [form, clr], solB),
      S(1, r`Substitute $A=-4$ and $B=7$. Phase 1 ends with an integral of two simple fractions.`, [dec], solB),
      S(2, r`Split into two integrals. Each is of the form $\int\frac{dx}{ax+b}$.`, [dec, split], rule),
      S(2, r`Apply the rule: the antiderivative of $\tfrac{1}{ax+b}$ carries a factor $\tfrac1a$.`, [dec, split, logs], rule),
      S(3, r`Simplify the coefficients: $-4\cdot\tfrac12=-2$ and $7\cdot\tfrac13=\tfrac73$. Put the $\tfrac73$ term first to match the answer choices.`, [dec, split, logs, fin], rule),
      S(3, r`Verify by differentiating: each term returns exactly one piece of the decomposition.`, [dec, fin], chk),
    ];
  })(),
  heli: [[ln(r`6x^2+5x+1=(2x+1)(3x+1)`, 'cr'), ln(r`\frac{2x+3}{(2x+1)(3x+1)}=\frac{A}{2x+1}+\frac{B}{3x+1}`), ln(r`x=-\tfrac12\Rightarrow A=-4`, 'cx'), ln(r`x=-\tfrac13\Rightarrow B=7`, 'cd')],
  [ln(r`\int\frac{-4}{2x+1}+\frac{7}{3x+1}\,dx`), ln(r`\int\frac{dx}{ax+b}=\tfrac1a\ln|ax+b|`, 'muted'), ln(r`=-4\cdot\tfrac12\ln|2x+1|+7\cdot\tfrac13\ln|3x+1|`, 'ct')],
  [ln(r`-4\cdot\tfrac12=-2,\;7\cdot\tfrac13=\tfrac73`, 'muted'), bx(r`\tfrac73\ln|3x+1|-2\ln|2x+1|+C`)]] });

/* ===== Quiz A · Q5 ===== */
examples.push({ n: 5, label: 'Quiz A · Q5', type: 'Long division + partial fractions', verb: 'Evaluate', problem: r`\int\frac{x^2-3}{x^2-4}\,dx`, phases: ['Divide & decompose', 'Integrate', 'Simplify'],
  track: [r`\int\Big(1+\frac{1/4}{x-2}-\frac{1/4}{x+2}\Big)dx`, r`x+\tfrac14\ln|x-2|-\tfrac14\ln|x+2|+C`, r`x+\tfrac14\ln\left|\frac{x-2}{x+2}\right|+C`],
  verify: [{ anti: { F: x => x + Math.log(Math.abs((x - 2) / (x + 2))) / 4, f: x => (x * x - 3) / (x * x - 4), range: [2.2, 6] } }],
  steps: (() => {
    const num = T('num', r`x^2-3`), den = T('den', r`x^2-4`, 'cr'), dx = T('dx', 'dx', 'cd');
    const numD = T('num', r`(x^2-4)+1`), denF = T('den', r`(x-2)(x+2)`, 'cr');
    const deg = [eyebrow('eb1', 'Degrees'), R('side', RICH('dg', r`Top and bottom both have degree 2.`, { cls: 'mini' })), R('side', RICH('dn', r`Partial fractions need <b>top degree &lt; bottom degree</b>. Divide first.`, { cls: 'mini' }))];
    const split = R('big', int, T('one', '1', 'ct', { from: 'num' }), T('pl', '+'), F('f', [T('one2', '1', 'cx')], [denF]), dx);
    const fac = [eyebrow('eb2', 'Factor'), R('side', T('fc', r`x^2-4=(x-2)(x+2)`, 'cr'))];
    const form = R('work', T('l1', r`\frac{1}{(x-2)(x+2)}`), EQ('q1'), T('a1', r`\frac{A}{x-2}`, 'cx'), T('pl2', '+'), T('b1', r`\frac{B}{x+2}`, 'cd'));
    const clr = R('work', T('l2', '1'), EQ('q2'), T('a2', r`A(x+2)`, 'cx', { from: 'a1' }), T('pl3', '+'), T('b2', r`B(x-2)`, 'cd', { from: 'b1' }));
    const solA = [eyebrow('eb3', 'Plug in x = 2'), R('side', T('sa1', r`1=A(2+2)=4A`)), R('side', T('sa3', r`A=\tfrac14`, 'cx', { cls: 'boxed' }))];
    const solB = [...solA, eyebrow('eb4', 'Plug in x = −2'), R('side', T('sb1', r`1=B(-2-2)=-4B`)), R('side', T('sb3', r`B=-\tfrac14`, 'cd', { cls: 'boxed' }))];
    const dec = R('big', int, T('one', '1', 'ct'), T('pl', '+'), T('d1', r`\frac{1/4}{x-2}`, 'cx', { from: 'sa3' }), T('pl4', '-'), T('d2', r`\frac{1/4}{x+2}`, 'cd', { from: 'sb3' }), T('dxx', 'dx', 'cd'));
    const rule = [eyebrow('eb5', 'Basic antiderivatives'), R('side', T('r1', r`\int1\,dx=x`, 'ct')), R('side', T('r2', r`\int\frac{dx}{x+c}=\ln|x+c|`, 'ct'))];
    const L1 = R('line', EQ('s1'), T('s1t', r`x+\tfrac14\ln|x-2|-\tfrac14\ln|x+2|+C`));
    const L2 = R('line', EQ('s2'), T('s2t', r`x+\tfrac14\ln\left|\frac{x-2}{x+2}\right|+C`, 'ink', { cls: 'boxed' }));
    const logr = [eyebrow('eb6', 'Log rule'), R('side', T('lr', r`\ln a-\ln b=\ln\frac ab`, 'ct'))];
    const chk = [eyebrow('eb7', 'Check by differentiating'), R('side', T('c1', r`\tfrac{d}{dx}\,x=1`, 'ct')), R('side', T('c2', r`\tfrac14\Big(\tfrac1{x-2}-\tfrac1{x+2}\Big)`, 'cx')), R('side', T('c2b', r`=\tfrac14\cdot\tfrac{4}{x^2-4}=\tfrac1{x^2-4}`, 'cx')), R('side', RICH('c3', r`$1+\frac1{x^2-4}$ is the integrand.`, { cls: 'mini' }))];
    return [
      S(1, r`The numerator and denominator have the same degree, so partial fractions cannot start yet. Divide first.`, [R('big', int, F('f', [num], [den]), dx)], deg),
      S(1, r`Rewrite the numerator using the denominator: $x^2-3=(x^2-4)+1$.`, [R('big', int, F('f', [numD], [den]), dx)], deg),
      S(1, r`Now the fraction splits: $\tfrac{(x^2-4)+1}{x^2-4}=1+\tfrac1{x^2-4}$. The remainder has lower degree on top.`, [R('big', int, T('one', '1', 'ct', { from: 'num' }), T('pl', '+'), F('f', [T('one2', '1', 'cx')], [den]), dx)], deg),
      S(1, r`Factor the remaining [[cr:denominator]]: $x^2-4=(x-2)(x+2)$.`, [split], fac),
      S(1, r`Each linear factor gets its own constant: [[cx:$A$]] over $x-2$ and [[cd:$B$]] over $x+2$.`, [split, form], fac),
      S(1, r`Multiply both sides by $(x-2)(x+2)$ to clear the denominators.`, [split, form, clr], fac),
      S(1, r`$x=2$ kills the $B$ term and isolates $A$.`, [form, clr], solA),
      S(1, r`$x=-2$ kills the $A$ term and isolates $B$.`, [form, clr], solB),
      S(1, r`Substitute $A=\tfrac14$ and $B=-\tfrac14$. Phase 1 ends with three easy terms.`, [dec], solB),
      S(2, r`Integrate term by term: $\int1\,dx=x$, and each fraction gives a logarithm.`, [dec, L1], rule),
      S(3, r`Combine the two logarithms into one with $\ln a-\ln b=\ln\tfrac ab$.`, [dec, L1, L2], logr),
      S(3, r`Verify by differentiating: $1+\tfrac1{x^2-4}$ comes back.`, [dec, L2], chk),
    ];
  })(),
  heli: [[ln(r`x^2-3=(x^2-4)+1`, 'muted'), ln(r`\frac{x^2-3}{x^2-4}=1+\frac{1}{(x-2)(x+2)}`), ln(r`A=\tfrac14,\;B=-\tfrac14`, 'cx'), ln(r`=1+\tfrac{1/4}{x-2}-\tfrac{1/4}{x+2}`, 'ct')],
  [ln(r`\int1\,dx=x`, 'muted'), ln(r`=x+\tfrac14\ln|x-2|-\tfrac14\ln|x+2|`, 'ct')],
  [ln(r`\ln a-\ln b=\ln\tfrac ab`, 'muted'), bx(r`x+\tfrac14\ln\left|\frac{x-2}{x+2}\right|+C`)]] });
