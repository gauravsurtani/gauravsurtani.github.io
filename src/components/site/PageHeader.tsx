// Subpage header (server): mono eyebrow (a link to the parent when eyebrowHref is set, 44px target),
// display h1 that rises out of a line mask on mount (MaskHeading enter), and an optional one-line dek.
//
//   <PageHeader eyebrow="Writing" eyebrowHref="/blog" title={post.title} dek="..." />
//
// The h1 is a plain string (MaskHeading splits it into words). Styles: .ph-* in globals.css.
// Motion (globals.css, CSS from first paint, also on a client navigation): eyebrow fades at 0, h1 mask from 40ms,
// dek rises at 220ms. Reduced motion and no JS: static.
import Link from 'next/link'
import type { ReactNode } from 'react'
import MaskHeading from '@/components/motion/MaskHeading'

type Props = { eyebrow: ReactNode; eyebrowHref?: string; title: string; dek?: ReactNode }

export default function PageHeader({ eyebrow, eyebrowHref, title, dek }: Props) {
  return (
    <header className="ph">
      {eyebrowHref ? <Link className="ph-eyebrow lnk" href={eyebrowHref}>{eyebrow}</Link> : <p className="ph-eyebrow">{eyebrow}</p>}
      <MaskHeading as="h1" enter className="display">{title}</MaskHeading>
      {dek && <p className="ph-dek">{dek}</p>}
    </header>
  )
}
