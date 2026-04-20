import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8">
          <div className="flex items-center flex-col space-x-3">
            <img src="/Logo.png" alt="Logo" className="w-40 h-30 rounded-md shadow-md" />
            <div>
              {/* <h2 className="text-3xl font-bold text-white mb-2">Prime Exotics</h2> */}
              <p className="text-gray-400 text-sm">Luxury Car Rental Services</p>
            </div>
          </div>
          <Link
            to="/contact-us#form"
            className="mt-6 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg inline-block"
          >
            Book Your Ride
          </Link>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-sm text-gray-400">California, USA</p>
            <p className="text-sm text-gray-400 mt-2">Phone: +1 234567890</p>
            <p className="text-sm text-gray-400 mt-2">Email: info@veloxelite.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/our-fleet" className="text-sm text-gray-400 hover:text-red-500 transition-colors">Our Fleet</Link></li>
              <li><Link to="/about-us" className="text-sm text-gray-400 hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact-us" className="text-sm text-gray-400 hover:text-red-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all" aria-label="Facebook">
                <i className="ri-facebook-fill ri-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all" aria-label="Instagram">
                <i className="ri-instagram-fill ri-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all" aria-label="Twitter">
                <i className="ri-twitter-fill ri-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all" aria-label="LinkedIn">
                <i className="ri-linkedin-box-fill ri-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">© {currentYear} Velox Elite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
