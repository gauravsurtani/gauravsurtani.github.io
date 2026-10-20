// Company logo slot for a role (server-safe). Shows the company's initial (a quiet tile with the same hairline) until a
// logo file is listed in logos.json:
//   "r-dlai": { "mono": "DL", "logo": "svg" }   ->   public/logos/r-dlai.svg   (or "png")
// "fill": true for a mark drawn on its own opaque square (Tassel, Bexorg, Ascendion): it fills the tile, no inset.
// Decorative (aria-hidden): the company name always sits next to it.
import Image from 'next/image'
import type { CSSProperties } from 'react'
import logos from './logos.json'
import s from './Logo.module.css'

type Slot = { mono: string; logo: 'svg' | 'png' | null; fill?: boolean }
const LOGOS = logos as { [id: string]: Slot }

export default function Logo({ id, className = '', style }: { id: string; className?: string; style?: CSSProperties }) {
  const l = LOGOS[id]
  if (!l) return null
  const src = l.logo ? `/logos/${id}.${l.logo}` : null
  return (
    <span className={`${s.logo} ${src ? s.img : `${s.mono} ${l.mono.length > 2 ? s.long : ''}`} ${className}`} style={style} data-fill={src && l.fill ? '' : undefined} aria-hidden="true">
      {src ? <Image src={src} alt="" width={28} height={28} unoptimized /> : l.mono}
    </span>
  )
}
