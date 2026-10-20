'use client'
// The home opening, JS half (SPEC 3.4, 4.8). Renders nothing; mounted inside Hero.
//
// The text and the card play from first paint as CSS keyframes (entrance.css, keyed on html.intro). This runs:
// - P2 Sweep: an amber cursor (2px line, 48px wake) with a year chip runs 2018 -> today from 1100 to 2500ms on the CSS
//   clock (the #hero "clock" animation), E(k) = 1 - (1-k)^2, so it starts moving and brakes into today. Each bar is
//   written as the cursor passes: scaleX from its real start month, amber while it grows (.wr), with its ping point
//   riding the leading edge as a pen tip; it crossfades to graphite when it completes.
// - P5 Marks, in evidence order: "building LLM applications" at cursor 2024.0, the two DeepLearning.AI claims at
//   2025.667 (one pen stroke), "eight years" last at today. P9 pings: Bexorg and DeepLearning.AI as the cursor reaches
//   them, the open caps at the end. The cited span follows the cursor from 2024; the verdict draws it back to 2018.333
//   (600ms --e-land, visually full by about 2.95s), holds it, and fades it from 3480 to 3800ms. Cleanup at 3800ms.
// - Brief (under the full-screen intro, public/intro): everything is drawn, CSS plays a 0.6s fade; classes cleared at
//   700ms. The intro's reveal then clicks #replay, so the full opening plays as the intro opens.
// - Skip: wheel, touchstart, pointerdown, keydown or a 40px scroll. Every CSS animation still waiting starts now, and
//   all of them land on one 180ms clock (updatePlaybackRate); the sweep jumps to its end with 180ms transitions.
//   Late JS: if the head script already added html.skip (no hydration by 2.5s), the mount lands everything at once.
//   An input from before the start is not a skip: the key or wheel that skipped the intro is what replayed this.
// - Replay (#replay): restarts every CSS animation (class off, reflow, class on) with the nav left in place.
// - Cites: claim hover/focus lights its evidence rows and the paired note; claim click lands on the record. Row hover
//   (mouse, not while scrolling) previews the row and tints its claims; row click lands. The next scroll clears it.
// Scene A (TraceFollow) stays out while api.state.intro or api.state.preview is true; remeasure() hands it back.
import { useEffect } from 'react'
import { land } from '@/components/motion/land'
import { remeasure, subscribe } from '@/components/motion/scroll'
import { getTraceApi } from './trace-api'

const T0 = 2018
const SWEEP = 1100      // ms on the CSS clock
const DUR = 1400
const HOLD = 980        // verdict start -> span fade: the 600ms draw is visually full by ~450ms, then held 500ms
const END = SWEEP + DUR + HOLD + 320   // 3800: the span's 320ms fade ends; every CSS beat (nav 3000 + 700) is over
const SKIPS = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const
const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)

