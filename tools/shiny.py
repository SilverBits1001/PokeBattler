#!/usr/bin/env python3
"""Build assets/shiny.js: the fighters' shiny colours from PMD SpriteCollab.

SpriteCollab's shiny sheets (sprite/<dex>/0000/0001, portrait/... the same)
are the normal sheets with their colours swapped, so instead of shipping a
second copy of every sheet this stores, per Pokemon:

  map        normal colour -> shiny colour (the usual case), as RGBA ints
  anims      per sheet, a small overlay PNG with only the pixels the map gets
             wrong (alpha 1 = clear this pixel), or the full shiny sheet if
             its size differs from ours
  pmap       the same for the portraits; portraits SpriteCollab has no shiny
  portraits  of fall back to the portrait map alone

The game rebuilds the exact shiny sheet from these on first use.

Usage: python3 tools/shiny.py [cache dir]   (needs network on first run)
"""
import base64, io, json, re, sys, urllib.request
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CACHE = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/shiny-cache")
BASE = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/"
# name: (normal path, shiny path)
DEX = dict(charizard="0006", venusaur="0003", blastoise="0009", dragapult="0887",
           magnezone="0462", snorlax="0143", noivern="0715", lucario="0448",
           garchomp="0445", scizor="0212", tyrantrum="0697", golurk="0623",
           rhyperior="0464", froslass="0478", gardevoir="0282", metagross="0376",
           greninja="0658", aegislash="0681", lurantis="0754", chandelure="0609",
           ceruledge="0937", volcarona="0637", milotic="0350", inteleon="0818",
           zoroark="0571", pikachu="0025", gengar="0094")
PATHS = {k: f"{v}/0000/0001" for k, v in DEX.items()}
PATHS["aegislashBlade"] = "0681/0001/0001"
# Pidgey Sweep's rare shiny Pidgey.
PATHS["pidgey"] = "0016/0000/0001"


def get(url):
    f = CACHE / re.sub(r"[^A-Za-z0-9.]+", "_", url[len(BASE):])
    if f.exists():
        return f.read_bytes() or None
    CACHE.mkdir(parents=True, exist_ok=True)
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            b = r.read()
    except Exception:
        b = b""
    f.write_bytes(b)
    return b or None


def decode(src):
    return np.array(Image.open(io.BytesIO(base64.b64decode(src.split(",", 1)[1]))).convert("RGBA"))


def png(a):
    b = io.BytesIO()
    Image.fromarray(a).save(b, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(b.getvalue()).decode()


def rgba_int(a):
    a = a.astype(np.uint32)
    return (a[..., 0] << 24) | (a[..., 1] << 16) | (a[..., 2] << 8) | a[..., 3]


def build_map(pairs):
    votes = defaultdict(Counter)
    for n, s in pairs:
        m = n[..., 3] > 0
        for x, y in zip(rgba_int(n[m]).tolist(), rgba_int(s[m]).tolist()):
            votes[x][y] += 1
    return {k: v.most_common(1)[0][0] for k, v in votes.items()}


def apply_map(n, cmap):
    ni = rgba_int(n)
    out = ni.copy()
    for k, v in cmap.items():
        out[ni == k] = v
    return out


def overlay(n, s, cmap):
    """Pixels where the mapped normal sheet differs from the shiny one."""
    got, want = apply_map(n, cmap), rgba_int(s)
    got[n[..., 3] == 0] = 0
    want[s[..., 3] == 0] = 0
    bad = got != want
    if not bad.any():
        return None, 0
    o = np.zeros_like(s)
    o[bad] = s[bad]
    o[bad & (s[..., 3] == 0)] = [0, 0, 0, 1]
    return png(o), int(bad.sum())


def main():
    src = (ROOT / "assets/sprites.js").read_text()
    assets = json.loads(src[src.index("=") + 1:].rstrip().rstrip(";"))
    out = {}
    for name, path in PATHS.items():
        mon = assets[name]
        xml = (get(BASE + f"sprite/{path}/AnimData.xml") or b"").decode()
        sheets = {}
        for anim in mon["anims"]:
            blk = re.search(rf"<Name>{anim}</Name>(.*?)</Anim>", xml, re.S)
            cp = blk and re.search(r"<CopyOf>(.*?)</CopyOf>", blk.group(1))
            b = get(BASE + f"sprite/{path}/{cp.group(1) if cp else anim}-Anim.png")
            if b:
                sheets[anim] = (decode(mon["anims"][anim]["src"]), np.array(Image.open(io.BytesIO(b)).convert("RGBA")))
        same = [p for p in sheets.values() if p[0].shape == p[1].shape]
        cmap = build_map(same)
        anims, wrong = {}, 0
        for anim, (n, s) in sheets.items():
            if n.shape != s.shape:
                anims[anim] = {"full": png(s)}
                continue
            o, k = overlay(n, s, cmap)
            wrong += k
            anims[anim] = o
        pairs, ports = {}, {}
        for emo, data in mon.get("portraits", {}).items():
            b = get(BASE + f"portrait/{path}/{emo}.png")
            n = decode(data)
            if b:
                s = np.array(Image.open(io.BytesIO(b)).convert("RGBA"))
                if s.shape == n.shape:
                    pairs[emo] = (n, s)
        pmap = build_map(list(pairs.values()))
        for emo, (n, s) in pairs.items():
            ports[emo] = overlay(n, s, pmap)[0]
        missing = [e for e in mon.get("portraits", {}) if e not in pairs]
        out[name] = {
            "map": [[k, v] for k, v in cmap.items() if k != v],
            "anims": anims,
            "pmap": [[k, v] for k, v in pmap.items() if k != v],
            "portraits": ports,
        }
        print(f"{name:15s} sheets {len(sheets)}/{len(mon['anims'])} overlay px {wrong:6d}"
              f" portraits {len(pairs)} (map only: {','.join(missing) or '-'})")
    js = "window.__SHINY__=" + json.dumps(out, separators=(",", ":")) + ";\n"
    (ROOT / "assets/shiny.js").write_text(js)
    print("wrote assets/shiny.js", len(js) // 1024, "KB")


main()
