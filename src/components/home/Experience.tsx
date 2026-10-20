// Home Experience (server). Every role as a full record, newest first (content/resume.ts `records`): header, the
// resume bullets (one Mark per resume role), the role's projects as lighter sub-records, then one mono Stack line.
// Frozen: the record ids and data-cite keys (they are the timeline rows), tabIndex={-1}. Scene A (TraceFollow) reads
// [data-cite] in DOM order.
//
// Motion: a record is several data-rv blocks, so each part rises when it is reached. The head block draws its .rule
// (P4), then header, title line, note and bullets rise (P3, 40ms stagger capped at 6), and the role's Mark draws 420ms
// after the reveal (P5). Then the "Projects" label, each project, and the Stack line are blocks of their own.
// Projects sit in a native <details>, open in the HTML (no JS and reduced motion show everything). Desktop: always open,
// the summary hidden, the mono label above the list. Phones: the summary is the label plus the project names in one run;
// TraceFollow closes every fold at load (CSS shows them closed from first paint, so nothing moves) and one tap opens one.
// Desktop header: company left, dates right, then "title · place". Phones (G13): one mono line "dates · place"
// above the company. Each role header carries its logo slot (experience/Logo: a monogram until logos.json lists a file).
// TraceFollow is the client part: Scene A and the timeline camera on desktop, the evidence strip (and its camera)
// under 1024px, and the scrubbed highlighter on each role's Mark.
import MaskHeading from '@/components/motion/MaskHeading'
import { Rich } from '@/components/motion/Mark'
import { ri, rv } from '@/components/motion/reveal'
import { Ext } from '@/components/ui/ProjectCard'
import { records } from '@/content/resume'
import s from './Experience.module.css'
import Logo from './experience/Logo'
import TraceFollow from './TraceFollow'

const out = { target: '_blank', rel: 'noopener noreferrer' }

export default function Experience() {
  return (
    <section id="experience" className={`sec ${s.exp}`} aria-labelledby="exp-h" tabIndex={-1}>
      <div className="sec-h" {...rv()}>
        <MaskHeading as="h2" id="exp-h" className="h2">Experience</MaskHeading>
        <span className="meta" {...ri(0)}>2018 – now</span>
      </div>

      {records.map(r => {
        const b0 = r.note ? 3 : 2
        return (
          <article key={r.id} className={s.role} id={r.id} tabIndex={-1} data-cite={r.k}>
            <div {...rv()}>
              <div className="rule" />
              <div {...ri(0)}>
                <p className={`meta ${s.ph}`}><span>{r.when} ·</span> <span>{r.place}</span></p>
                <div className={s.hl}>
                  <div className={s.who}>
                    <Logo id={r.id} />
                    <h3 className="h3">
                      {r.companyHref ? <a className={s.co} href={r.companyHref} {...out}>{r.company}<Ext /></a> : r.company}
                    </h3>
                  </div>
                  <span className={`meta ${s.when}`}>{r.when}</span>
                </div>
              </div>
              <p className={s.ti} {...ri(1)}>
                {r.title}<span className={s.loc}> · {r.place}</span>
              </p>
              {r.note && <p className={s.note} {...ri(2)}>{r.note}</p>}
              {r.bullets.length > 0 && (
                <ul className={s.pts}>
                  {r.bullets.map((b, i) => <li key={i} {...ri(i + b0)}><Rich text={b} /></li>)}
                </ul>
              )}
            </div>

            {r.projects.length > 0 && (
              <details className={s.prj} open>
                <summary className={s.sum} {...rv()}>
                  <span className={s.sh} {...ri(0)}>Projects <span className={s.pc}>{r.projects.length}</span><i className={s.chev} aria-hidden="true" /></span>
                  <span className={s.nm} {...ri(1)}>{r.projects.map(p => p.name).join(' · ')}</span>
                </summary>
                <p className={s.pl} {...rv()}><span {...ri(0)}>Projects <span className={s.pc}>{r.projects.length}</span></span></p>
                <ul className={s.pjs}>
                  {r.projects.map(p => (
                    <li key={p.name} {...rv()}>
                      <div className={s.pj} {...ri(0)}>
                        <h4 className={s.pn}>{p.href ? <a href={p.href} {...out}>{p.name}<Ext /></a> : p.name}</h4>
                        <p className={s.pd}>{p.desc}</p>
                        {p.points.length > 0 && (
                          <ul className={s.pp}>{p.points.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div {...rv()}>
              <p className={s.stk} {...ri(0)}>
                <span className={s.sl}>Stack</span>{' '}
                {/* an item never splits, and a line never starts with a dot */}
                {r.stack.map((it, i) => <span key={it}><span className={s.si}>{it}{i < r.stack.length - 1 && '\u00a0·'}</span> </span>)}
              </p>
            </div>
          </article>
        )
      })}

      <TraceFollow />
    </section>
  )
}
