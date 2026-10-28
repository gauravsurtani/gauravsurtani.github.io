'use client'
// Copy-email button (P10 Morph: "Copy" slides up, a check + "Copied" slides in, 320ms --e-io) with a polite live
// region. Fallback when the clipboard API is refused: select the address text ([data-email] next to the button,
// else the first on the page) and tell the user to press Ctrl+C / Cmd+C.
//
//   <a href="mailto:..." data-email>gaurav.surtani.tech@gmail.com</a> <CopyEmail />
//
// Hidden without JS (html:not(.js) .copy). Styles: .copy in globals.css.
import { useEffect, useRef, useState } from 'react'
import { resume } from '@/content/resume'

export default function CopyEmail({ email = resume.email }: { email?: string }) {
  const [s, setS] = useState('')
  const [msg, setMsg] = useState('')
  const btn = useRef<HTMLButtonElement>(null)
  const t = useRef(0)

  useEffect(() => () => clearTimeout(t.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setS('ok')
      setMsg('Email copied')
    } catch {
      const el = btn.current?.parentElement?.querySelector('[data-email]') ?? document.querySelector('[data-email]')
      const sel = getSelection()
      if (el && sel) {
        const r = document.createRange()
        r.selectNodeContents(el)
        sel.removeAllRanges()
        sel.addRange(r)
      }
      setMsg('Press Ctrl+C or Cmd+C to copy')
    }
    clearTimeout(t.current)
    t.current = window.setTimeout(() => { setS(''); setMsg('') }, 2400)
  }

  return (
    <>
      <button ref={btn} className="copy" type="button" aria-label="Copy email" data-s={s || undefined} onClick={copy}>
        <span className="c-idle">Copy</span>
        <span className="c-done" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
      </button>
      <span className="sr" role="status">{msg}</span>
    </>
  )
}
