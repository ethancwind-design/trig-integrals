"""Recitation: Worksheet 4 (Weeks 7 & 8). Each item's `src` is 'Recitation · Worksheet 4 · #N...'; shotui.js maps it to the worksheet photo and the handwritten solution."""
from common import *

R4 = 'Recitation · Worksheet 4'

tri = G('#1 · Reference triangles', [
    Q(r'\text{(a) with }x=\sin\theta:\ \ \theta+\cos\theta+3\tan\theta+C=\ ?', r'\arcsin x+\sqrt{1-x^2}+\dfrac{3x}{\sqrt{1-x^2}}+C',
      'asin(x)+cos(asin(x))+3*tan(asin(x))', 'asin(x)+sqrt(1-x**2)+3*x/sqrt(1-x**2)', d=(0.1, 0.9), m=['trigsub'], src=R4 + ' · #1(a)', t='opposite $x$, hypotenuse $1$, adjacent $\\sqrt{1-x^2}$'),
    Q(r'\text{(b) with }x=\sec\theta,\ x>0:\ \ \tan\theta+C=\ ?', r'\sqrt{x^2-1}+C',
      'tan(asec(x))', 'sqrt(x**2-1)', d=(1.2, 4), m=['trigsub'], src=R4 + ' · #1(b)', t='hypotenuse $x$, adjacent $1$, opposite $\\sqrt{x^2-1}$'),
    Q(r'\text{(c) with }x=4\tan\theta,\ \theta\text{ in QI}:\ \ \theta^2-\csc\theta+C=\ ?', r'\arctan^2\!\left(\dfrac x4\right)-\dfrac{\sqrt{x^2+16}}{x}+C',
      'atan(x/4)**2-1/sin(atan(x/4))', 'atan(x/4)**2-sqrt(x**2+16)/x', d=(0.5, 5), m=['trigsub'], src=R4 + ' · #1(c)', t='opposite $x$, adjacent $4$, hypotenuse $\\sqrt{x^2+16}$'),
], quiz=True)
ev2 = G('#2 · Trig substitution', [
    I(r'\dfrac{48}{x^2\sqrt{x^2+16}}', r'-\dfrac{3\sqrt{x^2+16}}{x}', '48/(x**2*sqrt(x**2+16))', '-3*sqrt(x**2+16)/x', d=(0.3, 4), m=['trigsub'], src=R4 + ' · #2',
      t='$x=4\\tan\\theta$, then $u=\\sin\\theta$',
      note=r'$dx=4\sec^2\theta\,d\theta$, $\sqrt{x^2+16}=4\sec\theta$, so the integral is $3\int\dfrac{\cos\theta}{\sin^2\theta}\,d\theta=-3\csc\theta+C$. No absolute value needed on $\left(-\tfrac\pi2,\tfrac\pi2\right)$, where $\sec\theta>0$.'),
], quiz=True)
gini = G('#3 · Gini index', [
    DI(r'G\text{ for }f(x)=x^2', r'\dfrac13', '2*(x-x**2)', '0', '1', '1/3', m=['definite'], src=R4 + ' · #3(a)', t='$G=2\\int_0^1(x-f(x))\\,dx$'),
    DI(r'G\text{ for }f(x)=\tfrac12(x^4+x)', r'\dfrac3{10}', '2*(x-(x**4+x)/2)', '0', '1', '3/10', m=['definite'], src=R4 + ' · #3(b)', t='$G=\\int_0^1(x-x^4)\\,dx$'),
    QT(r'\text{Country A has }f(x)=x^2\text{ and country B has }f(x)=\tfrac12(x^4+x).\ \text{Which is more unequal?}', r'\text{A: }G=\tfrac13>\tfrac3{10}\text{ (a bigger Gini index means a bigger gap from equality)}', src=R4 + ' · #3(c)'),
], quiz=True)
pol = G('#4 · Polar area', [
    QT(r'\text{Area of }r=f(\theta)\text{ in polar coordinates}', r'A=\tfrac12\int_{\theta_1}^{\theta_2}\left(f(\theta)\right)^2d\theta', src=R4 + ' · #4(a)', t='derived in lecture from the area of a thin triangle'),
    QT(r'\text{Limits of integration for the region bounded by }r=\sqrt{\theta(\pi^2-\theta^2)}', r'0\le\theta\le\pi', src=R4 + ' · #4(b)',
       t='start at the origin and trace the boundary counter-clockwise: $\\theta$ runs from $0$ to $\\pi$'),
    DI(r'\text{Area enclosed by }r=\sqrt{\theta(\pi^2-\theta^2)}', r'\dfrac{\pi^4}{8}\approx12.18', '(pi**2*x-x**3)/2', '0', 'pi', 'pi**4/8', m=['definite'], src=R4 + ' · #4(c)', t='$\\tfrac12\\int_0^\\pi(\\pi^2\\theta-\\theta^3)\\,d\\theta$'),
], quiz=True)
vol = G('#5 · Volume of revolution', [
    QT(r'\text{Volume element }dV\text{ for }y=\sin x,\ 0\le x\le\pi,\text{ about the }x\text{-axis (vertical }dx\text{ slice)}', r'dV=\pi\sin^2x\,dx', src=R4 + ' · #5(d)',
       t='each slice is a disk of radius $\\sin x$ and thickness $dx$'),
    DI(r'V\text{: }y=\sin x,\ 0\le x\le\pi,\text{ about the }x\text{-axis}', r'\dfrac{\pi^2}{2}\approx4.93', 'pi*sin(x)**2', '0', 'pi', 'pi**2/2', m=['definite', 'identity'], src=R4 + ' · #5(e)', t='$\\pi\\int_0^\\pi\\sin^2x\\,dx$, power-reduce'),
], quiz=True)
SECTIONS = [S('recitation', 'Recitation', 'Worksheet 4 (Weeks 7 and 8), the one worked in groups during recitation: reference triangles, a trig substitution, the Gini index, polar area and a disk volume. Each problem shows your worksheet as handed out, and the handwritten solutions are attached. Answers are hidden: click a problem to reveal it. Every answer was re-derived and checked numerically.', [tri, ev2, gini, pol, vol])]
