---
name: sketch
description: Turn every sketch in design/inbox/ into proposed GitHub issues using the art-director, then show Hannah the tickets and open questions.
disable-model-invocation: true
---

# /sketch

1. List the files in `design/inbox/` (`.png`, `.jpg`, `.jpeg`, `.pdf`; ignore `.gitkeep`). If there are none, say so and stop.
2. Make sure there are current screenshots to compare against: run `npm run qa:shots -- --out qa/scratch/current` (see the visual-qa skill) unless `qa/scratch/current/` was made in the last hour.
3. For each sketch file, launch the **art-director** agent (Agent tool, `subagent_type: "art-director"`) with:
   - the sketch path,
   - the screenshot folder `qa/scratch/current/`,
   - the instruction to follow its own process and return the list of issues it created.
   Run one agent per sketch. Independent sketches can run in parallel; pages of one PDF go to the same agent.
4. When all are done, show Hannah one summary:

   **Tickets**
   | # | Title | Owner | SPEC IDs | Sketch |
   |---|---|---|---|---|

   **Questions for Hannah** — every open question, grouped by issue number, quoted exactly as they appear in the issue. Mark which issues are blocked by them (`needs-answer`).

   **Values the art-director chose** — one line per issue, so Hannah can veto them.

5. End with how to approve: answer questions in the issue comments and remove `needs-answer`; remove `proposed` (or move the card to Ready) to approve; then run `/ticket <n>`.

Do not edit site code, create branches, or commit. The art-director moves processed sketches to `design/done/`; leave that change uncommitted for Hannah.
