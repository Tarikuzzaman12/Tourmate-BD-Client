import { Outlet, NavLink } from "react-router-dom";

const GuideDashboardLayout = () => {
  const navItems = [
    { name: "Manage Profile", path: "/dashboard/guide/manage-profile" },
    { name: "My Assined Tour", path: "/dashboard/guide/my-assinged" },
    { name: "Add Stories", path: "/dashboard/guide/add-story" },
    { name: "Manage Stories", path: "/dashboard/guide/manage-stories" }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Tourist Dashboard</h2>
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
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default GuideDashboardLayout;
