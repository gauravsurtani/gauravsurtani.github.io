'use client'
// Contact scene, scroll option C "The record closes": the intro run backwards, scrubbed by the scroll position.
// Behind the pinned contact frame, the record (his resume lines from the intro, record.json, dim, evidence marked) comes
// back as the two halves the intro split apart. They close in from the top and the bottom of the screen and shut on a
// seam that lies under the email, while the axis cursor runs from 2018 to now. The closed record folds into the seam,
// the seam contracts to the width of the email (the verdict line), and the cursor drops from "now" onto its open end.
//
// k: -0.22 just before the frame pins, 0 when it pins, 1 when it unpins or the page ends (on phones the short frame
// is still pinned when the page ends). The scene follows the scroll with a short
// scrub (time constant 0.28s) and runs both ways. A jump (deep link, nav, reload) snaps to the scroll position;
// #contact lands at the end of the stage (scroll-margin-top in Contact.module.css), so it shows the finished state.
// Renders the record columns (React, after the first measure: their number depends on the frame width) and the drop.
// Only runs on the stage (html.mo, STAGE matches, the frame is sticky); otherwise the section stays static and this
// renders nothing visible. STAGE is re-evaluated on change (reduced motion turned on, a window made short): off the
// stage the scene stops and removes every inline style it wrote, so the static section is exactly the CSS one.
// Reads the scroll through the shared driver, writes transforms and opacity only.
import { useEffect, useMemo, useRef, useState } from 'react'
import { subscribe, remeasure } from '@/components/motion/scroll'
import s from '../Contact.module.css'
import REC from './record.json'

const N = REC.length
// the stage's media query: the same as the stage blocks in Contact.module.css
const STAGE = '(prefers-reduced-motion: no-preference) and (min-height: 521px)'
const SPD = [21, 27, 17, 31, 24, 19, 29]
const K0 = -0.22

const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const seg = (t: number, a: number, d: number) => cl((t - a) / d)
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const ss = (x: number) => x * x * (3 - 2 * x)
const io3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const o3 = (x: number) => 1 - Math.pow(1 - x, 3)
const o4 = (x: number) => 1 - Math.pow(1 - x, 4)
const back = (x: number) => (x <= 0 ? 0 : 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2))

type Col = { x: number; w: number; off: number; v: number; base: number }

// columns of the record for a frame width, centred, the edge columns cut by the screen (the intro's layout)
function layout(W: number): Col[] {
  if (!W) return []
  const small = W < 640, CW = small ? W - 48 : 420, GAP = small ? 28 : 44, K = Math.ceil((W / 2 + CW / 2) / (CW + GAP)), out: Col[] = []
  for (let k = -K; k <= K; k++) {
    const x = Math.round(W / 2 - CW / 2 + k * (CW + GAP))
    if (x + CW < 0 || x > W) continue
    out.push({ x, w: CW, off: (((k % N) + N) * 7) % N, v: SPD[(k + 14) % SPD.length], base: -((Math.abs(k) * 157 + (k < 0 ? 83 : 0)) % 260) - 24 })
  }
  return out
}

function Entry({ e: [label, text, mark] }: { e: string[] }) {
  const i = mark ? text.indexOf(mark) : -1
  return (
    <p className={s.e}>
      <span className={s.l}>{label}</span>
      {i < 0 ? text : <>{text.slice(0, i)}<span className={s.p}>{mark}</span>{text.slice(i + mark.length)}</>}
    </p>
  )
}

