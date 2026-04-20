import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Link, useParams } from 'react-router-dom';
import carsData from '../carsData';

// SVG Icons
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

const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const ArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Car3DModel = ({ modelPath, autoRotate }) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef();
  const { viewport } = useThree();
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const fitModelToViewport = () => {
    if (!groupRef.current) return;
    
    const g = groupRef.current;
    const box = new THREE.Box3().setFromObject(g);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    if (maxDim > 0) {
      const isMobile = viewport.width < 6;
      const baseScale = isMobile ? 3.0 : 4.5;
      const scale = Math.min(7.0, baseScale / maxDim);
      g.scale.setScalar(scale);
    }
    
    const center = box.getCenter(new THREE.Vector3());
    g.position.x += -center.x;
    g.position.y += -center.y;
    g.position.z += -center.z;
  };

  useEffect(() => {
    fitModelToViewport();
  }, [scene, clonedScene, viewport.width, modelPath]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
};

const CameraController = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const isMobile = size.width < 768;
    camera.position.z = isMobile ? 2.5 : 1.2;
    camera.fov = isMobile ? 20 : 12;
    camera.updateProjectionMatrix();
  }, [size.width, camera]);
  
  return null;
};

const ModelLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4 bg-black/60 rounded-lg text-white backdrop-blur-sm">
        <div className="mb-2 font-semibold">Loading 3D Model</div>
        <div className="w-48 h-2 bg-gray-700 rounded overflow-hidden">
          <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-red-500 to-red-700" />
        </div>
        <div className="mt-2 text-sm text-gray-300">{Math.round(progress)}%</div>
      </div>
    </Html>
  );
};

const Car3DShowcase = () => {
  const { id } = useParams();
  const [autoRotate, setAutoRotate] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Find the car from cars data
  const car = carsData.find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-4">
        <div className="text-center bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-slate-700 max-w-md w-full">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Car Not Found</h1>
          <Link 
            to="/our-fleet" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft />
            Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  const carouselImages = car.carouselImages || car.images || [car.image];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Navigation Bar Spacer */}
      <div className="h-20 md:h-24"></div>

      {/* Hero Section with 3D Model */}
      {/* <section className="relative w-full mb-12"> */}
        <section className="w-screen flex flex-col">

  {/* ========================= */}
  {/* TOP — FULL WIDTH 3D MODEL */}
  {/* ========================= */}

  <div className="relative w-screen h-[80vh] overflow-hidden">

    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.3, 4.5], fov: 26 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
    >
      <CameraController />

      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 5]} intensity={1.4} />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} />

      <Suspense fallback={<ModelLoader />}>
        <Car3DModel
          modelPath={car.model3D}
          autoRotate={autoRotate && !isUserInteracting}
        />
      </Suspense>

      <Environment preset="sunset" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.5}
        onStart={() => {
          setIsUserInteracting(true);
          setAutoRotate(false);
        }}
        onEnd={() => {
          setIsUserInteracting(false);
          setTimeout(() => setAutoRotate(true), 2000);
        }}
      />
    </Canvas>

    {/* Pause Button */}
    <button
      onClick={() => setAutoRotate(!autoRotate)}
      className="absolute bottom-6 left-6 px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all"
    >
      {autoRotate ? "Pause Rotation" : "Resume Rotation"}
    </button>

    {/* Rating */}
    <div className="absolute top-6 right-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg">
      <Star />
      {car.rating}
    </div>
  </div>

  {/* ========================= */}
  {/* BOTTOM — CAR INFORMATION */}
  {/* ========================= */}

  <div className="w-full bg-gradient-to-br from-slate-950 to-slate-900 py-12 px-4 md:px-8 lg:px-16">

    <div className="max-w-6xl mx-auto flex flex-col gap-8">

      {/* Title Section */}
      <div className="space-y-4">
        <span className="text-red-500 font-bold uppercase tracking-wider text-sm">
          {car.brand}
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            {car.name}
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl text-red-400 font-bold">
          {car.model}
        </h2>

        <p className="text-gray-300 text-base md:text-lg max-w-3xl">
          {car.description}
        </p>
      </div>

      {/* Pricing — FLEX not Grid */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 bg-slate-800/70 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-red-500">${car.pricePerDay}</div>
          <div className="text-slate-400 text-sm">Per Day</div>
        </div>

        <div className="flex-1 bg-slate-800/70 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-red-500">${car.pricePerWeek}</div>
          <div className="text-slate-400 text-sm">Per Week</div>
        </div>

        <div className="flex-1 bg-slate-800/70 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-red-500">${car.pricePerMonth}</div>
          <div className="text-slate-400 text-sm">Per Month</div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">

        <button onClick={() => window.location.href = '/contact-us#form'} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-red-500/50">
          Book Now
        </button>

        <button onClick={() => window.location.href = '/contact-us#form'} className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-white py-4 rounded-xl font-bold text-lg transition-all border border-slate-600 hover:border-red-500/50">
          Contact Specialist
        </button>

      </div>

    </div>
  </div>

</section>

      {/* </section> */}

      {/* Image Carousel Section */}
      {carouselImages.length > 1 && (
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12 container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
              Gallery <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Views</span>
            </h2>

            <div className="relative rounded-3xl overflow-hidden border border-red-500/30 shadow-2xl bg-black/30">
              {/* Main Image */}
              <img
                src={carouselImages[activeImage]}
                alt={`${car.name} - View ${activeImage + 1}`}
                className="w-full h-96 md:h-[500px] object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
              >
                <ChevronRight />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold">
                {activeImage + 1} / {carouselImages.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-6">
              {carouselImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    activeImage === idx ? 'border-red-500 shadow-lg shadow-red-500/50' : 'border-slate-700 hover:border-red-500/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {car.highlights && car.highlights.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12 container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
              Why Choose <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">{car.name}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {car.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700 hover:border-red-500/50 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-red-500/20"
                >
                  <div className="text-4xl mb-4">{highlight.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{highlight.title}</h3>
                  <p className="text-gray-300 text-sm">{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Features Section */}
      {car.features && car.features.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12 container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
              Premium <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Features</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {car.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700 hover:border-red-500/50 rounded-2xl p-4 md:p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-red-600 rounded-full p-2 md:p-3 flex-shrink-0 group-hover:bg-red-700 transition-all">
                      <Check />
                    </div>
                    <span className="text-gray-200 text-sm md:text-base font-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Specifications */}
      {car.specifications && car.specifications.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12 container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
              Technical <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Specifications</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {car.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700 rounded-xl p-4 md:p-6 text-center hover:border-red-500/50 transition-all"
                >
                  <div className="text-red-500 font-bold text-xl md:text-2xl mb-2">{spec.value}</div>
                  <div className="text-slate-400 text-xs md:text-sm font-medium">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12 container mx-auto">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-600/20 via-red-700/20 to-red-600/20 border border-red-500/30 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Experience Luxury?</h2>
          <p className="text-gray-300 text-base md:text-lg mb-8">Get behind the wheel of the {car.name} today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 md:py-4 px-8 md:px-12 rounded-xl font-bold text-base md:text-lg transition-all shadow-lg">
              Reserve Now
            </button>
            <Link
              to="/our-fleet"
              className="bg-slate-800/50 hover:bg-slate-700/50 text-white py-3 md:py-4 px-8 md:px-12 rounded-xl font-bold text-base md:text-lg transition-all border border-slate-600 inline-block"
            >
              See More Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-12"></div>
    </div>
  );
};

export default Car3DShowcase;
