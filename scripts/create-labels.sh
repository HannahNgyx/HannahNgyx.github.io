#!/usr/bin/env bash
# Creates (or updates) the labels the agent team uses. Safe to run again.
#   bash scripts/create-labels.sh
set -euo pipefail

label() { gh label create "$1" --color "$2" --description "$3" --force; }

label proposed        "D99AA5" "Art-director draft; Hannah has not approved it yet"
label needs-answer    "B8C7D9" "Has questions for Hannah; blocked until answered"
label needs-review    "824A54" "PR is open and passed QA; waiting for Hannah"
label blocked         "171514" "Failed QA 3 rounds; needs Hannah"
label designer        "A8AE8C" "Owner: designer (layout, type, colour, spacing, a11y)"
label motion-engineer "F2CFD3" "Owner: motion-engineer (transitions, hover, cursor, open/close)"
