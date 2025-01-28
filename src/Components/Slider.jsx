import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/images/bandorban.jpg";
import image2 from "../assets/images/coexbazar.avif";
import image3 from "../assets/images/sajek-valley.jpg";
import image4 from "../assets/images/sundorbanforest.jpg";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Images and their related text
  const slides = [
    {
      image: image1,
      title: "Explore the Beauty of Bandarban",
      description: "Book your stay to experience the majestic hills and serene environment of Bandarban.",
    },
    {
      image: image2,
      title: "Relax at Cox's Bazar",
      description: "Discover the world's longest sea beach and enjoy luxurious accommodations nearby.",
    },
    {
      image: image3,
      title: "Unwind in Sajek Valley",
      description: "Escape to the clouds and stay in the picturesque Sajek Valley.",
    },
    {
      image: image4,
      title: "Adventure in Sundarbans",
      description: "Visit the world's largest mangrove forest and enjoy a peaceful retreat.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative">
      {/* Slider Section */}
      <div className="carousel w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item w-full ${activeIndex === index ? "block" : "hidden"}`}
          >
            <img
              src={slide.image}
              className="w-full object-cover mx-auto h-[50vh] md:h-[80vh]"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {slides[activeIndex].title}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {slides[activeIndex].description}
        </p>
        <div className="flex gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            <Link to="trips">Explore More</Link>
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex w-full justify-center gap-2 py-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`rounded-full h-3 w-3 ${activeIndex === index ? "bg-green-500" : "bg-gray-400"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
