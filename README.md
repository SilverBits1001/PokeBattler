# Starter Brawl

A top-down Pokémon arena brawler that runs in one HTML file.

## Play

Open `index.html` in a browser. A gamepad is recommended; the keyboard works too
(WASD move, J attack, K dodge, L and I specials, arrows smash, O guard, Shift lock,
Q switch, E assist).

On a phone or tablet, touch controls appear as soon as you touch the screen: drag
anywhere on the left half for a floating stick, use the A/B/X/Y cluster on the right
(attack, dodge, specials), plus Guard, Lock, Smash (aimed with the stick), Switch,
Assist and a pause button. Menus, team select, the lobby and results are tap to
select. The overlay hides again when a keyboard or controller is used.

## What's new

See [docs/blueprint-review.md](docs/blueprint-review.md): guard flanking, punish
callouts, five arenas, each with its own hazard and benefit (Stadium spotlights, Ruins
collapse and Ancient Power, Cinder Crater heat vents, Frostfall slides, Power Plant recharge), items (Sitrus Berry, X Attack, Poké Ball, Rocky Helmet, Choice Scarf), Smash-style
move types, Magnezone, two battle themes plus victory/defeat music, and five modes
(VS CPU, Training, Free-for-All, Team 2v2, Zone Control). Mode, arena and items can be
switched in Options → Match, or with X / Select on team select. Accessibility options
(reduced effects, high-contrast team colours, swapped specials) are in Options.

Roster: Charizard, Venusaur, Blastoise, Dragapult, Magnezone, Snorlax, Noivern, Lucario.

## Online play

Choose **Online** as the mode on team select (X cycles modes), pick your team and press
Start. The lobby lists everyone who has the game open right now: pick **Quick match**
to play the next trainer who is searching, or choose a trainer to challenge them.

**Friend codes (no claude.ai account needed).** On the Online screen pick **Create a
friend code** and send the 5-letter code to a friend; they pick **Enter a friend code**
and type it in. The two pages connect directly over WebRTC, and the match starts on
its own. This works from any copy of the game, including the public GitHub Pages
address: https://silverbits1001.github.io/PokeBattler/ (once Pages is switched on for
this branch, see below). [PeerJS](https://peerjs.com)'s free public server only
introduces the two pages to each other; it is bundled in `assets/vendor/` (MIT).

The open lobby (everyone who has the game open) works when the game is opened from its
claude.ai artifact link by people who have access to it.

To host the game publicly: on GitHub, open **Settings → Pages**, choose **Deploy from a
branch**, pick this branch and the `/ (root)` folder, and save. The game is then at the
address above for anyone.

Matches are deterministic lockstep over the room's presence channel: each page sends
only its inputs (with every input the other side has not confirmed yet), both run the
same simulation from the host's seed and settings, and a sync check runs every second.

## Layout

| Path | What it is |
| --- | --- |
| `src/game.js` | Game code (engine, CPU, rendering, audio, menus) |
| `src/page.html` | Page markup, styles and embedded fonts |
| `assets/sprites.js` | Sprite sheets and portraits as data URIs (`window.__ASSETS__`) |
| `assets/vfx.js` | Arena event effects made with PixelLab's VFX tool (`window.__VFX__`); sheets in `assets/vfx/` |
| `assets/fonts/` | Lilita One and Fredoka (embedded in `src/page.html`) |
| `assets/tiles.js` | Arena floor tilesets as data URIs (`window.__TILES__`); source PNGs in `assets/tiles/` |
| `tools/build.py` | Assembles `index.html` and `dist/artifact.html` |

After editing anything in `src/` or `assets/`, run `python3 tools/build.py`.

Sprites and portraits: PMD Sprite Repository (sprites.pmdcollab.org).
Arena floor tiles: generated with PixelLab (16px top-down Wang tilesets, recoloured).
Fonts: Lilita One (Juan Montoreano) and Fredoka (Milena Brandao, Hafontia), SIL Open Font License.
