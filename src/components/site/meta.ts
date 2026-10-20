// Per-route metadata: the title (through the root layout's '%s · Gaurav Surtani' template), description, canonical URL,
// and the Open Graph and Twitter cards, so a shared link previews as its own page and not as home.
// Next replaces a parent's openGraph and twitter objects instead of merging them, so the shared card fields (site name,
// locale, image) are repeated here. Keep them in step with layout.tsx. No path (the 404): no canonical and no og:url.
import type { Metadata } from 'next'

const SITE = 'Gaurav Surtani'
const IMG = { url: '/icon/android-chrome-512x512.png', width: 512, height: 512, alt: SITE }

export function pageMeta(title: string, description: string, path?: string): Metadata {
  const full = `${title} · ${SITE}`
  return {
    title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: { ...(path && { url: path }), siteName: SITE, type: 'website', locale: 'en_US', title: full, description, images: [IMG] },
    twitter: { card: 'summary', title: full, description, images: [IMG.url] },
  }
}
