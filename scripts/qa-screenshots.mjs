// Screenshots at the four SPEC widths, normal + reduced motion:
//   <w>-<motion>-top.jpg   first screen (viewport only)
//   <w>-<motion>.jpg       full page
// Starts its own Vite dev server unless --url is given.
//
//   npm run qa:shots -- --out qa/ticket-12
//   npm run qa:shots -- --out qa/scratch --url http://localhost:5173
//   npm run qa:shots -- --out qa/scratch --path /about
//
// Exits 0 even when overflow is found; warnings are printed and written
// to <out>/report.json so the tester can read them.

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const WIDTHS = [1440, 1024, 768, 390];
const HEIGHT = { 1440: 900, 1024: 768, 768: 1024, 390: 844 };
const MOTIONS = ["normal", "reduce"];
// JPEG keeps committed ticket folders small.
const JPEG = { type: "jpeg", quality: 80 };

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const outDir = resolve(arg("out", "qa/scratch"));
const path = arg("path", "/");
let baseUrl = arg("url", "");

let server;
if (!baseUrl) {
  const { createServer } = await import("vite");
  server = await createServer({ server: { port: 5173, strictPort: false }, logLevel: "warn" });
  await server.listen();
  baseUrl = server.resolvedUrls.local[0];
}
const pageUrl = new URL(path, baseUrl).href;

// Elements that stick out past the viewport. Catches content that would be
// clipped if a parent hides overflow-x, not just pages that scroll sideways.
function findOverflow() {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (el.closest("dialog:not([open])")) continue;
    const box = el.getBoundingClientRect();
    if (box.width === 0) continue;
    if (box.right > vw + 1 || box.left < -1) {
      const cls = typeof el.className === "string" && el.className ? `.${el.className.trim().split(/\s+/).join(".")}` : "";
      out.push({ el: `${el.tagName.toLowerCase()}${cls}`, left: Math.round(box.left), right: Math.round(box.right), viewport: vw });
    }
  }
  return out;
}

// Playwright's bundled Chromium first; fall back to installed Chrome or Edge
// (some Windows policies block running .exe files from AppData).
async function launch() {
  for (const channel of [undefined, "chrome", "msedge"]) {
    try {
      return await chromium.launch(channel ? { channel } : {});
    } catch (error) {
      if (channel === "msedge") throw error;
    }
  }
}

const browser = await launch();
const report = { url: pageUrl, shots: [], warnings: [] };
await mkdir(outDir, { recursive: true });

try {
  for (const motion of MOTIONS) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: HEIGHT[width] },
        reducedMotion: motion === "reduce" ? "reduce" : "no-preference",
      });
      const page = await context.newPage();
      await page.goto(pageUrl, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);

      const name = `${width}-${motion}`;
      await page.screenshot({ path: resolve(outDir, `${name}-top.jpg`), ...JPEG });
      await page.screenshot({ path: resolve(outDir, `${name}.jpg`), fullPage: true, ...JPEG });
      report.shots.push(`${name}-top.jpg`, `${name}.jpg`);

      const overflow = await page.evaluate(findOverflow);
      if (overflow.length) {
        report.warnings.push({ width, motion, overflow });
        console.warn(`WARN horizontal overflow at ${width}px (${motion}):`);
        overflow.slice(0, 10).forEach((o) => console.warn(`  ${o.el}  left ${o.left}  right ${o.right}  viewport ${o.viewport}`));
      }
      console.log(`shot ${name}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (server) await server.close();
}

await writeFile(resolve(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(`\n${report.shots.length} screenshots in ${outDir}, ${report.warnings.length} overflow warning(s).`);
