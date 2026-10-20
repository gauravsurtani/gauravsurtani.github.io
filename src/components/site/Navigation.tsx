'use client'
// Site navigation, in the root layout on every route (never remounts, so the indicator slides between pages too).
// Root element: <header id="nav" class="nav"> (entrance.css drops it in during the home opening). Styles: nav.css.
//
// - Static HTML, visible without JS. Without JS on phones the menu list shows statically under the bar.
// - Scene C / P7 Slide: one amber bar under the active link (translateX + scaleX, 380ms --e-io).
//   Home: the nav-linked section (Experience, Projects, Contact) that contains the reading line (42% of the
//   viewport); at the page bottom Contact wins; otherwise nothing is active. Subpages: by route.
// - nav.scrolled: hairline after 8px of scroll. Brand: on home it fades up once #h-name passes under the nav;
//   on subpages it is always shown.
// - G11: on phones the brand carries a second line, the current section or page name, which rolls on change.
// - One item list (LINKS) for the desktop links and the phone menu; Resume follows it in both (the button on desktop,
//   the last row on phones).
// - Menu (760px and below): clip-path sheet, scrim, inert on main/footer while open, Escape / outside tap /
//   link pick closes it, focus moves in on open and back to the button on Escape, and Tab cycles through the
//   menu button and the rows only. The row for the active link carries aria-current (ink, 500, the amber .rule tick).
// - All scroll work goes through the shared driver (scroll.ts). No layout reads per frame.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { subscribe } from '@/components/motion/scroll'
import ThemeToggle from './ThemeToggle'
import './nav.css'

