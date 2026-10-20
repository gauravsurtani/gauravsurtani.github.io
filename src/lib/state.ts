import fs from 'fs'
import path from 'path'

export interface Now { name: string; state: string; what: string; proof: string; next: string }
export interface State {
  now: Now[]
  method: { rule: string }
}

/** The public Building-now rows (content/building.json): names, a style key and plain proof lines, no deployment
 *  status and no employer internals. Read at build time. The full gaurav-os export is not published. */
export function getState(): Pick<State, 'now' | 'method'> | null {
  const p = path.join(process.cwd(), 'content', 'building.json')
  if (!fs.existsSync(p)) return null
  return JSON.parse(fs.readFileSync(p, 'utf8')) as State
}

/** A now[] "what" line, cut by deletion only (RULES): an opening "X, not Y:" reframe goes, and so does any sentence
 *  that says "this week" (stale once exported). With offState, sentences that say "this page" go too. */
export function what(w: string, offState = false): string {
  const drop = offState ? /[^.]*\b(this page|this week)\b[^.]*\.\s*/gi : /[^.]*\bthis week\b[^.]*\.\s*/gi
  return w.replace(drop, '').replace(/^[^.:]*, not [^.:]*:\s*(\w)/, (_, c: string) => c.toUpperCase()).trim()
}
