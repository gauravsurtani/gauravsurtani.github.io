// Builds public/resume.pdf from resume.md, then checks that the PDF says what resume.md says.
// Run from anywhere: node scripts/resume/build.mjs
// Needs python3 with Playwright and its Chromium (python3 -m playwright install chromium),
// and pdftotext (poppler) for the text check. The layout uses Helvetica Neue (a macOS font).
// --html <file> also writes the generated HTML, to tune the layout in a browser.
import { readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const pdfPath = root + 'public/resume.pdf'
const md = readFileSync(root + 'resume.md', 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

// resume.md has a fixed shape. Any line this does not know stops the build, so no text is dropped silently.
const lines = md.split('\n').map((l) => l.trimEnd()).filter(Boolean)
let body = ''
let section = ''
let inList = false
const endList = () => {
  if (inList) body += '</ul>'
  inList = false
}
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  let m
  if ((m = line.match(/^# (.+)$/))) body += `<h1>${inline(m[1])}</h1>`
  else if ((m = line.match(/^## (.+)$/))) {
    endList()
    section = m[1]
    body += `<h2>${inline(m[1])}</h2>`
  } else if ((m = line.match(/^### (.+?) — (.+)$/))) {
    endList()
    const when = lines[++i]?.match(/^\*([^*]+) \| ([^*]+)\*$/)
    if (!when) throw new Error(`no "*dates | place*" line after: ${line}`)
    body +=
      `<div class="head"><span><b class="co">${inline(m[1])}</b> — ${inline(m[2])}</span>` +
      `<span><span class="d">${inline(when[1])}</span><span class="loc"> · ${inline(when[2])}</span></span></div>`
  } else if ((m = line.match(/^- (.+)$/))) {
    const item = m[1]
    if (section === 'Earlier Experience') {
      const row = item.match(/^(.+) \(([^()]+)\)$/)
      if (!row) throw new Error(`no "(years)" at the end of: ${line}`)
      body += `<div class="row"><span>${inline(row[1])}</span><span class="yr">${esc(row[2])}</span></div>`
    } else if (section === 'Skills') body += `<p class="skill">${inline(item)}</p>`
    else {
      if (!inList) body += '<ul>'
      inList = true
      body += `<li>${inline(item)}</li>`
    }
  } else if (!section && line.includes(' | ')) body += `<p class="contact">${line.split(' | ').map(inline).join('<span> · </span>')}</p>`
  else if (!section) body += `<p class="title">${inline(line)}</p>`
  else if (/^[^#*\-[]/.test(line)) {
    endList()
    body += `<p>${inline(line)}</p>`
  } else throw new Error(`unknown line in resume.md: ${line}`)
}
endList()

// Sizes and colors are the ones measured from the old Chrome export (fonts in pt, spacing in px).
const css = `
@page { size: letter; margin: 0.375in 0.55in }
* { margin: 0; padding: 0; box-sizing: border-box }
body { font: 9.7pt/1.3 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #111 }
a { color: inherit; text-decoration: none }
h1 { font-size: 19pt; line-height: 1.2; letter-spacing: -.01em }
.title { font-size: 11pt; font-weight: 700; color: #1f4e9c; margin-top: 2px }
.contact { font-size: 8.9pt; color: #555; margin-top: 5px }
h2 { font-size: 9pt; color: #1f4e9c; text-transform: uppercase; letter-spacing: .12em;
     border-bottom: 1px solid #d9d9d9; padding-bottom: 2px; margin: 5px 0 3px }
.head { display: flex; justify-content: space-between; line-height: 1.24; margin-top: 4px }
h2 + .head { margin-top: 0 }
.co { font-size: 10.8pt }
.d { font-size: 9.2pt; font-weight: 500 }
.loc { font-size: 9.2pt; color: #555 }
.loc a, li a { color: #1f4e9c; border-bottom: 1px solid rgb(31 78 156 / .35) }
ul { list-style: none; padding-bottom: 2px }
.row:has(+ h2) { padding-bottom: 1px }
li { position: relative; padding-left: 1em; line-height: 12pt; margin-top: 2px }
li::before { content: "•"; position: absolute; left: .15em; color: #1f4e9c; font-size: 1.15em; line-height: 1.1 }
.row { display: flex; justify-content: space-between }
.yr { color: #555 }
.skill + .skill { margin-top: 2px }
`
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Gaurav Surtani — Resume</title><style>${css}</style></head><body>${body}</body></html>`
if (process.argv.includes('--html')) writeFileSync(process.argv[process.argv.indexOf('--html') + 1], html)

const py = spawnSync('python3', [fileURLToPath(new URL('print.py', import.meta.url)), pdfPath], { input: html, stdio: ['pipe', 'inherit', 'inherit'] })
if (py.status !== 0) process.exit(py.status ?? 1)

// Checks: one page, the same links, the same text in the same order.
const pdf = readFileSync(pdfPath, 'latin1')
const pages = (pdf.match(/\/Type\s*\/Page\b(?!s)/g) || []).length
const uris = [...pdf.matchAll(/\/URI\s*\(([^)]*)\)/g)].map((m) => m[1].replace(/\/$/, '')).sort()
const mdUris = [...md.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1].replace(/\/$/, '')).sort()
const fail = []
if (pages !== 1) fail.push(`${pages} pages, want 1`)
if (uris.join() !== mdUris.join()) fail.push(`links differ:\n  pdf: ${uris.join(' ')}\n  md:  ${mdUris.join(' ')}`)

// Compared without spaces, separators (| · •) and parentheses: the layout letter-spaces the section
// labels, swaps "|" for "·", draws "-" items as "•" and shows the earlier years without "( )".
const flat = (s) => s.replace(/[\s|·•()]/g, '')
const mdText = flat(
  md
    .replace(/^## (.+)$/gm, (_, h) => h.toUpperCase())
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#+ |^- /gm, '')
    .replace(/\*/g, ''),
)
const txt = spawnSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8' })
if (txt.error) console.warn('pdftotext not found: text check skipped')
else {
  const pdfText = flat(txt.stdout)
  let k = 0
  while (k < mdText.length && mdText[k] === pdfText[k]) k++
  if (k < mdText.length || pdfText.length !== mdText.length)
    fail.push(`text differs at char ${k}:\n  md:  ...${mdText.slice(Math.max(0, k - 40), k + 40)}\n  pdf: ...${pdfText.slice(Math.max(0, k - 40), k + 40)}`)
}
if (fail.length) {
  console.error('resume.pdf check failed:\n' + fail.join('\n'))
  process.exit(1)
}
console.log(`resume.pdf ok: 1 page, ${uris.length} links, text matches resume.md (${mdText.length} chars)`)
