// import React, { useEffect, useState, Suspense } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { useGLTF, Environment, OrbitControls, Html } from '@react-three/drei'
// import * as THREE from 'three'

// gsap.registerPlugin(ScrollTrigger)

// // 3D Car Model Component
// const CarModel3D = ({ modelPath }) => {
//   const { scene } = useGLTF(modelPath)
//   const groupRef = React.useRef()
//   const clonedScene = React.useMemo(() => scene.clone(), [scene])

//   useFrame((state, delta) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += delta * 0.5
//     }
//   })

//   useEffect(() => {
//     if (!groupRef.current) return
//     const g = groupRef.current
//     const box = new THREE.Box3().setFromObject(g)
//     const size = box.getSize(new THREE.Vector3())
//     const maxDim = Math.max(size.x, size.y, size.z)
//     if (maxDim > 0) {
//       const scale = Math.min(6.0, 5.0 / maxDim)
//       g.scale.setScalar(scale)
//     }
//     const center = box.getCenter(new THREE.Vector3())
//     g.position.x += -center.x
//     g.position.y += -center.y
//     g.position.z += -center.z
//   }, [scene, clonedScene])

//   return (
//     <group ref={groupRef}>
//       <primitive object={clonedScene} />
//     </group>
//   )
// }

// // Loading fallback
// function ModelLoader() {
//   return (
//     <Html center>
//       <div className="text-white text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-3"></div>
//         <p className="text-sm">Loading 3D Model...</p>
//       </div>
//     </Html>
//   )
// }

// const SL63Showcase = () => {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)

//     // Smooth scroll animations for text elements
//     gsap.registerPlugin(ScrollTrigger)
    
//     const headingAnimation = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.sl63-section',
//         start: 'top center',
//         end: 'top 200px',
//         scrub: 0.5,
//         markers: false,
//       },
//     })

//     headingAnimation.fromTo(
//       '.sl63-heading',
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 1 }
//     )

//     // Animate spec cards on scroll
//     gsap.utils.toArray('.spec-card').forEach((card, index) => {
//       gsap.fromTo(
//         card,
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           delay: index * 0.1,
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 80%',
//             end: 'top 60%',
//             scrub: 0.3,
//           },
//         }
//       )
//     })

//     // Animate feature list items
//     gsap.utils.toArray('.feature-item').forEach((item, index) => {
//       gsap.fromTo(
//         item,
//         { opacity: 0, x: -30 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 0.6,
//           delay: index * 0.08,
//           scrollTrigger: {
//             trigger: item,
//             start: 'top 75%',
//             end: 'top 55%',
//             scrub: 0.3,
//           },
//         }
//       )
//     })

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill())
//     }
//   }, [])

//   return (
//     <section className="sl63-section relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black py-20 px-4 sm:px-6 lg:px-8">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl opacity-20"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700/5 rounded-full blur-3xl opacity-15"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-full">
//                 <span className="text-red-400 text-sm font-semibold tracking-widest">PINNACLE OF LUXURY</span>
//               </div>
//               <h1 className="sl63-heading text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
//                 Mercedes-AMG
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 mt-2">
//                   SL63
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
//                 Experience the epitome of open-air performance with the SL63 – a masterpiece of engineering, luxury, and raw power combined into one breathtaking experience.
//               </p>
//             </div>

//             {/* Key Stats */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="spec-card bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
//                 <div className="text-red-400 text-3xl font-bold">585</div>
//                 <div className="text-gray-400 text-sm mt-1">Horsepower</div>
//               </div>
//               <div className="spec-card bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
//                 <div className="text-red-400 text-3xl font-bold">3.9s</div>
//                 <div className="text-gray-400 text-sm mt-1">0-60 mph</div>
//               </div>
//               <div className="spec-card bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
//                 <div className="text-red-400 text-3xl font-bold">200</div>
//                 <div className="text-gray-400 text-sm mt-1">Top Speed</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105">
//               <span className="relative z-10 flex items-center gap-2">
//                 Book Your Experience
//                 <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//             </button>
//           </div>

//           {/* Right - 3D Model Viewer */}
//           <div className="relative group h-96 md:h-[500px]">
//             <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-white/10 rounded-2xl overflow-hidden group-hover:border-red-500/50 transition-all duration-500 h-full">
//               <Suspense fallback={<ModelLoader />}>
//                 <Canvas
//                   gl={{ antialias: true, alpha: true }}
//                   camera={{ position: [0, 0, 1], fov: 14 }}
//                   style={{ width: '100%', height: '100%', background: 'transparent' }}
//                 >
//                   <CarModel3D modelPath="/models/mercedessl63.glb" />
//                   <Environment preset="studio" />
//                   <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
//                 </Canvas>
//               </Suspense>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="bg-gradient-to-r from-red-950/30 to-transparent border border-red-500/20 rounded-2xl p-8 sm:p-12 mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Engineered Excellence</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: '⚡',
//                 title: 'Twin-Turbocharged',
//                 desc: 'A 4.0L twin-turbo V8 delivering 585 horsepower and 516 lb-ft of torque',
//               },
//               {
//                 icon: '🎯',
//                 title: 'Performance Luxury',
//                 desc: 'AMG suspension tuned for precision, adaptive dynamics for comfort',
//               },
//               {
//                 icon: '🛡️',
//                 title: 'Advanced Safety',
//                 desc: 'Cutting-edge driver assistance and safety technologies integrated seamlessly',
//               },
//               {
//                 icon: '🎨',
//                 title: 'Iconic Design',
//                 desc: 'Sculpted bodywork with flowing lines and aggressive aerodynamics',
//               },
//               {
//                 icon: '🔊',
//                 title: 'Premium Sound',
//                 desc: 'Burmester 3D surround system with immersive audio experience',
//               },
//               {
//                 icon: '📱',
//                 title: 'Smart Integration',
//                 desc: 'Seamless connectivity with your digital ecosystem and lifestyle',
//               },
//             ].map((feature, idx) => (
//               <div key={idx} className="feature-item bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
//                 <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
//                 <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
//                 <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Specifications Grid */}
//         <div className="mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Premium Specifications</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               { label: 'Engine', value: '4.0L Twin-Turbo V8' },
//               { label: 'Power', value: '585 hp @ 5,250 RPM' },
//               { label: 'Torque', value: '516 lb-ft @ 2,000 RPM' },
//               { label: 'Transmission', value: '9-Speed Automatic' },
//               { label: '0-60 mph', value: '3.9 seconds' },
//               { label: 'Top Speed', value: '200 mph' },
//               { label: 'Fuel Economy', value: '19 City / 26 Hwy' },
//               { label: 'Seating', value: '2 Passenger' },
//             ].map((spec, idx) => (
//               <div key={idx} className="spec-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/20 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 group">
//                 <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">{spec.label}</p>
//                 <p className="text-white text-lg font-bold group-hover:text-red-400 transition-colors duration-300">{spec.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="relative bg-gradient-to-r from-red-600/30 via-red-500/20 to-transparent border border-red-500/40 rounded-2xl p-12 text-center overflow-hidden group">
//           <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-red-600 to-transparent"></div>
//           <div className="relative z-10 space-y-6">
//             <h3 className="text-3xl sm:text-4xl font-bold text-white">Ready to Drive Luxury?</h3>
//             <p className="text-gray-300 max-w-2xl mx-auto text-lg">
//               Rent the Mercedes-AMG SL63 and experience the perfect fusion of performance and elegance. 
//               Book your premium drive experience today.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
//                 Reserve Now
//               </button>
//               <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all duration-300 backdrop-blur">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SL63Showcase
