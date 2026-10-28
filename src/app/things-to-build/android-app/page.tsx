// Spec page (server). PageHeader with the eyebrow link to Things to build, then one record per section:
// a reveal block with the .rule (P4), a mask h2 and its content (P3), styled by the detail-page record classes
// (label | body, like /projects/[slug]). Content verbatim from the old page, minus deleted lines.
// The chrome-extension page has the same markup; keep the two in step.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageHeader from '@/components/site/PageHeader'
import { pageMeta } from '@/components/site/meta'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import d from '@/app/projects/[slug]/detail.module.css'

const TITLE = 'Blog2Podcast Android app'
const DEK = 'A NotebookLM-style audio experience for engineering blogs.'

export const metadata: Metadata = pageMeta(TITLE, DEK, '/things-to-build/android-app')

const FEATURES = [
  ['URL Input', 'Simple text field to paste blog URLs'],
  ['Share Extension', 'Android system intent to Share to Blog2Podcast'],
  ['LLM Script Generation', 'Transform technical text into dialogue scripts'],
  ['TTS Audio Synthesis', 'Generate MP3 podcasts using ElevenLabs or OpenAI'],
  ['Podcast Player', 'Standard controls with background playback'],
  ['Library Management', 'History, favorites, and status tracking'],
]
const STACK = ['Flutter', 'Riverpod', 'Material 3', 'just_audio', 'Dio', 'Firebase']

const Rec = ({ h, children }: { h: string; children: ReactNode }) => (
  <section className={d.rec} {...rv()}>
    <div className={`rule ${d.rule}`} />
    <MaskHeading as="h2" className={`h3 ${d.h}`}>{h}</MaskHeading>
    {children}
  </section>
)

export default function AndroidAppSpec() {
  return (
    <div className="wrap pb-[clamp(72px,12vh,140px)]">
      <PageHeader eyebrow="Things to build" eyebrowHref="/things-to-build" title={TITLE} dek={DEK} />
      <div>
        <Rec h="Overview">
          <p className={d.text} {...ri(0)}>
            This project aims to create an Android application that transforms technical blog posts into audio podcasts using LLM-generated scripts and TTS. Users input URLs from tech blogs (Uber, Netflix, Meta, etc.), and the app converts them into conversational audio podcasts.
          </p>
        </Rec>
        <Rec h="Key Features">
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
