// Writing index (server). PageHeader + a "Things to build" link, then one tile per post (newest first).
// Each tile is a reveal block: .rule draws (P4), then meta, title, description and tags rise (P3). The title link is
// stretched over the tile (.tile-a); hover (fine pointer, not while scrolling) or focus-within tints it and nudges
// the arrow 2px toward the post. Text never moves.
import Link from 'next/link'
import type { Metadata } from 'next'
import PageHeader from '@/components/site/PageHeader'
import TileTitle from '@/components/ui/TileTitle'
import { ri, rv } from '@/components/motion/reveal'
import { getAllPosts, formatDate } from '@/lib/posts'
import s from './blog.module.css'

const DEK = 'Writing on AI and machine learning.'

export const metadata: Metadata = { title: 'Writing', description: DEK }

export default function BlogPage() {
  return (
    <div className="wrap pb-[clamp(72px,12vh,140px)]">
      <div className={s.head}>
        <PageHeader eyebrow="Writing" title="Writing" dek={DEK} />
        <Link className={`lnk ${s.side}`} href="/things-to-build">Things to build</Link>
      </div>
      <div className={s.list}>
        {getAllPosts().map(p => (
          <article key={p.slug} className="tile" {...rv()}>
            <div className="rule" />
            <div className={`tile-in ${s.in}`}>
              <p className={`meta ${s.meta}`} {...ri(0)}>
                <time dateTime={p.date}>{formatDate(p.date)}</time><span className={s.dot}> ·</span> <span className={s.rt}>{p.readingTime} min read</span>
              </p>
              <h2 className="h3" {...ri(1)}>
                <Link className="tile-a" href={`/blog/${p.slug}`}><TileTitle t={p.title} /></Link>
              </h2>
              <p className={s.desc} {...ri(2)}>{p.description}</p>
              {p.tags.length > 0 && (
                <ul className={`tags ${s.tags}`} aria-label="Tags" {...ri(3)}>{p.tags.map(t => <li key={t} className="tag">{t}</li>)}</ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
