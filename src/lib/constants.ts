// Portfolio Configuration
export const PORTFOLIO_CONFIG = {
  // Personal Information
  name: 'Gaurav Surtani',
  title: 'Software Developer (AI/ML) | Full-Stack Engineer',
  bio: "I'm a hands-on, results-driven Full Stack Engineer who thrives on building software from scratch and transforming ambitious ideas into impactful products. With over 6 years of experience, I've led projects from concept to deployment, delivering scalable solutions to complex challenges. Currently, I'm deepening my expertise by pursuing a Master's degree in Artificial Intelligence to further explore the transformative power of AI and ML. My journey spans full-stack development, data science, and cloud technologies, where I've led projects that integrate cutting-edge web applications with machine learning models for real-time insights. I excel in creating intuitive, user-focused platforms, optimizing systems, and leading cross-functional teams to deliver projects on time. I'm passionate about leveraging AI to solve real-world problems and drive innovation. Whether it's optimizing operations, enhancing user experiences, or scaling data-driven solutions, I'm always ready to take on new challenges. My current interests include GenAI, LLM Agents (using LangChain), and ML applications in healthcare, finance, geospatial urban planning, and recommendation systems. If you're looking for someone who can take projects from zero to product, and is constantly exploring new technologies to create value -let's connect!",
  location: 'San Jose, California, United States',

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
    'AI Applications',
    'Open Source AI',
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
  currentWork: ['Open to Work', 'San Jose State University'],

  // Organizations
  organizations: [
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
    aiMl: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Knowledge Graphs', 'Agentic AI', 'Scikit-learn', 'Jupyter', 'GenAI', 'LLM Agents (LangChain)', 'YOLO v8', 'Computer Vision'],
    dataEngineering: ['Pandas', 'NumPy', 'Data Visualization', 'ETL Pipelines', 'Statistical Analysis', 'Big Data', 'SQL', 'MongoDB', 'GeoPandas', 'Pyproj', 'Folium', 'Neo4j'],
    webDev: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'Chrome Extensions', 'APIs', 'Angular', 'Flask', 'Tailwind CSS', 'SASS', 'Wix CMS', 'Strapi CMS', 'UI/UX Design'],
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
    repositoryCount: 31,
    organizationCount: 9,
    followerCount: 1,
    followingCount: 8,
    accountAge: 2,
  },
}

// Professional Experience Data
export const PROFESSIONAL_EXPERIENCE = [
  {
    title: 'Full Stack AI Engineer',
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
      'Founding Engineer [React/Next.js, Node.js, Python, Flask, FastAPI, GPT]',
      'AI-Powered Data Visualization Platform [ChromaDB, Gemini API, LangChain, GPT]',
      'Cross-functional team leadership (85% faster deployment) [React, Node.js, Python]',
      'Real-time data visualization (40+ users) [Plotly, D3.js, Neo4j]',
      'Async collaboration system (60% less meetings) [Next.js, TypeScript]',
      'GenAI analytics platform (95% adoption) [FastAPI, LangChain, GPT]'
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
      'Flight path analysis (Next.js/Plotly) [Python, Pyproj, Folium]',
      'Real-time visualization platform [Docker, AWS]',
      'Geospatial computations (Python) [NumPy, Pandas]',
      'Containerized microservices [Docker, Kubernetes]'
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
      'Mental health support platform (BERT/GPT-2) [React, Node.js]',
      'Sensor fusion research (YOLO v8) [Python, OpenCV]',
      'Research platform development (React/Tailwind) [TypeScript]',
      'Content management system (Wix/Strapi) [REST APIs]'
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
      'Enterprise project leadership (15+ engineers) [Angular, TypeScript]',
      'Angular migration expert (40% cost reduction) [Angular 15/16]',
      'Cloud economics platform (30% optimization) [D3.js, Highcharts]',
      'Component library architect (60% faster dev) [W3C, Storybook]'
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
      'SRE & DevOps assessment (20% overhead reduction) [Angular, Azure]',
      'Component library development (W3C standards) [TypeScript]',
      'Azure ML integration [Python, Azure Functions]',
      'Performance optimization [Angular Material, D3.js]'
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
      'Barclays data migration & ETL',
      'Batch processing optimization',
      'Data warehousing solutions',
      'ETL pipeline development'
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
      'EdTech platform development',
      'Chatbot implementation',
      'Learning management system',
      'AWS integration'
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
    description: 'Web-based introspection tool for self-reflection and personal development',
    category: 'Miscellaneous',
    technologies: ['HTML', 'Self-reflection', 'Personal Development', 'Web Tool'],
    language: 'HTML',
    github: 'https://github.com/gauravsurtani/Introspect',
    stars: 0,
    featured: false,
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
  siteDescription: 'Full-Stack AI Developer specializing in intelligent solutions, data engineering, and modern web technologies. Building the future, one algorithm at a time. Experienced in AI/ML, NLP, Knowledge Graphs, Web Development, and Cloud Technologies. Ex-NASA, currently @Bexorg and SJSU.',
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
