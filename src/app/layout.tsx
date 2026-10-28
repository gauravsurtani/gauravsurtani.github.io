// Root layout: fonts, metadata, the pre-paint head script, the shared shell (skip link, nav, main, footer),
// MotionRoot and Tracker (off unless NEXT_PUBLIC_TRACKER_URL is set at build time). Pages never render their own
// <main>; they render sections inside this one.
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import type { CSSProperties } from 'react'
import MotionRoot from '@/components/motion/MotionRoot'
import Navigation from '@/components/site/Navigation'
import SiteFooter from '@/components/site/SiteFooter'
import Tracker from '@/components/site/Tracker'
import './globals.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
// Newsreader is 131KB (variable): display 'optional' so a late arrival never swaps in and re-wraps the serif text (CLS).
// A slow first visit keeps the metric-matched fallback for that document; the cached font is used on the next full load.
const serif = Newsreader({ subsets: ['latin'], axes: ['opsz'], style: ['normal'], variable: '--font-newsreader', display: 'optional' })
// real italic for post emphasis (.prose em, blockquote). Not preloaded: only blog posts use it.
const serifItalic = Newsreader({ subsets: ['latin'], axes: ['opsz'], style: ['italic'], variable: '--font-newsreader-italic', display: 'optional', preload: false })

const TITLE = 'Gaurav Surtani · AI Engineer, Product Builder'
const DESCRIPTION = 'AI engineer with eight years in full-stack, data and ML engineering, building LLM applications.'

export const metadata: Metadata = {
  metadataBase: new URL('https://gauravsurtani.github.io'),
  title: { default: TITLE, template: '%s · Gaurav Surtani' },
  description: DESCRIPTION,
  icons: {
    // ?v=2: the GS monogram replaced a photo icon; a new URL makes browsers drop their cached copy
    icon: [
      { url: '/icon/favicon.ico?v=2' },
      { url: '/icon/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/icon/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icon/apple-touch-icon.png?v=2', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    url: '/', siteName: 'Gaurav Surtani', type: 'website', locale: 'en_US', title: TITLE, description: DESCRIPTION,
    images: [{ url: '/icon/android-chrome-512x512.png', width: 512, height: 512, alt: 'Gaurav Surtani' }],
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION, images: ['/icon/android-chrome-512x512.png'] },
}

export const viewport: Viewport = { themeColor: '#F4F4F1' }

// Build-time "now" (decimal year): the no-JS fallback for the timeline's right edge. The head script overwrites it.
const BUILD_NOW = (() => {
  const n = new Date()
  return +(n.getFullYear() + (n.getMonth() + (n.getDate() - 1) / 31) / 12).toFixed(3)
})()

// Runs before first paint. ES5 only. Sets: dark (saved pick, else the OS), theme-color, --now, js, mo (motion ok),
// intro + brief + gi for the first fresh top-of-page load of "/" in a browser session (sessionStorage "gi"; not a
// reload or back/forward load that the browser will scroll-restore below 40px: pagehide saves scrollY per path for
// that check), and a 5s failsafe that shows everything if MotionRoot never mounts. gi plays the full-screen intro
// (public/intro/intro.js + intro.css): the hero draws brief under it, and the intro's reveal hands off to the card's
// sweep (Entrance.tsx). Later loads of "/" in the session get none of these: the hero is drawn at first paint.
// State classes on <html> are reserved: js mo intro brief keepnav skip dark scrolling menu-open strip-on gi gi-up
// gi-sh. No component class may reuse them.
const HEAD = `(function () {
  var d = document.documentElement, t = null;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  var dark = t === 'dark' || (t !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  d.classList.toggle('dark', dark);
  var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', dark ? '#0D0F12' : '#F4F4F1');
  var n = new Date(); d.style.setProperty('--now', (n.getFullYear() + (n.getMonth() + (n.getDate() - 1) / 31) / 12).toFixed(3));
  d.classList.add('js');
  addEventListener('pagehide', function () { try { sessionStorage.setItem('sy:' + location.pathname, String(scrollY)); } catch (e) {} });
  var back = false;
  try {
    var nt = performance.getEntriesByType('navigation')[0];
    back = !!nt && (nt.type === 'reload' || nt.type === 'back_forward') && +sessionStorage.getItem('sy:/') > 40;
  } catch (e) {}
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.classList.add('mo');
    var seen = false;
    if (location.pathname === '/' && !location.hash && scrollY < 40 && !back) {
      try { seen = !!sessionStorage.getItem('gi'); sessionStorage.setItem('gi', '1'); } catch (e) {}
      if (!seen) {
        d.classList.add('intro');
        d.classList.add('brief');
        d.classList.add('gi');
      }
    }
  }
  setTimeout(function () { if (!window.__mr) { d.classList.remove('mo'); d.classList.remove('intro'); d.classList.remove('brief'); } }, 5000);
})();`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable} ${serifItalic.variable}`}
      style={{ '--now': BUILD_NOW } as CSSProperties}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- the intro ships as two plain files in public/intro */}
        <link rel="stylesheet" href="/intro/intro.css" />
        <script dangerouslySetInnerHTML={{ __html: HEAD }} />
      </head>
      <body>
        <a className="skiplink" href="#main">Skip to content</a>
        <Navigation />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <MotionRoot />
        <Tracker />
        <script src="/intro/intro.js" defer />
      </body>
    </html>
  )
}
