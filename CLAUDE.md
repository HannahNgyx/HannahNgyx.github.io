# Hannah Nguyen — portfolio site (rebuild)

A from-scratch rebuild of Hannah's portfolio. It starts as a blank page; every change arrives as a ticket built from one of Hannah's sketches. The old site has its own look and code. Don't copy it unless a ticket says to.

## Stack
- Vite 8 + React 19, plain JSX (no TypeScript), ES modules.
- Styles: `src/style.css` (plain CSS, design tokens on `:root` as tickets define them). Add CSS modules, Tailwind or anything else only if a ticket asks.
- No test runner or linter. Visual QA is screenshots (see `.claude/skills/visual-qa`).
- English only for now. The translated old site lives on `feat/gt-locales`.

## Commands
- `npm run dev` — dev server on http://localhost:5173
- `npm run build` — production build into `dist/`
- `npm run qa:shots -- --out qa/ticket-<n>` — screenshots at 1440/1024/768/390, normal + reduced motion

## Where things live
- `index.html` — `<head>` (title, meta, font links) and the root div
- `src/main.jsx` → `src/App.jsx` — boot and page structure. Put components in `src/components/<Name>.jsx`.
- `src/style.css` — global styles and tokens
- `images/` — photos and artwork from the old site, available to reuse: `portrait.jpg`, `photo-1.jpg`, `photo-2.jpg`, `pond.jpg`, `hero-room.png`, and project shots (`trauma-link.png`, `desktop-companion.png`, `whale-watch.png`, `news-organizer.png`, `web-crawler.png`). Import them in JSX (`import portrait from "../images/portrait.jpg"`) so Vite bundles them.
- `Hannah_Nguyen_resume_2026.pdf` — the resume. Link it with `import resume from "../Hannah_Nguyen_resume_2026.pdf?url"`.
- `SPEC.md` — the site as numbered, testable rules (GLOBAL-1, HERO-1…). Changes to the site start as changes to SPEC.
- `design/inbox/` sketches waiting · `design/done/` processed · `design/reference/` style references
- `qa/ticket-<n>/` — committed screenshots per ticket · `qa/scratch/` — throwaway (gitignored)

## Branches
- `epic` is the rebuild's working branch and the repo's default branch. Ticket branches (`ticket-<n>`) come off `epic` and PRs go back into `epic`. When the rebuild is done, Hannah replaces `main` with it.
- `main` is the old static site that GitHub Pages serves. Do not touch it.
- `feat/gt-locales` is the old site ported to React with translations. Treat it as reference only.

## The team (`.claude/agents/`)
| Agent | Does | Never |
|---|---|---|
| art-director | Turns sketches in `design/inbox/` into small GitHub issues labelled `proposed` | Edits site code |
| designer | Layout, type, colour, spacing, responsive, accessibility; updates SPEC first | Writes animations |
| motion-engineer | Transitions, keyframes, hover, cursor effects, open/close behaviour | Changes layout, colour or copy |
| tester | Screenshots + checks acceptance checks and SPEC; PASS or FAIL table | Edits code |

Flow: `/sketch` → Hannah approves (removes `proposed`, answers `needs-answer`) → `/ticket <n>` → Hannah reviews and merges.

## Hard rules for every agent
- Never merge a PR. Never close an issue. Never push to `main` or `epic`; push only `ticket-<n>` branches.
- Stay inside the ticket's scope. No drive-by refactors, renames or "while I'm here" fixes; note them in the PR instead.
- Never guess an answer to a question meant for Hannah; ask and stop.
