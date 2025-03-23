import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User, Send } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, messages, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = e.target.message.value.trim();
    if (text && selectedUser) {
      sendMessage(selectedUser._id, text);
      e.target.message.value = "";
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-950 h-full">
      {/* Chat Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center gap-3 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden">
          {selectedUser.profilePicture ? (
            <img
              src={selectedUser.profilePicture}
              alt={selectedUser.fullName || selectedUser.email}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            {selectedUser.fullName || selectedUser.email}
          </h2>
          <p className="text-sm text-teal-400">Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
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
                className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-md ${
                  msg.senderId === authUser._id
                    ? "bg-gradient-to-br from-teal-500 to-teal-700 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                <p className="text-base">{msg.text}</p>
                <span className="text-xs text-gray-400 block mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="bg-gray-900 p-4 border-t border-gray-800 flex gap-3 items-center shadow-md"
      >
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200"
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 active:scale-90 transition-transform"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
