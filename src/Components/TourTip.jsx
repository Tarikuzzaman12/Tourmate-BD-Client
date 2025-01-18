import React from 'react';

const TourTip = () => {
  const tips = [
    {
      id: 1,
      title: 'Top Packing Tips for a Stress-Free Trip',
      snippet: 'Learn how to pack smart and travel light with these quick tips...',
    },
    {
      id: 2,
      title: 'Best Times to Visit Popular Destinations',
      snippet: 'Find out the ideal seasons to visit top attractions and avoid crowds...',
    },
    {
      id: 3,
      title: 'Local Etiquette: Do’s and Don’ts',
      snippet: 'Respect the local culture and customs with this helpful guide...',
    },
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6">Travel Tips & Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
            <p className="text-gray-600 mb-4">{tip.snippet}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourTip;
