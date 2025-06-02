'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)

  // Handle initial mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect and section tracking
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Find the current active section
      const sections = ['home', 'about', 'projects', 'experience', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  const navItems = [
    { name: 'Home', path: '/', sectionId: 'home' },
    { name: 'About', path: '/about', sectionId: 'about' },
    { name: 'Experience', path: '/experience', sectionId: 'experience' },
    { name: 'Projects', path: '/projects', sectionId: 'projects' },
    { name: 'Contact', path: '/contact', sectionId: 'contact' },
  ]

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Add offset for the navbar
      const navHeight = 80 // Approximate height of navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      setIsMobileMenuOpen(false)
      setActiveSection(sectionId)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <nav className={`nav-container ${isScrolled ? 'nav-container-scrolled' : 'nav-container-default'}`}>
      <div className="nav-content">
        <div className="nav-header">
          {/* Logo/Brand */}
          <button 
            onClick={() => handleSectionClick('home')}
            className="nav-brand"
          >
            GS
          </button>

          {/* Navigation Items */}
          <div className="nav-items">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId
              return (
                <button
                  key={item.path}
                  onClick={() => handleSectionClick(item.sectionId)}
                  className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-default'}`}
                >
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-mobile-button"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${isMobileMenuOpen ? 'nav-mobile-menu-open' : 'nav-mobile-menu-closed'}`}>
        <div className="nav-mobile-items">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId
            return (
              <button
                key={item.path}
                onClick={() => handleSectionClick(item.sectionId)}
                className={`nav-mobile-item ${isActive ? 'nav-item-active' : 'nav-item-default'}`}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation 