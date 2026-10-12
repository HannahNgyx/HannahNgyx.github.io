import { T, Var } from "gt-react";
import resumePdf from "../../Hannah_Nguyen_resume_2026.pdf?url";

export function Notes() {
  return (
    <section className="sheet" id="notes" aria-labelledby="notes-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><T>Notes</T></p>
          <h2 id="notes-title"><T>Written in the margin</T></h2>
        </div>
        <p className="section-note"><T>The same interests, kept where a journal would keep them.</T></p>
      </div>
      <ul className="scraps">
        <li><T>Interfaces that listen</T></li>
        <li><T>Digital companions</T></li>
        <li><T>Small useful magic</T></li>
      </ul>
      <article className="postcard">
        <svg className="clip" viewBox="0 0 36 64" aria-hidden="true">
          <path d="M24 6c0-5-11-5-11 2v36c0 7 14 7 14 0V20c0-3.5-7-3.5-7 0v18" fill="none" stroke="#8aa0b8" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <p className="eyebrow"><T>Resume</T></p>
        <h3><T>The short version, on paper</T></h3>
        <p className="project-lede"><T>One page, print ready. The long version is the work above.</T></p>
        <ul className="resume-highlights">
          <li>
            <strong><T>Now</T></strong>{" "}
            <T>
              Software Developer at <Var name="azimuth">Azimuth Industrial Co.</Var> and <Var name="tarmac">Tarmac.IO</Var>.
            </T>
          </li>
          <li>
            <strong><T>Before</T></strong>{" "}
            <T>
              Founding Engineer at <Var name="zyro">Zyro</Var>, systems integration research at <Var name="mitek">MiTek</Var>.
            </T>
          </li>
          <li>
            <strong><T>Shipping</T></strong>{" "}
            <T>RFQ workflow platforms, scheduling and ledger tools, an on-premise AI knowledge platform.</T>
          </li>
        </ul>
        <a className="button" href={resumePdf}><T>Open the PDF</T></a>
      </article>
    </section>
  );
}
