---
name: visual-qa
description: How to start this repo's dev server and take Playwright screenshots at 1440/1024/768/390 in normal and reduced motion, with horizontal-overflow warnings. Use for any visual check of the site.
---

# Visual QA

## One command
```
npm run qa:shots -- --out qa/ticket-<n>
```
`scripts/qa-screenshots.mjs` starts its own Vite dev server (port 5173, or the next free port), takes the shots, and shuts it down. There's no need to run `npm run dev` first.

Options:
- `--out <dir>` — where to write. Use `qa/ticket-<n>/` for ticket evidence (committed) and `qa/scratch/` for throwaway runs (gitignored).
- `--path /some/page` — shoot a page other than `/`.
- `--url http://localhost:5173` — use an already-running server instead.

## What you get
For each width in 1440, 1024, 768, 390 and each motion setting `normal` / `reduce`:
- `<w>-<motion>-top.jpg` — the first screen only (what you see on load)
- `<w>-<motion>.jpg` — the full page
- `report.json` — the list of shots and any overflow warnings

Overflow: the script lists every element whose box extends past the viewport (`WARN horizontal overflow at 390px…`), including content a parent clips with `overflow-x: hidden`. Any warning fails GLOBAL-3 unless the element is meant to be off screen (for example a skip link parked above the page).

## Looking at shots
All shots are JPEG to keep committed folders small. Read them with the Read tool. Full-page shots of long pages get scaled down, so judge layout from them and detail from the `-top` shots.

## States screenshots can't show
Hover, focus, cursor effects and open/close states don't appear in these shots. Check them in code (`:hover` / `:focus-visible` rules in CSS, event handlers and effects in the components) and say in the report that you checked them in code.

## Windows note
On this machine company policy blocks running Playwright's own Chromium from AppData, so the script falls back to installed Chrome and then Edge. If launching fails in a sandboxed shell with `spawn EPERM`, the shell is blocking the browser from starting; rerun the command outside the sandbox.

## Setup (already done)
`@playwright/test` is a dev dependency. On a new machine: `npm install`, then `npx playwright install chromium` (optional here, because of the fallback above).
