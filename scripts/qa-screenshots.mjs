// hannah-web-kit 0.2.0 · copied into the site by /init-site; refresh it with /init-site refresh, don't edit the site copy.
//
// Screenshots at the site's widths (design/site.json):
//   enhance on:  <w>-<motion>-top.jpg (first screen) and <w>-<motion>.jpg (full page), motion = normal | reduce
//   enhance off: <w>-base-top.jpg and <w>-base.jpg (base has no motion, so one pair per width)
// Starts its own Vite dev server on the caller's port unless --url is given.
//
//   npm run qa:shots -- --out qa/ticket-12 --as tester --enhance both
//   npm run qa:shots -- --out qa/scratch/ticket-12 --as designer --widths 1440,390 --motions normal --enhance off
//   npm run qa:shots -- --out qa/scratch --as shots --path /about
//
// Exits 0 even when overflow is found; warnings are printed and written to
// <out>/report.json so the tester can read them.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const site = JSON.parse(await readFile(resolve("design/site.json"), "utf8"));
const ALL_WIDTHS = site.widths;
const ALL_MOTIONS = ["normal", "reduce"];
const ALL_ENHANCE = ["on", "off", "both"];
// JPEG keeps committed ticket folders small.
const JPEG = { type: "jpeg", quality: 80 };

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

// A subset for quick builder checks; the tester always takes the full set.
function list(name, all, parse = (s) => s) {
  const picked = arg(name, "").split(",").filter(Boolean).map(parse);
  if (!picked.length) return all;
  const unknown = picked.filter((p) => !all.includes(p));
  if (unknown.length) throw new Error(`--${name} accepts ${all.join(",")}; got ${unknown.join(",")}`);
  return picked;
}

const WIDTHS = list("widths", ALL_WIDTHS, Number);
const MOTIONS = list("motions", ALL_MOTIONS);
const enhance = arg("enhance", "on");
if (!ALL_ENHANCE.includes(enhance)) throw new Error(`--enhance accepts ${ALL_ENHANCE.join(",")}; got ${enhance}`);
const outDir = resolve(arg("out", "qa/scratch"));
const path = arg("path", "/");
let baseUrl = arg("url", "");

// Each role has its own port (design/site.json, house rule G-6). strictPort: a busy
// port is an error, never a silent move onto someone else's server.
const role = arg("as", "shots");
const port = Number(arg("port", site.ports?.[role] ?? 0));
if (!baseUrl && !port) throw new Error(`no port for role "${role}" in design/site.json; pass --as <role> or --port <n>`);
if (!baseUrl && port === site.ports?.hannah) throw new Error(`port ${port} is Hannah's dev server; use your own role's port`);

let server;
if (!baseUrl) {
  const { createServer } = await import("vite");
  server = await createServer({ server: { port, strictPort: true }, logLevel: "warn" });
  await server.listen();
  baseUrl = server.resolvedUrls.local[0];
}

function pageUrl(off) {
  const url = new URL(path, baseUrl);
  if (off) url.searchParams.set("enhance", "off");
  return url.href;
}

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

// One run = one (enhance, motion) pair. Enhance off ignores motion: base has none.
const runs = [];
if (enhance !== "off") MOTIONS.forEach((motion) => runs.push({ off: false, motion, label: motion }));
if (enhance !== "on") runs.push({ off: true, motion: "normal", label: "base" });

const browser = await launch();
const report = { url: pageUrl(false), enhance, shots: [], warnings: [] };
await mkdir(outDir, { recursive: true });

try {
  for (const run of runs) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: site.heights?.[width] ?? 900 },
        reducedMotion: run.motion === "reduce" ? "reduce" : "no-preference",
      });
      const page = await context.newPage();
      await page.goto(pageUrl(run.off), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);

      const name = `${width}-${run.label}`;
      await page.screenshot({ path: resolve(outDir, `${name}-top.jpg`), ...JPEG });
      await page.screenshot({ path: resolve(outDir, `${name}.jpg`), fullPage: true, ...JPEG });
      report.shots.push(`${name}-top.jpg`, `${name}.jpg`);

      const overflow = await page.evaluate(findOverflow);
      if (overflow.length) {
        report.warnings.push({ width, motion: run.motion, enhance: run.off ? "off" : "on", overflow });
        console.warn(`WARN horizontal overflow at ${width}px (${run.label}):`);
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
