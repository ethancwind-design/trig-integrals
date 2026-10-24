from common import *

A = [dict(a=2.0), dict(a=3.0)]
DI_ = (0.2, 1.8)    # |x| < a for a=2
DII = (0.3, 2.5)
DIII = (2.3, 4.5)   # x > a for a=2
DIII3 = (3.4, 6.0)

def S1(i, r, f, F, **kw):   # a^2 - x^2 : x = a sin
    return I(i, r, f, F, p=[dict(a=2.0), dict(a=3.0)], d=(0.2, 1.8), m=['trigsub'], **kw)
def S2(i, r, f, F, **kw):   # a^2 + x^2 : x = a tan
    return I(i, r, f, F, p=[dict(a=2.0), dict(a=0.7)], d=(0.3, 2.5), m=['trigsub'], **kw)
def S3(i, r, f, F, **kw):   # x^2 - a^2 : x = a sec
    return I(i, r, f, F, p=[dict(a=2.0), dict(a=1.5)], d=(2.3, 4.5), m=['trigsub'], **kw)

L1 = r'\ln\left(x+\sqrt{x^2+a^2}\right)'
L1f = 'log(x+sqrt(x**2+a**2))'
L3 = r'\ln\left|x+\sqrt{x^2-a^2}\right|'
L3f = 'log(abs(x+sqrt(x**2-a**2)))'

type1 = G('Type I · $\\sqrt{a^2-x^2}$ · $x=a\\sin\\theta$ · radical $\\to a\\cos\\theta$', [
    S1(r'\sqrt{a^2-x^2}', r'\dfrac x2\sqrt{a^2-x^2}+\dfrac{a^2}{2}\arcsin\dfrac xa', 'sqrt(a**2-x**2)', 'x*sqrt(a**2-x**2)/2+a**2*asin(x/a)/2', t='area of a circle segment'),
    S1(r'\dfrac1{\sqrt{a^2-x^2}}', r'\arcsin\dfrac xa', '1/sqrt(a**2-x**2)', 'asin(x/a)'),
    S1(r'\dfrac{x}{\sqrt{a^2-x^2}}', r'-\sqrt{a^2-x^2}', 'x/sqrt(a**2-x**2)', '-sqrt(a**2-x**2)', t='plain $u$-sub'),
    S1(r'x\sqrt{a^2-x^2}', r'-\dfrac13(a^2-x^2)^{3/2}', 'x*sqrt(a**2-x**2)', '-(a**2-x**2)**1.5/3', t='plain $u$-sub'),
    S1(r'\dfrac{x^2}{\sqrt{a^2-x^2}}', r'-\dfrac x2\sqrt{a^2-x^2}+\dfrac{a^2}{2}\arcsin\dfrac xa', 'x**2/sqrt(a**2-x**2)', '-x*sqrt(a**2-x**2)/2+a**2*asin(x/a)/2'),
    S1(r'\dfrac{x^3}{\sqrt{a^2-x^2}}', r'-\dfrac13(x^2+2a^2)\sqrt{a^2-x^2}', 'x**3/sqrt(a**2-x**2)', '-(x**2+2*a**2)*sqrt(a**2-x**2)/3'),
    S1(r'x^2\sqrt{a^2-x^2}', r'\dfrac x8(2x^2-a^2)\sqrt{a^2-x^2}+\dfrac{a^4}{8}\arcsin\dfrac xa', 'x**2*sqrt(a**2-x**2)', 'x*(2*x**2-a**2)*sqrt(a**2-x**2)/8+a**4*asin(x/a)/8'),
    S1(r'(a^2-x^2)^{3/2}', r'\dfrac x8(5a^2-2x^2)\sqrt{a^2-x^2}+\dfrac{3a^4}{8}\arcsin\dfrac xa', '(a**2-x**2)**1.5', 'x*(5*a**2-2*x**2)*sqrt(a**2-x**2)/8+3*a**4*asin(x/a)/8'),
    S1(r'\dfrac{\sqrt{a^2-x^2}}{x}', r'\sqrt{a^2-x^2}-a\ln\left|\dfrac{a+\sqrt{a^2-x^2}}{x}\right|', 'sqrt(a**2-x**2)/x', 'sqrt(a**2-x**2)-a*log(abs((a+sqrt(a**2-x**2))/x))'),
    S1(r'\dfrac{\sqrt{a^2-x^2}}{x^2}', r'-\dfrac{\sqrt{a^2-x^2}}{x}-\arcsin\dfrac xa', 'sqrt(a**2-x**2)/x**2', '-sqrt(a**2-x**2)/x-asin(x/a)'),
    S1(r'\dfrac{\sqrt{a^2-x^2}}{x^3}', r'-\dfrac{\sqrt{a^2-x^2}}{2x^2}+\dfrac1{2a}\ln\left|\dfrac{a+\sqrt{a^2-x^2}}{x}\right|', 'sqrt(a**2-x**2)/x**3', '-sqrt(a**2-x**2)/(2*x**2)+log(abs((a+sqrt(a**2-x**2))/x))/(2*a)'),
    S1(r'\dfrac1{x\sqrt{a^2-x^2}}', r'-\dfrac1a\ln\left|\dfrac{a+\sqrt{a^2-x^2}}{x}\right|', '1/(x*sqrt(a**2-x**2))', '-log(abs((a+sqrt(a**2-x**2))/x))/a'),
    S1(r'\dfrac1{x^2\sqrt{a^2-x^2}}', r'-\dfrac{\sqrt{a^2-x^2}}{a^2x}', '1/(x**2*sqrt(a**2-x**2))', '-sqrt(a**2-x**2)/(a**2*x)'),
    S1(r'\dfrac1{x^3\sqrt{a^2-x^2}}', r'-\dfrac{\sqrt{a^2-x^2}}{2a^2x^2}-\dfrac1{2a^3}\ln\left|\dfrac{a+\sqrt{a^2-x^2}}{x}\right|', '1/(x**3*sqrt(a**2-x**2))', '-sqrt(a**2-x**2)/(2*a**2*x**2)-log(abs((a+sqrt(a**2-x**2))/x))/(2*a**3)'),
    S1(r'\dfrac1{(a^2-x^2)^{3/2}}', r'\dfrac{x}{a^2\sqrt{a^2-x^2}}', '1/(a**2-x**2)**1.5', 'x/(a**2*sqrt(a**2-x**2))'),
    S1(r'\dfrac{x^2}{(a^2-x^2)^{3/2}}', r'\dfrac{x}{\sqrt{a^2-x^2}}-\arcsin\dfrac xa', 'x**2/(a**2-x**2)**1.5', 'x/sqrt(a**2-x**2)-asin(x/a)'),
])
type1['items'] = [i for i in type1['items'] if i['k'] != 'txt']

