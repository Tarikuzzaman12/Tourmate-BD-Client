import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from './Provider/AuthProvider';
import img from '../assets/images/navber.png'

const Navber = () => {
    const { user, signOutUser } = useContext(AuthContext); // Fetch user and logout function from context
    const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

    const handleSignout = () => {
        signOutUser()
            .then(() => {
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.error("Sign-out failed:", error.message);
            });
    };

    const links = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/trips">All Trips</Link></li>
            <li><Link to="/about">About Us</Link></li>
        </>
    );

   

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
    };

    return (
        <div className="navbar bg-base-100 shadow-lg">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link className=" text-blue-600" to="/">
                <img className='w-16 inline mr-3' src={img} alt="" />             
                <span className='font-bold'>TourMate BD</span>
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                {user ? (
                    <div className="relative">
                        <button
                            className="text-[20px] flex items-center gap-1 mr-3 hover:text-blue-500 transition-colors duration-300"
                            onClick={toggleDropdown} // Toggle dropdown on click
                        >
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full md:w-12 md:h-12 lg:w-12 lg:h-12"
                                />
                            ) : (
                                <FaUserCircle className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl" />
                            )}
                        </button>
                        {dropdownVisible && ( // Show dropdown if dropdownVisible is true
                            <div className="absolute z-30 right-0 mt-2 p-4 shadow bg-base-100 rounded-box w-60">
                                <p className="text-gray-700 font-semibold">{user.displayName || 'Anonymous User'}</p>
                                <p className="text-gray-500 text-sm">{user.email || 'No Email Available'}</p>
                                <hr className="my-2" />
                                <Link to="/dashboard" className="block text-blue-500 hover:underline">
                                    Dashboard
                                </Link>
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
                        className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navber;
