import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ConnectSection = () => {
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

  return (
    <section id="connect" className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-black mb-6"
          >
            let's connect
          </motion.h2>

          <br /><br />

          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 text-lg">
              i try getting <span className="font-mono text-primary-600">@CCAtAlvis</span> almost everywhere
            </p>

            <div className="flex justify-center gap-6 text-lg">
              <a href="https://github.com/CCAtAlvis" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                github
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://x.com/CCAtAlvis" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                twitter (x 🤷🏻‍♂️)
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://instagram.com/ccatalvis" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                instagram
              </a>
            </div>

            <p className="text-gray-700 text-lg">where not,</p>

            <div className="flex justify-center gap-6 text-lg">
              <a href="https://linkedin.com/in/chinmaychandak" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                linkedin
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://facebook.com/chinmay.chandak" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                facebook (still use it?!)
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ConnectSection