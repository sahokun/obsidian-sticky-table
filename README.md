# Sticky Table

An [Obsidian](https://obsidian.md) plugin that adds sticky headers to tables and lets you open any table in a scrollable popup modal. Works on desktop and mobile (`isDesktopOnly: false`).

## Features

- **Sticky table headers** — table header rows stay visible while scrolling vertically (Reading mode)
- **Scrollable popup modal** — click a table in Reading mode to open it in a large, horizontally-scrollable popup
- **Live Preview support (desktop)** — `Ctrl+click` a table in Live Preview to open the popup
- Mobile: sticky headers are supported; Live Preview popup is not available on mobile

## Installation

1. Download `main.js` and `manifest.json` from the latest release
2. Create the folder `<your vault>/.obsidian/plugins/obsidian-sticky-table/`
3. Copy both files into that folder
4. Reload Obsidian and enable the plugin under **Settings → Community plugins**

## Usage

| Context | Action | Result |
|---|---|---|
| Reading mode | Click a table | Opens scrollable popup |
| Live Preview (desktop) | `Ctrl+click` a table | Opens scrollable popup |
| Live Preview (mobile) | — | Not supported |

No configuration is required — the plugin works out of the box.

## License

MIT
