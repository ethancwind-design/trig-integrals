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


def P(sec, grp, tex, r, num, note='', t='', src='', kind='d', chk=None):
    """kind 'd': the answer is shown as "= r"; kind 'q': r is shown as written. chk = list of LaTeX strings when r has several parts."""
    chk = chk or [r]
    want = num() if callable(num) else num
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
sections = [{'id': i, 'title': t, 'blurb': b, 'groups': [{'t': g, 'items': its} for g, its in GROUPS.get(i, {}).items()]} for i, t, b in SECTIONS]

if FAILS:
    print('FAILED:', *FAILS, sep='\n  '); sys.exit(1)
quiz5 = sorted(int(m.group(1)) for _, _, it in PROBLEMS for m in [re.search(r'#(\d+)$', it.get('src', ''))] if m)
assert quiz5 == list(range(1, 26)), quiz5
with open(OUT, 'w') as f:
    f.write('/* Generated by build/calc_build.py. Do not edit. */\nwindow.CALC=' + json.dumps({'meta': {'total': len(PROBLEMS)}, 'sections': sections}, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(f'{len(PROBLEMS)} problems verified; all 25 Quiz 5 questions present; wrote calcdata.js')
