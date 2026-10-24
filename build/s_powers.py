from common import *

def pw(fn, n, r, F, **kw):
    return I(rf'\{fn}^{n}x', r, f'{fn}(x)**{n}', F, **kw)

sinp = G('Powers of $\\sin x$', [
    pw('sin', 2, r'\dfrac x2-\dfrac{\sin2x}{4}', 'x/2-sin(2*x)/4', m=['identity']),
    pw('sin', 3, r'-\cos x+\dfrac{\cos^3x}{3}', '-cos(x)+cos(x)**3/3', m=['usub']),
    pw('sin', 4, r'\dfrac{3x}{8}-\dfrac{\sin2x}{4}+\dfrac{\sin4x}{32}', '3*x/8-sin(2*x)/4+sin(4*x)/32', m=['identity']),
    pw('sin', 5, r'-\cos x+\dfrac{2\cos^3x}{3}-\dfrac{\cos^5x}{5}', '-cos(x)+2*cos(x)**3/3-cos(x)**5/5', m=['usub']),
    pw('sin', 6, r'\dfrac{5x}{16}-\dfrac{15\sin2x}{64}+\dfrac{3\sin4x}{64}-\dfrac{\sin6x}{192}', '5*x/16-15*sin(2*x)/64+3*sin(4*x)/64-sin(6*x)/192', m=['identity']),
    pw('sin', 7, r'-\cos x+\cos^3x-\dfrac{3\cos^5x}{5}+\dfrac{\cos^7x}{7}', '-cos(x)+cos(x)**3-3*cos(x)**5/5+cos(x)**7/7', m=['usub']),
    pw('sin', 8, r'\dfrac{35x}{128}-\dfrac{7\sin2x}{32}+\dfrac{7\sin4x}{128}-\dfrac{\sin6x}{96}+\dfrac{\sin8x}{1024}', '35*x/128-7*sin(2*x)/32+7*sin(4*x)/128-sin(6*x)/96+sin(8*x)/1024', m=['identity']),
    RED(r'\int\sin^nx\,dx=-\dfrac{\sin^{n-1}x\cos x}{n}+\dfrac{n-1}{n}\int\sin^{n-2}x\,dx', '-sin(x)**(n-1)*cos(x)/n', 'sin(x)**n', 'sin(x)**(n-2)', '(n-1)/n',
        [dict(n=k) for k in (2, 3, 4, 5, 6, 7, 8)], m=['reduction'], t='reduction formula, $n\\ge2$'),
])
cosp = G('Powers of $\\cos x$', [
    pw('cos', 2, r'\dfrac x2+\dfrac{\sin2x}{4}', 'x/2+sin(2*x)/4', m=['identity']),
    pw('cos', 3, r'\sin x-\dfrac{\sin^3x}{3}', 'sin(x)-sin(x)**3/3', m=['usub']),
    pw('cos', 4, r'\dfrac{3x}{8}+\dfrac{\sin2x}{4}+\dfrac{\sin4x}{32}', '3*x/8+sin(2*x)/4+sin(4*x)/32', m=['identity']),
    pw('cos', 5, r'\sin x-\dfrac{2\sin^3x}{3}+\dfrac{\sin^5x}{5}', 'sin(x)-2*sin(x)**3/3+sin(x)**5/5', m=['usub']),
    pw('cos', 6, r'\dfrac{5x}{16}+\dfrac{15\sin2x}{64}+\dfrac{3\sin4x}{64}+\dfrac{\sin6x}{192}', '5*x/16+15*sin(2*x)/64+3*sin(4*x)/64+sin(6*x)/192', m=['identity']),
    pw('cos', 7, r'\sin x-\sin^3x+\dfrac{3\sin^5x}{5}-\dfrac{\sin^7x}{7}', 'sin(x)-sin(x)**3+3*sin(x)**5/5-sin(x)**7/7', m=['usub']),
    pw('cos', 8, r'\dfrac{35x}{128}+\dfrac{7\sin2x}{32}+\dfrac{7\sin4x}{128}+\dfrac{\sin6x}{96}+\dfrac{\sin8x}{1024}', '35*x/128+7*sin(2*x)/32+7*sin(4*x)/128+sin(6*x)/96+sin(8*x)/1024', m=['identity']),
    RED(r'\int\cos^nx\,dx=\dfrac{\cos^{n-1}x\sin x}{n}+\dfrac{n-1}{n}\int\cos^{n-2}x\,dx', 'cos(x)**(n-1)*sin(x)/n', 'cos(x)**n', 'cos(x)**(n-2)', '(n-1)/n',
        [dict(n=k) for k in (2, 3, 4, 5, 6, 7, 8)], m=['reduction'], t='reduction formula, $n\\ge2$'),
])
tanp = G('Powers of $\\tan x$', [
    pw('tan', 2, r'\tan x-x', 'tan(x)-x', m=['identity']),
    pw('tan', 3, r'\dfrac{\tan^2x}{2}+\ln|\cos x|', 'tan(x)**2/2+log(abs(cos(x)))', m=['usub']),
    pw('tan', 4, r'\dfrac{\tan^3x}{3}-\tan x+x', 'tan(x)**3/3-tan(x)+x'),
    pw('tan', 5, r'\dfrac{\tan^4x}{4}-\dfrac{\tan^2x}{2}-\ln|\cos x|', 'tan(x)**4/4-tan(x)**2/2-log(abs(cos(x)))'),
    pw('tan', 6, r'\dfrac{\tan^5x}{5}-\dfrac{\tan^3x}{3}+\tan x-x', 'tan(x)**5/5-tan(x)**3/3+tan(x)-x'),
    pw('tan', 7, r'\dfrac{\tan^6x}{6}-\dfrac{\tan^4x}{4}+\dfrac{\tan^2x}{2}+\ln|\cos x|', 'tan(x)**6/6-tan(x)**4/4+tan(x)**2/2+log(abs(cos(x)))'),
    RED(r'\int\tan^nx\,dx=\dfrac{\tan^{n-1}x}{n-1}-\int\tan^{n-2}x\,dx', 'tan(x)**(n-1)/(n-1)', 'tan(x)**n', 'tan(x)**(n-2)', '-1',
        [dict(n=k) for k in (2, 3, 4, 5, 6, 7)], m=['reduction'], t='reduction formula, $n\\ge2$'),
])
cotp = G('Powers of $\\cot x$', [
    pw('cot', 2, r'-\cot x-x', '-cot(x)-x', m=['identity']),
    pw('cot', 3, r'-\dfrac{\cot^2x}{2}-\ln|\sin x|', '-cot(x)**2/2-log(abs(sin(x)))'),
    pw('cot', 4, r'-\dfrac{\cot^3x}{3}+\cot x+x', '-cot(x)**3/3+cot(x)+x'),
    pw('cot', 5, r'-\dfrac{\cot^4x}{4}+\dfrac{\cot^2x}{2}+\ln|\sin x|', '-cot(x)**4/4+cot(x)**2/2+log(abs(sin(x)))'),
    pw('cot', 6, r'-\dfrac{\cot^5x}{5}+\dfrac{\cot^3x}{3}-\cot x-x', '-cot(x)**5/5+cot(x)**3/3-cot(x)-x'),
    RED(r'\int\cot^nx\,dx=-\dfrac{\cot^{n-1}x}{n-1}-\int\cot^{n-2}x\,dx', '-cot(x)**(n-1)/(n-1)', 'cot(x)**n', 'cot(x)**(n-2)', '-1',
        [dict(n=k) for k in (2, 3, 4, 5, 6, 7)], m=['reduction'], t='reduction formula, $n\\ge2$'),
])
secp = G('Powers of $\\sec x$', [
    pw('sec', 2, r'\tan x', 'tan(x)'),
    pw('sec', 3, r'\tfrac12\sec x\tan x+\tfrac12\ln|\sec x+\tan x|', 'sec(x)*tan(x)/2+log(abs(sec(x)+tan(x)))/2', m=['parts', 'reduction'], t='the classic by-parts integral'),
    pw('sec', 4, r'\tan x+\dfrac{\tan^3x}{3}', 'tan(x)+tan(x)**3/3', m=['usub']),
    pw('sec', 5, r'\tfrac14\sec^3x\tan x+\tfrac38\sec x\tan x+\tfrac38\ln|\sec x+\tan x|', 'sec(x)**3*tan(x)/4+3*sec(x)*tan(x)/8+3*log(abs(sec(x)+tan(x)))/8', m=['reduction']),
    pw('sec', 6, r'\tan x+\dfrac{2\tan^3x}{3}+\dfrac{\tan^5x}{5}', 'tan(x)+2*tan(x)**3/3+tan(x)**5/5', m=['usub']),
    pw('sec', 7, r'\tfrac16\sec^5x\tan x+\tfrac5{24}\sec^3x\tan x+\tfrac5{16}\sec x\tan x+\tfrac5{16}\ln|\sec x+\tan x|', 'sec(x)**5*tan(x)/6+5*sec(x)**3*tan(x)/24+5*sec(x)*tan(x)/16+5*log(abs(sec(x)+tan(x)))/16', m=['reduction']),
    pw('sec', 8, r'\tan x+\tan^3x+\dfrac{3\tan^5x}{5}+\dfrac{\tan^7x}{7}', 'tan(x)+tan(x)**3+3*tan(x)**5/5+tan(x)**7/7', m=['usub']),
    RED(r'\int\sec^nx\,dx=\dfrac{\sec^{n-2}x\tan x}{n-1}+\dfrac{n-2}{n-1}\int\sec^{n-2}x\,dx', 'sec(x)**(n-2)*tan(x)/(n-1)', 'sec(x)**n', 'sec(x)**(n-2)', '(n-2)/(n-1)',
        [dict(n=k) for k in (3, 4, 5, 6, 7, 8)], m=['reduction'], t='reduction formula, $n\\ge2$'),
])
cscp = G('Powers of $\\csc x$', [
    pw('csc', 2, r'-\cot x', '-cot(x)'),
    pw('csc', 3, r'-\tfrac12\csc x\cot x-\tfrac12\ln|\csc x+\cot x|', '-csc(x)*cot(x)/2-log(abs(csc(x)+cot(x)))/2', m=['parts', 'reduction']),
    pw('csc', 4, r'-\cot x-\dfrac{\cot^3x}{3}', '-cot(x)-cot(x)**3/3', m=['usub']),
    pw('csc', 5, r'-\tfrac14\csc^3x\cot x-\tfrac38\csc x\cot x-\tfrac38\ln|\csc x+\cot x|', '-csc(x)**3*cot(x)/4-3*csc(x)*cot(x)/8-3*log(abs(csc(x)+cot(x)))/8', m=['reduction']),
    pw('csc', 6, r'-\cot x-\dfrac{2\cot^3x}{3}-\dfrac{\cot^5x}{5}', '-cot(x)-2*cot(x)**3/3-cot(x)**5/5', m=['usub']),
    RED(r'\int\csc^nx\,dx=-\dfrac{\csc^{n-2}x\cot x}{n-1}+\dfrac{n-2}{n-1}\int\csc^{n-2}x\,dx', '-csc(x)**(n-2)*cot(x)/(n-1)', 'csc(x)**n', 'csc(x)**(n-2)', '(n-2)/(n-1)',
        [dict(n=k) for k in (3, 4, 5, 6, 7)], m=['reduction'], t='reduction formula, $n\\ge2$'),
])
SECTIONS = [S('powers', 'Powers of one function', 'Every power of $\\sin,\\cos,\\tan,\\cot,\\sec,\\csc$ up to the point where you should just use the reduction formula. Odd powers go by $u$-substitution, even powers by double angles.',
              [sinp, cosp, tanp, cotp, secp, cscp])]
