import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore"; // Assuming you have this for auth
import { Loader2, User } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const { selectedUser, users, isUsersLoading, getUsers, messages } =
    useChatStore();
  const { authUser, logout } = useAuthStore(); // For user authentication
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      getUsers(); // Fetch users when authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [authUser, getUsers, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {" "}
          <div className="sm:flex-col h-full rounded-lg overflow-hidden">
            {/*Sidebar */}
            {/* Left Sidebar - Users List */}
            <Sidebar />
            {/* <aside className="w-1/3 md:w-1/4 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
              <h2 className="text-lg font-semibold text-white mb-4">Users</h2>
              {isUsersLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
                </div>
              ) : users.length === 0 ? (
                <p className="text-gray-400 text-center">No users found.</p>
              ) : (
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                        selectedUser?.id === user.id
                          ? "bg-teal-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.fullName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <span>{user.fullName || user.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </aside> */}

            {/* Right Panel - Chat or Welcome Message */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            {/* <main className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat Header /}
                  <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                      {selectedUser.profilePicture ? (
                        <img
                          src={selectedUser.profilePicture}
                          alt={selectedUser.fullName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      {selectedUser.fullName || selectedUser.email}
                    </h2>
                  </div>

                  {/* Messages Area /}
                  <div className="flex-1 p-4 overflow-y-auto">
                    {messages && messages.length > 0 ? (
                      messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-4 flex ${
                            msg.senderId === authUser.id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              msg.senderId === authUser.id
                                ? "bg-teal-600 text-white"
                                : "bg-gray-700 text-gray-200"
                            }`}
                          >
                            <p>{msg.text}</p>
                            <span className="text-xs text-gray-400">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center mt-10">
                        No messages yet. Start the conversation!
                      </p>
                    )}
                  </div>

                  {/* Message Input /}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const text = e.target.message.value;
                      if (text) {
                        // Assuming sendMessage exists in useChatStore
                        useChatStore
                          .getState()
                          .sendMessage(selectedUser.id, text);
                        e.target.message.value = "";
                      }
                    }}
                    className="bg-gray-800 p-4 border-t border-gray-700 flex gap-3"
                  >
                    <input
                      type="text"
                      name="message"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </>
              ) : (
                /* Welcome Message /
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <MessageSquare className="w-16 h-16 text-teal-400 mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome to ChatSphere
                  </h2>
                  <p className="text-lg text-gray-400 max-w-md">
                    Select a user from the left to start chatting. Connect with
                    friends securely and instantly!
                  </p>
                </div>
              )}
            </main> */}
          </div>
        </div>
      </div>
      {/* Main Layout */}
    </div>
  );
};

export default HomePage;
