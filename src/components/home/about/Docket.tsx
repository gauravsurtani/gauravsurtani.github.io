'use client'
// About "Evidence docket" driver. Renders the sticky stage around the server-rendered section content and the scroll
// track after it; measures and writes styles only (no DOM changes besides data-dk on the section, which switches the
// hidden states on).
//
// Scroll units are viewport heights from the moment the stage pins (measured from the track, which CSS sizes in vh).
// Two beats. The first record runs over [startOf(0), startOf(0) + R] (k = 0..1 within it): the slot opens, the quote
// lifts in under it, the sweep runs, the quote flies into the proof cell and fades, then the proof fades in (never
// both on screen), the pill stamps, the thread draws to the claim words, then the underline. Then the other records
// are filed together as one cascade (each R2 long, D apart): slot, proof, the sweep in place, pill, thread, underline.
// After the last record the fact row rises and the stage lets go. Everything is a function of scrollY, so scrolling
// back rewinds it. The transient highlights settle on their own wherever the reader stops: a record's amber tint and
// its thread fade out (CSS, a short delay after the pill stamps and the thread is drawn).
//
// Geometry: whenever motion is on (html.mo, set by the head script before first paint) CSS pins the stage and adds the
// track, so the page height is the same from first paint, whether the docket runs or not. When the ledger is already
// in view as it starts (deep link, restored scroll) the docket does not run: the stage stays pinned over the same
// track and shows every record.
//
// Camera (phones and short screens): when the whole stage does not fit, the pin sits low (bottom of the stage on
// screen) and the claim words would be off screen while their records are filed. Each beat then gets its own stage
// offset P that keeps its claim words in view (and its slots, and the quote), and the stage is panned between them
// with a transform, scroll-linked. It always returns to the pin before the stage lets go, so the release is seamless.
//
// One shared passive scroll reader (motion/scroll), geometry cached in measure (resize, fonts), no layout reads per
// frame, no work while the section is off screen. Reduced motion turned on at runtime (motion/reduce) stops the docket
// and clears everything it wrote; everything is undone on unmount.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { onReduce } from '@/components/motion/reduce'
import { remeasure, subscribe } from '@/components/motion/scroll'
import s from '../About.module.css'

const A = -0.22, R = 0.34, R2 = 0.3, D = 0.09, V = 0.2
// the cascade starts as the first record's proof is in its slot
const startOf = (i: number) => A + (i ? 0.9 * R + (i - 1) * D : 0)
const endOf = (n: number) => startOf(n - 1) + (n > 1 ? R2 : R)
// the pinned scroll, in viewport heights: the last record, the fact row, the release
const lengthOf = (n: number) => endOf(n) + V + 0.08
const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const seg = (x: number, a: number, b: number) => cl((x - a) / (b - a))
const io3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const o3 = (x: number) => 1 - Math.pow(1 - x, 3)

type Rec = {
  li: HTMLElement; pr: HTMLElement; pws: HTMLElement[]; nm: HTMLElement | null; m: HTMLElement | null
  g: SVGGElement | null; th: SVGPathElement | null; dot: SVGCircleElement | null
}
// per record: rb its slot's bottom, mt its claim words' top, n its name box unopened (x0, y0, x1, y1), L its thread
type Geo = { rb: number; mt: number | null; n: number[] | null; L: number }
// the lifted quote (first record): start x, width, height, the proof cell it flies into and the scale it lands at
type Quote = { x0: number; w: number; qh: number; x1: number; y1: number; s: number }

// Starts the docket (or the static pinned stage) and returns its full undo.
function run(stage: HTMLElement, sec: HTMLElement) {
  if (!document.documentElement.classList.contains('mo')) return
  const ul = stage.querySelector('ul'), meter = stage.querySelector<HTMLElement>(`.${s.meter}`)
  const lede = stage.querySelector<HTMLElement>('.lede'), fact = stage.querySelector<HTMLElement>('dl')
  const track = sec.querySelector<HTMLElement>(`.${s.track}`), q = stage.querySelector<HTMLElement>('[data-q="0"]')
  const rows = [...stage.querySelectorAll<HTMLElement>(`.${s.row}`)]
  if (!ul || !meter || !lede || !q || !rows.length || !track?.offsetHeight) return
  // the hidden states only while the ledger is still below the viewport, so no visible row is ever hidden
  const live = ul.getBoundingClientRect().top >= innerHeight

  const ws = (el: Element | null) => (el ? [...el.querySelectorAll<HTMLElement>(`.${s.w}`)] : [])
  const recs: Rec[] = rows.map((li, i) => {
    const g = stage.querySelector<SVGGElement>(`[data-th="${i}"]`)
    const pr = li.querySelector<HTMLElement>(`.${s.proof}`)!
    return {
      li, pr, pws: ws(pr), nm: li.querySelector<HTMLElement>(`.${s.name}`), m: stage.querySelector<HTMLElement>(`[data-m="${i}"]`),
      g, th: g?.querySelector('path') ?? null, dot: g?.querySelector('circle') ?? null,
    }
  })
  if (recs.some(r => !r.pr)) return
  const qws = ws(q), n = recs.length, K = lengthOf(n), st = recs.map((_, i) => startOf(i)), end = endOf(n)

  // write-through cache: a style is written only when its value changes; every element written is undone at the end
  const last = new WeakMap<Element, Record<string, string>>(), touched = new Set<HTMLElement | SVGElement>()
  const set = (el: HTMLElement | SVGElement, k: string, v: string) => {
    let c = last.get(el)
    if (!c) { last.set(el, (c = {})); touched.add(el) }
    if (c[k] === v) return
    c[k] = v
    el.style.setProperty(k, v)
  }
  const tog = (el: Element, c: string, v: boolean) => { if (el.classList.contains(c) !== v) el.classList.toggle(c, v) }
  const nav = document.getElementById('nav')
  let G: { vh: number; u: number; pin: number; flow: number; T: number; vT: number; vB: number; P: number[]; Q: Quote; recs: Geo[] } | null = null
  let on = true

  const measure = () => {
    const vh = innerHeight, small = innerWidth < 640, navh = nav ? nav.getBoundingClientRect().height : 64
    // the quote and the stage are measured untransformed (a hidden quote measures as zero); draw() puts them back
    if (live) {
      q.classList.remove(s.off)
      q.style.transform = q.style.filter = ''
      delete last.get(q)?.transform
      delete last.get(q)?.filter
    }
    stage.style.transform = ''
    delete last.get(stage)?.transform
    const sr = stage.getBoundingClientRect(), H = stage.offsetHeight, W = stage.offsetWidth
    // pin below the nav when the whole stage fits; otherwise with its bottom 16px above the viewport's bottom,
    // but never lower than the heading going fully under the nav
    const lt = lede.getBoundingClientRect().top - sr.top
    const T = H + navh + 24 <= vh ? navh + 16 : Math.min(vh - H - 16, navh + 6 - lt)
    set(stage, '--dk-top', `${T.toFixed(1)}px`)
    // the visible band, in viewport px
    const vT = navh + 10, vB = vh - 14, QF = small ? 25 : 34
    // the stage's normal-flow top comes from the section (the stage itself may be stuck while this runs)
    const flow = sec.getBoundingClientRect().top + scrollY + parseFloat(getComputedStyle(sec).paddingTop)
    const pr0 = recs[0].pr.getBoundingClientRect(), pf = parseFloat(getComputedStyle(recs[0].pr).fontSize) || 15, sc = pf / QF
    const qw = Math.min(W - (small ? 14 : 24), pr0.width / sc)
    set(q, 'font-size', `${QF}px`)
    set(q, 'width', `${qw.toFixed(1)}px`)
    const Q: Quote = { x0: small ? 10 : 18, w: qw, qh: q.offsetHeight, x1: pr0.left - sr.left, y1: pr0.top - sr.top + (pf * 1.5 - QF * 1.35 * sc) / 2, s: sc }
    G = { vh, u: track.offsetHeight / K, pin: flow - T, flow, T, vT, vB, P: [T, T], Q, recs: [] }
    if (!live) return
    // tint boxes meet exactly: each word's box reaches the next word on the same line, never past a line end
    for (const W_ of [qws, ...recs.map(r => r.pws)]) {
      for (let i = 0; i < W_.length; i++) {
        const a = W_[i].getBoundingClientRect(), b = W_[i + 1]?.getBoundingClientRect()
        set(W_[i], '--ww', `${a.width.toFixed(1)}px`)
        set(W_[i], '--ext', `${(b && Math.abs(b.top - a.top) < 2 && b.left > a.right ? b.left - a.right : 0).toFixed(1)}px`)
      }
    }
    for (const r of recs) {
      // the name box without its current lift (--q), plus the 10px it sits lower while unopened
      const nr = r.nm?.getBoundingClientRect(), ny = nr ? nr.top - sr.top - (1 - parseFloat(last.get(r.li)?.['--q'] ?? '1')) * 10 : 0
      G.recs.push({
        rb: r.li.getBoundingClientRect().bottom - sr.top + (small ? 16 : 22),
        mt: r.m ? (r.m.firstElementChild ?? r.m).getBoundingClientRect().top - sr.top : null,
        n: nr ? [nr.left - sr.left, ny, nr.right - sr.left, ny + nr.height + 10] : null, L: 0,
      })
    }
    // camera: raise a beat's pin just enough to keep its claim words in view, if its slots (and the quote) still fit
    const beat = (gs: Geo[], bottom: number) => {
      const mt = Math.min(...gs.map(g => g.mt ?? Infinity))
      return mt < Infinity && T + mt - 8 < vT ? Math.max(T, Math.min(vT + 8 - mt, vB - bottom)) : T
    }
    G.P = [beat(G.recs.slice(0, 1), G.recs[0].rb + Q.qh), beat(G.recs.slice(1), G.recs[n - 1].rb)]
    recs.forEach((r, i) => {
      const g = G!.recs[i], P = G!.P[i ? 1 : 0], nb = g.n
      if (!r.th || !r.dot || !nb || !r.m || g.mt == null || P + g.mt < navh) return
      // a citation thread from the record's name, out to the left gutter, up to the claim words it backs
      const mr = (r.m.firstElementChild ?? r.m).getBoundingClientRect()
      const gx = -Math.min(26, sr.left * 0.7), sx = nb[0] - 8, sy = (nb[1] + nb[3] - 10) / 2
      const tx = mr.left - sr.left, ty = mr.bottom - sr.top + 4, c = Math.max(0, Math.min(10, sx - gx))
      r.th.setAttribute('d', `M${sx} ${sy}H${gx + c}Q${gx} ${sy} ${gx} ${sy - c}V${ty + c}Q${gx} ${ty} ${gx + c} ${ty}H${tx}`)
      g.L = r.th.getTotalLength()
      set(r.th, 'stroke-dasharray', g.L.toFixed(1))
      r.dot.setAttribute('cx', String(sx))
      r.dot.setAttribute('cy', String(sy))
    })
    draw(scrollY, innerHeight)
  }

  const draw = (y: number, vh: number) => {
    if (!G) return
    // a real height change (not the phone URL bar) needs a new pin
    if (Math.abs(vh - G.vh) > 120) { remeasure(); return }
    if (!live) return
    const u = (y - G.pin) / G.u, { T, vT, vB, P, Q } = G
    // the camera: the first beat's offset, panned to the cascade's as it starts, and back to the pin after the last record
    let cam = P[0]
    if (n > 1) cam += (P[1] - P[0]) * io3(seg(u, st[1] - 0.04, st[1] + 0.12))
    cam += (T - P[n > 1 ? 1 : 0]) * io3(seg(u, end + 0.03, end + 0.1))
    const nat = G.flow - y, c = Math.max(nat, cam) - Math.max(nat, T)
    set(stage, 'transform', c > 0.05 ? `translateY(${c.toFixed(1)}px)` : '')

    // the first record's quote: lifted in under its slot (kept inside the visible band while the camera pans), swept,
    // flown into the proof cell, then faded out before the proof fades in
    const k0 = (u - st[0]) / R
    const inA = o3(seg(k0, 0.02, 0.16)), fl = io3(seg(k0, 0.56, 0.83)), out = seg(k0, 0.83, 0.86)
    const y0 = Math.max(vT - cam, Math.min(G.recs[0].rb, vB - cam - Q.qh))
    const x = Q.x0 + (Q.x1 - Q.x0) * fl, yy = y0 + (Q.y1 - y0) * fl + (1 - inA) * 30 - Math.sin(Math.PI * fl) * 26
    const z = 1 + (Q.s - 1) * fl, qo = inA * (1 - out)
    set(q, 'transform', `translate(${x.toFixed(1)}px,${yy.toFixed(1)}px) scale(${z.toFixed(4)})`)
    set(q, 'opacity', qo.toFixed(3))
    set(q, 'filter', out > 0 && out < 1 ? `blur(${(out * 2).toFixed(2)}px)` : '')
    set(q, '--s', seg(k0, 0.13, 0.5).toFixed(4))
    tog(q, s.off, qo === 0)

    let e = 0
    recs.forEach((r, i) => {
      const g = G!.recs[i]
      // per record [slot opens, proof in, sweep in place, pill, thread, underline, meter step]; the first record's proof
      // takes over once the quote is gone (it was swept as the quote)
      const k = i ? (u - st[i]) / R2 : k0
      const b = i
        ? [seg(k, 0, 0.15), seg(k, 0.08, 0.25), seg(k, 0.12, 0.6), k >= 0.62 ? 1 : 0, seg(k, 0.6, 0.78), seg(k, 0.72, 0.9), seg(k, 0.2, 0.62)]
        : [seg(k, 0, 0.14), seg(k, 0.86, 0.9), 1, k >= 0.9 ? 1 : 0, seg(k, 0.86, 0.97), seg(k, 0.95, 1.1), seg(k, 0.58, 0.9)]
      set(r.li, '--q', b[0].toFixed(3))
      set(r.pr, 'opacity', b[1].toFixed(3))
      set(r.pr, '--s', b[2].toFixed(4))
      // the verdict stamps only once the evidence is in its slot (and its tint settles, CSS)
      tog(r.li, s.v, b[3] > 0)
      if (r.m) set(r.m, '--m', b[5].toFixed(4))
      if (r.g && r.th && r.dot) {
        const tp = g.L ? b[4] : 0, ta = tp > 0 ? '1' : '0'
        set(r.th, 'stroke-dashoffset', (g.L * (1 - tp)).toFixed(1))
        set(r.th, 'opacity', ta)
        set(r.dot, 'opacity', ta)
        // drawn: the thread settles (fades out, CSS)
        tog(r.g, s.v, tp >= 1)
      }
      e += io3(b[6])
    })
    // a name within 20px of the lifted quote steps back with the quote's opacity: the quote never sits on a name
    const qb = [x - 30 * z, yy, x + Q.w * z, yy + Q.qh * z]
    recs.forEach((r, j) => {
      const nb = G!.recs[j].n
      const p = j && nb && qo ? 1 - qo * cl(1 - Math.max(nb[1] - qb[3], qb[1] - nb[3], nb[0] - qb[2], qb[0] - nb[2]) / 20) : 1
      set(r.li, '--p', p.toFixed(3))
    })
    // the evidence meter: one step per record filed
    set(meter, '--e', (e / n).toFixed(4))
    if (fact) tog(fact, s.v, u > end + V * 0.3)
  }

  // no work while the section is off screen; one settling frame when it leaves or comes back
  const frame = (y: number, vh: number) => { if (on) draw(y, vh) }
  const io = live ? new IntersectionObserver(es => {
    on = es[es.length - 1].isIntersecting
    draw(scrollY, innerHeight)
  }, { rootMargin: '20% 0px 20% 0px' }) : null

  if (live) sec.setAttribute('data-dk', '')
  const off = subscribe(frame, measure)
  io?.observe(sec)
  return () => {
    off()
    io?.disconnect()
    sec.removeAttribute('data-dk')
    touched.forEach(el => Object.keys(last.get(el) ?? {}).forEach(k => el.style.removeProperty(k)))
    stage.querySelectorAll(`.${s.v}, .${s.off}`).forEach(el => el.classList.remove(s.v, s.off))
  }
}

export default function Docket({ n, children }: { n: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = ref.current, sec = stage?.parentElement
    if (!stage || !sec || !document.documentElement.classList.contains('mo')) return
    const stop = run(stage, sec)
    if (!stop) return
    const offReduce = onReduce(stop)
    return () => { offReduce(); stop() }
  }, [])

  return (
    <>
      <div ref={ref} className={s.stage}>{children}</div>
      {n > 0 && <div className={s.track} style={{ '--dk-len': lengthOf(n).toFixed(4) } as CSSProperties} aria-hidden="true" />}
    </>
  )
}
