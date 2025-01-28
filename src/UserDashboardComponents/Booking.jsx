import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider"; // AuthProvider with user info
import { useNavigate } from "react-router-dom"; // To handle navigation
import Swal from "sweetalert2"; // SweetAlert2 for alerts

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (!user) {
    return <div className="text-red-500 text-center">You need to log in to view your bookings.</div>;
  }

  if (loading) {
    return <div className="text-center">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-sm md:text-base">Package Name</th>
                <th className="border px-4 py-2 text-sm md:text-base">Tour Guide</th>
                <th className="border px-4 py-2 text-sm md:text-base">Tour Date</th>
                <th className="border px-4 py-2 text-sm md:text-base">Price</th>
                <th className="border px-4 py-2 text-sm md:text-base">Status</th>
                <th className="border px-4 py-2 text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
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
    </div>
  );
};

export default MyBookings;
