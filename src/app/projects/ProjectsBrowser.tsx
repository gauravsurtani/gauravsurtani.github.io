'use client'
// /projects browser (client). Search, sort, Featured, one category at a time (press it again to clear) and a
// technology select. Every change updates the grid at once; a polite live region says "Showing N of M".
// Default view (no search, no filter): the featured repos as cards, the rest under "Archive" as one 44px row each
// (name link + arrow, language · year · Fork). Any search or filter: every result as a card. The sort orders both.
// A product named apart from its repo (Blog2Podcast) shows the repo name first in its meta line; search finds both.
// Each tile is a ProjectCard reveal block and the Archive is one, so blocks that mount after a filter change rise
// through MotionRoot's shared observer (no motion of their own). Ends with the "All on GitHub" button.
// Without JS the controls are hidden (they cannot work) and the default view shows, rendered on the server.
import Link from 'next/link'
import { useMemo, useState } from 'react'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import ProjectCard, { Ext } from '@/components/ui/ProjectCard'
import TileTitle from '@/components/ui/TileTitle'
import type { ALL_REPOSITORIES } from '@/lib/constants'
import s from './projects.module.css'

type Repo = (typeof ALL_REPOSITORIES)[number]
type L = { label: string; href: string; external?: boolean }

// the slugs that have a /projects/[slug] page (keep in step with projectsData in [slug]/page.tsx)
const DETAILS = new Set(['dlai-mcp-server', 'tech-blog-catchup', 'pair-programmer-cli', 'email-link', 'wat-to-eat', 'company-stats',
  'fire-prediction', 'youtube-history-extension'])
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = (iso: string) => `${MON[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}`   // no Date: no timezone drift
const byName = (a: Repo, b: Repo) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
const byUpdated = (a: Repo, b: Repo) => b.updatedAt.localeCompare(a.updatedAt)
const tally = (xs: string[]) => {
  const m = new Map<string, number>()
  xs.forEach(x => m.set(x, (m.get(x) ?? 0) + 1))
  return [...m]
}

