# Hannah Nguyen — portfolio site (rebuild)

Kit: hannah-web-kit 0.2.0
Preset: new

A from-scratch rebuild of Hannah's portfolio, built with Hannah's kit. The kit's commands and agents do the work; this file holds only what is particular to this site. Every change arrives as a ticket built from one of Hannah's sketches. The old site has its own look and code: don't copy it unless a ticket says to. Update the `Kit:` line only together with the pin in `.claude/settings.json` (see the kit README, "Update a site").

## Stack
- Vite 8 + React 19, plain JSX (no TypeScript), ES modules. Plain CSS; add CSS modules, Tailwind or anything else only if a ticket asks.
- Code by page and section: `src/pages/<page>/<section>/`, and `src/shared/` for what several sections use. Each section folder holds its components, its CSS, its words and data (`content.json`), and its `enhance/` folder. `SPEC.md` lists the sections and their folders. Today: one page, `home`, with one section, `hero` (which holds the project video cards); the nav is the shared part `shared/nav`.
- Two visual layers, declared in `src/layers.css`:
  - base, everything outside `enhance/` folders, is the safe, still fallback
  - each section's `enhance/` folder adds the rainbow, the motion and the nav's cursor spot

  `?enhance=off` shows base alone.
- English only for now. The translated old site lives on `feat/gt-locales`.

## Commands
Run each on its own, with no chains:
- `npm run dev` is Hannah's dev server on port 5173. Agents use their own ports from `design/site.json`.
- `npm run build` builds into `dist/`.
- `npm run qa:shots -- --out qa/ticket-<n> --as tester --enhance both` takes the screenshots.
- `npm run check:layers` checks the layer contract and the page/section structure.
- `sh scripts/encode-video.sh <input.mov> <n>` encodes a project video (see `public/videos/README.md`).

## Where things live
| What | Where |
|---|---|
| The site as numbered rules, tagged `[base]` or `[enhance]`, one heading per section | `SPEC.md` |
| A section's code, words and enhance layer | `src/pages/<page>/<section>/` |
| Site-wide words, tokens, global CSS, shared parts (the nav) | `src/shared/` |
| Style packs this site opts into | `design/STYLE.md` |
| Tokens and their contrast | `design/tokens.md` (values on `:root` in `src/shared/tokens.css`) |
| What moves, and motion tokens | `design/motion-table.md` |
| Widths and per-role ports | `design/site.json` |
| Sketches | `design/inbox/` waiting, `design/done/` processed, `design/reference/` style references |
| Committed screenshots per ticket | `qa/ticket-<n>/` (`qa/scratch/` is throwaway) |
| Project videos (served as-is) | `public/videos/project<n>.mp4` |
| The resume | `Hannah_Nguyen_resume_2026.pdf`, imported with `?url` |
| Photos and artwork from the old site, free to reuse | `images/`: `portrait.jpg`, `photo-1.jpg`, `photo-2.jpg`, `pond.jpg`, `hero-room.png`, and project shots (`trauma-link.png`, `desktop-companion.png`, `whale-watch.png`, `news-organizer.png`, `web-crawler.png`). A section that uses one moves it into its own `assets/` folder. |

## Branches
- `epic` is the rebuild's working branch and the repo's default branch. Ticket branches `ticket-<n>` come off `epic` and PRs go back into it. When the rebuild is done, Hannah replaces `main` with it.
- `main` is the old static site that GitHub Pages serves. Never push to `main` or `epic`.
- `feat/gt-locales` is the old site ported to React with translations. Treat it as reference only.

## Flow
1. `/sketch`
2. Hannah approves: removes `proposed`, answers `needs-answer`
3. `/ticket <n>`
4. Hannah reviews, merges and closes the issue

`/status` gives a summary. Rules: the kit's `house-rules` (precedence ladder, guardrails, design, motion, layer contract, structure).
