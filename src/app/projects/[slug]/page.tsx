// /projects/[slug] (server). PageHeader (eyebrow link back to /projects), then records (each a reveal block with a
// rule, a mask h2 and rising text or list items) and a side column of facts (Category, Technologies, links), sticky
// at 1024px and up. Name, category, GitHub URL and the fork flag come from constants.ts; a fork's dek starts with
// "Team project (fork)."
// Every claim below comes from the repo's own README (gh api repos/gauravsurtani/<repo>/readme), its code, or
// resume.md. "My part" on a fork lists only what Gaurav's own commits in that repo show. Never add a claim the
// README does not make, and never a deployment-status word.
// The record classes (.rec, .rule, .h, .text, .list) are shared with the /things-to-build spec pages.
import { pageMeta } from '@/components/site/meta'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import PageHeader from '@/components/site/PageHeader'
import { Ext } from '@/components/ui/ProjectCard'
import { ALL_REPOSITORIES } from '@/lib/constants'
import s from './detail.module.css'

type Props = { params: Promise<{ slug: string }> }

type Item = string | [lead: string, rest: string]   // [lead, rest] renders "<strong>lead</strong> rest"
type Rec = [heading: string, body: string | Item[]]  // a string is a paragraph, an array a list
type Project = {
  title?: string                          // overrides the constants.ts name
  dek: string
  records: Rec[]
  tech: string[]
  links?: { label: string; href: string }[]   // after "Source on GitHub"; an href starting with / is internal
}

