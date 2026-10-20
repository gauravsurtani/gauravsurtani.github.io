// The one scroll driver. One passive window scroll listener, at most one rAF per frame.
//
//   useEffect(() => subscribe(frame, measure), [])
//     frame(y, vh)  runs once per frame while scrolling, and after every remeasure. Do NO layout reads here:
//                   no getBoundingClientRect, no offsetTop. Only write transforms/classes from cached numbers.
//     measure()     reads geometry and caches it. Runs on subscribe, on body resize, after fonts load,
//                   and whenever someone calls remeasure().
//   subscribe returns the unsubscribe function, so it can be the effect's cleanup.
//
// It also owns html.scrolling: set on every scroll event, cleared 180ms after the last one. Hover previews key on
// html:not(.scrolling) so they never fire while rows pass under a still pointer (G10).
// Users: Navigation (Scene C, nav.scrolled, section label), TraceFollow (Scene A, phone strip), Entrance (skip),
// MotionRoot (moved(): fast reach reveals).
// Nothing else may listen to scroll.
type Frame = (y: number, vh: number) => void

const frames = new Set<Frame>()
const measures = new Set<() => void>()
let raf = 0
let mq = 0
let sT = 0
let started = false
// Scroll positions of the last 300ms of frames, for moved(). Recorded from the scrollY that run() reads anyway.
const trail: [number, number][] = []
let lastVh = 1

const run = () => {
  raf = 0
  const y = window.scrollY
  const vh = window.innerHeight
  const t = performance.now()
  trail.push([t, y])
  while (t - trail[0][0] > 300) trail.shift()
  lastVh = vh
  frames.forEach(f => f(y, vh))
}

// How far the page scrolled in the last 300ms, in viewport heights (0 when idle). No layout reads.
// MotionRoot marks reach reveals "fast" above 0.15 (a fast scroll, End, Page Down); a reading pace stays below it.
export function moved() {
  const t = performance.now()
  const s = trail.filter(p => t - p[0] <= 300)
  return s.length < 2 ? 0 : Math.abs(s[s.length - 1][1] - s[0][1]) / lastVh
}

function onScroll() {
  const d = document.documentElement
  d.classList.add('scrolling')
  clearTimeout(sT)
  sT = window.setTimeout(() => d.classList.remove('scrolling'), 180)
  if (!raf) raf = requestAnimationFrame(run)
}

export function remeasure() {
  cancelAnimationFrame(mq)
  mq = requestAnimationFrame(() => {
    measures.forEach(m => m())
    run()
  })
}

function start() {
  if (started) return
  started = true
  addEventListener('scroll', onScroll, { passive: true })
  new ResizeObserver(remeasure).observe(document.body)
  document.fonts?.ready.then(remeasure)
}

export function subscribe(frame: Frame, measure?: () => void) {
  start()
  frames.add(frame)
  if (measure) measures.add(measure)
  remeasure()
  return () => {
    frames.delete(frame)
    if (measure) measures.delete(measure)
  }
}
