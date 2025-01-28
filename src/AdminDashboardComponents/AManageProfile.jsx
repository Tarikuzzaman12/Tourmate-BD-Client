import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";
import { toast } from "react-toastify";

const AManageProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", picture: "" });
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetch("https://tour-mate-bd-server-site.vercel.app/stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.error("Error fetching stories:", err));
  }, []);

  useEffect(() => {
    fetch("https://tour-mate-bd-server-site.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    fetch("https://tour-mate-bd-server-site.vercel.app/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  useEffect(() => {
    fetch("https://tour-mate-bd-server-site.vercel.app/guides")
      .then((res) => res.json())
      .then((data) => setGuides(data))
      .catch((err) => console.error("Error fetching guides:", err));
  }, []);

  useEffect(() => {
    if (user && user.email) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://tour-mate-bd-server-site.vercel.app/users/${user.email}`
          );
          if (!response.ok) throw new Error("Failed to fetch user data");
          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://tour-mate-bd-server-site.vercel.app/users/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      setUserData(updatedData);
      setModalOpen(false);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Manage Profile</h1>
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
                setUpdatedUser({ name: userData.name, picture: userData.photo });
              }}
            >
              Edit Profile
            </button>
          </div>

          {/* Table */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Type</th>
                  <th className="border border-gray-400 px-4 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">Users</td>
                  <td className="border border-gray-400 px-4 py-2">{users.length}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">Stories</td>
                  <td className="border border-gray-400 px-4 py-2">{stories.length}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">Packages</td>
                  <td className="border border-gray-400 px-4 py-2">{packages.length}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">Guides</td>
                  <td className="border border-gray-400 px-4 py-2">{guides.length}</td>
                </tr>
              </tbody>
            </table>
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
                <label className="block text-sm font-medium mb-1">
                  Picture URL
                </label>
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

export default AManageProfile;
