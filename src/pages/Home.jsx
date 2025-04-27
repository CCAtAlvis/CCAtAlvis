import React from 'react'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import ProjectsSection from '../components/home/ProjectsSection'
import TripsSection from '../components/home/TripsSection'
import DiarySection from '../components/home/DiarySection'
import GamesSection from '../components/home/GamesSection'
import ConnectSection from '../components/home/ConnectSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TripsSection />
      <DiarySection />
      <GamesSection />
      <ConnectSection />
    </div>
  )
}

export default Home