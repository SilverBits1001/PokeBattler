# Pokémon Pocket Brawl

A top-down Pokémon arena brawler that runs in one HTML file.

## Play

Open `index.html` in a browser. A gamepad is recommended; the keyboard works too
(WASD move, J attack, K dodge, L and I specials, arrows smash, O guard, U grab,
Shift lock, Q switch, E assist or support, R legendary, G or Y Burst, T taunt).
With a second keyboard player joined, the arrows move P2 and P1's Smash moves to H
(fired the way P1 last moved).

On an Xbox-style pad: A attack, B dodge, X and Y specials, right stick Smash, RT
guard, RB grab, LB lock (switch in Tag Team), LT assist or support, LT+RT together
for the legendary, D-pad up Burst, D-pad down taunt, D-pad left and right quick
phrases online. Options > Controls shows the full layout.

**Taunts and emotes**: T (D-pad down on a pad; on touch, the emote row at the top
of the pause menu) taunts; the stick picks the emote: neutral Taunt, up Cheer, right Show off, down Yawn, left Sing. Each plays an
animation and cry with a speech bubble over the fighter. It takes a second and
can't be cancelled, so a taunt in a rival's face can be punished; CPUs taunt
now and then after a K.O. Taunts go over the network like any other input.

On a phone or tablet, touch controls appear as soon as you touch the screen. They
are built for one thumb on each side:

- **Move**: drag anywhere on the stick side for a floating stick.
- **Attack (A)**: tap for the combo. **Drag A** in any direction to aim the Smash;
  it charges while you hold and fires when you let go (a line shows the aim).
- **Specials (X, Y), Dodge (B), Guard**: in an arc around A. Legendary sits above
  them; Switch and Assist (Tag Team) are on the stick side.
- **Auto-target**: moves aim at the nearest foe, and follow a foe that comes much
  closer. Tap empty space on the button side to switch to the next foe.
- Pause and Fullscreen are at the bottom centre. Pausing shows the emote row: tap one
  to resume with that taunt.

On wide phones the controls move out into the bars beside the arena, so thumbs
don't cover the fight. Every button shows its own cooldown: the button dims, a
coloured ring refills, the seconds left are written on it, and it flashes when it
is ready again. Buttons give a short vibration when pressed (with Vibration on).
The first touch fight shows a short tip about Smash and targeting.

Options > Controls has the touch settings: auto-target on or off (off brings back a
Lock button), an extra Smash button aimed with the stick, small, medium or large
buttons, and a left-handed layout that mirrors everything. Menus, team select, the
lobby and results are tap to select. The overlay hides again when a keyboard or
controller is used.

## What's new

**Combat depth and five new modes** (the full write-up, with numbers, is
[docs/plan-combat-and-modes.md](docs/plan-combat-and-modes.md)):

- **Grabs that differ per fighter.** RB grabs, and grabs beat guard (attack beats
  grab, guard beats attack). There are five kinds: throws aimed with the stick,
  slow heavy **slams** (Snorlax, Rhyperior, Golurk, Metagross), fast three-chomp
  **bites** (Tyrantrum, Garchomp, Charizard, Noivern), **phase** grabs from strange
  angles (Greninja and Gengar appear behind you, Zoroark swaps places), and
  long-range **pulls** (Venusaur's vines, Gardevoir's psychic pull, Magnezone's Magnet
  Pull). Every fighter has its own startup, reach, damage and a twist, listed in
  its move list. You can also grab out of guard.
- **Counter-hits and back crits.** A hit during a foe's startup is a COUNTER (more
  damage, longer stun, more meter); a hit from behind is a CRITICAL (melee, and
  straight shots; homing and area moves never crit). Options > Accessibility > Hit
  callouts picks icons and words, icons, or off.
- **Type match-ups you can feel.** A SUPER EFFECTIVE pop only on real super-effective
  hits, a dull thud on resisted ones, and each Pokémon's briefing lists what it is
  weak to.
- **Clashes.** Two melee blows on the same beat: close in weight, both bounce off
  unhurt; otherwise the heavier blow wins and the lighter attacker staggers. A melee
  hitbox also swats a projectile out of the air.
- **Burst: Mega Evolution and Terastallization.** At half the legendary meter,
  D-pad up (G or Y on the keyboard, tap the meter on touch) Bursts once a match for
  ten seconds. Eleven Megas, each with a twist: Charizard X (Dragon fire that burns)
  or Y (fire 1.25x), Blastoise (Mega Launcher), Venusaur (roots on the move), Lucario
  (homing Aura Sphere), Gengar (no Shadow Sneak cooldown), Gardevoir (lifts two),
  Gallade (no Guard Down), Metagross (Meteor Mash never misses), Garchomp (Rage
  holds), Scizor (five Bullet Punches). Specials come back a quarter sooner. Everyone
  else Terastallizes. On the VS screen, X picks Mega or Tera and the Tera type.
- **Type match-ups.** Standard super effective is 1.15x (more meter, too); the Type
  Match rule uses the full chart with immunities.
