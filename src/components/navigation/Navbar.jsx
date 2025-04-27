import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ show }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const navLinks = [
    { name: 'about', path: '/#about' },
    { name: 'projects', path: '/projects' },
    { name: 'trips', path: '/trips' },
    { name: 'games', path: '/games' },
    { name: 'diary', path: '/diary' },
    { name: 'connect', path: '/#connect' }
  ]

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const sections = ['about', 'connect'].map(id => document.getElementById(id))
        const scrollPosition = window.scrollY + window.innerHeight / 3

        const currentSection = sections.find(section => {
          if (!section) return false
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          return scrollPosition >= sectionTop && scrollPosition < sectionBottom
        })

        setActiveSection(currentSection ? currentSection.id : '')
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage])

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false)
    if (path.startsWith('/#')) {
      const element = document.getElementById(path.substring(2))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isLinkActive = (path) => {
    if (isHomePage) {
      if (path.startsWith('/#')) {
        const sectionId = path.substring(2)
        return activeSection === sectionId
      }
      return false
    }

    // Remove hash for home page links when comparing
    const cleanPath = path.startsWith('/#') ? '/' : path
    const currentPath = location.pathname

    // Check if the current path starts with the link path (for nested routes)
    return currentPath.startsWith(cleanPath) && (cleanPath !== '/' || currentPath === '/')
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <NavLink to="/" className="text-xl font-display font-black text-primary-600">
                c.c
              </NavLink>
              <div className="hidden md:flex space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`font-medium text-sm transition-colors duration-200 ${isLinkActive(link.path)
                        ? 'text-primary-600'
                        : 'text-gray-600 hover:text-primary-600'
                      }`}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-600 hover:text-primary-600 p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden"
                >
                  <div className="py-4 space-y-2">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={() => handleNavClick(link.path)}
                        className={({ isActive }) =>
                          `block py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar