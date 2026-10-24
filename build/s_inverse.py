from common import *

D = (0.1, 0.9)
inv = G('Inverse trig functions as the integrand', [
    I(r'\arcsin x', r'x\arcsin x+\sqrt{1-x^2}', 'asin(x)', 'x*asin(x)+sqrt(1-x**2)', d=D, m=['parts']),
    I(r'\arccos x', r'x\arccos x-\sqrt{1-x^2}', 'acos(x)', 'x*acos(x)-sqrt(1-x**2)', d=D, m=['parts']),
    I(r'\arctan x', r'x\arctan x-\tfrac12\ln(1+x^2)', 'atan(x)', 'x*atan(x)-log(1+x**2)/2', d=D, m=['parts']),
    I(r'\operatorname{arccot}x', r'x\operatorname{arccot}x+\tfrac12\ln(1+x^2)', 'acot(x)', 'x*acot(x)+log(1+x**2)/2', d=D, m=['parts']),
    I(r'\operatorname{arcsec}x', r'x\operatorname{arcsec}x-\ln\left(x+\sqrt{x^2-1}\right)\ (x>1)', 'asec(x)', 'x*asec(x)-log(x+sqrt(x**2-1))', d=(1.2, 3), m=['parts']),
    I(r'\operatorname{arccsc}x', r'x\operatorname{arccsc}x+\ln\left(x+\sqrt{x^2-1}\right)\ (x>1)', 'acsc(x)', 'x*acsc(x)+log(x+sqrt(x**2-1))', d=(1.2, 3), m=['parts']),
    I(r'\arcsin\tfrac xa', r'x\arcsin\tfrac xa+\sqrt{a^2-x^2}', 'asin(x/a)', 'x*asin(x/a)+sqrt(a**2-x**2)', p=[dict(a=2.0), dict(a=1.5)], d=(0.1, 1.2), m=['parts']),
    I(r'\arctan\tfrac xa', r'x\arctan\tfrac xa-\dfrac a2\ln(a^2+x^2)', 'atan(x/a)', 'x*atan(x/a)-a*log(a**2+x**2)/2', p=[dict(a=2.0), dict(a=0.8)], m=['parts']),
    I(r'\arcsin^2x', r'x\arcsin^2x+2\sqrt{1-x^2}\arcsin x-2x', 'asin(x)**2', 'x*asin(x)**2+2*sqrt(1-x**2)*asin(x)-2*x', d=D, m=['parts']),
    I(r'\arccos^2x', r'x\arccos^2x-2\sqrt{1-x^2}\arccos x-2x', 'acos(x)**2', 'x*acos(x)**2-2*sqrt(1-x**2)*acos(x)-2*x', d=D, m=['parts']),
])
xin = G('Powers of $x$ × inverse trig', [
    I(r'x\arcsin x', r'\left(\dfrac{x^2}{2}-\dfrac14\right)\arcsin x+\dfrac x4\sqrt{1-x^2}', 'x*asin(x)', '(x**2/2-0.25)*asin(x)+x*sqrt(1-x**2)/4', d=D, m=['parts', 'trigsub']),
    I(r'x\arccos x', r'\left(\dfrac{x^2}{2}-\dfrac14\right)\arccos x-\dfrac x4\sqrt{1-x^2}', 'x*acos(x)', '(x**2/2-0.25)*acos(x)-x*sqrt(1-x**2)/4', d=D, m=['parts', 'trigsub']),
    I(r'x\arctan x', r'\dfrac{x^2+1}{2}\arctan x-\dfrac x2', 'x*atan(x)', '(x**2+1)*atan(x)/2-x/2', d=D, m=['parts']),
    I(r'x^2\arcsin x', r'\dfrac{x^3}{3}\arcsin x+\dfrac{(x^2+2)\sqrt{1-x^2}}{9}', 'x**2*asin(x)', 'x**3*asin(x)/3+(x**2+2)*sqrt(1-x**2)/9', d=D, m=['parts', 'trigsub']),
    I(r'x^2\arctan x', r'\dfrac{x^3}{3}\arctan x-\dfrac{x^2}{6}+\dfrac16\ln(1+x^2)', 'x**2*atan(x)', 'x**3*atan(x)/3-x**2/6+log(1+x**2)/6', d=D, m=['parts']),
    I(r'x^3\arctan x', r'\dfrac{x^4-1}{4}\arctan x-\dfrac{x^3}{12}+\dfrac x4', 'x**3*atan(x)', '(x**4-1)*atan(x)/4-x**3/12+x/4', d=D, m=['parts']),
    I(r'x\operatorname{arcsec}x', r'\dfrac{x^2}{2}\operatorname{arcsec}x-\dfrac12\sqrt{x^2-1}\ (x>1)', 'x*asec(x)', 'x**2*asec(x)/2-sqrt(x**2-1)/2', d=(1.2, 3), m=['parts']),
    I(r'\dfrac{\arcsin x}{x^2}', r'-\dfrac{\arcsin x}{x}-\ln\left|\dfrac{1+\sqrt{1-x^2}}{x}\right|', 'asin(x)/x**2', '-asin(x)/x-log(abs((1+sqrt(1-x**2))/x))', d=D, m=['parts']),
    I(r'\dfrac{\arctan x}{x^2}', r'-\dfrac{\arctan x}{x}+\ln|x|-\tfrac12\ln(1+x^2)', 'atan(x)/x**2', '-atan(x)/x+log(abs(x))-log(1+x**2)/2', d=D, m=['parts']),
    I(r'\dfrac{\arcsin x}{\sqrt{1-x^2}}', r'\dfrac{\arcsin^2x}{2}', 'asin(x)/sqrt(1-x**2)', 'asin(x)**2/2', d=D, m=['usub']),
    I(r'\dfrac{\arctan x}{1+x^2}', r'\dfrac{\arctan^2x}{2}', 'atan(x)/(1+x**2)', 'atan(x)**2/2', d=D, m=['usub']),
    I(r'\dfrac{x\arcsin x}{\sqrt{1-x^2}}', r'x-\sqrt{1-x^2}\arcsin x', 'x*asin(x)/sqrt(1-x**2)', 'x-sqrt(1-x**2)*asin(x)', d=D, m=['parts']),
])
comp = G('Trig of inverse trig', [
    I(r'\sin(\arctan x)', r'\sqrt{1+x^2}', 'sin(atan(x))', 'sqrt(1+x**2)', d=D),
    I(r'\cos(\arctan x)', r'\operatorname{arsinh}x', 'cos(atan(x))', 'asinh(x)', d=D),
    I(r'\tan(\arcsin x)', r'-\sqrt{1-x^2}', 'tan(asin(x))', '-sqrt(1-x**2)', d=D),
    I(r'\cos(\arcsin x)', r'\dfrac12\left(x\sqrt{1-x^2}+\arcsin x\right)', 'cos(asin(x))', '(x*sqrt(1-x**2)+asin(x))/2', d=D),
    I(r'\sec(\arctan x)', r'\dfrac12\left(x\sqrt{1+x^2}+\operatorname{arsinh}x\right)', 'sec(atan(x))', '(x*sqrt(1+x**2)+asinh(x))/2', d=D),
    I(r'\sin(2\arctan x)', r'\ln(1+x^2)', 'sin(2*atan(x))', 'log(1+x**2)', d=D),
    I(r'\cos(2\arcsin x)', r'x-\dfrac{2x^3}{3}', 'cos(2*asin(x))', 'x-2*x**3/3', d=D),
    I(r'\sin(\arccos x)', r'\dfrac12\left(x\sqrt{1-x^2}+\arcsin x\right)', 'sin(acos(x))', '(x*sqrt(1-x**2)+asin(x))/2', d=D),
])
SECTIONS = [S('inverse', 'Inverse trig', 'Inverse trig functions integrate by parts ($u=\\arcsin x$, $dv=dx$), and the products with powers of $x$ do too. Trig functions of inverse trig functions collapse to algebra via the reference triangle.', [inv, xin, comp])]
