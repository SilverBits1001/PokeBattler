# Pokémon Pocket Brawl

A top-down Pokémon arena brawler that runs in one HTML file.

## Play

Open `index.html` in a browser. A gamepad is recommended; the keyboard works too
(WASD move, J attack, K dodge, L and I specials, arrows smash, O guard, Shift lock,
Q switch, E assist).

On a phone or tablet, touch controls appear as soon as you touch the screen: drag
anywhere on the left half for a floating stick. On the right, a large Attack button
sits in an arc with the two specials, Dodge and Smash (aimed with the stick), with
Guard and Lock above; Legendary, Switch and Assist are on the left edge and pause is
at the bottom centre. Every button shows its own cooldown, like a fighting game's
touch layout: the button dims, a coloured ring refills, the seconds left are written
on it, and it flashes when it is ready again. The battle HUD fades back while a
fighter is underneath it. Menus, team select, the lobby and results are tap to
select. The overlay hides again when a keyboard or controller is used.

## What's new

See [docs/blueprint-review.md](docs/blueprint-review.md): guard flanking, punish
callouts, five arenas, each with its own hazard and benefit (Stadium spotlights, Ruins
collapse and Ancient Power, Cinder Crater heat vents, Frostfall slides, Power Plant recharge), items (Sitrus Berry, X Attack, Poké Ball, Rocky Helmet, Choice Scarf, Focus Band, Quick Claw, Smoke Ball, Leftovers), Smash-style
move types, Magnezone, battle music (Trainer Battle from Ruby/Sapphire/Emerald, © Nintendo /
Creatures / GAME FREAK, looping seamlessly after its intro; two chiptune themes in
Options → Battle music), the Opening Title from FireRed/LeafGreen on the title and
menus, plus victory/defeat music, and five modes
(VS CPU, Training, Free-for-All, Team 2v2, Zone Control). Mode, arena and items can be
switched in Options → Match, or with X / Select on team select. Accessibility options
(reduced effects, high-contrast team colours, swapped specials) are in Options.

Match flow: in Free-for-All, pick 3 or 4 fighters on team select (RT, O or tap
Players); the CPU rivals are shown there before the match. After choosing your
Pokémon and legendary, a ready screen sums up the match and waits for Start (Back
returns to the legendary). In Training that screen is a briefing for each of your
Pokémon: every move with its typical damage and what it does, what each effect
(burn, chill, daze, armour...) means, and a guide to how to play it. Mid-fight
announcements (combos, surges, items, legendaries) now appear as a small pill under
the HUD, so only Ready?, Go!, K.O. and the result take the middle of the screen.

**Screens.** The start screen is a face-off: two Pokémon glare at each other
across a blue and red split (a new pair every few seconds) under the logo, with
the whole roster running along the bottom. Team select shows each side's
Pokémon as a big portrait, the CPU's turned to face yours. The ready screen
repeats the face-off with partners, allies and each side's legendary. In battle there is one move list, bottom left: a key per move with its
cooldown as a clock-wipe and the seconds left, a coloured rim and glow when it's
ready, and live values (Heat, charges, the legendary meter) as small badges. The
camera holds still when a fight ends, and the arena does no more damage once it's
decided. In the pause menu, Moves has a scrolling strip of bigger faces (tap one
or use left and right), and Training's Pokémon tab lists all eighteen.

**Living arenas.** Every arena has its own surroundings (stands with a crowd and a
big screen, a broken colonnade with braziers, a basalt rim with lavafalls, pines
under an aurora, turbines and control panels), detail along its walls, light
from real sources, wild Pokémon (Pidgey flocks, Zubat and Unown, Slugma,
Snorunt and Spheal, Magnemite), weather, and a floor that keeps the scars of the
fight (scorch marks, cracks, frost, footprints in the snow). The crowd reacts to
big hits and throws confetti on a K.O.; the Stadium drifts from afternoon to a
floodlit night. Each arena also gained a mechanic:

- **Stadium:** field shifts. Every so often the pitch becomes a Grass (healing
  tall grass), Water (puddles that slow and conduct), Fire (hot spots that power
  you up) or Rock (cover) field for twenty seconds.
- **Ruins:** pressure plates. Step on one and darts fly down its lane after a
  short warning, hitting anyone in it.
- **Cinder Crater:** the lava pools swell and recede.
- **Frostfall Lake:** heavy blows crack the centre rink until it breaks into
  slowing icy water, then it refreezes; Spheal roll down the lanes.
- **Power Plant:** two conveyors running opposite ways (they flip), and Voltorb
  that roll in and blow up when someone comes close or shoots them.

**New Pokémon.** Greninja (Water/Dark ninja): Water Shuriken, Substitute (a hit
on it becomes a counter from behind), Night Slash through guard, and Protean (it
becomes the type of its last move). Aegislash (Steel/Ghost): Stance Change between
a tough Shield Forme and a hard-hitting, fragile Blade Forme; Shadow Ball; King's
Shield blocks everything from the front and weakens melee attackers; Sacred Sword.

**New items.** Focus Band (survive one K.O. hit), Quick Claw (cooldowns reset and
run faster), Smoke Ball (a cloud that hides whoever is inside) and Leftovers
(slow healing).

