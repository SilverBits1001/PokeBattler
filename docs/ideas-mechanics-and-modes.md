# Ideas: battle mechanics, modes and what makes it a full game

A second pass after [the review](review-roadmap.md), this time on the fight itself and on the shape of a finished game, with a look at what the neighbours do.

## What the neighbours do

**Fan-made Pokémon brawlers.**
- *PokéVersus* (itch.io, Chacoon): a Brawl Stars-style 3v3 in the browser with 490 Pokémon, five modes including a 10-player royale with a closing "Toxic Fog", matchmaking and private rooms. Breadth over depth: every Pokémon shares a small set of move archetypes.
- *Pokémon Arena 2D* (Big Kid Nation): real-time pixel-art arena battles, the most-watched project in the space; public beta listed for December 2026. Not playable yet.
- *Pokémon: 3D Arena* (jackijianxa): Souls-style combat with stamina and guard management; a preview with tournaments and 3v3.
- *Empress* (Omniscye): a co-op raid against a giant Mewtwo with real-time dodging.
- *Poké Arena 2D* (alpha): real-time pixel battles with ranked play.

What this game has that none of them do: a kit built round one idea per Pokémon, legendaries as cinematic ultimates, arenas that do things, mode-aware CPUs, and rollback netcode that holds a four-player party in sync. What they have that this game lacks: roster breadth, matchmaking, and raids or co-op.

**The commercial references.**
- *Pokkén Tournament*: an attack triangle (attack beats grab, grab beats counter, counter beats attack) where winning the triangle gives a critical hit and extra meter; one Synergy gauge that powers a temporary Burst form with one Burst Attack; a Support Pokémon called on its own cooldown. Reviewers' main complaint was thin single-player content.
- *Pokémon Unite*: held items as a pre-match build, Pokémon evolving mid-match as they level, Unite moves, neutral objectives that swing the game. Reviewers praised the approachability and distinct roles.
- *Super Smash Bros. Ultimate*: the mode list is the model for "complete": Classic, Smashdown (each fighter once), Squad Strike (3v3 or 5v5 tag, elimination or best-of), Spirits (equippable passives), Tourney brackets, Custom Smash mutators (giant, tiny, fast, 300%, stamina), Home-Run Contest.
- *Battlerite*: a top-down arena where every shot is a skillshot, counters are baited and ultimates whiffed, short cast times are the vulnerability windows, and a centre orb is a fight-starting objective.
- *Brawl Stars*: Gem Grab (hold ten gems for 15 s), Brawl Ball (soccer), Heist (break the safe), Bounty (your value rises with kills), Showdown (royale with power cubes).

## Battle mechanics

The game's fight today: a three-hit combo, a chargeable Smash, two specials on cooldowns, dodge, guard with a shield meter and perfect guard, statuses, items, arena hazards and a legendary on a meter. Type matchups are ±5%. The ideas below add depth without adding buttons where possible.

### 1. A universal grab, and the triangle

The biggest hole in the fight. Guard is answered only by specific moves (Sacred Sword, Crunch, Snorlax's throw). Give everyone a short-range grab (Guard + Attack together, or a held Attack) that beats guard, loses to any attack during its startup, and throws in the stick direction. That closes Pokkén's triangle:

- attack beats grab (hit it out of startup),
- grab beats guard,
- guard beats attack (and perfect guard punishes it).

A throw with direction is also the cleanest Thin Ice and edge tool, and every kit gets a throw animation from the SpriteCollab "Swing" or "Rotate" sheets.

### 2. Counter-hit

Hitting a foe during their own attack's startup is a counter-hit: more hitstun, a small damage bonus and a "COUNTER!" pop. It rewards whiff punishing, which is the skill the frame data was built for, and it teaches it by showing it.

### 3. Back attacks crit

A hit that lands from behind is a critical: 1.3x and a flash. Positioning matters in a top-down game and this makes it legible. Teleport Slash, Shadow Sneak, Dig and Phantom Force all become about the angle, not just the hit.

### 4. Type matchups that you can feel

±5% is invisible. Two options, and a rules switch can carry both:
- **Standard:** super-effective hits do +15% and build more legendary meter; resisted hits do −15% and less knockback. Still a nudge, but one the "SUPER EFFECTIVE!" pop earns.
- **Type Match (party rules):** the full chart at ±30%, with immunities (Ground never hurts a flier, Normal never hurts a Ghost). Chaotic, and very Pokémon.

### 5. Clashes

Two attacks that hit on the same tick: the heavier wins and the lighter staggers; equal weights clash, both bounce back with a spark and a sound. Right now simultaneous hits trade silently. Clashes are the moment people remember.

### 6. Burst, or the legendary: one gauge, two uses

The legendary meter is the only resource. Let it buy two things:
- **Burst** (half the meter, once per match): a 10-second Mega Evolution or Terastallization. Mega for those that have one (Charizard X or Y, Lucario, Gengar, Gardevoir, Gallade, Metagross, Garchomp, Scizor, Blastoise, Venusaur); Tera for the rest, which changes the typing to one type with a crystal aura. Higher power, a new look, and a comeback for a losing player.
- **The legendary** (the full meter), as now.

Spending half on a Burst means the legendary comes later, or never. That is a real decision in every match, the same one Pokkén's single Synergy gauge makes. Pokkén also charges its gauge faster for triangle wins, which pairs with idea 1.

### 7. Held items as a build

Pick one held item before the match, as in Unite, instead of (or as well as) random drops: Life Orb (+damage, chip on each hit), Focus Sash (survive one hit from full), Choice Band (+power, but the last special is your only special for 4 s), Assault Vest (less special damage taken, no guard), Eviolite for the smaller ones, Leftovers, Rocky Helmet. Random drops stay for party rules. A build makes two Charizards play differently and gives a reason to come back to a fighter.

### 8. Weather and terrain as stage states

Koraidon's sun and Miraidon's terrain already exist as fields. Make Rain, Sun, Sandstorm, Hail, Electric and Grassy Terrain stage-wide states that arena events or moves can start: Rain boosts Water and dampens Fire, Sandstorm chips everyone but Rock and Ground, Grassy Terrain heals slowly. Arena-specific weather (hail on Frostfall, sun in the Caldera) ties the stages to the chart.

### 9. Status interplay

A few universal payoffs so statuses combine across kits:
- a frozen foe hit by a heavy attack shatters: 1.5x and a launch;
- the first hit on a sleeping foe is a critical and wakes them;
- a paralysed foe's dodge has a chance to fail;
- a burned foe's heavy attacks do less.

These give every kit a reason to want a partner's status in 2v2.

### 10. Stage-out as a rule

Magma Isle has edge dunks; make "Ring Out" a rules option on any arena: enough knockback past the edge is a K.O. A flat ring arena with no hazards and ring-out on is the competitive stage; it also makes knockback matter as much as damage, as it does in Smash.

### 11. A support slot

Pokkén's Support Pokémon, built on the Tag Team assist code that already exists: pick one non-fighter (Emolga for a dash-stun, Fennekin for a fireball, Snivy for a vine pull, Chansey for a heal, Togekiss for a speed boost) called on its own cooldown with one button. Attack, enhance and disrupt types. In Standard mode it gives a solo player the tag-team decision without a second fighter.

### 12. Smaller touches

- Taunting untouched for its full length gives a sliver of meter; getting hit during it costs some. A fun risk.
- A "hit confirm" sound and screen flash on the first hit of a combo, so you know you're in.
- Tech rolls on landing (press dodge as you hit the ground) to pick the get-up direction; the invincible get-up exists, so this is a directional choice on top.
- The last K.O. of a match replayed in slow motion before the results.

## Modes

The existing nine (VS CPU, Tag Team, Zone Control, Free-for-All, Team 2v2, You're It!, Thin Ice, Thin Ice Party, Pidgey Sweep) plus Arcade and Training. What a full list looks like, grouped by what they reuse:

**Built on knockback physics (cheap, very fun).**
- **Poké Ball** (Brawl Ball): 2v2, a giant ball in the middle, knock it into the goal, first to two. Every hit's knockback already moves things.
- **Snorlax Launch** (Home-Run Contest): ten seconds of combo on a sleeping Snorlax, then a Smash to launch it; distance on a leaderboard. One screen, one number, endlessly replayable.

**Built on items and zones (the item spawn and zone code exists).**
- **Berry Grab** (Gem Grab): berries spawn in the centre, hold ten for 15 s to win, a K.O. drops half of yours. Zone Control with a reason to leave the zone.
- **Break the Egg** (Heist): each team guards a giant egg; first to crack the other's wins. Gives tanks a job.
- **Bounty** in Free-for-All: a star count over each head that rises with K.O.s; a K.O. on a high bounty pays more; most stars at time wins. This fixes the "a quarter of matches are wins" feel of four-player FFA.
- **Toxic Fog** (Showdown royale): four players, the arena edge poisons and closes in over two minutes, power-up berries in the middle. Thin Ice without the ice.

**Built on the roster (select-screen work).**
- **Smashdown**: a series where each Pokémon can be used once; the roster of 29 is wide enough.
- **Squad Strike**: 3v3 tag, elimination or best-of; the Tag Team code already swaps fighters.
- **Mirror match** and **Random** as quick picks.

**Built on the legendaries and CPU (the art exists).**
- **Raid**: one to four players against a giant legendary with phases, a health bar across the top, and the sky takeover as the stage. Co-op is the one thing the party modes don't have.
- **Boss Rush**: the eleven legendaries in a row with one life bar and a timer.
- **Survival**: endless CPUs, each K.O. heals a little, how many can you beat.
- **Rival**: a CPU that tracks your most-used moves across matches and adapts, named and shown as a rival with a record against you.

**Built on rules (parameter scaling, the cheapest of all).**
- **Mutators** (Custom Smash): Giant, Tiny, Fast, Slow, Mirror, Sudden Death (one hit), Metal (heavy and slow), Fog of War (short sight), Random Moves (your specials change every 20 s), Cooldown Chaos (all cooldowns 1 s). Stackable, and they power the next one.
- **Daily Challenge**: a fixed seed, a fixed fighter and two mutators, scored; a daily leaderboard once there are players. Pokkén's daily challenge was criticised as too easy; make the modifiers the challenge.
- **Tourney**: a 4 to 8 player bracket, local or in an online party, with the bracket drawn on screen.
- **Rule presets**: Tournament (no items, no hazards, ring out, timer), Party (items, hazards, Type Match, mutators), Custom.

## What "complete" means for this game

A finished party fighter has, besides the fight: a reason to open it alone, a reason to open it with friends, a record of what you did, and something to unlock. In that order:

1. **Alone:** Arcade with a branching path and a rank letter, Raid, Boss Rush, Survival, Daily Challenge, combo trials, target tests, a Rival.
2. **With friends:** local multiplayer on one screen, Poké Ball, Berry Grab, Bounty, Tourney, mutators.
3. **A record:** a profile with wins per Pokémon and mode, best times and distances, longest combo, titles.
4. **To unlock:** shinies (exist), titles, select portraits, victory poses, the support Pokémon, the ring arena, mutators, music in a sound test, a gallery of the legendary scenes. Earned by playing, never by randomness.

## If five things were picked

1. **Grab and counter-hit** (mechanics 1 and 2): the fight gets its missing answers and its first teachable skill.
2. **Burst or legendary on one gauge** (mechanic 6): the match-defining decision, and Mega Evolution is the single most-requested Pokémon spectacle.
3. **Poké Ball and Snorlax Launch**: two modes that reuse what exists and that people play for an hour at a party.
4. **Mutators and a Daily Challenge**: cheap, stackable, and the backbone of a solo reason to come back.
5. **Raid**: co-op against a giant legendary, the mode none of the fan games and neither Pokkén nor Smash offer in this form.

Sources: [Pokkén mechanics (Serebii)](https://serebii.net/pokken/mechanics.shtml), [Pokkén strategic preview (Prima)](https://primagames.com/featured/pokken-tournament-strategic-preview), [Pokkén DX review (Outcyders)](https://www.outcyders.net/review/pokken-tournament-dx-review), [Pokémon Unite held items](https://www.pokemon.com/us/strategy/pokemon-unite-strategy-held-items-and-suggested-builds), [Unite review (Game Informer)](https://gameinformer.com/review/pokemon-unite/pokemon-unite-review-a-thunder-shock-to-the-system), [Smash Ultimate modes (SSBWiki)](https://ssbwiki.com/Modes), [Smash Ultimate new modes (DualShockers)](https://www.dualshockers.com/super-smash-bros-ultimate-new-battle-modes-rules-options/), [Special Smash (SSBWiki)](https://www.ssbwiki.com/Mini), [Battlerite review (PC Gamer)](https://www.pcgamer.com/battlerite-review/), [Brawl Stars modes (TouchArcade)](https://toucharcade.com/2017/06/14/brawl-stars-bounty-smash-grab-heist-and-showdown-modes-detailed/), [PokéVersus](https://chacoon.itch.io/pokeversus/devlog/1722117/pokversus-is-out-3v3-pokmon-battles-in-your-browser), [Pokémon Arena 2D](https://www.bigkidnation.com/), [Pokémon: 3D Arena](https://jackijianxa.itch.io/pokemon3darena), [Empress: Pokemon 2D Arena](https://omniscye.itch.io/empress-pokemon-2d-arena), [Poké Arena 2D](https://www.pokearena2d.com/), [Rivals of Aether II requests (Steam)](https://steamcommunity.com/app/2217000/discussions/0/715612249814828942/?l=latam).
