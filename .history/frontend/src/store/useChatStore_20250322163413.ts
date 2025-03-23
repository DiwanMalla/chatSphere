import { create } from "zustand";
import toast from "react-hot-toast";
import { AxiosInstance } from "axios";

export const usechatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
}));
