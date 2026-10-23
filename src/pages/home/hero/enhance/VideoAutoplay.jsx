import useAutoplayVideos from "./useAutoplayVideos.js";

// Plays the project videos (VIDEO-5) inside the list the base hands over as `root`.
// Renders nothing.
export default function VideoAutoplay({ root }) {
  useAutoplayVideos(root);
  return null;
}
