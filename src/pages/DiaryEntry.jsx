import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { diaryEntries } from '../utils/diaryData'
import DiaryContent from '../components/common/DiaryContent'

const DiaryEntry = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the entry with the matching id
    const foundEntry = diaryEntries.find(e => e.id === parseInt(id))

    if (foundEntry) {
      setEntry(foundEntry)
    } else {
      // Handle entry not found
      navigate('/not-found')
    }

    setLoading(false)
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!entry) return null

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Link to="/diary" className="text-primary-600 hover:text-primary-700 flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Diary
              </Link>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{entry.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="text-gray-500">
                  <time dateTime={entry.date}>{entry.date}</time>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${entry.type === 'personal'
                      ? 'bg-secondary-100 text-secondary-800'
                      : 'bg-primary-100 text-primary-800'
                    }`}>
                    {entry.type}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {entry.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {entry.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`diary-entry ${entry.type === 'personal' ? 'font-mono' : 'font-sans'}`}>
              <DiaryContent content={entry.content} />
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-6">More Entries</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diaryEntries
                  .filter(e => e.id !== entry.id)
                  .slice(0, 2)
                  .map(relatedEntry => (
                    <Link
                      key={relatedEntry.id}
                      to={`/diary/${relatedEntry.id}`}
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-bold text-lg mb-2">{relatedEntry.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{relatedEntry.date}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedEntry.content.find(block => block.type === 'text')?.content.substring(0, 100)}...
                      </p>
                    </Link>
                  ))
                }
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DiaryEntry