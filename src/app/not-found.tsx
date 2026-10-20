// Custom 404 (server), inside the shared shell. Next exports it as out/404.html with one <title> from the template.
// Motion: the PageHeader h1 mask on mount, then the three links rise (P3). No JS: static.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ri, rv } from '@/components/motion/reveal'
import PageHeader from '@/components/site/PageHeader'
import { pageMeta } from '@/components/site/meta'
import s from './not-found.module.css'

export const metadata: Metadata = pageMeta('Page not found', 'This page does not exist on gauravsurtani.github.io.')

const LINKS = [['/', 'Home'], ['/projects', 'Projects'], ['/blog', 'Writing']]

export default function NotFound() {
  return (
    <div className={`wrap ${s.nf}`}>
      <PageHeader eyebrow="404" title="Page not found" />
      <ul className={s.links} {...rv()}>
        {LINKS.map(([href, label], i) => (
          <li key={href} {...ri(i)}><Link className="lnk" href={href}>{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
