# Trig Integrals

Open `index.html` (double-click works; needs internet once for MathJax and fonts).

- `index.html`, `style.css`, `app.js` – the site. Design tokens, fonts and graph-paper surface come from *Trig Substitution in Motion*.
- `motion.html` – that animated lesson (copy of ~/Downloads/Trig Substitution in Motion.html, plus a "← Integral library" link).
- `data.js` – generated. Do not edit by hand.
- `build/` – the formula sources (`s_*.py`). Each entry has LaTeX plus a python expression; `build.py` differentiates every antiderivative and integrates every definite integral numerically (mpmath, 30 digits) and refuses to write `data.js` if anything fails.

Add or fix a formula:

    python3 -m venv .venv && .venv/bin/pip install mpmath
    # edit build/s_<section>.py
    .venv/bin/python build/build.py
