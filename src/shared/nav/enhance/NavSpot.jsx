import { useEffect } from "react";
import content from "../content.json";

// Cursor spot (NAV-9), desktop only: a rainbow layer over the text and a white copy of
// the text row over that, both masked to the circle at --spot-x/--spot-y (radius
// --spot-r, 0 until the nav has data-spot). Decorative: hidden from assistive tech and
// from the pointer. The copy mirrors the row's markup so its text lands exactly on the
// real text.
// The effect runs only with a fine, hover-capable pointer wider than narrow (the spot
// layers are display: none elsewhere). Mouse pointers only. Position is set straight on
// the nav, at most once per frame, with no React render per move.
export default function NavSpot({ navRef }) {
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
  }, [navRef]);

  return (
    <>
      <span className="nav__spot" aria-hidden="true" />
      <span className="nav__ghost" aria-hidden="true">
        <span className="nav__link nav__name">{content.name.label}</span>
        <span className="nav__menu">
          {content.sections.map((s) => (
            <span key={s.href}>
              <span className="nav__link">{s.label}</span>
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
