# Plan: combat depth, new modes and the controller layout

The in-depth version of [the ideas doc](ideas-mechanics-and-modes.md). For each feature: what we are achieving, the rules and numbers, how a match plays out with it, how it is built on the engine as it stands, what the player sees and hears, and how it is tested. The controller layout comes first because three of the features need a button.

Conventions used throughout: 60 ticks a second; "power" is a kit's damage scale; `exHit`, `exArea`, `fields`, `emit`, `r3Out`, `r3Taken` and `startMatch` are the engine hooks named in the roster plans; every feature is input-driven and deterministic so rollback online works unchanged, and each phase bumps `NETV`.

---

## Part 1: the controller

### What the game binds today (standard Xbox mapping)

| Input | Fight | Menus |
|---|---|---|
| Left stick | Move | Cursor |
| Right stick | Push to charge the Smash, release to fire it | — |
| A | Attack (combo) | Confirm |
| B | Dodge | Back |
| X | Special 1 | — |
| Y | Special 2 | — |
| RT | Guard (hold) | — |
| LT | Assist (Tag Team); also calls the legendary in single-Pokémon modes | — |
| LB | Switch partner (Tag Team) | — |
| RB | Lock target (only with auto-target off) | — |
| L3 (left stick click) | Call the legendary | — |
| R3 (right stick click) | Taunt | — |
| D-pad | — | Cursor |
| Start | Pause | — |
| Back | — | Cycle stage or legendary on the VS screen |

Keyboard: WASD move, J attack, K dodge, L and I specials, arrows Smash, O or F guard, Shift lock, Q switch, E assist, R legendary, T taunt.

### What is wrong with it

1. **The legendary is on a stick click.** L3 is the worst button on the pad for a once-a-match moment: you click it by accident while sprinting, and when you mean it you have to stop moving to press it cleanly. In single modes it is also on LT, so the same action has two homes.
2. **Taunt is on R3, which is the Smash stick.** Releasing a charged Smash with any downward pressure clicks the stick and taunts instead. That has cost matches.
3. **LB does nothing outside Tag Team**, and RB does nothing unless you turn auto-target off. Two shoulder buttons idle in the most-played mode.
4. **Nothing is free for a grab or a Burst**, which the features below need.
5. **D-pad is unused in a fight.** It is the natural home for once-a-match and social actions, which is where Smash puts taunts.

### The proposed layout

| Input | Fight | Why |
|---|---|---|
| Left stick | Move | unchanged |
| Right stick | Smash: push to charge, release to fire | unchanged |
| A | Attack | unchanged |
| B | Dodge | unchanged |
| X | Special 1 | unchanged |
| Y | Special 2 | unchanged |
| RT | Guard (hold) | unchanged |
| LT | Assist (Tag Team) / Support call (single modes, once the support slot exists) | the "call for help" trigger in every mode |
| **RB** | **Grab** | index finger, next to Guard, and the grab is the answer to guard |
| **LB** | Switch partner (Tag Team) / **Lock target** (other modes) | both are "change who I'm dealing with" |
| **LT + RT** (chord) | **Call the legendary** | a deliberate two-finger press; impossible by accident, and it already feels big |
| **D-pad Up** | **Burst** (Mega Evolution / Terastallization) | once a match; the thumb leaves the stick for a moment, which is fine for a transformation |
| **D-pad Down** | Taunt | off the Smash stick |
| D-pad Left / Right | Quick phrases online ("GG", "Rematch?"), nothing offline | social, never accidental |
| L3 | Free (reserved for a future lock toggle with auto-target off, if LB is wanted for something else) | |
| R3 | Free | |
| Start | Pause | unchanged |
| Back (hold) | Scoreboard in party modes | unchanged on the VS screen |

