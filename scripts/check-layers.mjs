// hannah-web-kit 0.2.0 · copied into the site by /init-site; refresh it with /init-site refresh, don't edit the site copy.
//
// Checks the layer contract and the code structure (house rules L-1 to L-3, S-1 to S-5, D-8):
//   - src/layers.css declares `@layer base, enhance;`
//   - CSS in an enhance/ folder is wrapped in @layer enhance, every other CSS file in @layer base
//   - nothing outside enhance/ folders animates (transition, animation, @keyframes, requestAnimationFrame, .animate())
//   - base code never imports from an enhance/ folder (src/main.jsx, which loads the layer, is the one exception)
//   - code sits in src/pages/<page>/<section>/ or src/shared/, folders are kebab-case, each has its main component
//   - every section has a content file and a SPEC heading, every SPEC heading has a folder
//   - sections import only from themselves and src/shared/
//   - components hard-code no visible text
//
//   npm run check:layers
//
// Exits 1 and lists every problem.

import { readdir, readFile } from "node:fs/promises";
import { join, posix, relative } from "node:path";

const problems = [];
const report = (file, line, rule, text) => problems.push(`${file}${line ? `:${line}` : ""}  ${rule}  ${text}`);

async function walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])));
  return files.flat();
}

// Comments are replaced by spaces of the same length, so line numbers stay right.
const stripCss = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const stripJs = (js) => js.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/\/\/[^\n]*/g, "");
const lineOf = (text, index) => text.slice(0, index).split("\n").length;
const name = (file) => relative(".", file).replaceAll("\\", "/");
const pascal = (folder) => folder.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");

const isEnhance = (file) => file.split("/").includes("enhance");
const isCode = (file) => /\.(jsx?|tsx?)$/.test(file);
const TOP = new Set(["src/main.jsx", "src/App.jsx", "src/layers.css"]);
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NOT_PARTS = new Set(["enhance", "assets"]);

// Every top-level statement must be an @import, the named @layer block, or a registration
// that doesn't cascade (@property, @font-face).
function checkWrapped(file, css, layer) {
  let depth = 0;
  let start = -1;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (depth === 0 && start === -1 && !/\s/.test(c)) start = i;
    if (c === "{") depth++;
    if (c === "}") depth--;
    if ((c === ";" && depth === 0) || (c === "}" && depth === 0)) {
      const statement = css.slice(start, i + 1).trim();
      const ok = /^@(import|property|font-face)\b/.test(statement) || new RegExp(`^@layer\\s+${layer}\\s*\\{`).test(statement);
      if (!ok) report(file, lineOf(css, start), "L-1", `outside @layer ${layer}: ${statement.split("\n")[0].slice(0, 60)}`);
      start = -1;
    }
  }
}

// The section folder a file belongs to (src/pages/<page>/<section> or src/shared/<part>), or null.
function partOf(file) {
  const s = file.split("/");
  if (s[1] === "pages" && s.length > 4 && !NOT_PARTS.has(s[3])) return s.slice(0, 4).join("/");
  if (s[1] === "shared" && s.length > 3 && !NOT_PARTS.has(s[2])) return s.slice(0, 3).join("/");
  return null;
}

const files = (await walk("src")).map(name).filter((f) => !f.startsWith("src/features/"));

// L-1: the order declaration
try {
  const layers = stripCss(await readFile("src/layers.css", "utf8"));
  if (!/@layer\s+base\s*,\s*enhance\s*;/.test(layers)) report("src/layers.css", 0, "L-1", "missing `@layer base, enhance;`");
} catch {
  report("src/layers.css", 0, "L-1", "file missing");
}

for (const file of files) {
  if (!file.endsWith(".css") || file === "src/layers.css") continue;
  const css = stripCss(await readFile(file, "utf8"));
  checkWrapped(file, css, isEnhance(file) ? "enhance" : "base");
  if (isEnhance(file)) continue;
  // L-2: no motion in base
  for (const m of css.matchAll(/(@keyframes\b|(?<![-\w])(?:transition|animation)(?:-[a-z-]+)?\s*:)/g)) {
    report(file, lineOf(css, m.index), "L-2", `motion in base: ${m[1]}`);
  }
}

// Visible text written straight into JSX: text after a tag, and text attributes (D-8)
const TAG = String.raw`(?:<[A-Za-z][\w.]*(?:\s(?:[^<>{}]|\{(?:[^{}]|\{[^{}]*\})*\})*)?>|<\/[A-Za-z][\w.]*\s*>|<>)`;
const JSX_TEXT = new RegExp(`${TAG}([^<>{}]*?[A-Za-z]{2,}[^<>{}]*?)(?=<|\\{)`, "g");
const TEXT_ATTR = /\b(alt|title|aria-label|placeholder)\s*=\s*(["'])([^"']*[A-Za-z]{2,}[^"']*)\2/g;

for (const file of files) {
  if (!isCode(file)) continue;
  const js = stripJs(await readFile(file, "utf8"));

  if (!isEnhance(file)) {
    for (const m of js.matchAll(/\b(requestAnimationFrame|\.animate\s*\()/g)) {
      report(file, lineOf(js, m.index), "L-2", `motion in base: ${m[1]}`);
    }
  }

  const imports = [...js.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)];
  for (const m of imports) {
    const spec = m[1];
    // L-3: base never imports enhance
    if (!isEnhance(file) && file !== "src/main.jsx" && /(^|\/)enhance(\/|$)/.test(spec)) {
      report(file, lineOf(js, m.index), "L-3", `base imports enhance: ${spec}`);
    }
    // S-5: sections import only from themselves and src/shared/
    if (!spec.startsWith(".")) continue;
    const target = posix.normalize(posix.join(posix.dirname(file), spec));
    const from = partOf(file);
    const to = partOf(target);
    if (to && to.startsWith("src/pages/") && from !== to && (from || file.startsWith("src/shared/"))) {
      report(file, lineOf(js, m.index), "S-5", `imports from another section: ${spec}`);
    }
  }

  if (file.endsWith("x")) {
    for (const m of js.matchAll(JSX_TEXT)) {
      const text = m[1].trim();
      if (text) report(file, lineOf(js, m.index + m[0].indexOf(m[1])), "D-8", `hard-coded text: "${text.slice(0, 40)}"`);
    }
    for (const m of js.matchAll(TEXT_ATTR)) report(file, lineOf(js, m.index), "D-8", `hard-coded ${m[1]}: "${m[3].slice(0, 40)}"`);
  }
}

// S-1 to S-4: where files sit, folder names, main components, content files, SPEC headings
const dirs = new Set(files.flatMap((f) => {
  const s = f.split("/");
  return s.slice(1, -1).map((_, i) => s.slice(0, i + 2).join("/"));
}));
const has = (dir, file) => files.includes(`${dir}/${file}`);

for (const file of files) {
  const s = file.split("/");
  const placed = TOP.has(file) || (s[1] === "shared" && s.length > 2) || (s[1] === "pages" && s.length > 3);
  if (!placed) report(file, 0, "S-1", "outside src/pages/<page>/ and src/shared/");
}

const parts = [];
for (const dir of dirs) {
  const s = dir.split("/");
  if (s[1] !== "pages" && s[1] !== "shared") continue;
  const folder = s[s.length - 1];
  if (s.length > 2 && !KEBAB.test(folder)) report(dir, 0, "S-2", "folder names are lowercase kebab-case");
  if (s[1] === "pages" && s.length === 3 && !has(dir, `${pascal(folder)}.jsx`)) report(dir, 0, "S-2", `page component ${pascal(folder)}.jsx missing`);
  const isPart = (s[1] === "pages" && s.length === 4 && !NOT_PARTS.has(folder)) || (s[1] === "shared" && s.length === 3 && !NOT_PARTS.has(folder));
  if (!isPart) continue;
  parts.push(dir);
  if (!has(dir, `${pascal(folder)}.jsx`)) report(dir, 0, "S-2", `main component ${pascal(folder)}.jsx missing`);
  if (!has(dir, "content.json") && !has(dir, "content.md")) report(dir, 0, "S-3", "no content.json or content.md");
  if (dirs.has(`${dir}/enhance`) && !has(`${dir}/enhance`, "index.js")) report(`${dir}/enhance`, 0, "S-3", "no index.js");
}

let spec = "";
try {
  spec = await readFile("SPEC.md", "utf8");
} catch {
  report("SPEC.md", 0, "S-4", "file missing");
}
if (spec) {
  const headings = new Map([...spec.matchAll(/^##\s+([A-Z][A-Z0-9]*)\s+[—–-]\s+(\S+)\s*$/gm)].map((m) => [`src/${m[2].replace(/^src\//, "").replace(/\/$/, "")}`, m[1]]));
  for (const dir of parts) if (!headings.has(dir)) report(dir, 0, "S-4", `no SPEC heading names this folder (## <PREFIX> — ${dir.slice(4)})`);
  for (const [dir, prefix] of headings) if (!dirs.has(dir)) report("SPEC.md", 0, "S-4", `${prefix} names ${dir.slice(4)}, which doesn't exist`);
}

if (problems.length) {
  console.error(`Layers and structure: ${problems.length} problem(s)\n`);
  problems.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}
console.log("Layers and structure: ok");
