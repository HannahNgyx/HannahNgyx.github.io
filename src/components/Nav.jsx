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
            <li key={s.href}>
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
      </nav>
    </header>
  );
}
