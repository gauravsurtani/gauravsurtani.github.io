'use client'
// Phone Scene A (G12): a fixed 36px strip under the nav that cites the record you are reading. Driven by
// TraceFollow; shown only while html.strip-on is set (below 1024px, reading line inside the records).
//
//   <EvidenceStrip k="tassel" prev="dlai" n={3} onRolled={...} />
//     k     the cited record (timeline row key); its real start and end months place the amber span
//     prev  the label rolling out (P7: old out up, new in from below, 340ms --e-out); null when none
//     n     change count; the first value does not roll or tween, later ones do (span 480ms --e-io)
//
// Left: the short company label. Right: an axis 2018 to now (ticks at 2018, 2022, 2026), the cited span (4px
// amber) and an open cap when the role is current. Geometry is CSS from --now, like the timeline card.
// aria-hidden (every record carries its dates in text). Portaled to <body>: it is page chrome like the nav, and
// it mounts only with JS, so the static HTML has no strip. Reduced motion: shows and hides with no tween.
//
// Timeline camera (motion on): TraceFollow sets data-cam on the strip and the view (--c0, --cs, --aw = axis width,
// --vd = pull-back) and drives .cv: the camera's bar (one .rb per timeline row, --f written) and the pen (.pn).
// The axis then shows every year in view; the static span and cap step aside.
import { useEffect, useState, type CSSProperties, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { timeline } from '@/content/resume'
import s from './EvidenceStrip.module.css'

export type StripState = { k: string | null; prev: string | null; n: number }

const YEARS = Array.from({ length: 9 }, (_, i) => 2018 + i)   // ticks at 2018, 2022, 2026; the camera shows the rest
const v = (o: { [k: string]: string | number }) => o as CSSProperties
const entry = (k: string | null) => timeline.find(t => t.k === k)
const label = (k: string | null) => { const e = entry(k); return e ? e.short ?? e.label : '' }

export default function EvidenceStrip({ k, prev, n, onRolled, rootRef }: StripState & { onRolled: () => void; rootRef?: Ref<HTMLDivElement> }) {
  const [host, setHost] = useState<HTMLElement | null>(null)
  useEffect(() => setHost(document.body), [])
  if (!host) return null
  const e = entry(k)
  const span = e ? v(e.e === 'now' ? { '--s': e.s } : { '--s': e.s, '--e': e.e }) : undefined

  return createPortal(
    <div className={s.strip} aria-hidden="true" ref={rootRef}>
      <div className={`${s.in} ${n ? s.moved : ''}`}>
        <span className={s.lbl}>
          <span key={`i${n}`} className={s.cur}>{label(k)}</span>
          {prev && <span key={`o${n}`} className={s.prev} onAnimationEnd={onRolled}>{label(prev)}</span>}
        </span>
        <span className={s.ax} style={span} data-ax="">
          {YEARS.map(y => <span key={y} className={`${s.tk} ${(y - 2018) % 4 ? s.mn : ''}`} style={v({ '--y': y })}>{y}</span>)}
          <i className={s.span} />
          <i className={`${s.cap} ${e?.e === 'now' ? s.on : ''}`}><b /></i>
          <span className={s.cv}>
            {/* every bar sets its own --e: .ax carries the cited record's --s / --e, which a current role must not inherit */}
            {timeline.map(t => <i key={t.k} className={s.rb} data-rb="" style={v({ '--s': t.s, '--e': t.e === 'now' ? 'var(--now, 2026.8)' : t.e })} />)}
            <i className={s.pn} data-pn="" />
          </span>
        </span>
      </div>
    </div>,
    host,
  )
}
