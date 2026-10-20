// Home hero (server). The claim half of the opening (SPEC 3.4, 4.8): name, role and summary are server-rendered
// Stream tokens (P1) with their delay in --d, so the CSS keyframes in entrance.css play from first paint with no
// hydration. Entrance (client) runs the sweep, the claim marks, skip, replay and the claim/row cites.
//
// Plain class hooks entrance.css targets (keep them): tk, av, cta, notes, claim, w.
// Claims: a.claim.mark[data-claim][data-note] with one .tk.w span per word (--k runs on across claims that share a
// key, so the two DeepLearning.AI claims draw as one pen stroke). A claim's superscript is an aria-hidden token inside
// the link (no .w, so no underline), so the focus ring goes round it instead of through it.
// The notes render twice: here (desktop, 3 columns) and as the timeline card's footer (phones). CSS shows one copy.
import Image from 'next/image'
import { Fragment, type CSSProperties } from 'react'
import { isClaim, resume, type Claim } from '@/content/resume'
import { streamDelays, tokens } from '@/components/motion/split'
import { Ext } from '@/components/ui/ProjectCard'
import Entrance from './Entrance'
import s from './Hero.module.css'
import './entrance.css'

const v = (o: { [k: string]: string | number }) => o as CSSProperties
const ms = (n: number) => `${n}ms`
const solid = (t: string) => t.trim() !== ''

// a run of tokens: whitespace-only tokens stay plain text (no span, no delay)
const Stream = ({ text, at }: { text: string; at: (i: number) => number }) => {
  let i = 0
  return <>{tokens(text).map((t, k) => (solid(t) ? <span key={k} className="tk" style={v({ '--d': ms(at(i++)) })}>{t}</span> : t))}</>
}

// Summary: one delay sequence across every segment, claim word and superscript (15ms a token, +70 after a comma,
// +150 after a sentence end), starting at 260ms.
function Summary() {
  const note = (c: Claim) => c.note ?? resume.summary.find((o): o is Claim => isClaim(o) && o.claim === c.claim && !!o.note)?.note
  const flat = resume.summary.flatMap(seg =>
    isClaim(seg) ? [...tokens(seg.text), ...(seg.note ? [String(seg.note)] : [])] : tokens(seg).filter(solid))
  const d = streamDelays(flat, 260)
  const k: { [claim: string]: number } = {}
  let i = 0
  const out = resume.summary.map((seg, si) => {
    if (!isClaim(seg)) return <Fragment key={si}>{tokens(seg).map((t, j) => (solid(t) ? <span key={j} className="tk" style={v({ '--d': ms(d[i++]) })}>{t}</span> : t))}</Fragment>
    k[seg.claim] ??= 0
    return (
      <Fragment key={si}>
      <a className={`claim mark ${s.claim}`} href={seg.href} data-claim={seg.claim} data-note={note(seg)} style={v({ '--md': '0ms' })}>
        {tokens(seg.text).map((t, j) => (
          <span key={j} className="tk w" style={v({ '--d': ms(d[i++]), '--k': k[seg.claim]++ })}>{t}</span>
        ))}
        {seg.note ? <sup className={`tk ${s.sup}`} style={v({ '--d': ms(d[i++]) })} aria-hidden="true">{seg.note}</sup> : null}
      </a>
      </Fragment>
    )
  })
  return <p className={s.sum}>{out}</p>
}

// notes and CTAs arrive as the summary finishes (~1.3s), before the sweep, so the verdict and the nav own the end
const CTA = 1450

export const Notes = ({ className }: { className: string }) => (
  <ol className={`notes ${className}`}>
    {Object.entries(resume.notes).map(([n, t], i) => (
      <li key={n} data-note={n} style={v({ '--d': ms(CTA + i * 60) })}>
        <span className="n" aria-hidden="true">{n}</span>
        <span className="nt">{t}</span>
      </li>
    ))}
  </ol>
)

export default function Hero() {
  return (
    <section id="hero" className={`hero ${s.hero}`} aria-labelledby="h-name">
      <div className={s.id}>
        <Image className={`av ${s.av}`} src="/gaurav-avatar-288.jpg" width={64} height={64} alt="" priority />
        <div className="min-w-0">
          <h1 id="h-name" className={s.name}><Stream text={resume.name} at={i => i * 70} /></h1>
          <p className={s.role}><Stream text={`${resume.title} · ${resume.location}`} at={i => 140 + i * 12} /></p>
        </div>
      </div>

      <Summary />

      <Notes className={s.notes} />

      <ul className={`cta ${s.cta}`}>
        <li style={v({ '--d': ms(CTA) })}><a className="btn btn-ink" href={`mailto:${resume.email}`}>Email</a></li>
        <li style={v({ '--d': ms(CTA + 60) })}><a className="btn" href={resume.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Ext /></a></li>
        <li style={v({ '--d': ms(CTA + 120) })}><a className="btn" href={resume.github} target="_blank" rel="noopener noreferrer">GitHub<Ext /></a></li>
        <li style={v({ '--d': ms(CTA + 180) })}><a className="lnk" href={resume.resume}>Resume<span className={s.pdf}>&nbsp;(PDF)</span></a></li>
      </ul>

      <Entrance />
    </section>
  )
}
