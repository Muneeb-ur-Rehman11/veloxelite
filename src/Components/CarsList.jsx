import React from 'react';
import { Link } from 'react-router-dom';
import carsData from '../carsData';
import Car3DPreview from './Car3DPreview';

const CarsList = () => {
  // Separate cars with 3D models from regular cars
  const carsWithModels = carsData.filter(car => car.model3D);
  const regularCars = carsData.filter(car => !car.model3D);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative overflow-hidden xl:overflow-visible">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] sm:w-[800px] h-[300px] bg-red-600/10 blur-[90px] sm:blur-[120px] pointer-events-none rounded-full" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 tracking-tight mb-4 drop-shadow-sm">
          Our Luxury Fleet
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Discover our exclusive collection of premium vehicles, offering uncompromising comfort, performance, and prestige for your next journey.
        </p>
      </div>

      {/* 3D Car Models Section */}
      {carsWithModels.length > 0 && (
        <div className="mb-16 sm:mb-24 relative z-10">
          <div className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Immersive 3D Experience</h3>
              </div>
              <p className="text-gray-500 text-sm mt-2 ml-4">Explore our premium selection in full 360-degree interactive 3D.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {carsWithModels.map((car) => (
              <div 
                key={`3d-${car.id}`} 
                className="group relative bg-[#111111]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(220,38,38,0.12)] transition-all duration-500 hover:-translate-y-1.5 border border-gray-800/80 hover:border-red-600/40 flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* 3D Model Preview */}
                <div className="relative h-64 overflow-hidden bg-black/60 rounded-t-2xl">
                  <Car3DPreview 
                    model3D={car.model3D} 
                    carName={car.name} 
                    previewImage={car.previewImage} 
                  />
                  {/* 3D Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-red-500/30 text-white px-3 py-1.5 rounded-full font-medium text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-black/50 z-20">
                    <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] animate-pulse" />
                    Interactive 3D
                  </div>
                  {/* Bottom fade for image area */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none z-10" />
                </div>

                {/* Car Details */}
                <div className="p-6 flex flex-col flex-grow relative z-20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors duration-300">
                        {car.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mt-1">
                        {car.model}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-800/60 pt-5 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-red-500 transition-colors duration-300">${car.pricePerDay}</span>
                      <span className="text-gray-500 text-sm font-medium">/ day</span>
                    </div>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-2 flex gap-3 font-medium tracking-wide">
                      <span>${car.pricePerWeek}<span className="text-gray-600"> / wk</span></span>
                      <span className="text-gray-700">•</span>
                      <span>${car.pricePerMonth}<span className="text-gray-600"> / mo</span></span>
                    </p>
                  </div>

                  {/* Two buttons for 3D cars */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link to={`/car-3d/${car.id}`}>
                      <button className="w-full bg-red-600/90 hover:bg-red-500 text-white py-3 px-4 rounded-xl font-medium transition duration-300 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] flex items-center justify-center gap-2 group/btn border border-red-500/50 text-sm">
                        <svg className="w-4 h-4 transform group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        3D View
                      </button>
                    </Link>
                    <Link to={`/car/${car.id}`}>
                      <button className="w-full bg-[#1A1A1A] hover:bg-[#222222] text-white py-3 px-4 rounded-xl font-medium transition duration-300 border border-gray-800 hover:border-gray-600 text-sm flex items-center justify-center">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Cars Section */}
      {regularCars.length > 0 && (
        <div className="relative z-10">
          {carsWithModels.length > 0 && (
            <div className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4 mt-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gray-500 rounded-full"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Premium Collection</h3>
                </div>
                <p className="text-gray-500 text-sm mt-2 ml-4">More exceptional vehicles from our distinguished fleet.</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularCars.map((car) => (
              <div 
                key={car.id} 
                className="group relative bg-[#111111]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(220,38,38,0.12)] transition-all duration-500 hover:-translate-y-1.5 border border-gray-800/80 hover:border-gray-600/50 flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative h-64 overflow-hidden bg-black/40 rounded-t-2xl">
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none z-10" />
                </div>

                <div className="p-6 flex flex-col flex-grow relative z-20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors duration-300 drop-shadow-md">
                        {car.name}
                      </h3>
                      <p className="text-gray-300 group-hover:text-gray-200 text-xs sm:text-sm font-semibold uppercase tracking-widest mt-1 drop-shadow-sm transition-colors duration-300">
                        {car.model}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-800/80 pt-5 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white transition-colors duration-300">${car.pricePerDay}</span>
                      <span className="text-gray-500 text-sm font-medium">/ day</span>
                    </div>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-2 flex gap-3 font-medium tracking-wide">
                      <span>${car.pricePerWeek}<span className="text-gray-600"> / wk</span></span>
                      <span className="text-gray-700">•</span>
                      <span>${car.pricePerMonth}<span className="text-gray-600"> / mo</span></span>
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Link to={`/car/${car.id}`}>
                      <button className="w-full bg-[#1A1A1A] hover:bg-red-600/90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 border border-gray-800 hover:border-red-500/50 flex justify-between items-center group/btn shadow-md hover:shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] text-sm">
                        <span className="tracking-wide">View Details</span>
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsList;