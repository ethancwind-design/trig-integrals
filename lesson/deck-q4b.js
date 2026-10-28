/* Quiz 4 practice · problems 8-12: definite integrals by trigonometric substitution (limits converted to θ) */
{
const PI = Math.PI, sq = Math.sqrt;
const FIG = ['axes', 'c0', 'area'];
const warn = (k, html) => RICH(k, html, { cls: 'warn' });
const tri = (kind, x, a, rad, show = ALL) => R('side', TRI('tri', (kind === 'I' ? triI : kind === 'II' ? triII : triIII)(x, a, rad, show)));
const subRows = (x, dx) => [[x, 'cx'], [dx, 'cd']];

/* ===== 8 : type II, x^3 / sqrt(1+x^2) ===== */
{
  const f = x => 3 * x ** 3 / sq(1 + x * x);
  examples.push(flowGen({ n: 8, label: 'Problem 8', type: 'Type II · x = tan θ', problem: r`\int_0^{\sqrt3}\frac{3x^3}{\sqrt{1+x^2}}\,dx`, phases: ['Substitute', 'Integrate', 'Evaluate'],
    fig: areaFig(f, 0, sq(3), { xr: [-0.2, 2.1], yr: [-1, 9], xt: [[sq(3), '√3'], [1, '1']], yt: [2, 4, 6, 8],
      extra: P => P.text('ans', 1.0, 2.0, 'area = 4', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`3\int_0^{\pi/3}\tan^3\theta\sec\theta\,d\theta`, r`3\Big[\tfrac{u^3}{3}-u\Big]_1^2`, '4'],
    verify: [{ value: { f, a: 0, b: sq(3), val: 4 } }, { value: { f: x => 3 / 2 * (sq(x) - 1 / sq(x)), a: 1, b: 4, val: 4 } }],
    steps: [
      { p: 1, say: r`The radical $\sqrt{1+x^2}$ has the form $\sqrt{x^2+a^2}$ with $a^2=1$, so $a=1$. That is Type II: substitute $x=a\tan\theta$. The graph shows the area we are after.`, eb: 'Type II radical', side: [[r`\sqrt{x^2+a^2}`, 'cr'], [r`a=1`, 'ca'], [r`x=\tan\theta`, 'cx']], fig: FIG },
      { p: 1, say: r`Differentiate the substitution to replace $dx$, and cube it for $x^3$.`, lines: [r`x^3=\tan^3\theta,\qquad dx=\sec^2\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=\tan\theta`, r`dx=\sec^2\theta\,d\theta`), fig: FIG },
      { p: 1, say: r`Simplify the radical with $1+\tan^2\theta=\sec^2\theta$. It is positive, since $\sec\theta>0$ on $0\le\theta\le\tfrac\pi3$.`, lines: [r`\sqrt{1+x^2}=\sqrt{1+\tan^2\theta}=\sec\theta`], eb: 'Pythagorean identity', side: [[r`\tan^2\theta+1=\sec^2\theta`, 'ct']] },
      { p: 1, say: r`Substitute all three pieces into the integral.`, clear: true, lines: [r`=\int_{x=0}^{x=\sqrt3}\frac{3\tan^3\theta\cdot\sec^2\theta\,d\theta}{\sec\theta}`], eb: 'Substitution', side: subRows(r`x=\tan\theta`, r`dx=\sec^2\theta\,d\theta`) },
      { p: 1, say: r`Cancel one $\sec\theta$ from top and bottom.`, rep: r`=\int_{x=0}^{x=\sqrt3}3\tan^3\theta\,\sec\theta\,d\theta`, eb: 'Substitution', side: subRows(r`x=\tan\theta`, r`dx=\sec^2\theta\,d\theta`) },
      { p: 1, say: r`Convert the limits with the triangle: $\tan\theta=\tfrac{x}{1}$. At $x=\sqrt3$ the legs are $\sqrt3$ and 1 and the hypotenuse is 2, a 30-60-90 triangle, so $\theta=\tfrac\pi3$. At $x=0$, $\theta=0$.`, rep: r`=\int_{0}^{\pi/3}3\tan^3\theta\,\sec\theta\,d\theta`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;\theta=0`, 'ca'], [r`x=\sqrt3\;\Rightarrow\;\theta=\tfrac\pi3`, 'ca'], tri('II', r`\sqrt3`, '1', '2')] },
      { p: 2, say: r`Now it is a trig integral. Tangent is odd and secant appears once, so save $\sec\theta\tan\theta$ for $du$ and let $u=\sec\theta$.`, lines: [r`=3\int_0^{\pi/3}\tan^2\theta\,\big(\sec\theta\tan\theta\big)\,d\theta`], eb: 'Recipe: odd tangent', side: subRows(r`u=\sec\theta`, r`du=\sec\theta\tan\theta\,d\theta`) },
      { p: 2, say: r`Convert the leftover $\tan^2\theta$ with $\tan^2\theta=\sec^2\theta-1$.`, rep: r`=3\int_0^{\pi/3}\big(\sec^2\theta-1\big)\big(\sec\theta\tan\theta\big)\,d\theta`, eb: 'Recipe: odd tangent', side: subRows(r`u=\sec\theta`, r`du=\sec\theta\tan\theta\,d\theta`) },
      { p: 2, say: r`Substitute $u=\sec\theta$ and change the limits: $\sec0=1$ and $\sec\tfrac\pi3=2$.`, lines: [r`=3\int_{1}^{2}\big(u^2-1\big)\,du`], eb: 'New limits', side: [[r`\theta=0\;\Rightarrow\;u=1`, 'ca'], [r`\theta=\tfrac\pi3\;\Rightarrow\;u=2`, 'ca']] },
      { p: 2, say: r`Power rule.`, lines: [r`=3\Big[\tfrac{u^3}{3}-u\Big]_1^{2}`] },
      { p: 3, say: r`Plug in $u=2$, then subtract the value at $u=1$.`, lines: [r`=3\Big[\Big(\tfrac83-2\Big)-\Big(\tfrac13-1\Big)\Big]`] },
      { p: 3, say: r`$\tfrac83-2=\tfrac23$ and $\tfrac13-1=-\tfrac23$, so the bracket is $\tfrac23+\tfrac23=\tfrac43$.`, lines: [{ t: r`=3\cdot\tfrac43=4`, box: true }], eb: 'Check: u = 1 + x²', side: [[r`\tfrac32\int_1^4\big(u^{1/2}-u^{-1/2}\big)\,du`, 'ct'], [r`=\tfrac32\cdot\tfrac83=4\;\checkmark`, 'cr']], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`x=\tan\theta,\;dx=\sec^2\theta\,d\theta`, 'cx'], r`=\int_0^{\pi/3}3\tan^3\theta\sec\theta\,d\theta`], [[r`u=\sec\theta`, 'cx'], r`3\Big[\tfrac{u^3}{3}-u\Big]_1^2`], [r`3\Big[\tfrac23+\tfrac23\Big]`, '4']] }));
}

/* ===== 9 : type I, x^3 / sqrt(1-x^2) ===== */
{
  const f = x => 24 * x ** 3 / sq(1 - x * x);
  examples.push(flowGen({ n: 9, label: 'Problem 9', type: 'Type I · x = sin θ', problem: r`\int_0^{\sqrt3/2}\frac{24x^3}{\sqrt{1-x^2}}\,dx`, phases: ['Substitute', 'Integrate', 'Evaluate'],
    fig: areaFig(f, 0, sq(3) / 2, { xr: [-0.1, 1.05], yr: [-3, 36], xt: [[sq(3) / 2, '√3/2'], [0.5, '½']], yt: [10, 20, 30],
      extra: P => P.text('ans', 0.5, 6, 'area = 5', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`24\int_0^{\pi/3}\sin^3\theta\,d\theta`, r`24\Big[u-\tfrac{u^3}{3}\Big]_{1/2}^{1}`, '5'],
    verify: [{ value: { f, a: 0, b: sq(3) / 2, val: 5 } }, { num: { a: 24 * (2 / 3 - 11 / 24), b: 5 } }],
    steps: [
      { p: 1, say: r`The radical $\sqrt{1-x^2}$ has the form $\sqrt{a^2-x^2}$ with $a=1$. That is Type I: substitute $x=a\sin\theta$.`, eb: 'Type I radical', side: [[r`\sqrt{a^2-x^2}`, 'cr'], [r`a=1`, 'ca'], [r`x=\sin\theta`, 'cx']], fig: FIG },
      { p: 1, say: r`Replace $dx$ and $x^3$.`, lines: [r`x^3=\sin^3\theta,\qquad dx=\cos\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=\sin\theta`, r`dx=\cos\theta\,d\theta`), fig: FIG },
      { p: 1, say: r`Simplify the radical with $1-\sin^2\theta=\cos^2\theta$. It is $\cos\theta\ge0$ for $0\le\theta\le\tfrac\pi3$.`, lines: [r`\sqrt{1-x^2}=\sqrt{1-\sin^2\theta}=\cos\theta`], eb: 'Pythagorean identity', side: [[r`1-\sin^2\theta=\cos^2\theta`, 'ct']] },
      { p: 1, say: r`Substitute all three pieces.`, clear: true, lines: [r`=\int_{x=0}^{x=\sqrt3/2}\frac{24\sin^3\theta\cdot\cos\theta\,d\theta}{\cos\theta}`], eb: 'Substitution', side: subRows(r`x=\sin\theta`, r`dx=\cos\theta\,d\theta`) },
      { p: 1, say: r`The $\cos\theta$ in the numerator cancels the radical. That is the whole point of the substitution.`, rep: r`=\int_{x=0}^{x=\sqrt3/2}24\sin^3\theta\,d\theta`, eb: 'Substitution', side: subRows(r`x=\sin\theta`, r`dx=\cos\theta\,d\theta`) },
      { p: 1, say: r`Limits from the triangle: $\sin\theta=x$. At $x=\tfrac{\sqrt3}{2}$ the angle is the 60° one, $\theta=\tfrac\pi3$. At $x=0$, $\theta=0$.`, rep: r`=\int_{0}^{\pi/3}24\sin^3\theta\,d\theta`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;\theta=0`, 'ca'], [r`x=\tfrac{\sqrt3}2\;\Rightarrow\;\theta=\tfrac\pi3`, 'ca'], tri('I', r`\tfrac{\sqrt3}{2}`, '1', r`\tfrac12`)] },
      { p: 2, say: r`Odd power of sine: peel off one $\sin\theta$ for $du$.`, lines: [r`=24\int_0^{\pi/3}\sin^2\theta\,\big(\sin\theta\big)\,d\theta`], eb: 'Recipe: odd sine', side: subRows(r`u=\cos\theta`, r`du=-\sin\theta\,d\theta`) },
      { p: 2, say: r`Turn $\sin^2\theta$ into $1-\cos^2\theta$.`, rep: r`=24\int_0^{\pi/3}\big(1-\cos^2\theta\big)\big(\sin\theta\big)\,d\theta`, eb: 'Recipe: odd sine', side: subRows(r`u=\cos\theta`, r`du=-\sin\theta\,d\theta`) },
      { p: 2, say: r`Let $u=\cos\theta$. Limits: $\cos0=1$ and $\cos\tfrac\pi3=\tfrac12$. The $-du$ from $\sin\theta\,d\theta$ is absorbed by swapping the limits.`, lines: [r`=-24\int_{1}^{1/2}\big(1-u^2\big)\,du=24\int_{1/2}^{1}\big(1-u^2\big)\,du`], eb: 'New limits', side: [[r`\theta=0\;\Rightarrow\;u=1`, 'ca'], [r`\theta=\tfrac\pi3\;\Rightarrow\;u=\tfrac12`, 'ca']] },
      { p: 2, say: r`Power rule.`, lines: [r`=24\Big[u-\tfrac{u^3}{3}\Big]_{1/2}^{1}`] },
      { p: 3, say: r`Upper limit: $1-\tfrac13=\tfrac23$. Lower limit: $\tfrac12-\tfrac{(1/2)^3}{3}=\tfrac12-\tfrac1{24}=\tfrac{11}{24}$.`, lines: [r`=24\Big[\Big(1-\tfrac13\Big)-\Big(\tfrac12-\tfrac1{24}\Big)\Big]`] },
      { p: 3, say: r`$\tfrac23=\tfrac{16}{24}$, so the bracket is $\tfrac{16-11}{24}=\tfrac5{24}$, and $24\cdot\tfrac5{24}=5$.`, lines: [{ t: r`=24\Big[\tfrac{16}{24}-\tfrac{11}{24}\Big]=5`, box: true }], eb: 'Check', side: [], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`x=\sin\theta,\;dx=\cos\theta\,d\theta`, 'cx'], r`=24\int_0^{\pi/3}\sin^3\theta\,d\theta`], [[r`u=\cos\theta`, 'cx'], r`24\Big[u-\tfrac{u^3}{3}\Big]_{1/2}^{1}`], [r`24\Big[\tfrac23-\tfrac{11}{24}\Big]`, '5']] }));
}

/* ===== 10 : type I, sqrt(1-x^2) / x^2 ===== */
{
  const f = x => sq(1 - x * x) / (x * x);
  examples.push(flowGen({ n: 10, label: 'Problem 10', type: 'Type I · x = sin θ', problem: r`\int_{1/2}^{1}\frac{\sqrt{1-x^2}}{x^2}\,dx`, phases: ['Substitute', 'Integrate', 'Evaluate'],
    fig: areaFig(f, 0.5, 1, { xr: [0.3, 1.15], yr: [-0.5, 4], xt: [[0.5, '½'], [1, '1']], yt: [1, 2, 3],
      extra: P => P.text('ans', 0.78, 0.8, 'area = √3 − π/3', 'cr', { size: 18, anchor: 'middle' }) }),
    track: [r`\int_{\pi/6}^{\pi/2}\cot^2\theta\,d\theta`, r`\Big[-\cot\theta-\theta\Big]_{\pi/6}^{\pi/2}`, r`\sqrt3-\tfrac\pi3`],
    verify: [{ value: { f, a: 0.5, b: 1, val: sq(3) - PI / 3 } }],
    steps: [
      { p: 1, say: r`The radical $\sqrt{1-x^2}$ is Type I again, with $a=1$. Substitute $x=\sin\theta$.`, eb: 'Type I radical', side: [[r`\sqrt{a^2-x^2}`, 'cr'], [r`a=1`, 'ca'], [r`x=\sin\theta`, 'cx']], fig: FIG },
      { p: 1, say: r`Replace $dx$ and $x^2$.`, lines: [r`x^2=\sin^2\theta,\qquad dx=\cos\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=\sin\theta`, r`dx=\cos\theta\,d\theta`), fig: FIG },
      { p: 1, say: r`Simplify the radical: $\sqrt{1-\sin^2\theta}=\cos\theta$.`, lines: [r`\sqrt{1-x^2}=\cos\theta`], eb: 'Pythagorean identity', side: [[r`1-\sin^2\theta=\cos^2\theta`, 'ct']] },
      { p: 1, say: r`Substitute all three pieces.`, clear: true, lines: [r`=\int_{x=1/2}^{x=1}\frac{\cos\theta\cdot\cos\theta\,d\theta}{\sin^2\theta}`], eb: 'Substitution', side: subRows(r`x=\sin\theta`, r`dx=\cos\theta\,d\theta`) },
      { p: 1, say: r`$\tfrac{\cos^2\theta}{\sin^2\theta}=\cot^2\theta$.`, rep: r`=\int_{x=1/2}^{x=1}\cot^2\theta\,d\theta`, eb: 'Substitution', side: subRows(r`x=\sin\theta`, r`dx=\cos\theta\,d\theta`) },
      { p: 1, say: r`Limits: $\sin\theta=x$. At $x=\tfrac12$ the opposite side is $\tfrac12$ and the hypotenuse is 1, so $\theta=\tfrac\pi6$. At $x=1$, $\theta=\tfrac\pi2$.`, rep: r`=\int_{\pi/6}^{\pi/2}\cot^2\theta\,d\theta`, eb: 'New limits', side: [[r`x=\tfrac12\;\Rightarrow\;\theta=\tfrac\pi6`, 'ca'], [r`x=1\;\Rightarrow\;\theta=\tfrac\pi2`, 'ca'], tri('I', r`\tfrac12`, '1', r`\tfrac{\sqrt3}{2}`)] },
      { p: 2, say: r`$\cot^2\theta$ has no direct antiderivative. Use $1+\cot^2\theta=\csc^2\theta$, so $\cot^2\theta=\csc^2\theta-1$.`, lines: [r`=\int_{\pi/6}^{\pi/2}\big(\csc^2\theta-1\big)\,d\theta`], eb: 'Identity and a derivative', side: [[r`1+\cot^2\theta=\csc^2\theta`, 'ct'], [r`\tfrac{d}{d\theta}\cot\theta=-\csc^2\theta`, 'ct']] },
      { p: 2, say: r`Since $\tfrac{d}{d\theta}(-\cot\theta)=\csc^2\theta$, the antiderivative of $\csc^2\theta-1$ is $-\cot\theta-\theta$.`, lines: [r`=\Big[-\cot\theta-\theta\Big]_{\pi/6}^{\pi/2}`], eb: 'Identity and a derivative', side: [[r`1+\cot^2\theta=\csc^2\theta`, 'ct'], [r`\tfrac{d}{d\theta}\cot\theta=-\csc^2\theta`, 'ct']] },
      { p: 3, say: r`Upper limit: $\cot\tfrac\pi2=0$, so $-0-\tfrac\pi2$. Lower limit: $\cot\tfrac\pi6=\sqrt3$, so $-\sqrt3-\tfrac\pi6$.`, lines: [r`=\Big(0-\tfrac\pi2\Big)-\Big(-\sqrt3-\tfrac\pi6\Big)`], eb: 'Exact values', side: [[r`\cot\tfrac\pi2=0`, 'ct'], [r`\cot\tfrac\pi6=\sqrt3`, 'ct']] },
      { p: 3, say: r`Distribute the minus: $-\tfrac\pi2+\sqrt3+\tfrac\pi6$. Combine $-\tfrac{3\pi}6+\tfrac{\pi}{6}=-\tfrac{2\pi}{6}=-\tfrac\pi3$.`, lines: [{ t: r`=-\tfrac\pi2+\sqrt3+\tfrac\pi6=\sqrt3-\tfrac\pi3`, box: true }], eb: 'Check', side: [[r`\sqrt3-\tfrac\pi3\approx0.685`, 'cr']], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`x=\sin\theta,\;dx=\cos\theta\,d\theta`, 'cx'], r`=\int_{\pi/6}^{\pi/2}\cot^2\theta\,d\theta`], [[r`\cot^2\theta=\csc^2\theta-1`, 'ct'], r`\Big[-\cot\theta-\theta\Big]_{\pi/6}^{\pi/2}`], [r`\Big(0-\tfrac\pi2\Big)-\Big(-\sqrt3-\tfrac\pi6\Big)`, r`\sqrt3-\tfrac\pi3`]] }));
}

