import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [profilePic, setProfilePic] = useState(null); // Placeholder for profile picture
  const navigate = useNavigate();

  // Check auth and populate form data on mount
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      toast.success("Profile picture selected (upload not implemented)");
      // Add upload logic here if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for updateProfile (add to useAuthStore if needed)
      const updateProfile =
        useAuthStore.getState().updateProfile || (async () => {});
      await updateProfile(formData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      // Placeholder for logout (add to useAuthStore if needed)
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
        <p className="text-white">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Profile Title */}
        <h1 className="text-4xl font-bold text-center text-white">Profile</h1>

        {/* Profile Information */}
        <div className="rounded-xl bg-gray-900/80 backdrop-blur-md shadow-2xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Your Profile Information
          </h2>
          <p className="text-gray-300">
            <span className="font-medium">Full Name:</span> {authUser.fullName}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Email:</span> {authUser.email}
          </p>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-cyan-500 object-cover"
          />
        </div>

        {/* Update Picture Instructions */}
        <div className="text-center text-gray-400">
          <p>To update your picture, upload a new image below:</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
          />
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-gray-900/80 backdrop-blur-md shadow-2xl border border-gray-700/50 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Edit Profile
          </h2>
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
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
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
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none transition-all duration-300"
              >
                Save
              </button>
            )}
          </div>
        </form>

        {/* Account Information */}
        <div className="rounded-xl bg-gray-900/80 backdrop-blur-md shadow-2xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Account Information
          </h2>
          <p className="text-gray-300">
            <span className="font-medium">Member Since:</span>{" "}
            {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Account Status:</span>{" "}
            {authUser.status || "Active"}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none transition-all duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
