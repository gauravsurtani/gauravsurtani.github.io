'use client'
// Page enter (P3 on a client navigation only). Templates remount on every navigation; the first render after a full
// load is skipped, so a first load never plays it (the home opening and page h1 masks own that moment).
// CSS: html.mo .page-enter { animation: rise ... backwards } in globals.css. A page with a .ph header skips it and
// plays its header beats instead (the same entrance as a full load), so nothing fades twice.
import { useState } from 'react'

let first = true

export default function Template({ children }: { children: React.ReactNode }) {
  const [enter] = useState(() => {
    const e = typeof window !== 'undefined' && !first
    if (typeof window !== 'undefined') first = false
    return e
  })
  return <div className={enter ? 'page-enter' : undefined}>{children}</div>
}
