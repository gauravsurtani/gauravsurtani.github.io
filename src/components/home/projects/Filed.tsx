'use client'
// Filed: the home project grid's motion driver ("Filed as exhibits"). Renders the grid div; the tiles are server
// markup from Projects.tsx. The choreography itself is CSS (Projects.module.css), keyed on data-f on each tile:
//   data-f="in"   filed by reaching it: plays once (about 1.7s) and stays
//   data-f="now"  filed without choreography: a deep link (/#section) or a jump landed on it, it was already
//                 above the viewport, or keyboard focus went into it
// A tile is filed when its proof link row (.tile-links) crosses 92% of the viewport, so the whole tile is on screen
// while it plays. One IntersectionObserver whose root reaches far above the viewport, so a jump past the tiles still
// files them (finished). Frame and citation paths are measured on resize (ResizeObserver), never per frame.
// Without html.mo, or with reduced motion, it does nothing and the CSS shows every tile finished.
import { useEffect, useRef, type ReactNode } from 'react'
import { moved } from '@/components/motion/scroll'

export default function Filed({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const g = ref.current
    if (!g || !document.documentElement.classList.contains('mo') || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tiles = [...g.children] as HTMLElement[]

    // Frame: two halves leave the two ends of the rule (F px outside the tile, where the hover tint ends) and close at
    // the bottom. Citation: from the evidence mark, out to the frame, up it, and along the rule to the 28px tick.
    const measure = () => tiles.forEach(t => {
      const svg = t.querySelector(':scope > svg')
      const a = t.querySelector<HTMLElement>('.tile-links .lnk')
      if (!svg || !a) return
      const [fl, fr, ct] = svg.querySelectorAll('path')
      const F = -parseFloat(getComputedStyle(svg).left) || 0
      const W = t.offsetWidth + 2 * F, h = t.offsetHeight - .5, w = W - .5, m = W / 2, R = 12
      fl.setAttribute('d', `M${F} .5H.5V${h - R}A${R} ${R} 0 0 0 ${.5 + R} ${h}H${m}`)
      fr.setAttribute('d', `M${W - F} .5H${w}V${h - R}A${R} ${R} 0 0 1 ${w - R} ${h}H${m}`)
      const l = a.parentElement! // offsets ignore the hidden-state transforms
      const x = l.offsetLeft + a.offsetLeft + 3 + F, y = Math.round(l.offsetTop + a.offsetTop + a.offsetHeight / 2 + 2)
      ct.setAttribute('d', `M${x} ${y}H1.5V1.5H${F + 28}`)
    })
    const ro = new ResizeObserver(measure)
    ro.observe(g)

    const file = (t: Element, now: boolean) => {
      if (t.hasAttribute('data-f')) return
      t.setAttribute('data-f', now ? 'now' : 'in')
      const row = t.querySelector('.tile-links')
      if (row) io.unobserve(row)
    }
    let first = true
    const io = new IntersectionObserver(es => {
      const jump = (first && location.hash.length > 1) || moved() > .6
      first = false
      es.forEach(e => {
        if (e.isIntersecting) file(e.target.closest('article')!, jump || e.boundingClientRect.bottom < 0)
      })
    }, { rootMargin: '100000px 0px -8% 0px' })
    tiles.forEach(t => { const row = t.querySelector('.tile-links'); if (row) io.observe(row) })

    const onFocus = (e: FocusEvent) => {
      const t = (e.target as Element).closest('article')
      if (t) file(t, true)
    }
    g.addEventListener('focusin', onFocus)
    return () => {
      ro.disconnect()
      io.disconnect()
      g.removeEventListener('focusin', onFocus)
    }
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}
