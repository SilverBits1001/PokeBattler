# Blueprint review: what changed and why

Source: *Pokémon Arena Brawler — Game Design & Development Blueprint v1.0*.

The game already covered most of the blueprint's Phase 1–3 work before this pass:
360° movement with separately aimed smash attacks, a quick attack plus signature
moves, guard with a parry window, guard break, directional dodges with invincibility
and recovery, teching, diminishing hitstun on repeated hits, four Pokémon with distinct
roles, a light type chart, terrain effects (puddles, seeds, healing grass) and three CPU
levels. So this pass adds only what the blueprint calls for and the game was missing.

## Added

| Blueprint section | Change |
| --- | --- |
| §3 Defensive tools: "attacks from behind are a weakness" of guard | Guard now covers only the front ~214°. Hits from behind get through and show **FLANKED!**. The shield is drawn as an arc so the open back is visible. A well-timed parry still works from any side. |
| §1, §11, §13 "Can a player bait, dodge or parry, and land a satisfying punish?" | Hits that land while the target is stuck in recovery (whiffed attack or smash, dodge lag, guard release, guard-break stun, flame or pump wind-down, Fly landing, overheat) show **PUNISH!**. The results screen now counts punishes. |
| §6 Arena design: geometry, signature mechanic, counterplay | New **Ruins** arena: six symmetric boulders (four around the centre, one on each flank). They block movement, projectiles, Hydro Pump and Flamethrower. They break after enough damage, return 12 s later with a 2 s warning ring, and never return on top of someone. Knocking a launched opponent into one causes a wall splat. Ghost moves (Will-O-Wisp, Dreepy, Phantom Force) pass through. **Stadium** stays as the plain baseline. |
| §8 Items: small pool, known spawn point, visible warning, Items Off rule | **Sitrus Berry**: one heal (15% of max HP) at the centre spot. The first is announced at 15 s with a 1.5 s warning ring; it lasts 10 s and returns 20 s after it is taken or expires. The **Items** option turns it off. |
| CPU | The CPU walks around boulders, holds blocked ranged moves until it has a clear line, and contests the berry (more often on higher levels). |

Arena and items are set in **Options → Match**. The arena can also be switched on the team
select screen with **Select** (Tab on keyboard).

## Not taken, on purpose

- **2–4 players, team modes, Zone Control, Energy Rush.** The game is built around 1v1
  with a two-Pokémon team, switching and assists. Going to four players reshapes the
  camera, HUD, CPU and every balance number. The blueprint itself says to prove the core
  1v1 exchange first (§12, §13).
- **Reworking aim assist and lock-on.** The blueprint asks for no strong automatic
  targeting (§3). Lock-on is already opt-in (hold R1 / Shift) and melee aim assist is a
  tunable option. Changing the feel without a controller playtest would be guesswork.
- **More items (Smoke Bomb, Eject Button, X Attack) and more arenas.** §8 and §12 advise
  starting tiny and expanding only after tests show the first ones add decisions.
- **Full type chart, new Pokémon.** Explicitly out of scope per §12.

## Worth measuring next (§11)

- How often players get flanked while guarding, and whether it feels fair or random.
- Whether the berry swings matches (it heals 15%; tune `SITRUS.heal` in `src/game.js`).
- Whether boulders get broken too fast (tune `RUINS.hp` and `RUINS.respawn`).

## Second pass: pace, player tags, sizes, select screen

- **Slower, more deliberate fights.** Every move's wind-up is 30% longer and its
  recovery 35% longer, smash wind-ups 25% longer, and special and dodge cooldowns 30%
  longer (`PACE` in `src/game.js`). Walking speed is 85%, whiffs and dodges leave you
  open longer, and hits deal about 20% less, so matches run longer and there is time to
  read the opponent. The CPU reacts and decides more slowly at every level. Saved
  options from older versions keep only sound, controls and mode settings, so the new
  pace applies to everyone.
- **P1 / CPU tags** float over each fighter, Smash-style.
- **True relative sizes.** Each Pokémon is drawn at its official height relative to
  Charizard (1.7 m): Blastoise 1.6 m, Venusaur 2.0 m, Dragapult 3.0 m. Venusaur's and
  Dragapult's hurtboxes grew slightly to match.
- **Team select backdrop:** a neon arena hall with light running around honeycomb
  panels and rails, a moving perspective floor, stage beams, speed lines and embers.

## Third pass: hit readability and juice

- **Slash arcs.** Every melee attack draws a crescent that sweeps the way the move
  swings, styled per Pokémon: Charizard claw swipes with rake marks and a wide fiery
  finisher, Venusaur's whip crack at the vine tip with leaves, Blastoise's heavy water
  arcs, Dragapult's thin double ghost slashes and a wide sweep on the finisher.
- **Wind-up warnings.** While an attack or smash winds up, the spot it will hit fills in
  on the ground (red for the CPU, your colour for you). Smash charges also show the
  lunge path. Heavy attacks and smashes flash a glint over the attacker as they start.
- **Impacts.** Clean hits throw motion streaks along the knockback; heavy hits add a
  star burst.

## Fourth pass

- Team select backdrop no longer has hexagons; rails, grid, beams and speed lines stay.
- **Flamethrower** reaches twice as far (108 px). Damage depends on distance from
  Charizard: about 1.45x at point-blank down to 0.35x at the very tip (`FLAME` in
  `src/game.js`). The CPU uses and respects the longer reach.
- **Training: Pokémon tab** in the pause menu. Pick a lead and a partner and the training
  session restarts with that team. B undoes the last pick.

## Blastoise: Artillery tank kit

| Input | Move | Behaviour |
| --- | --- | --- |
| A | Shell Bash → Aqua Tail → Body Slam | 3-hit combo. Only the Body Slam is armored. |
| R-stick | Skull Bash | Unchanged armored rush smash. |
| B | Shell Slide | Unchanged. |
| X | Water Pulse | Tap: one ring shot. Hold: three-shot volley. Hits daze (slower, wobbly movement for ~0.8 s) and leave a small puddle. |
| Y | Hydro Cannon | Plants for a visible wind-up, then a short (140) heavy-push beam. Long recovery, so it can be punished. |
| Guard in a puddle | Withdraw | Blocks shots, counters close hits, release with a direction to Rapid Spin. Own short cooldown. Also works out of hitstun. Guard on dry ground is the normal guard. |
| Passive | Mega Launcher | Pulse and Cannon fired from your own puddle deal +25% and reach 30% further (Cannon 182). |

Numbers live in `BLAST` in `src/game.js`. The CPU fires pulses and volleys at mid range,
saves Hydro Cannon for close range or when you are recovering, and Withdraws only when it
is standing in water.

## Move types (Smash-style) and new battle music

Every move now has a type, shown as a tag in the Moves list:

| Type | Smash reference | Where |
| --- | --- | --- |
| Combo | Jab strings | Every A attack |
| Rapid | Rapid jab | Dragapult: hold A after the second claw for a flurry, release for the tail sweep |
| Optional charge | Smash attacks | Every R-stick smash |
| Storable charge | Samus Charge Shot, DK Giant Punch | Venusaur Solar Beam: charge, dodge/guard/switch or get hit to keep it, Y fires it later. Full charge stores itself. Rooted charges 60% faster. |
| Forced charge | Ike Eruption | Blastoise Hydro Cannon: hold to build pressure, release to fire early, fires itself when full, cannot be cancelled |
| Tap / hold | Different moves on one button | Venusaur X (tap Razor Leaf, hold Leech Seed), Blastoise X (tap shot, hold volley) |
| Hold | Sustained moves | Charizard Flamethrower |
| Multi-stage | Up-specials with follow-ups | Charizard Fly, Dragapult Phantom Force |
| Counter | Counters | Blastoise Withdraw |
| Summon | Puppet / projectile minions | Dragapult Dragon Darts |

**Music:** a new battle theme at 176 BPM in the style of a Pokémon trainer battle. It opens
with a chromatic run-down and stabs, then a driving A-minor verse over 16th-note octave bass
and arpeggios, a brighter chorus with an octave-doubled lead, and a tense half-time bridge
that climbs back into the chorus.

## Magnezone, hazard arenas, and end-of-match music

### Magnezone (Electric / Steel) — Controller · setup

Lore: three Magnemite fused by a strange magnetic field; it floats; Lock-On followed by Zap
Cannon is its classic combo; its abilities include Analytic (stronger when it moves last).

| Input | Move | Type | Behaviour |
| --- | --- | --- | --- |
| A | Spark → Spark → Gyro Ball | Combo | Two sparks that tug the target in, then a spinning steel hit around itself. Gyro Ball hits harder the faster the target is. |
| R-stick | Flash Cannon | Optional charge | Steel blast in front. |
| X | Lock-On | **Setup** | Scan line; the first target it crosses is marked for 5 s (red reticle both players can see). |
| Y | Zap Cannon | **Payoff** | Slow orb that paralyzes (slower, no dodging, 1.5 s). On a locked target it homes in and flies faster, then uses up the lock. |
| B | Magnet Rise | Dodge | Floats over attacks and arena hazards. |
| Passive | Analytic | — | +25% damage to targets stuck in recovery ("ANALYTIC!"). |
| Passive | Conductor | — | Electric hits on someone in water charge the whole puddle, which keeps shocking anyone standing in it. |

It is the slowest fighter, true to size (1.2 m, the smallest), and does not slide on ice.
The type chart now covers Electric and Steel (Electric beats Water; Grass, Dragon and Electric
resist it; Fire beats Steel; Steel resists Grass, Dragon and Steel). Its partner assist fires a
Lock-On for you.

### Arenas (Options → Match, or Select / Tab on team select)

| Arena | Identity | Hazards and interactions |
| --- | --- | --- |
| Stadium | Baseline | None. |
| Ruins | Cover | Breakable boulders. |
| Cinder Crater | Hazard / pressure | Four lava pools (damage + burn). Telegraphed eruptions launch anyone in the ring. Water (puddles, Water Pulse, Hydro Cannon) cools a pool to safe crust for 6 s. |
| Frostfall Lake | Momentum | Ice rinks: you slide and get knocked further. Fire melts a rink for 8 s. Telegraphed icicles stun. Magnezone floats over the ice. |
| Power Plant | Control | Three pylons. Arcs jump between pairs after a warning (shock + brief paralysis) and charge puddles they cross. Electric hits overcharge a pylon into a discharge that hits your enemies; water shorts a pylon out for 8 s. |

Every layout is point-symmetric. The CPU steers around lava, warnings and arcs.

### Music

Matches now end on a **victory** fanfare (C major, loops) or a slow **defeat** theme
(A minor), switching the moment the round ends; Rematch returns to the battle theme.
