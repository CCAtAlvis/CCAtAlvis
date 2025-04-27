import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ImageGallery = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  useEffect(() => {
    setProgress(0)
    setIsPlaying(true)
    setIsMuted(true)
  }, [currentIndex])

  useEffect(() => {
    if (isVideo(images[currentIndex]) && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      videoRef.current.muted = isMuted
    }
  }, [isPlaying, isMuted, currentIndex, images])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleVideoTimeUpdate = (e) => {
    const video = e.target
    setProgress((video.currentTime / video.duration) * 100)
  }

  const isVideo = (item) => !!(item && typeof item === 'object' && item.video)

  const getPoster = (item) => (item && typeof item === 'object' && item.poster) ? item.poster : undefined

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center"
        onClick={onClose}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4" onClick={e => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-[70vh] flex items-center justify-center">
            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {isVideo(images[currentIndex]) ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <video
                  ref={videoRef}
                  src={images[currentIndex].video}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  autoPlay
                  muted={isMuted}
                  controls={false}
                  playsInline
                  onTimeUpdate={handleVideoTimeUpdate}
                  poster={getPoster(images[currentIndex])}
                  onClick={e => e.stopPropagation()}
                />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  <button
                    onClick={() => setIsPlaying(p => !p)}
                    className="text-white hover:text-gray-300"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                    )}
                  </button>
                  <button
                    onClick={() => setIsMuted(m => !m)}
                    className="text-white hover:text-gray-300"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 9v6h4l5 5V4l-5 5H9z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 9v6h4l5 5V4l-5 5H9z" /><path d="M19 5l-7 7" /></svg>
                    )}
                  </button>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded mt-2">
                  <div className="h-2 bg-primary-500 rounded" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                src={images[currentIndex].image || images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            )}

            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="w-full mt-4 px-4">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-opacity ${index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                    }`}
                >
                  {isVideo(image) ? (
                    <video
                      src={image.video}
                      poster={getPoster(image)}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={image.image || image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImageGallery