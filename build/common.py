"""Item constructors + numeric verifiers for the trig-integral library.

Every item carries python expressions (mpmath syntax) next to its LaTeX so that
`build.py` can check it numerically before data.js is written.
"""
import re

P_DEFAULT = [dict(a=1.7, b=0.6, c=2.3, k=0.5, n=3, m=2, p=1.4, q=0.7),
             dict(a=3.0, b=-1.3, c=1.1, k=0.8, n=4, m=3, p=2.2, q=1.6)]
P_SMALL = [dict(a=0.5, b=0.2, c=1.0, n=3, m=2), dict(a=0.8, b=-0.1, c=1.0, n=4, m=3)]
D0 = (0.3, 1.1)

FN_PATTERNS = [
    ('arcsin', r'\\arcsin|\\operatorname\{arcsin'), ('arccos', r'\\arccos'), ('arctan', r'\\arctan'),
    ('arccot', r'\\operatorname\{arccot'), ('arcsec', r'\\operatorname\{arcsec'), ('arccsc', r'\\operatorname\{arccsc'),
    ('arsinh', r'\\operatorname\{arsinh'), ('arcosh', r'\\operatorname\{arcosh'), ('artanh', r'\\operatorname\{artanh'),
    ('sinh', r'\\sinh'), ('cosh', r'\\cosh'), ('tanh', r'\\tanh'), ('coth', r'\\coth'),
    ('sech', r'\\operatorname\{sech'), ('csch', r'\\operatorname\{csch'),
    ('sin', r'\\sin(?!h)'), ('cos', r'\\cos(?!h)'), ('tan', r'\\tan(?!h)'), ('cot', r'\\cot(?!h)'),
    ('sec', r'\\sec'), ('csc', r'\\csc'),
]

def fn_tags(*texts):
    s = ' '.join(texts)
    return [name for name, pat in FN_PATTERNS if re.search(pat, s)]

def _base(kind, tex, **kw):
    d = dict(k=kind, tex=tex)
    for key in ('t', 'm', 'kw', 'note', 'src'):
        if kw.get(key) not in (None, (), ''):
            d[key] = kw[key] if key != 'm' else list(kw[key])
    return d

def I(i, r, f, F, d=D0, p=None, var='x', **kw):
    """Indefinite:  ∫ i dx = r + C   (f integrand, F antiderivative; python strings)."""
    it = _base('i', rf'\int {i}\,d{var}', **kw)
    it['r'] = r
    it['fn'] = fn_tags(i, r)
    it['chk'] = dict(type='der', f=f, F=F, d=d, p=p or P_DEFAULT)
    return it

def DI(full, val_tex, f, a, b, val, p=None, quad='quad', tol=1e-9, **kw):
    """Definite / improper:  full LaTeX incl. ∫ limits; val python expr; f integrand."""
    it = _base('d', full, **kw)
    it['r'] = val_tex
    it['fn'] = fn_tags(full, val_tex)
    it['chk'] = dict(type='def', f=f, a=a, b=b, val=val, p=p or P_DEFAULT, quad=quad, tol=tol)
    return it

def ID(tex, lhs, rhs, d=D0, p=None, **kw):
    """Identity: tex is the whole equation; lhs/rhs python."""
    it = _base('id', tex, **kw)
    it['fn'] = fn_tags(tex)
    it['chk'] = dict(type='id', lhs=lhs, rhs=rhs, d=d, p=p or P_DEFAULT)
    return it

def DER(fn_tex, d_tex, f, g, d=D0, p=None, **kw):
    """Derivative table row."""
    it = _base('der', fn_tex, **kw)
    it['r'] = d_tex
    it['fn'] = fn_tags(fn_tex, d_tex)
    it['chk'] = dict(type='der', f=g, F=f, d=d, p=p or P_DEFAULT)
    return it

def RED(tex, P, f, g, k, params, d=D0, **kw):
    """Reduction formula  ∫f = P + k ∫g   checked as  P' = f - k g  for each param set."""
    it = _base('red', tex, **kw)
    it['fn'] = fn_tags(tex)
    it['chk'] = dict(type='red', P=P, f=f, g=g, k=k, d=d, p=params)
    return it

def NE(i, r, f, F, d=D0, p=None, **kw):
    """No elementary antiderivative; r is the special-function form (checked)."""
    it = _base('ne', rf'\int {i}\,dx', **kw)
    it['r'] = r
    it['fn'] = fn_tags(i, r)
    it['chk'] = dict(type='der', f=f, F=F, d=d, p=p or P_DEFAULT)
    return it

def NO(i, why, **kw):
    """Integral with no closed form at all (nothing to check)."""
    it = _base('no', rf'\int {i}\,dx', **kw)
    it['r'] = why
    it['fn'] = fn_tags(i)
    return it

def TXT(html, **kw):
    it = dict(k='txt', html=html)
    for key in ('t',):
        if key in kw: it[key] = kw[key]
    return it

def G(t, items, note=None, quiz=False, cols=None):
    g = dict(t=t, items=items)
    if note: g['note'] = note
    if quiz: g['quiz'] = True
    if cols: g['cols'] = cols
    return g

def S(id, title, blurb, groups, icon=None):
    return dict(id=id, title=title, blurb=blurb, groups=groups, icon=icon)


def Q(prob, ans, lhs, rhs, d=D0, p=None, **kw):
    """Practice item whose answer is an equality of two python expressions (e.g. theta -> x conversions)."""
    it = _base('q', prob, **kw)
    it['r'] = ans
    it['fn'] = fn_tags(prob, ans)
    it['chk'] = dict(type='id', lhs=lhs, rhs=rhs, d=d, p=p or P_DEFAULT)
    return it

def QT(prob, ans, **kw):
    """Practice item with a text-only answer (no numeric check possible)."""
    it = _base('q', prob, **kw)
    it['r'] = ans
    it['fn'] = fn_tags(prob, ans)
    return it
