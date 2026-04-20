import React from 'react'
import BrandPage from '../Components/BrandPage'
import CarsList from '../Components/CarsList'
import useFadeInAnimation from '../useFadeInAnimation'

const OurFleet = () => {
    const titleRef = useFadeInAnimation({ direction: 'up', duration: 1 });
    const subtitleRef = useFadeInAnimation({ direction: 'fade', duration: 1, delay: 0.2 });
    const carsListRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.4 });

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20">
            <div className="container mx-auto px-4 py-8">
                <div ref={titleRef}>
                    <h1 className="text-4xl font-bold text-center mb-8">Our Luxury Fleet</h1>
                </div>
                <div ref={subtitleRef}>
                    <p className="text-center text-gray-300 mb-12">
                        Discover our premium collection of luxury vehicles
                    </p>
                </div>
                <div ref={carsListRef}>
                    <CarsList/>
                </div>
            </div>
        </div>
    )
}

export default OurFleet