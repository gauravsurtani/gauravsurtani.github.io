'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '@/lib/constants'
import {
  SiPython, SiTensorflow, SiPytorch, SiNumpy, SiPandas,
  SiReact, SiTypescript, SiNextdotjs, SiNodedotjs,
  SiTailwindcss, SiAngular, SiFlask, SiMongodb,
  SiNeo4J, SiLangchain, SiScikitlearn,
  SiDocker, SiKubernetes, SiGit
} from 'react-icons/si'
import { FaBrain, FaDatabase, FaChartLine, FaCode, FaEye, FaCloud, FaServer, FaCog } from 'react-icons/fa'

const SKILL_ICONS: Record<string, React.ReactNode> = {
  'Python': <SiPython />,
  'TensorFlow': <SiTensorflow />,
  'PyTorch': <SiPytorch />,
  'NLP': <FaBrain />,
  'Knowledge Graphs': <SiNeo4J />,
  'Agentic AI': <FaBrain />,
  'Scikit-learn': <SiScikitlearn />,
  'GenAI': <FaBrain />,
  'LLM Agents (LangChain)': <SiLangchain />,
  'YOLO v8': <FaEye />,
  'Computer Vision': <FaEye />,
  'Pandas': <SiPandas />,
  'NumPy': <SiNumpy />,
  'Data Visualization': <FaChartLine />,
  'ETL Pipelines': <FaDatabase />,
  'Statistical Analysis': <FaChartLine />,
  'SQL': <FaDatabase />,
  'MongoDB': <SiMongodb />,
  'Neo4j': <SiNeo4J />,
  'BigQuery': <FaDatabase />,
  'Plotly': <FaChartLine />,
  'JavaScript': <FaCode />,
  'TypeScript': <SiTypescript />,
  'React': <SiReact />,
  'Next.js': <SiNextdotjs />,
  'Node.js': <SiNodedotjs />,
  'Angular': <SiAngular />,
  'Flask': <SiFlask />,
  'Tailwind CSS': <SiTailwindcss />,
  'Chrome Extensions': <FaCode />,
  'REST APIs': <FaServer />,
  'Docker': <SiDocker />,
  'Kubernetes': <SiKubernetes />,
  'AWS': <FaCloud />,
  'Azure': <FaCloud />,
  'GCP': <FaCloud />,
  'CI/CD': <FaCog />,
  'Git': <SiGit />,
  'Microservices': <FaServer />,
}

interface CategoryConfig {
  key: string
  label: string
  tagClass: string
  icon: React.ReactNode
  gradientClass: string
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'aiMl',
    label: 'AI & Machine Learning',
    tagClass: 'tag-blue',
    icon: <FaBrain className="w-5 h-5" />,
    gradientClass: 'gradient-bar-blue'
  },
  {
    key: 'dataEngineering',
    label: 'Data Engineering',
    tagClass: 'tag-green',
    icon: <FaDatabase className="w-5 h-5" />,
    gradientClass: 'gradient-bar-emerald'
  },
  {
    key: 'webDev',
    label: 'Web Development',
    tagClass: 'tag-violet',
    icon: <FaCode className="w-5 h-5" />,
    gradientClass: 'gradient-bar-violet'
  },
  {
    key: 'devOpsCloud',
    label: 'DevOps & Cloud',
    tagClass: 'tag-amber',
    icon: <FaCloud className="w-5 h-5" />,
    gradientClass: 'gradient-bar-amber'
  },
]

const SkillsSlider = () => {
  const skills = PORTFOLIO_CONFIG.skills as Record<string, string[]>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CATEGORIES.map((cat, catIndex) => {
        const categorySkills = skills[cat.key] || []

        return (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            className="card overflow-hidden"
          >
            {/* Gradient Accent Bar */}
            <div className={`h-1 ${cat.gradientClass}`} />

            <div className="p-6">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-accent">{cat.icon}</span>
                  <h3 className="text-lg font-semibold">{cat.label}</h3>
                </div>
                <span className="text-xs text-muted-foreground font-mono tabular-nums">
                  {categorySkills.length}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.05 + i * 0.02, duration: 0.3 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className={`${cat.tagClass} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-default`}
                  >
                    {SKILL_ICONS[skill] && (
                      <span className="text-xs opacity-60">{SKILL_ICONS[skill]}</span>
                    )}
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default SkillsSlider
