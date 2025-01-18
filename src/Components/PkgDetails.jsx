import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from './Provider/AuthProvider'; // Assuming an AuthProvider for authentication
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PkgDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [packageDetails, setPackageDetails] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState('');
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        // Fetch package details
        fetch(`http://localhost:5000/packages/${id}`)
            .then((res) => res.json())
            .then((data) => setPackageDetails(data))
            .catch((err) => console.error(err));

        // Fetch tour guides
        fetch(`http://localhost:5000/guides`)
            .then((res) => res.json())
            .then((data) => setGuides(data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            toast.warn('Please log in to book a package!');
            navigate('/login');
            return;
        }

        const bookingInfo = {
            packageId: id,
            packageName: packageDetails.tripTitle,
            touristName: user.displayName,
            touristEmail: user.email,
            touristImage: user.photoURL,
            price: packageDetails.price,
            tourDate: selectedDate,
            guideName: selectedGuide,
            status: 'Pending',
        };

        // Save booking info
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Booking confirmed successfully!');
                } else {
                    toast.error('Booking failed. Please try again!');
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('An error occurred. Please try again!');
            });
    };

    if (!packageDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto my-8 p-4 space-y-8">
            <ToastContainer position="top-center" autoClose={3000} />
            {/* Gallery Section */}
            <div className="gallery-section">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packageDetails.photos && packageDetails.photos.length > 0 ? (
                        packageDetails.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Gallery ${index}`}
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                        ))
                    ) : (
                        <p>No photos available.</p>
                    )}
                </div>
            </div>

            {/* About the Tour Section */}
            <div className="about-tour-section">
                <h2 className="text-2xl font-bold mb-4">About The Tour</h2>
                <p className="text-lg text-gray-700">{packageDetails.description}</p>
            </div>

            {/* Tour Plan Section */}
            <div className="tour-plan-section">
                <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    {packageDetails.tourPlan && packageDetails.tourPlan.length > 0 ? (
                        packageDetails.tourPlan.map((plan, index) => (
                            <li key={index} className="mb-2">
                                <strong>Day {index + 1}:</strong> {plan}
                            </li>
                        ))
                    ) : (
                        <p>No tour plan available.</p>
                    )}
                </ul>
            </div>

            {/* Tour Guides Section */}
            <div className="tour-guides-section">
                <h2 className="text-2xl font-bold mb-4">Tour Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guides && guides.length > 0 ? (
                        guides.map((guide) => (
                            <div
                                key={guide.id}
                                className="card card-compact bg-base-100 w-96 shadow-xl"
                            >
                                <figure>
                                    <img src={guide.photo} alt={guide.name} />
                                </figure>
                                <div className="card-body">
                                    <h3 className="text-xl font-semibold mt-2">
                                        {guide.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        Experience: {guide.experience}
                                    </p>
                                    <p className="text-gray-700">
                                        Specialty: {guide.specialty}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No guides available.</p>
                    )}
                </div>
            </div>

            {/* Booking Form */}
            <div className="booking-form-section">
                <h2 className="text-2xl font-bold mb-4">Book Your Tour</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleBooking();
                    }}
                    className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
                >
                    <div>
                        <label className="block text-gray-700">Package Name</label>
                        <input
                            type="text"
                            value={packageDetails.tripTitle}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Tourist Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Tourist Email</label>
                        <input
                            type="text"
                            value={user?.email || ''}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Tourist Image</label>
                        <input
                            type="text"
                            value={user?.photoURL || ''}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="text"
                            value={`$${packageDetails.price}`}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Tour Date</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="w-full p-2 border rounded"
                            minDate={new Date()}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Tour Guide</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedGuide}
                            onChange={(e) => setSelectedGuide(e.target.value)}
                        >
                            <option value="">Select a guide</option>
                            {guides.map((guide) => (
                                <option key={guide.id} value={guide.name}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={!user || !selectedDate || !selectedGuide}
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PkgDetails;
