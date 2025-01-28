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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <PackageCard key={pkg._id} pkg={pkg} /> // Use PackageCard here
        ))}
      </div>
    );
};

export default Trips;