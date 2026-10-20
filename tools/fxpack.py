#!/usr/bin/env python3
"""Build assets/fxpack.js: the effects the game uses from two pixel VFX packs.

  python3 tools/fxpack.py GIGAPACK_DIR FOUNDRY_DIR

GIGAPACK_DIR is the extracted "Super Pixel Effects Gigapack (Free Version)"
folder (Will Tice / unTied Games; usable in games with credit, the pack itself
may not be redistributed, so only the frames below are packed into the game).
FOUNDRY_DIR is the extracted PVFX Foundry folder (Pixel VFX Studio, CC0).

Each effect is trimmed to the union of its frames and laid out as a 4-column
sheet, the format the game's effect sheets (assets/vfx.js) already use:
{src, fw, fh, n, fps, ax, ay, loop}, anchored at the effect's pivot.
"""
import base64
import io
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# key: (pack, effect, size) -- Gigapack: category/name, "small" or "large";
# Foundry: effect id.
G, F = "g", "f"
PICK = {
    # Hits
    "hitLight": (G, "Impacts/directional_impact_001", "small"),
    "hitMid": (G, "Impacts/directional_impact_003", "small"),
    "hitMid2": (G, "Impacts/directional_impact_004", "small"),
    "hitSlash": (G, "Impacts/directional_impact_002", "small"),
    "hitHeavy": (G, "Impacts/symmetrical_impact_001", "small"),
    "hitHeavy2": (G, "Impacts/symmetrical_impact_003", "small"),
    "hitCrit": (G, "Impacts/symmetrical_impact_004", "small"),
    "hitKo": (G, "Impacts/symmetrical_impact_006", "small"),
    "hitWall": (G, "Impacts/symmetrical_impact_002", "small"),
    "slash": (F, "crescent-slash", None),
    # Elements
    "zap": (F, "electric-impact", None),
    "zapBurst": (G, "Lightning/lightning_burst_001", "small"),
    "zapBurst2": (G, "Lightning/lightning_burst_002", "small"),
    "zapBurst3": (G, "Lightning/lightning_burst_003", "small"),
    "zapStrike": (G, "Lightning/lightning_strike_001", "small"),
    "zapAura": (G, "Lightning/lightning_aura_002", "small"),
    "fireHit": (F, "warm-explosion", None),
    "fireJet": (F, "ember-jet", None),
    "fireOrchid": (F, "cinder-orchid", None),
    "fireLoop": (G, "Fire/fire_looping_003A", "small"),
    "fireBig": (G, "Fire/fire_looping_004B", "small"),
    "ice": (F, "frost-nova", None),
    "water": (F, "splash-crown", None),
    "waterSplat": (G, "Splatters/burst_splatter_003", "small"),
    "leaf": (F, "leaf-gust", None),
    "acid": (F, "acid-splash", None),
    "poison": (G, "Fantasy Spells/spell_poison_001", "small"),
    "poisonLoop": (G, "Fantasy Spells/status_poison_001", "small"),
    "void": (F, "void-implosion", None),
    "ghostBoom": (G, "Explosions/stylized_explosion_002", "small"),
    "psychic": (F, "spectral-bloom", None),
    "focus": (F, "focus-charge", None),
    "steel": (F, "ferrospine", None),
    "rock": (F, "earth-rupture", None),
    "dustBrown": (G, "Smoke Bursts/symmetrical_smoke_burst_001", "small"),
    # Defence and movement
    "parry": (F, "arcane-parry", None),
    "lightBurst": (G, "Magic Bursts/round_light_burst_001", "small"),
    "smoke": (G, "Smoke Bursts/looping_smoke_burst_001", "small"),
    "smokeSmall": (G, "Smoke Bursts/looping_smoke_burst_002", "small"),
    "smokeDash": (G, "Smoke Bursts/directional_smoke_burst_001", "small"),
    "smokePuff": (F, "smoke-puff", None),
    "landDust": (F, "landing-dust", None),
    "warp": (G, "Sci-fi/scifi_warp_001", "small"),
    "warpRed": (G, "Sci-fi/scifi_warp_002", "small"),
    "warpBlue": (G, "Sci-fi/scifi_warp_003", "small"),
    # Items and buffs
    "heal": (F, "radiant-heal", None),
    "healSpell": (G, "Fantasy Spells/spell_heal_001", "small"),
    "atkUp": (G, "Fantasy Spells/spell_attack_up_001", "small"),
    "defUp": (G, "Fantasy Spells/spell_defense_up_001", "small"),
    "haste": (G, "Fantasy Spells/spell_haste_001", "small"),
    "sparkleLoop": (G, "Fantasy Spells/status_sparkling_001", "small"),
    "absorb": (G, "Fantasy Spells/spell_absorb_001", "small"),
    "sparkle": (G, "Magic Bursts/round_sparkle_burst_001", "small"),
    "sparkle2": (G, "Magic Bursts/round_sparkle_burst_002", "small"),
    "sparkle3": (G, "Magic Bursts/round_sparkle_burst_003", "small"),
    "firework": (G, "Magic Bursts/round_firework_burst_001", "small"),
    "firework2": (G, "Magic Bursts/round_firework_burst_002", "small"),
    # Charge, beams, specials
    "charge": (G, "Sci-fi/scifi_charge_up_001", "small"),
    "muzzle": (G, "Sci-fi/scifi_muzzle_flash_001", "large"),
    "muzzleLong": (G, "Sci-fi/scifi_muzzle_flash_003", "small"),
    "sparks": (G, "Sci-fi/scifi_spark_burst_001", "small"),
    "beamEnd": (F, "beam-cutoff-burst", None),
    "recall": (F, "lattice-beam", None),
    "rift": (F, "rift-portal", None),
    "hourglass": (F, "hourglass-splinter", None),
    "resonant": (F, "resonant-break", None),
    # Explosions
    "boomEpic": (G, "Explosions/epic_explosion_001", "small"),
    "boomGiant": (G, "Explosions/epic_explosion_002", "small"),
    "boom": (G, "Explosions/symmetrical_explosion_004", "small"),
    "boomSmall": (G, "Explosions/symmetrical_explosion_001", "small"),
    "boomSmall2": (G, "Explosions/symmetrical_explosion_002", "small"),
    "boomKo": (G, "Explosions/stylized_explosion_001", "small"),
    "boomKo2": (G, "Explosions/stylized_explosion_003", "small"),
    # Symbols
    "warn": (G, "Symbols/symbol_warning_001", "small"),
    "question": (G, "Symbols/symbol_question_001", "small"),
    "crown": (G, "Symbols/symbol_crown_001", "large"),
    "place1": (G, "Symbols/symbol_place_1st_001", "small"),
    "place2": (G, "Symbols/symbol_place_2nd_001", "small"),
    "place3": (G, "Symbols/symbol_place_3rd_001", "small"),
    "place4": (G, "Symbols/symbol_place_4th_001", "small"),
}
# Anchor overrides (fractions of the trimmed frame): muzzle flashes and the
# fire jet start at their left end; the upward bursts sit on their base.
ANCHOR = {"muzzle": (0.1, 0.5), "muzzleLong": (0.05, 0.5), "fireJet": (0.12, 0.5),
          "hitMid": (0.5, 0.92), "hitMid2": (0.5, 0.92)}
# Loops (status auras, fire) play until stopped; everything else plays once.
LOOPS = {"recall", "zapAura", "fireLoop", "fireBig", "poisonLoop", "sparkleLoop", "smoke", "smokeSmall", "rift",
         "place1", "place2", "place3", "place4", "crown"}


def gigapack(root, path, size):
    cat, name = path.split("/")
    d = next((root / "PNG" / cat / name).glob(f"{name}_{size}_*"))
    return [Image.open(f).convert("RGBA") for f in sorted(d.glob("frame*.png"))], None, 15


def foundry(root, eid):
    pack = json.loads((root / "pack.json").read_text())
    e = next(x for x in pack["effects"] if x["id"] == eid)
    sheet = Image.open(root / e["artifacts"]["grid"]["sheet"]).convert("RGBA")
    w, h = e["source_size"]
    fr = [sheet.crop(((i % 5) * w, (i // 5) * h, (i % 5) * w + w, (i // 5) * h + h)) for i in range(e["frames"])]
    return fr, tuple(e["pivot"]), e["fps"]


def build(gdir, fdir):
    out = {}
    for key, (pack, path, size) in PICK.items():
        fr, pivot, fps = gigapack(gdir, path, size) if pack == G else foundry(fdir, path)
        w, h = fr[0].size
        boxes = [f.getbbox() for f in fr if f.getbbox()]
        x0 = min(b[0] for b in boxes); y0 = min(b[1] for b in boxes)
        x1 = max(b[2] for b in boxes); y1 = max(b[3] for b in boxes)
        px, py = pivot if pivot else (w / 2, h / 2)
        fw, fh = x1 - x0, y1 - y0
        cols = min(4, len(fr)); rows = (len(fr) + 3) // 4
        sheet = Image.new("RGBA", (fw * 4, fh * rows))
        for i, f in enumerate(fr):
            sheet.alpha_composite(f.crop((x0, y0, x1, y1)), ((i % 4) * fw, (i // 4) * fh))
        buf = io.BytesIO(); sheet.save(buf, "PNG", optimize=True)
        out[key] = {
            "src": "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode(),
            "fw": fw, "fh": fh, "n": len(fr), "fps": fps,
            "ax": round(ANCHOR[key][0] * fw) if key in ANCHOR else round(px - x0),
            "ay": round(ANCHOR[key][1] * fh) if key in ANCHOR else round(py - y0),
            "loop": key in LOOPS,
        }
        print(f"{key:12s} {fw:3d}x{fh:<3d} {len(fr):2d}f {len(buf.getvalue()) // 1024:4d} KB")
    head = (
        "// Effects from two pixel VFX packs, in the assets/vfx.js sheet format\n"
        "// (built by tools/fxpack.py). Super Pixel Effects Gigapack - Will Tice /\n"
        "// unTied Games (free version, used with credit); PVFX Foundry by Pixel VFX\n"
        "// Studio (CC0).\n"
    )
    js = head + "window.__FXPACK__=" + json.dumps(out, separators=(",", ":")) + ";\n"
    (ROOT / "assets/fxpack.js").write_text(js)
    print(f"{len(out)} effects, {len(js) // 1024} KB")


if __name__ == "__main__":
    build(Path(sys.argv[1]), Path(sys.argv[2]))
