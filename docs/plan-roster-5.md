# Roster 5: Toxtricity, Gallade, Koraidon, Miraidon

The rules are the same as the [roster plans](plan-roster-4.md):
- each fighter has one idea at the centre of its kit, taken from its lore and typing;
- "balanced" means risk matches reward, so the big payoffs need a commitment a sharp opponent can punish.

## Toxtricity: Punk Rock chemist

*Lore:* it makes its own toxins, then plays the electricity in its body like a guitar.

*Typing:* Poison lays the groundwork (puddles, poison); Electric cashes it in.

*Play style:* **mix, then set it off.**
1. Lob a Sludge Bomb to leave a puddle.
2. Shock charges your own puddles and paralyses foes who are already poisoned (Toxic Shock).
3. A charged Overdrive sets off every puddle in reach at once.

| Slot | Move | Type | What it does |
|---|---|---|---|
| A | Poison Jab · Poison Jab · **Spark Strike** | POISON / ELECTRIC | Two jabs, each with a 20% chance to poison, then a heavy electric strike. |
| RS | **Overdrive** | ELECTRIC | A chargeable sound ring that grows with charge and goes through cover. It detonates Toxtricity's own puddles inside the ring. Long recovery (34 ticks). |
| X | **Sludge Bomb** | POISON | An arcing glob aimed at a spot. Where it lands it poisons and leaves a puddle for 5 s that poisons anyone standing in it. 4 s cooldown. |
| Y | **Shock** | ELECTRIC | A short burst around Toxtricity. Poisoned foes it hits are paralysed (Toxic Shock), and it charges your puddles so they zap. 2.5 s cooldown. |
| * | Punk Rock | — | Sound moves hit 25% harder and sound damage taken is halved. |

**Risk:** every payoff sits at short range or behind a 54-tick charge, and Toxtricity has only 1000 HP. A foe who keeps out of the puddles takes only basic damage.

## Gallade: blade knight

*Lore:* a courteous swordsman whose elbow blades extend when it fights.

*Typing:* Psychic for reach and teleporting; Fighting for raw close damage.

*Play style:* **get in, cut through, accept the hit back.**

| Slot | Move | Type | What it does |
|---|---|---|---|
| A | Slash · Slash · **Sacred Sword** | PSYCHIC / FIGHTING | The third hit cuts through guard. |
| RS | **Close Combat** | FIGHTING | A lunging flurry: four hits, up to eleven when fully charged. Afterwards Gallade takes 30% more damage for 4 s ("GUARD DOWN"). |
| X | **Teleport Slash** | PSYCHIC | Blinks behind the nearest foe within 130 and slashes. A whiff has a long recovery. 4 s cooldown. |
| Y | **Psycho Cut** | PSYCHIC | A fast piercing crescent. 2 s cooldown. |
| B | Blink | — | A short teleport dodge. |
| * | Sharpness | — | Basic attacks, Teleport Slash and Psycho Cut hit 15% harder. |

**Risk:** Close Combat is the biggest damage in the kit, but the Guard Down window it opens is the punish.

## Legendaries

| Legend | Move | What it does |
|---|---|---|
| Koraidon | Collision Course | Telegraphs a lane, then charges along it. A catch starts a ramming cinematic. Afterwards a harsh sun at the summoner's spot powers up their hits by 20% for 5 s. |
| Miraidon | Electro Drift | Drifts around a ring at the aimed spot, then strikes it with a bolt. A catch starts a lightning cinematic. Afterwards Electric Terrain speeds up the summoner by 25% and zaps foes standing in it. |

Each has its own scene: Area Zero under a red sun for Koraidon, and a neon future city for Miraidon.

## Test numbers

All runs are CPU against CPU. The target duel band is 0.45–0.55.

**Duels with legendaries on** (the `bal3` harness: 2 reps against the full roster on arenas 0, 1 and 4, each side with Zekrom):

| Pass | Toxtricity | Gallade | Change |
|---|---|---|---|
| 1 | 0.18 | 0.67 | First cut |
| 2 | 0.44 | 0.52 | Toxtricity: HP 1000, power 2.1, Overdrive windup 12. Gallade: power 1.4; Close Combat 10 damage per hit, recovery 32 |
| 3 | 0.45 | — | Toxtricity: power 2.2 |
| 4 | **0.50** | **0.44** | Final kits (below) |

**Duels without legendaries.** Legendary damage hid a gap. The Toxtricity CPU takes more damage and so summons more often, while Gallade wins fast. Without legendaries, after pass 3, Gallade won 0.58–0.69 and Toxtricity 0.22–0.33. Per-move risk and reward (damage dealt / taken while the move runs and for 20 ticks after) showed why:

| Move | Reward | Risk |
|---|---|---|
| Close Combat (before) | 105–121 | 41–46 |
| Teleport Slash (before) | 44 | 7 |
| Overdrive (before) | 49–57 | 37–43 |

Final changes:
- Overdrive recovery 34 → 26 and full-charge growth 26 → 32, so charging it pays more.
- Close Combat 10 → 8 damage per hit.
- Teleport Slash 24 → 21.
- Gallade power 1.4 → 1.3.

Final results, 81 games per level against 27 opponents:

| CPU level | Toxtricity | Gallade |
|---|---|---|
| Rookie | 0.48 | 0.48 |
| Normal | 0.47 | 0.53 |
| Hard | 0.41 | 0.42 |

Gallade is weakest on arena 4 (0.28 with legendaries, 0.41 in pass 2), a matchup cost of a melee kit.

**Modes.**
- Free-for-All (par 0.25):
  - Toxtricity won 0.45 unscaled, because puddles and Overdrive catch a whole crowd. Its scale is now **0.6**: with the final kit it won 0.39 at 0.65, 0.17 at 0.5, and 0.21 over 120 games at 0.58.
  - Gallade won 0.10 once tuned, because a crowd punishes Guard Down. Its scale is now **1.3**: 0.26 over 80 games.
- 2v2 (par 0.50): Toxtricity 0.45 and Gallade 0.50 over 120 games, both unscaled. The scale moved Gallade very little (0.9–1.25 all gave 0.5–0.6), so it has none.

**Legendaries.** In a legendary round-robin, with mirror fighters and 4 reps per pair:

| Legendary | Win rate | Damage per summon |
|---|---|---|
| Koraidon | 0.47 (80 games) | 179 |
| Miraidon | 0.47 (80 games) | 173 |
| The other nine | 0.38–0.69 | 156–206 (Ho-Oh, a support legendary, 77) |

**Online.**
- A four-player friend-code party (Toxtricity, Gallade, Toxtricity, Gallade) ran 40 seconds of button mashing and a rematch: 6 shared checksums, 0 mismatches.
- The same party with Koraidon and Miraidon summoned repeatedly (meter gain boosted in the test build): 0 mismatches.
