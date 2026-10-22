// The four project video cards around the hero (VIDEO-1..4), in order 1-4.
//
// To add a project video:
//   1. Encode it:  sh scripts/encode-video.sh <input.mov> <n>
//      (writes public/videos/project<n>.mp4; see public/videos/README.md)
//   2. Edit that entry's line below: set video to "videos/project<n>.mp4"
//      (and its title and href once the project is picked).
// video: null shows the "Video #N / Project N" placeholder.
export const projects = [
  { title: "Project 1", video: null, href: "#projects" },
  { title: "Project 2", video: null, href: "#projects" },
  { title: "Project 3", video: null, href: "#projects" },
  { title: "Project 4", video: null, href: "#projects" },
];
