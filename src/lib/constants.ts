// Complete Repository Data with Categories and Technologies
export const ALL_REPOSITORIES = [
  // Side projects, 2026 Q3
  {
    id: 'gaurav-os',
    name: 'gaurav-os',
    description: 'A local work dashboard that reads my pull requests and git state and refuses to overclaim: deployment status is derived from the branch a PR merged into, never from its title, and a merge to develop is never shown as production. Rolling week view, a build log written per day, commit trails under each PR, a notepad that saves into Obsidian. Refreshes itself every ten minutes; open pages reload on a new build.',
    category: 'DevOps & Infrastructure',
    technologies: ['Python', 'GitHub CLI', 'launchd', 'Vanilla JS', 'HTML/CSS'],
    language: 'Python',
    stars: 0,
    featured: true,
    updatedAt: '2026-09-06',
    license: 'Private'
  },
  {
    id: 'jobs-collector',
    name: 'jobs-collector',
    description: 'Collects open roles from the careers pages of 1,400+ companies into SQLite with per-source outcome accounting: every company ends with a recorded result (collected, blocked, no supported source, empty) rather than a silent gap. Re-runs diff against the last snapshot so removed postings are detected. Respects robots rules. 99,000+ jobs collected, 78,000+ live across 1,000+ sources in the current snapshot.',
    category: 'Data Science & Engineering',
    technologies: ['Node.js', 'SQLite', 'Playwright', 'ETL Pipelines'],
    language: 'JavaScript',
    stars: 0,
    featured: true,
    updatedAt: '2026-08-30',
    license: 'Private'
  },
  // Production Systems (live, deployed, serving users)
  {
    id: 'dlai-mcp-server',
    name: 'dlai-mcp-server',
    description: 'MCP server making DeepLearning.AI\'s 121-course catalog searchable from Claude Code, Codex, and Cursor. 3 tools: search_courses, get_course_details, list_topics. Published on npm, hosted on Railway.',
    category: 'AI & Machine Learning',
    technologies: ['TypeScript', 'MCP Protocol', 'Algolia', 'Railway', 'npm', 'Cheerio'],
    language: 'TypeScript',
    github: 'https://github.com/gauravsurtani/dlai-mcp-server',
    homepage: 'https://www.npmjs.com/package/dlai-mcp-server',
    stars: 0,
    featured: true,
    updatedAt: '2026-04-06',
    license: 'MIT'
  },
  {
    id: 'tech-blog-catchup',
    name: 'tech-blog-catchup',
    description: 'Engineering blogs from Uber, Meta, Netflix, Airbnb → AI-generated podcasts. Content extraction, GPT script generation, parallel TTS, PWA with MediaSession API. Deployed on Railway at blog2podcast.com.',
    category: 'AI & Machine Learning',
    technologies: ['Next.js', 'FastAPI', 'TTS', 'Playwright', 'GPT-5.2', 'Railway', 'PWA'],
    language: 'TypeScript',
    github: 'https://github.com/gauravsurtani/tech-blog-catchup',
    homepage: 'https://blog2podcast.com',
    stars: 0,
    featured: true,
    updatedAt: '2026-04-06',
    license: 'MIT'
  },
  {
    id: 'pair-programmer-cli',
    name: 'pair-programmer-cli',
    description: 'Multiplayer middleware for AI coding agents — share Claude Code sessions with your team in real-time. WebSocket-based session sharing.',
    category: 'AI & Machine Learning',
    technologies: ['TypeScript', 'WebSocket', 'tmux', 'CLI', 'Claude Code'],
    language: 'TypeScript',
    github: 'https://github.com/gauravsurtani/pair-programmer-cli',
    stars: 0,
    featured: true,
    updatedAt: '2026-04-03',
    license: 'MIT'
  },
  // AI & Machine Learning Projects
  {
    id: 'email-link',
    name: 'Email-Link',
    description: 'Find everything in your email using NLP, Knowledge Graphs and Agentic AI',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'Machine Learning'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/Email-Link',
    stars: 0,
    featured: true,
    updatedAt: '2025-05-09',
    license: 'MIT'
  },
  {
    id: 'fire-prediction',
    name: 'fire-prediction',
    description: 'Forest Fire Prediction using Weather Variables - Machine Learning, Data Science & Visualization',
    category: 'AI & Machine Learning',
    technologies: ['Jupyter Notebook', 'Machine Learning', 'Data Science', 'Data Visualization'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/fire-prediction',
    stars: 4,
    featured: true,
    updatedAt: '2024-05-07',
    forked: true
  },
  {
    id: 'natural-language-processing',
    name: 'Natural-Language-Processing',
    description: 'Scrapy, Web scraping, XML Parsing, ChatGPT API usage, BERT, SpaCY, ATLAS, LLMs in NLP and Visual Similarity Detection',
    category: 'AI & Machine Learning',
    technologies: ['Jupyter Notebook', 'NLP', 'BERT', 'SpaCY', 'ChatGPT API', 'CLIP', 'RESNET', 'Hugging Face Transformers', 'LangChain'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/Natural-Language-Processing',
    stars: 0,
    featured: true,
    updatedAt: '2023-12-28'
  },
  {
    id: 'pronunciation-error-detection',
    name: 'Pronunciation-Error-Detection',
    description: 'PyTorch implementation of Noisy Student Training for Automatic Speech Recognition and Automatic Pronunciation Error Detection',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'PyTorch', 'Speech Recognition', 'ASR'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/Pronunciation-Error-Detection',
    stars: 0,
    featured: false,
    updatedAt: '2023-09-14',
    forked: true
  },
  {
    id: 'knowledgegraph-llm-exploration',
    name: 'KnowledgeGraph-LLM-Exploration',
    description: 'An interactive project made to explore RAG, LLMs and Knowledge Graph Modelling',
    category: 'AI & Machine Learning',
    technologies: ['Knowledge Graphs', 'LLM', 'RAG', 'Interactive', 'LangChain'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/KnowledgeGraph-LLM-Exploration',
    stars: 0,
    featured: true,
    updatedAt: '2024-05-08'
  },
  {
    id: '3ddepth',
    name: '3DDepth',
    description: '3D sensing, object detection and depth estimation',
    category: 'AI & Machine Learning',
    technologies: ['Jupyter Notebook', '3D Vision', 'Object Detection', 'Depth Estimation', 'YOLO v8', 'LiDAR'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/3DDepth',
    stars: 0,
    featured: false,
    updatedAt: '2025-05-28',
    license: 'MIT',
    forked: true
  },
  {
    id: 'lidar-camera-depth-estimation',
    name: 'LiDAR-Camera---Depth-Estimation',
    description: 'LiDAR and Camera fusion for depth estimation',
    category: 'AI & Machine Learning',
    technologies: ['Jupyter Notebook', 'LiDAR', 'Computer Vision', 'Depth Estimation'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/LiDAR-Camera---Depth-Estimation',
    stars: 0,
    featured: false,
    updatedAt: '2024-04-02'
  },
  {
    id: 'cv-tracking',
    name: 'CV_tracking',
    description: 'Computer Vision tracking implementation',
    category: 'AI & Machine Learning',
    technologies: ['Jupyter Notebook', 'Computer Vision', 'Object Tracking'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/CV_tracking',
    stars: 0,
    featured: false,
    updatedAt: '2023-10-13',
    license: 'MIT',
    forked: true
  },
  {
    id: 'time-series-forecasting-and-deep-learning',
    name: 'Time-Series-Forecasting-and-Deep-Learning',
    description: 'Resources about time series forecasting and deep learning',
    category: 'AI & Machine Learning',
    technologies: ['Time Series', 'Deep Learning', 'Forecasting'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/Time-Series-Forecasting-and-Deep-Learning',
    stars: 0,
    featured: false,
    updatedAt: '2024-09-08',
    forked: true
  },
  {
    id: 'im-watching-you',
    name: 'im-watching-you',
    description: 'AI-powered life tracking system with MCP server for Claude Desktop, LLM-driven activity classification, productivity analytics, and Whisper transcription',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'MCP', 'Claude Desktop', 'LLM', 'Docker', 'FastAPI', 'Whisper'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/im-watching-you',
    stars: 0,
    featured: true,
    updatedAt: '2026-02-12'
  },
  {
    id: 'speech-to-speech-translation',
    name: 'Speech-To-Speech-Translation-real-time-',
    description: 'Real-time speech-to-speech translation system for multilingual communication.',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Speech Recognition', 'Translation', 'Real-time Processing', 'NLP'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/Speech-To-Speech-Translation-real-time-',
    stars: 0,
    featured: true,
    updatedAt: '2026-02-13',
    forked: true
  },
  {
    id: 'groq-deep-research',
    name: 'groq-deep-research',
    description: 'Deep research app powered by Compound-beta on Groq.',
    category: 'AI & Machine Learning',
    technologies: ['JavaScript', 'Groq', 'Deep Research', 'AI', 'LLM'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/groq-deep-research',
    homepage: 'https://deep-research-fast.vercel.app',
    stars: 0,
    featured: false,
    updatedAt: '2025-11-27',
    forked: true
  },
  {
    id: 'master-prompt',
    name: 'master-prompt',
    description: 'Interactive master prompt builder and optimizer for AI workflows.',
    category: 'AI & Machine Learning',
    technologies: ['HTML', 'Prompt Engineering', 'AI', 'LLM'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/master-prompt',
    homepage: 'https://gauravsurtani.github.io/master-prompt/',
    stars: 0,
    featured: false,
    updatedAt: '2025-09-08'
  },
  {
    id: 'streetview-agent-peds',
    name: 'StreetView-Agent-PEDS',
    description: 'StreetView agent designed to navigate complex spaces within street view for pedestrian research.',
    category: 'AI & Machine Learning',
    technologies: ['JavaScript', 'Google Street View', 'Agent AI', 'Navigation', 'Geospatial'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/StreetView-Agent-PEDS',
    stars: 0,
    featured: false,
    updatedAt: '2025-07-10'
  },

  // Data Science & Engineering Projects
  {
    id: 'wat-to-eat',
    name: 'wat-to-eat',
    description: 'Data engineering on various tags of Food.com and finding the best kind of food for your taste',
    category: 'Data Science & Engineering',
    technologies: ['Jupyter Notebook', 'Data Engineering', 'Food Analytics', 'Recommendation Systems'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/wat-to-eat',
    stars: 0,
    featured: true,
    updatedAt: '2024-12-01'
  },
  {
    id: 'company-stats',
    name: 'company-stats',
    description: 'Using Simplify and H1B grader data to find interesting trends in jobs over the years',
    category: 'Data Science & Engineering',
    technologies: ['Jupyter Notebook', 'Data Science', 'Job Market Analysis', 'H1B Data'],
    language: 'Jupyter Notebook',
    github: 'https://github.com/gauravsurtani/company-stats',
    stars: 0,
    featured: true,
    updatedAt: '2024-05-24',
    forked: true
  },
  {
    id: 'math-in-data-science',
    name: 'Math-in-Data-Science',
    description: 'R and R studio programming for mathematical data science',
    category: 'Data Science & Engineering',
    technologies: ['R', 'R Studio', 'Mathematical Modeling', 'Statistics'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/Math-in-Data-Science',
    stars: 0,
    featured: false,
    updatedAt: '2023-12-28'
  },
  {
    id: 'parking-research',
    name: 'ParkingResearch',
    description: 'Parking Simulation - Real-Time Data Gathering, Pipelining and Data Analysis and Visualization',
    category: 'Data Science & Engineering',
    technologies: ['Data Pipeline', 'Real-time Analytics', 'Simulation', 'Visualization'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/ParkingResearch',
    stars: 0,
    featured: false,
    updatedAt: '2024-01-22'
  },
  {
    id: 'google-takeout-data-management',
    name: 'google-takeout-data-management',
    description: 'Looking for something in your Google Takeout Data? Let me find it for you',
    category: 'Data Science & Engineering',
    technologies: ['Shell', 'Data Management', 'Google APIs', 'Data Processing'],
    language: 'Shell',
    github: 'https://github.com/gauravsurtani/google-takeout-data-management',
    stars: 0,
    featured: false,
    updatedAt: '2024-11-11'
  },
  {
    id: 'recruiter-intelligence',
    name: 'recruiter-intelligence',
    description: 'Full-stack intelligence platform with NLP entity extraction, knowledge graphs, scored rankings, and Supabase-backed data pipelines',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'React', 'TypeScript', 'NLP', 'Knowledge Graphs', 'Supabase', 'Vite', 'Tailwind CSS'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/recruiter-intelligence',
    stars: 0,
    featured: true,
    updatedAt: '2026-01-29'
  },
  {
    id: 'research-peds-walkability',
    name: 'research-peds-walkabilty',
    description: 'Research with SJSU, Dr. Ahoura and University of Sacramento for tackling walkability scores.',
    category: 'Data Science & Engineering',
    technologies: ['Python', 'Geospatial Analysis', 'Urban Planning', 'Research', 'Walkability'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/research-peds-walkabilty',
    stars: 0,
    featured: false,
    updatedAt: '2025-09-18'
  },

  // Web Development Projects
  {
    id: 'youtube-history-extension',
    name: 'youtube-history-extension',
    description: 'A way to get YouTube History bypassing the outdated YouTube API - Chrome Extension',
    category: 'Web Development',
    technologies: ['JavaScript', 'Chrome Extension API', 'Browser APIs', 'YouTube API'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/youtube-history-extension',
    stars: 0,
    featured: true,
    updatedAt: '2025-05-02'
  },
  {
    id: 'docsgpt',
    name: 'DocsGPT',
    description: 'GPT-powered chat for documentation, chat with your documents',
    category: 'Web Development',
    technologies: ['TypeScript', 'GPT', 'Documentation', 'Chat Interface'],
    language: 'TypeScript',
    github: 'https://github.com/gauravsurtani/DocsGPT',
    stars: 0,
    featured: false,
    updatedAt: '2025-05-28',
    license: 'MIT',
    forked: true
  },
  {
    id: 'opportunitylink',
    name: 'OpportunityLink',
    description: 'Opportunity Link platform with React, Node.js, Python, and MongoDB',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'Python', 'Data Mining', 'MongoDB'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/OpportunityLink',
    stars: 0,
    featured: false,
    updatedAt: '2024-05-24',
    license: 'MIT',
    forked: true
  },
  {
    id: 'gauravsurtani-github-io',
    name: 'gauravsurtani.github.io',
    description: 'Gaurav Surtani\'s Portfolio website',
    category: 'Web Development',
    technologies: ['TypeScript', 'Portfolio', 'GitHub Pages', 'Static Site', 'React', 'Next.js'],
    language: 'TypeScript',
    github: 'https://github.com/gauravsurtani/gauravsurtani.github.io',
    stars: 0,
    featured: false,
    updatedAt: '2026-09-27'
  },
  {
    id: 'deployportfolio',
    name: 'DeployPortfolio',
    description: 'Portfolio deployment and hosting setup',
    category: 'Web Development',
    technologies: ['JavaScript', 'Deployment', 'Portfolio', 'Hosting'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/DeployPortfolio',
    stars: 0,
    featured: false,
    updatedAt: '2024-01-21',
    license: 'MIT'
  },
  {
    id: 'wix-cms-nextjs-template',
    name: 'wix-cms-nextjs-template',
    description: 'Wix CMS integration with Next.js template',
    category: 'Web Development',
    technologies: ['HTML', 'Next.js', 'Wix CMS', 'Template'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/wix-cms-nextjs-template',
    stars: 0,
    featured: false,
    updatedAt: '2024-01-27',
    license: 'MIT'
  },
  {
    id: 'curehealth-gs',
    name: 'CUREHEALTH-gs',
    description: 'OHANA San Jose Research Foundation - NLP/LLM/React/Node healthcare application',
    category: 'Web Development',
    technologies: ['JavaScript', 'NLP', 'LLM', 'React', 'Node.js', 'Healthcare'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/CUREHEALTH-gs',
    stars: 0,
    featured: false,
    updatedAt: '2023-11-15',
    forked: true
  },
  {
    id: 'company-dashboard',
    name: 'company-dashboard',
    description: 'Company Stats dashboard with MongoDB and React',
    category: 'Web Development',
    technologies: ['SCSS', 'React', 'MongoDB', 'Dashboard', 'Material Design'],
    language: 'SCSS',
    github: 'https://github.com/gauravsurtani/company-dashboard',
    stars: 0,
    featured: false,
    updatedAt: '2023-09-26',
    license: 'MIT',
    forked: true
  },
  {
    id: 'experience-components',
    name: 'experience-components',
    description: 'Collection of UI components',
    category: 'Web Development',
    technologies: ['UI Components', 'React', 'Component Library', 'Design System'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/experience-components',
    stars: 0,
    featured: false,
    updatedAt: '2023-08-14'
  },

  // DevOps & Infrastructure Projects
  {
    id: 'hugo-sjsurf',
    name: 'Hugo-SJSURF',
    description: 'This is a project to explore Hugo for content management',
    category: 'DevOps & Infrastructure',
    technologies: ['HTML', 'Hugo', 'Content Management', 'Static Site Generator'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/Hugo-SJSURF',
    stars: 0,
    featured: false,
    updatedAt: '2023-12-28',
    license: 'MIT'
  },
  {
    id: 'hugo-react-docker',
    name: 'hugo-react-docker',
    description: 'Hugo Docker SJSURF - containerized Hugo and React setup',
    category: 'DevOps & Infrastructure',
    technologies: ['JavaScript', 'Hugo', 'Docker', 'React', 'DevOps'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/hugo-react-docker',
    stars: 0,
    featured: false,
    updatedAt: '2023-12-17'
  },
  {
    id: 'hugo-starter',
    name: 'Hugo-Starter',
    description: 'Using Hugo Static Website to Display Markdown Content',
    category: 'DevOps & Infrastructure',
    technologies: ['HTML', 'Hugo', 'Static Site', 'Markdown'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/Hugo-Starter',
    stars: 0,
    featured: false,
    updatedAt: '2023-11-24'
  },
  {
    id: 'hugo-react-setup',
    name: 'hugo-react-setup',
    description: 'Single Docker for 2 Website setup',
    category: 'DevOps & Infrastructure',
    technologies: ['JavaScript', 'Docker', 'Multi-site Setup', 'React'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/hugo-react-setup',
    stars: 0,
    featured: false,
    updatedAt: '2023-11-20',
    license: 'Apache License 2.0',
    forked: true,
    archived: true
  },

  // Miscellaneous/Tools Projects
  {
    id: 'introspect',
    name: 'Introspect',
    description: 'AI-powered self-reflection platform with chatbot interface, YouTube history analysis, and personalized insights for personal development',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Chatbot', 'YouTube API', 'GenAI', 'NLP', 'HTML'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/Introspect',
    stars: 0,
    featured: true,
    updatedAt: '2025-05-08',
    license: 'Other',
    forked: true
  },
  {
    id: 'leetcode-practice',
    name: 'Leetcode-practice',
    description: 'Collaborative Work on Leetcode problem solving',
    category: 'Miscellaneous',
    technologies: ['Algorithms', 'Data Structures', 'Problem Solving', 'Competitive Programming'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/Leetcode-practice',
    stars: 0,
    featured: false,
    updatedAt: '2023-09-16'
  }
];

// Project Categories for Filtering
export const PROJECT_CATEGORIES = [
  {
    id: 'all',
    name: 'All Projects',
    count: ALL_REPOSITORIES.length,
    color: 'bg-gray-100 text-gray-800',
    description: 'View all repositories'
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    count: ALL_REPOSITORIES.filter(repo => repo.category === 'AI & Machine Learning').length,
    color: 'bg-blue-100 text-blue-800',
    description: 'Machine learning, NLP, computer vision, and AI projects'
  },
  {
    id: 'data-science',
    name: 'Data Science & Engineering',
    count: ALL_REPOSITORIES.filter(repo => repo.category === 'Data Science & Engineering').length,
    color: 'bg-green-100 text-green-800',
    description: 'Data analysis, engineering pipelines, and analytics'
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    count: ALL_REPOSITORIES.filter(repo => repo.category === 'Web Development').length,
    color: 'bg-purple-100 text-purple-800',
    description: 'Web applications, APIs, and frontend/backend development'
  },
  {
    id: 'devops',
    name: 'DevOps & Infrastructure',
    count: ALL_REPOSITORIES.filter(repo => repo.category === 'DevOps & Infrastructure').length,
    color: 'bg-orange-100 text-orange-800',
    description: 'Docker, deployment, static sites, and infrastructure'
  },
  {
    id: 'tools',
    name: 'Tools & Miscellaneous',
    count: ALL_REPOSITORIES.filter(repo => repo.category === 'Miscellaneous').length,
    color: 'bg-pink-100 text-pink-800',
    description: 'Utilities, tools, and other projects'
  }
];

// Technology Tags for Advanced Filtering
export const TECHNOLOGY_TAGS = [
  // Programming Languages
  'Python', 'JavaScript', 'TypeScript', 'HTML', 'SCSS', 'Shell', 'R', 'Java', 'C++', 'C',
  // AI/ML Technologies
  'Machine Learning', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'PyTorch', 'BERT', 'SpaCY', 'Computer Vision', 'TensorFlow', 'Hugging Face Transformers', 'LangChain', 'RAG', 'Yolo v8', 'Deep Learning', 'Generative AI', 'Time Series', 'Speech Recognition', '3D Vision', 'Object Detection', 'Depth Estimation', 'ASR', 'CLIP', 'RESNET', 'LLM', 'ChatGPT API', 'Atlas', 'Scikit-learn',
  // Data Technologies
  'Jupyter Notebook', 'Data Engineering', 'Data Science', 'Data Visualization', 'Pandas', 'MongoDB', 'NumPy', 'SciPy', 'Seaborn', 'Plotly', 'GeoPandas', 'Pyproj', 'Folium', 'Beautiful-soup', 'GPS/IMU/LIDAR data', 'Oracle DB', 'Oracle Apex', 'MYSQL', 'Spring boot', 'BigQuery', 'NoSQL', 'Neo4j', 'ETL Pipelines', 'Statistical Analysis', 'Big Data', 'SQL',
  // Web Technologies
  'React', 'Node.js', 'Next.js', 'Chrome Extension API', 'Hugo', 'Angular', 'Flask', 'Tailwind CSS', 'SASS', 'Wix CMS', 'Strapi CMS', 'UI/UX Design', 'HTML5', 'CSS', 'Bootstrap/Tailwind', 'Figma', 'ReactPy', 'Rest API', 'Angular Material', 'AG-grids', 'Chart.js', 'D3.js', 'Highcharts', 'Cross-Platform Development', 'Cookie Services', 'WebXR', 'Unity Engine', 'Unreal Engine', 'C#', 'Web Technologies', 'Version Control (Git)', 'Agile Methodologies', 'Netlify', 'Vercel', 'Docker', 'Cloud Run', 'Cloud Build', 'Cloud App Engine', 'Firestore', 'Cloud Storage',
  // DevOps Technologies
  'Docker', 'GitHub Pages', 'Static Site Generator', 'CI/CD pipelines', 'Cloud Technologies (AWS, GCP, Azure)',
  // Specialized Areas
  'Healthcare', 'Recommendation Systems', 'Financial Modeling', 'Geospatial Urban Planning', 'Software Engineering', 'Product Development', 'Scrum', 'Project Management', 'Team Management', 'Accessibility Standards', 'Responsive Design', 'User Interface', 'User Experience', 'Real-time Insights', 'Outlier Detection', 'Aviation Fuel Optimization', 'Multilingual Translation', 'Sensor Fusion', 'Motion Planning', 'Automated Reporting', 'Inventory Management', 'Test Automation', 'Data Warehousing', 'IAM systems', 'Gamification'
];
