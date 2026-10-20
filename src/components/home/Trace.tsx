// Timeline card (server): the evidence half of the opening and Scene A's stage. The DOM contract below is frozen;
// trace-api.ts (and through it Entrance and TraceFollow) depends on it.
//
// aside.trace-col > div.trace#trace[data-trace] > header (.t-title, button#replay) + .tb:
//   .axis > span.yr[data-y] (odd years carry .odd and are hidden)
//   .ov[data-ov] > i.gl[data-y] (every year incl. 2018), div.band[data-band], div.cursor[data-cursor] > b
//   div.ind[data-ind]
//   ol.rows[data-rows] > li.row[data-row][data-k][data-href] > a.lbl[href=data-href][data-short] > span, span.track >
//       span.bar[data-bar][data-s][data-e] (style --s/--e; --e omitted for "now"), span.cap[data-cap] (current roles),
//       i.pt[data-pt] (ping point, at the bar start); then span.sr (dates for screen readers)
// + the phone copy of ol.notes as the card footer (hidden at 1024px and up; the hero copy is hidden below).
// Camera marks (Experience's timeline camera, experience/camera.css), hidden on the resting card: i.mt month ticks
// (.q = quarters) first in .ov, span.ql quarter labels in .tk-row, and a role's logo slot (.chip) in its .track.
// Geometry is pure CSS from --now (set on <html> by the head script, with a build-time fallback). See trace.css.
// Opening delays (--d, entrance.css): year then row labels fade from 720ms (20ms apart), gridlines grow from 720ms
// (25ms apart). Replay is JS-only (hidden without JS, on touch and under reduced motion; Entrance wires it).
import type { CSSProperties } from 'react'
import { timeline } from '@/content/resume'
import Logo from './experience/Logo'
import { Notes } from './Hero'
import './trace.css'
import './experience/camera.css'

const YEARS = Array.from({ length: 9 }, (_, i) => 2018 + i)
const SHOWN = YEARS.filter(y => y % 2 === 0)
const v = (o: { [k: string]: string | number }) => o as CSSProperties
const LBL = 720
// camera marks: every month that is not a January, and the quarter labels
const MONTHS = YEARS.flatMap(y => Array.from({ length: 11 }, (_, m) => ({ y: +(y + (m + 1) / 12).toFixed(4), q: (m + 1) % 3 === 0 })))
const QUARTERS = YEARS.flatMap(y => (['Apr', 'Jul', 'Oct'] as const).map((m, i) => ({ y: y + (i + 1) / 4, m })))

export default function Trace() {
  return (
    <aside className="trace-col" aria-label="Timeline">
      <div className="trace" id="trace" data-trace="">
        <div className="t-head">
          <span className="t-title">2018 – now</span>
          <button className="replay" id="replay" type="button" aria-label="Replay the opening">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
            </svg>
            <span className="tip" aria-hidden="true" data-t="Replay" />
          </button>
        </div>
        <div className="tb">
          <div className="axis" aria-hidden="true">
            <span />
            <div className="tk-row">
              {YEARS.map(y => (
                <span key={y} className={`yr${y % 2 ? ' odd' : ''}${y === 2020 || y === 2024 ? ' mid' : ''}`} data-y={y} style={v(y % 2 ? { '--y': y } : { '--y': y, '--d': `${LBL + SHOWN.indexOf(y) * 20}ms` })}>{y}</span>
              ))}
              {QUARTERS.map(q => <span key={q.y} className="ql" style={v({ '--y': q.y })}>{q.m}</span>)}
            </div>
          </div>
          <div className="ov" data-ov="" aria-hidden="true">
            {MONTHS.map(m => <i key={m.y} className={m.q ? 'mt q' : 'mt'} style={v({ '--y': m.y })} />)}
            {YEARS.map((y, i) => <i key={y} className="gl" data-y={y} style={v({ '--y': y, '--d': `${LBL + i * 25}ms` })} />)}
            <div className="band" data-band="" />
            <div className="cursor" data-cursor=""><b /></div>
          </div>
          <div className="ind" data-ind="" aria-hidden="true" />
          <ol className="rows" data-rows="">
            {timeline.map((r, i) => (
              <li key={r.k} className="row" data-row="" data-k={r.k} data-href={`#${r.id}`}>
                <a className="lbl" href={`#${r.id}`} data-short={r.short ?? r.label} style={v({ '--d': `${LBL + (SHOWN.length + i) * 20}ms` })}><span>{r.label}</span></a>
                <span className="track" aria-hidden="true">
                  <span className="bar" data-bar="" data-s={r.s} data-e={r.e} style={v(r.e === 'now' ? { '--s': r.s } : { '--s': r.s, '--e': r.e })} />
                  {r.e === 'now' && <span className="cap" data-cap="" style={v({ '--s': r.s })} />}
                  <i className="pt" data-pt="" style={v(r.e === 'now' ? { '--s': r.s } : { '--s': r.s, '--e': r.e })} />
                  <Logo id={r.id} className="chip" style={v({ '--s': r.s })} />
                </span>
                <span className="sr">, {r.sr}</span>
              </li>
            ))}
          </ol>
        </div>
        <Notes className="t-notes" />
      </div>
    </aside>
  )
}
