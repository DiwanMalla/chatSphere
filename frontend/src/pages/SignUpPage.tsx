import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (!formData.fullName) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return false;
    }
    return true;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = validateForm();
    if (success == true) signup(formData);
    // Add your signup logic here (e.g., API call)
    console.log("Signup Data:", formData);
  };

  return (
    <div className="min-h-screen flex gap-10 items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md p-8 rounded-xl bg-gray-900/80 backdrop-blur-md shadow-2xl border border-gray-700/50">
        {/* Logo or App Name */}
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          ChatSphere
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Join the future of messaging
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 top-6 right-0 flex items-center justify-center pr-3 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.675 0 3.24.514 4.525 1.387M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 4.418-3.582 8-8 8M9 15l6-6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            {isSigningUp ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            Log in
          </a>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 w-48 h-48">
          <div className="flex items-center justify-center text-cyan-400 text-2xl animate-[pulse_1.5s_infinite]">
            X
          </div>
          <div className="flex items-center justify-center text-blue-400 text-2xl animate-[pulse_1.5s_infinite_0.2s]">
            O
          </div>
          <div className="flex items-center justify-center text-cyan-400 text-2xl animate-[pulse_1.5s_infinite_0.4s]">
            X
          </div>
          <div className="flex items-center justify-center text-blue-400 text-2xl animate-[pulse_1.5s_infinite_0.6s]">
            O
          </div>
          <div className="flex items-center justify-center text-cyan-400 text-2xl animate-[pulse_1.5s_infinite_0.8s]">
            X
          </div>
          <div className="flex items-center justify-center text-blue-400 text-2xl animate-[pulse_1.5s_infinite_1s]">
            O
          </div>
          <div className="flex items-center justify-center text-cyan-400 text-2xl animate-[pulse_1.5s_infinite_1.2s]">
            X
          </div>
          <div className="flex items-center justify-center text-blue-400 text-2xl animate-[pulse_1.5s_infinite_1.4s]">
            O
          </div>
          <div className="flex items-center justify-center text-cyan-400 text-2xl animate-[pulse_1.5s_infinite_1.6s]">
            X
          </div>
        </div>
        <p className="mt-4 text-gray-300 text-sm font-medium animate-[fadeIn_2s_ease-in]">
          Join our community!
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
