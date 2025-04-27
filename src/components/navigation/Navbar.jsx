import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ show }) => {
  const navLinks = [
    { name: 'about', path: '/#about' },
    { name: 'projects', path: '/projects' },
    { name: 'trips', path: '/trips' },
    { name: 'games', path: '/games' },
    { name: 'diary', path: '/diary' },
    { name: 'connect', path: '/#connect' }
  ]

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
                    className={({ isActive }) => 
                      `font-medium text-sm transition-colors duration-200 ${
                        isActive 
                          ? 'text-primary-600' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <div className="md:hidden">
                <button className="text-gray-600 hover:text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar