'use client'

import React from 'react'
import Link from 'next/link'
import { FaChrome, FaArrowLeft } from 'react-icons/fa'

const ThingsToBuildChromePage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <div
        className="border-b"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <Link
            href="/things-to-build"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <FaArrowLeft />
            Back to Things to Build
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <FaChrome className="text-3xl" style={{ color: 'var(--accent)' }} />
            <h1 className="text-4xl font-bold">OpenClaw Chrome Extension</h1>
          </div>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            One-click content capture from Chrome to OpenClaw for analysis and classification.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p>
              A Chrome extension designed to capture web content (pages, posts) and send it to OpenClaw for analysis and classification. Users can quickly save content with categories like Project Ideas, Read Later, Blog Posts, and more.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Core Features</h2>
            <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--muted-foreground)' }}>
              <li><strong>Toolbar Button:</strong> Click to capture current tab content</li>
              <li><strong>Context Menu:</strong> Right-click to Send to OpenClaw</li>
              <li><strong>Keyboard Shortcut:</strong> Cmd/Ctrl+Shift+O for quick capture</li>
              <li><strong>Classification Categories:</strong> Project Idea, Read Later, Blog Post, Explore, Todo</li>
              <li><strong>OpenClaw Integration:</strong> Send URL + content for AI analysis</li>
              <li><strong>Notifications:</strong> Success/error feedback</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['Chrome Extension (MV3)', 'JavaScript', 'TypeScript', 'React', 'Chrome Storage API'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--background)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Status</h2>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <p className="font-medium">Specification Complete — Ready to Build</p>
              <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
                The detailed specification is available. Development can commence once resources are allocated.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ThingsToBuildChromePage
