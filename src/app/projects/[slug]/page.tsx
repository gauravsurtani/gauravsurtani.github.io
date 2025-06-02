import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaChrome, FaFire, FaEnvelope, FaUtensils, FaCheck } from 'react-icons/fa'

interface ProjectDetailProps {
  params: {
    slug: string
  }
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  problemStatement: string;
  solution: string;
  tech: string[];
  github: string;
  icon: React.ReactElement;
  features: string[];
  category: string;
  highlights: string[];
  stars?: number;
}

// Project data (in a real app, this would come from a database or CMS)
const projectsData: Record<string, Project> = {
  'email-link': {
    id: 'email-link',
    title: 'Email-Link',
    subtitle: 'AI-Powered Email Management',
    description: 'Advanced email management system leveraging NLP, Knowledge Graphs, and Agentic AI to help users find everything in their email efficiently.',
    fullDescription: 'Email-Link is a comprehensive solution that combines Natural Language Processing, Knowledge Graph construction, and Agentic AI systems to create an intelligent email management platform. Users can query their emails using natural language and get contextual, relevant results that understand the semantic meaning behind their requests.',
    problemStatement: 'Traditional email search is limited to keyword matching, making it difficult to find emails based on context, relationships, or complex queries. Users often struggle to locate important emails when they can only remember partial details or conceptual information.',
    solution: 'By implementing advanced NLP techniques and knowledge graphs, Email-Link creates a semantic understanding of email content, allowing users to search using natural language queries and receive intelligent, context-aware results.',
    tech: ['Python', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'Machine Learning', 'Natural Language Processing', 'Semantic Search'],
    github: 'https://github.com/gauravsurtani/Email-Link',
    icon: <FaEnvelope className="text-5xl text-blue-600" />,
    features: [
      'Natural Language Query Processing',
      'Knowledge Graph Construction',
      'Agentic AI Integration',
      'Semantic Email Search',
      'Context-Aware Results',
      'Email Relationship Mapping',
      'Intelligent Content Analysis'
    ],
    category: 'AI & NLP',
    highlights: [
      'Processes complex natural language queries',
      'Builds knowledge graphs from email content',
      'Uses agentic AI for intelligent responses',
      'Provides semantic search capabilities'
    ]
  },
  'wat-to-eat': {
    id: 'wat-to-eat',
    title: 'wat-to-eat',
    subtitle: 'Food Recommendation Engine',
    description: 'Data engineering project analyzing various tags from Food.com to recommend the best food for your taste preferences using machine learning.',
    fullDescription: 'wat-to-eat is a sophisticated data engineering pipeline that processes comprehensive Food.com data to build an intelligent recommendation system. The project uses machine learning algorithms to analyze food tags, ingredients, nutritional information, and user preferences to suggest personalized meal recommendations.',
    problemStatement: 'Choosing what to eat can be overwhelming with countless options available. Existing recommendation systems often lack personalization and fail to consider dietary preferences, nutritional needs, and taste profiles effectively.',
    solution: 'By analyzing Food.com\'s extensive database and applying machine learning techniques, the system creates personalized food recommendations based on individual taste preferences, dietary restrictions, and nutritional goals.',
    tech: ['Python', 'Data Engineering', 'Machine Learning', 'Jupyter Notebook', 'Pandas', 'Data Analysis', 'Recommendation Systems'],
    github: 'https://github.com/gauravsurtani/wat-to-eat',
    icon: <FaUtensils className="text-5xl text-orange-600" />,
    features: [
      'Food.com Data Analysis',
      'Tag-based Recommendation',
      'Machine Learning Models',
      'User Preference Learning',
      'Nutritional Analysis',
      'Dietary Restriction Support',
      'Personalized Meal Planning'
    ],
    category: 'Data Engineering',
    highlights: [
      'Processes large-scale food data from Food.com',
      'Implements ML-based recommendation algorithms',
      'Analyzes nutritional content and dietary patterns',
      'Provides personalized food suggestions'
    ]
  },
  'company-stats': {
    id: 'company-stats',
    title: 'company-stats',
    subtitle: 'Job Market Analytics',
    description: 'Comprehensive analysis synthesizing Simplify and H1B grader data to identify interesting trends in the job market over recent years.',
    fullDescription: 'company-stats is a comprehensive data science project that combines multiple job market datasets to provide insights into hiring trends, salary patterns, and industry movements. The project focuses particularly on H1B visa data and tech industry hiring patterns to understand market dynamics.',
    problemStatement: 'The job market is complex and constantly evolving, making it difficult for job seekers and employers to understand current trends, salary expectations, and hiring patterns across different industries and visa categories.',
    solution: 'By synthesizing data from multiple sources including Simplify and H1B grader databases, the project provides comprehensive analytics and visualizations that reveal hidden patterns and trends in the job market.',
    tech: ['Python', 'Data Science', 'Jupyter Notebook', 'Data Visualization', 'Statistics', 'Pandas', 'Market Analysis'],
    github: 'https://github.com/gauravsurtani/company-stats',
    icon: <FaCode className="text-5xl text-green-600" />,
    features: [
      'Multi-source Data Integration',
      'H1B Visa Trend Analysis',
      'Salary Pattern Recognition',
      'Interactive Visualizations',
      'Market Prediction Models',
      'Industry Comparison Tools',
      'Geographic Analysis'
    ],
    category: 'Data Science',
    highlights: [
      'Integrates multiple job market data sources',
      'Analyzes H1B visa and hiring trends',
      'Creates predictive models for market patterns',
      'Provides actionable insights for job seekers'
    ]
  },
  'fire-prediction': {
    id: 'fire-prediction',
    title: 'fire-prediction',
    subtitle: 'Environmental ML Model',
    description: 'Machine learning model for forest fire prediction using weather variables. Features comprehensive data science workflows and visualization.',
    fullDescription: 'fire-prediction is an environmental science application using machine learning to predict forest fire risk based on meteorological data. The project includes comprehensive data preprocessing, feature engineering, and model evaluation with visualization dashboards to help environmental agencies assess fire risk.',
    problemStatement: 'Forest fires cause significant environmental and economic damage. Early prediction and risk assessment are crucial for prevention and resource allocation, but traditional methods often lack the precision needed for effective fire management.',
    solution: 'By leveraging machine learning algorithms and meteorological data, the system provides accurate fire risk predictions, enabling proactive measures and better resource management for fire prevention and response.',
    tech: ['Python', 'Machine Learning', 'Data Visualization', 'Environmental Science', 'Jupyter Notebook', 'Scikit-learn', 'Meteorological Analysis'],
    github: 'https://github.com/gauravsurtani/fire-prediction',
    icon: <FaFire className="text-5xl text-red-600" />,
    features: [
      'Weather Data Analysis',
      'Fire Risk Prediction',
      'Feature Engineering',
      'Model Evaluation',
      'Environmental Impact Assessment',
      'Risk Visualization',
      'Predictive Analytics'
    ],
    category: 'Machine Learning',
    stars: 4,
    highlights: [
      'Analyzes meteorological data for fire prediction',
      'Implements multiple ML algorithms for accuracy',
      'Provides comprehensive risk assessment tools',
      'Supports environmental conservation efforts'
    ]
  },
  'youtube-history-extension': {
    id: 'youtube-history-extension',
    title: 'YouTube History Extension',
    subtitle: 'Chrome Browser Extension',
    description: 'Innovative Chrome extension that provides a sneaky way to access YouTube history, bypassing limitations of the outdated YouTube API.',
    fullDescription: 'YouTube History Extension is a clever browser extension that solves the problem of accessing YouTube viewing history when the official API is limited or outdated. The extension uses creative web scraping and browser automation techniques to provide users with better control over their viewing data and history management.',
    problemStatement: 'YouTube\'s official API has limitations that prevent users from fully accessing their viewing history and data. This creates frustration for users who want to manage, analyze, or export their viewing patterns and preferences.',
    solution: 'The Chrome extension bypasses API limitations through innovative web automation techniques, giving users direct access to their YouTube history with enhanced features and better data control.',
    tech: ['JavaScript', 'Chrome Extension API', 'Web Development', 'DOM Manipulation', 'Browser APIs', 'Web Scraping', 'User Interface Design'],
    github: 'https://github.com/gauravsurtani/youtube-history-extension',
    icon: <FaChrome className="text-5xl text-purple-600" />,
    features: [
      'YouTube History Access',
      'Chrome Extension Integration',
      'API Workaround Solutions',
      'User Data Control',
      'Privacy-Focused Design',
      'History Export Features',
      'Enhanced User Interface'
    ],
    category: 'Web Development',
    highlights: [
      'Bypasses YouTube API limitations creatively',
      'Provides enhanced history management features',
      'Maintains user privacy and data control',
      'Demonstrates innovative web automation techniques'
    ]
  }
}

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  const project = projectsData[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <FaArrowLeft /> Back to Projects
          </Link>
          
          <div className="flex items-center gap-6 mb-6">
            {project.icon}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <p className="text-xl text-blue-600 font-medium">{project.subtitle}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                {project.stars && (
                  <span className="text-yellow-500 text-lg">⭐ {project.stars} stars</span>
                )}
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
            {project.fullDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problem & Solution */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Problem & Solution</h2>
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Problem Statement</h3>
                  <p className="text-red-700">{project.problemStatement}</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Solution</h3>
                  <p className="text-green-700">{project.solution}</p>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <FaCheck className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Project Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Highlights</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <ul className="space-y-3">
                  {project.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mt-1">
                        <FaCheck className="text-xs" />
                      </span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Links</h3>
              <div className="space-y-3">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <FaGithub /> View Source Code
                </a>
                <Link 
                  href="/projects"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <FaExternalLinkAlt /> Back to All Projects
                </Link>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

// Generate static params for all projects
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }))
} 