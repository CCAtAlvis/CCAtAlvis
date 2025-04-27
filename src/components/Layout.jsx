import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './navigation/Navbar'
import Footer from './navigation/Footer'

const Layout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY
        setShowNavbar(scrollPosition > window.innerHeight * 0.8)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setShowNavbar(true)
    }
  }, [isHomePage])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar show={showNavbar} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout