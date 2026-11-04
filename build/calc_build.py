"""Calc path problem bank -> calcdata.js (window.CALC), same shape as data.js sections.

    python3 -m venv .venv && .venv/bin/pip install sympy mpmath "antlr4-python3-runtime==4.11.1"
    .venv/bin/python build/calc_build.py

Every answer is typed by hand as LaTeX (`r`), parsed back with sympy, and compared to an independent 30-digit
numeric evaluation of the defining integral(s) (`num`). Nothing is written unless every problem agrees.
Problems tagged "Quiz 5 Practice #n" are the 25 questions in Quiz 5 Practice Problems (Fall 26, weeks 10-11);
the rest are extra practice of the same kind.
"""
import json, os, re, sys
from mpmath import mp, mpf, quad, sqrt, sin, cos, exp, log, pi, cosh, diff, inf, findroot, asinh
import sympy as sp
from sympy.parsing.latex import parse_latex

mp.dps = 30
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'calcdata.js')
Q5 = 'MATH 1400 · Quiz 5 Practice #'


def tex_value(s):
    """LaTeX answer -> sympy number (e is Euler's number)."""
    s = re.sub(r'\\(left|right|,|;|!)|\\ ', '', s).replace('\\dfrac', '\\frac').replace('\\tfrac', '\\frac')
    s = re.sub(r'(\\pi|\})\s*\(', r'\1\\cdot(', s)   # \pi(…) and {…}(…) are products, not function calls
    e = parse_latex(s).subs({sp.Symbol('e'): sp.E, sp.Symbol('pi'): sp.pi})
    return mpf(str(sp.N(e, 30)))


PROBLEMS = []   # (section, group, item)
FAILS = []


def P(sec, grp, tex, r, num, note='', t='', src='', kind='d', chk=None, setup=None, truth=None):
    """kind 'd': the answer is shown as "= r"; kind 'q': r is shown as written. chk = list of LaTeX strings when r has several parts."""
    chk = [r] if chk is None else chk
    want = num() if callable(num) else num
    if setup:   # (integrand, a, b, factor): the integral typed in `r`, evaluated numerically, must equal the independent value
        f, a, b, k = setup
        got = k * quad(f, a if isinstance(a, list) else [a, b]); ok_s = abs(got - mpf(want[0] if isinstance(want, (list, tuple)) else want)) < mpf('1e-13') * (1 + abs(got))
        if not ok_s: FAILS.append(tex); print('  setup mismatch:', tex[:60], got, want)
        note = (note + ' ' if note else '') + r'The value is $\approx %s$.' % mp.nstr(got, 8)
        want, chk = [], []
    if truth is not None and not truth():
        FAILS.append(tex); print('  fact is false:', tex[:60])
    want = want if isinstance(want, (list, tuple)) else [want]
    ok = len(want) == len(chk)
    if ok:
        for c, w in zip(chk, want):
            got = tex_value(c)
            if abs(got - mpf(w)) > mpf('1e-13') * (1 + abs(got)):   # a few integrands blow up (in the derivative) at an endpoint, which costs quad a few digits
                ok = False; print('  mismatch:', c, got, w)
    if not ok:
        FAILS.append(tex)
    item = {'k': kind, 'tex': tex, 'm': [], 'r': r, 'fn': []}
    if t: item['t'] = t
    if note: item['note'] = note
    if src: item['src'] = src
    PROBLEMS.append((sec, grp, item))


def fp(f):
    return lambda x: diff(f, x)

# ---------------------------------------------------------------- arc length and surface area
ARC = 'c_arc'
G1, G2, G3, G4 = 'Arc length · y = f(x)', 'Arc length · parametric and x = g(y)', 'Surface area · about the x-axis', 'Surface area · about the y-axis'


def arc_x(f, a, b):
    g = fp(f); return quad(lambda x: sqrt(1 + g(x) ** 2), [a, b])


def arc_par(x, y, a, b):
    gx, gy = fp(x), fp(y); return quad(lambda t: sqrt(gx(t) ** 2 + gy(t) ** 2), [a, b])


def surf_x(f, a, b):   # about the x-axis, y = f(x)
    g = fp(f); return 2 * pi * quad(lambda x: f(x) * sqrt(1 + g(x) ** 2), [a, b])


def surf_y(f, a, b):   # about the y-axis, y = f(x), 0 <= a < b
    g = fp(f); return 2 * pi * quad(lambda x: x * sqrt(1 + g(x) ** 2), [a, b])


L_ARC = r'$L=\int_a^b\sqrt{1+\big(f^{\prime}(x)\big)^2}\,dx$'
P(ARC, G1, r'\text{Arc length of }y=\tfrac23x^{3/2}-\tfrac12x^{1/2},\ \tfrac14\le x\le4', r'6',
  lambda: arc_x(lambda x: mpf(2) / 3 * x ** 1.5 - x ** .5 / 2, mpf(1) / 4, 4),
  note=r'$1+(f^{\prime})^2=\big(x^{1/2}+\tfrac14x^{-1/2}\big)^2$, so $L=\int_{1/4}^{4}\big(x^{1/2}+\tfrac14x^{-1/2}\big)dx$', t='$L=\\int\\sqrt{1+(y^{\\prime})^2}\\,dx$ · the radical is a perfect square', src=Q5 + '1')
P(ARC, G1, r'\text{Exact arc length of }y=\dfrac{x^4}{16}+\dfrac{1}{2x^2},\ 1\le x\le2', r'\dfrac{21}{16}',
  lambda: arc_x(lambda x: x ** 4 / 16 + 1 / (2 * x ** 2), 1, 2),
  note=r'$1+(y^{\prime})^2=\big(\tfrac{x^3}{4}+x^{-3}\big)^2$, so $L=\int_1^2\big(\tfrac{x^3}{4}+x^{-3}\big)dx$', t='$1+(y^{\\prime})^2$ is a perfect square', src=Q5 + '5')
P(ARC, G1, r'\text{Arc length of }y=\tfrac23\left(4x^2+\tfrac12\right)^{3/2},\ 0\le x\le3', r'147',
  lambda: arc_x(lambda x: mpf(2) / 3 * (4 * x ** 2 + mpf(1) / 2) ** 1.5, 0, 3),
  note=r'$y^{\prime}=8x\sqrt{4x^2+\tfrac12}$, $1+(y^{\prime})^2=(16x^2+1)^2$, so $L=\int_0^3(16x^2+1)\,dx$', t='$1+(y^{\\prime})^2=(16x^2+1)^2$', src=Q5 + '6')
P(ARC, G1, r'\text{Arc length of }y=\tfrac23x^{3/2},\ 0\le x\le3', r'\dfrac{14}{3}',
  lambda: arc_x(lambda x: mpf(2) / 3 * x ** 1.5, 0, 3),
  note=r'$y^{\prime}=x^{1/2}$, so $L=\int_0^3\sqrt{1+x}\,dx$', t='$y^{\\prime}=\\sqrt x$')
P(ARC, G1, r'\text{Arc length of }y=\dfrac{x^3}{3}+\dfrac{1}{4x},\ 1\le x\le2', r'\dfrac{59}{24}',
  lambda: arc_x(lambda x: x ** 3 / 3 + 1 / (4 * x), 1, 2),
  note=r'$1+(y^{\prime})^2=\big(x^2+\tfrac{1}{4x^2}\big)^2$, so $L=\int_1^2\big(x^2+\tfrac{1}{4x^2}\big)dx$', t='perfect square again')
P(ARC, G1, r'\text{Arc length of }y=\ln(\cos x),\ 0\le x\le\tfrac\pi4', r'\ln\left(1+\sqrt{2}\right)',
  lambda: arc_x(lambda x: log(cos(x)), 0, pi / 4),
  note=r'$y^{\prime}=-\tan x$, $\sqrt{1+\tan^2x}=\sec x$, so $L=\int_0^{\pi/4}\sec x\,dx$', t='$1+\\tan^2x=\\sec^2x$')
P(ARC, G1, r'\text{Arc length of }y=\cosh x,\ 0\le x\le1', r'\dfrac{e-e^{-1}}{2}',
  lambda: arc_x(cosh, 0, 1),
  note=r'$1+\sinh^2x=\cosh^2x$, so $L=\int_0^1\cosh x\,dx=\sinh1$', t='$1+\\sinh^2x=\\cosh^2x$')
P(ARC, G1, r'\text{Arc length of }y=\tfrac{x^2}{2},\ 0\le x\le1', r'\dfrac{\sqrt{2}+\ln\left(1+\sqrt{2}\right)}{2}',
  lambda: arc_x(lambda x: x ** 2 / 2, 0, 1),
  note=r'$L=\int_0^1\sqrt{1+x^2}\,dx$, then $x=\tan\theta$', t='trig substitution $x=\\tan\\theta$')

P(ARC, G2, r'\text{Arc length of }x=\tfrac13(2t-1)^{3/2},\ y=\tfrac12(t-1)^2,\ 1\le t\le3', r'4',
  lambda: arc_par(lambda t: (2 * t - 1) ** 1.5 / 3, lambda t: (t - 1) ** 2 / 2, 1, 3),
  note=r'$(x^{\prime})^2+(y^{\prime})^2=(2t-1)+(t-1)^2=t^2$, so $L=\int_1^3t\,dt$', t='$L=\\int\\sqrt{(x^{\\prime})^2+(y^{\\prime})^2}\\,dt$', src=Q5 + '7')
P(ARC, G2, r'\text{Arc length of }x=\tfrac13(y^2+2)^{3/2},\ 1\le y\le2', r'\dfrac{10}{3}',
  lambda: arc_x(lambda y: (y ** 2 + 2) ** 1.5 / 3, 1, 2),
  note=r'$x^{\prime}=y\sqrt{y^2+2}$, $1+(x^{\prime})^2=(y^2+1)^2$, so $L=\int_1^2(y^2+1)\,dy$', t='swap the roles: $L=\\int\\sqrt{1+(dx/dy)^2}\\,dy$')
P(ARC, G2, r'\text{Length of }x=3\cos t,\ y=3\sin t,\ 0\le t\le\pi', r'3\pi',
  lambda: arc_par(lambda t: 3 * cos(t), lambda t: 3 * sin(t), 0, pi),
  note=r'speed $=\sqrt{9\sin^2t+9\cos^2t}=3$, so $L=\int_0^{\pi}3\,dt$', t='half of a circle of radius 3')
P(ARC, G2, r'\text{Length of }x=t^2,\ y=t^3,\ 0\le t\le1', r'\dfrac{13\sqrt{13}-8}{27}',
  lambda: arc_par(lambda t: t ** 2, lambda t: t ** 3, 0, 1),
  note=r'speed $=t\sqrt{4+9t^2}$; $u=4+9t^2$', t='speed $=t\\sqrt{4+9t^2}$')
P(ARC, G2, r'\text{Length of one arch: }x=t-\sin t,\ y=1-\cos t,\ 0\le t\le2\pi', r'8',
  lambda: arc_par(lambda t: t - sin(t), lambda t: 1 - cos(t), 0, 2 * pi),
  note=r'speed $=\sqrt{2-2\cos t}=2\sin\tfrac t2$, so $L=\int_0^{2\pi}2\sin\tfrac t2\,dt$', t='cycloid · $1-\\cos t=2\\sin^2\\tfrac t2$')
P(ARC, G2, r'\text{Length of }x=e^t\cos t,\ y=e^t\sin t,\ 0\le t\le\pi', r'\sqrt{2}\left(e^{\pi}-1\right)',
  lambda: arc_par(lambda t: exp(t) * cos(t), lambda t: exp(t) * sin(t), 0, pi),
  note=r'speed $=\sqrt2\,e^t$, so $L=\sqrt2\int_0^{\pi}e^t\,dt$', t='a logarithmic spiral')

SX = r'$S=2\pi\int y\,ds$'
P(ARC, G3, r'\text{Area of the surface from revolving }x=\tfrac13(y^2+2)^{3/2},\ 1\le y\le2,\ \text{about the }x\text{-axis}', r'\dfrac{21\pi}{2}',
  lambda: 2 * pi * quad(lambda y: y * sqrt(1 + diff(lambda s: (s ** 2 + 2) ** 1.5 / 3, y) ** 2), [1, 2]),
  note=r'$ds=\sqrt{1+(x^{\prime})^2}\,dy=(y^2+1)\,dy$, so $S=2\pi\int_1^2y(y^2+1)\,dy$', t='$S=2\\pi\\int y\\,ds$ with $ds=\\sqrt{1+(dx/dy)^2}\\,dy$', src=Q5 + '3')
P(ARC, G3, r'\text{Surface area from revolving }y=\sqrt{25-x^2},\ 3\le x\le4,\ \text{about the }x\text{-axis}', r'10\pi',
  lambda: surf_x(lambda x: sqrt(25 - x ** 2), 3, 4),
  note=r'$y\,ds=y\sqrt{1+\tfrac{x^2}{y^2}}\,dx=5\,dx$, so $S=2\pi\int_3^45\,dx$', t='$y\\,ds=5\\,dx$ · a zone of a sphere', src=Q5 + '4')
P(ARC, G3, r'\text{Surface area from revolving }y=\sqrt{x},\ 0\le x\le2,\ \text{about the }x\text{-axis}', r'\dfrac{13\pi}{3}',
  lambda: surf_x(lambda x: sqrt(x), 0, 2),
  note=r'$y\,ds=\sqrt{x+\tfrac14}\,dx$, so $S=2\pi\int_0^2\sqrt{x+\tfrac14}\,dx$', t='$\\sqrt x\\sqrt{1+\\tfrac1{4x}}=\\sqrt{x+\\tfrac14}$', src=Q5 + '9')
P(ARC, G3, r'\text{Surface area from revolving }y=x,\ 0\le x\le1,\ \text{about the }x\text{-axis}', r'\pi\sqrt{2}',
  lambda: surf_x(lambda x: x, 0, 1),
  note=r'$S=2\pi\int_0^1x\sqrt2\,dx$ · a cone', t='a cone: check with $\\pi r\\ell$')
P(ARC, G3, r'\text{Surface area from revolving }y=x^3,\ 0\le x\le1,\ \text{about the }x\text{-axis}', r'\dfrac{\pi\left(10\sqrt{10}-1\right)}{27}',
  lambda: surf_x(lambda x: x ** 3, 0, 1),
  note=r'$S=2\pi\int_0^1x^3\sqrt{1+9x^4}\,dx$, $u=1+9x^4$', t='$u=1+9x^4$')
P(ARC, G3, r'\text{Surface area of a sphere of radius }2:\ y=\sqrt{4-x^2},\ -2\le x\le2', r'16\pi',
  lambda: surf_x(lambda x: sqrt(4 - x ** 2), -2, 2),
  note=r'$y\,ds=2\,dx$, so $S=2\pi\int_{-2}^22\,dx$', t='$y\\,ds=r\\,dx$')
P(ARC, G3, r'\text{Surface area from revolving }y=\sqrt{4x+1},\ 0\le x\le1,\ \text{about the }x\text{-axis}', r'\dfrac{\pi\left(27-5\sqrt{5}\right)}{3}',
  lambda: surf_x(lambda x: sqrt(4 * x + 1), 0, 1),
  note=r'$y\,ds=\sqrt{4x+5}\,dx$, so $S=2\pi\int_0^1\sqrt{4x+5}\,dx$', t='$y\\sqrt{1+(y^{\\prime})^2}=\\sqrt{4x+5}$')

P(ARC, G4, r'\text{Surface area from revolving }y=1-x^2,\ 0\le x\le\tfrac{\sqrt3}{2},\ \text{about the }y\text{-axis}', r'\dfrac{7\pi}{6}',
  lambda: surf_y(lambda x: 1 - x ** 2, 0, sqrt(3) / 2),
  note=r'$S=2\pi\int_0^{\sqrt3/2}x\sqrt{1+4x^2}\,dx$, $u=1+4x^2$', t='$S=2\\pi\\int x\\,ds$ (radius is $x$)', src=Q5 + '2')
P(ARC, G4, r'\text{Surface area from revolving }x=y^3,\ 0\le y\le\left(\tfrac13\right)^{1/4},\ \text{about the }y\text{-axis}', r'\dfrac{7\pi}{27}',
  lambda: 2 * pi * quad(lambda y: y ** 3 * sqrt(1 + (3 * y ** 2) ** 2), [0, (mpf(1) / 3) ** 0.25]),
  note=r'$S=2\pi\int x\,ds=2\pi\int_0^{(1/3)^{1/4}}y^3\sqrt{1+9y^4}\,dy$, $u=1+9y^4$', t='$x=y^3$ and $ds=\\sqrt{1+9y^4}\\,dy$', src=Q5 + '8')
P(ARC, G4, r'\text{Surface area from revolving }y=x^2,\ 0\le x\le1,\ \text{about the }y\text{-axis}', r'\dfrac{\pi\left(5\sqrt{5}-1\right)}{6}',
  lambda: surf_y(lambda x: x ** 2, 0, 1),
  note=r'$S=2\pi\int_0^1x\sqrt{1+4x^2}\,dx$, $u=1+4x^2$', t='$u=1+4x^2$')
P(ARC, G4, r'\text{Surface area from revolving }y=2x,\ 0\le x\le1,\ \text{about the }y\text{-axis}', r'\pi\sqrt{5}',
  lambda: surf_y(lambda x: 2 * x, 0, 1),
  note=r'$S=2\pi\int_0^1x\sqrt5\,dx$ · a cone', t='a cone: $\\pi r\\ell$')
P(ARC, G4, r'\text{Surface area from revolving }y=\sqrt{9-x^2},\ 0\le x\le3,\ \text{about the }y\text{-axis}', r'18\pi',
  lambda: surf_y(lambda x: sqrt(9 - x ** 2), 0, 3),
  note=r'$x\,ds=\dfrac{3x}{\sqrt{9-x^2}}\,dx$, $u=9-x^2$ · a hemisphere', t='half of a sphere: $2\\pi r^2$')

# ---------------------------------------------------------------- averages and centroids
AVG = 'c_avg'
H1, H2, H3 = 'Average value', 'Centroid of a region', 'Center of mass with density'


def avg(f, a, b):
    return quad(f, [a, b]) / (b - a)


def region(top, bot, a, b, rho=lambda x: 1, split=()):
    """Mass, x-bar, y-bar of the lamina between y = bot and y = top (density rho(x))."""
    pts = [a, *split, b]
    M = quad(lambda x: rho(x) * (top(x) - bot(x)), pts)
    My = quad(lambda x: x * rho(x) * (top(x) - bot(x)), pts)
    Mx = quad(lambda x: rho(x) * (top(x) ** 2 - bot(x) ** 2) / 2, pts)
    return M, My / M, Mx / M


P(AVG, H1, r'\text{Average value of }f(x)=\dfrac{16}{(x^2+4)^{3/2}}\text{ on }[0,2\sqrt3]', r'1',
  lambda: avg(lambda x: 16 / (x ** 2 + 4) ** 1.5, 0, 2 * sqrt(3)),
  note=r'$f_{\text{avg}}=\dfrac{1}{2\sqrt3}\int_0^{2\sqrt3}\dfrac{16}{(x^2+4)^{3/2}}dx$, with $x=2\tan\theta$', t='$f_{\\text{avg}}=\\dfrac1{b-a}\\int_a^bf$ · trig substitution', src=Q5 + '10')
P(AVG, H1, r'\text{Average value of }f(x)=\dfrac{6}{x^2-1}\text{ on }[2,5]', r'\ln2',
  lambda: avg(lambda x: 6 / (x ** 2 - 1), 2, 5),
  note=r'$\dfrac{6}{x^2-1}=\dfrac{3}{x-1}-\dfrac{3}{x+1}$, so $f_{\text{avg}}=\dfrac13\int_2^5\left(\dfrac{3}{x-1}-\dfrac{3}{x+1}\right)dx$', t='partial fractions', src=Q5 + '11')
P(AVG, H1, r'\text{Average value of }\sin x\text{ on }[0,\pi]', r'\dfrac{2}{\pi}', lambda: avg(sin, 0, pi),
  note=r'$\dfrac1\pi\int_0^{\pi}\sin x\,dx$', t='$\\int_0^\\pi\\sin x\\,dx=2$')
P(AVG, H1, r'\text{Average value of }x^2\text{ on }[0,3]', r'3', lambda: avg(lambda x: x ** 2, 0, 3),
  note=r'$\dfrac13\int_0^3x^2\,dx$', t='divide by the length of the interval')
P(AVG, H1, r'\text{Average value of }e^x\text{ on }[0,\ln2]', r'\dfrac{1}{\ln2}', lambda: avg(exp, 0, log(2)),
  note=r'$\dfrac{1}{\ln2}\int_0^{\ln2}e^x\,dx=\dfrac{2-1}{\ln2}$', t='the interval has length $\\ln2$')
P(AVG, H1, r'\text{Average value of }\dfrac{1}{1+x^2}\text{ on }[0,1]', r'\dfrac{\pi}{4}', lambda: avg(lambda x: 1 / (1 + x ** 2), 0, 1),
  note=r'$\int_0^1\dfrac{dx}{1+x^2}=\arctan1$', t='an arctangent')
P(AVG, H1, r'\text{Average value of }\sqrt{x}\text{ on }[0,4]', r'\dfrac{4}{3}', lambda: avg(sqrt, 0, 4),
  note=r'$\dfrac14\int_0^4x^{1/2}\,dx=\dfrac14\cdot\dfrac{16}{3}$', t='$\\int_0^4\\sqrt x\\,dx=\\tfrac{16}{3}$')

CEN = r'$\bar x=\dfrac1A\int x\,(\text{top}-\text{bottom})\,dx,\ \ \bar y=\dfrac1A\int\tfrac12(\text{top}^2-\text{bottom}^2)\,dx$'
P(AVG, H2, r'\text{Find }\bar y\text{ for the region between }y=\cos x\text{ and }y=\sin x,\ \tfrac\pi4\le x\le\tfrac{3\pi}4', r'\dfrac{\sqrt{2}}{4}',
  lambda: region(sin, cos, pi / 4, 3 * pi / 4)[2],
  note=r'$A=\int(\sin x-\cos x)\,dx=\sqrt2$; $\bar y=\dfrac{1}{2A}\int(\sin^2x-\cos^2x)\,dx=\dfrac{1}{2A}\int-\cos2x\,dx$', t='$\\sin x$ is on top here · $\\sin^2-\\cos^2=-\\cos2x$', src=Q5 + '12')
P(AVG, H2, r'\text{Find }\bar x\text{ for the triangle with vertices }(0,0),\ (0,4),\ (6,0)', r'2',
  lambda: region(lambda x: 4 - mpf(2) * x / 3, lambda x: 0, 0, 6)[1],
  note=r'top is $y=4-\tfrac23x$; or average the vertex $x$-coordinates: $\tfrac{0+0+6}{3}$', t='a triangle: the centroid is the average of the vertices', src=Q5 + '13')
P(AVG, H2, r'\text{Centroid of the region between }y=2x^2\text{ and }y=3-x^2', r'(\bar x,\bar y)=\left(0,\ \dfrac{8}{5}\right)',
  lambda: [region(lambda x: 3 - x ** 2, lambda x: 2 * x ** 2, -1, 1)[1], region(lambda x: 3 - x ** 2, lambda x: 2 * x ** 2, -1, 1)[2]],
  chk=['0', r'\frac{8}{5}'], kind='q',
  note=r'they meet at $x=\pm1$; $A=\int_{-1}^1(3-3x^2)\,dx=4$; $\bar x=0$ by symmetry; $\bar y=\dfrac{1}{2A}\int_{-1}^1\big((3-x^2)^2-(2x^2)^2\big)dx$', t='find where the curves meet first · symmetry gives $\\bar x$', src=Q5 + '15')
Qc = lambda x: sqrt(4 - x ** 2) if x >= 0 else x + 2
P(AVG, H2, r'\text{Centroid of the region under the line }y=x+2\ (-2\le x\le0)\text{ and the quarter circle of radius 2 }(0\le x\le2)', r'(\bar x,\bar y)=\left(\dfrac{4}{3(\pi+2)},\ \dfrac{4}{\pi+2}\right)',
  lambda: [region(Qc, lambda x: 0, -2, 2, split=[0])[1], region(Qc, lambda x: 0, -2, 2, split=[0])[2]],
  chk=[r'\frac{4}{3(\pi+2)}', r'\frac{4}{\pi+2}'], kind='q',
  note=r'split into a triangle ($A=2$, centroid $(-\tfrac23,\tfrac23)$) and a quarter disk ($A=\pi$, centroid $(\tfrac{8}{3\pi},\tfrac{8}{3\pi})$); weight by area', t='two pieces: weight each centroid by its area', src=Q5 + '16')
P(AVG, H2, r'\text{Centroid of the region under }y=x^2,\ 0\le x\le1', r'(\bar x,\bar y)=\left(\dfrac34,\ \dfrac{3}{10}\right)',
  lambda: [region(lambda x: x ** 2, lambda x: 0, 0, 1)[1], region(lambda x: x ** 2, lambda x: 0, 0, 1)[2]],
  chk=[r'\frac34', r'\frac{3}{10}'], kind='q',
  note=r'$A=\tfrac13$; $\bar x=3\int_0^1x^3\,dx$; $\bar y=\dfrac{3}{2}\int_0^1x^4\,dx$', t='$A=\\tfrac13$')
P(AVG, H2, r'\text{Centroid of the region between }y=x\text{ and }y=x^2', r'(\bar x,\bar y)=\left(\dfrac12,\ \dfrac25\right)',
  lambda: [region(lambda x: x, lambda x: x ** 2, 0, 1)[1], region(lambda x: x, lambda x: x ** 2, 0, 1)[2]],
  chk=[r'\frac12', r'\frac25'], kind='q',
  note=r'$A=\tfrac16$; $\bar x=6\int_0^1x(x-x^2)\,dx$; $\bar y=3\int_0^1(x^2-x^4)\,dx$', t='$A=\\tfrac16$')
P(AVG, H2, r'\text{Centroid of the region under }y=\sin x,\ 0\le x\le\pi', r'(\bar x,\bar y)=\left(\dfrac{\pi}{2},\ \dfrac{\pi}{8}\right)',
  lambda: [region(sin, lambda x: 0, 0, pi)[1], region(sin, lambda x: 0, 0, pi)[2]],
  chk=[r'\frac{\pi}{2}', r'\frac{\pi}{8}'], kind='q',
  note=r'$A=2$; $\bar x=\tfrac\pi2$ by symmetry; $\bar y=\dfrac14\int_0^{\pi}\sin^2x\,dx$', t='symmetry, then power reduction')
P(AVG, H2, r'\text{Find }\bar y\text{ for the upper half of a disk of radius 3}', r'\dfrac{4}{\pi}',
  lambda: region(lambda x: sqrt(9 - x ** 2), lambda x: 0, -3, 3)[2],
  note=r'$A=\tfrac{9\pi}{2}$; $\bar y=\dfrac{1}{2A}\int_{-3}^3(9-x^2)\,dx$; in general $\dfrac{4r}{3\pi}$', t='in general $\\bar y=\\dfrac{4r}{3\\pi}$')

P(AVG, H3, r'\text{Region between }y=\sqrt{x}\text{ and }y=x^2,\ \text{density }\rho(x)=35x.\ \text{Find }\bar x', r'\dfrac{4}{7}',
  lambda: region(sqrt, lambda x: x ** 2, 0, 1, rho=lambda x: 35 * x)[1],
  note=r'$m=\int_0^1 35x(\sqrt x-x^2)\,dx=\tfrac{21}{4}$; $M_y=\int_0^1 35x^2(\sqrt x-x^2)\,dx=3$; $\bar x=M_y/m$', t='$\\bar x=\\dfrac{\\int x\\rho\\,dA}{\\int\\rho\\,dA}$', src=Q5 + '14')
P(AVG, H3, r'\text{First-quadrant region under }y=\sqrt{4-x^2},\ \text{density }\rho(x)=x.\ \text{Find }\bar y', r'\dfrac{3}{4}',
  lambda: region(lambda x: sqrt(4 - x ** 2), lambda x: 0, 0, 2, rho=lambda x: x)[2],
  note=r'$m=\int_0^2x\sqrt{4-x^2}\,dx=\tfrac83$; $M_x=\int_0^2x\cdot\tfrac12(4-x^2)\,dx=2$; $\bar y=M_x/m$', t='$\\bar y=\\dfrac{\\int\\tfrac12 y^2\\rho\\,dx}{\\int y\\rho\\,dx}$', src=Q5 + '17')
P(AVG, H3, r'\text{Center of mass of a rod on }[0,2]\text{ with density }\rho(x)=x', r'\dfrac{4}{3}',
  lambda: quad(lambda x: x * x, [0, 2]) / quad(lambda x: x, [0, 2]),
  note=r'$\bar x=\dfrac{\int_0^2x\cdot x\,dx}{\int_0^2x\,dx}=\dfrac{8/3}{2}$', t='$\\bar x=\\dfrac{\\int x\\rho\\,dx}{\\int\\rho\\,dx}$')
P(AVG, H3, r'\text{Center of mass of a rod on }[0,3]\text{ with density }\rho(x)=1+x', r'\dfrac{9}{5}',
  lambda: quad(lambda x: x * (1 + x), [0, 3]) / quad(lambda x: 1 + x, [0, 3]),
  note=r'$m=\int_0^3(1+x)\,dx=\tfrac{15}{2}$, $\int_0^3x(1+x)\,dx=\tfrac{27}{2}$', t='mass first, then the moment')
P(AVG, H3, r'\text{Region under }y=x^2,\ 0\le x\le1,\ \text{density }\rho(x)=x.\ \text{Find }\bar x', r'\dfrac{4}{5}',
  lambda: region(lambda x: x ** 2, lambda x: 0, 0, 1, rho=lambda x: x)[1],
  note=r'$m=\int_0^1x\cdot x^2\,dx=\tfrac14$; $M_y=\int_0^1x^2\cdot x^2\,dx=\tfrac15$', t='$\\rho(x)$ multiplies the height')

# ---------------------------------------------------------------- probability densities
PDF = 'c_pdf'
D1, D2 = 'Find the constant', 'Probabilities from a density'


def prob(f, a, b):
    return quad(f, [a, b])


P(PDF, D1, r'f(x)=Cxe^{-x/2}\ (x\ge0),\ \ 0\text{ otherwise.\ Find }C\text{ so that }f\text{ is a density}', r'\dfrac{1}{4}',
  lambda: 1 / quad(lambda x: x * exp(-x / 2), [0, inf]),
  note=r'$\int_0^\infty xe^{-x/2}\,dx=4$ (by parts), so $4C=1$', t='total probability is 1: $\\int f=1$', src=Q5 + '19')
P(PDF, D1, r'f(x)=Cx(1-x)\ (0\le x\le1),\ \ 0\text{ otherwise.\ Find }C', r'6',
  lambda: 1 / quad(lambda x: x * (1 - x), [0, 1]),
  note=r'$\int_0^1x(1-x)\,dx=\tfrac16$', t='$\\int f=1$')
P(PDF, D1, r'f(x)=\dfrac{C}{x^2}\ (x\ge1),\ \ 0\text{ otherwise.\ Find }C', r'1',
  lambda: 1 / quad(lambda x: 1 / x ** 2, [1, inf]),
  note=r'$\int_1^\infty x^{-2}\,dx=1$', t='an improper integral')
P(PDF, D1, r'f(x)=C\sin x\ (0\le x\le\pi),\ \ 0\text{ otherwise.\ Find }C', r'\dfrac{1}{2}',
  lambda: 1 / quad(sin, [0, pi]),
  note=r'$\int_0^\pi\sin x\,dx=2$', t='$\\int_0^\\pi\\sin x\\,dx=2$')
P(PDF, D1, r'f(x)=Ce^{-3x}\ (x\ge0),\ \ 0\text{ otherwise.\ Find }C', r'3',
  lambda: 1 / quad(lambda x: exp(-3 * x), [0, inf]),
  note=r'$\int_0^\infty e^{-3x}\,dx=\tfrac13$', t='an exponential density')

PF = lambda x: mpf(75) / 4 / (25 - x ** 2) ** 1.5
P(PDF, D2, r'f(x)=\dfrac{75/4}{(25-x^2)^{3/2}}\ (0\le x\le4).\ \text{Find }P\!\left(X\le\tfrac52\right)=\dfrac{\sqrt a}{b}', r'\dfrac{\sqrt{3}}{4}\quad(a=3,\ b=4)',
  lambda: prob(PF, 0, mpf(5) / 2), chk=[r'\frac{\sqrt{3}}{4}'],
  note=r'$x=5\sin\theta$: $\int\dfrac{dx}{(25-x^2)^{3/2}}=\dfrac{x}{25\sqrt{25-x^2}}$, so $P=\dfrac{75}{4}\cdot\dfrac{5/2}{25\sqrt{75/4}}$', t='$P(X\\le c)=\\int_0^cf$ · trig substitution', src=Q5 + '18')
P(PDF, D2, r'f(x)=\dfrac{75/4}{(25-x^2)^{3/2}}\ (0\le x\le4).\ \text{Find }P\!\left(X<\tfrac52\right)', r'\dfrac{\sqrt{3}}{4}',
  lambda: prob(PF, 0, mpf(5) / 2),
  note=r'same antiderivative: $\dfrac{x}{25\sqrt{25-x^2}}$ from $0$ to $\tfrac52$', t='for a density, $P(X\\lt c)=P(X\\le c)$', src=Q5 + '20')
P(PDF, D2, r'f(x)=2x\ (0\le x\le1).\ \text{Find }P\!\left(\tfrac14\le X\le\tfrac12\right)', r'\dfrac{3}{16}',
  lambda: prob(lambda x: 2 * x, mpf(1) / 4, mpf(1) / 2),
  note=r'$\left[x^2\right]_{1/4}^{1/2}=\tfrac14-\tfrac1{16}$', t='integrate between the two values')
P(PDF, D2, r'f(x)=e^{-x}\ (x\ge0).\ \text{Find }P(1\le X\le2)', r'e^{-1}-e^{-2}',
  lambda: prob(lambda x: exp(-x), 1, 2),
  note=r'$\left[-e^{-x}\right]_1^2$', t='an exponential density')
P(PDF, D2, r'f(x)=\dfrac{3}{x^4}\ (x\ge1).\ \text{Find }P(X>2)', r'\dfrac{1}{8}',
  lambda: prob(lambda x: 3 / x ** 4, 2, inf),
  note=r'$\int_2^\infty3x^{-4}\,dx=\left[-x^{-3}\right]_2^\infty$', t='an improper integral')
P(PDF, D2, r'f(x)=\tfrac38x^2\ (0\le x\le2).\ \text{Find }P(X\le1)', r'\dfrac{1}{8}',
  lambda: prob(lambda x: mpf(3) / 8 * x ** 2, 0, 1),
  note=r'$\int_0^1\tfrac38x^2\,dx$', t='check first that $\\int_0^2f=1$')

# ---------------------------------------------------------------- expectation and variance
EV = 'c_ev'
V1, V2, V3 = 'Mean (expected value)', 'Median', 'Variance and standard deviation'


def mean(f, a, b):
    return quad(lambda x: x * f(x), [a, b])


def var(f, a, b):
    m = mean(f, a, b); return quad(lambda x: x * x * f(x), [a, b]) - m * m


def median(f, a, b):
    hi = b if b != inf else a + 60   # the CDF is already within 1e-6 of 1 by then for every density here
    return findroot(lambda m: quad(f, [a, m]) - mpf(1) / 2, (a, hi), solver='illinois', tol=1e-25, maxsteps=200)


G_ = lambda x: 3 * sin(3 * x)
P(EV, V1, r'g(x)=3\sin3x\ \left(0\le x\le\tfrac\pi6\right).\ \text{Find the mean}', r'\dfrac{1}{3}',
  lambda: mean(G_, 0, pi / 6),
  note=r'$\mu=\int_0^{\pi/6}3x\sin3x\,dx$, by parts: $\big[-x\cos3x+\tfrac13\sin3x\big]_0^{\pi/6}$', t='$\\mu=\\int xf(x)\\,dx$ · by parts', src=Q5 + '22')
P(EV, V1, r'f(x)=\dfrac{2\ln x}{x}\ (1\le x\le e).\ \text{Find the mean}', r'2',
  lambda: mean(lambda x: 2 * log(x) / x, 1, exp(1)),
  note=r'$\mu=\int_1^e2\ln x\,dx=2\big[x\ln x-x\big]_1^e$', t='$x\\cdot\\dfrac{2\\ln x}{x}=2\\ln x$', src=Q5 + '25')
P(EV, V1, r'f(x)=2x\ (0\le x\le1).\ \text{Find the mean}', r'\dfrac{2}{3}', lambda: mean(lambda x: 2 * x, 0, 1),
  note=r'$\int_0^12x^2\,dx$', t='$\\mu=\\int xf(x)\\,dx$')
P(EV, V1, r'f(x)=\tfrac13e^{-x/3}\ (x\ge0).\ \text{Find the mean}', r'3', lambda: mean(lambda x: exp(-x / 3) / 3, 0, inf),
  note=r'$\int_0^\infty\tfrac13xe^{-x/3}\,dx$, by parts', t='an exponential density')
P(EV, V1, r'f(x)=\tfrac38x^2\ (0\le x\le2).\ \text{Find the mean}', r'\dfrac{3}{2}', lambda: mean(lambda x: mpf(3) / 8 * x ** 2, 0, 2),
  note=r'$\int_0^2\tfrac38x^3\,dx$', t='$\\mu=\\int xf(x)\\,dx$')

P(EV, V2, r'g(x)=3\sin3x\ \left(0\le x\le\tfrac\pi6\right).\ \text{Find the median}', r'\dfrac{\pi}{9}',
  lambda: median(G_, 0, pi / 6),
  note=r'$\int_0^m3\sin3x\,dx=1-\cos3m=\tfrac12$, so $\cos3m=\tfrac12$', t='solve $\\int_a^mf=\\tfrac12$', src=Q5 + '21')
P(EV, V2, r'f(x)=\tfrac13e^{-x/3}\ (x\ge0).\ \text{Find the median}', r'3\ln2',
  lambda: median(lambda x: exp(-x / 3) / 3, 0, inf),
  note=r'$\int_0^m\tfrac13e^{-x/3}\,dx=1-e^{-m/3}=\tfrac12$', t='solve $\\int_0^mf=\\tfrac12$', src=Q5 + '24')
P(EV, V2, r'f(x)=2x\ (0\le x\le1).\ \text{Find the median}', r'\dfrac{\sqrt{2}}{2}',
  lambda: median(lambda x: 2 * x, 0, 1),
  note=r'$\int_0^m2x\,dx=m^2=\tfrac12$', t='$m^2=\\tfrac12$')
P(EV, V2, r'f(x)=\dfrac{3}{x^4}\ (x\ge1).\ \text{Find the median}', r'\sqrt[3]{2}',
  lambda: median(lambda x: 3 / x ** 4, 1, inf),
  note=r'$\int_1^m3x^{-4}\,dx=1-m^{-3}=\tfrac12$', t='$1-m^{-3}=\\tfrac12$')

P(EV, V3, r'g(x)=\dfrac{3}{x^4}\ (x\ge1).\ \text{Find the standard deviation}', r'\dfrac{\sqrt{3}}{2}',
  lambda: sqrt(var(lambda x: 3 / x ** 4, 1, inf)),
  note=r'$E[X]=\tfrac32$, $E[X^2]=\int_1^\infty3x^{-2}\,dx=3$, so $\sigma^2=3-\tfrac94=\tfrac34$', t='$\\sigma^2=E[X^2]-\\mu^2$', src=Q5 + '23')
P(EV, V3, r'f(x)=2x\ (0\le x\le1).\ \text{Find the variance}', r'\dfrac{1}{18}',
  lambda: var(lambda x: 2 * x, 0, 1),
  note=r'$E[X]=\tfrac23$, $E[X^2]=\int_0^12x^3\,dx=\tfrac12$, so $\sigma^2=\tfrac12-\tfrac49$', t='$\\sigma^2=E[X^2]-\\mu^2$')
P(EV, V3, r'f(x)=\tfrac13e^{-x/3}\ (x\ge0).\ \text{Find the variance}', r'9',
  lambda: var(lambda x: exp(-x / 3) / 3, 0, inf),
  note=r'$E[X]=3$, $E[X^2]=18$ (by parts twice), so $\sigma^2=18-9$', t='$\\sigma^2=E[X^2]-\\mu^2$')
P(EV, V3, r'f(x)=\tfrac38x^2\ (0\le x\le2).\ \text{Find the variance}', r'\dfrac{3}{20}',
  lambda: var(lambda x: mpf(3) / 8 * x ** 2, 0, 2),
  note=r'$E[X]=\tfrac32$, $E[X^2]=\int_0^2\tfrac38x^4\,dx=\tfrac{12}{5}$, so $\sigma^2=\tfrac{12}5-\tfrac94$', t='$\\sigma^2=E[X^2]-\\mu^2$')
P(EV, V3, r'f(x)=\tfrac13e^{-x/3}\ (x\ge0).\ \text{Find the standard deviation}', r'3',
  lambda: sqrt(var(lambda x: exp(-x / 3) / 3, 0, inf)),
  note=r'$\sigma=\sqrt{9}$ (the variance of this density is 9)', t='square root of the variance')

# ================================================================ more problems: lectures 35-36, worksheet, week 10 practice, lectures 39-40, 42-44
WS = 'Worksheet: Arc Length and Surface Area #'
L35 = 'MATH 1400 · Lectures 35–36 #'
L39 = 'MATH 1400 · Lecture 39 #'
L40 = 'MATH 1400 · Lecture 40 #'
L42 = 'MATH 1400 · Lectures 42–43 #'
L44 = 'MATH 1400 · Lecture 44 #'
W10 = 'Week 10 In-Class Practice #'
SETUP = 'Set up the integral'


def arc_fp(fprime, a, b):
    return quad(lambda x: sqrt(1 + fprime(x) ** 2), [a, b])


def surf_par_x(x, y, a, b):   # parametric curve about the x-axis: 2 pi int y ds
    gx, gy = fp(x), fp(y); return 2 * pi * quad(lambda t: y(t) * sqrt(gx(t) ** 2 + gy(t) ** 2), [a, b])


def surf_par_y(x, y, a, b):   # parametric curve about the y-axis: 2 pi int x ds
    gx, gy = fp(x), fp(y); return 2 * pi * quad(lambda t: x(t) * sqrt(gx(t) ** 2 + gy(t) ** 2), [a, b])


# ---- arc length, y = f(x)
P(ARC, G1, r'\text{Length of }y=\tfrac43x^{3/2},\ 0\le x\le2', r'\dfrac{13}{3}', lambda: arc_x(lambda x: 4 * x ** 1.5 / 3, 0, 2),
  note=r'$y^{\prime}=2\sqrt x$, so $L=\int_0^2\sqrt{1+4x}\,dx$', t='$1+(y^{\\prime})^2=1+4x$', src=WS + '1')
P(ARC, G1, r'\text{Length of }y=\dfrac{x^3}{6}+\dfrac{1}{2x},\ 1\le x\le3', r'\dfrac{14}{3}', lambda: arc_x(lambda x: x ** 3 / 6 + 1 / (2 * x), 1, 3),
  note=r'$1+(y^{\prime})^2=\big(\tfrac{x^2}{2}+\tfrac{1}{2x^2}\big)^2$, so $L=\int_1^3\big(\tfrac{x^2}{2}+\tfrac{1}{2x^2}\big)dx$', t='perfect square', src=WS + '2')
P(ARC, G1, r'\text{Length of }y=\ln\left(1-x^2\right),\ 0\le x\le\tfrac12', r'\ln(3)-\dfrac12', lambda: arc_x(lambda x: log(1 - x ** 2), 0, mpf(1) / 2),
  note=r'$1+(y^{\prime})^2=\Big(\dfrac{1+x^2}{1-x^2}\Big)^2$, and $\dfrac{1+x^2}{1-x^2}=-1+\dfrac{2}{1-x^2}$', t='perfect square · partial fractions', src=WS + '3')
P(ARC, G1, r'\text{Length of }y=\ln(\cos x),\ 0\le x\le\tfrac\pi3', r'\ln\left(2+\sqrt{3}\right)', lambda: arc_x(lambda x: log(cos(x)), 0, pi / 3),
  note=r'$L=\int_0^{\pi/3}\sec x\,dx=\ln|\sec x+\tan x|$', t='$1+\\tan^2x=\\sec^2x$', src=WS + '4')
P(ARC, G1, r'\text{Length of }y=\int_0^x\sqrt{e^{2t}-1}\,dt,\ 0\le x\le1', r'e-1', lambda: arc_fp(lambda x: sqrt(exp(2 * x) - 1), 0, 1),
  note=r'FTC: $y^{\prime}=\sqrt{e^{2x}-1}$, so $1+(y^{\prime})^2=e^{2x}$ and $L=\int_0^1e^x\,dx$', t='the Fundamental Theorem gives $y^{\\prime}$ directly', src=L35 + '1')
P(ARC, G1, r'\text{Length of }y=\tfrac32x^{2/3},\ 0\le x\le3\sqrt3', r'7', lambda: arc_x(lambda x: 3 * x ** (mpf(2) / 3) / 2, 0, 3 * sqrt(3)),
  note=r'$y^{\prime}=x^{-1/3}$; $L=\int_0^{3\sqrt3}x^{-1/3}\sqrt{x^{2/3}+1}\,dx$, $u=x^{2/3}+1$', t='$u=x^{2/3}+1$', src=L35 + '2')
P(ARC, G1, r'\text{Length of }y(x)=\int_1^x\sqrt{t^3-1}\,dt,\ 9\le x\le16', r'\dfrac{1562}{5}', lambda: arc_fp(lambda x: sqrt(x ** 3 - 1), 9, 16),
  note=r'$1+(y^{\prime})^2=x^3$, so $L=\int_9^{16}x^{3/2}\,dx=\tfrac25\big(16^{5/2}-9^{5/2}\big)$', t='FTC again', src=L35 + '22')

# ---- arc length, parametric and x = g(y)
P(ARC, G2, r'\text{Length of }x=t^2,\ y=\tfrac13t^3-t,\ 0\le t\le3', r'12', lambda: arc_par(lambda t: t ** 2, lambda t: t ** 3 / 3 - t, 0, 3),
  note=r'$(x^{\prime})^2+(y^{\prime})^2=4t^2+(t^2-1)^2=(t^2+1)^2$, so $L=\int_0^3(t^2+1)\,dt$', t='the radicand is a perfect square', src=L35 + '3')
P(ARC, G2, r'\text{Length of }x=\cosh y,\ 0\le y\le2', r'\dfrac{e^{2}-e^{-2}}{2}', lambda: arc_x(cosh, 0, 2),
  note=r'$1+\sinh^2y=\cosh^2y$, so $L=\int_0^2\cosh y\,dy=\sinh2$', t='swap the roles of $x$ and $y$', src=L35 + '4')
P(ARC, G2, r'\text{Length of }x=\tfrac14y^{-2}+\tfrac18y^{4},\ 1\le y\le2', r'\dfrac{33}{16}', lambda: arc_x(lambda y: y ** -2 / 4 + y ** 4 / 8, 1, 2),
  note=r'$1+(x^{\prime})^2=\big(\tfrac12y^3+\tfrac12y^{-3}\big)^2$, so $L=\int_1^2\big(\tfrac12y^3+\tfrac12y^{-3}\big)dy$', t='perfect square', src=L35 + '5')
P(ARC, G2, r'\text{Length of }x=3t^8,\ y=2t^{12},\ 0\le t\le1', r'4\sqrt{2}-2', lambda: arc_par(lambda t: 3 * t ** 8, lambda t: 2 * t ** 12, 0, 1),
  note=r'speed $=24t^7\sqrt{1+t^8}$; $u=1+t^8$ gives $L=3\int_1^2\sqrt u\,du$', t='factor out $t^7$', src=L35 + '11')
P(ARC, G2, r'\text{Length of }x=3t^{10},\ y=2t^{15},\ 0\le t\le1', r'4\sqrt{2}-2', lambda: arc_par(lambda t: 3 * t ** 10, lambda t: 2 * t ** 15, 0, 1),
  note=r'speed $=30t^9\sqrt{1+t^{10}}$; $u=1+t^{10}$ gives $L=3\int_1^2\sqrt u\,du$', t='factor out $t^9$', src=L35 + '12')
P(ARC, G2, r'\text{Length of }x=2t^6,\ y=3t^4,\ 0\le t\le2', r'2\left(17\sqrt{17}-1\right)', lambda: arc_par(lambda t: 2 * t ** 6, lambda t: 3 * t ** 4, 0, 2),
  note=r'speed $=12t^3\sqrt{t^4+1}$; $u=t^4+1$ gives $L=3\int_1^{17}\sqrt u\,du$', t='factor out $t^3$', src=L35 + '13')
P(ARC, G2, r'\text{Length of }x=2t^4,\ y=t^6,\ 0\le t\le1', r'\dfrac{61}{27}', lambda: arc_par(lambda t: 2 * t ** 4, lambda t: t ** 6, 0, 1),
  note=r'speed $=2t^3\sqrt{16+9t^4}$; $u=16+9t^4$', t='factor out $t^3$', src=L35 + '14')
P(ARC, G2, r'\text{Length of }x=t^4,\ y=2t^6,\ 0\le t\le1', r'\dfrac{2\left(10\sqrt{10}-1\right)}{27}', lambda: arc_par(lambda t: t ** 4, lambda t: 2 * t ** 6, 0, 1),
  note=r'speed $=4t^3\sqrt{1+9t^4}$; $u=1+9t^4$', t='factor out $t^3$', src=L35 + '15')

# ---- surface area, about the x-axis
P(ARC, G3, r'\text{Surface area from revolving }y=\tfrac{x^3}{3},\ 0\le x\le\sqrt[4]{8},\ \text{about the }x\text{-axis}', r'\dfrac{26\pi}{9}', lambda: surf_x(lambda x: x ** 3 / 3, 0, mpf(8) ** 0.25),
  note=r'$S=2\pi\int_0^{\sqrt[4]8}\tfrac{x^3}{3}\sqrt{1+x^4}\,dx$, $u=1+x^4$ runs from $1$ to $9$', t='$u=1+x^4$', src=WS + '5')
P(ARC, G3, r'\text{Surface area from revolving }x=\tfrac23y^{3/2},\ 0\le y\le3,\ \text{about the }x\text{-axis}', r'\dfrac{232\pi}{15}',
  lambda: 2 * pi * quad(lambda y: y * sqrt(1 + diff(lambda s: 2 * s ** 1.5 / 3, y) ** 2), [0, 3]),
  note=r'$x^{\prime}=\sqrt y$, $ds=\sqrt{1+y}\,dy$, so $S=2\pi\int_0^3y\sqrt{1+y}\,dy$, $u=1+y$', t='the radius is $y$ and $ds=\\sqrt{1+(dx/dy)^2}\\,dy$', src=WS + '7')
P(ARC, G3, r'\text{Surface area from revolving }y=\dfrac{e^x+e^{-x}}{2},\ 0\le x\le\ln2,\ \text{about the }x\text{-axis}', r'\pi\left(\ln(2)+\dfrac{15}{16}\right)', lambda: surf_x(cosh, 0, log(2)),
  note=r'$y\,ds=\cosh^2x\,dx$, so $S=2\pi\int_0^{\ln2}\cosh^2x\,dx=\pi\int_0^{\ln2}(1+\cosh2x)\,dx$', t='$y\\sqrt{1+y^{\\prime 2}}=\\cosh^2x$', src=WS + '8')
P(ARC, G3, r'\text{Surface area from revolving }3x=(y^2+2)^{3/2},\ 0\le y\le1,\ \text{about the }x\text{-axis}', r'\dfrac{3\pi}{2}',
  lambda: 2 * pi * quad(lambda y: y * sqrt(1 + diff(lambda s: (s ** 2 + 2) ** 1.5 / 3, y) ** 2), [0, 1]),
  note=r'$ds=(y^2+1)\,dy$, so $S=2\pi\int_0^1y(y^2+1)\,dy$', t='the same curve as the Quiz 5 problem', src=L35 + '8')
P(ARC, G3, r'\text{Use calculus to find the surface area of the sphere of radius 1}', r'4\pi', lambda: surf_x(lambda x: sqrt(1 - x ** 2), -1, 1),
  note=r'revolve $y=\sqrt{1-x^2}$, $-1\le x\le1$: $y\,ds=dx$, so $S=2\pi\int_{-1}^{1}dx$', t='$y\\,ds=r\\,dx$', src=L35 + '9')

# ---- surface area, about the y-axis
P(ARC, G4, r'\text{Surface area from revolving }x=\sqrt{4-y^2},\ -1\le y\le1,\ \text{about the }y\text{-axis}', r'8\pi',
  lambda: 2 * pi * quad(lambda y: sqrt(4 - y ** 2) * sqrt(1 + diff(lambda s: sqrt(4 - s ** 2), y) ** 2), [-1, 1]),
  note=r'$x\,ds=2\,dy$, so $S=2\pi\int_{-1}^{1}2\,dy$ · a zone of a sphere of radius 2', t='$x\\,ds=r\\,dy$', src=WS + '6')
P(ARC, G4, r'\text{Surface area from revolving }y=\dfrac{x^2}{8},\ 0\le x\le3,\ \text{about the }y\text{-axis}', r'\dfrac{61\pi}{6}', lambda: surf_y(lambda x: x ** 2 / 8, 0, 3),
  note=r'$S=2\pi\int_0^3x\sqrt{1+\tfrac{x^2}{16}}\,dx$, $u=1+\tfrac{x^2}{16}$', t='$u=1+x^2/16$', src=L35 + '7')
P(ARC, G4, r'y=\sqrt{4-x^2}\text{ is defined for }-2\le x\le2.\ \text{Rotate its part with }0\le x\le2\text{ about the }y\text{-axis. Find the surface area}', r'8\pi',
  lambda: surf_y(lambda x: sqrt(4 - x ** 2), 0, 2),
  note=r'$x\,ds=\dfrac{2x}{\sqrt{4-x^2}}\,dx$, so $S=4\pi\int_0^2\dfrac{x}{\sqrt{4-x^2}}\,dx$ · a hemisphere: $2\pi r^2$', t='half of a sphere of radius 2', src=L35 + '20')

# ---- set up the integral (arc length and surface area)
P(ARC, SETUP, r'\text{Set up the area of the surface from revolving }x=\ln y,\ 1\le y\le2,\ \text{about the }x\text{-axis}', r'S=2\pi\int_1^2y\sqrt{1+\dfrac{1}{y^2}}\,dy',
  lambda: 2 * pi * quad(lambda y: y * sqrt(1 + diff(log, y) ** 2), [1, 2]), kind='q', setup=(lambda y: y * sqrt(1 + 1 / y ** 2), 1, 2, 2 * pi),
  note=r'the radius is $y$ and $ds=\sqrt{1+(dx/dy)^2}\,dy$', t='$S=2\\pi\\int(\\text{radius})\\,ds$', src=L35 + '10')
P(ARC, SETUP, r'\text{Set up the surface area from revolving }x=2\sin3t,\ y=\cos3t,\ 0\le t\le\tfrac\pi3,\ \text{about the }y\text{-axis}',
  r'S=2\pi\int_0^{\pi/3}2\sin(3t)\sqrt{36\cos^2(3t)+9\sin^2(3t)}\,dt',
  lambda: surf_par_y(lambda t: 2 * sin(3 * t), lambda t: cos(3 * t), 0, pi / 3), kind='q',
  setup=(lambda t: 2 * sin(3 * t) * sqrt(36 * cos(3 * t) ** 2 + 9 * sin(3 * t) ** 2), 0, pi / 3, 2 * pi),
  note=r'the radius is $x$, and $ds=\sqrt{(x^{\prime})^2+(y^{\prime})^2}\,dt$ with $x^{\prime}=6\cos3t$, $y^{\prime}=-3\sin3t$', t='radius $=x(t)$', src=L35 + '16')
P(ARC, SETUP, r'\text{Set up the surface area from revolving }y=9-x^2\text{ in the first quadrant about the }y\text{-axis}',
  r'S=2\pi\int_0^3x\sqrt{1+4x^2}\,dx', lambda: surf_y(lambda x: 9 - x ** 2, 0, 3), kind='q',
  setup=(lambda x: x * sqrt(1 + 4 * x ** 2), 0, 3, 2 * pi), note=r'first quadrant: $0\le x\le3$ (where $y\ge0$); radius $x$', t='where does the curve hit the $x$-axis?', src=L35 + '17')
P(ARC, SETUP, r'\text{Set up the surface area from revolving }y=4-x^2\text{ in the first quadrant about the }x\text{-axis}',
  r'S=2\pi\int_0^2\left(4-x^2\right)\sqrt{1+4x^2}\,dx', lambda: surf_x(lambda x: 4 - x ** 2, 0, 2), kind='q',
  setup=(lambda x: (4 - x ** 2) * sqrt(1 + 4 * x ** 2), 0, 2, 2 * pi), note=r'first quadrant: $0\le x\le2$; radius $y=4-x^2$', t='radius $=y$', src=L35 + '18')
P(ARC, SETUP, r'\text{Set up the surface area from revolving }x=2t,\ y=t^2\sqrt{1-t^2},\ 0\le t\le1,\ \text{about the }x\text{-axis}',
  r'S=2\pi\int_0^1t^2\sqrt{1-t^2}\,\sqrt{4+\left(\dfrac{2t-3t^3}{\sqrt{1-t^2}}\right)^2}\,dt',
  lambda: surf_par_x(lambda t: 2 * t, lambda t: t ** 2 * sqrt(1 - t ** 2), 0, 1), kind='q',
  setup=(lambda t: t ** 2 * sqrt(1 - t ** 2) * sqrt(4 + ((2 * t - 3 * t ** 3) / sqrt(1 - t ** 2)) ** 2), 0, 1, 2 * pi),
  note=r'radius $=y$; $x^{\prime}=2$ and $y^{\prime}=\dfrac{2t-3t^3}{\sqrt{1-t^2}}$', t='radius $=y(t)$', src=L35 + '19')
P(ARC, SETUP, r'\text{Set up the surface area from revolving }x=e^t,\ y=e^{2t},\ 0\le t\le3,\ \text{about the }x\text{-axis}',
  r'S=2\pi\int_0^3e^{2t}\sqrt{e^{2t}+4e^{4t}}\,dt',
  lambda: surf_par_x(lambda t: exp(t), lambda t: exp(2 * t), 0, 3), kind='q',
  setup=(lambda t: exp(2 * t) * sqrt(exp(2 * t) + 4 * exp(4 * t)), 0, 3, 2 * pi),
  note=r'radius $=y=e^{2t}$; $x^{\prime}=e^t$, $y^{\prime}=2e^{2t}$', t='radius $=y(t)$', src=L35 + '21')

# ================================================================ averages, centroids, centers of mass (lectures 39-40, week 10 practice)
TF = 'Average value · true or false'
AC = 'Averages over curves and surfaces'
CMP = 'Compare and explain'
SET2 = 'Set up mass and moments'
yb = lambda top, bot, a, b, **k: region(top, bot, a, b, **k)[2]
xb = lambda top, bot, a, b, **k: region(top, bot, a, b, **k)[1]

# ---- average value
P(AVG, H1, r'\text{Average value of }\sin x\text{ on }[0,2\pi]', r'0', lambda: avg(sin, 0, 2 * pi),
  note=r'$\dfrac{1}{2\pi}\int_0^{2\pi}\sin x\,dx=0$: the positive and negative halves cancel', t='a full period', src=L39 + '1')
P(AVG, H1, r'\text{Average value of }\tan^3x\sec^4x\text{ on }\left[-\tfrac\pi4,\tfrac\pi4\right]', r'0', lambda: avg(lambda x: sin(x) ** 3 / cos(x) ** 7, -pi / 4, pi / 4),
  note=r'$\tan^3x\sec^4x$ is odd (odd $\times$ even), and the interval is symmetric', t='check for symmetry before integrating', src=L39 + '3')
P(AVG, H1, r'\text{Average value of }\cos^5x\text{ on }\left[-\tfrac{3\pi}{2},\pi\right]', r'-\dfrac{16}{75\pi}', lambda: avg(lambda x: cos(x) ** 5, -3 * pi / 2, pi),
  note=r'the interval has length $\tfrac{5\pi}{2}$; $\int\cos^5x\,dx=\sin x-\tfrac23\sin^3x+\tfrac15\sin^5x$', t='odd power of cosine: $u=\\sin x$', src=L39 + '4')
P(AVG, H1, r'\text{Average value of }\sec^4x\text{ on }\left[0,\tfrac\pi4\right]', r'\dfrac{16}{3\pi}', lambda: avg(lambda x: 1 / cos(x) ** 4, 0, pi / 4),
  note=r'$\int_0^{\pi/4}\sec^4x\,dx=\big[\tan x+\tfrac13\tan^3x\big]_0^{\pi/4}=\tfrac43$, divided by $\tfrac\pi4$', t='$u=\\tan x$, save a $\\sec^2x$', src=L39 + '5')
P(AVG, H1, r'\text{Average value of }\sin^3x\text{ on }\left[\tfrac\pi6,\tfrac{5\pi}6\right]', r'\dfrac{9\sqrt{3}}{8\pi}', lambda: avg(lambda x: sin(x) ** 3, pi / 6, 5 * pi / 6),
  note=r'$\int\sin^3x\,dx=-\cos x+\tfrac13\cos^3x$; the integral is $\tfrac{3\sqrt3}{4}$ over an interval of length $\tfrac{2\pi}{3}$', t='odd power of sine: $u=\\cos x$', src=L39 + '6')
P(AVG, H1, r'\text{A rod }0\le x\le10\text{ cm has temperature }2x^2+20\ ^\circ\text{C.\ What is the expected temperature of a point chosen uniformly at random?}', r'\dfrac{260}{3}\ ^\circ\text{C}',
  lambda: avg(lambda x: 2 * x ** 2 + 20, 0, 10), chk=[r'\frac{260}{3}'], kind='q',
  note=r'$\dfrac{1}{10}\int_0^{10}(2x^2+20)\,dx=\dfrac{1}{10}\Big(\dfrac{2000}{3}+200\Big)$', t='a uniform random point means the average over the length', src=L39 + '7')
P(AVG, H1, r'\text{Average value of }f(x)=xe^{-x}\text{ on }[0,2]', r'\dfrac{1-3e^{-2}}{2}', lambda: avg(lambda x: x * exp(-x), 0, 2),
  note=r'by parts: $\int_0^2xe^{-x}\,dx=\big[-(x+1)e^{-x}\big]_0^2=1-3e^{-2}$', t='integration by parts', src=W10 + 'B1')
P(AVG, H1, r'\text{Let }f(x)=\sin^2x\text{ on }[0,\pi].\ \text{Find }f_{\text{avg}}\text{ and every }c\in(0,\pi)\text{ with }f(c)=f_{\text{avg}}', r'f_{\text{avg}}=\dfrac12;\ \ c=\dfrac\pi4,\ \dfrac{3\pi}{4}',
  lambda: [avg(lambda x: sin(x) ** 2, 0, pi), sin(pi / 4) ** 2, sin(3 * pi / 4) ** 2], chk=[r'\frac12', r'\frac12', r'\frac12'], kind='q',
  note=r'$f_{\text{avg}}=\dfrac1\pi\int_0^\pi\tfrac{1-\cos2x}{2}\,dx=\tfrac12$; $\sin^2c=\tfrac12$ at $c=\tfrac\pi4,\tfrac{3\pi}4$. The Mean Value Theorem promises one $c$; the graph is symmetric, so there are two', t='Mean Value Theorem for integrals', src=W10 + 'B2')

# ---- true or false (reasoning)
P(AVG, TF, r'\text{True or false: if }f_{\text{avg}}<g_{\text{avg}}\text{ on }[a,b],\text{ then }f(x)\le g(x)\text{ for all }x\text{ in }[a,b]', r'\text{False}', [], chk=[], kind='q',
  note=r'The averages only compare the totals. Take $f=0$ and $g(x)=x$ on $[-1,2]$: $g_{\text{avg}}=\tfrac12>0$, but $g<f$ near $x=-1$.', t='the inequality goes the other way: $f\\le g$ everywhere forces $f_{\\text{avg}}\\le g_{\\text{avg}}$', src=L39 + '2a')
P(AVG, TF, r'\text{True or false: on any interval, the average of }f\cdot g\text{ equals }f_{\text{avg}}\cdot g_{\text{avg}}', r'\text{False}', [], chk=[], kind='q',
  note=r'Take $f=g=x$ on $[-1,1]$: $(fg)_{\text{avg}}=\tfrac13$ but $f_{\text{avg}}g_{\text{avg}}=0$.', t='try $f=g=x$ on $[-1,1]$', src=L39 + '2b')
P(AVG, TF, r'\text{True or false: if }f\text{ is even, then }f_{\text{avg}}\text{ on }[-a,a]\text{ equals }f_{\text{avg}}\text{ on }[0,a]', r'\text{True}', [], chk=[], kind='q',
  note=r'$\dfrac{1}{2a}\int_{-a}^{a}f=\dfrac{1}{2a}\cdot2\int_0^af=\dfrac1a\int_0^af$', t='$\\int_{-a}^af=2\\int_0^af$ for even $f$', src=L39 + '2c')
P(AVG, TF, r'\text{True or false: if }f\text{ is odd, then }f_{\text{avg}}\text{ on }[-a,a]\text{ equals }0', r'\text{True}', [], chk=[], kind='q',
  note=r'$\int_{-a}^{a}f=0$ for odd $f$, so the average is $0$.', t='the two halves cancel', src=L39 + '2d')

# ---- averages over a curve or a surface (weight by arc length / surface area)
P(AVG, AC, r'\text{Average of }3y^2\text{ over the curve }(x,y)=\big(1+\sin t,\ 2(1+\sin t)+1\big),\ 0\le t\le\tfrac\pi2', r'49',
  lambda: quad(lambda t: 3 * (3 + 2 * sin(t)) ** 2 * sqrt(1 + 4) * cos(t), [0, pi / 2]) / quad(lambda t: sqrt(1 + 4) * cos(t), [0, pi / 2]),
  note=r'average over arc length: $\dfrac{\int 3y^2\,ds}{\int ds}$ with $ds=\sqrt5\cos t\,dt$ and $y=3+2\sin t$; $u=\sin t$', t='weight by $ds$, not $dt$', src=L39 + '9')
P(AVG, AC, r'\text{Average of }3y^2\text{ over the curve }(x,y)=\big(1+\tan t,\ 2(1+\tan t)+1\big),\ 0\le t\le\tfrac\pi4', r'49',
  lambda: quad(lambda t: 3 * (3 + 2 * sin(t) / cos(t)) ** 2 * sqrt(5) / cos(t) ** 2, [0, pi / 4]) / quad(lambda t: sqrt(5) / cos(t) ** 2, [0, pi / 4]),
  note=r'$ds=\sqrt5\sec^2t\,dt$ and $y=3+2\tan t$; $u=\tan t$ runs from $0$ to $1$', t='weight by $ds$', src=L39 + '10')
P(AVG, AC, r'\text{Set up the average of }2x\text{ over the surface from revolving }y=\sqrt x,\ 1\le x\le4,\ \text{about the }x\text{-axis}',
  r'\dfrac{\int_1^4 2x\cdot2\pi\sqrt{x}\sqrt{1+\frac{1}{4x}}\,dx}{\int_1^4 2\pi\sqrt{x}\sqrt{1+\frac{1}{4x}}\,dx}',
  lambda: quad(lambda x: 2 * x * sqrt(x) * sqrt(1 + 1 / (4 * x)), [1, 4]) / quad(lambda x: sqrt(x) * sqrt(1 + 1 / (4 * x)), [1, 4]), kind='q',
  setup=(lambda x: 2 * x * sqrt(x) * sqrt(1 + 1 / (4 * x)) / quad(lambda s: sqrt(s) * sqrt(1 + 1 / (4 * s)), [1, 4]), 1, 4, 1),
  note=r'weight by the surface area element $dS=2\pi y\,ds=2\pi\sqrt x\sqrt{1+\tfrac1{4x}}\,dx$; the $2\pi$ cancels', t='$dS=2\\pi\\,(\\text{radius})\\,ds$', src=L39 + '11')
P(AVG, AC, r'\text{Set up the average of }2x^2\text{ over the surface from revolving }y=\sin^2x,\ 0\le x\le2\pi,\ \text{about the }y\text{-axis}',
  r'\dfrac{\int_0^{2\pi}2x^2\cdot2\pi x\sqrt{1+\sin^2(2x)}\,dx}{\int_0^{2\pi}2\pi x\sqrt{1+\sin^2(2x)}\,dx}',
  lambda: quad(lambda x: 2 * x ** 3 * sqrt(1 + diff(lambda s: sin(s) ** 2, x) ** 2), [0, 2 * pi]) / quad(lambda x: x * sqrt(1 + diff(lambda s: sin(s) ** 2, x) ** 2), [0, 2 * pi]), kind='q',
  setup=(lambda x: 2 * x ** 3 * sqrt(1 + sin(2 * x) ** 2) / quad(lambda s: s * sqrt(1 + sin(2 * s) ** 2), [0, 2 * pi]), 0, 2 * pi, 1),
  note=r'$y^{\prime}=2\sin x\cos x=\sin2x$, radius $=x$, so $dS=2\pi x\sqrt{1+\sin^22x}\,dx$', t='radius is $x$ (about the $y$-axis)', src=L39 + '12')

# ---- centroids of regions
P(AVG, H2, r'\text{Centroid of the quarter disk }x^2+y^2\le1,\ x\ge0,\ y\ge0', r'(\bar x,\bar y)=\left(\dfrac{4}{3\pi},\ \dfrac{4}{3\pi}\right)',
  lambda: [region(lambda x: sqrt(1 - x ** 2), lambda x: 0, 0, 1)[1], region(lambda x: sqrt(1 - x ** 2), lambda x: 0, 0, 1)[2]], chk=[r'\frac{4}{3\pi}', r'\frac{4}{3\pi}'], kind='q',
  note=r'$A=\tfrac\pi4$; $\bar x=\bar y$ by the symmetry $x\leftrightarrow y$. Since $\tfrac{4}{3\pi}\approx0.424<\tfrac12$, $\bar x$ is less than $\tfrac12$: the region bulges toward the $y$-axis', t='general formula: $\\dfrac{4r}{3\\pi}$', src=L40 + '1')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=x^2,\ x=0,\ y=1', r'(\bar x,\bar y)=\left(\dfrac38,\ \dfrac35\right)',
  lambda: [xb(lambda x: 1, lambda x: x ** 2, 0, 1), yb(lambda x: 1, lambda x: x ** 2, 0, 1)], chk=[r'\frac38', r'\frac35'], kind='q',
  note=r'$A=\int_0^1(1-x^2)\,dx=\tfrac23$; $\bar x=\tfrac32\int_0^1x(1-x^2)\,dx$; $\bar y=\tfrac32\cdot\tfrac12\int_0^1(1-x^4)\,dx$', t='top is $y=1$, bottom is $y=x^2$', src=L40 + '3')
P(AVG, H2, r'\text{Centroid of the region between }f(x)=2+\sqrt{x}\text{ and the }x\text{-axis, }0\le x\le9', r'(\bar x,\bar y)=\left(\dfrac{99}{20},\ \dfrac{33}{16}\right)',
  lambda: [xb(lambda x: 2 + sqrt(x), lambda x: 0, 0, 9), yb(lambda x: 2 + sqrt(x), lambda x: 0, 0, 9)], chk=[r'\frac{99}{20}', r'\frac{33}{16}'], kind='q',
  note=r'$A=\int_0^9(2+\sqrt x)\,dx=36$; $\bar x=\tfrac1A\int_0^9x(2+\sqrt x)\,dx$; $\bar y=\tfrac{1}{2A}\int_0^9(2+\sqrt x)^2\,dx$', t='bottom is the $x$-axis', src=L40 + '5')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=x^2+2x,\ y=-x^2-2x,\ x=1', r'(\bar x,\bar y)=\left(\dfrac{11}{16},\ 0\right)',
  lambda: [xb(lambda x: x ** 2 + 2 * x, lambda x: -x ** 2 - 2 * x, 0, 1), yb(lambda x: x ** 2 + 2 * x, lambda x: -x ** 2 - 2 * x, 0, 1)], chk=[r'\frac{11}{16}', '0'], kind='q',
  note=r'the curves meet at $x=0$ (and $-2$), so the bounded region is $0\le x\le1$; it is symmetric about the $x$-axis, so $\bar y=0$; $A=\tfrac83$. (A density that is larger on the left, such as $\rho=2-x$, pulls the center of mass to the left of $\tfrac{11}{16}$.)', t='symmetry about the $x$-axis', src=L40 + '7')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=2|x|+1,\ y=0,\ x=-1,\ x=1', r'(\bar x,\bar y)=\left(0,\ \dfrac{13}{12}\right)',
  lambda: [xb(lambda x: 2 * abs(x) + 1, lambda x: 0, -1, 1, split=[0]), yb(lambda x: 2 * abs(x) + 1, lambda x: 0, -1, 1, split=[0])], chk=['0', r'\frac{13}{12}'], kind='q',
  note=r'symmetric about the $y$-axis, so $\bar x=0$; $A=4$; $\bar y=\tfrac{1}{2A}\int_{-1}^1(2|x|+1)^2\,dx$. (Any even density, such as $\rho=x^2$, keeps $\bar x=0$.)', t='symmetry about the $y$-axis', src=L40 + '8')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=2x+1,\ y=-2x-1,\ x=1', r'(\bar x,\bar y)=\left(\dfrac12,\ 0\right)',
  lambda: [xb(lambda x: 2 * x + 1, lambda x: -2 * x - 1, -mpf(1) / 2, 1), yb(lambda x: 2 * x + 1, lambda x: -2 * x - 1, -mpf(1) / 2, 1)], chk=[r'\frac12', '0'], kind='q',
  note=r'the lines cross at $x=-\tfrac12$, so the region is a triangle with vertices $(-\tfrac12,0),(1,3),(1,-3)$: $\bar x=\tfrac{-1/2+1+1}{3}$. (A density increasing in $x$, such as $\rho=x+1$, pushes the center of mass right of $\tfrac12$.)', t='a triangle, symmetric about the $x$-axis', src=L40 + '9')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=\sqrt{10x^2},\ y=0,\ x=-2,\ x=2', r'(\bar x,\bar y)=\left(0,\ \dfrac{2\sqrt{10}}{3}\right)',
  lambda: [xb(lambda x: sqrt(10) * abs(x), lambda x: 0, -2, 2, split=[0]), yb(lambda x: sqrt(10) * abs(x), lambda x: 0, -2, 2, split=[0])], chk=['0', r'\frac{2\sqrt{10}}{3}'], kind='q',
  note=r'$\sqrt{10x^2}=\sqrt{10}\,|x|$: a V-shaped region, symmetric about the $y$-axis. $A=4\sqrt{10}$; $\bar y=\tfrac{1}{2A}\int_{-2}^2 10x^2\,dx$. (A density larger on the left, such as $\rho=3-x$, makes the center of mass left of $\bar x=0$.)', t='$\\sqrt{10x^2}=\\sqrt{10}\\,|x|$', src=L40 + '10')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=5|x|,\ y=0,\ x=-1,\ x=1', r'(\bar x,\bar y)=\left(0,\ \dfrac53\right)',
  lambda: [xb(lambda x: 5 * abs(x), lambda x: 0, -1, 1, split=[0]), yb(lambda x: 5 * abs(x), lambda x: 0, -1, 1, split=[0])], chk=['0', r'\frac53'], kind='q',
  note=r'a triangle with apex at the origin pointing down: $A=5$, $\bar y=\tfrac{1}{2A}\int_{-1}^1 25x^2\,dx$; any even density keeps $\bar x=0$', t='symmetry about the $y$-axis', src=L40 + '11')
P(AVG, H2, r'\text{Average }y\text{-coordinate of the region }0\le x\le\tfrac\pi4,\ \sin x\le y\le\cos x', r'\dfrac{\sqrt{2}+1}{4}',
  lambda: yb(cos, sin, 0, pi / 4),
  note=r'$A=\sqrt2-1$; $\bar y=\dfrac{1}{2A}\int_0^{\pi/4}(\cos^2x-\sin^2x)\,dx=\dfrac{1}{2A}\cdot\tfrac12$, then rationalize', t='the average $y$ is the centroid $\\bar y$', src=L40 + '12')
P(AVG, H2, r'\text{Average }y\text{-coordinate of the region }0\le x\le\pi,\ 0\le y\le\cos x', r'\dfrac{\pi}{8}',
  lambda: yb(cos, lambda x: 0, 0, pi / 2),
  note=r'$0\le y\le\cos x$ only has points where $\cos x\ge0$, i.e. $0\le x\le\tfrac\pi2$. $A=1$; $\bar y=\tfrac12\int_0^{\pi/2}\cos^2x\,dx$', t='where is $\\cos x\\ge0$?', src=L40 + '15')
P(AVG, H2, r'\text{Average }x\text{-coordinate of the region }1\le x\le3,\ 0\le y\le\ln x', r'\dfrac{\frac92\ln(3)-2}{3\ln(3)-2}',
  lambda: xb(log, lambda x: 0, 1, 3),
  note=r'$A=\int_1^3\ln x\,dx=3\ln3-2$; $\int_1^3x\ln x\,dx=\tfrac92\ln3-2$ (by parts)', t='integration by parts twice', src=L40 + '16')
P(AVG, H2, r'\text{An arched window: the rectangle }-2\le x\le2,\ 0\le y\le2\text{ topped by a semicircle of radius 2. Find its centroid}', r'(\bar x,\bar y)=\left(0,\ \dfrac{20+6\pi}{12+3\pi}\right)',
  lambda: [mpf(0), (8 * 1 + 2 * pi * (2 + 8 / (3 * pi))) / (8 + 2 * pi)], chk=['0', r'\frac{20+6\pi}{12+3\pi}'], kind='q',
  note=r'composite: rectangle $A=8$, centroid $y=1$; semicircle $A=2\pi$, centroid $y=2+\tfrac{4\cdot2}{3\pi}$; $\bar y=\dfrac{8\cdot1+2\pi(2+\frac{8}{3\pi})}{8+2\pi}$', t='weight each piece by its area', src=W10 + '5')
P(AVG, H2, r'\text{Centroid of the region bounded by }y=\ln x,\ \text{the }x\text{-axis, and }x=e', r'(\bar x,\bar y)=\left(\dfrac{e^2+1}{4},\ \dfrac{e-2}{2}\right)',
  lambda: [xb(log, lambda x: 0, 1, exp(1)), yb(log, lambda x: 0, 1, exp(1))], chk=[r'\frac{e^{2}+1}{4}', r'\frac{e-2}{2}'], kind='q',
  note=r'$A=\int_1^e\ln x\,dx=1$; $\bar x=\int_1^ex\ln x\,dx$; $\bar y=\tfrac12\int_1^e\ln^2x\,dx$ (by parts, twice)', t='parts, twice', src=W10 + '7')

# ---- center of mass with density
P(AVG, H3, r'\text{A plate lies between }y=1\text{ (above) and }y=2x^2-1\text{ (below), with density }\delta=1+x^2.\ \text{Find its center of mass}', r'(\bar x,\bar y)=\left(0,\ \dfrac{5}{21}\right)',
  lambda: [xb(lambda x: 1, lambda x: 2 * x ** 2 - 1, -1, 1, rho=lambda x: 1 + x ** 2), yb(lambda x: 1, lambda x: 2 * x ** 2 - 1, -1, 1, rho=lambda x: 1 + x ** 2)], chk=['0', r'\frac{5}{21}'], kind='q',
  note=r'the curves meet at $x=\pm1$; $\bar x=0$ by symmetry (the density is even); $m=\int_{-1}^1(1+x^2)(2-2x^2)\,dx=\tfrac{16}{5}$; $M_x=\tfrac12\int_{-1}^1(1+x^2)\big(1-(2x^2-1)^2\big)dx$', t='$\\rho$ weights each slice', src=L40 + '4')
P(AVG, H3, r'\text{Center of mass of the region between }f(x)=1\text{ and }g(x)=x^2\text{ with density }\delta(x)=4-x^2', r'(\bar x,\bar y)=\left(0,\ \dfrac{79}{133}\right)',
  lambda: [xb(lambda x: 1, lambda x: x ** 2, -1, 1, rho=lambda x: 4 - x ** 2), yb(lambda x: 1, lambda x: x ** 2, -1, 1, rho=lambda x: 4 - x ** 2)], chk=['0', r'\frac{79}{133}'], kind='q',
  note=r'$m=\int_{-1}^1(4-x^2)(1-x^2)\,dx=\tfrac{76}{15}$; $\bar y=\tfrac1m\cdot\tfrac12\int_{-1}^1(4-x^2)(1-x^4)\,dx$', t='the density is even, so $\\bar x=0$', src=L40 + '6')
P(AVG, H3, r'\text{A rod lies along }0\le x\le1\text{ with density }\rho(x)=\dfrac{1}{1+x^2}.\ \text{Find the center of mass}', r'\bar x=\dfrac{2\ln2}{\pi}',
  lambda: quad(lambda x: x / (1 + x ** 2), [0, 1]) / quad(lambda x: 1 / (1 + x ** 2), [0, 1]), chk=[r'\frac{2\ln(2)}{\pi}'], kind='q',
  note=r'$m=\int_0^1\tfrac{dx}{1+x^2}=\tfrac\pi4$; $M_0=\int_0^1\tfrac{x}{1+x^2}dx=\tfrac{\ln2}{2}$. The density is larger near $x=0$, so $\bar x<\tfrac12$ ($\approx0.441$)', t='is it heavier on the left or the right?', src=W10 + '3')
P(AVG, H3, r'\text{The lamina under }y=4-x^2,\ 0\le x\le2,\ \text{has density }\rho(x)=x.\ \text{Find its center of mass}', r'(\bar x,\bar y)=\left(\dfrac{16}{15},\ \dfrac43\right)',
  lambda: [xb(lambda x: 4 - x ** 2, lambda x: 0, 0, 2, rho=lambda x: x), yb(lambda x: 4 - x ** 2, lambda x: 0, 0, 2, rho=lambda x: x)], chk=[r'\frac{16}{15}', r'\frac43'], kind='q',
  note=r'$m=\int_0^2x(4-x^2)\,dx=4$. The uniform centroid is $(\tfrac34,\tfrac85)$: the density grows with $x$, so the center of mass shifts right (and down, since the heavy part is lower)', t='compare with the centroid $(\\tfrac34,\\tfrac85)$', src=W10 + '6')

# ---- compare and explain
P(AVG, CMP, r'\text{Region }(x-1)^2\le y\le2.\ \text{Is the }x\text{-coordinate of the centroid greater than, less than, or equal to its }y\text{-coordinate?}', r'\text{less than}',
  [], chk=[], kind='q', truth=lambda: xb(lambda x: 2, lambda x: (x - 1) ** 2, 1 - sqrt(2), 1 + sqrt(2)) < yb(lambda x: 2, lambda x: (x - 1) ** 2, 1 - sqrt(2), 1 + sqrt(2)),
  note=r'the region is symmetric about $x=1$, so $\bar x=1$; most of the area is high up, and $\bar y=\tfrac65=1.2>1$', t='find the axis of symmetry first', src=L40 + '17a')
P(AVG, CMP, r'\text{Same region, density }\rho(x)=\pi.\ \text{Is the }y\text{-coordinate of the centroid greater than, less than, or equal to the }y\text{-coordinate of the center of mass?}', r'\text{equal}',
  [], chk=[], kind='q', note=r'a constant density cancels in the ratio, so the center of mass is the centroid', t='what does a constant $\\rho$ do to $M_x/m$?', src=L40 + '17b')
P(AVG, CMP, r'\text{Same region, density }\rho(x)=e^{-x^2}.\ \text{Is the }x\text{-coordinate of the centroid greater than, less than, or equal to the }x\text{-coordinate of the center of mass?}', r'\text{greater than}',
  [], chk=[], kind='q', truth=lambda: quad(lambda x: x * exp(-x ** 2) * (2 - (x - 1) ** 2), [1 - sqrt(2), 1 + sqrt(2)]) / quad(lambda x: exp(-x ** 2) * (2 - (x - 1) ** 2), [1 - sqrt(2), 1 + sqrt(2)]) < 1,
  note=r'$e^{-x^2}$ is larger for smaller $|x|$, which favors the left half of this region, so the center of mass sits left of $x=1$', t='where is $e^{-x^2}$ larger?', src=L40 + '17c')

# ---- set up mass and moments
P(AVG, SET2, r'\text{Write the mass of a rod }0\le x\le3\text{ with density }\rho(x)=\sqrt{1+x}\text{ as an integral}', r'm=\int_0^3\sqrt{1+x}\,dx=\dfrac{14}{3}',
  lambda: quad(lambda x: sqrt(1 + x), [0, 3]), chk=[], kind='q', setup=(lambda x: sqrt(1 + x), 0, 3, 1), note='', t='$m=\\int\\rho\\,dx$', src=W10 + 'A(a)')
P(AVG, SET2, r'\text{Write }M_x\text{ for the region between }y=\sqrt{x}\text{ and }y=x,\ 0\le x\le1,\ \text{as an integral (uniform density)}', r'M_x=\dfrac12\int_0^1\left(x-x^2\right)dx=\dfrac1{12}',
  lambda: region(sqrt, lambda x: x, 0, 1)[0] * region(sqrt, lambda x: x, 0, 1)[2], chk=[], kind='q',
  setup=(lambda x: (sqrt(x) ** 2 - x ** 2) / 2, 0, 1, 1), note=r'top is $\sqrt x$, bottom is $x$: $\tfrac12\int\big(\text{top}^2-\text{bottom}^2\big)dx$', t='$M_x=\\tfrac12\\int(\\text{top}^2-\\text{bottom}^2)\\,dx$', src=W10 + 'A(b)')
P(AVG, SET2, r'\text{The region under }y=\cos x\text{ in the first quadrant is revolved about the }y\text{-axis (constant density). Set up }\bar y\text{ of the solid}',
  r'\bar y=\dfrac{\int_0^{\pi/2}\frac12\cos x\cdot2\pi x\cos x\,dx}{\int_0^{\pi/2}2\pi x\cos x\,dx}=\dfrac{\pi+2}{16}',
  lambda: (pi + 2) / 16, chk=[], kind='q',
  setup=(lambda x: x * cos(x) ** 2 / 2 / quad(lambda s: s * cos(s), [0, pi / 2]), 0, pi / 2, 1), note=r'shells: $dV=2\pi x\cos x\,dx$, and each shell\'s center is at height $\tfrac12\cos x$', t='cylindrical shells', src=L39 + '8')
P(AVG, SET2, r'\text{Region between }y=(x-1)^2\text{ and }y=2-(x-1)^2\text{ is revolved about the }x\text{-axis; density }\rho(x)=x+1.\ \text{Set up }\bar x',
  r'\bar x=\dfrac{\int_0^2x(x+1)\left[(2-(x-1)^2)^2-(x-1)^4\right]dx}{\int_0^2(x+1)\left[(2-(x-1)^2)^2-(x-1)^4\right]dx}',
  lambda: quad(lambda x: x * (x + 1) * ((2 - (x - 1) ** 2) ** 2 - (x - 1) ** 4), [0, 2]) / quad(lambda x: (x + 1) * ((2 - (x - 1) ** 2) ** 2 - (x - 1) ** 4), [0, 2]), chk=[], kind='q',
  setup=(lambda x: x * (x + 1) * ((2 - (x - 1) ** 2) ** 2 - (x - 1) ** 4) / quad(lambda s: (s + 1) * ((2 - (s - 1) ** 2) ** 2 - (s - 1) ** 4), [0, 2]), 0, 2, 1),
  note=r'the curves meet at $x=0,2$; washers have area $\pi(R^2-r^2)$ and the $\pi$ cancels', t='washers: $R=2-(x-1)^2$, $r=(x-1)^2$', src=L40 + '18')
P(AVG, SET2, r'\text{Region bounded by }y=\sqrt{x},\ y=\sqrt{1-x},\ \text{and the }x\text{-axis is revolved about the }x\text{-axis; density }\rho(x)=x+2.\ \text{Set up }\bar x',
  r'\bar x=\dfrac{\int_0^{1/2}x(x+2)\,x\,dx+\int_{1/2}^1x(x+2)(1-x)\,dx}{\int_0^{1/2}(x+2)\,x\,dx+\int_{1/2}^1(x+2)(1-x)\,dx}',
  lambda: (quad(lambda x: x * (x + 2) * x, [0, mpf(1) / 2]) + quad(lambda x: x * (x + 2) * (1 - x), [mpf(1) / 2, 1])) / (quad(lambda x: (x + 2) * x, [0, mpf(1) / 2]) + quad(lambda x: (x + 2) * (1 - x), [mpf(1) / 2, 1])), chk=[], kind='q',
  setup=(lambda x: (x * (x + 2) * (x if x < mpf(1) / 2 else 1 - x)) / (quad(lambda s: (s + 2) * s, [0, mpf(1) / 2]) + quad(lambda s: (s + 2) * (1 - s), [mpf(1) / 2, 1])), [0, mpf(1) / 2, 1], 1, 1),
  note=r'the curves meet at $x=\tfrac12$; the radius is $\sqrt x$ on the left and $\sqrt{1-x}$ on the right, so the slice area is $\pi x$ then $\pi(1-x)$', t='split at $x=\\tfrac12$', src=L40 + '19')

# ================================================================ probability and expectation (lectures 42-44)
GEO = 'Geometric probability'
CDF = 'Mean from a cumulative probability'
DIS = 'Discrete random variables'

# ---- find the constant
P(PDF, D1, r'f(x)=\dfrac{4}{\pi}\dfrac{1}{\sqrt{(3+x)(3-x)}}\text{ on }[0,A].\ \text{Find }A>0\text{ so that }f\text{ is a density}', r'\dfrac{3\sqrt{2}}{2}',
  lambda: findroot(lambda A: quad(lambda x: 4 / pi / sqrt(9 - x ** 2), [0, A]) - 1, 2), chk=[r'\frac{3\sqrt{2}}{2}'],
  note=r'$\dfrac4\pi\int_0^A\dfrac{dx}{\sqrt{9-x^2}}=\dfrac4\pi\arcsin\dfrac A3=1$, so $\arcsin\dfrac A3=\dfrac\pi4$', t='$(3+x)(3-x)=9-x^2$', src=L42 + '2')
P(PDF, D1, r'f(x)=\dfrac{1}{\sqrt x}\ (1\le x\le\alpha),\ 0\text{ otherwise.\ Find }\alpha', r'\dfrac94',
  lambda: findroot(lambda a: quad(lambda x: 1 / sqrt(x), [1, a]) - 1, 2), chk=[r'\frac94'],
  note=r'$\int_1^\alpha x^{-1/2}\,dx=2(\sqrt\alpha-1)=1$', t='$\\int f=1$', src=L42 + '9')
P(PDF, D1, r'f(x)=\tfrac12e^{-x}-ce^{-2x}\ (x\ge0).\ \text{Find }c\text{ so that }f\text{ is a density, and the mean }\mu', r'c=-1,\ \ \mu=\dfrac34',
  lambda: [1 / quad(lambda x: exp(-2 * x), [0, inf]) * (quad(lambda x: exp(-x) / 2, [0, inf]) - 1), quad(lambda x: x * (exp(-x) / 2 + exp(-2 * x)), [0, inf])], chk=['-1', r'\frac34'], kind='q',
  note=r'$\int_0^\infty f=\tfrac12-\tfrac c2=1$ gives $c=-1$, so $f=\tfrac12e^{-x}+e^{-2x}$; $\mu=\tfrac12\cdot1+1\cdot\tfrac14$', t='$\\int_0^\\infty e^{-kx}dx=\\tfrac1k$ and $\\int_0^\\infty xe^{-kx}dx=\\tfrac1{k^2}$', src=L44 + '1')
P(PDF, D1, r'f(x)=C\sqrt{x-1}\text{ on }[1,2].\ \text{Find }C\text{ and the mean }\mu', r'C=\dfrac32,\ \ \mu=\dfrac85',
  lambda: [1 / quad(lambda x: sqrt(x - 1), [1, 2]), quad(lambda x: x * 1.5 * sqrt(x - 1), [1, 2])], chk=[r'\frac32', r'\frac85'], kind='q',
  note=r'$\int_1^2\sqrt{x-1}\,dx=\tfrac23$; with $u=x-1$: $\mu=\tfrac32\int_0^1(u+1)\sqrt u\,du$', t='$u=x-1$', src=L44 + '2')
P(PDF, D1, r'f(x)=\dfrac{3}{64}\,x\sqrt{16-x^2}\ (0\le x\le4),\ 0\text{ otherwise.\ Compute }\displaystyle\int_{-\infty}^{\infty}f(x)\,dx\text{ (to verify it is a density)}', r'1',
  lambda: quad(lambda x: 3 * x * sqrt(16 - x ** 2) / 64, [0, 4]),
  note=r'$u=16-x^2$: $\dfrac{3}{64}\cdot\dfrac13\cdot16^{3/2}=1$', t='$u=16-x^2$', src=L42 + '8')

# ---- probabilities from a density
P(PDF, D2, r'\rho(x)=2xe^{-x^2}\ (x\ge0).\ \text{Find }k\text{ with }P(X>k)=\tfrac13', r'\sqrt{\ln3}',
  lambda: findroot(lambda k: quad(lambda x: 2 * x * exp(-x ** 2), [k, inf]) - mpf(1) / 3, 1), chk=[r'\sqrt{\ln(3)}'],
  note=r'$P(X>k)=\int_k^\infty2xe^{-x^2}dx=e^{-k^2}=\tfrac13$', t='$u=x^2$', src=L42 + '3')
P(PDF, D2, r'\rho(t)\text{ satisfies }\dfrac{d\rho}{dt}=-7\rho(t)\text{ for }t\ge0\text{ and is a density. Find }P(X<7)', r'1-e^{-49}',
  lambda: 1 - exp(-49), chk=[r'1-e^{-49}'],
  note=r'$\rho=Ce^{-7t}$ and $\int_0^\infty\rho=\tfrac C7=1$, so $C=7$; $P(X<7)=\int_0^77e^{-7t}dt$', t='solve the differential equation, then normalize', src=L42 + '10')

# ---- geometric probability
P(PDF, GEO, r'A:\ x=y^2\text{ and }x=9.\ R:\ \text{the rectangle with vertices }(0,\pm4),\ (10,\pm4).\ \text{Find }P(\text{a random point of }R\text{ lies in }A)', r'\dfrac{9}{20}',
  lambda: quad(lambda y: 9 - y ** 2, [-3, 3]) / (10 * 8), chk=[r'\frac{9}{20}'],
  note=r'area of $A=\int_{-3}^3(9-y^2)\,dy=36$; area of $R=80$', t='probability $=$ area of $A$ $\\div$ area of $R$', src=L42 + '1')
P(PDF, GEO, r'\text{Water drips uniformly into a circular bucket of diameter 10 inches. Find }P(\text{a drop lands more than 3 inches from the center})', r'\dfrac{16}{25}',
  lambda: (25 * pi - 9 * pi) / (25 * pi), chk=[r'\frac{16}{25}'], note=r'$\dfrac{\pi5^2-\pi3^2}{\pi5^2}$', t='radius $5$', src=L42 + '4')
P(PDF, GEO, r'\text{A bait is equally likely to end up at any angle around a circular lake. Find }P(\text{it is within }5^\circ\text{ of its initial angle, on either side})', r'\dfrac{1}{36}',
  lambda: mpf(10) / 360, chk=[r'\frac{1}{36}'], note=r'a sector spanning $10^\circ$ out of $360^\circ$', t='sector area over circle area', src=L42 + '5')
P(PDF, GEO, r'\text{Baseballs hit a right-triangular barn facade (hypotenuse is the 20 ft base, height 10 ft) uniformly at random. Find }P(\text{height}>7)', r'\dfrac{9}{100}',
  lambda: (mpf(3) / 10) ** 2, chk=[r'\frac{9}{100}'],
  note=r'the part above height $7$ is a similar triangle scaled by $\tfrac{10-7}{10}=\tfrac{3}{10}$, so its area is $\tfrac{9}{100}$ of the whole', t='similar triangles: area scales with the square', src=L42 + '6')
P(PDF, GEO, r'\text{Footballs pass uniformly through a }10\times8\text{ ft goalpost. Find }P\!\left(y\ge\tfrac45x+4\right)', r'\dfrac18',
  lambda: quad(lambda x: 8 - (4 * x / 5 + 4), [0, 5]) / 80, chk=[r'\frac18'],
  note=r'the line runs from $(0,4)$ to $(5,8)$; the region above it is a triangle of area $\tfrac12\cdot5\cdot4=10$, out of $80$', t='draw the line from $(0,4)$ to $(5,8)$', src=L42 + '7')
P(PDF, GEO, r'\text{Oil drips uniformly into a circular pan of radius 14 in. Find }P(\text{a drop lands within 4 in. horizontally and 2 in. vertically of the center})', r'\dfrac{8}{49\pi}',
  lambda: mpf(8 * 4) / (pi * 14 ** 2), chk=[r'\frac{8}{49\pi}'],
  note=r'a $8\times4$ rectangle (area $32$) fits inside the pan (its corner is $\sqrt{20}<14$ from the center); the pan has area $196\pi$', t='rectangle area over disk area', src=L42 + '11')
P(PDF, GEO, r'\text{The region between }y=x,\ x^2+y^2=1\text{ and the }x\text{-axis (first quadrant) is revolved about the }y\text{-axis. Find the volume of the solid}', r'\dfrac{\pi\sqrt{2}}{3}',
  lambda: pi * quad(lambda y: (1 - y ** 2) - y ** 2, [0, sqrt(2) / 2]), chk=[r'\frac{\pi\sqrt{2}}{3}'],
  note=r'horizontal slices are washers with outer radius $\sqrt{1-y^2}$ and inner radius $y$: $V=\pi\int_0^{\sqrt2/2}(1-2y^2)\,dy$', t='washers, $y$ from $0$ to $\\tfrac{\\sqrt2}{2}$', src=L42 + '12a')
P(PDF, GEO, r'\text{A point is chosen uniformly from that solid. Find }P\!\left(y>\tfrac12\right)', r'1-\dfrac{5\sqrt{2}}{8}',
  lambda: quad(lambda y: 1 - 2 * y ** 2, [mpf(1) / 2, sqrt(2) / 2]) / quad(lambda y: 1 - 2 * y ** 2, [0, sqrt(2) / 2]), chk=[r'1-\frac{5\sqrt{2}}{8}'],
  note=r'$P=\dfrac{\pi\int_{1/2}^{\sqrt2/2}(1-2y^2)\,dy}{\pi\int_0^{\sqrt2/2}(1-2y^2)\,dy}=\dfrac{\sqrt2/3-5/12}{\sqrt2/3}$ ($\approx0.116$)', t='volume above $y=\\tfrac12$ over total volume', src=L42 + '12b')
