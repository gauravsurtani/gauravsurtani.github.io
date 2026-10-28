#!/usr/bin/env node
// Facts lint (npm run check:facts). No dependencies. Prints "facts ok" or every failure, then exits 1.
// 1. The hero summary (segments joined) is in resume.md (markdown links reduced to their labels).
// 2. Every role bullet ([[ ]] stripped, [label](url) -> label) and every role company, title, place and dates string
//    is in resume.md.
// 3. Every role has exactly one [[Mark]] phrase.
// 4. Every skill item is in resume.md (case-insensitive).
// 5. If out/ exists (after npm run build): no built page's visible text has a forbidden AI-tone word
//    (whole words, case-insensitive). out/blog/<slug>.html is Gaurav's own writing and is skipped, and so is a post's
//    frontmatter description wherever a page quotes it (the /blog tile). No built page says "production" (see 8).
// 6. src/ never calls api.github.com.
// 7. Experience records (src/content/experience.json): every role, project, link, stack item and number on the page
//    exists in resume.md or in the old portfolio's experience data (content/experience-v1.txt). Also: every resume
//    role has a record and keeps resume.json's header and bullets; an earlier role that resume.md lists keeps its
//    title and years; dates match the timeline months (s, e) and run newest first; no [[mark]] and no deployment-status
//    words in the added text. A project linked to one of his repos (its href is that repo's homepage or GitHub URL in
//    src/lib/constants.ts, the data behind the home and /projects cards, taken from the repo README) may also use that
//    repo's technologies and description, so its stack stays the card's.
// 8. The bare word "production" is a deployment-status word: no Experience record and no built page uses it, except
//    the PROD_OK phrases below.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const at = p => path.join(ROOT, p)
const links = s => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
const md = links(fs.readFileSync(at('resume.md'), 'utf8'))
const mdLower = md.toLowerCase()
const R = JSON.parse(fs.readFileSync(at('src/content/resume.json'), 'utf8'))
const fails = []

// 8. Two earlier roles use "production" in the old portfolio data's own domain sense (Accenture: production data
// analysis; LIBS: production management, production team). Their wording is left as is and allowed here, by record
// and phrase; the owner decides whether it stays. Anything else that says "production" fails.
const PROD_OK = { 'r-acc': ['production data analysis'], 'r-libs': ['production management', 'production team'] }
const PROD = /\bproduction\b/i
const unprod = (t, phrases) => phrases.reduce((x, ph) => x.replace(new RegExp(ph, 'gi'), ' '), t)

// 1
const summary = R.summary.map(s => (typeof s === 'string' ? s : s.text)).join('')
if (!md.includes(summary)) fails.push(`1 summary not in resume.md: "${summary}"`)

// 2 + 3
for (const r of R.roles) {
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
    const prod = unprod(own, Object.values(PROD_OK).flat()).match(new RegExp(`.{0,40}${PROD.source}.{0,40}`, 'i'))
    if (prod) fails.push(`8 out/${rel} says "production": "${prod[0].replace(/\s+/g, ' ').trim()}"`)
  }
} else {
  console.log('note: out/ not found, check 5 skipped (run npm run build first)')
}

// 6
for (const f of walk(at('src'))) {
  if (fs.readFileSync(f, 'utf8').includes('api.github.com')) fails.push(`6 ${path.relative(ROOT, f)} calls api.github.com`)
}