// the scene on the stage (r the record, dr the drop, fr the frame, sec the section); returns its stop
function run(r: HTMLElement, dr: HTMLElement, fr: HTMLElement, sec: HTMLElement, setW: (w: number) => void, colsRef: { current: Col[] }) {
  const q = (c: string) => sec.querySelector<HTMLElement>(`.${c}`)!
  const box = q(s.box), axis = q(s.axis), cur = q(s.cur), cap = q(s.cap), land = q(s.land), links = q(s.links), seam = q(s.seam)
  const tag = cur.firstElementChild as HTMLElement, head = sec.querySelector<HTMLElement>('.sec-h')!
  const halves = Array.from(r.querySelectorAll<HTMLElement>(`.${s.half}`)), edges = Array.from(r.querySelectorAll<HTMLElement>(`.${s.edge}`))
  let M: { W: number; H: number; Ys: number; bl: number; bw: number; start: number; end: number; doc: number } | null = null
  let els: HTMLElement[][] = [[], []], w0 = 0, shown = '', pv = -9, sv = -9, raf = 0, last = 0, dirty = false

  // layout is read here only: on subscribe, font load, size changes and new columns; never per frame
  // H: the record's height, one screen (on phones the frame is shorter than the record)
  function measure() {
    const W = fr.clientWidth, H = r.clientHeight
    if (W !== w0) { w0 = W; setW(W) }
    r.style.setProperty('--rf', `${W < 640 ? 15 : W < 1100 ? 17 : 18}px`)
    const f = fr.getBoundingClientRect(), br = box.getBoundingClientRect(), ar = axis.getBoundingClientRect()
    // the seam: under the email, where the verdict line will be
    const Ys = Math.round(br.bottom - f.top - 5)
    halves[0].style.clipPath = `inset(0 0 ${H - Ys}px 0)`
    halves[1].style.clipPath = `inset(${Ys}px 0 0 0)`
    halves.forEach(h => { h.style.transformOrigin = `50% ${Ys}px` })
    edges[0].style.top = `${Ys - 2}px`
    edges[1].style.top = `${Ys}px`
    seam.style.top = `${Ys - 1}px`
    const ny = ar.top - f.top + cur.offsetHeight
    dr.style.left = `${ar.right - f.left - 1}px`
    dr.style.top = `${ny}px`
    dr.style.height = `${Math.max(0, Ys - ny)}px`
    // the content block, heading to links: the record is masked out behind it
    r.style.setProperty('--b0', `${Math.round(head.getBoundingClientRect().top - f.top - 8)}px`)
    r.style.setProperty('--b1', `${Math.round(links.getBoundingClientRect().bottom - f.top + 8)}px`)
    els = halves.map(h => Array.from(h.children) as HTMLElement[])
    const top = sec.getBoundingClientRect().top + scrollY
    M = { W, H, Ys, bl: br.left - f.left, bw: box.offsetWidth, start: top, end: top + sec.offsetHeight - fr.offsetHeight,
      doc: document.documentElement.scrollHeight }
    dirty = true
  }

  function draw(k: number) {
    if (!M) return
    const { W, H, Ys } = M
    // the halves close on the seam, slowly and then they shut; then the closed record folds into the seam
    const m = ss(seg(k, K0, 0.56)), fold = ss(seg(k, 0.38, 0.32)), gap = H * 0.06
    const t0 = -(1 - m) * (Ys + gap), t1 = (1 - m) * (H - Ys + gap), sc = `${(1 + (1 - m) * 0.05).toFixed(4)},${(1 - fold).toFixed(4)}`
    halves[0].style.transform = `translate3d(0,${t0.toFixed(2)}px,0) scale(${sc})`
    halves[1].style.transform = `translate3d(0,${t1.toFixed(2)}px,0) scale(${sc})`
    halves[0].style.opacity = halves[1].style.opacity = (1 - fold * 0.55).toFixed(3)
    // out of layout while open or folded, so nothing is painted and no hidden text is left behind
    const d = m <= 0 || fold >= 1 ? '' : 'block'
    if (d !== shown) { shown = d; halves.forEach(h => { h.style.display = d }) }
    // the record keeps moving like a transcript while it closes
    if (d) colsRef.current.forEach((c, i) => {
      const tr = `translate3d(0,${(c.base - c.v * k * 5).toFixed(2)}px,0)`
      els.forEach(h => { if (h[i]) h[i].style.transform = tr })
    })
    // the amber edges ride the halves in and go out as they meet
    const ea = (seg(k, -0.18, 0.18) * (1 - seg(k, 0.34, 0.04))).toFixed(3)
    edges[0].style.transform = `translate3d(0,${t0.toFixed(2)}px,0)`
    edges[1].style.transform = `translate3d(0,${t1.toFixed(2)}px,0)`
    edges[0].style.opacity = edges[1].style.opacity = ea
    // the seam: full width and glowing when the record shuts, then it contracts to the email: the verdict line
    const shrink = o4(seg(k, 0.62, 0.2)), done = seg(k, 0.91, 0.01)
    seam.style.transform = `translate3d(${lerp(0, M.bl, shrink).toFixed(2)}px,0,0) scaleX(${(lerp(W, M.bw, shrink) / W).toFixed(5)})`
    seam.style.opacity = (seg(k, 0.32, 0.02) * (1 - done)).toFixed(3)
    seam.style.setProperty('--g', (seg(k, 0.32, 0.04) * (1 - seg(k, 0.62, 0.2))).toFixed(3))
    land.style.transform = done >= 1 ? '' : 'scaleX(0)'
    // the cursor runs from 2018 to now while the record closes, then drops onto the open end of the line
    const c = io3(seg(k, -0.18, 0.52)), atNow = seg(k, 0.34, 0.05)
    cur.style.transform = `translateX(${((c - 1) * 100).toFixed(3)}%)`
    cur.style.setProperty('--cm', (seg(k, -0.18, 0.04) * (1 - atNow)).toFixed(3))
    tag.style.opacity = String(atNow)
    tag.style.transform = `scale(${lerp(0.4, 1, back(atNow)).toFixed(3)})`
    dr.style.transform = `scaleY(${o3(seg(k, 0.78, 0.12)).toFixed(4)})`
    cap.style.transform = `scale(${back(seg(k, 0.91, 0.06)).toFixed(3)})`
  }

  // scrub: ease toward the scroll position; jump when far away (a reload or a jump link)
  function step() {
    raf = 0
    const t = performance.now(), dt = last ? Math.min(0.1, (t - last) / 1000) : 0.016
    last = t
    sv = sv < -1 || Math.abs(pv - sv) > 0.5 ? pv : sv + (pv - sv) * (1 - Math.exp(-dt / 0.28))
    if (Math.abs(pv - sv) < 0.0006) sv = pv
    draw(sv)
    if (sv !== pv) raf = requestAnimationFrame(step)
    else last = 0
  }

  // per scroll frame: off the stage the position stays clamped, so nothing runs. The end is the unpin or the last
  // scroll position, whichever comes first (vh from the driver: a phone's URL bar moves the last position)
  function frame(y: number, vh: number) {
    if (!M) return
    const end = Math.max(M.start + 1, Math.min(M.end, M.doc - vh - 1))
    const p = Math.max(K0, Math.min(1, (y - M.start) / (end - M.start)))
    if (p === pv && !dirty) return
    pv = p
    dirty = false
    if (!raf) step()
  }

  const off = subscribe(frame, measure)
  return () => {
    off()
    cancelAnimationFrame(raf)
    for (const el of [r, dr, seam, cur, tag, land, cap, ...halves, ...edges]) el.removeAttribute('style')
    setW(0)   // drops the record columns (and their transforms) until the stage is back
  }
}

