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
