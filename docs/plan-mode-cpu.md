# Mode-aware CPU

The CPU's fighting brain is the same in every mode. A mode layer sits between that brain and the arena-safety pass, so hazard avoidance still has the last word. The layer gives each mode its own goals, and higher CPU levels follow them more closely: the rookie CPU follows them about half as closely as the hard one.

In code (`src/game.js`):
- `modeTarget` picks who to fight, per mode.
- `modeLayer` adjusts movement and intent.
- `modeOld` keeps the behaviour from before this layer, so tests can compare against it.

## What each mode does

| Mode | Targeting | Play |
|---|---|---|
| **Zone Control** | Whoever is on, or nearest, the ring. | Rushes the ring while the rival is down (the respawn window). Inside the ring it fights from there and never chases out. Ahead and pressed close, it guards the lead. Off the ring, it pushes in harder when behind or contested. It moves to a telegraphed ring before the jump. |
| **You're It!** | Whoever is it hunts the nearest fighter it may pass to, skipping the one it just got it from during the no-tag-back window. | It: chases and swings (only melee passes it on), never wastes specials, and dashes in from mid range. Not it: keeps clear, dodges a lunging It, and knows it is safe from an immediate tag-back. |
| **Free-for-All** | The best prey, not just the nearest. That means hurt fighters, fighters busy trading with someone else (third-partying), and fighters on thin ice; it leaves the healthy leader to the others. Revenge on whoever just hit it still comes first. | Backs out when two or more rivals are on top of it. |
| **Team 2v2** | Peels for a partner under 30% HP; otherwise focuses the partner's target when it is in reach. | Steps aside instead of standing in the partner's way. |
| **Thin Ice** | (Free-for-All targeting favours foes on weak ice.) | Moves off a worn slab onto sound ice before it goes, since every attack wears the slab underfoot. Comes at a foe from the far side of the nearest hole, so its hits send them over it, but never through weak ice. Late on, drifts to the solid middle as the lake thaws. |

## Evidence

Each mode was run with CPUs using the layer against identical CPUs using the old behaviour (`modeOld`): hard level, same build, rotating seats and fighters. "Par" is the share a seat would win by chance.

| Mode | Games | Layer's win share | Par | Notes |
|---|---|---|---|---|
| You're It! | 60 | **0.73** | 0.25 | It for 17 s a game vs 26 s for each old-behaviour seat |
| Free-for-All | 60 | 0.32 | 0.25 | |
| Zone Control | 60 | 0.58 | 0.50 | Average score 83 vs 80 |
| Team 2v2 | 60 | 0.51 | 0.50 | The first version lost (0.41): it peeled far too eagerly and backed out of normal 2-on-2 scrums. Both were fixed. |
| Thin Ice | 80 | 0.57 | 0.50 | The first version had no effect (0.48 duel, 0.20 party). Moving off worn slabs is what made the difference. |
| Thin Ice Party | 80 | 0.30 | 0.25 | |

Against CPUs with no mode play at all (neither the layer nor the old behaviour), the layer won Zone Control 0.97 and You're It! 0.85.

The test harness and its switches (`modeOff`, `modeLegacy` on a CPU brain) are for measurement only; nothing in the game sets them.
