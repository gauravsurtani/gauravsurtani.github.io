'use client'
// About "Evidence docket" driver. Renders the sticky stage around the server-rendered section content; measures and
// writes styles only (no DOM changes besides data-dk on the section, which switches the hidden states on).
//
// Scroll units are viewport heights from the moment the stage pins. Record i runs over [A + i*R, A + (i+1)*R]
// (k = 0..1 within it): the slot opens, the quote lifts in under it, the sweep runs, the quote flies into the proof
// cell, the pill stamps, the thread draws to the claim words, then the underline. After the last record the fact row
// rises and the stage lets go. Everything is a function of scrollY, so scrolling back rewinds it.
//
// Camera (phones and short screens): when the whole stage does not fit, the pin sits low (bottom of the stage on
// screen) and the claim words would be off screen while their records are filed. Each record then gets its own
// stage offset P that keeps its claim words in view (and its slot and quote), and the stage is panned between them
// with a transform, scroll-linked. It always returns to the pin before the stage lets go, so the release is seamless.
//
// One shared passive scroll reader (motion/scroll), geometry cached in measure (resize, fonts), no layout reads per
// frame, no work while the section is off screen, everything undone on unmount.
import { useEffect, useRef, type ReactNode } from 'react'
import { remeasure, subscribe } from '@/components/motion/scroll'
import s from '../About.module.css'

const A = -0.22, R = 0.62, V = 0.2
const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const seg = (x: number, a: number, b: number) => cl((x - a) / (b - a))
const io3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const o3 = (x: number) => 1 - Math.pow(1 - x, 3)

type Rec = {
  li: HTMLElement; pr: HTMLElement; pws: HTMLElement[]; nm: HTMLElement | null
  q: HTMLElement; qws: HTMLElement[]; m: HTMLElement | null; th: SVGPathElement | null; dot: SVGCircleElement | null
}
type Geo = { x0: number; rb: number; qh: number; x1: number; y1: number; s: number; L: number; P: number }

