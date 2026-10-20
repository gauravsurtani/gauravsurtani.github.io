// Project tile (server). One reveal block: the .rule draws (P4), then name, meta, description, tags and links rise
// (P3). The meta line sits under the name, like the date line of a post record. An internal href gets the right
// arrow (TileTitle), an external one the up-right arrow (Ext). The name link is stretched over the whole tile
// (.tile-a::before), so the tile is the hit area; secondary links sit above it (.tile-links). Hover (fine pointer, not while scrolling) or focus-within tints the tile and
// nudges the arrow; the focus ring is drawn around the tint. Text never moves.
//
//   <ProjectCard name="dlai-mcp-server" href="https://www.npmjs.com/package/dlai-mcp-server" external
//     description="..." tags={['TypeScript', 'MCP Protocol']} o={90}
//     links={[{ label: 'npm', href: '...', external: true }, { label: 'GitHub', href: '...', external: true }]}
//     meta="TypeScript · Apr 2026" />
//
// No href (private work): the name is plain text and the card is not a .tile, so it gets no hover.
// o = block offset in ms (the 2nd tile in a row uses 90). Grids of tiles need a column gap of 40px or more
// (the hover tint bleeds 16px each side). Also exports <Ext/>, the external-link arrow (.ext) used site-wide.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ri as item, rv } from '@/components/motion/reveal'
import TileTitle from '@/components/ui/TileTitle'

export const Ext = () => (
  <svg className="ext" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

type L = { label: string; href: string; external?: boolean }

export type ProjectCardProps = {
  name: string
  href?: string
  external?: boolean
  description: ReactNode
  tags: string[]
  links: L[]
  meta?: ReactNode
  o?: number
}

const A = ({ href, external, className, children }: { href: string; external?: boolean; className: string; children: ReactNode }) =>
  external
    ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    : <Link className={className} href={href}>{children}</Link>

export default function ProjectCard({ name, href, external, description, tags, links, meta, o }: ProjectCardProps) {
  let i = 0
  const ri = () => item(i++)
  return (
    <article className={href ? 'tile pc' : 'pc'} {...rv(o)}>
      <div className="rule" />
      <div className="tile-in">
        <h3 className="pc-name" {...ri()}>
          {href ? <A className="tile-a" href={href} external={external}>{external ? <>{name}<Ext /></> : <TileTitle t={name} />}</A> : name}
        </h3>
        {meta && <p className="meta pc-meta" {...ri()}>{meta}</p>}
        <p className="pc-desc" {...ri()}>{description}</p>
        {tags.length > 0 && (
          <ul className="tags" {...ri()}>{tags.map(t => <li key={t} className="tag">{t}</li>)}</ul>
        )}
        {links.length > 0 && (
          <p className="tile-links" {...ri()}>
            {links.map(l => <A key={l.label} className="lnk" href={l.href} external={l.external}>{l.label}{l.external && <Ext />}</A>)}
          </p>
        )}
      </div>
    </article>
  )
}
