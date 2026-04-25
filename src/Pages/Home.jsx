import React, { Suspense, lazy } from 'react'
import Hero from '../Components/Hero'
import LuxuryCarCarousel from '../Components/LuxuryCarCarousel'
import CarsList from '../Components/CarsList'
// import Sl from '../Components/Sl'
const InteractiveCar3D = lazy(() => import('../Components/InteractiveCar3D'))
import useFadeInAnimation from '../useFadeInAnimation'

const Home = () => {
    const heroRef = useFadeInAnimation({ direction: 'up', duration: .6 });
    const interactiveRef = useFadeInAnimation({ direction: 'fade', duration: 1, delay: 0.2 });
    const carouselRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.4 });
    const carsListRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.6 });

    return (
        <div>
            <div ref={heroRef}>
                <Hero/>
            </div>
            <div ref={interactiveRef}>
                <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-white">Loading luxury showcase...</div>}>
                  <InteractiveCar3D />
                </Suspense>
            </div>
            <div ref={carouselRef}>
                <LuxuryCarCarousel/>
            </div>
            <div ref={carsListRef}>
                <CarsList/>
            </div>
            {/* <Sl/> */}
        </div>
    )
}

export default Home