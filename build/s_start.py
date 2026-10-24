from common import *

R = r'\\'  # unused helper

# ---------------------------------------------------------------- strategy
strategy = G('Read the integrand, pick the move', [
    TXT(r'<b>Odd power of $\sin$ or $\cos$</b><p>Peel one factor off, convert the rest with $\sin^2+\cos^2=1$, then $u=\cos x$ (or $\sin x$).</p><p class="eg">$\int\sin^3x\,dx$, $\int\sin^2x\cos^3x\,dx$</p>', t='sin / cos · odd'),
    TXT(r'<b>Only even powers</b><p>Power-reduce with $\sin^2x=\tfrac{1-\cos2x}{2}$, $\cos^2x=\tfrac{1+\cos2x}{2}$, repeat until nothing is squared.</p><p class="eg">$\int\sin^4x\,dx$, $\int\sin^2x\cos^2x\,dx$</p>', t='sin / cos · even'),
    TXT(r'<b>$\tan^m x\sec^n x$, $n$ even</b><p>Save $\sec^2x$, turn the other secants into $1+\tan^2x$, $u=\tan x$.</p><p class="eg">$\int\tan^4x\sec^4x\,dx$</p>', t='tan / sec · n even'),
    TXT(r'<b>$\tan^m x\sec^n x$, $m$ odd</b><p>Save $\sec x\tan x$, turn the other tangents into $\sec^2x-1$, $u=\sec x$.</p><p class="eg">$\int\tan^5x\sec^3x\,dx$</p>', t='tan / sec · m odd'),
    TXT(r'<b>$m$ even and $n$ odd (no easy $u$)</b><p>Write everything as powers of $\sec x$, then use the secant reduction formula (or by parts).</p><p class="eg">$\int\tan^2x\sec x\,dx$, $\int\sec^3x\,dx$</p>', t='tan / sec · hard case'),
    TXT(r'<b>Different angles: $\sin ax\cos bx$ …</b><p>Product-to-sum, then integrate each cosine or sine.</p><p class="eg">$\int\sin3x\cos5x\,dx$</p>', t='product-to-sum'),
    TXT(r'<b>$\sqrt{a^2-x^2}$, $\sqrt{a^2+x^2}$, $\sqrt{x^2-a^2}$</b><p>Trig substitution $x=a\sin\theta$, $a\tan\theta$, $a\sec\theta$. Draw the reference triangle to get back to $x$.</p><p class="eg">$\int\frac{dx}{(x^2+4)^{3/2}}$ · see the animated lesson</p>', t='trig substitution'),
    TXT(r'<b>$ax^2+bx+c$ inside a root or a denominator</b><p>Complete the square first, then it is one of the three radicals (or an arctan).</p><p class="eg">$\int\frac{dx}{\sqrt{4x-x^2}}$</p>', t='complete the square'),
    TXT(r'<b>Rational function of $\sin x,\cos x$</b><p>Odd in $\sin$: $u=\cos x$. Odd in $\cos$: $u=\sin x$. Even in both: $u=\tan x$. Otherwise the universal $t=\tan\tfrac x2$.</p><p class="eg">$\int\frac{dx}{2+\cos x}$</p>', t='Weierstrass'),
    TXT(r'<b>Polynomial or $e^{ax}$ times a trig function</b><p>By parts. For $x^n\sin x$ use the tabular method; for $e^{ax}\sin bx$ go round twice and solve for the integral.</p><p class="eg">$\int x^2\cos x\,dx$, $\int e^{2x}\sin3x\,dx$</p>', t='integration by parts'),
    TXT(r'<b>Inverse trig as the integrand</b><p>By parts with $u=\arcsin x$ (etc.), $dv=dx$.</p><p class="eg">$\int\arctan x\,dx$</p>', t='inverse trig'),
    TXT(r'<b>Trig of a function times its derivative</b><p>Plain $u$-substitution. Look for $f^{\prime}(x)$ sitting next to $\sin f(x)$, $\sec^2f(x)$, …</p><p class="eg">$\int\sin(\ln x)\,\tfrac{dx}{x}$</p>', t='u-substitution'),
    TXT(r'<b>Nothing works?</b><p>Many trig integrals have <em>no</em> elementary antiderivative ($\int\tfrac{\sin x}{x}dx$, $\int\sqrt{\sin x}\,dx$). See “No elementary form”.</p>', t='give up gracefully'),
], cols=3)

# ---------------------------------------------------------------- identities
pyth = G('Pythagorean', [
    ID(r'\sin^2x+\cos^2x=1', 'sin(x)**2+cos(x)**2', '1'),
    ID(r'1+\tan^2x=\sec^2x', '1+tan(x)**2', 'sec(x)**2', m=['trigsub']),
    ID(r'1+\cot^2x=\csc^2x', '1+cot(x)**2', 'csc(x)**2'),
    ID(r'\sec^2x-\tan^2x=1', 'sec(x)**2-tan(x)**2', '1', m=['trigsub'], t='the one for $x=a\\sec\\theta$'),
    ID(r'1-\sin^2x=\cos^2x', '1-sin(x)**2', 'cos(x)**2', m=['trigsub'], t='the one for $x=a\\sin\\theta$'),
])
recip = G('Reciprocal & quotient', [
    ID(r'\tan x=\dfrac{\sin x}{\cos x}', 'tan(x)', 'sin(x)/cos(x)'),
    ID(r'\cot x=\dfrac{\cos x}{\sin x}=\dfrac1{\tan x}', 'cot(x)', 'cos(x)/sin(x)'),
    ID(r'\sec x=\dfrac1{\cos x}', 'sec(x)', '1/cos(x)'),
    ID(r'\csc x=\dfrac1{\sin x}', 'csc(x)', '1/sin(x)'),
])
parity = G('Parity, cofunction, shifts', [
    ID(r'\sin(-x)=-\sin x', 'sin(-x)', '-sin(x)'),
    ID(r'\cos(-x)=\cos x', 'cos(-x)', 'cos(x)'),
    ID(r'\tan(-x)=-\tan x', 'tan(-x)', '-tan(x)'),
    ID(r'\sin\!\left(\tfrac\pi2-x\right)=\cos x', 'sin(pi/2-x)', 'cos(x)'),
    ID(r'\cos\!\left(\tfrac\pi2-x\right)=\sin x', 'cos(pi/2-x)', 'sin(x)'),
    ID(r'\tan\!\left(\tfrac\pi2-x\right)=\cot x', 'tan(pi/2-x)', 'cot(x)'),
    ID(r'\sin(\pi-x)=\sin x', 'sin(pi-x)', 'sin(x)'),
    ID(r'\cos(\pi-x)=-\cos x', 'cos(pi-x)', '-cos(x)'),
    ID(r'\sin(x+\pi)=-\sin x', 'sin(x+pi)', '-sin(x)'),
    ID(r'\tan(x+\pi)=\tan x', 'tan(x+pi)', 'tan(x)'),
])
suma = G('Sum & difference', [
    ID(r'\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta', 'sin(a+b)', 'sin(a)*cos(b)+cos(a)*sin(b)'),
    ID(r'\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta', 'cos(a+b)', 'cos(a)*cos(b)-sin(a)*sin(b)'),
    ID(r'\tan(\alpha\pm\beta)=\dfrac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}', 'tan(a+b)', '(tan(a)+tan(b))/(1-tan(a)*tan(b))', p=[dict(a=0.3, b=0.4), dict(a=0.5, b=0.2)]),
])
dbl = G('Double & triple angle', [
    ID(r'\sin2x=2\sin x\cos x', 'sin(2*x)', '2*sin(x)*cos(x)', m=['identity']),
    ID(r'\cos2x=\cos^2x-\sin^2x', 'cos(2*x)', 'cos(x)**2-sin(x)**2', m=['identity']),
    ID(r'\cos2x=2\cos^2x-1', 'cos(2*x)', '2*cos(x)**2-1', m=['identity']),
    ID(r'\cos2x=1-2\sin^2x', 'cos(2*x)', '1-2*sin(x)**2', m=['identity']),
    ID(r'\tan2x=\dfrac{2\tan x}{1-\tan^2x}', 'tan(2*x)', '2*tan(x)/(1-tan(x)**2)', d=(0.1, 0.6)),
    ID(r'\sin3x=3\sin x-4\sin^3x', 'sin(3*x)', '3*sin(x)-4*sin(x)**3'),
    ID(r'\cos3x=4\cos^3x-3\cos x', 'cos(3*x)', '4*cos(x)**3-3*cos(x)'),
    ID(r'\tan3x=\dfrac{3\tan x-\tan^3x}{1-3\tan^2x}', 'tan(3*x)', '(3*tan(x)-tan(x)**3)/(1-3*tan(x)**2)', d=(0.1, 0.5)),
])
red = G('Power-reducing & half-angle', [
    ID(r'\sin^2x=\dfrac{1-\cos2x}{2}', 'sin(x)**2', '(1-cos(2*x))/2', m=['identity']),
    ID(r'\cos^2x=\dfrac{1+\cos2x}{2}', 'cos(x)**2', '(1+cos(2*x))/2', m=['identity']),
    ID(r'\tan^2x=\dfrac{1-\cos2x}{1+\cos2x}', 'tan(x)**2', '(1-cos(2*x))/(1+cos(2*x))'),
    ID(r'\sin x\cos x=\tfrac12\sin2x', 'sin(x)*cos(x)', 'sin(2*x)/2'),
    ID(r'\sin^2x\cos^2x=\dfrac{1-\cos4x}{8}', 'sin(x)**2*cos(x)**2', '(1-cos(4*x))/8'),
    ID(r'\sin^3x=\dfrac{3\sin x-\sin3x}{4}', 'sin(x)**3', '(3*sin(x)-sin(3*x))/4'),
    ID(r'\cos^3x=\dfrac{3\cos x+\cos3x}{4}', 'cos(x)**3', '(3*cos(x)+cos(3*x))/4'),
    ID(r'\sin^4x=\dfrac{3-4\cos2x+\cos4x}{8}', 'sin(x)**4', '(3-4*cos(2*x)+cos(4*x))/8'),
    ID(r'\cos^4x=\dfrac{3+4\cos2x+\cos4x}{8}', 'cos(x)**4', '(3+4*cos(2*x)+cos(4*x))/8'),
    ID(r'\sin^5x=\dfrac{10\sin x-5\sin3x+\sin5x}{16}', 'sin(x)**5', '(10*sin(x)-5*sin(3*x)+sin(5*x))/16'),
    ID(r'\cos^5x=\dfrac{10\cos x+5\cos3x+\cos5x}{16}', 'cos(x)**5', '(10*cos(x)+5*cos(3*x)+cos(5*x))/16'),
    ID(r'\sin\tfrac x2=\sqrt{\dfrac{1-\cos x}{2}}\quad(0<x<2\pi)', 'sin(x/2)', 'sqrt((1-cos(x))/2)'),
    ID(r'\cos\tfrac x2=\sqrt{\dfrac{1+\cos x}{2}}\quad(|x|<\pi)', 'cos(x/2)', 'sqrt((1+cos(x))/2)'),
    ID(r'\tan\tfrac x2=\dfrac{\sin x}{1+\cos x}=\dfrac{1-\cos x}{\sin x}', 'tan(x/2)', 'sin(x)/(1+cos(x))'),
])
prod = G('Product ⇄ sum', [
    ID(r'\sin\alpha\cos\beta=\tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]', 'sin(a)*cos(b)', '(sin(a+b)+sin(a-b))/2', m=['identity']),
    ID(r'\cos\alpha\sin\beta=\tfrac12[\sin(\alpha+\beta)-\sin(\alpha-\beta)]', 'cos(a)*sin(b)', '(sin(a+b)-sin(a-b))/2', m=['identity']),
    ID(r'\cos\alpha\cos\beta=\tfrac12[\cos(\alpha-\beta)+\cos(\alpha+\beta)]', 'cos(a)*cos(b)', '(cos(a-b)+cos(a+b))/2', m=['identity']),
    ID(r'\sin\alpha\sin\beta=\tfrac12[\cos(\alpha-\beta)-\cos(\alpha+\beta)]', 'sin(a)*sin(b)', '(cos(a-b)-cos(a+b))/2', m=['identity']),
    ID(r'\sin\alpha+\sin\beta=2\sin\tfrac{\alpha+\beta}2\cos\tfrac{\alpha-\beta}2', 'sin(a)+sin(b)', '2*sin((a+b)/2)*cos((a-b)/2)'),
    ID(r'\sin\alpha-\sin\beta=2\cos\tfrac{\alpha+\beta}2\sin\tfrac{\alpha-\beta}2', 'sin(a)-sin(b)', '2*cos((a+b)/2)*sin((a-b)/2)'),
    ID(r'\cos\alpha+\cos\beta=2\cos\tfrac{\alpha+\beta}2\cos\tfrac{\alpha-\beta}2', 'cos(a)+cos(b)', '2*cos((a+b)/2)*cos((a-b)/2)'),
    ID(r'\cos\alpha-\cos\beta=-2\sin\tfrac{\alpha+\beta}2\sin\tfrac{\alpha-\beta}2', 'cos(a)-cos(b)', '-2*sin((a+b)/2)*sin((a-b)/2)'),
])
weier = G('Weierstrass ($t=\\tan\\tfrac x2$) & Euler', [
    ID(r'\sin x=\dfrac{2t}{1+t^2}', 'sin(x)', '2*tan(x/2)/(1+tan(x/2)**2)', m=['weierstrass']),
    ID(r'\cos x=\dfrac{1-t^2}{1+t^2}', 'cos(x)', '(1-tan(x/2)**2)/(1+tan(x/2)**2)', m=['weierstrass']),
    ID(r'\tan x=\dfrac{2t}{1-t^2}', 'tan(x)', '2*tan(x/2)/(1-tan(x/2)**2)', m=['weierstrass']),
    TXT(r'<b>The differential:</b> $dx=\dfrac{2\,dt}{1+t^2}$, so every rational function of $\sin x,\cos x$ becomes a rational function of $t$.', t='dx'),
    ID(r'e^{ix}=\cos x+i\sin x', 'exp(1j*x)', 'cos(x)+1j*sin(x)'),
    ID(r'\sin x=\dfrac{e^{ix}-e^{-ix}}{2i}', 'sin(x)', '(exp(1j*x)-exp(-1j*x))/(2j)'),
    ID(r'\cos x=\dfrac{e^{ix}+e^{-ix}}{2}', 'cos(x)', '(exp(1j*x)+exp(-1j*x))/2'),
    ID(r'\sin(ix)=i\sinh x,\quad\cos(ix)=\cosh x', 'sin(1j*x)', '1j*sinh(x)'),
])
invid = G('Inverse trig identities', [
    ID(r'\arcsin x+\arccos x=\tfrac\pi2', 'asin(x)+acos(x)', 'pi/2', d=(0.1, 0.9)),
    ID(r'\arctan x+\arctan\tfrac1x=\tfrac\pi2\ (x>0)', 'atan(x)+atan(1/x)', 'pi/2', d=(0.1, 0.9)),
    ID(r'\sin(\arccos x)=\cos(\arcsin x)=\sqrt{1-x^2}', 'sin(acos(x))', 'sqrt(1-x**2)', d=(0.1, 0.9)),
    ID(r'\tan(\arcsin x)=\dfrac{x}{\sqrt{1-x^2}}', 'tan(asin(x))', 'x/sqrt(1-x**2)', d=(0.1, 0.9)),
    ID(r'\sin(\arctan x)=\dfrac{x}{\sqrt{1+x^2}},\quad\cos(\arctan x)=\dfrac1{\sqrt{1+x^2}}', 'sin(atan(x))', 'x/sqrt(1+x**2)', d=(0.1, 0.9)),
    ID(r'\arcsin x=\arctan\dfrac{x}{\sqrt{1-x^2}}', 'asin(x)', 'atan(x/sqrt(1-x**2))', d=(0.1, 0.9)),
    ID(r'\operatorname{arcsec}x=\arccos\tfrac1x', 'asec(x)', 'acos(1/x)', d=(1.2, 3)),
])
hypid = G('Hyperbolic identities', [
    ID(r'\cosh^2x-\sinh^2x=1', 'cosh(x)**2-sinh(x)**2', '1'),
    ID(r'1-\tanh^2x=\operatorname{sech}^2x', '1-tanh(x)**2', 'sech(x)**2'),
    ID(r'\coth^2x-1=\operatorname{csch}^2x', 'coth(x)**2-1', 'csch(x)**2'),
    ID(r'\sinh2x=2\sinh x\cosh x', 'sinh(2*x)', '2*sinh(x)*cosh(x)'),
    ID(r'\cosh2x=\cosh^2x+\sinh^2x', 'cosh(2*x)', 'cosh(x)**2+sinh(x)**2'),
    ID(r'\sinh^2x=\dfrac{\cosh2x-1}{2}', 'sinh(x)**2', '(cosh(2*x)-1)/2'),
    ID(r'\cosh^2x=\dfrac{\cosh2x+1}{2}', 'cosh(x)**2', '(cosh(2*x)+1)/2'),
    ID(r'\operatorname{arsinh}x=\ln\!\left(x+\sqrt{x^2+1}\right)', 'asinh(x)', 'log(x+sqrt(x**2+1))'),
    ID(r'\operatorname{arcosh}x=\ln\!\left(x+\sqrt{x^2-1}\right)\ (x\ge1)', 'acosh(x)', 'log(x+sqrt(x**2-1))', d=(1.2, 3)),
    ID(r'\operatorname{artanh}x=\tfrac12\ln\dfrac{1+x}{1-x}', 'atanh(x)', 'log((1+x)/(1-x))/2', d=(0.1, 0.9)),
])

