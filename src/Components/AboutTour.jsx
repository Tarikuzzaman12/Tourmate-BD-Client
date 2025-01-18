import React from 'react';

const AboutTour = () => {
  return (
    <section className="my-12 bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">About the Tour</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-700 mb-4">
          Explore the beauty of nature and culture with our carefully curated tour. From picturesque landscapes to vibrant cities, this journey has something for everyone.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Visit historical landmarks and scenic spots.</li>
          <li>Enjoy comfortable accommodations and local cuisine.</li>
          <li>Guided tours with expert guides.</li>
          <li>Round-trip transportation included.</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutTour;
