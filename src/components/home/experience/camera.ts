// Timeline camera (Experience, option B): where the camera looks for a reading line. Pure: numbers in, a shot out.
// TraceFollow measures the records and applies the shot to the card (desktop) or the evidence strip (phones).
//
// Rows are the card's rows in order: the 5 roles, then the 4 Earlier rows. The reading line r is document px
// (scrollY + 0.42 x innerHeight, Scene A's line).
//   - Entering the records, the view zooms from 2018 - now into the first role's span.
//   - Inside role i, its bar is written (f[i] 0 -> 1) across the record's height, top + 30 to bottom - 90.
//   - Between roles the view pans and re-zooms to the next span: one zoom about the point the two views share (width
//     lerps in log space), so an edge both views share (today) stays put; equal widths make it a plain pan.
//   - Earlier: the view widens to 2018 - 2024 and the four short bars are written in turn.
//   - Last: it pulls back to 2018 - now with every bar written; the cited span covers the whole record (vd 0 -> 1).
// Desktop has a runway after the records (Experience.module.css) that holds the card for the pull-back; phones finish
// it before the strip leaves (at the last record's bottom).
export const T0 = 2018

export type View = [number, number]
export type Plan = {
  S: number[]; E: number[]; now: number; nRole: number
  R: View[]          // each row's record, [top, bottom] in document px
  eb: View           // the Earlier block
  vh: number; desk: boolean
}
export type Shot = { on: boolean; view: View; cur: number; f: number[]; band: View | null; vd: number }

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const sm = (t: number) => { t = clamp(t); return t * t * (3 - 2 * t) }

export function shot(r: number, p: Plan): Shot {
  const { S, E, now, nRole, R, eb, vh, desk } = p
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
  const earlyView = fit([T0, Math.max(...E.slice(nRole)) + 0.3])
  const lerp = (A: View, B: View, t: number): View => {
    const wa = A[1] - A[0], q = (B[1] - B[0]) / wa
    if (Math.abs(q - 1) < 1e-4) { const a = A[0] + (B[0] - A[0]) * t; return fit([a, a + wa]) }
    const p = (A[0] * q - B[0]) / (q - 1), k = Math.pow(q, t)   // p: the fixed point of the zoom A -> B
    const a = p - (p - A[0]) * k
    return fit([a, a + wa * k])
  }
  const out = (o: Partial<Shot>): Shot => ({ on: true, view: full, cur: 0, f, band: null, vd: 0, ...o })

  const start = R[0][0] - vh * 0.42, inside = R[0][0] + 30
  if (r < start) return out({ on: false })
  if (r < inside) return out({ view: lerp(full, roleView(0), sm((r - start) / (inside - start))), band: [S[0], E[0]] })

  for (let i = 0; i < nRole; i++) {
    const h0 = R[i][0] + 30, h1 = R[i][1] - 90
    if (r < h1) { f[i] = clamp((r - h0) / (h1 - h0)); return out({ view: roleView(i), cur: i, band: [S[i], E[i]] }) }
    f[i] = 1
    const nx = i + 1 < nRole ? R[i + 1][0] + 30 : eb[0] - vh * 0.05
    if (r < nx) {
      const t = sm((r - h1) / (nx - h1))
      const cur = t < 0.5 ? i : i + 1
      return out({ view: lerp(roleView(i), i + 1 < nRole ? roleView(i + 1) : earlyView, t), cur, band: cur < nRole ? [S[cur], E[cur]] : null })
    }
  }

  // Earlier: the short rows written in turn, then the pull-back
  const L = R[n - 1][1]
  const e0 = eb[0] - vh * 0.05, e1 = L - vh * (desk ? 0.22 : 0.2), vdLen = vh * (desk ? 0.14 : 0.1)
  const m = n - nRole
  if (r < e1) {
    const u = clamp((r - e0) / (e1 - e0)) * m
    for (let j = 0; j < m; j++) f[nRole + j] = clamp(u - j)
    const cur = nRole + Math.min(m - 1, Math.floor(u))
    return out({ view: earlyView, cur, band: [S[cur], E[cur]] })
  }
  for (let j = 0; j < m; j++) f[nRole + j] = 1
  const t = sm((r - e1) / vdLen)
  return out({ view: lerp(earlyView, full, t), cur: -1, vd: t, band: [Math.min(...S), now] })
}
