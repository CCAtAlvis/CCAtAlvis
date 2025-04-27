import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold text-center mb-12"
          >
            about me
          </motion.h2>

          <motion.div variants={itemVariants} className="mb-12 text-lg text-gray-700 leading-relaxed">
            <p className="mb-4">
              I'm a software engineer with experience in backend and web3 development. Currently working on 
              Blockend, a web3 native intent solver protocol, and Zelta, a global centralized crypto exchange.
            </p>
            <p>
              My passion lies in building scalable systems and exploring the intersection of traditional finance 
              and blockchain technology. When I'm not coding, I enjoy game development, traveling, and photography.
            </p>
          </motion.div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-display font-bold mb-6 border-b border-gray-200 pb-2"
          >
            Work Experience
          </motion.h3>
          
          <div className="space-y-10">
            <motion.div variants={itemVariants} className="relative pl-8 border-l-2 border-primary-200">
              <div className="absolute w-4 h-4 bg-primary-500 rounded-full left-[-9px] top-1"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-gray-900">Blockend & Zelta</h4>
                <span className="text-sm font-medium px-3 py-1 bg-primary-100 text-primary-800 rounded-full">Dec 2022 – Present</span>
              </div>
              <p className="text-lg font-medium text-primary-600 mb-3">Backend and Web3</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Part of the founding team of Blockend, a web3 native intent solver protocol and action model</li>
                <li>Engineered backend architecture supporting high-throughput cross-chain transactions</li>
                <li>Led backend engineering efforts, mentoring a team and defining technical strategy</li>
                <li>Conceptualized an intent auction and execution engine that simplified multi-chain swaps</li>
                <li>Built an automated testing framework for end-to-end user stories</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative pl-8 border-l-2 border-primary-200">
              <div className="absolute w-4 h-4 bg-primary-500 rounded-full left-[-9px] top-1"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-gray-900">Swiggy</h4>
                <span className="text-sm font-medium px-3 py-1 bg-primary-100 text-primary-800 rounded-full">April 2022 – Nov 2022</span>
              </div>
              <p className="text-lg font-medium text-primary-600 mb-3">SDET</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Optimized test strategies and developed new automation framework features</li>
                <li>Maintained test coverage through periodic stakeholder reports</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative pl-8 border-l-2 border-primary-200">
              <div className="absolute w-4 h-4 bg-primary-500 rounded-full left-[-9px] top-1"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-gray-900">TCS</h4>
                <span className="text-sm font-medium px-3 py-1 bg-primary-100 text-primary-800 rounded-full">Nov 2020 – April 2022</span>
              </div>
              <p className="text-lg font-medium text-primary-600 mb-3">Systems Engineer</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Worked as Java developer for a US-based online travel agency</li>
                <li>Developed secure, reliable microservices handling millions of events daily</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection