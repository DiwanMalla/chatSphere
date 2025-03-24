/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoading: true,
  error: null,
  isLoggedIn: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket:null
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: response.data });
      toast.success("Signup successful");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage =
        (error as any).response?.data?.message || (error as any).message;
      toast.error(errorMessage);
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage =
        (error as any).response?.data?.message || (error as any).message;
      toast.error(errorMessage);
    }
  },
  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        "/auth/update-profile",
        formData
      );
      set({ authUser: response.data });
      toast.success(`Profile updated successfully`);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage =
        (error as any).response?.data?.message || (error as any).message;
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {},
}));
