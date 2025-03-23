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
  const [activeTab, setActiveTab] = useState("profile");
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
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setProfilePic(base64Image);
      await updateProfile({ profilePicture: base64Image });
      toast.success("Profile picture updated");
    };
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        fullName: profileFormData.fullName,
        email: profileFormData.email,
        profilePicture: profilePic || authUser.profilePicture,
      });
      toast.success("Profile updated");
      setIsEditingProfile(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  // Password Handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordFormData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      await updateProfile({ currentPassword, newPassword });
      toast.success("Password updated");
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-300 text-lg">
          Please log in to manage settings.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-100 mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 text-sm font-medium text-gray-400 border-b-2 transition-colors duration-200 ${
              activeTab === "profile"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent hover:text-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-3 text-sm font-medium text-gray-400 border-b-2 transition-colors duration-200 ${
              activeTab === "password"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent hover:text-gray-200"
            }`}
          >
            Password
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          {activeTab === "profile" ? (
            <>
              {/* Profile Picture */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={
                      profilePic ||
                      authUser.profilePicture ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 bg-cyan-500 p-1 rounded-full cursor-pointer hover:bg-cyan-600 transition-colors duration-200 ${
                      isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <Camera className="w-4 h-4 text-white" />
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
                <div>
                  <p className="text-gray-300 font-medium">
                    {authUser.fullName || "Unnamed User"}
                  </p>
                  <p className="text-gray-500 text-sm">{authUser.email}</p>
                </div>
              </div>

              {/* Profile Form */}
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
                    className={`w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-200 ${
                      !isEditingProfile ? "opacity-75" : ""
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
                    className={`w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-200 ${
                      !isEditingProfile ? "opacity-75" : ""
                    }`}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="flex-1 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500 focus:outline-none transition-colors duration-200"
                  >
                    {isEditingProfile ? "Cancel" : "Edit Profile"}
                  </button>
                  {isEditingProfile && (
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className={`flex-1 py-2 bg-cyan-500 text-white rounded-md focus:outline-none transition-colors duration-200 ${
                        isUpdatingProfile
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-cyan-600"
                      }`}
                    >
                      {isUpdatingProfile ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            /* Password Form */
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
        </div>

        {/* Account Info */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Account</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              <span className="font-medium text-gray-300">Member Since:</span>{" "}
              {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium text-gray-300">Status:</span>{" "}
              {authUser.status || "Active"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none transition-colors duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
