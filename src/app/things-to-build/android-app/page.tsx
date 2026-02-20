'use client'

import React from 'react'
import Link from 'next/link'
import { FaAndroid, FaArrowLeft } from 'react-icons/fa'

const ThingsToBuildAndroidPage = () => {
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
            <FaAndroid className="text-3xl" style={{ color: 'var(--accent)' }} />
            <h1 className="text-4xl font-bold">Tech Blog Catchup - Android App</h1>
          </div>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            A NotebookLM-style audio experience for engineering blogs.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p>
              This project aims to create an Android application that transforms technical blog posts into audio podcasts using LLM-generated scripts and TTS. Users input URLs from tech blogs (Uber, Netflix, Meta, etc.), and the app converts them into engaging, conversational audio podcasts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--muted-foreground)' }}>
              <li><strong>URL Input:</strong> Simple text field to paste blog URLs</li>
              <li><strong>Share Extension:</strong> Android system intent to Share to Tech Blog Catchup</li>
              <li><strong>LLM Script Generation:</strong> Transform technical text into dialogue scripts</li>
              <li><strong>TTS Audio Synthesis:</strong> Generate MP3 podcasts using ElevenLabs or OpenAI</li>
              <li><strong>Podcast Player:</strong> Standard controls with background playback</li>
              <li><strong>Library Management:</strong> History, favorites, and status tracking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Riverpod', 'Material 3', 'just_audio', 'Dio', 'Firebase'].map((tech) => (
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

export default ThingsToBuildAndroidPage
