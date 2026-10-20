// Home Projects (server). "Filed as exhibits": the h2 rises out of its mask (P3) with the "All projects" link; then 4
// tiles, each filed into the record once when its proof link comes into view (projects/Filed.tsx, motion in
// Projects.module.css), in five beats: the rule draws, the name and description rise, the tags settle, the links
// rise with an amber sweep across the proof link (npm, the live site or GitHub), and the tick lands on the rule.
// The tiles use the ProjectCard classes (.tile .pc ...) so they read the same as on /projects, but render their own
// markup here: no data-rv (Filed drives them, not MotionRoot).
// Names, descriptions, tags (the first 4 technologies) and the live URLs come from constants.ts (ALL_REPOSITORIES);
// a product whose name is not its repo's (Blog2Podcast) shows the repo name under the title.
// Email-Link replaces the Speech-To-Speech fork. No screenshots exist; never mock one up.
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import { Ext } from '@/components/ui/ProjectCard'
import TileTitle from '@/components/ui/TileTitle'
import { ALL_REPOSITORIES } from '@/lib/constants'
import Filed from './projects/Filed'
import s from './Projects.module.css'

type L = { label: string; href: string; external?: boolean }
type Card = { id: string; href: string; external?: boolean; links: L[] }

const repo = (id: string) => ALL_REPOSITORIES.find(r => r.id === id)!
const gh = (id: string): L => ({ label: 'GitHub', href: repo(id).github!, external: true })
const live = (id: string) => repo(id).homepage!

// The first link of each tile is its evidence (the amber mark).
const CARDS: Card[] = [
  { id: 'dlai-mcp-server', href: live('dlai-mcp-server'), external: true,
    links: [{ label: 'npm', href: live('dlai-mcp-server'), external: true }, gh('dlai-mcp-server')] },
  { id: 'tech-blog-catchup', href: live('tech-blog-catchup'), external: true,
    links: [{ label: 'blog2podcast.com', href: live('tech-blog-catchup'), external: true }, gh('tech-blog-catchup')] },
  { id: 'pair-programmer-cli', href: repo('pair-programmer-cli').github!, external: true,
    links: [gh('pair-programmer-cli')] },
  { id: 'email-link', href: '/projects/email-link',
    links: [gh('email-link'), { label: 'Write-up', href: '/blog/email-link-knowledge-graphs' }] },
]

const A = ({ href, external, className, children }: { href: string; external?: boolean; className: string; children: ReactNode }) =>
  external
    ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    : <Link className={className} href={href}>{children}</Link>

function Tile({ id, href, external, links }: Card) {
  const r = repo(id)
  return (
    <article className={`tile pc ${s.tile}`}>
      <div className={`rule ${s.rule}`} />
      <div className="tile-in">
        <h3 className={`pc-name ${s.name}`}>
          <A className="tile-a" href={href} external={external}>{external ? <>{r.name}<Ext /></> : <TileTitle t={r.name} />}</A>
        </h3>
        {r.repo && <p className={`meta pc-meta ${s.meta}`}>{r.repo}</p>}
        <p className={`pc-desc ${s.desc}`}>{r.description}</p>
        <ul className={`tags ${s.tags}`}>
          {r.technologies.slice(0, 4).map((t, n) => <li key={t} className="tag" style={{ '--n': n } as CSSProperties}>{t}</li>)}
        </ul>
        <p className={`tile-links ${s.links}`}>
          {links.map((l, i) => (
            <A key={l.label} className={i ? 'lnk' : `lnk ${s.ev}`} href={l.href} external={l.external}>
              {l.label}{l.external && <Ext />}
            </A>
          ))}
        </p>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={`sec ${s.sec}`} aria-labelledby="proj-h" tabIndex={-1}>
      <div className="wrap">
        <div className="sec-h" {...rv()}>
          <MaskHeading as="h2" id="proj-h" className="h2">Projects</MaskHeading>
          <span {...ri(0)}><Link className="lnk" href="/projects">All projects</Link></span>
        </div>
        <Filed className={s.grid}>
          {CARDS.map(c => <Tile key={c.id} {...c} />)}
        </Filed>
      </div>
    </section>
  )
}