/* ===== 11 : type III, x^3 / sqrt(x^2-1) ===== */
{
  const f = x => 3 * x ** 3 / sq(x * x - 1);
  examples.push(flowGen({ n: 11, label: 'Problem 11', type: 'Type III · x = sec θ', problem: r`\int_{\sqrt2}^{\sqrt5}\frac{3x^3}{\sqrt{x^2-1}}\,dx`, phases: ['Substitute', 'Integrate', 'Evaluate'],
    fig: areaFig(f, sq(2), sq(5), { xr: [0.9, 2.5], yr: [-2, 20], xt: [[sq(2), '√2'], [sq(5), '√5']], yt: [5, 10, 15],
      extra: P => P.text('ans', 1.85, 5, 'area = 10', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`3\int\sec^4\theta\,d\theta`, r`3\Big[u+\tfrac{u^3}{3}\Big]_1^2`, '10'],
    verify: [{ value: { f, a: sq(2), b: sq(5), val: 10, tol: 1e-6 } }, { num: { a: 3 * (14 / 3 - 4 / 3), b: 10 } }],
    steps: [
      { p: 1, say: r`The radical $\sqrt{x^2-1}$ has the form $\sqrt{x^2-a^2}$ with $a=1$. That is Type III: substitute $x=a\sec\theta$.`, eb: 'Type III radical', side: [[r`\sqrt{x^2-a^2}`, 'cr'], [r`a=1`, 'ca'], [r`x=\sec\theta`, 'cx']], fig: FIG },
      { p: 1, say: r`Differentiate: $dx=\sec\theta\tan\theta\,d\theta$. Cube for $x^3$.`, lines: [r`x^3=\sec^3\theta,\qquad dx=\sec\theta\tan\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=\sec\theta`, r`dx=\sec\theta\tan\theta\,d\theta`), fig: FIG },
      { p: 1, say: r`Simplify the radical with $\sec^2\theta-1=\tan^2\theta$. Here $x\ge\sqrt2$, so $\theta$ is in the first quadrant and $\tan\theta>0$.`, lines: [r`\sqrt{x^2-1}=\sqrt{\sec^2\theta-1}=\tan\theta`], eb: 'Pythagorean identity', side: [[r`\sec^2\theta-1=\tan^2\theta`, 'ct']] },
      { p: 1, say: r`Substitute all three pieces.`, clear: true, lines: [r`=\int_{x=\sqrt2}^{x=\sqrt5}\frac{3\sec^3\theta\cdot\sec\theta\tan\theta\,d\theta}{\tan\theta}`], eb: 'Substitution', side: subRows(r`x=\sec\theta`, r`dx=\sec\theta\tan\theta\,d\theta`) },
      { p: 1, say: r`The $\tan\theta$ cancels. Two secants multiply: $\sec^3\theta\cdot\sec\theta=\sec^4\theta$.`, rep: r`=\int_{x=\sqrt2}^{x=\sqrt5}3\sec^4\theta\,d\theta`, eb: 'Substitution', side: subRows(r`x=\sec\theta`, r`dx=\sec\theta\tan\theta\,d\theta`) },
      { p: 1, say: r`$\theta=\operatorname{arcsec}\sqrt5$ is not a nice angle, but the next step only needs $\tan\theta=\sqrt{x^2-1}$, read off the triangle: it is 1 at $x=\sqrt2$ and 2 at $x=\sqrt5$.`, eb: 'Limits as tan θ', side: [[r`x=\sqrt2\;\Rightarrow\;\tan\theta=1`, 'ca'], [r`x=\sqrt5\;\Rightarrow\;\tan\theta=2`, 'ca'], tri('III', r`\sqrt5`, '1', '2')] },
      { p: 2, say: r`An even power of secant: save $\sec^2\theta$ for $du$ with $u=\tan\theta$, and write the other $\sec^2\theta$ as $1+\tan^2\theta$.`, lines: [r`=3\int_{x=\sqrt2}^{x=\sqrt5}\big(1+\tan^2\theta\big)\,\sec^2\theta\,d\theta`], eb: 'Recipe: even secant', side: subRows(r`u=\tan\theta`, r`du=\sec^2\theta\,d\theta`) },
      { p: 2, say: r`Substitute $u=\tan\theta$, using the limits $u=1$ and $u=2$ we just found.`, lines: [r`=3\int_{1}^{2}\big(1+u^2\big)\,du`], eb: 'New limits', side: [[r`x=\sqrt2\;\Rightarrow\;u=1`, 'ca'], [r`x=\sqrt5\;\Rightarrow\;u=2`, 'ca']] },
      { p: 2, say: r`Power rule.`, lines: [r`=3\Big[u+\tfrac{u^3}{3}\Big]_1^{2}`] },
      { p: 3, say: r`Upper limit: $2+\tfrac83=\tfrac{14}{3}$. Lower limit: $1+\tfrac13=\tfrac43$.`, lines: [r`=3\Big[\Big(2+\tfrac83\Big)-\Big(1+\tfrac13\Big)\Big]`] },
      { p: 3, say: r`$\tfrac{14}3-\tfrac43=\tfrac{10}{3}$, and $3\cdot\tfrac{10}3=10$.`, lines: [{ t: r`=3\Big[\tfrac{14}{3}-\tfrac43\Big]=10`, box: true }], eb: 'Check: w = x² − 1', side: [[r`\tfrac32\int_1^4\Big(w^{1/2}+w^{-1/2}\Big)dw`, 'ct'], [r`=\tfrac32\cdot\tfrac{20}{3}=10\;\checkmark`, 'cr']], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`x=\sec\theta,\;dx=\sec\theta\tan\theta\,d\theta`, 'cx'], r`=3\int\sec^4\theta\,d\theta`], [[r`u=\tan\theta`, 'cx'], r`3\int_1^2(1+u^2)\,du`, r`3\Big[u+\tfrac{u^3}{3}\Big]_1^2`], [r`3\Big[\tfrac{14}{3}-\tfrac43\Big]`, '10']] }));
}

/* ===== 12 : type II hidden in (25x^2+1)^2 ===== */
{
  const f = x => 40 / (25 * x * x + 1) ** 2;
  examples.push(flowGen({ n: 12, label: 'Problem 12', type: 'Type II · 5x = tan θ', problem: r`\int_0^{1/5}\frac{40}{(25x^2+1)^2}\,dx`, phases: ['Substitute', 'Integrate', 'Evaluate'],
    fig: areaFig(f, 0, 0.2, { xr: [-0.03, 0.26], yr: [-5, 46], xt: [[0.2, '1/5']], yt: [10, 20, 30, 40],
      extra: P => P.text('ans', 0.1, 4, 'area = π + 2', 'cr', { size: 19, anchor: 'middle' }) }),
    track: [r`8\int_0^{\pi/4}\cos^2\theta\,d\theta`, r`4\Big[\theta+\tfrac12\sin2\theta\Big]_0^{\pi/4}`, r`\pi+2`],
    verify: [{ value: { f, a: 0, b: 0.2, val: PI + 2 } }],
    steps: [
      { p: 1, say: r`No radical this time, but $25x^2+1=(5x)^2+1$ has the form $u^2+a^2$ with $u=5x$ and $a=1$. That is the Type II pattern, so let $5x=\tan\theta$.`, eb: 'Type II pattern', side: [[r`(5x)^2+1`, 'cr'], [r`5x=\tan\theta`, 'cx']], fig: FIG },
      { p: 1, say: r`Solve for $x$ and differentiate: the $\tfrac15$ comes along.`, lines: [r`x=\tfrac15\tan\theta,\qquad dx=\tfrac15\sec^2\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=\tfrac15\tan\theta`, r`dx=\tfrac15\sec^2\theta\,d\theta`), fig: FIG },
      { p: 1, say: r`Simplify the denominator: $25x^2=\tan^2\theta$, so $25x^2+1=\sec^2\theta$ and its square is $\sec^4\theta$.`, lines: [r`(25x^2+1)^2=\big(\tan^2\theta+1\big)^2=\sec^4\theta`], eb: 'Pythagorean identity', side: [[r`\tan^2\theta+1=\sec^2\theta`, 'ct']] },
      { p: 1, say: r`Substitute.`, clear: true, lines: [r`=\int_{x=0}^{x=1/5}\frac{40}{\sec^4\theta}\cdot\tfrac15\sec^2\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=\tfrac15\tan\theta`, r`dx=\tfrac15\sec^2\theta\,d\theta`) },
      { p: 1, say: r`$40\cdot\tfrac15=8$, and $\tfrac{\sec^2\theta}{\sec^4\theta}=\tfrac1{\sec^2\theta}=\cos^2\theta$.`, rep: r`=8\int_{x=0}^{x=1/5}\cos^2\theta\,d\theta`, eb: 'Substitution', side: subRows(r`x=\tfrac15\tan\theta`, r`dx=\tfrac15\sec^2\theta\,d\theta`) },
      { p: 1, say: r`Limits: $\tan\theta=5x$. At $x=\tfrac15$ that is $\tan\theta=1$, so $\theta=\tfrac\pi4$. At $x=0$, $\theta=0$.`, rep: r`=8\int_{0}^{\pi/4}\cos^2\theta\,d\theta`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;\theta=0`, 'ca'], [r`x=\tfrac15\;\Rightarrow\;\theta=\tfrac\pi4`, 'ca'], tri('II', '1', '1', r`\sqrt2`)] },
      { p: 2, say: r`Even power of cosine: use the half-angle identity. $8\cdot\tfrac12=4$.`, lines: [r`=4\int_0^{\pi/4}\big(1+\cos2\theta\big)\,d\theta`], eb: 'Half-angle identity', side: [[r`\cos^2\theta=\tfrac{1+\cos2\theta}{2}`, 'ct']] },
      { p: 2, say: r`Integrate: $\int\cos2\theta\,d\theta=\tfrac12\sin2\theta$.`, lines: [r`=4\Big[\theta+\tfrac12\sin2\theta\Big]_0^{\pi/4}`], eb: 'Half-angle identity', side: [[r`\cos^2\theta=\tfrac{1+\cos2\theta}{2}`, 'ct']] },
      { p: 3, say: r`At $\theta=\tfrac\pi4$: $\sin\tfrac\pi2=1$. At $\theta=0$ everything is 0.`, lines: [r`=4\Big[\Big(\tfrac\pi4+\tfrac12\cdot1\Big)-0\Big]`] },
      { p: 3, say: r`Distribute the 4.`, lines: [{ t: r`=\pi+2`, box: true }], eb: 'Check', side: [[r`\pi+2\approx5.14`, 'cr'], [r`\text{average height}\approx\tfrac{5.14}{0.2}\approx26`, 'muted']], fig: [...FIG, 'ans'] }
    ],
    heli: [[[r`5x=\tan\theta,\;dx=\tfrac15\sec^2\theta\,d\theta`, 'cx'], r`=8\int_0^{\pi/4}\cos^2\theta\,d\theta`], [r`4\int_0^{\pi/4}(1+\cos2\theta)\,d\theta`, r`4\Big[\theta+\tfrac12\sin2\theta\Big]_0^{\pi/4}`], [r`4\Big(\tfrac\pi4+\tfrac12\Big)`, r`\pi+2`]] }));
}

}