**The chord.** LT and RT each still do their own thing. The input layer waits 5 ticks after the first of the two is pressed: if the second arrives inside the window, the pair becomes `legend` and both singles are swallowed; otherwise the single fires late by at most 5 ticks (guard and assist both tolerate that; guard's hold begins from the real press so perfect-guard timing uses the press tick, not the resolved tick). With the meter below 100 the chord does nothing and the singles fire normally, so there is no cost to a mistimed guard.

**Keyboard.** U grab, Y Burst, R legendary (unchanged), T taunt (unchanged). Lock stays on Shift. Everything else is unchanged.

**Touch.** Grab is a small button between Guard and B on the right-hand arc; Burst is a tap on the legendary meter when it is at least half full and glowing; the legendary stays on its button above A; taunt moves into the pause menu's emote row. Drag-to-aim Smash is unchanged.

**The Controls screen** shows a pad diagram with the live mapping and the Swap face buttons and Swap specials options as now; full rebinding is a later feature (see the review doc).

**Order of work:** the layout change ships first and alone (one `NETV` bump), with a one-time "Controls have changed" card on the title screen showing the pad diagram. It is a day of work and everything below assumes it.

---

## Part 2: combat mechanics

### 2.1 Grab and throw

**What we are achieving.** A universal answer to guard, which today only a few moves have (Sacred Sword, Crunch, Snorlax's throw), and with it a rock-paper-scissors at close range: attack beats grab, grab beats guard, guard beats attack. Also a directional throw, which is the cleanest Thin Ice and edge tool in the game.

**Rules.**
- RB. Startup 8 ticks, active 4, whiff recovery 22. Reach 14 and radius 12, like a basic hit, in the facing direction (or towards the locked or nearest foe within 30°, the way basics already aim).
- It **cannot be guarded or perfect-guarded**. It whiffs on a dodging foe (i-frames), on a launched, downed or getting-up foe, on anyone in a cinematic, and on floaters only if the grabber is not also a floater (Levitate escapes grabs from the ground; grounded fighters cannot be grabbed by a floater either, so Gengar's grab is a grounded-only trick it rarely gets).
- A grab is an attack for counter-hit purposes (2.2): any hit during its startup is a counter-hit on the grabber.
- On a catch, both freeze for 10 ticks (grabber in `grab`, victim in `grabbed`, invulnerable to everyone else so a partner cannot steal the throw). Then the throw: the victim is launched in the **left-stick direction** held at that moment (or away from the grabber if the stick is neutral) with heavy knockback 7.5, 18 damage × power, heavy hitstun. Throwing them into a wall or prop adds the wall splat that already exists.
- A thrown foe is grab-immune for 40 ticks (no loops). A grab fails on a foe inside 40 ticks of their last throw.
- Guard meter: a caught guard is just caught; the shield is untouched. There is no mash-out, because the counter-hit on startup is the escape.
- Thin Ice: the landing spot takes a heavy crack (`TICE.fx.throw = [heavy, "r", 0]`). Magma Isle: a throw towards the edge is the dunk setup.
- Items: a grab on a foe holding a dropped item knocks the item loose.

**How it plays.** Blastoise sits in guard behind its puddle, taking Pikachu's combo on the shield. Pikachu dashes in and grabs: Blastoise is caught through the guard and thrown into the water. Next round Blastoise sees the dash coming and starts Skull Bash as Pikachu reaches for it; the headbutt lands during the grab's startup, a gold "COUNTER!" pops, and Pikachu is launched. The third time Pikachu fakes the dash, Blastoise swings early, and Pikachu perfect-guards it. That is the triangle, and all three outcomes are readable.

**How it is built.**
- Input: `grab` added to the action set in the pad, keyboard and touch readers.
- Two new fighter states, `grab` (startup → active → recovery, using the `Swing` animation; kits without one use `Attack`) and `grabbed` (using `Hurt`). The state list that blocks the legendary and assist calls gets both.
- Active window: a hitbox with `kind: "grab"`, `unblockable: !0`, `pierceGuard: !0`, that the guard path ignores and that `exHit` resolves by entering the clinch instead of applying damage.
- Throw: after the 10-tick clinch, `exHit(v, e, 18, 7.5, dx, dy, {src: "throw", heavy: !0, hitstun: A.hitstunHeavy, hitstop: 10})` with `dx, dy` from the grabber's stick, and `v.grabImmuneT = 40`.
- Per-kit flags: `grabDmg` and `grabKb` overrides in `EXK` for the heavyweights (Snorlax and Rhyperior throw harder, 24 damage, kb 8.5; Froslass and Gengar softer).
- CPU: in `exThink`, a grab is chosen when the foe has held guard for 20+ ticks within reach 24, or on Thin Ice when a throw direction crosses a worn slab, and never while the foe is in an attack's startup. The Rookie CPU grabs rarely; Hard reads guards.
- Effects: `grab` (clinch flash, `S.swing(!1)`), `throw` (`S.launch(7.5)`, dust ring at the landing, a pack `impact` sheet), both routed through the Thin Ice table.
- Briefing: a "RB · Grab" row is added to every move list; damage column shows the kit's throw damage.

**Tests.** `moves.js`-style: grab beats a held guard (hit event `throw`), whiffs on a dodge, whiffs on a downed foe, counter-hit lands during grab startup, no second grab inside 40 ticks, Thin Ice crack event at the landing. Then the full `bal3` round robin, since every kit gains a move; expect the heaviest guard users (Blastoise, Aegislash, Metagross) to drop a few points and the grapplers to rise; retune `power` where a kit leaves 0.45–0.55.

**As built: every fighter grabs differently.** The base above became five kinds of grab, and each fighter has its own numbers and a twist. Startup is in ticks, reach in arena units (a tether's reach is its range), damage before the kit's power, and recovery is the whiff recovery.

| Kind | How it plays | Fighters |
|---|---|---|
| Throw (toss) | Catch, then throw where the stick points | Lucario, Scizor, Gallade, Blastoise, Inteleon, Volcarona, Aegislash, Ceruledge, Pikachu, Toxtricity |
| Slam | Slow and short; lifts them and slams them down (half knockback, a big Thin Ice crack) | Snorlax, Rhyperior, Golurk, Metagross |
| Bite | Fast; three chomps, then a flick away | Tyrantrum, Garchomp, Charizard, Noivern |
| Phase | Reaches from a strange angle (behind, a swap, untouchable frames) | Greninja, Zoroark, Gengar, Dragapult, Froslass |
| Pull (tether) | Reaches across the arena, reels them in, then throws; slow and punishable | Chandelure, Venusaur, Lurantis, Milotic, Gardevoir, Magnezone |

| Fighter | Kind | Startup | Reach | Damage | Knockback | Twist |
|---|---|---|---|---|---|---|
| Snorlax | Slam | 14 | 14 | 26 | 6 | Body Slam: a quake around the landing |
| Rhyperior | Slam | 13 | 16 | 24 | 8 | Throws far for a slam |
| Golurk | Slam | 14 | 18 | 22 | 9 | Longest reach of any grab |
| Metagross | Slam | 12 | 14 | 22 | 7 | Long magnetic hold; armoured while it holds |
| Tyrantrum | Bite | 9 | 16 | 8 + 3×6 | 7 | Armoured through the bites |
| Garchomp | Bite | 8 | 15 | 8 + 3×5 | 7.5 | Drags its catch along |
| Charizard | Bite | 8 | 14 | 8 + 3×4 | 7 | Fire Fang always burns |
| Noivern | Bite | 7 | 14 | 6 + 3×4 | 6.5 | Catches floaters |
| Lucario | Throw | 7 | 13 | 16 | 8.5 | Spins them round: the furthest throw |
| Scizor | Throw | 6 | 12 | 14 | 7 | The fastest grab |
| Gallade | Throw | 7 | 14 | 18 | 7.5 | They land facing away: a back-crit setup |
| Blastoise | Throw | 11 | 13 | 18 | 8 | Slow shell bash, strong |
| Inteleon | Throw | 9 | 13 | 10 | 6 | Weak, long whiff (30) |
| Volcarona | Throw | 10 | 14 | 14 | 6 | Burns; catches floaters |
| Aegislash | Throw | 10 (Blade 7) | 13 | 16 (Blade 20) | 7 (8) | Blade Forme is faster and cuts deeper |
| Ceruledge | Throw | 8 | 14 | 16 | 7.5 | They bleed for two more ticks |
| Pikachu | Throw | 6 | 11 | 9 | 6 | Springs back out of reach |
| Toxtricity | Throw | 9 | 13 | 14 | 7 | 40% paralysis; always on a poisoned foe |
| Greninja | Phase | 6 | 12 | 10 | 5 | Reappears behind them |
| Zoroark | Phase | 8 | 13 | 14 | 7 | Swaps places, then throws |
| Gengar | Phase | 9 | 12 | 14 | 6.5 | Untouchable ticks 3–8; rises behind |
| Dragapult | Phase | 8 | 14 | 12 | 7 | Untouchable ticks 2–6 |
| Froslass | Phase | 9 | 13 | 12 | 6 | Chills |
| Chandelure | Pull | 12 | 60 | 14 | 6 | Burns |
| Venusaur | Pull | 11 | 80 | 16 | 7 | The longest pull; rooted while it pulls |
| Lurantis | Pull | 10 | 55 | 16 | 7 | Mid-range leaf pull |
| Milotic | Pull | 12 | 60 | 12 | 6 | Coils and drains, healing 16 |
| Gardevoir | Pull | 16 | 75 | 14 | 7 | Slowest and longest psychic pull |
| Magnezone | Pull | 13 | 70 | 12 | 6.5 | Twice the range on Steel types; 25% paralysis |

Anything not listed uses the base: throw, startup 8, reach 14, damage 16, knockback 7.5, recovery 22. A grab also comes out of guard (a shield grab). The pulls were the strongest kind in testing (Gardevoir won 0.64 of its duels), so their startup and recovery went up and the CPU uses them less often: Gardevoir 0.50, Milotic 0.55.

### 2.2 Counter-hits and back attacks

**What we are achieving.** Two things the game rewards silently now become visible: hitting someone out of their own startup, and hitting them from behind. Both teach positioning and timing by naming them when they happen.

**Rules.**
- **Counter-hit:** the victim is in an attack, special, Smash charge or grab, and still inside its startup (`v.t < startup`) when the hit lands. Damage × 1.2, hitstun + 8, hitstop + 4, legendary meter gain × 1.5 for the attacker. Pop "COUNTER!" in gold with a rising chime. A counter-hit on a Smash charge also cancels the charge (it does already, since the hit interrupts; the bonus is new).
- **Back attack:** the hit direction and the victim's facing agree within 60° (they are facing away). Damage × 1.2, a white "crit" flash and the existing critical-hit sound. Not on projectiles that are homing (Hex, Rocket Fist) so the bonus stays about positioning, and not on area hits (Overdrive, Earthquake).
- The two stack to a cap of × 1.3.
- Neither applies to legendaries, hazards or assists.

**How it plays.** Gallade's Teleport Slash now has a reason to exist beyond reach: it lands from behind every time, so it is a guaranteed crit on a foe who was watching the front. A Zoroark that baits a Smash and dashes in during its windup gets "COUNTER!" and a longer stun, which is the combo starter the kit was built around and could never show.

**How it is built.**
- In `exHit`, before damage: `ch = victim attacking && victim.t < victim.move.startup`; `back = dot(cos(v.facing), sin(v.facing); dx, dy) > 0.5 && !o.homing && !o.area`. Multiply, extend hitstun, add `counter: ch, back` to the hit event.
- `gainMeter` multiplies by 1.5 on `counter`.
- Effects: `counterHit` (gold pop, chime, 4 extra hitstop) and `backCrit` (white flash); the pack adds a `sparkBurst` on counter.
- Options: Accessibility gets "Hit callouts" (off, icons, icons + words) covering both, as the battle callouts option does now.

**Tests.** Scripted: a hit on tick 3 of a 10-tick startup counts, on tick 11 does not; a Teleport Slash from behind crits and a frontal Psycho Cut does not; cap at 1.3 when both apply. Balance: rerun `bal3` on the whole roster; counter-hits favour fast pokes (Pikachu, Greninja, Scizor's Bullet Punch) and may need those kits' `power` down 5%.

### 2.3 Burst: Mega Evolution and Terastallization on the legendary gauge

**What we are achieving.** A comeback and a decision in every match. The legendary meter becomes a gauge with two uses: half of it buys a Burst, a ten-second transformation; all of it buys the legendary. Spending on one delays or forfeits the other. Mega Evolution is the single most-requested Pokémon spectacle, and Tera gives every fighter without a Mega the same moment.

**Rules.**
- D-pad Up (Y on keyboard, tap the meter on touch) with the meter at 50 or more and the fighter in a neutral state. Costs 50. Once per fighter per match (per life in Lives mode).
- Activation: 20 ticks of freeze like the legendary call, camera close on the fighter, a flash, the new look. Invulnerable during the freeze; foes cannot be hit by it, so it is not an attack, but it is a safe reset from pressure, which is part of its value.
- Lasts 600 ticks (10 s). A bar under the HP drains over that time.
- **Mega** (Charizard X or Y chosen on the VS screen, Blastoise, Venusaur, Lucario, Gengar, Gardevoir, Gallade, Metagross, Garchomp, Scizor; Aegislash, Chandelure and the rest have none): damage × 1.25, speed × 1.1, damage taken × 0.9, special cooldowns × 0.75, and one kit change each: Charizard X's fire becomes Dragon-typed and burns on every hit; Lucario's Aura Sphere homes; Gengar's Shadow Sneak has no cooldown; Gardevoir's Psychic lifts two foes; Gallade's Close Combat has no Guard Down; Metagross's Meteor Mash never misses; Garchomp's Rage never ends during the Burst; Scizor's Bullet Punch has five charges; Blastoise's shots all count as Mega Launcher; Venusaur's roots spread.
- **Tera** (everyone else, and anyone who prefers it: a VS-screen toggle): the fighter becomes a single type, chosen on the VS screen from its two types plus one "Tera type" set per kit in the design (Snorlax Tera Ghost, Froslass Tera Fairy, Inteleon Tera Ice, Pikachu Tera Flying, Toxtricity Tera Fire …). Damage × 1.2, moves of the Tera type × 1.35 on top, immune to the statuses that type is immune to (Fire to burn, Electric to paralysis, Poison and Steel to poison, Ice to freeze), and the type chart (2.4) applies to the Tera type only. A crystal shell shimmers on the sprite in the type's colour.
- After the Burst ends, 180 ticks of "winded": meter gain halved, the aura flickers out. No stat penalty: the cost is the meter you spent and the legendary you now do not have.
- Tag Team: each fighter has its own Burst; the meter is shared, so a team can Burst twice and never summon, or save.

**How it plays.** Round one, Lucario at 35% against a Snorlax at 70% with the meter at 60. The player Bursts: Mega Lucario's homing Aura Spheres chip Snorlax to 40% in the ten seconds and the extra speed keeps it out of the Body Slam. The meter is at 10 afterwards, so Zekrom is not coming this round; the next round the same player sits on the meter and summons at 100 instead. Two matches, two different games, from one gauge.

**How it is built.**
- `e.burstT` (ticks left), `e.burstUsed`, `e.burstKind` ("mega" or "tera"), `e.teraType`.
- `r3Out` and `r3Taken` get the multipliers; `exStart` applies the cooldown scale; the per-kit Mega changes are flags checked where each move already branches (`e.burstT > 0 && kit.id === "lucario"` → `homing: !0` on the sphere).
- Statuses: `poison`, `paraFor`, `burn`, chill already check type immunity; they read the effective type, which is `e.teraType` while a Tera Burst runs.
- Art: SpriteCollab has Mega forms for several of these as separate sheets (Charizard X and Y, Lucario, Gengar, Gardevoir, Gallade, Metagross, Garchomp, Scizor, Blastoise, Venusaur); `tools/shiny.py`'s pipeline already fetches a second sheet per species and builds overlays, so a `tools/mega.py` sibling fetches each Mega sheet and the game swaps `anims` while `burstT > 0`. Tera is an overlay: the sprite drawn once normally, then once tinted the type colour through a faceted crystal mask (a lighter composite), plus the existing aura code used for Zoroark's illusions.
- Activation uses the legendary call's freeze and camera code with a shorter length and a different banner ("MEGA EVOLUTION" / "TERASTALLIZED").
- CPU: Burst when HP < 40% and meter ≥ 50, or when the foe is below 30% and in reach; Hard saves for the legendary when HP > 60%.
- HUD: the meter gets a mark at 50 and glows there; the Burst bar under HP; the move tray shows the Burst button.
- Netcode: Mega and Tera choices go into the VS-screen config like the legendary pick.

**Tests.** Scripted: cost, duration, once-per-match, winded halving, each Mega change fires, Tera status immunities. Balance: `legab.js`-style round robin with Burst-only, legendary-only and mixed CPUs; the target is that neither pure strategy wins more than 55% over the other.

### 2.4 Type matchups you can feel

**What we are achieving.** Today a super-effective hit is +5%, which nobody notices. Make the chart matter a little in Standard play and a lot in party rules, without turning the roster into a counter-pick lottery.

**Rules.**
- **Standard:** super-effective × 1.15 and meter gain × 1.25; resisted × 0.85 and knockback × 0.85. Immunities stay partial (× 0.5), so Ghosts still get hit by Snorlax.
- **Type Match (rules preset or mutator):** the full chart at × 1.5 / × 0.5 with true immunities, and dual-type stacking (× 2.25 at most).
- The pop "SUPER EFFECTIVE!" exists; it fires only at the Standard threshold or above, with the pack's `impactBig` sheet, and "NOT VERY EFFECTIVE…" gets a dull thud and no pop.

**How it is built.** `yt = {strong, weak}` becomes a function of the rules preset; a `TYPE_CHART` table (18 × 18) replaces the two-value lookup; `exOut` uses `moveType` against the victim's effective types (Tera-aware). The briefing shows a type card per Pokémon with its weaknesses.

**Tests.** `bal3` on the full roster under Standard; any kit outside 0.42–0.58 gets a `power` touch. Type Match is party rules and is not balanced.

### 2.5 Clashes

**What we are achieving.** When two attacks hit on the same tick, something visible happens instead of a silent trade.

**Rules.** Both hitboxes connect on the same tick: compare `kit.weight × (heavy ? 1.5 : 1)`. Heavier wins: its hit lands, the other is cancelled and the lighter fighter staggers (hitstun light). Within 15% of each other: a clash, both are pushed back 20 units with 8 ticks of hitstop, a spark burst and a clang, neither takes damage. Projectile against projectile already resolves (the heavier survives); melee against projectile: the melee hit swats the projectile and lands.

**How it is built.** The hitbox resolver already collects hits per tick; a pre-pass groups mutual hits between two fighters and resolves them before damage. `clash` event with both positions.

---

## Part 3: modes

### 3.1 Poké Ball

**What we are achieving.** A party mode that turns the knockback physics into a sport: 2v2 (or 1v1), a giant ball, two goals, first to two. The kind of mode people play for an hour.

**Rules.**
- Stadium's flat layout (the editor can make a "Pitch" variant with a centre circle and goal mouths; no hazards, no items by default).
- The ball: radius 14, heavy (weight 2.0), rolls with friction 0.96 a tick, bounces off walls and props at 0.7.
- Any hit on the ball launches it: velocity = hit direction × knockback × 2.4; a full Smash sends it most of the pitch; a basic is a pass. Projectiles nudge it (× 0.6). Guard stops the ball dead against the guarding fighter (a trap); dodge passes through it.
- Fighters still hit each other: damage applies, but a K.O. respawns the fighter at their own goal after 3 s (the Zone respawn penalty code), so defending by removing the carrier is a real play.
- Goals are 60 wide at each end. A goal: 2 s slow motion, "GOAL!" banner in the team colour, confetti, both teams reset to their halves and the ball to the centre with a 1 s whistle. First to 2 wins; at 2:00 the lead wins, a tie goes to golden goal.
- Legendaries stay on: a Groudon blade ring in a goalmouth is a thing you remember.

**How it plays.** Scizor U-turns onto the ball and passes it up the wing to Rhyperior, who charges a Rock Wrecker Smash at the goal; Blastoise reads it and guards in the mouth, the ball stops dead at its feet; Pikachu grabs Blastoise (2.1) and throws it out of the goal, and the loose ball rolls in. Every mechanic in the game ends up in a highlight.

**How it is built.**
- A `ball` entity in the hittable list (`victimsFor` includes it for every team), with `hurtR`, mass and a `vx, vy` integrated in `step` with friction and wall bounce. `exHit` on the ball sets velocity instead of damage.
- Mode `"ball"` in `MODES`, a `MODE_CARDS` entry, team select for 2v2 or 1v1, a goal check in the mode tick, the respawn code from Zone Control, and a score and timer HUD.
- CPU: the mode-aware brain gets a `ball` strategy: nearest to the ball attacks it towards the goal (aim by the hit direction the kit's basics give), the partner stands between ball and own goal, and everyone hits a carrier in the goalmouth.
- Effects: `goal`, `ballHit` (a boing scaled by speed), `whistle`.
- Online: the ball is part of the deterministic state; nothing new for rollback beyond the checksum including it.

**Tests.** A scripted match where one side is still: the CPU side scores within 60 s; two Hard CPU teams finish within 2:00 in 90% of 40 games; the ball never leaves the pitch (bounds assertion); online party sync with four players in Poké Ball.

### 3.2 Snorlax Launch

**What we are achieving.** A ten-second score attack with one number, replayable forever, and a second Arcade bonus stage beside Pidgey Sweep.

**Rules.** A sleeping Snorlax on a tee at the left of a long runway. Ten seconds to build its "launch damage" (every hit adds its damage to a counter, shown big; hitstun on it is normal so combos work; it never gets up). When the clock ends, or when you release a Smash at any point, the next hit launches it: distance = (launch damage × 0.9 + Smash knockback × 40) × kit weight factor, drawn as a flight with the camera chasing, a bounce or two, and a distance in metres. Hitting it off the tee early (a heavy knockback before you mean to) ends the run short, as in Smash. Local best per fighter and overall; a rank letter (D to S) by thresholds.

**How it is built.** Mode `"launch"` with a one-fighter select; a `dummyMode` variant for the Snorlax that accumulates `launchDmg`; a runway arena (the editor) with a scrolling camera, which is the one new rendering piece (the camera is fixed today; the legendary cinematics already pan, so the pan code is reused). Results reuse the Pidgey Sweep screen. Arcade: it becomes the bonus after the fifth fight, with silver and gold thresholds charging the legendary meter as the Pidgey round does.

**Tests.** Deterministic: the same input script gives the same distance; a Smash-only run and a combo-only run both score; Rhyperior launches further than Pikachu with the same inputs (weight factor).

### 3.3 Mutators and the Daily Challenge

**What we are achieving.** The cheapest content in the game: rule switches that stack, and a daily fixed-seed run built from them that gives a solo player a reason to open the game every day.

**Mutators** (each a flag in the match config; several can be on):
- Giant: size × 1.6, HP × 1.5, knockback taken × 0.6, speed × 0.9.
- Tiny: size × 0.6, speed × 1.2, HP × 0.7.
- Fast / Slow: game speed × 1.25 / × 0.8 (Practice already has a speed scale).
- Mirror: everyone is the same Pokémon.
- Sudden Death: HP 1, Focus Bands rain down.
- Metal: weight × 2, knockback taken × 0.5, speed × 0.8, a clank on every hit and a grey tint.
- Fog of War: a 90-radius circle of sight round each fighter, the rest dim; projectiles glow through it.
- Cooldown Chaos: all cooldowns 1 s, legendary meter gain × 2.
- Bouncy: knockback × 1.5, wall bounces.
- Invisible: sprites at 15% alpha except for 10 ticks after they hit or get hit.
- Type Match: the full chart (2.4).

**The Daily Challenge.** Seed = the date. From it: a fighter, an arena, two mutators, and three opponents of rising CPU level. Score = remaining HP summed over the three fights + a time bonus. Local best per day, a 30-day calendar of results, and a 6-character share code (seed + score) friends can type in to see your run's setup and compare. Finishing a daily unlocks a title ("Giant Slayer", "In the Fog").

**How it is built.** Mutators are applied in `startMatch` as scales on the kit copy each fighter gets (size, hp, speed, weight) and as flags read by the few places that need them (the renderer for Fog and Invisible, `exStart` for Cooldown Chaos, the speed scale for Fast and Slow). They go into the online config so parties can run them. Daily: a `DAILY` table of mutator pairs the seed indexes (hand-picked pairs so Tiny + Fog never happens), the Arcade ladder code with three stages, and a results screen with the calendar.

**Tests.** Every mutator on its own and all pairs in the `DAILY` table run a 60 s CPU fight with no errors and no fighter outside the arena; the same seed gives the same daily on two machines.

### 3.4 Raid

**What we are achieving.** Co-op. One to four players against a giant legendary with phases and a health bar across the top, inside the sky-takeover scene that already exists for its cinematic. It is the one thing no fan game, Pokkén or Smash offer in this shape, and it is where the legendaries become opponents rather than tools.

**Rules.**
- Pick a boss (all eleven, or Random). The arena is the boss's cinematic scene as a playable floor (Zekrom's storm, Area Zero's red sun, the neon city, the Distortion World…).
- Boss HP: 3000 × number of players, three phases at 100–66%, 66–33%, 33–0%. Each phase adds an attack to the rotation and shortens the gap between attacks.
- Attacks are the boss's existing summon move, broken into pieces with telegraphs: Zekrom dives along a lane, then calls three bolts, then a thunder pillar; Groudon's blade rings and a magma geyser; Rayquaza marks two players and dives; Dialga stops one player in time for 2 s; Palkia's rifts; Giratina hunts from below; Darkrai's sleep pool; Deoxys changes Forme each phase; Ho-Oh heals itself unless a player stands on its flame ring; Koraidon's charges; Miraidon's drift and bolt. Every attack has a 40–60 tick telegraph: it is a dodge game.
- Adds: in phase 2 and 3, two wild Pokémon (the dummies, with simple brains) spawn and harass.
- Players: normal kits, legendaries off, Burst on. A K.O. respawns after 8 s if any ally is standing; all down ends the raid. A timer of 4:00; the raid fails at time.
- Damage to the boss: legendaries use the same `exHit`; it has no hitstun, no knockback, 50% knockback resistance on its hurtbox for "flinch" animations every 400 damage.
- Rewards: a title per boss, the boss's scene as a VS-screen background, and a shiny roll (1 in 8) for the fighter used.

**How it plays.** Four friends on Zekrom. Phase one is dive-and-bolts, easy to read. Phase two adds the pillar, which tracks the nearest player, so the Snorlax tanks it while Gardevoir and Inteleon shoot from range and Gallade Teleport-Slashes the back for crits (2.2). At 33% the arena darkens, bolts come in threes, two Pikachu adds show up, and someone has to peel. With 20 s left the Snorlax player Bursts to survive the last pillar. That is a raid, and all of it is built from pieces already in the game.

**How it is built.**
- A `raidBoss` entity: a summon with `owner: null`, team 2, `hp`, a hurtbox, drawn with the `lgBig` cinematic sprite at `LG_SCALE`. Movement and attacks reuse `r3Legend`/`exLegend` logic per kind, driven by a phase state machine (`phase`, `nextAttackT`, `rotation[]`) instead of a one-shot summon.
- Telegraphs reuse the warn drawing (`exLgGround` warn bands and rings).
- The scene: `exLgSky` drawn as the arena backdrop with the floor from a new flat layout per boss (the editor), plus the fixed camera.
- Mode `"raid"` in `MODES`, a boss select card row (reusing the legendary picker), the respawn code, a boss HP bar HUD, and results with the clear time.
- CPU allies for solo: the mode-aware brain's "raid" strategy: dodge telegraphs first, then attack from the side the boss is not facing.
- Online: the boss is deterministic state; four players already sync.

**Tests.** Each boss's rotation runs 4:00 against four idle fighters without errors and without the boss leaving the arena; four Hard CPUs clear each boss within 4:00 at least 50% of the time (tune HP until they do); a scripted run checks respawn, phase thresholds and the fail at time; online party sync on two bosses.

### 3.5 Local multiplayer on one screen

**What we are achieving.** The party modes playable on a couch: up to four pads, or three pads and the keyboard, in every mode.

**Rules.** On the team select screen any pad pressing A joins as the next seat (P2, P3, P4) with its own cursor colour; the keyboard is P1 (or any seat if no pad took it; a second keyboard layout, arrows + numpad, is P2 when there is one pad or none). Each seat picks; the host's Start begins. In a fight each seat's inputs go to its fighter; the HUD shows seat colours. Pause by any seat pauses for everyone; Back on the paused seat's pad drops that player to a CPU.

**How it is built.** The pad reader returns one gamepad today (`oa()`); it becomes a seat table (`seats[i] = {pad index | "keys1" | "keys2"}`). The engine already takes an input set per local player (`brain.local` reads one set; the online path feeds each remote seat its own set), so local seats feed the same path. The select screen's cursor code gains a cursor per seat. The camera is fixed, so nothing changes there.

**Tests.** The routes audit with two simulated pads: join, pick, fight, pause, drop to CPU; a 2v2 with two local seats and two CPUs runs to a result; a four-seat Free-for-All.

---

## Part 4: order of work, and what each phase proves

| Phase | Ships | Proves | NETV |
|---|---|---|---|
| 1 | Controller layout, chord, Controls screen, title card | the pad is ready for what follows | +1 |
| 2 | Grab and throw; counter-hits and back attacks | the fight has its missing answers; `bal3` round robin re-tuned | +1 |
| 3 | Local multiplayer | every party mode playable on a couch | — |
| 4 | Mutators, rule presets (Tournament, Party, Custom), Daily Challenge | a solo reason to return; party rules | +1 |
| 5 | Burst (Mega and Tera); Standard type chart | the one-gauge decision; the roster re-tuned | +1 |
| 6 | Poké Ball; Snorlax Launch (and as an Arcade bonus) | two party hits | +1 |
| 7 | Raid | co-op | +1 |
| 8 | Clashes; support slot (Pokkén-style) | polish on the fight | +1 |

Each phase ends with: the scripted tests for the feature, the full `bal3` duel round robin if damage changed, the four-player online party test, the routes and touch audits, the README and the design doc, and a deploy. Phases 2 and 5 are the ones that change balance across the roster and get the longest test runs.

## Part 5: what we are achieving, in one line each

- **Controller:** every action on a button you can press without thinking, and nothing on a stick click.
- **Grab:** guard has an answer, and close range is a readable triangle.
- **Counter-hits and back crits:** timing and positioning are named when they happen.
- **Burst:** one gauge, two uses, a decision in every match, and Mega Evolution.
- **Type chart:** "super effective" means something, and party rules let it mean a lot.
- **Clashes:** trades are moments.
- **Poké Ball:** the physics become a sport.
- **Snorlax Launch:** one number to beat.
- **Mutators and the Daily:** cheap variety and a daily reason to open the game.
- **Raid:** the legendaries as bosses, and the game's first co-op.
- **Local multiplayer:** the party modes on a couch.

---

## Part 6: as built

All eight phases are in the game. This part records what shipped, where it differs from the plan above, and the test numbers.

### What differs from the plan

- **Grabs** come in five kinds with per-fighter numbers (the table in 2.1), not one grab with heavyweight overrides. Grabs also come out of guard.
- **Counter-hits and back crits**: 1.2x each, capped at 1.3x together. A counter-hit adds 8 ticks of hitstun, 4 of hitstop and 1.5x meter. A back crit is melee only and never a throw or a hit on a guarding foe.
- **Burst**: five Mega Evolutions (Charizard, Lucario, Gengar, Gardevoir, Gallade), the fighters with Mega sprites available; everyone else Terastallizes. Options > Match can make everyone Terastallize.
- **Type chart**: Standard is 1.15x super effective and 0.85x resisted (resisted hits also lose 15% of their knockback); Type Match is 1.5x, 0.5x and immune.
- **Clashes**: `kit.weight` scales knockback taken, so heft is its inverse. Two melee blows on the same beat within 15% heft both bounce off (8 ticks of hitstop, 10 of stun, a push of about 23 units). Otherwise the lighter attacker is held for 20 ticks and the heavier blow connects. Projectile against projectile is unchanged.
- **Support slot**: the supports are roster Pokémon whose assist works without a partner: Charizard (Flamethrower), Blastoise (Hydro Pump), Snorlax (quake), Magnezone (Lock-On) and Milotic (Aqua Ring, heals 10%). There is no art for Emolga, Fennekin or Togekiss. The cooldown is 15 s. The CPU calls its support too. Online, everyone uses the host's support choice.
- **Local multiplayer**: the second keyboard layout is the number pad only. In 2v2 a second pad takes your ally's place first, then the rival's.
- **Daily Challenge**: the legendary setting follows Options.
- **Snorlax Launch**: only a Smash launches during the ten seconds; after the bell, any hit does, or the last two seconds launch it with what is on the meter. Distance = (damage × 0.9 + knockback × 40) × the attacker's heft factor.
- **Raid**:
  - The attacks are a set of telegraphed patterns themed per boss, not the summon moves cut into pieces: lane charges, bolt marks (in threes in phase 3), tracking pillars, shock rings, marked dives, rifts, Dialga's time stop, Darkrai's sleep pools, Ho-Oh's heal ring, Giratina's hunt and Miraidon's drift.
  - The arena is the Stadium with the boss's sky painted faintly over it. There are no per-boss floors.
  - The rewards are a title per boss, a best clear time and a 1-in-8 shiny roll; the boss scene as a VS background is not in.
  - The boss takes no knockback and flinches every 400 damage.
  - Online, two to four friends play with no CPU allies, and the boss has 3,000 HP per player.

### Test numbers

| Feature | Test | Result |
|---|---|---|
| Controller | Chord unit test; routes, touch and 4-player online audits | Pass; 0 sync mismatches |
| Grabs | Every kind against guard, dodge, downed foe; round robin before and after | Pass; win-rate spread 0.093 → 0.095 |
| Local multiplayer | Seats in VS, Free-for-All and 2v2 | Pass |
| Rules, mutators, Daily | Every mutator; time up, sudden death, ring out; a full Daily | Pass |
| Burst | Mega 1.25x, Tera same-type 1.62x; side with Burst against side without, 114 games | 0.46 for the Burst side |
| Poké Ball | 10 CPU 2v2 matches | About 1.4 goals a match; sides 5–5; online 1v1 and 2v2 in sync |
| Snorlax Launch | Every fighter, CPU | 12–105 m; ranks D to S; Arcade bonus after fight 5 charges the boss fight's meter |
| Raid | 4 Hard CPUs, 3 runs per boss | 30 of 33 cleared (91%), about 3:00; Normal CPUs 19 of 22; online 3 players in sync |
| Clashes | CPU duels | About one a minute; heavyweights neutral (Snorlax 0.32 without, 0.34 with, 4 reps) |
| Support | Each support, 6 CPU duels | All fire; Milotic heals 10% |
| Mode Select | All 13 cards to a live match | Pass |
| Online | 4-player party mashing grab, support and Burst; 2-player | 0 mismatches |

Final duel round robin (Hard CPU, 2 reps, supports on), after small power changes (Greninja 1.08 → 1.03, Chandelure 1.05 → 1.0, Snorlax 0.92 → 0.97, Toxtricity 2.2 → 2.28, Inteleon 1.2 → 1.25):
- The win-rate spread is 0.103 (it was 0.098 before clashes and supports), with 19 of 29 fighters in 0.40–0.60.
- The top three are Chandelure 0.73, Greninja 0.70 and Dragapult 0.66; the bottom is Snorlax 0.32. All four were at the edges before this work too.
