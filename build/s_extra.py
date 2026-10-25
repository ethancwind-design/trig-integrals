"""Partial fractions + area / volume / arc length problems (the MATH 1400 topics around the trig material).

Indefinite answers are differentiated, definite answers are integrated numerically, by build.py.
"""
from common import *

def D(prompt, val_tex, f, a, b, val, **kw):
    """Definite-value problem: the prompt is words/LaTeX, the answer is the exact value (checked by quadrature)."""
    kw.setdefault('m', ['definite'])
    return DI(prompt, val_tex, f, a, b, val, **kw)

pf1 = G('Distinct linear factors', [
    I(r'\dfrac{1}{(x-1)(x+2)}', r'\dfrac13\ln\left|\dfrac{x-1}{x+2}\right|', '1/((x-1)*(x+2))', 'log(abs((x-1)/(x+2)))/3', d=(1.2, 3), m=['partial'], t='$\\frac{A}{x-1}+\\frac{B}{x+2}$'),
    I(r'\dfrac{1}{x^2-5x+6}', r'\ln\left|\dfrac{x-3}{x-2}\right|', '1/(x**2-5*x+6)', 'log(abs((x-3)/(x-2)))', d=(3.3, 6), m=['partial'], t='factor: $(x-2)(x-3)$'),
    I(r'\dfrac{3x+5}{(x+1)(x+3)}', r'\ln|x+1|+2\ln|x+3|', '(3*x+5)/((x+1)*(x+3))', 'log(abs(x+1))+2*log(abs(x+3))', d=(0.2, 3), m=['partial'], t='cover-up: $A=1,\\ B=2$'),
    I(r'\dfrac{5x-3}{x^2-2x-3}', r'3\ln|x-3|+2\ln|x+1|', '(5*x-3)/(x**2-2*x-3)', '3*log(abs(x-3))+2*log(abs(x+1))', d=(3.3, 6), m=['partial'], t='factor: $(x-3)(x+1)$'),
    I(r'\dfrac{x+7}{x^2-x-6}', r'2\ln|x-3|-\ln|x+2|', '(x+7)/(x**2-x-6)', '2*log(abs(x-3))-log(abs(x+2))', d=(3.2, 6), m=['partial'], t='factor: $(x-3)(x+2)$'),
    I(r'\dfrac{1}{4x^2-9}', r'\dfrac1{12}\ln\left|\dfrac{2x-3}{2x+3}\right|', '1/(4*x**2-9)', 'log(abs((2*x-3)/(2*x+3)))/12', d=(1.6, 4), m=['partial'], t='$(2x-3)(2x+3)$, mind the $\\tfrac12$ from $\\int\\frac{dx}{2x\\pm3}$'),
])
pf2 = G('Repeated factors', [
    I(r'\dfrac{4}{x^2(x+2)}', r'\ln\left|\dfrac{x+2}{x}\right|-\dfrac2x', '4/(x**2*(x+2))', 'log(abs((x+2)/x))-2/x', d=(0.3, 3), m=['partial'], t='$\\frac{A}{x}+\\frac{B}{x^2}+\\frac{C}{x+2}$'),
    I(r'\dfrac{x^2+x+1}{x^2(x+1)}', r'-\dfrac1x+\ln|x+1|', '(x**2+x+1)/(x**2*(x+1))', '-1/x+log(abs(x+1))', d=(0.3, 3), m=['partial'], t='$A=0$: the $\\frac1x$ term is missing'),
    I(r'\dfrac{x^2+2x+3}{(x-1)(x+1)^2}', r'\dfrac32\ln|x-1|-\dfrac12\ln|x+1|+\dfrac1{x+1}', '(x**2+2*x+3)/((x-1)*(x+1)**2)', '1.5*log(abs(x-1))-0.5*log(abs(x+1))+1/(x+1)', d=(1.3, 4), m=['partial'], t='$\\frac{A}{x-1}+\\frac{B}{x+1}+\\frac{C}{(x+1)^2}$'),
])
pf3 = G('Irreducible quadratics & long division', [
    I(r'\dfrac{1}{x^2+2x+5}', r'\dfrac12\arctan\dfrac{x+1}{2}', '1/(x**2+2*x+5)', 'atan((x+1)/2)/2', d=(-3, 3), m=['partial', 'complete-square'], t='complete the square: $(x+1)^2+4$'),
    I(r'\dfrac{2x+1}{x^2+4x+5}', r'\ln(x^2+4x+5)-3\arctan(x+2)', '(2*x+1)/(x**2+4*x+5)', 'log(x**2+4*x+5)-3*atan(x+2)', d=(-1, 3), m=['partial', 'complete-square'], t='$2x+1=(2x+4)-3$'),
    I(r'\dfrac{1}{x(x^2+1)}', r'\ln|x|-\tfrac12\ln(x^2+1)', '1/(x*(x**2+1))', 'log(abs(x))-log(x**2+1)/2', d=(0.3, 4), m=['partial'], t='$\\frac{A}{x}+\\frac{Bx+C}{x^2+1}$'),
    I(r'\dfrac{3x^2+2x+4}{x(x^2+4)}', r'\ln|x|+\ln(x^2+4)+\arctan\dfrac x2', '(3*x**2+2*x+4)/(x*(x**2+4))', 'log(abs(x))+log(x**2+4)+atan(x/2)', d=(0.3, 4), m=['partial'], t='$A=1,\\ B=2,\\ C=2$'),
    I(r'\dfrac{x^3}{x^2-1}', r'\dfrac{x^2}{2}+\tfrac12\ln|x^2-1|', 'x**3/(x**2-1)', 'x**2/2+log(abs(x**2-1))/2', d=(1.3, 4), m=['partial'], t='degree top $\\ge$ bottom: divide first, $x+\\frac{x}{x^2-1}$'),
    I(r'\dfrac{x^3+2x}{x^2+1}', r'\dfrac{x^2}{2}+\tfrac12\ln(x^2+1)', '(x**3+2*x)/(x**2+1)', 'x**2/2+log(x**2+1)/2', d=(0.2, 4), m=['partial'], t='divide first: $x+\\frac{x}{x^2+1}$'),
])
PF = S('frac', 'Partial fractions', 'Rational functions: divide first if the top is as big as the bottom, factor the denominator, set up one term per factor (one per power for repeats; $Ax+B$ over each irreducible quadratic), solve, integrate.', [pf1, pf2, pf3])

