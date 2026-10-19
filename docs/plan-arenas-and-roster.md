# Plan: living arenas, Greninja, Aegislash and four items

## Where the arenas are today

The five arenas each have one or two systems (spotlights, boulders, lava
pools and vents, ice rinks and icicles, pylons and arcs) plus one surge
every 30 seconds. Their weakness is everything else: a single flat floor
texture, the same grey wall and four banners around every arena, nothing
moving outside the fight, no lighting beyond the spotlights, and nothing
that remembers what happened in the fight. Frostfall is a white sheet, the
Power Plant a dark grid.

## What other games do that we can borrow

| Idea | Seen in | What it gives us |
|---|---|---|
| The stage transforms mid-match | Smash Bros (Pokémon Stadium 1 and 2) | The neutral stage stays fresh: every so often it becomes a grass, water, fire or rock field |
| A crowd and a big screen that react to the fight | Pokkén Tournament, Smash (Boxing Ring), Street Fighter | Big hits and K.O.s feel like events; the arena has a sense of place |
| Background characters and wildlife | Street Fighter stages, Hades, Pokémon overworlds | Life at the edges: flocks of Pidgey, Zubat in the ruins, Spheal on the ice, Magnemite in the plant |
| Battle damage that stays | Smash (floor cracks), Mortal Kombat, Splatoon (ink) | The floor tells the story of the fight: scorch marks, craters, frost, leaf litter, footprints in snow |
| Mood lighting with real light sources | Hades, Dead Cells, Hollow Knight | Torches, lava glow, lamps, floodlights; fighters lit by what they stand near |
| Time of day across a match | Mario Kart (Wario Stadium night), Smash (Brinstar Depths) | The Stadium drifts from afternoon to sunset to floodlit night |
| Traps on a telegraph | Hades (spike traps, pressure plates), Spelunky | Readable, symmetric hazards you can bait an opponent into |
| Conveyor belts and moving floors | Smash (Mute City), Mega Man, Overcooked | Movement itself changes; positioning matters more |
| Explosive props | Enter the Gungeon barrels, Smash Bob-ombs | Voltorb that explode when hit: a risk anyone can use |
| Breakable thin ice | Zelda, Mario | The centre of the lake gives way under heavy hits and refreezes |
| Edge foreground with parallax | Hades, Rayman Legends | Depth without hiding the fight (edges only) |
| Arena ambience and reactions in sound | Every fighting game | Crowd roar, wind, lava rumble, machinery hum |

Rules we keep: every layout and hazard stays point-symmetric so neither
spawn has an edge; anything that affects the fight runs in the simulation
(so online stays in sync), everything else is drawing only; hazards are
telegraphed and read as icons and colour, not text; crowd control stays
under the existing caps.

## Phase 1: arenas come alive (drawing only, no balance impact)

Shared systems, then a pass on each arena:

1. **Battle scars.** A persistent decal layer painted from fight events:
   scorch marks from fire, cracks from heavy hits and slams, frost from ice,
   splashes from water, leaf litter from grass, footprints and drag marks in
   snow and sand. Fades slowly; capped so it never gets noisy.
2. **Lighting.** A per-arena ambient tint with real light sources (glow
   pools that brighten the floor and tint fighters standing in them).
3. **Living borders.** Each arena gets its own surroundings instead of the
   shared grey wall:
   - Stadium: stands with an animated crowd that jumps on big hits and K.O.s,
     a big screen showing the leader's portrait, camera flashes, confetti on
     a K.O.
   - Ruins: crumbling pillars, ivy, braziers with real light, Unown drifting
     and Zubat roosting, dust falling from the walls on heavy hits.
   - Cinder Crater: a volcanic rim with lavafalls, smoke columns, embers and
     glowing cracks that pulse; Slugma bubbling at the edges.
   - Frostfall Lake: snowbanks, pine trees, a frozen waterfall, an aurora,
     falling snow and breath puffs; Snorunt and Spheal watching.
   - Power Plant: machinery, pipes, steam vents, blinking control panels and
     cables that light up when the pylons arc; Magnemite drifting.
4. **Wildlife fly-overs and reactions.** Flocks and critters that cross the
   arena with shadows and scatter when a big hit lands near them.
