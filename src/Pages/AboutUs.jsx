import React, { Suspense, lazy } from 'react'
import useFadeInAnimation from '../useFadeInAnimation'
import { Award, Users, Globe, Zap, Shield, TrendingUp } from 'lucide-react'

const AboutUs = () => {
    const heroRef = useFadeInAnimation({ direction: 'up', duration: 1.2 });
    const storyTitleRef = useFadeInAnimation({ direction: 'up', duration: 1 });
    const storyContentRef = useFadeInAnimation({ direction: 'fade', duration: 1, delay: 0.2 });
    const statsRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.3 });
    const featuresRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.4 });
    const valuesRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.5 });
    const ctaRef = useFadeInAnimation({ direction: 'fade', duration: 1, delay: 0.6 });
    const interactiveRef = useFadeInAnimation({ direction: 'up', duration: 1, delay: 0.7 });

    const stats = [
        { number: '15+', label: 'Years Experience', icon: Award },
        { number: '50K+', label: 'Happy Customers', icon: Users },
        { number: '1000+', label: 'Vehicles Fleet', icon: Globe },
        { number: '99%', label: 'Satisfaction Rate', icon: TrendingUp }
    ];

    const values = [
        { 
            icon: Shield, 
            title: 'Safety First', 
            description: 'Every vehicle undergoes rigorous safety inspections and maintenance protocols.' 
        },
        { 
            icon: Zap, 
            title: 'Premium Quality', 
            description: 'We maintain only the latest models with luxury amenities and advanced technology.' 
        },
        { 
            icon: Users, 
            title: 'Customer Focus', 
            description: '24/7 customer support and personalized service for every rental experience.' 
        },
        { 
            icon: Globe, 
            title: 'Global Network', 
            description: 'Rent from us worldwide with flexible pickup and drop-off locations.' 
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <div ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20 flex items-center overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-red-600/10 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full filter blur-3xl -z-10"></div>

                <div className="container mx-auto px-4 py-10 sm:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                                About
                                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block sm:inline"> Our Legacy</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                                Since 2009, we've been delivering premium car rental experiences with uncompromising excellence and customer satisfaction.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-sm sm:text-base">
                                    Explore Our Fleet
                                </button>
                                <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-500 hover:border-red-500 rounded-lg font-semibold transition duration-300 hover:bg-gray-800 text-sm sm:text-base">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                        <div className="relative mt-8 lg:mt-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-2xl opacity-20 blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop"
                                alt="Premium Cars"
                                className="relative rounded-2xl shadow-2xl w-full object-cover h-64 sm:h-80 lg:h-96"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div ref={statsRef} className="bg-gray-900 text-white py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                                    <div className="relative bg-gray-800 p-4 sm:p-8 rounded-lg text-center border border-gray-700 group-hover:border-red-500 transition duration-300">
                                        <Icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 text-red-400" />
                                        <h3 className="text-2xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text mb-1 sm:mb-2">
                                            {stat.number}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-300">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="bg-gray-800 text-white py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <div ref={storyTitleRef} className="text-center mb-8 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Our Story</h2>
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
                    </div>

                    <div ref={storyContentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop"
                                alt="Our Heritage"
                                className="rounded-xl shadow-2xl w-full object-cover h-48 sm:h-64 lg:h-96"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Built on Trust & Excellence</h3>
                            <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-base sm:text-lg">
                                What started as a small dream in 2009 has grown into a trusted name in the luxury car rental industry. We believe that every journey deserves to be special, and every customer deserves world-class service.
                            </p>
                            <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-base sm:text-lg">
                                Our commitment to excellence has led us to become one of the fastest-growing premium car rental companies in the region. We invest heavily in our fleet and our team to ensure that every interaction with us exceeds expectations.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                                Today, we're proud to serve over 50,000 satisfied customers annually and maintain a fleet of 1000+ premium vehicles across multiple locations worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div ref={valuesRef} className="bg-gray-900 text-white py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Our Core Values</h2>
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className="group">
                                    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 group-hover:border-red-500 transition duration-300 h-full">
                                        <div className="flex items-start mb-4">
                                            <div className="p-2 sm:p-3 bg-gradient-to-br from-red-600 to-red-600 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold">{value.title}</h3>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{value.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-800 text-white py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Why Choose Us?</h2>
                            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center mt-1">
                                        <span className="text-white font-bold text-sm sm:text-base">✓</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">Wide Selection</h4>
                                    <p className="text-gray-400 text-sm sm:text-base">From luxury sedans to sports cars, we have something for everyone.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center mt-1">
                                        <span className="text-white font-bold text-sm sm:text-base">✓</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">Competitive Pricing</h4>
                                    <p className="text-gray-400 text-sm sm:text-base">Best rates without compromising on quality or service.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center mt-1">
                                        <span className="text-white font-bold text-sm sm:text-base">✓</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">24/7 Support</h4>
                                    <p className="text-gray-400 text-sm sm:text-base">Round-the-clock customer support whenever you need us.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center mt-1">
                                        <span className="text-white font-bold text-sm sm:text-base">✓</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">Easy Booking</h4>
                                    <p className="text-gray-400 text-sm sm:text-base">Simple and secure booking process with flexible options.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div ref={ctaRef} className="relative bg-gradient-to-r from-red-600 to-red-600 text-white py-12 sm:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full filter blur-3xl"></div>
                </div>

                <div className="relative container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to Drive Premium?</h2>
                    <p className="text-lg sm:text-xl text-red-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                        Experience luxury and comfort with our world-class vehicle collection and exceptional service.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <button onClick={() => window.location.href = '/contact-us#form'} className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base">
                            Book Now
                        </button>
                        <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition duration-300 w-full sm:w-auto text-sm sm:text-base">
                            View Fleet
                        </button>
                    </div>
                </div>
            </div>

           
        </>
    )
}

export default AboutUs