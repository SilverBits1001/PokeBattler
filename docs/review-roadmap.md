# Pokémon Pocket Brawl: review and roadmap

Two reads of the game as it stands (29 fighters, 11 legendaries, 8 arenas, 9 items, nine modes plus Arcade, Training and 4-player online), first as a player, then as a developer. Each ends in a list: add, change, fix. A short priority order is at the end.

## As a player

What already lands: every fighter has one idea and a real weakness, the legendaries are spectacles, the arenas do things, and online with friends works on a phone. The move tray and briefing mean you never have to guess what a button does.

What a player notices is missing:

**No couch play.** This is a brawler with four-player modes, 2v2 and You're It!, and the only way to play it with a friend in the same room is two devices and a friend code. The second controller does nothing. For a party game that is the biggest hole in the box.

**Nothing to come back for.** Once the Arcade ladder is cleared and the shiny is unlocked, there is no record of what you have done: no win counts, no best Arcade time, no "most played", no titles or medals, no challenges. The results screen shows damage dealt and little else.

**Nobody to play online unless you bring them.** Friend codes only. There is no quick match, so a solo player online has an empty screen.

**Training is for testing, not learning.** Dummies, hitboxes and game speed are all there, but there is no combo trial, no "do this move" lesson, and the How to Play screen is a wall of text. A new player learns each Pokémon by reading its briefing.

**Matches end only in a K.O.** No timer, no sudden death, no stock-and-time rules, so a cagey match can run long with no pressure to engage.

**Random things in a competitive game.** Deoxys rolls a Forme, items drop at random, and the stage roulette picks between two choices online. Those are fun casually but there is no ruleset to turn them off together.

### Add

1. **Local multiplayer on one screen**: a second gamepad (and a second keyboard layout) as player 2 in every mode, up to four pads in the party modes. The engine already runs four fighters and reads one pad; this is mostly input seating and a shared camera check.
2. **Quick match online**: a public queue on the existing relay, random opponent, with a nickname and a simple rating.
3. **A player record**: wins and losses per Pokémon and per mode, best Arcade time and stage reached, favourite fighter, longest combo. Shown on a Profile screen and on the results screen.
4. **Unlockables beyond shinies**: titles, select-screen portraits (the other SpriteCollab emotions), a victory pose or taunt per fighter, colour variants, earned by Arcade clears, mode wins and challenges.
5. **Match rules**: time limit with sudden death, stock plus time, hazards on or off, items on or off per item, legendaries on or off, damage ratio. Saved as presets ("Tournament", "Party", "Custom").
6. **Combo trials and a move tutorial per Pokémon**: five set combos per fighter, with the inputs shown and ticked off as they land, and a guided first fight that teaches guard, dodge, Smash charging and the legendary meter one at a time.
7. **Replays**: the engine is deterministic and input-driven, so a replay is the seed plus the input stream. Save the last match, play it back with pause and slow motion, and share it as a short code.
8. **Results that tell a story**: damage dealt and taken, longest combo, time to first hit, guard breaks, Smash accuracy, legendary damage, and an MVP in the team modes.
9. **More ways to fight the CPU**: survival (endless foes, one life bar), boss rush (the legendaries as opponents with a health bar), a daily challenge with a fixed seed and a score, and a 3v3 Tag Team.
10. **Spectating and a lobby**: in a party of four, the two who are not fighting a 1v1 watch; a lobby chat with quick phrases.
11. **Roster and stages**: the roster is 29; the obvious requests are Mewtwo, Eevee and an evolution, Mimikyu, Scizor exists so Heracross, Ampharos, a Water starter beyond Blastoise. One or two more arenas with a flat "Final Destination" layout and no hazards for competitive play.
12. **Photo and share**: pause, hide the HUD, screenshot; a victory screenshot on results.

### Change

13. **Stage hazards should be a rules choice, not a mode choice**: the event-free arena is the right default for ranked or tournament rules.
14. **Deoxys should let you pick a Forme** when legendaries are picked, with Random as the fun option, not the only one.
15. **The Free-for-All win rule**: with four players a 25% win share makes most matches a loss; give placement points (4-2-1-0) and a short series so the second place matters.
16. **Arcade is six stages with a boss**; add a difficulty choice up front, a stage-by-stage score and a continue counter on the record so a flawless run means something.
17. **Legendaries** (parked for later by request): Ho-Oh does 77 damage per summon against 150–200 for the others, which is by design as a support legendary but reads as weak; the catch cinematic is skippable for the fourth time you have seen it; the aim phase could show a damage preview.
18. **Mode Select emblems**: replace the generated icons with a consistent set (waiting on which source to use).

### Fix

19. **Pikachu's practice briefing numbers are stale** (for example Thunderbolt lists about 41, measures 72).
20. **Gallade is weak on Magma Isle** (0.28 against 0.44–0.50 elsewhere); a small lunge or Teleport Slash range increase on that layout, or a per-arena check of where its approach fails.
21. **Chandelure at Rookie level** sits at 0.30; the rookie CPU does not convert its setups.
22. **Long names on the select grid** auto-shrink; a 30th fighter will need a sixth row or a smaller tile.

## As a developer

What is good: one deterministic simulation with rollback online, data-driven kits with a shared "ex" system, a CPU that plays the mode, the sim harnesses that gave every balance number above, and assets inlined so the game is one file.

What a developer notices:

**One 51,500-line file and a 25.7 MB page.** `src/game.js` holds engine, kits, AI, rendering, UI, netcode and audio in one scope. `index.html` is 25.7 MB because every sprite, tileset, effect pack and music track is a base64 string. Mobile load over cellular is slow and a cold cache on a slow phone is painful. A single syntax error anywhere breaks everything.

**The test harness lives outside the repository.** Every balance, determinism, online sync and route check in this project was a script in a scratch directory. None of it runs in CI; none of it ships with the code. The next contributor cannot rerun the numbers in `docs/plan-roster-5.md`.

**Online depends on public relays.** PeerJS for signalling, free public MQTT brokers as a fallback. Those can vanish or rate limit, and nothing in the game tells the player why a code failed.

**Save data is one localStorage blob per key** with no export, no import and no versioning beyond a key suffix. A cleared browser is a lost Arcade record.

**Licensing.** Sprites are PMD SpriteCollab (CC BY-NC 4.0 and Chunsoft-owned frames), the characters are Nintendo's, the effect packs have their own terms. This is fine as a private project and is why the game is not public, but it caps every "share it" feature above.

### Add

1. **Split the build**: engine, kits (one file per Pokémon), AI, render, UI, net, audio as ES modules, bundled by `tools/build.py` into the same single file for release. Same output, far easier to work on, and a per-file lint.
2. **Lazy assets**: keep the engine and UI inline, and load sprite sheets, tilesets and music on demand (fighter picked, arena picked), cached by a service worker so the second load is instant and the game works offline as a PWA. Convert the base64 PNGs to WebP where the pixel art survives it; that alone should halve the page.
3. **Ship the harness**: `tools/sim/` with the balance round robin, mode A/B, legendary round robin, determinism check, online party sync, route and touch audits, each runnable with one command against `index.html`. Add a GitHub Actions job that runs `node --check`, the build, the determinism test and a short online sync test on every push.
4. **Balance snapshots in the repo**: a JSON of the last win-rate matrix, regenerated by the harness, so a kit change shows its effect as a diff.
5. **A relay status page in-game**: which relay connected, latency, why a code failed, and a retry; plus a self-hostable signalling server option in the README.
6. **Save export and import** (a code or a file), a schema version with a migration step, and the same for layouts and tuning.
7. **Key rebinding** for keyboard and pads, with an input display in Training (the rollback netcode already records inputs, so the display is free).
8. **An error overlay and a version stamp**: catch runtime errors into a visible panel with the build hash, and show the build date on the title screen so bug reports can name a build.
9. **Opt-in local telemetry**: per-match stats written to localStorage (fighter, mode, result, length, moves used) and an export, so balance can come from real play as well as CPU sims.
10. **Performance budget**: a frame-time graph in the Developer tab, and a particle and sheet cap that scales down on phones in four-player modes.
11. **Localisation hooks**: every string already goes through a few draw helpers; route them through a table so a second language is a file.

### Change

12. **Kit definitions and their text in one place**: the kit, its `EXK` tuning, its briefing text, its move list, its cries and its CPU branch are in six places; a kit module that exports all of them removes the stale-number class of bug.
13. **The per-mode damage scales (`FFA_POW`, `TEAM_POW`, `ZONE_POW`) are hand-tuned constants** found by trial; derive them from the harness output with a script and commit the script with the numbers.
14. **Effects are a long event switch**; a registry (event name → handler) lets a kit module register its own effects and makes the pack sheets opt-in per event.
15. **Accessibility pass**: the Team colours option exists for colour vision; add a high-contrast HUD, a text size option, hold-to-charge alternatives for Smash, and a screen-reader-readable menu.

### Fix

16. **`tools/shiny.py` and `tools/build.py` need network and local caches** that are not documented; write a `tools/README.md` with the asset pipeline (SpriteCollab fetch, shiny build, mode icons, effect atlas).
17. **The README is a changelog.** It is 530 lines of "What's new"; split into a short README, a `CHANGELOG.md` and a `docs/manual.md`.
18. **The scratch test scripts that produced this session's numbers** are not committed anywhere; they are the first candidates for `tools/sim/`.

## Priority order

If one month went into this, in order:

1. Local multiplayer on one screen (the biggest player-facing gap, and cheap).
2. Match rules presets, with timer and sudden death, hazards and items switches.
3. Ship the test harness and a CI job (protects everything else).
4. Player record and results stats (the first retention hook).
5. Lazy assets and a service worker (load time, offline, phones).
6. Combo trials and a guided first fight.
7. Replays (the engine makes it cheap; sharing is blocked by licensing but local replays are not).
8. Quick match (only worth it once there are players to match).
