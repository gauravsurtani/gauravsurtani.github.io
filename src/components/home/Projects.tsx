// Home Projects (server). "Filed as exhibits": the h2 rises out of its mask (P3) with the "All projects" link; then 4
// tiles, each filed into the record once when its proof link comes into view (projects/Filed.tsx, motion in
// Projects.module.css): the rule draws, a frame opens from both ends of it, the name rises, the description prints,
// the tags stamp in, an amber sweep marks the proof link (npm, the live site or GitHub), an amber line runs from it up
// to the rule and the tick lands; the frame folds back and only the evidence marks stay.
// The tiles use the ProjectCard classes (.tile .pc ...) so they read the same as on /projects, but render their own
// markup here: no data-rv (Filed drives them, not MotionRoot), plus the frame SVG and the evidence caret.
// Descriptions, tags (the first 4 technologies) and the live URLs come from constants.ts (ALL_REPOSITORIES).
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
type Card = { id: string; name: string; href: string; external?: boolean; links: L[] }

const repo = (id: string) => ALL_REPOSITORIES.find(r => r.id === id)!
const gh = (id: string): L => ({ label: 'GitHub', href: repo(id).github!, external: true })
const live = (id: string) => repo(id).homepage!

// The first link of each tile is its evidence (the amber mark).
const CARDS: Card[] = [
  { id: 'dlai-mcp-server', name: 'dlai-mcp-server', href: live('dlai-mcp-server'), external: true,
    links: [{ label: 'npm', href: live('dlai-mcp-server'), external: true }, gh('dlai-mcp-server')] },
  { id: 'tech-blog-catchup', name: 'tech-blog-catchup', href: live('tech-blog-catchup'), external: true,
    links: [{ label: 'blog2podcast.com', href: live('tech-blog-catchup'), external: true }, gh('tech-blog-catchup')] },
  { id: 'pair-programmer-cli', name: 'pair-programmer-cli', href: repo('pair-programmer-cli').github!, external: true,
    links: [gh('pair-programmer-cli')] },
  { id: 'email-link', name: 'Email-Link', href: '/projects/email-link',
    links: [gh('email-link'), { label: 'Write-up', href: '/blog/email-link-knowledge-graphs' }] },
]

const A = ({ href, external, className, children }: { href: string; external?: boolean; className: string; children: ReactNode }) =>
  external
    ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    : <Link className={className} href={href}>{children}</Link>

function Tile({ id, name, href, external, links }: Card) {
  return (
    <article className={`tile pc ${s.tile}`}>
      <div className={`rule ${s.rule}`} />
      <div className="tile-in">
        <h3 className={`pc-name ${s.name}`}>
          <A className="tile-a" href={href} external={external}>{external ? <>{name}<Ext /></> : <TileTitle t={name} />}</A>
        </h3>
        <p className={`pc-desc ${s.desc}`}>{repo(id).description}</p>
        <ul className={`tags ${s.tags}`}>
          {repo(id).technologies.slice(0, 4).map((t, n) => <li key={t} className="tag" style={{ '--n': n } as CSSProperties}>{t}</li>)}
        </ul>
        <p className={`tile-links ${s.links}`}>
          {links.map((l, i) => (
            <A key={l.label} className={i ? 'lnk' : `lnk ${s.ev}`} href={l.href} external={l.external}>
              {l.label}{l.external && <Ext />}
              {!i && <><i className={s.car} aria-hidden="true" /><i className={s.ring} aria-hidden="true" /></>}
            </A>
          ))}
        </p>
      </div>
      <svg className={s.svg} aria-hidden="true" focusable="false">
        <path className={s.fr} pathLength={1} />
        <path className={s.fr} pathLength={1} />
        <path className={s.ct} pathLength={1} />
      </svg>
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
