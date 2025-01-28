import React, { useEffect, useState } from 'react';
import PackageCard from '../Components/PackageCard';

const Trips = () => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        fetch('https://tour-mate-bd-server-site.vercel.app/packages')
          .then(res => res.json())
          .then(data => setPackages(data));
      }, []);
    

    return (
        <div className='mb-10'>
          <h2 className='text-3xl font-bold text-center mb-9'>All Trips</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <PackageCard key={pkg._id} pkg={pkg} /> // Use PackageCard here
        ))}
      </div>
        </div>
    );
};

export default Trips;