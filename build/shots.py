"""Crops every question out of the source PDF into img/q/<key>.webp and writes shots.js (the manifest the site reads).

    python3 build/shots.py            # needs poppler (pdftoppm, pdfimages, pdftotext) and Pillow, numpy

Keys: w8a-N / w8b-N (Week 8 quiz A/B), w9a-N / w9b-N / w9c-N (Week 9 quizzes), l23-NN, l30-NN (Lectures 30-31), l32-NN (Lectures 32-33).
Pages 1-13 of the PDF are Canvas screenshots (cropped by hand-measured boxes); pages 14+ are typeset text (cropped between problem numbers).
"""
import json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image, ImageDraw

PDF = os.path.expanduser('~/Desktop/MATH_1400_Prep_Quizzes_and_Practice_Problems-v2.pdf')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'img', 'q')
os.makedirs(OUT, exist_ok=True)
tmp = tempfile.mkdtemp()
MAXW = 1000
PAD = 18

# ---- Canvas screenshots: (pdf page, x0, y0, x1, y1) in the 2922x2212 page image, and which source page the card sits on
X8 = (1049, 2304)
SHOTS = {
    'w8a-1': (1, *X8, 271, 2046), 'w8a-2': (2, *X8, 398, 1828), 'w8a-3': (3, *X8, 316, 1745), 'w8a-4': (4, *X8, 338, 1761), 'w8a-5': (5, *X8, 378, 2033),
    'w8b-1': (6, *X8, 251, 2212), 'w8b-2': (7, *X8, 244, 2212), 'w8b-3': (8, *X8, 325, 1802), 'w8b-4': (9, *X8, 314, 1828),
    'w9a-2': (10, 818, 1864, 551, 1889), 'w9a-3': (11, 818, 1864, 467, 1739),
    'w9b-2': (12, 780, 1906, 206, 735), 'w9b-3': (12, 780, 1906, 829, 2212),
    'w9c-4': (13, 640, 1736, 254, 1011), 'w9c-5': (13, 640, 1736, 1087, 2142),
}
# the Canvas answer key is visible in these screenshots; blank it so the crop shows the question as posed
ANSWER_BOXES = {'w9b-2': (120, 362, 410, 434)}   # the typed 0.2126 in the numeric input


def run(*a):
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def autocrop(im, pad=PAD, thr=235):
    a = np.asarray(im.convert('L'))
    ys, xs = np.where(a < thr)
    if len(ys) == 0:
        return None
    return im.crop((max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, im.width), min(ys.max() + pad, im.height)))


def save(key, im):
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, key + '.webp')
    im.convert('RGB').save(p, 'WEBP', quality=86, method=6)
    return {'f': f'img/q/{key}.webp', 'w': im.width, 'h': im.height}


def stem_cut(im):
    """y just above the first answer-option separator (a thin light line with white above and below), or None when the card has no options."""
    a = np.asarray(im.convert('L')).astype(int)
    H, W = a.shape
    lo, hi = int(W * .1), int(W * .9)
    for y in range(70, H - 8):
        row = a[y, lo:hi]
        if ((row > 205) & (row < 247)).mean() > .6 and a[y - 5, lo:hi].mean() > 250 and a[y + 5, lo:hi].mean() > 250:
            return y - 6
    return None


manifest = {}

# ---------- screenshots
run('pdfimages', '-j', '-f', '1', '-l', '13', PDF, os.path.join(tmp, 's'))
for key, (pg, x0, x1, y0, y1) in SHOTS.items():
    im = Image.open(os.path.join(tmp, f's-{pg - 1:03d}.jpg')).convert('RGB').crop((x0, y0, x1, y1))
    if key in ANSWER_BOXES:
        ImageDraw.Draw(im).rectangle(ANSWER_BOXES[key], fill=(245, 245, 245))
    manifest[key] = save(key, im)
    cut = stem_cut(im)
    if cut:   # the card without its answer options: the selected radio and bold answer row would give the answer away in the game
        q = im.crop((0, 0, im.width, cut)); ImageDraw.Draw(q).rectangle((0, q.height - 2, q.width, q.height), fill=(205, 209, 212))
        manifest[key]['q'] = save(key + '-q', q)

