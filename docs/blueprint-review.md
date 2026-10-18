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
