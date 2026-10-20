// /projects/[slug] (server). PageHeader (eyebrow link back to /projects), then four records (Overview, Problem,
// Solution, Features: each a reveal block with a rule, a mask h2 and rising text) and a side column of facts
// (Category, Technologies, Fork, Source on GitHub), sticky at 1024px and up. h1, title and Category come from constants.ts.
// Copy is the existing page copy cut by deletion only (AI-tone words, unsupported claims, restated sentences); never reworded.
// The record classes (.rec, .rule, .h, .text, .list) are shared with the /things-to-build spec pages.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import PageHeader from '@/components/site/PageHeader'
import { Ext } from '@/components/ui/ProjectCard'
import { ALL_REPOSITORIES } from '@/lib/constants'
import s from './detail.module.css'

type Props = { params: Promise<{ slug: string }> }

type Project = {
  subtitle: string
  fullDescription: string
  problemStatement?: string
  solution?: string
  tech: string[]
  github: string
  features: string[]
}

// keep the keys in step with DETAILS in ../ProjectsBrowser.tsx. Name, category and the Fork flag come from constants.ts.
// Problem and Solution are optional: a record with no text is not rendered.
const projectsData: Record<string, Project> = {
  'email-link': {
    subtitle: 'Email Management',
    fullDescription: 'Email-Link combines Natural Language Processing, Knowledge Graph construction, and Agentic AI systems to create an email management platform. Users can query their emails using natural language.',
    problemStatement: 'Traditional email search is limited to keyword matching, making it difficult to find emails based on context, relationships, or complex queries.',
    tech: ['Python', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'Machine Learning', 'Natural Language Processing', 'Semantic Search'],
    github: 'https://github.com/gauravsurtani/Email-Link',
    features: [
      'Natural Language Query Processing',
      'Knowledge Graph Construction',
      'Agentic AI Integration',
      'Semantic Email Search',
      'Context-Aware Results',
      'Email Relationship Mapping',
      'Content Analysis',
    ],
  },
  'wat-to-eat': {
    subtitle: 'Food Recommendation Engine',
    fullDescription: 'wat-to-eat is a data engineering pipeline that processes Food.com data to build a recommendation system. The project uses machine learning algorithms to analyze food tags, ingredients, nutritional information, and user preferences to suggest personalized meal recommendations.',
    tech: ['Python', 'Data Engineering', 'Machine Learning', 'Jupyter Notebook', 'Pandas', 'Data Analysis', 'Recommendation Systems'],
    github: 'https://github.com/gauravsurtani/wat-to-eat',
    features: [
      'Food.com Data Analysis',
      'Tag-based Recommendation',
      'Machine Learning Models',
      'User Preference Learning',
      'Nutritional Analysis',
    ],
  },
  'company-stats': {
    subtitle: 'Job Market Analytics',
    fullDescription: 'company-stats is a data science project that combines multiple job market datasets to provide insights into hiring trends, salary patterns, and industry movements. The project focuses particularly on H1B visa data and tech industry hiring patterns to understand market dynamics.',
    solution: 'By synthesizing data from multiple sources including Simplify and H1B grader databases, the project provides analytics and visualizations that reveal patterns and trends in the job market.',
    tech: ['Python', 'Data Science', 'Jupyter Notebook', 'Data Visualization', 'Statistics', 'Pandas', 'Market Analysis'],
    github: 'https://github.com/gauravsurtani/company-stats',
    features: [
      'Multi-source Data Integration',
      'H1B Visa Trend Analysis',
      'Salary Pattern Recognition',
      'Interactive Visualizations',
      'Geographic Analysis',
    ],
  },
  'fire-prediction': {
    subtitle: 'Environmental ML Model',
    fullDescription: 'fire-prediction is an environmental science application using machine learning to predict forest fire risk based on meteorological data. The project includes data preprocessing, feature engineering, and model evaluation.',
    tech: ['Python', 'Machine Learning', 'Data Visualization', 'Environmental Science', 'Jupyter Notebook', 'Scikit-learn', 'Meteorological Analysis'],
    github: 'https://github.com/gauravsurtani/fire-prediction',
    features: [
      'Weather Data Analysis',
      'Fire Risk Prediction',
      'Feature Engineering',
      'Model Evaluation',
      'Risk Visualization',
      'Predictive Analytics',
    ],
  },
  'youtube-history-extension': {
    subtitle: 'Chrome Browser Extension',
    fullDescription: 'The extension uses web scraping and browser automation techniques to provide users with better control over their viewing data and history management.',
    problemStatement: 'YouTube\'s official API has limitations that prevent users from fully accessing their viewing history and data.',
    tech: ['JavaScript', 'Chrome Extension API', 'Web Development', 'DOM Manipulation', 'Browser APIs', 'Web Scraping', 'User Interface Design'],
    github: 'https://github.com/gauravsurtani/youtube-history-extension',
    features: [
      'YouTube History Access',
      'Chrome Extension Integration',
      'API Workaround Solutions',
      'User Data Control',
      'History Export Features',
    ],
  },
}

// the page data plus the constants.ts repo (name, category, Fork flag); undefined for an unknown slug
const load = (slug: string) => {
  const p = projectsData[slug]
  const repo = ALL_REPOSITORIES.find(r => r.id === slug)
  return p && repo ? { ...p, name: repo.name, category: repo.category, forked: repo.forked } : undefined
}

export function generateStaticParams() {
  return Object.keys(projectsData).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = load(slug)
  return p ? { title: p.name } : {}
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params
  const p = load(slug)
  if (!p) notFound()

  const record = (h: string, i: number, body: ReactNode) => (
    <section key={h} className={s.rec} aria-labelledby={`d-h${i}`} {...rv()}>
      <div className={`rule ${s.rule}`} />
      <MaskHeading as="h2" id={`d-h${i}`} className={`h3 ${s.h}`}>{h}</MaskHeading>
      {body}
    </section>
  )

  return (
    <div className={`wrap ${s.page}`}>
      <PageHeader eyebrow="Projects" eyebrowHref="/projects" title={p.name} dek={p.subtitle} />
      <div className={s.grid}>
        <div className={s.body}>
          {([['Overview', p.fullDescription], ['Problem', p.problemStatement], ['Solution', p.solution]] as const).map(([h, t], i) =>
            t && record(h, i, <p className={s.text} {...ri(0)}>{t}</p>),
          )}
          {record('Features', 3, (
            <ul className={s.list}>
              {p.features.map((f, i) => <li key={f} {...ri(i)}>{f}</li>)}
            </ul>
          ))}
        </div>
        <aside className={s.side} aria-label="Project facts" {...rv()}>
          <div className="rule" />
          <dl className={s.facts}>
            <div {...ri(0)}>
              <dt className="meta">Category</dt>
              <dd className={s.dd}>{p.category}</dd>
            </div>
            <div {...ri(1)}>
              <dt className="meta">Technologies</dt>
              <dd className={s.dd}><ul className="tags">{p.tech.map(t => <li key={t} className="tag">{t}</li>)}</ul></dd>
            </div>
          </dl>
          <div className={s.cta} {...ri(2)}>
            <a className="btn btn-ink" href={p.github} target="_blank" rel="noopener noreferrer">Source on GitHub<Ext /></a>
            {p.forked && <span className="tag">Fork</span>}
          </div>
        </aside>
      </div>
    </div>
  )
}
