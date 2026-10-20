// Static site footer, in the root layout on every route. No motion, no repeated contact links.
// Styles: .site-foot in globals.css.
import { resume } from '@/content/resume'

export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap foot">
        <span>{resume.name} · {resume.location}</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
