# Map generation prompt

The prompt used to generate new arena paintings (PixelLab "Create Image (Pro)",
688x384, background on). Fill in the theme line for each new map.

```
Generate a more visually interesting battle arena in pixel art style. Keep the
same overall layout but make it look nicer. Don't use any 3rd party content.

Ground layer only: an empty, flat, fully walkable arena floor with no props,
pillars, rocks, statues, plants or any objects standing on it. Keep only flat
surface details like cracks, tiles, glowing veins and markings. Decorations
only outside the playable border.

<theme> e.g. make a new map, it should be inside beach cave, pools of water on
the right, asymmetrical map design, not perfectly square. rocky walls, cave
grotto
```

Fitting a painting into the game: see the arena notes at the top of
`assets/arenas.js`. The floor is fitted to the arena at about 0.44 arena px per
source px, so the fighters stay the same size as on the other paintings.
