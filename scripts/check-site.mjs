// Verifies every internal href/src in the built site resolves to a file, and
// that each page has the basics (canonical, main landmark, a single h1).
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { join, dirname, resolve, relative } from "node:path"

const root = resolve(process.argv[2] ?? "public")
const origin = "https://mhdi.me"
const pages = []
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && pages.push(p)
  }
}
walk(root)

const problems = []
const exists = (p) =>
  [p, p + ".html", join(p, "index.html")].some((c) => existsSync(c) && statSync(c).isFile())

for (const page of pages) {
  const html = readFileSync(page, "utf8")
  const rel = relative(root, page)
  if (!/<main[\s>]/.test(html)) problems.push(`${rel}: missing <main>`)
  if (rel !== "404.html" && !/<link rel="canonical"/.test(html))
    problems.push(`${rel}: missing canonical`)
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1 > 1) problems.push(`${rel}: ${h1} <h1> elements`)
  for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g))
    problems.push(`${rel}: img without alt`)
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    let u = m[1]
    if (/^(mailto:|tel:|data:|javascript:|#)/.test(u)) continue
    if (u.startsWith(origin)) u = u.slice(origin.length) || "/"
    if (/^[a-z]+:\/\//.test(u) || u.startsWith("//")) continue
    u = u.split("#")[0].split("?")[0]
    if (!u) continue
    try {
      u = decodeURI(u)
    } catch {}
    const target = u.startsWith("/") ? join(root, u) : resolve(dirname(page), u)
    if (!exists(target)) problems.push(`${rel}: broken ${m[1]}`)
  }
}
console.log(`Checked ${pages.length} pages`)
if (problems.length) {
  console.error([...new Set(problems)].join("\n"))
  process.exit(1)
}
