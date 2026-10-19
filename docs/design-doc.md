# Pokémon Arena: Combat & Character Class Design

Core gameplay design document, supplied by the project owner. This is the
reference for adding and balancing characters.

## Current request (roster expansion)

Add these Pokémon: Garchomp, Scizor, Tyrantrum, Golurk, Rhyperior, Froslass,
Gardevoir, Metagross. Each needs its own gimmick and play style, with move types
and play style true to the Pokémon, following this document. Rebalance the
existing roster too, and keep revising until every character is balanced and
feels good to play. Add 3 more legendaries, diverse from each other and from
Zekrom, Darkrai and Deoxys, especially in how they work across the modes.

## 1. Game Overview

Pokémon Arena is a top-down pixel-art multiplayer arena brawler for 2–4 players.
Players control Pokémon in fast-paced battles that combine movement, directional
attacks, dodging, special abilities, knockback, and environmental interactions.

The combat draws inspiration from Super Smash Bros. for its emphasis on
positioning, timing, and knockback, while borrowing familiar Pokémon moves,
types, and character identities.

The goal is to make every Pokémon feel unique to control. Pikachu should be fast
and aggressive, Snorlax should dominate space through size and strength, and
Gengar should rely on deception and mobility.

Combat should be easy to understand but difficult to master.

### Core Design Principles

- **Character identity:** Every Pokémon has a recognizable playstyle, strengths,
  weaknesses, and signature abilities.
- **Skill over randomness:** Positioning, timing, aim, and decision-making should
  determine the outcome of most encounters.
- **Readable combat:** Players must understand which attacks are dangerous, where
  they will land, and how to avoid them.
- **Fast matches:** Combat should encourage frequent engagements without making
  players feel helpless after taking damage.
- **Meaningful choices:** Players should constantly decide whether to attack,
  dodge, reposition, defend, or pursue an objective.

## 2. Combat System

### 2.1 Movement and Positioning

Movement is one of the most important parts of combat. Players should be able to
circle opponents, retreat from dangerous attacks, chase weakened enemies, and
position themselves to land abilities.

Movement should feel responsive, with minimal acceleration delay.

Each Pokémon has three main movement attributes:

- **Movement Speed:** How quickly the Pokémon travels around the arena.
- **Acceleration:** How quickly it reaches its maximum speed.
- **Mobility:** How effectively it can reposition through dashes, teleports,
  leaps, or other abilities.

These attributes allow different Pokémon to feel distinct without relying
entirely on damage differences.

For example, Pikachu moves quickly and changes direction easily, while Snorlax
moves more slowly but can use a powerful charge to close distance.

Movement should be constrained by the arena boundaries and collision rules, but
players should not get stuck on small environmental details.

### 2.2 Controls

The game should support a controller-first control scheme with straightforward
alternatives for keyboard play.

Recommended controller layout:

| Input | Action |
|---|---|
| Left stick / D-pad | Move |
| Right stick | Aim |
| A | Primary attack |
| B | Special attack |
| X | Mobility or defensive ability |
| Y | Ultimate ability |
| Left trigger | Guard or defensive modifier |
| Right trigger | Alternate move modifier, if needed |
| Start | Pause / match menu |

The right stick provides independent directional aiming while the face buttons
trigger moves. This allows players to move in one direction while attacking
another.

For players who prefer a simpler control scheme, an alternative layout can use
four face buttons for four attacks, with aim assistance or directional targeting
where appropriate.

The controls should be configurable, and the game should never require players
to aim every ability precisely if that ability is designed to be an automatic
area attack or a lock-on move.

### 2.3 Primary Attacks

Every Pokémon has a primary attack that can be used frequently and forms the
foundation of its combat style.

Primary attacks should have low or no cooldown, but they still need appropriate
startup, range, and recovery.

Examples:

- Pikachu fires a small electric projectile.
- Snorlax performs a short-range body slam or punch.
- Gengar launches a shadow projectile.
- Bulbasaur fires a seed or uses a short-range vine strike.
- Charizard launches a fireball.
- Squirtle sprays a stream of water.

Primary attacks should vary in projectile speed, travel distance, width, and
damage.