5. **Floor detail.** Hand-placed detail clusters (cracks, moss, grates,
   painted lines, ice veins) so each floor reads as a place, not a texture.
6. **Stadium time of day.** Afternoon, sunset, then floodlit night over a
   match.
7. **Ambience.** A quiet looping bed per arena (crowd murmur, wind, lava
   rumble, machine hum) and crowd reactions on big moments.

## Phase 2: one new mechanic per arena (simulation, symmetric)

| Arena | New mechanic | How it plays |
|---|---|---|
| Stadium | **Field shifts** (Pokémon Stadium style) | Every ~40 s the pitch becomes a Grass, Water, Fire or Rock field for ~20 s, reusing existing systems: tall grass patches, puddles, hot spots, rock cover. Signalled by the big screen and a colour sweep |
| Ruins | **Pressure-plate dart traps** | Two plates on opposite sides; stepping on one fires darts down its lane after a telegraph, hitting anyone in the lane (including you) |
| Cinder Crater | **Lava tide** | The lava pools slowly swell and recede, opening and closing paths around the centre |
| Frostfall Lake | **Thin ice and Spheal** | Heavy hits crack the centre rink until it breaks into icy water (slows, chills) and refreezes; Spheal roll across the lanes on a telegraph and bowl fighters over |
| Power Plant | **Conveyors and Voltorb** | Two belts running in opposite directions, reversing on a cycle; Voltorb roll in and explode when hit |

The CPU learns each one (avoid lanes and Voltorb, use the belts).

## Phase 3: four new items

| Item | Effect |
|---|---|
| Focus Band | For 20 s, a hit that would K.O. you leaves you at 1 HP instead (once) |
| Quick Claw | Refreshes every cooldown now, and cooldowns run 30% faster for 6 s |
| Smoke Ball | A smokescreen where you pick it up: you are hidden from others while inside it and the CPU loses track of you |
| Leftovers | Heals a little every second for 15 s |

Each gets an icon cue, a pickup sound and an entry in the Training glossary.

## Phase 4: Greninja (Water/Dark, ninja speedster)

- **Attack:** quick kunai slashes, three-hit chain.
- **Water Shuriken (X):** a fan of three shurikens; hold to charge one big
  shuriken that pierces.
- **Substitute (Y):** leaves a log for a moment; if hit, Greninja reappears
  behind the attacker and kicks. Whiffing it leaves a short opening.
- **Dodge:** Shadow Sneak, a short dash that goes invisible.
- **Smash:** Night Slash, vanishing and striking up to three times along the
  aimed line.
- **Protean:** its type becomes the type of its last move (Water or Dark),
  changing what is super effective against it.
- Weakness: the lowest HP in the roster.

## Phase 5: Aegislash (Steel/Ghost, stance fighter)

- **Stance Change:** Shield Forme (slower, takes 30% less damage, stronger
  guard) and Blade Forme (faster, +30% damage, takes 25% more). Attacking
  specials switch to Blade; King's Shield switches to Shield.
- **Attack:** Shield, one heavy swing; Blade, a three-hit combo.
- **Shadow Ball (X):** its ranged answer; switches to Blade.
- **King's Shield (Y):** blocks everything from the front for a moment;
  melee attackers who hit it deal less damage for a few seconds.
- **Dodge:** a ghostly slide.
- **Smash:** Sacred Sword, a charged lunge that cuts through guard.
- Weakness: Blade Forme is fragile, and switching at the wrong time is
  punished.

Both get PMD SpriteCollab sprites (Aegislash in both formes), CPU play,
move effects, HUD tags, Training briefing pages and icon cues.

## Phase 6: balance, sync and ship

- 18-Pokémon duels on all five arenas, then Free-for-All, 2v2 and Zone
  Control, with the same targets as before (46–54% per Pokémon, no pairing
  at 80% or more over 300 games).
- Arena mechanics checked for symmetry (per-spawn win rates).
- Online rollback duels with both new Pokémon and on every arena.
- Keyboard playtest for every Pokémon, 4-player error runs, screenshots of
  each arena.
- README, design review and Training briefing updated; publish.

## Order and checkpoints

Phases ship in order and each one is committed and pushed with screenshots
and tests before the next starts: 1 → 2 → 3 → 4 → 5 → 6.