**Arcade** (main menu): pick your Pokémon (no CPU roulette: who waits on each
stage stays a secret until you reach it), then six duels in a row against rivals drawn from the
roster, Easy to Hard, on a different arena each stage. Stage six is a boss
with 1.5x HP and its legendary half charged. Lose and you can Continue (retry
the stage); your clear time, continues and best are kept on this device.

**Vibration**: controllers rumble and phones vibrate on hits taken (harder
for heavy hits and K.O.s), heavy hits landed, guard breaks, parries,
Legend Ready, summons, arena surges and the result. Options → Accessibility →
Vibration turns it off. (iPhone browsers don't allow web pages to vibrate.)

Battle callouts are icons and sounds, not words: a fight is too fast to read.
Each effect on a fighter shows as an icon over its head (flame for burn, drop
for poison, bolt for paralysis, stars for daze, snowflake and ice for chill and
freeze, a swirl for confusion, an eye for curses, Z for sleep, and the item
buffs), and blinks as it runs out. Hits show only their numbers; parries,
reflects, dodges and guard breaks pop a glyph; faints and eliminations show
the fallen Pokémon's face. Statuses each have their own short sound, and big
moments flash the screen edge in their colour. Options → Accessibility →
Battle callouts → "Icons + words" brings the words back.

Roster (18): Charizard, Venusaur, Blastoise, Dragapult, Magnezone, Snorlax, Noivern,
Lucario, Garchomp, Scizor, Tyrantrum, Golurk, Rhyperior, Froslass, Gardevoir,
Metagross, Greninja and Aegislash. Each has a class from [the design document](docs/design-doc.md) (speedster,
heavyweight, trickster, controller, artillery or skirmisher), a signature gimmick, a
real weakness, an answer to ranged attacks and a way to escape:

- **Garchomp** digs underground and erupts beneath foes; Outrage is a rampage
  followed by confusion.
- **Scizor**'s Bullet Punch always strikes first (three charges); U-turn hits and
  hops out, or tags your partner in.
- **Tyrantrum**'s Crunch grabs through guard; Rock Slide drops boulders on shooters.
- **Golurk** fires a homing rocket fist and blasts off with Fly.
- **Rhyperior** raises Rock Tomb pillars for cover, then shatters them with Rock
  Wrecker.
- **Froslass** chills: three chills freeze for a moment. Double Team leaves an ice
  doll behind.
- **Gardevoir** lifts and throws foes with Psychic, reflects shots, and sets Future
  Sight traps.
- **Metagross** floats on Magnet Rise and is never slowed (Clear Body).

The whole roster was rebalanced together. With eighteen Pokémon every one averages
45–55% across all five arenas in CPU duels, and no pairing reaches 80% over 300
games. Crowd control is kept short: getting up is fully invincible and followed by a
moment of safety, and no move chain locks a fighter for more than about 2.6 seconds.
Free-for-All, 2v2 and Zone Control each have their own per-Pokémon damage scale. In
2v2 every Pokémon wins 44–58% and in Zone Control 41–64%, within what those sample
sizes can show; in Free-for-All every Pokémon finishes ahead of each opponent
40–59% of the time (outright wins can't be 50% with four fighters).
Each legendary wins 50–58% of Standard and 44–64% of Tag Team mirror matches.
Details and numbers are in the design review.

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
- **Groudon, Precipice Blades** (area control). Three rings of stone blades erupt
  outward from the aim point, a beat apart. Anyone caught gets a scene of erupting
  blades and a magma geyser. Otherwise Drought scorches the centre and burns anyone
  who stands in it.
- **Rayquaza, Dragon Ascent** (hunter). It marks up to three foes, nearest the aim
  point first, and dives on each in turn. Each mark locks just before the dive, so
  a late dodge escapes. Everyone it hit shares one scene in the sky. Made for
  Free-for-All.
- **Ho-Oh, Sacred Fire** (support). It cleanses burn, poison, paralysis, chill,
  sleep and freeze, and heals a lone Pokémon 10%. In Tag Team, Rebirth revives a
  fainted partner at 15% instead, once per match. Then a ring of fire rolls out and stays around you, burning foes
  inside. Made for Tag Team and 2v2.

**Team select** asks for as many Pokémon as the mode needs: one in Standard and the
party modes, two in Tag Team. The last tile picks a random Pokémon you haven't
picked, and the CPU never copies yours. Once every fighter is chosen, the legendary
roster opens: choose one of the six legendaries, Random or Off, and the battle starts.
Each CPU gets a random legendary. Online, both players must have legendaries on for
them to appear.

**In battle** the bottom-left tray lists your moves with their buttons and cooldowns,
and your legendary's meter.

## Online play

Choose **Online** or **Online Tag Team** as the mode on team select (X cycles modes),
pick your team and your legendary. The lobby lists everyone who has the game open right now: pick **Quick match**
to play the next trainer who is searching, or choose a trainer to challenge them.
Each player picks an arena (Select, or tap the stage plate). If the two picks differ, a
roulette decides between them before the battle. After a battle, choose **Rematch**,
**New team** (you pick again, and the two of you are paired again once you're done) or
**Leave**.

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
