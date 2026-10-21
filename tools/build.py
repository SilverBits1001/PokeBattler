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
fxpack = (ROOT / "assets/fxpack.js").read_text(encoding="utf-8").rstrip("\n")
layouts = (ROOT / "assets/layouts.js").read_text(encoding="utf-8").rstrip("\n")
arenas = (ROOT / "assets/arenas.js").read_text(encoding="utf-8").rstrip("\n")
stages_js = ROOT / "assets/stages.js"
stages = stages_js.read_text(encoding="utf-8").rstrip("\n") if stages_js.exists() else ""
shiny_js = ROOT / "assets/shiny.js"
shiny = shiny_js.read_text(encoding="utf-8").rstrip("\n") if shiny_js.exists() else ""
music = (ROOT / "assets/music.js").read_text(encoding="utf-8").rstrip("\n")
peerjs = (ROOT / "assets/vendor/peerjs.min.js").read_text(encoding="utf-8").rstrip("\n")
game = (ROOT / "src/game.js").read_text(encoding="utf-8").rstrip("\n")

body = f"{page}\n<script>{sprites}</script>\n<script>{tiles}</script>\n<script>{vfx}</script>\n<script>{fxpack}</script>\n<script>{layouts}</script>\n<script>{music}</script>\n<script>{arenas}</script>\n<script>{stages}</script>\n<script>{shiny}</script>\n<script>/* PeerJS 1.5.4, MIT licence (assets/vendor/peerjs-LICENSE.txt) */\n{peerjs}</script>\n<script>\n{game}\n</script>\n"

skeleton_head = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n"
    "<style>body{margin:0}</style>\n</head>\n<body>\n"
)
(ROOT / "index.html").write_text(skeleton_head + body + "</body>\n</html>\n", encoding="utf-8")
(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist/artifact.html").write_text(body, encoding="utf-8")
print("built index.html and dist/artifact.html")

# The arena editor (tools/editor.html): the arena backdrops (assets/editor/,
# rendered from the game with no fighters), the shipped layouts and the arena
# names, inlined so it is one file next to index.html.
import base64, json, re
bgs = {}
for p in sorted((ROOT / "assets/editor").glob("arena-*.png")):
    bgs[p.stem.split("-")[1]] = "data:image/png;base64," + base64.b64encode(p.read_bytes()).decode()
names = re.findall(r'\{ id: "\w+", name: "([^"]+)"', game.split("ARENAS = [", 1)[1].split("]", 1)[0])
data = f"window.__BG__={json.dumps(bgs)};window.__ARENA_NAMES__={json.dumps(names)};\n{layouts}"
editor = (ROOT / "tools/editor.html").read_text(encoding="utf-8").replace("/*EDITOR_DATA*/", data)
(ROOT / "editor.html").write_text(editor, encoding="utf-8")
print("built editor.html")
