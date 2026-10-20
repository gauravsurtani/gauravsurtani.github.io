// Home Experience (server). Five role records and the Earlier rows, every resume bullet verbatim, one Mark per role.
// Frozen: the record ids (r-dlai, r-b2p, r-tassel, r-bexorg, r-nasa, r-sjsu, r-asc, r-acc, r-ent), tabIndex={-1}
// and the data-cite keys. Scene A (TraceFollow) reads [data-cite] in DOM order.
//
// Motion: each record is one data-rv block. The .rule draws (P4), then header, title line and bullets rise (P3,
// 40ms stagger capped at 6), and the role's one Mark draws 420ms after the reveal (P5). Earlier is one more block.
// Desktop header: company left, dates right, then "title · place". Phones (G13): one mono line "dates · place"
// above the company. Each role header carries its logo slot (experience/Logo: a monogram until logos.json lists a file).
// TraceFollow is the client part: Scene A and the timeline camera on desktop, the evidence strip (and its camera)
// under 1024px, and the scrubbed highlighter on each role's Mark.
import MaskHeading from '@/components/motion/MaskHeading'
import { Rich } from '@/components/motion/Mark'
import { ri, rv } from '@/components/motion/reveal'
import { Ext } from '@/components/ui/ProjectCard'
import { resume } from '@/content/resume'
import s from './Experience.module.css'
import Logo from './experience/Logo'
import TraceFollow from './TraceFollow'

export default function Experience() {
  return (
    <section id="experience" className={`sec ${s.exp}`} aria-labelledby="exp-h" tabIndex={-1}>
      <div className="sec-h" {...rv()}>
        <MaskHeading as="h2" id="exp-h" className="h2">Experience</MaskHeading>
        <span className="meta" {...ri(0)}>2018 – now</span>
      </div>

      {resume.roles.map(r => (
        <article key={r.id} className={s.role} id={r.id} tabIndex={-1} data-cite={r.k} {...rv()}>
          <div className="rule" />
          <div {...ri(0)}>
            <p className={`meta ${s.ph}`}><span>{r.when} ·</span> <span>{r.place}</span></p>
            <div className={s.hl}>
              <div className={s.who}>
                <Logo id={r.id} />
                <h3 className="h3">
                  {r.companyHref
                    ? <a className={s.co} href={r.companyHref} target="_blank" rel="noopener noreferrer">{r.company}<Ext /></a>
                    : r.company}
                </h3>
              </div>
              <span className={`meta ${s.when}`}>{r.when}</span>
            </div>
          </div>
          <p className={s.ti} {...ri(1)}>
            {r.title}<span className={s.loc}> · {r.place}</span>
          </p>
          <ul className={s.pts}>
            {r.bullets.map((b, i) => <li key={i} {...ri(i + 2)}><Rich text={b} /></li>)}
          </ul>
        </article>
      ))}

      <div className={s.earlier} {...rv()}>
        <h3 className={s.eh} {...ri(0)}>Earlier</h3>
        <ul className={s.el}>
          {resume.earlier.map((e, i) => (
            <li key={e.id} id={e.id} tabIndex={-1} data-cite={e.k} {...ri(i + 1)}>
              <span><span className={s.eco}>{e.company}</span> <span className={s.eti}>· {e.title}</span></span>
              <span className="meta">{e.when}</span>
            </li>
          ))}
        </ul>
      </div>

      <TraceFollow />
    </section>
  )
}