- **Support Pokémon.** With one Pokémon (no Tag Team partner), LT calls a support on
  its own cooldown: Emolga glides in and stuns, Fennekin throws a fireball, Snivy
  pulls a foe in with a vine, Chansey heals, Togekiss speeds you up. Options > Match
  picks it.
- **Local multiplayer.** A second pad joins with A on team select (a second keyboard
  player with Numpad 1: arrows and the number pad) and takes the next place: the
  rival in VS, an ally in 2v2 and Raid, a rival in the party modes. Up to four
  players, each with its own colour on the cursor and over its fighter. Any seat's
  Start pauses for everyone, and B on that pad drops the player to a CPU. Hold Back
  in a party mode for the scoreboard.
- **Rules and mutators.** Time limit with sudden death, ring outs, hazards on or
  off, Tournament and Party presets, and eleven mutators (Giant, Tiny, Fast, Slow,
  Mirror, Sudden Death, Metal, Fog, Cooldown Chaos, Bouncy, Invisible).
- **Daily Challenge.** One seed a day: a fixed fighter, stage, two mutators and
  three rivals; a score, a 30-day calendar, a 6-character share code and titles.
  On the results, Compare code takes a friend's code and shows their day and score
  against yours.
- **Poké Ball.** 2v2 (or 1v1) football with knockback: first to two goals, golden
  goal at time. Also online for two or four friends.
- **Snorlax Launch.** Ten seconds to pile damage on a sleeping Snorlax, then Smash it
  down the runway for distance and a rank. It is also the Arcade's second bonus
  round: a B rank or better charges your legendary for the boss.