area = G('Area between curves', [
    D(r'\text{Area between }y=x^2\text{ and }y=x+2', r'\dfrac92', 'x+2-x**2', '-1', '2', '9/2', t='intersections $x=-1,2$', note=r'$\int_{-1}^{2}(x+2-x^2)\,dx$'),
    D(r'\text{Area between }y=1-x^2\text{ and }y=x-1', r'\dfrac92', '1-x**2-(x-1)', '-2', '1', '9/2', t='intersections $x=-2,1$', src='MATH 1400 · Lectures 30–31 #10', note=r'$\int_{-2}^{1}(2-x-x^2)\,dx$'),
    D(r'\text{Area between }x=y^2\text{ and }y=2-x', r'\dfrac92', '2-x-x**2', '-2', '1', '9/2', t='horizontal slices: $\\int(\\text{right}-\\text{left})\\,dy$', src='MATH 1400 · Lectures 30–31 #11', note=r'$\int_{-2}^{1}\big((2-y)-y^2\big)\,dy$'),
    D(r'\text{Area between }y=x^3-x\text{ and }y=x-x^3', r'1', 'abs(2*x-2*x**3)', '-1', '1', '1', quad='split', t='the curves cross at $x=0$: split', src='MATH 1400 · Lectures 30–31 #5', note=r'$2\int_0^1 2(x-x^3)\,dx$'),
    D(r'\text{Area between }y=\sin x\text{ and }y=\cos x,\ 0\le x\le\tfrac\pi2', r'2(\sqrt2-1)', 'abs(sin(x)-cos(x))', '0', 'pi/2', '2*(sqrt(2)-1)', quad='split', t='cross at $x=\\tfrac\\pi4$'),
    D(r'\text{Area between }y=e^x\text{ and }y=e^{-x},\ 0\le x\le1', r'e+e^{-1}-2', 'exp(x)-exp(-x)', '0', '1', 'e+exp(-1)-2'),
    D(r'\text{Area under }y=(1-x^2)^{3/2},\ 0\le x\le1', r'\dfrac{3\pi}{16}', '(1-x**2)**1.5', '0', '1', '3*pi/16', quad='hi', t='$x=\\sin\\theta\\Rightarrow\\int\\cos^4\\theta\\,d\\theta$', m=['trigsub', 'definite'], src='MATH 1400 · Lectures 32–33 #13'),
    D(r'\text{Area under }y=(1-x^2)^{5/2},\ 0\le x\le1', r'\dfrac{5\pi}{32}', '(1-x**2)**2.5', '0', '1', '5*pi/32', quad='hi', t='$\\int\\cos^6\\theta\\,d\\theta$', m=['trigsub', 'definite'], src='MATH 1400 · Lectures 32–33 #14'),
    D(r'\text{Area under }y=(1-x^2)^{7/2},\ 0\le x\le1', r'\dfrac{35\pi}{256}', '(1-x**2)**3.5', '0', '1', '35*pi/256', quad='hi', t='$\\int\\cos^8\\theta\\,d\\theta$', m=['trigsub', 'definite'], src='MATH 1400 · Lectures 32–33 #15'),
    D(r'\text{Area inside the cardioid }r=2+2\cos\theta', r'6\pi', '0.5*(2+2*cos(x))**2', '0', '2*pi', '6*pi', t='$\\tfrac12\\int r^2\\,d\\theta$', m=['definite', 'identity']),
    D(r'\text{Area of one petal of }r=\cos2\theta', r'\dfrac\pi8', '0.5*cos(2*x)**2', '-pi/4', 'pi/4', 'pi/8', t='petal: $-\\tfrac\\pi4\\le\\theta\\le\\tfrac\\pi4$', m=['definite', 'identity']),
])
gini = G('Gini index (Lorenz curve)', [
    D(r'G\text{ for }L(x)=x^2', r'\dfrac13', '2*(x-x**2)', '0', '1', '1/3', t='$G=2\\int_0^1(x-L(x))\\,dx$'),
    D(r'G\text{ for }L(x)=x^3', r'\dfrac12', '2*(x-x**3)', '0', '1', '1/2', t='$G=2\\int_0^1(x-L(x))\\,dx$'),
    D(r'G\text{ for }L(x)=x^p', r'\dfrac{p-1}{p+1}', '2*(x-x**p)', '0', '1', '(p-1)/(p+1)', p=[dict(p=2.0), dict(p=5.0), dict(p=1.5)], t='any power $p>1$'),
])
vol = G('Volumes of revolution & cross-sections', [
    D(r'V\text{: }y=\sqrt x,\ 0\le x\le4,\text{ about the }x\text{-axis}', r'8\pi', 'pi*x', '0', '4', '8*pi', t='disks: $\\pi\\int R^2\\,dx$'),
    D(r'V\text{: }y=x^2,\ 0\le x\le2,\text{ about the }x\text{-axis}', r'\dfrac{32\pi}{5}', 'pi*x**4', '0', '2', '32*pi/5', t='disks'),
    D(r'V\text{: }y=x^2,\ 0\le x\le2,\text{ about the }y\text{-axis}', r'8\pi', '2*pi*x*x**2', '0', '2', '8*pi', t='shells: $2\\pi\\int x\\,h(x)\\,dx$'),
    D(r'V\text{: between }y=x\text{ and }y=x^2,\text{ about the }x\text{-axis}', r'\dfrac{2\pi}{15}', 'pi*(x**2-x**4)', '0', '1', '2*pi/15', t='washers: $\\pi\\int(R^2-r^2)\\,dx$'),
    D(r'V\text{: }y=1-x^2,\ x\ge0,\ y\ge0,\text{ about the }x\text{-axis}', r'\dfrac{8\pi}{15}', 'pi*(1-x**2)**2', '0', '1', '8*pi/15', t='disks'),
    D(r'V\text{: }y=\sin x,\ 0\le x\le\pi,\text{ about the }y\text{-axis}', r'2\pi^2', '2*pi*x*sin(x)', '0', 'pi', '2*pi**2', t='shells, then by parts', m=['definite', 'parts']),
    D(r'V\text{ of a sphere of radius }r', r'\dfrac43\pi r^3', 'pi*(r**2-x**2)', '-r', 'r', '4*pi*r**3/3', p=[dict(r=3.0), dict(r=1.7)], t='disks of radius $\\sqrt{r^2-x^2}$'),
    D(r'V\text{: base the disk }x^2+y^2\le4,\text{ square cross-sections }\perp x\text{-axis}', r'\dfrac{128}{3}', '4*(4-x**2)', '-2', '2', '128/3', t='side $=2\\sqrt{4-x^2}$'),
])
arc = G('Arc length', [
    D(r'\text{Length of }y=x^{3/2},\ 0\le x\le4', r'\dfrac{8}{27}\left(10\sqrt{10}-1\right)', 'sqrt(1+9*x/4)', '0', '4', '8*(10*sqrt(10)-1)/27', t='$\\int\\sqrt{1+(y\')^2}\\,dx$'),
    D(r'\text{Length of }y=\ln(\cos x),\ 0\le x\le\tfrac\pi4', r'\ln(1+\sqrt2)', 'sec(x)', '0', 'pi/4', 'log(1+sqrt(2))', t='$1+\\tan^2x=\\sec^2x$', m=['definite', 'identity']),
    D(r'\text{Length of }y=\tfrac{x^2}{2},\ 0\le x\le1', r'\tfrac12\sqrt2+\tfrac12\ln(1+\sqrt2)', 'sqrt(1+x**2)', '0', '1', 'sqrt(2)/2+log(1+sqrt(2))/2', t='$x=\\tan\\theta$', m=['trigsub', 'definite']),
])
AV = S('areavol', 'Area, volume & arc length', 'Setups that end in the integrals above: area between curves (vertical and horizontal slices, polar wedges), the Gini index, disks / washers / shells / cross-sections, and arc length. Each answer is the exact value; the note shows the integral.', [area, gini, vol, arc])

SECTIONS = [PF, AV]
