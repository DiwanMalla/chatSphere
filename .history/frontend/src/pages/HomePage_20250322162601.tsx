import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Loader2, MessageSquare, Settings, LogOut, LogIn } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
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

  const handleStartChatting = () => {
    if (authUser) {
      navigate("/chat"); // Assuming you have a chat route
    } else {
      toast.error("Please log in to start chatting");
      navigate("/login");
    }
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-400">ChatSphere</h1>
        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <span className="text-sm text-gray-300">
                Welcome, {authUser.fullName || authUser.email}
              </span>
              <button
                onClick={handleSettings}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-teal-400" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5 text-red-400" />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Log In
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Connect with Friends Instantly
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
          ChatSphere brings you closer to the people who matter most. Fast,
          secure, and easy-to-use messaging awaits you.
        </p>
        <button
          onClick={handleStartChatting}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
          Start Chatting
        </button>
      </main>

      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Real-Time Messaging
            </h3>
            <p className="text-gray-400">
              Chat instantly with friends and see their replies in real-time.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-10 h-10 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm0 0c0-2.76-2.24-5-5-5S2 8.24 2 11s2.24 5 5 5 5-2.24 5-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-400">
              Your conversations are encrypted and safe with us.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-10 h-10 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Easy to Use
            </h3>
            <p className="text-gray-400">
              Simple interface designed for seamless communication.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ChatSphere. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
