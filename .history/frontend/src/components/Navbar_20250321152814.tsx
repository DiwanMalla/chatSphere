import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Assuming React Router for navigation
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(authUser);
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white">
              ChatSphere
            </NavLink>
          </div>

          {/* Desktop Menu */}
          {authUser && (
            <div className="hidden md:flex space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-cyan-400 transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-cyan-400 transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : ""
                  }`
                }
              >
                Chat
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-cyan-400 transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </div>
          )}

          {/* Auth Buttons (Desktop) */}
          {!authUser ? (
            <div className="hidden md:flex space-x-4">
              <NavLink
                to="/login"
                className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-cyan-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-200 ${
                    isActive ? "text-cyan-400 bg-gray-800" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-200 ${
                    isActive ? "text-cyan-400 bg-gray-800" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Chat
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-200 ${
                    isActive ? "text-cyan-400 bg-gray-800" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Profile
              </NavLink>
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200"
                onClick={toggleMenu}
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                onClick={toggleMenu}
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
