import { LocaleSelector, T, useGT } from "gt-react";
import { selectorLocales } from "../locales.js";

export function Nav() {
  const t = useGT();

  return (
    <header className="site-nav" id="top">
      <a className="wordmark" href="#top">Hannah Nguyen</a>
      <nav className="nav-links" aria-label={t("Sections")}>
        <a href="#about"><T>About</T></a>
        <a href="#work"><T>Work</T></a>
        <a href="#projects"><T>Projects</T></a>
        <a href="#notes"><T>Notes</T></a>
        <a href="#contact"><T>Contact</T></a>
      </nav>
      <div className="bar-end">
        <LocaleSelector className="locale-switch" locales={selectorLocales} />
        <p className="issue bar-issue"><T>Vol. 01 — 2026</T></p>
      </div>
      <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="contents">
        <T>Contents</T>
      </button>
      <div className="contents-note" id="contents">
        <p className="scribble"><T>contents</T></p>
        <nav aria-label={t("Contents")}>
          <a href="#about"><span><T>About</T></span><span className="leader"></span><span>01</span></a>
          <a href="#work"><span><T>Work</T></span><span className="leader"></span><span>02</span></a>
          <a href="#projects"><span><T>Projects</T></span><span className="leader"></span><span>03</span></a>
          <a href="#notes"><span><T>Notes</T></span><span className="leader"></span><span>04</span></a>
          <a href="#contact"><span><T>Contact</T></span><span className="leader"></span><span>05</span></a>
        </nav>
        <p className="issue"><T>Vol. 01 — 2026</T></p>
      </div>
    </header>
  );
}
