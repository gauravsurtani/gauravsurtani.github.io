'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaBrain, FaChrome, FaFire, FaEnvelope, FaUtensils, FaSearch, FaFilter, FaStar, FaCodeBranch, FaCalendarAlt } from 'react-icons/fa'
import { useGitHubStats } from '@/lib/github'
import { PORTFOLIO_CONFIG, ALL_REPOSITORIES, PROJECT_CATEGORIES, TECHNOLOGY_TAGS } from '@/lib/constants'

interface RepoListItem {
  id: string | number; // Assuming id can be string or number
  name: string;
  description: string;
  category: string; // Consider a more specific type if categories are fixed
  technologies: string[];
  language: string;
  featured?: boolean;
  stars: number;
  updatedAt: string; // Or Date
  forked?: boolean; // Made optional
  github?: string; // Added optional github
  license?: string; // Added optional license
  // Add other relevant properties from ALL_REPOSITORIES structure
}

const ProjectsPage = () => {
  const { stats, loading } = useGitHubStats();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('updated'); // updated, name, stars

  // Filter and sort repositories
  const filteredRepositories = useMemo(() => {
    let filtered = ALL_REPOSITORIES;

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryMap: { [key: string]: string } = {
        'ai-ml': 'AI & Machine Learning',
        'data-science': 'Data Science & Engineering',
        'web-dev': 'Web Development',
        'devops': 'DevOps & Infrastructure',
        'tools': 'Miscellaneous'
      };
      filtered = filtered.filter(repo => repo.category === categoryMap[selectedCategory]);
    }

    // Filter by technology
    if (selectedTechnology) {
      filtered = filtered.filter(repo => 
        repo.technologies.includes(selectedTechnology) || 
        repo.language === selectedTechnology
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(query) ||
        repo.description.toLowerCase().includes(query) ||
        repo.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Filter by featured
    if (showFeaturedOnly) {
      filtered = filtered.filter(repo => repo.featured);
    }

    // Sort repositories
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stars':
        filtered.sort((a, b) => b.stars - a.stars);
        break;
      case 'updated':
      default:
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }

    return filtered;
  }, [selectedCategory, selectedTechnology, searchQuery, showFeaturedOnly, sortBy]);

  const getProjectIcon = (repo: RepoListItem) => {
    if (repo.name.includes('email')) return <FaEnvelope className="text-3xl text-blue-600" />;
    if (repo.name.includes('youtube')) return <FaChrome className="text-3xl text-red-600" />;
    if (repo.name.includes('fire')) return <FaFire className="text-3xl text-orange-600" />;
    if (repo.name.includes('food') || repo.name.includes('eat')) return <FaUtensils className="text-3xl text-green-600" />;
    if (repo.category === 'AI & Machine Learning') return <FaBrain className="text-3xl text-purple-600" />;
    if (repo.category === 'Web Development') return <FaCode className="text-3xl text-blue-600" />;
    return <FaGithub className="text-3xl text-gray-600" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <FaArrowLeft /> Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-6">
            Explore all {ALL_REPOSITORIES.length} repositories from my GitHub profile, showcasing work across 
            AI/ML, data science, web development, and more.
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaGithub className="text-gray-500" />
              <span>{loading ? '...' : stats?.repositoryCount || PORTFOLIO_CONFIG.fallbackStats.repositoryCount} Total Repositories</span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span>{ALL_REPOSITORIES.reduce((acc, repo) => acc + repo.stars, 0)} Total Stars</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCodeBranch className="text-blue-500" />
              <span>{ALL_REPOSITORIES.filter(repo => repo.forked).length} Forked Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updated">Recently Updated</option>
                <option value="name">Name A-Z</option>
                <option value="stars">Most Stars</option>
              </select>
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-3 rounded-lg border transition-colors ${
                  showFeaturedOnly 
                    ? 'bg-blue-100 text-blue-800 border-blue-300' 
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                <FaFilter className="inline mr-2" />
                Featured Only
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'border-blue-300 bg-blue-50 text-blue-800'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                {category.name}
                <span className="block text-xs text-gray-500 mt-1">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 py-1">Technologies:</span>
            <select
              value={selectedTechnology}
              onChange={(e) => setSelectedTechnology(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Technologies</option>
              {TECHNOLOGY_TAGS.map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
            {selectedTechnology && (
              <button
                onClick={() => setSelectedTechnology('')}
                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="container mx-auto px-6 py-4">
        <p className="text-gray-600">
          Showing {filteredRepositories.length} of {ALL_REPOSITORIES.length} repositories
          {selectedCategory !== 'all' && ` in ${PROJECT_CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
          {selectedTechnology && ` using ${selectedTechnology}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6 pb-16">
        {filteredRepositories.length === 0 ? (
          <div className="text-center py-12">
            <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No repositories found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTechnology('');
                setSearchQuery('');
                setShowFeaturedOnly(false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepositories.map((repo) => (
              <div key={repo.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getProjectIcon(repo)}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{repo.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            PROJECT_CATEGORIES.find(c => c.name === repo.category)?.color || 'bg-gray-100 text-gray-800'
                          }`}>
                            {repo.category}
                          </span>
                          {repo.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-xs text-gray-500">
                      {repo.stars > 0 && (
                        <div className="flex items-center gap-1 mb-1">
                          <FaStar className="text-yellow-500" />
                          <span>{repo.stars}</span>
                        </div>
                      )}
                      {repo.forked && (
                        <div className="flex items-center gap-1">
                          <FaCodeBranch className="text-blue-500" />
                          <span>Fork</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed text-sm line-clamp-3">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {repo.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{repo.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>Updated {formatDate(repo.updatedAt)}</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {repo.language}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={repo.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      <FaGithub /> View Code
                    </a>
                    {['email-link', 'wat-to-eat', 'company-stats', 'fire-prediction', 'youtube-history-extension'].includes(repo.id) && (
                      <Link
                        href={`/projects/${repo.id}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                      >
                        <FaExternalLinkAlt /> Learn More
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GitHub CTA */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore More on GitHub</h2>
          <p className="text-lg text-gray-600 mb-8">
            Visit my GitHub profile to see the latest updates, contributions, and collaboration opportunities.
          </p>
          <a 
            href={`${PORTFOLIO_CONFIG.github}?tab=repositories`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2 text-lg font-medium"
          >
            <FaGithub /> Visit GitHub Profile
          </a>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage 