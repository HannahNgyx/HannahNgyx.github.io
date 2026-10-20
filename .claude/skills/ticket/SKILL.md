---
name: ticket
description: Build one approved GitHub issue end to end — branch, designer and/or motion-engineer, tester loop, PR into epic — then stop for Hannah's review.
disable-model-invocation: true
argument-hint: <issue number>
---

# /ticket $ARGUMENTS

Issue number: `$ARGUMENTS`. If it is missing or not a number, ask for it and stop.

## 1. Read and gate
- `gh issue view $ARGUMENTS --comments --json number,title,body,labels,state,comments`
- **Stop** if the issue is closed, or labelled `proposed` (not approved yet) or `needs-answer` (open questions). Tell Hannah which label is blocking and what to do.
- Read Hannah's comments: answers to questions and any changes she asked for override the issue body.
- Owner = the `designer` / `motion-engineer` label, or the "Owner" section. If both, designer goes first.

## 2. Branch
- `git status --porcelain`. If there are uncommitted changes, **stop**: list the files and ask Hannah whether to stash or commit them. Never mix her work into a ticket.
- `git fetch origin` then `git switch -c ticket-$ARGUMENTS origin/epic` (if the branch exists, `git switch ticket-$ARGUMENTS` and continue from it).

## 3. Build
Launch the owner agent(s) with the Agent tool (`subagent_type: "designer"` / `"motion-engineer"`). Give each: the issue number, title, full body, Hannah's comments, and "stay in this ticket's scope". Designer first; then motion-engineer with a note of what the designer changed and which hooks they left.

## 4. Test (max 3 rounds)
Launch the **tester** agent with the issue number, body, comments, and the output folder `qa/ticket-$ARGUMENTS/`.
- **PASS** → go to 5.
- **FAIL** → group the failure rows by owner and send each owner its rows (new Agent call with the issue + rows). Then run the tester again. That is one round.
- After **3 failing rounds**:
  1. `git add` only the files changed for this ticket (+ `qa/ticket-$ARGUMENTS/`), commit `WIP #$ARGUMENTS: <title> (blocked)`, `git push -u origin ticket-$ARGUMENTS`.
  2. `gh issue comment $ARGUMENTS` with the last FAIL table and one line per failure on what was tried.
  3. `gh issue edit $ARGUMENTS --add-label blocked`.
  4. Stop and tell Hannah.

## 5. Ship (on PASS)
1. `git status` and stage **only** files this ticket changed plus `qa/ticket-$ARGUMENTS/` — never `git add -A` or `git add .`.
2. Commit: `#$ARGUMENTS <title>` with a short body.
3. `git push -u origin ticket-$ARGUMENTS`
4. `gh pr create --base epic --head ticket-$ARGUMENTS --title "<title>" --body-file -` with a body that **starts** with `Closes #$ARGUMENTS`, then:
   - **SPEC changed:** each ID (added / changed / removed) with the new wording
   - **What changed:** short bullets per owner
   - **Screenshots:** links to the files in `qa/ticket-$ARGUMENTS/` (at least the 1440 and 390 `-top` shots)
   - **Checked in code:** hover / focus / cursor effects the tester verified by reading code
   - **Follow-ups:** anything out of scope that was noticed
5. `gh issue edit $ARGUMENTS --add-label needs-review`
6. `gh issue comment $ARGUMENTS` with exactly three lines: what changed · tester result and widths · PR link.
7. Stop. Never merge, never close the issue, never push to `epic` or `main`.
