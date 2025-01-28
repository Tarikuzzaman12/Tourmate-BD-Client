import React from 'react';
import { Link } from 'react-router-dom';

const TopDes = () => {
  const destinations = [
    {
      id: 1,
      name: 'Cox’s Bazar',
      description: 'The world’s longest sea beach with stunning views.',
      image: 'https://i.ibb.co.com/pd8ZmPD/longest-sea-beach-in.jpg',
    },
    {
      id: 2,
      name: 'Sundarbans',
      description: 'A UNESCO World Heritage Site and home of the Royal Bengal Tiger.',
      image: 'https://i.ibb.co.com/FD9KFZM/sundarban.jpg',
    },
    {
      id: 3,
      name: 'Bandarban',
      description: 'Breathtaking hills and waterfalls for nature lovers.',
      image: 'https://i.ibb.co.com/6yF6rM8/images.jpg',
    },
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6">Top Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="shadow-lg rounded-lg overflow-hidden">
            <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{dest.name}</h3>
              <p className="text-gray-600 mb-5">{dest.description}</p>
              <Link to="trips" className="bg-blue-600 text-white px-4  py-2 rounded ">
                Plan Your Trip
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDes;
