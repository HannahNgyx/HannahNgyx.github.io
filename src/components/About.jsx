import { T, Var } from "gt-react";

export function About() {
  return (
    <section className="sheet" id="about" aria-labelledby="about-title">
      <div className="margin-note">
        <p className="scribble"><T>a note to self</T></p>
        <svg className="arrow" viewBox="0 0 90 36" aria-hidden="true">
          <path d="M4 26 C 28 30, 48 8, 82 12" fill="none" stroke="#824A54" strokeWidth="1.3" />
          <path d="M72 6 L84 12 L70 18" fill="none" stroke="#824A54" strokeWidth="1.3" />
        </svg>
      </div>
      <div>
        <p className="eyebrow"><T>About</T></p>
        <h2 id="about-title"><T>Good software should feel like a thoughtful room.</T></h2>
        <div className="about-copy">
          <p><T>I care about the space between the technical and the human: the quiet details that make something easier to understand, more comfortable to use, or simply a little more delightful.</T></p>
          <p>
            <T>
              I studied computer science at <Var name="school">the University of Michigan</Var>. These days I work in Python, TypeScript, React, Flask, and the databases and cloud tools that keep a product standing up.
            </T>
          </p>
          <a className="text-link" href="https://github.com/HannahNgyx">GitHub</a>
        </div>
      </div>
    </section>
  );
}
