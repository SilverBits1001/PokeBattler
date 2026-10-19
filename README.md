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

## Modes and legendaries

**Standard** (the default) is one Pokémon a side. Press X on team select for
**Tag Team**: two Pokémon each, with Switch and Assist. Party modes use one Pokémon
each.

**Legendaries.** Dealing and taking damage fills a meter under your name. When it reads
READY, call your legendary: E (L2 on a pad) in single-Pokémon modes, or R (L3) in any
mode. Calling it works like a Final Smash. The battle freezes, the camera closes in,
and the legendary bursts into being beside you over a summoning circle. Then hold the
button to aim with the stick and release. If its opening attack lands, the battle
freezes again for a cinematic on everyone it caught, ending in a finisher that
launches them:

- **Zekrom, Fusion Bolt.** It dives along a warned line. Anyone hit is pinned under a
  storm while Zekrom calls down lightning, then it charges and slams down with a
  thunder pillar that paralyses.
- **Darkrai, Dark Void.** A dark pool puts everyone inside to sleep. Under a moonlit
  sky, shadow tendrils drain the sleepers before a Dark Pulse blast, and they stay
  asleep afterwards.
- **Deoxys** rolls a random Forme each time:
  - Normal hurls Psycho Boost.
  - Attack sweeps a target down the arena with Hyper Beam.
  - Defense heals you and raises a barrier that bursts outward.
  - Speed crisscrosses its target with Extreme Speed before diving on it.

Pick your legendary with the **LEGEND** tile at the end of the roster on team select:
press A on it to cycle Zekrom, Darkrai, Deoxys, Random and Off. Each CPU gets a random
legendary. Online, both players must have legendaries on for them to appear.

## Online play

Choose **Online** as the mode on team select (X cycles modes), pick your team and press
Start. The lobby lists everyone who has the game open right now: pick **Quick match**
to play the next trainer who is searching, or choose a trainer to challenge them.

**Friend codes (no claude.ai account needed).** On the Online screen pick **Create a
friend code** and send the 5-letter code to a friend; they pick **Enter a friend code**
and type it in. The two pages connect directly over WebRTC when they can, and through
free public MQTT relay servers when they can't. Both stay open during a match: play
moves to the direct link whenever it opens, and back to the relay instantly if it
drops. This works from any copy of the game. The public copy is
**https://silverbits1001.github.io/PokeBattler/**, served by GitHub Pages from the
`gh-pages` branch (a built `index.html`). [PeerJS](https://peerjs.com)'s free public
server only introduces the two pages to each other; it is bundled in `assets/vendor/`
(MIT).

The open lobby (everyone who has the game open) works when the game is opened from its
claude.ai artifact link by people who have access to it.

To update the public copy after a change: run `python3 tools/build.py`, copy
`index.html` onto the `gh-pages` branch, and push it.

Matches use rollback netcode with an input delay that adapts to the connection (1 tick on
a fast link, up to 12 on a slow one), so the other player only ever has to be predicted a
few ticks ahead. The other player's input is predicted until it arrives; when a guess was
wrong, the game rewinds and replays the missed ticks within the same frame. Both pages
run the same deterministic simulation from the host's seed, a sync check runs every
second, and a corner readout shows the link type (direct, relay or room) and the latency. Press
F2 (or tap the readout) for a diagnostics panel.

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
