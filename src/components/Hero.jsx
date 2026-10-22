import cutout from "../../images/hannah-cutout.png";
import resume from "../../Hannah_Nguyen_resume_2026.pdf?url";
import ProjectVideos from "./ProjectVideos.jsx";

const companies = [
  { name: "Tarmac.IO", href: "https://tarmac.io" },
  { name: "Azimuthsemi.com", href: "https://azimuthsemi.com" },
  { name: "Zyro", href: "https://thezyro.com/" },
  { name: "MiTek", href: "https://www.mitek-us.com" },
];

// Dotted drawing traced from hannah-cutout.png (same 600×800 box): her outer silhouette
// (alpha channel, Gaussian σ 1.5, simplified at 0.6px, closed) plus the edge of her skin
// (face, arm and hand; colour-segmented, σ 2.5) as open runs, dropped wherever it lies
// within 6px of the outer edge so no line is doubled.
const silhouette =
  "M390 799l-196 0 0-5 0-6-1-18-8-34-2-26 3-11 7-20 0-11 1-16 2-16 1-15 4-12 4-9-1-11 5-13 3-16 2-5-1-3-16-26-21-27-10-10-9-7-13-4-2 1-2 4-2 2-8 1-8 0-25 1-3 0-3-3-31-95-4-8-2-8-15-47-6-16 1-2 3-3 12-3 25-10 7-1 10-1 20-5 7 0 2 3 12 33 16 47 2 2 14 9 16 14 6 8 13 28 6 9 10 10 6 2 5-1 19-25 9-8 11-18 13-10 7-8 15-15 3-5 2-11 5-12 5-7 16-11 3-12 2-14 0-3-2-2-12-4-10-6-5-9-4-16-1-11-3-14-5-29 0-18 1-14-5-37 0-17 3-12 6-9 6-6 7-6 20-19 10-6 16-7 18-7 11-8 11-3 43 14 19 11 10 9 9 7 5 1 6 1 5 2 15 13 6 6 5 5 6 7 3 2 7 2 3 2 8 12 12 11 1 3-1 4-5 7-3 8-3 3-13 6-14 9-20 3-9 5-6 2-3 2 0 11 1 11 1 29-2 5-2 0-5-2-5 2-1 3-2 20-2 3-2 0-1-2-1-20-2-2-2 0-12 0-3 1-5 7-4 14-1 10 1 11 4 12 14 34 1 6 0 7 1 8 3 8 1 5-3 9-2 16-4 11-1 10-2 6 1 4-4 12-1 7 0 7-1 5-7 16-6 19-10 23-2 12-2 8-4 7-4 5-7 14-2 21-2 2-4 0-2 1-2 3-1 6 4 14-1 5-4 13 0 8-1 15 0 12 1 18 14 38 2 8 0 9 0 6 0 13-1 12-3 14-6 15zM136 475l-27-10-12-20-11-13-2-7 1-9-3-8 3-9 9-12 4-14 6-8 4 0 16 7 15 4 4 0 3-1M225 456l0 12 4 15 4 3 4 1 4-2 4-5 5 1 1 3-1 6 1 7-1 8 3 3 5 0 6-12 1-8 6-5 3-6 3-1 9 1 3-1 2-3 1-14 0-7 2-14-4-17-1-10 3-12 9-20 1-7M300 155l3-6-3-19 1-4 2-2 7-4 5-10 11-13 6-5 5-2 8 2 6 0 3 1 5 10 8 40-2 5-13 2-3 2-3 4 0 4 2 3 10 4 0 3-4 7 1 3 2 3 18 8 22-6 6 1 18 10 6 10 4 2 9-1 8 2 6-1 4-2 3-8 3-2 8 4 3 2-1 4-11 12-20 18-7 5-3 9M442 324l-19-12-17-5-8-1-10 2-5 2-2 3 0 3 1 3 15 9 6 6 6 9 12 27 2 10 0 11-3 19-9 34-6 14-10 13-4 12-8 80-4 26-5 19-5 16-12 18-8 8-5 3-36-5-7-7-9-4-5-6-19-9-8-7-7-3-1-3 1-6-1-4-20-18-14-20";

export default function Hero() {
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
          <span className="hero__hint" aria-hidden="true">Hover to<br />see me</span>
          <img
            className="hero__photo"
            src={cutout}
            width="600"
            height="800"
            alt="Hannah Nguyen"
          />
        </div>
        {/* One block so the h1's big first letter (desktop) can drop beside the subtitle too */}
        <div className="hero__text">
          <h1 id="hero-title" className="hero__title">Hey, I’m Hannah</h1>
          <p className="hero__lead">
            Full-stack software engineer with experience shipping alongside stakeholders
          </p>
        </div>
        <div className="hero__actions">
          <a className="button button--solid" href={resume}>My resume</a>
          <a className="button button--outline" href="#contact">Contact me</a>
        </div>
        <p className="hero__worked">
          <span className="hero__worked-label">I worked at:</span>{" "}
          {companies.map((c, i) => (
            <span key={c.name}>
              {/* HERO-9: the rainbow copy is aria-hidden, so the link's name is read once */}
              <a className="hero__company" href={c.href} data-rainbow>
                <span className="hero__company-name">{c.name}</span>
                <span className="hero__company-rainbow" aria-hidden="true">{c.name}</span>
              </a>
              {i < companies.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
      <ProjectVideos />
    </section>
  );
}
