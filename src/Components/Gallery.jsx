import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: '../assets/images/bandorban.jpg', title: 'Beach Sunset' },
    { id: 2, src: '../assets/images/bandorban.jpg', title: 'Mountain Trails' },
    { id: 3, src: '../assets/images/bandorban.jpg', title: 'City Lights' },
    { id: 4, src: '../assets/images/bandorban.jpg', title: 'Waterfall Views' },
    // Add more images as needed
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-48 object-cover transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-bold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
