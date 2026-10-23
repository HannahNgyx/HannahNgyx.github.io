#!/bin/sh
# Encodes a project video for the hero's video cards (VIDEO-1).
#   sh scripts/encode-video.sh <input.mov> <n>
# Writes public/videos/project<n>.mp4: 8 seconds, 720p, silent, starts fast.
# The ffmpeg command is fixed; see public/videos/README.md.
set -eu

usage() {
  echo "usage: $0 <input video> <n>   (n = the card number, a whole number from 1)" >&2
  exit 2
}

[ "$#" -eq 2 ] || usage

input=$1
n=$2

case $n in
  '' | *[!0-9]* | 0*) echo "error: <n> must be a whole number from 1, got '$n'" >&2; usage ;;
esac

if [ ! -f "$input" ]; then
  echo "error: input file not found: $input" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "error: ffmpeg is not installed or not on PATH" >&2
  exit 1
fi

root=$(cd "$(dirname "$0")/.." && pwd)
outdir="$root/public/videos"
out="$outdir/project$n.mp4"
mkdir -p "$outdir"

ffmpeg -i "$input" -t 8 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart "$out"

echo "Wrote $out"
echo "Next: in src/pages/home/hero/content.json set videos.projects entry $n's video to \"videos/project$n.mp4\"."
