# Repository registry (Modulate Design System)

Index of notable functional blocks for developer navigation. Add a short description here when introducing new blocks.

---

## Theme toggle

**Script:** `src/assets/js/theme-toggle.js`  
**Used in:** `src/includes/prototype-header.html` (toggle control), `src/includes/prototype-layout.html` (script tag).

Switches between light and dark theme in the prototype header. Keeps `body` class `dark-mode` in sync with `localStorage` key `prototype-theme` (`'light'` / `'dark'`). The initial theme is applied by a small inline script right after `<body>` in the prototype layout so the correct theme is set before first paint (avoids flash).

---

## UI structure visualizer

**Script:** `src/assets/js/ui-visualizer.js`  
**Page:** `src/ui.html` (UI Architecture).

Renders the UI architecture / structure from YAML. Loaded only on the UI page.

---

## Layouts: design system vs prototype

Two separate page wrappers:

- **Design system / docs:** `src/includes/layout.html` — full site chrome (header with nav, footer, shared styles and scripts). Used by the main site and documentation pages.
- **Prototype:** `src/includes/prototype-layout.html` — minimal shell for prototype pages: theme applied from `localStorage` before render, prototype header (icon + theme toggle), content block, theme-toggle script. No main nav/footer. Use this layout for standalone product/prototype screens so they can be taken and used independently.
