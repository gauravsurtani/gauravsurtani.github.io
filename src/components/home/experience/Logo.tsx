// Company logo slot for a role (server-safe). Shows the company's monogram (initials in the mono face on --surface
// with a hairline) until a logo file is listed in logos.json:
//   "r-dlai": { "mono": "DL", "logo": "svg" }   ->   public/logos/r-dlai.svg   (or "png")
// Decorative (aria-hidden): the company name always sits next to it.
import Image from 'next/image'
import type { CSSProperties } from 'react'
import logos from './logos.json'
import s from './Logo.module.css'

type Slot = { mono: string; logo: 'svg' | 'png' | null }
const LOGOS = logos as { [id: string]: Slot }

export default function Logo({ id, className = '', style }: { id: string; className?: string; style?: CSSProperties }) {
  const l = LOGOS[id]
  if (!l) return null
  const src = l.logo ? `/logos/${id}.${l.logo}` : null
  return (
    <span className={`${s.logo} ${src ? s.img : l.mono.length > 2 ? s.long : ''} ${className}`} style={style} aria-hidden="true">
      {src ? <Image src={src} alt="" width={28} height={28} unoptimized /> : l.mono}
    </span>
  )
}
