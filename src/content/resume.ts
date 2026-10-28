// Typed view of resume.json (home facts) and experience.json (the full Experience records). Data only, no JSX.
// resume.json strings are copied from resume.md; experience.json adds the old portfolio's projects and stacks and the
// roles that resume.md lists only as "Earlier". `npm run check:facts` verifies both.
// Inside bullets and project points, [[phrase]] marks the one Mark phrase per role (resume bullets only) and
// [label](url) is a link (render with <Rich>).
import data from './resume.json'
import exp from './experience.json'

export type ClaimKey = 'all' | 'y24' | 'dlai'
export type Claim = { claim: ClaimKey; href: string; text: string; note?: number }
export type Segment = string | Claim

/** One timeline row. `k` is the row key, `id` the record id (both frozen once published). */
export type Entry = {
  id: string
  k: string
  label: string        // timeline row label
  short?: string       // timeline label under 420px
  company: string
  title: string
  when: string         // display dates
  sr: string           // dates for screen readers on the timeline
  s: number            // start, decimal year (month m -> year + (m-1)/12)
  e: number | 'now'    // end, decimal year (end of month m -> year + m/12) or "now"
}
export type Role = Entry & { place: string; companyHref?: string; bullets: string[] }
export type Project = { name: string; href?: string; desc: string; points: string[] }
/** A full Experience record: a resume role (header and bullets from resume.json) or an earlier role, plus projects. */
export type Rec = Role & { note?: string; projects: Project[]; stack: string[] }

export type Resume = {
  name: string
  title: string
  location: string
  email: string
  linkedin: string
  github: string
  resume: string
  summary: Segment[]
  notes: { [n: string]: string }
  aboutLede: string
  roles: Role[]
  skills: { label: string; items: string[] }[]
  education: string
}

export const resume = data as Resume

/** Every Experience record, newest first: a resume role's header and bullets come from resume.json by id. */
export const records: Rec[] = (exp.records as Partial<Rec>[]).map(x => ({ bullets: [], ...resume.roles.find(r => r.id === x.id), ...x }) as Rec)

/** All timeline rows in display order (one per record). */
export const timeline: Entry[] = records

export const isClaim = (s: Segment): s is Claim => typeof s !== 'string'
