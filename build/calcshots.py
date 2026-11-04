"""Crops every problem of the Calc path source PDFs (the problem sets, never the solution files) into img/q/<key>.webp and merges them
into shots.js, the manifest the game and lessons read to show the original question.

    python3 build/calcshots.py                 # reads the PDFs from ~/Downloads (or $CALC_PDF_DIR); needs poppler and Pillow, numpy

Keys: q5-NN (Quiz 5 practice), ws-NN (arc length / surface area worksheet), l35-NN, l39-NN, l40-NN, l42-NN, l44-NN (lecture practice
problems) and w10-X (Week 10 in-class practice: A, 1-7). Each crop runs from a problem number to the next problem number (or to a
"Part"/"Answer" heading, so the Week 10 answer bank is never cropped) and may continue across a page break.
build/shots.py keeps these entries when it regenerates shots.js.
"""
import json, os, re, subprocess, tempfile
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.environ.get('CALC_PDF_DIR', os.path.expanduser('~/Downloads'))
OUT = os.path.join(ROOT, 'img', 'q')
os.makedirs(OUT, exist_ok=True)
tmp = tempfile.mkdtemp()
DPI, PAD, MAXW, TOP = 200, 14, 1000, 52
S = DPI / 72

# (key prefix, file, alt text, kind): "list" = numbered "N." at the left margin; "w10" = Week 10's "Problem N." headings
SOURCES = [
    ('q5', 'Quiz 5 Practice Problems (3).pdf', 'Quiz 5 practice problem', 'list'),
    ('ws', 'Fall_2026_Math_1400 (10).pdf', 'Arc length and surface area worksheet problem', 'list'),
    ('l35', 'Lectures 35 36 Practice Problems.pdf', 'Lectures 35 and 36 practice problem', 'list'),
    ('l39', 'Lecture 39 Practice Problems.pdf', 'Lecture 39 practice problem', 'list'),
    ('l40', 'Lecture 40 Practice Problems.pdf', 'Lecture 40 practice problem', 'list'),
    ('l42', 'Lectures 42 43 Practice Problems.pdf', 'Lectures 42 and 43 practice problem', 'list'),
    ('l44', 'Lecture 44 Practice Problems.pdf', 'Lecture 44 practice problem', 'list'),
    ('w10', 'Week_10_Practice (1).pdf', 'Week 10 in-class practice problem', 'w10'),
]


