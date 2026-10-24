from common import *

L23 = 'Lecture 23'
rw = G('Lecture 23 · Substitute, integrate, come back to $x$', [
    I(r'\sqrt{4-x^2}', r'2\arcsin\tfrac x2+\dfrac x2\sqrt{4-x^2}', 'sqrt(4-x**2)', '2*asin(x/2)+x*sqrt(4-x**2)/2', d=(0.2, 1.8), m=['trigsub'], src=L23 + ' · #1', t='$x=2\\sin\\theta$',
      note=r'Heads-up: the PDF states the $\theta$-antiderivative as $2\theta+\sin\theta\cos\theta$, but $4\cos^2\theta\,d\theta$ integrates to $2\theta+2\sin\theta\cos\theta$. That is where the $\tfrac x2$ comes from.'),
    I(r'\dfrac{x^2}{\sqrt{9-x^2}}', r'\dfrac92\arcsin\tfrac x3-\dfrac x2\sqrt{9-x^2}', 'x**2/sqrt(9-x**2)', '9*asin(x/3)/2-x*sqrt(9-x**2)/2', d=(0.2, 2.7), m=['trigsub'], src=L23 + ' · #2', t='$x=3\\sin\\theta$'),
    I(r'\dfrac{x^2}{(4-x^2)^{3/2}}', r'\dfrac{x}{\sqrt{4-x^2}}-\arcsin\tfrac x2', 'x**2/(4-x**2)**1.5', 'x/sqrt(4-x**2)-asin(x/2)', d=(0.2, 1.8), m=['trigsub'], src=L23 + ' · #3', t='$x=2\\sin\\theta$'),
    I(r'\dfrac{\sqrt{x^2-4}}{x}', r'\sqrt{x^2-4}-2\operatorname{arcsec}\tfrac x2', 'sqrt(x**2-4)/x', 'sqrt(x**2-4)-2*asec(x/2)', d=(2.3, 4.5), m=['trigsub'], src=L23 + ' · #4', t='$x=2\\sec\\theta$'),
    I(r'2x^2\sqrt{1-x^2}', r'\dfrac{x(2x^2-1)\sqrt{1-x^2}}{4}+\dfrac{\arcsin x}{4}', '2*x**2*sqrt(1-x**2)', 'x*(2*x**2-1)*sqrt(1-x**2)/4+asin(x)/4', d=(0.1, 0.9), m=['trigsub'], src=L23 + ' · #5', t='$x=\\sin\\theta$',
      note=r'Heads-up: the PDF’s $\theta$-form ($\sin^3\theta\cos\theta-\sin\theta\cos\theta+\tfrac\theta2$) does not differentiate back to $2x^2\sqrt{1-x^2}$. Correct: $2\sin^2\theta\cos^2\theta=\tfrac12\sin^22\theta$, giving $\tfrac\theta4-\tfrac{\sin4\theta}{16}$.'),
    I(r'\sec^4(5\theta)', r'\dfrac{\tan5\theta}{5}+\dfrac{\tan^35\theta}{15}', 'sec(5*x)**4', 'tan(5*x)/5+tan(5*x)**3/15', var=r'\theta', d=(0.05, 0.25), m=['usub', 'identity'], src=L23 + ' · #6(a)', t='save $\\sec^2$, $u=\\tan5\\theta$'),
    Q(r'\text{(b) with }x=2\sec5\theta:\ \ \dfrac{\tan5\theta}{5}+\dfrac{\tan^35\theta}{15}=\ ?', r'\dfrac{\sqrt{x^2-4}}{10}+\dfrac{(x^2-4)^{3/2}}{120}', 'tan(5*(asec(x/2)/5))/5+tan(5*(asec(x/2)/5))**3/15', 'sqrt(x**2-4)/10+(x**2-4)**1.5/120', d=(2.5, 4), m=['trigsub'], src=L23 + ' · #6(b)'),
    I(r'\cos^3(2\theta)\sin^2(2\theta)', r'\dfrac{\sin^32\theta}{6}-\dfrac{\sin^52\theta}{10}', 'cos(2*x)**3*sin(2*x)**2', 'sin(2*x)**3/6-sin(2*x)**5/10', var=r'\theta', m=['usub'], src=L23 + ' · #7(a)', t='save $\\cos2\\theta$, $u=\\sin2\\theta$'),
    Q(r'\text{(b) with }x=5\cos2\theta:\ \ \dfrac{\sin^32\theta}{6}-\dfrac{\sin^52\theta}{10}=\ ?', r'\dfrac{(25-x^2)^{3/2}}{750}-\dfrac{(25-x^2)^{5/2}}{31250}', 'sin(2*(acos(x/5)/2))**3/6-sin(2*(acos(x/5)/2))**5/10', '(25-x**2)**1.5/750-(25-x**2)**2.5/31250', d=(0.5, 4), m=['trigsub'], src=L23 + ' · #7(b)'),
], quiz=True)
cp = G('Lecture 23 · Compute', [
    I(r'\dfrac{5}{(5-x^2)^{3/2}}', r'\dfrac{x}{\sqrt{5-x^2}}', '5/(5-x**2)**1.5', 'x/sqrt(5-x**2)', d=(0.2, 2.0), m=['trigsub'], src=L23 + ' · #8', t='$x=\\sqrt5\\sin\\theta$'),
    I(r'\dfrac{3}{(3+x^2)^{3/2}}', r'\dfrac{x}{\sqrt{3+x^2}}', '3/(3+x**2)**1.5', 'x/sqrt(3+x**2)', d=(0.2, 3.0), m=['trigsub'], src=L23 + ' · #9', t='$x=\\sqrt3\\tan\\theta$'),
    I(r'\dfrac{24}{x^2\sqrt{x^2-48}}', r'\dfrac{\sqrt{x^2-48}}{2x}', '24/(x**2*sqrt(x**2-48))', 'sqrt(x**2-48)/(2*x)', d=(7.2, 10), m=['trigsub'], src=L23 + ' · #10', t='$x=\\sqrt{48}\\sec\\theta$'),
    I(r'\dfrac{15x^4}{(3+x^2)^{7/2}}', r'\dfrac{x^5}{(3+x^2)^{5/2}}', '15*x**4/(3+x**2)**3.5', 'x**5/(3+x**2)**2.5', d=(0.2, 3.0), m=['trigsub'], src=L23 + ' · #11', t='$x=\\sqrt3\\tan\\theta$'),
    I(r'\dfrac{27\sqrt{x^2-9}}{x^4}', r'\dfrac{(x^2-9)^{3/2}}{x^3}', '27*sqrt(x**2-9)/x**4', '(x**2-9)**1.5/x**3', d=(3.2, 6), m=['trigsub'], src=L23 + ' · #12', t='$x=3\\sec\\theta$'),
    I(r'\dfrac{9}{(9-x^2)^{3/2}}', r'\dfrac{x}{\sqrt{9-x^2}}', '9/(9-x**2)**1.5', 'x/sqrt(9-x**2)', d=(0.2, 2.7), m=['trigsub'], src=L23 + ' · #13', t='$x=3\\sin\\theta$'),
    I(r'\dfrac{25}{(x^2-25)^{3/2}}', r'-\dfrac{x}{\sqrt{x^2-25}}', '25/(x**2-25)**1.5', '-x/sqrt(x**2-25)', d=(5.3, 8), m=['trigsub'], src=L23 + ' · #14', t='$x=5\\sec\\theta$',
      note=r'Heads-up: the PDF’s solution ends with $+\csc\theta$, but $\int u^{-2}du=-\tfrac1u$, so the sign is negative: $-\csc\theta=-\tfrac{x}{\sqrt{x^2-25}}$. Differentiate to check.'),
    I(r'\dfrac{3x^3}{\sqrt{x^2-1}}', r'(x^2-1)^{3/2}+3(x^2-1)^{1/2}', '3*x**3/sqrt(x**2-1)', '(x**2-1)**1.5+3*sqrt(x**2-1)', d=(1.2, 3), m=['trigsub'], src=L23 + ' · #15', t='$x=\\sec\\theta$'),
    I(r'\dfrac{72}{(x^2+36)^{3/2}}', r'\dfrac{2x}{\sqrt{x^2+36}}', '72/(x**2+36)**1.5', '2*x/sqrt(x**2+36)', d=(0.3, 9), m=['trigsub'], src=L23 + ' · #16', t='$x=6\\tan\\theta$',
      note=r'The PDF prints the denominator as $\sqrt{x^2+6}$ at the end, a typo for $\sqrt{x^2+36}$.'),
], quiz=True)
qa = G('Week 8 · Prep Quiz A', [
    QT(r'\sin2\theta=\ ?', r'2\sin\theta\cos\theta', src='Quiz A · Q1', m=['identity']),
    I(r'5\tan^5x\sec^3x', r'\dfrac57\sec^7x-2\sec^5x+\dfrac53\sec^3x', '5*tan(x)**5*sec(x)**3', '5*sec(x)**7/7-2*sec(x)**5+5*sec(x)**3/3', m=['usub'], src='Quiz A · Q2'),
    I(r'7\tan^4x\sec^4x', r'\tan^7x+\dfrac75\tan^5x', '7*tan(x)**4*sec(x)**4', 'tan(x)**7+7*tan(x)**5/5', m=['usub'], src='Quiz A · Q3'),
    I(r'\dfrac{2x+3}{6x^2+5x+1}', r'\dfrac73\ln|3x+1|-2\ln|2x+1|', '(2*x+3)/(6*x**2+5*x+1)', '7*log(abs(3*x+1))/3-2*log(abs(2*x+1))', d=(0.3, 2), m=['partial'], src='Quiz A · Q4'),
    I(r'\dfrac{x^2-3}{x^2-4}', r'x+\dfrac14\ln\left|\dfrac{x-2}{x+2}\right|', '(x**2-3)/(x**2-4)', 'x+log(abs((x-2)/(x+2)))/4', d=(2.3, 5), m=['partial'], src='Quiz A · Q5'),
], quiz=True)
qb = G('Week 8 · Prep Quiz B', [
    QT(r'\text{Select every correct identity: }\ \tan^2+\sec^2=1,\ \sec^2-\tan^2=1,\ \sin^2+\cos^2=1,\ \csc^2-\cot^2=1,\ \cot^2+\csc^2=1\ \ldots', r'\sec^2\theta-\tan^2\theta=1,\ \ \sin^2\theta+\cos^2\theta=1,\ \ \csc^2\theta-\cot^2\theta=1', src='Quiz B · Q1', m=['identity', 'trigsub']),
    I(r'\dfrac{x^4}{\sqrt{x^2-4}}', r'\dfrac{x^3\sqrt{x^2-4}}{4}+\dfrac{3x\sqrt{x^2-4}}{2}+6\ln\left|\dfrac{x+\sqrt{x^2-4}}{2}\right|', 'x**4/sqrt(x**2-4)', 'x**3*sqrt(x**2-4)/4+3*x*sqrt(x**2-4)/2+6*log(abs((x+sqrt(x**2-4))/2))', d=(2.3, 4.5), m=['trigsub'], src='Quiz B · Q2', t='$x=2\\sec\\theta\\Rightarrow16\\int\\sec^5\\theta\\,d\\theta$'),
    I(r'\dfrac{x}{\sqrt{1+x^2}}', r'\sqrt{1+x^2}', 'x/sqrt(1+x**2)', 'sqrt(1+x**2)', m=['usub'], src='Quiz B · Q3', t='no trig sub needed'),
    I(r'\dfrac{x^3}{\sqrt{9-x^2}}', r'-\left(6+\dfrac{x^2}{3}\right)\sqrt{9-x^2}', 'x**3/sqrt(9-x**2)', '-(6+x**2/3)*sqrt(9-x**2)', d=(0.2, 2.7), m=['trigsub'], src='Quiz B · Q4', t='$x=3\\sin\\theta$'),
], quiz=True)
qc = G('Week 9 · Prep Quiz (the trig-flavored ones)', [
    DI(r'\int_0^{\pi}e^x\left(\sec^2x-\tan^2x\right)dx', r'e^{\pi}-1', 'exp(x)', '0', 'pi', 'exp(pi)-1', m=['definite', 'identity'], src='Week 9 · area between $e^x\\sec^2x$ and $e^x\\tan^2x$', t='$\\sec^2-\\tan^2=1$ removes the singularities'),
    DI(r'\int_{-\pi/4}^{\pi/4}\left(\cos^2x-\dfrac{8x^2}{\pi^2}\right)dx', r'\dfrac12+\dfrac\pi6', 'cos(x)**2-8*x**2/pi**2', '-pi/4', 'pi/4', '0.5+pi/6', m=['definite', 'identity'], src='Week 9 · area between $\\cos^2x$ and $8x^2/\\pi^2$'),
], quiz=True)
SECTIONS = [S('pdf', 'From your PDF', 'The trig-flavored problems from MATH 1400 Prep Quizzes & Practice Problems (v2). Answers are hidden: click a problem to reveal it. Every answer was re-derived and checked numerically, and the four spots where the PDF’s printed solution has a typo are flagged.', [rw, cp, qa, qb, qc])]
