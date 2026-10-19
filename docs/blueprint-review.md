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

## Pass: second theme, Solar Beam identity, modes, items, accessibility

### Second battle theme

**Champion Battle** (184 BPM, D minor, driving bass and a high lead) joins the Trainer Battle
theme. Options → Sound → Battle music: Random (default), Trainer Battle, or Champion Battle.

### Solar Beam vs Hydro Pump

They used to read as the same straight beam in a different colour. Now:

| | Hydro Pump / Hydro Cannon | Solar Beam |
| --- | --- | --- |
| Wind-up | Pressure build | Dashed sunlight **aim line** shows exactly where it will fire |
| Shape | Water jet, spray and droplets | Wobbling column of green/gold/white light with travelling sun pulses, spiralling leaves and a sunburst at the source |
| Cover | Stopped by boulders | **Pierces cover** (sunlight goes through) |
| After | Puddles | **Scorched trail** on the ground, leaf gust, flash |

### Modes (Options → Match → Mode, or X on team select)

| Mode | Rules |
| --- | --- |
| VS CPU | 1v1, as before. |
| Training | Dummies. |
| Free-for-All | Four fighters, every one for themselves. Last one standing wins; results show your placement. |
| Team 2v2 | You and a CPU ally against two CPUs. Your team wins when both enemies are out. |
| Zone Control | 1v1 with a ring on the floor. Standing in it alone fills your meter (20 s to win); contested rings don't count. The ring relocates every 12 s with a 2.5 s telegraph. A KO still wins outright. |

The extra CPUs get random teams. Each fighter has its own tag and foot-ring colour (P1, ALLY,
CPU, CPU 2, CPU 3). Fighters three and four get compact HP strips under the main CPU panel. The
camera frames everyone still in the fight. CPUs go for the zone and read the next spot early
on Normal and Hard.

### Items (Options → Match → Items)

| Item | Effect |
| --- | --- |
| Sitrus Berry | Heal (as before). |
| X Attack | +25% damage for 8 s (ATK+ chip). |
| Smoke Bomb | Leaves a smoke cloud. Fighters inside are translucent, can't be locked onto, and aren't tracked by homing shots or aim assist. CPUs lose track of you. |
| Eject Button | The next launch or heavy hit teleports you to safety with brief invulnerability. |

### Accessibility (Options)

- **Effects: Reduced** turns off slow-motion, hit-pause punches and screen flashes, and cuts shake to about a third.
- **Team colours: High contrast** uses a palette that stays distinct for common colour-blindness types.
- **Swap specials** swaps the X and Y buttons.

### Not done yet

- Full button remapping (only swapping specials for now).
- Blastoise Surf / Rain Dance ideas from the moveset brainstorm.
- Online or local multiplayer (the modes use CPUs for every other slot).

## Pass: character polish, three new fighters, VFX

### What makes a fighter balanced and distinct

Every fighter gets the same slots (A combo, smash on the right stick, X, Y, dodge, guard,
assist), so identity has to come from **how** each slot works, Smash-style:

- **A clear archetype**: rushdown, zoner, trapper, heavyweight, aerial, counter-fighter.
- **A real weakness** you can play around: low HP, slow, short range, long recovery.
- **Moves that show the typing and the lore**, plus a passive taken from the Pokémon's ability.
- **Tools at every range**, so a fighter is never just one move. Earlier measurements showed
  Magnezone was almost all Zap Cannon and Dragapult was almost all Dragon Darts.

Balance was checked with CPU vs CPU round-robins (Hard vs Hard, every pairing, both sides,
several arenas). That is a proxy, not the final word, but it catches outliers. Before this
pass Magnezone won 13% of matchups and Dragapult 72–83%. All eight now land roughly between
40% and 60% on most arenas. Noivern is strong on Cinder Crater because it flies over the lava,
a deliberate stage advantage.

### Magnezone (weak → polished)

Weak points: second-slowest fighter (only Snorlax is slower), no answer to rushdown, Lock-On did nothing on its own, and all
of its damage was Zap Cannon.

- **Lock-On** now zaps for chip damage and applies **Magnet Pull** (target slowed for 1.5 s).
- **Magnet Rise** lands with a **Discharge** ring that knocks attackers away, its anti-rushdown tool.
- **Flash Cannon** is now a real steel beam that reaches further when charged.
- **Sturdy** (its real ability): once per Pokémon, a KO hit from above 25% HP leaves it on 1 HP.
- Faster spark combo, slightly faster walk.

### Dragapult (one-note → polished)

Weak points: everything was Dragon Darts plus Hex, its melee was barely used, Phantom Force
almost never landed, and its dodge was nearly all invulnerability.

- **Phantom Force** now crosses up, reappearing behind a nearby foe for a 1.2× **ambush**.
- **Infiltrator** (its real ability): darts and Phantom Force go straight through guard.
- Hex reduced (+15%, was +30%), dart cap lowered, Dragon Rush trimmed, dodge invulnerability
  8 frames (was 11), slightly lower HP. Melee hits harder so the claws matter.

### New: Snorlax (Normal) — heavyweight tank

2.1 m, the biggest body on the roster (drawn 1.12× Charizard). 1400 HP, slowest walk,
hardest to launch.

| Input | Move | Type |
| --- | --- | --- |
| A | Slap, Slap, **Body Slam** (all armored; the slam cracks the ground) | Combo |
| RS | **Heavy Slam**: armored leap that crashes down in a shockwave; charge to leap further | Optional charge |
| X | **Yawn**: slow bubble; whoever it touches falls asleep shortly after | Trap |
| Y | **Rest**: hold to nap and heal. Snores knock foes back; light hits won't wake you, but you take +20% | Hold |
| B | **Belly Bounce**: hop that bounces projectiles back | Dodge |
| Passive | **Thick Fat**: −30% from Fire. **Gluttony**: berries heal double | — |

### New: Noivern (Flying/Dragon) — aerial sound striker

1.5 m (0.8×). Fast, light, flies over lava, ice, puddles and ground shockwaves.

| Input | Move | Type |
| --- | --- | --- |
| A | Wing Attack ×2, **Acrobatics** flip kick | Rapid |
| RS | **Air Slash**: crescent wind blade that cuts through everyone in its path | Optional charge |
| X | **Boomburst**: sonic cone through guard (Infiltrator); hold to amplify | Tap / hold |
| Y | **Hurricane**: roaming vortex that drags foes in, eats projectiles and bursts at the end | Summon |
| B | **Tailwind**: long glide | Dodge |

### New: Lucario (Fighting/Steel) — aura counter-fighter

1.2 m (0.71×). Technical: storable charge shot, a counter and a comeback passive.

| Input | Move | Type |
| --- | --- | --- |
| A | Jab, Kick, **Force Palm** aura burst | Combo |
| RS | **Meteor Mash**: comet punch with a long lunge | Optional charge |
| X | **Aura Sphere**: hold to charge; guard or dodge stores it; tap X to fire the stored shot | Storable |
| Y | **Detect**: counter stance. When hit, blink behind the attacker and strike back for 1.3× | Counter |
| B | **Extreme Speed**: fast dash | Dodge |
| Passive | **Aura**: up to +50% damage the lower its health | — |

Type chart additions (same mild ±5%): Fighting beats Normal and Steel and is weak to Flying
and Ghost; Flying beats Grass and Fighting and is resisted by Electric and Steel; Electric beats
Flying; Normal and Ghost resist each other.

### VFX

- New effect library: crackling **lightning bolts**, electric **shock rings**, anamorphic
  **lens flares**, expanding **sound/aura arcs**, flickering **aura wisps**, radial **ground
  cracks**, sleep **Z's**, plus a glowing **charge orb**.
- **Dynamic light**: fire, electricity, aura, ghost flames, beams and the Hurricane cast
  coloured light pools on the arena floor.
- Every new move has its own look: Yawn dream bubble, Rest Z's and heal motes, Heavy Slam
  crater with cracks and an impact frame, Boomburst rings, Hurricane vortex with whirling
  debris, Air Slash crescent, Aura Sphere with orbiting energy, Detect flash, and a blink
  trail on counters.
- Older moves got more: Flash Cannon steel beam with afterglow, Zap Cannon crackles, Lock-On
  bolt between the two fighters, paralysis sparks, Dragapult ghost-fire trails and ambush
  slashes, Charizard Fly slam cracks and flare, Hydro Cannon pressure rings and foam crown,
  KO bursts, a full-charge flare, and Snorlax's footsteps shake the ground.

### Roster screen

