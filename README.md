# Starter Brawl

A top-down Pokémon arena brawler that runs in one HTML file.

## Play

Open `index.html` in a browser. A gamepad is recommended; the keyboard works too
(WASD move, J attack, K dodge, L and I specials, arrows smash, O guard, Shift lock,
Q switch, E assist).

## What's new

See [docs/blueprint-review.md](docs/blueprint-review.md): guard flanking, punish
callouts, five arenas with hazards (Stadium, Ruins, Cinder Crater, Frostfall Lake,
Power Plant), items (Sitrus Berry, X Attack, Smoke Bomb, Eject Button), Smash-style
move types, Magnezone, two battle themes plus victory/defeat music, and five modes
(VS CPU, Training, Free-for-All, Team 2v2, Zone Control). Mode, arena and items can be
switched in Options → Match, or with X / Select on team select. Accessibility options
(reduced effects, high-contrast team colours, swapped specials) are in Options.

Roster: Charizard, Venusaur, Blastoise, Dragapult, Magnezone, Snorlax, Noivern, Lucario.

## Layout

| Path | What it is |
| --- | --- |
| `src/game.js` | Game code (engine, CPU, rendering, audio, menus) |
| `src/page.html` | Page markup, styles and embedded fonts |
| `assets/sprites.js` | Sprite sheets and portraits as data URIs (`window.__ASSETS__`) |
| `tools/build.py` | Assembles `index.html` and `dist/artifact.html` |

After editing anything in `src/` or `assets/`, run `python3 tools/build.py`.

Sprites and portraits: PMD Sprite Repository (sprites.pmdcollab.org).