# ---------- typeset pages: find each problem number with pdftotext -bbox
DPI = 200
S = DPI / 72
FIG_START = {('l30', 9): 541}
SETS = {'l23': (14, 16, 16), 'l30': (27, 30, 20), 'l32': (42, 46, 26)}   # first page, last page, problem count (question copy, before the solutions)
for pre, (p0, p1, n) in SETS.items():
    bb = os.path.join(tmp, pre + '.html')
    run('pdftotext', '-bbox', '-f', str(p0), '-l', str(p1), PDF, bb)
    pages = re.split(r'<page ', open(bb).read())[1:]
    marks = []   # (page, y, number)
    for i, pg in enumerate(pages):
        for x, y, w in re.findall(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="[\d.]+" yMax="[\d.]+">(\d+)\.</word>', pg):
            if float(x) < 130 and int(w) == len(marks) + 1:
                marks.append((p0 + i, float(y), int(w)))
    assert len(marks) == n, (pre, len(marks))
    run('pdftoppm', '-r', str(DPI), '-f', str(p0), '-l', str(p1), '-png', PDF, os.path.join(tmp, pre))
    pimg = {p: Image.open(os.path.join(tmp, f'{pre}-{p:02d}.png')).convert('RGB') for p in range(p0, p1 + 1)}
    # a figure typeset above its problem's number (L30 #9: the lobes sit between #8 and #9)
    cuts = [FIG_START.get((pre, num), y - 6) for pg, y, num in marks]   # top edge of each problem's strip
    for k, (pg, y, num) in enumerate(marks):
        nxt = marks[k + 1] if k + 1 < n else (p1 + 1, 0, 0)
        boxes = []   # (page, x0, y0, x1, y1) in pixels, tight around the ink
        for p in range(pg, min(nxt[0], p1) + 1):
            top = cuts[k] if p == pg else 0
            bot = (cuts[k + 1] - (0 if (pre, nxt[2]) in FIG_START else 10)) if p == nxt[0] else 792
            if p == nxt[0] and p != pg and bot <= 0:
                continue
            if bot <= top:
                continue
            reg = pimg[p].crop((int(70 * S), int(top * S), int(570 * S), int(bot * S)))
            a = np.asarray(reg.convert('L')); ys, xs = np.where(a < 235)
            if len(ys) == 0 or ys.max() - ys.min() < 12:
                continue
            boxes.append((p, int(70 * S) + xs.min(), int(top * S) + ys.min(), int(70 * S) + xs.max(), int(top * S) + ys.max()))
        x0 = max(min(b[1] for b in boxes) - PAD, 0); x1 = max(b[3] for b in boxes) + PAD
        parts = [pimg[p].crop((x0, max(b0 - PAD, 0), x1, b1 + PAD)) for p, _, b0, _, b1 in boxes]
        canvas = Image.new('RGB', (x1 - x0, sum(q.height for q in parts)), 'white')
        yy = 0
        for q in parts:
            canvas.paste(q, (0, yy)); yy += q.height
        manifest[f'{pre}-{num:02d}'] = save(f'{pre}-{num:02d}', canvas)

ALT = {'w8a': 'Week 8 prep quiz A', 'w8b': 'Week 8 prep quiz B', 'w9a': 'Week 9 prep quiz A', 'w9b': 'Week 9 prep quiz B', 'w9c': 'Week 9 prep quiz C',
       'l23': 'Lecture 23 practice problem', 'l30': 'Lectures 30 & 31 practice problem', 'l32': 'Lectures 32 & 33 practice problem'}
for k, v in manifest.items():
    pre, n = k.split('-')
    v['alt'] = f'{ALT[pre]} {int(n)} as it appears in the source PDF' if pre[0] == 'l' else f'{ALT[pre]}, question {int(n)}, as it appears in the source PDF'

old = os.path.join(ROOT, 'shots.js')
if os.path.exists(old):   # keep the recitation crops (build/recitation.py owns them)
    t = open(old).read(); manifest.update({k: v for k, v in json.loads(t[t.index('{'):t.rindex('}') + 1]).items() if k.startswith('rec')})
with open(os.path.join(ROOT, 'shots.js'), 'w') as f:
    f.write('/* generated by build/shots.py: crops of the source PDF, keyed by problem */\nwindow.SHOTS=' + json.dumps(manifest, separators=(',', ':'), ensure_ascii=False) + ';\n')
tot = sum(os.path.getsize(os.path.join(OUT, x)) for x in os.listdir(OUT))
print(len(manifest), 'images (incl. recitation)', round(tot / 1024), 'KB')