const Chevron = () => (
  <svg className={s.chev} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const detailsOf = (r: Repo) => (DETAILS.has(r.id) ? `/projects/${r.id}` : undefined)

function Card({ r, tech }: { r: Repo; tech: string }) {
  const details = detailsOf(r)
  const links = [
    r.github && { label: 'GitHub', href: r.github, external: true },
    r.homepage && { label: r.homepage.includes('npmjs.com') ? 'npm' : new URL(r.homepage).hostname.replace(/^www\./, ''), href: r.homepage, external: true },
    details && { label: 'Details', href: details },
  ].filter(Boolean) as L[]
  // the selected technology leads the tags, so a match is visible on the tile
  const tags = (tech && r.technologies.includes(tech) ? [tech, ...r.technologies.filter(t => t !== tech)] : r.technologies).slice(0, 4)
  const meta = [r.repo, r.language, `updated ${month(r.updatedAt)}`, r.forked && 'Fork', !r.github && 'Private'].filter(Boolean).join(' · ')
  // no repo and no page (private work): no href, so the card has no link and no hover
  const href = details ?? r.github ?? r.homepage
  return <ProjectCard name={r.name} href={href} external={!details} description={r.description} tags={tags} links={links} meta={meta} />
}

// Archive row: the name is the link (right arrow to a details page, up-right arrow to GitHub), meta on the right
function Row({ r, i }: { r: Repo; i: number }) {
  const details = detailsOf(r)
  const ext = r.github ?? r.homepage
  const meta = [r.repo, r.language, r.updatedAt.slice(0, 4), r.forked && 'Fork'].filter(Boolean).join(' · ')
  return (
    <li {...ri(i)}>
      {details ? <Link className={s.an} href={details}><TileTitle t={r.name} /></Link>
        : ext ? <a className={s.an} href={ext} target="_blank" rel="noopener noreferrer">{r.name}<Ext /></a>
        : <span className={s.an}>{r.name}</span>}
      <span className={`meta ${s.am}`}>{meta}</span>
    </li>
  )
}

export default function ProjectsBrowser({ repos, github }: { repos: Repo[]; github: string }) {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('updated')
  const [featured, setFeatured] = useState(false)
  const [cat, setCat] = useState('')
  const [tech, setTech] = useState('')

  const { cats, techs, nFeatured } = useMemo(() => ({
    cats: tally(repos.map(r => r.category)).sort((a, b) => b[1] - a[1]),
    techs: tally(repos.flatMap(r => [...new Set([r.language, ...r.technologies])])).sort((a, b) => a[0].localeCompare(b[0], 'en', { sensitivity: 'base' })),
    nFeatured: repos.filter(r => r.featured).length,
  }), [repos])

  const k = q.trim().toLowerCase()
  const split = !k && !featured && !cat && !tech
  const shown = useMemo(() => {
    // filter() returns a new array, so the shared constant is never sorted in place
    return repos.filter(r =>
      (!featured || r.featured) &&
      (!cat || r.category === cat) &&
      (!tech || r.language === tech || r.technologies.includes(tech)) &&
      (!k || [r.name, r.repo ?? '', r.description, ...r.technologies].some(x => x.toLowerCase().includes(k))),
    ).sort(sort === 'name' ? byName : byUpdated)
  }, [repos, k, sort, featured, cat, tech])
  const cards = split ? shown.filter(r => r.featured) : shown
  const archive = split ? shown.filter(r => !r.featured) : []

  const clearAll = () => { setQ(''); setFeatured(false); setCat(''); setTech('') }

  return (
    <div>
      <div className={s.bar} {...rv()}>
        <div className={s.fields} {...ri(0)}>
          <label className={s.search}>
            <span className="sr">Search projects</span>
            <svg className={s.glass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" />
            </svg>
            <input className={s.field} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search" autoComplete="off" spellCheck={false} />
          </label>
          <label className={s.sel}>
            <span className="sr">Sort</span>
            <select className={s.field} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="updated">Recently updated</option>
              <option value="name">Name A–Z</option>
            </select>
            <Chevron />
          </label>
          <label className={`${s.sel} ${s.tech}`}>
            <span className="sr">Technology</span>
            <select className={s.field} value={tech} onChange={e => setTech(e.target.value)}>
              <option value="">All technologies</option>
              {techs.map(([t, n]) => <option key={t} value={t}>{t} ({n})</option>)}
            </select>
            <Chevron />
          </label>
          {tech && <button type="button" className="btn btn-sm" onClick={() => setTech('')}>Clear</button>}
        </div>
        <div className={s.toggles} role="group" aria-label="Filters" {...ri(1)}>
          <button type="button" className={s.tg} aria-pressed={featured} onClick={() => setFeatured(!featured)}>
            Featured<span className={s.n}>{nFeatured}</span>
          </button>
          <span className={s.sep} aria-hidden="true" />
          {cats.map(([c, n]) => (
            <button key={c} type="button" className={s.tg} aria-pressed={cat === c} onClick={() => setCat(cat === c ? '' : c)}>
              {c}<span className={s.n}>{n}</span>
            </button>
          ))}
        </div>
        <p className={`meta ${s.count}`} role="status" {...ri(2)}>Showing {shown.length} of {repos.length}</p>
      </div>

      {/* keys: the grid and the empty state are different nodes, so the empty state mounts fresh and reveals */}
      {shown.length > 0 ? (
        <div key="grid" className={s.grid}>
          {cards.map(r => <Card key={r.id} r={r} tech={tech} />)}
        </div>
      ) : (
        <div key="empty" className={s.empty} {...rv()}>
          <div className="rule" />
          <p className={s.emptyT} {...ri(0)}>No projects match these filters.</p>
          <div {...ri(1)}><button type="button" className="btn" onClick={clearAll}>Clear all filters</button></div>
        </div>
      )}

      {archive.length > 0 && (
        <section className={s.archive} aria-labelledby="archive-h" {...rv()}>
          <div className="sec-h"><MaskHeading as="h2" id="archive-h" className="h2">Archive</MaskHeading></div>
          <ul className={s.al}>{archive.map((r, i) => <Row key={r.id} r={r} i={i} />)}</ul>
        </section>
      )}

      <div className={s.end} {...rv()}>
        <div {...ri(0)}>
          <a className="btn" href={`${github}?tab=repositories`} target="_blank" rel="noopener noreferrer">All on GitHub<Ext /></a>
        </div>
      </div>
    </div>
  )
}
