# Arena art to make (replacing code-drawn pixels)

Everything below is drawn by code today. Pokémon, the wildlife (Zubat, Unown,
Slugma, Snorunt, Spheal, Magnemite, Pidgey, Voltorb), the floor tilesets and
the 14 effect sheets are already real art and are not listed.

Tool key: **map obj** = PixelLab map object (transparent sprite), **anim** =
animated object, **tiles** = top-down tileset, **bg** = painted image strip,
**vfx** = effect sheet. ★ = biggest visual win.

## Every arena

- ★ Outer wall, one per arena: wall strip + corner pieces (bg / tiles)
- ★ Ground items, 9 icons: Sitrus Berry, X Attack, Poké Ball, Rocky Helmet,
  Choice Scarf, Focus Band, Quick Claw, Smoke Ball, Leftovers (map obj)
- Battle scars: scorch, crack, frost star, wet patch, leaf flecks, skid marks (map obj)
- Field shifts: grass patch, puddle (+ electrified), seed mine (map obj)
- Landing telegraph reticle (rocks, meteors) (vfx)
- Smoke Ball cloud (vfx), Substitute log (map obj)
- Weather particles: snowflake, ember, ash, firefly, confetti (small vfx)

## Stadium

- ★ Backdrop: tiered stands, big screen, two floodlight towers, ad boards (bg)
- ★ Crowd: 2–3 animated cheering crowd tiles (anim)
- Pitch markings + centre Poké Ball emblem (tiles / map obj)
- Floor props: trainer boxes, cones, cleat marks (map obj)
- Spotlight beam + light pool, Spotlight Finale ring (vfx)
- Camera-flash sparkle (vfx)

## Ruins

- ★ Backdrop: dusk sky, block wall, carved Unown, pillars with braziers, ivy (bg)
- ★ Boulders: 2–3 mossy variants + 2 cracked damage stages (map obj)
- Brazier flame (anim)
- Floor props: Unown mosaic, fallen column, urns, flowers, flagstone plinth (map obj)
- Dart trap: pressure plate, wall slit, dart (map obj + vfx)
- Falling surge rock (reuse boulders) and dust fall (vfx)

## Cinder Crater

- ★ Backdrop: basalt rim with glowing seams, two lavafalls, lava channel (bg + anim lavafall)
- ★ Lava pool rim: crust edge + cooled-crust tile (tiles, chained to the lava texture)
- Floor props: glowing fissures, obsidian shards, ash smudges, basalt hexes (map obj)
- Heat vent mouth (map obj) + glow ring (vfx)
- Lava bubble pop (vfx)

## Frostfall Peak

- ★ Backdrop: summit ridge, cloud sea, prayer flags, cairn (bg)
- ★ Ice rink edge: snowbank rim around the rinks (tiles, chained to rink ice)
- Rink ice + open water (in progress: tilesets generating now)
- Thin-ice crack overlay in 3 stages, floating ice floes (map obj)
- Icicle (falling) (map obj) — the impact already has art
- Floor props: snowy rocks, ice crystals, frozen shrubs, drifts (map obj)
- Aurora (anim), blizzard streaks (vfx)

## Power Plant

- ★ Backdrop: panelled wall, two turbines (anim), pipes, valves, control panels (bg)
- ★ Pylon: tower with lamp, on / overcharged / shorted-out states (map obj)
- ★ Conveyor belt: animated tread + end caps (anim / tiles)
- Arc lightning between pylons (vfx) — the crackle at the tops already exists
- Floor props: crates, yellow drums, oil stains, lamp boxes, cable trenches, floor arrows (map obj)
- Hazard-stripe border (tiles)

## Suggested order

1. Ground items (seen in every match)
2. One backdrop per arena
3. Boulders, pylons, conveyor (the big gameplay objects)
4. Floor props per arena
5. Effects and particles
