import { useEffect } from "react";
import { T } from "gt-react";
import pondUrl from "../images/pond.jpg";
import { DocumentLocale } from "./DocumentLocale.jsx";
import { startPage } from "./page.js";
import { About } from "./components/About.jsx";
import { Colophon } from "./components/Colophon.jsx";
import { Contact } from "./components/Contact.jsx";
import { Hero } from "./components/Hero.jsx";
import { Nav } from "./components/Nav.jsx";
import { Notes } from "./components/Notes.jsx";
import { Projects } from "./components/Projects.jsx";
import { Spread } from "./components/Spread.jsx";
import { Viewer } from "./components/Viewer.jsx";
import { Work } from "./components/Work.jsx";

export default function App() {
  useEffect(() => startPage(pondUrl), []);

  return (
    <>
      <DocumentLocale />
      <a className="skip" href="#main"><T>Skip to content</T></a>
      <Nav />
      <main id="main">
        <Hero />
        <Spread />
        <About />
        <Work />
        <Projects />
        <Notes />
        <Contact />
      </main>
      <Colophon />
      <Viewer />
    </>
  );
}