Team select is now a 4-over-4 grid; the title shows all eight fighters to scale; the training
swap menu and move list handle eight.

### Verification

- **Visual review**: every move of all eight fighters (combo, smash, X, Y, dodge) was captured
  at three points in its animation and reviewed side by side. Moves that read weakly were
  reworked: Razor Leaf (spinning leaves with afterimage trails), Vine Whip (thicker thorned
  vine), Water Pulse (thick ring with trailing ripples), Will-O-Wisp (layered ghost fire),
  Dreepy darts (glow and streaks), Yawn (bigger, brighter bubble), Solar Beam charge (a small
  sun gathering over the flower with converging rays), Lucario's Detect (visible barrier) and
  Aura (flames that grow as health drops), and Snorlax's Rest (sleep bubble).
- **Animation review**: signature moves (Heavy Slam, Boomburst, Hurricane, Aura Sphere,
  Detect counter, Flash Cannon, Phantom Force ambush) were captured every 2–10 ticks from
  wind-up to impact and reviewed as filmstrips. Fixes from that: the Detect callout no
  longer covers the counter-strike, and Aura Sphere, Zap Cannon and Yawn got proper impact
  bursts.
- **Arena spread**: Noivern swung from 30% to 74% by arena. Its Air Slash now slices through
  cover (chipping rocks and pylons instead of dying on them), and heat off the lava still
  scorches it for half damage while it hovers. Spread is now 39–66%.
- **Balance** (CPU Hard vs Hard, every pairing both ways, 5 games each, per arena):

| Fighter | Stadium | Ruins | Crater | Frostfall | Plant | Avg |
| --- | --- | --- | --- | --- | --- | --- |
| Charizard | .54 | .59 | .51 | .53 | .64 | .56 |
| Venusaur | .46 | .47 | .54 | .41 | .46 | .47 |
| Blastoise | .46 | .47 | .40 | .49 | .43 | .45 |
| Dragapult | .60 | .66 | .43 | .61 | .54 | .57 |
| Magnezone | .49 | .43 | .56 | .53 | .53 | .51 |
| Snorlax | .51 | .54 | .54 | .47 | .50 | .51 |
| Noivern | .53 | .41 | .66 | .43 | .39 | .48 |
| Lucario | .41 | .43 | .36 | .53 | .51 | .45 |

Remaining arena swings are stage matchups (fliers like Crater; Dragapult loses its edge there).

### Independent review

A separate reviewer graded every fighter against explicit criteria: design (archetype, weakness,
typing, ability-based passive, tools at every range), balance (40–60% average, no arena below
30% or above 75%), true sizes, and visuals (telegraph, distinct active effect, impact). It
reviewed sheets of every move and frame strips of signature moves, twice. Fixes from that
review:

- **Typing gaps closed**: Venusaur is Grass/Poison (Power Whip poisons; Steel and Poison
  types are immune). Noivern's fully charged Boomburst becomes **Dragon Pulse**, a
  Dragon-typed beam. Charizard's low-health boost is now listed as **Blaze**, and Noivern's
  through-guard Boomburst as **Infiltrator**.
- **Identity**: Blastoise no longer shares Snorlax's armored brawler role. It is
  "Artillery · counter" (no armored finisher, stronger Water Pulse).
- **Visual fixes**:
  - Sprite tints are now generated for any colour, so dodge afterimages and hit flashes
    use each fighter's own palette instead of falling back to grey.
  - Per-fighter dodge trails.
  - Charge orbs that telegraph Zap Cannon, Flamethrower, Hydro Cannon, Boomburst and Yawn.
  - A ghost-fire mark behind the target for the whole Phantom Force vanish.
  - Impact bursts for Solar Beam, Zap Cannon, Dragon Darts, Will-O-Wisp, Boomburst,
    Dragon Pulse, Force Palm, Gyro Ball and Razor Leaf.
  - A lavender Yawn.
  - Bigger razor leaves.
  - A Power Whip crescent.
  - Callouts moved above tags and HP bars.
- **Verified in motion**: Belly Bounce reflecting a Zap Cannon back to paralyze Magnezone,
  Solar Beam firing from a stored charge, Phantom Force's reappear mark, and Magnet Rise's
  landing Discharge.
- **Balance** (8 games per side per pairing per arena): averages .45–.52, every arena cell
  .31–.73.

**Final independent grade:** A (design), B (balance: 12 games per side, averages .46–.55, every
arena .39–.64), C (sizes) and D (every move shows a telegraph, a palette effect and impact)
all PASS. Follow-ups to its minor notes: all three starters now carry their real low-health
abilities (Blaze, **Overgrow**, **Torrent**: +30% damage below 30% health); Venusaur's rooting
is listed as **Ingrain**, the move it comes from; Solar Beam's scorch is now charred earth with a
glowing ember seam. Noivern's Flight stays a lore trait beside its real ability, Infiltrator.
Balance is still CPU-vs-CPU only; a human playtest is the remaining check.

## Pass: Charizard rework (from playtest feedback)

Feedback: the kit didn't feel true to Charizard, and Fly "cheated" — while locked on it flew
itself across the map to the target. Kept: Flamethrower and Fly. Changed:

| Input | Move | Notes |
| --- | --- | --- |
| A | **Dragon Claw**, Dragon Claw, **Fire Fang** | Glowing blue-violet claw rakes (its Dragon heritage), then a burning bite. |
| RS | **Flare Blitz** | Flaming comet charge that pierces and travels up to 1.9× further when charged; 12% recoil, as in the games. |
| X | Flamethrower | Unchanged. |
| Y | **Fly** | Steered entirely by the stick: no lock-on homing. Lasts about 1.6 s (was 0.6 s). A or Y dive-slams where you are. X mid-flight drops a **Fire Blast** that bursts into the five-armed 大 fire star and burns. Untouchable only while climbing; cruising low, its shadow flashes red and it can be hit. |
| B | Wing Dash | Air dash. |
| Passive | Heat, Blaze | Unchanged. |

Verified: locked on with no stick input, Charizard stays put; steering moves it freely; Fire
Blast and Fire Fang burn; Flare Blitz deals recoil. Balance (10 games per side, all arenas):
Charizard .56; every fighter's average .45–.56.

## Bug fix: freeze about 12 seconds into a match

Cause: every sprite sheet was held as seven full-size canvases (the sheet, a white copy and
five tints), about 724 MB of canvas memory before a match started — far past mobile limits.
Tinted copies are now made on demand in a least-recently-used cache with a pixel budget
(peak 25–47 MB in a match), and the frame loop caps its catch-up backlog. Confirmed fixed on
the player's device.

## Pass: item review

Each item scored 0–2 on five criteria, after what makes Smash items fun: a **meaningful
choice** (is grabbing it a decision?), **counterplay** (can the other player answer it?),
**readability** (can both players see what it does?), a **moment** (does it create a
highlight?) and **theme** (Pokémon battle flavour).

| Item | Choice | Counterplay | Readable | Moment | Theme | Total | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sitrus Berry | 2 | 2 | 2 | 1 | 2 | 9 | Keep |
| X Attack | 1 | 2 | 2 | 1 | 2 | 8 | Keep |
| Smoke Bomb | 1 | 0 | 0 | 1 | 1 | 3 | **Removed**: switched off lock-on and homing with no answer, and hid the fight |
| Eject Button | 0 | 0 | 1 | 1 | 1 | 3 | **Removed**: always good, never a decision, and erased the attacker's best combo payoff |
| **Poké Ball** (new) | 2 | 2 | 2 | 2 | 2 | 10 | A Pokémon not in the match pops out ("GO, NOIVERN!") and uses its signature move for you |
| **Rocky Helmet** (new) | 2 | 2 | 2 | 1 | 2 | 9 | 10 s of spikes: melee attackers take 25% of their damage back. Answer: fight at range |
| **Choice Scarf** (new) | 1 | 2 | 2 | 1 | 2 | 8 | 8 s of +30% speed and quicker dodges, with a blue speed trail. Answer: stay out of reach |

Smoke Bomb and Eject Button were removed completely (their targeting and invulnerability
code included). Verified: the Poké Ball summons only Pokémon outside the match and they deal
damage; the Rocky Helmet returns damage to melee attackers; the Choice Scarf is +30% speed.

## Pass: arena overhaul

**Goal:** every arena has its own identity, a telegraphed hazard you can avoid, a benefit you
can deliberately use, and a type interaction. Layouts are point-symmetric (Power Plant's three
pylons are mirror-symmetric left to right, which is fair because fighters spawn left and right
and the arcs rotate through all three pairs), and no arena should favour one fighter too much.

**Measured before the change** (CPU round-robins, all 8 fighters):

| Arena | Hazard share of damage | Interaction use per match | Win spread* |
| --- | --- | --- | --- |
| Stadium | 0% | none | .26 |
| Ruins | 0.1% | 0.7 boulder breaks | .23 |
| Cinder Crater | **12.6%** | lava cooled 0.1 times | **.43** (Noivern .74, Lucario .31) |
| Frostfall Lake | 0.1% (icicles almost never hit) | — | .17 |
| Power Plant | 0.4% (arcs mostly cosmetic) | 0.3 discharges | .26 |

*Win spread = best fighter's win rate minus the worst's on that arena. Crater was overtuned
and unfair; the other hazards barely mattered.

**Redesign:**

| Arena | Identity | Hazard | Benefit | Type interaction |
| --- | --- | --- | --- | --- |
| **Stadium** | Neutral tournament stage | None, deliberately (the fair baseline) | **Spotlights** sweep the floor on mirrored paths; standing in one recharges specials 2× faster | — |
| **Ruins** | Cover and ambush | **Collapse**: a destroyed boulder brings rubble down around it after a 0.75 s warning | **Ancient Power**: whoever breaks a boulder gets +12% damage and speed for 5 s. Boulders are a bit weaker (100 HP) | Fighting, Steel, Water and Grass break rock 1.5× faster (Rock's weaknesses) |
| **Cinder Crater** | Pressure | Smaller centre lava, gentler ticks; telegraphed eruptions | **Heat Vent**: an erupted vent stays hot for 5 s, giving +25% damage to whoever stands in it | Any Water Pulse or Hydro Cannon passing over lava crusts it; fliers take half heat |
| **Frostfall Lake** | Momentum | **Icicles aimed near every fighter** (fair, and they matter), with a longer telegraph | **Slide dodges**: dodging on ice travels 40% further | Fire melts rinks; water puddles freeze into small temporary rinks |
| **Power Plant** | Control | Faster, wider, harder-hitting arcs | **Recharge**: specials recharge 1.75× faster beside a live pylon | Electric types **absorb** arcs (no damage, specials recharge); Electric overcharges pylons; Water shorts them |

The CPU drifts toward spotlights, live pylons and heat vents when it isn't trading blows, and
steers around collapse warnings. A tip for each arena's benefit shows after "GO!".

**Visuals:**
- Stadium: spotlight beams from the stands, camera flashes in the crowd, a Poké Ball emblem.
- Ruins: collapse warning ring with falling pebbles, a dust and crack impact, Ancient Power motes.
- Crater: glowing heat vents with rising heat, falling ash, embers off the lava.
- Frostfall: snowfall, freezing puddles, icicle shadows.
- Power Plant: energy running along the conduits, recharge rings around live pylons.

**Measured after** (30 games per side per pairing, all 8 fighters):

| Arena | Hazard share of damage | Win spread |
| --- | --- | --- |
| Stadium | 0% | .22 |
| Ruins | 0.7% | .16 |
| Cinder Crater | 5.1% | .19 |
| Frostfall Lake | 1.6% | .24 |
| Power Plant | 1% | .16 |

An independent reviewer checked every feature in the code against this design and the
screenshots: all five arenas pass on identity, hazard, benefit, type interaction and fairness,
with no crash or dead feature. Its follow-ups are done:
- Crater's centre lava is exactly symmetric.
- Fighters inside a bonus zone show a ring at their feet.
- The arc warning is brighter.
- The top pylon and top lava pool sit clear of the HUD.
- The ABSORBED popup shows once per arc.

**Quick arena change:** a new **Arena** tab in the pause menu (every mode) shows a thumbnail
of all five arenas with the highlighted one's hazard and benefit. Picking one restarts the
match there with the same teams; the choice is saved for the next match too.

## Arena floors: pixel-art tiles

Feedback: the arenas looked flat and noisy (random speckle on solid fills).

- Each arena now has a 16px top-down Wang tileset generated with PixelLab
  (`assets/tiles/*.png`, embedded via `assets/tiles.js`). The floor is
  pre-rendered from a 16px corner grid, so terrain edges join cleanly.
  - Stadium: clay pitch on grass, with the pitch lines and emblem kept.
  - Ruins: flagstone plazas under every boulder spot and a cross path, with moss
    between (the grass was recoloured from neon to a muted moss).
  - Cinder Crater: basalt. Frostfall Lake: snow.
  - Power Plant: a steel deck with a T of coolant linking the pylons (the
    coolant was recoloured from green to cyan).
- The hazards still use their exact ellipses, so what you see matches what
  hurts. Lava pools and ice rinks are now filled with the tileset's own lava and
  ice textures, with a crust rim or snow bank around them. The pause-menu
  thumbnails use the same textures.
- Follow-up polish: the PixelLab lava tile repeated as a visible grid of rings
  every 16px, so the Crater pools now use a 64px seamless cracked-crust lava
  texture made from the same palette (`assets/tiles/lava.png`). The Stadium clay
  gets raked bands, two tiles wide, clipped to whole clay tiles so they never
  bleed into the grass.
- If the tiles fail to load, the old procedural floors are drawn instead.
- Verified with screenshots of all five arenas, a soak run and the mode tests:
  no errors.

## Camera: closer framing

Feedback: the camera should sit a little closer to the player.

- The fight camera still frames every fighter, but with tighter margins (160 by
  120 px instead of 230 by 170), and it can zoom to 1.85x instead of 1.5x.
- At close range the fighters now fill noticeably more of the screen.
- It still pulls back to the whole arena (1x) when fighters stand at opposite
  walls, so nobody leaves the screen; a 1.1x minimum was tried and cropped them.

## Arena events: surges and PixelLab effects

Feedback: matches needed bigger events, with better visuals and warnings that
loom before they land. PixelLab's VFX tool was suggested.

### Effects (PixelLab VFX workbench)

Eight effects were built in PixelLab's VFX workbench and saved to the user's
PixelLab "My effects". Their sprite sheets are in `assets/vfx/*.png`, embedded
via `assets/vfx.js`:

| Effect | Used for |
| --- | --- |
| Lava eruption | Crater vent eruptions and meteor impacts |
| Vent warning | A bubbling pool that swells under a vent before it blows |
| Icicle shatter | Icicle impacts and the Blizzard's refreeze |
| Pylon bolt | Plant discharges and the start of Overload |
| Pylon crackle | Pylons crackling while an arc charges |
| Rubble collapse | Ruins collapses, boulder breaks and Tremor rocks |
| Spotlight beam | The start of Spotlight Finale |
| Meteor | Meteors falling in Meteor Shower |

Looming warnings are drawn in code:

- Rocks and meteors: a shadow darkens and tightens under them while two dashed
  target rings close in and flash in the last moments. The rock or meteor is
  visibly falling from above.
- Icicles: they now visibly fall, speeding up, with a streak behind them, and
  are drawn above the fighters.

### Surges: one per arena

A surge first comes 20 seconds into a fight, then every 30 seconds. Each is
announced 2.5 seconds ahead with:

- a siren;
- a banner with the surge's name and what it does;
- an edge glow in the arena's colour;
- scrolling hazard stripes.

| Arena | Surge | What happens |
| --- | --- | --- |
| Stadium | Spotlight Finale | A big centre spotlight (radius 64) for 8 seconds; a gold ring shrinks onto it first |
| Ruins | Tremor | Two waves of falling rocks, one aimed near each fighter plus a stray (18 damage each) |
| Cinder Crater | Meteor Shower | For 5 seconds, a meteor every 38 ticks, taking turns between fighters (22 damage, burn, leaves a heat vent) |
| Frostfall Lake | Blizzard | 7 seconds of gale pushing every grounded fighter the same way; white-out haze; melted rinks refreeze at the end |
| Power Plant | Overload | All three pylon lines arc at once for 1.7 seconds; Electric types absorb it |

Each surge targets every fighter equally, and the CPU avoids drop zones and the
Overload lines.

### Fairness with surges (30-game round robins, 8 fighters)

| Arena | Win spread before surges | With surges | Hazard share |
| --- | --- | --- | --- |
| Stadium | .22 | .21 | 0% |
| Ruins | .16 | .21 | 2.7% |
| Cinder Crater | .19 | .23 | 8.4% |
| Frostfall Lake | .24 | .19 | 1.5% |
| Power Plant | .16 | .20 | 2.2% |

The first Crater run came out at .30, with Noivern winning 70%: fliers were
immune to meteors. Rocks and meteors fall from the sky, so they now hit fliers
too. Every arena is back inside the earlier .16–.24 range.

## Music, results screen, fonts and online play

### Music closer to the Pokémon games

The music engine now voices every song the way the handhelds did:

- **Lead:** a pulse wave with delayed vibrato on held notes.
- **Harmony:** a second pulse a third to a sixth below the lead, on the chord.
- **Echo:** the classic trick, the lead again on a quiet 12.5% pulse three steps later.
- **Bass:** a wave-channel voice built from a 32-step, 4-bit waveform, as the Game Boy's
  wave RAM plays it, played short and punchy.
- **Drums:** noise percussion.

The title theme is now a heroic march in G (fanfare, march, broad half-time section).
The victory theme is now a fanfare and a bouncy loop over pumping octave bass. Battle and
Champion keep their compositions with the new voicing.

### Animated results background

Wins and losses get a geometric backdrop, a sibling of the team select's neon grid:

- a triangle lattice whose cells light up as rings ripple out from the winning Pokémon;
- slowly turning light rays behind the winner;
- rising chevrons after a win, falling shards after a loss.

A win is warm gold and orange; a loss is cold blue and violet.

### Fonts

Display text uses Lilita One and body text uses Fredoka, in place of Big Shoulders
Display and Barlow Semi Condensed. Lilita One is as wide as the old display face, so
layouts hold. Fredoka runs wider, so body text is drawn at 90%. Every screen was checked
in screenshots: title, team select, HUD, every pause tab, results and the online lobby.

### Online multiplayer

- **Mode and lobby:** Online is a sixth mode on team select. The lobby lists everyone
  who has the game open (through the claude.ai room), with each trainer's status and
  team. Quick match pairs searching players. Picking a trainer sends a challenge they
  can accept or decline.
- **Netcode:** deterministic lockstep over the room's presence channel. Presence works
  for every viewer and is sent whole, so each update carries all unconfirmed inputs
  (7 characters per tick), and a heartbeat repairs any update that went missing.
- **Settings and delay:** the host sends the seed, teams and every setting that can
  change the simulation. The input delay comes from a measured ping (3 to 15 ticks).
- **Perspective:** each page shows its own fighter as YOU, the opponent by name, and the
  win or loss from its own side.
- **Leaving and failures:** a sync check runs every second. Rematch and Leave work on
  the results screen. Start opens a leave menu while the match keeps running. If the
  opponent leaves, or the connection times out, you return to the lobby with a message.
- **Testing:** a two-page harness relays presence through a fake room with 50 to 100 ms
  latency, jitter and 5 to 8% dropped updates. A full match to a KO, a rematch and a
  leave stayed identical on both pages: 3,613 ticks of full engine state, stats
  included, matched exactly. Challenge, decline, accept and a closed tab were also
  checked.
- **Not yet tested:** the real claude.ai room with two people.

### Online: independent review fixes

A separate review confirmed the deterministic replay is sound. It found no
simulation randomness, every simulation setting is synced, per-match engine state is
reset, and no engine logic depends on which side is local. It then found seven
issues, all now fixed:

1. **Hostile presence.** Another page's presence could crash every lobby (a team id
   such as `constructor`, or a team sent as a string). Everything read from other
   pages is now type-checked: roster ids must be real, the host's settings are
   validated (delay 3 to 15, known setting keys of the right type), and input packets
   must be well-formed.
