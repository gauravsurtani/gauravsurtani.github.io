// Spec page (server). PageHeader with the eyebrow link to Things to build, then one record per section:
// a reveal block with the .rule (P4), a mask h2 and its content (P3), styled by the detail-page record classes
// (label | body, like /projects/[slug]). Content verbatim from the old page, minus deleted lines.
// The android-app page has the same markup; keep the two in step.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageHeader from '@/components/site/PageHeader'
import { pageMeta } from '@/components/site/meta'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import d from '@/app/projects/[slug]/detail.module.css'

const TITLE = 'OpenClaw Chrome Extension'
const DEK = 'One-click content capture from Chrome to OpenClaw for analysis and classification.'

export const metadata: Metadata = pageMeta(TITLE, DEK, '/things-to-build/chrome-extension')

const FEATURES = [
  ['Toolbar Button', 'Click to capture current tab content'],
  ['Context Menu', 'Right-click to Send to OpenClaw'],
  ['Keyboard Shortcut', 'Cmd/Ctrl+Shift+O for quick capture'],
  ['Classification Categories', 'Project Idea, Read Later, Blog Post, Explore, Todo'],
  ['OpenClaw Integration', 'Send URL + content for AI analysis'],
  ['Notifications', 'Success/error feedback'],
]
const STACK = ['Chrome Extension (MV3)', 'JavaScript', 'TypeScript', 'React', 'Chrome Storage API']

const Rec = ({ h, children }: { h: string; children: ReactNode }) => (
  <section className={d.rec} {...rv()}>
    <div className={`rule ${d.rule}`} />
    <MaskHeading as="h2" className={`h3 ${d.h}`}>{h}</MaskHeading>
    {children}
  </section>
)

export default function ChromeExtensionSpec() {
  return (
    <div className="wrap pb-[clamp(72px,12vh,140px)]">
      <PageHeader eyebrow="Things to build" eyebrowHref="/things-to-build" title={TITLE} dek={DEK} />
      <div>
        <Rec h="Overview">
          <p className={d.text} {...ri(0)}>
            A Chrome extension designed to capture web content (pages, posts) and send it to OpenClaw for analysis and classification. Users can quickly save content with categories like Project Ideas, Read Later, Blog Posts, and more.
          </p>
        </Rec>
        <Rec h="Core Features">
          <ul className={d.list}>
            {FEATURES.map(([k, v], i) => <li key={k} {...ri(i)}><strong>{k}:</strong> {v}</li>)}
          </ul>
        </Rec>
        <Rec h="Technology Stack">
          <ul className={`tags ${d.text}`} aria-label="Technology Stack" {...ri(0)}>{STACK.map(t => <li key={t} className="tag">{t}</li>)}</ul>
        </Rec>
        <Rec h="Status">
          <p className={d.text} {...ri(0)}><span className="st">Planned</span></p>
        </Rec>
      </div>
    </div>
  )
}
