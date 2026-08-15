# Repository Guidelines

## Project Structure & Module Organization

`game/` contains the browser game. `index.html` loads scripts in dependency order; core loop and setup live in `game.js` and `gameSetup.js`. Reusable entities are in `game/sprites/`, terrain code is in `game/bricks/`, and controls, sound, and utilities have their own subdirectories. Keep image and audio assets in `game/tiles/` and `game/sounds/`.

Author levels in `levels/` as Tiled `.tmx` files with matching exported `.json` files. `supportingfiles/buildlevels.py` generates `game/leveldata.js`; `supportingfiles/z_archive/` and `tiles_old/` are historical assets and should not be used for new work.

## Build, Test, and Development Commands

No package manager, bundler, linter, or automated test suite is configured.

- `python3 -m http.server 8000 --directory game` serves the game locally; visit `http://localhost:8000/`.
- `cd supportingfiles && python3 buildlevels.py mexico` rebuilds `game/leveldata.js` from `levels/mexico00.json` onward. Run it after exporting changed Mexico levels from Tiled.
- Append `?level=3` to the local URL to start at a specific level during manual checks.

## Coding Style & Naming Conventions

Follow the surrounding vanilla JavaScript style: four-space indentation in new code, semicolons, `camelCase` variables/functions, and `PascalCase` sprite constructors. Name sprite files after their constructor, for example `EnemyEagle1.js`; put shared base classes under `game/sprites/` with the existing leading-underscore convention. Keep script additions ordered in `game/index.html`, so dependencies load before consumers.

## Testing Guidelines

Test changes in a browser on both keyboard and touch-capable viewports where relevant. Verify level loading, collision/physics, restart and exit flow, and relevant sound controls. For level edits, export JSON, rebuild `leveldata.js`, then play the changed level from its query parameter. There is no coverage target or test-file convention currently.

## Commit & Pull Request Guidelines

Use short, imperative, sentence-style commit subjects consistent with history, such as `Fix reset level variable` or `Add invincibility chilli`. Keep each commit focused. Pull requests should describe gameplay impact, list affected levels/assets, link any issue when applicable, and include screenshots or a short recording for visible gameplay or UI changes. Do not commit generated level changes without their source level export.