P(PDF, GEO, r'\text{For the same random point, find }P\!\left(y=\tfrac12\right)', r'0',
  lambda: mpf(0), chk=['0'], note=r'for a continuous distribution any single value has probability $0$: the slice at $y=\tfrac12$ has zero volume', t='a single slice has no volume', src=L42 + '12c')

# ---- mean
P(EV, V1, r'f(x)=\dfrac{1}{\pi\sqrt{1-x^2}}\text{ on }(-1,1).\ \text{Find the mean }\mu\text{ and variance }\sigma^2', r'\mu=0,\ \ \sigma^2=\dfrac12',
  lambda: [quad(lambda x: x / (pi * sqrt(1 - x ** 2)), [-1, 1]), quad(lambda x: x ** 2 / (pi * sqrt(1 - x ** 2)), [-1, 1])], chk=['0', r'\frac12'], kind='q',
  note=r'$xf(x)$ is odd, so $\mu=0$; $\sigma^2=\int_{-1}^1\dfrac{x^2}{\pi\sqrt{1-x^2}}dx$ with $x=\sin\theta$ gives $\tfrac2\pi\int_0^{\pi/2}\sin^2\theta\,d\theta$', t='symmetry for $\\mu$; $x=\\sin\\theta$ for $\\sigma^2$', src=L44 + '3')
P(EV, V1, r'\text{A number between 3 and 5 is chosen uniformly. Find the mean }\mu\text{ and variance }\sigma^2', r'\mu=4,\ \ \sigma^2=\dfrac13',
  lambda: [quad(lambda x: x / 2, [3, 5]), quad(lambda x: (x - 4) ** 2 / 2, [3, 5])], chk=['4', r'\frac13'], kind='q',
  note=r'$f=\tfrac12$ on $[3,5]$; $\mu=\tfrac{3+5}{2}$ and $\sigma^2=\tfrac{(5-3)^2}{12}$', t='uniform: $\\sigma^2=\\tfrac{(b-a)^2}{12}$', src=L44 + '4')
P(EV, V1, r'f(x)=2(1-x)\text{ on }[0,1].\ \text{Find the mean }\mu\text{ and variance }\sigma^2', r'\mu=\dfrac13,\ \ \sigma^2=\dfrac1{18}',
  lambda: [quad(lambda x: 2 * x * (1 - x), [0, 1]), quad(lambda x: 2 * x ** 2 * (1 - x), [0, 1]) - mpf(1) / 9], chk=[r'\frac13', r'\frac{1}{18}'], kind='q',
  note=r'$\mu=\int_0^12x(1-x)\,dx=\tfrac13$; $E[X^2]=\int_0^12x^2(1-x)\,dx=\tfrac16$, so $\sigma^2=\tfrac16-\tfrac19$', t='$\\sigma^2=E[X^2]-\\mu^2$', src=L44 + '8')

# ---- median
P(EV, V2, r'f(x)=3x^2\text{ on }[0,1].\ \text{Find the mean }\mu\text{ and median }m', r'\mu=\dfrac34,\ \ m=\dfrac{1}{\sqrt[3]{2}}',
  lambda: [quad(lambda x: 3 * x ** 3, [0, 1]), 2 ** (-mpf(1) / 3)], chk=[r'\frac34', r'\frac{1}{\sqrt[3]{2}}'], kind='q',
  note=r'$\mu=\int_0^13x^3\,dx$; $P(X\le m)=m^3=\tfrac12$', t='the median solves $m^3=\\tfrac12$', src=L44 + '9')
P(EV, V2, r'f(x)=3(1-x)^2\text{ on }[0,1].\ \text{Find the mean }\mu\text{ and median }m', r'\mu=\dfrac14,\ \ m=1-\dfrac{1}{\sqrt[3]{2}}',
  lambda: [quad(lambda x: 3 * x * (1 - x) ** 2, [0, 1]), 1 - 2 ** (-mpf(1) / 3)], chk=[r'\frac14', r'1-\frac{1}{\sqrt[3]{2}}'], kind='q',
  note=r'$P(X\le m)=1-(1-m)^3=\tfrac12$, so $(1-m)^3=\tfrac12$', t='$P(X\\le m)=1-(1-m)^3$', src=L44 + '10')
P(EV, V2, r'f(x)=4x^3\text{ on }[0,1].\ \text{Find the mean }\mu\text{ and median }m', r'\mu=\dfrac45,\ \ m=\dfrac{1}{\sqrt[4]{2}}',
  lambda: [quad(lambda x: 4 * x ** 4, [0, 1]), 2 ** (-mpf(1) / 4)], chk=[r'\frac45', r'\frac{1}{\sqrt[4]{2}}'], kind='q',
  note=r'$P(X\le m)=m^4=\tfrac12$', t='$P(X\\le m)=m^4$', src=L44 + '11')

# ---- variance
P(EV, V3, r'\rho(x)=\tfrac34(2x-x^2)\text{ on }[0,2].\ \text{Find the variance }\mathbb V(X)', r'\dfrac15',
  lambda: var(lambda x: mpf(3) / 4 * (2 * x - x ** 2), 0, 2),
  note=r'$\mu=\int_0^2\tfrac34x(2x-x^2)\,dx=1$; $E[X^2]=\int_0^2\tfrac34x^2(2x-x^2)\,dx=\tfrac65$', t='$\\sigma^2=E[X^2]-\\mu^2$', src=L44 + '5')
P(EV, V3, r'P(X>a)=C\ln\dfrac{a^3+1}{a^3}\text{ for every }a>1.\ \text{Find }C\text{, and decide whether }\mu\text{ is finite}', r'C=\dfrac{1}{\ln2},\ \ \mu\text{ is finite}',
  lambda: 1 / log(2), chk=[r'\frac{1}{\ln(2)}'], kind='q', truth=lambda: quad(lambda a: log(1 + a ** -3) / log(2), [1, inf]) < inf,
  note=r'$X>1$ always, so $P(X>1)=C\ln2=1$. The tail $C\ln(1+a^{-3})\approx Ca^{-3}$ decays fast enough for $\mu=1+\int_1^\infty P(X>a)\,da$ to converge', t='as $a\\to1^+$, $P(X>a)\\to1$', src=L44 + '6')

# ---- from a cumulative probability P(X < x): differentiate to get the density, then integrate x f(x)
def mean_cdf(F, a=0, b=1):
    return quad(lambda x: x * diff(F, x), [a, b])


CDFPS = [
    (r'P(X<x)=\dfrac4\pi\arctan x', lambda x: 4 / pi * mp.atan(x), r'\dfrac{2\ln(2)}{\pi}', r'f=\dfrac{4}{\pi}\cdot\dfrac{1}{1+x^2}; \ \mu=\dfrac4\pi\int_0^1\dfrac{x}{1+x^2}dx', '12'),
    (r'P(X<x)=\dfrac{1}{\ln2}\ln(1+x)', lambda x: log(1 + x) / log(2), r'\dfrac{1}{\ln(2)}-1', r'f=\dfrac{1}{\ln2}\cdot\dfrac{1}{1+x}; \ \mu=\dfrac{1}{\ln2}\int_0^1\dfrac{x}{1+x}dx=\dfrac{1-\ln2}{\ln2}', '13'),
    (r'P(X<x)=\dfrac{1}{\ln2}\ln\left(1+x^2\right)', lambda x: log(1 + x ** 2) / log(2), r'\dfrac{4-\pi}{2\ln(2)}', r'f=\dfrac{1}{\ln2}\cdot\dfrac{2x}{1+x^2}; \ \mu=\dfrac{2}{\ln2}\int_0^1\dfrac{x^2}{1+x^2}dx', '14'),
    (r'P(X<x)=\dfrac{2x}{1+x}', lambda x: 2 * x / (1 + x), r'2\ln(2)-1', r'f=\dfrac{2}{(1+x)^2}; \ \mu=\int_0^1\dfrac{2x}{(1+x)^2}dx=2\Big[\ln(1+x)+\dfrac{1}{1+x}\Big]_0^1', '15'),
    (r'P(X<x)=\dfrac43\left(1-\dfrac{1}{(1+x)^2}\right)', lambda x: mpf(4) / 3 * (1 - 1 / (1 + x) ** 2), r'\dfrac13', r'f=\dfrac{8}{3(1+x)^3}; \ \mu=\dfrac83\int_0^1\dfrac{x}{(1+x)^3}dx=\dfrac83\cdot\dfrac18', '16'),
    (r'P[X<t]=2^t-1', lambda x: 2 ** x - 1, r'2-\dfrac{1}{\ln(2)}', r'f=\ln2\cdot2^t; \ \mu=\int_0^1t\ln2\,2^t\,dt=\Big[t2^t-\dfrac{2^t}{\ln2}\Big]_0^1', '17'),
    (r'P[X<t]=\sin\left(\tfrac\pi2t\right)', lambda x: sin(pi * x / 2), r'1-\dfrac{2}{\pi}', r'f=\dfrac\pi2\cos\dfrac{\pi t}{2}; \ \mu=\int_0^1t\,f\,dt=\Big[t\sin\dfrac{\pi t}{2}\Big]_0^1-\int_0^1\sin\dfrac{\pi t}{2}dt', '18'),
]
for lhs, F, ans, work, n in CDFPS:
    P(EV, CDF, r'X\text{ takes values in }[0,1]\text{ and }' + lhs + r'.\ \text{Find the mean of }X', ans, (lambda F=F: mean_cdf(F)), chk=[ans],
      note='differentiate the cumulative probability to get the density, then integrate $xf(x)$: $' + work + '$', t='$f=\\dfrac{d}{dx}P(X<x)$', src=L44 + n)

# ---- discrete
P(EV, DIS, r'P(X=n)=\dfrac{12}{2\pi^2-9}\left(\dfrac1{n^2}-\dfrac{1}{n(n+2)}\right)\ (n=1,2,3,\dots).\ \text{Find }E[X]', r'\dfrac{18}{2\pi^2-9}',
  lambda: mp.nsum(lambda n: n * 12 / (2 * pi ** 2 - 9) * (1 / n ** 2 - 1 / (n * (n + 2))), [1, inf]), chk=[r'\frac{18}{2\pi^{2}-9}'],
  note=r'$nP(X=n)=\dfrac{12}{2\pi^2-9}\Big(\dfrac1n-\dfrac{1}{n+2}\Big)$, a telescoping sum equal to $\dfrac{12}{2\pi^2-9}\Big(1+\dfrac12\Big)$', t='telescoping series', src=L44 + '19')
P(EV, DIS, r'\text{A fair die shows }(-1)^{n+1}(2n)\text{ dollars on face }n.\ \text{Find }P(\text{you do not lose money})', r'\dfrac12',
  lambda: mpf(3) / 6, chk=[r'\frac12'], note=r'faces $1,3,5$ pay $+2,+6,+10$; faces $2,4,6$ lose $4,8,12$', t='which faces have positive payoff?', src=L44 + '20a')
P(EV, DIS, r'\text{Same die: find the expected earning}', r'-1',
  lambda: mpf(2 - 4 + 6 - 8 + 10 - 12) / 6, chk=['-1'], note=r'$\tfrac16(2-4+6-8+10-12)=-1$', t='$E=\\sum x\\,P(x)$', src=L44 + '20b')
P(EV, DIS, r'\text{Same die: write the variance with summation notation and evaluate it}', r'\sigma^2=\dfrac16\sum_{n=1}^{6}\left((-1)^{n+1}2n+1\right)^2=\dfrac{179}{3}',
  lambda: sum((((-1) ** (n + 1) * 2 * n + 1) ** 2) for n in range(1, 7)) / mpf(6), chk=[r'\frac{179}{3}'], kind='q',
  note=r'$\sigma^2=\sum_n P(n)\,(x_n-\mu)^2$ with $\mu=-1$, so each term is $(x_n+1)^2$: $9+9+49+49+121+121=358$, divided by $6$', t='$\\sigma^2=\\sum P(x)\\,(x-\\mu)^2$', src=L44 + '20c')

# ---------------------------------------------------------------- write
SECTIONS = [
    ('c_arc', 'Arc length & surface area', 'Length of a curve and the area of a surface of revolution. Every answer is the exact value; the note shows the integral.'),
    ('c_avg', 'Averages & centroids', 'Average value, centroids of regions, and centers of mass with a density.'),
    ('c_pdf', 'Probability densities', 'Find the constant that makes f a density, then compute probabilities by integrating.'),
    ('c_ev', 'Expectation & variance', 'Mean, median, variance and standard deviation of a continuous random variable.'),
]
GROUPS = {}
for sec, grp, item in PROBLEMS:
    GROUPS.setdefault(sec, {}).setdefault(grp, []).append(item)
ORDER = {   # chapter order, referenced by index in quest.js
    'c_arc': [G1, G2, G3, G4, SETUP],
    'c_avg': [H1, TF, AC, H2, H3, CMP, SET2],
    'c_pdf': [D1, D2, GEO],
    'c_ev': [V1, V2, V3, CDF, DIS]}
for sec, order in ORDER.items():
    assert set(GROUPS[sec]) == set(order), (sec, set(GROUPS[sec]) ^ set(order))
    GROUPS[sec] = {g: GROUPS[sec][g] for g in order}
sections = [{'id': i, 'title': t, 'blurb': b, 'groups': [{'t': g, 'items': its} for g, its in GROUPS.get(i, {}).items()]} for i, t, b in SECTIONS]

if FAILS:
    print('FAILED:', *FAILS, sep='\n  '); sys.exit(1)
quiz5 = sorted(int(it['src'][len(Q5):]) for _, _, it in PROBLEMS if it.get('src', '').startswith(Q5))
assert quiz5 == list(range(1, 26)), quiz5
with open(OUT, 'w') as f:
    f.write('/* Generated by build/calc_build.py. Do not edit. */\nwindow.CALC=' + json.dumps({'meta': {'total': len(PROBLEMS)}, 'sections': sections}, ensure_ascii=False, separators=(',', ':')) + ';\n')
setups = sum(1 for _, _, it in PROBLEMS if it['tex'].startswith(r'\text{Set up'))
print(f'{len(PROBLEMS)} problems verified ({setups} typed set-up integrals cross-checked numerically); all 25 Quiz 5 questions present; wrote calcdata.js')
