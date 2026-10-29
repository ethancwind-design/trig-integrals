/* Problem Set: Area Between Curves · intro slides and the LESSON() call (always the last deck loaded) */
const introABC = [
  { id: 'title', label: 'Title', head: { eb: 'MATH 1400 · Problem Set: Area Between Curves', prob: null }, layout: 'full', tag: '',
    say: r`Fourteen problems on areas between curves, the Gini index and polar areas, each as its own lesson. Every step is animated and every answer is checked by computer. Press → or click to begin.`,
    main: [R('eyebrow', H('t1', 'Problem set')), R('display', H('t2', 'Area Between Curves', 'ink')),
      R('lead', H('t3', 'Sketch the region, find the intersections, set up the integral, evaluate it exactly.')),
      R('chips', H('c1', '<b>1–2</b>warm-up', 'ink', { cls: 'chip' }), H('c2', '<b>3–7</b>areas', 'ink', { cls: 'chip' }), H('c3', '<b>8–9</b>Gini index', 'ink', { cls: 'chip' }), H('c4', '<b>10–14</b>polar areas', 'ink', { cls: 'chip' })),
      R('sample', T('s1', r`A=\int_a^b\big(y_{\text{top}}-y_{\text{bottom}}\big)\,dx`, 'ct'), T('s2', r`\;\xrightarrow{\;\text{polar}\;}\;`, 'cx'), T('s3', r`A=\tfrac12\int_\alpha^\beta r^2\,d\theta`, 'ct'))], side: [] },
  { id: 'tool1', label: 'Toolbox: areas and the Gini index', head: { eb: 'Toolbox · problems 1–9', prob: null }, layout: 'full', tag: '',
    say: r`Sketch, find where the curves cross, then take top minus bottom (or right minus left when you integrate in $y$). If top and bottom swap, split the integral or use symmetry. The Gini index is twice the gap under the line of equality.`,
    main: [R('cols',
      ST([H('b1h', 'Between curves · 1–7', 'muted', { cls: 'eyebrow' })], [T('b1a', r`A=\int_a^b\big(y_{\text{top}}-y_{\text{bottom}}\big)\,dx`, 'cd')], [T('b1b', r`A=\int_c^d\big(x_{\text{right}}-x_{\text{left}}\big)\,dy`, 'cd')], [T('b1c', r`\text{crossings}\;\Rightarrow\;\text{limits}`, 'cx')], [H('b1d', 'If top and bottom swap: split the integral, or use symmetry.', 'ink', { cls: 'mini' })]),
      ST([H('b2h', 'Gini index · 8–9', 'muted', { cls: 'eyebrow' })], [T('b2a', r`G=2\int_0^1\big(x-L(x)\big)\,dx`, 'ct')], [T('b2b', r`G=0\;\Rightarrow\;\text{perfect equality}`, 'cr')], [T('b2c', r`G\to1\;\Rightarrow\;\text{great inequality}`, 'cr')], [H('b2d', 'Bigger G means a more unequal country.', 'ink', { cls: 'mini' })]))], side: [] },
  { id: 'tool2', label: 'Toolbox: polar areas', head: { eb: 'Toolbox · problems 10–14', prob: null }, layout: 'full', tag: '',
    say: r`In polar coordinates the area element is a thin wedge from the pole: $\tfrac12r^2\,d\theta$. Find the angles where $r=0$ for a petal or loop, and where the radii are equal for a crossing.`,
    main: [R('cols',
      ST([H('b3h', 'Area formulas', 'muted', { cls: 'eyebrow' })], [T('b3a', r`A=\tfrac12\int_\alpha^\beta r^2\,d\theta`, 'cp')], [T('b3b', r`A=\tfrac12\int_\alpha^\beta\big(r_{\text{out}}^2-r_{\text{in}}^2\big)\,d\theta`, 'cp')], [H('b3c', 'A negative r plots on the opposite side of the pole; r² is still positive.', 'ink', { cls: 'mini' })]),
      ST([H('b4h', 'Finding the angles', 'muted', { cls: 'eyebrow' })], [T('b4a', r`r=0\;\Rightarrow\;\text{edges of a petal or loop}`, 'cx')], [T('b4b', r`r_1=r_2\;\Rightarrow\;\text{where two curves cross}`, 'cx')], [T('b4c', r`\text{symmetry}\;\Rightarrow\;\text{double a half}`, 'cx')]))], side: [] },
  { id: 'map', label: 'The 14 problems', head: { eb: 'Overview', prob: null }, layout: 'full', tag: '',
    say: r`Problems 1 and 2 are the warm-up: one integrates in $x$, the other in $y$. Problems 3 to 7 add trig powers, partial fractions and logs. Problems 8 and 9 are Gini indices. Problems 10 to 14 are polar areas.`,
    main: [R('cols',
      ST([H('m1h', 'Warm-up and areas · 1–7', 'muted', { cls: 'eyebrow' })], [RICH('m1a', r`1 · $x^2$ and $2x+3$, in $x$`, { cls: 'mini' })], [RICH('m1b', r`2 · $x=y^2$ and $y=x-2$, in $y$`, { cls: 'mini' })], [RICH('m1c', r`3 · $\tfrac{x}{x^2+1}$ and $\tfrac x2$, two pieces`, { cls: 'mini' })], [RICH('m1d', r`4 · $\cos x$ and $\cos^3x$`, { cls: 'mini' })], [RICH('m1e', r`5 · $\sin^2x$ and $\sin^4x$`, { cls: 'mini' })], [RICH('m1f', r`6 · $\tfrac1{x+1}$, $\tfrac1{x(x+1)}$, $x=3$`, { cls: 'mini' })], [RICH('m1g', r`7 · $x$ and $x\ln x$`, { cls: 'mini' })]),
      ST([H('m2h', 'Gini index · 8–9', 'muted', { cls: 'eyebrow' })], [RICH('m2a', r`8 · $L(x)=xe^{x-1}$`, { cls: 'mini' })], [RICH('m2b', r`9 · $L(x)=1-\sqrt{1-x^2}$`, { cls: 'mini' })],
        [H('m3h', 'Polar areas · 10–14', 'muted', { cls: 'eyebrow' })], [RICH('m3a', r`10 · petal of $r=2\cos3\theta$`, { cls: 'mini' })], [RICH('m3b', r`11 · inside $3\sin\theta$, outside $1+\sin\theta$`, { cls: 'mini' })], [RICH('m3c', r`12 · inner loop of $1+2\cos\theta$`, { cls: 'mini' })], [RICH('m3d', r`13 · inside both $2\cos\theta$ and $2\sin\theta$`, { cls: 'mini' })], [RICH('m3e', r`14 · lemniscate $r^2=4\cos2\theta$`, { cls: 'mini' })]))], side: [] }
];

LESSON({ key: 'abc', title: 'Area Between Curves Problem Set · in Motion', intro: introABC, examples });
