# Project videos

The four video cards around the hero play `project1.mp4` … `project4.mp4` from this folder. Files here are served as-is (Vite doesn't bundle them), so keep them small.

## How to add a project video

1. Encode the clip. Every video must be encoded with exactly this command (an 8-second, 720p, silent clip that starts fast):

   ```
   ffmpeg -i project1.mov -t 8 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart project1.mp4
   ```

   Or let the wrapper run it and put the result here (`<n>` is the card number, 1 to 4):

   ```
   sh scripts/encode-video.sh <input.mov> <n>
   ```

2. Open `src/content/projects.js` and edit that card's line: set `video` to `"videos/project<n>.mp4"` (and the `title` and `href` once the project is picked).

A card with `video: null` shows the "Video #N / Project N" placeholder.
