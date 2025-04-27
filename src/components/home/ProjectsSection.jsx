import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const projects = [
    {
      id: 1,
      title: "backgommon",
      description: "Open-source Go library for backtesting and simulating trading strategies. Designed for speed and flexibility.",
      tags: ["Go", "Trading", "Library"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Demo", url: "#" }
      ]
    },
    {
      id: 2,
      title: "Grids-css",
      description: "A minimalist, unopinionated boilerplate for a responsive 12-column grid system. Under 100 lines of code.",
      tags: ["CSS", "Framework"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Demo", url: "#" }
      ]
    },
    {
      id: 3,
      title: "Blockchain Explorer",
      description: "A lightweight explorer for EVM-compatible blockchains with transaction tracking and address monitoring.",
      tags: ["Web3", "JavaScript"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Live", url: "#" }
      ]
    },
    {
      id: 4,
      title: "DeFi Dashboard",
      description: "Unified dashboard for monitoring DeFi positions across multiple chains and protocols with analytics.",
      tags: ["React", "Web3"],
      links: [
        { name: "GitHub", url: "#" }
      ]
    }
  ]

  const scrollLeft = () => {
    const container = document.getElementById('projects-container')
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('projects-container')
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold"
            >
              projects
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                view all
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              variants={itemVariants}
              className="overflow-x-auto hide-scrollbar pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              id="projects-container"
            >
              <div className="flex space-x-6" style={{ minWidth: 'min-content' }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0"
                    style={{ width: 320 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      </div>
                      <div className="flex mb-3 flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                        {project.description}
                      </p>
                      <div className="flex space-x-3">
                        {project.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-6 space-x-4"
            >
              <button
                onClick={scrollLeft}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection