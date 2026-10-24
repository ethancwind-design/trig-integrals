from common import *

def D(full, val_tex, f, a, b, val, p=None, quad='quad', **kw):
    return DI(full, val_tex, f, a, b, val, p=p, quad=quad, m=kw.pop('m', ['definite']), **kw)

NN = [dict(n=k) for k in (1, 2, 3, 4, 5, 6, 7)]
basic = G('Over a period or half-period', [
    D(r'\int_0^{\pi}\sin x\,dx', r'2', 'sin(x)', '0', 'pi', '2'),
    D(r'\int_0^{\pi/2}\sin x\,dx=\int_0^{\pi/2}\cos x\,dx', r'1', 'sin(x)', '0', 'pi/2', '1'),
    D(r'\int_0^{2\pi}\sin^2x\,dx=\int_0^{2\pi}\cos^2x\,dx', r'\pi', 'sin(x)**2', '0', '2*pi', 'pi'),
    D(r'\int_0^{\pi/2}\sin^2x\,dx=\int_0^{\pi/2}\cos^2x\,dx', r'\dfrac\pi4', 'sin(x)**2', '0', 'pi/2', 'pi/4'),
    D(r'\int_0^{\pi/4}\tan x\,dx', r'\tfrac12\ln2', 'tan(x)', '0', 'pi/4', 'log(2)/2'),
    D(r'\int_0^{\pi/4}\sec^2x\,dx', r'1', 'sec(x)**2', '0', 'pi/4', '1'),
    D(r'\int_0^{\pi/4}\sec x\,dx', r'\ln(1+\sqrt2)', 'sec(x)', '0', 'pi/4', 'log(1+sqrt(2))'),
    D(r'\int_0^{\pi/3}\sec^3x\,dx', r'\sqrt3+\tfrac12\ln(2+\sqrt3)', 'sec(x)**3', '0', 'pi/3', 'sqrt(3)+log(2+sqrt(3))/2'),
    D(r'\int_0^{\pi/4}\tan^2x\,dx', r'1-\dfrac\pi4', 'tan(x)**2', '0', 'pi/4', '1-pi/4'),
    D(r'\int_{-\pi}^{\pi}x\sin x\,dx', r'2\pi', 'x*sin(x)', '-pi', 'pi', '2*pi'),
    D(r'\int_0^{\pi}x\sin x\,dx', r'\pi', 'x*sin(x)', '0', 'pi', 'pi'),
    D(r'\int_0^{\pi}x^2\cos x\,dx', r'-2\pi', 'x**2*cos(x)', '0', 'pi', '-2*pi'),
    D(r'\int_0^{\pi/2}\sin x\cos x\,dx', r'\tfrac12', 'sin(x)*cos(x)', '0', 'pi/2', '1/2'),
    D(r'\int_0^{\pi/2}\sin^3x\,dx', r'\dfrac23', 'sin(x)**3', '0', 'pi/2', '2/3'),
    D(r'\int_0^{\pi/2}\sin^4x\,dx', r'\dfrac{3\pi}{16}', 'sin(x)**4', '0', 'pi/2', '3*pi/16'),
    D(r'\int_0^{\pi/2}\sin^2x\cos^2x\,dx', r'\dfrac\pi{16}', 'sin(x)**2*cos(x)**2', '0', 'pi/2', 'pi/16'),
    D(r'\int_0^1\arcsin x\,dx', r'\dfrac\pi2-1', 'asin(x)', '0', '1', 'pi/2-1'),
    D(r'\int_0^1\arctan x\,dx', r'\dfrac\pi4-\tfrac12\ln2', 'atan(x)', '0', '1', 'pi/4-log(2)/2'),
    D(r'\int_{-a}^{a}\sqrt{a^2-x^2}\,dx', r'\dfrac{\pi a^2}{2}', 'sqrt(a**2-x**2)', '-a', 'a', 'pi*a**2/2', p=[dict(a=2.0), dict(a=1.3)], m=['trigsub', 'definite'], t='area of a semicircle'),
    D(r'\int_0^{a}\dfrac{dx}{\sqrt{a^2-x^2}}', r'\dfrac\pi2', '1/sqrt(a**2-x**2)', '0', 'a', 'pi/2', p=[dict(a=2.0), dict(a=1.3)], quad='hi', tol=1e-7, m=['trigsub', 'definite']),
    D(r'\int_0^{\infty}\dfrac{dx}{x^2+a^2}', r'\dfrac{\pi}{2a}', '1/(x**2+a**2)', '0', 'inf', 'pi/(2*a)', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub', 'definite']),
])
wallis = G('Wallis & Beta integrals', [
    D(r'\int_0^{\pi/2}\sin^nx\,dx=\int_0^{\pi/2}\cos^nx\,dx=\dfrac{\sqrt\pi}{2}\,\dfrac{\Gamma\!\left(\frac{n+1}{2}\right)}{\Gamma\!\left(\frac n2+1\right)}', r'\text{all }n>-1', 'sin(x)**n', '0', 'pi/2', 'sqrt(pi)*gamma((n+1)/2)/(2*gamma(n/2+1))', p=NN + [dict(n=0.5), dict(n=2.5)], m=['definite', 'reduction'], t='Wallis'),
    D(r'\int_0^{\pi/2}\sin^{2k}x\,dx', r'\dfrac\pi2\cdot\dfrac{(2k-1)!!}{(2k)!!}=\dfrac\pi2\cdot\dfrac{1\cdot3\cdots(2k-1)}{2\cdot4\cdots2k}', 'sin(x)**(2*n)', '0', 'pi/2', 'pi/2*fac2(2*n-1)/fac2(2*n)', p=[dict(n=k) for k in (1, 2, 3, 4, 5)], m=['definite', 'reduction'], t='even powers'),
    D(r'\int_0^{\pi/2}\sin^{2k+1}x\,dx', r'\dfrac{(2k)!!}{(2k+1)!!}=\dfrac{2\cdot4\cdots2k}{3\cdot5\cdots(2k+1)}', 'sin(x)**(2*n+1)', '0', 'pi/2', 'fac2(2*n)/fac2(2*n+1)', p=[dict(n=k) for k in (1, 2, 3, 4, 5)], m=['definite', 'reduction'], t='odd powers'),
    D(r'\int_0^{\pi}\sin^nx\,dx', r'2\int_0^{\pi/2}\sin^nx\,dx=\sqrt\pi\,\dfrac{\Gamma\!\left(\frac{n+1}{2}\right)}{\Gamma\!\left(\frac n2+1\right)}', 'sin(x)**n', '0', 'pi', 'sqrt(pi)*gamma((n+1)/2)/gamma(n/2+1)', p=NN, m=['definite']),
    D(r'\int_0^{2\pi}\sin^{2k}x\,dx', r'2\pi\cdot\dfrac{(2k-1)!!}{(2k)!!}', 'sin(x)**(2*n)', '0', '2*pi', '2*pi*fac2(2*n-1)/fac2(2*n)', p=[dict(n=k) for k in (1, 2, 3, 4)], m=['definite']),
    D(r'\int_0^{\pi/2}\sin^px\cos^qx\,dx', r'\dfrac12B\!\left(\tfrac{p+1}{2},\tfrac{q+1}{2}\right)=\dfrac{\Gamma\!\left(\frac{p+1}2\right)\Gamma\!\left(\frac{q+1}2\right)}{2\,\Gamma\!\left(\frac{p+q}2+1\right)}', 'sin(x)**p*cos(x)**q', '0', 'pi/2', 'gamma((p+1)/2)*gamma((q+1)/2)/(2*gamma((p+q)/2+1))', p=[dict(p=2.0, q=3.0), dict(p=0.5, q=1.5), dict(p=4.0, q=4.0)], m=['definite'], t='Beta function'),
    D(r'\int_0^{\pi/2}\tan^px\,dx', r'\dfrac{\pi}{2\cos(\pi p/2)}\quad(|p|<1)', 'tan(x)**p', '0', 'pi/2', 'pi/(2*cos(pi*p/2))', p=[dict(p=0.5), dict(p=-0.3), dict(p=0.8)], quad='hi', tol=1e-5, m=['definite']),
    D(r'\int_0^{\pi/2}\sqrt{\tan x}\,dx', r'\dfrac\pi{\sqrt2}', 'sqrt(tan(x))', '0', 'pi/2', 'pi/sqrt(2)', m=['definite']),
])
orth = G('Orthogonality (Fourier series)', [
    D(r'\int_{-\pi}^{\pi}\sin mx\sin nx\,dx', r'\begin{cases}\pi&m=n\\0&m\ne n\end{cases}\quad(m,n\ge1)', 'sin(m*x)*sin(n*x)', '-pi', 'pi', 'pi if m==n else 0', p=[dict(m=2, n=2), dict(m=2, n=5), dict(m=3, n=1)], m=['definite'], t='orthogonality'),
    D(r'\int_{-\pi}^{\pi}\cos mx\cos nx\,dx', r'\begin{cases}\pi&m=n\ge1\\0&m\ne n\end{cases}', 'cos(m*x)*cos(n*x)', '-pi', 'pi', 'pi if m==n else 0', p=[dict(m=2, n=2), dict(m=2, n=5), dict(m=3, n=1)], m=['definite']),
    D(r'\int_{-\pi}^{\pi}\sin mx\cos nx\,dx', r'0', 'sin(m*x)*cos(n*x)', '-pi', 'pi', '0', p=[dict(m=2, n=2), dict(m=2, n=5), dict(m=3, n=1)], m=['definite']),
    D(r'\int_{0}^{\pi}\sin mx\sin nx\,dx', r'\begin{cases}\tfrac\pi2&m=n\\0&m\ne n\end{cases}', 'sin(m*x)*sin(n*x)', '0', 'pi', 'pi/2 if m==n else 0', p=[dict(m=2, n=2), dict(m=2, n=5), dict(m=3, n=1)], m=['definite']),
    D(r'\int_{-\pi}^{\pi}x\sin nx\,dx', r'\dfrac{2\pi(-1)^{n+1}}{n}', 'x*sin(n*x)', '-pi', 'pi', '2*pi*(-1)**(n+1)/n', p=[dict(n=k) for k in (1, 2, 3, 4)], m=['definite', 'parts'], t='Fourier coefficient of $f(x)=x$'),
    D(r'\int_{-\pi}^{\pi}x^2\cos nx\,dx', r'\dfrac{4\pi(-1)^n}{n^2}', 'x**2*cos(n*x)', '-pi', 'pi', '4*pi*(-1)**n/n**2', p=[dict(n=k) for k in (1, 2, 3, 4)], m=['definite', 'parts'], t='Fourier coefficient of $f(x)=x^2$'),
    D(r'\dfrac1\pi\int_0^{\pi}\cos(n\tau-x\sin\tau)\,d\tau', r'J_n(x)', 'cos(n*x-q*sin(x))/pi', '0', 'pi', 'besselj(n,q)', p=[dict(n=0, q=1.3), dict(n=2, q=1.3), dict(n=3, q=2.2)], m=['definite'], t='Bessel function (integral form)'),
])
rat = G('Rational in $\\sin,\\cos$ over a period', [
    D(r'\int_0^{2\pi}\dfrac{dx}{a+b\cos x}', r'\dfrac{2\pi}{\sqrt{a^2-b^2}}\quad(a>|b|)', '1/(a+b*cos(x))', '0', '2*pi', '2*pi/sqrt(a**2-b**2)', p=[dict(a=3.0, b=1.2), dict(a=2.5, b=-0.9)], m=['definite', 'weierstrass']),
    D(r'\int_0^{\pi}\dfrac{dx}{a+b\cos x}', r'\dfrac{\pi}{\sqrt{a^2-b^2}}\quad(a>|b|)', '1/(a+b*cos(x))', '0', 'pi', 'pi/sqrt(a**2-b**2)', p=[dict(a=3.0, b=1.2), dict(a=2.5, b=-0.9)], m=['definite', 'weierstrass']),
    D(r'\int_0^{2\pi}\dfrac{dx}{(a+b\cos x)^2}', r'\dfrac{2\pi a}{(a^2-b^2)^{3/2}}', '1/(a+b*cos(x))**2', '0', '2*pi', '2*pi*a/(a**2-b**2)**1.5', p=[dict(a=3.0, b=1.2), dict(a=2.5, b=-0.9)], m=['definite', 'weierstrass']),
    D(r'\int_0^{2\pi}\dfrac{dx}{a+b\sin x}', r'\dfrac{2\pi}{\sqrt{a^2-b^2}}\quad(a>|b|)', '1/(a+b*sin(x))', '0', '2*pi', '2*pi/sqrt(a**2-b**2)', p=[dict(a=3.0, b=1.2), dict(a=2.5, b=-0.9)], m=['definite', 'weierstrass']),
    D(r'\int_0^{2\pi}\dfrac{\cos nx}{1-2r\cos x+r^2}\,dx', r'\dfrac{2\pi r^n}{1-r^2}\quad(|r|<1)', 'cos(n*x)/(1-2*p*cos(x)+p**2)', '0', '2*pi', '2*pi*p**n/(1-p**2)', p=[dict(n=1, p=0.4), dict(n=3, p=0.6), dict(n=0, p=0.5)], m=['definite'], t='Poisson kernel'),
    D(r'\int_0^{\pi/2}\dfrac{\sin x}{\sin x+\cos x}\,dx', r'\dfrac\pi4', 'sin(x)/(sin(x)+cos(x))', '0', 'pi/2', 'pi/4', m=['definite'], t='the $x\\mapsto\\tfrac\\pi2-x$ trick'),
    D(r'\int_0^{\pi/2}\dfrac{dx}{1+\tan^px}', r'\dfrac\pi4\quad(\text{any }p)', '1/(1+tan(x)**p)', '0', 'pi/2', 'pi/4', p=[dict(p=1.0), dict(p=2.5), dict(p=-1.7)], m=['definite'], t='the $x\\mapsto\\tfrac\\pi2-x$ trick'),
    D(r'\int_0^{\pi}\dfrac{x\sin x}{1+\cos^2x}\,dx', r'\dfrac{\pi^2}{4}', 'x*sin(x)/(1+cos(x)**2)', '0', 'pi', 'pi**2/4', m=['definite'], t='the $x\\mapsto\\pi-x$ trick'),
    D(r'\int_0^{\pi/2}\dfrac{\cos x}{1+\sin^2x}\,dx', r'\dfrac\pi4', 'cos(x)/(1+sin(x)**2)', '0', 'pi/2', 'pi/4', m=['definite', 'usub']),
])
logs = G('Logarithms of trig functions', [
    D(r'\int_0^{\pi/2}\ln(\sin x)\,dx=\int_0^{\pi/2}\ln(\cos x)\,dx', r'-\dfrac\pi2\ln2', 'log(sin(x))', '0', 'pi/2', '-pi*log(2)/2', m=['definite'], t='Euler'),
    D(r'\int_0^{\pi}\ln(\sin x)\,dx', r'-\pi\ln2', 'log(sin(x))', '0', 'pi', '-pi*log(2)', m=['definite']),
    D(r'\int_0^{\pi/2}\ln(\tan x)\,dx', r'0', 'log(tan(x))', '0', 'pi/2', '0', m=['definite']),
    D(r'\int_0^{\pi/4}\ln(1+\tan x)\,dx', r'\dfrac{\pi}{8}\ln2', 'log(1+tan(x))', '0', 'pi/4', 'pi*log(2)/8', m=['definite']),
    D(r'\int_0^{\pi/2}x\cot x\,dx', r'\dfrac\pi2\ln2', 'x*cot(x)', '0', 'pi/2', 'pi*log(2)/2', m=['definite', 'parts']),
    D(r'\int_0^{\pi/2}\dfrac{x}{\sin x}\,dx', r'2G\quad(G=\text{Catalan}\approx0.91597)', 'x/sin(x)', '0', 'pi/2', '2*catalan', m=['definite']),
    D(r'\int_0^{\pi}\ln(1-2r\cos x+r^2)\,dx', r'0\quad(|r|<1)', 'log(1-2*p*cos(x)+p**2)', '0', 'pi', '0', p=[dict(p=0.4), dict(p=-0.7)], m=['definite']),
    D(r'\int_0^{\pi/2}\ln(1+\cos x)\,dx', r'2G-\dfrac{\pi}{2}\ln2', 'log(1+cos(x))', '0', 'pi/2', '2*catalan-pi*log(2)/2', m=['definite']),
    D(r'\int_0^{\pi/2}\dfrac{x^2}{\sin^2x}\,dx', r'\pi\ln2', 'x**2/sin(x)**2', '0', 'pi/2', 'pi*log(2)', m=['definite', 'parts']),
])
imp = G('Improper & oscillatory', [
    D(r'\int_0^\infty\dfrac{\sin x}{x}\,dx', r'\dfrac\pi2', 'sin(x)/x', '0', 'inf', 'pi/2', quad='osc:1', m=['definite'], t='Dirichlet'),
    D(r'\int_0^\infty\dfrac{\sin^2x}{x^2}\,dx', r'\dfrac\pi2', 'sin(x)**2/x**2', '0', 'inf', 'pi/2', quad='osc:2', tol=1e-4, m=['definite']),
    D(r'\int_0^\infty\dfrac{\sin^3x}{x^3}\,dx', r'\dfrac{3\pi}{8}', 'sin(x)**3/x**3', '0', 'inf', '3*pi/8', quad='osc:3', m=['definite']),
    D(r'\int_0^\infty\dfrac{1-\cos x}{x^2}\,dx', r'\dfrac\pi2', '(1-cos(x))/x**2', '0', 'inf', 'pi/2', quad='osc:1', tol=1e-4, m=['definite']),
    D(r'\int_0^\infty\dfrac{\cos ax-\cos bx}{x}\,dx', r'\ln\dfrac ba', '(cos(a*x)-cos(b*x))/x', '0', 'inf', 'log(b/a)', p=[dict(a=1.0, b=3.0), dict(a=2.0, b=0.5)], quad='osc:max(a,b)', m=['definite'], t='Frullani'),
    D(r'\int_0^\infty e^{-ax}\sin bx\,dx', r'\dfrac{b}{a^2+b^2}', 'exp(-a*x)*sin(b*x)', '0', 'inf', 'b/(a**2+b**2)', p=[dict(a=1.3, b=2.1), dict(a=0.6, b=-1.5)], m=['definite', 'parts']),
    D(r'\int_0^\infty e^{-ax}\cos bx\,dx', r'\dfrac{a}{a^2+b^2}', 'exp(-a*x)*cos(b*x)', '0', 'inf', 'a/(a**2+b**2)', p=[dict(a=1.3, b=2.1), dict(a=0.6, b=-1.5)], m=['definite', 'parts']),
    D(r'\int_0^\infty e^{-ax}\dfrac{\sin bx}{x}\,dx', r'\arctan\dfrac ba', 'exp(-a*x)*sin(b*x)/x', '0', 'inf', 'atan(b/a)', p=[dict(a=1.3, b=2.1), dict(a=0.6, b=1.5)], m=['definite']),
    D(r'\int_0^\infty\dfrac{\cos ax}{1+x^2}\,dx', r'\dfrac\pi2e^{-a}\quad(a\ge0)', 'cos(a*x)/(1+x**2)', '0', 'inf', 'pi*exp(-a)/2', p=[dict(a=0.8), dict(a=2.0)], quad='osc:a', m=['definite']),
    D(r'\int_0^\infty\dfrac{x\sin ax}{x^2+b^2}\,dx', r'\dfrac\pi2e^{-ab}\quad(a,b>0)', 'x*sin(a*x)/(x**2+b**2)', '0', 'inf', 'pi*exp(-a*b)/2', p=[dict(a=0.8, b=1.2), dict(a=1.5, b=0.7)], quad='osc:a', m=['definite']),
    D(r'\int_0^\infty\dfrac{\sin x}{x(1+x^2)}\,dx', r'\dfrac\pi2\left(1-e^{-1}\right)', 'sin(x)/(x*(1+x**2))', '0', 'inf', 'pi*(1-exp(-1))/2', quad='osc:1', m=['definite']),
    D(r'\int_0^\infty e^{-x^2}\cos(2bx)\,dx', r'\dfrac{\sqrt\pi}{2}e^{-b^2}', 'exp(-x**2)*cos(2*b*x)', '0', 'inf', 'sqrt(pi)*exp(-b**2)/2', p=[dict(b=0.6), dict(b=1.4)], m=['definite']),
    D(r'\int_0^\infty\dfrac{\sin x}{e^x-1}\,dx', r'\dfrac\pi2\coth\pi-\dfrac12', 'sin(x)/(exp(x)-1)', '0', 'inf', 'pi*coth(pi)/2-0.5', m=['definite']),
])
SECTIONS = [S('definite', 'Definite & improper integrals', 'Closed forms that come up again and again: Wallis, Beta, orthogonality, period integrals, the $x\\mapsto a-x$ symmetry tricks, and the classic improper integrals ($\\int_0^\\infty\\tfrac{\\sin x}{x}$, Frullani, Laplace-type). Each value was confirmed by numerical quadrature.', [basic, wallis, orth, rat, logs, imp])]
