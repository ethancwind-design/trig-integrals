#!/usr/bin/env python3
"""Verify every formula numerically, then write ../data.js.

    python3 build.py            # needs mpmath
Exit code 1 if any formula fails.
"""
import importlib, json, sys, os, random
import mpmath as mp

mp.mp.dps = 30
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

MODULES = ['s_start', 's_basic', 's_powers', 's_products', 's_angles', 's_rational', 's_parts',
           's_inverse', 's_trigsub', 's_hyper', 's_definite', 's_special', 's_extra', 's_pdf', 's_recitation']

NS = {k: getattr(mp, k) for k in dir(mp) if not k.startswith('_')}
NS.update(dict(
    abs=abs, acot=lambda x: mp.atan(1 / x), asec=lambda x: mp.acos(1 / x), acsc=lambda x: mp.asin(1 / x),
    arsinh=mp.asinh, arcosh=mp.acosh, artanh=mp.atanh, ln=mp.log, sgn=mp.sign,
    sech=mp.sech, csch=mp.csch, Si=mp.si, Ci=mp.ci, S=mp.fresnels, C=mp.fresnelc,
    df=lambda n: mp.fac2(n), G=mp.catalan,
))

def ev(expr, **env):
    e = dict(NS); e.update(env)
    return eval(expr, e)

def pts(d, n=5):
    lo, hi = d
    return [mp.mpf(lo) + (mp.mpf(hi) - mp.mpf(lo)) * (i + 0.5) / n for i in range(n)]

def close(a, b, tol=mp.mpf('1e-12')):
    a, b = mp.mpmathify(a), mp.mpmathify(b)
    return abs(a - b) <= tol * (1 + abs(a) + abs(b))

def check(it):
    c = it.get('chk')
    if not c: return True, ''
    t = c['type']
    for p in c['p']:
        try:
            if t == 'der':
                for x in pts(c['d']):
                    g = mp.diff(lambda y: ev(c['F'], x=y, **p), x)
                    f = ev(c['f'], x=x, **p)
                    if not close(g, f): return False, f"d/dx F != f at x={mp.nstr(x,6)} params={p}: {mp.nstr(g,12)} vs {mp.nstr(f,12)}"
            elif t == 'id':
                for x in pts(c['d']):
                    l, r = ev(c['lhs'], x=x, **p), ev(c['rhs'], x=x, **p)
                    if not close(l, r): return False, f"identity fails at x={mp.nstr(x,6)} params={p}: {mp.nstr(l,12)} vs {mp.nstr(r,12)}"
            elif t == 'red':
                for x in pts(c['d']):
                    Pp = mp.diff(lambda y: ev(c['P'], x=y, **p), x)
                    rhs = ev(c['f'], x=x, **p) - ev(c['k'], x=x, **p) * ev(c['g'], x=x, **p)
                    if not close(Pp, rhs): return False, f"reduction fails at x={mp.nstr(x,6)} params={p}: {mp.nstr(Pp,12)} vs {mp.nstr(rhs,12)}"
            elif t == 'def':
                a, b = ev(c['a'], **p), ev(c['b'], **p)
                f = lambda y: ev(c['f'], x=y, **p)
                if c['quad'].startswith('osc:'):
                    q = mp.quadosc(f, [a, b], omega=ev(c['quad'][4:], **p))
                elif c['quad'] == 'hi':
                    q = mp.quad(f, [a, b], maxdegree=14)
                elif c['quad'] == 'split':
                    q = mp.quad(f, mp.linspace(a, b, 9))
                else:
                    q = mp.quad(f, [a, b])
                v = ev(c['val'], **p)
                if not close(q, v, mp.mpf(c.get('tol', 1e-9))): return False, f"definite value off, params={p}: quad {mp.nstr(q,14)} vs claimed {mp.nstr(v,14)}"
        except Exception as e:
            return False, f"exception {type(e).__name__}: {e} (params={p})"
    return True, ''

def main():
    sections, bad, n, kinds = [], [], 0, {}
    for name in MODULES:
        path = os.path.join(HERE, name + '.py')
        if not os.path.exists(path):
            print('skip (missing):', name); continue
        mod = importlib.import_module(name)
        for sec in mod.SECTIONS:
            for g in sec['groups']:
                for it in g['items']:
                    if it['k'] == 'txt': continue
                    n += 1; kinds[it['k']] = kinds.get(it['k'], 0) + 1
                    ok, msg = check(it)
                    if not ok:
                        bad.append((sec['id'], g['t'], it['tex'][:70], msg))
            sections.append(sec)
    # strip python checks from shipped data
    def clean(it):
        it = dict(it); it.pop('chk', None); return it
    for sec in sections:
        for g in sec['groups']:
            g['items'] = [clean(i) for i in g['items']]
    meta = dict(total=n, kinds=kinds, sections=len(sections))
    if bad:
        print(f"\n{len(bad)} FAILED of {n}:")
        for b in bad: print(' -', *b)
    else:
        print(f"all {n} formulas verified", kinds)
    out = os.path.join(HERE, '..', 'data.js')
    with open(out, 'w') as f:
        f.write('window.TRIG=' + json.dumps(dict(meta=meta, sections=sections), ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('wrote', os.path.normpath(out), os.path.getsize(out) // 1024, 'KB')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
