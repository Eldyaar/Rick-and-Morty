import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import MainPage from './pages/main-page/MainPage'
import DetailedHeroPage from './pages/detailed-hero-page/DetailedHeroPage'


const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/:heroId' element={<DetailedHeroPage />} />
      </Route>
    </Routes>
  )
}

export default App