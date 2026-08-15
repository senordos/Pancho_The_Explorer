# Mexico 10 Final-Level Recommendations

## Inspection Summary

`levels/mexico10.json` is a 64-by-72-tile vertical level. It starts Pancho at the lower left, climbs through mixed enemy rooms, and opens into a wide upper arena (roughly columns 33–48) containing `EnemyElMalo`. This is a strong finale structure: an ascent creates anticipation, and the boss has room to use its bouncing projectiles.

The current source has 31 objects: a compact opening, a mid-level arrow/enemy-block section, eagle and disk hazards, one extra-life chilli, and El Malo. It is much less populated than `mexico09` (92 objects), which is appropriate if the finale emphasizes clarity over attrition.

## Fix Before Level Design

1. Restore `Exit1` objects to `mexico10.tmx` and export `mexico10.json`. The source JSON currently has no exits, although the stale `mexico10_fixed_y.json` has three at `(64, 64)`, `(64, 128)`, and `(64, 192)`. Rebuilding from the source as-is will remove the only completion trigger.
2. Rebuild the complete episode before testing. The current `game/leveldata.js` has only `levels[0]` and `levels[1]`; it cannot exercise Mexico 10. Run `cd supportingfiles && python3 buildlevels.py mexico` once the exported source is correct, then confirm entries through the final level exist.
3. Snap the off-grid chilli coordinates to 64-pixel increments: `y=4030`, `3582`, and `3518` should be reviewed against nearby positions `4032`, `3584`, and `3520`.

## Recommended Level Flow

### 1. Opening: readable warm-up

Keep the lower-left opening as a short run that introduces the upward route. Place a safe landing before the two activated `Enemy2` enemies; their `activateIfPlayerXGT` thresholds should trigger one at a time, not both while the player is committed to a jump. The nearby chilli trail should reward the safe route rather than sit in an unavoidable enemy lane.

### 2. Ascent: three distinct tests

Organize the existing climb into clear beats: (a) a timing section using the arrow trap and two `Enemy1` enemies, (b) an aerial section using the four eagles around the enemy-block platforms, and (c) a precision section using the two disks. Give each beat a full-width safe platform and a visible next destination. Do not stack an eagle, disk, and lethal drop in the same short jump; mobile controls need a recovery margin.

Place the `ChilliEL` immediately after the most demanding ascent beat, on a safe ledge. It should communicate “boss ahead,” not be a prize that requires another blind risk.

### 3. El Malo arena: the climax

Use the existing upper-right room (columns 33–48, rows 13–29) as a sealed-feeling arena. Keep a broad central floor, two low side platforms for projectile dodging, and one high platform that enables a deliberate stomp. Avoid extra roaming enemies here: El Malo already throws bouncing balls at randomized intervals and follows the player horizontally.

The boss has three lives and can be stomped, but the level currently does not require its defeat before reaching an exit. Put the exit beyond the arena and add a simple gate/route that becomes reachable only after the third stomp; otherwise players can bypass the intended finale. A post-boss chilli line and a brief, hazard-free walk to the exit will make the win feel earned.

## Validation Checklist

- Export from Tiled, rebuild `leveldata.js`, and confirm the game loads Mexico 10.
- Finish it with keyboard and touch controls, including a restart from each major beat.
- Stomp El Malo three times; verify projectiles remain dodgeable and the exit is inaccessible beforehand.
- Confirm all chilli and extra-life placements are reachable without clipping, and that the final exit produces `GAME_COMPLETE`.
