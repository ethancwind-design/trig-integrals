/* Quiz 4 practice · problems 13-15: Gini index, an area with ln, an area needing trig substitution */
{
  const PI = Math.PI, sq = Math.sqrt, E = Math.E;
  const AXC = ['axes', 'c0', 'c1'];
  const subRows = (x, dx) => [[x, 'cx'], [dx, 'cd']];

  /* ===== 13 : Gini index of the Lorenz curve f(x) = x e^(x-1) ===== */
  {
    const f = x => x * Math.exp(x - 1), val = 1 - 2 / E;
    examples.push(flowGen({ n: 13, label: 'Problem 13', type: 'Gini index · integration by parts', verb: 'Compute', problem: r`G=2\int_0^1\big(x-xe^{x-1}\big)\,dx`, phases: ['Set up', 'By parts', 'Evaluate'],
      fig: { xr: [-0.12, 1.25], yr: [-0.12, 1.2], xt: [[0.5, '½'], [1, '1']], yt: [[0.5, '½'], [1, '1']],
        curves: [{ f: x => x, dom: [0, 1], color: 'cd', text: 'y = x', at: [0.62, 0.62], dx: -52, dy: -10 }, { f, dom: [0, 1], color: 'cx', text: 'f(x)', at: [0.8, f(0.8)], dx: 10, dy: 26 }],
        area: { top: x => x, bot: f, range: [0, 1] },
        extra: P => P.text('ans', 0.72, 0.12, 'G = 1 − 2/e ≈ 0.264', 'cr', { size: 17, anchor: 'middle' }) },
      track: [r`G=2\Big[\int_0^1x\,dx-\int_0^1xe^{x-1}dx\Big]`, r`\int_0^1xe^{x-1}dx=\tfrac1e`, r`1-\tfrac2e`],
      verify: [{ value: { f: x => 2 * (x - f(x)), a: 0, b: 1, val } }, { value: { f, a: 0, b: 1, val: 1 / E } }, { anti: { F: x => x * Math.exp(x - 1) - Math.exp(x - 1), f, range: [0, 1] } }],
      steps: [
        { p: 1, say: r`The Lorenz curve $f(x)$ gives the share of income held by the poorest fraction $x$ of people. The line $y=x$ would be perfect equality. The Gini index measures how far the curve sags below that line.`, eb: 'Gini index', side: [[r`G=2\int_0^1\big(x-f(x)\big)\,dx`, 'ct']], fig: AXC },
        { p: 1, say: r`The shaded gap has height $x-f(x)$. The Gini index is twice its area. Here $f(x)=xe^{x-1}$, which starts at $(0,0)$ and ends at $(1,1)$ like every Lorenz curve.`, eb: 'Gini index', side: [[r`G=2\int_0^1\big(x-f(x)\big)\,dx`, 'ct'], [r`f(x)=xe^{x-1}`, 'cx']], fig: [...AXC, 'area'] },
        { p: 1, say: r`Split the integral into two pieces so each can be done separately.`, lines: [r`=2\Big[\int_0^1x\,dx-\int_0^1xe^{x-1}\,dx\Big]`], eb: 'Gini index', side: [[r`G=2\int_0^1\big(x-f(x)\big)\,dx`, 'ct'], [r`f(x)=xe^{x-1}`, 'cx']], fig: [...AXC, 'area'] },
        { p: 2, say: r`The first piece is the area of a triangle with legs 1 and 1: $\tfrac{x^2}{2}\big|_0^1=\tfrac12$.`, lines: [r`\int_0^1x\,dx=\Big[\tfrac{x^2}{2}\Big]_0^1=\tfrac12`] },
        { p: 2, say: r`The second piece is a product of $x$ and an exponential, so use integration by parts: $\int u\,dv=uv-\int v\,du$. Pick $u=x$, because differentiating it makes it simpler, and $dv=e^{x-1}dx$.`, eb: 'Integration by parts', side: [[r`u=x`, 'cx'], [r`dv=e^{x-1}\,dx`, 'cd'], [r`du=dx`, 'cx'], [r`v=e^{x-1}`, 'cd']] },
        { p: 2, say: r`Apply the formula: $uv=xe^{x-1}$, and $\int v\,du=\int e^{x-1}dx$.`, lines: [r`\int_0^1xe^{x-1}\,dx=\Big[xe^{x-1}\Big]_0^1-\int_0^1e^{x-1}\,dx`], eb: 'Integration by parts', side: [[r`u=x`, 'cx'], [r`dv=e^{x-1}\,dx`, 'cd'], [r`du=dx`, 'cx'], [r`v=e^{x-1}`, 'cd']] },
        { p: 2, say: r`Boundary term: $1\cdot e^{0}-0=1$. The remaining integral: $\int_0^1e^{x-1}dx=e^{0}-e^{-1}=1-\tfrac1e$.`, rep: r`\int_0^1xe^{x-1}\,dx=1-\Big(1-\tfrac1e\Big)=\tfrac1e`, eb: 'Evaluate the pieces', side: [[r`\big[xe^{x-1}\big]_0^1=1`, 'ct'], [r`\int_0^1e^{x-1}dx=1-\tfrac1e`, 'ct']] },
        { p: 3, say: r`Put both pieces back into the bracket.`, lines: [r`G=2\Big[\tfrac12-\tfrac1e\Big]`] },
        { p: 3, say: r`Distribute the 2. $G\approx1-0.736=0.264$: a mild inequality, which matches the curve hugging the line.`, lines: [{ t: r`G=1-\tfrac2e\approx0.264`, box: true }], eb: 'Check', side: [[r`\text{area under }f=\tfrac1e\approx0.368`, 'cx'], [r`G=1-2\cdot\tfrac1e`, 'cr'], [r`0<G<1\;\checkmark`, 'muted']], fig: [...AXC, 'area', 'ans'] }
      ],
      heli: [[[r`G=2\int_0^1\big(x-f(x)\big)dx`, 'ct'], r`=2\Big[\int_0^1x\,dx-\int_0^1xe^{x-1}dx\Big]`], [[r`u=x,\;dv=e^{x-1}dx`, 'cx'], r`\int_0^1xe^{x-1}dx=\Big[xe^{x-1}\Big]_0^1-\int_0^1e^{x-1}dx`, r`=\tfrac1e`], [r`G=2\Big[\tfrac12-\tfrac1e\Big]`, r`1-\tfrac2e`]] }));
  }

  /* ===== 14 : area between x^2 ln x and x^2 ===== */
  {
    const f = x => x * x * Math.log(x), g = x => x * x, val = Math.pow(E, 3) / 9;
    examples.push(flowGen({ n: 14, label: 'Problem 14', type: 'Area between curves · integration by parts', verb: 'Find', problem: r`f(x)=x^2\ln x,\;\;g(x)=x^2`, phases: ['(a) Intersections', '(b) Set up', '(c) Evaluate'],
      fig: { xr: [-0.3, 3.3], yr: [-1.8, 9], w: 640, h: 430, xt: [[1, '1'], [E, 'e'], [2, '2'], [3, '3']], yt: [2, 4, 6, 8],
        curves: [{ f: g, dom: [0, 3], color: 'cd', text: 'g = x²', at: [2.4, g(2.4)], dx: -78, dy: -4 }, { f, dom: [0.001, 3], color: 'cx', text: 'f = x² ln x', at: [2.5, f(2.5)], dx: 8, dy: 24, n: 400 }],
        area: { top: g, bot: f, range: [0.0001, E], color: 'cr' },
        points: [{ x: E, y: g(E), text: '(e, e²)', color: 'ca', dx: -86, dy: -8 }, { x: 0, y: 0, text: '(0, 0)', color: 'ca', dx: 10, dy: 22 }],
        extra: P => P.text('ans', 1.5, 7.2, 'area = e³/9', 'cr', { size: 19, anchor: 'middle' }) },
      track: [r`x=e`, r`A=\int_0^e\big(x^2-x^2\ln x\big)\,dx`, r`\tfrac{e^3}{9}`],
      verify: [{ value: { f: x => g(x) - (x < 1e-12 ? 0 : f(x)), a: 1e-9, b: E, val, n: 200000, tol: 1e-6 } }, { anti: { F: x => x ** 3 / 3 * Math.log(x) - x ** 3 / 9, f, range: [0.2, 2.7] } }, { num: { a: E * E * (Math.log(E) - 1), b: 0 } }],
      steps: [
        { p: 1, say: r`Part (a). Sketch both curves. $g(x)=x^2$ is a parabola. $f(x)=x^2\ln x$ is $x^2$ times $\ln x$: negative for $0<x<1$ (a small dip, since $\ln x<0$), zero at $x=1$, then it grows.`, figMain: true, eb: 'Curves', side: [[r`f(x)=x^2\ln x`, 'cx'], [r`g(x)=x^2`, 'cd']], fig: ['axes', 'c0', 'c1'] },
        { p: 1, say: r`Intersections: set $f(x)=g(x)$ and factor out $x^2$.`, eb: 'Intersections', side: [[r`x^2\ln x=x^2`, 'ink'], [r`x^2\big(\ln x-1\big)=0`, 'ink']], fig: ['axes', 'c0', 'c1'], figMain: true },
        { p: 1, say: r`$x^2=0$ gives $x=0$, but $\ln x$ is undefined there, so $0$ is only a limit ($x\to0^+$), as the problem allows. The other factor: $\ln x=1$, so $x=e$.`, eb: 'Intersections', side: [[r`x^2\big(\ln x-1\big)=0`, 'ink'], [r`x\to0^+`, 'ca'], [r`\ln x=1\;\Rightarrow\;x=e`, 'ca', true]], fig: ['axes', 'c0', 'c1', 'pt0', 'pt1'], figMain: true },
        { p: 1, say: r`The region between the curves runs from $x=0$ to $x=e$. Its corners are $(0,0)$ and $(e,e^2)$, since $g(e)=f(e)=e^2$.`, eb: 'Bounds of integration', side: [[r`0\;\le\;x\;\le\;e`, 'ca', true]], fig: ['axes', 'c0', 'c1', 'pt0', 'pt1', 'area'], figMain: true },
        { p: 2, say: r`Part (b). Which curve is on top? At $x=1$: $g(1)=1$ and $f(1)=0$. So $g$ is above $f$ on the whole interval ($\ln x<1$ for $x<e$). The area element is top minus bottom.`, top: r`A=\int_0^e\big(g-f\big)\,dx`, eb: 'Area element', side: [[r`x=1:\;g=1,\;f=0`, 'ct'], [r`\ln x<1\;\Rightarrow\;f<g`, 'ct']], fig: ['axes', 'c0', 'c1', 'pt1', 'area'] },
        { p: 2, say: r`Substitute the formulas. This is the integral the question asks for.`, top: r`A=\int_0^e\big(x^2-x^2\ln x\big)\,dx`, eb: 'Setup', side: [[r`A=\int_0^e\big(x^2-x^2\ln x\big)\,dx`, 'cr', true]], fig: ['axes', 'c0', 'c1', 'pt1', 'area'] },
        { p: 3, say: r`Part (c). Split it into two integrals.`, lines: [r`=\int_0^ex^2\,dx-\int_0^ex^2\ln x\,dx`] },
        { p: 3, say: r`The first is the power rule: $\tfrac{x^3}{3}$ from 0 to $e$.`, lines: [r`\int_0^ex^2\,dx=\Big[\tfrac{x^3}{3}\Big]_0^e=\tfrac{e^3}{3}`] },
        { p: 3, say: r`For the second, use integration by parts with $u=\ln x$ (it gets simpler when differentiated) and $dv=x^2dx$.`, eb: 'Integration by parts', side: [[r`u=\ln x`, 'cx'], [r`dv=x^2\,dx`, 'cd'], [r`du=\tfrac1x\,dx`, 'cx'], [r`v=\tfrac{x^3}{3}`, 'cd']] },
        { p: 3, say: r`$\int u\,dv=uv-\int v\,du$. The $\tfrac1x$ cancels one power of $x$ in $\tfrac{x^3}{3}$.`, lines: [r`\int x^2\ln x\,dx=\tfrac{x^3}{3}\ln x-\int\tfrac{x^2}{3}\,dx=\tfrac{x^3}{3}\ln x-\tfrac{x^3}{9}`], eb: 'Integration by parts', side: [[r`u=\ln x`, 'cx'], [r`dv=x^2\,dx`, 'cd'], [r`du=\tfrac1x\,dx`, 'cx'], [r`v=\tfrac{x^3}{3}`, 'cd']] },
        { p: 3, say: r`Evaluate from $0^+$ to $e$. At $e$: $\ln e=1$, so $\tfrac{e^3}{3}-\tfrac{e^3}{9}=\tfrac{2e^3}{9}$. At $0^+$ the term $x^3\ln x\to0$, because a power of $x$ beats $\ln x$.`, lines: [r`\int_0^ex^2\ln x\,dx=\Big[\tfrac{x^3}{3}\ln x-\tfrac{x^3}{9}\Big]_{0^+}^{e}=\tfrac{2e^3}{9}`], eb: 'The limit at 0', side: [[r`\lim_{x\to0^+}x^3\ln x=0`, 'ct'], [r`\ln e=1`, 'ct']] },
        { p: 3, say: r`Subtract: $\tfrac{e^3}{3}-\tfrac{2e^3}{9}=\tfrac{3e^3-2e^3}{9}=\tfrac{e^3}{9}$.`, lines: [{ t: r`A=\tfrac{e^3}{3}-\tfrac{2e^3}{9}=\tfrac{e^3}{9}\approx2.23`, box: true }], eb: 'Check', side: [[r`\tfrac{e^3}{9}\approx\tfrac{20.09}{9}=2.23`, 'cr']], fig: ['axes', 'c0', 'c1', 'pt1', 'area', 'ans'] }
      ],
      heli: [[[r`x^2\ln x=x^2\;\Rightarrow\;x=0^+,\;e`, 'ca'], r`A=\int_0^e\big(x^2-x^2\ln x\big)dx`], [[r`u=\ln x,\;dv=x^2dx`, 'cx'], r`\int x^2\ln x\,dx=\tfrac{x^3}{3}\ln x-\tfrac{x^3}{9}`], [r`\tfrac{e^3}{3}-\tfrac{2e^3}{9}`, r`\tfrac{e^3}{9}`]] }));
  }

  /* ===== 15 : area under sqrt(4+x^2), trig substitution + sec^3 ===== */
  {
    const f = x => sq(4 + x * x), val = 4 * sq(5) + 2 * Math.log(2 + sq(5));
    examples.push(flowGen({ n: 15, label: 'Problem 15', type: 'Area · Type II substitution and ∫sec³', verb: 'Find', problem: r`\text{Area under }y=\sqrt{4+x^2},\;0\le x\le4`, phases: ['Substitute', 'By parts', 'Evaluate'],
      fig: { xr: [-0.5, 4.8], yr: [-0.7, 5.6], xt: [1, 2, 3, 4], yt: [1, 2, 3, 4, 5],
        curves: [{ f, dom: [0, 4], color: 'cx', text: 'y = √(4 + x²)', at: [1.8, f(1.8)], dx: -150, dy: -14 }],
        area: { top: f, bot: () => 0, range: [0, 4] },
        points: [{ x: 0, y: 2, text: '(0, 2)', color: 'ca', dx: 10, dy: -10 }, { x: 4, y: f(4), text: '(4, 2√5)', color: 'ca', dx: -88, dy: -12 }],
        extra: P => P.text('ans', 2.0, 0.9, 'area ≈ 11.83', 'cr', { size: 19, anchor: 'middle' }) },
      track: [r`\int_{x=0}^{x=4}4\sec^3\theta\,d\theta`, r`2\Big[\sec\theta\tan\theta+\ln|\sec\theta+\tan\theta|\Big]`, r`4\sqrt5+2\ln(2+\sqrt5)`],
      verify: [{ value: { f, a: 0, b: 4, val, tol: 1e-7 } }, { anti: { F: x => 0.5 * (x * sq(4 + x * x) + 4 * Math.log(x + sq(4 + x * x))), f, range: [0.1, 3.9] } }, { anti: { F: t => 0.5 * (Math.tan(t) / Math.cos(t) + Math.log(1 / Math.cos(t) + Math.tan(t))), f: t => 1 / Math.pow(Math.cos(t), 3), range: [0.05, 1.3] } }],
      steps: [
        { p: 1, say: r`Sketch. The curve $y=\sqrt{4+x^2}$ starts at $(0,2)$ and rises to $(4,\sqrt{20})=(4,2\sqrt5)$. The region sits under it, above the $x$-axis, between $x=0$ and $x=4$.`, figMain: true, eb: 'Region', side: [[r`y=\sqrt{4+x^2}`, 'cx'], [r`x=0,\;x=4,\;y=0`, 'ca']], fig: ['axes', 'c0', 'pt0', 'pt1', 'area'] },
        { p: 1, say: r`The height at each $x$ is $y-0$, so the area is the integral of the curve. There is no easy antiderivative, so we need a trig substitution.`, top: r`A=\int_0^4\sqrt{4+x^2}\,dx`, eb: 'Area', side: [], fig: ['axes', 'c0', 'pt0', 'pt1', 'area'] },
        { p: 1, say: r`The radical has the form $\sqrt{x^2+a^2}$ with $a^2=4$, so $a=2$. Type II: $x=a\tan\theta=2\tan\theta$.`, eb: 'Type II radical', side: [[r`\sqrt{x^2+a^2}`, 'cr'], [r`a=2`, 'ca'], [r`x=2\tan\theta`, 'cx']] },
        { p: 1, say: r`Differentiate for $dx$. For the radical, $4+4\tan^2\theta=4\sec^2\theta$, so $\sqrt{4+x^2}=2\sec\theta$.`, lines: [r`dx=2\sec^2\theta\,d\theta,\qquad\sqrt{4+x^2}=2\sec\theta`], eb: 'Substitution', side: [...subRows(r`x=2\tan\theta`, r`dx=2\sec^2\theta\,d\theta`), [r`\tan^2\theta+1=\sec^2\theta`, 'ct']] },
        { p: 1, say: r`Substitute: $2\sec\theta\cdot2\sec^2\theta=4\sec^3\theta$.`, clear: true, lines: [r`=\int_{x=0}^{x=4}2\sec\theta\cdot2\sec^2\theta\,d\theta=\int_{x=0}^{x=4}4\sec^3\theta\,d\theta`], eb: 'Substitution', side: subRows(r`x=2\tan\theta`, r`dx=2\sec^2\theta\,d\theta`) },
        { p: 1, say: r`Limits: $\tan\theta=\tfrac x2$. At $x=4$ the legs are 4 and 2, the hypotenuse is $\sqrt{20}=2\sqrt5$. So $\tan\theta=2$ and $\sec\theta=\sqrt5$. The angle itself is not nice, but the antiderivative only needs $\sec\theta$ and $\tan\theta$. At $x=0$, $\theta=0$.`, eb: 'New limits', side: [[r`x=0\;\Rightarrow\;\theta=0`, 'ca'], [r`x=4\;\Rightarrow\;\tan\theta=2`, 'ca'], [r`\sec\theta=\sqrt5`, 'ca'], R('side', TRI('tri', triII('4', '2', r`2\sqrt5`, ALL)))] },
        { p: 2, say: r`$\int\sec^3\theta\,d\theta$ is the one trig integral that needs integration by parts. Choose $u=\sec\theta$ and $dv=\sec^2\theta\,d\theta$.`, clear: true, top: r`\int\sec^3\theta\,d\theta`, eb: 'Integration by parts', side: [[r`u=\sec\theta`, 'cx'], [r`dv=\sec^2\theta\,d\theta`, 'cd'], [r`du=\sec\theta\tan\theta\,d\theta`, 'cx'], [r`v=\tan\theta`, 'cd']] },
        { p: 2, say: r`Apply $uv-\int v\,du$.`, lines: [r`=\sec\theta\tan\theta-\int\sec\theta\tan^2\theta\,d\theta`], eb: 'Integration by parts', side: [[r`u=\sec\theta`, 'cx'], [r`dv=\sec^2\theta\,d\theta`, 'cd'], [r`du=\sec\theta\tan\theta\,d\theta`, 'cx'], [r`v=\tan\theta`, 'cd']] },
        { p: 2, say: r`Replace $\tan^2\theta=\sec^2\theta-1$. The original integral $\int\sec^3\theta$ shows up again on the right.`, lines: [r`=\sec\theta\tan\theta-\int\sec^3\theta\,d\theta+\int\sec\theta\,d\theta`], eb: 'Identity', side: [[r`\tan^2\theta=\sec^2\theta-1`, 'ct'], [r`\int\sec\theta\,d\theta`, 'ct'], [r`=\ln|\sec\theta+\tan\theta|`, 'ct']] },
        { p: 2, say: r`Call the unknown $I=\int\sec^3\theta\,d\theta$. Then $I=\sec\theta\tan\theta-I+\ln|\sec\theta+\tan\theta|$. Add $I$ to both sides and divide by 2.`, lines: [r`2I=\sec\theta\tan\theta+\ln|\sec\theta+\tan\theta|`], eb: 'Solve for the integral', side: [[r`I=\int\sec^3\theta\,d\theta`, 'cx']] },
        { p: 2, say: r`This is a formula worth memorising for the test.`, lines: [{ t: r`\int\sec^3\theta\,d\theta=\tfrac12\Big[\sec\theta\tan\theta+\ln|\sec\theta+\tan\theta|\Big]`, box: true }], eb: 'Solve for the integral', side: [[r`I=\int\sec^3\theta\,d\theta`, 'cx']] },
        { p: 3, say: r`Back to the area: multiply by the 4 that was in front.`, clear: true, top: r`A=\int_{x=0}^{x=4}4\sec^3\theta\,d\theta`, lines: [r`=4\cdot\tfrac12\Big[\sec\theta\tan\theta+\ln|\sec\theta+\tan\theta|\Big]_{x=0}^{x=4}`], eb: 'Values at the limits', side: [[r`x=4:\;\sec\theta=\sqrt5`, 'ca'], [r`\;\;\;\;\;\;\tan\theta=2`, 'ca'], [r`x=0:\;\sec\theta=1`, 'ca'], [r`\;\;\;\;\;\;\tan\theta=0`, 'ca']] },
        { p: 3, say: r`Upper limit: $\sqrt5\cdot2+\ln(\sqrt5+2)$. Lower limit: $1\cdot0+\ln(1+0)=0$.`, lines: [r`=2\Big[\big(2\sqrt5+\ln(\sqrt5+2)\big)-\big(0+\ln1\big)\Big]`], eb: 'Values at the limits', side: [[r`x=4:\;\sec\theta=\sqrt5`, 'ca'], [r`\;\;\;\;\;\;\tan\theta=2`, 'ca'], [r`x=0:\;\sec\theta=1`, 'ca'], [r`\;\;\;\;\;\;\tan\theta=0`, 'ca']] },
        { p: 3, say: r`$\ln1=0$, so distribute the 2: $4\sqrt5+2\ln(2+\sqrt5)\approx8.94+2.89=11.83$.`, lines: [{ t: r`A=4\sqrt5+2\ln\big(2+\sqrt5\big)\approx11.83`, box: true }], eb: 'Check', side: [[r`8<A<17.9\;\checkmark`, 'muted']], fig: ['axes', 'c0', 'area', 'ans'] }
      ],
      heli: [[[r`x=2\tan\theta,\;dx=2\sec^2\theta\,d\theta`, 'cx'], r`A=\int_{x=0}^{x=4}4\sec^3\theta\,d\theta`], [[r`u=\sec\theta,\;dv=\sec^2\theta\,d\theta`, 'cx'], r`I=\int\sec^3\theta\,d\theta`, r`2I=\sec\theta\tan\theta+\ln|\sec\theta+\tan\theta|`], [r`2\Big[\big(2\sqrt5+\ln(2+\sqrt5)\big)-0\Big]`, r`4\sqrt5+2\ln(2+\sqrt5)`]] }));
  }
}