// ProjectsBrowser.tsx (DETAILS) links to these slugs from /projects.
const projectsData: Record<string, Project> = {
  'dlai-mcp-server': {
    dek: 'Search DeepLearning.AI courses from Claude Code, Codex and Cursor.',
    records: [
      ['Overview', 'An MCP server, published on npm, that makes the DeepLearning.AI course catalog searchable from AI coding tools. Ask about its 121 courses across 38 topics in plain language, from your editor.'],
      ['How it works', [
        'Claude picks the right tool for the question and formats the answer.',
        'The server queries the same Algolia search index that powers deeplearning.ai/courses.',
        'Lesson-level data is fetched on demand when you ask about one course.',
        'Course data is cached for 24 hours.',
        'It runs locally with npx (Node.js 18 or later), or as a remote server over Streamable HTTP.',
      ]],
      ['Tools', [
        ['search_courses:', 'search by query, with optional topic, level, partner and type filters.'],
        ['get_course_details:', 'full metadata, the lesson list with titles and durations, prerequisites, learning outcomes and the number of code examples.'],
        ['list_topics:', 'all 38 topics with course counts and three example courses each.'],
      ]],
    ],
    tech: ['TypeScript', 'MCP SDK', 'Algolia', 'Cheerio', 'Zod', 'Vitest', 'npm'],
    links: [{ label: 'npm', href: 'https://www.npmjs.com/package/dlai-mcp-server' }],
  },
  'tech-blog-catchup': {
    title: 'Blog2Podcast',
    dek: 'Engineering blogs from 15 companies, turned into daily AI-narrated podcasts.',
    records: [
      ['Overview', 'A side project I founded and run at blog2podcast.com. Its pipeline turns engineering blogs from 15 companies into daily AI-narrated podcasts. The public listening library needs no account, and each episode links to its original source.'],
      ['Studio', 'The repository also holds a private studio for approved creators. A member submits text they have permission to process. Ollama Cloud writes a source-grounded summary and a two-speaker script, and Kokoro renders stock voices on CPU and records the exact timing of each turn. The member previews a private draft, and an administrator reviews and publishes it.'],
      ['Features', [
        'Next.js and React frontend with a persistent audio player and a reduced-motion stepper.',
        'FastAPI backend on SQLite and SQLAlchemy, with versioned migrations and a durable, bounded generation queue.',
        'Google and GitHub sign-in. New accounts stay pending until an operator approves them.',
        ['Checks:', 'pytest, a quality corpus of 20 synthetic regression cases, and Playwright tests.'],
      ]],
    ],
    tech: ['Next.js', 'React', 'FastAPI', 'SQLite', 'SQLAlchemy', 'Ollama Cloud', 'Kokoro', 'Playwright'],
    links: [{ label: 'blog2podcast.com', href: 'https://blog2podcast.com' }],
  },
  'pair-programmer-cli': {
    dek: 'Share one Claude Code session with a teammate through Telegram.',
    records: [
      ['Overview', 'Multiplayer middleware for AI coding agents. Two developers share one Claude Code session through a Telegram bot: both can talk to the agent, claim GitHub issues and hand the driver role back and forth.'],
      ['How it works', [
        ['Pair mode:', '/pair starts a shared session and /join adds a teammate. /pick claims a GitHub issue, /done commits and closes it, /handoff passes the driver role, and /endpair pushes and opens a pull request.'],
        ['Split mode:', '/claim starts an isolated solo session. /park and /resume pause and continue it, /sync rebases on main, and /merge pushes and opens a pull request.'],
      ]],
      ['Features', [
        ['File ownership tracking:', 'the bot knows who is editing what and warns about conflicts.'],
        'A diff summary after every AI change, so both developers see which files changed.',
        ['Context handoff:', 'the AI writes a full summary when drivers swap.'],
        'Auto-commit with a proper commit message when an issue is done.',
        'Pair sessions survive bot restarts.',
        'A 120-second timeout stops hung sessions, and each session has a cost budget.',
      ]],
    ],
    tech: ['Python', 'aiogram 3', 'aiosqlite', 'Pydantic 2', 'Claude Code CLI', 'GitHub CLI', 'Telegram'],
  },
  'email-link': {
    dek: 'A Gmail export, turned into a Neo4j graph of people, emails and events.',
    records: [
      ['Overview', 'Email-Link parses a Gmail Takeout export (MBOX files) and loads it into a Neo4j graph database, so you can query who you write to, how often and how fast they reply. It also pulls events such as meetings and interviews out of the emails and adds them to the graph.'],
      ['How it works', [
        ['Parse:', 'reads the MBOX file and extracts each email’s metadata.'],
        ['Graph:', 'loads people and emails into Neo4j.'],
        ['Events:', 'extracts meetings, interviews and other calendar items and links them into the graph.'],
        ['Embeddings:', 'trains TransE knowledge graph embeddings on the graph, to find similar events and recommend them.'],
        ['Semantic data:', 'an optional step where an OpenAI model extracts entities and actions from each email and classifies it.'],
        ['Agent:', 'an AI agent interface for exploring the email graph in natural language.'],
      ]],
      ['Features', [
        'Metrics for communication frequency, response times and network centrality.',
        'Cypher queries for top correspondents, email activity over time and communication clusters.',
        'Event search by keyword, person, date range and location, plus event statistics.',
        'Similar events and event recommendations from the embeddings.',
      ]],
    ],
    tech: ['Python', 'Neo4j', 'Cypher', 'PyTorch', 'TransE', 'spaCy', 'OpenAI API'],
    links: [{ label: 'Write-up', href: '/blog/email-link-knowledge-graphs' }],
  },
  'wat-to-eat': {
    dek: 'Recipe recommendations from Food.com tags, in a Streamlit app.',
    records: [
      ['Overview', 'A Streamlit app that recommends recipes from the Food.com recipe dataset. Pick a recipe and a tag group, and it returns the recipes whose tags in that group are most similar.'],
      ['How it works', [
        'Splits each recipe’s tags into groups such as time, cuisine, dietary, ingredients, taste and mood, occasion and technique.',
        'Vectorizes each tag group with scikit-learn’s CountVectorizer.',
        'Ranks recipes by cosine similarity to the selected recipe within the chosen group.',
        'Caches the data and loads the first 10,000 rows, to keep the app fast.',
      ]],
      ['Features', [
        'Recommendations by tag group, for example cuisine or dietary tags.',
        'A daily diet plan (breakfast, lunch, snacks, dinner and desserts) from your preferred ingredients and a dietary goal such as weight gain or muscle building.',
      ]],
    ],
    tech: ['Python', 'Streamlit', 'Pandas', 'scikit-learn'],
  },
  'company-stats': {
    dek: 'Simplify company data joined with H1B wage data.',
    records: [
      ['Overview', 'Merges two job-market sources into company-wise job statistics. Simplify gives company data (funding, founding details, number of jobs, growth) and job descriptions. USCIS and H1B Grader give company-wise job wages and H1B visa information.'],
      ['My part', 'My commits added the H1B Grader scraper notebook and the company-wise wage files it collected, cleaned the Simplify job data into one format for the final datasets, and wrote the README.'],
      ['What it answers', [
        'Job roles and descriptions, from Simplify.',
        'The number of hires for the same role last year.',
        'The confidence level of getting an H1B visa for the role.',
        'Salary information for the role.',
      ]],
    ],
    tech: ['Python', 'Jupyter Notebook', 'Pandas', 'Requests'],
    links: [{ label: 'Team repository', href: 'https://github.com/Rajat123456789/Synthesizing-Job-Market-Data-for-Unified-Insights' }],
  },
  'fire-prediction': {
    dek: 'Predicting Bay Area wildfires from NASA fire data and weather data.',
    records: [
      ['Overview', 'A model that predicts wildfire occurrence in the Bay Area. It joins NASA FIRMS fire records, which have confidence scores and timestamps, with historical weather from the Open-Meteo API. The first version is a binary classifier on 5 to 6 weather parameters over one county. A second approach uses regression to predict fire severity.'],
      ['My part', 'My commits built the train, test and validation data for the first version, compared five classifiers and wrote the first version of the README, and added an SVM model with PCA on the weather data.'],
      ['Findings', [
        'Logistic regression and an SGD classifier did not recognize fire cases well.',
        'Random forest was more accurate but still missed fire cases.',
        'AdaBoost had a much higher recall and a higher F1 score, which matters on this imbalanced dataset.',
        'XGBoost had better F1 and recall than AdaBoost.',
        'The team also trained TabNet, an attention-based network for tabular data.',
        'The San Jose fire dataset (2018 to 2023) was dropped: it covers vegetation fires, not forest fires.',
      ]],
    ],
    tech: ['Python', 'Jupyter Notebook', 'scikit-learn', 'XGBoost', 'TabNet', 'NASA FIRMS', 'Open-Meteo API'],
    links: [{ label: 'Team repository', href: 'https://github.com/rishabh-kr-jain/cmpe257_project' }],
  },
  'youtube-history-extension': {
    dek: 'A Chrome extension that logs your YouTube watch history.',
    records: [
      ['Overview', 'A Chrome extension that reads your YouTube history page and keeps a list of the videos you watched, without the YouTube API. It can also send that history to a local API, for a chatbot or another app. It runs in your browser, and the example API keeps the data on your machine.'],
      ['How it works', [
        'Runs when you open your YouTube history page, and keeps scanning as you scroll.',
        'Logs up to 200 videos per run and stores the 100 most recent.',
        'The popup shows each video’s title, channel and time.',
        'Optionally sends new videos to a local API. An example Node.js server is included.',
      ]],
      ['Features', [
        'Deduplication that keeps the original order.',
        'Tracks which videos were already sent, so none is sent twice.',
        'Sends data only when new videos appear.',
        'Refreshes every minute to catch new videos.',
      ]],
    ],
    tech: ['JavaScript', 'Chrome Extension API', 'Node.js', 'Express'],
  },
}