A ranged attack should generally deal less damage or have other limitations
compared with a risky close-range attack. Melee attacks can be stronger but
require players to get closer to opponents.

### 2.4 Special Attacks

Each Pokémon has a special attack that gives it a stronger or more distinctive
combat option.

Special attacks use cooldowns or charges to prevent constant repetition.

Examples include:

- Pikachu: Thunderbolt, striking a marked area.
- Snorlax: Body Slam, creating an impact zone around its landing point.
- Gengar: Shadow Ball, a slower projectile with strong damage.
- Bulbasaur: Vine Whip, which damages and briefly pulls or interrupts an
  opponent.
- Charizard: Flamethrower, a sustained cone of fire.
- Squirtle: Water Gun, a directional stream that can push enemies.

Special attacks should have clear counterplay. A powerful attack might have a
longer startup animation, a limited range, or a recovery period after use.

### 2.5 Mobility and Defensive Abilities

Each Pokémon has a mobility or defensive ability that helps it survive or
reposition.

Examples:

- Pikachu: Quick Attack, a fast directional dash.
- Snorlax: Brace, briefly reducing incoming knockback.
- Gengar: Teleport, repositioning a short distance.
- Bulbasaur: Root Guard, briefly reducing incoming damage while stationary.
- Charizard: Wing-assisted leap or aerial burst.
- Squirtle: Shell Slide, a fast movement burst with limited turning.

Mobility abilities should not make characters permanently difficult to hit.
Dashes and teleports need cooldowns, and defensive moves should have
identifiable weaknesses.

Dodging should be a universal mechanic available to every Pokémon, separate from
their signature mobility ability. This prevents slow characters from becoming
helpless against fast opponents.

### 2.6 Ultimate Abilities

Every Pokémon has a powerful ultimate ability charged through combat.

The ultimate meter can fill through dealing damage, landing attacks, taking
damage, and participating in objectives. The exact values should be tuned during
playtesting.

Ultimates should create a dramatic moment without guaranteeing a knockout.

Examples:

- Pikachu: Thunderstorm, striking several marked areas with lightning.
- Snorlax: Heavy Slam, a large area attack that sends nearby opponents flying.
- Gengar: Nightmare Field, creating a temporary shadow zone that disrupts enemy
  movement.
- Bulbasaur: Overgrowth, covering an area in roots that slow opponents.
- Charizard: Inferno, unleashing a powerful sweeping fire attack.
- Squirtle: Hydro Surge, releasing a wave that pushes opponents away.

Powerful ultimates should have clear warning indicators and opportunities to
dodge, interrupt, block, or escape.

### 2.7 Health, Damage, and Knockback

#### Health System

Each Pokémon has a health bar. Damage reduces health, and players are eliminated
when their health reaches zero or when a mode-specific knockout condition is
met.

Health provides an accessible way to understand a fight and makes healing and
defensive abilities easy to communicate.

Characters can have different health values, but the difference should be
modest enough that high-health characters do not dominate simply by surviving
longer.

#### Knockback

Knockback is a major part of the game's identity.

Attacks push opponents away from the point of impact. Strong attacks create
greater displacement, while certain abilities can launch opponents into the air
or toward arena hazards.

Knockback depends on:

- The strength of the attack.
- The direction of the attack.
- The target's resistance.
- Whether the target is airborne or grounded.
- Any active defensive effects.

Some attacks should prioritize damage, while others prioritize displacement. A
low-damage attack that pushes someone into a hazard can be strategically
valuable.

#### Stagger and Interrupts

Certain attacks can interrupt an opponent's action or briefly stagger them.

Light attacks should rarely prevent a player from responding for long. Strong
attacks can create longer interruptions, but their slower startup or recovery
should make them riskier to use.

The game should avoid long, unavoidable stun chains. Players should have
opportunities to recover control and respond to incoming attacks.

#### Ring-Outs and Arena Hazards

Some arenas may feature ledges, pits, or environmental hazards.

Knockback can push a player into danger, creating opportunities for
environmental knockouts. However, players should have a limited way to recover,
such as an air dash, jump, or recovery move if the arena supports ring-outs.

