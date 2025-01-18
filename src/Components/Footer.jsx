import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons from react-icons
import img from '../assets/images/Footer.png'
const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src={img} alt="TourMate BD Logo" className="h-40" />
          <span className="text-3xl font-semibold">TourMate BD</span>
        </div>
        
        {/* Social Media Links */}
        <div className="flex space-x-6 p-6">
          <a href="https://github.com/yourusername" target="_blank" className="text-white hover:text-gray-400">
            <FaGithub className="text-3xl" /> 
          </a>
          <a href="https://www.linkedin.com/in/yourusername" target="_blank" className="text-white hover:text-gray-400">
            <FaLinkedin className="text-3xl" /> 
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" className="text-white hover:text-gray-400">
            <FaTwitter className="text-3xl" /> 
          </a>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p>&copy; {currentYear} TourMate BD. All rights reserved.</p>
        <p>Designed by Tarikuzzaman</p>
      </div>
    </footer>
  );
}

export default Footer;
