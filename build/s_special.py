from common import *

SI = [dict(a=1.3), dict(a=0.6)]
si = G('Sine & cosine integrals ($\\mathrm{Si}$, $\\mathrm{Ci}$)', [
    NE(r'\dfrac{\sin x}{x}', r'\operatorname{Si}(x)', 'sin(x)/x', 'Si(x)', t='sine integral'),
    NE(r'\dfrac{\cos x}{x}', r'\operatorname{Ci}(x)', 'cos(x)/x', 'Ci(x)', t='cosine integral'),
    NE(r'\dfrac{\sin ax}{x}', r'\operatorname{Si}(ax)', 'sin(a*x)/x', 'Si(a*x)', p=SI),
    NE(r'\dfrac{1-\cos x}{x}', r'\ln x-\operatorname{Ci}(x)', '(1-cos(x))/x', 'log(x)-Ci(x)'),
    NE(r'\dfrac{\sin^2x}{x}', r'\tfrac12\left(\ln x-\operatorname{Ci}(2x)\right)', 'sin(x)**2/x', '(log(x)-Ci(2*x))/2'),
    NE(r'\dfrac{\cos^2x}{x}', r'\tfrac12\left(\ln x+\operatorname{Ci}(2x)\right)', 'cos(x)**2/x', '(log(x)+Ci(2*x))/2'),
    NE(r'\dfrac{\sin x\cos x}{x}', r'\tfrac12\operatorname{Si}(2x)', 'sin(x)*cos(x)/x', 'Si(2*x)/2'),
    NE(r'\dfrac{\sin x}{x^2}', r'-\dfrac{\sin x}{x}+\operatorname{Ci}(x)', 'sin(x)/x**2', '-sin(x)/x+Ci(x)'),
    NE(r'\dfrac{\cos x}{x^2}', r'-\dfrac{\cos x}{x}-\operatorname{Si}(x)', 'cos(x)/x**2', '-cos(x)/x-Si(x)'),
    NE(r'\dfrac{\sin x}{x^3}', r'-\dfrac{\sin x}{2x^2}-\dfrac{\cos x}{2x}-\tfrac12\operatorname{Si}(x)', 'sin(x)/x**3', '-sin(x)/(2*x**2)-cos(x)/(2*x)-Si(x)/2'),
    NE(r'\dfrac{\sin x}{x+a}', r'\cos a\operatorname{Si}(x+a)-\sin a\operatorname{Ci}(x+a)', 'sin(x)/(x+a)', 'cos(a)*Si(x+a)-sin(a)*Ci(x+a)', p=SI),
    NE(r'\dfrac{\cos x}{x+a}', r'\cos a\operatorname{Ci}(x+a)+\sin a\operatorname{Si}(x+a)', 'cos(x)/(x+a)', 'cos(a)*Ci(x+a)+sin(a)*Si(x+a)', p=SI),
])
fr = G('Fresnel integrals', [
    NE(r'\sin(x^2)', r'\sqrt{\tfrac\pi2}\,S\!\left(x\sqrt{\tfrac2\pi}\right)', 'sin(x**2)', 'sqrt(pi/2)*S(x*sqrt(2/pi))', t='$S(z)=\\int_0^z\\sin\\tfrac{\\pi t^2}{2}dt$'),
    NE(r'\cos(x^2)', r'\sqrt{\tfrac\pi2}\,C\!\left(x\sqrt{\tfrac2\pi}\right)', 'cos(x**2)', 'sqrt(pi/2)*C(x*sqrt(2/pi))', t='$C(z)=\\int_0^z\\cos\\tfrac{\\pi t^2}{2}dt$'),
    NE(r'\dfrac{\sin x}{\sqrt x}', r'\sqrt{2\pi}\,S\!\left(\sqrt{\tfrac{2x}{\pi}}\right)', 'sin(x)/sqrt(x)', 'sqrt(2*pi)*S(sqrt(2*x/pi))'),
    NE(r'\dfrac{\cos x}{\sqrt x}', r'\sqrt{2\pi}\,C\!\left(\sqrt{\tfrac{2x}{\pi}}\right)', 'cos(x)/sqrt(x)', 'sqrt(2*pi)*C(sqrt(2*x/pi))'),
])
ell = G('Elliptic integrals ($m=k^2$)', [
    NE(r'\dfrac{1}{\sqrt{1-k^2\sin^2x}}', r'F(x\,|\,k^2)', '1/sqrt(1-k**2*sin(x)**2)', 'ellipf(x,k**2)', t='1st kind', p=[dict(k=0.5), dict(k=0.8)]),
    NE(r'\sqrt{1-k^2\sin^2x}', r'E(x\,|\,k^2)', 'sqrt(1-k**2*sin(x)**2)', 'ellipe(x,k**2)', t='2nd kind', p=[dict(k=0.5), dict(k=0.8)]),
    NE(r'\dfrac{1}{(1-n\sin^2x)\sqrt{1-k^2\sin^2x}}', r'\Pi(n;x\,|\,k^2)', '1/((1-n*sin(x)**2)*sqrt(1-k**2*sin(x)**2))', 'ellippi(n,x,k**2)', t='3rd kind', p=[dict(n=0.3, k=0.5), dict(n=0.6, k=0.7)]),
    NE(r'\sqrt{\sin x}', r'-2E\!\left(\tfrac\pi4-\tfrac x2\,\Big|\,2\right)', 'sqrt(sin(x))', '-2*ellipe(pi/4-x/2,2)'),
    NE(r'\dfrac1{\sqrt{\sin x}}', r'-2F\!\left(\tfrac\pi4-\tfrac x2\,\Big|\,2\right)', '1/sqrt(sin(x))', '-2*ellipf(pi/4-x/2,2)'),
    NE(r'\sqrt{\cos x}', r'2E\!\left(\tfrac x2\,\Big|\,2\right)', 'sqrt(cos(x))', '2*ellipe(x/2,2)'),
    NE(r'\dfrac1{\sqrt{\cos x}}', r'2F\!\left(\tfrac x2\,\Big|\,2\right)', '1/sqrt(cos(x))', '2*ellipf(x/2,2)'),
])
hyp = G('Any real power, via ${}_2F_1$', [
    NE(r'\sin^px', r'-\cos x\;{}_2F_1\!\left(\tfrac12,\tfrac{1-p}{2};\tfrac32;\cos^2x\right)', 'sin(x)**p', '-cos(x)*hyp2f1(0.5,(1-p)/2,1.5,cos(x)**2)', p=[dict(p=1.4), dict(p=2.2), dict(p=-0.5)], t='any real $p$'),
    NE(r'\cos^px', r'\sin x\;{}_2F_1\!\left(\tfrac12,\tfrac{1-p}{2};\tfrac32;\sin^2x\right)', 'cos(x)**p', 'sin(x)*hyp2f1(0.5,(1-p)/2,1.5,sin(x)**2)', p=[dict(p=1.4), dict(p=2.2), dict(p=-0.5)], t='any real $p$'),
    NE(r'\tan^px', r'\dfrac{\tan^{p+1}x}{p+1}\,{}_2F_1\!\left(1,\tfrac{p+1}{2};\tfrac{p+3}{2};-\tan^2x\right)', 'tan(x)**p', 'tan(x)**(p+1)*hyp2f1(1,(p+1)/2,(p+3)/2,-tan(x)**2)/(p+1)', p=[dict(p=1.4), dict(p=2.2), dict(p=-0.5)], t='any real $p>-1$'),
])
no = G('No closed form at all (not even special functions of one variable)', [
    NO(r'\dfrac{\tan x}{x}', r'\text{not elementary; expands in a series with Bernoulli numbers}'),
    NO(r'x\tan x', r'\text{needs the dilogarithm / Clausen function}'),
    NO(r'\dfrac{x}{\sin x}', r'\text{needs the Clausen function } \mathrm{Cl}_2'),
    NO(r'\ln(\sin x)', r'\text{Clausen function: } -x\ln 2-\tfrac12\mathrm{Cl}_2(\pi-2x)'),
    NO(r'\ln(\cos x)', r'\text{Clausen function}'),
    NO(r'\sin(\sin x)', r'\text{Bessel-function series only}'),
    NO(r'e^{\sin x}', r'\text{Bessel-function series only}'),
    NO(r'\sin(x^3)', r'\text{incomplete gamma function}'),
    NO(r'\tan(x^2)', r'\text{no known closed form}'),
    NO(r'\sec(x^2)', r'\text{no known closed form}'),
    NO(r'\dfrac{\arctan x}{x}', r'\text{inverse tangent integral } \mathrm{Ti}_2(x)'),
    NO(r'\dfrac{\arcsin x}{x}', r'\text{needs a dilogarithm-type function}'),
    NO(r'\sin x^x', r'\text{no closed form}'),
    NO(r'\dfrac{\sin x}{\sqrt{1+x^2}}', r'\text{Bessel / Struve functions only}'),
    NO(r'x^2\sec^2x\ \text{(after one by-parts)}', r'x^2\tan x-2\!\int x\tan x\,dx\ \text{(no closed form for the remaining integral)}'),
], note='A function can be perfectly continuous and still have no antiderivative you can write with elementary functions (Liouville). Definite versions often <em>do</em> have closed forms. See the definite-integral section.')

SECTIONS = [S('special', 'No elementary form', 'When the antiderivative is not an elementary function, these are the standard special functions that name it, each checked by differentiating the special function. The last group lists integrals with no closed form at all.', [si, fr, ell, hyp, no])]