// the page data plus the constants.ts repo; undefined for an unknown slug
const load = (slug: string) => {
  const p = projectsData[slug]
  const repo = ALL_REPOSITORIES.find(r => r.id === slug)
  if (!p || !repo?.github) return undefined
  return { ...p, name: p.title ?? repo.name, category: repo.category, github: repo.github, dek: repo.forked ? `Team project (fork). ${p.dek}` : p.dek }
}

export function generateStaticParams() {
  return Object.keys(projectsData).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = load(slug)
  return p ? pageMeta(p.name, p.dek, `/projects/${slug}`) : {}
}

const item = (t: Item) => (typeof t === 'string' ? t : <><strong>{t[0]}</strong> {t[1]}</>)

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params
  const p = load(slug)
  if (!p) notFound()

  return (
    <div className={`wrap ${s.page}`}>
      <PageHeader eyebrow="Projects" eyebrowHref="/projects" title={p.name} dek={p.dek} />
      <div className={s.grid}>
        <div className={s.body}>
          {p.records.map(([h, body], i) => (
            <section key={h} className={s.rec} aria-labelledby={`d-h${i}`} {...rv()}>
              <div className={`rule ${s.rule}`} />
              <MaskHeading as="h2" id={`d-h${i}`} className={`h3 ${s.h}`}>{h}</MaskHeading>
              {typeof body === 'string'
                ? <p className={s.text} {...ri(0)}>{body}</p>
                : <ul className={s.list}>{body.map((t, n) => <li key={n} {...ri(n)}>{item(t)}</li>)}</ul>}
            </section>
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
            {p.links?.map(l => l.href.startsWith('/')
              ? <Link key={l.href} className="lnk" href={l.href}>{l.label}</Link>
              : <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<Ext /></a>)}
          </div>
        </aside>
      </div>
    </div>
  )
}
