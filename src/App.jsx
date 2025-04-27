import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loading from './components/common/Loading'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Trips = lazy(() => import('./pages/Trips'))
const TripDetail = lazy(() => import('./pages/TripDetail'))
const Games = lazy(() => import('./pages/Games'))
const Diary = lazy(() => import('./pages/Diary'))
const DiaryEntry = lazy(() => import('./pages/DiaryEntry'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diary/:id" element={<DiaryEntry />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App