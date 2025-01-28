import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState(null);

  const roleOptions = [
    { value: "User", label: "User" },
    { value: "Guide", label: "guide" },
    { value: "Admin", label: "Admin" },
  ];

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://tour-mate-bd-server-site.vercel.app/users?role=${roleFilter?.value || ""}&search=${searchQuery}`
        );
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [roleFilter, searchQuery]);

  // Filter users by search and role locally (optional)
  useEffect(() => {
    let updatedUsers = users;

    if (searchQuery) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter) {
      updatedUsers = updatedUsers.filter(
        (user) => user.role?.toLowerCase() === roleFilter.value.toLowerCase()
      );
    }

    setFilteredUsers(updatedUsers);
  }, [searchQuery, roleFilter, users]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Users</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border px-4 py-2 rounded"
        />
        <div className="w-64">
          <Select
            options={roleOptions}
            placeholder="Filter by role"
            isClearable
            value={roleFilter}
            onChange={(selectedOption) => setRoleFilter(selectedOption)}
          />
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role || "User"}</td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
