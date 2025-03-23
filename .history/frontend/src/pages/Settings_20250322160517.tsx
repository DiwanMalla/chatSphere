import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    isCheckingAuth,
    checkAuth,
  } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [profilePic, setProfilePic] = useState("");
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
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setProfilePic(base64Image);
        await updateProfile({ profilePicture: base64Image });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      email: formData.email,
      profilePicture: authUser.profilePicture,
    });
    setIsEditing(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg">
          Please log in to manage your settings.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-4xl font-bold text-center text-white">Settings</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={
                profilePic ||
                authUser.profilePicture ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-cyan-500"
            />
            <label
              htmlFor="avatar-upload"
              className="mt-2 cursor-pointer text-cyan-400"
            >
              <Camera className="w-5 h-5 inline-block" /> Change Profile Picture
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-1/2 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Account Management
          </h2>
          <p className="text-gray-300">
            Member Since:{" "}
            {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
          </p>
          <p className="text-gray-300">Status: {authUser.status || "Active"}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
