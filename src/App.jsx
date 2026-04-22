import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
// import SmoothScroll from './Components/SmoothScroll'
import Home from './Pages/Home'
import OurFleet from './Pages/OurFleet'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import CarDetail from './Components/CarDetail'
import BrandPage from './Components/BrandPage'
import Car3DShowcase from './Pages/Car3DShowcase'
import GWagonSpecial from './Pages/GWagonSpecial'

const App = () => {
  return (
    <Router>
      {/* <SmoothScroll /> */}
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-fleet" element={<OurFleet />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/car-3d/:id" element={<Car3DShowcase />} />
          <Route path="/gwagon-special" element={<GWagonSpecial />} />
          <Route path="/brand/:brandName" element={<BrandPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App