/* Lectures 30 & 31 · Part C: Gini index (1-3), rational-function areas (19-20), intro, LESSON() */

/* ===== Problem 1 : which power n gives Gini 5/6? ===== */
examples.push((() => {
  const P = PlotKit({ w: 560, h: 440, xr: [-0.14, 1.4], yr: [-0.14, 1.2] });
  P.axes('axes', { xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']] });
  P.curve('eq', x => x, [0, 1.02], 'muted', { dash: '8 7', label: [1.02, 1.02], text: 'y = x', dx: 8, dy: 4 });
  P.curve('gen', x => Math.pow(x, 3), [0, 1], 'cx', { label: [0.82, 0.55], text: 'y = xⁿ', dx: 8, dy: 10 });
  P.fill('gap', x => x, x => Math.pow(x, 3), [0, 1], 'cr', { opacity: .22 });
  P.curve('act', x => Math.pow(x, 11), [0, 1], 'cx', { label: [0.8, 0.0859], text: 'y = x¹¹', dx: -8, dy: -70, n: 200 });
  P.fill('gap11', x => x, x => Math.pow(x, 11), [0, 1], 'cr', { opacity: .22 });
  P.line('v80', 0.8, 0, 0.8, 0.0859, 'cp', { dash: '6 5', width: 2.5 });
  P.line('h80', 0, 0.0859, 0.8, 0.0859, 'cp', { dash: '6 5', width: 2.5 });
  P.dot('d80', 0.8, 0.0859, 'cp', { text: '(0.8, 0.086)', dx: 12, dy: -12 });
  P.text('x80', 0.8, -0.09, '0.8', 'cp', { anchor: 'middle' });
  const spec = P.spec('gini1');
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
  const sideP = (show) => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const AX = ['axes', 'eq'];
  const eb = (k, t) => eyebrow(k, t);
  const I = R('big', T('I', r`G(x^n)=2\int_0^1\big(x-x^n\big)\,dx`));
  const L1 = R('line', EQ('l1'), T('l1t', r`2\Big[\tfrac{x^2}{2}-\tfrac{x^{n+1}}{n+1}\Big]_0^1`));
  const L2 = R('line', EQ('l2'), T('l2t', r`2\Big(\tfrac12-\tfrac{1}{n+1}\Big)`));
  const L3 = R('line', EQ('l3'), T('l3t', r`1-\tfrac{2}{n+1}=\tfrac{n-1}{n+1}`, 'ink', { cls: 'boxed' }));
  const sv = [eb('s0', 'Solve for n'), R('side', T('s1', r`\frac{n-1}{n+1}=\frac56`, 'cx')), R('side', T('s2', r`6(n-1)=5(n+1)`)), R('side', T('s3', r`6n-6=5n+5`)), R('side', T('s4', r`n=11`, 'cx', { cls: 'boxed' }))];
  const sv1 = sv.slice(0, 2), sv2 = sv.slice(0, 3), sv3 = sv.slice(0, 4);
  const given = [eb('g0', 'Gini index'), R('side', T('g1', r`G(f)=2\int_0^1\big(x-f(x)\big)\,dx`, 'ink'))];
  const steps = [
    S(1, r`The Lorenz curve $y=f(x)$ says the poorest $x$ fraction of people earn $f(x)$ of all income. Perfect equality is the dashed line $y=x$: the poorest 50% earn 50%.`, [plot(AX)], [eb('e0', 'Perfect equality'), R('side', T('e1', r`f(x)=x`, 'muted'))]),
    S(1, r`A real economy sags below that line. We model it with $f(x)=x^n$ for some power $n$ that we don't know yet. The sketch only shows the shape.`, [plot([...AX, 'gen'])], [eb('e0', 'Model'), R('side', T('e1', r`f(x)=x^n`, 'cx'))]),
    S(1, r`The shaded gap between the line and the curve has height $x-f(x)$. The Gini index is twice its area, so a bigger gap means more inequality.`, [plot([...AX, 'gen', 'gap'])], given),
    S(1, r`The United States has $G\approx0.852\approx\tfrac56$. The question: which $n$ makes the Gini index of $x^n$ equal $\tfrac56$?`, [plot([...AX, 'gen', 'gap'])], [...given, R('side', T('g2', r`G(x^n)=\tfrac56\;\Rightarrow\;n=\,?`, 'cx'))]),
    S(2, r`Put $f(x)=x^n$ into the formula and integrate. Keep $n$ as a symbol: $\int x\,dx=\tfrac{x^2}{2}$ and $\int x^n\,dx=\tfrac{x^{n+1}}{n+1}$.`, [I, L1], [eb('rg0', 'Region'), sideP([...AX, 'gen', 'gap'])]),
    S(2, r`Upper limit: $\tfrac12-\tfrac1{n+1}$. At the lower limit $x=0$ both terms are 0.`, [I, L1, L2], [eb('rg0', 'Region'), sideP([...AX, 'gen', 'gap'])]),
    S(2, r`Distribute the 2 and combine over $n+1$: $1-\tfrac{2}{n+1}=\tfrac{n+1-2}{n+1}$. This formula $\tfrac{n-1}{n+1}$ holds for every power $n>0$.`, [I, L1, L2, L3], [eb('rg0', 'Region'), sideP([...AX, 'gen', 'gap'])]),
    S(2, r`Now match the data: set the formula equal to $\tfrac56$.`, [I, L1, L2, L3], sv1),
    S(2, r`Cross-multiply.`, [I, L1, L2, L3], sv2),
    S(2, r`Expand both sides, subtract $5n$ and add 6: $n=11$.`, [I, L1, L2, L3], sv),
    S(3, r`With $n=11$ the curve hugs the axis until $x$ is close to 1. Quick check: $\tfrac{n-1}{n+1}=\tfrac{10}{12}=\tfrac56$.`, [plot([...AX, 'act', 'gap11'])], [eb('c0', 'The model'), R('side', T('c1', r`f(x)=x^{11}`, 'cx')), R('side', T('c2', r`G=\tfrac{10}{12}=\tfrac56\;\checkmark`, 'cr'))]),
    S(3, r`The bottom 80% of earners get $f(0.8)=(0.8)^{11}$ of all income.`, [plot([...AX, 'act', 'gap11', 'v80', 'h80', 'd80', 'x80'])], [eb('c0', 'The model'), R('side', T('c1', r`f(0.8)=(0.8)^{11}`, 'cp'))]),
    S(3, r`$(0.8)^{11}\approx0.0859$: about [[cp:8.6%]] of all income. The real US share is far higher (the PDF says around 50%), so $x^{11}$ matches the Gini index but not the actual distribution.`, [plot([...AX, 'act', 'gap11', 'v80', 'h80', 'd80', 'x80'])], [eb('c0', 'The model'), R('side', T('c1', r`f(0.8)=(0.8)^{11}`, 'cp')), R('side', T('c2', r`\approx0.0859\approx8.6\%`, 'cp', { cls: 'boxed' })), R('side', RICH('c3', r`The posted solution writes “50%” but computes $0.8^{11}$, the bottom 80%.`, { cls: 'mini' }))])
  ];
  return {
    n: 1, label: 'Problem 1', type: 'Gini index', verb: 'Find', problem: r`G(x^n)=\tfrac56:\;\text{find }n\text{ and }f(0.8)`, phases: ['Model', 'Solve for n', 'Apply'],
    track: [r`f(x)=x^n`, r`\tfrac{n-1}{n+1}=\tfrac56`, r`n=11,\;8.6\%`],
    verify: [{ value: { f: x => 2 * (x - Math.pow(x, 11)), a: 0, b: 1, val: 5 / 6 } }, { num: { a: Math.pow(0.8, 11), b: 0.0859, tol: 1e-4 } }],
    steps,
    heli: [[{ plot: spec, show: [...AX, 'gen', 'gap'] }, ln(r`G(x^n)=2\int_0^1(x-x^n)\,dx`, 'cx')],
      [ln(r`2\Big[\tfrac{x^2}{2}-\tfrac{x^{n+1}}{n+1}\Big]_0^1=\tfrac{n-1}{n+1}`), ln(r`\tfrac{n-1}{n+1}=\tfrac56`, 'cx')],
      [ln(r`n=11`, 'cx'), ln(r`f(0.8)=(0.8)^{11}`, 'cp'), bx(r`\approx8.6\%`)]]
  };
})());

/* ===== Problems 2 and 3 : compare two economies ===== */
function giniPair(c) {
  const P = PlotKit({ w: 560, h: 440, xr: [-0.14, 1.4], yr: [-0.14, 1.2] });
  P.axes('axes', { xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']] });
  P.curve('eq', x => x, [0, 1.02], 'muted', { dash: '8 7', label: [1.02, 1.02], text: 'y = x', dx: 8, dy: 4 });
  P.curve('ca', c.a, [0, 1], 'cx', { label: c.aLab, text: c.aText, dx: c.aLab[2], dy: c.aLab[3] });
  P.curve('cb', c.b, [0, 1], 'cd', { label: c.bLab, text: c.bText, dx: c.bLab[2], dy: c.bLab[3] });
  P.fill('ga', x => x, c.a, [0, 1], 'cx', { opacity: .2 });
  P.fill('gb', x => x, c.b, [0, 1], 'cd', { opacity: .2 });
  P.line('h50', 0, 0.5, 0.5, 0.5, 'muted', { dash: '4 5', width: 2 }); P.line('v50', 0.5, 0, 0.5, 0.5, 'muted', { dash: '4 5', width: 2 });
  P.dot('da', 0.5, c.a(0.5), 'cx', { text: c.aHalfText, dx: 10, dy: 22 }); P.dot('db', 0.5, c.b(0.5), 'cd', { text: c.bHalfText, dx: -10, dy: -10, anchor: 'end' });
  const spec = P.spec('gini' + c.n);
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
  const sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const AX = ['axes', 'eq'];
  const eb = (k, t) => eyebrow(k, t);
  const formula = [eb('g0', 'Gini index'), R('side', T('g1', r`G(f)=2\int_0^1\big(x-f(x)\big)\,dx`))];
  const noEq = t => t.replace(/^=\s*/, '');
  const lines = (pre, ls) => ls.map((l, i) => R('line', EQ(pre + i), T(pre + i + 't', noEq(l.tex), 'ink', l.boxed ? { cls: 'boxed' } : {})));
  const IA = R('big', T('IA', c.aInt)), IB = R('big', T('IB', c.bInt));
  const steps = [];
  steps.push(S(1, r`Both economies are compared to the dashed line $y=x$ (perfect equality). A Lorenz curve $f(x)$ gives the share of income earned by the poorest $x$ fraction of people.`, [plot(AX)], formula));
  steps.push(S(1, c.aSay0, [plot([...AX, 'ca'])], [eb('e1', 'Country A'), R('side', T('ea', c.aEq, 'cx'))]));
  steps.push(S(1, r`Shade the gap between the line and curve A. The Gini index is twice this area, and the area is $\int_0^1\big(x-a(x)\big)\,dx$.`, [plot([...AX, 'ca', 'ga'])], [eb('e1', 'Country A'), R('side', T('ea', c.aEq, 'cx')), ...formula.slice(1)]));
  let acc = [];
  c.aSteps.forEach(st => {
    acc.push(...st.rows.map(tex => ({ tex, boxed: st.boxed })));
    steps.push(S(1, st.say, [IA, ...lines('a', acc)], [eb('rg0', 'Region'), sideP([...AX, 'ca', 'ga'])]));
  });
  steps.push(S(2, c.bSay0, [plot([...AX, 'ca', 'ga', 'cb'])], [eb('e1', 'Country B'), R('side', T('eb', c.bEq, 'cd'))]));
  steps.push(S(2, r`Shade the gap for country B. It looks much thinner than country A's gap.`, [plot([...AX, 'ca', 'ga', 'cb', 'gb'])], [eb('e1', 'Country B'), R('side', T('eb', c.bEq, 'cd'))]));
  let acb = [];
  c.bSteps.forEach(st => {
    acb.push(...st.rows.map(tex => ({ tex, boxed: st.boxed })));
    steps.push(S(2, st.say, [IB, ...lines('b', acb)], [eb('rg0', 'Region'), sideP([...AX, 'cb', 'gb'])]));
  });
  const both = [...AX, 'ca', 'ga', 'cb', 'gb'];
  const gs = [eb('k0', 'Gini indices'), R('side', T('ka', c.aG, 'cx')), R('side', T('kb', c.bG, 'cd'))];
  steps.push(S(3, c.cmpSay0, [plot(both)], gs));
  steps.push(S(3, c.cmpSay1, [plot(both)], [...gs, ...c.cmpRows.map((tex, i) => R('side', T('cm' + i, tex, i === c.cmpRows.length - 1 ? 'cr' : 'ink', i === c.cmpRows.length - 1 ? { cls: 'boxed' } : {})))]));
  steps.push(S(3, c.cmpSay2, [plot([...both, 'h50', 'v50', 'da', 'db'])], [...gs, R('side', T('cmp', r`\text{A is more unequal}`, 'cx', { cls: 'boxed' })), R('side', RICH('cmn', c.halfNote, { cls: 'mini' }))]));
  return {
    n: c.n, label: 'Problem ' + c.n, type: 'Gini index', verb: 'Compare', problem: c.problem, phases: ['Country A', 'Country B', 'Compare'], track: c.track, verify: c.verify, steps,
    heli: [[{ plot: spec, show: [...AX, 'ca', 'ga'] }, ln(c.aInt, 'cx'), bx(c.aG)], [{ plot: spec, show: [...AX, 'cb', 'gb'] }, ln(c.bInt, 'cd'), bx(c.bG)], [{ plot: spec, show: both }, ...c.heli3]]
  };
}

examples.push(giniPair({ n: 2, problem: r`a(x)=x^4,\;b(x)=\tfrac{e^x-1}{e-1}`,
  a: x => Math.pow(x, 4), b: x => (Math.exp(x) - 1) / (Math.E - 1), aLab: [0.9, 0.66, 8, 22], aText: 'a(x) = x⁴', bLab: [0.7, 0.55, 8, -8], bText: 'b(x)',
  aHalfText: '(½, 0.06)', bHalfText: '(½, 0.38)',
  aEq: r`a(x)=x^4`, bEq: r`b(x)=\frac{e^x-1}{e-1}`,
  aSay0: r`Country A: $a(x)=x^4$ starts flat and shoots up near $x=1$. The poorest half gets only $(\tfrac12)^4\approx6\%$ of the income.`,
  bSay0: r`Country B: $b(x)=\frac{e^x-1}{e-1}$ is also bent below the line, but gently. It passes through $(0,0)$ and $(1,1)$, as every Lorenz curve must.`,
  aInt: r`G(a)=2\int_0^1\big(x-x^4\big)\,dx`,
  aSteps: [
    { say: r`Antiderivative: $\int x\,dx=\tfrac{x^2}{2}$ and $\int x^4\,dx=\tfrac{x^5}{5}$.`, rows: [r`=2\Big[\tfrac{x^2}{2}-\tfrac{x^5}{5}\Big]_0^1`] },
    { say: r`Plug in $x=1$. The lower limit gives 0.`, rows: [r`=2\Big(\tfrac12-\tfrac15\Big)`] },
    { say: r`$\tfrac12-\tfrac15=\tfrac3{10}$, then double it.`, rows: [r`=2\cdot\tfrac{3}{10}=\tfrac35`], boxed: true }],
  bInt: r`G(b)=2\int_0^1\Big(x-\tfrac{e^x-1}{e-1}\Big)\,dx`,
  bSteps: [
    { say: r`$\tfrac{1}{e-1}$ is a constant. Antiderivatives: $\int x\,dx=\tfrac{x^2}{2}$ and $\int(e^x-1)\,dx=e^x-x$.`, rows: [r`=2\Big[\tfrac{x^2}{2}-\tfrac{e^x-x}{e-1}\Big]_0^1`] },
    { say: r`Upper limit: $\tfrac12-\tfrac{e-1}{e-1}=\tfrac12-1$. Lower limit: $0-\tfrac{1}{e-1}$. Subtract lower from upper.`, rows: [r`=2\Big[\Big(\tfrac12-1\Big)-\Big(-\tfrac{1}{e-1}\Big)\Big]`] },
    { say: r`Simplify the bracket, then double.`, rows: [r`=2\Big(\tfrac{1}{e-1}-\tfrac12\Big)=\tfrac{2}{e-1}-1`], boxed: true }],
  aG: r`G(a)=\tfrac35=0.6`, bG: r`G(b)=\tfrac{2}{e-1}-1\approx0.164`,
  cmpSay0: r`Country A's gap (blue) covers most of the area under the line. Country B's gap (orange) is thin. Now prove it with numbers, not by eye.`,
  cmpSay1: r`Since $e>2.5$, we get $e-1>1.5$, so $\tfrac{2}{e-1}<\tfrac{2}{1.5}=\tfrac43$. Subtract 1.`,
  cmpRows: [r`e>2.5\Rightarrow e-1>1.5`, r`\tfrac{2}{e-1}<\tfrac43`, r`G(b)<\tfrac13<\tfrac35=G(a)`],
  cmpSay2: r`$G(b)<\tfrac13<\tfrac35=G(a)$. Country A has the larger Gini index: its income curve is farther from perfect equality, so A has more inequality.`,
  halfNote: r`Sanity check: the poorest half earns 6% in A but 38% in B.`,
  track: [r`G(a)=\tfrac35`, r`G(b)=\tfrac{2}{e-1}-1`, r`\text{A is more unequal}`],
  verify: [{ value: { f: x => 2 * (x - Math.pow(x, 4)), a: 0, b: 1, val: 0.6 } }, { value: { f: x => 2 * (x - (Math.exp(x) - 1) / (Math.E - 1)), a: 0, b: 1, val: 2 / (Math.E - 1) - 1 } }, { num: { a: 2 / (Math.E - 1) - 1, b: 0.16394, tol: 1e-4 } }],
  heli3: [ln(r`\tfrac{2}{e-1}<\tfrac43\Rightarrow G(b)<\tfrac13`, 'cd'), bx(r`G(a)=\tfrac35>G(b):\;A\text{ is more unequal}`)] }));

examples.push(giniPair({ n: 3, problem: r`a(x)=x^3,\;b(x)=1-\cos\tfrac{\pi x}{2}`,
  a: x => Math.pow(x, 3), b: x => 1 - Math.cos(Math.PI * x / 2), aLab: [0.88, 0.68, 8, 22], aText: 'a(x) = x³', bLab: [0.72, 0.5, 8, -8], bText: 'b(x)',
  aHalfText: '(½, 0.125)', bHalfText: '(½, 0.29)',
  aEq: r`a(x)=x^3`, bEq: r`b(x)=1-\cos\tfrac{\pi x}{2}`,
  aSay0: r`Country A: $a(x)=x^3$. The poorest half gets only $(\tfrac12)^3=\tfrac18$ of the income.`,
  bSay0: r`Country B: $b(x)=1-\cos\tfrac{\pi x}{2}$. At $x=0$ it is $1-1=0$ and at $x=1$ it is $1-0=1$, so it is a valid Lorenz curve.`,
  aInt: r`G(a)=2\int_0^1\big(x-x^3\big)\,dx`,
  aSteps: [
    { say: r`Antiderivative: $\int x\,dx=\tfrac{x^2}{2}$ and $\int x^3\,dx=\tfrac{x^4}{4}$.`, rows: [r`=2\Big[\tfrac{x^2}{2}-\tfrac{x^4}{4}\Big]_0^1`] },
    { say: r`Plug in $x=1$. The lower limit gives 0.`, rows: [r`=2\Big(\tfrac12-\tfrac14\Big)`] },
    { say: r`$\tfrac12-\tfrac14=\tfrac14$, then double it.`, rows: [r`=2\cdot\tfrac{1}{4}=\tfrac12`], boxed: true }],
  bInt: r`G(b)=2\int_0^1\Big(x-1+\cos\tfrac{\pi x}{2}\Big)\,dx`,
  bSteps: [
    { say: r`Distribute the minus sign: $x-\big(1-\cos\tfrac{\pi x}{2}\big)=x-1+\cos\tfrac{\pi x}{2}$. The cosine integrates to $\tfrac{2}{\pi}\sin\tfrac{\pi x}{2}$, since the inside has slope $\tfrac\pi2$.`, rows: [r`=2\Big[\tfrac{x^2}{2}-x+\tfrac{2}{\pi}\sin\tfrac{\pi x}{2}\Big]_0^1`] },
    { say: r`Upper limit: $\tfrac12-1+\tfrac2\pi\sin\tfrac\pi2=\tfrac12-1+\tfrac2\pi$. Lower limit: $0$.`, rows: [r`=2\Big(\tfrac12-1+\tfrac{2}{\pi}\Big)`] },
    { say: r`Distribute the 2.`, rows: [r`=\tfrac{4}{\pi}-1`], boxed: true }],
  aG: r`G(a)=\tfrac12=0.5`, bG: r`G(b)=\tfrac{4}{\pi}-1\approx0.273`,
  cmpSay0: r`Country A's gap (blue) is clearly the larger one. Now prove it with numbers.`,
  cmpSay1: r`Since $\pi>3$, we get $\tfrac4\pi<\tfrac43$. Subtract 1.`,
  cmpRows: [r`\pi>3\Rightarrow\tfrac4\pi<\tfrac43`, r`G(b)=\tfrac4\pi-1<\tfrac13`, r`G(b)<\tfrac13<\tfrac12=G(a)`],
  cmpSay2: r`$G(b)<\tfrac13<\tfrac12=G(a)$. Country A has the larger Gini index, so it has more inequality.`,
  halfNote: r`Sanity check: the poorest half earns 12.5% in A but about 29% in B.`,
  track: [r`G(a)=\tfrac12`, r`G(b)=\tfrac4\pi-1`, r`\text{A is more unequal}`],
  verify: [{ value: { f: x => 2 * (x - Math.pow(x, 3)), a: 0, b: 1, val: 0.5 } }, { value: { f: x => 2 * (x - 1 + Math.cos(Math.PI * x / 2)), a: 0, b: 1, val: 4 / Math.PI - 1 } }, { num: { a: 4 / Math.PI - 1, b: 0.27324, tol: 1e-4 } }],
  heli3: [ln(r`\tfrac4\pi<\tfrac43\Rightarrow G(b)<\tfrac13`, 'cd'), bx(r`G(a)=\tfrac12>G(b):\;A\text{ is more unequal}`)] }));

/* ===== Problems 19, 20 : areas between rational functions ===== */
function ratArea(c) {
  const P = PlotKit({ w: 640, h: 440, xr: c.xr, yr: c.yr });
  P.axes('axes', { xt: c.xt, yt: c.yt });
  c.asym.forEach((a, i) => P.line('as' + i, a, c.yr[0], a, c.yr[1], 'muted', { dash: '5 6', width: 2, text: 'x = ' + a, at: [a, c.yr[1]], dx: 6, dy: 22 }));
  P.curve('c0', c.f1, c.dom, 'cx', { label: c.l1, text: 'y₁', dx: 8, dy: 4, n: 400 });
  P.curve('c1', c.f2, c.dom, 'cd', { label: c.l2, text: 'y₂', dx: 8, dy: 4, n: 400 });
  P.line('yax', 0, c.yr[0], 0, c.yr[1], 'ca', { width: 3.5 });
  P.dot('pt0', 0, c.f1(0), 'ca', { text: c.pt0Text, dx: 12, dy: -10 }); P.dot('pt1', 0, c.f2(0), 'ca', { text: c.pt1Text, dx: 12, dy: 20 });
  P.dot('pt2', c.xm, c.f1(c.xm), 'ca', { text: c.pt2Text, dx: 12, dy: -12 });
  P.fill('region', c.f1, c.f2, [0, c.xm], 'cr', { opacity: .22 });
  const sx = c.xm * 0.45, sw = c.xm * 0.07;
  P.rect('strip', sx, c.f2(sx + sw / 2), sx + sw, c.f1(sx + sw / 2), 'cp', { opacity: .55, minW: 5 });
  P.text('stripl', sx + sw / 2, c.f2(sx) - 0.12 * (c.yr[1] - c.yr[0]) * 0.5, 'dx', 'cp', { anchor: 'middle' });
  const spec = P.spec('rat' + c.n);
  const plot = (show, size = 'md') => R('plotrow', PLOT('plot', spec, show, { size }));
  const sideP = show => R('side', PLOT('plot', spec, show, { size: 'sm' }));
  const asIds = c.asym.map((_, i) => 'as' + i);
  const sk = ['axes', ...asIds];
  const eb = (k, t) => eyebrow(k, t);
  const eq = [eb('q0', 'Curves'), R('side', T('q1', c.y1, 'cx')), R('side', T('q2', c.y2, 'cd'))];
  const all = [...sk, 'c0', 'c1', 'yax', 'pt0', 'pt1', 'pt2', 'region'];
  const I = [R('big', T('I', c.integral))];
  const A = [R('line', EQ('a1'), T('a1t', c.pfSplit))];
  const lines = [];
  const steps = [
    S(1, c.say0, [plot([...sk, 'c0'])], [eb('q0', 'Curves'), R('side', T('q1', c.y1, 'cx')), R('side', T('d1', c.denFactor, 'muted'))]),
    S(1, c.say1, [plot([...sk, 'c0', 'c1'])], [...eq, R('side', T('d1', c.denFactor, 'muted'))]),
    S(1, c.say2, [plot([...sk, 'c0', 'c1', 'yax'])], [...eq, R('side', T('d1', c.denFactor, 'muted'))]),
    S(1, c.say3, [plot([...sk, 'c0', 'c1', 'yax'])], [eb('m0', 'Where they meet'), R('side', T('m1', c.meet1)), R('side', T('m2', c.meet2)), R('side', T('m3', c.meet3, 'cx', { cls: 'boxed' }))]),
    S(1, c.say4, [plot([...sk, 'c0', 'c1', 'yax', 'pt0', 'pt1', 'pt2'])], [eb('m0', 'Where they meet'), R('side', T('m3', c.meet3, 'cx', { cls: 'boxed' })), R('side', RICH('m4', c.notZero, { cls: 'mini' }))]),
    S(1, c.say5, [plot(all)], [eb('m0', 'Region'), R('side', T('r1', r`0\le x\le ` + c.xmTex, 'cr')), R('side', T('r2', r`y_1\ge y_2\text{ on this interval}`, 'cr'))]),
    S(2, c.say6, [plot([...all, 'strip', 'stripl'])], [eb('d0', 'Area element'), R('side', T('dA', r`dA=(y_1-y_2)\,dx`, 'cp'))]),
    S(2, c.say7, [R('big', T('I0a', c.subtractA)), R('big', T('I0b', c.subtractB))], [eb('d0', 'Area element'), R('side', T('dA', r`dA=(y_1-y_2)\,dx`, 'cp')), R('side', RICH('dn', c.signNote, { cls: 'mini' }))]),
    S(2, c.say8, I, [eb('r0', 'Region'), sideP(all)]),
  ];
  const pfMain = n => {
    const rows = [...I, R('work', T('p1', c.pfForm, 'cx'))];
    if (n >= 2) rows.push(R('work', T('p2', c.pfClear)));
    if (n >= 3) rows.push(R('work', T('p3', c.pfA, 'cd'), T('p4', c.pfB, 'cd')));
    if (n >= 4) rows.push(R('work', T('p5', c.pfCheck, 'cr')));
    return rows;
  };
  const planP = sideP(all), pfRecap = [eb('p0', 'Partial fractions'), R('side', T('sA', c.AtEq, 'cd')), R('side', T('sB', c.BtEq, 'cd'))];
  steps.push(S(3, c.say9, pfMain(1), [eb('r0', 'Region'), planP]), S(3, c.say10, pfMain(2), [eb('r0', 'Region'), planP]), S(3, c.say11, pfMain(3), [eb('r0', 'Region'), planP]), S(3, c.say12, pfMain(4), [eb('r0', 'Region'), planP]));
  const aRow = R('line', EQ('s1'), T('s1t', c.pfInt));
  steps.push(S(3, c.say13, [...I, aRow], pfRecap));
  const bRow = R('line', EQ('s2'), T('s2t', c.pfLimits.replace(/^=\s*/, '')));
  steps.push(S(3, c.say14, [...I, aRow, bRow], pfRecap));
  const cRow = R('line', EQ('s3'), T('s3t', c.pfSimp.replace(/^=\s*/, '')));
  steps.push(S(3, c.say15, [...I, aRow, bRow, cRow], pfRecap));
  const dRow = R('line', EQ('s4'), T('s4t', c.final.replace(/^=\s*/, ''), 'ink', { cls: 'boxed' }));
  steps.push(S(3, c.say16, [...I, aRow, bRow, cRow, dRow], pfRecap));
  return {
    n: c.n, label: 'Problem ' + c.n, type: 'Rational functions', verb: 'Compute', problem: c.problem, phases: ['Sketch', 'Set up', 'Partial fractions'], track: c.track, verify: c.verify, steps,
    heli: [[{ plot: spec, show: all }, ln(c.meet3, 'cx')], [ln(r`dA=(y_1-y_2)\,dx`, 'cp'), ln(c.integral)], [ln(c.pfFull, 'cd'), ln(c.pfInt), bx(c.answer)]]
  };
}

(() => {
  const D = x => x * x - 2 * x - 3;
  examples.push(ratArea({ n: 19, problem: r`\text{Area: }y\text{-axis},\;\tfrac{2x+2}{x^2-2x-3}\text{ above},\;\tfrac{-x+6}{x^2-2x-3}\text{ below}`,
    xr: [-0.7, 3.6], yr: [-4.2, 0.9], xt: [1, 2, 3], yt: [-4, -3, -2, -1], asym: [3], dom: [-0.65, 3.5],
    f1: x => (2 * x + 2) / D(x), f2: x => (-x + 6) / D(x), l1: [2.3, -2.7], l2: [2.5, -1.45], xm: 4 / 3, xmTex: r`\tfrac43`,
    pt0Text: '(0, −⅔)', pt1Text: '(0, −2)', pt2Text: '(4/3, −6/5)',
    y1: r`y_1=\frac{2x+2}{x^2-2x-3}`, y2: r`y_2=\frac{-x+6}{x^2-2x-3}`, denFactor: r`\text{den}=(x-3)(x+1)`,
    say0: r`Sketch. The top curve $y_1$ has the denominator $x^2-2x-3=(x-3)(x+1)$, which is zero at $x=3$ and $x=-1$. On $0\le x<3$ it is negative, so $y_1$ is negative and dives to $-\infty$ as $x\to3^-$ (dashed asymptote).`,
    say1: r`The second curve $y_2$ has the same denominator, so it has the same asymptote at $x=3$.`,
    say2: r`The region's left edge is the $y$-axis ($x=0$), drawn in red. At $x=0$ the curves are at $y_1=-\tfrac23$ and $y_2=-2$.`,
    say3: r`Where do the curves meet? Same denominator, so the fractions are equal exactly when the numerators are equal.`,
    meet1: r`2x+2=-x+6`, meet2: r`3x=4`, meet3: r`x=\tfrac43`,
    notZero: r`$\tfrac43$ is not a root of the denominator, so this is a real crossing.`,
    say4: r`Plug $x=\tfrac43$ into either curve: $y=-\tfrac65$. The red dots are the corners of the region.`,
    say5: r`The region lies between $y_1$ (above) and $y_2$ (below), from $x=0$ to the crossing at $x=\tfrac43$.`,
    say6: r`Integrate in $x$. A vertical strip has $y_1$ on top and $y_2$ on the bottom for every $x\in\big[0,\tfrac43\big]$.`,
    subtractA: r`y_1-y_2=\frac{(2x+2)-(-x+6)}{x^2-2x-3}`, subtractB: r`=\frac{3x-4}{(x-3)(x+1)}`,
    signNote: r`Check: on $[0,\tfrac43)$ the numerator $3x-4<0$ and the denominator $<0$, so the height is positive.`,
    say7: r`Same denominator, so subtract numerators: $(2x+2)-(-x+6)=3x-4$.`,
    integral: r`A=\int_0^{4/3}\frac{3x-4}{(x-3)(x+1)}\,dx`,
    say8: r`Add up the strips from $x=0$ to $x=\tfrac43$. The integrand is a proper rational function with two distinct linear factors, so we use partial fractions.`,
    pfForm: r`\frac{3x-4}{(x-3)(x+1)}=\frac{A}{x-3}+\frac{B}{x+1}`, pfClear: r`3x-4=A(x+1)+B(x-3)`, pfA: r`x=3:\;5=4A\;\Rightarrow\;A=\tfrac54`, pfB: r`x=-1:\;-7=-4B\;\Rightarrow\;B=\tfrac74`, AtEq: r`A=\tfrac54`, BtEq: r`B=\tfrac74`,
    pfCheck: r`\text{check }x=0:\;\tfrac54-\tfrac{21}{4}=-4\;\checkmark`,
    say9: r`Write the integrand as $\frac{A}{x-3}+\frac{B}{x+1}$, one fraction for each factor.`,
    say10: r`Multiply both sides by $(x-3)(x+1)$ to clear the denominators.`,
    say11: r`Cover-up trick: pick $x$ to kill one term. At $x=3$ the $B$ term vanishes and $5=4A$. At $x=-1$ the $A$ term vanishes and $-7=-4B$.`,
    say12: r`Check with any other value of $x$. At $x=0$ the right side gives $\tfrac54\cdot1+\tfrac74\cdot(-3)=-4$, matching $3(0)-4$.`,
    pfInt: r`\Big[\tfrac54\ln|x-3|+\tfrac74\ln|x+1|\Big]_0^{4/3}`, pfFull: r`\tfrac54\ln|x-3|+\tfrac74\ln|x+1|`,
    say13: r`Integrate each piece: $\int\frac{dx}{x-3}=\ln|x-3|$ and $\int\frac{dx}{x+1}=\ln|x+1|$. The absolute value matters, since $x-3<0$ on our interval.`,
    pfLimits: r`=\tfrac54\Big(\ln\tfrac53-\ln3\Big)+\tfrac74\Big(\ln\tfrac73-\ln1\Big)`,
    say14: r`Upper minus lower. At $x=\tfrac43$: $\big|\tfrac43-3\big|=\tfrac53$ and $\tfrac43+1=\tfrac73$. At $x=0$: $|-3|=3$ and $\ln1=0$.`,
    pfSimp: r`=\tfrac54\ln\tfrac59+\tfrac74\ln\tfrac73`,
    say15: r`Combine the logs in the first bracket: $\ln\tfrac53-\ln3=\ln\tfrac59$. Drop $\ln1=0$.`,
    final: r`=\tfrac74\ln\tfrac73-\tfrac54\ln\tfrac95\approx0.748`,
    say16: r`Flip the first log to make both terms positive: $\tfrac74\ln\tfrac73\approx1.483$ and $\tfrac54\ln\tfrac95\approx0.735$. The difference is about $0.748$.`,
    answer: r`\tfrac74\ln\tfrac73-\tfrac54\ln\tfrac95\approx0.748`,
    track: [r`x=\tfrac43`, r`\int_0^{4/3}\frac{3x-4}{(x-3)(x+1)}\,dx`, r`\approx0.748`],
    verify: [{ value: { f: x => (3 * x - 4) / ((x - 3) * (x + 1)), a: 0, b: 4 / 3, val: 1.75 * Math.log(7 / 3) - 1.25 * Math.log(9 / 5) } },
      { equal: { a: x => 1.25 / (x - 3) + 1.75 / (x + 1), b: x => (3 * x - 4) / ((x - 3) * (x + 1)), range: [0, 1.3] } },
      { equal: { a: x => (2 * x + 2) / D(x) - (-x + 6) / D(x), b: x => (3 * x - 4) / D(x), range: [0, 1.3] } },
      { num: { a: (2 * 4 / 3 + 2) / D(4 / 3), b: -1.2 } }] }));
})();

(() => {
  const D = x => x * x - x - 2;
  examples.push(ratArea({ n: 20, problem: r`\text{Area: }y\text{-axis},\;\tfrac{x+1}{x^2-x-2}\text{ above},\;\tfrac{-x+3}{x^2-x-2}\text{ below}`,
    xr: [-0.7, 2.7], yr: [-3.4, 1.2], xt: [1, 2], yt: [-3, -2, -1, 1], asym: [2], dom: [-0.65, 2.65],
    f1: x => (x + 1) / D(x), f2: x => (-x + 3) / D(x), l1: [1.6, -1.0], l2: [1.75, -1.9], xm: 1, xmTex: r`1`,
    pt0Text: '(0, −½)', pt1Text: '(0, −3/2)', pt2Text: '(1, −1)',
    y1: r`y_1=\frac{x+1}{x^2-x-2}`, y2: r`y_2=\frac{-x+3}{x^2-x-2}`, denFactor: r`\text{den}=(x-2)(x+1)`,
    say0: r`Sketch. Factor the denominator: $x^2-x-2=(x-2)(x+1)$. It is zero at $x=2$ and $x=-1$, and negative between them. So on $0\le x<2$ the top curve is negative and dives to $-\infty$ at the dashed asymptote $x=2$.`,
    say1: r`The second curve $y_2$ has the same denominator, so the same asymptote at $x=2$.`,
    say2: r`The region's left edge is the $y$-axis ($x=0$), in red. At $x=0$ the curves are at $y_1=-\tfrac12$ and $y_2=-\tfrac32$.`,
    say3: r`Where do the curves meet? Same denominator, so the fractions are equal exactly when the numerators are equal.`,
    meet1: r`x+1=-x+3`, meet2: r`2x=2`, meet3: r`x=1`,
    notZero: r`$x=1$ is not a root of the denominator, so this is a real crossing.`,
    say4: r`Plug $x=1$ into either curve: $y=-1$. The red dots are the corners of the region.`,
    say5: r`The region lies between $y_1$ (above) and $y_2$ (below), from $x=0$ to the crossing at $x=1$.`,
    say6: r`Integrate in $x$. A vertical strip has $y_1$ on top and $y_2$ on the bottom for every $x\in[0,1]$.`,
    subtractA: r`y_1-y_2=\frac{(x+1)-(-x+3)}{x^2-x-2}`, subtractB: r`=\frac{2x-2}{(x-2)(x+1)}`,
    signNote: r`Check: on $[0,1)$ the numerator $2x-2<0$ and the denominator $<0$, so the height is positive.`,
    say7: r`Same denominator, so subtract numerators: $(x+1)-(-x+3)=2x-2$.`,
    integral: r`A=\int_0^{1}\frac{2x-2}{(x-2)(x+1)}\,dx`,
    say8: r`Add up the strips from $x=0$ to $x=1$. The integrand is a proper rational function with two distinct linear factors, so we use partial fractions.`,
    pfForm: r`\frac{2x-2}{(x-2)(x+1)}=\frac{A}{x-2}+\frac{B}{x+1}`, pfClear: r`2x-2=A(x+1)+B(x-2)`, pfA: r`x=2:\;2=3A\;\Rightarrow\;A=\tfrac23`, pfB: r`x=-1:\;-4=-3B\;\Rightarrow\;B=\tfrac43`, AtEq: r`A=\tfrac23`, BtEq: r`B=\tfrac43`,
    pfCheck: r`\text{check }x=0:\;\tfrac23-\tfrac83=-2\;\checkmark`,
    say9: r`Write the integrand as $\frac{A}{x-2}+\frac{B}{x+1}$, one fraction for each factor.`,
    say10: r`Multiply both sides by $(x-2)(x+1)$ to clear the denominators.`,
    say11: r`Cover-up trick: pick $x$ to kill one term. At $x=2$ the $B$ term vanishes and $2=3A$. At $x=-1$ the $A$ term vanishes and $-4=-3B$.`,
    say12: r`Check with any other value of $x$. At $x=0$ the right side gives $\tfrac23\cdot1+\tfrac43\cdot(-2)=-2$, matching $2(0)-2$.`,
    pfInt: r`\Big[\tfrac23\ln|x-2|+\tfrac43\ln|x+1|\Big]_0^{1}`, pfFull: r`\tfrac23\ln|x-2|+\tfrac43\ln|x+1|`,
    say13: r`Integrate each piece: $\int\frac{dx}{x-2}=\ln|x-2|$ and $\int\frac{dx}{x+1}=\ln|x+1|$. The absolute value matters, since $x-2<0$ on our interval.`,
    pfLimits: r`=\tfrac23\big(\ln1-\ln2\big)+\tfrac43\big(\ln2-\ln1\big)`,
    say14: r`Upper minus lower. At $x=1$: $|1-2|=1$ and $1+1=2$. At $x=0$: $|-2|=2$ and $0+1=1$.`,
    pfSimp: r`=-\tfrac23\ln2+\tfrac43\ln2`,
    say15: r`$\ln1=0$, so the first bracket is $-\ln2$ and the second is $+\ln2$.`,
    final: r`=\tfrac23\ln2\approx0.462`,
    say16: r`Combine: $-\tfrac23+\tfrac43=\tfrac23$ copies of $\ln2$.`,
    answer: r`\tfrac23\ln2\approx0.462`,
    track: [r`x=1`, r`\int_0^{1}\frac{2x-2}{(x-2)(x+1)}\,dx`, r`\tfrac23\ln2`],
    verify: [{ value: { f: x => (2 * x - 2) / ((x - 2) * (x + 1)), a: 0, b: 1, val: 2 / 3 * Math.log(2) } },
      { equal: { a: x => (2 / 3) / (x - 2) + (4 / 3) / (x + 1), b: x => (2 * x - 2) / ((x - 2) * (x + 1)), range: [0, 0.99] } },
      { equal: { a: x => (x + 1) / D(x) - (-x + 3) / D(x), b: x => (2 * x - 2) / D(x), range: [0, 0.99] } },
      { num: { a: (1 + 1) / D(1), b: -1 } }] }));
})();

/* ===== intro ===== */
const introL30 = [
  { id: 'title', label: 'Title', head: { eb: 'MATH 1400 · Lectures 30 & 31', prob: null }, layout: 'full', tag: '',
    say: r`Twenty practice problems on area, each as its own lesson: Gini index, area between curves, choosing $x$ or $y$, and rational-function areas. Press → or click to begin.`,
    main: [R('eyebrow', H('t1', 'Practice problems · Lectures 30 & 31')), R('display', H('t2', 'Area Between Curves', 'ink')),
      R('lead', H('t3', 'Sketch the region, draw one strip, integrate, evaluate.')),
      R('chips', H('c1', '<b>1–3</b>Gini index', 'ink', { cls: 'chip' }), H('c2', '<b>4–9</b>Area between curves', 'ink', { cls: 'chip' }), H('c3', '<b>10–18</b>Which variable?', 'ink', { cls: 'chip' }), H('c4', '<b>19–20</b>Rational functions', 'ink', { cls: 'chip' })),
      R('sample', T('s1', r`A=\int_a^b`, 'ct'), T('s2', r`\big(\text{top}-\text{bottom}\big)`, 'cx'), T('s3', r`dx`, 'cd'))], side: [] },
  { id: 'map', label: 'The twenty problems', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Problems 1 to 3 use the Gini index. Problems 4 to 9 are the longer region problems. Problems 10 to 18 practice choosing the variable and parabola-and-line regions. Problems 19 and 20 end in partial fractions.`,
    main: [R('cols',
      ST([H('m1h', 'Gini index', 'muted', { cls: 'eyebrow' })], [T('m1a', r`G(x^n)=\tfrac56`, 'ct')], [T('m1b', r`x^4\text{ vs }\tfrac{e^x-1}{e-1}`, 'ct')], [T('m1c', r`x^3\text{ vs }1-\cos\tfrac{\pi x}{2}`, 'ct')], [H('m1h2', 'Rational functions', 'muted', { cls: 'eyebrow' })], [T('m1d', r`\tfrac{2x+2}{x^2-2x-3},\tfrac{-x+6}{x^2-2x-3}`, 'cr')], [T('m1e', r`\tfrac{x+1}{x^2-x-2},\tfrac{-x+3}{x^2-x-2}`, 'cr')]),
      ST([H('m2h', 'Longer regions (4–9)', 'muted', { cls: 'eyebrow' })], [T('m2a', r`x=\tfrac14\sqrt y,\;x=\tfrac76-\tfrac y6`, 'ct')], [T('m2b', r`y=x^3-x,\;y=x-x^3`, 'ct')], [T('m2c', r`x=16y^2,\;x=-\tfrac{24}{7}y+\tfrac{40}{7}`, 'ct')], [T('m2d', r`y=\tfrac14\sqrt x,\;y=\tfrac5{3}-\tfrac{7}{24}x`, 'ct')], [T('m2e', r`y=xe^x,\;y=e^x,\;x=0`, 'ct')], [T('m2f', r`y^2\le x^2-x^4`, 'ct')]),
      ST([H('m3h', 'Which variable? (10–18)', 'muted', { cls: 'eyebrow' })], [T('m3a', r`y=-x^2+1,\;y=x-1`, 'cx')], [T('m3b', r`x=y^2,\;y=-x+2`, 'cx')], [T('m3c', r`x=(y-1)^2,\;y=-x+3`, 'cx')], [H('m3h2', 'Parabola and line', 'muted', { cls: 'eyebrow' })], [T('m3d', r`y=8x-x^2,\;y=2x`, 'cd')], [T('m3e', r`y=10x-4x^2,\;y=2x`, 'cd')]))], side: [] },
];

examples.sort((a, b) => a.n - b.n);
LESSON({ key: 'l30', title: 'Lectures 30 & 31 · in Motion', intro: introL30, examples });
