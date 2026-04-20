import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import carsData from '../carsData';
import LazyLoad from 'react-lazyload';
import { RemoveScroll } from 'react-remove-scroll';

// SVG Icons
const ArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const Star = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const Check = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

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

const Close = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CarDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const car = useMemo(() => carsData.find(car => car.id === parseInt(id)), [id]);

  const carImages = useMemo(() => car?.images || [car?.image].filter(Boolean), [car]);

  useEffect(() => {
    if (!isModalOpen || carImages.length <= 1) return;

    const interval = setInterval(() => {
      setModalImageIndex((prev) => (prev + 1) % carImages.length);
    }, 2500); // 2.5 seconds

    return () => clearInterval(interval);
  }, [isModalOpen, carImages.length]);

  const openModal = useCallback((index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % carImages.length);
  }, [carImages.length]);

  const prevImage = useCallback(() => {
    setActiveImage((prev) => (prev - 1 + carImages.length) % carImages.length);
  }, [carImages.length]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center px-4">
        <div className="text-center bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-slate-700 max-w-md w-full">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
            Car Not Found
          </h1>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <RemoveScroll enabled={isModalOpen}>
      <div className="min-h-screen bg-gradient-to-br pt-20 from-slate-900 via-blue-900/20 to-slate-900 text-white">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 sm:gap-3 bg-slate-800/80 hover:bg-slate-700/80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-slate-600 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft />
            <span className="font-medium">Back to Cars</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="mb-0 grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 max-sm:flex max-sm:flex-col lg:gap-12">

            {/* Image Gallery - Dynamic based on available images */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-600">
                {carImages.length > 0 ? (
                  <LazyLoad height={500} offset={100} once>
                    <img
                      src={carImages[activeImage]}
                      alt={`${car.name} ${car.model} - View ${activeImage + 1}`}
                      className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-contain"
                      loading="lazy"
                    />
                  </LazyLoad>
                ) : (
                  <div className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] flex items-center justify-center bg-slate-700/50">
                    <span className="text-slate-400">No images available</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery - Only show if multiple images */}
              {carImages.length > 1 && (
                <div className={`grid pb-10 gap-2 sm:gap-3 ${
                  carImages.length <= 4 ? 'grid-cols-4' : 
                  carImages.length <= 6 ? 'grid-cols-3 sm:grid-cols-6' :
                    'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'
                  }`}>
                  {carImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveImage(index);
                        openModal(index);
                      }}
                      className={`relative bg-slate-800/50 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                        activeImage === index ? 'border-red-500' : 'border-slate-600'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${car.name} view ${index + 1}`}
                        className="w-full h-16 sm:h-20 object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Header Section */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-600">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white">
                      {car.name}
                    </h1>
                    <h2 className="text-lg sm:text-xl text-slate-300 mb-3 sm:mb-4">{car.model}</h2>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{car.description}</p>
                  </div>
                  <div className="bg-red-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-xl sm:text-2xl text-center min-w-[120px] sm:min-w-[140px]">
                    ${car.pricePerDay}
                    <span className="text-sm font-normal block">per day</span>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600 hover:border-red-500/50 transition-all duration-300">
                  <div className="text-lg sm:text-xl font-bold text-red-500">${car.pricePerDay}</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Per Day</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600 hover:border-red-500/50 transition-all duration-300">
                  <div className="text-lg sm:text-xl font-bold text-red-500">${car.pricePerWeek}</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Per Week</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600 hover:border-red-500/50 transition-all duration-300">
                  <div className="text-lg sm:text-xl font-bold text-red-500">${car.pricePerMonth}</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Per Month</div>
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-600">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
                  Premium Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {car.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                      <div className="bg-red-500 rounded-full p-1 flex-shrink-0">
                        <Check />
                      </div>
                      <span className="text-slate-200 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600">
                  <div className="text-lg sm:text-xl font-bold text-red-500">4</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Seats</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600">
                  <div className="text-lg sm:text-xl font-bold text-red-500">Auto</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Transmission</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600">
                  <div className="text-lg sm:text-xl font-bold text-red-500">Premium</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Fuel Type</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center border border-slate-600">
                  <div className="text-lg sm:text-xl font-bold text-red-500">2024</div>
                  <div className="text-slate-300 text-xs sm:text-sm">Year</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button onClick={() => window.location.href = '/contact-us#form'} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg">
                  Rent This Car Now
                </button>
                <button onClick={() => window.location.href = '/contact-us#form'} className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white py-3 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 border border-slate-600">
                  Contact Specialist
                </button>
              </div>

              {/* Quick Info Banner */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-center">
                <h4 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">🚀 Instant Booking Available</h4>
                <p className="text-red-100 text-xs sm:text-sm">Get this luxury car delivered within 2 hours!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Modal with Auto-Carousel */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl max-h-screen flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
            >
              <Close />
            </button>

            <LazyLoad height={500} offset={100} once>
              <img
                src={carImages[modalImageIndex]}
                alt={`${car.name} view ${modalImageIndex + 1}`}
                className="w-full h-auto max-h-[85vh] object-contain"
                loading="lazy"
              />
            </LazyLoad>
          </div>
        </div>
      )}
    </RemoveScroll>
  );
};

export default CarDetail;