2. **Rematch consent.** A double press could start the next rematch with only the
   host agreeing. The rematch flag is cleared when a match starts, and confirming only
   counts on the results screen.
3. **Stall timeout.** The timeout counted frames, which is too short on 144 Hz and
   240 Hz screens. It now uses time (10 seconds).
4. **Stall jitter.** Rendering no longer extrapolates fighters past their last
   position while waiting for the other page.
5. **Late join failure.** A late failed room join no longer cancels a newer match.
6. **Stale pairing.** With three or more people searching, a pairing the other side
   has already left goes quietly back to searching instead of an error. Challenging
   someone already in a battle says so at once.
7. **Ghost lobby entries.** Leaving the online screen marks you away, and away
   players are hidden from the list.

Tested with a hostile-presence page, and with two pages at 80±40 ms latency and 10%
dropped updates: a full match, a rematch and a leave, with 4,079 ticks of full
engine state identical on both pages.

## Battle HUD, main menu and team select redesign

### Battle HUD (fighting-game style)

Each side has:

- **Portrait:** the active Pokémon in the corner, with its name plate below.
- **Energy bar:** a long slanted bar to the timer, with:
  - a glowing gold-to-orange core, a moving sheen and energy streaks;
  - a white-hot leading edge and a red damage trail;
  - a red flicker below 25% HP.
- **Guard bar:** a thin glowing strip in the team's colour under the energy bar.
- **Poké Balls:** one per team member beside the timer, greyed out once that Pokémon
  has fainted.
- **Benched partner:** a mini portrait, grey and marked KO once fainted, with its
  switch and assist buttons.
- **Cooldowns:** the B, X and Y buttons with radial sweeps and no move names.
- **Status line:** each Pokémon's own meter and status chips.

The timer sits on a slanted plate between the two bars, with the round number and
series score.

### Main menu

The title screen now leads to a main menu:

- **Header:** a big "Main Menu" with a Poké Ball emblem.
- **Buttons:** a staggered column of slanted buttons with round icons for Battle,
  Online, Party, Training and Options. The selected one grows and glows in its own
  colour. Party cycles between Free-for-All, Team 2v2 and Zone Control.
- **Featured Pokémon:** shown on the right on a turning geometric sigil, and changes
  with the highlighted item.
- **Bottom strip:** a description of the highlighted item and the controls.
- **Options:** opens the full settings list in a panel.

### Team select

A versus layout:

- **Player 1 card (left, blue):** the lead animated large with the partner behind it.
  While a slot is still open, it previews the Pokémon under the cursor.
- **Player 1 plate:** names, types and a compact move list.
- **CPU card (right, red):** the CPU's picks, with the roulette. In Training and Online
  this side shows those modes instead.
- **Roster:** three columns (3, 3 and 2) in the centre, with glowing light lines
  between the rows that run across the screen.
- **Below the roster:** a "Battle stage" plate with the arena name and a split blue
  and red VS emblem.

## Touch controls

When no keyboard or controller is in use, the game now plays on a phone or tablet.

- **Input source.** The first touch (or pen) event switches the input source to touch,
  and the overlay appears. Pressing a key or a gamepad button switches back and hides
  it, the same way the keyboard and gamepad hints already swap.
- **Battle.** A floating stick starts wherever the left thumb lands on the left half
  of the screen (below the HUD), and follows the thumb if it drags past the rim. The
  right cluster mirrors a controller: A attack, B dodge, X and Y specials, with Guard,
  Lock and Smash above and below it. Smash fires in the last stick direction. Switch
  and Assist sit on the left above the stick, and a pause button sits under the
  timer. Several fingers work at once, so you can move, guard and attack together.
- **Menus.** Each screen registers its hit areas while it draws: main menu items,
  options rows, roster tiles, the Start bar, the hint row, lobby rows and modal
  buttons, results buttons, pause tabs and the quit prompt. Tapping one selects and
  confirms it. A and B buttons in the corner act as Confirm and Back everywhere else.
- **Online.** Touch feeds the same per-tick input as the keyboard, so lockstep play
  is unchanged.
- **Verification.** Phone emulation at 844×390 with touch: tapping through title,
  menu, team pick and Start; the stick moving the fighter about 190 px; attacking
  with a second finger while holding the stick; pausing. The soak, mode and network
  duel regressions still pass with no errors.

## Friend codes: online play without claude.ai access

The claude.ai room only admits signed-in people who have access to the artifact, so a
friend opening a public link saw the lobby as offline. Friend codes fix that.

- **How it plays.** One player picks *Create a friend code* and gets a 5-character
  code (no look-alike letters such as O/0 or I/1). The other picks *Enter a friend
  code* and types it in, using a real text field so phones show their keyboard. Once
  linked, both pages start searching, pair up and the match begins. Rematches,
  leaving and the results screen work as before.
- **How it works.** PeerJS (bundled, MIT) uses its free public broker only to
  introduce the two pages. After that they talk directly over a WebRTC data channel,
  with PeerJS's public TURN relay as a fallback for strict networks. The link is
  wrapped as a two-person stand-in for the room API (`presence`, `peers`, `onPeers`,
  `join`, `leave`), so the lobby, matchmaking and lockstep code run unchanged.
  Everything the other page sends is size-limited, parsed in a `try`, and checked
  for shape before it reaches the existing validation.
- **Drops.** A heartbeat runs every 2 s on a timer rather than the frame loop, so a
  player who switches apps to send the code stays linked. After 15 s of silence
  (or a closed channel) the link ends with "Your friend disconnected", and any match
  ends as it does in the room version.
- **Errors.** A wrong code reports "No game with that code" (the broker expires the
  request after about 5 s). An unreachable broker reports "Could not reach the
  matchmaking server". An invite link `…#join=CODE` joins automatically when the
  player reaches the Online screen.
- **Also fixed.** Banners queue now: a new one (a faint, say) cuts the current one
  (an arena event) short instead of drawing on top of it.
- **Verification.** Two separate browser contexts and a local PeerJS server:
  wrong code, then the right one, a 25 s bot match with 1,208 identical ticks on both
  pages, and a closed tab detected. Soak, modes, room duel (80±40 ms, 10% drops),
  challenge, hostile-presence and touch tests still pass with no errors.

### Relay fallback

The first real test failed: the code reached the other page, but the direct WebRTC
link never opened and the join timed out. That is typical on mobile data and behind
strict routers, where a TURN relay is needed and PeerJS's free TURN servers are
often down.

- **Relay.** Both pages now also connect to four free public MQTT brokers over
  secure WebSockets (EMQX, HiveMQ, Mosquitto, and Eclipse on port 443 for networks
  that block unusual ports), all on the topic
  `starterbrawl/v2/<code>`. A small MQTT 3.1.1 client is built in (connect,
  subscribe, QoS 0 publish, ping). Every message goes to every broker, so two
  pages only need one broker in common. Duplicates are harmless because the room
  stand-in already drops repeated presence by sequence number.
- **Choosing a path.** The joiner gives the direct link a 4 s head start, then says
  `hi` on the relay every 0.7 s until the host answers `ok`. Whichever path links
  first wins, and the other is closed. The host shows its code as soon as either
  the PeerJS broker or any MQTT broker is reachable.
- **Traffic.** Relay sends are capped at 30 a second, since public brokers are
  shared. A send goes out immediately when nothing went out in the last 33 ms, so
  the batching adds little delay. The input delay adapts to the slower path (9
  ticks against 5 in local tests).
- **Errors.** A code the PeerJS broker does not know fails after about 11 s. If
  nothing answers at all, the join gives up after 20 s with an internet-check
  message.
- **Verification.** Local PeerJS and two local MQTT brokers, three ways: direct
  only (rtc, 849 identical ticks), relay only (812), and WebRTC UDP blocked in the
  browser so the direct link starts but never opens, which is the reported case
  (relay took over, 852 identical ticks). All three include a wrong code and
  disconnect detection. Mode, room duel, challenge, hostile-presence and touch
  tests still pass.

## Rollback netcode

Over the relay, lockstep felt very laggy: every input waited out the whole round trip
(the input delay went up to 15 ticks), and play froze whenever a packet was late.
Online play now uses rollback, as fighting games do.

- **Your input.** It is applied after 2 ticks (1 on a fast link), whatever the
  latency.
- **Their input.** It is guessed as their last known input still held (sticks and
  held buttons kept, one-off presses dropped). Each tick saves a snapshot first.
  When a real input arrives that differs from the guess, the game restores the
  snapshot for that tick and replays forward, all within one frame. Play only
  waits if it gets more than 40 ticks (about 0.67 s) ahead of the other
  player's inputs.
- **Snapshots** (`rbSave` / `rbLoad`) are shallow copies of every object the
  simulation can reach, with the static tables (move kits, sprites) excluded.
  Restoring writes the values back into the same objects, so references held
  elsewhere stay valid. The seeded random generator now keeps its state on the
  function (`.s`), giving the same sequence as before, so it can be saved too.
  A tick costs about 0.08 ms to simulate.
- **Effects.** A replayed tick shows its events, except ones the screen already
  showed from the discarded timeline (same kind and side, within 8 ticks), so
  hits and sounds don't play twice. A fighter moved by a correction is drawn
  where it was and glides to its true spot over a few frames (corrections of
  48 px or more snap).
- **Timing.** Both pages report how far they run ahead of the other's inputs, and
  the one further ahead slows down by up to 12% until they match. Inputs are now
  sent straight after the tick that read them, and the friend-code link flushes
  with no 16 ms wait.
- **Sync checks** now cover only ticks whose inputs are all real.
- **Protocol** version 3, so older pages don't pair with this one.
- **Verification.**
  - Room duel at 150±60 ms with 10% of messages dropped (about 470 ms round
    trip): 1,920 compared ticks identical, no stalled frames, and about one
    rollback every 12 ticks.
  - Friend codes over the relay and with WebRTC UDP blocked: identical timelines.
  - Soak results are unchanged (same seeded sequences). Modes, challenge,
    hostile-presence and touch tests pass.

## Online smoothness: why the opponent rubber-banded, and the fix

Players saw the other fighter rubber-band and sometimes teleport. Measured on a
replayable test setup (local MQTT brokers with configurable latency and jitter, plus
a per-frame "jerk" metric for the rendered opponent), there were four causes:

1. **Fixed 2-tick input delay.** At relay latencies the opponent was predicted
   15+ ticks ahead, so a missed dodge or turn came back as a 50–100 px correction.
2. **Hard snap at 48 px.** Large corrections were not smoothed at all: these were
   the teleports.
3. **Staggered start.** The host began on sending "go" and the guest on receiving
   it, so every match started a full one-way trip out of step (20+ ticks). The
   pacing took about 3 s to recover.
4. **Head-of-line blocking.** The direct link was a reliable, ordered channel, so
   one lost packet held up everything behind it.

What other games do, and what the game now does:

- **Adaptive input delay** (GGPO's advice, and how Smash and Brawlhalla behave
  online). Each page estimates the one-way latency from how far both pages run
  ahead of each other's inputs plus both input delays (both are now sent). It
  sets its own delay to that latency minus 4 ticks, between 1 and 12. The other
  page then predicts only about 4 ticks of our input. The delay changes one tick
  at a time, at most every half second, by repeating or dropping a tick of input
  (button presses carry over, so nothing is lost).
- **Synchronised start.** The host waits half the measured round trip after sending
  "go", so both clocks start together (within 2 ticks in tests).
- **Firmer pacing.** The tick-sync correction is smoothed, proportional, and up to
  30% (was 12%, all or nothing).
- **Visual smoothing.** A corrected fighter is drawn where it was and eased to its
  true spot (×0.86 per frame). Only corrections of 160 px or more, such as a swap
  or respawn, snap.
- **Unordered direct channel.** Every message repeats all unconfirmed inputs, so
  losing one costs nothing.
- **Hybrid transport.** Direct and relay links both stay open. The match uses the
  direct link whenever it is up, even if it opens mid-match, and moves to the
  relay within one message if it drops (tested by cutting it mid-match: no pause,
  identical timelines). More public STUN servers improve the odds of a direct
  link. Relay batching is 20 ms (was 33 ms).
- **Protocol** version 4. A friend on an older cached copy gets "Different game
  versions: both refresh".

Results at about 160 ms one-way with jitter (relay), before → after:

| | before | after |
|---|---|---|
| 90th-percentile correction | 52–70 px | 20–38 px |
| corrections that snapped | about 15 per 30 s | none (they glide) |
| 99th-percentile on-screen jump per frame | n/a | about 5–8 px |
| ticks out of step at the start | 20+ | 0–2 |

All timelines stayed identical, with no stalled frames.

### Diagnostics panel

Press **F2** during an online match, or tap the connection readout in the bottom-left
corner on a phone. A panel shows the last ten seconds:
- link type and round trip
- input delay
- how many ticks ahead the opponent is being predicted
- rollbacks per second and their average depth
- median and largest correction of the opponent's position
- freezes and frame rate

One screenshot from a real match shows whether a problem is the network (high
round trip, the delay at its 12-tick cap, deep predictions) or the game (large
corrections at low latency, low frame rate).

## Charizard: Flamethrower runs on heat alone

Flamethrower no longer has a button cooldown; heat is the only limit, as asked.
Removing the cooldown alone pushed Charizard from 58% to 71%, and it exposed an
older problem: just holding X beat the Hard CPU 81% of the time, because the
flame stun-locked (12-tick hitstun against a 6-tick re-hit) and nobody punished
an overheat. The tuning, all in `FLAME`:

- Each breath costs 6 heat to light (`ignite`), so tapping X can't beat the heat
  drain. Heat builds 0.95 per tick while burning, as before.
- Overheating stuns for 60 ticks (was 45), and Charizard takes 25% more damage
  while venting (`ventTaken`).
- Flame hitstun is 5 (`hitstun`), under the re-hit gap, so a target can dodge
  out. Each tick then lands at full damage instead of decaying combo damage, so
  per-tick damage is 6 (`dmg`, was 8).
- Heat's damage bonus is +40% at 100 (was +50%).
- The CPU rushes in to punish an overheated Charizard (more often on harder
  levels).
- HUD: the X button stays lit and greys out only while overheated; the heat bar
  is the meter to watch.

Results (Hard CPU against Hard CPU, every matchup; six repetitions on the
Stadium, three on each of the five arenas):

| | before | after |
|---|---|---|
| Charizard, Stadium | 58% | 55% |
| Charizard, average of all arenas | 60% | 54% |
| Roster range, Stadium | 42–62% | 43–60% |
| Holding X against the Hard CPU | 81% | 0% |
| Tapping X against the Hard CPU | 0% | 0% |

## Modes: Standard and Tag Team

- **Standard** (mode 0, the default) is one Pokémon a side.
- **Tag Team** (mode 6) is the old two-Pokémon match with Switch and Assist. X on
  team select steps through `MODE_ORDER` (Standard, Tag Team, Training,
  Free-for-All, Team 2v2, Zone, Online).
- Party modes field one Pokémon each.
- **Online** has a Standard/Tag Team format (`onlineTag`, Y on team select). Lobby
  presence carries `fmt`, and only trainers on the same format are listed. The
  host's settings must give both teams the same size. Protocol v5.
- Switch and Assist hints and touch buttons only show with a partner.

## Legendaries, part 1: the meter and Zekrom

Design: a summon you aim, not a transformation. Long transformations are hard
to fight against, which is why Smash Ultimate replaced Giga Bowser with short
cinematics. A summon is a few seconds of spectacle that the target can see
coming and dodge.

- **Meter** (`lgMeter`, 0–100, on each fighter). Filled by damage dealt (0.13
  per point) and taken (0.09), never by legendary damage. Training starts full
  and refills.
- **Calling.** E or L2 (the assist button when you have no partner), or R or L3
  in any mode. The caller is rooted and invincible while aiming (`summon`
  state). The stick moves the aim point; releasing (after at least 8 ticks), or
  reaching 54 ticks, fires.
- **Zekrom, Bolt Strike** (`ZEKROM`). A line from behind the caller, through the
  aim point, to the wall. It gets a 26-tick red warning band, then Zekrom dives
  along it in 14 ticks. The hit does 170 damage (about 220 after the global
  multiplier), is heavy, and paralyses for 120 ticks.
- **Fairness.** A legendary's hit is neutral: no type match-up and no caller
  bonuses (heat, X Attack, Thick Fat). It can't break Ruins cover for Ancient
  Power.
- **CPU.** Calls when its meter is full and a target is within 230 px (more
  eagerly on harder levels). It aims at where the target is heading.
- **Presentation.** The arena dims while aiming, with a dashed path and a
  reticle. A Smash-style cut-in shows the portrait, name and move, there's a
  thunderclap, and the screen flashes on the strike. A meter with READY and the
  button sits on the HUD and the party cards.
- **Online.** `legend` is a pressed and held button in the input encoding (held
  bits follow the pressed list instead of a hardcoded 7). Summons live on the
  engine, so rollback snapshots cover them.
- **Sprites.** Zekrom, Darkrai and Deoxys (Normal, Attack, Defense and Speed
  Formes) come from the PMD Sprite Repository, with credits bundled.

Measured with Hard CPU against Hard CPU in all 56 matchups on the Stadium:

| | Before (slower meter) | Now |
|---|---|---|
| Summons per match (both fighters) | 0.71 | 1.75 |
| Median time to first summon | 34 s | 21 s |
| Hit rate | | 81% |
| Legendary share of all damage | 7.7% | 19.8% |
| Win-rate range | 36–66% | 39–57% (39–70% with legendaries off) |

Online duel with both sides summoning (120±50 ms, 8% of messages dropped):
2,231 compared ticks, identical.

## Legendaries, part 2: Darkrai, Deoxys and the picker

- **Darkrai, Dark Void** (`DARKRAI`). A 62 px pool lands on the aim point after
  a 30-tick purple warning. Everyone inside takes 80 damage and falls asleep
  for 130 ticks. Nightmare then drains 8 health every 10 ticks from sleepers
  Darkrai caught, for as long as the pool lingers, but never below 1. Its
  value is the free follow-up on a sleeping target, not the burst.
- **Deoxys** (`DEOXYS`). The Forme is rolled from the engine's seeded random
  when called, so online peers agree. The cut-in names it.
  - Normal, Psycho Boost: a 50 px burst at the aim point after 22 ticks, 150
    damage.
  - Attack, Hyper Beam: Zekrom's line, with a longer 32-tick warning, then a
    20-tick beam doing 165.
  - Defense, Recover: heals 18% of max health at once and grants a barrier
    for 360 ticks that halves damage and cuts knockback to 40%.
  - Speed, Extreme Speed: three 11-tick dashes, each aimed at the enemy
    nearest the aim point within 220 px, 48 damage each.
- **Picker.** The ninth roster tile on team select. A cycles Zekrom, Darkrai,
  Deoxys, Random and Off (Off sets the `legends` option). Your pick persists;
  each CPU rolls one when the roulette lands. Chips on the team cards name
  both sides' legendaries.
- **Online.** Hello carries each player's pick. The host resolves Random and
  sends `cfg.legends` (validated against the roster of legendaries).
  Legendaries are on only when both players have them on. `legends` is now a
  local setting, and the protocol version is 6 so old builds do not pair with
  new ones.

Measured with Hard CPU against Hard CPU, 56 matchups each, one fighter with
the listed legendary and the other with Zekrom:

| Legendary | Lands | Damage per summon | Legendary share of its user's damage |
|---|---|---|---|
| Zekrom | 81% | 180 | 18.9% |
| Darkrai (before) | 85% | 50 | 5.8% |
| Deoxys Normal | 89% | 173 | 19.3% |
| Deoxys Attack (before) | 92% | 305 | 30.1% |
| Deoxys Defense | | heals about 190 | |
| Deoxys Speed | 98% | 177 | 18.3% |

Hyper Beam came down from 255 to 165 base damage. Dark Void went from 45 to
80, with sleep from 100 to 130 ticks and Nightmare from 6 to 8.

After the change:

| Legendary | Lands | Damage per summon | Share |
|---|---|---|---|
| Darkrai | 82% | 86, plus Nightmare and the free hits on a sleeper | 9.4% direct |
| Deoxys Attack | 87% | 187 | 19.8% |

Online duel with Darkrai against Deoxys (70±30 ms, 8% of messages dropped),
including a rematch: 2,457 compared ticks, identical.

## Legendaries, part 3: Final Smash cinematics

The goal was for a legendary to feel like a Smash Ultimate Final Smash: a
moment that stops the match, not just a big hitbox.

- **Activation freeze** (`ULT.intro`, 42 ticks). Calling freezes the whole
  battle. The camera eases in on the caller, the arena darkens behind slow god
  rays, a summoning circle turns under the caller (PixelLab sheet
  `ultSigil`), and the legendary materialises beside them, washed white, with a
  rising chord. The cut-in now runs along the bottom of the screen with speed
  lines, so it doesn't cover the legendary. Aiming starts when the freeze ends.
- **Catch, then a scene** (`CINE`). Every legendary hitbox carries `catch`. Any
  fighter it damages is recorded on the summon, and on the next tick the
  battle freezes again (`phase: "cine"`). Hits during the scene are ordinary
  hitboxes on everyone caught, timed on beats, so damage, knockback, KOs and
  rollback all go through the normal paths. The finisher adds slow motion, an
  impact frame (black with white silhouettes) and a PixelLab blast. A missed
  call gets no scene. Legendary hits pierce guard.
- **World freeze.** While any summon is in its intro or scene, the engine's
  `step()` only runs the scene and resolves hits. Players, projectiles,
  hazards, items and the clock all hold. Inputs during the freeze are ignored.
  The freeze is part of the simulation, so online peers agree on it.
- **Scenes:**

| | Opening | Beats | Finisher | Length |
|---|---|---|---|---|
| Zekrom | dive, 45 | 4 lightning strikes, 12 each | thunder pillar, 80, paralyses | 128 ticks |
| Darkrai | void, 40, sleep | 4 Nightmare lashes, 12 each | Dark Pulse, 55, sleep 80 | 132 |
| Deoxys Normal | Psycho Boost, 40 | 3 psychic pulses, 16 each | orb hurled down, 70 | 104 |
| Deoxys Attack | Hyper Beam, 30 | 6 beam ticks, 14 each, carried along the beam | 60 | 112 |
| Deoxys Speed | first dash, 30 | 6 crisscross dashes, 10 each | dive from above, 66 | 108 |
| Deoxys Defense | none | none | heal 18%, barrier, shockwave 25 | 70 |

- **Presentation.** Each scene has its own backdrop: a storm with rain and
  sheet lightning for Zekrom, a crescent moon and drifting shadow for Darkrai,
  and deep space with an aurora and a double helix for Deoxys. Bystanders fade
  out, letterbox bars slide in, and the camera frames the target with the
  legendary beside it. The big sprites get a rim light in the legendary's
  colour so dark bodies read on dark skies. Combo banners and punish popups
  are muted during a scene.
- **PixelLab effects** (VFX workbench, imported to `assets/vfx.js`):
  - `ultBolt`, a blue thunder pillar
  - `ultPulse`, the dark pulse
  - `ultBoom`, the psychic explosion
  - `ultSigil`, the summoning circle
  - `ultBarrier`, the hexagonal barrier, also used for the Defense shield
  - `ultHit`, a beat hit spark
- **Sprite fix.** Some PMD sheets (Darkrai's SpAttack, several of Deoxys's)
  alias another animation and have no frame size, so they drew nothing. The
  loader now skips them and callers fall back to Idle.
- **Meter.** With longer scenes, gain is now 0.105 per point dealt and 0.075
  per point taken, scaled by 0.6 with more than two fighters. Measured with
  Hard CPUs over 16 matches each:

| | Summons per match | Scenes per summon | Time frozen |
|---|---|---|---|
| 1v1 | 1.69 | 96% | 12.4% |
| Free-for-all | 1.50 | 83% | 7.0% |

- **Held on the ground.** The first balance run showed half of all scenes
  landing only their opening hit. Lighter fighters were launched by it, and
  airborne fighters can't be hit, so every beat whiffed. Scenes now set
  launched or floored fighters back on their feet and cancel their knockback
  when they start. The finisher launches them again.
- **Balance.** One fighter had the listed legendary and the other had Zekrom.
  Hard CPUs played all 56 matchups twice:

| | Lands | Damage per summon | Share of its user's damage | Win rate vs Zekrom |
|---|---|---|---|---|
| Zekrom | 89% | 200 | 18.7% | 43% (mirror) |
| Darkrai | 92% | 163, plus sleep | 15.9% | 49% |
| Deoxys Normal | 80% | 155 | 14.6% | 45% |
| Deoxys Attack | 89% | 183 | 17.6% | 52% |
| Deoxys Speed | 100% | 191 | 19.0% | 55% |
| Deoxys Defense | | heals 166 per match, plus a barrier | 2.1% | 56% |

- **Online.** A duel at 120±50 ms with 8% of messages dropped, with meter
  gain raised on both sides so summons happen often: 3,472 compared ticks,
  including about 1,000 scene ticks and 500 intro ticks. No divergence.


## Online: matches ending with "can't connect" after a while

A friend match sometimes ended for both players after a few minutes. A test
that links two pages through a local PeerJS server and local MQTT brokers, then
injects faults mid-match, reproduced two causes:

- **A real desync.** After a rollback correction, the renderer eases the
  visible jump by adding an offset to each fighter's position, drawing, then
  subtracting the offset again. Floating-point add-then-subtract isn't always
  exact, so the page that corrected drifted by a fraction of a pixel. The
  once-a-second sync check then saw different positions on the two pages and
  ended the match on both ("The two games fell out of sync"). The renderer now
  saves the exact positions and puts them back.
- **Links that never came back.**
  - The MQTT relay sockets had no reconnect, so a public broker dropping a
    connection removed that path for good.
  - When the direct WebRTC link then closed, for example on a network blip,
    the game stopped at once ("Lost the link to your friend").

  Now:
  - Relay sockets reconnect with backoff, from 0.5 to 8 seconds.
  - A closed direct link falls back to the relay while the joiner redials it
    every 3 seconds.
  - The host stays registered with the PeerJS server after linking, so the
    redial can reach it.
  - Only silence from the friend ends the session, after 20 seconds.
- **Longer waits.** A stall now waits 20 seconds instead of 10. Switching apps
  or tabs tells the other page (`aw` in the match presence), and that page
  then waits up to a minute and shows "… switched away. Waiting…". Coming back
  doesn't count the time away as silence. After 3 seconds a stall reads
  "Reconnecting to …".

Fault test, results after the fix:

| Step | Before | After |
|---|---|---|
| Normal play with bots | fell out of sync | identical over 3,732 ticks |
| Every relay connection dropped | relay gone for good | reconnected |
| Direct link closed | both kicked | carried by the relay, then the direct link redialled |
| One page hung for 14 s | timed out at 10 s | match resumed |
| One page switched away for 30 s | timed out | match resumed |

## Team select, online flow, Snorlax and Fly

- **Picks.** Team select asks for `teamSize()` Pokémon: two in Tag Team
  (offline or online), one otherwise.
  - Returning from a battle used to keep your lead filled in while the CPU's
    pick was cleared. Pressing A then did nothing until you undid it, which is
    why you sometimes had to select twice. It now starts clean, with the cursor
    on your previous lead.
  - There's no separate Start press: finishing the picks, and the CPU roulette,
    opens the legendary roster.
- **Fair random.** Random picks shuffled with `sort(() => Math.random() -
  0.5)`, which is biased toward keeping the roster order, so early Pokémon like
  Charizard came up more. Everything random now uses a Fisher-Yates shuffle
  (`shuffled`). The CPU roulette, the party-mode extras and the new Random tile
  prefer Pokémon nobody has picked (`freshPicks`).
- **Legendary roster.** A full-screen pick of five cards (Zekrom, Darkrai,
  Deoxys, Random, Off) after the fighters. A confirms and starts the battle, or
  goes online. B goes back to the fighters. On touch, tap a card, then tap it
  again. The old legendary tile is now the Random tile.
- **Online Tag Team.** X now cycles Online, then Online Tag Team, then the
  next mode. Y still toggles the format. The two-page test played Tag Team
  online with switches and assists in sync.
- **After a battle online:** Rematch, New team or Leave.
  - New team sends `nt` in the match presence. The other page returns to the
    lobby and searches for that player ("X is picking a new team").
  - The player who chose New team re-picks. When they return to the lobby they
    search for the same opponent (`NET.again`, up to three minutes), and the
    two pair again.
- **Arenas online.** Hello carries each player's arena (`ar`). The host keeps
  it if both match, otherwise it draws one at random. `cfg.arenas` carries the
  two picks, and both pages play a 2.6-second roulette before the battle (the
  guest delays its ready). Every arena is selectable, including by tapping the
  stage plate. Protocol version 7.
- **Snorlax.** He used to soak hits and heal: Yawn (no damage) and Rest. The
  new kit:
  - **Body Slam (X):** an armored charge that hits everyone in its path once
    for 36, with a 25% chance to paralyse, then lands in a small shockwave.
  - **Earthquake (Y):** two ground shockwaves (24, then 32 over a wider ring),
    which miss anyone in the air.
  - **HP:** with real damage he no longer needs the extra bulk. Health went from
    1400 to 1200.
  - **Tuning runs, Hard CPUs, all matchups:**

| Version | Stadium | Ruins |
|---|---|---|
| New moves, 1400 HP | 75–79% | |
| 1150 HP | 43% | |
| 1250 HP | 57% | 68% |
| 1200 HP, final | 52% | 59% |

  In the final runs every Pokémon was between 39% and 59%.
- **Charizard's Fly.** It counts as airborne for the whole flight (it used to
  be only the first 34 ticks, and fully invincible then).
  - Melee, hitboxes, straight projectiles and ground attacks miss it.
  - Seeking attacks still hit: Dreepy, Lock-On Zap, and any projectile with a
    target and a homing value. `victimsFor(team, seek)` and the projectile
    check implement this.
  - Checked headless: a melee hitbox and a straight Zap miss, and a homing Zap
    hits.
- **Move tray.** Keyboard and pad players get a panel in the bottom-left
  corner: each move's button, name and cooldown ring with seconds left (heat
  for Flamethrower), plus the legendary meter.


### Evidence for each change

