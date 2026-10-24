from common import *

PAB = [dict(a=3.0, b=5.0), dict(a=2.0, b=0.7), dict(a=1.3, b=4.1)]

gen = G('Different angles, general $a\\neq\\pm b$', [
    I(r'\sin ax\cos bx', r'-\dfrac{\cos(a+b)x}{2(a+b)}-\dfrac{\cos(a-b)x}{2(a-b)}', 'sin(a*x)*cos(b*x)', '-cos((a+b)*x)/(2*(a+b))-cos((a-b)*x)/(2*(a-b))', p=PAB, m=['identity']),
    I(r'\cos ax\sin bx', r'-\dfrac{\cos(a+b)x}{2(a+b)}+\dfrac{\cos(a-b)x}{2(a-b)}', 'cos(a*x)*sin(b*x)', '-cos((a+b)*x)/(2*(a+b))+cos((a-b)*x)/(2*(a-b))', p=PAB, m=['identity']),
    I(r'\sin ax\sin bx', r'\dfrac{\sin(a-b)x}{2(a-b)}-\dfrac{\sin(a+b)x}{2(a+b)}', 'sin(a*x)*sin(b*x)', 'sin((a-b)*x)/(2*(a-b))-sin((a+b)*x)/(2*(a+b))', p=PAB, m=['identity']),
    I(r'\cos ax\cos bx', r'\dfrac{\sin(a-b)x}{2(a-b)}+\dfrac{\sin(a+b)x}{2(a+b)}', 'cos(a*x)*cos(b*x)', 'sin((a-b)*x)/(2*(a-b))+sin((a+b)*x)/(2*(a+b))', p=PAB, m=['identity']),
])
eq = G('Same angle ($a=b$)', [
    I(r'\sin ax\cos ax', r'-\dfrac{\cos2ax}{4a}', 'sin(a*x)*cos(a*x)', '-cos(2*a*x)/(4*a)', p=P_SMALL),
    I(r'\sin^2ax', r'\dfrac x2-\dfrac{\sin2ax}{4a}', 'sin(a*x)**2', 'x/2-sin(2*a*x)/(4*a)', p=P_SMALL),
    I(r'\cos^2ax', r'\dfrac x2+\dfrac{\sin2ax}{4a}', 'cos(a*x)**2', 'x/2+sin(2*a*x)/(4*a)', p=P_SMALL),
])
conc = G('Concrete cases', [
    I(r'\sin x\cos2x', r'-\dfrac{\cos3x}{6}+\dfrac{\cos x}{2}', 'sin(x)*cos(2*x)', '-cos(3*x)/6+cos(x)/2', m=['identity']),
    I(r'\sin2x\cos x', r'-\dfrac{\cos3x}{6}-\dfrac{\cos x}{2}', 'sin(2*x)*cos(x)', '-cos(3*x)/6-cos(x)/2', m=['identity']),
    I(r'\sin3x\cos5x', r'\dfrac{\cos2x}{4}-\dfrac{\cos8x}{16}', 'sin(3*x)*cos(5*x)', 'cos(2*x)/4-cos(8*x)/16', m=['identity']),
    I(r'\sin2x\sin3x', r'\dfrac{\sin x}{2}-\dfrac{\sin5x}{10}', 'sin(2*x)*sin(3*x)', 'sin(x)/2-sin(5*x)/10', m=['identity']),
    I(r'\cos x\cos3x', r'\dfrac{\sin2x}{4}+\dfrac{\sin4x}{8}', 'cos(x)*cos(3*x)', 'sin(2*x)/4+sin(4*x)/8', m=['identity']),
    I(r'\cos4x\cos6x', r'\dfrac{\sin2x}{4}+\dfrac{\sin10x}{20}', 'cos(4*x)*cos(6*x)', 'sin(2*x)/4+sin(10*x)/20', m=['identity']),
    I(r'\sin x\sin2x\sin3x', r'-\dfrac{\cos2x}{8}-\dfrac{\cos4x}{16}+\dfrac{\cos6x}{24}', 'sin(x)*sin(2*x)*sin(3*x)', '-cos(2*x)/8-cos(4*x)/16+cos(6*x)/24', m=['identity']),
    I(r'\cos x\cos2x\cos3x', r'\dfrac x4+\dfrac{\sin2x}{8}+\dfrac{\sin4x}{16}+\dfrac{\sin6x}{24}', 'cos(x)*cos(2*x)*cos(3*x)', 'x/4+sin(2*x)/8+sin(4*x)/16+sin(6*x)/24', m=['identity']),
])

SECTIONS = [S('angles', 'Products of different angles', 'When the angles differ, product-to-sum turns every product into a sum of single sines or cosines. Orthogonality and Fourier series run on exactly this table.', [gen, eq, conc])]
