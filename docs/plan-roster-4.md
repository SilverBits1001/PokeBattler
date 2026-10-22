# Roster 4: Pikachu and Gengar

The same rules as [Roster 3](plan-roster-3.md): each fighter has one idea at the
centre of its kit, taken from the Pokémon's lore and typing, and "balanced" means risk
matches reward. The big payoffs need a commitment a sharp opponent can punish.

Controls recap: **A** basic 3-hit combo, **RS** smash (hold to charge),
**X** / **Y** specials on cooldowns, **B** dodge, plus one passive ability.

---

### Pikachu (Electric): glass-cannon speedster

*Lore:* the Mouse Pokémon, which stores electricity in its cheeks and lets it out in
bolts. Its signature move, Volt Tackle, is a full-body electric charge so strong that
it hurts Pikachu too. Its ability is Static.

*Play style:* get in, get out. Pikachu is the fastest fighter and has the second-lowest
HP. It chips from range and darts in and out. Its one big hit is the biggest charge in
the game, and Pikachu pays for it.

| Slot | Move | Type | What it does |
|---|---|---|---|
| A | Spark · Iron Tail | ELECTRIC / STEEL | Two quick sparks, then a heavy Iron Tail. |
| RS | **Volt Tackle** | ELECTRIC | A crackling charging dash through foes. It travels further with charge and paralyses what it hits. Recoil: a quarter of the damage dealt hurts Pikachu too. A miss leaves a long recovery. |
| X | Thunderbolt | ELECTRIC | A fast bolt of lightning that crosses most of the arena. 35% chance to paralyse for one second. |
| Y | **Quick Attack** | NORMAL | Two darting dashes that hit as Pikachu passes. Untouchable on the first; the second can be steered. |
| B | Dash | — | A quick dash. |
| * | Static | — | A foe who hits Pikachu up close may be paralysed (30%). |

Risk vs reward: the frailest body and the fastest legs. Volt Tackle is the
highest-reward smash, and it carries the highest measured risk of any move in the game
(its recoil counts). Thunderbolt and Quick Attack are the safe tools.

### Gengar (Ghost / Poison): sleep-and-feast trickster

*Lore:* the Shadow Pokémon, which lurks in shadows and feeds on dreams. Hypnosis and
Dream Eater are its classic pairing. Its ability (Generations 3–6) is Levitate.

*Play style:* land Hypnosis, then cash in. Everything else about Gengar is average.
Hypnosis turns it into the most dangerous fighter on the field for a second and a half.

| Slot | Move | Type | What it does |
|---|---|---|---|
| A | Shadow Punch · Lick | GHOST | Two shadowy punches, then a heavy Lick. |
| RS | **Dream Eater** | PSYCHIC | A lunging bite. Weak on a foe who is awake. On a sleeping foe it deals 2.2× and heals Gengar for half the damage. |
| X | **Hypnosis** | PSYCHIC | A slow wave of violet rings. A foe it touches falls asleep for 1.4 s (a hit wakes them). Long recovery, long cooldown. |
| Y | Shadow Sneak | GHOST | Sinks into its shadow (untouchable, unseen), glides where it is steered, then rises under the foe. |
| B | Phase | — | A short, untouchable blink. |
| * | Levitate | — | Floats: ground attacks, quakes and floor hazards miss it. |

Risk vs reward: Hypnosis is slow, telegraphed and leaves Gengar open, and Dream Eater
is weak without it. When the combination lands it is a big swing; when Hypnosis
misses, Gengar has thrown away its best tool for four seconds. In a crowd, anyone can
wake the sleeper (or eat the dream first).

---

## What testing changed

CPU round robins against the whole roster (2 games per pairing each way, on the
Stadium, Ruins and Power Plant), then risk/reward measurements against ten established
fighters at every CPU level.

- **First pass:** both new kits were far too weak. Pikachu won 3–5% of its duels and
  Gengar about 21%. Their damage scales were set from the old roster's numbers, but
  Pikachu's small hits needed a much larger scale.
- **Pikachu** stays one of the frailest (800 HP before the global ×1.5, second only
  to Dragapult) and hits hard instead: damage scale 2.3. Its duel win rate is now
  about 0.51 (0.48 / 0.47 / 0.58 on the three arenas).
- **Gengar:** HP 940 → 1000, damage scale 1.2 → 1.65, for a duel win rate of about
  0.50 (0.49 / 0.54 / 0.48).
- **Shadow Sneak** cost Gengar more than it earned against hard CPUs (11.5 dealt / 29.5
  taken per use), the same problem Fiery Dance had in Roster 3. Its recovery went from
  16 to 9 ticks, and its rise hits a little harder (26 → 30 damage).

## Risk vs reward evidence

For every use of a move in CPU duels, two numbers are recorded:
- *reward*: damage dealt while the move runs.
- *risk*: damage taken while committed to it, plus the 20 ticks after. Volt Tackle's
  recoil counts as risk.

Hard CPU (level 2), against ten established fighters:

| Kit | Combo (reward / risk) | Smash (reward / risk) | X special | Y special |
|---|---|---|---|---|
| Pikachu | 92 / 22 | Volt Tackle 87 / 51 | Thunderbolt 33 / 12 | Quick Attack 30 / 12 |
| Gengar | 69 / 22 | Dream Eater 50–59 / 16–18 | Hypnosis: damage lands later, through Dream Eater (4 / 15) | Shadow Sneak 25 / 12 |

For reference, the Roster 3 table spans combo 37–96 / 13–30 and smash 2–55 / 20–48.
Volt Tackle sits above both ends of the smash range: the biggest payoff and the
biggest risk, as designed.

Duel win rates at each CPU level (rookie, normal, hard), each against the same ten:

| Level | Pikachu | Gengar |
|---|---|---|
| 0 | 0.47 | 0.50 |
| 1 | 0.43 | 0.60 |
| 2 | 0.60 | 0.57 |

No kit depends on one skill level to be viable.

**Free-for-All and 2v2.** Each new kit was put in every game of 300 random
four-fighter Free-for-Alls (25% is par) and 300 random 2v2s (50% is par), then its
per-mode damage scale was adjusted and the check run again:

| Mode | Kit | First pass | Scale | Final check |
|---|---|---|---|---|
| Free-for-All | Pikachu | 0.31 (163 games) | 1 → 0.85 | 0.24 (166) |
| Free-for-All | Gengar | 0.35 (163) | 1 → 0.65 | 0.32 at 0.74, 0.22 at 0.6 (200–300 games each) |
| 2v2 | Pikachu | 0.36 (166) | 1 → 1.35 | 0.50 (166) |
| 2v2 | Gengar | 0.44 (162) | 1 → 1.35 | 0.46 (200) |

A crowd suits Gengar: other fighters wake and soften its sleepers, and it floats over
the floor hazards. Pikachu needs its partner in 2v2: alone it is focused down.

This testing is CPU-only. A human session is still the right final check on feel.
