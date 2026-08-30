#!/usr/bin/env python3
"""Embed every Markdown file under showcase/ into portfolio-data.js.

The portfolio view reads documents from this embedded data first, so the site
works even when opened directly from the file system (file://) where browsers
block runtime fetch() of local files. Re-run this any time you add or edit a
document in showcase/:

    python3 make_portfolio.py

Each document is written as its own readable template-literal block (real
newlines, no \\n escapes), only escaping the characters JavaScript requires
(backslash, backtick, and ``${``) so the file stays human-readable.
"""

import json
import pathlib

ROOT = pathlib.Path("showcase")
OUT = pathlib.Path("js/portfolio-data.js")


def js_template_escape(s: str) -> str:
    """Escape a string so it can be embedded verbatim in a JS template literal."""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


docs = sorted(ROOT.rglob("*.md"))

lines = ["window.PORTFOLIO_DATA = (() => {", "  const DATA = {};"]
for md in docs:
    path = md.as_posix()
    body = js_template_escape(md.read_text(encoding="utf-8"))
    lines.append(f"  DATA[{json.dumps(path)}] = `{body}`;")
lines.append("  return DATA;")
lines.append("})();")

OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"embedded {len(docs)} documents -> {OUT}")
