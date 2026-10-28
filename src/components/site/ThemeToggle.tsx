'use client'
// Theme toggle (P10 Morph + circle wipe). Lives in the nav on every page. Styles in nav.css (.nav .theme).
//
// Contract (RULES, test tools rely on it): html.dark + localStorage 'theme' = 'light' | 'dark'. The head script in
// layout.tsx applies it before first paint. This button saves the pick, swaps the class inside a View Transition
// whose clip-path circle grows from the button to the far corner (620ms --e-io), and updates meta[theme-color].
// It follows OS changes while no pick is saved. Without View Transitions or under reduced motion: instant swap.
// Hidden without JS (html:not(.js) .nav .theme); the OS media query sets the tokens then.
import { useEffect, useRef, useState } from 'react'

const META = { light: '#F4F4F1', dark: '#0D0F12' }

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? META.dark : META.light)
}

const saved = () => {
  try { return localStorage.getItem('theme') } catch { return null }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
    apply(isDark)
    const os = matchMedia('(prefers-color-scheme: dark)')
    const onOs = (e: MediaQueryListEvent) => {
      if (saved()) return
      apply(e.matches)
      setDark(e.matches)
    }
    os.addEventListener('change', onOs)
    return () => os.removeEventListener('change', onOs)
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark')
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
    setDark(next)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce || !btn.current) return apply(next)
    const r = btn.current.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const vt = document.startViewTransition(() => apply(next))
    vt.ready
      .then(() => document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] },
        { duration: 620, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      ))
      .catch(() => {})
  }

  return (
    <button ref={btn} className="icon-btn theme" type="button" aria-label="Dark theme" aria-pressed={dark} onClick={toggle}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <mask id="moon-cut">
          <rect width="24" height="24" fill="#fff" />
          <circle className="mm" cx="17.5" cy="6.5" r="6" fill="#000" />
        </mask>
        <circle className="core" cx="12" cy="12" r="8" fill="currentColor" mask="url(#moon-cut)" />
        <g className="rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
          <path d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7" />
        </g>
      </svg>
    </button>
  )
}
