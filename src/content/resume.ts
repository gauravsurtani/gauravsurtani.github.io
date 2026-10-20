// Typed view of resume.json (home facts). Data only, no JSX.
// Every string is copied from resume.md; `npm run check:facts` verifies it.
// Inside bullets, [[phrase]] marks the one Mark phrase per role and [label](url) is a link (render with <Rich>).
import data from './resume.json'

export type ClaimKey = 'all' | 'y24' | 'dlai'
export type Claim = { claim: ClaimKey; href: string; text: string; note?: number }
export type Segment = string | Claim

/** Shared by roles and earlier rows. `k` is the timeline row key, `id` the record id (both frozen). */
export type Entry = {
  id: string
  k: string
  label: string        // timeline row label
  short?: string       // timeline label under 420px
  company: string
  title: string
  when: string         // display dates, verbatim from resume.md
  sr: string           // dates for screen readers on the timeline
  s: number            // start, decimal year (month m -> year + (m-1)/12)
  e: number | 'now'    // end, decimal year or "now"
}
export type Role = Entry & { place: string; companyHref?: string; bullets: string[] }
export type Earlier = Entry

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
  earlier: Earlier[]
  skills: { label: string; items: string[] }[]
  education: string
}

export const resume = data as Resume

/** All timeline rows in display order (roles, then earlier). */
export const timeline: Entry[] = [...resume.roles, ...resume.earlier]

export const isClaim = (s: Segment): s is Claim => typeof s !== 'string'
