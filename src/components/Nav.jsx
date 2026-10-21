import { useEffect, useRef, useState } from "react";

const sections = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Endorsements", href: "#endorsements" },
  { label: "Contact", href: "#contact" },
];

// The pill nav (NAV-1..6). Wide screens show the four section links in the pill; narrow
// screens (max-width 30rem) show a Menu button that opens them in a pop-up. The open state
// lives on the nav as [data-open]; the CSS only uses it when narrow.
// Desktop cursor spot (NAV-9): the nav carries --spot-x / --spot-y (px from its top-left)
// and shows the spot while it has [data-spot]; motion drives both.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  // Close and hand focus back to the Menu button. preventScroll so choosing a link
  // still lands on its section instead of jumping back to the top.
  function close() {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }

  // Going from narrow to wide closes the menu without moving focus, so it doesn't
  // reappear open when the window is narrowed again.
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 30rem)");
    function onChange(event) {
      if (!event.matches) setOpen(false);
    }
    narrow.addEventListener("change", onChange);
    return () => narrow.removeEventListener("change", onChange);
  }, []);

  // Cursor spot (NAV-9): only with a fine, hover-capable pointer wider than narrow
  // (the spot layers are display: none elsewhere). Mouse pointers only. Position is set
  // straight on the element, at most once per frame, with no React render per move.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (width > 30rem)",
    );
    let frame = 0;
    let x = 0;
    let y = 0;

    function place() {
      frame = 0;
      nav.style.setProperty("--spot-x", `${x}px`);
      nav.style.setProperty("--spot-y", `${y}px`);
    }
    function read(event) {
      const rect = nav.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }
    function onEnter(event) {
      if (event.pointerType !== "mouse") return;
      read(event);
      if (frame) cancelAnimationFrame(frame);
      place(); // at once, so the circle opens where the pointer is
      nav.setAttribute("data-spot", "");
    }
    function onMove(event) {
      if (event.pointerType !== "mouse") return;
      // Already over the nav when listening started: open the spot like an enter
      if (!nav.hasAttribute("data-spot")) return onEnter(event);
      read(event);
      if (!frame) frame = requestAnimationFrame(place);
    }
    function onLeave(event) {
      if (event.pointerType !== "mouse") return;
      nav.removeAttribute("data-spot");
    }
    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      nav.removeEventListener("pointerenter", onEnter);
      nav.removeEventListener("pointermove", onMove);
      nav.removeEventListener("pointerleave", onLeave);
      nav.removeAttribute("data-spot");
      nav.style.removeProperty("--spot-x");
      nav.style.removeProperty("--spot-y");
    }
    function start() {
      const opts = { passive: true };
      nav.addEventListener("pointerenter", onEnter, opts);
      nav.addEventListener("pointermove", onMove, opts);
      nav.addEventListener("pointerleave", onLeave, opts);
    }
    function sync() {
      stop();
      if (desktop.matches) start();
    }

    sync();
    desktop.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      stop();
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") close();
    }
    function onClick(event) {
      if (!navRef.current?.contains(event.target)) close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="site-header">
      <nav
        ref={navRef}
        className="nav"
        aria-label="Main"
        data-open={open ? "" : undefined}
      >
        <a className="nav__link nav__name" href="#main">Hannah Nguyen</a>
        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          Menu
        </button>
        <ul className="nav__menu" id="nav-menu">
          {sections.map((s) => (
            <li
              key={s.href}
              className={s.href === "#contact" ? "nav__item--contact" : undefined}
            >
              <a
                className="nav__link"
                href={s.href}
                onClick={() => {
                  if (open) close();
                }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Cursor spot (NAV-9), desktop only: a rainbow layer over the text and a white
            copy of the text row over that, both masked to the circle at --spot-x/--spot-y
            (radius --spot-r, 0 until the nav has data-spot). Decorative: hidden from
            assistive tech and from the pointer. The copy mirrors the row's markup so its
            text lands exactly on the real text. */}
        <span className="nav__spot" aria-hidden="true" />
        <span className="nav__ghost" aria-hidden="true">
          <span className="nav__link nav__name">Hannah Nguyen</span>
          <span className="nav__menu">
            {sections.map((s) => (
              <span key={s.href}>
                <span className="nav__link">{s.label}</span>
              </span>
            ))}
          </span>
        </span>
      </nav>
    </header>
  );
}
