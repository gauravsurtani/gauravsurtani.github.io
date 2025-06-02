'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SiPython, SiTensorflow, SiPytorch, SiNumpy, SiPandas, 
  SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, 
  SiTailwindcss, SiAngular, SiFlask, SiMongodb, 
  SiNeo4J, SiAkiflow, SiLangchain,
  SiScikitlearn, SiDocker,
  SiKubernetes, SiGit, SiGithub, SiJira
} from 'react-icons/si'
import { FaBrain, FaDatabase, FaChartLine, FaCode, FaEye } from 'react-icons/fa'

interface Skill {
  name: string
  icon: React.ReactNode
  description: string
  category: 'AI & ML' | 'Data Engineering' | 'Web Development'
}

const skills: Record<string, Skill[]> = {
  'AI & ML': [
    { name: 'Python', icon: <SiPython className="w-8 h-8" />, description: 'Advanced Python programming and AI development', category: 'AI & ML' },
    { name: 'TensorFlow', icon: <SiTensorflow className="w-8 h-8" />, description: 'Deep learning and neural network development', category: 'AI & ML' },
    { name: 'PyTorch', icon: <SiPytorch className="w-8 h-8" />, description: 'Deep learning framework and model development', category: 'AI & ML' },
    { name: 'NLP', icon: <FaBrain className="w-8 h-8" />, description: 'Natural Language Processing and text analysis', category: 'AI & ML' },
    { name: 'Knowledge Graphs', icon: <SiNeo4J className="w-8 h-8" />, description: 'Graph-based knowledge representation', category: 'AI & ML' },
    { name: 'Agentic AI', icon: <FaCode className="w-8 h-8" />, description: 'Autonomous AI agent development', category: 'AI & ML' },
    { name: 'Scikit-learn', icon: <SiScikitlearn className="w-8 h-8" />, description: 'Machine learning algorithms and data analysis', category: 'AI & ML' },
    { name: 'GenAI', icon: <FaBrain className="w-8 h-8" />, description: 'Generative AI and creative applications', category: 'AI & ML' },
    { name: 'LangChain', icon: <SiLangchain className="w-8 h-8" />, description: 'LLM application development and orchestration', category: 'AI & ML' },
    { name: 'YOLO v8', icon: <FaEye className="w-8 h-8" />, description: 'Real-time object detection and computer vision', category: 'AI & ML' },
  ],
  'Data Engineering': [
    { name: 'Pandas', icon: <SiPandas className="w-8 h-8" />, description: 'Data manipulation and analysis', category: 'Data Engineering' },
    { name: 'NumPy', icon: <SiNumpy className="w-8 h-8" />, description: 'Numerical computing and array operations', category: 'Data Engineering' },
    { name: 'Data Viz', icon: <FaChartLine className="w-8 h-8" />, description: 'Data visualization and insights', category: 'Data Engineering' },
    { name: 'ETL', icon: <SiAkiflow className="w-8 h-8" />, description: 'Data pipeline development and automation', category: 'Data Engineering' },
    { name: 'SQL', icon: <FaDatabase className="w-8 h-8" />, description: 'Database design and optimization', category: 'Data Engineering' },
    { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8" />, description: 'NoSQL database management', category: 'Data Engineering' },
    { name: 'Neo4j', icon: <SiNeo4J className="w-8 h-8" />, description: 'Graph database management', category: 'Data Engineering' },
  ],
  'Web Development': [
    { name: 'React', icon: <SiReact className="w-8 h-8" />, description: 'Frontend development and component architecture', category: 'Web Development' },
    { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" />, description: 'Type-safe JavaScript development', category: 'Web Development' },
    { name: 'Next.js', icon: <SiNextdotjs className="w-8 h-8" />, description: 'Full-stack React framework', category: 'Web Development' },
    { name: 'Node.js', icon: <SiNodedotjs className="w-8 h-8" />, description: 'Server-side JavaScript development', category: 'Web Development' },
    { name: 'Tailwind', icon: <SiTailwindcss className="w-8 h-8" />, description: 'Utility-first CSS framework', category: 'Web Development' },
    { name: 'Angular', icon: <SiAngular className="w-8 h-8" />, description: 'Enterprise web applications', category: 'Web Development' },
    { name: 'Flask', icon: <SiFlask className="w-8 h-8" />, description: 'Python web framework', category: 'Web Development' },
    { name: 'UI/UX', icon: <FaCode className="w-8 h-8" />, description: 'User interface and experience design', category: 'Web Development' },
  ]
}

const SkillsSlider = () => {
  const [showAllSkills, setShowAllSkills] = useState(false)

  return (
    <div className="w-full space-y-8">
      {Object.entries(skills).map(([category, categorySkills]) => (
        <div key={category} className="w-full overflow-hidden">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{category}</h3>
          <div className="relative w-full py-4">
            <div className="flex animate-scroll space-x-6">
              {/* First set of skills */}
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-original-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center min-w-[120px] p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="text-gray-700 dark:text-gray-300 mb-2">{skill.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-duplicate-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center min-w-[120px] p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="text-gray-700 dark:text-gray-300 mb-2">{skill.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Show More Button */}
      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAllSkills(true)}
          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          Show All Skills
        </motion.button>
      </div>

      {/* All Skills Modal */}
      <AnimatePresence>
        {showAllSkills && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowAllSkills(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Skills</h2>
                <button
                  onClick={() => setShowAllSkills(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-8">
                {Object.entries(skills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categorySkills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div className="text-gray-700 dark:text-gray-300 mb-2">{skill.icon}</div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center line-clamp-2">
                            {skill.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SkillsSlider 