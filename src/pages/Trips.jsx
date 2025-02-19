import React, { useEffect, useState } from 'react';
import PackageCard from '../Components/PackageCard';

const Trips = () => {
    const [packages, setPackages] = useState([]);
    const [sortedPackages, setSortedPackages] = useState([]);
    const [sortOrder, setSortOrder] = useState(""); // Sorting state

    useEffect(() => {
        fetch('https://tour-mate-bd-server-site.vercel.app/packages')
            .then(res => res.json())
            .then(data => {
                setPackages(data);
                setSortedPackages(data); // Initialize sortedPackages with fetched data
            });
    }, []);

    // Sorting function
    const handleSort = (order) => {
        const sorted = [...packages].sort((a, b) => {
            return order === "asc" ? a.price - b.price : b.price - a.price;
        });
        setSortedPackages(sorted);
        setSortOrder(order);
    };

    return (
        <div className='mb-10 container mx-auto px-6'>
            <h2 className='text-3xl font-bold text-center mb-6'>All Trips</h2>

            {/* Sorting Buttons */}
            <div className="flex justify-center mb-6">
                <button 
                    className={`btn mx-2 ${sortOrder === "asc" ? "btn-active" : "btn-outline"}`} 
                    onClick={() => handleSort("asc")}
                >
                    Sort by Price (Low to High)
                </button>
                <button 
                    className={`btn mx-2 ${sortOrder === "desc" ? "btn-active" : "btn-outline"}`} 
                    onClick={() => handleSort("desc")}
                >
                    Sort by Price (High to Low)
                </button>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPackages.map(pkg => (
                    <PackageCard key={pkg._id} pkg={pkg} />
                ))}
            </div>
        </div>
    );
};

export default Trips;
