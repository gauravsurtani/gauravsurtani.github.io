'use client'

import React from 'react'
import Link from 'next/link'
import { FaAndroid, FaChrome, FaArrowLeft, FaRocket, FaCogs, FaProjectDiagram } from 'react-icons/fa'

const projects = [
  {
    slug: 'things-to-build',
    title: 'Tech Blog Catchup - Android App',
    description: 'A "NotebookLM-style" audio experience for engineering blogs. Users input URLs from tech blogs (Uber, Netflix, Meta, etc.), and the app converts them into engaging, conversational audio podcasts using LLMs and TTS.',
    icon: FaAndroid,
    tags: ['Mobile', 'Flutter', 'AI', 'Audio'],
    link: '/blog/things-to-build'
  },
  {
    slug: 'chrome-extension',
    title: 'OpenClaw Chrome Extension',
    description: 'One-click content capture from Chrome to OpenClaw for analysis and classification. Supports categorization into Project Ideas, Read Later, Blog Posts, and more.',
    icon: FaChrome,
    tags: ['Chrome Extension', 'OpenClaw', 'Web'],
    link: '/blog/things-to-build'
  }
]

const ThingsToBuildPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <div
        className="border-b"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <FaArrowLeft />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <FaProjectDiagram className="text-3xl" style={{ color: 'var(--accent)' }} />
            <h1 className="text-4xl font-bold">Things to Build</h1>
          </div>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            Potential future projects and extensions, providing specifications for their creation.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              No projects listed yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="p-6 rounded-lg border transition-all hover:shadow-lg group"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-opacity-10" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent)' }}>
                    <project.icon className="text-2xl" />
                  </div>
                </div>

                <h2
                  className="text-xl font-semibold mb-2 group-hover:underline"
                  style={{ textDecorationColor: 'var(--accent)' }}
                >
                  {project.title}
                </h2>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
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

                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors group-hover:gap-3"
                  style={{ color: 'var(--accent)' }}
                >
                  View Spec <FaRocket />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ThingsToBuildPage
