from common import *

six = G('The six trig functions', [
    I(r'\sin x', r'-\cos x', 'sin(x)', '-cos(x)'),
    I(r'\cos x', r'\sin x', 'cos(x)', 'sin(x)'),
    I(r'\tan x', r'-\ln|\cos x|=\ln|\sec x|', 'tan(x)', '-log(abs(cos(x)))'),
    I(r'\cot x', r'\ln|\sin x|=-\ln|\csc x|', 'cot(x)', 'log(abs(sin(x)))'),
    I(r'\sec x', r'\ln|\sec x+\tan x|', 'sec(x)', 'log(abs(sec(x)+tan(x)))', t='the famous one'),
    I(r'\csc x', r'-\ln|\csc x+\cot x|', 'csc(x)', '-log(abs(csc(x)+cot(x)))'),
])
alt = G('Equivalent forms of $\\int\\sec x$ and $\\int\\csc x$', [
    I(r'\sec x', r'-\ln|\sec x-\tan x|', 'sec(x)', '-log(abs(sec(x)-tan(x)))'),
    I(r'\sec x', r'\ln\left|\tan\!\left(\tfrac x2+\tfrac\pi4\right)\right|', 'sec(x)', 'log(abs(tan(x/2+pi/4)))'),
    I(r'\sec x', r'\operatorname{arsinh}(\tan x)=\operatorname{gd}^{-1}x', 'sec(x)', 'asinh(tan(x))'),
    I(r'\sec x', r'2\operatorname{artanh}\!\left(\tan\tfrac x2\right)', 'sec(x)', '2*atanh(tan(x/2))'),
    I(r'\csc x', r'\ln|\csc x-\cot x|', 'csc(x)', 'log(abs(csc(x)-cot(x)))'),
    I(r'\csc x', r'\ln\left|\tan\tfrac x2\right|', 'csc(x)', 'log(abs(tan(x/2)))'),
    I(r'\csc x', r'-\operatorname{arsinh}(\cot x)', 'csc(x)', '-asinh(cot(x))'),
    I(r'\tan x', r'\ln|\sec x|', 'tan(x)', 'log(abs(sec(x)))'),
])
deriv = G('Derivative partners', [
    I(r'\sec^2x', r'\tan x', 'sec(x)**2', 'tan(x)'),
    I(r'\csc^2x', r'-\cot x', 'csc(x)**2', '-cot(x)'),
    I(r'\sec x\tan x', r'\sec x', 'sec(x)*tan(x)', 'sec(x)'),
    I(r'\csc x\cot x', r'-\csc x', 'csc(x)*cot(x)', '-csc(x)'),
])
sq = G('Squares', [
    I(r'\sin^2x', r'\dfrac x2-\dfrac{\sin2x}{4}=\dfrac{x-\sin x\cos x}{2}', 'sin(x)**2', 'x/2-sin(2*x)/4', m=['identity']),
    I(r'\cos^2x', r'\dfrac x2+\dfrac{\sin2x}{4}=\dfrac{x+\sin x\cos x}{2}', 'cos(x)**2', 'x/2+sin(2*x)/4', m=['identity']),
    I(r'\tan^2x', r'\tan x-x', 'tan(x)**2', 'tan(x)-x', m=['identity']),
    I(r'\cot^2x', r'-\cot x-x', 'cot(x)**2', '-cot(x)-x', m=['identity']),
    I(r'\sin x\cos x', r'\dfrac{\sin^2x}{2}=-\dfrac{\cos^2x}{2}=-\dfrac{\cos2x}{4}', 'sin(x)*cos(x)', 'sin(x)**2/2', m=['usub'], t='three equal forms (differ by a constant)'),
])
lin = G('Linear arguments ($a\\neq0$)', [
    I(r'\sin(ax+b)', r'-\dfrac{\cos(ax+b)}{a}', 'sin(a*x+b)', '-cos(a*x+b)/a', p=P_SMALL),
    I(r'\cos(ax+b)', r'\dfrac{\sin(ax+b)}{a}', 'cos(a*x+b)', 'sin(a*x+b)/a', p=P_SMALL),
    I(r'\tan(ax+b)', r'-\dfrac{1}{a}\ln|\cos(ax+b)|', 'tan(a*x+b)', '-log(abs(cos(a*x+b)))/a', p=P_SMALL),
    I(r'\cot(ax+b)', r'\dfrac{1}{a}\ln|\sin(ax+b)|', 'cot(a*x+b)', 'log(abs(sin(a*x+b)))/a', p=P_SMALL),
    I(r'\sec(ax+b)', r'\dfrac{1}{a}\ln|\sec(ax+b)+\tan(ax+b)|', 'sec(a*x+b)', 'log(abs(sec(a*x+b)+tan(a*x+b)))/a', p=P_SMALL),
    I(r'\csc(ax+b)', r'-\dfrac{1}{a}\ln|\csc(ax+b)+\cot(ax+b)|', 'csc(a*x+b)', '-log(abs(csc(a*x+b)+cot(a*x+b)))/a', p=P_SMALL),
    I(r'\sec^2(ax+b)', r'\dfrac{\tan(ax+b)}{a}', 'sec(a*x+b)**2', 'tan(a*x+b)/a', p=P_SMALL),
    I(r'\csc^2(ax+b)', r'-\dfrac{\cot(ax+b)}{a}', 'csc(a*x+b)**2', '-cot(a*x+b)/a', p=P_SMALL),
    I(r'\sec(ax+b)\tan(ax+b)', r'\dfrac{\sec(ax+b)}{a}', 'sec(a*x+b)*tan(a*x+b)', 'sec(a*x+b)/a', p=P_SMALL),
    I(r'\csc(ax+b)\cot(ax+b)', r'-\dfrac{\csc(ax+b)}{a}', 'csc(a*x+b)*cot(a*x+b)', '-csc(a*x+b)/a', p=P_SMALL),
    I(r'\sin^2(ax)', r'\dfrac x2-\dfrac{\sin2ax}{4a}', 'sin(a*x)**2', 'x/2-sin(2*a*x)/(4*a)', p=P_SMALL),
    I(r'\cos^2(ax)', r'\dfrac x2+\dfrac{\sin2ax}{4a}', 'cos(a*x)**2', 'x/2+sin(2*a*x)/(4*a)', p=P_SMALL),
    I(r'\sin(ax)\cos(ax)', r'-\dfrac{\cos2ax}{4a}', 'sin(a*x)*cos(a*x)', '-cos(2*a*x)/(4*a)', p=P_SMALL),
    I(r'\tan^2(ax)', r'\dfrac{\tan ax}{a}-x', 'tan(a*x)**2', 'tan(a*x)/a-x', p=P_SMALL),
])
usub = G('Trig of a function × its derivative', [
    I(r'\sin(x^2)\,x', r'-\tfrac12\cos(x^2)', 'sin(x**2)*x', '-cos(x**2)/2', m=['usub']),
    I(r'\dfrac{\sin\sqrt x}{\sqrt x}', r'-2\cos\sqrt x', 'sin(sqrt(x))/sqrt(x)', '-2*cos(sqrt(x))', m=['usub']),
    I(r'\dfrac{\sin(1/x)}{x^2}', r'\cos\tfrac1x', 'sin(1/x)/x**2', 'cos(1/x)', m=['usub']),
    I(r'e^x\sin(e^x)', r'-\cos(e^x)', 'exp(x)*sin(exp(x))', '-cos(exp(x))', m=['usub']),
    I(r'\dfrac{\sin(\ln x)}{x}', r'-\cos(\ln x)', 'sin(log(x))/x', '-cos(log(x))', m=['usub']),
    I(r'\dfrac{\tan(\ln x)}{x}', r'-\ln|\cos(\ln x)|', 'tan(log(x))/x', '-log(abs(cos(log(x))))', m=['usub']),
    I(r'\sin x\,e^{\cos x}', r'-e^{\cos x}', 'sin(x)*exp(cos(x))', '-exp(cos(x))', m=['usub']),
    I(r'\cos x\,e^{\sin x}', r'e^{\sin x}', 'cos(x)*exp(sin(x))', 'exp(sin(x))', m=['usub']),
    I(r'\sec^2x\,e^{\tan x}', r'e^{\tan x}', 'sec(x)**2*exp(tan(x))', 'exp(tan(x))', m=['usub']),
    I(r'\dfrac{\cos x}{1+\sin^2x}', r'\arctan(\sin x)', 'cos(x)/(1+sin(x)**2)', 'atan(sin(x))', m=['usub']),
    I(r'\dfrac{\sin x}{1+\cos^2x}', r'-\arctan(\cos x)', 'sin(x)/(1+cos(x)**2)', '-atan(cos(x))', m=['usub']),
    I(r'\dfrac{\cos x}{\sqrt{4-\sin^2x}}', r'\arcsin\!\left(\tfrac{\sin x}{2}\right)', 'cos(x)/sqrt(4-sin(x)**2)', 'asin(sin(x)/2)', m=['usub']),
    I(r'\dfrac{\sec^2x}{\sqrt{1-\tan^2x}}', r'\arcsin(\tan x)', 'sec(x)**2/sqrt(1-tan(x)**2)', 'asin(tan(x))', d=(0.1, 0.7), m=['usub']),
    I(r'\dfrac{\sec x\tan x}{1+\sec^2x}', r'\arctan(\sec x)', 'sec(x)*tan(x)/(1+sec(x)**2)', 'atan(sec(x))', m=['usub']),
    I(r'\dfrac{\cos x}{a+b\sin x}', r'\dfrac1b\ln|a+b\sin x|', 'cos(x)/(a+b*sin(x))', 'log(abs(a+b*sin(x)))/b', m=['usub'], p=[dict(a=2.0, b=0.7), dict(a=3.0, b=-1.1)]),
    I(r'\dfrac{\sin x}{a+b\cos x}', r'-\dfrac1b\ln|a+b\cos x|', 'sin(x)/(a+b*cos(x))', '-log(abs(a+b*cos(x)))/b', m=['usub'], p=[dict(a=2.0, b=0.7), dict(a=3.0, b=-1.1)]),
    I(r'\dfrac{\sin x}{\cos^nx}', r'\dfrac{1}{(n-1)\cos^{n-1}x}', 'sin(x)/cos(x)**n', '1/((n-1)*cos(x)**(n-1))', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)], t='$n\\neq1$'),
    I(r'\dfrac{\cos x}{\sin^nx}', r'-\dfrac{1}{(n-1)\sin^{n-1}x}', 'cos(x)/sin(x)**n', '-1/((n-1)*sin(x)**(n-1))', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)], t='$n\\neq1$'),
    I(r'\sin^n x\cos x', r'\dfrac{\sin^{n+1}x}{n+1}', 'sin(x)**n*cos(x)', 'sin(x)**(n+1)/(n+1)', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)], t='$n\\neq-1$'),
    I(r'\cos^n x\sin x', r'-\dfrac{\cos^{n+1}x}{n+1}', 'cos(x)**n*sin(x)', '-cos(x)**(n+1)/(n+1)', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)], t='$n\\neq-1$'),
    I(r'\tan^n x\sec^2x', r'\dfrac{\tan^{n+1}x}{n+1}', 'tan(x)**n*sec(x)**2', 'tan(x)**(n+1)/(n+1)', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)]),
    I(r'\sec^n x\tan x', r'\dfrac{\sec^nx}{n}', 'sec(x)**n*tan(x)', 'sec(x)**n/n', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)]),
    I(r'\csc^n x\cot x', r'-\dfrac{\csc^nx}{n}', 'csc(x)**n*cot(x)', '-csc(x)**n/n', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)]),
    I(r'\cot^n x\csc^2x', r'-\dfrac{\cot^{n+1}x}{n+1}', 'cot(x)**n*csc(x)**2', '-cot(x)**(n+1)/(n+1)', m=['usub'], p=[dict(n=2), dict(n=3), dict(n=5)]),
])
sqrtid = G('Half-angle radicals', [
    I(r'\sqrt{1+\cos x}', r'2\sqrt2\,\sin\tfrac x2', 'sqrt(1+cos(x))', '2*sqrt(2)*sin(x/2)', m=['identity']),
    I(r'\sqrt{1-\cos x}', r'-2\sqrt2\,\cos\tfrac x2', 'sqrt(1-cos(x))', '-2*sqrt(2)*cos(x/2)', m=['identity']),
    I(r'\sqrt{1+\sin x}', r'2\left(\sin\tfrac x2-\cos\tfrac x2\right)\ \ (\text{where }\sin\tfrac x2+\cos\tfrac x2>0)', 'sqrt(1+sin(x))', '2*(sin(x/2)-cos(x/2))', m=['identity']),
    I(r'\sqrt{1-\sin x}', r'2\left(\sin\tfrac x2+\cos\tfrac x2\right)\ \ (\text{where }\cos\tfrac x2>\sin\tfrac x2)', 'sqrt(1-sin(x))', '2*(sin(x/2)+cos(x/2))', m=['identity']),
    I(r'\sqrt{1+\cos2x}', r'\sqrt2\,\sin x\quad(\cos x>0)', 'sqrt(1+cos(2*x))', 'sqrt(2)*sin(x)', m=['identity']),
    I(r'\sqrt{1-\cos2x}', r'-\sqrt2\,\cos x\quad(\sin x>0)', 'sqrt(1-cos(2*x))', '-sqrt(2)*cos(x)', m=['identity']),
    I(r'\sqrt{\tan x}', r'\dfrac{1}{2\sqrt2}\ln\dfrac{\tan x-\sqrt{2\tan x}+1}{\tan x+\sqrt{2\tan x}+1}+\dfrac1{\sqrt2}\left[\arctan\!\big(\sqrt{2\tan x}+1\big)+\arctan\!\big(\sqrt{2\tan x}-1\big)\right]', 'sqrt(tan(x))', 'log((tan(x)-sqrt(2*tan(x))+1)/(tan(x)+sqrt(2*tan(x))+1))/(2*sqrt(2))+(atan(sqrt(2*tan(x))+1)+atan(sqrt(2*tan(x))-1))/sqrt(2)', m=['usub', 'partial'], t='elementary, but long'),
    I(r'\dfrac1{\sqrt{\tan x}}', r'\dfrac{1}{2\sqrt2}\ln\dfrac{\tan x+\sqrt{2\tan x}+1}{\tan x-\sqrt{2\tan x}+1}+\dfrac1{\sqrt2}\left[\arctan\!\big(\sqrt{2\tan x}+1\big)+\arctan\!\big(\sqrt{2\tan x}-1\big)\right]', '1/sqrt(tan(x))', 'log((tan(x)+sqrt(2*tan(x))+1)/(tan(x)-sqrt(2*tan(x))+1))/(2*sqrt(2))+(atan(sqrt(2*tan(x))+1)+atan(sqrt(2*tan(x))-1))/sqrt(2)', m=['usub', 'partial'], t='elementary, but long'),
])

SECTIONS = [S('basic', 'The basics', 'The six antiderivatives, their derivative partners, squares, linear arguments, and the u-substitution patterns that cover most of the rest.',
              [six, alt, deriv, sq, lin, usub, sqrtid])]
