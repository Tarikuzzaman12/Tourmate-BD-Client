import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("https://tour-mate-bd-server-site.vercel.app/bookings");
        const data = await response.json();

        // Check if the data is in the expected format
        if (data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings); // Set the bookings array from the response
        } else {
          console.error("Invalid data format:", data);
          toast.error("Unexpected data format received.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    console.log("Trying to accept booking:", bookingId); // Debugging line
    try {
      const response = await fetch(`https://tour-mate-bd-server-site.vercel.app/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Accepted" }),
      });
  
      if (!response.ok) throw new Error("Failed to accept booking.");
  
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "Accepted" } : booking
        )
      );
  
      toast.success("Booking accepted successfully.");
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking.");
    }
  };
  
  const handleReject = async (bookingId) => {
    console.log("Trying to reject booking:", bookingId); // Debugging line
    try {
      const response = await fetch(`https://tour-mate-bd-server-site.vercel.app/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected" }),
      });
  
      if (!response.ok) throw new Error("Failed to reject booking.");
  
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "Rejected" } : booking
        )
      );
  
      toast.success("Booking rejected successfully.");
    } catch (error) {
      console.error("Error rejecting booking:", error);
      toast.error("Failed to reject booking.");
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Package Name</th>
              <th className="py-2 px-4 border">Customer Name</th>
              <th className="py-2 px-4 border">Tour Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) &&
              bookings.filter((booking) => booking.status === "Pending").map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td className="py-2 px-4 border">{booking.packageName}</td>
                  <td className="py-2 px-4 border">{booking.
touristName}</td>
                  <td className="py-2 px-4 border">{booking.tourDate}</td>
                  <td className="py-2 px-4 border">{booking.status}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      onClick={() => handleAccept(booking._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(booking._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            {Array.isArray(bookings) &&
              bookings.filter((booking) => booking.status === "Pending").length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No pending bookings found
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
