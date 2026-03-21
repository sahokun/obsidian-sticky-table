# CLAUDE.md

## Language

Think in English, respond in Japanese.

## Architecture

Two files at the project root:

- **main.js** — Source and release artifact (plain CommonJS, no build step required). Contains two classes:
  - `StickyTablePlugin` — Plugin entry point. Injects CSS styles on load and registers a global click handler via `registerDomEvent`.
  - `TableModal` — Modal that clones and displays a table inside a scrollable popup.
- **manifest.json** — Obsidian plugin metadata (id, name, version, minAppVersion).

## Key Patterns

- **CSS injection** — On load, a `<style>` element is created with `STYLE_CSS` and appended to `document.head`. It is cleaned up automatically via `this.register(() => style.remove())`.
- **Click handler** — `this.registerDomEvent(document, 'click', handler)` intercepts table clicks:
  - Reading mode: any click on a table opens a `TableModal`.
  - Live Preview (desktop only): `Ctrl+click` on a table opens a `TableModal`; mobile is skipped.
  - Clicks on `a`, `input`, `button`, `label` are ignored.
- **TableModal** — clones the target `<table>` element (`cloneNode(true)`) and renders it inside a scrollable `div.sticky-table-scroll-wrap`.
- No settings tab. `loadData()` / `saveData()` are not used.
- No build toolchain. Edit `main.js` directly and reload Obsidian (or use the Hot Reload community plugin).

## Git Workflow

- Feature branches use the `feature/<name>` format, created from **main**
- Direct push and force push to main are prohibited
- Claude's scope of work is limited to pushing to feature branches

### PR Flow (handled by humans)
- PRs are created and merged by humans
- If Copilot's automated review leaves comments, Claude fixes them and pushes to the same feature branch
- Thread resolution and final merge are done by humans