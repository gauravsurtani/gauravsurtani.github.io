// P8 Flash: land on evidence. Jump (instant, never smooth), then a soft tint flashes behind the record and focus
// moves to it, so keyboard and screen-reader users land there too.
//
//   land('#r-dlai')          push the hash, jump, flash, focus (for row clicks and buttons)
//   land('#r-dlai', false)   flash + focus only (the browser already jumped, e.g. after a native <a href="#..."> click:
//                            onClick={() => setTimeout(() => land(href, false))})
//
// The flash needs the target to be position: relative (sections, articles and [data-cite] are, in globals.css).
// Reduced motion: no flash (CSS), focus still moves. Without JS the native jump still works.
export function land(hash: string, push = true) {
  const t = document.querySelector<HTMLElement>(hash)
  if (!t) return
  if (push) {
    history.pushState(null, '', hash)
    t.scrollIntoView({ block: 'start' })
  }
  requestAnimationFrame(() => {
    t.classList.remove('flash')
    void t.offsetWidth
    t.classList.add('flash')
    setTimeout(() => t.classList.remove('flash'), 1600)
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1')
    t.focus({ preventScroll: true })
  })
}
