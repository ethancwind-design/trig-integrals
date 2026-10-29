"""Crops the 14 problems of the Area Between Curves problem set out of build/src/area-between-curves.pdf into img/q/abc-NN.webp
(pages 1-2 only: the solutions on pages 3-8 are never cropped) and merges them into shots.js, the manifest the lessons read
for the "Original question" button.

    python3 build/abcshots.py          # needs poppler (pdftoppm, pdftotext) and Pillow, numpy

Problems 8 and 9 include the "Part II: The Gini Index" introduction above them (9 also shows problem 8, which its part (b) refers to).
Problems 10-14 sit in two columns on page 2, so each crop is one column wide.
build/shots.py keeps these abc-* entries when it regenerates shots.js.
"""
import json, os, re, subprocess, tempfile
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'build', 'src', 'area-between-curves.pdf')
OUT = os.path.join(ROOT, 'img', 'q')
os.makedirs(OUT, exist_ok=True)
tmp = tempfile.mkdtemp()
DPI, PAD, MAXW, FOOT, TOP = 240, 16, 1000, 736, 8  # FOOT: points from the top where the page number starts (cropped away)
S = DPI / 72

subprocess.run(['pdftotext', '-bbox', PDF, os.path.join(tmp, 'b.html')], check=True)
pages = re.split(r'<page ', open(os.path.join(tmp, 'b.html')).read())[1:]
words = [[(float(x), float(y), t) for x, y, t in re.findall(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="[\d.]+" yMax="[\d.]+">([^<]*)</word>', pg)] for pg in pages]

def num_at(pg, lo, hi, n):
    """y of the problem number `n.` whose left edge is in [lo, hi) on page index pg"""
    hit = [(x, y) for x, y, t in words[pg] if t == f'{n}.' and lo <= x < hi]
    assert len(hit) == 1, (n, hit)
    return hit[0][1]

def heading(pg, tag):
    """y of the line that starts with 'Part' and has `tag` right after it"""
    ys = [y for x, y, t in words[pg] if t == tag]
    assert len(ys) == 1, (tag, ys)
    return ys[0]

p1 = {n: num_at(0, 80, 90, n) for n in range(1, 10)}
part2 = heading(0, 'II:')                                                      # "Part II: The Gini Index" introduction
part1 = min(y for x, y, t in words[0] if t == 'Part' and y > p1[2])           # "Part I: Area Between Curves" sits between problems 2 and 3
p2 = {n: num_at(1, 60, 80, n) if n % 2 == 0 else num_at(1, 310, 320, n) for n in range(10, 15)}
LEFT, RIGHT, FULL = (60, 307), (307, 570), (60, 570)

subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-f', '1', '-l', '2', PDF, os.path.join(tmp, 'p')], check=True)
img = {i: Image.open(os.path.join(tmp, f'p-{i + 1}.png')).convert('RGB') for i in range(2)}

def gap(pg, cols, y, back):
    """where to cut just above the line that starts at y (points): the middle of the longest ink-free band between y-back and y+3,
    so tall fractions and figure axes of the previous problem never leak into this crop"""
    a = np.asarray(img[pg].convert('L'))[:, int(cols[0] * S):int(cols[1] * S)]
    ink = (a < 235).any(axis=1)
    lo, hi = int((y - back) * S), int((y + 3) * S)
    best, run = (0, None), None
    for r in range(lo, hi):
        if not ink[r]:
            run = r if run is None else run
            if r - run + 1 > best[0]:
                best = (r - run + 1, run)
        else:
            run = None
    return (best[1] + best[0] / 2) / S if best[1] is not None else y - TOP

c1 = {n: gap(0, FULL, p1[n], 30) for n in range(2, 10)}
cP1, cP2 = gap(0, FULL, part1, 14), gap(0, FULL, part2, 14)
c3 = gap(0, FULL, p1[3], 30)
c2 = {10: p2[10] - TOP, 11: p2[11] - TOP, 12: gap(1, LEFT, p2[12], 25), 13: gap(1, RIGHT, p2[13], 25), 14: gap(1, LEFT, p2[14], 25)}

# (problem number, page index, x range, top, bottom) in points
plan = [(1, 0, FULL, p1[1] - TOP, c1[2]), (2, 0, FULL, c1[2], cP1), (3, 0, FULL, c3, c1[4]),
        (4, 0, FULL, c1[4], c1[5]), (5, 0, FULL, c1[5], c1[6]), (6, 0, FULL, c1[6], c1[7]), (7, 0, FULL, c1[7], cP2),
        (8, 0, FULL, cP2, c1[9]), (9, 0, FULL, cP2, FOOT),
        (10, 1, LEFT, c2[10], c2[12]), (11, 1, RIGHT, c2[11], c2[13]), (12, 1, LEFT, c2[12], c2[14]), (13, 1, RIGHT, c2[13], FOOT), (14, 1, LEFT, c2[14], FOOT)]

manifest = {}
for num, pg, (x0, x1), t, b in plan:
    reg = img[pg].crop((int(x0 * S), int(t * S), int(x1 * S), int(b * S)))
    a = np.asarray(reg.convert('L')); ys, xs = np.where(a < 235)
    canvas = reg.crop((max(xs.min() - PAD, 0), max(ys.min() - PAD, 0), min(xs.max() + PAD, reg.width), min(ys.max() + PAD, reg.height)))
    if canvas.width > MAXW:
        canvas = canvas.resize((MAXW, round(canvas.height * MAXW / canvas.width)), Image.LANCZOS)
    key = f'abc-{num:02d}'
    canvas.save(os.path.join(OUT, key + '.webp'), 'WEBP', quality=88, method=6)
    manifest[key] = {'f': f'img/q/{key}.webp', 'w': canvas.width, 'h': canvas.height, 'alt': f'Area between curves problem {num} as it appears in the source PDF'}

old = os.path.join(ROOT, 'shots.js')
t = open(old).read()
cur = json.loads(t[t.index('{'):t.rindex('}') + 1])
cur = {k: v for k, v in cur.items() if not k.startswith('abc-')}
cur.update(manifest)
with open(old, 'w') as f:
    f.write('/* generated by build/shots.py: crops of the source PDF, keyed by problem */\nwindow.SHOTS=' + json.dumps(cur, separators=(',', ':'), ensure_ascii=False) + ';\n')
print(len(manifest), 'Area Between Curves crops;', len(cur), 'entries in shots.js')
