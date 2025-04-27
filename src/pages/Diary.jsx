import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { diaryEntries, getTags, getCategories, filterEntries } from '../utils/diaryData'

const Diary = () => {
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedType, setSelectedType] = useState('')
  const [availableTags, setAvailableTags] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])

  useEffect(() => {
    // Fetch entries
    setEntries(diaryEntries)
    setFilteredEntries(diaryEntries)

    // Get available tags and categories
    setAvailableTags(getTags())
    setAvailableCategories(getCategories())
  }, [])

  useEffect(() => {
    // Apply filters
    const filtered = filterEntries({
      search,
      tags: selectedTags.length > 0 ? selectedTags : null,
      categories: selectedCategories.length > 0 ? selectedCategories : null,
      type: selectedType || null
    })

    setFilteredEntries(filtered)
  }, [search, selectedTags, selectedCategories, selectedType])

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedTags([])
    setSelectedCategories([])
    setSelectedType('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const getPreviewText = (entry) => {
    const textBlocks = entry.content.filter(block => block.type === 'text')
    if (textBlocks.length === 0) return ''

    const fullText = textBlocks[0].content
    return fullText.length > 150 ? fullText.substring(0, 150) + '...' : fullText
  }

  const getPreviewImage = (entry) => {
    const imageBlock = entry.content.find(block => block.type === 'image')
    return imageBlock ? imageBlock.url : null
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">Diary</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A collection of thoughts, experiences, and technical notes from my adventures in
            software development, travel, and beyond.
          </p>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Filters</h2>

                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search entries..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${selectedType === 'personal'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => setSelectedType(selectedType === 'personal' ? '' : 'personal')}
                    >
                      Personal
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${selectedType === 'technical'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => setSelectedType(selectedType === 'technical' ? '' : 'technical')}
                    >
                      Technical
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${selectedCategories.includes(category)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            <div className="md:w-3/4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No entries found matching your filters.</p>
                  </div>
                ) : (
                  filteredEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      variants={itemVariants}
                      className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                      <Link to={`/diary/${entry.id}`} className="block">
                        <div className="p-6">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                            <h2 className="text-2xl font-bold text-gray-900">{entry.title}</h2>
                            <span className="text-sm text-gray-500">{entry.date}</span>
                          </div>

                          <div className="flex items-center mb-4 space-x-2">
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

                          <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className={`${getPreviewImage(entry) ? 'md:w-2/3' : 'w-full'}`}>
                              <p className="text-gray-600 line-clamp-3">
                                {getPreviewText(entry)}
                              </p>
                            </div>

                            {getPreviewImage(entry) && (
                              <div className="md:w-1/3">
                                <img
                                  src={getPreviewImage(entry)}
                                  alt={entry.title}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {entry.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                #{tag}
                              </span>
                            ))}
                            {entry.tags.length > 4 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                +{entry.tags.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Diary