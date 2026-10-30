/* Formula sheet: every derivative and integral the practice questions use, typeset with MathJax and rendered from SECTIONS below. */
(function () {
const r = String.raw;
const I = (m, n, w, t) => ({ m, n, w, t });
const $ = s => document.querySelector(s);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

const SECTIONS = [
  { id: 'deriv', h: 'Derivatives', note: 'Use them to check every answer: differentiate your antiderivative and you should get the integrand back.', items: [
    I(r`\frac{d}{dx}\sin x=\cos x`),
    I(r`\frac{d}{dx}\cos x=-\sin x`, 'Every "co-" function gets a minus sign'),
    I(r`\frac{d}{dx}\tan x=\sec^2x`),
    I(r`\frac{d}{dx}\cot x=-\csc^2x`),
    I(r`\frac{d}{dx}\sec x=\sec x\tan x`),
    I(r`\frac{d}{dx}\csc x=-\csc x\cot x`),
    I(r`\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}}`),
    I(r`\frac{d}{dx}\arccos x=-\frac{1}{\sqrt{1-x^2}}`),
    I(r`\frac{d}{dx}\arctan x=\frac{1}{1+x^2}`),
    I(r`\frac{d}{dx}\operatorname{arcsec}x=\frac{1}{x\sqrt{x^2-1}}`),
    I(r`\frac{d}{dx}\ln x=\frac1x`),
    I(r`\frac{d}{dx}e^x=e^x`),
    I(r`\frac{d}{dx}x^n=nx^{n-1}`),
    I(r`\frac{d}{dx}\sqrt x=\frac{1}{2\sqrt x}`)
  ] },
  { id: 'rules', h: 'Derivative rules', note: 'The chain rule is what u-substitution undoes.', items: [
    I(r`\frac{d}{dx}f(g(x))=f'(g(x))\,g'(x)`, r`Chain rule. Example: \(\frac{d}{dx}\sin 3x=3\cos 3x\)`),
    I(r`(uv)'=u'v+uv'`, 'Product rule'),
    I(r`\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}`, 'Quotient rule')
  ] },
  { id: 'dx', h: 'Where dx comes from in a trig substitution', note: 'Each one is the derivative of the substitution.', items: [
    I(r`x=a\sin\theta\;\Rightarrow\;dx=a\cos\theta\,d\theta`),
    I(r`x=a\tan\theta\;\Rightarrow\;dx=a\sec^2\theta\,d\theta`),
    I(r`x=a\sec\theta\;\Rightarrow\;dx=a\sec\theta\tan\theta\,d\theta`)
  ] },
  { id: 'basic', h: 'Basic integrals', note: 'Used in nearly every problem.', items: [
    I(r`\int x^n\,dx=\frac{x^{n+1}}{n+1}+C`, r`for \(n\ne-1\)`),
    I(r`\int\frac1x\,dx=\ln|x|+C`),
    I(r`\int\frac{1}{ax+b}\,dx=\frac1a\ln|ax+b|+C`),
    I(r`\int e^{kx}\,dx=\frac{e^{kx}}{k}+C`),
    I(r`\int\sin x\,dx=-\cos x+C`),
    I(r`\int\cos x\,dx=\sin x+C`),
    I(r`\int\sec^2x\,dx=\tan x+C`),
    I(r`\int\csc^2x\,dx=-\cot x+C`),
    I(r`\int\sec x\tan x\,dx=\sec x+C`),
    I(r`\int\csc x\cot x\,dx=-\csc x+C`),
    I(r`\int\tan x\,dx=-\ln|\cos x|+C`),
    I(r`\int\cot x\,dx=\ln|\sin x|+C`),
    I(r`\int\sec x\,dx=\ln|\sec x+\tan x|+C`),
    I(r`\int\csc x\,dx=-\ln|\csc x+\cot x|+C`),
    I(r`\int\frac{dx}{a^2+x^2}=\frac1a\arctan\frac xa+C`),
    I(r`\int\frac{dx}{\sqrt{a^2-x^2}}=\arcsin\frac xa+C`)
  ] },
  { id: 'ident', h: 'Identities', note: 'Quiz B Q1 asks you to pick the true Pythagorean identities, and the power-reducing formulas turn even powers into something integrable.', items: [
    I(r`\sin^2x+\cos^2x=1`),
    I(r`1+\tan^2x=\sec^2x`, r`so \(\sec^2x-\tan^2x=1\)`),
    I(r`1+\cot^2x=\csc^2x`),
    I(r`\sin2x=2\sin x\cos x`),
    I(r`\begin{aligned}\cos2x&=\cos^2x-\sin^2x\\&=2\cos^2x-1\\&=1-2\sin^2x\end{aligned}`, '', true),
    I(r`\sin^2x=\frac{1-\cos2x}{2}`),
    I(r`\cos^2x=\frac{1+\cos2x}{2}`),
    I(r`\sin^4x=\frac{3-4\cos2x+\cos4x}{8}`),
    I(r`\begin{aligned}\sin A\cos B&=\tfrac12\sin(A+B)\\&\quad+\tfrac12\sin(A-B)\end{aligned}`),
    I(r`\begin{aligned}\cos A\cos B&=\tfrac12\cos(A-B)\\&\quad+\tfrac12\cos(A+B)\end{aligned}`),
    I(r`\begin{aligned}\sin A\sin B&=\tfrac12\cos(A-B)\\&\quad-\tfrac12\cos(A+B)\end{aligned}`)
  ] },
  { id: 'trigpow', h: 'Trig power results', note: 'Quiz 4 #1–7, Week 8 Quiz A Q2–Q3, Lecture 23 #6–7.', items: [
    I(r`\int\sin^2x\,dx=\frac x2-\frac{\sin2x}{4}`),
    I(r`\int\cos^2x\,dx=\frac x2+\frac{\sin2x}{4}`),
    I(r`\int\tan^2x\,dx=\tan x-x`),
    I(r`\int\cot^2x\,dx=-\cot x-x`),
    I(r`\int\sin^3x\,dx=-\cos x+\frac{\cos^3x}{3}`),
    I(r`\int\cos^3x\,dx=\sin x-\frac{\sin^3x}{3}`),
    I(r`\int\tan^3x\,dx=\frac{\tan^2x}{2}+\ln|\cos x|`),
    I(r`\int\cot^3x\,dx=-\frac{\cot^2x}{2}-\ln|\sin x|`),
    I(r`\int\sec^4x\,dx=\tan x+\frac{\tan^3x}{3}`),
    I(r`\int\sin^4x\,dx=\frac{3x}{8}-\frac{\sin2x}{4}+\frac{\sin4x}{32}`, '', true),
    I(r`\begin{aligned}\int\sec^3x\,dx&=\tfrac12\sec x\tan x\\&\quad+\tfrac12\ln|\sec x+\tan x|\end{aligned}`),
    I(r`\begin{aligned}\int\csc^3x\,dx&=-\tfrac12\csc x\cot x\\&\quad-\tfrac12\ln|\csc x+\cot x|\end{aligned}`),
    I(r`\begin{aligned}\int\sec^5x\,dx&=\frac{\sec^3x\tan x}{4}\\&\quad+\frac{3\sec x\tan x}{8}\\&\quad+\frac38\ln|\sec x+\tan x|\end{aligned}`),
    I(r`\begin{aligned}\int\sec^nx\,dx&=\frac{\sec^{n-2}x\tan x}{n-1}\\&\quad+\frac{n-2}{n-1}\int\sec^{n-2}x\,dx\end{aligned}`, 'Reduction formula')
  ] },
  { id: 'moves', h: 'Which move to use', note: 'Match the pattern, then pick the substitution.', items: [
    I(r`\sin^m x\cos^n x`, r`Odd power of sine: save one \(\sin x\), let \(u=\cos x\)`, false, 'Odd sine'),
    I(r`\sin^m x\cos^n x`, r`Odd power of cosine: save one \(\cos x\), let \(u=\sin x\)`, false, 'Odd cosine'),
    I(r`\sin^m x\cos^n x`, r`Both even: power-reduce with \(\frac{1\pm\cos2x}{2}\)`, false, 'Both even'),
    I(r`\tan^m x\sec^n x`, r`\(n\) even: save \(\sec^2x\), let \(u=\tan x\)`, false, 'Even secant'),
    I(r`\tan^m x\sec^n x`, r`\(m\) odd: save \(\sec x\tan x\), let \(u=\sec x\)`, false, 'Odd tangent'),
    I(r`\cos Ax\cos Bx`, 'Use product-to-sum, then integrate each cosine', false, 'Different angles'),
    I(r`\int\sec^3x\,dx`, 'By parts. The integral comes back, so solve for it', false, 'Odd secant alone')
  ] },
  { id: 'trigsub', h: 'Trig substitution', note: 'Lecture 23, Week 8 Quiz B Q2 and Q4, Quiz 4 #8–12 and #15, Recitation #1–2.', items: [
    I(r`\begin{aligned}x&=a\sin\theta\\dx&=a\cos\theta\,d\theta\\\sqrt{a^2-x^2}&=a\cos\theta\end{aligned}`, r`Triangle: opposite \(x\), hypotenuse \(a\), adjacent \(\sqrt{a^2-x^2}\)`, false, r`Type I: root of a² − x²`),
    I(r`\begin{aligned}x&=a\tan\theta\\dx&=a\sec^2\theta\,d\theta\\\sqrt{a^2+x^2}&=a\sec\theta\end{aligned}`, r`Triangle: opposite \(x\), adjacent \(a\), hypotenuse \(\sqrt{a^2+x^2}\)`, false, r`Type II: root of a² + x²`),
    I(r`\begin{aligned}x&=a\sec\theta\\dx&=a\sec\theta\tan\theta\,d\theta\\\sqrt{x^2-a^2}&=a\tan\theta\end{aligned}`, r`Triangle: hypotenuse \(x\), adjacent \(a\), opposite \(\sqrt{x^2-a^2}\)`, false, r`Type III: root of x² − a²`),
    I(null, r`Limits: plug each x-limit into the relation (for example \(x=\sqrt2\) with \(x=\sec\theta\)). If the angle is ugly, read \(\tan\theta\), \(\sin\theta\) or \(\sec\theta\) off the triangle. Try plain u-substitution first: \(\int\frac{x}{\sqrt{1+x^2}}dx=\sqrt{1+x^2}+C\).`, true)
  ] },
  { id: 'shapes', h: 'Answer shapes after back-substituting', note: 'Use these to check your work, not to memorize.', items: [
    I(r`\begin{aligned}\int\sqrt{a^2-x^2}\,dx&=\frac x2\sqrt{a^2-x^2}\\&\quad+\frac{a^2}{2}\arcsin\frac xa\end{aligned}`),
    I(r`\begin{aligned}\int\frac{x^2}{\sqrt{a^2-x^2}}\,dx&=\frac{a^2}{2}\arcsin\frac xa\\&\quad-\frac x2\sqrt{a^2-x^2}\end{aligned}`),
    I(r`\int\frac{dx}{(a^2-x^2)^{3/2}}=\frac{x}{a^2\sqrt{a^2-x^2}}`),
    I(r`\int\frac{dx}{x^2\sqrt{a^2-x^2}}=-\frac{\sqrt{a^2-x^2}}{a^2x}`),
    I(r`\begin{aligned}\int\sqrt{a^2+x^2}\,dx&=\frac x2\sqrt{a^2+x^2}\\&\quad+\frac{a^2}{2}\ln\!\big(x+\sqrt{a^2+x^2}\big)\end{aligned}`),
    I(r`\int\frac{dx}{\sqrt{a^2+x^2}}=\ln\!\big(x+\sqrt{a^2+x^2}\big)`),
    I(r`\int\frac{dx}{(a^2+x^2)^{3/2}}=\frac{x}{a^2\sqrt{a^2+x^2}}`),
    I(r`\int\frac{dx}{x^2\sqrt{a^2+x^2}}=-\frac{\sqrt{a^2+x^2}}{a^2x}`),
    I(r`\begin{aligned}\int\sqrt{x^2-a^2}\,dx&=\frac x2\sqrt{x^2-a^2}\\&\quad-\frac{a^2}{2}\ln\big|x+\sqrt{x^2-a^2}\big|\end{aligned}`),
    I(r`\int\frac{dx}{\sqrt{x^2-a^2}}=\ln\big|x+\sqrt{x^2-a^2}\big|`),
    I(r`\int\frac{dx}{(x^2-a^2)^{3/2}}=-\frac{x}{a^2\sqrt{x^2-a^2}}`),
    I(r`\int\frac{dx}{x^2\sqrt{x^2-a^2}}=\frac{\sqrt{x^2-a^2}}{a^2x}`),
    I(r`\int\frac{\sqrt{x^2-a^2}}{x}\,dx=\sqrt{x^2-a^2}-a\operatorname{arcsec}\frac xa`)
  ] },
  { id: 'pf', h: 'Partial fractions', note: 'Week 8 Quiz A Q4–Q5, Lecture 30 rational areas, Area Between Curves #6.', items: [
    I(r`\frac{2x+3}{(3x+1)(2x+1)}=\frac{A}{3x+1}+\frac{B}{2x+1}`, r`Plug in each root to find \(A=7\), \(B=-4\)`, true),
    I(r`\int\frac{A}{ax+b}\,dx=\frac Aa\ln|ax+b|`, r`So the answer is \(\frac73\ln|3x+1|-2\ln|2x+1|\)`),
    I(r`\frac{x^2-3}{x^2-4}=1+\frac{1}{x^2-4}`, 'Top degree at least the bottom degree: long division first'),
    I(r`\frac{1}{x^2-a^2}=\frac{1}{2a}\left[\frac{1}{x-a}-\frac{1}{x+a}\right]`, r`Integrates to \(\frac1{2a}\ln\left|\frac{x-a}{x+a}\right|\)`, true)
  ] },
  { id: 'parts', h: 'Integration by parts', note: 'Quiz 4 #13–14, Lecture 30 #8, Week 9 Quiz C Q4, Area Between Curves #7–8.', items: [
    I(r`\int u\,dv=uv-\int v\,du`, 'Choose u in the order: Log, Inverse trig, Algebraic, Trig, Exponential', true),
    I(r`\int\ln x\,dx=x\ln x-x`),
    I(r`\int xe^x\,dx=(x-1)e^x`),
    I(r`\int xe^{x-1}\,dx=(x-1)e^{x-1}`),
    I(r`\int x\ln x\,dx=\frac{x^2}{2}\ln x-\frac{x^2}{4}`),
    I(r`\int x^2\ln x\,dx=\frac{x^3}{3}\ln x-\frac{x^3}{9}`),
    I(r`\int(\ln x)^2\,dx=x(\ln x)^2-2x\ln x+2x`),
    I(r`\int x^n\ln x\,dx=\frac{x^{n+1}}{n+1}\ln x-\frac{x^{n+1}}{(n+1)^2}`, 'General version of the last three')
  ] },
  { id: 'area', h: 'Area, Gini and polar', note: 'Lectures 30–31, Recitation #3–4, Area Between Curves #1–14.', items: [
    I(r`A=\int_a^b\big(y_{\text{top}}-y_{\text{bottom}}\big)\,dx`, r`Or \(\int_c^d(x_{\text{right}}-x_{\text{left}})\,dy\)`),
    I(r`G=2\int_0^1\big(x-L(x)\big)\,dx`, 'Gini index. Bigger G means more unequal'),
    I(r`A=\tfrac12\int r^2\,d\theta`, 'Polar area'),
    I(r`A=\tfrac12\int\big(r_{\text{out}}^2-r_{\text{in}}^2\big)\,d\theta`, 'Between two polar curves: square each radius first')
  ] },
  { id: 'volume', h: 'Volume', note: 'Lectures 32–33, Quiz 4 volumes, Week 9 quizzes, Recitation #5.', items: [
    I(r`V=\pi\int R^2\,dx`, 'Disks'),
    I(r`V=\pi\int\big(R^2-r^2\big)\,dx`, r`Washers. \(R\) and \(r\) are distances to the axis. About \(y=k\): \(R=|f(x)-k|\)`),
    I(r`V=2\pi\int(\text{distance to axis})(\text{height})\,dx`, r`Shells. About \(x=c\): distance \(=|x-c|\)`),
    I(r`V=\iiint r\,dz\,dr\,d\theta`, 'Solid in polar (cylindrical) coordinates'),
    I(r`\pi\int_1^{\infty}e^{-2x}\,dx=\frac{\pi}{2e^2}`, 'Improper integral'),
    I(r`\int xe^{x^2}dx=\tfrac12e^{x^2}`, r`Also \(\int(x+c)e^{(x+c)^2}dx=\tfrac12e^{(x+c)^2}\)`),
    I(r`\int x\sqrt{x^2+16}\,dx=\tfrac13\,(x^2+16)^{3/2}`)
  ] },
  { id: 'definite', h: 'Definite integral moves', note: 'Week 9 Quiz A Q2 is the singularities-that-cancel one.', items: [
    I(r`\int_{-a}^{a}f(x)\,dx=0`, r`when \(f\) is odd. If \(f\) is even it is \(2\int_0^af\)`),
    I(r`\int_0^{\pi}\sin^2x\,dx=\frac{\pi}{2}`),
    I(r`\int_0^{\pi}\sin^4x\,dx=\frac{3\pi}{8}`),
    I(r`\int_0^{\pi}\sin^3x\,dx=\frac43`),
    I(null, r`After a substitution, change the limits too. If an integrand has singularities that look like they cancel, such as \(e^x\sec^2x-e^x\tan^2x\), simplify with \(\sec^2x-\tan^2x=1\) before integrating.`, true)
  ] }
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cell = it => `<div class="csf${it.w ? ' w' : ''}">${it.t ? `<b>${esc(it.t)}</b>` : ''}${it.m ? `<div class="csm">\\(${it.m}\\)</div>` : ''}${it.n ? `<small>${it.n}</small>` : ''}</div>`;

function render() {
  const total = SECTIONS.reduce((n, s) => n + s.items.filter(i => i.m).length, 0);
  const jump = SECTIONS.map(s => `<a class="stat" href="#${s.id}">${esc(s.h)}</a>`).join('');
  $('#main').innerHTML = `<section class="hero pagehead"><div class="eyebrow"><a href="index.html">← Trig Quest hub</a> · <a href="codex.html">Codex</a> · Formula sheet</div>
    <h1>Every derivative and integral from the practice questions.</h1>
    <p class="lead">Typeset, in the order you will need them. Each section says which practice problems use it.</p>
    <div class="stats"><span class="stat"><b>${total}</b> formulas</span><span class="stat">every antiderivative <b>checked by differentiating</b></span></div></section>
    <nav class="csjump" aria-label="Sections">${jump}</nav>
    ${SECTIONS.map(s => `<section id="${s.id}"><h2>${esc(s.h)}</h2><p class="gnote">${esc(s.note)}</p><div class="csg">${s.items.map(cell).join('')}</div></section>`).join('')}
    <footer class="csfoot"><p>Every antiderivative on this page was differentiated numerically and compared with its integrand, every derivative was compared with a numerical derivative, and the definite values were integrated numerically.</p></footer>`;
}

function fail(msg, err) { const l = $('#loading'); if (l) l.textContent = msg; console.error(err); }
let started = false;
function start() {
  if (started) return;
  const ready = window.MathJax && MathJax.startup && MathJax.startup.promise;
  if (!ready) { setTimeout(start, 60); return; }
  started = true;
  MathJax.startup.promise.then(() => {
    try { render(); } catch (e) { fail('Something went wrong drawing this page.', e); return; }
    return MathJax.typesetPromise([$('#main')]);
  }).catch(err => fail('The math renderer failed to load. Check your connection and reload.', err));
}

const setTheme = t => { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; };
const t0 = store.get('ti-theme', ''); if (t0) setTheme(t0);
$('#theme').addEventListener('click', () => {
  const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark'; setTheme(next); store.set('ti-theme', next);
});
if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