const LINKS = [
  { label: 'Experience', hash: 'experience' },
  { label: 'Projects', hash: 'projects', page: '/projects' },
  { label: 'Writing', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', hash: 'contact' },
] as const
const RESUME = '/resume.pdf'

// Home sections for the phone label (in page order).
const HOME_SECTIONS = [
  ['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['contact', 'Contact'],
] as const

function routeOf(path: string): { link: number; label: string } {
  if (path.startsWith('/projects')) return { link: 1, label: 'Projects' }
  if (path.startsWith('/blog')) return { link: 2, label: 'Writing' }
  if (path.startsWith('/things-to-build')) return { link: 2, label: 'Things to build' }
  if (path.startsWith('/about')) return { link: 3, label: 'About' }
  return { link: -1, label: 'Page not found' }   // not home (home labels by section): only the 404 gets here
}

type Item = { label: string; hash?: string; href?: string; page?: string }

function NavLink({ item, home, ...rest }: { item: Item; home: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (item.hash && !home && item.page) return <Link href={item.page} {...rest}>{item.label}</Link>
  if (item.hash) {
    return home
      ? <a href={`#${item.hash}`} {...rest}>{item.label}</a>
      : <Link href={`/#${item.hash}`} {...rest}>{item.label}</Link>
  }
  return <Link href={item.href!} {...rest}>{item.label}</Link>
}

export default function Navigation() {
  const path = usePathname() || '/'
  const home = path === '/'
  const nav = useRef<HTMLElement>(null)
  const ind = useRef<HTMLSpanElement>(null)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLElement>(null)
  const [active, setActive] = useState(-1)
  // Phone section label: cur is shown, prev rolls out above it; n counts changes (the first set does not roll).
  const [sec, setSec] = useState({ cur: '', prev: '', n: 0 })
  const prevLabel = useRef<string | null>(null)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Label changes roll (P7), except the very first one.
  const showLabel = useCallback((l: string) => {
    const was = prevLabel.current
    if (was === l) return
    prevLabel.current = l
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    setSec(s => (was === null ? { cur: l, prev: '', n: 0 } : { cur: l, prev: still ? '' : s.cur, n: s.n + 1 }))
  }, [])

  // Scene C + scrolled hairline + phone section label, on the shared scroll driver.
  useEffect(() => {
    const n = nav.current!
    const links = [...n.querySelectorAll<HTMLAnchorElement>('.links a')]
    const wrap = n.querySelector<HTMLElement>('.links-wrap')!
    let rects: { x: number; w: number }[] = []
    let navSecs: { i: number; top: number; bottom: number }[] = []
    let labelSecs: { label: string; top: number }[] = []
    let docH = 0
    let current = -2
    const route = routeOf(path)

    const place = (k: number) => {
      if (k === current) return
      current = k
      setActive(k)
      const el = ind.current
      if (!el) return
      if (k < 0 || !rects[k]) { el.style.opacity = '0'; return }
      // Appearing from hidden: jump into place (fade only); moving between links: slide.
      if (el.style.opacity !== '1') {
        el.classList.add('jump')
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('jump')))
      }
      el.style.transform = `translateX(${rects[k].x + 12}px) scaleX(${Math.max(0, rects[k].w - 24)})`
      el.style.opacity = '1'
    }
    const measure = () => {
      const lw = wrap.getBoundingClientRect()
      rects = links.map(a => { const r = a.getBoundingClientRect(); return { x: r.left - lw.left, w: r.width } })
      const y = scrollY
      docH = document.documentElement.scrollHeight
      navSecs = []
      labelSecs = []
      if (home) {
        LINKS.forEach((l, i) => {
          if (!('hash' in l)) return
          const s = document.getElementById(l.hash)
          if (!s) return
          const r = s.getBoundingClientRect()
          navSecs.push({ i, top: r.top + y, bottom: r.bottom + y })
        })
        HOME_SECTIONS.forEach(([id, l]) => {
          const s = document.getElementById(id)
          if (s) labelSecs.push({ label: l, top: s.getBoundingClientRect().top + y })
        })
      }
      current = -2
    }
    const frame = (y: number, vh: number) => {
      n.classList.toggle('scrolled', y > 8)
      if (!home) { place(route.link); showLabel(route.label); return }
      const R = y + vh * 0.42
      let k = -1
      for (const s of navSecs) if (s.top <= R && R < s.bottom) k = s.i
      if (y + vh >= docH - 4 && navSecs.length) k = navSecs[navSecs.length - 1].i
      place(k)
      let l = ''
      for (const s of labelSecs) if (s.top <= R) l = s.label
      if (y + vh >= docH - 4 && labelSecs.length) l = labelSecs[labelSecs.length - 1].label
      showLabel(l)
    }
    return subscribe(frame, measure)
  }, [path, home, showLabel])

  // Brand: on home it shows once the hero name has passed under the nav.
  useEffect(() => {
    const n = nav.current!
    const name = home ? document.getElementById('h-name') : null
    if (!name) { n.classList.add('brand-on'); return }
    n.classList.remove('brand-on')
    const io = new IntersectionObserver(
      ([e]) => n.classList.toggle('brand-on', !e.isIntersecting && e.boundingClientRect.top < 80),
      { rootMargin: `-${n.offsetHeight}px 0px 0px 0px` },
    )
    io.observe(name)
    return () => io.disconnect()
  }, [home, path])

  // Menu: classes, inert, focus, Escape, outside tap, close on route change and on growing past the phone width.
  const setMenu = useCallback((v: boolean, focusBtn = false) => {
    setOpen(v)
    const d = document.documentElement
    d.classList.toggle('menu-open', v)
    document.getElementById('main')?.toggleAttribute('inert', v)
    document.querySelector('body > footer')?.toggleAttribute('inert', v)
    if (v) requestAnimationFrame(() => sheet.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true }))
    if (!v && focusBtn) menuBtn.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setMenu(false, true)
      if (e.key !== 'Tab') return
      // focus trap: the menu button and the rows; the dimmed page behind is never reached
      const f: HTMLElement[] = [menuBtn.current!, ...sheet.current!.querySelectorAll<HTMLElement>('a')]
      const at = f.indexOf(document.activeElement as HTMLElement)
      const to = at < 0 ? 0 : e.shiftKey && at === 0 ? f.length - 1 : !e.shiftKey && at === f.length - 1 ? 0 : -1
      if (to >= 0) { e.preventDefault(); f[to].focus({ preventScroll: true }) }
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element
      if (!t.closest('.menu') && !t.closest('.menu-btn')) setMenu(false)
    }
    const phone = matchMedia('(max-width: 760px)')
    const onMq = () => { if (!phone.matches) setMenu(false) }
    addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    phone.addEventListener('change', onMq)
    return () => {
      removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      phone.removeEventListener('change', onMq)
    }
  }, [open, setMenu])

  useEffect(() => { setMenu(false) }, [path, setMenu])

  // The active link: on subpages known from the route at render (so the static HTML has it too), on home the section.
  const cur = home ? active : routeOf(path).link

  return (
    <header id="nav" className="nav" ref={nav} data-home={home ? '' : undefined}>
      <div className="nav-in">
        <Link className="brand" href="/">
          <span className="brand-name">Gaurav Surtani</span>
          <span className={`brand-sec${sec.n ? ' roll' : ''}`} aria-hidden="true">
            <span key={`i${sec.n}`} className="brand-sec-in">{sec.cur}</span>
            {sec.n > 0 && sec.prev && (
              <span key={`o${sec.n}`} className="brand-sec-out" onAnimationEnd={() => setSec(s => ({ ...s, prev: '' }))}>{sec.prev}</span>
            )}
          </span>
        </Link>
        <nav className="links-wrap" aria-label="Main">
          <ul className="links">
            {LINKS.map((l, i) => (
              <li key={l.label}>
                <NavLink item={l} home={home} aria-current={i === cur ? (home ? 'true' : 'page') : undefined} />
              </li>
            ))}
          </ul>
          <span className="nav-ind" ref={ind} aria-hidden="true" />
        </nav>
        <div className="tools">
          <ThemeToggle />
          <a className="btn btn-sm resume" href={RESUME}>Resume</a>
          <button
            ref={menuBtn}
            className="icon-btn menu-btn"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setMenu(!open)}
          >
            <span /><span />
          </button>
        </div>
      </div>
      <nav className="menu" id="menu" aria-label="Menu" ref={sheet} inert={mounted && !open ? true : undefined}>
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.label}>
              <NavLink
                item={l}
                home={home}
                aria-current={i === cur ? (home ? 'true' : 'page') : undefined}
                style={{ '--i': i } as CSSProperties}
                onClick={() => setMenu(false)}
              />
            </li>
          ))}
          <li><a href={RESUME} style={{ '--i': LINKS.length } as CSSProperties} onClick={() => setMenu(false)}>Resume (PDF)</a></li>
        </ul>
      </nav>
      <div className="scrim" aria-hidden="true" onClick={() => setMenu(false)} />
    </header>
  )
}