export default function Docket({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = ref.current, sec = stage?.parentElement
    if (!stage || !sec || !document.documentElement.classList.contains('mo')) return
    const ul = stage.querySelector('ul'), meter = stage.querySelector<HTMLElement>(`.${s.meter}`)
    const lede = stage.querySelector<HTMLElement>('.lede'), fact = stage.querySelector<HTMLElement>('dl')
    const rows = [...stage.querySelectorAll<HTMLElement>(`.${s.row}`)]
    // only while the ledger is still below the viewport: the track is added at the section's end, so nothing on
    // screen moves and no visible row is hidden. A deep link or a restored scroll keeps the static section.
    if (!ul || !meter || !lede || !rows.length || ul.getBoundingClientRect().top < innerHeight) return

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

    // write-through cache: a style is written only when its value changes
    const last = new WeakMap<Element, Record<string, string>>()
    const set = (el: HTMLElement | SVGElement, k: string, v: string) => {
      let c = last.get(el)
      if (!c) last.set(el, (c = {}))
      if (c[k] === v) return
      c[k] = v
      el.style.setProperty(k, v)
    }
    const tog = (el: Element, c: string, v: boolean) => { if (el.classList.contains(c) !== v) el.classList.toggle(c, v) }
    const touched = [stage, sec, meter, ...(fact ? [fact] : []), ...recs.flatMap(r => [r.li, r.pr, r.q, ...(r.m ? [r.m] : []), ...(r.th && r.dot ? [r.th, r.dot] : [])])]
    const nav = document.getElementById('nav')
    let G: { vh: number; pin: number; flow: number; T: number; vT: number; vB: number; recs: Geo[] } | null = null
    let on = true

    const measure = () => {
      const vh = innerHeight, small = innerWidth < 640, navh = nav ? nav.getBoundingClientRect().height : 64
      // quotes and the stage are measured untransformed (a hidden quote measures as zero); draw() puts them back
      recs.forEach(r => {
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
      set(sec, '--dk-track', `${Math.round((A + recs.length * R + V + 0.08) * vh)}px`)
      // the visible band, in viewport px
      const vT = navh + 10, vB = vh - 14, QF = small ? 25 : 34
      // the stage's normal-flow top comes from the section (the stage itself may be stuck while this runs)
      const flow = sec.getBoundingClientRect().top + scrollY + parseFloat(getComputedStyle(sec).paddingTop)
      G = { vh, pin: flow - T, flow, T, vT, vB, recs: [] }
      for (const r of recs) {
        const lr = r.li.getBoundingClientRect(), pr = r.pr.getBoundingClientRect()
        const pf = parseFloat(getComputedStyle(r.pr).fontSize) || 15, sc = pf / QF
        r.q.style.fontSize = `${QF}px`
        r.q.style.width = `${Math.min(W - (small ? 14 : 24), pr.width / sc).toFixed(1)}px`
        // tint boxes meet exactly: each word's box reaches the next word on the same line, never past a line end
        for (const W_ of [r.qws, r.pws]) {
          for (let i = 0; i < W_.length; i++) {
            const a = W_[i].getBoundingClientRect(), b = W_[i + 1]?.getBoundingClientRect()
            W_[i].style.setProperty('--ww', `${a.width.toFixed(1)}px`)
            W_[i].style.setProperty('--ext', `${(b && Math.abs(b.top - a.top) < 2 && b.left > a.right ? b.left - a.right : 0).toFixed(1)}px`)
          }
        }
        const qh = r.q.offsetHeight, rb = lr.bottom - sr.top + (small ? 16 : 22)
        // camera: raise this record's pin just enough to keep its claim words in view, if the slot and quote still fit
        let P = T, mt = 0
        if (r.m) {
          mt = (r.m.firstElementChild ?? r.m).getBoundingClientRect().top - sr.top
          if (T + mt - 8 < vT) P = Math.max(T, Math.min(vT + 8 - mt, vB - rb - qh))
        }
        const g: Geo = { x0: small ? 10 : 18, rb, qh, x1: pr.left - sr.left, y1: pr.top - sr.top + (pf * 1.5 - QF * 1.35 * sc) / 2, s: sc, L: 0, P }
        if (r.th && r.dot && r.nm && r.m && P + mt >= navh) {
          // a citation thread from the record's name, out to the left gutter, up to the claim words it backs
          const nr = r.nm.getBoundingClientRect(), mr = (r.m.firstElementChild ?? r.m).getBoundingClientRect()
          const q = parseFloat(last.get(r.li)?.['--q'] ?? '1')
          const gx = -Math.min(26, sr.left * 0.7), sx = nr.left - sr.left - 8, sy = nr.top - sr.top - (1 - q) * 10 + nr.height / 2
          const tx = mr.left - sr.left, ty = mr.bottom - sr.top + 4, c = Math.max(0, Math.min(10, sx - gx))
          r.th.setAttribute('d', `M${sx} ${sy}H${gx + c}Q${gx} ${sy} ${gx} ${sy - c}V${ty + c}Q${gx} ${ty} ${gx + c} ${ty}H${tx}`)
          g.L = r.th.getTotalLength()
          r.th.style.strokeDasharray = g.L.toFixed(1)
          r.dot.setAttribute('cx', String(sx))
          r.dot.setAttribute('cy', String(sy))
        }
        G.recs.push(g)
      }
      draw(scrollY, innerHeight)
    }

    const draw = (y: number, vh: number) => {
      if (!G) return
      // a real height change (not the phone URL bar) needs a new track and pin
      if (Math.abs(vh - G.vh) > 120) { remeasure(); return }
      const u = (y - G.pin) / G.vh, { T, vT, vB } = G
      // the camera: the stage offset for the record being filed, panned after the previous one's underline is drawn,
      // and back to the pin after the last one
      let cam = G.recs[0].P
      recs.forEach((_, i) => {
        const k = (u - A - i * R) / R, g = G!.recs[i]
        if (i) cam += (g.P - G!.recs[i - 1].P) * io3(seg(k, 0.1, 0.3))
        if (i === recs.length - 1) cam += (T - g.P) * io3(seg(k, 1.1, 1.3))
      })
      const nat = G.flow - y, c = Math.max(nat, cam) - Math.max(nat, T)
      set(stage, 'transform', c > 0.05 ? `translateY(${c.toFixed(1)}px)` : '')

      let e = 0
      recs.forEach((r, i) => {
        const k = (u - A - i * R) / R, g = G!.recs[i]
        // the slot opens: hairline and name
        set(r.li, '--q', seg(k, 0, 0.14).toFixed(3))
        // the quote is lifted in under the slot (kept inside the visible band while the camera pans), swept, then
        // flown into the proof cell
        const inA = o3(seg(k, 0.02, 0.16)), sw = seg(k, 0.13, 0.5), fl = io3(seg(k, 0.56, 0.83)), out = seg(k, 0.83, 0.88)
        const y0 = Math.max(vT - cam, Math.min(g.rb, vB - cam - g.qh))
        const x = g.x0 + (g.x1 - g.x0) * fl, yy = y0 + (g.y1 - y0) * fl + (1 - inA) * 30 - Math.sin(Math.PI * fl) * 26
        set(r.q, 'transform', `translate(${x.toFixed(1)}px,${yy.toFixed(1)}px) scale(${(1 + (g.s - 1) * fl).toFixed(4)})`)
        set(r.q, 'opacity', (inA * (1 - out)).toFixed(3))
        set(r.q, 'filter', out > 0 && out < 1 ? `blur(${(out * 2).toFixed(2)}px)` : '')
        tog(r.q, s.off, inA * (1 - out) === 0)
        set(r.q, '--s', sw.toFixed(4))
        // the proof takes over when the quote lands; its tint fades while the next record is filed
        set(r.pr, 'opacity', out.toFixed(3))
        set(r.pr, '--f', seg(k, 1.3, 1.85).toFixed(3))
        // the verdict stamps only once the evidence is in its slot
        tog(r.li, s.v, k >= 0.88)
        if (r.m) set(r.m, '--m', seg(k, 0.95, 1.1).toFixed(4))
        if (r.th && r.dot) {
          const tp = g.L ? seg(k, 0.86, 0.97) : 0, ta = (tp > 0 ? 1 : 0) * (1 - seg(k, 1.08, 1.3))
          set(r.th, 'stroke-dashoffset', (g.L * (1 - tp)).toFixed(1))
          set(r.th, 'opacity', ta.toFixed(3))
          set(r.dot, 'opacity', ta.toFixed(3))
        }
        e += io3(seg(k, 0.58, 0.88))
      })
      // the evidence meter: one step per record filed
      set(meter, '--e', (e / recs.length).toFixed(4))
      if (fact) tog(fact, s.v, u > A + recs.length * R + V * 0.3)
    }

    // no work while the section is off screen; one settling frame when it leaves or comes back
    const frame = (y: number, vh: number) => { if (on) draw(y, vh) }
    const io = new IntersectionObserver(es => {
      on = es[es.length - 1].isIntersecting
      draw(scrollY, innerHeight)
    }, { rootMargin: '20% 0px 20% 0px' })

    sec.setAttribute('data-dk', '')
    const off = subscribe(frame, measure)
    io.observe(sec)
    return () => {
      off()
      io.disconnect()
      sec.removeAttribute('data-dk')
      for (const el of touched) {
        for (const k of Object.keys(last.get(el) ?? {})) el.style.removeProperty(k)
        el.classList.remove(s.v, s.off)
      }
    }
  }, [])

  return <div ref={ref} className={s.stage}>{children}</div>
}
