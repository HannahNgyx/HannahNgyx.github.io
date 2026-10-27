import { useRef } from "react";
import { Slot } from "../../../shared/Slot.jsx";
import content from "./content.json";

// VIDEO-1..5. Each card is one link; its accessible name is the project title.
// Video files are served from public/ as-is, so their paths are resolved against the base URL.
// Playback (VIDEO-5) is enhance work: enhance/VideoAutoplay.jsx, through the Slot. Without
// it the videos stay on their #t=0.1 frame (VIDEO-8).
export default function ProjectVideos() {
  const listRef = useRef(null);
  const { label, placeholder, projects } = content.videos;

  return (
    <>
      <ul className="videos" aria-label={label} ref={listRef}>
        {projects.map((p, i) => (
          <li key={i} className="videos__item">
            <a className="video-card" href={p.href} data-float>
              {p.video ? (
                <>
                  {/* Motion hook: [data-autoplay] plays it unless reduced motion (VIDEO-5).
                      #t=0.1 makes the browser seek and paint a frame while paused. */}
                  <video
                    className="video-card__video"
                    src={import.meta.env.BASE_URL + p.video + "#t=0.1"}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-autoplay
                    aria-hidden="true"
                  />
                  <span className="video-card__title video-card__title--hidden">{p.title}</span>
                </>
              ) : (
                <span className="video-card__placeholder">
                  <span aria-hidden="true">{placeholder.replace("{n}", i + 1)}</span>
                  <span className="video-card__title">{p.title}</span>
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      <Slot name="home/hero/videos" root={listRef} />
    </>
  );
}
