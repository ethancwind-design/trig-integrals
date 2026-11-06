#!/usr/bin/env python3
"""Builds the plain study guide: study/src/<slug>.txt -> study/<slug>.html (+ index.html).

Source format (one block per blank-line-separated group; $...$ inline math, $$...$$ display math):
  > intro paragraph
  ## Section heading
  - bullet
  ### 5. Problem title            starts a problem
  Q: the question as printed
  Plan: how to think about it (plain words)
  1. a step                       numbered steps (continuation lines allowed, e.g. a $$...$$ line)
  Answer: final answer
  Careful: the mistake people make here
Run:  python3 study/build.py
"""
import html, re, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")

# slug, sidebar title, source documents (shown under the title)
PAGES = [
    ("quiz5", "Quiz 5 practice problems", "Quiz 5 Practice Problems + Answer Key"),
    ("worksheet", "Arc length and surface area worksheet", "Fall 2026 Math 1400 worksheet + solutions"),
    ("lec35-36", "Lectures 35 and 36", "Practice Problems + Solutions"),
    ("week10-notes", "Week 10 notes", "Applications of Integration, Part 2"),
    ("week10-practice", "Week 10 practice", "Week 10 Practice + Key"),
    ("lec39", "Lecture 39", "Practice Problems + Solutions"),
    ("lec40", "Lecture 40", "Practice Problems + Solutions"),
    ("week11-notes", "Week 11 notes", "Probability and expectation"),
    ("lec42-43", "Lectures 42 and 43", "Practice Problems + Solutions"),
    ("lec44", "Lecture 44", "Practice Problems + Solutions"),
    ("grade-calculator", "Raw score calculator", "Quizzes, final exam, prep quizzes, recitation"),
]

# pages written by hand as an HTML fragment in src/<slug>.html (no solutions toggle)
HAND_PAGES = {"grade-calculator"}


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\$\$(.+?)\$\$", lambda m: "\\[" + m.group(1) + "\\]", s)
    s = re.sub(r"\$(.+?)\$", lambda m: "\\(" + m.group(1) + "\\)", s)
    return s


def render(lines):
    out = []
    i = 0
    in_problem = False
    steps = None
    ul = False
    sol_open = False

    def close_steps():
        nonlocal steps
        if steps is not None:
            out.append("<ol class='steps'>")
            for st in steps:
                out.append("<li>" + "<br>".join(inline(x) for x in st) + "</li>")
            out.append("</ol>")
            steps = None

    def close_ul():
        nonlocal ul
        if ul:
            out.append("</ul>")
            ul = False

    def close_problem():
        nonlocal in_problem, sol_open
        close_steps()
        if sol_open:
            out.append("</div></details>")
            sol_open = False
        if in_problem:
            out.append("</section>")
            in_problem = False

    def open_sol():
        nonlocal sol_open
        if not sol_open:
            out.append("<details class='sol' open><summary>Solution</summary><div class='solbody'>")
            sol_open = True

    table = []

    def flush_table():
        nonlocal table
        if not table:
            return
        rows = []
        for r in table:
            cells = [c.strip() for c in r.strip().strip("|").split("|")]
            if all(re.fullmatch(r":?-{2,}:?", c) for c in cells):
                continue
            rows.append(cells)
        out.append("<div class='tablewrap'><table>")
        for ri, cells in enumerate(rows):
            tag = "th" if ri == 0 else "td"
            out.append("<tr>" + "".join(f"<{tag}>{inline(c)}</{tag}>" for c in cells) + "</tr>")
        out.append("</table></div>")
        table = []

    for raw in lines:
        line = raw.rstrip("\n")
        s = line.strip()
        if not s:
            continue
        if s.startswith("|"):
            table.append(s)
            continue
        flush_table()
        if s.startswith("### "):
            close_ul()
            close_problem()
            m = re.match(r"###\s+(\S+?)\.\s+(.*)", s)
            m2 = re.match(r"###\s+Example\s+(\d+)\s*(?:\(([^)]*)\))?:?\s*(.*)", s)
            if m:
                num, title = m.group(1), m.group(2)
            elif m2:
                num = "Ex. " + m2.group(1)
                title = (m2.group(3) or "").strip() or (m2.group(2) or "")
                if m2.group(2) and m2.group(3):
                    title = m2.group(3) + " (" + m2.group(2) + ")"
            else:
                out.append(f"<h3 class='sub'>{inline(s[4:])}</h3>")
                continue
            pid = re.sub(r"[^a-z0-9]+", "-", ("p" + num).lower())
            out.append(f"<section class='problem' id='{pid}'><h3><span class='pnum'>{html.escape(num)}</span>{inline(title)}</h3>")
            in_problem = True
        elif s.startswith("## "):
            close_ul()
            close_problem()
            out.append(f"<h2>{inline(s[3:])}</h2>")
        elif s.startswith("> "):
            close_ul()
            out.append(f"<p class='intro'>{inline(s[2:])}</p>")
        elif s.startswith("- "):
            close_steps()
            if not ul:
                out.append("<ul>")
                ul = True
            out.append(f"<li>{inline(s[2:])}</li>")
        elif s.startswith("Q: "):
            out.append(f"<div class='q'>{inline(s[3:])}</div>")
        elif s.startswith("Plan: "):
            open_sol()
            out.append(f"<div class='plan'><strong>Plan.</strong> {inline(s[6:])}</div>")
        elif re.match(r"\d+\.\s", s):
            open_sol()
            if steps is None:
                steps = []
            steps.append([re.sub(r"^\d+\.\s+", "", s)])
        elif s.startswith("Answer: "):
            close_steps()
            open_sol()
            out.append(f"<div class='answer'><strong>Answer.</strong> {inline(s[8:])}</div>")
        elif s.startswith("Careful: "):
            close_steps()
            open_sol()
            out.append(f"<div class='careful'><strong>Watch out.</strong> {inline(s[9:])}</div>")
        else:
            if steps is not None:
                steps[-1].append(s)
            else:
                close_ul()
                out.append(f"<p>{inline(s)}</p>")
    flush_table()
    close_ul()
    close_problem()
    return "\n".join(out)


def sidebar(current):
    items = ["<a class='home' href='index.html'>All documents</a>"]
    for slug, title, sub in PAGES:
        cls = " class='cur'" if slug == current else ""
        items.append(f"<a{cls} href='{slug}.html'>{html.escape(title)}<small>{html.escape(sub)}</small></a>")
    return "<nav id='nav'><details id='navd' open><summary>Documents</summary>" + "".join(items) + "</details></nav>"


def page(slug, title, sub, body, tools=True):
    toolbar = '<div class="tools"><button type="button" id="collapse">Hide all solutions</button><button type="button" id="expand">Show all solutions</button></div>' if tools else ""
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)} · Calc study guide</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<link rel="stylesheet" href="study.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script defer src="study.js"></script>
</head>
<body>
{sidebar(slug)}
<main>
<header>
<h1>{html.escape(title)}</h1>
<p class="src">From: {html.escape(sub)}</p>
{toolbar}
</header>
{body}
<footer>Study guide built from your class PDFs. Needs internet once to load the math fonts.</footer>
</main>
</body>
</html>
"""


def index():
    rows = []
    for slug, title, sub in PAGES:
        p = os.path.join(SRC, slug + (".html" if slug in HAND_PAGES else ".txt"))
        n = 0
        if os.path.exists(p) and slug not in HAND_PAGES:
            n = sum(1 for l in open(p, encoding="utf-8") if l.startswith("### "))
        noun = "worked examples" if slug.endswith("notes") else "problems"
        count = "interactive" if slug in HAND_PAGES else (f"{n} {noun}" if n else "coming")
        built = os.path.exists(p)
        link = f"<a href='{slug}.html'>{html.escape(title)}</a>" if built else html.escape(title) + " (coming)"
        rows.append(f"<li>{link}<small>{html.escape(sub)} · {count}</small></li>")
    body = (
        "<p class='intro'>One page per document. Every problem has a plan, every step written out, and the mistake to avoid. "
        "Use \"Hide all solutions\" at the top of a page to try the problems first.</p>"
        "<ul class='docs'>" + "".join(rows) + "</ul>"
    )
    return page("index", "Calc study guide", "Arc length, surface area, averages, centroids, probability", body)


def main():
    for slug, title, sub in PAGES:
        hand = slug in HAND_PAGES
        p = os.path.join(SRC, slug + (".html" if hand else ".txt"))
        if not os.path.exists(p):
            continue
        with open(p, encoding="utf-8") as f:
            body = f.read() if hand else render(f.readlines())
        with open(os.path.join(HERE, slug + ".html"), "w", encoding="utf-8") as f:
            f.write(page(slug, title, sub, body, tools=not hand))
        print("built", slug)
    with open(os.path.join(HERE, "index.html"), "w", encoding="utf-8") as f:
        f.write(index())
    print("built index")


if __name__ == "__main__":
    main()