def load(pdf):
    subprocess.run(['pdftotext', '-bbox', pdf, os.path.join(tmp, 'b.html')], check=True)
    pages = re.split(r'<page ', open(os.path.join(tmp, 'b.html')).read())[1:]
    out = []
    for pg in pages:
        w, h = map(float, re.match(r'width="([\d.]+)" height="([\d.]+)"', pg).groups())
        words = [(float(a), float(b), float(c), float(d), t) for a, b, c, d, t in
                 re.findall(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', pg)]
        out.append({'w': w, 'h': h, 'words': words})
    return out


def starts_list(pages):
    """(number, page, y) of each "N." at the left margin, in reading order, accepting only 1, 2, 3, ... in sequence"""
    found, nxt = [], 1
    for pi, pg in enumerate(pages):
        for x0, y0, x1, y1, t in sorted(pg['words'], key=lambda w: w[1]):
            if re.fullmatch(r'\d+\.', t) and 60 <= x0 <= 115 and int(t[:-1]) == nxt:
                found.append((str(nxt), pi, y0)); nxt += 1
    return found


def starts_w10(pages):
    found = []
    for pi, pg in enumerate(pages):
        ws = sorted(pg['words'], key=lambda w: (round(w[1]), w[0]))
        for i, (x0, y0, x1, y1, t) in enumerate(ws[:-1]):
            nx = ws[i + 1][4]
            if x0 < 115 and t == 'Part' and nx == 'A':
                found.append(('A', pi, y0))
            if x0 < 115 and t in ('Problem', 'Challenge') and re.fullmatch(r'\d+\.', nx):
                found.append((nx[:-1], pi, y0))
    return found


def stops(pages, starts):
    """lines that end a problem without starting one: 'Part B', 'Part C', 'Answer bank', 'Challenge problem' headings"""
    out = []
    for pi, pg in enumerate(pages):
        for x0, y0, x1, y1, t in pg['words']:
            if x0 < 115 and t in ('Part', 'Answer', 'Challenge') and not any(s[1] == pi and abs(s[2] - y0) < 2 for s in starts):
                out.append(('stop', pi, y0))
    return out


def footer(pg):
    ys = [y0 for x0, y0, x1, y1, t in pg['words'] if re.fullmatch(r'\d+', t) and 270 < x0 < 340 and y0 > pg['h'] * .85]
    return (min(ys) - 3) if ys else pg['h'] - 30


manifest = {}
for prefix, fn, alt, kind in SOURCES:
    pdf = os.path.join(SRC, fn)
    pages = load(pdf)
    starts = starts_list(pages) if kind == 'list' else starts_w10(pages)
    marks = sorted(starts + stops(pages, starts), key=lambda m: (m[1], m[2]))
    subprocess.run(['pdftoppm', '-r', str(DPI), '-png', pdf, os.path.join(tmp, prefix)], check=True)
    ndig = len(str(len(pages)))
    imgs = [Image.open(os.path.join(tmp, f'{prefix}-{i + 1:0{ndig}d}.png')).convert('RGB') for i in range(len(pages))]

    def cut(pi, y, back=22):
        """a y (points) just above the line starting at y: the middle of the longest ink-free band, so tall math of the previous problem never leaks in"""
        a = np.asarray(imgs[pi].convert('L')); ink = (a < 235).any(axis=1)
        lo, hi = int(max(y - back, 0) * S), int((y + 3) * S)
        best, run = (0, None), None
        for r in range(lo, hi):
            if not ink[r]:
                run = r if run is None else run
                if r - run + 1 > best[0]: best = (r - run + 1, run)
            else: run = None
        return (best[1] + best[0] / 2) / S if best[1] is not None else y - 6

    for key, pi, y in starts:
        nxt = next((m for m in marks if (m[1], m[2]) > (pi, y)), None)
        end_pi, end_y = (nxt[1], cut(nxt[1], nxt[2])) if nxt else (len(pages) - 1, footer(pages[-1]))
        pieces = []
        for p in range(pi, end_pi + 1):
            t = cut(p, y, 10) if p == pi else TOP
            b = end_y if p == end_pi else footer(pages[p])
            if b > t: pieces.append(imgs[p].crop((0, int(t * S), imgs[p].width, int(b * S))))
        canvas = Image.new('RGB', (max(p.width for p in pieces), sum(p.height for p in pieces)), 'white')
        yy = 0
        for p in pieces: canvas.paste(p, (0, yy)); yy += p.height
        a = np.asarray(canvas.convert('L')); ys, xs = np.where(a < 235)
        canvas = canvas.crop((max(xs.min() - PAD, 0), max(ys.min() - PAD, 0), min(xs.max() + PAD, canvas.width), min(ys.max() + PAD, canvas.height)))
        if canvas.width > MAXW: canvas = canvas.resize((MAXW, round(canvas.height * MAXW / canvas.width)), Image.LANCZOS)
        k = f'{prefix}-{int(key):02d}' if key.isdigit() else f'{prefix}-{key}'
        canvas.save(os.path.join(OUT, k + '.webp'), 'WEBP', quality=88, method=6)
        manifest[k] = {'f': f'img/q/{k}.webp', 'w': canvas.width, 'h': canvas.height, 'alt': f'{alt} {key} as it appears in the source PDF'}
    print(prefix, sum(1 for k in manifest if k.startswith(prefix + '-')), 'crops')

old = os.path.join(ROOT, 'shots.js')
t = open(old).read()
cur = json.loads(t[t.index('{'):t.rindex('}') + 1])
mine = tuple(p + '-' for p, *_ in SOURCES)
cur = {k: v for k, v in cur.items() if not k.startswith(mine)}
cur.update(manifest)
with open(old, 'w') as f:
    f.write('/* generated by build/shots.py: crops of the source PDF, keyed by problem */\nwindow.SHOTS=' + json.dumps(cur, separators=(',', ':'), ensure_ascii=False) + ';\n')
print(len(manifest), 'Calc crops;', len(cur), 'entries in shots.js')
