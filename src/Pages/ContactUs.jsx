import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import useFadeInAnimation from '../useFadeInAnimation';

const ContactUs = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        name: '',
        email: '',
        phone: '',
        // Step 2: Car Info
        carType: '',
        pickupDate: '',
        returnDate: '',
        passengers: '',
        specialRequests: ''
    });

    const titleRef = useFadeInAnimation({ direction: 'up', duration: 1 });
    const formRef = useFadeInAnimation({ direction: 'fade', duration: 1, delay: 0.3 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // EmailJS configuration
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Check if using demo credentials
            const isDemoMode = serviceId === 'service_123456789' ||
                              templateId === 'template_demo_contact' ||
                              publicKey === 'demo_public_key_12345';

            if (isDemoMode) {
                // Demo mode - simulate successful submission
                console.log('🚗 Car Rental Inquiry Submitted (Demo Mode):', {
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone
                    },
                    rental: {
                        carType: formData.carType,
                        pickupDate: formData.pickupDate,
                        returnDate: formData.returnDate,
                        passengers: formData.passengers,
                        specialRequests: formData.specialRequests
                    },
                    recipient: 'bbbhaiff@gmail.com',
                    timestamp: new Date().toLocaleString(),
                    note: 'This is a demo submission. Configure real EmailJS credentials to send actual emails.'
                });

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                setSubmitMessage('✅ Demo Mode: Inquiry submitted successfully! Check the browser console for details. To send real emails, configure EmailJS with your own credentials.');
                setFormData({
                    name: '', email: '', phone: '', carType: '', pickupDate: '', returnDate: '', passengers: '', specialRequests: ''
                });
                setCurrentStep(1);
                setIsSubmitting(false);
                return;
            }

            // Real EmailJS submission
            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please check your .env file.');
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                car_type: formData.carType,
                pickup_date: formData.pickupDate,
                return_date: formData.returnDate,
                passengers: formData.passengers,
                special_requests: formData.specialRequests,
                to_email: 'bbbhaiff@gmail.com'
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setSubmitMessage('✅ Thank you! Your inquiry has been sent successfully to bbbhaiff@gmail.com.');
            setFormData({
                name: '', email: '', phone: '', carType: '', pickupDate: '', returnDate: '', passengers: '', specialRequests: ''
            });
            setCurrentStep(1);
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitMessage('❌ Error: ' + error.message + '. Please try again or check your configuration.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Basic Information</h2>
            <div>
                <label className="block text-gray-300 mb-2">Full Name *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Enter your full name"
                />
            </div>
            <div>
                <label className="block text-gray-300 mb-2">Email Address *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Enter your phone number"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                >
                    Next Step
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Car Rental Details</h2>
            <div>
                <label className="block text-gray-300 mb-2">Preferred Car Type</label>
                <select
                    name="carType"
                    value={formData.carType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                >
                    <option value="">Select car type</option>
                    <option value="luxury-sedan">Luxury Sedan</option>
                    <option value="sports-car">Sports Car</option>
                    <option value="suv">SUV</option>
                    <option value="convertible">Convertible</option>
                    <option value="van">Van/Minivan</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-300 mb-2">Pickup Date</label>
                    <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 mb-2">Return Date</label>
                    <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    />
                </div>
            </div>
            <div>
                <label className="block text-gray-300 mb-2">Number of Passengers</label>
                <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                >
                    <option value="">Select passengers</option>
                    <option value="1-2">1-2 passengers</option>
                    <option value="3-4">3-4 passengers</option>
                    <option value="5-7">5-7 passengers</option>
                    <option value="8+">8+ passengers</option>
                </select>
            </div>
            <div>
                <label className="block text-gray-300 mb-2">Special Requests</label>
                <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Any special requirements or preferences..."
                ></textarea>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20">
            <div className="container mx-auto px-4 py-8">
                <div ref={titleRef}>
                    <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
                    {/* Progress indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-red-600' : 'bg-gray-600'}`}>
                                <span className="text-white font-semibold">1</span>
                            </div>
                            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-600'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-600'}`}>
                                <span className="text-white font-semibold">2</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={formRef} className="max-w-2xl mx-auto">
                    <div className="mb-6 p-4 bg-red-900/50 rounded-lg border border-red-700">
                        <h3 className="text-lg font-semibold text-red-300 mb-2">📧 Email Configuration Status</h3>
                        <p className="text-sm text-gray-300">
                            {(() => {
                                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                                const isDemoMode = serviceId === 'service_123456789' ||
                                                  templateId === 'template_demo_contact' ||
                                                  publicKey === 'demo_public_key_12345';

                                if (isDemoMode) {
                                    return '🔧 Demo Mode: Form submissions will be logged to console. Configure real EmailJS credentials to send actual emails.';
                                } else if (!serviceId || !templateId || !publicKey) {
                                    return '❌ Not Configured: Please set up EmailJS credentials in the .env file.';
                                } else {
                                    return '✅ Configured: Emails will be sent to bbbhaiff@gmail.com';
                                }
                            })()}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 ? renderStep1() : renderStep2()}
                    </form>
                    {submitMessage && (
                        <div className={`mt-6 p-4 rounded-lg ${submitMessage.includes('error') ? 'bg-red-600' : 'bg-green-600'}`}>
                            {submitMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;