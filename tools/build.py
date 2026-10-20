#!/usr/bin/env python3
"""Assemble the single-file game from src/ and assets/.

Writes:
  index.html          full standalone page (open directly or serve from GitHub)
  dist/artifact.html  same page without the document skeleton, for claude.ai artifacts
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

page = (ROOT / "src/page.html").read_text(encoding="utf-8").rstrip("\n")
sprites = (ROOT / "assets/sprites.js").read_text(encoding="utf-8").rstrip("\n")
tiles = (ROOT / "assets/tiles.js").read_text(encoding="utf-8").rstrip("\n")
vfx = (ROOT / "assets/vfx.js").read_text(encoding="utf-8").rstrip("\n")
music = (ROOT / "assets/music.js").read_text(encoding="utf-8").rstrip("\n")
peerjs = (ROOT / "assets/vendor/peerjs.min.js").read_text(encoding="utf-8").rstrip("\n")
game = (ROOT / "src/game.js").read_text(encoding="utf-8").rstrip("\n")

body = f"{page}\n<script>{sprites}</script>\n<script>{tiles}</script>\n<script>{vfx}</script>\n<script>{music}</script>\n<script>/* PeerJS 1.5.4, MIT licence (assets/vendor/peerjs-LICENSE.txt) */\n{peerjs}</script>\n<script>\n{game}\n</script>\n"

skeleton_head = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n"
    "<style>body{margin:0}</style>\n</head>\n<body>\n"
)
(ROOT / "index.html").write_text(skeleton_head + body + "</body>\n</html>\n", encoding="utf-8")
(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist/artifact.html").write_text(body, encoding="utf-8")
print("built index.html and dist/artifact.html")
