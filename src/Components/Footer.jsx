import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import icons from react-icons
import img from "../assets/images/Footer.png";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center text-center sm:text-left">
        {/* Logo Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <img src={img} alt="TourMate BD Logo" className="h-20 sm:h-24" />
          <span className="text-2xl sm:text-3xl font-semibold">TourMate BD</span>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center sm:justify-end lg:justify-center space-x-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub className="text-2xl sm:text-3xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaLinkedin className="text-2xl sm:text-3xl" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaTwitter className="text-2xl sm:text-3xl" />
          </a>
        </div>

        {/* Copyright and Credits */}
        <div className="text-sm sm:text-base md:items-center">
          <p>&copy; {currentYear} TourMate BD. All rights reserved.</p>
          <p>Designed by Tarikuzzaman</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
