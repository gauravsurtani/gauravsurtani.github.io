// Reduced motion turned on while a page is open. One shared matchMedia listener for every scene.
//
//   import { onReduce } from '@/components/motion/reduce'
//   useEffect(() => {
//     if (!document.documentElement.classList.contains('mo')) return      // reduced motion at load: never start
//     ...start the scene...
//     const offReduce = onReduce(stop)      // stop: the same teardown as the effect's cleanup is usually right
//     return () => { offReduce(); stop() }
//   }, [])
//
// When the reader turns on prefers-reduced-motion, this removes html.mo (every hidden state and motion style keyed on
// html.mo goes away, and MotionRoot reveals every reach block at once), then calls each subscriber once.
// A subscriber must leave its content exactly as a reduced-motion load shows it: unsubscribe from scroll frames
// (scroll.ts), cancel its rAF and timers, and clear every inline style, attribute and state class it wrote.
// One way: turning reduced motion off again does not restart motion (a scene could have been torn down mid-way, and
// its html.mo hidden states would come back with nothing to reveal them). The next page load has motion again.
const fns = new Set<() => void>()
let listening = false

export function onReduce(fn: () => void) {
  if (!listening && typeof window !== 'undefined') {
    listening = true
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
      if (!e.matches) return
      document.documentElement.classList.remove('mo')
      const l = [...fns]
      fns.clear()
      l.forEach(f => f())
    })
  }
  fns.add(fn)
  return () => { fns.delete(fn) }
}
