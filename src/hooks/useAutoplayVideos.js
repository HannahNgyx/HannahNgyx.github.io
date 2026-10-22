import { useEffect } from "react";

const REDUCE = "(prefers-reduced-motion: reduce)";

// VIDEO-5. Plays every video[data-autoplay] inside the ref'd element while it is
// on screen and reduced motion is off; otherwise pauses it where it is. The videos
// have no autoplay attribute, so under reduced motion they never start and keep
// showing the frame their src fragment (#t=0.1) loaded.
export default function useAutoplayVideos(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const videos = [...root.querySelectorAll("video[data-autoplay]")];
    if (videos.length === 0) return undefined;

    const reduce = window.matchMedia(REDUCE);
    const visible = new Set();

    const update = (video) => {
      if (!reduce.matches && visible.has(video)) {
        // Rejects if a pause() interrupts it or the browser refuses; neither matters here
        const p = video.play();
        if (p) p.catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };
    const updateAll = () => videos.forEach(update);

    let observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
          update(e.target);
        });
      });
      videos.forEach((v) => observer.observe(v));
    } else {
      videos.forEach((v) => visible.add(v));
      updateAll();
    }

    reduce.addEventListener("change", updateAll);

    return () => {
      reduce.removeEventListener("change", updateAll);
      if (observer) observer.disconnect();
      videos.forEach((v) => v.pause());
    };
  }, [ref]);
}