- **Select twice.** I replayed it on the previous build and on the new one:
  after a battle, choose Change team, then press A once.
  - The old build kept your lead filled in while the CPU's pick was cleared,
    and nothing happened (`picks: charizard, cpu: none`).
  - The new build takes the pick, rolls the CPU's (Venusaur against
    Magnezone) and opens the legendary roster.
- **Fair random.** 40,000 draws with Charizard already taken:

| Method | Charizard drawn | Each other Pokémon |
|---|---|---|
| Old random-comparator sort | 22.2% (fair would be 12.5%) | 8.1–14.8% |
| New `freshPicks` | 0% | 14.0–14.4% |

  Tag Team CPU pairs, with Charizard and Snorlax taken: 16.4–16.8% each,
  and never a taken Pokémon or a duplicate.
- **Fly in live CPU matches.** Charizard against each Pokémon, six matches
  each, counting every hit taken while flying.
  - Hits that landed: Venusaur's homing leaves, Dreepy, Magnezone's locked-on
    Zap and Lock-On, Lucario's Aura Sphere, and Noivern's Hurricane, which
    steers toward the nearest target.
  - Blastoise and Snorlax, with no seeking attacks, never hit a flying
    Charizard. No melee hit landed mid-flight.
- **Online Tag Team over the real friend-link stack** (local PeerJS server and
  MQTT brokers): two Pokémon each, a switch on one side and an assist on the
  other show the same on both pages, and 2,423 compared ticks are identical.
  The fake-room test also covers New team and the arena roulette in Tag Team.
- **Touch.** Each touch button now carries its move's name, and the round
  buttons show a cooldown ring with seconds left. The Smash and Legend chips
  show the move or legendary name with the meter beside it.
- **Snorlax across all five arenas** (4 rounds of all 56 matchups each),
  final build: Stadium 52%, Ruins 59%, Crater 57%, Frostfall 50%, Power Plant
  46%, an average of 53%. Every Pokémon's average falls between 44%
  (Magnezone) and 58% (Venusaur).
- **Fly, every move against a held flight.** All 8 Pokémon × 6 input plans
  (combo, X held, X tapped, Y, X then Y, smash) × 2 distances, each run
  against a grounded and a flying Charizard.
  - Every melee, smash and straight-line attack that hits the grounded
    Charizard misses the flying one: combos, Water Pulse, Hydro Pump, Body
    Slam, Earthquake, Boomburst, Dragon Pulse, Air Slash, Flamethrower, Flare
    Blitz and Zap fired without a lock.
  - Only seeking attacks connect: Dreepy, Will-O-Wisp, Lock-On, locked Zap,
    Aura Sphere, homing leaves and Hurricane.
  - Non-seeking hits on a flying Charizard: none.
- **Tag Team offline.** Chosen through the menus: X to Tag Team, two picks,
  legendary, battle. Q switched and E called an assist. 24 CPU Tag Team matches
  all finished, both Pokémon fought on every side, with 67 switches and 186
  assists.
- **Tag Team online over the friend link, with faults.** Bots switched about 45
  times and assisted about 18 times each. Meanwhile the relay was dropped, the
  direct link closed, one page hung for 14 seconds and one switched away for
  30 seconds. All 3,977 compared ticks were identical.
- **Final-build balance.** All five arenas re-run on the published build
  reproduced the numbers above exactly, since the simulation is deterministic
  and the last edits only changed drawing. Five-arena averages: Charizard 50%,
  Venusaur 58%, Blastoise 49%, Dragapult 48%, Magnezone 44%, Snorlax 53%,
  Noivern 47%, Lucario 51%.
- **Fly against everything else.**
  - Tag Team assists: only the seeking ones reach a flying Charizard (homing
    leaves, Dreepy, Lock-On, Aura Sphere). Flamethrower and Boomburst assists
    miss.
  - Every legendary and each Deoxys Forme misses a flying Charizard while
    still hitting him on the ground.
  - Arena hazards used to hit him in flight: Ruins boulders and Crater
    eruptions. Hazards never seek, so `envHit` now skips a Charizard in
    flight. Re-tested on all five arenas: hazards still hit on the ground and
    never in the air.
- **Move list, systematic.** For every Pokémon each special and the dodge
  were used for real. The displayed ring and seconds were compared with the
  game's cooldown every tick through to READY: 30,841 checks, no mismatch.
  Names, Flamethrower heat and the legendary meter matched too.
- **New team and the arena roulette over the real friend link,** run in
  Standard and in Tag Team.
  - The players picked different arenas. Both pages showed the roulette and
    landed on the same arena, which differed between draws (Ruins one match,
    Frostfall the next).
  - New team on the joiner sent the host to the lobby with "… is picking a
    new team". The joiner re-picked and the two re-paired with the new team,
    Tag Team pairs included.
- **After the hazard change:** all five arenas re-run, with the same averages
  as above. The online duel with legendaries had 2,279 identical ticks.
- **Fly in real-time play on the published build.** A keyboard-driven
  Charizard took off again and again against each of the seven Hard CPUs,
  25 seconds each: 36 flights and 23 seconds airborne in total. The CPUs
  landed 92 hits on him on the ground. In the air the only hits were Dreepy
  (4) and Lock-On (2), both seeking. No non-seeking hit landed in flight.
- **Thick Fat now only softens fire attacks.** The per-matchup table showed
  Snorlax winning 34 of 40 against Charizard. Thick Fat (×0.7) applied to
  every hit from a Fire-type attacker, including Dragon Claw and the Fly slam.
  It now applies only to fire attacks (Fire Fang, Flamethrower, Flare Blitz,
  Fire Blast).
  - 100-game Charizard vs Snorlax test: Snorlax won 78% before, 71% with
    ×0.8 on everything, and 65% with the fire-only rule (×0.7 kept).
- **Final balance** (all five arenas, all matchups four times on each). Win
  rates by arena (Stadium, Ruins, Crater, Frostfall, Power Plant):

| Pokémon | Stadium | Ruins | Crater | Frostfall | Power Plant | Average |
|---|---|---|---|---|---|---|
| Charizard | 45% | 54% | 54% | 55% | 59% | 53% |
| Venusaur | 59% | 54% | 66% | 71% | 55% | 61% |
| Blastoise | 59% | 61% | 48% | 50% | 41% | 52% |
| Dragapult | 48% | 48% | 36% | 38% | 54% | 45% |
| Magnezone | 39% | 41% | 39% | 46% | 46% | 42% |
| Snorlax | 64% | 55% | 61% | 41% | 48% | 54% |
| Noivern | 45% | 48% | 54% | 52% | 55% | 51% |
| Lucario | 41% | 39% | 43% | 46% | 41% | 42% |

  Snorlax by matchup, 40 games each:

| Opponent | Snorlax wins |
|---|---|
| Blastoise | 78% |
| Charizard | 78% (65% in the 100-game test) |
| Lucario | 70% |
| Dragapult | 48% |
| Magnezone | 42% |
| Venusaur | 35% |
| Noivern | 28% (it flies over Earthquake) |
| Overall | 54% (151 of 280) |

### Balance pass: narrowing the spread

The table above ranged from 42% (Magnezone, Lucario) to 61% (Venusaur). Four
more rounds of health changes, each re-run on all five arenas with every
matchup played eight times per arena, brought it to 45–54%:

| Pokémon | HP before | HP now |
|---|---|---|
| Venusaur | 1140 | 1060 |
| Dragapult | 740 | 750 |
| Magnezone | 1000 | 1080 |
| Noivern | 890 | 930 |
| Lucario | 1010 | 1090 |

Charizard, Blastoise and Snorlax (1200) are unchanged.

| Pokémon | Stadium | Ruins | Crater | Frostfall | Power Plant | Average |
|---|---|---|---|---|---|---|
| Charizard | 56% | 50% | 55% | 54% | 56% | 54% |
| Venusaur | 56% | 38% | 47% | 46% | 53% | 48% |
| Blastoise | 43% | 44% | 46% | 48% | 43% | 45% |
| Dragapult | 54% | 59% | 48% | 54% | 55% | 54% |
| Magnezone | 54% | 45% | 57% | 54% | 46% | 51% |
| Snorlax | 44% | 62% | 42% | 46% | 47% | 48% |
| Noivern | 45% | 46% | 60% | 54% | 54% | 52% |
| Lucario | 48% | 57% | 45% | 44% | 46% | 48% |

No errors in any run. The online duel on this build (rollback with 120 ms
latency, 50 ms jitter and 8% packet loss, legendaries on) compared 1,957
ticks with no divergence, and rematch and leave worked.
