#!/usr/bin/env python3
"""Recolour prop sprites onto the character sprites' palette.

  python3 tools/repalette.py IN.png [IN2.png ...] --out DIR

The palette is every colour the Pokemon sprites in assets/sprites.js use
often, plus assets/props/style-palette.png. Each sprite is reduced to 16
shades. Each shade is then moved to its nearest palette colour (CIELAB):
dull shades (the metal) lose their colour cast and come up to the
characters' lighter cool greys; vivid ones (glow, paint) keep their hue.
Last, a 1px black outline is added, as the character sprites have.
"""
import argparse
import base64
import io
import json
import re
from collections import Counter
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent


def lab(rgb):
    c = np.asarray(rgb, float) / 255.0
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    M = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ M.T / np.array([0.9505, 1, 1.089])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)


def palette():
    src = (ROOT / "assets/sprites.js").read_text()
    cnt = Counter()
    for uri in re.findall(r'"src":"data:image/png;base64,([^"]+)"', src):
        a = np.asarray(Image.open(io.BytesIO(base64.b64decode(uri))).convert("RGBA")).reshape(-1, 4)
        cnt.update(map(tuple, a[a[:, 3] > 200][:, :3]))
    cols = {c for c, v in cnt.items() if v >= 40}
    pal = np.asarray(Image.open(ROOT / "assets/props/style-palette.png").convert("RGB")).reshape(-1, 3)
    cols |= set(map(tuple, pal))
    return np.array(sorted(cols), float)


def remap(im, P, n=16):
    PL = lab(P)
    a = np.asarray(im.convert("RGBA")).astype(float)
    rgb, al = a[..., :3], a[..., 3] > 127
    g = rgb.mean(-1, keepdims=True)
    px = np.clip(g + (rgb - g) * 1.1, 0, 255)[al]
    rng = np.random.default_rng(1)
    C = px[rng.choice(len(px), min(n, len(px)), replace=False)]
    for _ in range(25):
        L = np.argmin(((px[:, None] - C[None]) ** 2).sum(-1), 1)
        C = np.array([px[L == i].mean(0) if (L == i).any() else C[i] for i in range(len(C))])
    T = lab(C)
    dull = np.hypot(T[:, 1], T[:, 2]) < 34
    T[dull, 1], T[dull, 2], T[dull, 0] = 0, -6, T[dull, 0] * 0.8 + 20
    idx = np.argmin((((T[:, None] - PL[None]) * np.array([0.4, 1.6, 1.0])) ** 2).sum(-1), 1)
    out = np.zeros(a.shape, np.uint8)
    out[..., :3][al] = P[idx][L]
    out[..., 3] = np.where(al, 255, 0)
    A = np.pad(al, 1)
    edge = al & ~(A[:-2, 1:-1] & A[2:, 1:-1] & A[1:-1, :-2] & A[1:-1, 2:])
    out[..., :3][edge] = 0
    return Image.fromarray(out)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    P = palette()
    for f in a.inputs:
        remap(Image.open(f), P).save(Path(a.out) / Path(f).name, optimize=True)
        print(Path(a.out) / Path(f).name)
