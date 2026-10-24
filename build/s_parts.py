from common import *

AB = [dict(a=1.3, b=2.1), dict(a=-0.8, b=1.7)]
poly = G('Polynomial × sine / cosine', [
    I(r'x\sin x', r'\sin x-x\cos x', 'x*sin(x)', 'sin(x)-x*cos(x)', m=['parts']),
    I(r'x\cos x', r'\cos x+x\sin x', 'x*cos(x)', 'cos(x)+x*sin(x)', m=['parts']),
    I(r'x^2\sin x', r'2x\sin x+(2-x^2)\cos x', 'x**2*sin(x)', '2*x*sin(x)+(2-x**2)*cos(x)', m=['parts']),
    I(r'x^2\cos x', r'2x\cos x+(x^2-2)\sin x', 'x**2*cos(x)', '2*x*cos(x)+(x**2-2)*sin(x)', m=['parts']),
    I(r'x^3\sin x', r'(3x^2-6)\sin x+(6x-x^3)\cos x', 'x**3*sin(x)', '(3*x**2-6)*sin(x)+(6*x-x**3)*cos(x)', m=['parts']),
    I(r'x^3\cos x', r'(3x^2-6)\cos x+(x^3-6x)\sin x', 'x**3*cos(x)', '(3*x**2-6)*cos(x)+(x**3-6*x)*sin(x)', m=['parts']),
])
poly['items'] = [i for i in poly['items'] if i['k'] != 'txt'] + [
    I(r'x^4\sin x', r'(4x^3-24x)\sin x+(12x^2-24-x^4)\cos x', 'x**4*sin(x)', '(4*x**3-24*x)*sin(x)+(12*x**2-24-x**4)*cos(x)', m=['parts']),
    I(r'x^4\cos x', r'(4x^3-24x)\cos x+(x^4-12x^2+24)\sin x', 'x**4*cos(x)', '(4*x**3-24*x)*cos(x)+(x**4-12*x**2+24)*sin(x)', m=['parts']),
    I(r'x\sin ax', r'\dfrac{\sin ax}{a^2}-\dfrac{x\cos ax}{a}', 'x*sin(a*x)', 'sin(a*x)/a**2-x*cos(a*x)/a', p=AB, m=['parts']),
    I(r'x\cos ax', r'\dfrac{\cos ax}{a^2}+\dfrac{x\sin ax}{a}', 'x*cos(a*x)', 'cos(a*x)/a**2+x*sin(a*x)/a', p=AB, m=['parts']),
    I(r'x^2\sin ax', r'\dfrac{2x\sin ax}{a^2}+\dfrac{(2-a^2x^2)\cos ax}{a^3}', 'x**2*sin(a*x)', '2*x*sin(a*x)/a**2+(2-a**2*x**2)*cos(a*x)/a**3', p=AB, m=['parts']),
    I(r'x^2\cos ax', r'\dfrac{2x\cos ax}{a^2}+\dfrac{(a^2x^2-2)\sin ax}{a^3}', 'x**2*cos(a*x)', '2*x*cos(a*x)/a**2+(a**2*x**2-2)*sin(a*x)/a**3', p=AB, m=['parts']),
    RED(r'\int x^n\sin ax\,dx=-\dfrac{x^n\cos ax}{a}+\dfrac na\int x^{n-1}\cos ax\,dx', '-x**n*cos(a*x)/a', 'x**n*sin(a*x)', 'x**(n-1)*cos(a*x)', 'n/a',
        [dict(a=1.3, n=k) for k in (1, 2, 3, 4, 5)] + [dict(a=-0.8, n=3)], m=['reduction', 'parts']),
    RED(r'\int x^n\cos ax\,dx=\dfrac{x^n\sin ax}{a}-\dfrac na\int x^{n-1}\sin ax\,dx', 'x**n*sin(a*x)/a', 'x**n*cos(a*x)', 'x**(n-1)*sin(a*x)', '-n/a',
        [dict(a=1.3, n=k) for k in (1, 2, 3, 4, 5)] + [dict(a=-0.8, n=3)], m=['reduction', 'parts']),
]
sqp = G('Polynomial × squared / products', [
    I(r'x\sin^2x', r'\dfrac{x^2}{4}-\dfrac{x\sin2x}{4}-\dfrac{\cos2x}{8}', 'x*sin(x)**2', 'x**2/4-x*sin(2*x)/4-cos(2*x)/8', m=['parts', 'identity']),
    I(r'x\cos^2x', r'\dfrac{x^2}{4}+\dfrac{x\sin2x}{4}+\dfrac{\cos2x}{8}', 'x*cos(x)**2', 'x**2/4+x*sin(2*x)/4+cos(2*x)/8', m=['parts', 'identity']),
    I(r'x\sin x\cos x', r'\dfrac{\sin2x}{8}-\dfrac{x\cos2x}{4}', 'x*sin(x)*cos(x)', 'sin(2*x)/8-x*cos(2*x)/4', m=['parts', 'identity']),
    I(r'x\sec^2x', r'x\tan x+\ln|\cos x|', 'x*sec(x)**2', 'x*tan(x)+log(abs(cos(x)))', m=['parts']),
    I(r'x\csc^2x', r'-x\cot x+\ln|\sin x|', 'x*csc(x)**2', '-x*cot(x)+log(abs(sin(x)))', m=['parts']),
    I(r'x\sec x\tan x', r'x\sec x-\ln|\sec x+\tan x|', 'x*sec(x)*tan(x)', 'x*sec(x)-log(abs(sec(x)+tan(x)))', m=['parts']),
    I(r'x\tan^2x', r'x\tan x+\ln|\cos x|-\dfrac{x^2}{2}', 'x*tan(x)**2', 'x*tan(x)+log(abs(cos(x)))-x**2/2', m=['parts', 'identity']),
    I(r'\dfrac{x}{1+\cos x}', r'x\tan\tfrac x2+2\ln\left|\cos\tfrac x2\right|', 'x/(1+cos(x))', 'x*tan(x/2)+2*log(abs(cos(x/2)))', m=['parts', 'identity']),
    I(r'\dfrac{x}{1-\cos x}', r'-x\cot\tfrac x2+2\ln\left|\sin\tfrac x2\right|', 'x/(1-cos(x))', '-x*cot(x/2)+2*log(abs(sin(x/2)))', m=['parts', 'identity']),
    I(r'\dfrac{x}{\sin^2x}', r'-x\cot x+\ln|\sin x|', 'x/sin(x)**2', '-x*cot(x)+log(abs(sin(x)))', m=['parts']),
    I(r'\dfrac{x}{\cos^2x}', r'x\tan x+\ln|\cos x|', 'x/cos(x)**2', 'x*tan(x)+log(abs(cos(x)))', m=['parts']),
])
expt = G('Exponential × trig', [
    I(r'e^{ax}\sin bx', r'\dfrac{e^{ax}(a\sin bx-b\cos bx)}{a^2+b^2}', 'exp(a*x)*sin(b*x)', 'exp(a*x)*(a*sin(b*x)-b*cos(b*x))/(a**2+b**2)', p=AB, m=['parts'], t='by parts twice, solve for the integral'),
    I(r'e^{ax}\cos bx', r'\dfrac{e^{ax}(a\cos bx+b\sin bx)}{a^2+b^2}', 'exp(a*x)*cos(b*x)', 'exp(a*x)*(a*cos(b*x)+b*sin(b*x))/(a**2+b**2)', p=AB, m=['parts']),
    I(r'e^{x}\sin x', r'\dfrac{e^x(\sin x-\cos x)}{2}', 'exp(x)*sin(x)', 'exp(x)*(sin(x)-cos(x))/2', m=['parts']),
    I(r'e^{x}\cos x', r'\dfrac{e^x(\sin x+\cos x)}{2}', 'exp(x)*cos(x)', 'exp(x)*(sin(x)+cos(x))/2', m=['parts']),
    I(r'e^{-x}\sin x', r'-\dfrac{e^{-x}(\sin x+\cos x)}{2}', 'exp(-x)*sin(x)', '-exp(-x)*(sin(x)+cos(x))/2', m=['parts']),
    I(r'e^{-x}\cos x', r'\dfrac{e^{-x}(\sin x-\cos x)}{2}', 'exp(-x)*cos(x)', 'exp(-x)*(sin(x)-cos(x))/2', m=['parts']),
    I(r'e^{ax}\sin^2bx', r'\dfrac{e^{ax}}{2a}-\dfrac{e^{ax}(a\cos2bx+2b\sin2bx)}{2(a^2+4b^2)}', 'exp(a*x)*sin(b*x)**2', 'exp(a*x)/(2*a)-exp(a*x)*(a*cos(2*b*x)+2*b*sin(2*b*x))/(2*(a**2+4*b**2))', p=AB, m=['parts', 'identity']),
    I(r'e^{ax}\cos^2bx', r'\dfrac{e^{ax}}{2a}+\dfrac{e^{ax}(a\cos2bx+2b\sin2bx)}{2(a^2+4b^2)}', 'exp(a*x)*cos(b*x)**2', 'exp(a*x)/(2*a)+exp(a*x)*(a*cos(2*b*x)+2*b*sin(2*b*x))/(2*(a**2+4*b**2))', p=AB, m=['parts', 'identity']),
    I(r'x\,e^{x}\sin x', r'\dfrac{e^x}{2}\big[x(\sin x-\cos x)+\cos x\big]', 'x*exp(x)*sin(x)', 'exp(x)*(x*(sin(x)-cos(x))+cos(x))/2', m=['parts']),
    I(r'x\,e^{x}\cos x', r'\dfrac{e^x}{2}\big[x(\sin x+\cos x)-\sin x\big]', 'x*exp(x)*cos(x)', 'exp(x)*(x*(sin(x)+cos(x))-sin(x))/2', m=['parts']),
    I(r'e^{x}(\sec x+\sec x\tan x)', r'e^x\sec x', 'exp(x)*(sec(x)+sec(x)*tan(x))', 'exp(x)*sec(x)', m=['parts'], t='$e^x(f+f^{\\prime})$ trick'),
    I(r'e^{x}(\tan x+\sec^2x)', r'e^x\tan x', 'exp(x)*(tan(x)+sec(x)**2)', 'exp(x)*tan(x)', m=['parts'], t='$e^x(f+f^{\\prime})$ trick'),
    I(r'e^{x}(\cos x-\sin x)', r'e^x\cos x', 'exp(x)*(cos(x)-sin(x))', 'exp(x)*cos(x)', m=['parts'], t='$e^x(f+f^{\\prime})$ trick'),
    I(r'e^{2x}\left(\sin2x+\cos2x\right)', r'\dfrac{e^{2x}\sin2x}{2}', 'exp(2*x)*(sin(2*x)+cos(2*x))', 'exp(2*x)*sin(2*x)/2', m=['parts']),
])
misc = G('Logs, roots & other compositions', [
    I(r'\sin(\ln x)', r'\dfrac{x}{2}\big[\sin(\ln x)-\cos(\ln x)\big]', 'sin(log(x))', 'x*(sin(log(x))-cos(log(x)))/2', m=['parts']),
    I(r'\cos(\ln x)', r'\dfrac{x}{2}\big[\sin(\ln x)+\cos(\ln x)\big]', 'cos(log(x))', 'x*(sin(log(x))+cos(log(x)))/2', m=['parts']),
    I(r'\sin\sqrt x', r'2\sin\sqrt x-2\sqrt x\cos\sqrt x', 'sin(sqrt(x))', '2*sin(sqrt(x))-2*sqrt(x)*cos(sqrt(x))', m=['usub', 'parts']),
    I(r'\cos\sqrt x', r'2\cos\sqrt x+2\sqrt x\sin\sqrt x', 'cos(sqrt(x))', '2*cos(sqrt(x))+2*sqrt(x)*sin(sqrt(x))', m=['usub', 'parts']),
    I(r'\sin x\,\ln(\cos x)', r'\cos x-\cos x\ln(\cos x)', 'sin(x)*log(cos(x))', 'cos(x)-cos(x)*log(cos(x))', m=['usub']),
    I(r'\cos x\,\ln(\sin x)', r'\sin x\ln(\sin x)-\sin x', 'cos(x)*log(sin(x))', 'sin(x)*log(sin(x))-sin(x)', m=['usub']),
    I(r'\sec^2x\,\ln(\tan x)', r'\tan x\ln(\tan x)-\tan x', 'sec(x)**2*log(tan(x))', 'tan(x)*log(tan(x))-tan(x)', m=['usub']),
    I(r'\ln(\sin x)\csc^2x', r'-\cot x\ln(\sin x)-\cot x-x', 'log(sin(x))*csc(x)**2', '-cot(x)*log(sin(x))-cot(x)-x', m=['parts']),
    I(r'\sin x\ln(\sec x+\tan x)', r'-\cos x\ln(\sec x+\tan x)+x', 'sin(x)*log(sec(x)+tan(x))', '-cos(x)*log(sec(x)+tan(x))+x', m=['parts']),
    I(r'\ln(\cos x)\sec^2x', r'\tan x\ln(\cos x)+\tan x-x', 'log(cos(x))*sec(x)**2', 'tan(x)*log(cos(x))+tan(x)-x', m=['parts']),
    I(r'\ln(\sec x)\sec^2x', r'\tan x\ln(\sec x)-\tan x+x', 'log(sec(x))*sec(x)**2', 'tan(x)*log(sec(x))-tan(x)+x', m=['parts']),
])
SECTIONS = [S('parts', 'By parts: polynomials, exponentials, logs', 'Trig times $x^n$, $e^{ax}$ or $\\ln$: integration by parts, repeated. For $x^n$ use the tabular method; for $e^{ax}$ go around twice and solve.', [poly, sqp, expt, misc])]
