'use client'
// Skills scene "Sorted" (client part of Skills.tsx; renders nothing). From 1024px (three columns) it runs both ways with
// the reader's scroll. Below 1024px (stacked groups) there is no stream: each group plays once, in time, when its top
// reaches 85% of the screen (its skills rise in one after another, then draw their leaders), then stays finished (it
// never runs again on scroll back), so a reader who stops scrolling never sees a half-built list.
//
// The 22 skills start as one shuffled stream (dimmed, still readable). As the section rises, one skill after another
// lifts out of the stream and swings into its slot: the AI group first, then Engineering, then Infrastructure, each
// group top to bottom, so the skills in the air at one time all head the same way. A skill in flight first reaches its
// own row while it is still over the stream, then glides in along that row, so it never crosses a landed skill; it
// passes over everything else with a thin page-colour halo round its letters (faded in and out with the flight; no box,
// so it never crops a stream word). The stream always waits where the next group will not
// land: beside it (three columns) or below it (stacked groups; there it first sits under the heading and holds still
// on screen while the first group's space opens above it). Between two groups it closes ranks and moves on. A
// group's rule and name draw in as its first skill arrives. Once a skill lands, an amber sweep crosses it and fades
// (a short CSS animation, so it settles wherever the reader stops) and its leader draws out to its bundle; the spine
// grows up to meet each new leader, and the role link appears with the bundle's first leader. Desktop with room: the
// stage pins for a while (Skills.module.css).
//
// P (0..1) = scroll progress (from 1024px), piecewise linear between knots: it starts when the stream is on screen and each group
// is finished (skills, name, leaders, role links) while that group is still fully on screen, early enough that it
// stays there, finished, for a good while (three columns: all three by the same moment). The timeline is counted in
// units: one per skill, SINK per stream move, flights overlapping.
// Geometry is read only in measure() (load, fonts, resize: the shared scroll driver calls it). Idle off screen.
// Finished at once and held until the section leaves the screen: a /#skills load or jump, or keyboard focus inside.
// Reduced motion and no JS: nothing runs; the markup is the finished state. Reduced motion turned on later
// (motion/reduce): the scene stops and removes everything it wrote (the finished state).
import { useEffect } from 'react'
import { land } from '@/components/motion/land'
import { onReduce } from '@/components/motion/reduce'
import { subscribe } from '@/components/motion/scroll'

const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const o3 = (x: number) => 1 - (1 - x) ** 3
const io3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)
const r3 = (x: number) => Math.round(x * 1000) / 1000

// the timeline, in units of one skill
const START = 0.06     // P where the first skill leaves the stream
const SINK = 2         // the stream closing ranks before the next group
const FLIGHT = 3.2     // one flight (about 3 skills in the air)
const EVIDENCE = 2.6   // sweep + leader + spine, from .3 before the landing
// a flight: the row is reached over its first half (YEND), the glide along the row starts at GLIDE
const YEND = 0.5
const GLIDE = 0.3
// below 1024px, in seconds: one skill's rise, the gap between two skills' starts, one leader
const RISE = 0.5
const STAG = 0.06
const EVD = 0.6

type Pt = { x: number; y: number }
type Item = {
  li: HTMLElement; t: HTMLElement; g: number; j: number; cite: boolean; next?: Item; a: number; b: number
  x: number; y: number; ox: number; oy: number; w: number; h: number; bot: number
  at: Pt[]   // the stream position for each phase up to its own group, as an offset from its slot
  tf: string; p: number; e: number; s: number
}

export default function SkillsMotion() {
  useEffect(() => {
    const sec = document.getElementById('skills')
    const stage = sec?.firstElementChild as HTMLElement | null
    if (!sec || !stage) return
    // a role link: the browser jumps, then the record flashes and takes focus (P8)
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element).closest('a[href^="#r-"]')
      if (a) setTimeout(() => land(a.getAttribute('href')!, false))
    }
    sec.addEventListener('click', onClick)
    const quit = () => sec.removeEventListener('click', onClick)
    if (!document.documentElement.classList.contains('mo')) return quit

    const items: Item[] = []
    // y, t0, len: below 1024px, the group's top (document), when its play started (-Infinity: finished at once), seconds
    const groups: { el: HTMLElement; rule: HTMLElement; h: HTMLElement; lead: Item; sink: number; k: number; done: number; y: number; t0: number; len: number }[] = []
    const runs: { a: HTMLElement; first: Item; k: number }[] = []
    let u = 0
    stage.querySelectorAll<HTMLElement>('[data-skg]').forEach((el, g) => {
      if (g) u += SINK
      const lead = items.length
      el.querySelectorAll('ul').forEach(ul => {
        const first = items.length
        let prev: Item | undefined
        ul.querySelectorAll<HTMLElement>(':scope > li').forEach(li => {
          const it = { li, t: li.firstElementChild as HTMLElement, g, j: items.length - lead, cite: li.childElementCount > 1, a: u++, at: [], tf: '-', p: -1, e: -1, s: -1 } as unknown as Item
          if (prev) prev.next = it
          prev = it
          items.push(it)
        })
        const a = ul.nextElementSibling
        if (a instanceof HTMLElement && items[first]) runs.push({ a, first: items[first], k: -1 })
      })
      groups.push({ el, rule: el.firstElementChild as HTMLElement, h: el.querySelector('h3')!, lead: items[lead], sink: 0, k: -1, done: 0,
        y: 0, t0: 0, len: (items.length - lead - 1) * STAG + RISE + EVD })
    })
    if (!items.length) return quit
    const k = (0.99 - START) / (u - 1 + FLIGHT - 0.3 + EVIDENCE)
    const F = FLIGHT * k
    const E = EVIDENCE * k
    const S = SINK * k
    items.forEach(it => {
      it.a = START + it.a * k
      it.b = it.a + (FLIGHT - 0.3) * k
      const gr = groups[it.g]
      gr.done = Math.max(gr.done, it.cite ? it.b + E : it.a + F)   // its last skill landed (and its leader drawn)
    })
    groups.forEach(gr => { gr.sink = gr.lead.a - S })
    // a fixed shuffle that mixes the three groups, so the stream reads as unsorted
    const order = items.map((_, i) => i)
    let seed = 7
    for (let i = order.length - 1; i > 0; i--) {
      seed = (seed * 16807) % 2147483647
      const j = seed % (i + 1)
      ;[order[i], order[j]] = [order[j], order[i]]
    }

    let ready = false
    let live = false
    let latch = location.hash === '#skills'
    let top = 0, bot = 0, hold = 0, sh = 0
    let timed = false, raf = 0   // below 1024px: each group plays in time
    let knots: [number, number][] = []   // [scroll y, P], y rising

    const measure = () => {
      sec.setAttribute('data-skm', '')
      const y = scrollY
      const vh = innerHeight
      const navh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navh')) || 64
      const sr = stage.getBoundingClientRect()
      const cs = getComputedStyle(stage)
      const box = groups.map(gr => {
        const r = gr.el.getBoundingClientRect()
        gr.y = r.top + y
        return { l: r.left - sr.left, r: r.right - sr.left, t: r.top - sr.top, e: r.bottom - sr.top, b: 0 }
      })
      items.forEach(it => {
        const r = it.li.getBoundingClientRect()
        const tr = it.t.getBoundingClientRect()
        it.x = r.left - sr.left; it.y = r.top - sr.top; it.bot = r.bottom - sr.top
        it.ox = tr.left - r.left; it.oy = tr.top - r.top; it.w = tr.width; it.h = tr.height
        box[it.g].b = Math.max(box[it.g].b, it.bot)
      })
      sec.removeAttribute('data-skm')
      timed = innerWidth < 1024
      // timed mode has no stream: clear what a desktop flight left (a resize across 1024px mid-flight)
      if (timed) items.forEach(it => {
        it.li.removeAttribute('data-fly')
        ;['--sp', '--pl', 'z-index'].forEach(p => it.li.style.removeProperty(p))
      })
      const small = innerWidth < 760
      const R = sr.width - parseFloat(cs.paddingRight)
      const gap = small ? 16 : 30
      const lh = small ? 30 : 36
      const y0 = Math.min(...items.map(it => it.y)) - (small ? 0 : 6)
      // the stream for phase g (group g sorting): the skills of groups >= g, shuffled, wrapped in a region where
      // group g does not land: from the next group's column when it stands beside group g, else below group g
      let h0 = 0
      const columns = box.length > 1 && box[1].l >= box[0].r
      box.forEach((b, g) => {
        const nx = box[g + 1]
        const beside = nx && nx.l >= b.r
        const x0 = beside ? nx.l : b.l
        const yt = beside ? y0 : b.b + 18
        let px = x0, py = yt, lineH = lh
        order.forEach(i => {
          const it = items[i]
          if (it.g < g) return
          if (px + it.w > R && px > x0) { px = x0; py += lineH; lineH = lh }
          it.at[g] = { x: px - it.ox - it.x, y: py - it.oy - it.y }
          px += it.w + gap
          lineH = Math.max(lineH, it.h + lh - 26)
          if (!g) h0 = Math.max(h0, py + it.h - yt)
        })
        if (!g) { h0 += yt; hold = yt - y0 }
      })
      // the scroll range (document coordinates; the stage's natural top, even while it is pinned)
      top = sec.getBoundingClientRect().top + y
      bot = top + sec.offsetHeight
      const stageTop = top + parseFloat(getComputedStyle(sec).paddingTop)
      const pin = cs.position === 'sticky' ? bot - stage.offsetHeight - stageTop : 0   // scroll spent pinned
      sh = stageTop + h0 - 0.95 * vh   // the stream's bottom at 95% of the viewport (stacked: the hold ends)
      // group g is fully on screen from A (its bottom at the viewport bottom) to B (its top at the nav). It is finished
      // by "due", then stays fully on screen, finished, for 40% of that span (stacked: 30%, the first group needs the
      // rest), at most half a screen of scrolling.
      const due = box.map(b => {
        const A = stageTop + b.e - vh, B = stageTop + b.t - navh + pin
        return B - Math.min(0.5 * vh, (columns ? 0.4 : 0.3) * (B - A))
      })
      if (columns) knots = [[sh, 0], [Math.max(Math.min(...due), sh + 0.4 * vh), 1]]
      else {
        // stacked: the sort starts while the stream still holds under the opening space; one knot per group
        knots = [[sh - 0.7 * hold, 0]]
        groups.forEach((gr, g) => {
          const prev = knots[knots.length - 1][0]
          knots.push([Math.max(due[g], prev + 0.15 * vh), g === groups.length - 1 ? 1 : gr.done])
        })
      }
      items.forEach(it => { it.tf = '-'; it.p = it.e = it.s = -1 })
      runs.forEach(r => { r.k = -1 })
      groups.forEach(gr => { gr.k = -1 })
      ready = true
    }

    const progress = (y: number) => {
      if (y <= knots[0][0]) return 0
      for (let i = 1; i < knots.length; i++) {
        const [y1, p1] = knots[i], [y0, p0] = knots[i - 1]
        if (y < y1) return p0 + (p1 - p0) * (y - y0) / (y1 - y0)
      }
      return 1
    }

    const paint = (P: number, up: number, now: number) => {
      const moved = groups.map(gr => io3(cl((P - gr.sink) / S)))
      items.forEach(it => {
        let p: number, e: number, tf: string
        if (timed) {
          // below 1024px: its group's play; it rises 14px into its slot, then draws its leader
          const gr = groups[it.g]
          const t = gr.t0 ? (now - gr.t0) / 1000 - it.j * STAG : -1
          p = r3(cl(t / RISE))
          e = it.cite ? r3(cl((t - 0.6 * RISE) / EVD)) : 1
          tf = p >= 1 ? '' : `translate3d(0,${((1 - o3(p)) * 14).toFixed(1)}px,0)`
        } else {
          p = r3(cl((P - it.a) / F))
          e = it.cite ? r3(cl((P - it.b) / E)) : 1
          let x = it.at[0].x, yy = it.at[0].y - up
          for (let g = 1; g <= it.g; g++) {
            x += (it.at[g].x - it.at[g - 1].x) * moved[g]
            yy += (it.at[g].y - it.at[g - 1].y) * moved[g]
          }
          // over the stream it reaches its own row, then glides in along the row (no lift: a lift would cross the
          // skill landed above); the swell says it is in the air
          const qy = io3(cl(p / YEND))
          const qx = io3(cl((p - GLIDE) / (1 - GLIDE)))
          tf = p >= 1 ? '' : `translate3d(${(x * (1 - qx)).toFixed(1)}px,${(yy * (1 - qy)).toFixed(1)}px,0) scale(${(1 + Math.sin(Math.PI * p) * 0.07).toFixed(3)})`
        }
        if (tf !== it.tf) { it.tf = tf; it.li.style.transform = tf }
        if (p !== it.p && timed) {
          it.p = p
          it.li.style.opacity = p >= 1 ? '' : o3(p).toFixed(3)
        } else if (p !== it.p) {
          it.p = p
          const st = it.li.style
          st.opacity = p >= 1 ? '' : (0.6 + 0.4 * cl(p * 5)).toFixed(3)
          // in flight: over everything, its halo faded in and out; landed: over the stream
          st.zIndex = p >= 1 ? '1' : p > 0 ? '2' : ''
          it.li.toggleAttribute('data-fly', p > 0 && p < 1)
          st.setProperty('--pl', cl(Math.min(p, 1 - p) * 5).toFixed(3))
          st.setProperty('--sp', (1 - cl(p * 6)).toFixed(3))
        }
        if (e !== it.e) {
          it.e = e
          it.li.style.setProperty('--e', String(e))
          // the amber sweep plays once as the evidence beat starts (not on a finish at once)
          it.li.toggleAttribute('data-ev', it.cite && e > 0 && !latch)
        }
      })
      items.forEach(it => {
        if (!it.next) return
        const s = r3(cl((it.next.e - 0.7) / 0.3))
        if (s !== it.s) { it.s = s; it.li.style.setProperty('--s', String(s)) }
      })
      runs.forEach(r => {
        const q = r3(cl((r.first.e - 0.55) / 0.35))
        if (q === r.k) return
        r.k = q
        r.a.style.opacity = q >= 1 ? '' : String(q)
        r.a.style.transform = q >= 1 ? '' : `translateX(${((1 - q) * -8).toFixed(1)}px)`
      })
      groups.forEach(gr => {
        const q = r3(o3(cl(gr.lead.p * 1.6 - 0.6)))
        if (q === gr.k) return
        gr.k = q
        gr.rule.style.transform = q >= 1 ? '' : `scaleX(${q})`
        gr.h.style.opacity = q >= 1 ? '' : String(q)
        gr.h.style.transform = q >= 1 ? '' : `translateY(${((1 - q) * 10).toFixed(1)}px)`
      })
    }

    const tick = () => { raf = 0; frame(scrollY, innerHeight) }
    const frame = (y: number, vh: number) => {
      if (!ready) return
      if (timed) {
        // a group starts its play when its top reaches 85% of the screen; a jump or focus finishes the rest at once
        const now = performance.now()
        groups.forEach(gr => { if (latch) gr.t0 = -Infinity; else if (!gr.t0 && y + 0.85 * vh >= gr.y) gr.t0 = now })
        paint(0, 0, now)
        if (!raf && groups.some(gr => gr.t0 > 0 && now - gr.t0 < gr.len * 1000)) raf = requestAnimationFrame(tick)
        return
      }
      const on = top - y < vh * 1.15 && bot - y > -vh * 0.15
      if (!on && !live) return
      live = on
      if (latch && (top - y > vh || bot - y < 0)) latch = false
      const P = latch ? 1 : progress(y)
      // stacked groups: the stream first sits under the heading, then holds still on screen while the first group's
      // space opens above it (it moves down the page as fast as the page scrolls up), until it is below that space
      paint(P, hold && !latch ? hold * cl((sh - y) / hold) : 0, 0)
    }

    const finish = () => { latch = true; live = true; frame(scrollY, innerHeight) }
    const onHash = () => { if (location.hash === '#skills') finish() }
    sec.addEventListener('focusin', finish)
    addEventListener('hashchange', onHash)
    const off = subscribe(frame, measure)
    // stop, and remove everything the scene wrote (the finished state)
    const stop = () => {
      off()
      cancelAnimationFrame(raf)
      sec.removeEventListener('focusin', finish)
      removeEventListener('hashchange', onHash)
      items.forEach(it => { it.li.removeAttribute('style'); it.li.removeAttribute('data-fly'); it.li.removeAttribute('data-ev') })
      runs.forEach(r => r.a.removeAttribute('style'))
      groups.forEach(gr => { gr.rule.removeAttribute('style'); gr.h.removeAttribute('style') })
    }
    const offReduce = onReduce(stop)
    return () => {
      offReduce()
      stop()
      quit()
    }
  }, [])
  return null
}
