// /about (server). SPEC 2.3 and WP6: PageHeader, then two columns at 1024px and up.
// Left: the story (3 paragraphs, no heading of its own: the page header names it) and "Building now" (content/building.json
// rows that have a vetted label and proof in about/rows.json, the same rows home shows).
// Right, sticky: the facts list. No deployment-status words anywhere on the page (the home rule).
// Motion: mask h2s (P3), rise on reach (P3), record rules (P4).
// On load the page h1 masks in first (PageHeader), then the story follows at +140ms and, at 1024px and up, the facts
// column at +240ms (--o, set in about.module.css), so the eye is led title -> story -> facts.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import PageHeader from '@/components/site/PageHeader'
import { pageMeta } from '@/components/site/meta'
import CopyEmail from '@/components/ui/CopyEmail'
import { Ext } from '@/components/ui/ProjectCard'
import { resume } from '@/content/resume'
import { getState } from '@/lib/state'
import rows from '@/components/home/about/rows.json'

const ROWS = rows as Record<string, { label: string; proof: string }>
import s from './about.module.css'

export const metadata: Metadata = pageMeta(
  'About',
  `${resume.name} is an AI engineer in the ${resume.location}, the founding and sole engineer on DeepLearning.AI's three AI recruiting products.`,
  '/about',
)

const host = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const ext = { target: '_blank', rel: 'noopener noreferrer' }

const Fact = ({ k, i, children }: { k: string; i: number; children: ReactNode }) => (
  <div className={s.fact} {...ri(i)}>
    <dt className="meta">{k}</dt>
    <dd>{children}</dd>
  </div>
)

export default function AboutPage() {
  const state = getState()
  const now = state?.now.filter(n => ROWS[n.name]) ?? []
  return (
    <div className={`wrap ${s.page}`}>
      <PageHeader eyebrow="About" title={resume.name} dek={`${resume.title} · ${resume.location}`} />

      <div className={s.grid}>
        <div className={s.main}>
          <div {...rv(140)}>
            <div className={s.story}>
              <p {...ri(0)}>
                I&apos;m Gaurav Surtani, an AI engineer in the San Francisco Bay Area. I build LLM applications,
                and I have spent eight years across full-stack, data and ML engineering.
              </p>
              <p {...ri(1)}>
                At DeepLearning.AI I am the founding and sole engineer on three AI recruiting products: an AI
                technical interviewer used in live hiring, a recruiter sourcing and review tool, and the Valence
                Career Agent, which helps candidates find their next role.
              </p>
              <p {...ri(2)}>
                Before that I built a natural-language analytics tool and ML quality control at Bexorg, a
                personalized graduation-video pipeline at Tassel, and flight-path analysis at NASA Ames. I hold an
                MS in Artificial Intelligence from San Jose State University. On the side I run{' '}
                <a className="inl" href="https://blog2podcast.com">blog2podcast.com</a>.
              </p>
            </div>
          </div>

          {now.length > 0 && (
            <section className={s.now} aria-labelledby="now-h">
              <div className={`sec-h ${s.h}`} {...rv()}>
                <MaskHeading as="h2" id="now-h" className="h2">Building now</MaskHeading>
              </div>
              <ul className={s.recs}>
                {now.map(n => (
                  <li key={n.name} {...rv()}>
                    <div className="rule" />
                    <div className={s.rec}>
                      <div className={s.recHead} {...ri(0)}>
                        <h3 className={s.name}>{n.name}</h3>
                        <span className="st" data-st={n.state}>{ROWS[n.name].label}</span>
                      </div>
                      <div className={s.recBody}>
                        <p className={s.what} {...ri(1)}>{ROWS[n.name].proof}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className={s.side} aria-label="Facts">
          <div className={s.sideIn} {...rv()}>
            <div className="rule" />
            <dl className={s.facts}>
              <Fact k="Location" i={0}>{resume.location}</Fact>
              <Fact k="Education" i={1}>{resume.education}</Fact>
              <Fact k="Email" i={2}>
                <a className={`lnk ${s.email}`} href={`mailto:${resume.email}`} data-email="">{resume.email}</a>
                <CopyEmail />
              </Fact>
              <Fact k="LinkedIn" i={3}><a className="lnk" href={resume.linkedin} {...ext}>{host(resume.linkedin)}<Ext /></a></Fact>
              <Fact k="GitHub" i={4}><a className="lnk" href={resume.github} {...ext}>{host(resume.github)}<Ext /></a></Fact>
              <Fact k="Resume" i={5}><a className="lnk" href={resume.resume}>Resume (PDF)</a></Fact>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