// 7
const OLD = fs.readFileSync(at('content/experience-v1.txt'), 'utf8')
const X = JSON.parse(fs.readFileSync(at('src/content/experience.json'), 'utf8')).records
const inSrc = s => md.includes(s) || OLD.includes(s)
const flat = s => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const FLAT = `${flat(md)}|${flat(OLD)}`
const nums = s => s.match(/\d+(?:[.,]\d+)*/g) ?? []
const NUMS = new Set([...nums(md), ...nums(OLD)])
// the constants.ts entry of the repo a project links to (its homepage or GitHub URL), as text
const CONST = fs.readFileSync(at('src/lib/constants.ts'), 'utf8').split(/\n  \{\n/)
const repoOf = href => CONST.find(c => c.includes(`homepage: '${href}'`) || c.includes(`github: '${href}'`)) ?? ''
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const HEAD = ['k', 'label', 'short', 'company', 'companyHref', 'title', 'place', 'when', 'sr', 's', 'e', 'bullets']
const roleIds = R.roles.map(r => r.id)
const ids = X.map(x => x.id)
if (new Set(ids).size !== ids.length) fails.push('7 experience.json has a duplicate record id')
for (const id of roleIds) if (!ids.includes(id)) fails.push(`7 resume role ${id} has no Experience record`)
let prevEnd = Infinity
const keys = new Set()
for (const x of X) {
  const isRole = roleIds.includes(x.id)
  const r = { bullets: [], ...R.roles.find(o => o.id === x.id), ...x }
  const at7 = `7 ${r.id}`
  if (isRole) for (const f of HEAD) if (f in x) fails.push(`${at7}.${f} overrides resume.json`)
  if (keys.has(r.k)) fails.push(`${at7} timeline key "${r.k}" is not unique`)
  keys.add(r.k)
  const end = r.e === 'now' ? Infinity : r.e
  if (end > prevEnd) fails.push(`${at7} is out of date order (newest end first)`)
  prevEnd = end
  if (!isRole) {
    for (const f of ['company', 'title']) if (!inSrc(r[f] ?? '')) fails.push(`${at7}.${f} not in resume.md or the old portfolio: "${r[f]}"`)
    if (!inSrc((r.place ?? '').split(',')[0])) fails.push(`${at7}.place not in resume.md or the old portfolio: "${r.place}"`)
    const line = md.split('\n').find(l => l.includes(`**${r.company}**`))   // resume.md wins
    if (line && !line.includes(r.title)) fails.push(`${at7}.title differs from resume.md: "${r.title}"`)
    if (line) for (const y of r.when.match(/\d{4}/g) ?? []) if (!line.includes(y)) fails.push(`${at7}.when year ${y} is not in resume.md's line`)
  }
  const m = r.when.match(/^(\w{3}) (\d{4}) – (?:(\w{3}) (\d{4})|Present)$/)
  if (!m || MON.indexOf(m[1]) < 0 || (m[3] && MON.indexOf(m[3]) < 0)) fails.push(`${at7}.when is not "Mon YYYY – Mon YYYY|Present": "${r.when}"`)
  else {
    const m1 = MON.indexOf(m[1]), m2 = m[3] ? MON.indexOf(m[3]) : -1
    if (Math.abs(r.s - (+m[2] + m1 / 12)) > 0.001) fails.push(`${at7}.s ${r.s} does not match ${m[1]} ${m[2]}`)
    if (m[3] ? Math.abs(r.e - (+m[4] + (m2 + 1) / 12)) > 0.001 : r.e !== 'now') fails.push(`${at7}.e ${r.e} does not match "${r.when}"`)
    if (!md.includes(r.when)) {
      if (!OLD.includes(`period: '${FULL[m1]} ${m[2]} -`)) fails.push(`${at7} start ${m[1]} ${m[2]} is not an old portfolio start`)
      if (m[3] && !OLD.includes(`- ${FULL[m2]} ${m[4]}'`)) fails.push(`${at7} end ${m[3]} ${m[4]} is not an old portfolio end`)
    }
    if (r.sr !== r.when.replace(' – ', ' to ').replace('Present', 'present')) fails.push(`${at7}.sr does not match its dates: "${r.sr}"`)
  }
  for (const p of r.projects) {
    if (!OLD.includes(`name: '${p.name}'`)) fails.push(`${at7} project not in the old portfolio: "${p.name}"`)
    if (!p.desc) fails.push(`${at7} project "${p.name}" has no description`)
  }
  const REPOS = flat(r.projects.map(p => (p.href ? repoOf(p.href) : '')).join('|'))
  for (const it of r.stack) if (!FLAT.includes(flat(it)) && !REPOS.includes(flat(it))) fails.push(`${at7} stack item not in resume.md, the old portfolio or a linked repo: "${it}"`)
  const text = [r.note ?? '', ...(isRole ? [] : r.bullets), ...r.projects.flatMap(p => [p.desc, ...p.points]), ...r.stack].join('\n')
  const urls = [...text.matchAll(/\]\(([^)]+)\)/g)].map(u => u[1]).concat(r.projects.map(p => p.href).filter(Boolean))
  for (const u of urls) if (!inSrc(u.replace(/^https?:\/\//, ''))) fails.push(`${at7} link not in resume.md or the old portfolio: ${u}`)
  for (const n of new Set(nums(links(text)))) if (!NUMS.has(n)) fails.push(`${at7} number not in resume.md or the old portfolio: ${n}`)
  for (const d of text.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})\b/g)) {
    if (!OLD.includes(`${FULL[MON.indexOf(d[1])]} ${d[2]}`) && !md.includes(d[0])) fails.push(`${at7} date not in the old portfolio: ${d[0]}`)
  }
  if (text.includes('[[')) fails.push(`${at7} has a [[mark]] outside the resume bullets`)
  const bad = text.match(/\b(in production|staging|landed|since 2024)\b/i)
  if (bad) fails.push(`${at7} uses a deployment-status or dropped phrase: "${bad[0]}"`)
  if (PROD.test(unprod(text, PROD_OK[r.id] ?? []))) fails.push(`8 ${r.id} says "production" (only PROD_OK phrases are allowed)`)
}

if (fails.length) {
  console.error(fails.join('\n'))
  console.error(`\n${fails.length} fact check(s) failed`)
  process.exit(1)
}
console.log('facts ok')
