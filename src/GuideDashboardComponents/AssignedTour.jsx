import { useState } from "react";
import { Modal } from "./Modal";

const AssignedTours = () => {
  const [assignedTours, setAssignedTours] = useState([
   
    // Add more tour objects as needed
  ]);

  const [selectedTour, setSelectedTour] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false);

  const handleReject = (tour) => {
    setSelectedTour(tour);
    setShowModal(true);
  };

  const confirmReject = () => {
    setAssignedTours((prev) =>
      prev.map((tour) =>
        tour.id === selectedTour.id
          ? { ...tour, status: "Rejected" }
          : tour
      )
    );
    setShowModal(false);
    setSelectedTour(null);
  };

  const handleAccept = (id) => {
    setAssignedTours((prev) =>
      prev.map((tour) =>
        tour.id === id ? { ...tour, status: "Accepted" } : tour
      )
    );
  };

  const handleCancelTour = (packageName, touristName) => {
    setAssignedTours((prev) =>
      prev.filter(
        (tour) =>
          tour.packageName !== packageName || tour.touristName !== touristName
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Assigned Tours</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Package Name</th>
            <th className="border border-gray-300 px-4 py-2">Tourist Name</th>
            <th className="border border-gray-300 px-4 py-2">Tour Date</th>
            <th className="border border-gray-300 px-4 py-2">Tour Price</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTours.map((tour) => (
            <tr key={tour.id}>
              <td className="border border-gray-300 px-4 py-2">
                {tour.packageName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {tour.touristName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{tour.tourDate}</td>
              <td className="border border-gray-300 px-4 py-2">${tour.tourPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.status}</td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  className={`px-3 py-1 rounded ${
                    tour.status === "In Review"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={tour.status !== "In Review"}
                  onClick={() => handleAccept(tour.id)}
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-500 text-white"
                  onClick={() => handleReject(tour)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reject Confirmation Modal */}
      {showModal && (
        <Modal
          title="Confirm Rejection"
          onClose={() => setShowModal(false)}
          onConfirm={confirmReject}
        >
          Are you sure you want to reject the tour assignment for{" "}
          <b>{selectedTour?.packageName}</b>?
        </Modal>
      )}
    </div>
  );
};

export default AssignedTours;
