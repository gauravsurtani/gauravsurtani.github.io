'use client'
// MotionRoot: mounted once in the root layout. Renders nothing. Owns every reach reveal (P3/P4/P5) on every route.
//
// - window.__mr = 1 tells the head-script failsafe (5s) that motion JS is alive.
// - Reveal observer: a [data-rv] block whose top crosses 85% of the viewport gets data-in (once; never removed),
//   plus data-fast on a fast scroll, End or a jump (no stagger, 200ms), or --hold on the first view under a page
//   header (see the observer).
// - "Above" observer: a block anywhere above the viewport (a jump, a deep link, a restored scroll passed it) gets
//   data-in at once with data-now (transitions off for 2 frames). A jump never lands among hidden content.
// - MutationObserver: blocks added later (client navigation, filter results), or a reused node that gains data-rv,
//   are picked up automatically. Nothing else needs to call anything: render data-rv/data-ri markup (see reveal.ts).
// - focusin: keyboard focus inside a block that is still hidden (below the 85% line) reveals it at once.
// - Without html.mo (reduced motion, or the failsafe fired): every block gets data-in at once.
// - hashchange: focus moves to the target (sections carry tabIndex={-1}).
import { useEffect } from 'react'
import { moved } from './scroll'

declare global {
  interface Window { __mr?: number }
}

export default function MotionRoot() {
  useEffect(() => {
    const d = document.documentElement
    window.__mr = 1
    const reveal = (el: Element, instant: boolean) => {
      if (el.hasAttribute('data-in')) return
      if (instant) el.setAttribute('data-now', '')
      el.setAttribute('data-in', '')
      rio.unobserve(el)
      above.unobserve(el)
      if (instant) requestAnimationFrame(() => requestAnimationFrame(() => el.removeAttribute('data-now')))
    }
    // Fast reach: a block that scrolled in (not one already in view when observed) gets data-fast (no stagger, 200ms)
    // when its top is already above 60% of the viewport (a jump) or the page moved more than 15% of the viewport in the
    // last 300ms (a fast scroll, End, Page Down: these scrolls are animated, so their last rows still reach the 85% line
    // slowly). The entry's own rect and the scroll driver's trail: no layout reads. A reading pace and the first view
    // keep the full stagger. (No "3+ blocks per callback" rule: a heading and a card row close together cross the
    // line in one frame even at a reading pace.)
    // First view under a page header (.ph): the records wait (--hold) for the header's third beat, 220ms after the
    // header appeared (its eyebrow fade's currentTime), so the body never rises before the dek above it.
    const seen = new WeakSet<Element>()
    const rio = new IntersectionObserver(es => {
      const vh = innerHeight
      let hold = -1
      es.forEach(e => {
        const first = !seen.has(e.target)
        seen.add(e.target)
        if (!e.isIntersecting) return
        if (first) {
          if (hold < 0) {
            const a = document.querySelector('.ph > .ph-eyebrow')?.getAnimations()[0]
            hold = a ? Math.max(0, Math.round(220 - Number(a.currentTime))) : 0
          }
          if (hold) (e.target as HTMLElement).style.setProperty('--hold', `${hold}ms`)
        } else if (e.boundingClientRect.top < vh * 0.6 || moved() > 0.15) e.target.setAttribute('data-fast', '')
        reveal(e.target, false)
      })
    }, { rootMargin: '0px 0px -15% 0px' })
    const above = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && reveal(e.target, true)),
      { rootMargin: '100000px 0px -100% 0px' },
    )
    const watch = (el: Element) => {
      if (d.classList.contains('mo')) {
        rio.observe(el)
        above.observe(el)
      } else el.setAttribute('data-in', '')
    }
    const scan = (root: Element | Document) => {
      if (root instanceof Element && root.matches('[data-rv]:not([data-in])')) watch(root)
      root.querySelectorAll('[data-rv]:not([data-in])').forEach(watch)
    }
    scan(document)
    const mo = new MutationObserver(ms => ms.forEach(m => {
      if (m.type === 'attributes') { if (m.target instanceof Element) scan(m.target) }
      else m.addedNodes.forEach(n => n instanceof Element && scan(n))
    }))
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-rv'] })
    const onFocus = (e: FocusEvent) => {
      const b = (e.target as Element).closest?.('[data-rv]:not([data-in])')
      if (b) reveal(b, true)
    }
    addEventListener('focusin', onFocus)
    const focusHash = () => {
      const id = decodeURIComponent(location.hash.slice(1))
      const t = id && document.getElementById(id)
      if (!t) return
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1')
      t.focus({ preventScroll: true })
    }
    addEventListener('hashchange', focusHash)
    return () => {
      rio.disconnect()
      above.disconnect()
      mo.disconnect()
      removeEventListener('focusin', onFocus)
      removeEventListener('hashchange', focusHash)
    }
  }, [])
  return null
}
