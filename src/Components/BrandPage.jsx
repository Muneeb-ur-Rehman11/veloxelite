import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import carsData from '../carsData';

// SVG Icon Components
const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Star = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const Users = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const Fuel = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
  </svg>
);

const Car = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const BrandPage = () => {
  const { brandName } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const brandAliasMap = {
    audi: 'Audi',
    bmw: 'BMW',
    ferrari: 'Ferrari',
    lamborghini: 'Lamborghini',
    'rolls-royce': 'Rolls-Royce',
    'range-rover': 'Range Rover',
    mercedes: 'Mercedes-Benz',
    'mercedes-benz': 'Mercedes-Benz',
    'land-rover': 'Range Rover',
    nissan: 'Nissan',
    mclaren: 'McLaren',
  };
  const selectedBrand = brandAliasMap[brandName?.toLowerCase()] || brandName?.replace(/-/g, ' ');
  const filteredCars = carsData.filter(car => car.brand.toLowerCase() === selectedBrand?.toLowerCase());

  // Sample multiple images for each car
  const getCarImages = (carId) => [
    `https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&car=${carId}_1`,
    `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80&car=${carId}_2`,
    `https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=800&q=80&car=${carId}_3`,
    `https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80&car=${carId}_4`
  ];

  const nextImage = (carId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [carId]: ((prev[carId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (carId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [carId]: ((prev[carId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-red-600 to-pink-600 px-6 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider">Premium Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {brandName} <span className="text-red-500">Cars</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the ultimate driving experience with our exclusive {brandName} collection
          </p>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 max-w-md mx-auto border border-white/20">
              <Car />
              <h3 className="text-2xl font-bold mb-4">No Cars Found</h3>
              <p className="text-gray-300 mb-6">We couldn't find any {brandName} cars in our collection.</p>
              <Link
                to="/"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => {
              const carImages = getCarImages(car.id);
              const currentIndex = currentImageIndex[car.id] || 0;

              return (
                <div
                  key={car.id}
                  className="group flex flex-col h-full bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Image Gallery */}
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                      src={carImages[currentIndex]}
                      alt={`${car.name} - View ${currentIndex + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Image Navigation */}
                    <button
                      onClick={() => prevImage(car.id, carImages.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={() => nextImage(car.id, carImages.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                    >
                      <ChevronRight />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {carImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(prev => ({ ...prev, [car.id]: index }))}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-red-500 w-6' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        AED {car.pricePerDay}
                        <span className="text-sm font-normal">/day</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{car.name}</h2>
                        <p className="text-gray-300 text-sm">{car.model}</p>
                      </div>
                      <div className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded text-sm font-semibold">
                        <Star />
                        <span className="ml-1">4.8</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-2">{car.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <Users />
                        <span className="text-sm text-gray-300 mt-2 block">4 Seats</span>
                      </div>
                      <div className="text-center">
                        <Fuel />
                        <span className="text-sm text-gray-300 mt-2 block">Premium</span>
                      </div>
                      <div className="text-center">
                        <Car />
                        <span className="text-sm text-gray-300 mt-2 block">Auto</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Link
                        to={`/car/${car.id}`}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        View Details
                      </Link>
                      <button onClick={() => window.location.href = '/contact-us#form'} className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 border border-white/20">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {filteredCars.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Drive Your Dream {brandName}?</h3>
              <p className="text-gray-100 mb-6">Contact our luxury car specialists for personalized service</p>
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Contact Specialist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandPage;