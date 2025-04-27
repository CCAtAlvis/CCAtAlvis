import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Trips = () => {
  const [activeView, setActiveView] = useState('calendar')

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
    },
    {
      id: 4,
      title: "Barcelona, Spain",
      description: "Architecture, beaches, and incredible food in Barcelona",
      dates: "June 15-20, 2023",
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
      thumbnail: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      title: "New York City, USA",
      description: "Exploring the bustling streets and iconic landmarks of NYC",
      dates: "April 3-8, 2023",
      image: "https://images.pexels.com/photos/2224861/pexels-photo-2224861.jpeg",
      thumbnail: "https://images.pexels.com/photos/2224861/pexels-photo-2224861.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      title: "Kyoto, Japan",
      description: "Traditional temples, gardens, and Japanese culture in Kyoto",
      dates: "Mar 15-19, 2023",
      image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
      thumbnail: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]

  const renderCalendarView = () => {
    // Create a calendar grid with months
    const months = [
      { name: "October 2023", days: 31, offset: 0, trips: [{ start: 9, end: 12, id: 1, name: "Tokyo" }, { start: 21, end: 23, id: 2, name: "Switzerland" }] },
      { name: "September 2023", days: 30, offset: 5, trips: [] },
      { name: "August 2023", days: 31, offset: 2, trips: [{ start: 5, end: 10, id: 3, name: "Bali" }] },
      { name: "July 2023", days: 31, offset: 6, trips: [] },
      { name: "June 2023", days: 30, offset: 4, trips: [{ start: 15, end: 20, id: 4, name: "Barcelona" }] },
      { name: "May 2023", days: 31, offset: 1, trips: [] },
      { name: "April 2023", days: 30, offset: 6, trips: [{ start: 3, end: 8, id: 5, name: "New York" }] },
      { name: "March 2023", days: 31, offset: 3, trips: [{ start: 15, end: 19, id: 6, name: "Kyoto" }] }
    ]

    return (
      <div className="space-y-12">
        {months.map((month, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">{month.name}</h3>
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={i} className="text-center font-medium text-sm text-gray-500 mb-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for offset */}
              {Array.from({ length: month.offset }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}

              {/* Calendar days */}
              {Array.from({ length: month.days }, (_, i) => {
                const day = i + 1

                // Check if this day is part of a trip
                const tripForDay = month.trips.find(trip => day >= trip.start && day <= trip.end)

                let tripStyle = {}
                let tripName = null
                let tripId = null

                if (tripForDay) {
                  const trip = trips.find(t => t.id === tripForDay.id)
                  tripStyle = {
                    backgroundImage: `url(${trip?.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }
                  tripName = tripForDay.name
                  tripId = tripForDay.id
                }

                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-lg flex flex-col justify-between p-2 ${tripName ? 'text-white shadow-md relative overflow-hidden' : 'border border-gray-200 text-gray-700'
                      }`}
                    style={tripStyle}
                  >
                    {tripName && (
                      <Link to={`/trips/${tripId}`} className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition-colors"></Link>
                    )}
                    <span className={`text-sm font-medium relative z-10 ${tripName ? 'text-white' : ''}`}>{day}</span>
                    {tripName && <span className="text-xs font-medium relative z-10">{tripName}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderListView = () => {
    return (
      <div className="space-y-4">
        {trips.map((trip) => (
          <Link to={`/trips/${trip.id}`} key={trip.id} className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="w-32 h-24 flex-shrink-0">
              <img src={trip.thumbnail} alt={trip.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow p-4">
              <div className="text-sm text-gray-500">{trip.dates}</div>
              <h3 className="text-lg font-medium text-gray-900">{trip.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">{trip.description}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  const renderGalleryView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Link
            to={`/trips/${trip.id}`}
            key={trip.id}
            className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
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

  const renderActiveView = () => {
    switch (activeView) {
      case 'calendar':
        return renderCalendarView()
      case 'list':
        return renderListView()
      case 'gallery':
        return renderGalleryView()
      default:
        return renderCalendarView()
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">Trips & Photos</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A collection of my travel adventures and photography from around the world.
          </p>

          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeView === 'calendar'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setActiveView('calendar')}
              >
                Calendar
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium ${activeView === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setActiveView('list')}
              >
                List
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeView === 'gallery'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setActiveView('gallery')}
              >
                Gallery
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderActiveView()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Trips