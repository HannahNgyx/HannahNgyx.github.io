import { T, useGT } from "gt-react";
import portrait from "../../images/portrait.jpg";
import photo1 from "../../images/photo-1.jpg";
import photo2 from "../../images/photo-2.jpg";

export function Spread() {
  const t = useGT();

  return (
    <section className="spread-wrap" aria-label={t("Pictures")}>
      <div className="spread" dir="ltr">
        <figure className="photo-slot mat portrait">
          <span className="pin" aria-hidden="true"></span>
          <div className="frame">
            <img src={portrait} alt={t("Portrait of Hannah")} />
            <p className="slot-empty"><span><T>Your photo</T></span> images/portrait.jpg</p>
          </div>
          <figcaption className="slot-ready" dir="auto"><T>Portrait</T></figcaption>
        </figure>
        <figure className="photo-slot mat tilt-left">
          <span className="tape tape-pink" aria-hidden="true"></span>
          <div className="frame">
            <img src={photo1} alt={t("Hannah reflected in a window with a red curtain")} />
            <p className="slot-empty"><span><T>Your photo</T></span> images/photo-1.jpg</p>
          </div>
          <figcaption className="slot-ready" dir="auto"><T>Window</T></figcaption>
        </figure>
        <figure className="photo-slot mat tilt-right photo-b photocopy">
          <span className="tape tape-blue" aria-hidden="true"></span>
          <div className="frame">
            <img src={photo2} alt={t("Hannah walking a shaded path between houses")} />
            <p className="slot-empty"><span><T>Your photo</T></span> images/photo-2.jpg</p>
          </div>
          <figcaption className="slot-ready" dir="auto"><T>The path</T></figcaption>
        </figure>
        <aside className="clipping" dir="auto">
          <p className="eyebrow"><T>From the desk</T></p>
          <p><T>I care about the space between the technical and the human.</T></p>
        </aside>
        <div className="flower" aria-hidden="true">
          <svg viewBox="0 0 80 130" width="76" height="124">
            <path d="M42 58 C40 86 34 108 30 126" fill="none" stroke="#7d8a68" strokeWidth="1.3" />
            <ellipse cx="26" cy="92" rx="12" ry="5" transform="rotate(-36 26 92)" fill="#A8AE8C" opacity="0.85" />
            <ellipse cx="50" cy="78" rx="11" ry="4.5" transform="rotate(28 50 78)" fill="#8f9874" />
            <g fill="#F2CFD3" stroke="#824A54" strokeWidth="0.6">
              <ellipse cx="40" cy="28" rx="7" ry="12" />
              <ellipse cx="40" cy="28" rx="7" ry="12" transform="rotate(72 40 28)" />
              <ellipse cx="40" cy="28" rx="7" ry="12" transform="rotate(144 40 28)" />
              <ellipse cx="40" cy="28" rx="7" ry="12" transform="rotate(216 40 28)" />
              <ellipse cx="40" cy="28" rx="7" ry="12" transform="rotate(288 40 28)" />
            </g>
            <circle cx="40" cy="28" r="4.2" fill="#D99AA5" />
          </svg>
        </div>
        <p className="stamp" aria-hidden="true"><span>Vol. 01</span><span>2026</span></p>
      </div>
    </section>
  );
}
