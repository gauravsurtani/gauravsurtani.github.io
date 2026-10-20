// Blog post (server). Header: eyebrow link "Writing", mono tags, h1 (mask enter on mount), mono meta line.
// Body: the post markdown, untouched, in .prose (prose.css). Each h2 and the text up to the next h2 form one record
// (a reveal block): the h2 rises out of a line mask (G7) and its text rises with it (P3), so a heading and its text
// always arrive together. Text before the first h2 (.p-intro) rises after the header. Code blocks get tabIndex 0 so keyboard users can scroll them.
// End (inside .prose, so its rule spans the text measure): a .rule record divider (P4) and the "All posts" link.
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ElementContent, Root, RootContent } from 'hast'
import MaskHeading from '@/components/motion/MaskHeading'
import { ri, rv } from '@/components/motion/reveal'
import { getPostBySlug, getAllPostSlugs, formatDate } from '@/lib/posts'
import '../prose.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug)
  return post ? { title: post.title, description: post.description } : {}
}

export function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

// rehype: wrap each h2 and its following nodes as <section data-rv><h2/><div class="p-b" data-ri>...</div></section>,
// and the text before the first h2 as <div class="p-b p-intro">, which rises from first paint after the header
// (globals.css). AST-based, so a "## " line inside a code block never starts a record.
const records = () => (tree: Root) => {
  const intro: ElementContent[] = []
  const out: RootContent[] = [{ type: 'element', tagName: 'div', properties: { className: ['p-b', 'p-intro'] }, children: intro }]
  let body = intro
  for (const n of tree.children) {
    if (n.type === 'element' && n.tagName === 'h2') {
      body = []
      out.push({ type: 'element', tagName: 'section', properties: { dataRv: '' }, children: [n,
        { type: 'element', tagName: 'div', properties: { className: ['p-b'], dataRi: '' }, children: body }] })
    } else if (n.type !== 'doctype') body.push(n)
  }
  tree.children = intro.some(n => n.type !== 'text' || n.value.trim()) ? out : out.slice(1)
}

const MD: Components = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h2: ({ node, children, ...p }) =>
    typeof children === 'string' ? <MaskHeading as="h2">{children}</MaskHeading> : <h2 {...p}>{children}</h2>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pre: ({ node, ...p }) => <pre tabIndex={0} {...p} />,
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug((await params).slug)
  if (!post) notFound()

  return (
    <div className="wrap pb-[clamp(72px,12vh,140px)]">
      <article>
        <header className="ph">
          <Link className="ph-eyebrow lnk" href="/blog">Writing</Link>
          {post.tags.length > 0 && (
            <ul className="tags mb-5 mt-2" aria-label="Tags">{post.tags.map(t => <li key={t} className="tag">{t}</li>)}</ul>
          )}
          <MaskHeading as="h1" enter className="display max-w-[24ch]">{post.title}</MaskHeading>
          <p className="meta mt-5">
            <span className="max-[760px]:block">{post.author}<span className="max-[760px]:hidden"> ·</span> </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
          </p>
        </header>
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[records]} components={MD}>{post.content}</ReactMarkdown>
          <div className="p-end" {...rv()}>
            <div className="rule" />
            <p {...ri(0)}><Link className="lnk" href="/blog">All posts</Link></p>
          </div>
        </div>
      </article>
    </div>
  )
}
