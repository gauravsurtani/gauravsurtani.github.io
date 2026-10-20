// Home Contact (server), the bookend of the opening: scroll option C "The record closes", the intro run backwards.
// Under motion the section is a tall stage whose frame stays pinned with the email set full width, while his resume
// record closes in from the top and bottom onto a seam under the email; the seam becomes the verdict line under the
// address and the "now" cursor drops onto its open end. ContactScene (contact/ContactScene.tsx) renders the record
// and drives the scene from the scroll position; the stage itself is CSS (Contact.module.css).
// The axis uses the timeline card's geometry: a year y sits at (y - 2018) / (--now - 2018), --now is on <html>.
// The heading is the site's reach reveal. The email, Copy and the links are never hidden.
// No JS or reduced motion: no stage; axis, cursor at now, the amber line and dot drawn.
import type { CSSProperties } from 'react'
import MaskHeading from '@/components/motion/MaskHeading'
import { rv } from '@/components/motion/reveal'
import CopyEmail from '@/components/ui/CopyEmail'
import { Ext } from '@/components/ui/ProjectCard'
import { resume } from '@/content/resume'
import ContactScene from './contact/ContactScene'
import s from './Contact.module.css'

const [user, domain] = resume.email.split('@')
const YEARS = Array.from({ length: 9 }, (_, i) => 2018 + i)

export default function Contact() {
  return (
    <section id="contact" className={`sec ${s.contact}`} aria-labelledby="ct-h" tabIndex={-1}>
      <div className={s.frame}>
        <ContactScene />
        <div className={`wrap ${s.inner}`}>
          <div className="sec-h" {...rv()}>
            <MaskHeading as="h2" id="ct-h" className="h2">Contact</MaskHeading>
          </div>
          <div className={s.axis} aria-hidden="true">
            {YEARS.map(y => <span key={y} className={s.yr} style={{ '--y': y } as CSSProperties}>{y}</span>)}
            <span className={s.cur}><b>now</b></span>
          </div>
          <div className={s.row}>
            <span className={s.box}>
              {/* <wbr> after @: a phone wraps "gmail.com" whole instead of splitting a word */}
              <a className={s.mail} href={`mailto:${resume.email}`} data-email="">{user}@<wbr />{domain}</a>
              <span className={s.land} aria-hidden="true" />
              <span className={s.cap} aria-hidden="true" />
            </span>
            <CopyEmail />
          </div>
          <ul className={s.links}>
            <li><a className="lnk" href={resume.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Ext /></a></li>
            <li><a className="lnk" href={resume.github} target="_blank" rel="noopener noreferrer">GitHub<Ext /></a></li>
            <li><a className="lnk" href={resume.resume}>Resume (PDF)</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
