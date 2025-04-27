import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import HighlightViewer from '../components/common/HighlightViewer'
import ImageGallery from '../components/common/ImageGallery'

const TripDetail = () => {
  const { id } = useParams()

  // Example trip data - in a real app this would come from an API
  const trips = {
    1: {
      id: 1,
      title: "Tokyo, Japan",
      dates: "October 9-12, 2023",
      description: "An unforgettable journey through the vibrant streets, traditional temples, and incredible food scene of Tokyo, Japan.",
      coverImage: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
      highlights: [
        { title: "Shibuya Crossing", image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg" },
        { title: "Meiji Shrine", image: "https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg" },
        { title: "Tokyo Tower", image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg" },
        { title: "Sushi Dinner", image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg" },
        { title: "Test Video", video: "https://videos.pexels.com/video-files/4625518/4625518-uhd_1440_2560_30fps.mp4" }
      ],
      photos: [
        { image: "https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg", aspectRatio: "portrait" },
        { image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg", aspectRatio: "portrait" },
        { image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg", aspectRatio: "square" },
        { image: "https://images.pexels.com/photos/3800117/pexels-photo-3800117.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/5627275/pexels-photo-5627275.jpeg", aspectRatio: "portrait" },
        { video: "https://videos.pexels.com/video-files/4625518/4625518-uhd_1440_2560_30fps.mp4" }
      ],
      diary: "My journey to Tokyo began with an early morning flight, watching the sunrise from 35,000 feet in the air. Upon landing at Narita Airport, I was immediately struck by the efficiency and cleanliness of everything around me.\n\nDay 1 was spent exploring the Shibuya district, starting with the famous Shibuya Crossing - the busiest intersection in the world. Watching the coordinated chaos of hundreds of people crossing simultaneously was mesmerizing. I visited the Hachiko statue and spent hours exploring the many floors of shopping and entertainment in the area.\n\nDay 2 took me to the more traditional side of Tokyo. I visited the Meiji Shrine in the morning, a peaceful oasis amidst the bustling city. The towering torii gates and lush forest surroundings made it feel like I had stepped into another world entirely. Later, I explored Asakusa and the historic Senso-ji Temple, Tokyo's oldest temple.\n\nOn Day 3, I took in the views from Tokyo Tower and explored the upscale Ginza district. The evening was spent in a tiny, family-run sushi restaurant where the chef prepared each piece right in front of me - truly a culinary experience I'll never forget.\n\nMy final day was bittersweet as I made one last stop at a local coffee shop before heading to the airport. Tokyo exceeded all my expectations with its perfect blend of tradition and innovation, order and chaos, familiarity and foreignness. I'll definitely be back."
    },
    2: {
      id: 2,
      title: "Swiss Alps",
      dates: "October 21-23, 2023",
      description: "An incredible hiking adventure through the breathtaking landscapes of the Swiss Alps.",
      coverImage: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
      highlights: [
        { title: "Mountain Views", image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg" },
        { title: "Alpine Lake", image: "https://images.pexels.com/photos/147411/pexels-photo-147411.jpeg" },
        { title: "Hiking Trail", image: "https://images.pexels.com/photos/848573/pexels-photo-848573.jpeg" },
        { title: "Mountain Cabin", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg" }
      ],
      photos: [
        { image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/147411/pexels-photo-147411.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/848573/pexels-photo-848573.jpeg", aspectRatio: "portrait" },
        { image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg", aspectRatio: "square" },
        { image: "https://images.pexels.com/photos/2098405/pexels-photo-2098405.jpeg", aspectRatio: "landscape" },
        { image: "https://images.pexels.com/photos/1497246/pexels-photo-1497246.jpeg", aspectRatio: "portrait" }
      ],
      diary: "The Swiss Alps have always been on my bucket list, and they did not disappoint. The sheer scale and beauty of the mountains is something that photos simply cannot capture.\n\nI started my adventure in the charming village of Zermatt, with the iconic Matterhorn looming in the background. After a good night's rest, I embarked on my first hike through the Alpine meadows.\n\nThe trails were well-marked but challenging, with steep ascents rewarded by panoramic views that left me speechless. The crisp mountain air, the sound of distant cowbells, and the occasional marmot spotting made every step worthwhile.\n\nOne of the highlights was discovering a pristine alpine lake, its waters so clear and blue that it seemed unreal. I stopped for a picnic lunch and just sat in awe of my surroundings for over an hour.\n\nIn the evenings, I stayed in a cozy mountain cabin, sharing stories with fellow hikers from around the world while enjoying hearty Swiss cuisine. There's something magical about connecting with strangers in such a remote and beautiful setting.\n\nAs I reluctantly headed back down the mountain on my final day, I promised myself I would return. The Swiss Alps offer a unique combination of natural beauty, physical challenge, and serene tranquility that I've found nowhere else."
    }
  }

  const trip = trips[id]

  const [showHighlightViewer, setShowHighlightViewer] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [showImageGallery, setShowImageGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [videoThumbnails, setVideoThumbnails] = useState({})

  useEffect(() => {
    trip.highlights.forEach((highlight, idx) => {
      if (highlight.video && !highlight.image && !highlight.poster && !videoThumbnails[idx]) {
        const video = document.createElement('video')
        video.src = highlight.video
        video.crossOrigin = 'anonymous'
        video.currentTime = 0.1
        video.muted = true
        video.playsInline = true
        video.addEventListener('loadeddata', () => {
          const canvas = document.createElement('canvas')
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext('2d')
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const dataURL = canvas.toDataURL('image/png')
          setVideoThumbnails(prev => ({ ...prev, [idx]: dataURL }))
        }, { once: true })
      }
    })
    // eslint-disable-next-line
  }, [trip.highlights])

  if (!trip) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Trip not found</h2>
          <Link to="/trips" className="text-primary-600 hover:text-primary-700">
            Back to all trips
          </Link>
        </div>
      </div>
    )
  }

  const scrollLeft = () => {
    const container = document.getElementById('stories-container')
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('stories-container')
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link to="/trips" className="text-primary-600 hover:text-primary-700 flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to All Trips
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{trip.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{trip.dates}</p>
              <p className="text-gray-700 mb-8 max-w-3xl">{trip.description}</p>
            </motion.div>
          </div>

          {/* Highlights Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Highlights</h2>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              id="stories-container"
              className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trip.highlights.map((highlight, index) => (
                <div key={index} className="flex-shrink-0 w-32 cursor-pointer" onClick={() => { setHighlightIndex(index); setShowHighlightViewer(true); }}>
                  <div className="relative rounded-xl overflow-hidden ring-2 ring-white shadow-md aspect-[9/16] mb-2">
                    <img
                      src={highlight.image || highlight.poster || videoThumbnails[index]}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                    {highlight.video && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-black bg-opacity-40 rounded-full p-2">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-white drop-shadow' fill='currentColor' viewBox='0 0 24 24'>
                            <polygon points='8,5 19,12 8,19' />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-center font-medium text-gray-700">{highlight.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Photos Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trip.photos.map((photo, index) => {
                let className = "rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"

                if (photo.aspectRatio === "portrait") {
                  className += " row-span-2"
                } else if (photo.aspectRatio === "square") {
                  className += ""
                } else {
                  className += " col-span-2"
                }

                return (
                  <div key={index} className={className} onClick={() => { setGalleryIndex(index); setShowImageGallery(true); }}>
                    <img
                      src={photo.image}
                      alt={`Trip photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-6">
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                Load More Photos
              </button>
            </div>
          </section>

          {/* Trip Diary */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Trip Diary</h2>
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="prose prose-lg max-w-none font-mono">
                {trip.diary.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      {showHighlightViewer && (
        <HighlightViewer highlights={trip.highlights} initialIndex={highlightIndex} onClose={() => setShowHighlightViewer(false)} />
      )}
      {showImageGallery && (
        <ImageGallery images={trip.photos.map(p => p.image)} initialIndex={galleryIndex} onClose={() => setShowImageGallery(false)} />
      )}
    </div>
  )
}

export default TripDetail