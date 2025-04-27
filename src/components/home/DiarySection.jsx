import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { diaryEntries } from '../../utils/diaryData'

const getPreviewText = (entry) => {
  const textBlocks = entry.content.filter(block => block.type === 'text')
  if (textBlocks.length === 0) return ''
  const fullText = textBlocks[0].content
  return fullText.length > 100 ? fullText.substring(0, 100) + '...' : fullText
}

const getPreviewImage = (entry) => {
  const imageBlock = entry.content.find(block => block.type === 'image')
  return imageBlock ? imageBlock.url : null
}

const DiarySection = () => {
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

  const latestEntries = [...diaryEntries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)

  const renderListView = () => {
    return (
      <div className="space-y-6">
        {latestEntries.map((entry) => {
          const preview = getPreviewText(entry)
          const isTruncated = entry.content.filter(block => block.type === 'text')[0]?.content.length > 100

          return (
            <Link to={`/diary/${entry.id}`} key={entry.id} className="block bg-white rounded-xl shadow hover:shadow-lg transition-shadow group">
              <div key={entry.id} className="flex items-center rounded-lg shadow-sm overflow-hidden">
                {getPreviewImage(entry) && (
                  <div className="w-28 h-28 flex-shrink-0">
                    <img src={getPreviewImage(entry)} alt={entry.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow p-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{entry.title}</h3>
                  <div className="text-sm text-gray-500">{entry.date}</div>
                  <div className="text-sm text-gray-600 line-clamp-1">
                    {preview}
                    {isTruncated && <span>... <span className="text-primary-600 underline">read more</span></span>}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <section id="diary" className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold"
            >
              diary
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link to="/dairy" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                view all
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            {renderListView()}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DiarySection 