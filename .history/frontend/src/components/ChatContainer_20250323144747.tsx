// components/ChatContainer.jsx
import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User, Send } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, messages, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null); // For auto-scrolling to the latest message

  // Fetch messages when a user is selected
  // useEffect(() => {
  //   if (selectedUser) {
  //     fetchMessages(selectedUser._id); // Assuming fetchMessages is implemented in useChatStore
  //   }
  // }, [selectedUser, fetchMessages]);

  // // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = e.target.message.value.trim();
    if (text && selectedUser) {
      sendMessage(selectedUser._id, text); // Send message to the selected user
      e.target.message.value = ""; // Clear input
    }
  };

  if (!selectedUser) return null; // Shouldn’t happen due to HomePage logic, but added for safety

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      {/* Chat Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
          {selectedUser.profilePicture ? (
            <img
              src={selectedUser.profilePicture}
              alt={selectedUser.fullName || selectedUser.email}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            {selectedUser.fullName || selectedUser.email}
          </h2>
          {/* Optional: Add online status or last seen */}
          <p className="text-sm text-gray-400">Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.senderId === authUser._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  msg.senderId === authUser._id
                    ? "bg-teal-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* Invisible anchor for scrolling */}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="bg-gray-800 p-4 border-t border-gray-700 flex gap-3"
      >
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
