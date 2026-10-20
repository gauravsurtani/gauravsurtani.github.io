'use client'
// About "Evidence docket" driver. Renders the sticky stage around the server-rendered section content and the scroll
// track after it; measures and writes styles only (no DOM changes besides data-dk on the section, which switches the
// hidden states on).
//
// Scroll units are viewport heights from the moment the stage pins (measured from the track, which CSS sizes in vh).
// Record i runs over [startOf(i), startOf(i) + R] (k = 0..1 within it): the slot opens, the quote lifts in under it,
// the sweep runs, the quote flies into the proof cell and fades, then the proof fades in (never both on screen), the
// pill stamps, the thread draws to the claim words, then the underline. Records 1 and 2 run one after the other;
// from record 3 on they run as one overlapping cascade, each lifted as the one before lands (C of a record later). After the last
// record the fact row rises and the stage lets go. Everything is a function of scrollY, so scrolling back rewinds it.
//
// Geometry: whenever motion is on (html.mo, set by the head script before first paint) CSS pins the stage and adds the
// track, so the page height is the same from first paint, whether the docket runs or not. When the ledger is already
// in view as it starts (deep link, restored scroll) the docket does not run: the stage stays pinned over the same
// track and shows every record.
//
// Camera (phones and short screens): when the whole stage does not fit, the pin sits low (bottom of the stage on
// screen) and the claim words would be off screen while their records are filed. Each record then gets its own
// stage offset P that keeps its claim words in view (and its slot and quote), and the stage is panned between them
// with a transform, scroll-linked, after the previous record's underline is drawn. It always returns to the pin
// before the stage lets go, so the release is seamless.
//
// One shared passive scroll reader (motion/scroll), geometry cached in measure (resize, fonts), no layout reads per
// frame, no work while the section is off screen. Reduced motion turned on at runtime stops the docket and clears
// everything it wrote (turned off again, it starts over); everything is undone on unmount.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { remeasure, subscribe } from '@/components/motion/scroll'
import s from '../About.module.css'

const A = -0.22, R = 0.3, C = 0.75, V = 0.2
const startOf = (i: number) => A + (i < 2 ? i : 2 + (i - 2) * C) * R
// the pinned scroll, in viewport heights: the last record, the fact row, the release
const lengthOf = (n: number) => startOf(n - 1) + R + V + 0.08
const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const seg = (x: number, a: number, b: number) => cl((x - a) / (b - a))
const io3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const o3 = (x: number) => 1 - Math.pow(1 - x, 3)

type Rec = {
  li: HTMLElement; pr: HTMLElement; pws: HTMLElement[]; nm: HTMLElement | null
  q: HTMLElement; qws: HTMLElement[]; m: HTMLElement | null; th: SVGPathElement | null; dot: SVGCircleElement | null
}
// n: the record name's box in stage px, unopened (x0, y0, x1, y1); w: the quote's width
type Geo = { x0: number; rb: number; qh: number; w: number; x1: number; y1: number; s: number; L: number; P: number; n: number[] | null }

