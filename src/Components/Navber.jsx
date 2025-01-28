import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";
import img from "../assets/images/navber.png";

const Navbar = () => {
  const { user, userData, signOutUser } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const response = await fetch(
            `https://tour-mate-bd-server-site.vercel.app/users/${user.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user role");
          }
          const data = await response.json();
          setRole(data.role);
        } catch (error) {
          console.error("Error fetching user role:", error.message);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  const navigateToDashboard = () => {
    if (userData?.role === "admin") {
      navigate("/dashboard/admin");
    } else if (userData?.role === "user") {
      navigate("/dashboard/user");
    } else if (userData?.role === "guide") {
      navigate("/dashboard/guide");
    } else {
      toast.error("Invalid role");
    }
  };

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out failed:", error.message);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/community">Community</Link>
      </li>
      <li>
        <Link to="/trips">All Trips</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg flex-wrap sm:flex-nowrap">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
          >
            {links}
          </ul>
        </div>
        <Link className="text-blue-600 flex items-center" to="/">
          <img
            className="w-10 sm:w-12 inline mr-3"
            src={img}
            alt="Logo"
          />
          <span className="font-bold text-lg sm:text-xl">
            TourMate BD
          </span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 mr-3 hover:text-blue-500 transition-colors duration-300"
              onClick={toggleDropdown}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-2xl sm:text-3xl" />
              )}
            </button>
            {dropdownVisible && (
              <div className="absolute z-30 right-0 mt-2 p-4 shadow bg-base-100 rounded-box w-52 sm:w-60">
                <p className="text-gray-700 font-semibold">
                  {user.displayName || "Anonymous User"}
                </p>
                <p className="text-gray-500 text-sm">
                  {user.email || "No Email Available"}
                </p>
                <hr className="my-2" />
                <button
                  onClick={navigateToDashboard}
                  className="block w-full text-left text-blue-500 hover:underline"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleSignout}
                  className="w-full mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
