---
name: sketch-guide
description: How to read Hannah's Goodnotes sketches — ink colours, page labels, marks and symbols — and what to do with anything unclear. Use whenever reading a sketch or design note.
---

# Reading Hannah's sketches

Sketches come from Goodnotes on an iPad as PNG, JPG or PDF in `design/inbox/`. Read PDFs page by page. Each page is read on its own unless it says it continues.

## Ink colours
| Ink | Means | How to treat it |
|---|---|---|
| **Black** | Layout and content: boxes, text, positions, what goes where | What the page should look like |
| **Red** | Behaviour and notes | Instructions. Do them. |
| **Blue** | Questions and exact values | Values (sizes, colours, timings, copy in quotes) are instructions: use them exactly. Questions go to Hannah. **Never guess an answer to a blue question.** |

If ink colour is ambiguous (dark red vs black, faded blue), say which reading you took, and if it changes the result, ask.

## Page label = screen size
- A label at the top of the page (e.g. "390", "phone", "768", "tablet", "1440", "desktop") says which width the sketch is for. Map: phone → 390, tablet → 768, laptop → 1024, desktop → 1440.
- **No label = desktop (1440).** Other widths keep their current behaviour unless a note says otherwise; propose sensible responsive values and list them under "Values I chose".

## Drawing on a screenshot
When the sketch is drawn over a screenshot of the site, **only the marked parts change.** Everything unmarked stays as it is in SPEC.

## Marks and symbols
| Mark | Means |
|---|---|
| **Arrow** | Attaches a note to the thing the arrow touches. The note applies to that element only. |
| **Behaviour note** | Read as *trigger → what happens → how much* (e.g. "hover → card lifts → 4px"). If one of the three is missing, fill it from the motion skill's house pace and list it under "Values I chose", unless it's in blue as a question. |
| **X** over something | Remove it. |
| **Two circles joined with "="** | Make those two things the same (size, style, spacing, whatever is visibly shared). Say which properties you'll match. |
| **Wavy underline** | Same content, nicer styling. Don't change the words. |
| **"ref:" + link or image** | Style reference. Take the feeling (spacing, rhythm, type contrast, motion character), **never copy the artwork**, images, logos or exact layout. Save local reference images in `design/reference/`. |
| **Circled numbers** ①②③ | Separate notes. Each one is tracked on its own and cited by number in tickets (e.g. "sketch-2026-10-20.png ②"). |

## Text in sketches
- Words in quotes, or clearly written as content, are the exact copy. Keep spelling and capitalisation unless it's an obvious slip; flag any fix you make.
- New copy goes in English; translations are generated later.

## When unsure
- **Unreadable** handwriting or marks: quote it as best you can, e.g. `"move the ??? (looks like 'stamp' or 'stump') left"`, and ask. Don't build on a guess.
- **Conflicts** between the sketch and SPEC: the sketch wins for what it marks, but say which SPEC IDs change.
- **Conflicts** with the design-system rules (e.g. a sketch that needs a 30px button): follow the rule, note the conflict, and ask if it matters.
