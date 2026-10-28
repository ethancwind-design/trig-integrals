/* Quiz 4 practice · problems 1-7: trig powers and products as definite integrals */
const examples = [];
{
const PI = Math.PI, sq = Math.sqrt;
const sin = Math.sin, cos = Math.cos, tan = Math.tan, sec = x => 1 / Math.cos(x);
const FIG = ['axes', 'c0', 'area'];
const warn = (k, html) => RICH(k, html, { cls: 'warn' });
const rec = (u, du) => [[u, 'cx'], [du, 'cd']];

/* ===== 1 : odd power of sine, definite ===== */
{
  const f = x => 99 * sin(x) ** 3 * cos(x) ** 8;
  examples.push(flowGen({ n: 1, label: 'Problem 1', type: 'Odd power of sine', problem: r`\int_{\pi/2}^{\pi}99\sin^3x\cos^8x\,dx`,
    fig: areaFig(f, PI / 2, PI, { xr: [1.2, 3.5], yr: [-0.6, 4.8], xt: [[PI / 2, 'π/2'], [PI, 'π']], yt: [1, 2, 3, 4],
      extra: P => P.text('ans', 2.45, 2.2, 'area = 2', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`99\int_{-1}^{0}(1-u^2)u^8\,du`, r`99\Big[\tfrac{u^9}{9}-\tfrac{u^{11}}{11}\Big]_{-1}^{0}`, '2'],
    verify: [{ value: { f, a: PI / 2, b: PI, val: 2 } }, { num: { a: 99 * (1 / 9 - 1 / 11), b: 2 } }],
    steps: [
      { p: 1, say: r`Sine has an odd power (3), so peel one $\sin x$ off to become $du$ and turn every other sine into a cosine. The graph shows what we are computing: the area under the curve from $\tfrac\pi2$ to $\pi$.`, eb: 'Recipe: odd sine', side: rec(r`u=\cos x`, r`du=-\sin x\,dx`), fig: FIG },
      { p: 1, say: r`Split $\sin^3x=\sin^2x\cdot\sin x$. The lone $\sin x$ is the piece that will become $du$.`, lines: [r`=\int_{\pi/2}^{\pi}99\sin^2x\cos^8x\,\sin x\,dx`], eb: 'Recipe: odd sine', side: rec(r`u=\cos x`, r`du=-\sin x\,dx`), fig: FIG },
      { p: 1, say: r`Rewrite the leftover $\sin^2x$ using the Pythagorean identity.`, rep: r`=\int_{\pi/2}^{\pi}99(1-\cos^2x)\cos^8x\,\sin x\,dx`, eb: 'Pythagorean identity', side: [[r`\sin^2x=1-\cos^2x`, 'ct']], fig: FIG },
      { p: 1, say: r`Let $u=\cos x$. Then $du=-\sin x\,dx$, so $\sin x\,dx=-du$. The minus sign goes out front.`, lines: [r`=-99\int_{x=\pi/2}^{x=\pi}(1-u^2)\,u^8\,du`], eb: 'Substitution', side: rec(r`u=\cos x`, r`\sin x\,dx=-du`) },
      { p: 1, say: r`Change the limits to $u$-values: $x=\tfrac\pi2$ gives $u=\cos\tfrac\pi2=0$ and $x=\pi$ gives $u=\cos\pi=-1$.`, rep: r`=-99\int_{0}^{-1}(1-u^2)\,u^8\,du`, eb: 'New limits', side: [[r`x=\tfrac\pi2\;\Rightarrow\;u=0`, 'ca'], [r`x=\pi\;\Rightarrow\;u=-1`, 'ca'], warn('w1', r`<b>Heads-up.</b> Once everything is in $u$, the limits must be $u$-values too. Leaving $\tfrac\pi2$ and $\pi$ is the classic mistake.`)] },
      { p: 1, say: r`Swapping the limits flips the sign of an integral, which cancels the minus in front.`, rep: r`=99\int_{-1}^{0}(1-u^2)\,u^8\,du`, eb: 'New limits', side: [[r`x=\tfrac\pi2\;\Rightarrow\;u=0`, 'ca'], [r`x=\pi\;\Rightarrow\;u=-1`, 'ca']] },
      { p: 2, say: r`Distribute $u^8$: $(1-u^2)u^8=u^8-u^{10}$.`, rep: r`=99\int_{-1}^{0}\big(u^8-u^{10}\big)\,du`, eb: 'Substitution', side: rec(r`u=\cos x`, r`\sin x\,dx=-du`) },
      { p: 2, say: r`Power rule on each term: add 1 to the exponent and divide by the new exponent.`, lines: [r`=99\Big[\tfrac{u^9}{9}-\tfrac{u^{11}}{11}\Big]_{-1}^{0}`] },
      { p: 3, say: r`Evaluate: the upper limit $u=0$ gives 0. At the lower limit $u=-1$, odd powers of $-1$ are $-1$.`, lines: [r`=99\Big(0-\Big[\tfrac{(-1)^9}{9}-\tfrac{(-1)^{11}}{11}\Big]\Big)`] },
      { p: 3, say: r`Simplify the bracket: $\tfrac{-1}{9}-\tfrac{-1}{11}=-\tfrac19+\tfrac1{11}$, and the minus in front flips it.`, rep: r`=99\Big(0-\Big[-\tfrac19+\tfrac1{11}\Big]\Big)=99\Big(\tfrac19-\tfrac1{11}\Big)` },
      { p: 3, say: r`$\tfrac19-\tfrac1{11}=\tfrac{11-9}{99}=\tfrac{2}{99}$, and the 99 cancels.`, lines: [{ t: r`=99\cdot\tfrac{2}{99}=2`, box: true, c: 'ink' }], eb: 'Check', side: [], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`u=\cos x,\;du=-\sin x\,dx`, 'cx'], r`=99\int_{-1}^{0}(1-u^2)u^8\,du`], [r`99\Big[\tfrac{u^9}{9}-\tfrac{u^{11}}{11}\Big]_{-1}^{0}`], [r`99\Big(\tfrac19-\tfrac1{11}\Big)`, '2']] }));
}

/* ===== 2 : odd power of sine with an inner 3x ===== */
{
  const f = x => 9 * sin(3 * x) ** 3;
  examples.push(flowGen({ n: 2, label: 'Problem 2', type: 'Odd power of sine, inner 3x', problem: r`\int_0^{\pi}9\sin^3(3x)\,dx`,
    fig: areaFig(f, 0, PI, { neg: true, xr: [-0.3, 3.5], yr: [-11, 11], xt: [[PI / 3, 'π/3'], [2 * PI / 3, '2π/3'], [PI, 'π']], yt: [-9, 9],
      extra: P => P.text('ans', 2.05, 6.4, 'net area = 4', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`3\int_{-1}^{1}(1-u^2)\,du`, r`3\Big[u-\tfrac{u^3}{3}\Big]_{-1}^{1}`, '4'],
    verify: [{ value: { f, a: 0, b: PI, val: 4 } }, { num: { a: 3 * (2 / 3 + 2 / 3), b: 4 } }],
    steps: [
      { p: 1, say: r`Another odd sine, now with $3x$ inside. Same recipe, but the chain rule adds a factor of 3. On the graph the area counts positive above the axis and negative below; the net is what the integral returns.`, eb: 'Recipe: odd sine', side: rec(r`u=\cos3x`, r`du=-3\sin3x\,dx`), fig: [...FIG, 'area2'] },
      { p: 1, say: r`Peel off one $\sin(3x)$.`, lines: [r`=\int_0^{\pi}9\sin^2(3x)\,\sin(3x)\,dx`], eb: 'Recipe: odd sine', side: rec(r`u=\cos3x`, r`du=-3\sin3x\,dx`), fig: [...FIG, 'area2'] },
      { p: 1, say: r`Rewrite $\sin^2(3x)$ as $1-\cos^2(3x)$.`, rep: r`=\int_0^{\pi}9\big(1-\cos^2 3x\big)\sin3x\,dx`, eb: 'Pythagorean identity', side: [[r`\sin^2\theta=1-\cos^2\theta`, 'ct']] },
      { p: 1, say: r`With $u=\cos3x$ we get $du=-3\sin3x\,dx$, so $\sin3x\,dx=-\tfrac13du$. Then $9\cdot(-\tfrac13)=-3$.`, lines: [r`=-3\int_{x=0}^{x=\pi}(1-u^2)\,du`], eb: 'Substitution', side: [...rec(r`u=\cos3x`, r`\sin3x\,dx=-\tfrac13\,du`), warn('w1', r`<b>Heads-up.</b> Do not forget the $\tfrac13$ from the inner $3x$: it turns the constant 9 into $-3$.`)] },
      { p: 1, say: r`New limits: $x=0$ gives $u=\cos0=1$. $x=\pi$ gives $u=\cos3\pi=-1$.`, rep: r`=-3\int_{1}^{-1}(1-u^2)\,du`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;u=1`, 'ca'], [r`x=\pi\;\Rightarrow\;u=\cos3\pi=-1`, 'ca']] },
      { p: 1, say: r`Swap the limits to absorb the minus sign.`, rep: r`=3\int_{-1}^{1}(1-u^2)\,du`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;u=1`, 'ca'], [r`x=\pi\;\Rightarrow\;u=-1`, 'ca']] },
      { p: 2, say: r`Power rule: $\int1\,du=u$ and $\int u^2du=\tfrac{u^3}{3}$.`, lines: [r`=3\Big[u-\tfrac{u^3}{3}\Big]_{-1}^{1}`] },
      { p: 3, say: r`Upper limit: $1-\tfrac13=\tfrac23$. Lower limit: $-1+\tfrac13=-\tfrac23$.`, lines: [r`=3\Big[\Big(1-\tfrac13\Big)-\Big(-1+\tfrac13\Big)\Big]`] },
      { p: 3, say: r`Subtract: $\tfrac23-\big(-\tfrac23\big)=\tfrac43$. Then $3\cdot\tfrac43=4$.`, lines: [{ t: r`=3\cdot\tfrac43=4`, box: true }], eb: 'Check', side: [], fig: [...FIG, 'area2', 'ans'] }
    ],
    heli: [[[r`u=\cos3x,\;du=-3\sin3x\,dx`, 'cx'], r`=3\int_{-1}^{1}(1-u^2)\,du`], [r`3\Big[u-\tfrac{u^3}{3}\Big]_{-1}^{1}`], [r`3\Big(\tfrac23+\tfrac23\Big)`, '4']] }));
}

/* ===== 3 : even power of sine, half-angle twice ===== */
{
  const f = x => 40 * sin(x) ** 4;
  examples.push(flowGen({ n: 3, label: 'Problem 3', type: 'Even power of sine', problem: r`\int_0^{\pi}40\sin^4x\,dx`,
    fig: areaFig(f, 0, PI, { xr: [-0.3, 3.5], yr: [-6, 46], xt: [[PI / 2, 'π/2'], [PI, 'π']], yt: [15, 40],
      extra: P => { P.line('avg', 0, 15, PI, 15, 'cd', { dash: '9 6', width: 3, text: 'average 15', at: [PI, 15], dx: -92, dy: -10 }); P.text('ans', 1.57, 7, 'area = 15π', 'cr', { size: 19, anchor: 'middle' }); } }),
    track: [r`10\int_0^\pi\big(\tfrac32-2\cos2x+\tfrac12\cos4x\big)dx`, r`10\big[\tfrac32x-\sin2x+\tfrac18\sin4x\big]_0^\pi`, r`15\pi`],
    verify: [{ value: { f, a: 0, b: PI, val: 15 * PI } }, { equal: { a: x => sin(x) ** 4, b: x => 3 / 8 - cos(2 * x) / 2 + cos(4 * x) / 8, range: [0, 3.1] } }],
    steps: [
      { p: 1, say: r`An even power of sine has no odd factor to peel off, so substitution will not work. Use the half-angle identity to lower the power. The graph previews the answer: an arch of height 40 whose average height is 15.`, eb: 'Half-angle identity', side: [[r`\sin^2\theta=\tfrac{1-\cos2\theta}{2}`, 'ct']], fig: FIG },
      { p: 1, say: r`Write $\sin^4x=(\sin^2x)^2$ so the identity applies.`, lines: [r`=40\int_0^{\pi}\big(\sin^2x\big)^2\,dx`], eb: 'Half-angle identity', side: [[r`\sin^2\theta=\tfrac{1-\cos2\theta}{2}`, 'ct']], fig: FIG },
      { p: 1, say: r`Replace $\sin^2x$ by $\tfrac{1-\cos2x}{2}$.`, rep: r`=40\int_0^{\pi}\Big(\tfrac{1-\cos2x}{2}\Big)^2dx`, eb: 'Half-angle identity', side: [[r`\sin^2\theta=\tfrac{1-\cos2\theta}{2}`, 'ct']] },
      { p: 1, say: r`Square it: the denominator becomes 4 and $40/4=10$. Expand $(1-\cos2x)^2=1-2\cos2x+\cos^22x$.`, rep: r`=10\int_0^{\pi}\big(1-2\cos2x+\cos^22x\big)\,dx`, eb: 'Half-angle identity', side: [[r`\sin^2\theta=\tfrac{1-\cos2\theta}{2}`, 'ct']] },
      { p: 1, say: r`A $\cos^2$ is left. Use the cosine half-angle identity, with $2x$ in place of $\theta$: $\cos^22x=\tfrac{1+\cos4x}{2}$.`, rep: r`=10\int_0^{\pi}\Big(1-2\cos2x+\tfrac{1+\cos4x}{2}\Big)dx`, eb: 'Half-angle, again', side: [[r`\cos^2\theta=\tfrac{1+\cos2\theta}{2}`, 'ct'], [r`\cos^22x=\tfrac{1+\cos4x}{2}`, 'ct']] },
      { p: 1, say: r`Collect the constants: $1+\tfrac12=\tfrac32$. Every term is now a plain cosine, so it can be integrated.`, rep: r`=10\int_0^{\pi}\Big(\tfrac32-2\cos2x+\tfrac12\cos4x\Big)dx`, eb: 'Half-angle, again', side: [[r`\cos^2\theta=\tfrac{1+\cos2\theta}{2}`, 'ct']] },
      { p: 2, say: r`Integrate term by term. Each cosine picks up a $\tfrac1{\text{inner}}$: $\int\cos2x\,dx=\tfrac12\sin2x$ and $\int\cos4x\,dx=\tfrac14\sin4x$.`, lines: [r`=10\Big[\tfrac32x-\sin2x+\tfrac18\sin4x\Big]_0^{\pi}`] },
      { p: 3, say: r`At $x=\pi$: $\sin2\pi=0$ and $\sin4\pi=0$. At $x=0$ every term is 0. Only the $\tfrac32x$ term survives.`, lines: [r`=10\Big(\tfrac32\pi-0+0\Big)-10\cdot0`] },
      { p: 3, say: r`$10\cdot\tfrac{3\pi}{2}=15\pi$.`, lines: [{ t: r`=15\pi`, box: true }], eb: 'Check', side: [[r`\text{average of }\sin^4x=\tfrac38`, 'ct'], [r`40\cdot\tfrac38=15`, 'cd'], [r`15\cdot\pi=15\pi`, 'cr']], fig: [...FIG, 'avg', 'ans'] }
    ],
    heli: [[[r`\sin^2x=\tfrac{1-\cos2x}{2}`, 'ct'], r`=10\int_0^\pi\big(1-2\cos2x+\cos^22x\big)dx`], [r`\cos^22x=\tfrac{1+\cos4x}{2}`, r`10\Big[\tfrac32x-\sin2x+\tfrac18\sin4x\Big]_0^{\pi}`], [r`10\cdot\tfrac{3\pi}{2}`, r`15\pi`]] }));
}

/* ===== 4 : tan^5 sec^2, u = tan ===== */
{
  const f = x => 162 * tan(x) ** 5 * sec(x) ** 2;
  examples.push(flowGen({ n: 4, label: 'Problem 4', type: 'Tangent power, sec² present', problem: r`\int_0^{\pi/4}162\tan^5x\sec^2x\,dx`,
    fig: areaFig(f, 0, PI / 4, { xr: [-0.12, 0.95], yr: [-40, 360], xt: [[PI / 4, 'π/4']], yt: [100, 200, 300],
      extra: P => P.text('ans', 0.46, 75, 'area = 27', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`162\int_0^{1}u^5\,du`, r`162\Big[\tfrac{u^6}{6}\Big]_0^1`, '27'],
    verify: [{ value: { f, a: 0, b: PI / 4, val: 27, tol: 1e-6 } }],
    steps: [
      { p: 1, say: r`Look for a function and its derivative. $\sec^2x$ is exactly the derivative of $\tan x$, and the rest is a power of $\tan x$. So $u=\tan x$.`, eb: 'Substitution', side: rec(r`u=\tan x`, r`du=\sec^2x\,dx`), fig: FIG },
      { p: 1, say: r`Replace $\tan x$ by $u$ and $\sec^2x\,dx$ by $du$. Nothing else needs converting.`, lines: [r`=162\int_{x=0}^{x=\pi/4}u^5\,du`], eb: 'Substitution', side: rec(r`u=\tan x`, r`du=\sec^2x\,dx`) },
      { p: 1, say: r`New limits: $x=0$ gives $u=\tan0=0$. $x=\tfrac\pi4$ gives $u=\tan\tfrac\pi4=1$.`, rep: r`=162\int_{0}^{1}u^5\,du`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;u=0`, 'ca'], [r`x=\tfrac\pi4\;\Rightarrow\;u=1`, 'ca']] },
      { p: 2, say: r`Power rule.`, lines: [r`=162\Big[\tfrac{u^6}{6}\Big]_0^{1}`] },
      { p: 3, say: r`$\tfrac16-0=\tfrac16$, and $162\div6=27$.`, lines: [{ t: r`=162\cdot\tfrac16=27`, box: true }], eb: 'Check by differentiating', side: [[r`F(x)=27\tan^6x`, 'ct'], [r`F'(x)=162\tan^5x\sec^2x`, 'cr'], [r`F\big(\tfrac\pi4\big)-F(0)=27-0`, 'ink']], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`u=\tan x,\;du=\sec^2x\,dx`, 'cx'], r`=162\int_0^1u^5\,du`], [r`162\Big[\tfrac{u^6}{6}\Big]_0^1`], [r`162\cdot\tfrac16`, '27']] }));
}

/* ===== 5 : tan^5 sec, u = sec ===== */
{
  const f = x => 30 * tan(x) ** 5 * sec(x);
  examples.push(flowGen({ n: 5, label: 'Problem 5', type: 'Odd tangent, one secant', problem: r`\int_0^{\pi/3}30\tan^5x\sec x\,dx`,
    fig: areaFig(f, 0, PI / 3, { xr: [-0.12, 1.2], yr: [-110, 1000], xt: [[PI / 3, 'π/3']], yt: [300, 600, 900],
      extra: P => P.text('ans', 0.62, 220, 'area = 76', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`30\int_1^2(u^2-1)^2\,du`, r`30\Big[\tfrac{u^5}{5}-\tfrac{2u^3}{3}+u\Big]_1^2`, '76'],
    verify: [{ value: { f, a: 0, b: PI / 3, val: 76, tol: 1e-6 } }, { num: { a: 30 * (31 / 5 - 14 / 3 + 1), b: 76 } }],
    steps: [
      { p: 1, say: r`Tangent has an odd power and secant appears once. The derivative of $\sec x$ is $\sec x\tan x$, so save one $\sec x\tan x$ for $du$ and let $u=\sec x$.`, eb: 'Recipe: tanᵐ secⁿ, m odd', side: rec(r`u=\sec x`, r`du=\sec x\tan x\,dx`), fig: FIG },
      { p: 1, say: r`Split $\tan^5x=\tan^4x\cdot\tan x$ and group $\tan x$ with $\sec x$: that pair is $du$.`, lines: [r`=30\int_0^{\pi/3}\tan^4x\,\big(\sec x\tan x\big)\,dx`], eb: 'Recipe: tanᵐ secⁿ, m odd', side: rec(r`u=\sec x`, r`du=\sec x\tan x\,dx`), fig: FIG },
      { p: 1, say: r`Turn the leftover tangents into secants with $\tan^2x=\sec^2x-1$. Here $\tan^4x=(\sec^2x-1)^2$.`, rep: r`=30\int_0^{\pi/3}\big(\sec^2x-1\big)^2\,\big(\sec x\tan x\big)\,dx`, eb: 'Pythagorean identity', side: [[r`\tan^2x=\sec^2x-1`, 'ct']] },
      { p: 1, say: r`Substitute $u=\sec x$: $\sec^2x=u^2$ and $\sec x\tan x\,dx=du$.`, lines: [r`=30\int_{x=0}^{x=\pi/3}\big(u^2-1\big)^2\,du`], eb: 'Substitution', side: rec(r`u=\sec x`, r`du=\sec x\tan x\,dx`) },
      { p: 1, say: r`New limits: $x=0$ gives $u=\sec0=1$. $x=\tfrac\pi3$ gives $u=\sec\tfrac\pi3=\tfrac1{1/2}=2$.`, rep: r`=30\int_{1}^{2}\big(u^2-1\big)^2\,du`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;u=1`, 'ca'], [r`x=\tfrac\pi3\;\Rightarrow\;u=2`, 'ca']] },
      { p: 2, say: r`Expand $(u^2-1)^2=u^4-2u^2+1$.`, lines: [r`=30\int_{1}^{2}\big(u^4-2u^2+1\big)\,du`] },
      { p: 2, say: r`Power rule on each term.`, lines: [r`=30\Big[\tfrac{u^5}{5}-\tfrac{2u^3}{3}+u\Big]_1^{2}`] },
      { p: 3, say: r`Plug in $u=2$ and subtract the value at $u=1$.`, lines: [r`=30\Big[\Big(\tfrac{32}{5}-\tfrac{16}{3}+2\Big)-\Big(\tfrac15-\tfrac23+1\Big)\Big]`] },
      { p: 3, say: r`Subtract term by term: $\tfrac{32}{5}-\tfrac15=\tfrac{31}{5}$, $-\tfrac{16}{3}+\tfrac23=-\tfrac{14}{3}$, and $2-1=1$.`, lines: [r`=30\Big(\tfrac{31}{5}-\tfrac{14}{3}+1\Big)`] },
      { p: 3, say: r`Common denominator 15: $\tfrac{93}{15}-\tfrac{70}{15}+\tfrac{15}{15}=\tfrac{38}{15}$. Then $30\cdot\tfrac{38}{15}=2\cdot38=76$.`, lines: [{ t: r`=30\cdot\tfrac{38}{15}=76`, box: true }], eb: 'Check', side: [], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`u=\sec x,\;du=\sec x\tan x\,dx`, 'cx'], r`=30\int_1^2(u^2-1)^2\,du`], [r`30\int_1^2(u^4-2u^2+1)du`, r`30\Big[\tfrac{u^5}{5}-\tfrac{2u^3}{3}+u\Big]_1^2`], [r`30\cdot\tfrac{38}{15}`, '76']] }));
}

/* ===== 6 : sec^4 tan^2, u = tan ===== */
{
  const f = x => 15 * sec(x) ** 4 * tan(x) ** 2;
  examples.push(flowGen({ n: 6, label: 'Problem 6', type: 'Even secant', problem: r`\int_0^{\pi/3}15\sec^4x\tan^2x\,dx`,
    fig: areaFig(f, 0, PI / 3, { xr: [-0.12, 1.2], yr: [-90, 800], xt: [[PI / 3, 'π/3']], yt: [200, 400, 600],
      extra: P => P.text('ans', 0.55, 170, 'area = 42√3', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`15\int_0^{\sqrt3}(u^2+u^4)\,du`, r`15\Big[\tfrac{u^3}{3}+\tfrac{u^5}{5}\Big]_0^{\sqrt3}`, r`42\sqrt3`],
    verify: [{ value: { f, a: 0, b: PI / 3, val: 42 * sq(3), tol: 1e-6 } }, { num: { a: 15 * 14 * sq(3) / 5, b: 42 * sq(3) } }],
    steps: [
      { p: 1, say: r`Secant has an even power (4). Save one $\sec^2x$, which is the derivative of $\tan x$, and turn the remaining secants into tangents.`, eb: 'Recipe: secⁿ, n even', side: rec(r`u=\tan x`, r`du=\sec^2x\,dx`), fig: FIG },
      { p: 1, say: r`Split $\sec^4x=\sec^2x\cdot\sec^2x$. One of them is the saved $du$.`, lines: [r`=15\int_0^{\pi/3}\tan^2x\,\sec^2x\,\big(\sec^2x\big)\,dx`], eb: 'Recipe: secⁿ, n even', side: rec(r`u=\tan x`, r`du=\sec^2x\,dx`), fig: FIG },
      { p: 1, say: r`Convert the other $\sec^2x$ with $\sec^2x=1+\tan^2x$.`, rep: r`=15\int_0^{\pi/3}\tan^2x\,\big(1+\tan^2x\big)\,\sec^2x\,dx`, eb: 'Pythagorean identity', side: [[r`\sec^2x=1+\tan^2x`, 'ct']] },
      { p: 1, say: r`Substitute $u=\tan x$ and $\sec^2x\,dx=du$.`, lines: [r`=15\int_{x=0}^{x=\pi/3}u^2\big(1+u^2\big)\,du`], eb: 'Substitution', side: rec(r`u=\tan x`, r`du=\sec^2x\,dx`) },
      { p: 1, say: r`New limits: $\tan0=0$ and $\tan\tfrac\pi3=\sqrt3$.`, rep: r`=15\int_{0}^{\sqrt3}u^2\big(1+u^2\big)\,du`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;u=0`, 'ca'], [r`x=\tfrac\pi3\;\Rightarrow\;u=\sqrt3`, 'ca']] },
      { p: 2, say: r`Distribute $u^2$, then use the power rule.`, lines: [r`=15\int_0^{\sqrt3}\big(u^2+u^4\big)\,du=15\Big[\tfrac{u^3}{3}+\tfrac{u^5}{5}\Big]_0^{\sqrt3}`] },
      { p: 3, say: r`Powers of $\sqrt3$: $(\sqrt3)^3=3\sqrt3$ and $(\sqrt3)^5=9\sqrt3$. The lower limit gives 0.`, lines: [r`=15\Big(\tfrac{3\sqrt3}{3}+\tfrac{9\sqrt3}{5}\Big)=15\Big(\sqrt3+\tfrac{9\sqrt3}{5}\Big)`], eb: 'Powers of √3', side: [[r`(\sqrt3)^3=3\sqrt3`, 'ct'], [r`(\sqrt3)^5=9\sqrt3`, 'ct']] },
      { p: 3, say: r`$\sqrt3+\tfrac{9\sqrt3}{5}=\tfrac{5\sqrt3+9\sqrt3}{5}=\tfrac{14\sqrt3}{5}$. Then $15\cdot\tfrac{14\sqrt3}{5}=3\cdot14\sqrt3$.`, lines: [{ t: r`=15\cdot\tfrac{14\sqrt3}{5}=42\sqrt3`, box: true }], eb: 'Check', side: [], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`u=\tan x,\;du=\sec^2x\,dx`, 'cx'], r`=15\int_0^{\sqrt3}u^2(1+u^2)\,du`], [r`15\Big[\tfrac{u^3}{3}+\tfrac{u^5}{5}\Big]_0^{\sqrt3}`], [r`15\cdot\tfrac{14\sqrt3}{5}`, r`42\sqrt3`]] }));
}

/* ===== 7 : product of cosines with different angles ===== */
{
  const f = x => 20 * cos(3 * x) * cos(2 * x), g = x => 10 * (cos(x) + cos(5 * x));
  examples.push(flowGen({ n: 7, label: 'Problem 7', type: 'Product-to-sum', problem: r`\int_0^{\pi/6}20\cos3x\cos2x\,dx`,
    fig: (() => { const F = areaFig(f, 0, PI / 6, { xr: [-0.08, 0.7], yr: [-3, 24], xt: [[PI / 6, 'π/6']], yt: [10, 20],
      extra: P => { P.curve('c1', g, [0, PI / 6], 'cd', { dash: '9 6', width: 3 }); P.text('ans', 0.3, 4.5, 'area = 6', 'cr', { size: 19, anchor: 'middle' }); } }); return F; })(),
    track: [r`10\int_0^{\pi/6}(\cos x+\cos5x)\,dx`, r`10\Big[\sin x+\tfrac15\sin5x\Big]_0^{\pi/6}`, '6'],
    verify: [{ value: { f, a: 0, b: PI / 6, val: 6 } }, { equal: { a: f, b: g, range: [0, 0.5] } }],
    steps: [
      { p: 1, say: r`Two cosines with different angles, $3x$ and $2x$. A product of different angles cannot be integrated directly, so convert it to a sum with a product-to-sum identity.`, lines: [{ t: r`\cos A\cos B=\tfrac12\big[\cos(A-B)+\cos(A+B)\big]`, c: 'ct' }], eb: 'Product-to-sum', side: [], fig: FIG },
      { p: 1, say: r`Where it comes from: add the two cosine formulas. The sine terms cancel and $2\cos A\cos B$ is left.`, clear: true, lines: [r`\cos(A-B)=\cos A\cos B+\sin A\sin B`, r`\cos(A+B)=\cos A\cos B-\sin A\sin B`, { t: r`\text{add:}\;\;2\cos A\cos B=\cos(A-B)+\cos(A+B)`, c: 'ct' }], eb: 'Why it works', side: [], fig: FIG },
      { p: 1, say: r`Apply it with $A=3x$ and $B=2x$: $A-B=x$ and $A+B=5x$.`, clear: true, lines: [r`=20\int_0^{\pi/6}\tfrac12\big[\cos x+\cos5x\big]\,dx`], eb: 'Product-to-sum', side: [[r`A=3x,\;B=2x`, 'cx'], [r`A-B=x,\;A+B=5x`, 'cx']] },
      { p: 1, say: r`The dashed curve is $10(\cos x+\cos5x)$. It lies exactly on top of the original product, so the two integrals are equal.`, rep: r`=10\int_0^{\pi/6}\big(\cos x+\cos5x\big)\,dx`, eb: 'Same curve', side: [], fig: [...FIG, 'c1'] },
      { p: 2, say: r`Integrate. $\int\cos x\,dx=\sin x$ and $\int\cos5x\,dx=\tfrac15\sin5x$, because of the inner 5.`, lines: [r`=10\Big[\sin x+\tfrac15\sin5x\Big]_0^{\pi/6}`] },
      { p: 3, say: r`At $x=\tfrac\pi6$: $\sin\tfrac\pi6=\tfrac12$ and $\sin\tfrac{5\pi}{6}=\tfrac12$. At $x=0$ everything is 0.`, lines: [r`=10\Big(\tfrac12+\tfrac15\cdot\tfrac12\Big)=10\Big(\tfrac12+\tfrac1{10}\Big)`], eb: 'Exact values', side: [[r`\sin\tfrac\pi6=\tfrac12`, 'ct'], [r`\sin\tfrac{5\pi}6=\tfrac12`, 'ct']] },
      { p: 3, say: r`$\tfrac12+\tfrac1{10}=\tfrac{6}{10}$, and $10\cdot\tfrac6{10}=6$.`, lines: [{ t: r`=10\cdot\tfrac{6}{10}=6`, box: true }], eb: 'Check', side: [], fig: [...FIG, 'c1', 'ans'] }
    ],
    heli: [[[r`\cos A\cos B=\tfrac12[\cos(A\!-\!B)+\cos(A\!+\!B)]`, 'ct'], r`=10\int_0^{\pi/6}(\cos x+\cos5x)\,dx`], [r`10\Big[\sin x+\tfrac15\sin5x\Big]_0^{\pi/6}`], [r`10\Big(\tfrac12+\tfrac1{10}\Big)`, '6']] }));
}

}