export default function Entrance() {
  useEffect(() => {
    const d = document.documentElement
    const hero = document.getElementById('hero')
    const root = document.querySelector<HTMLElement>('[data-trace]')
    if (!hero || !root) return
    const api = getTraceApi(root)
    const claims = [...hero.querySelectorAll<HTMLElement>('.claim')]
    const notes = [...document.querySelectorAll<HTMLElement>('.notes [data-note]')]
    const keys = api.rows.map(r => r.dataset.k!)
    const bars = api.rows.map(r => r.querySelector<HTMLElement>('[data-bar]')!)
    const pts = api.rows.map(r => r.querySelector<HTMLElement>('[data-pt]')!)
    const caps = [...root.querySelectorAll<HTMLElement>('[data-cap]')]
    const cursor = root.querySelector<HTMLElement>('[data-cursor]')!
    const chip = cursor.firstElementChild as HTMLElement
    const band = root.querySelector<HTMLElement>('[data-band]')!
    const ov = root.querySelector<HTMLElement>('[data-ov]')!
    const replay = root.querySelector<HTMLElement>('#replay')
    const yrs = [...root.querySelectorAll<HTMLElement>('.yr:not(.odd)')].map(el => ({ el, y: +el.dataset.y! }))
    const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')   // trace.css: row cursor
    const FIRST = Math.min(...keys.map(api.startOf))                       // 2018.333, the verdict's left edge
    const evidence = (claim?: string) =>
      claim === 'dlai' ? ['dlai'] : claim === 'y24' ? keys.filter(k => api.startOf(k) >= 2024) : keys

    let W = ov.clientWidth
    let running = false, raf = 0, timer = 0, preview = false, lastY = -1
    let NOW = 2026.8, el0 = 0, t0 = 0, sweepStart = SWEEP, end = END, y0 = 0, year = 0
    let S: number[] = [], E: number[] = []
    let done: { [k: string]: boolean } = {}
    const X = (y: number) => (y - T0) / (NOW - T0)

    const unhide = () => yrs.forEach(l => l.el.classList.remove('under'))
    const ground = (claim: string) => claims.forEach(c => c.dataset.claim === claim && c.classList.add('on'))
    const pingStart = (k: string) => {                                       // P9 at the bar start, where the cursor is
      const p = api.rows[api.keyIdx[k]].querySelector<HTMLElement>('[data-pt]')
      if (!p) return
      p.classList.add('ping')
      p.addEventListener('animationend', () => p.classList.remove('ping'), { once: true })
    }

    // ---- the opening ----
    const tick = (ts: number) => {
      const el = el0 + Math.max(0, ts - t0)
      if (el < sweepStart) { raf = requestAnimationFrame(tick); return }    // the CSS beats run on their own until then
      const k = clamp((el - sweepStart) / DUR)
      const cur = T0 + (1 - (1 - k) ** 2) * (NOW - T0)
      if (k < 1) {
        cursor.classList.add('on')
        cursor.style.setProperty('--x', `${(X(cur) * W).toFixed(1)}px`)
        if (Math.floor(cur) !== year) chip.textContent = String((year = Math.floor(cur)))
        // the chip covers it: a label ahead of the chip hides early (the chip moves right), one behind returns at 36px
        yrs.forEach(l => { const dx = (X(l.y) - X(cur)) * W; l.el.classList.toggle('under', dx > -36 && dx < 48) })
      }
      if (!done.all) bars.forEach((b, i) => {                              // the last write is on the k = 1 frame
        const f = clamp((cur - S[i]) / (E[i] - S[i]))
        b.style.transform = `scaleX(${f.toFixed(4)})`
        api.rows[i].classList.toggle('wr', f > 0 && f < 1)
        // pen tip: the 10px ping point centred on the bar's round leading end (bar min-width 4px)
        if (f > 0) pts[i].style.transform = `translateX(${Math.max(0, f * Math.max(4, (X(E[i]) - X(S[i])) * W) - 10).toFixed(1)}px)`
      })
      if (cur >= 2024 && !done.y24) { done.y24 = true; ground('y24'); band.classList.add('on', 'live') }
      if (cur >= api.startOf('bexorg') && !done.bexorg) { done.bexorg = true; api.ping('bexorg') }
      if (done.y24 && !done.all) api.bandTo(X(2024), X(cur))
      if (cur >= api.startOf('dlai') && !done.dlai) { done.dlai = true; ground('dlai'); api.light('dlai'); pingStart('dlai') }
      if (k >= 1 && !done.all) {
        done.all = true
        ground('all')
        caps.forEach(c => c.classList.add('in'))
        api.ping('dlai', false); api.ping('b2p', false)
        cursor.classList.remove('on')
        cursor.addEventListener('transitionend', unhide, { once: true })    // the axis label returns after the chip fades
        api.light(null)
        band.classList.remove('live')
        band.classList.add('vd')
        api.bandTo(X(FIRST), 1)                                             // the verdict: draw back to May 2018
      }
      if (done.all && el >= sweepStart + DUR + HOLD) {
        // the span fades (a 320ms CSS transition): no frame work is left, so the loop stops here (before 3.5s)
        band.classList.remove('on')
        timer = window.setTimeout(() => finish(false), Math.max(0, end - el))
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const onSkip = (e: Event) => { if (e.timeStamp >= t0) finish(true) }
    const listen = (on: boolean) => SKIPS.forEach(e => (on ? window.addEventListener(e, onSkip, { passive: true }) : window.removeEventListener(e, onSkip)))

    const start = (replaying: boolean) => {
      running = true
      done = {}
      year = 0
      clearPreview()
      api.state.intro = true
      api.forget(); api.setActive(null); api.placeInd(null)
      NOW = parseFloat(getComputedStyle(d).getPropertyValue('--now')) || NOW
      S = keys.map(api.startOf)
      E = keys.map(api.endOf)
      W = ov.clientWidth
      // where the CSS opening is now: the #hero clock, else first paint (a browser that drops custom-property keyframes)
      const clock = hero.getAnimations().find(a => (a as CSSAnimation).animationName === 'i-clock')
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]
      el0 = clock ? Number(clock.currentTime) || 0 : fcp ? performance.now() - fcp.startTime : 0
      t0 = performance.now()
      sweepStart = Math.max(SWEEP, el0)                                     // late hydration: the sweep starts now
      end = Math.max(END, sweepStart + DUR + HOLD + 320)
      y0 = replaying ? scrollY : 0                                          // a restored scroll on load is a skip
      listen(true)
      // far too late for a sweep, or the head script already landed the hidden states (html.skip): land it all,
      // never redraw the bars from 0
      if (el0 >= 2600 || d.classList.contains('skip')) finish(true)
      else raf = requestAnimationFrame(tick)
    }

    const cleanup = () => {
      clearTimeout(timer); timer = 0
      d.classList.remove('intro', 'brief', 'skip', 'keepnav')
      bars.forEach(b => (b.style.transform = ''))
      pts.forEach(p => (p.style.transform = ''))
      cursor.style.removeProperty('--x')                                    // no stray offset after a resize
      band.classList.remove('vd')
      caps.forEach(c => c.classList.remove('in'))
      chip.textContent = ''
      api.forget()
      remeasure()                                                           // Scene A takes the card back
    }

    function finish(skip: boolean) {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      listen(false)
      skip ||= !done.all
      if (skip) {
        d.classList.add('skip')
        document.getAnimations().forEach(a => {
          const t = (a.effect as KeyframeEffect | null)?.target
          if (!t || !t.closest('#hero, #trace, #nav')) return
          const tm = a.effect!.getComputedTiming()
          const wait = Number(tm.delay) || 0
          if ((Number(a.currentTime) || 0) < wait) a.currentTime = wait     // still waiting: start now (one clock)
          const left = Number(tm.endTime) - Number(a.currentTime)
          if (left > 200) a.updatePlaybackRate(left / 180)
        })
      }
      bars.forEach(b => (b.style.transform = 'scaleX(1)'))
      api.rows.forEach(r => r.classList.remove('wr'))
      caps.forEach(c => c.classList.add('in'))
      claims.forEach(c => c.classList.add('on'))
      cursor.classList.remove('on')
      unhide()
      band.classList.remove('on', 'live')
      api.light(null)
      api.state.intro = false
      api.forget()
      if (skip) timer = window.setTimeout(cleanup, 240)                    // after the 180ms landing
      else cleanup()                                                        // every CSS beat ended at 3700ms
    }

    // ---- cites: claims -> rows, rows -> claims ----
    const hl = (cs: HTMLElement[]) => {
      claims.forEach(c => c.classList.toggle('hl', cs.includes(c)))
      const ns = cs.map(c => c.dataset.note)
      notes.forEach(n => n.classList.toggle('hl', ns.includes(n.dataset.note)))
    }
    const startPreview = () => { preview = true; api.state.preview = true; root.classList.add('pv') }
    const clearPreview = () => {
      if (!preview) return
      preview = false
      api.state.preview = false
      hl([])
      api.forget(); api.setActive(null); api.placeInd(null)
      remeasure()
      window.setTimeout(() => { if (!preview) root.classList.remove('pv') }, 320)
    }
    const citeClaim = (c: HTMLElement) => {
      if (api.state.intro) return
      startPreview()
      const key = c.dataset.claim
      if (key === 'dlai') { api.placeInd(api.keyIdx.dlai); api.setActive('dlai') }
      else { api.placeInd(null); api.setActive(evidence(key), [X(key === 'y24' ? 2024 : FIRST), 1]) }
      hl(claims.filter(o => o.dataset.claim === key))
    }
    const claimOff: (() => void)[] = []
    claims.forEach(c => {
      const enter = () => citeClaim(c)
      const click = () => setTimeout(() => land(c.getAttribute('href')!, false))
      c.addEventListener('pointerenter', enter); c.addEventListener('focus', enter)
      c.addEventListener('pointerleave', clearPreview); c.addEventListener('blur', clearPreview)
      c.addEventListener('click', click)
      claimOff.push(() => {
        c.removeEventListener('pointerenter', enter); c.removeEventListener('focus', enter)
        c.removeEventListener('pointerleave', clearPreview); c.removeEventListener('blur', clearPreview)
        c.removeEventListener('click', click)
      })
    })
    const rowsEl = root.querySelector<HTMLElement>('[data-rows]')!
    const rowOf = (e: Event) => (e.target as Element).closest<HTMLElement>('[data-row]')
    const onRowOver = (e: PointerEvent) => {
      const r = rowOf(e)
      if (!r || e.pointerType !== 'mouse' || api.state.intro || d.classList.contains('scrolling')) return
      const k = r.dataset.k!
      startPreview()
      api.placeInd(api.keyIdx[k]); api.setActive(k)
      const m = claims.filter(c => c.dataset.claim !== 'all' && evidence(c.dataset.claim).includes(k))
      hl(m.length ? m : claims.filter(c => c.dataset.claim === 'all'))
    }
    const onRowsOut = (e: PointerEvent) => { if (!rowsEl.contains(e.relatedTarget as Node)) clearPreview() }
    // the label is a real link (keyboard); on a desktop mouse the whole row is its target. Either way: land + flash.
    const onRowClick = (e: MouseEvent) => {
      const r = rowOf(e)
      if (!r || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return    // open in a new tab etc. stays native
      if (!fine.matches && !(e.target as Element).closest('a')) return
      e.preventDefault()
      land(r.dataset.href!)
    }
    rowsEl.addEventListener('pointerover', onRowOver)
    rowsEl.addEventListener('pointerout', onRowsOut)
    rowsEl.addEventListener('click', onRowClick)

    // ---- replay ----
    const onReplay = () => {
      if (running || !d.classList.contains('mo')) return
      cleanup()
      claims.forEach(c => c.classList.remove('on'))
      d.classList.add('keepnav')
      void d.offsetWidth                                                    // restart every CSS animation
      d.classList.add('intro')
      start(true)
    }
    const stop = (e: Event) => e.stopPropagation()                          // its own pointerdown is not a skip
    replay?.addEventListener('click', onReplay)
    replay?.addEventListener('pointerdown', stop)

    // ---- scroll: skip past 40px, clear a preview (unless a claim has focus) ----
    const unsub = subscribe(y => {
      if (y === lastY) return
      const moved = lastY >= 0
      lastY = y
      if (Math.abs(y - y0) > 40) {
        if (running) finish(true)
        else if (timer && d.classList.contains('brief')) cleanup()
      }
      if (moved && preview && !document.activeElement?.classList.contains('claim')) clearPreview()
    }, () => { api.measure(); W = ov.clientWidth })

    // ---- mount ----
    if (!d.classList.contains('intro')) { d.classList.remove('skip'); claims.forEach(c => c.classList.add('on')) }
    else if (d.classList.contains('brief')) {
      claims.forEach(c => c.classList.add('on'))
      timer = window.setTimeout(cleanup, 700)
    } else start(false)

    return () => {
      finish(true)
      if (timer) cleanup()
      unsub()
      claimOff.forEach(f => f())
      rowsEl.removeEventListener('pointerover', onRowOver)
      rowsEl.removeEventListener('pointerout', onRowsOut)
      rowsEl.removeEventListener('click', onRowClick)
      replay?.removeEventListener('click', onReplay)
      replay?.removeEventListener('pointerdown', stop)
    }
  }, [])
  return null
}
