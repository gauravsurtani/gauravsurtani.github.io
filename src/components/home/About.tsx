// Home About (server). Spec 2.1 and WP2.
// Frozen: id="about", tabIndex={-1} and data-cite="dlai". Scene A cites DeepLearning.AI while About is read.
// Motion: "Evidence docket" (about/Docket.tsx drives it; the hidden states are in About.module.css). The section is a
// sticky stage, scroll-linked both ways: the claim (the lede) stays on screen while the Building-now ledger is filed
// one record at a time. Per record the slot opens, its proof is lifted in large as a quote, an amber sweep runs across
// it, the quote flies into its slot and becomes the proof, then the state pill stamps. A thread runs from the record to
// the claim words it backs (about/claims.json) and those words get the amber evidence underline. The rule above the
// ledger is the evidence meter. All words, wrappers and the quote layer are rendered here; Docket only measures and
// writes styles. Without JS, with reduced motion, or when the ledger is already in view at load (deep link, restored
// scroll), the section is static.
import { Fragment, type CSSProperties } from 'react'
import Link from 'next/link'
import { resume } from '@/content/resume'
import { getState } from '@/lib/state'
import Docket from './about/Docket'
import claims from './about/claims.json'
import rows from './about/rows.json'

// What a visitor reads in each Building-now row: a plain label and a proof line taken from resume.md. The status
// status words (staging, production) are not published; data-st only keys the label's style.
const ROWS = rows as Record<string, { label: string; proof: string }>
const proofOf = (n: { name: string; proof: string }) => ROWS[n.name]?.proof ?? n.proof
import s from './About.module.css'

// Words become spans; the spaces stay plain text between them, so a word at a line end never splits its box.
// --a is where the word starts in the phrase (0..1) and --b is phrase length / word length, so
// clamp(0, (progress - a) * b, 1) draws the words in order as one stroke.
function Words({ text, cls }: { text: string; cls: string }) {
  const ws = text.match(/[^\s-]+-(?=\S)|\S+\s*/g) ?? []
  const n = ws.reduce((t, w) => t + w.trim().length + 1, 0)
  let c = 0
  return ws.map((w, i) => {
    const k = w.trim().length + 1
    const st = { '--a': (c / n).toFixed(4), '--b': (n / k).toFixed(3) } as CSSProperties
    c += k
    return (
      <Fragment key={i}>
        <span className={cls} style={st}>{w.trim()}</span>
        {w !== w.trim() && ' '}
      </Fragment>
    )
  })
}

export default function About() {
  const state = getState()
  const now = state?.now ?? []
  const lede = resume.aboutLede
  // the claim words each record backs, in lede order: [start, row index, words]
  const cuts = Object.entries(claims as Record<string, string>)
    .map(([name, w]) => [lede.indexOf(w), now.findIndex(n => n.name === name), w] as const)
    .filter(([at, i]) => at >= 0 && i >= 0)
    .sort((a, b) => a[0] - b[0])
  const claimed = new Set(cuts.map(c => c[1]))
  let at = 0
  return (
    <section id="about" className={`sec ${s.root}`} aria-labelledby="about-h" data-cite="dlai" tabIndex={-1}>
      <Docket>
        <div>
          <div className="sec-h">
            <h2 id="about-h" className="h2">About</h2>
            <span><Link className="lnk" href="/about">More</Link></span>
          </div>
          <p className={`lede ${s.lede}`}>
            {cuts.map(([start, i, w]) => {
              const before = lede.slice(at, start)
              at = start + w.length
              return (
                <Fragment key={i}>
                  {before}
                  <span data-m={i}><Words text={w} cls={s.mw} /></span>
                </Fragment>
              )
            })}
            {lede.slice(at)}
          </p>
        </div>

        <div className={s.now}>
          <div className={`rule ${s.rule}`}>{state && <i className={s.meter} aria-hidden="true" />}</div>
          {state && (
            <>
              <div className={s.nowH}>
                <h3 className="h3">Building now</h3>
              </div>
              <p className={s.creed}>{state.method.rule}</p>
              <ul className={s.rows}>
                {now.map(n => (
                  <li key={n.name} className={s.row}>
                    <span className={s.name}>{n.name}</span>
                    <span className="st" data-st={n.state}>{ROWS[n.name]?.label ?? n.state}</span>
                    <span className={s.proof}><Words text={proofOf(n)} cls={s.w} /></span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <dl className={s.fact}>
            <dt>Education</dt>
            <dd>{resume.education}</dd>
          </dl>
        </div>

        {/* the quote layer: each proof lifted in large, and the citation threads (shown only while the docket runs) */}
        {state && (
          <div className={s.fly} aria-hidden="true">
            <svg className={s.th}>
              {now.map((n, i) => claimed.has(i) && (
                <g key={n.name} data-th={i}><path /><circle r="2.5" /></g>
              ))}
            </svg>
            {now.map((n, i) => (
              <div key={n.name} className={s.q} data-q={i}>
                <i className={s.qm}>{'“'}</i>
                <span className={s.qt}><Words text={proofOf(n)} cls={s.w} /></span>
                <i className={s.qm}>{'”'}</i>
              </div>
            ))}
          </div>
        )}
      </Docket>
    </section>
  )
}
