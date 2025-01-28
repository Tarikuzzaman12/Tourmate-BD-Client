import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider"; // AuthProvider with user info
import { useNavigate } from "react-router-dom"; // To handle navigation
import Swal from "sweetalert2"; // SweetAlert2 for alerts
import ReactConfetti from "react-confetti"; // React Confetti for animations

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Store the current page
  const [bookingsPerPage] = useState(10); // Show 10 bookings per page
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti animation
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all bookings
    setLoading(true);
    fetch(`https://tour-mate-bd-server-site.vercel.app/bookings`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return res.json();
      })
      .then((data) => {
        const userBookings = data.bookings.filter(
          (booking) => booking.touristEmail === user?.email
        );
        setBookings(userBookings || []);
        
        // Check if the user has more than 3 bookings and trigger confetti
        if (userBookings.length > 3) {
          setShowConfetti(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load your bookings. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://tour-mate-bd-server-site.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to cancel booking");
            }
            return res.json();
          })
          .then(() => {
            setBookings(bookings.filter((booking) => booking._id !== id));
            Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to cancel booking.", "error");
          });
      }
    });
  };

  const handlePay = (id) => {
    navigate(`/payment/${id}`);
  };

  // Pagination Logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!user) {
    return <div className="text-red-500 text-center">You need to log in to view your bookings.</div>;
  }

  if (loading) {
    return <div className="text-center">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="p-4 md:p-8">
      {showConfetti && <ReactConfetti />}
      
      <h1 className="text-2xl font-bold mb-6 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-sm md:text-base">Package Name</th>
                <th className="border px-4 py-2 text-sm md:text-base">Tour Guide</th>
                <th className="border px-4 py-2 text-sm md:text-base">Tour Date</th>
                <th className="border px-4 py-2 text-sm md:text-base">Price</th>
                <th className="border px-4 py-2 text-sm md:text-base">Status</th>
                <th className="border px-4 py-2 text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border px-4 py-2 text-xs md:text-base">{booking.packageName}</td>
                  <td className="border px-4 py-2 text-xs md:text-base">{booking.guideName}</td>
                  <td className="border px-4 py-2 text-xs md:text-base">{booking.tourDate}</td>
                  <td className="border px-4 py-2 text-xs md:text-base">${booking.price}</td>
                  <td className="border px-4 py-2 text-xs md:text-base">{booking.status}</td>
                  <td className="border px-4 py-2 flex flex-col md:flex-row gap-2">
                    {booking.status === "Pending" && (
                      <>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          onClick={() => handlePay(booking._id)}
                        >
                          Pay
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>

      {showConfetti && (
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-green-600">Congratulations! 🎉</h2>
          <p className="text-lg">You have successfully booked more than 3 tours! Enjoy your adventures!</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
