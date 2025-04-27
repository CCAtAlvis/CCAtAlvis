import React from 'react'
import { motion } from 'framer-motion'

const Games = () => {
  const games = [
    {
      id: 1,
      title: "Pixel Platformer",
      description: "A retro-inspired platformer with pixel art graphics, challenging levels, and precise controls. Navigate through various worlds, collect power-ups, and defeat enemies in this nostalgic adventure.",
      image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg",
      tags: ["Unity", "2D", "Platformer"],
      playUrl: "#",
      details: {
        engine: "Unity",
        platform: "WebGL/Browser",
        controls: "Arrow keys to move, Space to jump, Z to attack",
        development: "Developed as a solo project over 3 months, focusing on tight controls and level design"
      }
    },
    {
      id: 2,
      title: "Space Shooter",
      description: "Arcade-style space shooter with power-ups, enemy waves, and boss battles. Upgrade your ship, unlock new weapons, and compete for high scores in this fast-paced action game.",
      image: "https://images.pexels.com/photos/1274506/pexels-photo-1274506.jpeg",
      tags: ["Unity", "2D", "Arcade"],
      playUrl: "#",
      details: {
        engine: "Unity",
        platform: "WebGL/Browser",
        controls: "Mouse to move, Left-click to shoot, Right-click for special weapons",
        development: "Built with a focus on juicy feedback and replayability"
      }
    },
    {
      id: 3,
      title: "VR Experience",
      description: "Immersive virtual reality exploration game set in ancient ruins. Uncover hidden secrets, solve environmental puzzles, and experience a mysterious story in stunning VR environments.",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      tags: ["Unity", "VR", "Adventure"],
      playUrl: "#",
      details: {
        engine: "Unity",
        platform: "WebVR (Desktop VR headsets)",
        controls: "VR controllers for interaction, teleportation movement",
        development: "Focused on comfortable VR experience with realistic interactions"
      }
    },
    {
      id: 4,
      title: "Puzzle Quest",
      description: "Brain-teasing puzzles with beautiful visuals and ambient soundtrack. Progress through increasingly challenging levels that test your logic, pattern recognition, and problem-solving skills.",
      image: "https://images.pexels.com/photos/4144350/pexels-photo-4144350.jpeg",
      tags: ["Unity", "Mobile", "Puzzle"],
      playUrl: "#",
      details: {
        engine: "Unity",
        platform: "WebGL/Browser & Mobile",
        controls: "Mouse/Touch to select and place pieces",
        development: "Iterative design with extensive playtesting to ensure puzzles are challenging but fair"
      }
    },
    {
      id: 5,
      title: "Strategy Commander",
      description: "Turn-based strategy game with resource management and tactical combat. Build your empire, research technologies, and lead your armies to victory in a procedurally generated world.",
      image: "https://images.pexels.com/photos/7919/pexels-photo.jpg",
      tags: ["Unreal", "Strategy", "Turn-based"],
      playUrl: "#",
      details: {
        engine: "Unreal Engine",
        platform: "WebGL/Browser",
        controls: "Mouse for selection and commands, hotkeys for actions",
        development: "Complex AI systems with varying difficulty levels and play styles"
      }
    },
    {
      id: 6,
      title: "Rhythm Revolution",
      description: "Fast-paced rhythm game with dynamic tracks and visual effects. Match your actions to the beat across multiple difficulty levels and a variety of musical genres.",
      image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
      tags: ["Unity", "Rhythm", "Music"],
      playUrl: "#",
      details: {
        engine: "Unity",
        platform: "WebGL/Browser",
        controls: "Arrow keys or WASD for note matching, Space for special moves",
        development: "Custom audio analysis system for beat detection and dynamic level generation"
      }
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">Games</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            A collection of game development projects I've worked on.
            Play directly in your browser or explore the development details.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {games.map((game) => (
              <motion.div
                key={game.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{game.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">{game.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-700 w-24">Engine:</span>
                      <span className="text-sm text-gray-600">{game.details.engine}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-700 w-24">Platform:</span>
                      <span className="text-sm text-gray-600">{game.details.platform}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-700 w-24">Controls:</span>
                      <span className="text-sm text-gray-600">{game.details.controls}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <a
                    href={game.playUrl}
                    className="block w-full py-3 px-4 bg-secondary-500 hover:bg-secondary-600 text-white text-center rounded-lg font-medium transition-colors"
                  >
                    Play Now
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Games