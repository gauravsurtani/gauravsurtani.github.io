// P3 Rise and P4 Span: reach reveals. Markup helpers (server-safe). MotionRoot does the observing.
//
// Contract:
//   - A reveal block carries data-rv:            <section {...rv()}>   or   <article {...rv(90)}>  (90ms block offset)
//   - Its stagger items carry data-ri and --i:   <p {...ri(0)}>...</p> <ul {...ri(1)}>...</ul>
//   - .rule, .mh (MaskHeading) and .mark (Mark) inside the block follow the block. The .rule draws first, the items
//     rise 60ms later: delay = --o + 60ms + min(i, 6) x 40ms.
//   - Never nest one data-rv inside another.
//   - Never put transform, opacity or transition on a [data-ri] element in a CSS module. Wrap it instead.
//   - The block is revealed once, when its top crosses 85% of the viewport height, and never hidden again.
//     Blocks above the viewport (jump, deep link, restored scroll) reveal at once with transitions off.
//   - Hidden states exist only under html.mo (JS ran, motion allowed). No JS or reduced motion: everything visible.
//
// Merge your own style: <li {...ri(i, { gridColumn: '1 / -1' })}>
import type { CSSProperties } from 'react'

type Style = CSSProperties & { [k: `--${string}`]: string | number }

export const ri = (i: number, style?: CSSProperties) => ({
  'data-ri': '',
  style: { '--i': i, ...style } as Style,
})

export const rv = (o?: number, style?: CSSProperties) => ({
  'data-rv': '',
  ...(o != null || style ? { style: { ...(o != null ? { '--o': `${o}ms` } : {}), ...style } as Style } : {}),
})
