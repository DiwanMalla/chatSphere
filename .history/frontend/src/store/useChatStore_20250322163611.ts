import { create } from "zustand";
import toast from "react-hot-toast";
import { AxiosInstance } from "axios";
import { axiosInstance } from "../lib/axios";

export const usechatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
    } catch (error) {}
  },
}));
