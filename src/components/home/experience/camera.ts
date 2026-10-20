// Timeline camera (Experience, option B): where the camera looks for a reading line. Pure: numbers in, a shot out.
// TraceFollow measures the records and applies the shot to the card (desktop) or the evidence strip (phones).
//
// Rows are the card's rows in order, one per Experience record. The reading line r is document px
// (scrollY + 0.42 x innerHeight, Scene A's line).
//   - Entering the records, the view zooms from 2018 - now into the first role's span.
//   - Inside role i, its bar is written (f[i] 0 -> 1) across the record, from top + IN to bottom - OUT.
//   - Between roles the view pans and re-zooms to the next span over OUT + IN of scroll (about a third of a screen, so
//     one wheel notch never cuts from role to role): one zoom about the point the two views share (width lerps in log
//     space), so an edge both views share (today) stays put; equal widths make it a plain pan. IN and OUT shrink on a
//     short record so its bar still has room to be written.
//   - Last: the last bar is written by the pull-back's start, then the view pulls back to 2018 - now with every bar
//     written; the cited span covers the whole record (vd 0 -> 1).
//   - pos: the card's row indicator, as a row position: i on role i, i -> i + 1 with the pan, so the lit row and the
//     camera always agree.
// Desktop has a runway after the records (Experience.module.css) that holds the card for the pull-back; phones finish
// it before the strip leaves (at the last record's bottom).
export const T0 = 2018

export type View = [number, number]
export type Plan = {
  S: number[]; E: number[]; now: number
  R: View[]          // each row's record, [top, bottom] in document px
  vh: number; desk: boolean
}
export type Shot = { on: boolean; view: View; cur: number; pos: number; f: number[]; band: View | null; vd: number }

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const sm = (t: number) => { t = clamp(t); return t * t * (3 - 2 * t) }

export function shot(r: number, p: Plan): Shot {
  const { S, E, now, R, vh, desk } = p
  const n = S.length
  const f = S.map(() => 0)
  const full: View = [T0, now]
  const fit = ([a, b]: View): View => {
    const w = b - a
    if (w >= now - T0) return full
    if (a < T0) return [T0, T0 + w]
    if (b > now) return [now - w, now]
    return [a, b]
  }
  const roleView = (i: number) => { const w = E[i] - S[i], pad = 0.22 * w + 0.1; return fit([S[i] - pad, E[i] + pad]) }
  const lerp = (A: View, B: View, t: number): View => {
    const wa = A[1] - A[0], q = (B[1] - B[0]) / wa
    if (Math.abs(q - 1) < 1e-4) { const a = A[0] + (B[0] - A[0]) * t; return fit([a, a + wa]) }
    const p = (A[0] * q - B[0]) / (q - 1), k = Math.pow(q, t)   // p: the fixed point of the zoom A -> B
    const a = p - (p - A[0]) * k
    return fit([a, a + wa * k])
  }
  const out = (o: Partial<Shot>): Shot => ({ on: true, view: full, cur: 0, pos: 0, f, band: null, vd: 0, ...o })
  const IN = (i: number) => Math.min(vh * 0.12, (R[i][1] - R[i][0]) * 0.2)    // the pan ends this far into a record
  const OUT = (i: number) => Math.min(vh * 0.2, (R[i][1] - R[i][0]) * 0.3)    // and starts this far before its end

  const start = R[0][0] - vh * 0.42, inside = R[0][0] + IN(0)
  if (r < start) return out({ on: false })
  if (r < inside) return out({ view: lerp(full, roleView(0), sm((r - start) / (inside - start))), band: [S[0], E[0]] })

  // the pull-back starts where the last bar is done. Desktop: 20% of a screen before the last record's bottom, over 30%
  // (the runway holds the card until it ends). Phones: 32% before, over 26%, done before the strip leaves at that bottom.
  const e1 = Math.max(R[n - 1][0] + IN(n - 1) + 40, R[n - 1][1] - vh * (desk ? 0.2 : 0.32))
  const vdLen = vh * (desk ? 0.3 : 0.26)
  for (let i = 0; i < n; i++) {
    const h0 = R[i][0] + IN(i), h1 = i < n - 1 ? R[i][1] - OUT(i) : e1
    if (r < h1) { f[i] = clamp((r - h0) / (h1 - h0)); return out({ view: roleView(i), cur: i, pos: i, band: [S[i], E[i]] }) }
    f[i] = 1
    if (i === n - 1) break
    const nx = R[i + 1][0] + IN(i + 1)
    if (r < nx) {
      const t = sm((r - h1) / (nx - h1))
      const cur = t < 0.5 ? i : i + 1
      return out({ view: lerp(roleView(i), roleView(i + 1), t), cur, pos: i + t, band: [S[cur], E[cur]] })
    }
  }

  const t = sm((r - e1) / vdLen)
  return out({ view: lerp(roleView(n - 1), full, t), cur: -1, pos: n - 1, vd: t, band: [Math.min(...S), now] })
}
