'use client'
// Filed: the home project grid's motion driver ("Filed as exhibits"). Renders the grid div; the tiles are server
// markup from Projects.tsx. The choreography itself is CSS (Projects.module.css), keyed on data-f on each tile:
//   data-f="in"   filed by reaching it: plays once (about 1.5s) and stays
//   data-f="now"  filed without choreography: a deep link (/#section) or a jump landed on it, it was already
//                 above the viewport, keyboard focus went into it, or motion is off (no html.mo, or reduced motion
//                 at load or switched on later)
// A tile is filed when its proof link row (.tile-links) crosses 92% of the viewport, so the whole tile is on screen
// while it plays. One IntersectionObserver whose root reaches far above the viewport, so a jump past the tiles still
// files them (finished). Its margins are pixels from innerHeight (a % margin resolves against the viewport width), so
// it is rebuilt when the viewport height changes.
import { useEffect, useRef, type ReactNode } from 'react'
import { moved } from '@/components/motion/scroll'

export default function Filed({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const g = ref.current
    if (!g) return
    const tiles = [...g.children]
    const rm = matchMedia('(prefers-reduced-motion: reduce)')
    const row = (t: Element) => t.querySelector('.tile-links')
    let io: IntersectionObserver | undefined
    const file = (t: Element, now: boolean) => {
      if (t.hasAttribute('data-f')) return
      t.setAttribute('data-f', now ? 'now' : 'in')
      const r = row(t)
      if (r) io?.unobserve(r)
    }
    const all = () => tiles.forEach(t => file(t, true))
    if (!document.documentElement.classList.contains('mo') || rm.matches) { all(); return }

    let first = true
    let vh = 0
    const observe = () => {
      if (innerHeight === vh) return
      vh = innerHeight
      io?.disconnect()
      io = new IntersectionObserver(es => {
        const jump = (first && location.hash.length > 1) || moved() > .6
        first = false
        es.forEach(e => {
          if (e.isIntersecting) file(e.target.closest('article')!, jump || e.boundingClientRect.bottom < 0)
        })
      }, { rootMargin: `100000px 0px ${-Math.round(vh * .08)}px 0px` })
      tiles.forEach(t => { const r = row(t); if (r && !t.hasAttribute('data-f')) io!.observe(r) })
    }
    observe()

    const onFocus = (e: FocusEvent) => {
      const t = (e.target as Element).closest('article')
      if (t) file(t, true)
    }
    const off = () => {
      io?.disconnect()
      removeEventListener('resize', observe)
      rm.removeEventListener('change', onRm)
      g.removeEventListener('focusin', onFocus)
    }
    // reduced motion switched on: every tile finished, for good (switching it off again never hides a tile)
    const onRm = () => { if (rm.matches) { all(); off() } }
    addEventListener('resize', observe)
    rm.addEventListener('change', onRm)
    g.addEventListener('focusin', onFocus)
    return off
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}
