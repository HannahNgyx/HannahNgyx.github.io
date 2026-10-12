import { T, useGT } from "gt-react";

export function Projects() {
  const t = useGT();

  return (
    <section className="sheet band" id="projects" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><T>Projects</T></p>
          <h2 id="work-title"><T>A few things I have made</T></h2>
        </div>
        <p className="section-note"><T>A mix of practical tools, playful experiments, and projects still teaching me something.</T></p>
      </div>
      <div className="filters" role="group" aria-label={t("Filter projects")}>
        <button className="filter-button is-active" type="button" data-filter="all" aria-pressed="true"><T>All work</T></button>
        <button className="filter-button" type="button" data-filter="care"><T>Care + people</T></button>
        <button className="filter-button" type="button" data-filter="play"><T>Playful tools</T></button>
        <button className="filter-button" type="button" data-filter="data"><T>Data + web</T></button>
      </div>
      <div className="project-grid">
        <article className="project project-lead" data-category="care">
          <div className="project-topline"><span className="project-number">01</span><span className="tag"><T>Care + people</T></span></div>
          <h3>TraumaLink</h3>
          <p className="project-lede"><T>A live handoff that lets emergency teams share the right information before the patient arrives.</T></p>
          <ul className="project-details"><li><T>Next.js + WebSockets</T></li><li><T>Medplum FHIR + Deepgram</T></li><li><T>Voice and text input</T></li></ul>
          <a className="project-link" href="https://github.com/HannahNgyx/handoff-zero"><T>Explore project</T></a>
        </article>
        <article className="project" data-category="play">
          <div className="project-topline"><span className="project-number">02</span><span className="tag"><T>Playful tools</T></span></div>
          <h3>Doraemon Desktop</h3>
          <p className="project-lede"><T>A tiny Windows companion who walks across your screen and remembers to remind you to drink water.</T></p>
          <ul className="project-details"><li><T>Electron for Windows</T></li><li><T>Local-first settings</T></li><li><T>Tray shortcuts + streaks</T></li></ul>
          <a className="project-link" href="https://github.com/HannahNgyx/neko-window"><T>Explore project</T></a>
        </article>
        <article className="project" data-category="data">
          <div className="project-topline"><span className="project-number">03</span><span className="tag"><T>Data + web</T></span></div>
          <h3>AI Whale Watch</h3>
          <p className="project-lede"><T>A clear little dashboard for following large Ethereum transfers without losing the thread.</T></p>
          <ul className="project-details"><li><T>FastAPI + static HTML</T></li><li><T>Wallet flow heuristics</T></li><li><T>Text and CSV export</T></li></ul>
          <a className="project-link" href="https://github.com/HannahNgyx/whale-tracker"><T>Explore project</T></a>
        </article>
        <article className="project" data-category="data">
          <div className="project-topline"><span className="project-number">04</span><span className="tag"><T>Data + web</T></span></div>
          <h3>News Organizer</h3>
          <p className="project-lede"><T>A starting point for a personal news and documents assistant that keeps the signal close.</T></p>
          <ul className="project-details"><li><T>FastAPI health check</T></li><li><T>Docker Compose layout</T></li></ul>
          <a className="project-link" href="https://github.com/HannahNgyx/news-organizer"><T>Explore project</T></a>
        </article>
        <article className="project" data-category="play">
          <div className="project-topline"><span className="project-number">05</span><span className="tag"><T>Playful tools</T></span></div>
          <h3>Concurrent Web Crawler</h3>
          <p className="project-lede"><T>A learning project: starting with one careful crawler, then making room for concurrency.</T></p>
          <ul className="project-details"><li>Python</li><li><T>Sequential to concurrent</T></li></ul>
          <a className="project-link" href="https://github.com/HannahNgyx/concurrent-web-crawler"><T>Explore project</T></a>
        </article>
      </div>
      <p className="empty-state" hidden><T>No projects in this corner yet. Try another filter.</T></p>
    </section>
  );
}
