# SPEC — the site as it is

Each rule has an ID, a statement and the widths it is checked at.
Widths: **1440, 1024, 768, 390**. "All" means all four. There are no breakpoints yet; record them here when a ticket adds one.

Rules describe what exists. To change the site, a ticket changes the rule text first (designer), then the code.
Sections get a short ID prefix when they first appear (NAV, HERO, WORK…). IDs are never reused: removed rules are struck through (`~~HERO-4~~ removed in #12`), and new rules take the next free number.

## GLOBAL
- **GLOBAL-1** The page is blank: a white background (`#fff`) and one `<main id="main">` holding an h1 "Hannah Nguyen" in the system sans-serif font (dark text `#111`, 2rem / 1rem padding). — All
- **GLOBAL-2** The document is English (`<html lang="en">`), titled "Hannah Nguyen", with a viewport meta tag. — All
- **GLOBAL-3** No horizontal scroll and no element extends past the viewport. — All
- **GLOBAL-4** There is exactly one h1. — All
