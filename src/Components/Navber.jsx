import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navber = () => {
    const user = {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
        photoURL: '' // Replace with actual photo URL if available
    };

    const links = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/trips">Trips</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/login">Login/Register</Link></li>
        </>
    );

    const handleLogout = () => {
        // Logic for logging out the user
        console.log('User logged out');
    };

    return (
        <div className="navbar bg-base-100">
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
                <Link className="btn btn-ghost text-xl" to="/">
                    TourMate BD
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                <div className="relative group">
                    <Link className="text-[20px] flex items-center gap-1 mr-3 hover:text-blue-500 transition-colors duration-300">
                        {user && user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full md:w-12 md:h-12 lg:w-12 lg:h-12"
                            />
                        ) : (
                            <FaUserCircle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                        )}
                    </Link>
                    <div className="dropdown-content absolute right-0 mt-2 p-4 shadow bg-base-100 rounded-box w-48 hidden group-hover:block">
                        <p className="text-gray-700 font-semibold">{user?.displayName || 'Guest User'}</p>
                        <p className="text-gray-500 text-sm">{user?.email || 'No Email Available'}</p>
                        <hr className="my-2" />
                        <Link to="/dashboard" className="block text-blue-500 hover:underline">
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navber;
