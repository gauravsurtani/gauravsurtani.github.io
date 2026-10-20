#!/usr/bin/env node
// Facts lint (npm run check:facts). No dependencies. Prints "facts ok" or every failure, then exits 1.
// 1. The hero summary (segments joined) is in resume.md (markdown links reduced to their labels).
// 2. Every role bullet ([[ ]] stripped, [label](url) -> label) and every role/earlier company, title, place and
//    dates string is in resume.md.
// 3. Every role has exactly one [[Mark]] phrase.
// 4. Every skill item is in resume.md (case-insensitive).
// 5. If out/ exists (after npm run build): no built page's visible text has a forbidden AI-tone word
//    (whole words, case-insensitive). out/blog/<slug>.html is Gaurav's own writing and is skipped, and so is a post's
//    frontmatter description wherever a page quotes it (the /blog tile).
// 6. src/ never calls api.github.com.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const at = p => path.join(ROOT, p)
const links = s => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
const md = links(fs.readFileSync(at('resume.md'), 'utf8'))
const mdLower = md.toLowerCase()
const R = JSON.parse(fs.readFileSync(at('src/content/resume.json'), 'utf8'))
const fails = []

// 1
const summary = R.summary.map(s => (typeof s === 'string' ? s : s.text)).join('')
if (!md.includes(summary)) fails.push(`1 summary not in resume.md: "${summary}"`)

// 2 + 3
for (const r of [...R.roles, ...R.earlier]) {
  for (const f of ['company', 'title', 'when', 'place']) {
    if (r[f] !== undefined && !md.includes(r[f])) fails.push(`2 ${r.id}.${f} not in resume.md: "${r[f]}"`)
  }
}
for (const r of R.roles) {
  for (const b of r.bullets) {
    const plain = links(b.replace(/\[\[(.+?)\]\]/g, '$1'))
    if (!md.includes(plain)) fails.push(`2 ${r.id} bullet not in resume.md: "${plain}"`)
  }
  const marks = r.bullets.join('\n').match(/\[\[.+?\]\]/g)?.length ?? 0
  if (marks !== 1) fails.push(`3 ${r.id} has ${marks} [[mark]] phrases (needs exactly 1)`)
}

// 4
for (const s of R.skills) {
  for (const it of s.items) if (!mdLower.includes(it.toLowerCase())) fails.push(`4 skill not in resume.md: "${it}"`)
}

// 5
const FORBIDDEN = /\b(passionate|cutting-edge|leverag\w*|seamless\w*|unlock\w*|elevat(?:e|es|ed|ing)|comprehensive|sophisticated|innovative|intelligent|clever|sneaky|robust|state-of-the-art|revolutionary|powerful|lightning)\b/gi
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
  const p = path.join(dir, e.name)
  return e.isDirectory() ? walk(p) : [p]
})
const OUT = at('out')
const POSTS = at('content/blog')
const OWN = fs.existsSync(POSTS)
  ? fs.readdirSync(POSTS).filter(f => f.endsWith('.md'))
      .map(f => fs.readFileSync(path.join(POSTS, f), 'utf8').match(/^description:\s*"(.*)"\s*$/m)?.[1]).filter(Boolean)
  : []
if (fs.existsSync(OUT)) {
  for (const f of walk(OUT)) {
    const rel = path.relative(OUT, f)
    if (!f.endsWith('.html') || rel.startsWith('_next') || /^blog[/\\]/.test(rel)) continue
    const text = fs.readFileSync(f, 'utf8')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    const own = OWN.reduce((t, d) => t.split(d).join(' '), text)
    const hits = [...new Set((own.match(FORBIDDEN) ?? []).map(w => w.toLowerCase()))]
    if (hits.length) fails.push(`5 out/${rel}: ${hits.join(', ')}`)
  }
} else {
  console.log('note: out/ not found, check 5 skipped (run npm run build first)')
}

// 6
for (const f of walk(at('src'))) {
  if (fs.readFileSync(f, 'utf8').includes('api.github.com')) fails.push(`6 ${path.relative(ROOT, f)} calls api.github.com`)
}

if (fails.length) {
  console.error(fails.join('\n'))
  console.error(`\n${fails.length} fact check(s) failed`)
  process.exit(1)
}
console.log('facts ok')
