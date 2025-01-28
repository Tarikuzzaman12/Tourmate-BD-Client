import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GuideDetails = () => {
    const { id } = useParams();

    const [guideDetails, setGuideDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch guide details based on the guideId passed as a prop
        fetch(`https://tour-mate-bd-server-site.vercel.app/guides/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setGuideDetails(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching guide details:', err);
                setLoading(false);
            });
    }, []); // Re-fetch when guideId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!guideDetails) {
        return <div>No guide details available.</div>;
    }

    return (
        <div className="container mx-auto my-8 p-4 space-y-8">
            {/* Guide Info Section */}
            <div className="guide-info-section">
                <h2 className="text-2xl font-bold mb-4">{guideDetails.name}</h2>
                <div className="flex items-center">
                    <img
                        src={guideDetails.photo}
                        alt={guideDetails.name}
                        className="w-32 h-32 object-cover rounded-full mr-4"
                    />
                    <div>
                        <p className="text-lg text-gray-700">
                            <strong>Experience:</strong> {guideDetails.experience} years
                        </p>
                        <p className="text-lg text-gray-700">
                            <strong>Specialty:</strong> {guideDetails.specialty}
                        </p>
                        
                    </div>
                </div>
            </div>

            {/* Guide's Tours Section */}
            <div className="guide-tours-section mt-8">
                <h2 className="text-2xl font-bold mb-4">Tours Offered by {guideDetails.name}</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    {guideDetails.tours && guideDetails.tours.length > 0 ? (
                        guideDetails.tours.map((tour, index) => (
                            <li key={index} className="mb-2">
                                <strong>{tour.title}:</strong> {tour.description}
                            </li>
                        ))
                    ) : (
                        <p>No tours available for this guide.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default GuideDetails;
