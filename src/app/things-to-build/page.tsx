// Things to build (server): PageHeader with the eyebrow link back to Writing, then one tile per spec.
// Tiles are reveal blocks (.rule P4, then title, description, tags P3); the 2nd tile in a row is offset 90ms.
// The title link is stretched over the tile; hover/focus-within tints it and nudges the arrow 2px (transform only).
import Link from 'next/link'
import type { Metadata } from 'next'
import PageHeader from '@/components/site/PageHeader'
import TileTitle from '@/components/ui/TileTitle'
import { ri, rv } from '@/components/motion/reveal'
import s from './spec.module.css'

const DEK = "Projects I'm planning to build."

export const metadata: Metadata = { title: 'Things to build', description: DEK }

const SPECS = [
  {
    title: 'Tech Blog Catchup – Android App',
    description: 'A "NotebookLM-style" audio experience for engineering blogs. Users input URLs from tech blogs (Uber, Netflix, Meta, etc.), and the app converts them into conversational audio podcasts using LLMs and TTS.',
    tags: ['Mobile', 'Flutter', 'AI', 'Audio'],
    href: '/things-to-build/android-app',
  },
  {
    title: 'OpenClaw Chrome Extension',
    description: 'One-click content capture from Chrome to OpenClaw for analysis and classification. Supports categorization into Project Ideas, Read Later, Blog Posts, and more.',
    tags: ['Chrome Extension', 'OpenClaw', 'Web'],
    href: '/things-to-build/chrome-extension',
  },
]

export default function ThingsToBuildPage() {
  return (
    <div className="wrap pb-[clamp(72px,12vh,140px)]">
      <PageHeader eyebrow="Writing" eyebrowHref="/blog" title="Things to build" dek={DEK} />
      <div className={s.grid}>
        {SPECS.map((p, i) => (
          <article key={p.href} className="tile" {...rv(i % 2 ? 90 : 0)}>
            <div className="rule" />
            <div className="tile-in">
              <h2 className="h3" {...ri(0)}><Link className="tile-a" href={p.href}><TileTitle t={p.title} /></Link></h2>
              <p className={s.desc} {...ri(1)}>{p.description}</p>
              <ul className={`tags ${s.tags}`} aria-label="Tags" {...ri(2)}>{p.tags.map(t => <li key={t} className="tag">{t}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
