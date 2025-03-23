import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    isCheckingAuth,
    checkAuth,
  } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
      });
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Temporary preview
        updateProfile({ profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleLogout = async () => {
    try {
      const logout = useAuthStore.getState().logout || (async () => {});
      await logout();
      setFormData({ fullName: "", email: "" });
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
    <div className="min-h-screen mt-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Profile Header */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-[fadeIn_1s_ease-out]">
          Profile
        </h1>

        {/* Profile Card */}
        <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={
                  authUser.profilePicture || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 p-1  hover:scale-105 transition-transform duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile}>'animate-pulse pointer-events-none' : '`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>

          {/* Profile Information */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">
              {authUser.fullName}
            </h2>
            <p className="text-gray-400">{authUser.email}</p>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ${
                  !isEditing
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-gray-700/80"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ${
                  !isEditing
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-gray-700/80"
                }`}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 py-2 bg-gray-700/80 text-white font-semibold rounded-lg hover:bg-gray-600/80 focus:outline-none transition-all duration-300 transform hover:scale-105"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Account Details
          </h2>
          <p className="text-gray-300 text-sm">
            <span className="font-medium">Member Since:</span>{" "}
            {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
          </p>
          <p className="text-gray-300 text-sm">
            <span className="font-medium">Account Status:</span>{" "}
            {authUser.status || "Active"}
          </p>
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
