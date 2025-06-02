'use client'

import React from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaBrain, FaCode, FaGraduationCap, FaLightbulb, FaRocket, FaUsers, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useGitHubStats } from '@/lib/github'
import { PORTFOLIO_CONFIG } from '@/lib/constants'

const AboutPage = () => {
  const { stats, loading, error } = useGitHubStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Back Button */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft /> Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-16 mb-4">About Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Learn more about my journey, philosophy, and what drives me as a Full-Stack AI Developer
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 mt-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaLightbulb className="text-blue-600" /> My Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Hi, I'm Gaurav Surtani, and I'm on the path to being a 'Full Stack AI Developer'. 🎯 
                  Based in San Jose, CA, I've been fascinated by the intersection of artificial intelligence, 
                  data engineering, and practical problem-solving since the beginning of my tech journey.
                </p>
                <p>
                  My passion lies in building intelligent solutions that bridge the gap between cutting-edge AI 
                  research and real-world applications. I believe that the most impactful technology is the one 
                  that solves genuine problems and makes people's lives easier.
                </p>
                <p>
                  I have had the privilege of working with prestigious organizations including Bexorg, NASA, and SJSU RF, 
                  where I contributed to projects spanning from space exploration data analysis to advanced AI systems. 
                  Each project has taught me something valuable and pushed the boundaries of what's possible with modern technology.
                </p>
              </div>
            </section>

            {/* Technical Philosophy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaBrain className="text-blue-600" /> Technical Philosophy
              </h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-4 text-gray-700">
                  <p>
                    I approach technology with a balance of curiosity and pragmatism. While I'm always excited 
                    to explore the latest AI research and techniques, I focus on understanding how these can be 
                    applied to solve real problems.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">My Core Principles:</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Build for users, not just for technology</li>
                        <li>• Always question "why" before "how"</li>
                        <li>• Continuous learning is non-negotiable</li>
                        <li>• Collaboration amplifies innovation</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Areas of Focus:</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Agentic AI Systems</li>
                        <li>• Natural Language Processing</li>
                        <li>• Knowledge Graph Construction</li>
                        <li>• Data Engineering Pipelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Work & Interests */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaRocket className="text-blue-600" /> What I'm Working On
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Current Projects</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Advanced email management with NLP and Knowledge Graphs</li>
                    <li>• Food recommendation systems using ML</li>
                    <li>• Job market analytics and trend prediction</li>
                    <li>• Environmental ML models for fire prediction</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Learning & Growth</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• Exploring advanced Agentic AI systems</li>
                    <li>• Deep diving into transformer architectures</li>
                    <li>• Building production-ready ML pipelines</li>
                    <li>• Contributing to open-source AI projects</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills & Expertise */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaCode className="text-blue-600" /> Skills & Expertise
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">AI & Machine Learning</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'Scikit-learn', 'Jupyter'].map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Data Engineering & Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Pandas', 'NumPy', 'Data Visualization', 'ETL Pipelines', 'Statistical Analysis', 'Big Data', 'SQL', 'MongoDB'].map((skill) => (
                      <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Web Development</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'Chrome Extensions', 'APIs'].map((skill) => (
                      <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Fun Facts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fun Facts About Me</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">When I'm Not Coding...</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>🤖 Reading the latest AI research papers</li>
                      <li>🔍 Exploring new datasets and finding hidden patterns</li>
                      <li>🔥 Thinking about how ML can help save the planet</li>
                      <li>🔭 Watching Astrophysics documentaries and learning about space</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Random Interests</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>📧 Building AI systems to achieve inbox zero</li>
                      <li>🎬 Creating browser extensions for better UX</li>
                      <li>📊 Finding interesting trends in job market data</li>
                      <li>🚀 Contributing to space exploration through data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {loading ? (
                      <div className="animate-pulse">...</div>
                    ) : error ? (
                      `${PORTFOLIO_CONFIG.fallbackStats.repositoryCount}+`
                    ) : (
                      `${stats?.repositoryCount || PORTFOLIO_CONFIG.fallbackStats.repositoryCount}+`
                    )}
                  </div>
                  <div className="text-sm text-gray-600">GitHub Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {loading ? (
                      <div className="animate-pulse">...</div>
                    ) : error ? (
                      `${PORTFOLIO_CONFIG.fallbackStats.organizationCount}+`
                    ) : (
                      `${stats?.organizationCount || PORTFOLIO_CONFIG.fallbackStats.organizationCount}+`
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Organizations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {loading ? (
                      <div className="animate-pulse">...</div>
                    ) : error ? (
                      '∞'
                    ) : (
                      `${stats?.accountAge || PORTFOLIO_CONFIG.fallbackStats.accountAge}+`
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Years on GitHub</div>
                </div>
              </div>
            </div>

            {/* Current Organizations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUsers className="text-blue-600" /> Organizations
              </h3>
              <div className="space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                    ))}
                  </div>
                ) : stats?.organizations.length ? (
                  stats.organizations.map((org, index) => (
                    <div key={org.login} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        PORTFOLIO_CONFIG.organizations[index]?.color || 'bg-gray-600'
                      }`}></div>
                      <span className="text-gray-700">{org.login}</span>
                    </div>
                  ))
                ) : (
                  <div className="space-y-3">
                    {PORTFOLIO_CONFIG.organizations.map((org, index) => (
                      <div key={org.name} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${org.color}`}></div>
                        <span className="text-gray-700">{org.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Connect */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Let's Connect</h3>
              <div className="space-y-3">
                <a 
                  href="https://github.com/gauravsurtani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <FaGithub /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/gaurav-surtani/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a 
                  href="mailto:gaurav.surtani@gmail.com"
                  className="w-full border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <FaEnvelope /> Email
                </a>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-blue-600" /> Education
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Master's in Artificial Intelligence</p>
                  <p className="text-gray-600 dark:text-gray-300">San Jose State University</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">San Jose, CA</p>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-medium text-gray-900 dark:text-white">Bachelor's in Information Technology</p>
                  <p className="text-gray-600 dark:text-gray-300">Pune University</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pune, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage 