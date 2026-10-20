'use client'
// Scene A (SPEC 3.5) and the timeline camera (option B): the timeline cites, then films, what you are reading.
// Client part of Experience; renders nothing visible on desktop and the phone evidence strip below 1024px.
//
// Reading line R = scrollY + 0.42 x innerHeight. Targets = every [data-cite] in DOM order (#about, the 5 roles, the
// 4 Earlier rows); their tops are cached in measure(), never read per frame. i = the last target with top <= R.
//   >= 1024px: the card's row indicator holds on row(i) for 88% of the record and glides to row(i+1) over the last
//              12% (smoothstep .88 -> 1), both ways with the scroll. Active row = g < .5 ? i : i+1; it pings once on
//              its first activation (trace-api). Does nothing while the opening or a hover preview owns the card.
//   <  1024px: html.strip-on while R is between the first role's top and the last Earlier row's bottom. The strip
//              shows the record under R (clamped to the records, so it is already in place when it slides in).
//
// Camera (html.mo and no reduced motion): from where R nears the records, the card becomes a camera on the record
// (experience/camera.ts says where it looks, experience/camera.css re-maps the card's own marks): it zooms into the
// role being read, writes that role's bar in amber with the sweep's pen as you read, pans between roles, and at the
// end pulls back to 2018 - now with every bar written. Phones: the same camera inside the evidence strip. A pure
// function of the scroll, so it runs both ways. It hands the card back at once when the opening or a hover preview
// takes it (api.watch), and Scene A re-cites from the next frame.
// Proof phrases: each role's Mark is the intro's highlighter, scrubbed by scroll as it crosses 62% -> 46% of the
// viewport (per word --h 0..1, --c shows the pen caret; Experience.module.css).
import { useCallback, useEffect, useRef, useState } from 'react'
import { remeasure, subscribe } from '@/components/motion/scroll'
import EvidenceStrip, { type StripState } from './EvidenceStrip'
import { shot, type Plan, type Shot, type View } from './experience/camera'
import { getTraceApi } from './trace-api'

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export default function TraceFollow() {
  const [strip, setStrip] = useState<StripState>({ k: null, prev: null, n: 0 })
  const stripEl = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const d = document.documentElement
    const root = document.querySelector<HTMLElement>('[data-trace]')
    const api = root ? getTraceApi(root) : null
    const desk = matchMedia('(min-width: 1024px)')
    const still = matchMedia('(prefers-reduced-motion: reduce)')
    const cites = [...document.querySelectorAll<HTMLElement>('[data-cite]')]
    const first = document.getElementById('r-dlai')
    const last = document.getElementById('r-ent')
    let tops: number[] = []
    let zone: [number, number] = [Infinity, -Infinity]
    let mode = ''
    let shown: string | null = null

    // ---- camera: the card's rows, their records, the marks ----
    const sec = document.getElementById('experience')
    const rows = api?.rows ?? []
    const keys = rows.map(r => r.dataset.k!)
    const recs = keys.map(k => sec?.querySelector<HTMLElement>(`[data-cite="${k}"]`) ?? null)
    const nRole = recs.filter(r => r?.tagName === 'ARTICLE').length
    const early = recs[nRole]?.closest<HTMLElement>('[data-rv]') ?? null
    const ov = root?.querySelector<HTMLElement>('[data-ov]')
    const band = root?.querySelector<HTMLElement>('[data-band]')
    const cursor = root?.querySelector<HTMLElement>('[data-cursor]')
    const camReady = !!(api && sec && ov && band && cursor && rows.length && recs.every(Boolean) && early)
    let plan: Plan | null = null
    let cw = 0, aw = 0
    let rbs: HTMLElement[] = [], pn: HTMLElement | null = null
    let cardOn = false, stripOn = false
    let cardSig = '', stripSig = ''                     // the last shot applied: an unchanged shot writes nothing
    const sig = (st: Shot) => `${st.view[0]},${st.view[1]},${st.cur},${st.vd},${st.f.join()}`
    const lastF: number[] = []
    const marks = sec ? [...sec.querySelectorAll<HTMLElement>('article .mark')].map(m => {
      let c = 0
      const parts = [...m.querySelectorAll<HTMLElement>('.w')].map(w => {
        const n = w.textContent!.length
        const p = { w, a: c, n, h: -1, c: -1 }
        c += n
        return p
      })
      return { m, parts, total: c, top: 0 }
    }) : []
    const motion = () => d.classList.contains('mo') && !still.matches
    if (sec && d.classList.contains('mo')) sec.setAttribute('data-scrub', '')   // the highlighter look (CSS, no reduced motion)

    const measure = () => {
      const y = scrollY
      tops = cites.map(c => c.getBoundingClientRect().top + y)
      if (first && last) zone = [first.getBoundingClientRect().top + y, last.getBoundingClientRect().bottom + y]
      api?.measure()
      marks.forEach(mk => { mk.top = mk.m.getBoundingClientRect().top + y })
      if (!camReady) return
      const box = (el: Element): View => { const r = el.getBoundingClientRect(); return [r.top + y, r.bottom + y] }
      plan = {
        S: keys.map(api!.startOf), E: keys.map(api!.endOf), now: api!.now(), nRole,
        R: recs.map(r => box(r!)), eb: box(early!), vh: innerHeight, desk: desk.matches,
      }
      cardSig = stripSig = ''                           // the pen positions depend on the widths below
      cw = ov!.getBoundingClientRect().width
      root!.style.setProperty('--cw', cw.toFixed(2))
      const el = stripEl.current
      const ax = el?.querySelector<HTMLElement>('[data-ax]')
      if (el && ax) {
        aw = ax.getBoundingClientRect().width
        el.style.setProperty('--aw', aw.toFixed(2))
        rbs = [...el.querySelectorAll<HTMLElement>('[data-rb]')]
        pn = el.querySelector<HTMLElement>('[data-pn]')
      }
    }

    // ---- the card camera (desktop) ----
    const card = (st: Shot) => {
      const [v0, v1] = st.view, cs = v1 - v0
      if (!cardOn) { cardOn = true; root!.classList.add('cam'); band!.classList.add('live') }
      // the cited span, in camera space (every frame: Scene A may have just re-cited it in full space)
      if (st.band) {
        api!.bandTo(clamp((st.band[0] - v0) / cs), clamp((st.band[1] - v0) / cs))
        band!.classList.add('on')
      } else band!.classList.remove('on')
      const g = sig(st)
      if (g === cardSig) return
      cardSig = g
      root!.style.setProperty('--c0', v0.toFixed(5))
      root!.style.setProperty('--cs', cs.toFixed(5))
      root!.style.setProperty('--vd', st.vd.toFixed(3))
      const cc = st.cur >= 0 ? st.cur : st.vd > 0 ? rows.length - 1 : -1   // the last row stays lit into the pull-back
      rows.forEach((r, i) => {
        const f = st.f[i]
        if (f !== lastF[i]) { lastF[i] = f; r.style.setProperty('--f', f.toFixed(4)) }
        r.classList.toggle('cc', i === cc)
        r.classList.toggle('cw', f > 0)
        r.classList.toggle('wr', i === st.cur && f > 0 && f < 1)
      })
      // the pen: the opening's sweep cursor on the written edge of the camera's row
      const c = st.cur
      if (c >= 0) {
        const { S, E } = plan!
        const x = ((S[c] - v0) / cs) * cw + st.f[c] * Math.max(4, ((E[c] - S[c]) / cs) * cw)
        cursor!.style.setProperty('--x', `${x.toFixed(1)}px`)
      }
      cursor!.classList.toggle('on', c >= 0 && st.f[c] > 0 && st.f[c] < 1)
    }
    const cardOff = () => {
      if (!cardOn) return
      cardOn = false
      cardSig = ''
      root!.classList.remove('cam')
      for (const p of ['--c0', '--cs', '--vd']) root!.style.removeProperty(p)
      rows.forEach(r => { r.classList.remove('cc', 'cw', 'wr'); r.style.removeProperty('--f') })
      lastF.length = 0
      cursor!.classList.remove('on')
      cursor!.style.removeProperty('--x')
      band!.classList.remove('live', 'on')
      api!.forget()                                   // Scene A re-applies its own span on its next frame
    }

    // ---- the strip camera (phones) ----
    const stripCam = (st: Shot) => {
      const g = sig(st)
      if (stripOn && g === stripSig) return
      stripSig = g
      const el = stripEl.current!
      const [v0, v1] = st.view, cs = v1 - v0
      if (!stripOn) { stripOn = true; el.setAttribute('data-cam', '') }
      el.style.setProperty('--c0', v0.toFixed(5))
      el.style.setProperty('--cs', cs.toFixed(5))
      el.style.setProperty('--vd', st.vd.toFixed(3))
      const on = st.cur >= 0 ? st.cur : rows.length - 1   // the last row stays lit into the pull-back
      rbs.forEach((b, i) => {
        b.style.setProperty('--f', st.f[i].toFixed(4))
        b.toggleAttribute('data-on', i === on)
      })
      const c = st.cur, f = c >= 0 ? st.f[c] : 0
      if (c >= 0) {
        const { S, E } = plan!
        pn!.style.setProperty('--px', `${(((S[c] - v0) / cs) * aw + f * Math.max(4, ((E[c] - S[c]) / cs) * aw)).toFixed(1)}px`)
      }
      pn!.toggleAttribute('data-on', f > 0 && f < 1)
    }
    const stripOff = () => {
      if (!stripOn) return
      stripOn = false
      stripSig = ''
      stripEl.current?.removeAttribute('data-cam')
    }

    // ---- the proof phrases: the highlighter, scrubbed ----
    const scrub = (y: number, vh: number) => {
      const a = y + vh * 0.62, span = vh * 0.16
      marks.forEach(mk => {
        const h = clamp((a - mk.top) / span) * mk.total
        mk.parts.forEach(p => {
          const v = clamp((h - p.a) / p.n), c = v > 0 && v < 1 ? 1 : 0
          if (v !== p.h) { p.h = v; p.w.style.setProperty('--h', v.toFixed(3)) }
          if (c !== p.c) { p.c = c; p.w.style.setProperty('--c', String(c)) }
        })
      })
    }

    const frame = (y: number, vh: number) => {
      const R = y + vh * 0.42
      let i = -1
      for (let j = 0; j < tops.length; j++) if (tops[j] <= R) i = j
      const live = motion()
      const st = camReady && plan && live ? shot(R, plan) : null
      if (live) scrub(y, vh)

      if (desk.matches) {
        stripOff()
        if (mode !== 'desk') { mode = 'desk'; d.classList.remove('strip-on') }
        if (!api || api.state.intro || api.state.preview) { cardOff(); return }
        if (!st?.on) cardOff()                          // first, so Scene A re-cites in this same frame
        if (i < 0) { api.setActive(null); api.placeInd(null) }
        else {
          const a = api.keyIdx[cites[i].dataset.cite!]
          let b = a
          let g = 0
          if (i + 1 < cites.length) {
            b = api.keyIdx[cites[i + 1].dataset.cite!]
            g = smooth(0.88, 1, (R - tops[i]) / (tops[i + 1] - tops[i]))
          }
          api.placeInd(a + (b - a) * g)
          const k = api.rows[g < 0.5 ? a : b].dataset.k!
          api.setActive(k)
          api.ping(k)
        }
        if (st?.on) card(st)
        return
      }

      cardOff()
      if (mode === 'desk' && api && !api.state.intro) { api.setActive(null); api.placeInd(null) }
      mode = 'phone'
      d.classList.toggle('strip-on', R >= zone[0] && R < zone[1])
      const k = i < 0 ? cites[0]?.dataset.cite ?? null : cites[i].dataset.cite!
      if (k !== shown) {
        const was = shown
        shown = k
        setStrip(s => ({ k, prev: was && !still.matches ? was : null, n: was ? s.n + 1 : 0 }))
      }
      if (st?.on && stripEl.current && pn) stripCam(st)
      else stripOff()
    }

    const off = subscribe(frame, measure)
    const unwatch = api?.watch(() => { if (api.state.intro || api.state.preview) cardOff() })
    return () => {
      off()
      unwatch?.()
      cardOff()
      stripOff()
      sec?.removeAttribute('data-scrub')
      d.classList.remove('strip-on')
    }
  }, [])

  // the strip mounts after hydration (a portal): measure it once it is there
  const onStrip = useCallback((el: HTMLDivElement | null) => { stripEl.current = el; if (el) remeasure() }, [])

  return <EvidenceStrip {...strip} rootRef={onStrip} onRolled={() => setStrip(s => ({ ...s, prev: null }))} />
}