type2 = G('Type II · $\\sqrt{a^2+x^2}$ · $x=a\\tan\\theta$ · radical $\\to a\\sec\\theta$', [
    S2(r'\sqrt{x^2+a^2}', rf'\dfrac x2\sqrt{{x^2+a^2}}+\dfrac{{a^2}}{{2}}{L1}', 'sqrt(x**2+a**2)', f'x*sqrt(x**2+a**2)/2+a**2*{L1f}/2'),
    S2(r'\dfrac1{\sqrt{x^2+a^2}}', rf'{L1}=\operatorname{{arsinh}}\dfrac xa', '1/sqrt(x**2+a**2)', L1f),
    S2(r'\dfrac{x}{\sqrt{x^2+a^2}}', r'\sqrt{x^2+a^2}', 'x/sqrt(x**2+a**2)', 'sqrt(x**2+a**2)', t='plain $u$-sub'),
    S2(r'x\sqrt{x^2+a^2}', r'\dfrac13(x^2+a^2)^{3/2}', 'x*sqrt(x**2+a**2)', '(x**2+a**2)**1.5/3', t='plain $u$-sub'),
    S2(r'\dfrac{x^2}{\sqrt{x^2+a^2}}', rf'\dfrac x2\sqrt{{x^2+a^2}}-\dfrac{{a^2}}{{2}}{L1}', 'x**2/sqrt(x**2+a**2)', f'x*sqrt(x**2+a**2)/2-a**2*{L1f}/2'),
    S2(r'\dfrac{x^3}{\sqrt{x^2+a^2}}', r'\dfrac13(x^2-2a^2)\sqrt{x^2+a^2}', 'x**3/sqrt(x**2+a**2)', '(x**2-2*a**2)*sqrt(x**2+a**2)/3'),
    S2(r'x^2\sqrt{x^2+a^2}', rf'\dfrac x8(2x^2+a^2)\sqrt{{x^2+a^2}}-\dfrac{{a^4}}{{8}}{L1}', 'x**2*sqrt(x**2+a**2)', f'x*(2*x**2+a**2)*sqrt(x**2+a**2)/8-a**4*{L1f}/8'),
    S2(r'(x^2+a^2)^{3/2}', rf'\dfrac x8(2x^2+5a^2)\sqrt{{x^2+a^2}}+\dfrac{{3a^4}}{{8}}{L1}', '(x**2+a**2)**1.5', f'x*(2*x**2+5*a**2)*sqrt(x**2+a**2)/8+3*a**4*{L1f}/8'),
    S2(r'\dfrac{\sqrt{x^2+a^2}}{x}', r'\sqrt{x^2+a^2}-a\ln\left|\dfrac{a+\sqrt{x^2+a^2}}{x}\right|', 'sqrt(x**2+a**2)/x', 'sqrt(x**2+a**2)-a*log(abs((a+sqrt(x**2+a**2))/x))'),
    S2(r'\dfrac{\sqrt{x^2+a^2}}{x^2}', rf'-\dfrac{{\sqrt{{x^2+a^2}}}}{{x}}+{L1}', 'sqrt(x**2+a**2)/x**2', f'-sqrt(x**2+a**2)/x+{L1f}'),
    S2(r'\dfrac1{x\sqrt{x^2+a^2}}', r'-\dfrac1a\ln\left|\dfrac{a+\sqrt{x^2+a^2}}{x}\right|', '1/(x*sqrt(x**2+a**2))', '-log(abs((a+sqrt(x**2+a**2))/x))/a'),
    S2(r'\dfrac1{x^2\sqrt{x^2+a^2}}', r'-\dfrac{\sqrt{x^2+a^2}}{a^2x}', '1/(x**2*sqrt(x**2+a**2))', '-sqrt(x**2+a**2)/(a**2*x)'),
    S2(r'\dfrac1{(x^2+a^2)^{3/2}}', r'\dfrac{x}{a^2\sqrt{x^2+a^2}}', '1/(x**2+a**2)**1.5', 'x/(a**2*sqrt(x**2+a**2))'),
    S2(r'\dfrac{x^2}{(x^2+a^2)^{3/2}}', rf'-\dfrac{{x}}{{\sqrt{{x^2+a^2}}}}+{L1}', 'x**2/(x**2+a**2)**1.5', f'-x/sqrt(x**2+a**2)+{L1f}'),
    S2(r'\dfrac{x^4}{(x^2+a^2)^{7/2}}', r'\dfrac{x^5}{5a^2(x^2+a^2)^{5/2}}', 'x**4/(x**2+a**2)**3.5', 'x**5/(5*a**2*(x**2+a**2)**2.5)', t='Lecture 23 · #11'),
    S2(r'\dfrac1{(x^2+a^2)^{5/2}}', r'\dfrac{x}{a^4\sqrt{x^2+a^2}}-\dfrac{x^3}{3a^4(x^2+a^2)^{3/2}}', '1/(x**2+a**2)**2.5', 'x/(a**4*sqrt(x**2+a**2))-x**3/(3*a**4*(x**2+a**2)**1.5)'),
])
type3 = G('Type III · $\\sqrt{x^2-a^2}$ · $x=a\\sec\\theta$ · radical $\\to\\pm a\\tan\\theta$ (here $x>a$)', [
    S3(r'\sqrt{x^2-a^2}', rf'\dfrac x2\sqrt{{x^2-a^2}}-\dfrac{{a^2}}{{2}}{L3}', 'sqrt(x**2-a**2)', f'x*sqrt(x**2-a**2)/2-a**2*{L3f}/2'),
    S3(r'\dfrac1{\sqrt{x^2-a^2}}', rf'{L3}=\operatorname{{arcosh}}\dfrac xa', '1/sqrt(x**2-a**2)', L3f),
    S3(r'\dfrac{x}{\sqrt{x^2-a^2}}', r'\sqrt{x^2-a^2}', 'x/sqrt(x**2-a**2)', 'sqrt(x**2-a**2)', t='plain $u$-sub'),
    S3(r'x\sqrt{x^2-a^2}', r'\dfrac13(x^2-a^2)^{3/2}', 'x*sqrt(x**2-a**2)', '(x**2-a**2)**1.5/3', t='plain $u$-sub'),
    S3(r'\dfrac{x^2}{\sqrt{x^2-a^2}}', rf'\dfrac x2\sqrt{{x^2-a^2}}+\dfrac{{a^2}}{{2}}{L3}', 'x**2/sqrt(x**2-a**2)', f'x*sqrt(x**2-a**2)/2+a**2*{L3f}/2'),
    S3(r'\dfrac{x^3}{\sqrt{x^2-a^2}}', r'\dfrac13(x^2+2a^2)\sqrt{x^2-a^2}', 'x**3/sqrt(x**2-a**2)', '(x**2+2*a**2)*sqrt(x**2-a**2)/3'),
    S3(r'x^2\sqrt{x^2-a^2}', rf'\dfrac x8(2x^2-a^2)\sqrt{{x^2-a^2}}-\dfrac{{a^4}}{{8}}{L3}', 'x**2*sqrt(x**2-a**2)', f'x*(2*x**2-a**2)*sqrt(x**2-a**2)/8-a**4*{L3f}/8'),
    S3(r'(x^2-a^2)^{3/2}', rf'\dfrac x8(2x^2-5a^2)\sqrt{{x^2-a^2}}+\dfrac{{3a^4}}{{8}}{L3}', '(x**2-a**2)**1.5', f'x*(2*x**2-5*a**2)*sqrt(x**2-a**2)/8+3*a**4*{L3f}/8'),
    S3(r'\dfrac{\sqrt{x^2-a^2}}{x}', r'\sqrt{x^2-a^2}-a\operatorname{arcsec}\dfrac xa', 'sqrt(x**2-a**2)/x', 'sqrt(x**2-a**2)-a*asec(x/a)', t='Lecture 23 · #4'),
    S3(r'\dfrac{\sqrt{x^2-a^2}}{x^2}', rf'-\dfrac{{\sqrt{{x^2-a^2}}}}{{x}}+{L3}', 'sqrt(x**2-a**2)/x**2', f'-sqrt(x**2-a**2)/x+{L3f}'),
    S3(r'\dfrac{\sqrt{x^2-a^2}}{x^4}', r'\dfrac{(x^2-a^2)^{3/2}}{3a^2x^3}', 'sqrt(x**2-a**2)/x**4', '(x**2-a**2)**1.5/(3*a**2*x**3)', t='Lecture 23 · #12'),
    S3(r'\dfrac1{x\sqrt{x^2-a^2}}', r'\dfrac1a\operatorname{arcsec}\dfrac xa', '1/(x*sqrt(x**2-a**2))', 'asec(x/a)/a'),
    S3(r'\dfrac1{x^2\sqrt{x^2-a^2}}', r'\dfrac{\sqrt{x^2-a^2}}{a^2x}', '1/(x**2*sqrt(x**2-a**2))', 'sqrt(x**2-a**2)/(a**2*x)', t='Lecture 23 · #10'),
    S3(r'\dfrac1{x^3\sqrt{x^2-a^2}}', r'\dfrac{\sqrt{x^2-a^2}}{2a^2x^2}+\dfrac1{2a^3}\operatorname{arcsec}\dfrac xa', '1/(x**3*sqrt(x**2-a**2))', 'sqrt(x**2-a**2)/(2*a**2*x**2)+asec(x/a)/(2*a**3)'),
    S3(r'\dfrac1{(x^2-a^2)^{3/2}}', r'-\dfrac{x}{a^2\sqrt{x^2-a^2}}', '1/(x**2-a**2)**1.5', '-x/(a**2*sqrt(x**2-a**2))', t='Lecture 23 · #14 (note the minus sign)'),
    S3(r'\dfrac{x^2}{(x^2-a^2)^{3/2}}', rf'-\dfrac{{x}}{{\sqrt{{x^2-a^2}}}}+{L3}', 'x**2/(x**2-a**2)**1.5', f'-x/sqrt(x**2-a**2)+{L3f}'),
])
cs_ = G('Complete the square first', [
    I(r'\dfrac1{\sqrt{c^2-(x-h)^2}}', r'\arcsin\dfrac{x-h}{c}', '1/sqrt(c**2-(x-b)**2)', 'asin((x-b)/c)', p=[dict(c=2.0, b=0.5), dict(c=3.0, b=-1.0)], d=(0.6, 1.4), m=['trigsub', 'complete-square']),
    I(r'\dfrac1{\sqrt{4x-x^2}}', r'\arcsin\dfrac{x-2}{2}', '1/sqrt(4*x-x**2)', 'asin((x-2)/2)', d=(0.4, 3.6), m=['trigsub', 'complete-square'], t='animated lesson · Example 6'),
    I(r'\dfrac1{\sqrt{x^2+2x+5}}', r'\operatorname{arsinh}\dfrac{x+1}{2}', '1/sqrt(x**2+2*x+5)', 'asinh((x+1)/2)', m=['trigsub', 'complete-square']),
    I(r'\dfrac1{\sqrt{x^2-4x+1}}', r'\ln\left|x-2+\sqrt{x^2-4x+1}\right|', '1/sqrt(x**2-4*x+1)', 'log(abs(x-2+sqrt(x**2-4*x+1)))', d=(4, 6), m=['trigsub', 'complete-square']),
    I(r'\dfrac1{x^2+2x+5}', r'\dfrac12\arctan\dfrac{x+1}{2}', '1/(x**2+2*x+5)', 'atan((x+1)/2)/2', m=['complete-square']),
    I(r'\dfrac1{x^2+bx+c}', r'\dfrac{2}{\sqrt{4c-b^2}}\arctan\dfrac{2x+b}{\sqrt{4c-b^2}}\quad(4c>b^2)', '1/(x**2+b*x+c)', '2*atan((2*x+b)/sqrt(4*c-b**2))/sqrt(4*c-b**2)', p=[dict(b=1.0, c=3.0), dict(b=-2.0, c=2.5)], m=['complete-square']),
    I(r'\dfrac1{x^2+bx+c}', r'\dfrac{1}{\sqrt{b^2-4c}}\ln\left|\dfrac{2x+b-\sqrt{b^2-4c}}{2x+b+\sqrt{b^2-4c}}\right|\quad(b^2>4c)', '1/(x**2+b*x+c)', 'log(abs((2*x+b-sqrt(b**2-4*c))/(2*x+b+sqrt(b**2-4*c))))/sqrt(b**2-4*c)', p=[dict(b=1.0, c=-3.0), dict(b=-4.0, c=1.0)], d=(2.0, 6.0), m=['complete-square', 'partial']),
    I(r'\dfrac{px+q}{x^2+bx+c}', r'\dfrac p2\ln|x^2+bx+c|+\dfrac{q-\frac{pb}{2}}{\sqrt{c-\frac{b^2}{4}}}\arctan\dfrac{x+\frac b2}{\sqrt{c-\frac{b^2}{4}}}', '(p*x+q)/(x**2+b*x+c)', 'p*log(abs(x**2+b*x+c))/2+(q-p*b/2)*atan((x+b/2)/sqrt(c-b**2/4))/sqrt(c-b**2/4)', p=[dict(p=3.0, q=1.0, b=2.0, c=5.0), dict(p=-1.0, q=2.5, b=1.0, c=3.0)], m=['complete-square', 'usub']),
    I(r'\dfrac1{\sqrt{ax^2+bx+c}}', r'\dfrac1{\sqrt a}\ln\left|2\sqrt{a}\sqrt{ax^2+bx+c}+2ax+b\right|\quad(a>0)', '1/sqrt(a*x**2+b*x+c)', 'log(abs(2*sqrt(a)*sqrt(a*x**2+b*x+c)+2*a*x+b))/sqrt(a)', p=[dict(a=2.0, b=1.0, c=3.0), dict(a=1.5, b=-1.0, c=2.0)], m=['complete-square']),
    I(r'\dfrac1{\sqrt{c+bx-ax^2}}', r'\dfrac1{\sqrt a}\arcsin\dfrac{2ax-b}{\sqrt{b^2+4ac}}\quad(a>0)', '1/sqrt(c+b*x-a*x**2)', 'asin((2*a*x-b)/sqrt(b**2+4*a*c))/sqrt(a)', p=[dict(a=2.0, b=1.0, c=3.0), dict(a=1.5, b=-1.0, c=2.0)], m=['complete-square']),
])
pw = G('$\\int\\dfrac{dx}{(x^2\\pm a^2)^n}$ in general', [
    RED(r'\int\dfrac{dx}{(x^2+a^2)^n}=\dfrac{x}{2a^2(n-1)(x^2+a^2)^{n-1}}+\dfrac{2n-3}{2a^2(n-1)}\int\dfrac{dx}{(x^2+a^2)^{n-1}}',
        'x/(2*a**2*(n-1)*(x**2+a**2)**(n-1))', '1/(x**2+a**2)**n', '1/(x**2+a**2)**(n-1)', '(2*n-3)/(2*a**2*(n-1))',
        [dict(a=2.0, n=k) for k in (2, 3, 4, 5)] + [dict(a=0.7, n=3)], m=['trigsub', 'reduction']),
    I(r'\dfrac1{x^2+a^2}', r'\dfrac1a\arctan\dfrac xa', '1/(x**2+a**2)', 'atan(x/a)/a', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub']),
    I(r'\dfrac1{(x^2+a^2)^2}', r'\dfrac{x}{2a^2(x^2+a^2)}+\dfrac1{2a^3}\arctan\dfrac xa', '1/(x**2+a**2)**2', 'x/(2*a**2*(x**2+a**2))+atan(x/a)/(2*a**3)', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub']),
    I(r'\dfrac1{(x^2+a^2)^3}', r'\dfrac{x}{4a^2(x^2+a^2)^2}+\dfrac{3x}{8a^4(x^2+a^2)}+\dfrac{3}{8a^5}\arctan\dfrac xa', '1/(x**2+a**2)**3', 'x/(4*a**2*(x**2+a**2)**2)+3*x/(8*a**4*(x**2+a**2))+3*atan(x/a)/(8*a**5)', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub']),
    I(r'\dfrac{x^2}{x^2+a^2}', r'x-a\arctan\dfrac xa', 'x**2/(x**2+a**2)', 'x-a*atan(x/a)', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub']),
    I(r'\dfrac{x^2}{(x^2+a^2)^2}', r'-\dfrac{x}{2(x^2+a^2)}+\dfrac1{2a}\arctan\dfrac xa', 'x**2/(x**2+a**2)**2', '-x/(2*(x**2+a**2))+atan(x/a)/(2*a)', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub']),
    I(r'\dfrac1{x^2(x^2+a^2)}', r'-\dfrac1{a^2x}-\dfrac1{a^3}\arctan\dfrac xa', '1/(x**2*(x**2+a**2))', '-1/(a**2*x)-atan(x/a)/a**3', p=[dict(a=2.0), dict(a=0.7)], m=['partial']),
    I(r'\dfrac1{a^2-x^2}', r'\dfrac1{2a}\ln\left|\dfrac{a+x}{a-x}\right|=\dfrac1a\operatorname{artanh}\dfrac xa\ (|x|<a)', '1/(a**2-x**2)', 'log(abs((a+x)/(a-x)))/(2*a)', p=[dict(a=2.0), dict(a=3.0)], d=(0.2, 1.8), m=['partial']),
    I(r'\dfrac1{x^2-a^2}', r'\dfrac1{2a}\ln\left|\dfrac{x-a}{x+a}\right|', '1/(x**2-a**2)', 'log(abs((x-a)/(x+a)))/(2*a)', p=[dict(a=2.0), dict(a=1.5)], d=(2.3, 4.5), m=['partial']),
    I(r'\dfrac{1}{(a^2-x^2)^2}', r'\dfrac{x}{2a^2(a^2-x^2)}+\dfrac{1}{4a^3}\ln\left|\dfrac{a+x}{a-x}\right|', '1/(a**2-x**2)**2', 'x/(2*a**2*(a**2-x**2))+log(abs((a+x)/(a-x)))/(4*a**3)', p=[dict(a=2.0), dict(a=3.0)], d=(0.2, 1.8), m=['partial']),
])
SECTIONS = [S('trigsub', 'Trigonometric substitution', 'The full catalog for the three radicals, in the same three-phase style as the animated lesson: substitute, integrate, come back to $x$ with the reference triangle. Constants $a>0$; Type III formulas are for $x>a$ (for $x<-a$ replace the $\\ln$ and $\\operatorname{arcsec}$ terms by their $|{\\cdot}|$ versions).', [type1, type2, type3, cs_, pw])]
