#!/usr/bin/env python3
"""Add (or refresh) one Pokemon in assets/sprites.js from PMD SpriteCollab.

Usage: python3 tools/addmon.py <name> <dex path> <Anim,Anim,...>
  e.g. python3 tools/addmon.py pidgeotto 0017 FlapAround,Walk,Idle,Hurt,Shoot

Fetches each listed animation sheet (following CopyOf aliases), the
portraits and the credits, and writes them in the same shape as the other
entries: {anims: {Name: {fw, fh, durations, rush, hit, ret, src}}, credits,
portraits}.
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/"


def get(url):
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            return r.read()
    except Exception:
        return None


def main():
    name, path, anims = sys.argv[1], sys.argv[2], sys.argv[3].split(",")
    xml = get(BASE + f"sprite/{path}/AnimData.xml").decode()
    out = {}
    for a in anims:
        blk = re.search(rf"<Name>{a}</Name>(.*?)</Anim>", xml, re.S)
        if not blk:
            print("no anim", a)
            continue
        b = blk.group(1)
        cp = re.search(r"<CopyOf>(.*?)</CopyOf>", b)
        if cp:
            b = re.search(rf"<Name>{cp.group(1)}</Name>(.*?)</Anim>", xml, re.S).group(1)
        num = lambda k: (int(m.group(1)) if (m := re.search(rf"<{k}>(\d+)</{k}>", b)) else None)
        png = get(BASE + f"sprite/{path}/{cp.group(1) if cp else a}-Anim.png")
        out[a] = {
            "fw": num("FrameWidth"),
            "fh": num("FrameHeight"),
            "durations": [int(d) for d in re.findall(r"<Duration>(\d+)</Duration>", b)],
            "rush": num("RushFrame"),
            "hit": num("HitFrame"),
            "ret": num("ReturnFrame"),
            "src": "data:image/png;base64," + base64.b64encode(png).decode(),
        }
    # Every mood the menus and HUD use; missing ones fall back to Normal.
    moods = ["Normal", "Happy", "Pain", "Angry", "Determined", "Joyous"]
    portraits = {m: get(BASE + f"portrait/{path}/{m}.png") for m in moods}
    credits = (get(BASE + f"sprite/{path}/credits.txt") or b"").decode()
    f = ROOT / "assets/sprites.js"
    src = f.read_text()
    assets = json.loads(src[src.index("=") + 1:].rstrip().rstrip(";"))
    assets[name] = {
        "anims": out,
        "credits": credits,
        "portraits": {m: "data:image/png;base64," + base64.b64encode(b).decode() for m, b in portraits.items() if b},
    }
    f.write_text("window.__ASSETS__=" + json.dumps(assets, separators=(",", ":")) + ";\n")
    print(name, "anims", list(out), "portraits", [m for m, b in portraits.items() if b])


main()
