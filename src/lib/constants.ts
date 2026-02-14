// Portfolio Configuration
export const PORTFOLIO_CONFIG = {
  // Personal Information
  name: 'Gaurav Surtani',
  title: 'Founding AI Engineer | Growth Engineering | Full-Stack ML Systems',
  bio: "Founding AI Engineer at DeepLearning.AI building AI recruiting tools with multi-model orchestration. I thrive at the intersection of engineering and growth — building products that drive revenue, solve bottlenecks, and scale. 6+ years shipping production systems: from 0-to-1 product builds to 10x performance improvements that unlock new markets. Full-stack across AI/ML, infrastructure, and product. Track record of joining early, owning end-to-end, and directly impacting business outcomes. MS in AI from San Jose State University (May 2025). My current interests include multi-agent orchestration, GenAI, LLM Agents (using LangChain), and ML applications in recruiting, healthcare, geospatial analysis, and recommendation systems.",
  location: 'San Francisco Bay Area',

  // Contact Information
  email: 'gaurav.surtani.tech@gmail.com',

  // Social Links
  github: 'https://github.com/gauravsurtani',
  linkedin: 'https://www.linkedin.com/in/gaurav-surtani/',

  // GitHub Configuration
  githubUsername: 'gauravsurtani',

  // Current Focus & Goals
  currentFocus: [
    'Agentic AI & LLMs',
    'Speech-to-Speech Translation',
    'Deep Research Tools',
    'Full Stack Dev',
    'ML Applications'
  ],

  // Interests & Specializations
  interests: [
    'AI/ML',
    'Product Development',
    'Rapid Prototyping',
    'GenAI',
    'Agentic AI',
    'NLP',
    'Knowledge Graphs',
    'Integration',
    'Full Stack Development',
    'Data Engineering',
    'Geospatial Analysis',
    'Recommendation Systems',
    'Time Series Analysis',
    'Healthcare Analytics'
  ],
  hobbies: ['Building Chrome Extensions', 'Data Science', 'Open Source', 'Environmental ML', 'GenAI Agents', 'LLM Agents', 'Geopositional Reasonning & Planning Model Research'],

  // Current Work/Affiliations
  currentWork: ['DeepLearning.AI'],

  // Organizations
  organizations: [
    { name: 'DeepLearning.AI', color: 'bg-sky-600' },
    { name: 'Tassel', color: 'bg-emerald-600' },
    { name: 'Bexorg', color: 'bg-blue-600' },
    { name: 'NASA', color: 'bg-red-600' },
    { name: 'San Jose State University', color: 'bg-green-600' },
    { name: 'Spatial Analytics & Visualization Institute(SAVI)', color: 'bg-teal-600' },
    { name: 'Ascendion', color: 'bg-purple-600' },
    { name: 'Collabera', color: 'bg-yellow-600' },
    { name: 'LIBS', color: 'bg-indigo-600' },
    { name: 'Accenture', color: 'bg-pink-600' },
    { name: 'Enthralltech', color: 'bg-orange-600' },
  ],

  // API Configuration
  api: {
    cacheTimeMs: 5 * 60 * 1000, // 5 minutes
    retryCount: 3,
    timeoutMs: 10000, // 10 seconds
  },

  // Featured Skills
  skills: {
    aiMl: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'Scikit-learn', 'GenAI', 'LLM Agents (LangChain)', 'YOLO v8', 'Computer Vision'],
    dataEngineering: ['Pandas', 'NumPy', 'Data Visualization', 'ETL Pipelines', 'Statistical Analysis', 'SQL', 'MongoDB', 'Neo4j', 'BigQuery', 'Plotly'],
    webDev: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Angular', 'Flask', 'Tailwind CSS', 'Chrome Extensions', 'REST APIs'],
    devOpsCloud: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Git', 'Microservices'],
  },

  // Skill Levels for Progress Bars
  skillLevels: [
    { skill: 'Python & Data Science', level: 90 },
    { skill: 'JavaScript/TypeScript', level: 85 },
    { skill: 'Machine Learning & NLP', level: 85 },
    { skill: 'React/Next.js', level: 80 },
    { skill: 'Data Engineering', level: 80 },
    { skill: 'Knowledge Graphs & AI', level: 75 }
  ],

  // Fallback Values (used when API fails)
  fallbackStats: {
    repositoryCount: 50,
    organizationCount: 9,
    followerCount: 1,
    followingCount: 8,
    accountAge: 3,
  },
}

