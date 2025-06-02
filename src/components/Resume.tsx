'use client'

import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaExternalLinkAlt, FaCode, FaGraduationCap, FaBriefcase, FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Link from 'next/link'
import { useGitHubStats } from '@/lib/github'
import { PORTFOLIO_CONFIG, ALL_REPOSITORIES, PROFESSIONAL_EXPERIENCE, EDUCATION, CERTIFICATIONS } from '@/lib/constants'
import Navigation from './Navigation'
import DarkModeToggle from './DarkModeToggle'
import LearnMoreButton from './LearnMoreButton'
import SkillsSlider from './SkillsSlider'

const Portfolio = () => {
  const { stats, loading, error } = useGitHubStats();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedRoles, setExpandedRoles] = useState<number[]>([]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const toggleRole = (index: number) => {
    setExpandedRoles(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation/>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 theme-transition">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Professional Image */}
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                  <div className="relative group">
                    <div className="w-[400px] h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 p-4 transition-all duration-300 hover:shadow-blue-500/20 hover:scale-[1.02] hover:p-0">
                      <img 
                        src="/portfolio_new_image_grad.jpg" 
                        alt="Gaurav Surtani" 
                        className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:rounded-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    {PORTFOLIO_CONFIG.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 mb-6 theme-transition">
                    {PORTFOLIO_CONFIG.title}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 theme-transition">
                    Full-Stack AI Developer with expertise in building intelligent solutions and contributing to cutting-edge research. Currently working with leading organizations across various domains. Passionate about creating impactful technology and exploring innovative solutions that drive progress.
                  </p>

                  

                  {/* Social Links */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a 
                      href={PORTFOLIO_CONFIG.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-hover px-8 py-4 rounded-lg flex items-center justify-center space-x-3 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 text-lg font-medium hover:-translate-y-0.5"
                    >
                      <FaLinkedin className="text-xl" />
                      <span>Connect on LinkedIn</span>
                    </a>
                    <a 
                      href={PORTFOLIO_CONFIG.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-hover px-8 py-4 rounded-lg flex items-center justify-center space-x-3 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 text-lg font-medium hover:-translate-y-0.5"
                    >
                      <FaGithub className="text-xl" />
                      <span>Follow on GitHub</span>
                    </a>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
                    <a 
                      href={`mailto:${PORTFOLIO_CONFIG.email}`}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:-translate-y-0.5"
                    >
                      <FaEnvelope className="text-gray-600 dark:text-gray-400" />
                      <span>Get in Touch</span>
                    </a>
                    <a 
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:-translate-y-0.5"
                    >
                      <FaDownload className="text-gray-600 dark:text-gray-400" />
                      <span>Download Resume</span>
                    </a>
                  </div>

                  {/* Key Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                        {loading ? '...' : error ? PORTFOLIO_CONFIG.fallbackStats.repositoryCount : stats?.repositoryCount || PORTFOLIO_CONFIG.fallbackStats.repositoryCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                        {loading ? '...' : error ? PORTFOLIO_CONFIG.fallbackStats.organizationCount : stats?.organizationCount || PORTFOLIO_CONFIG.fallbackStats.organizationCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Organizations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                        {loading ? '...' : error ? `${PORTFOLIO_CONFIG.fallbackStats.accountAge}+` : `${stats?.accountAge}+` || `${PORTFOLIO_CONFIG.fallbackStats.accountAge}+`}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Years Exp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 theme-transition pt-32">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
            
            <div className="max-w-6xl mx-auto">
              <p className="text-lg mb-12 theme-transition text-center">
                I'm a passionate Full-Stack AI Developer from {PORTFOLIO_CONFIG.location}, currently working with leading organizations including {PORTFOLIO_CONFIG.currentWork.join(', ')}. My journey spans from building intelligent solutions that solve real-world problems to contributing to cutting-edge research in space exploration and AI.
              </p>
              
              {/* Current Focus Section */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-6 text-center">Current Focus</h3>
                <div className="relative overflow-hidden">
                  <div className="flex space-x-4 animate-scroll">
                    {PORTFOLIO_CONFIG.currentFocus.map((focus, index) => (
                      <div key={index} className="flex-shrink-0">
                        <div className="bg-white dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-800 dark:text-blue-400 whitespace-nowrap text-sm font-medium border border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                          {focus}
                        </div>
                      </div>
                    ))}
                    {/* Duplicate items for seamless loop */}
                    {PORTFOLIO_CONFIG.currentFocus.map((focus, index) => (
                      <div key={`duplicate-${index}`} className="flex-shrink-0">
                        <div className="bg-white dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-800 dark:text-blue-400 whitespace-nowrap text-sm font-medium border border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                          {focus}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Key Interests Section */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-6 text-center">Key Interests</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {PORTFOLIO_CONFIG.interests.map((interest, index) => (
                    <span key={index} className="tag-blue px-4 py-2 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <LearnMoreButton path="/about" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Technical Skills
            </h2>
            <SkillsSlider />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 theme-transition pt-32">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Professional Experience</h2>
            <div className="max-w-6xl mx-auto">
              <div className="space-y-6">
                {PROFESSIONAL_EXPERIENCE.map((exp, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-lg text-accent font-medium">{exp.company}</p>
                        <p className="theme-transition">{exp.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium theme-transition">{exp.period}</p>
                        <span className="inline-block tag-blue px-2 py-1 rounded text-xs mt-1">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Skills and Achievements Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {/* Skills Section */}
                      {exp.skills && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium text-accent mb-3 flex items-center">
                            <span className="mr-2">🛠️</span> Skills
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="bg-white inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-500 border border-blue-200 dark:border-blue-800/30"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements Section */}
                      {exp.achievements && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium text-accent mb-3 flex items-center">
                            <span className="mr-2">🏆</span> Key Achievements
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <span 
                                key={achievementIndex}
                                className="bg-white inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-500 border border-green-200 dark:border-green-800/30"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Projects */}
                    <div className="space-y-4">
                      {exp.projects && exp.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium text-accent mb-1">{project.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                          <ul className="space-y-1">
                            {project.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start space-x-2 text-sm">
                                <span className="text-accent">•</span>
                                <span className="theme-transition">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {/* {exp.achievements && exp.achievements.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium text-accent mb-1">General Achievements</h5>
                          <ul className="space-y-1">
                            {exp.achievements.slice(0, expandedRoles.includes(index) ? undefined : 3).map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start space-x-2 text-sm">
                                <span className="text-accent">•</span>
                                <span className="theme-transition">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                          {exp.achievements.length > 3 && (
                            <div className="mt-2 text-center">
                              <button 
                                onClick={() => toggleRole(index)}
                                className="text-accent hover:text-accent-hover text-sm font-medium inline-flex items-center space-x-1 transition-colors"
                              >
                                <span>{expandedRoles.includes(index) ? 'Show Less' : 'Show More'}</span>
                                {expandedRoles.includes(index) ? (
                                  <FaChevronUp className="text-xs" />
                                ) : (
                                  <FaChevronDown className="text-xs" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <LearnMoreButton path="/experience"/>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-muted theme-transition pt-32">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-lg text-accent font-medium">{edu.school}</p>
                        <p className="theme-transition">{edu.location}</p>
                        {edu.gpa && <p className="theme-transition">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-medium theme-transition">{edu.period}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-medium mb-2">Relevant Coursework</h4>
                        <ul className="space-y-1">
                          {edu.coursework.map((course, courseIndex) => (
                            <li key={courseIndex} className="text-sm theme-transition">• {course}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Achievements</h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="text-sm theme-transition">• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Certifications */}
              {/* CERTIFICATIONS.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-center mb-8">Certifications & Awards</h3>
                  <div className="space-y-4">
                    {CERTIFICATIONS.map((cert, index) => (
                      <div key={index} className="card p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{cert.name}</h4>
                            <p className="text-accent">{cert.issuer}</p>
                            {cert.details && (
                              <ul className="mt-2 space-y-1">
                                {cert.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="text-muted-foreground text-sm">• {detail}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <span className="text-muted-foreground text-sm">{cert.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) */}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 theme-transition pt-32">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
            <p className="text-center mb-8 max-w-2xl mx-auto theme-transition">
              A showcase of my work in AI, data engineering, and web development. Each project represents a unique challenge and innovative solution.
            </p>
            
            {/* Featured Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {ALL_REPOSITORIES.filter(repo => repo.featured).slice(0, 6).map((project) => (
                <div key={project.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      {project.featured && (
                        <span className="tag-yellow px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-4 line-clamp-3 theme-transition">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tag-gray px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs theme-transition">+{project.technologies.length - 3} more</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm theme-transition">
                        <span className="flex items-center space-x-1">
                          <FaCode size={12} />
                          <span>{project.language}</span>
                        </span>
                        {project.stars > 0 && (
                          <span className="flex items-center space-x-1">
                            <span>⭐</span>
                            <span>{project.stars}</span>
                          </span>
                        )}
                      </div>
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover transition-colors"
                      >
                        <FaExternalLinkAlt size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Projects Button */}
            <div className="text-center">
              <Link 
                href="/projects"
                className="inline-flex items-center space-x-2 btn-primary px-6 py-3 rounded-lg"
              >
                <span>View All</span>
                <span className="font-medium">
                  {loading ? '...' : error ? PORTFOLIO_CONFIG.fallbackStats.repositoryCount : stats?.repositoryCount || PORTFOLIO_CONFIG.fallbackStats.repositoryCount}
                </span>
                <span>Repositories</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-muted theme-transition pt-32">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
            <p className="mb-8 max-w-2xl mx-auto theme-transition text-lg">
              Interested in collaborating on AI projects, discussing technology, or exploring new opportunities? 
              I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <a 
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="flex items-center justify-center space-x-2 card px-8 py-4 hover:shadow-md transition-shadow text-lg"
              >
                <FaEnvelope className="text-xl" />
                <span>Email</span>
              </a>
              <a 
                href={PORTFOLIO_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 card px-8 py-4 hover:shadow-md transition-shadow text-lg"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
              <a 
                href={PORTFOLIO_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 card px-8 py-4 hover:shadow-md transition-shadow text-lg"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <a
              href={PORTFOLIO_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={PORTFOLIO_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio 