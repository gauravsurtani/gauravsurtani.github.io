// Imperative API over the timeline card (Trace.tsx). One instance per root, cached.
// Users: Entrance (WP1: sweep, claim cites, row previews) and TraceFollow (WP3: Scene A and the timeline camera). Do not change the ids,
// data attributes or this API without telling both.
//
//   const api = getTraceApi(document.querySelector('[data-trace]') as HTMLElement)
//   api.measure()                    cache row height / offset and --now (call from a scroll-driver measure callback)
//   api.setActive('dlai')            light one row (others dim) and move the cited span to its real dates
//   api.setActive(['bexorg', 'tassel'], [api.X(2024), 1])   light several rows and cite an explicit region
//   api.setActive(null)              nothing cited
//   api.placeInd(i)                  row indicator at row position i (fractions glide between rows); null hides it
//   api.ping('dlai')                 one-shot ping (P9) on a row's cap or ping point; once per key unless once=false
//   api.state.intro / .preview       Scene A does nothing while either is true
//   api.watch(fn)                    fn runs when either flag changes (the camera hands the card back at once); returns unwatch
//   api.now()                        the cached --now (decimal year)
//   api.forget()                     drop the active-key memo so the next setActive always applies
//
// X(v) maps a decimal year to 0..1 across 2018..now, where now = the --now custom property on <html>.
const cache = new WeakMap<HTMLElement, ReturnType<typeof create>>()

export const getTraceApi = (root: HTMLElement) =>
  cache.get(root) ?? (cache.set(root, create(root)), cache.get(root)!)

function create(root: HTMLElement) {
  const T0 = 2018
  const readNow = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--now')) || 2026.8
  let now = readNow()                    // cached: no style reads in frame callbacks (refreshed in measure())
  const X = (v: number) => (v - T0) / (now - T0)
  const rows = [...root.querySelectorAll<HTMLElement>('[data-row]')]
  const keyIdx: { [k: string]: number } = Object.fromEntries(rows.map((r, i) => [r.dataset.k!, i]))
  const barOf = (k: string) => rows[keyIdx[k]].querySelector<HTMLElement>('[data-bar]')!
  const startOf = (k: string) => +barOf(k).dataset.s!
  const endOf = (k: string) => (barOf(k).dataset.e === 'now' ? now : +barOf(k).dataset.e!)
  const ind = root.querySelector<HTMLElement>('[data-ind]')!
  const band = root.querySelector<HTMLElement>('[data-band]')!
  const rowsEl = root.querySelector<HTMLElement>('[data-rows]')!
  // Scene A does nothing while either flag is true; setting one tells the watchers (the camera steps aside at once)
  const watchers = new Set<() => void>()
  const flags = { intro: false, preview: false }
  const state = {
    get intro() { return flags.intro },
    set intro(v: boolean) { flags.intro = v; watchers.forEach(f => f()) },
    get preview() { return flags.preview },
    set preview(v: boolean) { flags.preview = v; watchers.forEach(f => f()) },
  }
  const watch = (f: () => void) => { watchers.add(f); return () => { watchers.delete(f) } }
  let rowH = 34
  let rowY0 = 0
  let activeKey: string | undefined
  const pinged = new Set<string>()

  const measure = () => {
    now = readNow()
    rowH = rows[0].offsetHeight
    rowY0 = rowsEl.offsetTop + rows[0].offsetTop
  }
  const light = (k: string | string[] | null) => {
    root.classList.toggle('focus', k != null)
    rows.forEach(r => r.classList.toggle('act', Array.isArray(k) ? k.includes(r.dataset.k!) : r.dataset.k === k))
  }
  const bandTo = (x0: number, x1: number) => {
    band.style.transform = `translateX(${(x0 * 100).toFixed(3)}%) scaleX(${Math.max(0, x1 - x0).toFixed(4)})`
  }
  const setActive = (k: string | string[] | null, region?: [number, number]) => {
    const key = String(k) + (region ? region.join() : '')
    if (key === activeKey) return
    activeKey = key
    light(k)
    if (region) bandTo(region[0], region[1])
    else if (typeof k === 'string') bandTo(X(startOf(k)), X(endOf(k)))
    band.classList.toggle('on', !!region || typeof k === 'string')
  }
  const placeInd = (pos: number | null) => {
    if (pos == null) { ind.style.opacity = '0'; return }
    ind.style.transform = `translateY(${rowY0 + pos * rowH}px)`
    ind.style.opacity = '1'
  }
  const ping = (k: string, once = true) => {
    if (once && pinged.has(k)) return
    pinged.add(k)
    const p = rows[keyIdx[k]].querySelector<HTMLElement>('[data-cap]') ?? rows[keyIdx[k]].querySelector<HTMLElement>('[data-pt]')
    if (!p) return
    if (p.classList.contains('ping')) { p.classList.remove('ping'); void p.offsetWidth }   // restart only a running ping
    p.classList.add('ping')
    p.addEventListener('animationend', () => p.classList.remove('ping'), { once: true })
  }
  return {
    root, rows, keyIdx, X, startOf, endOf, light, setActive, bandTo, placeInd, ping, measure, state, watch,
    now: () => now,
    forget: () => { activeKey = undefined },
  }
}
