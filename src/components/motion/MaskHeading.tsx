// P3 display variant (Mask): each word rises out of a line mask (translateY 108% -> 0, 620ms --e-out, 40ms per word).
//
//   <MaskHeading as="h2" id="exp-h" className="h2">Experience</MaskHeading>
//       an h2 inside a [data-rv] block: rises when the block is revealed (on reach, once).
//   <MaskHeading as="h1" enter className="display">Projects</MaskHeading>
//       a page h1: rises on mount, from first paint (CSS animation keyed on html.mo, no hydration needed).
//
// Reduced motion and no JS: static text. Never put an h2 MaskHeading outside a [data-rv] block (it would simply be
// static, which is safe, but it would not move). Spaces stay outside the inline-block boxes (lesson 5).
import type { CSSProperties } from 'react'
import { maskParts } from './split'

type Props = {
  as: 'h1' | 'h2' | 'h3'
  enter?: boolean
  id?: string
  className?: string
  children: string
}

export default function MaskHeading({ as: Tag, enter, id, className, children }: Props) {
  let k = 0
  return (
    <Tag id={id} className={['mh', enter && 'enter', className].filter(Boolean).join(' ')}>
      {maskParts(children).map((p, i) =>
        /^\s+$/.test(p) ? p : (
          <span key={i} className="w">
            <span className="wi" style={{ '--k': k++ } as CSSProperties}>{p}</span>
          </span>
        ),
      )}
    </Tag>
  )
}
