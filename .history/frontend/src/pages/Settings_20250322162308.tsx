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
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordFormData;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updateProfile({ currentPassword, newPassword });
      toast.success("Password updated successfully");
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        <p className="text-lg">Please log in to manage your settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-teal-400">
          Settings
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 border-b border-gray-800 pb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-medium rounded-t-md transition-colors ${
              activeTab === "profile"
                ? "bg-teal-600 text-white"
                : "text-gray-400 hover:text-teal-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-4 py-2 font-medium rounded-t-md transition-colors ${
              activeTab === "password"
                ? "bg-teal-600 text-white"
                : "text-gray-400 hover:text-teal-300"
            }`}
          >
            Password
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          {activeTab === "profile" && (
            <>
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

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileFormData.fullName}
                    onChange={handleProfileChange}
                    disabled={!isEditingProfile}
                    className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileFormData.email}
                    onChange={handleProfileChange}
                    disabled={!isEditingProfile}
                    className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="w-full py-2 bg-gray-600 rounded-md hover:bg-gray-500 text-white transition-colors"
                  >
                    {isEditingProfile ? "Cancel" : "Edit Profile"}
                  </button>
                  {isEditingProfile && (
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="w-full py-2 bg-teal-600 rounded-md hover:bg-teal-700 text-white disabled:opacity-50 flex items-center justify-center transition-colors"
                    >
                      {isUpdatingProfile ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}

          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full py-2 bg-teal-600 rounded-md hover:bg-teal-700 text-white disabled:opacity-50 flex items-center justify-center transition-colors"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          )}

          {/* Account Details */}
          <div className="border-t border-gray-700 pt-4">
            <h2 className="text-lg font-semibold text-gray-200">
              Account Details
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              <span className="font-medium">Member Since:</span>{" "}
              {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium">Status:</span>{" "}
              {authUser.status || "Active"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-600 rounded-md hover:bg-red-700 text-white transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
