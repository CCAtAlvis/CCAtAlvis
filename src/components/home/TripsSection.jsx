import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TripsSection = () => {
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

  const trips = [
    {
      id: 1,
      title: "Tokyo, Japan",
      description: "Exploring the vibrant streets and culture of Tokyo",
      dates: "Oct 9-12, 2023",
      image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
      thumbnail: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Switzerland",
      description: "Hiking through the Swiss Alps and enjoying the breathtaking views",
      dates: "Oct 21-23, 2023",
      image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
      thumbnail: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Bali, Indonesia",
      description: "Beach relaxation and cultural exploration in Bali",
      dates: "Aug 5-10, 2023",
      image: "https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg",
      thumbnail: "https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]

  const renderGalleryView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip) => (
          <Link to={`/trips/${trip.id}`} key={trip.id} className="block group relative rounded-lg overflow-hidden shadow-sm">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-medium">{trip.title}</h3>
              <p className="text-sm opacity-90">{trip.dates}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <section id="trips" className="py-20 bg-light">
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
              trips & photos
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link to="/trips" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                view all
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            {renderGalleryView()}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TripsSection