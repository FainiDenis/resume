#!/usr/bin/env python3
"""Embed every Markdown file under showcase/ into portfolio-data.js.

The portfolio view reads documents from this embedded data first, so the site
works even when opened directly from the file system (file://) where browsers
block runtime fetch() of local files. Re-run this any time you add or edit a
document in showcase/:

    python3 make_portfolio.py
"""

import json
import pathlib

ROOT = pathlib.Path("showcase")
OUT = pathlib.Path("js/portfolio-data.js")

data = {}
for md in sorted(ROOT.rglob("*.md")):
    data[md.as_posix()] = md.read_text(encoding="utf-8")

OUT.write_text(
    "window.PORTFOLIO_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n",
    encoding="utf-8",
)

print(f"embedded {len(data)} documents -> {OUT}")