import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
  const navItems = [
    { name: "Manage Profile", path: "/dashboard/user/manage-profile" },
    { name: "My Bookings", path: "/dashboard/user/my-bookings" },
    { name: "Add Stories", path: "/dashboard/user/add-story" },
    { name: "Manage Stories", path: "/dashboard/user/manage-stories" },
    { name: "Join as Tour Guide", path: "/dashboard/user/join-guide" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 lg:relative`}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">Tourist Dashboard</h2>
          <button onClick={toggleSidebar} className="text-white">
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <h2 className="hidden lg:block text-xl font-bold mb-4">
          Tourist Dashboard
        </h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive ? "bg-blue-500" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav click
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto ">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Tourist Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-800">
            <FaBars className="text-2xl" />
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
