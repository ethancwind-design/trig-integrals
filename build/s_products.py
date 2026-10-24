from common import *

LS = r'\ln|\sec x+\tan x|'
LSF = 'log(abs(sec(x)+tan(x)))'
LC = r'\ln|\csc x+\cot x|'
LCF = 'log(abs(csc(x)+cot(x)))'

sc = G('$\\sin^m x\\cos^n x$', [
    I(r'\sin x\cos x', r'\dfrac{\sin^2x}{2}', 'sin(x)*cos(x)', 'sin(x)**2/2', m=['usub']),
    I(r'\sin^2x\cos x', r'\dfrac{\sin^3x}{3}', 'sin(x)**2*cos(x)', 'sin(x)**3/3', m=['usub']),
    I(r'\sin x\cos^2x', r'-\dfrac{\cos^3x}{3}', 'sin(x)*cos(x)**2', '-cos(x)**3/3', m=['usub']),
    I(r'\sin^2x\cos^2x', r'\dfrac x8-\dfrac{\sin4x}{32}', 'sin(x)**2*cos(x)**2', 'x/8-sin(4*x)/32', m=['identity']),
    I(r'\sin^3x\cos^2x', r'-\dfrac{\cos^3x}{3}+\dfrac{\cos^5x}{5}', 'sin(x)**3*cos(x)**2', '-cos(x)**3/3+cos(x)**5/5', m=['usub']),
    I(r'\sin^2x\cos^3x', r'\dfrac{\sin^3x}{3}-\dfrac{\sin^5x}{5}', 'sin(x)**2*cos(x)**3', 'sin(x)**3/3-sin(x)**5/5', m=['usub']),
    I(r'\sin^3x\cos^3x', r'\dfrac{\sin^4x}{4}-\dfrac{\sin^6x}{6}', 'sin(x)**3*cos(x)**3', 'sin(x)**4/4-sin(x)**6/6', m=['usub']),
    I(r'\sin^4x\cos^2x', r'\dfrac x{16}-\dfrac{\sin2x}{64}-\dfrac{\sin4x}{64}+\dfrac{\sin6x}{192}', 'sin(x)**4*cos(x)**2', 'x/16-sin(2*x)/64-sin(4*x)/64+sin(6*x)/192', m=['identity']),
    I(r'\sin^2x\cos^4x', r'\dfrac x{16}+\dfrac{\sin2x}{64}-\dfrac{\sin4x}{64}-\dfrac{\sin6x}{192}', 'sin(x)**2*cos(x)**4', 'x/16+sin(2*x)/64-sin(4*x)/64-sin(6*x)/192', m=['identity']),
    I(r'\sin^4x\cos^4x', r'\dfrac{3x}{128}-\dfrac{\sin4x}{128}+\dfrac{\sin8x}{1024}', 'sin(x)**4*cos(x)**4', '3*x/128-sin(4*x)/128+sin(8*x)/1024', m=['identity']),
    I(r'\sin^5x\cos^2x', r'-\dfrac{\cos^3x}{3}+\dfrac{2\cos^5x}{5}-\dfrac{\cos^7x}{7}', 'sin(x)**5*cos(x)**2', '-cos(x)**3/3+2*cos(x)**5/5-cos(x)**7/7', m=['usub']),
    I(r'\sin^3x\cos^4x', r'-\dfrac{\cos^5x}{5}+\dfrac{\cos^7x}{7}', 'sin(x)**3*cos(x)**4', '-cos(x)**5/5+cos(x)**7/7', m=['usub']),
    I(r'\sin^4x\cos^3x', r'\dfrac{\sin^5x}{5}-\dfrac{\sin^7x}{7}', 'sin(x)**4*cos(x)**3', 'sin(x)**5/5-sin(x)**7/7', m=['usub']),
    I(r'\sin^2x\cos^5x', r'\dfrac{\sin^3x}{3}-\dfrac{2\sin^5x}{5}+\dfrac{\sin^7x}{7}', 'sin(x)**2*cos(x)**5', 'sin(x)**3/3-2*sin(x)**5/5+sin(x)**7/7', m=['usub']),
    RED(r'\int\sin^mx\cos^nx\,dx=-\dfrac{\sin^{m-1}x\cos^{n+1}x}{m+n}+\dfrac{m-1}{m+n}\int\sin^{m-2}x\cos^nx\,dx',
        '-sin(x)**(m-1)*cos(x)**(n+1)/(m+n)', 'sin(x)**m*cos(x)**n', 'sin(x)**(m-2)*cos(x)**n', '(m-1)/(m+n)',
        [dict(m=2, n=2), dict(m=4, n=3), dict(m=3, n=5), dict(m=6, n=2), dict(m=5, n=4)], m=['reduction'], t='lower the sine power'),
    RED(r'\int\sin^mx\cos^nx\,dx=\dfrac{\sin^{m+1}x\cos^{n-1}x}{m+n}+\dfrac{n-1}{m+n}\int\sin^mx\cos^{n-2}x\,dx',
        'sin(x)**(m+1)*cos(x)**(n-1)/(m+n)', 'sin(x)**m*cos(x)**n', 'sin(x)**m*cos(x)**(n-2)', '(n-1)/(m+n)',
        [dict(m=2, n=2), dict(m=3, n=4), dict(m=5, n=3), dict(m=2, n=6), dict(m=4, n=5)], m=['reduction'], t='lower the cosine power'),
])
mixed = G('Quotients & reciprocals of $\\sin,\\cos$', [
    I(r'\dfrac1{\sin x\cos x}', r'\ln|\tan x|', '1/(sin(x)*cos(x))', 'log(abs(tan(x)))'),
    I(r'\dfrac1{\sin^2x\cos^2x}', r'\tan x-\cot x', '1/(sin(x)**2*cos(x)**2)', 'tan(x)-cot(x)', m=['identity']),
    I(r'\dfrac{\sin^2x}{\cos x}', rf'{LS}-\sin x', 'sin(x)**2/cos(x)', f'{LSF}-sin(x)', m=['identity']),
    I(r'\dfrac{\cos^2x}{\sin x}', rf'-{LC}+\cos x', 'cos(x)**2/sin(x)', f'-{LCF}+cos(x)', m=['identity']),
    I(r'\dfrac{1}{\sin x\cos^2x}', rf'\sec x-{LC}', '1/(sin(x)*cos(x)**2)', f'sec(x)-{LCF}'),
    I(r'\dfrac{1}{\sin^2x\cos x}', rf'{LS}-\csc x', '1/(sin(x)**2*cos(x))', f'{LSF}-csc(x)'),
    I(r'\dfrac{\sin^3x}{\cos x}', rf'-\dfrac{{\sin^2x}}{{2}}-\ln|\cos x|', 'sin(x)**3/cos(x)', '-sin(x)**2/2-log(abs(cos(x)))'),
    I(r'\sin x\tan x', rf'{LS}-\sin x', 'sin(x)*tan(x)', f'{LSF}-sin(x)', m=['identity']),
    I(r'\cos x\cot x', rf'-{LC}+\cos x', 'cos(x)*cot(x)', f'-{LCF}+cos(x)', m=['identity']),
    I(r'\sec x\csc x', r'\ln|\tan x|', 'sec(x)*csc(x)', 'log(abs(tan(x)))'),
    I(r'\sec x+\csc x', rf'{LS}-{LC}', 'sec(x)+csc(x)', f'{LSF}-{LCF}'),
    I(r'\tan x\csc x', rf'{LS}', 'tan(x)*csc(x)', LSF, t='$\\tan x\\csc x=\\sec x$'),
    I(r'\sin x\sec^2x', r'\sec x', 'sin(x)*sec(x)**2', 'sec(x)', m=['usub']),
    I(r'\cos x\csc^2x', r'-\csc x', 'cos(x)*csc(x)**2', '-csc(x)', m=['usub']),
])
ts = G('$\\tan^m x\\sec^n x$', [
    I(r'\tan x\sec x', r'\sec x', 'tan(x)*sec(x)', 'sec(x)', m=['usub']),
    I(r'\tan x\sec^2x', r'\dfrac{\tan^2x}{2}=\dfrac{\sec^2x}{2}', 'tan(x)*sec(x)**2', 'tan(x)**2/2', m=['usub']),
    I(r'\tan x\sec^3x', r'\dfrac{\sec^3x}{3}', 'tan(x)*sec(x)**3', 'sec(x)**3/3', m=['usub']),
    I(r'\tan x\sec^4x', r'\dfrac{\sec^4x}{4}', 'tan(x)*sec(x)**4', 'sec(x)**4/4', m=['usub']),
    I(r'\tan^2x\sec x', rf'\tfrac12\sec x\tan x-\tfrac12{LS}', 'tan(x)**2*sec(x)', f'sec(x)*tan(x)/2-{LSF}/2', m=['reduction'], t='$m$ even, $n$ odd'),
    I(r'\tan^2x\sec^2x', r'\dfrac{\tan^3x}{3}', 'tan(x)**2*sec(x)**2', 'tan(x)**3/3', m=['usub']),
    I(r'\tan^2x\sec^3x', rf'\tfrac14\sec^3x\tan x-\tfrac18\sec x\tan x-\tfrac18{LS}', 'tan(x)**2*sec(x)**3', f'sec(x)**3*tan(x)/4-sec(x)*tan(x)/8-{LSF}/8', m=['reduction'], t='$m$ even, $n$ odd'),
    I(r'\tan^2x\sec^4x', r'\dfrac{\tan^3x}{3}+\dfrac{\tan^5x}{5}', 'tan(x)**2*sec(x)**4', 'tan(x)**3/3+tan(x)**5/5', m=['usub']),
    I(r'\tan^3x\sec x', r'\dfrac{\sec^3x}{3}-\sec x', 'tan(x)**3*sec(x)', 'sec(x)**3/3-sec(x)', m=['usub']),
    I(r'\tan^3x\sec^2x', r'\dfrac{\tan^4x}{4}', 'tan(x)**3*sec(x)**2', 'tan(x)**4/4', m=['usub']),
    I(r'\tan^3x\sec^3x', r'\dfrac{\sec^5x}{5}-\dfrac{\sec^3x}{3}', 'tan(x)**3*sec(x)**3', 'sec(x)**5/5-sec(x)**3/3', m=['usub']),
    I(r'\tan^3x\sec^4x', r'\dfrac{\tan^4x}{4}+\dfrac{\tan^6x}{6}', 'tan(x)**3*sec(x)**4', 'tan(x)**4/4+tan(x)**6/6', m=['usub']),
    I(r'\tan^4x\sec x', rf'\tfrac14\sec^3x\tan x-\tfrac58\sec x\tan x+\tfrac38{LS}', 'tan(x)**4*sec(x)', f'sec(x)**3*tan(x)/4-5*sec(x)*tan(x)/8+3*{LSF}/8', m=['reduction'], t='$m$ even, $n$ odd'),
    I(r'\tan^4x\sec^2x', r'\dfrac{\tan^5x}{5}', 'tan(x)**4*sec(x)**2', 'tan(x)**5/5', m=['usub']),
    I(r'\tan^4x\sec^4x', r'\dfrac{\tan^5x}{5}+\dfrac{\tan^7x}{7}', 'tan(x)**4*sec(x)**4', 'tan(x)**5/5+tan(x)**7/7', m=['usub']),
    I(r'\tan^5x\sec x', r'\dfrac{\sec^5x}{5}-\dfrac{2\sec^3x}{3}+\sec x', 'tan(x)**5*sec(x)', 'sec(x)**5/5-2*sec(x)**3/3+sec(x)', m=['usub']),
    I(r'\tan^5x\sec^3x', r'\dfrac{\sec^7x}{7}-\dfrac{2\sec^5x}{5}+\dfrac{\sec^3x}{3}', 'tan(x)**5*sec(x)**3', 'sec(x)**7/7-2*sec(x)**5/5+sec(x)**3/3', m=['usub']),
    I(r'\tan^6x\sec^2x', r'\dfrac{\tan^7x}{7}', 'tan(x)**6*sec(x)**2', 'tan(x)**7/7', m=['usub']),
    I(r'\tan^m x\sec^2x', r'\dfrac{\tan^{m+1}x}{m+1}', 'tan(x)**m*sec(x)**2', 'tan(x)**(m+1)/(m+1)', m=['usub'], p=[dict(m=2), dict(m=5)]),
])
cs = G('$\\cot^m x\\csc^n x$', [
    I(r'\cot x\csc x', r'-\csc x', 'cot(x)*csc(x)', '-csc(x)', m=['usub']),
    I(r'\cot x\csc^2x', r'-\dfrac{\cot^2x}{2}=-\dfrac{\csc^2x}{2}', 'cot(x)*csc(x)**2', '-cot(x)**2/2', m=['usub']),
    I(r'\cot^2x\csc x', rf'-\tfrac12\csc x\cot x+\tfrac12{LC}', 'cot(x)**2*csc(x)', f'-csc(x)*cot(x)/2+{LCF}/2', m=['reduction'], t='$m$ even, $n$ odd'),
    I(r'\cot^2x\csc^2x', r'-\dfrac{\cot^3x}{3}', 'cot(x)**2*csc(x)**2', '-cot(x)**3/3', m=['usub']),
    I(r'\cot^2x\csc^3x', rf'-\tfrac14\csc^3x\cot x+\tfrac18\csc x\cot x+\tfrac18{LC}', 'cot(x)**2*csc(x)**3', f'-csc(x)**3*cot(x)/4+csc(x)*cot(x)/8+{LCF}/8', m=['reduction']),
    I(r'\cot^2x\csc^4x', r'-\dfrac{\cot^3x}{3}-\dfrac{\cot^5x}{5}', 'cot(x)**2*csc(x)**4', '-cot(x)**3/3-cot(x)**5/5', m=['usub']),
    I(r'\cot^3x\csc x', r'-\dfrac{\csc^3x}{3}+\csc x', 'cot(x)**3*csc(x)', '-csc(x)**3/3+csc(x)', m=['usub']),
    I(r'\cot^3x\csc^2x', r'-\dfrac{\cot^4x}{4}', 'cot(x)**3*csc(x)**2', '-cot(x)**4/4', m=['usub']),
    I(r'\cot^3x\csc^3x', r'-\dfrac{\csc^5x}{5}+\dfrac{\csc^3x}{3}', 'cot(x)**3*csc(x)**3', '-csc(x)**5/5+csc(x)**3/3', m=['usub']),
    I(r'\cot^4x\csc^4x', r'-\dfrac{\cot^5x}{5}-\dfrac{\cot^7x}{7}', 'cot(x)**4*csc(x)**4', '-cot(x)**5/5-cot(x)**7/7', m=['usub']),
    I(r'\cot^5x\csc^3x', r'-\dfrac{\csc^7x}{7}+\dfrac{2\csc^5x}{5}-\dfrac{\csc^3x}{3}', 'cot(x)**5*csc(x)**3', '-csc(x)**7/7+2*csc(x)**5/5-csc(x)**3/3', m=['usub']),
])
SECTIONS = [S('products', 'Products of powers', 'Mixed products: $\\sin^m\\cos^n$, $\\tan^m\\sec^n$, $\\cot^m\\csc^n$, and the quotients that reduce to them. The reduction formulas at the end of each family extend every table.',
              [sc, mixed, ts, cs])]
