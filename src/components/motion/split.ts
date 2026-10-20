// Text splitting for motion. Pure and server-safe: call it in server components so the spans are in the static HTML.
//
//   tokens(s)      sub-word tokens (like LLM tokens), each keeps its trailing space. Used by Stream (P1).
//   words(s)       words with their trailing space kept. Used by Mark (P5): the underline stays continuous and wraps.
//   maskParts(s)   words and spaces as separate parts. Used by MaskHeading (P3 display variant): spaces must stay
//                  OUTSIDE the inline-block boxes, or the words touch. A lone dash joins the word before it (no-break
//                  space), so a line never starts with "- ".
//   streamDelays(toks, startMs)  per-token delays: 15ms each, +70 after a comma, +150 after a sentence end.
//
// Usage: tokens('Gaurav Surtani').map((t, i) => <span className="tk" style={{ '--d': `${d[i]}ms` }}>{t}</span>)

export const TOK = /^\s+|(?:[A-Z][a-z]+|[a-z]+|[A-Z]+(?![a-z])|\d+|[^\sA-Za-z\d])\s*/g

export const tokens = (s: string): string[] => s.match(TOK) ?? []

export const words = (s: string): string[] => s.match(/\S+\s*/g) ?? []

export const maskParts = (s: string): string[] =>
  s.replace(/ ([-\u2013\u2014])(?= |$)/g, '\u00a0$1').split(/([^\S\u00a0]+)/).filter(Boolean)

export function streamDelays(toks: string[], start: number): number[] {
  let t = start
  return toks.map((s, i) => {
    const d = t
    const x = s.trim()
    t += 15 + (x === ',' ? 70 : 0) + (x === '.' && (i === toks.length - 1 || /\s$/.test(s)) ? 150 : 0)
    return Math.round(d)
  })
}
