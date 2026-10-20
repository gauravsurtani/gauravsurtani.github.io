// /projects (server): PageHeader and the client browser (filters, live count, ProjectCard grid, end CTA).
// Data is ALL_REPOSITORIES from constants.ts, deduped by id. No runtime API calls.
import type { Metadata } from 'next'
import PageHeader from '@/components/site/PageHeader'
import { resume } from '@/content/resume'
import { ALL_REPOSITORIES } from '@/lib/constants'
import ProjectsBrowser from './ProjectsBrowser'
import s from './projects.module.css'

export const metadata: Metadata = { title: 'Projects' }

const REPOS = ALL_REPOSITORIES.filter((r, i, a) => a.findIndex(x => x.id === r.id) === i)

export default function ProjectsPage() {
  return (
    <div className={`wrap ${s.page}`}>
      <PageHeader eyebrow="Projects" title="Projects" dek={`${REPOS.length} projects`} />
      <ProjectsBrowser repos={REPOS} github={resume.github} />
    </div>
  )
}
