# Chandelure rework: Lantern of Souls

The rules are the same as the [roster plans](plan-roster-4.md):
- each fighter has one idea at the centre of its kit, taken from its lore and typing;
- "balanced" means risk matches reward, so the big payoffs need a commitment a sharp opponent can punish.

## Why rework it

The old kit (Will-O-Wisp, Hex, Overheat) worked, but it played itself:
- you threw homing wisps and waited for them to land;
- Hex did its damage a beat after you cast it;
- Overheat's self-drain was a penalty without a decision behind it.

Its duel win rate was fine (0.47), but nothing in the kit asked you to set anything up.

## The idea

*Lore:* Chandelure lures spirits with its flames, then burns them away.

*Typing:* Ghost traps and curses; Fire burns, and the burn feeds the payoff.

*Play style:* **trap, burn, cash in.**
1. Catch a foe in Fire Spin.
2. Land Inferno while they are held, which sets them alight and leaves a burning pool.
3. Hex the burn: double damage, and the hit heals Chandelure.

Every link in that chain can be dodged, and Inferno roots Chandelure while it casts.

| Slot | Move | Type | What it does |
|---|---|---|---|
| A | Ember · Ember · **Astonish** | FIRE / GHOST | Two fire flicks, each with a 15% chance to burn, then a ghostly shove with real knockback (it sets up Thin Ice and Zone pushes). |
| RS | **Inferno** | FIRE | A slow fireball that always burns and drifts slightly toward its target. It grows with charge (26 → 42 damage). Where it lands it leaves a burning pool for 2.5–4 s, which burns whoever stands in it. Chandelure is rooted while casting and has a long recovery (38 ticks). |
| X | **Fire Spin** | FIRE | A flame vortex on the target (or ahead of Chandelure). It telegraphs for 14 ticks, then for one second drags foes to its eye and holds them with a hit every 12 ticks. Floating Pokémon are caught too. 6 s cooldown. |
| Y | **Hex** | GHOST | A fast curse bolt that passes through cover. It does 14 damage normally. On a burned foe it deals double, eats the burn, and heals Chandelure for 40% of the damage. 1.8 s cooldown. |
| B | Phase | — | A short, untouchable blink. Unchanged. |
| * | Flash Fire | — | Fire hits deal half damage and power up its fire moves for 4 s. Unchanged. |

The pool is fire on the ground, so floating Pokémon (Gengar, another Chandelure, fliers) pass over it. Fire types cannot be burned, which leaves Hex without its payoff against them; that is the matchup cost of the typing.

### Risk vs reward, by design

- **Inferno** is the big payoff and the big commitment: rooted, slow, and a long recovery if it misses.
- **Fire Spin** is the setup. A foe who reads the telegraph walks out; a foe who does not is held for the follow-up.
- **Hex** is the safe tool on its own (14 damage) and the reward when the setup worked (28 plus a heal).
- **Ember** is weak but can open the loop up close, at the cost of standing where Chandelure least wants to be.

## Numbers and what testing changed

Method: CPU duels against the whole roster (27 fighters) on the Stadium, the Ruins and the Power Plant, with both sides on the hard CPU.

| Pass | Change | Duel win rate |
|---|---|---|
| Old kit | — | 0.47 |
| 1 | First draft (Inferno 30 +22 per charge, pool 4/tick, Fire Spin 6/hit) | 0.62 |
| 2 | Inferno 26, pool 3, Fire Spin 5 | 0.58 |
| 3 | Inferno recovery 32 → 38, Fire Spin cooldown 5.5 → 6 s, Hex heals 40% (was 50%), Inferno +16 per charge | 0.49 |
| Ship | Fire Spin arms faster (16 → 14) with a wider eye (26 → 28) | **0.50** (0.53 / 0.50 / 0.48 on the three arenas, 486 games) |

After pass 1 every move pulled its weight. Damage by source was spread across Inferno, Hex, Fire Spin and the pool, with no single move carrying the kit. The later passes moved the cost onto the commitment (recovery, cooldown, heal) rather than stripping damage.

**Modes.** Each fighter has its own damage scale per mode.
- In random four-fighter Free-for-Alls, Chandelure won 0.26 of 160 games, where 0.25 is par. Its scale stays at 0.6.
- In 2v2 the new kit was far below par: 0.26 of 160 games, where 0.50 is par. Its damage arrives in pieces (trap, then fireball, then bolt) that a second foe easily interrupts. Its 2v2 scale went from 0.8 to 1.2 (0.38), then to 1.55 (**0.48** of 200 games).

**Per-move risk vs reward.** For every use of a move, two numbers are recorded:
- *reward*: damage dealt while the move runs and in the 20 ticks after;
- *risk*: damage taken in the same window.

Results against ten established fighters, about 100 games per level:

| Level | Win | Ember combo | Inferno | Hex | Fire Spin |
|---|---|---|---|---|---|
| Rookie | 0.30 | 32 / 12 | 42 / 24 | 20 / 5 | setup (risk 8) |
| Normal | 0.43 | 43 / 12 | 40 / 30 | 22 / 6 | setup (risk 10) |
| Hard | 0.45–0.54 | 52 / 14 | 39 / 31 | 19 / 9 | setup (risk 12) |

Fire Spin's damage lands through the vortex after the cast ends, so its "reward" column undercounts it, as with Hex's old burst. Inferno is the highest-risk move in the kit, as designed.

**Known low point: the rookie CPU.** At rookie level Chandelure wins about 0.30, because its damage comes from setups the rookie CPU rarely converts. Its rookie CPU now leans on Hex pokes and only commits to Inferno on a held or reeling foe. That made no measurable difference, so the kit was not buffed for everyone.

For reference, other setup and zoning kits sit at the same end at rookie level, on the same test:
- Milotic 0.32;
- Inteleon 0.38;
- Froslass 0.48;
- Lurantis 0.52;
- Volcarona 0.58;
- Gardevoir 0.64.

This testing is CPU-only. A human session is still the right final check on feel, especially Fire Spin's telegraph timing.
