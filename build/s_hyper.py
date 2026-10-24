from common import *

H = [dict(a=1.2, b=0.7), dict(a=0.6, b=-0.4)]
basic = G('Basic hyperbolic integrals', [
    I(r'\sinh x', r'\cosh x', 'sinh(x)', 'cosh(x)'),
    I(r'\cosh x', r'\sinh x', 'cosh(x)', 'sinh(x)'),
    I(r'\tanh x', r'\ln\cosh x', 'tanh(x)', 'log(cosh(x))'),
    I(r'\coth x', r'\ln|\sinh x|', 'coth(x)', 'log(abs(sinh(x)))'),
    I(r'\operatorname{sech}x', r'\arctan(\sinh x)=2\arctan\!\left(\tanh\tfrac x2\right)=\operatorname{gd}x', 'sech(x)', 'atan(sinh(x))'),
    I(r'\operatorname{csch}x', r'\ln\left|\tanh\tfrac x2\right|', 'csch(x)', 'log(abs(tanh(x/2)))'),
    I(r'\operatorname{sech}^2x', r'\tanh x', 'sech(x)**2', 'tanh(x)'),
    I(r'\operatorname{csch}^2x', r'-\coth x', 'csch(x)**2', '-coth(x)'),
    I(r'\operatorname{sech}x\tanh x', r'-\operatorname{sech}x', 'sech(x)*tanh(x)', '-sech(x)'),
    I(r'\operatorname{csch}x\coth x', r'-\operatorname{csch}x', 'csch(x)*coth(x)', '-csch(x)'),
])
pwr = G('Powers & products', [
    I(r'\sinh^2x', r'\dfrac{\sinh2x}{4}-\dfrac x2', 'sinh(x)**2', 'sinh(2*x)/4-x/2'),
    I(r'\cosh^2x', r'\dfrac{\sinh2x}{4}+\dfrac x2', 'cosh(x)**2', 'sinh(2*x)/4+x/2'),
    I(r'\tanh^2x', r'x-\tanh x', 'tanh(x)**2', 'x-tanh(x)'),
    I(r'\coth^2x', r'x-\coth x', 'coth(x)**2', 'x-coth(x)'),
    I(r'\sinh^3x', r'\dfrac{\cosh^3x}{3}-\cosh x', 'sinh(x)**3', 'cosh(x)**3/3-cosh(x)'),
    I(r'\cosh^3x', r'\sinh x+\dfrac{\sinh^3x}{3}', 'cosh(x)**3', 'sinh(x)+sinh(x)**3/3'),
    I(r'\operatorname{sech}^3x', r'\tfrac12\operatorname{sech}x\tanh x+\tfrac12\arctan(\sinh x)', 'sech(x)**3', 'sech(x)*tanh(x)/2+atan(sinh(x))/2', m=['reduction']),
    I(r'\operatorname{csch}^3x', r'-\tfrac12\operatorname{csch}x\coth x-\tfrac12\ln\left|\tanh\tfrac x2\right|', 'csch(x)**3', '-csch(x)*coth(x)/2-log(abs(tanh(x/2)))/2', m=['reduction']),
    I(r'\sinh x\cosh x', r'\dfrac{\sinh^2x}{2}=\dfrac{\cosh2x}{4}', 'sinh(x)*cosh(x)', 'sinh(x)**2/2'),
    I(r'\sinh^4x', r'\dfrac{\sinh4x}{32}-\dfrac{\sinh2x}{4}+\dfrac{3x}{8}', 'sinh(x)**4', 'sinh(4*x)/32-sinh(2*x)/4+3*x/8'),
    I(r'\cosh^4x', r'\dfrac{\sinh4x}{32}+\dfrac{\sinh2x}{4}+\dfrac{3x}{8}', 'cosh(x)**4', 'sinh(4*x)/32+sinh(2*x)/4+3*x/8'),
    RED(r'\int\sinh^nx\,dx=\dfrac{\sinh^{n-1}x\cosh x}{n}-\dfrac{n-1}{n}\int\sinh^{n-2}x\,dx', 'sinh(x)**(n-1)*cosh(x)/n', 'sinh(x)**n', 'sinh(x)**(n-2)', '-(n-1)/n', [dict(n=k) for k in (2, 3, 4, 5, 6)], m=['reduction']),
    RED(r'\int\cosh^nx\,dx=\dfrac{\cosh^{n-1}x\sinh x}{n}+\dfrac{n-1}{n}\int\cosh^{n-2}x\,dx', 'cosh(x)**(n-1)*sinh(x)/n', 'cosh(x)**n', 'cosh(x)**(n-2)', '(n-1)/n', [dict(n=k) for k in (2, 3, 4, 5, 6)], m=['reduction']),
    I(r'\sinh ax\cosh bx', r'\dfrac{\cosh(a+b)x}{2(a+b)}+\dfrac{\cosh(a-b)x}{2(a-b)}', 'sinh(a*x)*cosh(b*x)', 'cosh((a+b)*x)/(2*(a+b))+cosh((a-b)*x)/(2*(a-b))', p=[dict(a=3.0, b=1.2), dict(a=2.0, b=0.7)], m=['identity']),
    I(r'x\sinh x', r'x\cosh x-\sinh x', 'x*sinh(x)', 'x*cosh(x)-sinh(x)', m=['parts']),
    I(r'x\cosh x', r'x\sinh x-\cosh x', 'x*cosh(x)', 'x*sinh(x)-cosh(x)', m=['parts']),
    I(r'e^{ax}\sinh bx', r'\dfrac{e^{ax}(a\sinh bx-b\cosh bx)}{a^2-b^2}', 'exp(a*x)*sinh(b*x)', 'exp(a*x)*(a*sinh(b*x)-b*cosh(b*x))/(a**2-b**2)', p=[dict(a=1.3, b=0.6), dict(a=0.5, b=1.4)], m=['parts']),
])
inv = G('Inverse hyperbolic functions & algebraic partners', [
    I(r'\operatorname{arsinh}x', r'x\operatorname{arsinh}x-\sqrt{x^2+1}', 'asinh(x)', 'x*asinh(x)-sqrt(x**2+1)', m=['parts']),
    I(r'\operatorname{arcosh}x', r'x\operatorname{arcosh}x-\sqrt{x^2-1}\ (x>1)', 'acosh(x)', 'x*acosh(x)-sqrt(x**2-1)', d=(1.2, 3), m=['parts']),
    I(r'\operatorname{artanh}x', r'x\operatorname{artanh}x+\tfrac12\ln(1-x^2)\ (|x|<1)', 'atanh(x)', 'x*atanh(x)+log(1-x**2)/2', d=(0.1, 0.9), m=['parts']),
    I(r'\dfrac1{\sqrt{x^2+a^2}}', r'\operatorname{arsinh}\dfrac xa', '1/sqrt(x**2+a**2)', 'asinh(x/a)', p=[dict(a=2.0), dict(a=0.7)], d=(0.3, 2.5), m=['trigsub']),
    I(r'\dfrac1{\sqrt{x^2-a^2}}', r'\operatorname{arcosh}\dfrac xa\ (x>a)', '1/sqrt(x**2-a**2)', 'acosh(x/a)', p=[dict(a=2.0), dict(a=1.5)], d=(2.3, 4.5), m=['trigsub']),
    I(r'\dfrac1{a^2-x^2}', r'\dfrac1a\operatorname{artanh}\dfrac xa\ (|x|<a)', '1/(a**2-x**2)', 'atanh(x/a)/a', p=[dict(a=2.0), dict(a=3.0)], d=(0.2, 1.8), m=['partial']),
    I(r'\dfrac1{a^2-x^2}', r'\dfrac1a\operatorname{arcoth}\dfrac xa\ (|x|>a)', '1/(a**2-x**2)', 'atanh(a/x)/a', p=[dict(a=2.0), dict(a=1.5)], d=(2.3, 4.5), m=['partial']),
    I(r'\sqrt{x^2+a^2}', r'\dfrac x2\sqrt{x^2+a^2}+\dfrac{a^2}{2}\operatorname{arsinh}\dfrac xa', 'sqrt(x**2+a**2)', 'x*sqrt(x**2+a**2)/2+a**2*asinh(x/a)/2', p=[dict(a=2.0), dict(a=0.7)], m=['trigsub']),
    I(r'\sqrt{x^2-a^2}', r'\dfrac x2\sqrt{x^2-a^2}-\dfrac{a^2}{2}\operatorname{arcosh}\dfrac xa', 'sqrt(x**2-a**2)', 'x*sqrt(x**2-a**2)/2-a**2*acosh(x/a)/2', p=[dict(a=2.0), dict(a=1.5)], d=(2.3, 4.5), m=['trigsub']),
    I(r'\dfrac1{x\sqrt{a^2-x^2}}', r'-\dfrac1a\operatorname{arsech}\dfrac xa', '1/(x*sqrt(a**2-x**2))', '-asech(x/a)/a', p=[dict(a=2.0), dict(a=3.0)], d=(0.2, 1.8), m=['trigsub']),
])
SECTIONS = [S('hyper', 'Hyperbolic & inverse hyperbolic', 'The hyperbolic twins of the trig integrals ($\\cosh^2-\\sinh^2=1$ replaces $\\sin^2+\\cos^2=1$), plus the logarithmic forms that arise from the Type II and III radicals.', [basic, pwr, inv])]
