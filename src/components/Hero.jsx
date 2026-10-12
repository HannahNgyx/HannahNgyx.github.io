import { T, Var } from "gt-react";

export function Hero() {
  return (
    <section className="room" aria-labelledby="hero-title">
      <canvas className="field" aria-hidden="true"></canvas>
      <div className="pond-copy">
        <p className="eyebrow"><T>Software developer</T></p>
        <h1 id="hero-title">
          <T>Making useful things <em>with a little soul.</em></T>
        </h1>
        <p className="lede">
          <T>
            I am <Var name="name">Hannah</Var>, a developer who likes turning messy problems into calm, human tools. I work across web apps, desktop companions, and small experiments that make everyday life feel a bit more possible.
          </T>
        </p>
        <div className="hero-actions">
          <a className="button" href="#work"><T>The experience</T></a>
          <a className="text-link" href="#contact"><T>Say hello</T></a>
        </div>
      </div>
      <p className="signoff"><T>xoxo</T></p>
    </section>
  );
}
