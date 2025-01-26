import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider"; // Assuming AuthProvider provides user info
import { useNavigate } from "react-router-dom"; // To redirect to payment page
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch bookings");
          }
          return res.json();
        })
        .then((data) => setBookings(data.bookings || []))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
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
        fetch(`http://localhost:5000/bookings/${id}`, {
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

  if (loading) {
    return <div>Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Package Name</th>
              <th className="border px-4 py-2">Tour Guide</th>
              <th className="border px-4 py-2">Tour Date</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.packageName}</td>
                <td className="border px-4 py-2">{booking.guideName}</td>
                <td className="border px-4 py-2">{booking.tourDate}</td>
                <td className="border px-4 py-2">${booking.price}</td>
                <td className="border px-4 py-2">{booking.status}</td>
                <td className="border px-4 py-2">
                  {booking.status === "Pending" && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handlePay(booking._id)}
                      >
                        Pay
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
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
      )}
    </div>
  );
};

export default MyBookings;
