# Sticky Table

<!-- Working rules for this repository, for both AI agents (Claude Code, Codex, etc.) and people.
     Rewrite the "Project-specific" section per project; keep the "Common rules" section identical across all of sahokun's repositories. -->

## Project-specific

### Overview

An Obsidian plugin that adds sticky headers to tables and opens any table in a scrollable popup. Works on desktop and mobile.

### Tech stack and layout

- No build toolchain. Two files at the repository root:
  - `main.js`: source and release artifact (plain CommonJS).
    - `StickyTablePlugin`: plugin entry point. Injects CSS on load and registers a global click handler.
    - `TableModal`: clones a table and shows it inside a scrollable popup.
  - `manifest.json`: Obsidian plugin metadata (id, name, version, minAppVersion).
- Key patterns:
  - CSS injection: on load, a `<style>` element with `STYLE_CSS` is appended to `document.head` and removed through `this.register(() => style.remove())`.
  - Click handler (`this.registerDomEvent(document, 'click', handler)`): in Reading mode any table click opens a `TableModal`; in Live Preview (desktop only) `Ctrl+click` does. Clicks on `a`, `input`, `button`, and `label` are ignored.
  - `TableModal` clones the `<table>` (`cloneNode(true)`) into a scrollable `div.sticky-table-scroll-wrap`.
  - There is no settings tab, and `loadData()` / `saveData()` are not used.

### Verification

- There is no test suite. Edit `main.js` directly, reload Obsidian (or use the Hot Reload community plugin), and check the behavior in a vault.

## Common rules

### Branches and PRs

<!-- branch-model:begin -->
- The default branch is `main`. Work on a branch and open a PR into `main`.
- PRs are squash-merged. Each PR leaves a single commit on main, titled with the PR title only.
<!-- branch-model:end -->
- Write PR titles in Conventional Commits form (`feat: ...`, `fix: ...`, etc.) so the change is clear from one line.
- Merged branches are deleted automatically.

### Never put these in history or anything published

- Do not write email addresses, tokens, passwords, details of a personal environment, or links to AI agent sessions in commits, PRs, issues, or comments.
  - Work-branch commits and PRs stay on GitHub after merging, and even the owner cannot delete them. Rewriting main's history needs a force push and a request to GitHub Support. Only PR descriptions can be fixed later by editing.
- Commit with your GitHub noreply address (`<ID>+<username>@users.noreply.github.com`) as the author email.
- Do not commit `.env`, key files, or local settings (`.claude/settings.local.json`, etc.).

### Dependencies

- Only add or update to versions published at least 7 days ago. Hijacked or swapped releases are often discovered shortly after publication.
  - Dependabot version updates wait 7 days via `cooldown`. For npm, `min-release-age=7` in `.npmrc` applies the same limit to manual updates.
- Pin GitHub Actions to a full 40-character commit SHA and keep the version as a trailing comment (e.g. `actions/checkout@<SHA> # v7.0.1`). Tags can be moved.
- Treat Dependabot PRs as a signal that updates exist. Merge them once CI passes, and for major updates, after reviewing the changes.
