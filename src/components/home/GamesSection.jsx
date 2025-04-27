import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const GamesSection = () => {
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

  const games = [
    {
      id: 1,
      title: "Pixel Platformer",
      description: "A retro-inspired platformer with pixel art graphics and challenging levels.",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg",
      tags: ["Unity", "2D", "Platformer"],
      playUrl: "#"
    },
    {
      id: 2,
      title: "Space Shooter",
      description: "Arcade-style space shooter with power-ups and enemy waves.",
      image: "https://images.pexels.com/photos/1274506/pexels-photo-1274506.jpeg",
      tags: ["Unity", "2D", "Arcade"],
      playUrl: "#"
    },
    {
      id: 3,
      title: "VR Experience",
      description: "Immersive virtual reality exploration game set in ancient ruins.",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      tags: ["Unity", "VR", "Adventure"],
      playUrl: "#"
    },
    {
      id: 4,
      title: "Puzzle Quest",
      description: "Brain-teasing puzzles with beautiful visuals and ambient soundtrack.",
      image: "https://images.pexels.com/photos/4144350/pexels-photo-4144350.jpeg",
      tags: ["Unity", "Mobile", "Puzzle"],
      playUrl: "#"
    },
    {
      id: 5,
      title: "Puzzle Quest",
      description: "Brain-teasing puzzles with beautiful visuals and ambient soundtrack.",
      image: "https://images.pexels.com/photos/4144350/pexels-photo-4144350.jpeg",
    },
    {
      id: 6,
      title: "Puzzle Quest",
      description: "Brain-teasing puzzles with beautiful visuals and ambient soundtrack.",
      image: "https://images.pexels.com/photos/4144350/pexels-photo-4144350.jpeg",
    }
  ]

  const scrollLeft = () => {
    const container = document.getElementById('games-container')
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('games-container')
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section id="games" className="py-20 bg-gray-50">
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
              games
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link to="/games" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
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
              id="games-container"
            >
              <div className="flex space-x-6" style={{ minWidth: 'min-content' }}>
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0"
                    style={{ width: 280 }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{game.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{game.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {game.tags?.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={game.playUrl}
                        className="block w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-lg font-medium transition-colors"
                      >
                        Play Now
                      </a>
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

export default GamesSection