// Starts the docket (or the static pinned stage) and returns its full undo.
function run(stage: HTMLElement, sec: HTMLElement) {
  if (!document.documentElement.classList.contains('mo')) return
  const ul = stage.querySelector('ul'), meter = stage.querySelector<HTMLElement>(`.${s.meter}`)
  const lede = stage.querySelector<HTMLElement>('.lede'), fact = stage.querySelector<HTMLElement>('dl')
  const track = sec.querySelector<HTMLElement>(`.${s.track}`)
  const rows = [...stage.querySelectorAll<HTMLElement>(`.${s.row}`)]
  if (!ul || !meter || !lede || !rows.length || !track?.offsetHeight) return
  // the hidden states only while the ledger is still below the viewport, so no visible row is ever hidden
  const live = ul.getBoundingClientRect().top >= innerHeight

  const ws = (el: Element | null) => (el ? [...el.querySelectorAll<HTMLElement>(`.${s.w}`)] : [])
  const recs: Rec[] = rows.map((li, i) => {
    const pr = li.querySelector<HTMLElement>(`.${s.proof}`)!, q = stage.querySelector<HTMLElement>(`[data-q="${i}"]`)!
    const g = stage.querySelector(`[data-th="${i}"]`)
    return {
      li, pr, pws: ws(pr), nm: li.querySelector<HTMLElement>(`.${s.name}`), q, qws: ws(q),
      m: stage.querySelector<HTMLElement>(`[data-m="${i}"]`),
      th: g?.querySelector('path') ?? null, dot: g?.querySelector('circle') ?? null,
    }
  })
  if (recs.some(r => !r.pr || !r.q)) return
  const n = recs.length, K = lengthOf(n), st = recs.map((_, i) => startOf(i)), end = st[n - 1] + R

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
  let G: { vh: number; u: number; pin: number; flow: number; T: number; vT: number; vB: number; recs: Geo[] } | null = null
  let on = true

  const measure = () => {
    const vh = innerHeight, small = innerWidth < 640, navh = nav ? nav.getBoundingClientRect().height : 64
    // quotes and the stage are measured untransformed (a hidden quote measures as zero); draw() puts them back
    if (live) recs.forEach(r => {
      r.q.classList.remove(s.off)
      r.q.style.transform = r.q.style.filter = ''
      delete last.get(r.q)?.transform
      delete last.get(r.q)?.filter
    })
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
    G = { vh, u: track.offsetHeight / K, pin: flow - T, flow, T, vT, vB, recs: [] }
    if (!live) return
    for (const r of recs) {
      const lr = r.li.getBoundingClientRect(), pr = r.pr.getBoundingClientRect()
      const pf = parseFloat(getComputedStyle(r.pr).fontSize) || 15, sc = pf / QF
      const qw = Math.min(W - (small ? 14 : 24), pr.width / sc)
      set(r.q, 'font-size', `${QF}px`)
      set(r.q, 'width', `${qw.toFixed(1)}px`)
      // tint boxes meet exactly: each word's box reaches the next word on the same line, never past a line end
      for (const W_ of [r.qws, r.pws]) {
        for (let i = 0; i < W_.length; i++) {
          const a = W_[i].getBoundingClientRect(), b = W_[i + 1]?.getBoundingClientRect()
          set(W_[i], '--ww', `${a.width.toFixed(1)}px`)
          set(W_[i], '--ext', `${(b && Math.abs(b.top - a.top) < 2 && b.left > a.right ? b.left - a.right : 0).toFixed(1)}px`)
        }
      }
      const qh = r.q.offsetHeight, rb = lr.bottom - sr.top + (small ? 16 : 22)
      // camera: raise this record's pin just enough to keep its claim words in view, if the slot and quote still fit
      let P = T, mt = 0
      if (r.m) {
        mt = (r.m.firstElementChild ?? r.m).getBoundingClientRect().top - sr.top
        if (T + mt - 8 < vT) P = Math.max(T, Math.min(vT + 8 - mt, vB - rb - qh))
      }
      // the name box without its current lift (--q), plus the 10px it sits lower while unopened
      const nr = r.nm?.getBoundingClientRect(), ny = nr ? nr.top - sr.top - (1 - parseFloat(last.get(r.li)?.['--q'] ?? '1')) * 10 : 0
      const g: Geo = {
        x0: small ? 10 : 18, rb, qh, w: qw, x1: pr.left - sr.left, y1: pr.top - sr.top + (pf * 1.5 - QF * 1.35 * sc) / 2, s: sc, L: 0, P,
        n: nr ? [nr.left - sr.left, ny, nr.right - sr.left, ny + nr.height + 10] : null,
      }
      if (r.th && r.dot && nr && r.m && P + mt >= navh) {
        // a citation thread from the record's name, out to the left gutter, up to the claim words it backs
        const mr = (r.m.firstElementChild ?? r.m).getBoundingClientRect()
        const gx = -Math.min(26, sr.left * 0.7), sx = nr.left - sr.left - 8, sy = ny + nr.height / 2
        const tx = mr.left - sr.left, ty = mr.bottom - sr.top + 4, c = Math.max(0, Math.min(10, sx - gx))
        r.th.setAttribute('d', `M${sx} ${sy}H${gx + c}Q${gx} ${sy} ${gx} ${sy - c}V${ty + c}Q${gx} ${ty} ${gx + c} ${ty}H${tx}`)
        g.L = r.th.getTotalLength()
        set(r.th, 'stroke-dasharray', g.L.toFixed(1))
        r.dot.setAttribute('cx', String(sx))
        r.dot.setAttribute('cy', String(sy))
      }
      G.recs.push(g)
    }
    draw(scrollY, innerHeight)
  }

  const draw = (y: number, vh: number) => {
    if (!G) return
    // a real height change (not the phone URL bar) needs a new pin
    if (Math.abs(vh - G.vh) > 120) { remeasure(); return }
    if (!live) return
    const u = (y - G.pin) / G.u, { T, vT, vB } = G
    // the camera: the stage offset for the record being filed, panned once the previous one's underline is drawn,
    // and back to the pin after the last one
    let cam = G.recs[0].P
    for (let i = 1; i < n; i++) {
      const t = Math.max(st[i] + 0.1 * R, st[i - 1] + 1.1 * R)
      cam += (G.recs[i].P - G.recs[i - 1].P) * io3(seg(u, t, t + 0.2 * R))
    }
    cam += (T - G.recs[n - 1].P) * io3(seg(u, end + 0.1 * R, end + 0.3 * R))
    const nat = G.flow - y, c = Math.max(nat, cam) - Math.max(nat, T)
    set(stage, 'transform', c > 0.05 ? `translateY(${c.toFixed(1)}px)` : '')

    let e = 0
    const box: number[][] = []
    recs.forEach((r, i) => {
      const k = (u - st[i]) / R, g = G!.recs[i]
      // the slot opens: hairline and name
      set(r.li, '--q', seg(k, 0, 0.14).toFixed(3))
      // the quote is lifted in under the slot (kept inside the visible band while the camera pans), swept, flown into
      // the proof cell, then faded out before the proof fades in
      const inA = o3(seg(k, 0.02, 0.16)), sw = seg(k, 0.13, 0.5), fl = io3(seg(k, 0.56, 0.83)), out = seg(k, 0.83, 0.86)
      const y0 = Math.max(vT - cam, Math.min(g.rb, vB - cam - g.qh))
      const x = g.x0 + (g.x1 - g.x0) * fl, yy = y0 + (g.y1 - y0) * fl + (1 - inA) * 30 - Math.sin(Math.PI * fl) * 26
      const z = 1 + (g.s - 1) * fl, qo = inA * (1 - out)
      set(r.q, 'transform', `translate(${x.toFixed(1)}px,${yy.toFixed(1)}px) scale(${z.toFixed(4)})`)
      set(r.q, 'opacity', qo.toFixed(3))
      set(r.q, 'filter', out > 0 && out < 1 ? `blur(${(out * 2).toFixed(2)}px)` : '')
      tog(r.q, s.off, qo === 0)
      box.push([x - 30 * z, yy, x + g.w * z, yy + g.qh * z, qo])
      set(r.q, '--s', sw.toFixed(4))
      // the proof takes over once the quote is gone; its tint fades while the next record is filed
      set(r.pr, 'opacity', seg(k, 0.86, 0.9).toFixed(3))
      set(r.pr, '--f', seg(k, 1.3, 1.85).toFixed(3))
      // the verdict stamps only once the evidence is in its slot
      tog(r.li, s.v, k >= 0.9)
      if (r.m) set(r.m, '--m', seg(k, 0.95, 1.1).toFixed(4))
      if (r.th && r.dot) {
        const tp = g.L ? seg(k, 0.86, 0.97) : 0, ta = (tp > 0 ? 1 : 0) * (1 - seg(k, 1.08, 1.3))
        set(r.th, 'stroke-dashoffset', (g.L * (1 - tp)).toFixed(1))
        set(r.th, 'opacity', ta.toFixed(3))
        set(r.dot, 'opacity', ta.toFixed(3))
      }
      e += io3(seg(k, 0.58, 0.9))
    })
    // a name within 20px of another record's lifted quote steps back with that quote's opacity: no quote sits on a name
    recs.forEach((r, j) => {
      const nb = G!.recs[j].n
      let p = 1
      if (nb) box.forEach(([x0, y0, x1, y1, o], i) => {
        if (i !== j && o) p = Math.min(p, 1 - o * cl(1 - Math.max(nb[1] - y1, y0 - nb[3], nb[0] - x1, x0 - nb[2]) / 20))
      })
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
    if (!stage || !sec) return
    const still = matchMedia('(prefers-reduced-motion: reduce)')
    let stop: (() => void) | undefined
    const go = () => { stop?.(); stop = still.matches ? undefined : run(stage, sec) }
    go()
    still.addEventListener('change', go)
    return () => { still.removeEventListener('change', go); stop?.() }
  }, [])

  return (
    <>
      <div ref={ref} className={s.stage}>{children}</div>
      {n > 0 && <div className={s.track} style={{ '--dk-len': lengthOf(n).toFixed(4) } as CSSProperties} aria-hidden="true" />}
    </>
  )
}
