import { create } from "zustand";
import toast from "react-hot-toast";
import { AxiosInstance } from "axios";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
      console.log(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages = [] } = get(); // Ensure messages is always an array
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
  
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
  
      set({ messages: [...messages, res.data] }); // Spread existing messages and add new message
    } catch (error) {
      toast.error("Failed to send message");
    }
  }
  
  //TODO optimize this function
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
