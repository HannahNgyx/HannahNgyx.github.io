import { T } from "gt-react";
import resumePdf from "../../Hannah_Nguyen_resume_2026.pdf?url";

export function Contact() {
  return (
    <section className="sheet band" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><T>Contact</T></p>
          <h2 id="contact-title"><T>Leave a note</T></h2>
        </div>
        <p className="section-note"><T>Roles, collaborations, or a project you cannot stop thinking about.</T></p>
      </div>
      <ul className="contact-list">
        <li>
          <span className="contact-label"><T>Email</T></span>
          <a href="mailto:nguyenhanh.ac812@gmail.com">nguyenhanh.ac812@gmail.com</a>
        </li>
        <li>
          <span className="contact-label">GitHub</span>
          <a href="https://github.com/HannahNgyx">github.com/HannahNgyx</a>
        </li>
        <li>
          <span className="contact-label"><T>Resume</T></span>
          <a href={resumePdf}>Hannah_Nguyen_resume_2026.pdf</a>
        </li>
      </ul>
    </section>
  );
}
