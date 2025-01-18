import React from 'react';

const TourPlan = () => {
  const plan = [
    {
      day: 'Day 1',
      title: 'Arrival and Welcome',
      details: 'Arrive at the destination, check-in, and enjoy a welcome dinner.',
    },
    {
      day: 'Day 2',
      title: 'City Exploration',
      details: 'Visit major landmarks, museums, and local markets.',
    },
    {
      day: 'Day 3',
      title: 'Nature Adventure',
      details: 'Explore the nearby mountains and enjoy hiking trails.',
    },
    {
      day: 'Day 4',
      title: 'Departure',
      details: 'Wrap up the tour with a farewell breakfast and depart.',
    },
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6">Tour Plan</h2>
      <div className="space-y-6">
        {plan.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4 items-center">
            <h3 className="text-xl font-bold">{item.day}: {item.title}</h3>
            <p className="text-gray-700">{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourPlan;
