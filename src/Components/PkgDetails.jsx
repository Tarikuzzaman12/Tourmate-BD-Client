import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PkgDetails = () => {
    const { id } = useParams(); // Extract the ID from the URL
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        // Fetch the package details from the server
        fetch(`http://localhost:5000/packages/${id}`)
            .then(res => res.json())
            .then(data => setPackageDetails(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!packageDetails) {
        return <p>Loading...</p>; // Show a loading state while fetching data
    }

    return (
        <div className="container mx-auto my-8 p-4">
        <div className="flex flex-col md:flex-row items-center bg-base-100 shadow-xl rounded-lg overflow-hidden">
            {/* Image Section */}
            <div className="md:w-1/2 w-full">
                <img
                    src={packageDetails.photo}
                    alt={packageDetails.tripTitle}
                    className="w-full h-96 object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 w-full p-6">
                <h2 className="text-4xl font-bold text-gray-800">{packageDetails.tripTitle}</h2>
                <p className="text-lg text-gray-600 mt-4">
                    <strong>Tour Type:</strong> {packageDetails.tourType}
                </p>
                <p className="text-2xl font-semibold text-gray-700 mt-4">
                    <strong>Price:</strong> ${packageDetails.price}
                </p>
                <p className="text-lg text-gray-700 mt-6">{packageDetails.description}</p>
            </div>
        </div>
    </div>
    );
};

export default PkgDetails;
