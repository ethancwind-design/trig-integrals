#!/usr/bin/env python3
"""Turn ref_src.json (the hand-written identity / calculus cheat sheets) into ../refdata.js.

Every row that is a plain equation in sin/cos/tan/... is parsed and checked numerically at random
points. Rows that parse and pass get v=1 (shown as "checked"); rows that fail abort the build; rows
the mini-parser cannot read (±, sums, limits, text…) are shipped unchecked.

    python3 ref_build.py
"""
import json, os, random, re, sys
import mpmath as mp

HERE = os.path.dirname(os.path.abspath(__file__))
mp.mp.dps = 25

class Skip(Exception):
    pass

FUNCS = {
    'sin': mp.sin, 'cos': mp.cos, 'tan': mp.tan, 'cot': mp.cot, 'sec': mp.sec, 'csc': mp.csc,
    'sinh': mp.sinh, 'cosh': mp.cosh, 'tanh': mp.tanh, 'coth': mp.coth,
    'arcsin': mp.asin, 'arccos': mp.acos, 'arctan': mp.atan, 'ln': mp.log,
    'sech': mp.sech, 'csch': mp.csch,
    'arccot': lambda x: mp.pi / 2 - mp.atan(x), 'arcsec': lambda x: mp.acos(1 / x), 'arccsc': lambda x: mp.asin(1 / x),
    'arsinh': mp.asinh, 'arcosh': mp.acosh, 'artanh': mp.atanh,
}
GREEK = {'theta', 'alpha', 'beta', 'gamma', 'varphi', 'phi', 'psi'}
BAD = re.compile(r'\\(text|textbf|iff|Rightarrow|to|sum|prod|int|lim|binom|begin|ldots|cdots|approx|le|ge|neq|ne|mathbf|boldsymbol|operatorname\{(sgn|arcsin|arccos|arctan)\}\^|xrightarrow|infty|mathbb|cases|Gamma|dots|cdot\s*\\cdot)|[<>:]|_|\\\\|\\left\||\|')

def tokenize(s):
    s = s.replace(r'\left', '').replace(r'\right', '').replace(r'\!', '').replace(r'\,', '').replace(r'\;', '').replace(r'\ ', '')
    s = s.replace(r'\big', '').replace(r'\Big', '')
    toks, i = [], 0
    while i < len(s):
        c = s[i]
        if c.isspace(): i += 1; continue
        if c == '\\':
            m = re.match(r'\\([A-Za-z]+)', s[i:])
            if not m: raise Skip('bad cmd')
            name = m.group(1)
            if name == 'operatorname':
                m2 = re.match(r'\\operatorname\{([A-Za-z]+)\}', s[i:])
                if not m2: raise Skip('opname')
                toks.append(('f', m2.group(1))); i += m2.end(); continue
            toks.append(('c', name)); i += m.end(); continue
        if c.isdigit() or (c == '.' and i + 1 < len(s) and s[i + 1].isdigit()):
            m = re.match(r'\d+(\.\d+)?', s[i:]); toks.append(('n', m.group(0))); i += m.end(); continue
        if c.isalpha(): toks.append(('v', c)); i += 1; continue
        if c in '+-=/*^(){}[],': toks.append(('o', c)); i += 1; continue
        raise Skip('char ' + c)
    return toks

class P:
    def __init__(self, toks, env):
        self.t, self.i, self.env = toks, 0, env
    def peek(self): return self.t[self.i] if self.i < len(self.t) else (None, None)
    def eat(self): x = self.peek(); self.i += 1; return x
    def isop(self, c): return self.peek() == ('o', c)

    def expr(self):
        v = self.term()
        while self.peek() in (('o', '+'), ('o', '-')):
            op = self.eat()[1]; w = self.term()
            v = v + w if op == '+' else v - w
        return v
    def term(self):
        v = self.unary()
        while True:
            k, x = self.peek()
            if (k, x) == ('o', '/'): self.eat(); v = v / self.unary()
            elif (k, x) in (('o', '*'), ('c', 'cdot'), ('c', 'times')): self.eat(); v = v * self.unary()
            elif self.starts_factor(): v = v * self.power()
            else: return v
    def starts_factor(self):
        k, x = self.peek()
        if k in ('n', 'v', 'f'): return True
        if (k, x) == ('o', '(') or (k, x) == ('o', '{') or (k, x) == ('o', '['): return True
        if k == 'c' and x in GREEK | set(FUNCS) | {'frac', 'tfrac', 'dfrac', 'sqrt', 'pi', 'ln'}: return True
        return False
    def unary(self):
        if self.isop('-'): self.eat(); return -self.unary()
        if self.isop('+'): self.eat(); return self.unary()
        return self.power()
    def power(self):
        b = self.atom()
        if self.isop('^'):
            self.eat()
            if self.peek() == ('c', 'circ'): self.eat(); return b * mp.pi / 180
            e = self.group_or_token(); return b ** e
        return b
    def group_or_token(self):
        if self.isop('{'):
            self.eat(); v = self.expr(); self.expect('}'); return v
        return self.atom_simple()
    def expect(self, c):
        if self.eat() != ('o', c): raise Skip('expected ' + c)
    def atom_simple(self):
        k, x = self.eat()
        if k == 'n': return mp.mpf(x)
        if k == 'v': return self.var(x)
        if k == 'c' and x in GREEK: return self.var(x)
        if k == 'c' and x == 'pi': return mp.pi
        raise Skip('atom')
    def var(self, name):
        if name == 'e': return mp.e
        if name in ('i', 'd', 'k', 'n', 'm'): raise Skip('reserved var ' + name)
        return self.env['gen'](name)
    def arg_for_func(self):
        # a function argument: parenthesised group, or a run of simple factors (no functions)
        if self.isop('('):
            self.eat(); v = self.expr(); self.expect(')'); return v
        v = None
        while True:
            k, x = self.peek()
            ok = k in ('n', 'v') or (k == 'c' and (x in GREEK or x in ('pi', 'frac', 'tfrac', 'dfrac', 'sqrt')))
            if not ok: break
            f = self.power()
            v = f if v is None else v * f
        if v is None: raise Skip('no arg')
        return v
    def atom(self):
        k, x = self.peek()
        if k == 'n': self.eat(); return mp.mpf(x)
        if k == 'v': self.eat(); return self.var(x)
        if k == 'o' and x == '(':
            self.eat(); v = self.expr(); self.expect(')'); return v
        if k == 'o' and x == '{':
            self.eat(); v = self.expr(); self.expect('}'); return v
        if k == 'o' and x == '[':
            self.eat(); v = self.expr(); self.expect(']'); return v
        if k == 'c':
            self.eat()
            if x in GREEK: return self.var(x)
            if x == 'pi': return mp.pi
            if x in ('frac', 'tfrac', 'dfrac'):
                a = self.group_or_token(); b = self.group_or_token(); return a / b
            if x == 'sqrt':
                if self.isop('['):
                    self.eat(); n = self.expr(); self.expect(']'); a = self.group_or_token(); return a ** (1 / n)
                a = self.group_or_token(); return mp.sqrt(a)
            if x in FUNCS:
                return self.apply(x)
            raise Skip('cmd ' + x)
        if k == 'f':
            self.eat()
            if x in FUNCS: return self.apply(x)
            raise Skip('opname ' + x)
        raise Skip('unexpected %s' % (self.peek(),))
    def apply(self, name):
        pw = None
        if self.isop('^'):
            self.eat(); pw = self.group_or_token()
        a = self.arg_for_func()
        v = FUNCS[name](a)
        return v ** pw if pw is not None else v

def to_value(s, vals_fn, seen):
    toks = tokenize(s)
    p = P(toks, dict(vals={}, seen=seen, gen=vals_fn))
    v = p.expr()
    if p.i != len(toks): raise Skip('trailing')
    return v

def split_top(s, seps=('=',)):
    out, depth, cur = [], 0, ''
    i = 0
    while i < len(s):
        c = s[i]
        if c in '{([': depth += 1
        if c in '})]': depth -= 1
        if c == '=' and depth == 0 and (i == 0 or s[i - 1] not in '<>!\\') : out.append(cur); cur = ''
        else: cur += c
        i += 1
    out.append(cur)
    return out

def segments(tex):
    parts = re.split(r'\\qquad|\\quad|,\\ ', tex)
    return [p.strip().rstrip(',').strip() for p in parts if '=' in p]

rng = random.Random(7)
ALLOWED = {'theta', 'alpha', 'beta', 'gamma', 'varphi', 'phi', 'psi', 'x', 'y', 't'}

def check_row(tex, tri, title=''):
    if BAD.search(tex): return None
    if re.fullmatch(r'A\+B\+C=\\pi', tex.replace(' ', '')): return None
    variants = [tex]
    if r'\pm' in tex or r'\mp' in tex:
        variants = [tex.replace(r'\pm', '+').replace(r'\mp', '-'), tex.replace(r'\pm', '-').replace(r'\mp', '+')]
    allowed = ALLOWED | ({'A', 'B', 'C'} if tri else set())
    base = 'theta' if r'\theta' in tex else 'x'
    weier = bool(re.search(r'(?<![a-zA-Z\\])t(?![a-zA-Z])', tex)) and 'tanh' not in tex
    last_fail = None
    for var in variants:
        segs = segments(var)
        if not segs: return None
        okv = True
        for seg in segs:
            sides = [z for z in split_top(seg) if z.strip()]
            if len(sides) < 2: return None
            for trial in range(4):
                vals = {}
                def gen(name):
                    if name not in allowed: raise Skip('free var ' + name)
                    if name not in vals:
                        if name == 't' and weier:
                            vals['t'] = mp.tan(gen(base) / 2)
                        else:
                            vals[name] = mp.mpf(rng.uniform(0.25, 0.8))
                    return vals[name]
                try:
                    if tri:
                        vals['A'] = mp.mpf(rng.uniform(0.6, 1.2)); vals['B'] = mp.mpf(rng.uniform(0.6, 1.2)); vals['C'] = mp.pi - vals['A'] - vals['B']
                    xs = [to_value(z, gen, set()) for z in sides]
                except Skip:
                    return None
                except ZeroDivisionError:
                    continue
                for u in xs[1:]:
                    if abs(u - xs[0]) > 1e-10 * (1 + abs(xs[0])):
                        okv = False; last_fail = ('FAIL', seg, [mp.nstr(z, 10) for z in xs]); break
                if not okv: break
            if not okv: break
        if okv: return 'OK'
    return last_fail

def main():
    parts = json.load(open(os.path.join(HERE, 'ref_src.json')))
    ok = fail = skip = 0
    bad = []
    out_parts = []
    for p in parts:
        osecs = []
        for s in p['sections']:
            ogroups = []
            for g in s['groups']:
                tri = 'A + B + C' in g['title'] or 'A+B+C' in g['title']
                rows = []
                if g.get('kind'):
                    ogroups.append(dict(t=g['title'], kind=g['kind'], wide=bool(g.get('wide')), kw=g.get('kw', ''), f=g.get('f', [])))
                    continue
                for row in g['f']:
                    tex_s, note = row[0], (row[1] if len(row) > 1 else '')
                    item = [tex_s, note]
                    if tex_s and tex_s != '#':
                        res = check_row(tex_s, tri, g['title'])
                        if res == 'OK': ok += 1; item.append(1)
                        elif res is None: skip += 1
                        else: fail += 1; bad.append((s['id'], g['title'], res))
                    rows.append(item)
                ogroups.append(dict(t=g['title'], kw=g.get('kw', ''), f=rows))
            osecs.append(dict(id=s['id'], title=s['title'], short=s.get('short', s['title']), groups=ogroups))
        out_parts.append(dict(id=p['id'], title=p['title'], sub=p['sub'], color=p['color'], sections=osecs))
    print(f'rows checked OK: {ok}, skipped (unparsed): {skip}, FAILED: {fail}')
    for b in bad: print(' FAIL', b)
    out = os.path.join(HERE, '..', 'refdata.js')
    with open(out, 'w') as f:
        f.write('window.REF=' + json.dumps(out_parts, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('wrote', os.path.normpath(out), os.path.getsize(out) // 1024, 'KB')
    sys.exit(1 if fail else 0)

if __name__ == '__main__':
    main()
