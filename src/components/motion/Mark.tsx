// P5 Mark: the amber evidence underline, drawn per word (one ::after per word) so it wraps with the text and
// reads as one pen stroke (80ms linear per word, in order).
//
//   <Mark text="15 companies" />           server-safe; renders <mark class="mark"><span class="w" style="--k:n">...
//   <Rich text={bullet} />                 a resume bullet: [[phrase]] -> <Mark>, [label](url) -> external inline link
//
// When it draws:
//   - inside a [data-rv] block: hidden (scaleX 0) until the block is revealed, then drawn starting --md (default
//     420ms) after the reveal. Override per mark with style={{ '--md': '0ms' }} on an ancestor.
//   - outside any [data-rv] block: always drawn (static).
//   - reduced motion and no JS: drawn.
// CSS lives in globals.css (.mark, .w). Only the 4 hero claims and one phrase per role get a Mark (amber = evidence).
import type { CSSProperties } from 'react'
import { words } from './split'

export const Mark = ({ text }: { text: string }) => (
  <mark className="mark">
    {words(text).map((w, k) => (
      <span key={k} className="w" style={{ '--k': k } as CSSProperties}>{w}</span>
    ))}
  </mark>
)

export const Rich = ({ text }: { text: string }) => (
  <>
    {text.split(/(\[\[.+?\]\]|\[[^\]]+\]\([^)]+\))/).map((p, i) => {
      const m = p.match(/^\[\[(.+)\]\]$/)
      if (m) return <Mark key={i} text={m[1]} />
      const l = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (l) return <a key={i} className="inl" href={l[2]} target="_blank" rel="noopener noreferrer">{l[1]}</a>
      return p
    })}
  </>
)
