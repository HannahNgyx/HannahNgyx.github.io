import cutout from "./assets/hannah-cutout.png";
import resume from "../../../../Hannah_Nguyen_resume_2026.pdf?url";
import content from "./content.json";
import { silhouette } from "./silhouette.js";
import ProjectVideos from "./ProjectVideos.jsx";
import "./hero.css";

export default function Hero() {
  const { figure, actions, worked } = content;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__group">
        <div className="hero__figure" data-photo-reveal>
          <svg
            className="hero__outline"
            viewBox="0 0 600 800"
            aria-hidden="true"
            focusable="false"
          >
            <path d={silhouette} />
          </svg>
          <span className="hero__hint" aria-hidden="true">
            {figure.hint[0]}<br />{figure.hint[1]}
          </span>
          <img
            className="hero__photo"
            src={cutout}
            width="600"
            height="800"
            alt={figure.alt}
          />
        </div>
        {/* One block so the h1's big first letter (desktop) can drop beside the subtitle too */}
        <div className="hero__text">
          <h1 id="hero-title" className="hero__title">{content.title}</h1>
          <p className="hero__lead">{content.lead}</p>
        </div>
        <div className="hero__actions">
          <a className="button button--solid" href={resume}>{actions.resume}</a>
          <a className="button button--outline" href={actions.contact.href}>{actions.contact.label}</a>
        </div>
        <p className="hero__worked">
          <span className="hero__worked-label">{worked.label}</span>{" "}
          {worked.companies.map((c, i) => (
            <span key={c.name}>
              {/* HERO-9: the rainbow copy is aria-hidden, so the link's name is read once.
                  Base keeps it hidden; enhance shows it on hover and focus. */}
              <a className="hero__company" href={c.href} data-rainbow>
                <span className="hero__company-name">{c.name}</span>
                <span className="hero__company-rainbow" aria-hidden="true">{c.name}</span>
              </a>
              {i < worked.companies.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
      <ProjectVideos />
    </section>
  );
}