# ---------------------------------------------------------------- derivatives
ders = G('Derivatives (the integrals read backwards)', [
    DER(r'\sin x', r'\cos x', 'sin(x)', 'cos(x)'),
    DER(r'\cos x', r'-\sin x', 'cos(x)', '-sin(x)'),
    DER(r'\tan x', r'\sec^2x', 'tan(x)', 'sec(x)**2'),
    DER(r'\cot x', r'-\csc^2x', 'cot(x)', '-csc(x)**2'),
    DER(r'\sec x', r'\sec x\tan x', 'sec(x)', 'sec(x)*tan(x)'),
    DER(r'\csc x', r'-\csc x\cot x', 'csc(x)', '-csc(x)*cot(x)'),
    DER(r'\arcsin x', r'\dfrac1{\sqrt{1-x^2}}', 'asin(x)', '1/sqrt(1-x**2)', d=(0.1, 0.9)),
    DER(r'\arccos x', r'-\dfrac1{\sqrt{1-x^2}}', 'acos(x)', '-1/sqrt(1-x**2)', d=(0.1, 0.9)),
    DER(r'\arctan x', r'\dfrac1{1+x^2}', 'atan(x)', '1/(1+x**2)'),
    DER(r'\operatorname{arccot}x', r'-\dfrac1{1+x^2}', 'acot(x)', '-1/(1+x**2)'),
    DER(r'\operatorname{arcsec}x', r'\dfrac1{x\sqrt{x^2-1}}\ (x>1)', 'asec(x)', '1/(x*sqrt(x**2-1))', d=(1.2, 3)),
    DER(r'\operatorname{arccsc}x', r'-\dfrac1{x\sqrt{x^2-1}}\ (x>1)', 'acsc(x)', '-1/(x*sqrt(x**2-1))', d=(1.2, 3)),
    DER(r'\sinh x', r'\cosh x', 'sinh(x)', 'cosh(x)'),
    DER(r'\cosh x', r'\sinh x', 'cosh(x)', 'sinh(x)'),
    DER(r'\tanh x', r'\operatorname{sech}^2x', 'tanh(x)', 'sech(x)**2'),
    DER(r'\operatorname{arsinh}x', r'\dfrac1{\sqrt{x^2+1}}', 'asinh(x)', '1/sqrt(x**2+1)'),
    DER(r'\operatorname{arcosh}x', r'\dfrac1{\sqrt{x^2-1}}\ (x>1)', 'acosh(x)', '1/sqrt(x**2-1)', d=(1.2, 3)),
    DER(r'\operatorname{artanh}x', r'\dfrac1{1-x^2}\ (|x|<1)', 'atanh(x)', '1/(1-x**2)', d=(0.1, 0.9)),
], cols=2)

SECTIONS = [
    S('strategy', 'Which method?', 'Look at the integrand, then pick a row. Every technique has its own section, and every formula in this site was checked numerically before it shipped.', [strategy]),
    S('identities', 'Identities', 'Every identity that shows up when you integrate trig functions. The highlighted tags show which technique each one powers.', [pyth, recip, parity, suma, dbl, red, prod, weier, invid, hypid]),
    S('derivatives', 'Derivative table', 'Integration is the derivative table run backwards. Keep this open next to the integrals.', [ders]),
]
