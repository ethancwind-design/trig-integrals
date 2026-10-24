from common import *

ABp = [dict(a=3.0, b=1.2), dict(a=2.5, b=-0.9)]       # a^2 > b^2
BAp = [dict(a=1.0, b=2.0), dict(a=0.7, b=1.9)]        # b^2 > a^2

simple = G('Simple rational forms', [
    I(r'\dfrac1{1+\sin x}', r'\tan x-\sec x', '1/(1+sin(x))', 'tan(x)-sec(x)', m=['identity'], t='multiply by $1-\\sin x$'),
    I(r'\dfrac1{1-\sin x}', r'\tan x+\sec x', '1/(1-sin(x))', 'tan(x)+sec(x)', m=['identity']),
    I(r'\dfrac1{1+\cos x}', r'\tan\tfrac x2', '1/(1+cos(x))', 'tan(x/2)', m=['identity']),
    I(r'\dfrac1{1-\cos x}', r'-\cot\tfrac x2', '1/(1-cos(x))', '-cot(x/2)', m=['identity']),
    I(r'\dfrac{\sin x}{1+\cos x}', r'-\ln(1+\cos x)', 'sin(x)/(1+cos(x))', '-log(1+cos(x))', m=['usub']),
    I(r'\dfrac{\sin x}{1-\cos x}', r'\ln(1-\cos x)', 'sin(x)/(1-cos(x))', 'log(1-cos(x))', m=['usub']),
    I(r'\dfrac{\cos x}{1+\sin x}', r'\ln(1+\sin x)', 'cos(x)/(1+sin(x))', 'log(1+sin(x))', m=['usub']),
    I(r'\dfrac{\cos x}{1-\sin x}', r'-\ln(1-\sin x)', 'cos(x)/(1-sin(x))', '-log(1-sin(x))', m=['usub']),
    I(r'\dfrac{1}{1+\sin x+\cos x}', r'\ln\left|1+\tan\tfrac x2\right|', '1/(1+sin(x)+cos(x))', 'log(abs(1+tan(x/2)))', m=['weierstrass']),
    I(r'\dfrac{1}{\sin x(1+\cos x)}', r'\tfrac14\tan^2\tfrac x2+\tfrac12\ln\left|\tan\tfrac x2\right|', '1/(sin(x)*(1+cos(x)))', 'tan(x/2)**2/4+log(abs(tan(x/2)))/2', m=['weierstrass']),
    I(r'\dfrac{1}{\sin x+\cos x}', r'\dfrac1{\sqrt2}\ln\left|\tan\!\left(\tfrac x2+\tfrac\pi8\right)\right|', '1/(sin(x)+cos(x))', 'log(abs(tan(x/2+pi/8)))/sqrt(2)', m=['identity'], t='$\\sin x+\\cos x=\\sqrt2\\sin(x+\\tfrac\\pi4)$'),
    I(r'\dfrac{1}{\sin x-\cos x}', r'\dfrac1{\sqrt2}\ln\left|\tan\!\left(\tfrac x2-\tfrac\pi8\right)\right|', '1/(sin(x)-cos(x))', 'log(abs(tan(x/2-pi/8)))/sqrt(2)', d=(0.9, 1.4), m=['identity']),
    I(r'\dfrac{\sin x}{\sin x+\cos x}', r'\dfrac12\left(x-\ln|\sin x+\cos x|\right)', 'sin(x)/(sin(x)+cos(x))', '(x-log(abs(sin(x)+cos(x))))/2', m=['identity']),
    I(r'\dfrac{\cos x}{\sin x+\cos x}', r'\dfrac12\left(x+\ln|\sin x+\cos x|\right)', 'cos(x)/(sin(x)+cos(x))', '(x+log(abs(sin(x)+cos(x))))/2', m=['identity']),
    I(r'\dfrac{1}{1+\tan x}', r'\dfrac12\left(x+\ln|\sin x+\cos x|\right)', '1/(1+tan(x))', '(x+log(abs(sin(x)+cos(x))))/2', m=['identity']),
    I(r'\dfrac{\tan x}{1+\tan x}', r'\dfrac12\left(x-\ln|\sin x+\cos x|\right)', 'tan(x)/(1+tan(x))', '(x-log(abs(sin(x)+cos(x))))/2', m=['identity']),
    I(r'\dfrac{A\sin x+B\cos x}{C\sin x+D\cos x}', r'\dfrac{(AC+BD)\,x+(BC-AD)\ln|C\sin x+D\cos x|}{C^2+D^2}',
      '(a*sin(x)+b*cos(x))/(c*sin(x)+q*cos(x))', '((a*c+b*q)*x+(b*c-a*q)*log(abs(c*sin(x)+q*cos(x))))/(c**2+q**2)',
      p=[dict(a=2.0, b=3.0, c=1.5, q=1.0), dict(a=-1.0, b=2.0, c=1.0, q=2.0)], m=['identity'], t='write numerator $=\\lambda\\cdot$denominator $+\\mu\\cdot$derivative'),
    I(r'\dfrac{\sin x\cos x}{1+\sin^4x}', r'\tfrac12\arctan(\sin^2x)', 'sin(x)*cos(x)/(1+sin(x)**4)', 'atan(sin(x)**2)/2', m=['usub']),
])
wei = G('$\\dfrac{1}{a+b\\sin x}$ and $\\dfrac{1}{a+b\\cos x}$ (Weierstrass)', [
    I(r'\dfrac{1}{a+b\sin x}', r'\dfrac{2}{\sqrt{a^2-b^2}}\arctan\dfrac{a\tan\frac x2+b}{\sqrt{a^2-b^2}}\quad(a^2>b^2)', '1/(a+b*sin(x))', '2*atan((a*tan(x/2)+b)/sqrt(a**2-b**2))/sqrt(a**2-b**2)', p=ABp, m=['weierstrass']),
    I(r'\dfrac{1}{a+b\sin x}', r'\dfrac{1}{\sqrt{b^2-a^2}}\ln\left|\dfrac{a\tan\frac x2+b-\sqrt{b^2-a^2}}{a\tan\frac x2+b+\sqrt{b^2-a^2}}\right|\quad(b^2>a^2)', '1/(a+b*sin(x))', 'log(abs((a*tan(x/2)+b-sqrt(b**2-a**2))/(a*tan(x/2)+b+sqrt(b**2-a**2))))/sqrt(b**2-a**2)', p=BAp, m=['weierstrass']),
    I(r'\dfrac{1}{a+b\cos x}', r'\dfrac{2}{\sqrt{a^2-b^2}}\arctan\!\left(\sqrt{\dfrac{a-b}{a+b}}\tan\tfrac x2\right)\quad(a^2>b^2)', '1/(a+b*cos(x))', '2*atan(sqrt((a-b)/(a+b))*tan(x/2))/sqrt(a**2-b**2)', p=ABp, m=['weierstrass']),
    I(r'\dfrac{1}{a+b\cos x}', r'\dfrac{1}{\sqrt{b^2-a^2}}\ln\left|\dfrac{\sqrt{b+a}+\sqrt{b-a}\tan\frac x2}{\sqrt{b+a}-\sqrt{b-a}\tan\frac x2}\right|\quad(b^2>a^2)', '1/(a+b*cos(x))', 'log(abs((sqrt(b+a)+sqrt(b-a)*tan(x/2))/(sqrt(b+a)-sqrt(b-a)*tan(x/2))))/sqrt(b**2-a**2)', p=[dict(a=1.0, b=2.0), dict(a=0.7, b=1.9)], d=(0.3, 0.8), m=['weierstrass']),
    I(r'\dfrac{1}{a\sin x+b\cos x}', r'\dfrac{1}{\sqrt{a^2+b^2}}\ln\left|\tan\dfrac{x+\varphi}{2}\right|,\ \ \varphi=\arctan\tfrac ba\ (a>0)',
      '1/(a*sin(x)+b*cos(x))', 'log(abs(tan((x+atan(b/a))/2)))/sqrt(a**2+b**2)', p=[dict(a=3.0, b=4.0), dict(a=2.0, b=-0.5)], m=['identity']),
    I(r'\dfrac{1}{a^2\cos^2x+b^2\sin^2x}', r'\dfrac{1}{ab}\arctan\!\left(\dfrac ba\tan x\right)', '1/(a**2*cos(x)**2+b**2*sin(x)**2)', 'atan(b*tan(x)/a)/(a*b)', p=[dict(a=2.0, b=3.0), dict(a=1.5, b=0.7)], m=['usub']),
    I(r'\dfrac{1}{a^2\cos^2x-b^2\sin^2x}', r'\dfrac{1}{2ab}\ln\left|\dfrac{a+b\tan x}{a-b\tan x}\right|', '1/(a**2*cos(x)**2-b**2*sin(x)**2)', 'log(abs((a+b*tan(x))/(a-b*tan(x))))/(2*a*b)', p=[dict(a=3.0, b=1.0), dict(a=2.5, b=0.8)], m=['usub']),
    I(r'\dfrac{1}{1+\sin^2x}', r'\dfrac1{\sqrt2}\arctan\!\left(\sqrt2\tan x\right)', '1/(1+sin(x)**2)', 'atan(sqrt(2)*tan(x))/sqrt(2)', m=['usub']),
    I(r'\dfrac{1}{1+\cos^2x}', r'\dfrac1{\sqrt2}\arctan\!\left(\dfrac{\tan x}{\sqrt2}\right)', '1/(1+cos(x)**2)', 'atan(tan(x)/sqrt(2))/sqrt(2)', m=['usub']),
    I(r'\dfrac{1}{3+\sin^2x}', r'\dfrac{1}{2\sqrt3}\arctan\!\left(\dfrac{2\tan x}{\sqrt3}\right)', '1/(3+sin(x)**2)', 'atan(2*tan(x)/sqrt(3))/(2*sqrt(3))', m=['usub']),
    I(r'\dfrac{1}{2+\cos x}', r'\dfrac{2}{\sqrt3}\arctan\!\left(\dfrac{\tan(x/2)}{\sqrt3}\right)', '1/(2+cos(x))', '2*atan(tan(x/2)/sqrt(3))/sqrt(3)', m=['weierstrass']),
    I(r'\dfrac{1}{3+5\cos x}', r'\dfrac14\ln\left|\dfrac{2+\tan\frac x2}{2-\tan\frac x2}\right|', '1/(3+5*cos(x))', 'log(abs((2+tan(x/2))/(2-tan(x/2))))/4', d=(0.3, 0.8), m=['weierstrass']),
])
SECTIONS = [S('rational', 'Rational functions of sin & cos', 'Quotients of trig polynomials. Try the identities first; if they fail, the universal substitution $t=\\tan\\tfrac x2$ ($\\sin x=\\tfrac{2t}{1+t^2}$, $\\cos x=\\tfrac{1-t^2}{1+t^2}$, $dx=\\tfrac{2\\,dt}{1+t^2}$) always works.', [simple, wei])]
