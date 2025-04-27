import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HighlightViewer = ({ highlights, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (highlights[currentIndex].video && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      videoRef.current.muted = isMuted
    }
  }, [isPlaying, isMuted, currentIndex, highlights])

  useEffect(() => {
    if (highlights[currentIndex].video) return // video handles its own timing
    if (!isPlaying) return
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < highlights.length - 1) {
            setCurrentIndex(prev => prev + 1)
            return 0
          } else {
            clearInterval(timer)
            onClose()
            return 100
          }
        }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(timer)
  }, [currentIndex, highlights.length, onClose, isPlaying, highlights])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  const handleNext = () => {
    if (currentIndex < highlights.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const handleBackgroundClick = (e) => {
    if (containerRef.current && e.target === containerRef.current) {
      onClose()
    }
  }

  // For video: update progress bar based on video time
  const handleVideoTimeUpdate = (e) => {
    const video = e.target
    setProgress((video.currentTime / video.duration) * 100)
    if (video.currentTime >= video.duration && isPlaying) {
      handleNext()
    }
  }

  // For video: reset progress when switching
  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={handleBackgroundClick}
      >
        <div className="relative w-full h-full md:w-[400px] md:h-[80vh] flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 right-0 z-20 p-4">
            <div className="flex gap-1">
              {highlights.map((hl, index) => (
                <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                  {index === currentIndex && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-white"
                    />
                  )}
                  {index < currentIndex && (
                    <div className="h-full w-full bg-white" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-6 right-4 flex items-center gap-2 z-20">
            {highlights[currentIndex].video && (
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
            )}
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
              onClick={onClose}
              className="text-white hover:text-gray-300"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 bg-black bg-opacity-30 rounded-full p-2"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {highlights[currentIndex].video ? (
              <video
                ref={videoRef}
                src={highlights[currentIndex].video}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                muted={isMuted}
                controls={false}
                playsInline
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={handleNext}
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <img
                src={highlights[currentIndex].image}
                alt={highlights[currentIndex].title}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 bg-black bg-opacity-30 rounded-full p-2"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-white text-xl font-bold">
                {highlights[currentIndex].title}
              </h3>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default HighlightViewer