export default function ContactScene() {
  const [W, setW] = useState(0)
  const rec = useRef<HTMLDivElement>(null)
  const drop = useRef<HTMLElement>(null)
  const cols = useMemo(() => layout(W), [W])
  const colsRef = useRef(cols)
  const body = useMemo(() => cols.map((c, i) => (
    <div key={i} className={s.rcol} style={{ left: c.x, width: c.w }}>
      {REC.map((_, j) => <Entry key={j} e={REC[(c.off + j) % N]} />)}
    </div>
  )), [cols])

  // new columns after a width change: cache them and measure again (the scene picks up the new elements)
  useEffect(() => {
    colsRef.current = cols
    if (cols.length) remeasure()
  }, [cols])

  useEffect(() => {
    const r = rec.current, dr = drop.current, fr = r?.parentElement, sec = fr?.parentElement
    if (!r || !dr || !fr || !sec || !document.documentElement.classList.contains('mo')) return
    const mq = matchMedia(STAGE)
    let stop: (() => void) | undefined
    const sync = () => {
      stop?.()
      stop = mq.matches && getComputedStyle(fr).position === 'sticky' ? run(r, dr, fr, sec, setW, colsRef) : undefined
    }
    sync()
    mq.addEventListener('change', sync)
    return () => { mq.removeEventListener('change', sync); stop?.() }
  }, [])

  return (
    <>
      <div ref={rec} className={s.rec} aria-hidden="true">
        <div className={s.hv}>
          <div className={s.half}>{body}</div>
          <div className={s.half}>{body}</div>
        </div>
        <i className={s.edge} />
        <i className={s.edge} />
        <i className={s.seam} />
      </div>
      <i ref={drop} className={s.drop} aria-hidden="true" />
    </>
  )
}
