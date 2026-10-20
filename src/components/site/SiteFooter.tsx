// Static site footer, in the root layout on every route. No motion, no repeated contact links.
// The visit-counting line shows only when the tracker is built in (NEXT_PUBLIC_TRACKER_URL, see Tracker.tsx).
// Styles: .site-foot in globals.css.
import { resume } from '@/content/resume'

export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap foot">
        <span>{resume.name} · {resume.location}</span>
        {process.env.NEXT_PUBLIC_TRACKER_URL ? <span>This site counts visits (page, referrer, approximate location). No cookies.</span> : null}
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
