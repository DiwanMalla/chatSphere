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
    logout,
  } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile"); // Tab state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    fullName: "",
    email: "",
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      setProfileFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
      });
      setProfilePic(authUser.profilePicture || "");
    }
  }, [authUser]);

  // Profile Handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        setProfilePic(base64Image);
      }
      await updateProfile({ profilePicture: base64Image });
      toast.success("Profile picture updated");
    };
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile({
        fullName: profileFormData.fullName,
        email: profileFormData.email,
        profilePicture: profilePic || authUser.profilePicture,
      });
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  // Password Handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordFormData;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      // Assuming updateProfile can handle password updates; adjust as needed
      await updateProfile({
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully");
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Failed to update password");
    }
  };

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
          Please log in to manage your settings.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6 pt-20">
      <div className="w-full max-w-lg space-y-6">
        {/* Settings Header */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-[fadeIn_1s_ease-out]">
          Settings
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700/80"
            }`}
          >
            Profile
          </button>
        </div>

        {/* Settings Card */}
        <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={
                  profilePic ||
                  authUser.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-teal-500 group-hover:opacity-80 transition-opacity"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer transition-opacity ${
                  isUpdatingProfile
                    ? "opacity-100 pointer-events-none"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
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

          {/* Profile Edit Form */}
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profileFormData.fullName}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ${
                  !isEditingProfile
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
                value={profileFormData.email}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ${
                  !isEditingProfile
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-gray-700/80"
                }`}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="flex-1 py-2 bg-gray-700/80 text-white font-semibold rounded-lg hover:bg-gray-600/80 focus:outline-none transition-all duration-300 transform hover:scale-105"
              >
                {isEditingProfile ? "Cancel" : "Edit"}
              </button>
              {isEditingProfile && (
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className={`flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none transition-all duration-300 transform hover:scale-105 ${
                    isUpdatingProfile
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-cyan-600 hover:to-blue-700"
                  }`}
                >
                  {isUpdatingProfile ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Save"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
        <div>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "password"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700/80"
            }`}
          >
            Change Password
          </button>
        </div>
        {/* Password Edit Form */}
        {activeTab === "password" /* Password Form */ && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordFormData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-200"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordFormData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-200"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordFormData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-200"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className={`w-full py-2 bg-cyan-500 text-white rounded-md focus:outline-none transition-colors duration-200 ${
                isUpdatingProfile
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-cyan-600"
              }`}
            >
              {isUpdatingProfile ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        )}

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

export default Settings;