// Professional Experience Data
export const PROFESSIONAL_EXPERIENCE = [
  {
    title: 'Founding AI Engineer',
    company: 'DeepLearning.AI',
    period: 'September 2025 - Present',
    location: 'San Francisco Bay Area',
    type: 'Development',
    skills: [
      'Claude API', 'Tavily', 'OpenRouter', 'Vector DB', 'LangChain',
      'React', 'Python', 'Flask', 'Multi-Agent Orchestration',
      'Semantic Search', 'Vector Embeddings', 'Data Pipelines'
    ],
    achievements: [
      'Building AI-native recruiting platform for open-world candidate sourcing [Claude API, Tavily, OpenRouter]',
      'Architecting data pipelines across multiple sources (LinkedIn, GitHub, company databases) from scratch [Python, Flask]',
      'Developing intelligent search with vector embeddings and semantic ranking [Vector DB, LangChain]',
      'Implementing multi-agent orchestration for deep candidate research and profile enrichment [Claude API, OpenRouter]',
      'Delivering full-stack application to pilot recruiters; iterating on product based on direct user feedback [React]'
    ],
    projects: [
      {
        name: 'AI Recruiting Platform',
        description: 'AI-native recruiting platform for open-world candidate sourcing with multi-model orchestration',
        achievements: [
          'Architected data pipelines across multiple sources (LinkedIn, GitHub, company databases) from scratch',
          'Developed intelligent search with vector embeddings and semantic ranking to identify high-value companies and surface qualified candidates',
          'Implemented multi-agent orchestration (Claude, Tavily, OpenRouter) for deep candidate research and profile enrichment',
          'Delivered full-stack application to pilot recruiters; iterating on product based on direct user feedback'
        ]
      }
    ]
  },
  {
    title: 'Full Stack AI Engineer, Growth',
    company: 'Tassel',
    period: 'June 2025 - September 2025',
    location: 'United States',
    type: 'Development',
    skills: [
      'Azure', 'Voice AI', 'TTS', 'FFmpeg', 'Python',
      'Video Processing', 'Infrastructure', 'Cost Optimization'
    ],
    achievements: [
      'Built video pipeline that ingests graduation ceremonies, segments by student, and delivers personalized clips to 2M+ students — $8M+ revenue opportunity [FFmpeg, Python]',
      'Developed AI pronunciation system to fix TTS accuracy for student name announcements across Voice AI applications [Voice AI, TTS]',
      'Architected Azure infrastructure; migrated always-on to on-demand scaling for heavy pipelines — cut costs 40%, processing 8x faster [Azure]'
    ],
    projects: [
      {
        name: 'Graduation Video Pipeline',
        description: 'AI-powered video pipeline for personalized graduation ceremony clips at scale',
        achievements: [
          'Built video pipeline that ingests graduation ceremonies, segments by student, and delivers personalized clips to 2M+ students',
          'Developed AI pronunciation system to fix TTS accuracy for student name announcements',
          'Architected Azure infrastructure; migrated always-on to on-demand scaling — cut costs 40%, processing 8x faster',
          '$8M+ revenue opportunity from personalized video delivery'
        ]
      }
    ]
  },
  {
    title: 'Full Stack AI Engineer, Growth',
    company: 'Bexorg, Inc.',
    period: 'May 2024 - May 2025',
    location: 'New Haven, Connecticut, United States',
    type: 'Development',
    skills: [
      'React', 'Node.js', 'Python', 'FastAPI', 'LangChain', 'GPT',
      'Next.js', 'TypeScript', 'Plotly', 'D3.js', 'Neo4j', 'BigQuery',
      'Docker', 'Kubernetes', 'REST APIs', 'GraphQL', 'Tailwind CSS'
    ],
    achievements: [
      'Solved critical pipeline bottlenecks: 10x throughput improvement enabling new enterprise customer acquisition [React, Node.js, Python]',
      'Built GenAI analytics platform with NL querying — key differentiator for sales; 99.9% uptime converted pilots to contracts [FastAPI, LangChain, GPT]',
      'Applied AI/ML/NLP expertise: anomaly detection, NLP extraction, CV for medical imaging [ChromaDB, Gemini API]',
      'Implemented graph-based data layer with GNNs, reducing query times 5x for real-time analytics [Neo4j, BigQuery]'
    ],
    projects: [
      {
        name: 'Interactive Data Viewer',
        description: 'Real-time data visualization platform using Plotly, Flask, Neo4j Aura, and BigQuery',
        achievements: [
          'Engineered scalable data pipeline with graph visualization (vis.js), enabling real-time exploration of complex relationships',
          'Architected unified data access layer reducing retrieval time by 45% through optimized graph algorithms',
          'Designed interactive dashboards with real-time updates, improving data analysis efficiency by 60%',
          'Implemented role-based access control and audit logging, ensuring secure access for 40+ users across departments'
        ]
      },
      {
        name: 'Team Collaboration Calendar',
        description: 'Async communication and experiment scheduling system',
        achievements: [
          'Developed async-first calendar system reducing experiment deployment time by 85% (7 days → 3-4 hours)',
          'Built automated scheduling engine reducing 1:1 meetings by 60% while maintaining team alignment',
          'Created real-time experiment tracking system with automated status updates and notifications',
          'Integrated with existing tools (Slack, Jira) enabling seamless workflow for cross-functional teams'
        ]
      },
      {
        name: 'Time Series Analysis & QC',
        description: 'ML-powered time series analysis and quality control system',
        achievements: [
          'Developed ML-powered QC system with real-time anomaly detection, reducing data issues by 70%',
          'Built specialized visualization engine for time series data, accelerating pattern identification by 55%',
          'Implemented automated alert system with severity-based routing, reducing response time by 80%',
          'Created quantitative QC scoring system enabling data-driven quality assessment and trend analysis'
        ]
      },
      {
        name: 'GenAI Query Canvas',
        description: 'Natural language to visualization pipeline using GenAI',
        achievements: [
          'Built GenAI-powered query interface reducing data analysis time by 75% through natural language processing',
          'Developed automated visualization pipeline (Plotly & D3) with dynamic chart selection and customization',
          'Implemented feedback-based learning system improving query accuracy by 40% over time',
          'Created end-to-end pipeline from natural language to interactive dashboards, enabling self-service analytics'
        ]
      }
    ]
  },
  {
    title: 'Machine Learning Developer',
    company: 'NASA Ames Research Center',
    period: 'December 2023 - March 2024',
    location: 'Mountain View, California, United States',
    type: 'Research',
    skills: [
      'Python', 'Pyproj', 'Folium', 'Next.js', 'Plotly',
      'Docker', 'AWS', 'NumPy', 'Pandas', 'Kubernetes',
      'Geospatial Analysis', 'Data Visualization', 'Microservices'
    ],
    achievements: [
      'Performed spatial analysis of flight path adherence to ATC procedures [Python, Pyproj, GeoPandas]',
      'Built interactive visualization dashboards for airspace data analysis [Folium, Leaflet.js, Plotly]',
      'Identified navigational patterns enabling aviation fuel cost optimization [NumPy, Pandas]',
      'Containerized legacy flight analysis system, reducing setup time from days to minutes [Docker]'
    ],
    projects: [
      {
        name: 'Flight Path Optimization System',
        description: 'ML-powered flight path analysis and adherence checks using Python, Pyproj, Xmitree and Folium',
        achievements: [
          'Engineered coordinate transformation pipeline converting flight paths from lat/long to cartesian coordinates using Pyproj, enabling web-based visualization on Folium maps',
          'Containerized legacy flight analysis system onto Folium map containers, reducing setup time from days to minutes for new researchers',
          'Developed and deployed time series viewing component for flight paths, enabling real-time analysis of flight path adherence',
          'Automated data validation pipeline over 1000+ flight paths, reducing manual verification time from 4 hours to 15 minutes per analysis',
        ]
      }
    ]
  },
  {
    title: 'Graduate Research Assistant',
    company: 'San Jose State University',
    period: 'July 2023 - February 2024',
    location: 'San Jose, California, United States',
    type: 'Research & Development',
    skills: [
      'React', 'Node.js', 'BERT', 'GPT-2', 'YOLO v8',
      'Python', 'OpenCV', 'TypeScript', 'Tailwind CSS',
      'Wix CMS', 'Strapi', 'REST APIs', 'Machine Learning'
    ],
    achievements: [
      'Spatial Analytics: ML models on spatial datasets; EDA with R (dplyr, ggplot2), hypothesis testing [Python, R]',
      'Motion Planning: Sensor fusion (camera + LiDAR) using KITTI; YOLO v8 object detection [Python, OpenCV]',
      'Built multilingual NLP translation system (1-to-25 languages) with LangChain and HuggingFace [NLP, LangChain]',
      'Mental health support platform (BERT/GPT-2) for hurricane relief in Hawaii [React, Node.js]'
    ],
    projects: [
      {
        name: 'Sensor Fusion & Motion Planning',
        description: 'Advanced sensor fusion and motion planning system',
        achievements: [
          'Researched and implemented real-time sensor fusion pipeline combining LiDAR and camera data from KITTI dataset',
          'Enhanced normalization techniques filtering non-critical data, improving object detection accuracy',
          'Recreated and improved YOLO v8 integration with LiDAR data for precise 3D bounding box generation',
          'Developed multi-dimensional representation system for motion planning using fused sensor data'
        ]
      },
      {
        name: 'OHANA Mental Health Support',
        description: 'Web application for hurricane relief and mental health support',
        achievements: [
          'Built React-based web application for mental health support and emergency resource location in Hawaii',
          'Implemented BERT and GPT-2 models trained on mental health data for emotional support and crisis response',
          'Developed geolocation feature to help users find nearest mental health centers and hospitals',
          'Created interactive interface for mental health Q&A using transformer models fine-tuned on mental health data'
        ]
      },
      {
        name: 'Multilingual TTS Research',
        description: 'Research and evaluation of multilingual TTS systems',
        achievements: [
          'Researched and evaluated TTS systems supporting 25+ languages using Coqui TTS and Firefox voice synthesis',
          'Developed prototype interface for testing and comparing different TTS implementations',
          'Created evaluation framework for assessing voice quality and language support across different TTS systems'
        ]
      }
    ]
  },
  {
    title: 'Senior Software Engineer',
    company: 'Ascendion',
    period: 'November 2022 - August 2023',
    location: 'Basking Ridge, New Jersey, United States',
    type: 'Development',
    skills: [
      'Angular', 'TypeScript', 'Angular 15/16', 'D3.js',
      'Highcharts', 'W3C', 'Storybook', 'Azure',
      'DevOps', 'CI/CD', 'Component Architecture', 'JavaScript', 'Microservices', 'Spring Boot', 'Microservices'
    ],
    achievements: [
      'Architected data visualization system processing 10M+ records for enterprise dashboards [Angular, TypeScript]',
      'Mentored 20 engineers; conducted 500+ code reviews improving team code quality by 35% [Angular 15/16]',
      'Reduced page load times by 85% (23s to 2.5s) through lazy loading and pagination [D3.js, Highcharts]',
      'Integrated OpenAI ChatGPT into VS Code extension, boosting developer productivity 25% [OpenAI, Node.js]'
    ],
    projects: [
      {
        name: 'Enterprise Angular Migration',
        description: 'Large-scale Angular framework upgrade and modernization',
        achievements: [
          'Led migration from AngularJS to Angular 15 for legacy systems, improving performance and maintainability',
          'Upgraded enterprise applications from Angular 13 to Angular 16, implementing modern features and best practices',
          'Created comprehensive migration documentation and automated testing suite ensuring zero regression',
          'Implemented modern Angular features (standalone components, signals) reducing bundle size by 35%'
        ]
      },
      {
        name: 'Cloud Economics Platform',
        description: 'Real-time cloud resource monitoring and cost optimization platform',
        achievements: [
          'Developed interactive dashboards using D3.js and Highcharts for real-time VM usage and cost analytics',
          'Implemented automated cost optimization recommendations reducing cloud spending by 30%',
          'Created REST API integration with AWS & Azure for real-time resource monitoring',
          'Built polling system for continuous data updates ensuring accurate cost tracking'
        ]
      },
      {
        name: 'AI-Powered Code Quality Tool',
        description: 'VS Code extension integrating ChatGPT for automated code review and quality checks',
        achievements: [
          'Developed VS Code extension integrating ChatGPT API for automated code review',
          'Implemented custom rules engine for code quality assessment and improvement suggestions',
          'Created automated documentation generation reducing manual documentation time by 70%',
          'Built feedback loop system improving suggestion accuracy over time'
        ]
      },
      {
        name: 'Enterprise Component Library',
        description: 'W3C-compliant reusable component library for enterprise applications',
        achievements: [
          'Architected comprehensive component library following W3C accessibility standards',
          'Implemented 40+ reusable components reducing development time by 60%',
          'Created detailed documentation and usage examples for 20+ team members',
          'Developed automated testing suite ensuring 95% code coverage'
        ]
      },
      {
        name: 'Performance Optimization',
        description: 'Enterprise application performance optimization and modernization',
        achievements: [
          'Reduced page load times from 23s to 2.5s through UI improvements and pagination',
          'Implemented efficient data loading strategies reducing API response times by 75%',
          'Optimized Angular Material and D3.js implementations for better performance',
          'Created performance monitoring dashboard for real-time metrics tracking'
        ]
      }
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Collabera Inc.',
    period: 'December 2021 - December 2022',
    location: 'Basking Ridge, New Jersey, United States',
    type: 'Development',
    skills: [
      'Angular', 'Azure', 'TypeScript', 'Python',
      'Azure Functions', 'Angular Material', 'D3.js',
      'W3C Standards', 'DevOps', 'SRE'
    ],
    achievements: [
      'Built executive dashboards with D3.js/Highcharts, increasing decision-making speed by 75% [D3.js, Highcharts]',
      'Engineered reusable Angular component library (50+ components) with WCAG 2.1 compliance [Angular, TypeScript]',
      'Developed Azure-integrated ML workflow app, automating 80% of manual data processes [Azure, Python]',
      'Awarded Employee of the Quarter for delivering 3 cross-functional projects ahead of schedule [Angular Material]'
    ],
    projects: [
      {
        name: 'SRE & DevOps Enterprise Assessment Tool',
        description: 'Automated assessment and monitoring platform',
        achievements: [
          'Developed Angular Framework-driven assessment tool for Site Reliability & DevOps',
          'Implemented automated monitoring and alerting system using Azure Functions',
          'Created real-time dashboards for system health and performance metrics',
          'Built automated reporting system for operational metrics and KPIs'
        ]
      },
      {
        name: 'Enterprise Component Library',
        description: 'W3C-compliant reusable component library',
        achievements: [
          'Engineered comprehensive Angular component library following W3C accessibility standards',
          'Developed 30+ reusable components for forms, tables, and data visualization',
          'Created detailed documentation and usage examples for development team',
          'Implemented automated testing suite ensuring 95% code coverage'
        ]
      },
      {
        name: 'Azure Monitoring Integration',
        description: 'Machine learning workflow integration with Azure',
        achievements: [
          'Built web application for Azure Backend with integrated machine-learning workflows',
          'Implemented real-time data synchronization between frontend and Azure services',
          'Developed automated data processing pipeline using Azure Functions',
          'Created comprehensive error handling and logging system using Application Insights'
        ]
      }
    ]
  },
  {
    title: 'Software Developer',
    company: 'LIBS',
    period: 'January 2021 - November 2021',
    location: 'Cotonou, Littoral, Benin',
    type: 'Development',
    skills: [
      'Angular', 'TypeScript', 'AWS EC2', 'REST APIs',
      'Database Design', 'Security', 'Team Leadership',
      'Inventory Management', 'Sales Systems'
    ],
    achievements: [
      'Client-facing warehouse & sales system',
      'Multi-country inventory management',
      'Production team leadership',
      'EC2 deployment & security'
    ],
    projects: [
      {
        name: 'Warehouse and Sales Management System',
        description: 'Comprehensive inventory, sales, and production management platform',
        achievements: [
          'Developed real-time inventory tracking system with dynamic stock level monitoring',
          'Engineered sales tracking system supporting multiple currencies and languages',
          'Led production team of 10+ engineers ensuring timely delivery of products',
          'Deployed application on Amazon EC2 with enhanced security across West Africa'
        ]
      }
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Accenture',
    period: 'October 2018 - December 2020',
    location: 'Pune, Maharashtra, India',
    type: 'Development',
    skills: [
      'Informatica', 'Abinitio', 'Unix', 'MS-VBA',
      'Python', 'Node.js', 'NoSQL', 'ETL',
      'Data Warehousing', 'Batch Processing', 'SQL',
      'Oracle DB', 'Postman', 'AWS'
    ],
    achievements: [
      'Resolved critical ETL validation issues processing 5M+ daily records with zero data loss [Informatica, Abinitio]',
      'Built automation scripts reducing manual reporting effort by 70% (40hrs to 12hrs/week) [Python, Unix]',
      'Led production data analysis enabling 3-month early readiness for system switchover [SQL, Oracle DB]'
    ],
    projects: [
      {
        name: 'Barclays - Data Migration & ETL',
        description: 'Enterprise data migration and ETL pipeline development for Barclays',
        achievements: [
          'Developed ETL pipelines using Informatica and Abinitio',
          'Optimized batch processing and data workflows',
          'Implemented data validation and quality checks',
          'Created automated monitoring and reporting system'
        ]
      }
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'Enthralltech Private Limited',
    period: 'May 2018 - October 2018',
    location: 'Pune Area, India',
    type: 'Development',
    skills: [
      'Angular', 'MongoDB', '.NET', 'AWS',
      'NoSQL', 'Chatbot Development', 'REST APIs',
      'E-learning Platforms', 'IAM Systems'
    ],
    achievements: [
      'Built e-learning platform features serving 10K+ students using MongoDB and Angular [Angular, MongoDB]',
      'Developed chatbot reducing support tickets by 40% through automated query resolution [.NET, NoSQL]'
    ],
    projects: [
      {
        name: 'E-Learning Platform & Chatbot',
        description: 'Development of e-learning platform with intelligent chatbot for educational support',
        achievements: [
          'Built e-learning platform using Angular and MongoDB',
          'Developed chatbot using NoSQL for educational Q&A',
          'Implemented IAM system for user authentication',
          'Integrated AWS services for content delivery'
        ]
      }
    ]
  }
];

// Education Data
export const EDUCATION = [
  {
    degree: 'Master of Science, Artificial Intelligence',
    school: 'San Jose State University',
    period: 'August 2023 - May 2025',
    location: 'San Jose, CA',
    gpa: 'N/A',
    coursework: [
      'Advanced Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'AI Ethics',
      'Knowledge Representation and Reasoning'
    ],
    achievements: [
      'Relevant Research Projects (e.g., Geospatial Analysis, Motion Planning)'
    ]
  },
  {
    degree: 'Bachelor of Engineering - BE, Information Technology',
    school: 'Sinhgad Academy Of Engineering (Pune University)',
    period: '2014 - 2018',
    location: 'Pune, Maharashtra, India',
    gpa: 'N/A',
    coursework: [
      // Add relevant coursework if available
    ],
    achievements: [
      // Add any academic achievements
    ]
  }
];

// Certifications and Awards
export const CERTIFICATIONS = [
  {
    name: 'The Complete Python Bootcamp From Zero to Hero in Python',
    issuer: 'Udemy',
    date: 'N/A',
    details: []
  },
  {
    name: 'AMCAT Certified Data Processing Specialist',
    issuer: 'AMCAT',
    date: 'N/A',
    details: []
  },
  {
    name: 'Ethics in the Age of Generative AI',
    issuer: 'LinkedIn Learning',
    date: 'N/A',
    details: []
  },
  {
    name: 'Streamlining Your Work with Microsoft Bing Chat',
    issuer: 'LinkedIn Learning',
    date: 'N/A',
    details: []
  },
  {
    name: 'Generative AI: The Evolution of Thoughtful Online Search',
    issuer: 'LinkedIn Learning',
    date: 'N/A',
    details: []
  },
  {
    name: 'Neo4j Certifications in Graph DB Fundamentals and Advanced Topics',
    issuer: 'Neo4j',
    date: 'N/A',
    details: ['Leveraged skills to manage and analyze complex data structures.']
  },
  {
    name: 'Employee of the Quarter Award',
    issuer: 'Collabera Inc.',
    date: 'N/A',
    details: ['Praised for multitasking abilities across projects.']
  }
];

// Complete Repository Data with Categories and Technologies
export const ALL_REPOSITORIES = [
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
    description: 'Scrapy, WebScaping, XML Parsing, ChatGPT API usage, BERT, SpaCY, ATLAS, LLM\'s in NLP and Visual Similarity Detection',
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
    description: 'Pytorch implementation of Noisy Student Training for Automatic Speech Recognition and Automatic Pronunciation Error Detection',
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
    description: 'A interactive project made to explore RAG\'s LLM\'s and Knowledge Graph Modelling',
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
    id: 'tech-blog-catchup',
    name: 'tech-blog-catchup',
    description: 'Who has time these days to read technical blogs from multiple sources; sit back and relax; hear them in the car while you travel.',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Text-to-Speech', 'RSS', 'Blog Aggregation', 'Automation'],
    language: 'Python',
    github: 'https://github.com/gauravsurtani/tech-blog-catchup',
    stars: 0,
    featured: true,
    updatedAt: '2026-02-13'
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
    featured: false,
    updatedAt: '2026-02-13',
    forked: true
  },
  {
    id: 'groq-deep-research',
    name: 'groq-deep-research',
    description: 'Lightning fast deep research app powered by Compound-beta on Groq!',
    category: 'AI & Machine Learning',
    technologies: ['JavaScript', 'Groq', 'Deep Research', 'AI', 'LLM'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/groq-deep-research',
    homepage: 'https://deep-research-fast.vercel.app',
    stars: 0,
    featured: true,
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
    description: 'Using Simplify and H1B grader data to find interesting trend in Job\'s over the years',
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
    description: 'Full-stack recruiting intelligence platform with NLP entity extraction, knowledge graphs, scored company/candidate rankings, and Supabase-backed data pipelines',
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
    description: 'A sneaky way to get Youtube History bypassing the outdated Youtube API - Chrome Extension',
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
    technologies: ['JavaScript', 'Portfolio', 'GitHub Pages', 'Static Site', 'React', 'Next.js'],
    language: 'JavaScript',
    github: 'https://github.com/gauravsurtani/gauravsurtani.github.io',
    stars: 0,
    featured: false,
    updatedAt: '2024-01-21'
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
    description: 'Collection of high-quality, customizable, and versatile UI components',
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
    description: 'This is a project created to Explore Hugo for content-management',
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
    id: 'gauravsurtani-profile',
    name: 'gauravsurtani',
    description: 'Welcome to my Github portfolio - Profile README',
    category: 'Miscellaneous',
    technologies: ['Profile', 'README', 'Portfolio', 'GitHub'],
    language: 'Markdown',
    github: 'https://github.com/gauravsurtani/gauravsurtani',
    stars: 0,
    featured: false,
    updatedAt: '2025-05-28'
  },
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

export const FEATURED_PROJECTS = [
  'email-link',
  'recruiter-intelligence',
  'introspect',
  'im-watching-you',
  'tech-blog-catchup',
  'groq-deep-research',
  'wat-to-eat',
  'company-stats',
  'fire-prediction',
  'youtube-history-extension',
  'natural-language-processing',
  'knowledgegraph-llm-exploration',
  '3ddepth',
  'LiDAR-Camera---Depth-Estimation',
  'ParkingResearch',
  'hugo-react-docker',
  'CUREHEALTH-gs'
];

// SEO and Meta Configuration
export const SEO_CONFIG = {
  siteName: 'Gaurav Surtani Portfolio',
  siteDescription: 'Founding AI Engineer at DeepLearning.AI. Full-Stack AI Developer specializing in multi-agent orchestration, growth engineering, and ML systems. MS AI from SJSU. Ex-Tassel, Ex-Bexorg, Ex-NASA.',
  siteUrl: 'https://gauravsurtani.dev',
  author: 'Gaurav Surtani',
  keywords: [
    'Full-Stack Developer',
    'AI Developer',
    'Machine Learning',
    'Data Engineering',
    'NLP',
    'Knowledge Graphs',
    'Agentic AI',
    'React',
    'Python',
    'Next.js',
    'NASA',
    'SJSU',
    'Bexorg',
    'JavaScript',
    'TypeScript',
    'Cloud Technologies',
    'GCP',
    'AWS',
    'Azure',
    'GenAI',
    'LLM Agents',
    'Geospatial Analysis',
    'Recommendation Systems',
    'Healthcare Analytics',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'DevOps',
    'CI/CD',
    'Computer Vision',
    'Time Series Analysis'
  ],
}
