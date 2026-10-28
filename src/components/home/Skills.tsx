// Home Skills (server). 3 groups, items verbatim from resume.md (via resume.json). Every skill is wired to the latest
// role that uses it (src/content/skill-links.json: { skill: role id | null }). Inside a group the skills are bundled
// per role, in resume.json role order (latest first), and keep their resume order inside a bundle. A bundle is one
// bracket: each skill's leader runs to a shared spine, and the role link (company name, links to its record in
// #experience) sits on the bundle's first row. A null link renders the skill plain, with no line.
// Desktop (>= 960px): the groups are three columns. Below: one group under the other, dash markers on phones.
// Motion ("Sorted", skills/SkillsMotion.tsx): from 1024px the 22 skills start as one dim shuffled stream and arc into
// their groups one by one with the reader's scroll; each lands, gets an amber sweep and draws its leader into its
// bundle. Below 1024px each group plays once when it is reached: its skills rise in, then draw their leaders.
// No JS or reduced motion: this markup is the finished state.
import MaskHeading from '@/components/motion/MaskHeading'
import { rv } from '@/components/motion/reveal'
import { resume } from '@/content/resume'
import links from '@/content/skill-links.json'
import SkillsMotion from './skills/SkillsMotion'
import s from './Skills.module.css'

const LINKS: Record<string, string | null> = links
const rank = (id: string | null) => (id ? resume.roles.findIndex(r => r.id === id) : resume.roles.length)

const runs = (items: string[]) => {
  const ids = [...new Set(items.map(it => LINKS[it] ?? null))].sort((a, b) => rank(a) - rank(b))
  return ids.map(id => {
    const role = id ? resume.roles.find(r => r.id === id) : undefined
    if (id && !role) throw new Error(`skill-links.json: unknown role id "${id}"`)
    return { role, items: items.filter(it => (LINKS[it] ?? null) === id) }
  })
}

export default function Skills() {
  return (
    <section id="skills" className={`sec ${s.sec}`} aria-labelledby="sk-h" tabIndex={-1}>
      <div className={`wrap ${s.stage}`}>
        <div className="sec-h" {...rv()}>
          <MaskHeading as="h2" id="sk-h" className="h2">Skills</MaskHeading>
        </div>
        {resume.skills.map(g => (
          <div key={g.label} className={s.group} data-skg="">
            <div className={`rule ${s.rule}`} />
            <h3 className={s.label}>{g.label}</h3>
            {runs(g.items).map(r => (
              <div key={r.role?.id ?? 'none'} className={s.run}>
                <ul className={r.role ? s.items : `${s.items} ${s.plain}`}>
                  {r.items.map(it => (
                    <li key={it}>
                      <span className={s.t}>{it}</span>
                      {r.role && <i className={s.ld} aria-hidden="true" />}
                    </li>
                  ))}
                </ul>
                {r.role && <a className={s.role} href={`#${r.role.id}`}>{r.role.company}</a>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={s.track} aria-hidden="true" />
      <SkillsMotion />
    </section>
  )
}