Not every arena needs ring-outs. Some maps can focus entirely on health
depletion and positioning.

#### Damage and Knockback Balance

Damage and knockback should be tuned independently.

A move can deal high damage but little knockback, making it useful for defeating
an opponent through sustained pressure. Another move can deal modest damage but
high knockback, making it useful for controlling space or securing an
environmental knockout.

This distinction gives players more strategic options than simply choosing the
move with the highest damage.

### 2.8 Type Interactions and Status Effects

Pokémon types should influence combat without allowing type matchups to
determine the winner automatically.

Type interactions should primarily create opportunities for environmental
effects, move synergies, and recognizable weaknesses.

Examples:

- Fire attacks can ignite designated flammable terrain.
- Water attacks can extinguish flames and interact with water currents.
- Electric attacks can travel through designated conductive surfaces.
- Grass attacks can create slowing or entangling areas.
- Ice attacks can temporarily reduce movement speed.
- Psychic attacks can redirect or displace certain projectiles.
- Ghost attacks can pass through selected barriers or create deceptive effects.

These interactions should be consistent and clearly communicated.

#### Status Effects

Status effects add variety to combat, but each should have a limited duration
and visible indicator.

- **Burn:** Deals small damage over time.
- **Poison:** Applies recurring damage or escalating pressure.
- **Paralysis:** Briefly disrupts movement or an ability.
- **Slow:** Reduces movement speed temporarily.
- **Freeze:** A rare, short control effect with strong counterplay.
- **Root:** Restricts movement while allowing certain actions.

Status effects should not stack indefinitely. Repeated applications can refresh
a duration or build resistance, depending on the effect.

## 3. Character Class System

The roster should be organized around combat archetypes rather than type alone.
A Pokémon's elemental type influences its moves, but its class defines how it
plays.

The initial roster should include several contrasting archetypes so players can
discover their preferred playstyle.

### 3.1 Speedster / Rushdown

Example: Pikachu

Speedsters rely on movement, quick attacks, and the ability to choose when to
engage.

Strengths:

- High movement speed.
- Quick attack startup.
- Strong pursuit and escape potential.
- Excellent at pressuring vulnerable opponents.

Weaknesses:

- Lower health.
- Limited ability to hold ground.
- Can struggle against persistent area attacks.
- Mistimed engagements leave them vulnerable.

Gameplay identity: Get in quickly, land several attacks, and escape before the
opponent can retaliate.

### 3.2 Heavyweight / Tank

Example: Snorlax

Heavyweights dominate close-range engagements and can absorb more punishment
than most characters.

Strengths:

- High health.
- Strong close-range damage.
- Powerful knockback.
- Resistance to displacement.

Weaknesses:

- Low movement speed.
- Large, easy-to-hit body.
- Difficulty chasing mobile opponents.
- Long recovery on powerful attacks.

Gameplay identity: Control space, punish opponents who get too close, and use
strength to force favorable engagements.

### 3.3 Trickster / Assassin

Example: Gengar

Tricksters use deceptive movement, unusual attack angles, and temporary
disruption to create openings.

Strengths:

- Teleports and evasive movement.
- Unpredictable attack patterns.
- Strong ambush potential.
- Excellent at punishing distracted opponents.

Weaknesses:

- Lower health or limited defensive options.
- Reliance on cooldowns.
- Vulnerability after failed attacks.
- Requires careful timing and positioning.

Gameplay identity: Create confusion, exploit openings, and escape before
opponents can retaliate.

### 3.4 Controller / Zoner

Example: Bulbasaur

Controllers shape the battlefield through traps, persistent effects, and attacks
that limit enemy movement.

Strengths:

- Strong area denial.
- Useful ranged attacks.
- Can protect objectives.
- Effective at controlling narrow passages.

Weaknesses:

- Less effective when opponents get close.
- Some abilities require setup.
- Can struggle against highly mobile characters.
- Limited burst mobility.

Gameplay identity: Decide where opponents can safely move, then punish them for
entering controlled areas.

### 3.5 Artillery / Ranged Damage

Example: Charizard

Artillery characters specialize in powerful ranged attacks and broad areas of
damage.

Strengths:

