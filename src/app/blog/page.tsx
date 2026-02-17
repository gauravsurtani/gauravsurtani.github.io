import React from 'react'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Gaurav Surtani',
  description: 'Writing on AI, machine learning, software engineering, and building things that matter.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <div
        className="border-b"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            Writing on AI, machine learning, and building things that matter.
          </p>
        </div>
      </div>

      {/* Post List */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              No posts yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-0 divide-y" style={{ borderColor: 'var(--card-border)' }}>
            {posts.map((post) => (
              <article key={post.slug} className="py-8 group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <time
                      className="text-sm font-medium shrink-0"
                      style={{ color: 'var(--muted-foreground)' }}
                      dateTime={post.date}
                    >
                      {formatDate(post.date)}
                    </time>
                    <span
                      className="text-xs shrink-0"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h2
                    className="text-xl font-semibold mb-2 group-hover:underline transition-colors"
                    style={{ color: 'var(--foreground)', textDecorationColor: 'var(--accent)' }}
                  >
                    {post.title}
                  </h2>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--muted)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
