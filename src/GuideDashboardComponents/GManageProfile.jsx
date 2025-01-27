import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";
import {  Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const GManageProfile = () => {
  const { user } = useContext(AuthContext); // Get logged-in user from AuthContext
  const navigate = useNavigate(); // Hook to navigate between routes
  const [userData, setUserData] = useState(null); // State to store logged-in user's data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [updatedUser, setUpdatedUser] = useState({ name: "", picture: "" }); // State for edited data

  // Fetch logged-in user's data
  useEffect(() => {
    if (user && user.email) {
      const fetchUserData = async () => {
        try {
          setLoading(true); // Start loading
          const response = await fetch(`http://localhost:5000/users/${user.email}`);
          if (!response.ok) throw new Error("Failed to fetch user data");
          const data = await response.json();
          setUserData(data); // Set fetched data to state
        } catch (err) {
          setError(err.message); // Handle errors
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchUserData();
    }
  }, [user]);
  // console.log(userData.Photo)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${user.email}`, {
        method: "PUT", // Update user data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) throw new Error("Failed to update profile");
  
      const updatedData = await response.json();
      setUserData(updatedData); // Update local state with new data
      setModalOpen(false); // Close modal after saving
  
      // Show success toast
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err.message);
  
      // Show error toast
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Render loading, error, or user data
  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl text-center  font-bold">Manage Profile</h1>
      {userData ? (
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-xl font-semibold">
            Welcome, {userData?.name || "User"}!
          </h2>
          {userData?.photo ? (
  <img
    src={user?.photoURL}
    alt="User Avatar"
    className="rounded-full w-24 h-24 mt-4"
  />
) : (
  <div className="rounded-full w-24 h-24 mt-4 bg-gray-300 flex items-center justify-center">
    <span className="text-white">No Photo</span>
  </div>
)}
          <p className="mt-4">Email: {userData?.email || "Email not available"}</p>
          <p>Role: {userData?.role || "Role not assigned"}</p>
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setModalOpen(true);
                setUpdatedUser({ name: userData.name, picture: userData.photo }); // Pre-fill form
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleInputChange}
                  className="border px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Picture URL</label>
                <input
                  type="text"
                  name="picture"
                  value={updatedUser.picture}
                  onChange={handleInputChange}
                  className="border px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  className="border px-3 py-2 w-full bg-gray-200 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={userData.role}
                  className="border px-3 py-2 w-full bg-gray-200 cursor-not-allowed"
                  readOnly
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 mt-4"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 mt-4 ml-4"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GManageProfile;