- **Raid.** You and three allies (CPU, a second pad, or friends online) against a
  giant legendary with a health bar and three phases. Every attack is telegraphed
  on the floor: lanes, bolt marks, tracking pillars, shock rings to roll through,
  Dialga's time stop, Darkrai's sleep pools, Ho-Oh's heal ring (stand on it to stop
  it), Giratina hunting from below. Wild Pokémon join in phases two and three. Four
  minutes; K.O.s come back after 8 s while an ally stands. The arena is the boss's
  own world with its own floor (Zekrom's wet basalt, Groudon's magma cracks, Dialga's
  clock, Miraidon's neon road and so on), and each boss strikes in its own look:
  Groudon's blade rings and magma geysers, Zekrom's thunder pillar, Rayquaza's dive. A clear earns a title, a best time, a 1 in 8 shiny roll and that world
  as a VS-screen backdrop.

**Toxtricity and Gallade.** Two new fighters, each built round one idea with a payoff
that costs something (see [docs/plan-roster-5.md](docs/plan-roster-5.md)):

- **Toxtricity** (Electric/Poison, punk rocker) mixes, then sets it off. **Sludge
  Bomb** lobs a glob that poisons and leaves a puddle, **Shock** paralyses poisoned
  foes (Toxic Shock) and charges your puddles so they zap, and a charged
  **Overdrive** sends out a sound ring through cover that detonates every puddle it
  reaches. **Punk Rock** makes sound moves hit harder and halves sound damage taken.
  Every payoff is close range or behind a long charge, and it has 1000 HP.
- **Gallade** (Psychic/Fighting, blade knight) gets in and cuts through.
  **Teleport Slash** blinks behind a foe (a whiff leaves it open), **Psycho Cut**
  slices from range, the combo ends in **Sacred Sword**, which cuts through guard, and
  **Close Combat** is a lunging flurry that leaves Gallade taking 30% more damage
  for 4 seconds. **Sharpness** hones every blade.

**Koraidon and Miraidon.** Two new legendaries. **Koraidon, Collision Course**
charges down a warned lane, rams anyone it catches under the red sun of Area Zero,
and leaves a harsh sun that powers up your hits. **Miraidon, Electro Drift** drifts
a neon ring round the aim point, strikes it with lightning in a scene set in a future
city, and leaves Electric Terrain that speeds you up and zaps foes.

**Chandelure, reworked.** Trap, burn, cash in: **Fire Spin** holds a foe in a flame
vortex, **Inferno** (a slow fireball you are rooted to cast) always burns and leaves a
burning pool, and **Hex** eats the burn for double damage and heals you. Design and test
numbers in `docs/plan-chandelure.md`.

**CPUs that play the mode.** CPUs now chase the objective: in Zone Control they take
the ring while you are down and never chase out of it; in You're It! whoever is it hunts
with melee while the rest keep clear; in Free-for-All they pick off the hurt and the
distracted; in 2v2 they peel for a hurt partner; on Thin Ice they step off worn slabs and
knock you towards the holes. Details and A/B numbers in `docs/plan-mode-cpu.md`.

**Mode Select emblems.** Each mode card now has its own emblem instead of a Pokémon.

**Menus, reorganised.** The main menu is now Play, Arcade, Online, Training and
Options. **Play** opens **Mode Select**: one card per mode (VS CPU, Tag Team, Zone
Control, Free-for-All, Team 2v2, You're It!, Thin Ice, Thin Ice Party, Pidgey Sweep),
each with a line on how it plays and how many fight, and it reopens on the mode you
played last. After you pick your fighters you go straight to the **VS screen**: it
shows the legendary and stage you used last, **Y** changes the legendary, **Select**
changes the stage, **A** starts, and left alone it starts by itself after a 5-second
countdown. **Options** has tabs (Game, Audio, Controls, Accessibility; L1 / R1 or Q /
Shift switch them); the frame-data and physics tuning is in a Developer tab that only
shows with `?dev` in the address. Button prompts follow what you play with: pad
buttons on a controller, keys on a keyboard.

**Pikachu and Gengar.** Two new fighters, each built round one idea with a payoff
that costs something (see [docs/plan-roster-4.md](docs/plan-roster-4.md)):

- **Pikachu** (Electric, speedster) is the fastest fighter and one of the frailest.
  **Quick Attack** darts in twice (untouchable on the first dash), **Thunderbolt**
  zaps from range and may paralyse, and **Volt Tackle** is a huge charging dash that
  paralyses, but a quarter of the damage it deals hurts Pikachu too, and a miss leaves
  it wide open. **Static** can paralyse anyone who hits it up close.
- **Gengar** (Ghost/Poison, trickster) puts foes to sleep with a slow wave of
  **Hypnosis**, then feeds with **Dream Eater**: weak on a foe who is awake, but 2.2x
  and healing on one who sleeps. Hypnosis is slow with a long recovery and a long
  cooldown. **Shadow Sneak** sinks it into its shadow to glide and rise under them.
  **Levitate** floats it over ground hazards.

**Thin Ice** (Mode Select, as a duel and as Thin Ice Party for 3–4 fighters). The fight is on a frozen
lake of thin ice slabs. Every attack cracks the ice it strikes, hit or miss: a hit
cracks the slab under whoever takes it (heavy hits the slabs round it too), a swing
the slab it reaches, a shot the spot where it lands, and quakes, slams, blasts and
legendaries everything they cover. Even walking wears a slab down a little. A slab that cracks through creaks for a moment, then gives way,
and anyone standing on it falls in: a K.O. (a life, with Lives on), credited to whoever
hit them last. After 30 seconds the lake starts to thaw from its edge inward, so the
floor keeps shrinking. Floating Pokémon don't fall, but the freezing spray off open
water hurts them. CPUs read the ice and get off slabs that are about to go.

**Online parties of up to 4.** A friend code now links up to four players. The host
starts the battle when everyone is in: two players play a 1v1 (Tag Team works too),
three or four play a Free-for-All. In the claude.ai open lobby, pick **Host a party**
and other trainers join you from the list. Either way the host can set **Mode: Thin
Ice**. See [Online play](#online-play).

**Items drop anywhere.** Items now land at a random open spot on the arena (never in
walls, water, lava or hazards, and not right on top of a fighter), so someone has to
go and get them.

**Roster 3: seven new fighters, three new legendaries.** Each new fighter is built
around one idea from its lore and typing, with a payoff that a commitment buys
(see [docs/plan-roster-3.md](docs/plan-roster-3.md)):

- **Lurantis** (Grass, duelist) plants **Sunny Day** and fights inside it: there,
  **Solar Blade** (the longest blade in the game) needs no charge, Synthesis heals
  and Leaf Guard blocks status. Leaf Blade can crit; X-Scissor cuts straight through.
- **Chandelure** (Ghost/Fire, trapper) floats and plays a three-step loop: **Fire
  Spin** traps a foe in a flame vortex, **Inferno** (a slow fireball it is rooted to
  cast) always burns and leaves a burning pool, and **Hex** eats the burn for double
  damage and heals it. Ember can burn too. Flash Fire turns fire into fuel. See
  `docs/plan-chandelure.md`.
- **Ceruledge** (Fire/Ghost, berserker) heals with **Bitter Blade**, gets faster with
  each **Flame Charge** hit and throws its blades as a **Poltergeist** boomerang,
  fighting bare-handed until they return. Weak Armor speeds it up when hit hard.
- **Volcarona** (Bug/Fire, set-up) **Quiver Dances** up to three stacks of damage
  and speed, shedding burning scales at full power. Hard hits knock stacks off.
  **Fiery Dance** rings it in flame; **Bug Buzz** holds foes off.
- **Milotic** (Water, controller) drags foes into a **Whirlpool**, burns them with
  **Scald** and out-lasts them with **Aqua Ring**. Marvel Scale toughens it while it
  has a status.
- **Inteleon** (Water, sniper) lines up **Snipe Shot** with a laser sight: an instant
  shot across the arena, a critical at full charge. **Acrobatics** glides away and
  steadies the next shot. **Water Gun** fires a three-round burst.
- **Zoroark** (Dark, illusionist) starts every round **disguised** as another
  Pokémon; its first strike from a disguise is an ambush. **Illusion** leaves a decoy
  running while it re-disguises; **Night Daze** dazes all round it; **Foul Play**
  hits strong Pokémon harder.

Legendaries **Dialga** (Roar of Time stops time round the target, then roars, and
rewinds some of your lost HP), **Palkia** (Spacial Rend tears three rifts across the
arena) and **Giratina** (Shadow Force hunts from below and erupts through any
defence) each take over the arena while they act, then take the scene to their own
world: a vast clock in a dark sky, deep space, and the Distortion World.

**Rebalance.** Metagross now plays Steel and Psychic: **Meteor Mash** (landing it
powers you up) and **Psychic** (a telekinetic pull into fist range) replace Hammer Arm
and Magnet Rise. Snorlax keeps armour only on its Stomp finisher. Froslass chills only
with her finisher, freezes for less and has a lower damage scale.

The guard's arc is its meter: it covers about 107 degrees each side when full and
narrows to about 35 as blocked hits and holding it wear it down, so a worn shield is
easy to get round (hits from outside the arc get through).

See [docs/blueprint-review.md](docs/blueprint-review.md): guard flanking, punish
callouts, eight arenas, each with its own hazard and benefit (Stadium spotlights, Ruins
collapse and Ancient Power, Cinder Crater heat vents, Frostfall slides, Power Plant recharge, Magma Isle edge dunks, Sunken Shrine pools, Ember Caldera lava pools), items (Sitrus Berry, X Attack, Poké Ball, Rocky Helmet, Choice Scarf, Focus Band, Quick Claw, Smoke Ball, Leftovers), Smash-style
move types, Magnezone, battle music (Trainer Battle from Ruby/Sapphire/Emerald, © Nintendo /
Creatures / GAME FREAK, looping seamlessly after its intro), the Opening Title from FireRed/LeafGreen on the title and
team select, the Pokémon Center theme from HeartGold/SoulSilver on the main menu
(crossfaded into a seamless 34-second loop), plus victory/defeat music, and five modes
(VS CPU, Training, Free-for-All, Team 2v2, Zone Control). Modes are on Mode Select
(Play on the main menu); the stage is set from the VS screen (Select) or on team select
(Select cycles it); items are in Options → Game. Accessibility options (reduced effects,
high-contrast team colours, swapped specials) are in Options → Accessibility.

Match flow: after your own picks, team select moves on to **Choose your rival**,
as in Smash: the cursor (now red) picks the CPU's fighters one by one, starting on
the **?** tile, so pressing A again gives a random rival. Start (Enter) fills any
rival slots still open at random, and B undoes the last rival. In Free-for-All, pick
3 or 4 fighters (RT, O or tap Players) and choose each CPU rival the same way. After choosing your
Pokémon and legendary comes the stage select: every stage as a big picture in a
3x3 grid, shown as it looks in a match (props, conveyors and lighting, baked by
`tools/stage-previews.js` into `assets/stages.js`); the highlighted stage zooms in
and pans slowly round its map. Random is last (it remembers your pick; not in the Arcade, whose ladder
sets the stages, or online, which has its own arena roulette). Then a ready screen
sums up the match and waits for Start (Back returns to the stage select). In Training that screen is a briefing for each of your
Pokémon: every move with its typical damage and what it does, what each effect
(burn, chill, daze, armour...) means, and a guide to how to play it. Mid-fight
announcements (combos, surges, items, legendaries) now appear as a small pill under
the HUD, so only Ready?, Go!, K.O. and the result take the middle of the screen.

**Screens.** The start screen is a face-off: two Pokémon glare at each other
across a blue and red split (a new pair every few seconds) under the logo, with
the whole roster running along the bottom. Team select shows each side's
Pokémon as a big portrait, the CPU's turned to face yours. The ready screen
repeats the face-off with partners, allies and each side's legendary. In battle there is one move list, bottom left: a key per move with its
cooldown as a clock-wipe and the seconds left, a coloured rim and glow when it's
ready, and live values (Heat, charges, the legendary meter) as small badges. The
camera holds still when a fight ends, and the arena does no more damage once it's
decided. In the pause menu, Moves has a scrolling strip of bigger faces (tap one
or use left and right), and Training's Pokémon tab lists all eighteen.

**Living arenas.** Every arena has its own surroundings (stands with a crowd and a
big screen, a broken colonnade with braziers, a basalt rim with lavafalls, pines
under an aurora, turbines and control panels), detail along its walls, light
from real sources, wild Pokémon (Pidgey flocks, Zubat and Unown, Slugma,
Snorunt and Spheal, Magnemite), weather, and a floor that keeps the scars of the
fight (scorch marks, cracks, frost, footprints in the snow). The crowd reacts to
big hits and throws confetti on a K.O.; the Stadium drifts from afternoon to a
floodlit night. Each arena also gained a mechanic:

- **Stadium:** field shifts. Every so often the pitch becomes a Grass (healing
  tall grass), Water (puddles that slow and conduct), Fire (hot spots that power
  you up) or Rock (cover) field for twenty seconds.
- **Ruins:** an overgrown temple courtyard (a full-resolution painting) with breakable columns and
  pressure plates. Step on one and darts fly down its lane after a short warning, hitting anyone in it.
  Every so often a boulder rumbles at the top of the stairs (its lane flashes red) and rolls down the
  middle, bowling over anyone in the way. The rune circles light up in turn: stand in a lit one alone
  to charge it and gain Ancient Power. Clay urns by the walls break at a touch, and every other one
  drops an Oran Berry; vines hang over the back wall in front of the fighters.
- **Cinder Crater:** the lava pools swell and recede.
- **Frostfall Peak:** a night summit above the clouds; heavy blows crack the centre rink until it breaks into
  slowing icy water, then it refreezes; Spheal roll down the lanes.
- **Power Plant:** a green-lit lab (a full-resolution painting) with two fast square conveyor loops, one in each half
  of the deck (they reverse on a cycle; stand on one and it carries you round forever): a slog to walk against, a quick getaway to ride, Voltorb that roll in and blow up when someone comes close or shoots them, and two
  chemical vats as solid cover that hide anyone standing behind them. Hits make a vat flash; enough
  of them blow it up, hurting everyone close and leaving a cloud of green gas that poisons, and it is
  rebuilt in place after fifteen seconds (it flashes back in). The three pylons stand
  one under the scoreboard and one in the middle of each conveyor loop.
- **Magma Isle:** a walled obsidian platform in a lava cavern (a full-resolution painting). Cinder
  Crater's eruptions and hot spots; two lava pockets walled into the floor burn anyone who walks in
  (the rock pillars in them are safe footing, and they hold steady instead of rising and falling); a
  hard splat into the edge dunks you in the magma for extra damage and a burn.
- **Sunken Shrine:** a flooded temple lit by shell lamps (a painted arena). The Ruins' field shifts and
  tremors without its columns; its four pools slow everyone, and Electric damage in them shocks the water.
- **Ember Caldera:** a basalt plateau in a lava lake (a full-resolution painting). Cinder Crater's rules
  with its own four lava pools that rise and fall, rock spires as solid cover (in `assets/layouts.js`, editable
  in `editor.html`), and Magma Isle's burn for a splat into the edge.

**New Pokémon.** Greninja (Water/Dark ninja): Water Shuriken, Substitute (a hit
on it becomes a counter from behind), Night Slash through guard, and Protean (it
becomes the type of its last move). Aegislash (Steel/Ghost): Stance Change between
a tough Shield Forme and a hard-hitting, fragile Blade Forme; Shadow Ball; King's
Shield blocks everything from the front and weakens melee attackers; Sacred Sword.

**New items.** Focus Band (survive one K.O. hit), Quick Claw (cooldowns reset and
run faster), Smoke Ball (a cloud that hides whoever is inside) and Leftovers
(slow healing).

**Arcade** (main menu): pick your Pokémon (no CPU roulette: who waits on each
stage stays a secret until you reach it), then six duels in a row against rivals drawn from the
roster, Easy to Hard, on a different arena each stage. Stage six is a boss
with 1.5x HP and its legendary half charged. Lose and you can Continue (retry
the stage); your clear time, continues and best are kept on this device.

**You're It!** (Mode Select): Free-for-All tag for 3 or 4
fighters. A Slugma sits on top of whoever is "it" and burns their HP: about 2% a second (up to 7.5%), rising the longer
they hold it. Melee contact passes it on either way: if whoever is it lands a melee
hit, the one hit is it; if you melee whoever is it, you catch it. Only the fighter
you control counts; ranged attacks, assists, legendaries and hazards never pass it,
so ranged shots are how you fight back from a safe distance. No tag-backs for two seconds, a moment's grace for the new "it",
and whoever is it is 10% faster. Hits between fighters do 40% damage, so the drain
is the real threat; drained to zero is a K.O. Last one standing wins, and Lives work
too. CPUs run from whoever is it.

**Pidgey Sweep** (Mode Select): a one-minute bonus game on
the Stadium. Pidgey land in waves, faster as the clock runs down; any hit clears
one (1 point). They hop away when you get close and fly off if left for about
eight seconds. A Pidgeotto (5 points) takes three hits and Gusts you back. A shiny
Pidgey is rare, leaves after a couple of seconds and is worth 10. Bronze, silver
and gold medals at 25, 50 and 75 points; your best is kept on this device. In the
Arcade it is the bonus round after the third fight: silver charges your legendary
halfway for the next fight, gold fully. Pidgeotto's sprites come from SpriteCollab
(`tools/addmon.py`), and the shiny Pidgey from `tools/shiny.py`.

**Shinies**: clear the Arcade without a continue and your fighter's shiny
unlocks (both of them in Tag Team) and switches on. On team select, an unlocked
fighter's tile carries a sparkle; L2 (E) on it turns its shiny on or off. A
shiny sparkles and twinkles as it comes in, and online your rival sees it too.
The shiny looks are SpriteCollab's own shiny sheets: `tools/shiny.py` stores
each one as a colour swap plus the few pixels a swap gets wrong
(`assets/shiny.js`, about 650 KB), and the game rebuilds the exact sheet on first
use. A few portraits SpriteCollab has no shiny of (Snorlax's and
Aegislash's other faces) use the colour swap alone.

**Vibration**: controllers rumble and phones vibrate on hits taken (harder
for heavy hits and K.O.s), heavy hits landed, guard breaks, parries,
Legend Ready, summons, arena surges and the result. Options → Accessibility →
Vibration turns it off. (iPhone browsers don't allow web pages to vibrate.)

Battle callouts are icons and sounds, not words: a fight is too fast to read.
Each effect on a fighter shows as an icon over its head (flame for burn, drop
for poison, bolt for paralysis, stars for daze, snowflake and ice for chill and
freeze, a swirl for confusion, an eye for curses, Z for sleep, and the item
buffs), and blinks as it runs out. Hits show only their numbers; parries,
reflects, dodges and guard breaks pop a glyph; faints and eliminations show
the fallen Pokémon's face. Statuses each have their own short sound, and big
moments flash the screen edge in their colour. Options → Accessibility →
Battle callouts → "Icons + words" brings the words back.

Roster (29): Charizard, Venusaur, Blastoise, Dragapult, Magnezone, Snorlax, Noivern,
Lucario, Garchomp, Scizor, Tyrantrum, Golurk, Rhyperior, Froslass, Gardevoir,
Metagross, Greninja, Aegislash, Lurantis, Chandelure, Ceruledge, Volcarona, Milotic,
Inteleon, Zoroark, Pikachu, Gengar, Toxtricity and Gallade. Each has a class from [the design document](docs/design-doc.md) (speedster,
heavyweight, trickster, controller, artillery or skirmisher), a signature gimmick, a
real weakness, an answer to ranged attacks and a way to escape:

- **Garchomp** digs underground and erupts beneath foes; Outrage is a rampage
  followed by confusion.
- **Scizor**'s Bullet Punch always strikes first (three charges); U-turn hits and
  hops out, or tags your partner in.
- **Tyrantrum**'s Crunch grabs through guard; Rock Slide drops boulders on shooters.
- **Golurk** fires a homing rocket fist and blasts off with Fly.
- **Rhyperior** raises Rock Tomb pillars for cover, then shatters them with Rock
  Wrecker.
- **Froslass** chills: three chills freeze for a moment. Double Team leaves an ice
  doll behind.
- **Gardevoir** lifts and throws foes with Psychic, reflects shots, and sets Future
  Sight traps.
- **Metagross** drags foes in with Psychic, then crushes them with Meteor Mash; it is
  never slowed (Clear Body).

With twenty-five Pokémon every one averages 40–61% across three arenas in CPU duels
(roster 3, 2 games per pairing per arena). The setup and mind-game kits (Volcarona,
Zoroark) sit at the low end against the CPU, which plays them less well than a person
does. The earlier eighteen-Pokémon balance pass had every one averaging
45–55% across all five arenas in CPU duels, and no pairing reaches 80% over 300
games. Crowd control is kept short: getting up is fully invincible and followed by a
moment of safety, and no move chain locks a fighter for more than about 2.6 seconds.
Free-for-All, 2v2 and Zone Control each have their own per-Pokémon damage scale. In
2v2 every Pokémon wins 44–58% and in Zone Control 41–64%, within what those sample
sizes can show; in Free-for-All every Pokémon finishes ahead of each opponent
40–59% of the time (outright wins can't be 50% with four fighters).
Each legendary wins 50–58% of Standard and 44–64% of Tag Team mirror matches.
Details and numbers are in the design review.

## Modes and legendaries

**Standard** (VS CPU) is one Pokémon a side. **Tag Team** (its own card on Mode
Select) is two Pokémon each, with Switch and Assist. Party modes use one Pokémon
each.

**Fight length**: every Pokémon has 1.5x the HP its kit lists (`HP_SCALE`), with
moves unchanged, so a 1v1 life lasts about a minute (Hard CPU against Hard CPU:
53 s on average, up from 38 s), nearer Smash and Pokkén than the half minute it
was. Stage hazards and status ticks keep their fixed damage.

**Lives**: L1 (Q) on team select sets 1, 3 or 5 lives each, in every mode but
Training and Zone Control (and the Arcade). In Zone Control a K.O. never ends the
round: the fallen fighter is back after four seconds (a countdown shows under the zone
meter), time the one who scored it can spend on the ring. A K.O. with a life left brings the
fighter (both of them, in Tag Team) back at full health at the spawn point
furthest from its rivals, with two seconds' grace that ends when it acts; the
last one standing wins. Hearts under the name (or a heart badge on the party
cards) show what's left. Online, the host's setting is used.

**Legendaries.** Dealing and taking damage fills a meter under your name. When it reads
READY, call your legendary: E (L2 on a pad) in single-Pokémon modes, or R (L3) in any
mode. Calling it works like a Final Smash. The battle freezes, the camera closes in,
and the legendary bursts into being beside you over a summoning circle. Then hold the
button to aim with the stick and release. If its opening attack lands, the battle
freezes again for a cinematic on everyone it caught, ending in a finisher that
launches them:

- **Zekrom, Fusion Bolt.** It dives along a warned line. Anyone hit is pinned under a
  storm while Zekrom calls down lightning, then it charges and slams down with a
  thunder pillar that paralyses.
- **Darkrai, Dark Void.** A dark pool puts everyone inside to sleep. Under a moonlit
  sky, shadow tendrils drain the sleepers before a Dark Pulse blast, and they stay
  asleep afterwards.
- **Deoxys** rolls a random Forme each time:
  - Normal hurls Psycho Boost.
  - Attack sweeps a target down the arena with Hyper Beam.
  - Defense heals you and raises a barrier that bursts outward.
  - Speed crisscrosses its target with Extreme Speed before diving on it.
- **Groudon, Precipice Blades** (area control). Three rings of stone blades erupt
  outward from the aim point, a beat apart. Anyone caught gets a scene of erupting
  blades and a magma geyser. Otherwise Drought scorches the centre and burns anyone
  who stands in it.
- **Rayquaza, Dragon Ascent** (hunter). It marks up to three foes, nearest the aim
  point first, and dives on each in turn. Each mark locks just before the dive, so
  a late dodge escapes. Everyone it hit shares one scene in the sky. Made for
  Free-for-All.
- **Dialga, Roar of Time** (time). Every foe inside a clock face round the aim point
  stops in time while the arena drains of colour, then the roar tears through them.
  Time also rewinds for you: you get back 40% of the HP you lost in the last five
  seconds. Its scene is a vast clock in a dark sky, gears turning and time streaming
  to a halt.
- **Palkia, Spacial Rend** (space). The arena opens into a starfield and three rifts
  tear across it through the aim point, a beat apart, dragging anyone they cut onto
  their line. Its scene is deep space, and the finisher snaps space shut.
- **Giratina, Shadow Force** (Distortion World). It sinks into the floor, hunts the foe
  nearest the aim as a moving shadow, then erupts beneath them through guard,
  counters, shields and invulnerability. Its scene is the Distortion World, with
  upside-down islands and waterfalls that fall upward.
- **Ho-Oh, Sacred Fire** (support). It cleanses burn, poison, paralysis, chill,
  sleep and freeze, and heals a lone Pokémon 10%. In Tag Team, Rebirth revives a
  fainted partner at 15% instead, once per match. Then a ring of fire rolls out and stays around you, burning foes
  inside. Made for Tag Team and 2v2.
- **Koraidon, Collision Course** (Area Zero). A lane lights up, then Koraidon charges
  down it. Anyone caught is rammed again and again under a red sun before the last
  collision launches them. Afterwards a harsh sun round you makes your hits 20%
  stronger for 5 seconds.
- **Miraidon, Electro Drift** (the future). It drifts a neon ring round the aim point,
  then strikes the centre with a bolt that paralyses. Anyone caught gets a scene in a
  neon city with lightning raining down. Afterwards Electric Terrain round you speeds
  you up by 25% for 5 seconds and zaps foes who stand in it.

**Team select** asks for as many Pokémon as the mode needs: one in Standard and the
party modes, two in Tag Team. The last tile picks a random Pokémon you haven't
picked, and the CPU never copies yours. Once every fighter is chosen, the VS screen
shows your legendary (the last one you chose, or Random): **Y** opens the legendary
roster (eleven legendaries, Random or Off) and **Select** the stage picker; both come
back to the VS screen. Each CPU gets a random legendary. Online, both players must have legendaries on for
them to appear.

**In battle** the bottom-left tray lists your moves with their buttons and cooldowns,
and your legendary's meter.

## Trailer

A 79-second trailer (no web address on screen) is at
**https://silverbits1001.github.io/PokeBattler/trailer.mp4**. It is recorded from the game itself:
`tools/trailer/rec2.js` drives an instrumented build on a virtual clock (30 fps,
two game ticks a frame) through the title, main menu, team select (Tag Team and
the legendary picks), Stadium, Power Plant and Magma Isle, Tag Team switching, a
Free-for-All, three legendary summons, Slugma Tag, Pidgey Sweep and Training,
with captions as an overlay; items, taunts, shinies and Lives are off.
`tools/trailer/mux.py` encodes the frames with the title theme and then the
battle theme. The music is the game's (Nintendo / Creatures / GAME FREAK). Sound
effects are not recorded.

## Android (AYN Thor and other handhelds)

```
python3 tools/build.py && python3 tools/build_apk.py
```

This writes `dist/PocketBrawl.apk`, the whole game in one full-screen landscape
WebView. It runs offline, and online play works when the device has internet.
The sources are in `android/`. The Java is written as smali, so no Android SDK
is needed. The build downloads Apktool and uber-apk-signer into `.apk-tools/`
the first time it runs, and signs the APK with uber-apk-signer's debug key, so
a new build installs over the old one. Set `APK_VERSION_CODE` and
`APK_VERSION_NAME` to raise the version.

The built-in controller is read natively, from key and motion events, and handed
to the page as `window.AndroidPad`. A small shim in the APK's page turns that into
a standard `navigator.getGamepads()` pad, so the game's controller support works
unchanged:

- Buttons: A, B, X, Y, L1, R1, L3, R3, Start, Select and Home.
- D-pad: as keys or as a hat axis.
- Both sticks.
- Analog L2 and R2.

Back pauses (it acts as Escape). The screen stays on, the system bars are
hidden, and the game pauses when the app goes to the background.

## Online play

Choose **Online** on the main menu, pick your team (X switches Standard / Tag Team)
and your legendary. The lobby lists everyone who has the game open right now: pick **Quick match**
to play the next trainer who is searching, or choose a trainer to challenge them.
Each player picks an arena (Select, or tap the stage plate). If the two picks differ, a
roulette decides between them before the battle. After a battle, choose **Rematch**,
**New team** (you pick again, and the two of you are paired again once you're done) or
**Leave**.

**Friend codes and parties (no claude.ai account needed).** On the Online screen pick
**Create a friend code** and send the 5-letter code to up to three friends; they pick
**Enter a friend code** and type it in. The code stays on the host's **Start battle**
row, which also shows how many are in. The host picks **Start battle**: two players
play a 1v1, three or four a Free-for-All (one Pokémon each). After a battle everyone
can **Rematch** (it starts once all of you ask), and anyone who picks **New team** or
leaves sends the party back to its lobby, still linked, where the host can start again.
The host passes every message between the friends, so each page sees the whole party.

**Parties in the open lobby.** Pick **Host a party**: your status shows HOSTING A PARTY
and other trainers pick you from the list to join (up to three). Start when everyone is
in; B calls it off. The **Mode** row (Battle or Thin Ice) is the host's choice, for 1v1s
and parties alike. Thin Ice online always plays on the frozen lake. The two pages connect directly over WebRTC when they can, and through
free public MQTT relay servers when they can't. Both stay open during a match: play
moves to the direct link whenever it opens, and back to the relay instantly if it
drops. This works from any copy of the game. The public copy is
**https://silverbits1001.github.io/PokeBattler/**, served by GitHub Pages from the
`gh-pages` branch (a built `index.html`). [PeerJS](https://peerjs.com)'s free public
server only introduces the two pages to each other; it is bundled in `assets/vendor/`
(MIT).

The open lobby (everyone who has the game open) works when the game is opened from its
claude.ai artifact link by people who have access to it.

To update the public copy after a change: run `python3 tools/build.py`, copy
`index.html` onto the `gh-pages` branch, and push it.

Matches use rollback netcode with an input delay that adapts to the connection (1 tick on
a fast link, up to 12 on a slow one), so the other players only ever have to be predicted a
few ticks ahead. Each other player's input is predicted until it arrives; when a guess was
wrong, the game rewinds and replays the missed ticks within the same frame. Every page
runs the same deterministic simulation from the host's seed, a sync check runs every
second, and a corner readout shows the link type (direct, relay or room) and the latency. Press
F2 (or tap the readout) for a diagnostics panel.

## Layout

| Path | What it is |
| --- | --- |
| `src/game.js` | Game code (engine, CPU, rendering, audio, menus) |
| `src/page.html` | Page markup, styles and embedded fonts |
| `assets/sprites.js` | Sprite sheets and portraits as data URIs (`window.__ASSETS__`) |
| `assets/vfx.js` | Arena event effects made with PixelLab's VFX tool (`window.__VFX__`); sheets in `assets/vfx/` |
| `assets/fxpack.js` | Hit, element, status, item and arena effects from two pixel VFX packs (`window.__FXPACK__`), built by `tools/fxpack.py` from the extracted packs |
| `assets/layouts.js` | Arena layouts (`window.__LAYOUTS__`): solid cover, water pools and layers drawn over fighters, per arena; made with `editor.html` |
| `editor.html` | The arena editor (built from `tools/editor.html` with `assets/editor/` backdrops): draw solid, water and layer shapes, test them in the game (`index.html?layouts=local`), export JSON |
| `assets/fonts/` | Lilita One and Fredoka (embedded in `src/page.html`) |
| `assets/tiles.js` | Arena floor tilesets as data URIs (`window.__TILES__`); source PNGs in `assets/tiles/` |
| `assets/modes/` | Mode Select emblems (PixelLab), inlined by the build as `window.__MODE_ICONS__` |
| `tools/build.py` | Assembles `index.html` and `dist/artifact.html` |

After editing anything in `src/` or `assets/`, run `python3 tools/build.py`.

Sprites and portraits: PMD Sprite Repository (sprites.pmdcollab.org).
Arena floor tiles: generated with PixelLab (16px top-down Wang tilesets, recoloured).
Mode Select emblems: generated with PixelLab.
Fonts: Lilita One (Juan Montoreano) and Fredoka (Milena Brandao, Hafontia), SIL Open Font License.
Effects: Super Pixel Effects Gigapack (free version) - Will Tice / unTied Games (used in the game with credit;
the pack itself is not redistributed, only the frames the game uses are packed into `assets/fxpack.js`), and
PVFX Foundry by Pixel VFX Studio (CC0).
