import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isCheckingAuth, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <p className="text-white text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6 pt-20">
      <div className="w-full max-w-lg space-y-6">
        {/* Profile Header */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-[fadeIn_1s_ease-out]">
          Your Profile
        </h1>

        {/* Profile Card */}
        <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src={authUser.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 p-1 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Profile Information */}
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-100">
              {authUser.fullName || "Unnamed User"}
            </h2>
            <p className="text-gray-400">{authUser.email || "No email"}</p>
          </div>

          {/* Account Details */}
          <div className="space-y-2">
            <p className="text-gray-300 text-sm">
              <span className="font-medium">Member Since:</span>{" "}
              {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
            </p>
            <p className="text-gray-300 text-sm">
              <span className="font-medium">Account Status:</span>{" "}
              {authUser.status || "Active"}
            </p>
          </div>

          {/* Edit Profile Link */}
          <div className="mt-6 text-center">
            <NavLink
              to="/settings"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Edit Profile in Settings
            </NavLink>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg shadow-lg hover:from-red-700 hover:to-red-900 focus:outline-none transition-all duration-300 transform hover:scale-105"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