- Long attack range.
- Strong area damage.
- Can pressure opponents before they reach melee range.
- Powerful attacks against grouped enemies.

Weaknesses:

- Longer attack startup.
- Vulnerable while recovering from major attacks.
- Can struggle against persistent pressure.
- Requires good aim and positioning.

Gameplay identity: Maintain distance, predict enemy movement, and punish
opponents who approach carelessly.

### 3.6 Skirmisher / Mobility

Example: Squirtle

Skirmishers combine moderate damage with movement abilities and flexible
engagement options.

Strengths:

- Good repositioning.
- Balanced offense and defense.
- Effective at chasing and escaping.
- Can adapt to changing situations.

Weaknesses:

- Less specialized than other classes.
- Limited ability to dominate one combat range.
- Requires strong decision-making to maximize effectiveness.

Gameplay identity: Take favorable engagements, reposition frequently, and
capitalize on opportunities.

## 4. Character Design and Balance

Each Pokémon should have a recognizable role, but classes should not become
rigid restrictions.

Two Pokémon in the same class can have different mechanics. For example, Pikachu
may be a fast combo-oriented Speedster, while Scyther may be a melee-focused
Speedster with longer attack reach.

Every character should have:

1. A clear strength that makes it valuable.
2. A meaningful weakness opponents can exploit.
3. A signature move that distinguishes it from the rest of the roster.
4. At least one answer to ranged pressure.
5. A way to escape dangerous situations, even if limited.
6. A learning curve that rewards practice without making the character
   inaccessible.

Balance should focus on matchups and player agency rather than identical
statistics.

A slow character should have tools to approach ranged opponents. A fragile
character should have enough mobility to escape but should not be able to avoid
every engagement. A controller should be powerful when prepared but vulnerable
when caught out of position.

## 5. Character Classes and Combat Identity

Character classes should help players understand their role without limiting
creativity. A class describes a Pokémon's primary approach to combat, not every
aspect of its moveset.

Each class should have:

- **A preferred engagement range:** Close, medium, or long.
- **A primary strength:** Damage, mobility, durability, control, or flexibility.
- **A natural weakness:** A situation in which the Pokémon is less effective.
- **A signature mechanic:** A feature that distinguishes the Pokémon from others
  in its class.
- **A counterplay opportunity:** A way opponents can respond through
  positioning, timing, or ability use.

A Pokémon may combine traits from multiple classes, but it should have one clear
primary identity. This avoids making every character equally effective at
everything.

Class identity should also influence animations, sound effects, attack timing,
and visual effects. Heavyweights should feel impactful, Speedsters should feel
responsive, and Controllers should communicate the areas they influence clearly.

## 6. Recommended Combat Balance Principles

**Readability over complexity.** Players should be able to identify dangerous
attacks quickly. Strong attacks need visible startup animations, clear impact
areas, and recognizable sound cues.

**Counterplay over unavoidable damage.** Every powerful ability should offer a
response. Players should be able to dodge, interrupt, block, escape, or
reposition when they read an attack correctly.

**Distinct strengths over identical characters.** Not every Pokémon needs the
same damage, speed, health, or range. Balance should come from meaningful
trade-offs and the ability to exploit opponents' weaknesses.

**Skill over random outcomes.** Random items and arena events can add
excitement in casual modes, but core combat should remain predictable enough
that players can improve through practice.

**Short, meaningful cooldowns.** Cooldowns should create decisions rather than
downtime. Players should always have useful options, even when their strongest
ability is unavailable.

**Avoid excessive crowd control.** Stuns, freezes, pulls, and roots should be
short and limited. Players should not spend long stretches unable to control
their Pokémon.

**Balance for multiplayer chaos.** An ability that works well in a duel may
become overwhelming against three opponents. Area damage, healing, knockback,
and crowd control must be tested in full four-player matches.

**Test with real matchups.** Balance should be evaluated through repeated
matches, including experienced and inexperienced players. Win rates are useful,
but designers should also examine how often abilities land, how easily players
escape, and whether a character feels frustrating to fight.

The ultimate goal is a combat system where each Pokémon has a recognizable
identity, every class has a purpose, and success comes from mastering movement,
timing, positioning, and matchups.
